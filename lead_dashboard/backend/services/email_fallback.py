"""Email fallback: email leads that LinkedIn could not reach.

A lead qualifies when it has an email address, was never emailed, and
either dispatch failed or the invitation went unanswered for
`email_fallback_after_days` days. See database.get_email_fallback_candidates.

This task uses SMTP only, never the browser, so it does not take the
browser lock and can run while dispatch or sync is busy.
"""

import asyncio
import logging
import smtplib
import ssl
from email.message import EmailMessage

from backend import config, database, webhooks
from backend.settings import Settings, get_settings

logger = logging.getLogger(__name__)

SMTP_TIMEOUT_SECONDS = 30

# Only one fallback run at a time, so a lead is never emailed twice.
_run_lock = asyncio.Lock()


class EmailConfigError(Exception):
    pass


def check_email_config(current: Settings) -> None:
    missing = [
        label
        for label, value in (
            ("SMTP host", current.smtp_host),
            ("sender address", current.smtp_from),
        )
        if not value
    ]
    if missing:
        raise EmailConfigError(f"Email is not configured: missing {', '.join(missing)}.")
    if current.smtp_username and not config.SMTP_PASSWORD:
        raise EmailConfigError("SMTP_PASSWORD is not set in lead_dashboard/.env.")


def render_email(current: Settings, lead: dict) -> tuple[str, str]:
    """Fill the subject and body templates with the lead's details."""
    name = lead.get("name") or ""
    values = {
        "name": name or "there",
        "first_name": name.split()[0] if name.strip() else "there",
        "headline": lead.get("headline") or "",
        "message": lead.get("message") or "",
        "profile_url": lead.get("profile_url") or "",
    }
    subject = current.email_subject.format(**values).strip()
    body = current.email_body.format(**values).strip()
    return subject, body


def build_message(current: Settings, to_address: str, subject: str, body: str) -> EmailMessage:
    message = EmailMessage()
    message["From"] = current.smtp_from
    message["To"] = to_address
    message["Subject"] = subject
    message.set_content(body)
    return message


def send_email(current: Settings, message: EmailMessage) -> None:
    """Send one email over SMTP. Blocking: call it via asyncio.to_thread."""
    if current.smtp_port == 465:
        smtp = smtplib.SMTP_SSL(
            current.smtp_host, current.smtp_port,
            timeout=SMTP_TIMEOUT_SECONDS, context=ssl.create_default_context(),
        )
    else:
        smtp = smtplib.SMTP(current.smtp_host, current.smtp_port, timeout=SMTP_TIMEOUT_SECONDS)

    with smtp:
        if current.smtp_port != 465 and current.smtp_starttls:
            smtp.starttls(context=ssl.create_default_context())
        if current.smtp_username:
            smtp.login(current.smtp_username, config.SMTP_PASSWORD)
        smtp.send_message(message)


async def run_email_fallback() -> dict:
    """Email every qualifying lead (up to email_max_per_run)."""
    summary = {"emailed": 0, "failed": 0}
    current = get_settings()
    if not current.email_fallback_enabled:
        return summary

    async with _run_lock:
        check_email_config(current)
        leads = database.get_email_fallback_candidates(
            current.email_fallback_after_days, current.email_max_per_run
        )
        for lead in leads:
            subject, body = render_email(current, lead)
            message = build_message(current, lead["email"], subject, body)
            try:
                await asyncio.to_thread(send_email, current, message)
            except Exception as exc:
                logger.warning("Fallback email to %s failed: %s", lead["email"], exc)
                summary["failed"] += 1
                continue

            database.mark_emailed(lead["id"])
            summary["emailed"] += 1
            webhooks.notify(webhooks.EVENT_EMAILED, database.get_lead(lead["id"]))

    return summary


async def send_test_email(to_address: str) -> None:
    """Send a sample email using the saved settings (raises on failure)."""
    current = get_settings()
    check_email_config(current)
    sample_lead = {
        "name": "Jane Doe",
        "headline": "Procurement Manager",
        "message": "(Your LinkedIn connection note appears here.)",
        "profile_url": "https://www.linkedin.com/in/jane-doe/",
    }
    subject, body = render_email(current, sample_lead)
    message = build_message(current, to_address, f"[Test] {subject}", body)
    await asyncio.to_thread(send_email, current, message)

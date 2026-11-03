"""Step 3: email fallback for leads LinkedIn could not reach."""

import asyncio
import sqlite3
from datetime import datetime, timedelta, timezone

import pytest

from backend import config, database, settings, webhooks
from backend.services import email_fallback


def _configure(**overrides) -> settings.Settings:
    values = {
        "email_fallback_enabled": True,
        "email_fallback_after_days": 7,
        "smtp_host": "smtp.example.com",
        "smtp_from": "adham@blaubatch.com",
        **overrides,
    }
    return settings.save_settings(settings.Settings(**values))


def _add_lead(slug: str, email: str | None, status: str, sent_days_ago: int | None = None) -> int:
    line = f"https://www.linkedin.com/in/{slug}" + (f" {email}" if email else "")
    database.add_leads([line])
    lead_id = next(lead["id"] for lead in database.list_leads() if slug in lead["profile_url"])
    database.save_profile(lead_id, slug.replace("-", " ").title(), "Buyer", "Hi, let's connect.")

    sent_at = None
    if sent_days_ago is not None:
        sent_at = (datetime.now(timezone.utc) - timedelta(days=sent_days_ago)).isoformat(timespec="seconds")
    connection = sqlite3.connect(config.DATABASE_PATH)
    connection.execute("UPDATE leads SET status = ?, sent_at = ? WHERE id = ?", (status, sent_at, lead_id))
    connection.commit()
    connection.close()
    return lead_id


@pytest.fixture
def outbox(monkeypatch):
    """Capture emails instead of talking to an SMTP server."""
    sent = []
    monkeypatch.setattr(email_fallback, "send_email", lambda current, message: sent.append(message))
    return sent


def test_parse_lead_line_accepts_optional_email():
    assert database.parse_lead_line("linkedin.com/in/Jane-Doe, Jane@Example.com") == (
        "https://www.linkedin.com/in/jane-doe/", "jane@example.com",
    )
    assert database.parse_lead_line("https://www.linkedin.com/in/jane-doe") == (
        "https://www.linkedin.com/in/jane-doe/", None,
    )
    assert database.parse_lead_line("jane@example.com") == (None, "jane@example.com")


def test_duplicate_line_fills_in_missing_email():
    database.add_leads(["https://www.linkedin.com/in/jane-doe"])
    result = database.add_leads(["https://www.linkedin.com/in/jane-doe jane@example.com"])

    assert result["duplicates"] == 1
    assert database.list_leads()[0]["email"] == "jane@example.com"


def test_only_unreached_leads_with_email_are_candidates():
    overdue = _add_lead("overdue", "overdue@example.com", "sent", sent_days_ago=10)
    failed = _add_lead("failed", "failed@example.com", "failed")
    _add_lead("too-recent", "recent@example.com", "sent", sent_days_ago=2)
    _add_lead("accepted", "accepted@example.com", "accepted", sent_days_ago=10)
    _add_lead("no-email", None, "sent", sent_days_ago=10)
    already = _add_lead("already-emailed", "done@example.com", "failed")
    database.mark_emailed(already)

    candidates = database.get_email_fallback_candidates(after_days=7, limit=10)
    assert {lead["id"] for lead in candidates} == {overdue, failed}


def test_run_email_fallback_sends_and_marks(outbox):
    _configure(email_subject="Hello {first_name}", email_body="{message}\n\n{profile_url}")
    lead_id = _add_lead("jane-doe", "jane@example.com", "failed")

    result = asyncio.run(email_fallback.run_email_fallback())

    assert result == {"emailed": 1, "failed": 0}
    assert len(outbox) == 1
    assert outbox[0]["To"] == "jane@example.com"
    assert outbox[0]["Subject"] == "Hello Jane"
    assert "Hi, let's connect." in outbox[0].get_content()

    lead = database.get_lead(lead_id)
    assert lead["emailed_at"] is not None
    assert database.get_analytics()["emailed"] == 1

    # Running again sends nothing new.
    assert asyncio.run(email_fallback.run_email_fallback()) == {"emailed": 0, "failed": 0}


def test_smtp_failure_is_counted_and_lead_retried_later(monkeypatch):
    _configure()
    lead_id = _add_lead("jane-doe", "jane@example.com", "failed")

    def refuse(current, message):
        raise OSError("Connection refused")

    monkeypatch.setattr(email_fallback, "send_email", refuse)
    result = asyncio.run(email_fallback.run_email_fallback())

    assert result == {"emailed": 0, "failed": 1}
    assert database.get_lead(lead_id)["emailed_at"] is None


def test_disabled_fallback_does_nothing(outbox):
    _configure(email_fallback_enabled=False)
    _add_lead("jane-doe", "jane@example.com", "failed")

    assert asyncio.run(email_fallback.run_email_fallback()) == {"emailed": 0, "failed": 0}
    assert outbox == []


def test_missing_smtp_settings_raise_clear_error(outbox):
    _configure(smtp_host="")
    _add_lead("jane-doe", "jane@example.com", "failed")

    with pytest.raises(email_fallback.EmailConfigError, match="SMTP host"):
        asyncio.run(email_fallback.run_email_fallback())


def test_username_without_password_is_rejected(outbox, monkeypatch):
    monkeypatch.setattr(config, "SMTP_PASSWORD", "")
    _configure(smtp_username="adham")

    with pytest.raises(email_fallback.EmailConfigError, match="SMTP_PASSWORD"):
        asyncio.run(email_fallback.run_email_fallback())


def test_emailed_event_fires_webhook(outbox, monkeypatch):
    _configure(webhook_enabled=True, webhook_url="https://hooks.example.com/x")
    _add_lead("jane-doe", "jane@example.com", "failed")
    events = []
    monkeypatch.setattr(webhooks, "notify", lambda event, lead: events.append((event, lead["email"])))

    asyncio.run(email_fallback.run_email_fallback())
    assert events == [(webhooks.EVENT_EMAILED, "jane@example.com")]


def test_render_email_handles_missing_name():
    current = settings.Settings(email_subject="Hi {first_name}", email_body="Dear {name}")
    subject, body = email_fallback.render_email(current, {"name": None})
    assert subject == "Hi there"
    assert body == "Dear there"

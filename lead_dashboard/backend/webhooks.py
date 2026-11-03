"""Sends lead events to an external webhook (Zapier, Make, n8n, Slack, ...).

`notify()` never blocks and never raises: it schedules the HTTP request as
its own asyncio task and returns immediately. A slow, broken or offline
webhook therefore cannot stall or crash the sync loop; failures are logged
and recorded in `delivery_log` for the dashboard.

Payload:
    {"event": "lead.replied", "sent_at": "...", "lead": {...}}

If WEBHOOK_SECRET is set in .env, each request carries an
`X-Signature-SHA256` header: the hex HMAC-SHA256 of the raw body, so the
receiver can verify the request really came from this dashboard.
"""

import asyncio
import hashlib
import hmac
import json
import logging
from collections import deque
from datetime import datetime, timezone

import httpx

from backend import config
from backend.settings import get_settings

logger = logging.getLogger(__name__)

EVENT_ACCEPTED = "lead.accepted"
EVENT_REPLIED = "lead.replied"
EVENT_EMAILED = "lead.emailed"
EVENT_TEST = "webhook.test"

TIMEOUT_SECONDS = 10
MAX_ATTEMPTS = 3
RETRY_DELAY_SECONDS = 5

# Lead fields included in the payload (internal bookkeeping is left out).
LEAD_FIELDS = (
    "id", "profile_url", "name", "headline", "email", "status",
    "message", "reply_text", "sent_at", "accepted_at", "replied_at", "emailed_at",
)

# Keeps a reference to every in-flight delivery: asyncio only holds weak
# references to tasks, so an unreferenced task could be garbage collected.
_pending_deliveries: set[asyncio.Task] = set()

# The most recent deliveries, newest first, shown in the Settings modal.
delivery_log: deque[dict] = deque(maxlen=20)

# Tests swap this for an httpx.MockTransport.
transport: httpx.AsyncBaseTransport | None = None


def _now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def build_payload(event: str, lead: dict | None) -> dict:
    lead_data = {key: lead.get(key) for key in LEAD_FIELDS} if lead else None
    return {"event": event, "sent_at": _now(), "lead": lead_data}


def notify(event: str, lead: dict | None) -> None:
    """Queue a webhook delivery if webhooks are enabled. Returns immediately."""
    current = get_settings()
    if not (current.webhook_enabled and current.webhook_url):
        return

    payload = build_payload(event, lead)
    task = asyncio.create_task(_deliver(current.webhook_url, payload))
    _pending_deliveries.add(task)
    task.add_done_callback(_pending_deliveries.discard)


async def send_test(url: str) -> dict:
    """Send one test event right away and report the outcome (no retries)."""
    return await _deliver(url, build_payload(EVENT_TEST, None), attempts=1)


async def wait_for_deliveries() -> None:
    """Wait for in-flight deliveries (used by tests and on shutdown)."""
    if _pending_deliveries:
        await asyncio.gather(*_pending_deliveries, return_exceptions=True)


async def _deliver(url: str, payload: dict, attempts: int = MAX_ATTEMPTS) -> dict:
    body = json.dumps(payload).encode("utf-8")
    headers = {"Content-Type": "application/json", "User-Agent": "BlauBatch-LeadDashboard/1.0"}
    if config.WEBHOOK_SECRET:
        signature = hmac.new(config.WEBHOOK_SECRET.encode(), body, hashlib.sha256).hexdigest()
        headers["X-Signature-SHA256"] = signature

    outcome = {"event": payload["event"], "url": url, "at": _now(), "ok": False, "detail": ""}
    try:
        async with httpx.AsyncClient(timeout=TIMEOUT_SECONDS, transport=transport) as client:
            for attempt in range(1, attempts + 1):
                try:
                    response = await client.post(url, content=body, headers=headers)
                    if response.is_success:
                        outcome.update(ok=True, detail=f"HTTP {response.status_code}")
                        break
                    outcome["detail"] = f"HTTP {response.status_code}"
                except httpx.HTTPError as exc:
                    outcome["detail"] = f"{exc.__class__.__name__}: {exc}" if str(exc) else exc.__class__.__name__

                if attempt < attempts:
                    await asyncio.sleep(RETRY_DELAY_SECONDS * attempt)
    except Exception as exc:  # never let a webhook problem escape
        outcome["detail"] = f"Unexpected error: {exc}"

    if not outcome["ok"]:
        logger.warning("Webhook %s to %s failed: %s", payload["event"], url, outcome["detail"])
    delivery_log.appendleft(outcome)
    return outcome

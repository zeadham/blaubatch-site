"""Step 2: webhooks are fire-and-forget and never break the sync loop."""

import asyncio
import hashlib
import hmac
import json
import time

import httpx

from backend import config, database, settings, webhooks
from backend.services import sync

HOOK_URL = "https://hooks.example.com/lead-events"


def _enable_webhook() -> None:
    settings.save_settings(settings.Settings(webhook_enabled=True, webhook_url=HOOK_URL))


def _sent_lead(name: str = "Jane Doe") -> dict:
    database.add_leads(["https://www.linkedin.com/in/jane-doe"])
    lead = database.list_leads()[0]
    database.save_profile(lead["id"], name, "Buyer", "Hi!")
    database.mark_sent(lead["id"])
    return database.get_lead(lead["id"])


def test_notify_does_nothing_when_disabled(monkeypatch):
    calls = []
    monkeypatch.setattr(webhooks, "transport", httpx.MockTransport(lambda request: calls.append(request)))

    async def scenario():
        webhooks.notify(webhooks.EVENT_REPLIED, {"id": 1})
        await webhooks.wait_for_deliveries()

    asyncio.run(scenario())
    assert calls == []


def test_successful_delivery_sends_payload_and_signature(monkeypatch):
    _enable_webhook()
    monkeypatch.setattr(config, "WEBHOOK_SECRET", "s3cret")
    received = []

    def handler(request: httpx.Request) -> httpx.Response:
        received.append(request)
        return httpx.Response(200)

    monkeypatch.setattr(webhooks, "transport", httpx.MockTransport(handler))

    async def scenario():
        webhooks.notify(webhooks.EVENT_REPLIED, {"id": 7, "name": "Jane", "reply_text": "Hi", "error": "x"})
        await webhooks.wait_for_deliveries()

    asyncio.run(scenario())

    assert len(received) == 1
    payload = json.loads(received[0].content)
    assert payload["event"] == "lead.replied"
    assert payload["lead"]["reply_text"] == "Hi"
    assert "error" not in payload["lead"]  # internal fields stay private

    expected = hmac.new(b"s3cret", received[0].content, hashlib.sha256).hexdigest()
    assert received[0].headers["X-Signature-SHA256"] == expected
    assert webhooks.delivery_log[0]["ok"] is True


def test_down_webhook_is_retried_logged_and_swallowed(monkeypatch):
    _enable_webhook()
    attempts = []

    def handler(request: httpx.Request) -> httpx.Response:
        attempts.append(request)
        raise httpx.ConnectError("Connection refused")

    monkeypatch.setattr(webhooks, "transport", httpx.MockTransport(handler))

    async def scenario():
        webhooks.notify(webhooks.EVENT_ACCEPTED, {"id": 1})
        await webhooks.wait_for_deliveries()  # must not raise

    asyncio.run(scenario())

    assert len(attempts) == webhooks.MAX_ATTEMPTS
    assert webhooks.delivery_log[0]["ok"] is False
    assert "ConnectError" in webhooks.delivery_log[0]["detail"]


def test_notify_returns_immediately_even_if_webhook_hangs(monkeypatch):
    _enable_webhook()

    async def slow_handler(request: httpx.Request) -> httpx.Response:
        await asyncio.sleep(2)
        return httpx.Response(200)

    monkeypatch.setattr(webhooks, "transport", httpx.MockTransport(slow_handler))

    async def scenario():
        started = time.perf_counter()
        webhooks.notify(webhooks.EVENT_REPLIED, {"id": 1})
        elapsed = time.perf_counter() - started
        await webhooks.wait_for_deliveries()
        return elapsed

    assert asyncio.run(scenario()) < 0.1


def test_sync_finishes_and_saves_reply_when_webhook_is_down(monkeypatch):
    """The real reply-sync loop, with a fake inbox page and a dead webhook."""
    _enable_webhook()
    lead = _sent_lead()
    monkeypatch.setattr(
        webhooks, "transport",
        httpx.MockTransport(lambda request: (_ for _ in ()).throw(httpx.ConnectError("down"))),
    )

    class FakeLocator:
        def __init__(self, text=""):
            self.text = text
            self.first = self

        def locator(self, selector):
            return self

        def nth(self, index):
            return self

        async def count(self):
            return 1

        async def inner_text(self, timeout=None):
            return self.text

        async def click(self, timeout=None):
            return None

    class FakePage:
        async def goto(self, url, wait_until=None):
            return None

        def locator(self, selector):
            return FakeLocator("Jane Doe")

        async def evaluate(self, script, argument):
            return [{"sender": "Jane Doe", "text": "Sounds good, call me Monday."}]

    async def no_sleep(seconds):
        return None

    monkeypatch.setattr(sync.asyncio, "sleep", no_sleep)

    async def scenario():
        replied = await sync._sync_replies(FakePage())
        await webhooks.wait_for_deliveries()
        return replied

    assert asyncio.run(scenario()) == 1
    saved = database.get_lead(lead["id"])
    assert saved["status"] == "replied"
    assert saved["reply_text"] == "Sounds good, call me Monday."
    assert webhooks.delivery_log[0]["ok"] is False

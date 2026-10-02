"""Step 1 (scheduler in the FastAPI lifespan) and Step 4 (settings API)."""

import asyncio

import pytest
from fastapi.testclient import TestClient

from backend import main, scheduler, settings
from backend.services import sync
from backend.tasks import TaskRunner


@pytest.fixture
def client():
    with TestClient(main.app) as test_client:
        yield test_client


def _jobs(client) -> dict:
    jobs = client.get("/api/tasks/status").json()["scheduler"]["jobs"]
    return {job["id"]: job for job in jobs}


def test_scheduler_starts_with_app_and_is_off_by_default(client):
    status = client.get("/api/tasks/status").json()["scheduler"]
    assert status == {"running": True, "jobs": []}


def test_saving_settings_reschedules_jobs(client):
    current = client.get("/api/settings").json()["settings"]
    current.update(scheduler_enabled=True, dispatch_interval_minutes=120, sync_interval_minutes=30)

    response = client.put("/api/settings", json=current)
    assert response.status_code == 200

    jobs = _jobs(client)
    assert set(jobs) == {"dispatch", "sync"}
    assert all(job["next_run_at"] for job in jobs.values())

    current["scheduler_enabled"] = False
    client.put("/api/settings", json=current)
    assert _jobs(client) == {}


def test_scheduler_is_stopped_with_the_app():
    with TestClient(main.app):
        pass
    assert scheduler.status() == {"running": False, "jobs": []}


def test_enabled_schedule_is_restored_on_restart():
    settings.save_settings(settings.Settings(scheduler_enabled=True))
    with TestClient(main.app) as test_client:
        assert set(_jobs(test_client)) == {"dispatch", "sync"}


def test_scheduled_run_is_skipped_while_a_task_runs(monkeypatch):
    runner = TaskRunner()
    monkeypatch.setattr(scheduler, "task_runner", runner)

    async def scenario():
        release = asyncio.Event()

        async def manual_dispatch():
            await release.wait()
            return {}

        runner.start("dispatch", manual_dispatch)
        await scheduler._scheduled_sync()  # must not raise or queue
        assert runner.running_task == "dispatch"
        release.set()
        await runner.wait()
        return runner.status()["last_run"]

    last_run = asyncio.run(scenario())
    assert last_run["name"] == "dispatch"
    assert last_run["trigger"] == "manual"


def test_scheduled_run_records_trigger(monkeypatch):
    runner = TaskRunner()
    monkeypatch.setattr(scheduler, "task_runner", runner)

    async def fake_sync():
        return {"accepted": 0}

    monkeypatch.setattr(scheduler, "run_sync_and_email_fallback", fake_sync)

    async def scenario():
        await scheduler._scheduled_sync()
        await runner.wait()
        return runner.status()["last_run"]

    last_run = asyncio.run(scenario())
    assert last_run == {**last_run, "name": "sync", "trigger": "schedule", "error": None}


def test_sync_reports_email_error_without_losing_sync_results(monkeypatch):
    async def fake_sync():
        return {"accepted": 2, "replied": 1}

    async def broken_email():
        raise RuntimeError("SMTP down")

    monkeypatch.setattr(sync, "run_sync", fake_sync)
    monkeypatch.setattr(sync, "run_email_fallback", broken_email)

    result = asyncio.run(sync.run_sync_and_email_fallback())
    assert result == {"accepted": 2, "replied": 1, "email_error": "SMTP down"}


# --- Settings API (Step 4) ---

def test_settings_defaults_and_secrets_are_never_returned(client, monkeypatch):
    monkeypatch.setattr(main.config, "SMTP_PASSWORD", "hunter2")
    body = client.get("/api/settings").json()

    assert body["settings"]["scheduler_enabled"] is False
    assert body["secrets"] == {"smtp_password_set": True, "webhook_secret_set": False}
    assert "hunter2" not in str(body)


def test_settings_round_trip(client):
    current = client.get("/api/settings").json()["settings"]
    current.update(webhook_enabled=True, webhook_url="https://hooks.example.com/x", smtp_host="smtp.example.com")
    client.put("/api/settings", json=current)

    saved = client.get("/api/settings").json()["settings"]
    assert saved["webhook_url"] == "https://hooks.example.com/x"
    assert saved["smtp_host"] == "smtp.example.com"


@pytest.mark.parametrize("field, value", [
    ("webhook_url", "not a url"),
    ("smtp_from", "nobody"),
    ("email_body", "Hi {unknown_placeholder}"),
    ("sync_interval_minutes", 1),
])
def test_invalid_settings_are_rejected(client, field, value):
    current = client.get("/api/settings").json()["settings"]
    current[field] = value
    response = client.put("/api/settings", json=current)
    assert response.status_code == 422


def test_update_lead_email(client):
    client.post("/api/leads", json={"urls": ["https://www.linkedin.com/in/jane-doe"]})
    lead_id = client.get("/api/leads").json()[0]["id"]

    assert client.patch(f"/api/leads/{lead_id}", json={"email": "Jane@Example.com"}).json()["email"] == "jane@example.com"
    assert client.patch(f"/api/leads/{lead_id}", json={"email": "nope"}).status_code == 422
    assert client.patch(f"/api/leads/{lead_id}", json={"email": ""}).json()["email"] is None
    assert client.patch("/api/leads/999", json={"email": "a@b.co"}).status_code == 404


def test_test_email_endpoint_reports_config_problem(client):
    response = client.post("/api/settings/test-email", json={"to": "me@example.com"})
    assert response.status_code == 502
    assert "not configured" in response.json()["detail"]


def test_test_webhook_endpoint_rejects_bad_url(client):
    assert client.post("/api/settings/test-webhook", json={"url": "nope"}).status_code == 422


def test_invalid_saved_setting_falls_back_to_default():
    from backend import database
    database.save_settings({"sync_interval_minutes": 1, "smtp_host": "smtp.example.com"})

    current = settings.get_settings()
    assert current.sync_interval_minutes == settings.Settings().sync_interval_minutes
    assert current.smtp_host == "smtp.example.com"

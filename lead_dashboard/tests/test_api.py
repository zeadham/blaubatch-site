import asyncio

import pytest
from fastapi.testclient import TestClient

from backend import main
from backend.tasks import TaskBusyError, TaskRunner


@pytest.fixture
def runner(monkeypatch):
    """A fresh TaskRunner per test, with fake browser jobs instead of Playwright."""
    fresh_runner = TaskRunner()
    monkeypatch.setattr(main, "task_runner", fresh_runner)
    return fresh_runner


def test_analytics_endpoint():
    with TestClient(main.app) as client:
        client.post("/api/leads", json={"urls": ["https://www.linkedin.com/in/jane-doe"]})
        response = client.get("/api/analytics")

    assert response.status_code == 200
    assert response.json() == {
        "total": 1, "pending": 1, "sent": 0, "accepted": 0, "replied": 0, "emailed": 0,
    }


def test_sync_is_rejected_while_dispatch_runs(runner, monkeypatch):
    release = asyncio.Event()

    async def slow_dispatch():
        await release.wait()
        return {"sent": 0}

    async def fake_sync():
        return {"accepted": 0, "replied": 0}

    monkeypatch.setattr(main, "run_dispatch", slow_dispatch)
    monkeypatch.setattr(main, "run_sync_and_email_fallback", fake_sync)

    with TestClient(main.app) as client:
        assert client.post("/api/dispatch").status_code == 202
        assert client.get("/api/tasks/status").json()["running"] == "dispatch"

        # Both directions are blocked while a browser task is running.
        busy = client.post("/api/sync")
        assert busy.status_code == 409
        assert "dispatch" in busy.json()["detail"]
        assert client.post("/api/dispatch").status_code == 409

        client.portal.call(release.set)
        client.portal.call(runner.wait)

        status = client.get("/api/tasks/status").json()
        assert status["running"] is None
        assert status["last_run"]["name"] == "dispatch"

        # Once dispatch is done, sync is allowed.
        assert client.post("/api/sync").status_code == 202
        client.portal.call(runner.wait)
        assert client.get("/api/tasks/status").json()["last_run"]["name"] == "sync"


def test_task_error_is_reported_and_releases_lock(runner, monkeypatch):
    async def broken_sync():
        raise RuntimeError("Not logged in")

    monkeypatch.setattr(main, "run_sync_and_email_fallback", broken_sync)

    with TestClient(main.app) as client:
        client.post("/api/sync")
        client.portal.call(runner.wait)
        status = client.get("/api/tasks/status").json()

    assert status["running"] is None
    assert status["last_run"]["error"] == "Not logged in"


def test_runner_never_runs_two_jobs_at_once():
    async def scenario():
        runner = TaskRunner()
        active = 0
        max_active = 0

        async def job():
            nonlocal active, max_active
            active += 1
            max_active = max(max_active, active)
            await asyncio.sleep(0.01)
            active -= 1
            return {}

        runner.start("dispatch", job)
        with pytest.raises(TaskBusyError):
            runner.start("sync", job)

        # Even calling run_exclusive directly waits for the lock.
        await asyncio.gather(runner.run_exclusive(job), runner.run_exclusive(job), runner.wait())
        return max_active

    assert asyncio.run(scenario()) == 1


def test_dashboard_is_served():
    with TestClient(main.app) as client:
        page = client.get("/")
        script = client.get("/static/app.js")

    assert page.status_code == 200
    assert "Sync Inbox" in page.text
    assert script.status_code == 200

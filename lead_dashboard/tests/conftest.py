import pytest

from backend import config, database, webhooks


@pytest.fixture(autouse=True)
def temp_database(tmp_path, monkeypatch):
    """Give every test its own empty database file."""
    monkeypatch.setattr(config, "DATABASE_PATH", tmp_path / "test.db")
    database.init_db()
    yield


@pytest.fixture(autouse=True)
def isolated_webhooks(monkeypatch):
    """No real HTTP, no retry delays, and a clean delivery log per test."""
    monkeypatch.setattr(webhooks, "RETRY_DELAY_SECONDS", 0)
    monkeypatch.setattr(webhooks, "transport", None)
    webhooks.delivery_log.clear()
    yield

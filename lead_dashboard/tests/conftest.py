import pytest

from backend import config, database


@pytest.fixture(autouse=True)
def temp_database(tmp_path, monkeypatch):
    """Give every test its own empty database file."""
    monkeypatch.setattr(config, "DATABASE_PATH", tmp_path / "test.db")
    database.init_db()
    yield

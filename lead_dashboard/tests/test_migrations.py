"""Step 3: the email column is added safely to existing databases."""

import sqlite3

from backend import config, database

# The exact schema a Phase 2 database has (no user_version set).
PHASE2_SCHEMA = """
CREATE TABLE leads (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    profile_url   TEXT    NOT NULL UNIQUE,
    name          TEXT,
    headline      TEXT,
    message       TEXT,
    status        TEXT    NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'sent', 'accepted', 'replied', 'failed')),
    reply_text    TEXT,
    error         TEXT,
    created_at    TEXT    NOT NULL,
    updated_at    TEXT    NOT NULL,
    sent_at       TEXT,
    accepted_at   TEXT,
    replied_at    TEXT
);
CREATE INDEX idx_leads_status ON leads (status);
"""


def _columns(db_path) -> set[str]:
    connection = sqlite3.connect(db_path)
    try:
        return {row[1] for row in connection.execute("PRAGMA table_info(leads)")}
    finally:
        connection.close()


def test_new_database_is_at_latest_version():
    assert database.schema_version() == len(database.MIGRATIONS)
    assert {"email", "emailed_at"} <= _columns(config.DATABASE_PATH)


def test_phase2_database_is_upgraded_without_losing_data(tmp_path, monkeypatch):
    old_db = tmp_path / "phase2.db"
    connection = sqlite3.connect(old_db)
    connection.executescript(PHASE2_SCHEMA)
    connection.execute(
        """
        INSERT INTO leads (profile_url, name, status, reply_text, created_at, updated_at)
        VALUES ('https://www.linkedin.com/in/jane-doe/', 'Jane Doe', 'replied', 'Hi!', 'x', 'x')
        """
    )
    connection.commit()
    connection.close()

    monkeypatch.setattr(config, "DATABASE_PATH", old_db)
    database.init_db()

    assert database.schema_version() == len(database.MIGRATIONS)
    assert {"email", "emailed_at"} <= _columns(old_db)

    lead = database.list_leads()[0]
    assert lead["name"] == "Jane Doe"
    assert lead["reply_text"] == "Hi!"
    assert lead["email"] is None

    # A copy of the pre-upgrade database is kept next to it.
    backup = tmp_path / "phase2.v0.backup.db"
    assert backup.exists()
    assert "email" not in _columns(backup)


def test_migrations_are_idempotent():
    database.add_leads(["https://www.linkedin.com/in/jane-doe jane@example.com"])
    database.init_db()
    database.init_db()

    assert database.schema_version() == len(database.MIGRATIONS)
    assert database.list_leads()[0]["email"] == "jane@example.com"


def test_failed_migration_rolls_back(tmp_path, monkeypatch):
    monkeypatch.setattr(config, "DATABASE_PATH", tmp_path / "broken.db")
    monkeypatch.setattr(
        database,
        "MIGRATIONS",
        database.MIGRATIONS + ["CREATE TABLE half_done (id INTEGER); THIS IS NOT SQL"],
    )

    try:
        database.init_db()
    except sqlite3.OperationalError:
        pass
    else:
        raise AssertionError("the broken migration should have failed")

    connection = sqlite3.connect(tmp_path / "broken.db")
    tables = {row[0] for row in connection.execute("SELECT name FROM sqlite_master WHERE type='table'")}
    version = connection.execute("PRAGMA user_version").fetchone()[0]
    connection.close()

    # The good migrations stuck; the broken one left nothing behind.
    assert version == len(database.MIGRATIONS) - 1
    assert "half_done" not in tables

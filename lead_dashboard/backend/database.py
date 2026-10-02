"""SQLite storage for leads.

A lead moves through these statuses:

    pending  -> sent      (dispatch sent a connection request)
    sent     -> accepted  (sync found them in our connections)
    sent/accepted -> replied (sync found a message from them)
    pending  -> failed    (dispatch could not send; see `error`)

Email fallback is tracked separately (`email`, `emailed_at`) so it never
changes the LinkedIn status above.

Each function opens its own short-lived connection, so the module is safe
to use from API handlers and background tasks alike.
"""

import json
import re
import sqlite3
from contextlib import contextmanager
from datetime import datetime, timedelta, timezone
from pathlib import Path

from backend import config

STATUS_PENDING = "pending"
STATUS_SENT = "sent"
STATUS_ACCEPTED = "accepted"
STATUS_REPLIED = "replied"
STATUS_FAILED = "failed"

EMAIL_PATTERN = re.compile(r"[^@\s]+@[^@\s]+\.[a-z]{2,}")

# Each migration runs once, in order, inside its own transaction. The
# database remembers how far it got in `PRAGMA user_version`, so existing
# databases are upgraded in place and new ones are built from scratch.
# Never edit a migration that has shipped: add a new one instead.
MIGRATIONS: list[str] = [
    # 1: original leads table (Phase 2)
    """
    CREATE TABLE IF NOT EXISTS leads (
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
    CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
    """,
    # 2: email fallback columns and the settings table (Phase 3)
    """
    ALTER TABLE leads ADD COLUMN email TEXT;
    ALTER TABLE leads ADD COLUMN emailed_at TEXT;
    CREATE TABLE IF NOT EXISTS settings (
        key    TEXT PRIMARY KEY,
        value  TEXT NOT NULL
    );
    """,
]

def _now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


@contextmanager
def get_connection(db_path: Path | None = None):
    """Open a connection, commit on success, and always close it."""
    connection = sqlite3.connect(db_path or config.DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    try:
        yield connection
        connection.commit()
    finally:
        connection.close()


def init_db() -> None:
    """Create the database if needed and apply any pending migrations."""
    config.DATABASE_PATH.parent.mkdir(parents=True, exist_ok=True)
    with get_connection() as connection:
        # WAL lets the dashboard read while a background task is writing.
        connection.execute("PRAGMA journal_mode=WAL")
    _apply_migrations()


def _apply_migrations() -> None:
    # isolation_level=None lets us control the transaction ourselves, so a
    # migration either applies completely or not at all.
    connection = sqlite3.connect(config.DATABASE_PATH, isolation_level=None)
    try:
        current_version = connection.execute("PRAGMA user_version").fetchone()[0]
        pending = list(enumerate(MIGRATIONS, start=1))[current_version:]
        if pending and _has_tables(connection):
            _backup_database(connection, current_version)

        for version, script in pending:
            connection.execute("BEGIN IMMEDIATE")
            try:
                for statement in _split_statements(script):
                    connection.execute(statement)
                connection.execute(f"PRAGMA user_version = {version}")
                connection.execute("COMMIT")
            except Exception:
                connection.execute("ROLLBACK")
                raise
    finally:
        connection.close()


def _has_tables(connection: sqlite3.Connection) -> bool:
    count = connection.execute(
        "SELECT COUNT(*) FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%'"
    ).fetchone()[0]
    return count > 0


def _split_statements(script: str) -> list[str]:
    # executescript() would commit on its own, breaking the transaction,
    # so statements run one by one. Migrations contain no literal ';'.
    return [statement.strip() for statement in script.split(";") if statement.strip()]


def _backup_database(connection: sqlite3.Connection, version: int) -> None:
    """Copy the database aside before upgrading it, just in case."""
    backup_path = config.DATABASE_PATH.with_name(
        f"{config.DATABASE_PATH.stem}.v{version}.backup{config.DATABASE_PATH.suffix}"
    )
    if backup_path.exists():
        return
    backup = sqlite3.connect(backup_path)
    try:
        connection.backup(backup)
    finally:
        backup.close()


def schema_version() -> int:
    with get_connection() as connection:
        return connection.execute("PRAGMA user_version").fetchone()[0]


def normalize_profile_url(url: str) -> str | None:
    """Return a canonical LinkedIn profile URL, or None if it is not one.

    'linkedin.com/in/Jane-Doe?trk=x' -> 'https://www.linkedin.com/in/jane-doe/'
    """
    cleaned = url.strip().split("?")[0].split("#")[0]
    marker = "linkedin.com/in/"
    if marker not in cleaned.lower():
        return None

    slug = cleaned[cleaned.lower().index(marker) + len(marker):].strip("/")
    slug = slug.split("/")[0]
    if not slug:
        return None
    return f"https://www.linkedin.com/in/{slug.lower()}/"


# --- Reading ---

def list_leads() -> list[dict]:
    with get_connection() as connection:
        rows = connection.execute(
            "SELECT * FROM leads ORDER BY updated_at DESC, id DESC"
        ).fetchall()
    return [dict(row) for row in rows]


def get_leads_by_status(status: str, limit: int | None = None) -> list[dict]:
    query = "SELECT * FROM leads WHERE status = ? ORDER BY id"
    params: tuple = (status,)
    if limit is not None:
        query += " LIMIT ?"
        params = (status, limit)

    with get_connection() as connection:
        rows = connection.execute(query, params).fetchall()
    return [dict(row) for row in rows]


def get_analytics() -> dict:
    """Count leads per status in a single pass over the (indexed) table."""
    with get_connection() as connection:
        row = connection.execute(
            """
            SELECT
                COUNT(*)                                       AS total,
                COALESCE(SUM(status = 'pending'),  0)          AS pending,
                COALESCE(SUM(status = 'sent'),     0)          AS sent,
                COALESCE(SUM(status = 'accepted'), 0)          AS accepted,
                COALESCE(SUM(status = 'replied'),  0)          AS replied,
                COUNT(emailed_at)                              AS emailed
            FROM leads
            """
        ).fetchone()
    return dict(row)


# --- Writing ---

def normalize_email(value: str | None) -> str | None:
    """Return a lower-cased email address, or None if it does not look like one."""
    email = (value or "").strip().strip("<>").lower()
    if not EMAIL_PATTERN.fullmatch(email):
        return None
    return email


def parse_lead_line(line: str) -> tuple[str | None, str | None]:
    """Split 'profile-url [, email]' into a normalised (url, email) pair."""
    profile_url = None
    email = None
    for part in re.split(r"[\s,;]+", line.strip()):
        if not part:
            continue
        if "@" in part and email is None:
            email = normalize_email(part)
        elif profile_url is None:
            profile_url = normalize_profile_url(part)
    return profile_url, email


def add_leads(lines: list[str]) -> dict:
    """Insert new leads, one per line: a profile URL, optionally followed by an email.

    Returns how many were added, skipped as duplicates, and rejected as invalid.
    A duplicate line can still fill in a missing email for that lead.
    """
    added = 0
    duplicates = 0
    invalid: list[str] = []
    now = _now()

    with get_connection() as connection:
        for line in lines:
            if not line.strip():
                continue
            profile_url, email = parse_lead_line(line)
            if profile_url is None:
                invalid.append(line.strip())
                continue

            cursor = connection.execute(
                """
                INSERT OR IGNORE INTO leads (profile_url, email, status, created_at, updated_at)
                VALUES (?, ?, 'pending', ?, ?)
                """,
                (profile_url, email, now, now),
            )
            if cursor.rowcount:
                added += 1
                continue

            duplicates += 1
            if email:
                connection.execute(
                    "UPDATE leads SET email = ?, updated_at = ? WHERE profile_url = ? AND email IS NULL",
                    (email, now, profile_url),
                )

    return {"added": added, "duplicates": duplicates, "invalid": invalid}


def get_lead(lead_id: int) -> dict | None:
    with get_connection() as connection:
        row = connection.execute("SELECT * FROM leads WHERE id = ?", (lead_id,)).fetchone()
    return dict(row) if row else None


def set_email(lead_id: int, email: str | None) -> bool:
    """Set or clear a lead's email address. Returns False if the lead does not exist."""
    with get_connection() as connection:
        cursor = connection.execute(
            "UPDATE leads SET email = ?, updated_at = ? WHERE id = ?",
            (email, _now(), lead_id),
        )
    return cursor.rowcount > 0


def delete_lead(lead_id: int) -> bool:
    with get_connection() as connection:
        cursor = connection.execute("DELETE FROM leads WHERE id = ?", (lead_id,))
    return cursor.rowcount > 0


def save_profile(lead_id: int, name: str | None, headline: str | None, message: str | None) -> None:
    """Store what dispatch scraped and generated, before trying to send."""
    with get_connection() as connection:
        connection.execute(
            """
            UPDATE leads
            SET name = ?, headline = ?, message = ?, updated_at = ?
            WHERE id = ?
            """,
            (name, headline, message, _now(), lead_id),
        )


def mark_sent(lead_id: int) -> None:
    now = _now()
    with get_connection() as connection:
        connection.execute(
            """
            UPDATE leads
            SET status = 'sent', error = NULL, sent_at = ?, updated_at = ?
            WHERE id = ?
            """,
            (now, now, lead_id),
        )


def mark_failed(lead_id: int, error: str) -> None:
    with get_connection() as connection:
        connection.execute(
            "UPDATE leads SET status = 'failed', error = ?, updated_at = ? WHERE id = ?",
            (error, _now(), lead_id),
        )


def mark_accepted(lead_id: int) -> bool:
    """Move a 'sent' lead to 'accepted'. Leads in any other status are left alone."""
    now = _now()
    with get_connection() as connection:
        cursor = connection.execute(
            """
            UPDATE leads
            SET status = 'accepted', accepted_at = ?, updated_at = ?
            WHERE id = ? AND status = 'sent'
            """,
            (now, now, lead_id),
        )
    return cursor.rowcount > 0


def mark_replied(lead_id: int, reply_text: str) -> bool:
    """Record a reply from a 'sent', 'accepted' or already 'replied' lead.

    Returns True only when something changed, so a sync that sees the same
    reply twice does not count it twice.
    """
    now = _now()
    with get_connection() as connection:
        cursor = connection.execute(
            """
            UPDATE leads
            SET status      = 'replied',
                reply_text  = ?,
                accepted_at = COALESCE(accepted_at, ?),
                replied_at  = ?,
                updated_at  = ?
            WHERE id = ?
              AND status IN ('sent', 'accepted', 'replied')
              AND COALESCE(reply_text, '') <> ?
            """,
            (reply_text, now, now, now, lead_id, reply_text),
        )
    return cursor.rowcount > 0


def retry_failed() -> int:
    """Put every failed lead back in the queue."""
    with get_connection() as connection:
        cursor = connection.execute(
            "UPDATE leads SET status = 'pending', error = NULL, updated_at = ? WHERE status = 'failed'",
            (_now(),),
        )
    return cursor.rowcount


# --- Email fallback ---

def get_email_fallback_candidates(after_days: int, limit: int) -> list[dict]:
    """Leads LinkedIn did not reach, that have an email and were never emailed.

    That is: dispatch failed, or the invitation has gone unanswered for
    `after_days` days. Accepted and replied leads are never emailed.
    """
    cutoff = (datetime.now(timezone.utc) - timedelta(days=after_days)).isoformat(timespec="seconds")
    with get_connection() as connection:
        rows = connection.execute(
            """
            SELECT * FROM leads
            WHERE email IS NOT NULL
              AND emailed_at IS NULL
              AND (status = 'failed' OR (status = 'sent' AND sent_at <= ?))
            ORDER BY id
            LIMIT ?
            """,
            (cutoff, limit),
        ).fetchall()
    return [dict(row) for row in rows]


def mark_emailed(lead_id: int) -> None:
    now = _now()
    with get_connection() as connection:
        connection.execute(
            "UPDATE leads SET emailed_at = ?, updated_at = ? WHERE id = ?",
            (now, now, lead_id),
        )


# --- Settings (key/value, values stored as JSON) ---

def load_settings() -> dict:
    with get_connection() as connection:
        rows = connection.execute("SELECT key, value FROM settings").fetchall()
    return {row["key"]: json.loads(row["value"]) for row in rows}


def save_settings(values: dict) -> None:
    with get_connection() as connection:
        connection.executemany(
            """
            INSERT INTO settings (key, value) VALUES (?, ?)
            ON CONFLICT (key) DO UPDATE SET value = excluded.value
            """,
            [(key, json.dumps(value)) for key, value in values.items()],
        )

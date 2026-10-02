"""SQLite storage for leads.

A lead moves through these statuses:

    pending  -> sent      (dispatch sent a connection request)
    sent     -> accepted  (sync found them in our connections)
    sent/accepted -> replied (sync found a message from them)
    pending  -> failed    (dispatch could not send; see `error`)

Each function opens its own short-lived connection, so the module is safe
to use from API handlers and background tasks alike.
"""

import sqlite3
from contextlib import contextmanager
from datetime import datetime, timezone
from pathlib import Path

from backend import config

STATUS_PENDING = "pending"
STATUS_SENT = "sent"
STATUS_ACCEPTED = "accepted"
STATUS_REPLIED = "replied"
STATUS_FAILED = "failed"

SCHEMA = """
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
"""


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
    """Create the database file and tables if they do not exist yet."""
    config.DATABASE_PATH.parent.mkdir(parents=True, exist_ok=True)
    with get_connection() as connection:
        # WAL lets the dashboard read while a background task is writing.
        connection.execute("PRAGMA journal_mode=WAL")
        connection.executescript(SCHEMA)


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
                COALESCE(SUM(status = 'replied'),  0)          AS replied
            FROM leads
            """
        ).fetchone()
    return dict(row)


# --- Writing ---

def add_leads(urls: list[str]) -> dict:
    """Insert new leads. Returns how many were added, skipped and invalid."""
    added = 0
    duplicates = 0
    invalid: list[str] = []
    now = _now()

    with get_connection() as connection:
        for url in urls:
            profile_url = normalize_profile_url(url)
            if profile_url is None:
                if url.strip():
                    invalid.append(url.strip())
                continue

            cursor = connection.execute(
                """
                INSERT OR IGNORE INTO leads (profile_url, status, created_at, updated_at)
                VALUES (?, 'pending', ?, ?)
                """,
                (profile_url, now, now),
            )
            if cursor.rowcount:
                added += 1
            else:
                duplicates += 1

    return {"added": added, "duplicates": duplicates, "invalid": invalid}


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

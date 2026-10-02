"""Central settings for the lead dashboard.

Every value can be overridden from the environment or a `.env` file
placed in the `lead_dashboard/` folder. Settings you change often
(schedule, webhook, email) live in the database instead: see settings.py.
"""

import os
from pathlib import Path

from dotenv import load_dotenv

PROJECT_DIR = Path(__file__).resolve().parent.parent
load_dotenv(PROJECT_DIR / ".env")


def _int_setting(name: str, default: int) -> int:
    raw_value = os.environ.get(name, "").strip()
    return int(raw_value) if raw_value else default


def _bool_setting(name: str, default: bool) -> bool:
    raw_value = os.environ.get(name, "").strip().lower()
    if not raw_value:
        return default
    return raw_value in ("1", "true", "yes", "on")


# --- Paths ---
DATA_DIR = PROJECT_DIR / "data"
DATABASE_PATH = Path(os.environ.get("DATABASE_PATH", DATA_DIR / "leads.db"))
BROWSER_DATA_DIR = PROJECT_DIR / "browser_data"
FRONTEND_DIR = PROJECT_DIR / "frontend"

# --- AI ---
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "").strip()
GEMINI_MODEL = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash").strip()

# --- Browser automation ---
HEADLESS = _bool_setting("HEADLESS", False)
LOGIN_TIMEOUT_SECONDS = 90

# LinkedIn limits a connection note to 300 characters.
CONNECTION_NOTE_MAX_CHARS = 300

DISPATCH_DELAY_SECONDS = _int_setting("DISPATCH_DELAY_SECONDS", 20)
SYNC_MAX_CONVERSATIONS = _int_setting("SYNC_MAX_CONVERSATIONS", 30)

# --- Secrets (kept out of the database and never sent to the browser) ---
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD", "")
WEBHOOK_SECRET = os.environ.get("WEBHOOK_SECRET", "").strip()

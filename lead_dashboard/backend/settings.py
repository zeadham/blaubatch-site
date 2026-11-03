"""User-editable settings, stored in the database and edited from the dashboard.

Secrets (the SMTP password and the webhook signing secret) are NOT stored
here: they stay in `.env`, so they are never sent to the browser or saved
in the database. The API only reports whether they are set.
"""

import logging

from pydantic import BaseModel, Field, HttpUrl, ValidationError, field_validator

from backend import database

logger = logging.getLogger(__name__)

DEFAULT_EMAIL_SUBJECT = "Connecting from LinkedIn"
DEFAULT_EMAIL_BODY = """Hi {first_name},

I tried to connect with you on LinkedIn but wanted to reach out directly as well.

{message}

Best regards"""

# Placeholders that may appear in the email subject and body.
EMAIL_PLACEHOLDERS = ("name", "first_name", "headline", "message", "profile_url")


class Settings(BaseModel):
    # --- Step 1: automation schedule ---
    scheduler_enabled: bool = False
    dispatch_interval_minutes: int = Field(default=240, ge=15, le=10080)
    sync_interval_minutes: int = Field(default=60, ge=15, le=10080)
    dispatch_max_per_run: int = Field(default=10, ge=1, le=50)

    # --- Step 2: webhook ---
    webhook_enabled: bool = False
    webhook_url: str = ""

    # --- Step 3: email fallback ---
    email_fallback_enabled: bool = False
    email_fallback_after_days: int = Field(default=7, ge=1, le=90)
    email_max_per_run: int = Field(default=20, ge=1, le=200)
    smtp_host: str = ""
    smtp_port: int = Field(default=587, ge=1, le=65535)
    smtp_username: str = ""
    smtp_from: str = ""
    smtp_starttls: bool = True
    email_subject: str = Field(default=DEFAULT_EMAIL_SUBJECT, max_length=200)
    email_body: str = Field(default=DEFAULT_EMAIL_BODY, max_length=5000)

    @field_validator("webhook_url", "smtp_host", "smtp_username", "smtp_from")
    @classmethod
    def strip_whitespace(cls, value: str) -> str:
        return value.strip()

    @field_validator("webhook_url")
    @classmethod
    def check_webhook_url(cls, value: str) -> str:
        if value:
            HttpUrl(value)  # raises a clear validation error for bad URLs
        return value

    @field_validator("smtp_from")
    @classmethod
    def check_sender(cls, value: str) -> str:
        if value and database.normalize_email(value) is None:
            raise ValueError("Enter a valid sender email address.")
        return value

    @field_validator("email_subject", "email_body")
    @classmethod
    def check_placeholders(cls, value: str) -> str:
        try:
            value.format(**{name: "" for name in EMAIL_PLACEHOLDERS})
        except (KeyError, IndexError, ValueError) as exc:
            allowed = ", ".join("{" + name + "}" for name in EMAIL_PLACEHOLDERS)
            raise ValueError(f"Unknown or broken placeholder. Allowed: {allowed}") from exc
        return value


def get_settings() -> Settings:
    """Saved settings, with defaults for anything never saved."""
    stored = database.load_settings()
    known = {key: value for key, value in stored.items() if key in Settings.model_fields}
    try:
        return Settings(**known)
    except ValidationError as exc:
        # A saved value no longer passes validation (e.g. after an upgrade).
        # Fall back to the default for just those fields instead of crashing.
        bad_fields = {error["loc"][0] for error in exc.errors() if error["loc"]}
        logger.warning("Ignoring invalid saved settings: %s", ", ".join(sorted(map(str, bad_fields))))
        return Settings(**{key: value for key, value in known.items() if key not in bad_fields})


def save_settings(new_settings: Settings) -> Settings:
    database.save_settings(new_settings.model_dump())
    return new_settings

"""Writes personalised connection notes with Gemini.

Based on the prompt from the original `linkedin_agent` bulk script.
"""

import logging

from backend import config

logger = logging.getLogger(__name__)

PROMPT_TEMPLATE = """
You are an expert at writing hyper-personalized, authentic LinkedIn connection requests.
Keep it under {max_chars} characters. Reference something specific from their headline.
No robotic words like 'synergy', 'transformative', 'delve'.

Name: {name}
Headline: {headline}

Output ONLY the exact message. Do not include your own thoughts or explanations.
"""


class AIConfigError(Exception):
    pass


_client = None


def _get_client():
    """Create the Gemini client on first use, so the app starts without a key."""
    global _client
    if _client is not None:
        return _client

    if not config.GEMINI_API_KEY:
        raise AIConfigError("GEMINI_API_KEY is not set. Add it to lead_dashboard/.env.")

    from google import genai

    _client = genai.Client(api_key=config.GEMINI_API_KEY)
    return _client


def generate_connection_note(name: str | None, headline: str | None) -> str:
    prompt = PROMPT_TEMPLATE.format(
        max_chars=config.CONNECTION_NOTE_MAX_CHARS,
        name=name or "N/A",
        headline=headline or "N/A",
    )
    response = _get_client().models.generate_content(
        model=config.GEMINI_MODEL,
        contents=prompt,
    )
    note = " ".join((response.text or "").split())
    if not note:
        raise ValueError("Gemini returned an empty message.")

    # LinkedIn rejects notes over the limit, so never send one that is too long.
    return note[: config.CONNECTION_NOTE_MAX_CHARS]

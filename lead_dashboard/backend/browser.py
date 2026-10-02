"""Opens the persistent LinkedIn browser session.

Ported from `linkedin_agent/scraper.py`. The profile in `browser_data/`
keeps the login cookies, so you only log in by hand the first time.

Only call `linkedin_session()` from inside a TaskRunner job: it assumes
nobody else has the profile open.
"""

import asyncio
import logging
from contextlib import asynccontextmanager

from playwright.async_api import Page, async_playwright

from backend import config

logger = logging.getLogger(__name__)

FEED_URL = "https://www.linkedin.com/feed/"
LOGIN_URL = "https://www.linkedin.com/login"


class LoginRequiredError(Exception):
    pass


@asynccontextmanager
async def linkedin_session():
    """Yield a logged-in Playwright page, closing the browser afterwards."""
    config.BROWSER_DATA_DIR.mkdir(parents=True, exist_ok=True)

    async with async_playwright() as playwright:
        context = await playwright.chromium.launch_persistent_context(
            user_data_dir=str(config.BROWSER_DATA_DIR),
            headless=config.HEADLESS,
            args=["--disable-blink-features=AutomationControlled"],
        )
        try:
            page = context.pages[0] if context.pages else await context.new_page()
            await ensure_logged_in(page)
            yield page
        finally:
            await context.close()


async def ensure_logged_in(page: Page) -> None:
    """Wait for a manual login if the saved session has expired."""
    await page.goto(FEED_URL, wait_until="domcontentloaded")
    await asyncio.sleep(3)  # let LinkedIn redirect to /login if needed

    if "feed" in page.url:
        logger.info("Already logged in to LinkedIn.")
        return

    logger.warning(
        "LinkedIn login required: log in within %s seconds in the browser window.",
        config.LOGIN_TIMEOUT_SECONDS,
    )
    await page.goto(LOGIN_URL, wait_until="domcontentloaded")
    try:
        await page.wait_for_url("**/feed/**", timeout=config.LOGIN_TIMEOUT_SECONDS * 1000)
    except Exception as exc:
        raise LoginRequiredError(
            "Not logged in to LinkedIn. Run again and log in in the browser window."
        ) from exc


async def read_text(page: Page, selector: str, timeout_ms: int = 3000) -> str | None:
    """Return the cleaned text of the first match, or None if it is missing."""
    try:
        text = await page.locator(selector).first.text_content(timeout=timeout_ms)
    except Exception:
        return None
    if text is None:
        return None
    return " ".join(text.split()) or None

"""Dispatch: scrape each pending lead, write a note, send a connection request.

Ported from `linkedin_agent/bulk_agent.py` and `scraper.py`.

LinkedIn renames its CSS classes from time to time. All selectors live at
the top of this file so they are easy to update in one place.
"""

import asyncio
import logging

from playwright.async_api import Page

from backend import ai, config, database
from backend.browser import linkedin_session, read_text

logger = logging.getLogger(__name__)

NAME_SELECTOR = "h1"
HEADLINE_SELECTOR = "div.text-body-medium.break-words"

CONNECT_BUTTON = "main button[aria-label^='Invite'][aria-label$='to connect']"
MORE_ACTIONS_BUTTON = "main button[aria-label='More actions']"
CONNECT_IN_MORE_MENU = "main div[role='button'][aria-label^='Invite'][aria-label$='to connect']"
PENDING_BUTTON = "main button[aria-label^='Pending']"

ADD_NOTE_BUTTON = "button[aria-label='Add a note']"
NOTE_TEXTAREA = "textarea[name='message']"
SEND_BUTTON = "button[aria-label='Send invitation'], button[aria-label='Send now']"


class AlreadyInvitedError(Exception):
    """The lead already has a pending invitation from us."""


async def run_dispatch() -> dict:
    """Process up to DISPATCH_MAX_PER_RUN pending leads. Runs under the browser lock."""
    leads = database.get_leads_by_status(database.STATUS_PENDING, limit=config.DISPATCH_MAX_PER_RUN)
    summary = {"processed": 0, "sent": 0, "failed": 0}
    if not leads:
        return summary

    async with linkedin_session() as page:
        for index, lead in enumerate(leads):
            summary["processed"] += 1
            try:
                await _dispatch_one(page, lead)
                database.mark_sent(lead["id"])
                summary["sent"] += 1
            except AlreadyInvitedError:
                database.mark_sent(lead["id"])
                summary["sent"] += 1
            except Exception as exc:
                logger.warning("Dispatch failed for %s: %s", lead["profile_url"], exc)
                database.mark_failed(lead["id"], str(exc) or exc.__class__.__name__)
                summary["failed"] += 1

            is_last_lead = index == len(leads) - 1
            if not is_last_lead:
                # Pause between leads to keep the account safe.
                await asyncio.sleep(config.DISPATCH_DELAY_SECONDS)

    return summary


async def _dispatch_one(page: Page, lead: dict) -> None:
    await page.goto(lead["profile_url"], wait_until="domcontentloaded")
    await asyncio.sleep(4)  # let the profile's dynamic content render

    name = await read_text(page, NAME_SELECTOR) or lead.get("name")
    headline = await read_text(page, HEADLINE_SELECTOR) or lead.get("headline")

    # Reuse a note from an earlier attempt instead of paying for a new one.
    message = lead.get("message")
    if not message:
        # The Gemini client is blocking, so keep it off the event loop.
        message = await asyncio.to_thread(ai.generate_connection_note, name, headline)

    database.save_profile(lead["id"], name, headline, message)
    await _send_invitation(page, message)


async def _send_invitation(page: Page, message: str) -> None:
    await _open_connect_dialog(page)

    await page.locator(ADD_NOTE_BUTTON).click(timeout=5000)
    await page.locator(NOTE_TEXTAREA).fill(message, timeout=5000)
    await asyncio.sleep(1)
    await page.locator(SEND_BUTTON).first.click(timeout=5000)

    # The dialog closes once LinkedIn accepts the invitation.
    await page.locator(NOTE_TEXTAREA).wait_for(state="detached", timeout=10000)


async def _open_connect_dialog(page: Page) -> None:
    if await _is_visible(page, PENDING_BUTTON):
        raise AlreadyInvitedError()

    if await _is_visible(page, CONNECT_BUTTON):
        await page.locator(CONNECT_BUTTON).first.click()
        return

    # On some profiles "Connect" is hidden under the "More" menu.
    if await _is_visible(page, MORE_ACTIONS_BUTTON):
        await page.locator(MORE_ACTIONS_BUTTON).first.click()
        await asyncio.sleep(1)
        if await _is_visible(page, CONNECT_IN_MORE_MENU):
            await page.locator(CONNECT_IN_MORE_MENU).first.click()
            return

    raise RuntimeError("No Connect button found (already connected, or LinkedIn changed its layout).")


async def _is_visible(page: Page, selector: str) -> bool:
    try:
        return await page.locator(selector).first.is_visible(timeout=2000)
    except Exception:
        return False

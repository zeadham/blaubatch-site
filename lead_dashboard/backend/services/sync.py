"""Sync: check which invitations were accepted and who replied.

Two passes, both inside one browser session:

  1. Connections page -> any 'sent' lead now in our connections is 'accepted'.
  2. Messaging inbox  -> the newest message a lead sent us becomes `reply_text`.

The inbox links people by an internal ID rather than their /in/ URL, so
conversations are matched to leads by the name dispatch scraped.

LinkedIn renames its CSS classes from time to time. All selectors live at
the top of this file so they are easy to update in one place.
"""

import asyncio
import logging

from playwright.async_api import Page

from backend import config, database
from backend.browser import linkedin_session

logger = logging.getLogger(__name__)

CONNECTIONS_URL = "https://www.linkedin.com/mynetwork/invite-connect/connections/"
MESSAGING_URL = "https://www.linkedin.com/messaging/"

CONVERSATION_ITEM = "li.msg-conversation-listitem"
CONVERSATION_NAME = ".msg-conversation-listitem__participant-names"
CONVERSATION_LINK = ".msg-conversation-listitem__link"
MESSAGE_EVENT = "li.msg-s-message-list__event"

# Runs in the page: returns [{"sender": ..., "text": ...}, ...] oldest first.
# LinkedIn shows the sender's name only on the first message of a group,
# so later messages in the group inherit the last name seen.
READ_THREAD_JS = """
(eventSelector) => {
    const messages = [];
    let sender = null;
    for (const event of document.querySelectorAll(eventSelector)) {
        const nameEl = event.querySelector('.msg-s-message-group__name');
        if (nameEl) sender = nameEl.innerText.trim();
        for (const body of event.querySelectorAll('.msg-s-event-listitem__body')) {
            const text = body.innerText.trim();
            if (text) messages.push({ sender: sender, text: text });
        }
    }
    return messages;
}
"""


def normalize_name(name: str | None) -> str:
    return " ".join((name or "").split()).lower()


def latest_reply_from(messages: list[dict], lead_name: str) -> str | None:
    """Return the newest message the lead sent, or None if they never wrote."""
    wanted = normalize_name(lead_name)
    for message in reversed(messages):
        if normalize_name(message.get("sender")) == wanted:
            return message["text"]
    return None


async def run_sync() -> dict:
    """Update accepted/replied statuses. Runs under the browser lock."""
    summary = {"accepted": 0, "replied": 0}
    awaiting = (
        database.get_leads_by_status(database.STATUS_SENT)
        + database.get_leads_by_status(database.STATUS_ACCEPTED)
        + database.get_leads_by_status(database.STATUS_REPLIED)
    )
    if not awaiting:
        return summary

    async with linkedin_session() as page:
        summary["accepted"] = await _sync_accepted(page)
        summary["replied"] = await _sync_replies(page)
    return summary


async def _sync_accepted(page: Page) -> int:
    sent_leads = database.get_leads_by_status(database.STATUS_SENT)
    if not sent_leads:
        return 0

    await page.goto(CONNECTIONS_URL, wait_until="domcontentloaded")
    await asyncio.sleep(4)
    # The list is sorted newest first and lazy-loads, so a few scrolls
    # cover everyone who accepted recently.
    for _ in range(5):
        await page.mouse.wheel(0, 2000)
        await asyncio.sleep(1.5)

    hrefs = await page.eval_on_selector_all(
        "main a[href*='/in/']", "links => links.map(link => link.href)"
    )
    connected_urls = {database.normalize_profile_url(href) for href in hrefs}

    accepted = 0
    for lead in sent_leads:
        if lead["profile_url"] in connected_urls and database.mark_accepted(lead["id"]):
            accepted += 1
    return accepted


async def _sync_replies(page: Page) -> int:
    leads_by_name = {}
    for status in (database.STATUS_SENT, database.STATUS_ACCEPTED, database.STATUS_REPLIED):
        for lead in database.get_leads_by_status(status):
            if lead.get("name"):
                leads_by_name[normalize_name(lead["name"])] = lead
    if not leads_by_name:
        return 0

    await page.goto(MESSAGING_URL, wait_until="domcontentloaded")
    await asyncio.sleep(4)

    conversations = page.locator(CONVERSATION_ITEM)
    count = min(await conversations.count(), config.SYNC_MAX_CONVERSATIONS)

    replied = 0
    for index in range(count):
        conversation = conversations.nth(index)
        try:
            name = await conversation.locator(CONVERSATION_NAME).first.inner_text(timeout=2000)
        except Exception:
            continue

        lead = leads_by_name.get(normalize_name(name))
        if lead is None:
            continue

        try:
            await conversation.locator(CONVERSATION_LINK).first.click(timeout=3000)
            await asyncio.sleep(2.5)
            messages = await page.evaluate(READ_THREAD_JS, MESSAGE_EVENT)
        except Exception as exc:
            logger.warning("Could not read conversation with %s: %s", name, exc)
            continue

        reply_text = latest_reply_from(messages, lead["name"])
        if reply_text and database.mark_replied(lead["id"], reply_text):
            replied += 1

    return replied

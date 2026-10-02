# Blau Batch Lead Dashboard

A local web dashboard for LinkedIn lead generation, ported from `../linkedin_agent`.

- **Backend:** FastAPI + SQLite (`data/leads.db`)
- **Browser automation:** Playwright, reusing one persistent Chromium profile (`browser_data/`)
- **AI:** Gemini writes each connection note
- **Automation:** APScheduler, running inside the FastAPI process (no Celery or Redis)
- **Integrations:** outgoing webhooks and SMTP email fallback
- **Frontend:** plain HTML, CSS and JavaScript (`frontend/`), served by FastAPI

## Run it (Windows)

**Easiest:** double-click `start.bat` in this folder. The first run installs
everything (a few minutes) and opens Notepad so you can paste your
`GEMINI_API_KEY`. After that it starts the dashboard and opens your browser.
Use the same file every time you want to start it.

**By hand**, from this folder:

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
playwright install chromium
copy .env.example .env        # then fill in GEMINI_API_KEY (and SMTP_PASSWORD for email)
python run.py
```

Open http://127.0.0.1:8000. The first time a task opens the browser, log in to
LinkedIn in that window. The session is saved in `browser_data/`.

Use `python run.py`, not `uvicorn --reload`: on Windows, reload mode uses an
event loop that cannot start Playwright's browser.

## How it works

| Step | What happens |
|---|---|
| **Add leads** | Paste profile URLs, one per line, optionally followed by an email (`url, email`). Stored as `pending`; duplicates are skipped. Emails can also be added per lead in the table. |
| **Dispatch** | For up to "Max invitations per dispatch" (Settings) pending leads: open the profile, scrape name + headline, have Gemini write a note, send the connection request. → `sent`, or `failed` with the reason. |
| **Sync Inbox** | Reads your connections list (`sent` → `accepted`) and your newest inbox conversations (`reply_text` saved, → `replied`), then runs the email fallback. |
| **Email fallback** | Emails a lead once if its invitation failed, or got no answer within the waiting period, and it has an email address. Accepted and replied leads are never emailed. |
| **Webhooks** | `lead.accepted`, `lead.replied` and `lead.emailed` are POSTed to your webhook URL. |

### Settings

Click the gear icon. Everything there is saved in the database and applied
immediately, with no restart:

- **Automation:** turn the schedule on, and set how often dispatch and sync run.
- **Webhook:** URL, plus a "Send test event" button and a log of recent deliveries.
- **Email fallback:** waiting period, SMTP server, sender, and the subject/body
  template (placeholders `{name}`, `{first_name}`, `{headline}`, `{message}`,
  `{profile_url}`), plus a "Send test email" button.

Secrets never go through the dashboard. Put them in `.env`:
`SMTP_PASSWORD` (for Gmail, use an App Password) and, optionally,
`WEBHOOK_SECRET` to sign webhook requests.

### Automation

`backend/scheduler.py` starts an APScheduler `AsyncIOScheduler` in the app's
lifespan, so it runs only while `python run.py` is running. Scheduled runs use
the same task runner as the buttons: if a task is already running when a timer
fires, that run is skipped (never queued), and the next tick tries again. The
first run happens one interval after start-up, never immediately.

### Webhooks

Each event is sent as its own background task with a 10-second timeout and
up to 3 attempts. Sync never waits for it, so an offline webhook can't slow
down or crash the sync. Failures are logged and shown under "Recent deliveries".

```json
{"event": "lead.replied", "sent_at": "2026-10-02T14:05:00+00:00",
 "lead": {"id": 7, "name": "Jane Doe", "profile_url": "...", "email": "...",
          "status": "replied", "reply_text": "...", "...": "..."}}
```

With `WEBHOOK_SECRET` set, each request has an `X-Signature-SHA256` header:
the hex HMAC-SHA256 of the raw request body.

### Database upgrades

Schema changes are numbered migrations in `backend/database.py` (`MIGRATIONS`),
tracked with SQLite's `PRAGMA user_version`. On start-up, any pending
migrations run in order, each in its own transaction (all or nothing). Before
upgrading an existing database, a copy is saved as `data/leads.v<N>.backup.db`.
A Phase 2 database is upgraded in place, and all its leads are kept.

### One browser task at a time

Dispatch and sync share the same Chromium profile, so they must never run
together. Both go through `backend/tasks.py`:

- the API claims the runner before starting a task, so two clicks can never both start one;
- a request while a task is running gets **HTTP 409** (the UI shows the message and disables both buttons);
- the job itself runs inside an `asyncio.Lock` as a second safety net.

## API

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/leads` | All leads, most recently updated first |
| POST | `/api/leads` | `{"urls": [...]}`: add leads (each entry: URL, optionally followed by an email) |
| PATCH | `/api/leads/{id}` | `{"email": "..."}`: set or clear (`""`) a lead's email |
| DELETE | `/api/leads/{id}` | Remove a lead |
| POST | `/api/leads/retry-failed` | Move failed leads back to pending |
| GET | `/api/analytics` | `{total, pending, sent, accepted, replied, emailed}` from one SQL query |
| POST | `/api/dispatch` | Start dispatch (202, or 409 if a task is running) |
| POST | `/api/sync` | Start inbox sync + email fallback (202, or 409 if a task is running) |
| GET | `/api/tasks/status` | `{running, last_run, scheduler: {jobs: [{id, next_run_at}]}}` |
| GET / PUT | `/api/settings` | Read or save settings (422 with details if invalid) |
| POST | `/api/settings/test-webhook` | `{"url": "..."}`: send a test event now |
| POST | `/api/settings/test-email` | `{"to": "..."}`: send a test email with the saved settings |

Interactive docs: http://127.0.0.1:8000/docs

## Tests

```bash
python -m pytest
```

The tests use a temporary database, fake browser jobs, a mock HTTP transport
and a fake SMTP sender, so they never open LinkedIn, call a real webhook or
send real email.

## When LinkedIn changes its layout

All CSS selectors are listed at the top of `backend/services/dispatch.py` and
`backend/services/sync.py`. If dispatch starts failing with "No Connect button
found", or sync finds no replies, update the selectors there first.

Inbox conversations are matched to leads **by name**, because LinkedIn's inbox
links people by an internal ID rather than their profile URL. Leads without a
scraped name (never dispatched) cannot be matched.

## Never commit

`.env`, `browser_data/` (your LinkedIn login) and `data/` (your leads). All
three are in the repository's `.gitignore`.

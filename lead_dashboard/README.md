# Blau Batch Lead Dashboard

A local web dashboard for LinkedIn lead generation, ported from `../linkedin_agent`.

- **Backend:** FastAPI + SQLite (`data/leads.db`)
- **Browser automation:** Playwright, reusing one persistent Chromium profile (`browser_data/`)
- **AI:** Gemini writes each connection note
- **Frontend:** plain HTML, CSS and JavaScript (`frontend/`), served by FastAPI

## Run it (Windows, from this folder)

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
playwright install chromium
copy .env.example .env        # then put your GEMINI_API_KEY in .env
python run.py
```

Open http://127.0.0.1:8000. The first time a task opens the browser, log in to
LinkedIn in that window. The session is saved in `browser_data/`.

Use `python run.py`, not `uvicorn --reload`: on Windows, reload mode uses an
event loop that cannot start Playwright's browser.

## How it works

| Step | What happens |
|---|---|
| **Add leads** | Paste profile URLs. They are normalised and stored as `pending` (duplicates are skipped). |
| **Dispatch** | For up to `DISPATCH_MAX_PER_RUN` pending leads: open the profile, scrape name + headline, have Gemini write a note, send the connection request. → `sent`, or `failed` with the reason. |
| **Sync Inbox** | Reads your connections list (`sent` → `accepted`) and your newest inbox conversations (`reply_text` saved, → `replied`). |

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
| POST | `/api/leads` | `{"urls": [...]}`: add leads |
| DELETE | `/api/leads/{id}` | Remove a lead |
| POST | `/api/leads/retry-failed` | Move failed leads back to pending |
| GET | `/api/analytics` | `{total, pending, sent, accepted, replied}` from one SQL query |
| POST | `/api/dispatch` | Start dispatch (202, or 409 if a task is running) |
| POST | `/api/sync` | Start inbox sync (202, or 409 if a task is running) |
| GET | `/api/tasks/status` | `{running, last_run}` |

Interactive docs: http://127.0.0.1:8000/docs

## Tests

```bash
python -m pytest
```

The tests use a temporary database and fake browser jobs, so they never open LinkedIn.

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

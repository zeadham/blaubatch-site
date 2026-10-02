"""FastAPI app: JSON API under /api, and the dashboard at /."""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from backend import config, database, scheduler, settings, webhooks
from backend.services.dispatch import run_dispatch
from backend.services.email_fallback import send_test_email
from backend.services.sync import run_sync_and_email_fallback
from backend.tasks import TaskBusyError, task_runner

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")


@asynccontextmanager
async def lifespan(app: FastAPI):
    database.init_db()
    scheduler.start(settings.get_settings())
    yield
    scheduler.shutdown()
    await task_runner.wait()
    await webhooks.wait_for_deliveries()


app = FastAPI(title="Blau Batch Lead Dashboard", lifespan=lifespan)


class AddLeadsRequest(BaseModel):
    # One lead per entry: a profile URL, optionally followed by an email.
    urls: list[str]


class UpdateLeadRequest(BaseModel):
    email: str | None = None


class TestWebhookRequest(BaseModel):
    url: str


class TestEmailRequest(BaseModel):
    to: str


def _start_browser_task(name: str, job) -> dict:
    try:
        task_runner.start(name, job)
    except TaskBusyError as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from exc
    return {"started": name}


# --- Leads ---

@app.get("/api/leads")
def get_leads() -> list[dict]:
    return database.list_leads()


@app.post("/api/leads")
def add_leads(request: AddLeadsRequest) -> dict:
    return database.add_leads(request.urls)


@app.patch("/api/leads/{lead_id}")
def update_lead(lead_id: int, request: UpdateLeadRequest) -> dict:
    email = None
    if request.email and request.email.strip():
        email = database.normalize_email(request.email)
        if email is None:
            raise HTTPException(status_code=422, detail="That does not look like an email address.")

    if not database.set_email(lead_id, email):
        raise HTTPException(status_code=404, detail="Lead not found.")
    return database.get_lead(lead_id)


@app.delete("/api/leads/{lead_id}")
def delete_lead(lead_id: int) -> dict:
    if not database.delete_lead(lead_id):
        raise HTTPException(status_code=404, detail="Lead not found.")
    return {"deleted": lead_id}


@app.post("/api/leads/retry-failed")
def retry_failed() -> dict:
    return {"requeued": database.retry_failed()}


# --- Analytics ---

@app.get("/api/analytics")
def get_analytics() -> dict:
    return database.get_analytics()


# --- Browser tasks (never run at the same time; see backend/tasks.py) ---

@app.post("/api/dispatch", status_code=202)
async def start_dispatch() -> dict:
    return _start_browser_task("dispatch", run_dispatch)


@app.post("/api/sync", status_code=202)
async def start_sync() -> dict:
    return _start_browser_task("sync", run_sync_and_email_fallback)


@app.get("/api/tasks/status")
def get_task_status() -> dict:
    return {**task_runner.status(), "scheduler": scheduler.status()}


# --- Settings ---

def _settings_response(current: settings.Settings) -> dict:
    return {
        "settings": current.model_dump(),
        "secrets": {
            "smtp_password_set": bool(config.SMTP_PASSWORD),
            "webhook_secret_set": bool(config.WEBHOOK_SECRET),
        },
        "placeholders": list(settings.EMAIL_PLACEHOLDERS),
        "webhook_log": list(webhooks.delivery_log),
    }


@app.get("/api/settings")
def get_settings() -> dict:
    return _settings_response(settings.get_settings())


@app.put("/api/settings")
async def update_settings(new_settings: settings.Settings) -> dict:
    saved = settings.save_settings(new_settings)
    scheduler.apply_settings(saved)
    return _settings_response(saved)


@app.post("/api/settings/test-webhook")
async def test_webhook(request: TestWebhookRequest) -> dict:
    url = request.url.strip()
    try:
        settings.Settings(webhook_url=url)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail="Enter a valid webhook URL.") from exc
    return await webhooks.send_test(url)


@app.post("/api/settings/test-email")
async def test_email(request: TestEmailRequest) -> dict:
    to_address = database.normalize_email(request.to)
    if to_address is None:
        raise HTTPException(status_code=422, detail="Enter a valid email address to send the test to.")
    try:
        await send_test_email(to_address)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Could not send the test email: {exc}") from exc
    return {"sent_to": to_address}


# --- Dashboard ---

@app.get("/", include_in_schema=False)
def dashboard() -> FileResponse:
    return FileResponse(config.FRONTEND_DIR / "index.html")


app.mount("/static", StaticFiles(directory=config.FRONTEND_DIR), name="static")

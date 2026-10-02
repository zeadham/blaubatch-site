"""FastAPI app: JSON API under /api, and the dashboard at /."""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from backend import config, database
from backend.services.dispatch import run_dispatch
from backend.services.sync import run_sync
from backend.tasks import TaskBusyError, task_runner

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")


@asynccontextmanager
async def lifespan(app: FastAPI):
    database.init_db()
    yield
    await task_runner.wait()


app = FastAPI(title="Blau Batch Lead Dashboard", lifespan=lifespan)


class AddLeadsRequest(BaseModel):
    urls: list[str]


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
    return _start_browser_task("sync", run_sync)


@app.get("/api/tasks/status")
def get_task_status() -> dict:
    return task_runner.status()


# --- Dashboard ---

@app.get("/", include_in_schema=False)
def dashboard() -> FileResponse:
    return FileResponse(config.FRONTEND_DIR / "index.html")


app.mount("/static", StaticFiles(directory=config.FRONTEND_DIR), name="static")

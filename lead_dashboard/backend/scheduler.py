"""Runs dispatch and sync automatically on a timer.

Uses APScheduler's AsyncIOScheduler, which lives inside FastAPI's own event
loop: it is started and stopped by the app's lifespan (see main.py), so no
separate worker process, Redis or Celery is needed.

Scheduled runs go through the same TaskRunner as the dashboard buttons, so
the browser lock still applies. If a task is already running when a timer
fires, that run is simply skipped; the next tick will try again.

The schedule comes from the Settings window. Saving settings calls
`apply_settings()`, which rebuilds the jobs with the new intervals.
"""

import logging
from datetime import datetime

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.interval import IntervalTrigger

from backend.services.dispatch import run_dispatch
from backend.services.sync import run_sync_and_email_fallback
from backend.settings import Settings
from backend.tasks import task_runner

logger = logging.getLogger(__name__)

DISPATCH_JOB_ID = "dispatch"
SYNC_JOB_ID = "sync"

_scheduler: AsyncIOScheduler | None = None


async def _scheduled_dispatch() -> None:
    if not task_runner.try_start("dispatch", run_dispatch, trigger="schedule"):
        logger.info("Scheduled dispatch skipped: '%s' is running.", task_runner.running_task)


async def _scheduled_sync() -> None:
    if not task_runner.try_start("sync", run_sync_and_email_fallback, trigger="schedule"):
        logger.info("Scheduled sync skipped: '%s' is running.", task_runner.running_task)


def start(current: Settings) -> None:
    """Start the scheduler. Call from inside the running event loop (app lifespan)."""
    global _scheduler
    _scheduler = AsyncIOScheduler(
        job_defaults={
            "coalesce": True,          # after a sleep/pause, run once, not once per missed tick
            "max_instances": 1,
            "misfire_grace_time": 300,
        }
    )
    _scheduler.start()
    apply_settings(current)


def shutdown() -> None:
    global _scheduler
    if _scheduler is not None:
        _scheduler.shutdown(wait=False)
        _scheduler = None


def apply_settings(current: Settings) -> None:
    """(Re)create the jobs from the current settings."""
    if _scheduler is None:
        return

    _scheduler.remove_all_jobs()
    if not current.scheduler_enabled:
        logger.info("Automation is off.")
        return

    # The first run happens one interval from now, never right at startup.
    _scheduler.add_job(
        _scheduled_dispatch,
        IntervalTrigger(minutes=current.dispatch_interval_minutes),
        id=DISPATCH_JOB_ID,
        name="Dispatch",
    )
    _scheduler.add_job(
        _scheduled_sync,
        IntervalTrigger(minutes=current.sync_interval_minutes),
        id=SYNC_JOB_ID,
        name="Sync inbox + email fallback",
    )
    logger.info(
        "Automation on: dispatch every %s min, sync every %s min.",
        current.dispatch_interval_minutes,
        current.sync_interval_minutes,
    )


def status() -> dict:
    """Next run time for each job, for the dashboard."""
    if _scheduler is None:
        return {"running": False, "jobs": []}

    jobs = []
    for job in _scheduler.get_jobs():
        next_run: datetime | None = job.next_run_time
        jobs.append({
            "id": job.id,
            "name": job.name,
            "next_run_at": next_run.isoformat(timespec="seconds") if next_run else None,
        })
    return {"running": True, "jobs": jobs}

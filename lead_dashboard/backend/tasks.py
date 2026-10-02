"""Runs browser tasks in the background, one at a time.

Dispatch and sync both drive the same persistent Chromium profile
(`browser_data/`). Chromium refuses to open one profile twice, and two
tasks clicking around the same LinkedIn session would corrupt each other,
so every browser task goes through the single `TaskRunner` below.

How the lock works:
  * `start()` is called from an API handler. It checks and claims the
    runner in the same synchronous step (no `await` in between), so two
    requests arriving together can never both start a task.
  * A second request while a task runs gets `TaskBusyError`, which the
    API turns into HTTP 409, instead of silently queueing up.
  * The job itself also runs inside an `asyncio.Lock`, as a safety net in
    case anything ever calls `run_exclusive()` directly.
"""

import asyncio
import logging
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Awaitable, Callable

logger = logging.getLogger(__name__)

TaskJob = Callable[[], Awaitable[dict]]


class TaskBusyError(Exception):
    """Raised when a browser task is requested while another one is running."""

    def __init__(self, running_task: str):
        super().__init__(f"The '{running_task}' task is already running.")
        self.running_task = running_task


@dataclass
class TaskResult:
    name: str
    trigger: str
    started_at: str
    finished_at: str | None = None
    result: dict = field(default_factory=dict)
    error: str | None = None


def _now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


class TaskRunner:
    def __init__(self) -> None:
        self._browser_lock = asyncio.Lock()
        self._running_name: str | None = None
        self._current: asyncio.Task | None = None
        self.last_run: TaskResult | None = None

    @property
    def running_task(self) -> str | None:
        return self._running_name

    def start(self, name: str, job: TaskJob, trigger: str = "manual") -> None:
        """Start `job` in the background, or raise TaskBusyError.

        `trigger` records who asked for the run ("manual" or "schedule").
        """
        if self._running_name is not None:
            raise TaskBusyError(self._running_name)

        # Claim the runner before yielding to the event loop.
        self._running_name = name
        self._current = asyncio.create_task(self._run(name, job, trigger))

    def try_start(self, name: str, job: TaskJob, trigger: str = "manual") -> bool:
        """Like start(), but returns False instead of raising when busy."""
        try:
            self.start(name, job, trigger)
        except TaskBusyError:
            return False
        return True

    async def _run(self, name: str, job: TaskJob, trigger: str) -> None:
        record = TaskResult(name=name, trigger=trigger, started_at=_now())
        self.last_run = record
        try:
            record.result = await self.run_exclusive(job)
        except Exception as exc:  # report any failure to the dashboard
            logger.exception("Task '%s' failed", name)
            record.error = str(exc) or exc.__class__.__name__
        finally:
            record.finished_at = _now()
            self._running_name = None
            self._current = None

    async def run_exclusive(self, job: TaskJob) -> dict:
        """Run `job` while holding the browser lock."""
        async with self._browser_lock:
            return await job()

    def status(self) -> dict:
        last_run = None
        if self.last_run is not None:
            last_run = {
                "name": self.last_run.name,
                "trigger": self.last_run.trigger,
                "started_at": self.last_run.started_at,
                "finished_at": self.last_run.finished_at,
                "result": self.last_run.result,
                "error": self.last_run.error,
            }
        return {"running": self._running_name, "last_run": last_run}

    async def wait(self) -> None:
        """Wait for the current task to finish (used by tests and shutdown)."""
        if self._current is not None:
            await asyncio.gather(self._current, return_exceptions=True)


task_runner = TaskRunner()

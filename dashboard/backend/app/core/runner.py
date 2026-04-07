import asyncio
import logging
from dataclasses import dataclass
from datetime import datetime, timezone

from app.core.routine_config import get_routine_config

logger = logging.getLogger("evo-dashboard.runner")


@dataclass
class RoutineResult:
    name: str
    status: str  # success, failure, timeout
    duration_secs: float
    return_code: int
    retry_count: int
    error_summary: str | None
    stdout_lines: int
    started_at: datetime
    finished_at: datetime


async def _run_once(name: str, script: str, timeout: int) -> tuple[int, str, str]:
    try:
        proc = await asyncio.create_subprocess_exec(
            "uv", "run", "python", script,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )
        stdout, stderr = await asyncio.wait_for(proc.communicate(), timeout=timeout)
        return proc.returncode or 0, stdout.decode(), stderr.decode()
    except asyncio.TimeoutError:
        proc.kill()
        await proc.wait()
        return -1, "", f"Timeout after {timeout}s"


async def run_adw(name: str, script: str) -> RoutineResult:
    config = get_routine_config(name)
    started_at = datetime.now(timezone.utc)
    retry_count = 0

    for attempt in range(1, config.max_retries + 2):
        attempt_start = datetime.now(timezone.utc)
        logger.info(f"[{name}] attempt {attempt}/{config.max_retries + 1}: started")

        returncode, stdout, stderr = await _run_once(name, script, config.timeout)
        duration = (datetime.now(timezone.utc) - attempt_start).total_seconds()

        if returncode == 0:
            logger.info(f"[{name}] attempt {attempt}: success ({duration:.1f}s)")
            return RoutineResult(
                name=name,
                status="success",
                duration_secs=duration,
                return_code=returncode,
                retry_count=retry_count,
                error_summary=None,
                stdout_lines=len(stdout.splitlines()),
                started_at=started_at,
                finished_at=datetime.now(timezone.utc),
            )

        error = stderr.strip()[-500:] if stderr.strip() else f"returncode={returncode}"
        status = "timeout" if returncode == -1 else "failure"
        logger.warning(f"[{name}] attempt {attempt}: {status} (rc={returncode}, {duration:.1f}s)")

        if attempt <= config.max_retries:
            retry_count += 1
            logger.info(f"[{name}] retry in {config.retry_delay}s...")
            await asyncio.sleep(config.retry_delay)
        else:
            return RoutineResult(
                name=name,
                status=status,
                duration_secs=(datetime.now(timezone.utc) - started_at).total_seconds(),
                return_code=returncode,
                retry_count=retry_count,
                error_summary=error,
                stdout_lines=len(stdout.splitlines()),
                started_at=started_at,
                finished_at=datetime.now(timezone.utc),
            )

    # Should not reach here, but safety fallback
    return RoutineResult(
        name=name, status="failure", duration_secs=0, return_code=-1,
        retry_count=retry_count, error_summary="unexpected", stdout_lines=0,
        started_at=started_at, finished_at=datetime.now(timezone.utc),
    )

import glob
import json
import logging
import re
from datetime import datetime, timedelta, timezone
from pathlib import Path

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.collectors.base import BaseCollector
from app.core.database import async_session
from app.models.routine_run import RoutineRun

logger = logging.getLogger("evo-dashboard.collector.routine")

WORKSPACE_ROOT = Path(__file__).parent.parent.parent.parent.parent
LOGS_DIR = WORKSPACE_ROOT / "ADWs" / "logs"


def _extract_agent(prompt: str) -> str | None:
    match = re.search(r"--agent\s+(\S+)", prompt)
    if match:
        return f"@{match.group(1)}"
    match = re.search(r"\[agent:(\S+)\]", prompt)
    if match:
        return f"@{match.group(1)}"
    return None


def _parse_jsonl_line(line: str) -> dict | None:
    try:
        data = json.loads(line.strip())
        if "timestamp" not in data or "run" not in data:
            return None
        return data
    except (json.JSONDecodeError, KeyError):
        return None


class RoutineCollector(BaseCollector):
    @property
    def name(self) -> str:
        return "routine"

    async def collect(self) -> None:
        if not LOGS_DIR.exists():
            logger.warning(f"Logs directory not found: {LOGS_DIR}")
            return

        jsonl_files = sorted(glob.glob(str(LOGS_DIR / "*.jsonl")))
        if not jsonl_files:
            logger.info("No JSONL log files found")
            return

        total_imported = 0
        total_skipped = 0

        async with async_session() as session:
            for filepath in jsonl_files:
                filename = Path(filepath).name
                with open(filepath) as f:
                    for line in f:
                        entry = _parse_jsonl_line(line)
                        if entry is None:
                            continue

                        started_at = datetime.fromisoformat(entry["timestamp"])
                        if started_at.tzinfo is None:
                            started_at = started_at.replace(tzinfo=timezone.utc)

                        # Check duplicate
                        exists = await session.execute(
                            select(RoutineRun.id).where(
                                RoutineRun.name == entry["run"],
                                RoutineRun.started_at == started_at,
                            ).limit(1)
                        )
                        if exists.scalar_one_or_none() is not None:
                            total_skipped += 1
                            continue

                        duration = entry.get("duration_seconds", 0)
                        returncode = entry.get("returncode", -1)
                        status = "success" if returncode == 0 else "failure"
                        if returncode == -1:
                            status = "timeout"

                        finished_at = started_at + timedelta(seconds=duration)
                        agent = _extract_agent(entry.get("prompt", ""))

                        run = RoutineRun(
                            name=entry["run"],
                            agent=agent,
                            started_at=started_at,
                            finished_at=finished_at,
                            duration_secs=duration,
                            return_code=returncode,
                            stdout_lines=entry.get("stdout_lines", 0),
                            status=status,
                            retry_count=0,
                            token_cost=None,
                            error_summary=None,
                        )
                        session.add(run)
                        total_imported += 1

            await session.commit()

        logger.info(f"Routine collector: {total_imported} imported, {total_skipped} skipped (duplicates)")

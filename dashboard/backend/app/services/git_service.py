import asyncio
import logging
from datetime import datetime, timezone
from pathlib import Path

from app.config import settings

logger = logging.getLogger("evo-dashboard.git")

WORKSPACE_ROOT = Path(settings.WORKSPACE_ROOT)

PATHS_TO_COMMIT = [
    "01 Daily Logs/",
    "03 Comunidade/reports/",
    "02 Projects/",
    "07 Reuniões/summaries/",
    "memory/",
]


async def _run_git(*args: str) -> tuple[int, str, str]:
    proc = await asyncio.create_subprocess_exec(
        "git", *args,
        cwd=str(WORKSPACE_ROOT),
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )
    try:
        stdout, stderr = await asyncio.wait_for(proc.communicate(), timeout=30)
    except asyncio.TimeoutError:
        try:
            proc.kill()
        except ProcessLookupError:
            pass
        await proc.wait()
        return -1, "", f"git {' '.join(args)!r} timed out after 30s"
    return proc.returncode or 0, stdout.decode().strip(), stderr.decode().strip()


async def auto_commit_daily_outputs() -> bool:
    try:
        # Stage specific paths
        for path in PATHS_TO_COMMIT:
            full_path = WORKSPACE_ROOT / path
            if full_path.exists():
                await _run_git("add", path)

        # Check if anything is staged
        rc, _, _ = await _run_git("diff", "--cached", "--quiet")
        if rc == 0:
            logger.info("Git auto-commit: no changes staged, skipping")
            return False

        # Commit
        date_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        msg = f"chore: auto-commit daily outputs {date_str}"
        rc, stdout, stderr = await _run_git("commit", "-m", msg)

        if rc == 0:
            logger.info(f"Git auto-commit: committed ({msg})")
            return True
        else:
            logger.error(f"Git auto-commit failed: {stderr}")
            return False

    except Exception as e:
        logger.error(f"Git auto-commit error: {e}")
        return False

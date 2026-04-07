import logging
from datetime import datetime, timezone

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.executors.asyncio import AsyncIOExecutor
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore

from app.config import settings

logger = logging.getLogger("evo-dashboard.scheduler")

_scheduler: AsyncIOScheduler | None = None


def create_scheduler() -> AsyncIOScheduler:
    jobstores = {
        "default": SQLAlchemyJobStore(url=settings.DATABASE_URL_SYNC),
    }
    executors = {
        "default": AsyncIOExecutor(),
    }
    return AsyncIOScheduler(
        jobstores=jobstores,
        executors=executors,
        job_defaults={"coalesce": True, "max_instances": 1},
    )


async def heartbeat():
    from sqlalchemy import insert
    from app.models.metric import Metric
    from app.core.database import async_session

    async with async_session() as session:
        stmt = insert(Metric).values(
            category="system",
            key="heartbeat",
            value=1.0,
            recorded_at=datetime.now(timezone.utc),
        )
        await session.execute(stmt)
        await session.commit()
    logger.info("Heartbeat recorded")


def start_scheduler():
    global _scheduler
    _scheduler = create_scheduler()
    _scheduler.add_job(
        heartbeat,
        "interval",
        minutes=5,
        id="heartbeat",
        replace_existing=True,
    )
    _scheduler.start()
    logger.info("Scheduler started with heartbeat job (every 5 min)")


def stop_scheduler():
    global _scheduler
    if _scheduler and _scheduler.running:
        _scheduler.shutdown(wait=True)
        logger.info("Scheduler stopped")
    _scheduler = None


def get_scheduler() -> AsyncIOScheduler | None:
    return _scheduler

from datetime import datetime, timedelta, timezone

from sqlalchemy import func, select, case, and_
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.routine_run import RoutineRun


async def get_all_routines(db: AsyncSession) -> list[dict]:
    # Subquery for last run per routine
    last_run_sq = (
        select(
            RoutineRun.name,
            func.max(RoutineRun.started_at).label("last_started_at"),
        )
        .group_by(RoutineRun.name)
        .subquery()
    )

    # Aggregated metrics
    agg = await db.execute(
        select(
            RoutineRun.name,
            func.count().label("total_runs"),
            func.avg(RoutineRun.duration_secs).label("avg_duration"),
            (
                func.sum(case((RoutineRun.status == "success", 1), else_=0)) * 100.0
                / func.count()
            ).label("success_rate"),
        )
        .group_by(RoutineRun.name)
        .order_by(RoutineRun.name)
    )
    metrics = {row.name: row for row in agg.all()}

    # Last run details
    last_runs = await db.execute(
        select(RoutineRun)
        .join(
            last_run_sq,
            and_(
                RoutineRun.name == last_run_sq.c.name,
                RoutineRun.started_at == last_run_sq.c.last_started_at,
            ),
        )
    )
    last_map = {run.name: run for run in last_runs.scalars().all()}

    results = []
    for name, m in sorted(metrics.items()):
        last = last_map.get(name)
        results.append({
            "name": name,
            "agent": last.agent if last else None,
            "last_status": last.status if last else None,
            "last_run_at": last.started_at.isoformat() if last else None,
            "last_duration_secs": last.duration_secs if last else None,
            "total_runs": m.total_runs,
            "success_rate": round(m.success_rate, 1) if m.success_rate else 0,
            "avg_duration_secs": round(m.avg_duration, 1) if m.avg_duration else 0,
        })
    return results


async def get_routine_detail(db: AsyncSession, name: str) -> dict | None:
    metrics = await db.execute(
        select(
            func.count().label("total_runs"),
            func.avg(RoutineRun.duration_secs).label("avg_duration"),
            (
                func.sum(case((RoutineRun.status == "success", 1), else_=0)) * 100.0
                / func.count()
            ).label("success_rate"),
            func.sum(RoutineRun.token_cost).label("total_tokens"),
        )
        .where(RoutineRun.name == name)
    )
    row = metrics.one_or_none()
    if row is None or row.total_runs == 0:
        return None

    last = await db.execute(
        select(RoutineRun)
        .where(RoutineRun.name == name)
        .order_by(RoutineRun.started_at.desc())
        .limit(1)
    )
    last_run = last.scalar_one_or_none()

    return {
        "name": name,
        "agent": last_run.agent if last_run else None,
        "total_runs": row.total_runs,
        "success_rate": round(row.success_rate, 1) if row.success_rate else 0,
        "avg_duration_secs": round(row.avg_duration, 1) if row.avg_duration else 0,
        "total_tokens": row.total_tokens,
        "last_run": {
            "status": last_run.status,
            "started_at": last_run.started_at.isoformat(),
            "duration_secs": last_run.duration_secs,
        } if last_run else None,
    }


async def get_routine_history(db: AsyncSession, name: str, days: int = 30) -> list[dict]:
    since = datetime.now(timezone.utc) - timedelta(days=days)
    result = await db.execute(
        select(RoutineRun)
        .where(RoutineRun.name == name, RoutineRun.started_at >= since)
        .order_by(RoutineRun.started_at.desc())
    )
    return [
        {
            "id": r.id,
            "started_at": r.started_at.isoformat(),
            "finished_at": r.finished_at.isoformat() if r.finished_at else None,
            "duration_secs": r.duration_secs,
            "status": r.status,
            "return_code": r.return_code,
            "retry_count": r.retry_count,
            "token_cost": r.token_cost,
            "error_summary": r.error_summary,
            "stdout_lines": r.stdout_lines,
        }
        for r in result.scalars().all()
    ]

from datetime import date, timedelta

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.community_snapshot import CommunitySnapshot


def _snap_to_dict(snap: CommunitySnapshot) -> dict:
    return {
        "date": snap.date.isoformat(),
        "report_type": snap.report_type,
        "messages_count": snap.messages_count,
        "active_members": snap.active_members,
        "new_members": snap.new_members,
        "sentiment_score": snap.sentiment_score,
        "sentiment_label": snap.sentiment_label,
        "top_topics": snap.top_topics or [],
        "unresolved_questions": snap.unresolved_questions,
        "status": snap.status,
        "report_data": snap.report_data or {},
    }


async def get_latest_snapshot(db: AsyncSession, report_type: str = "daily") -> dict | None:
    result = await db.execute(
        select(CommunitySnapshot)
        .where(CommunitySnapshot.report_type == report_type)
        .order_by(CommunitySnapshot.date.desc())
        .limit(1)
    )
    snap = result.scalar_one_or_none()
    if snap is None:
        return None
    return _snap_to_dict(snap)


async def get_sentiment_trend(db: AsyncSession, days: int = 30) -> list[dict]:
    since = date.today() - timedelta(days=days)
    result = await db.execute(
        select(CommunitySnapshot)
        .where(CommunitySnapshot.date >= since, CommunitySnapshot.report_type == "daily")
        .order_by(CommunitySnapshot.date.asc())
    )
    return [
        {
            "date": s.date.isoformat(),
            "sentiment_score": s.sentiment_score,
            "sentiment_label": s.sentiment_label,
            "messages_count": s.messages_count,
            "active_members": s.active_members,
        }
        for s in result.scalars().all()
    ]

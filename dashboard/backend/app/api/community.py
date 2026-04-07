from datetime import datetime, timezone

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db
from app.services.community_service import get_latest_snapshot, get_sentiment_trend

router = APIRouter(prefix="/api/v1/community", tags=["community"])


def _meta():
    return {"timestamp": datetime.now(timezone.utc).isoformat(), "source": "sqlite"}


@router.get("/latest")
async def community_latest(report_type: str = Query(default="daily", pattern="^(daily|weekly)$"), db: AsyncSession = Depends(get_db)):
    data = await get_latest_snapshot(db, report_type)
    return {"data": data, "meta": _meta()}


@router.get("/trend")
async def community_trend(days: int = Query(default=30, ge=1, le=365), db: AsyncSession = Depends(get_db)):
    data = await get_sentiment_trend(db, days)
    return {"data": data, "meta": _meta()}

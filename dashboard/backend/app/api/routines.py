from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db
from app.services.routine_service import (
    get_all_routines,
    get_routine_detail,
    get_routine_history,
)

router = APIRouter(prefix="/api/v1/routines", tags=["routines"])


def _meta():
    return {"timestamp": datetime.now(timezone.utc).isoformat(), "source": "sqlite"}


@router.get("")
async def list_routines(db: AsyncSession = Depends(get_db)):
    data = await get_all_routines(db)
    return {"data": data, "meta": _meta()}


@router.get("/{name}")
async def routine_detail(name: str, db: AsyncSession = Depends(get_db)):
    data = await get_routine_detail(db, name)
    if data is None:
        raise HTTPException(status_code=404, detail={"code": "NOT_FOUND", "message": f"Routine '{name}' not found"})
    return {"data": data, "meta": _meta()}


@router.get("/{name}/history")
async def routine_history(name: str, days: int = Query(default=30, ge=1, le=365), db: AsyncSession = Depends(get_db)):
    data = await get_routine_history(db, name, days)
    return {"data": data, "meta": _meta()}

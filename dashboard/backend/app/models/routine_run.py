from sqlalchemy import Column, Integer, String, Float, DateTime, func

from app.core.database import Base


class RoutineRun(Base):
    __tablename__ = "routine_runs"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    agent = Column(String)
    started_at = Column(DateTime(timezone=True), nullable=False)
    finished_at = Column(DateTime(timezone=True))
    duration_secs = Column(Float)
    return_code = Column(Integer)
    stdout_lines = Column(Integer)
    status = Column(String)
    retry_count = Column(Integer, default=0)
    token_cost = Column(Float)
    error_summary = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

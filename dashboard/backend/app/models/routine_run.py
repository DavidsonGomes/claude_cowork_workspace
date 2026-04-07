from sqlalchemy import Column, Index, Integer, String, Float, DateTime, UniqueConstraint, func

from app.core.database import Base


class RoutineRun(Base):
    __tablename__ = "routine_runs"

    __table_args__ = (
        UniqueConstraint('name', 'started_at', name='uq_routine_run'),
        Index('ix_routine_runs_name', 'name'),
        Index('ix_routine_runs_started_at', 'started_at'),
    )

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

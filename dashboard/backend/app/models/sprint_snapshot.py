from sqlalchemy import Column, Integer, Date, DateTime, func

from app.core.database import Base


class SprintSnapshot(Base):
    __tablename__ = "sprint_snapshots"

    id = Column(Integer, primary_key=True)
    date = Column(Date, unique=True, nullable=False)
    total_issues = Column(Integer)
    done = Column(Integer)
    in_progress = Column(Integer)
    in_review = Column(Integer)
    blocked = Column(Integer)
    backlog = Column(Integer)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

from sqlalchemy import Column, Integer, String, Date, DateTime, JSON, func

from app.core.database import Base


class Meeting(Base):
    __tablename__ = "meetings"

    id = Column(Integer, primary_key=True)
    fathom_id = Column(String, unique=True)
    title = Column(String, nullable=False)
    date = Column(Date, nullable=False)
    duration_minutes = Column(Integer)
    participants = Column(JSON)
    action_items_count = Column(Integer)
    action_items_done = Column(Integer)
    project = Column(String)
    summary_excerpt = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

from sqlalchemy import Column, Integer, String, Float, Date, DateTime, JSON, func

from app.core.database import Base


class CommunitySnapshot(Base):
    __tablename__ = "community_snapshots"

    id = Column(Integer, primary_key=True)
    date = Column(Date, unique=True, nullable=False)
    messages_count = Column(Integer)
    active_members = Column(Integer)
    new_members = Column(Integer)
    sentiment_score = Column(Float)
    sentiment_label = Column(String)
    top_topics = Column(JSON)
    unresolved_questions = Column(Integer)
    status = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

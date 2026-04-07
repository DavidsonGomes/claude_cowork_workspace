from sqlalchemy import Column, Integer, String, Float, Date, DateTime, JSON, func

from app.core.database import Base


class CommunitySnapshot(Base):
    __tablename__ = "community_snapshots"

    id = Column(Integer, primary_key=True)
    date = Column(Date, nullable=False)
    report_type = Column(String, nullable=False, default="daily")  # daily or weekly
    messages_count = Column(Integer)
    active_members = Column(Integer)
    new_members = Column(Integer)
    sentiment_score = Column(Float)
    sentiment_label = Column(String)
    top_topics = Column(JSON)
    unresolved_questions = Column(Integer)
    status = Column(String)
    report_data = Column(JSON)  # full report: support_items, sentiment_text, standout_members, new_members_list, action_items
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    from sqlalchemy import UniqueConstraint
    __table_args__ = (UniqueConstraint('date', 'report_type', name='uq_community_date_type'),)

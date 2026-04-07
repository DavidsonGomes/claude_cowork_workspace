from sqlalchemy import Column, Index, Integer, String, Float, DateTime, JSON, func

from app.core.database import Base


class Metric(Base):
    __tablename__ = "metrics"

    id = Column(Integer, primary_key=True)
    recorded_at = Column(DateTime(timezone=True), server_default=func.now())
    category = Column(String, nullable=False)
    key = Column(String, nullable=False)
    value = Column(Float)
    meta = Column(JSON)

    __table_args__ = (
        Index('idx_metrics_category_date', 'category', 'recorded_at'),
    )

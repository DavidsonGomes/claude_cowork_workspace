from sqlalchemy import Column, Integer, String, Float, Date, DateTime, Boolean, JSON, UniqueConstraint, func

from app.core.database import Base


class HealthSnapshot(Base):
    __tablename__ = "health_snapshots"

    id = Column(Integer, primary_key=True)
    date = Column(Date, nullable=False)
    person = Column(String, nullable=False)
    weight_kg = Column(Float)
    fat_pct = Column(Float)
    skeletal_muscle_pct = Column(Float)
    visceral = Column(Float)
    bmi = Column(Float)
    water_pct = Column(Float)
    bmr_kcal = Column(Float)
    diet_score = Column(Integer)
    workouts_count = Column(Integer)
    medication_on_time = Column(Boolean)
    symptoms = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    __table_args__ = (UniqueConstraint("date", "person"),)

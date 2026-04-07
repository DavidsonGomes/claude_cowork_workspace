from sqlalchemy import Column, Integer, Float, Date, DateTime, func

from app.core.database import Base


class FinanceSnapshot(Base):
    __tablename__ = "finance_snapshots"

    id = Column(Integer, primary_key=True)
    date = Column(Date, unique=True, nullable=False)
    mrr = Column(Float)
    new_customers = Column(Integer)
    churned_customers = Column(Integer)
    active_subscriptions = Column(Integer)
    nfs_pendentes = Column(Integer)
    contas_a_receber = Column(Float)
    contas_a_pagar = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

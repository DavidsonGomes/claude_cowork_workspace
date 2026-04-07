from sqlalchemy import Column, Integer, String, Date, DateTime, UniqueConstraint, func

from app.core.database import Base


class GithubSnapshot(Base):
    __tablename__ = "github_snapshots"

    id = Column(Integer, primary_key=True)
    date = Column(Date, nullable=False)
    repo = Column(String, nullable=False)
    stars = Column(Integer)
    forks = Column(Integer)
    open_prs = Column(Integer)
    open_issues = Column(Integer)
    commits_7d = Column(Integer)
    latest_release = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    __table_args__ = (UniqueConstraint("date", "repo"),)

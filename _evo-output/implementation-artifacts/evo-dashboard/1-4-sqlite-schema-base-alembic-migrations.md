# Story 1.4: SQLite Schema Base & Alembic Migrations

Status: ready-for-dev

## Story

As a developer,
I want the base SQLite schema with all 8 tables and indices,
so that collectors can start writing data.

## Acceptance Criteria

1. `make migrate` cria as 8 tabelas: `routine_runs`, `community_snapshots`, `github_snapshots`, `finance_snapshots`, `meetings`, `sprint_snapshots`, `health_snapshots`, `metrics`
2. Todos os indices criados conforme architecture.md
3. WAL mode ativo no SQLite
4. Arquivo `data/evo-dashboard.db` criado automaticamente
5. `data/` no `.gitignore`

## Tasks / Subtasks

- [ ] Task 1: Criar SQLAlchemy models (AC: 1)
  - [ ] `app/models/routine_run.py`: RoutineRun model
  - [ ] `app/models/community_snapshot.py`: CommunitySnapshot model
  - [ ] `app/models/github_snapshot.py`: GithubSnapshot model
  - [ ] `app/models/finance_snapshot.py`: FinanceSnapshot model
  - [ ] `app/models/meeting.py`: Meeting model
  - [ ] `app/models/sprint_snapshot.py`: SprintSnapshot model
  - [ ] `app/models/health_snapshot.py`: HealthSnapshot model
  - [ ] `app/models/metric.py`: Metric model
  - [ ] `app/models/__init__.py`: importar todos os models para Alembic detectar

- [ ] Task 2: Gerar e aplicar migration (AC: 1, 2)
  - [ ] `make migration msg="create all tables"`
  - [ ] Verificar migration gerada contem as 8 tabelas
  - [ ] Adicionar indices manualmente se autogenerate nao pegar
  - [ ] `make migrate`

- [ ] Task 3: Validar schema (AC: 3, 4, 5)
  - [ ] Verificar WAL mode: `PRAGMA journal_mode` retorna `wal`
  - [ ] Verificar `data/evo-dashboard.db` existe
  - [ ] Verificar `data/` esta no `.gitignore`

## Dev Notes

### Schema Completo (architecture.md)

```python
# app/models/routine_run.py
class RoutineRun(Base):
    __tablename__ = "routine_runs"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    agent = Column(String)
    started_at = Column(DateTime, nullable=False)
    finished_at = Column(DateTime)
    duration_secs = Column(Float)
    return_code = Column(Integer)
    stdout_lines = Column(Integer)
    status = Column(String)  # success, failure, timeout, retrying
    retry_count = Column(Integer, default=0)
    token_cost = Column(Integer)
    error_summary = Column(String)
    created_at = Column(DateTime, default=func.now())

# app/models/community_snapshot.py
class CommunitySnapshot(Base):
    __tablename__ = "community_snapshots"
    id = Column(Integer, primary_key=True, autoincrement=True)
    date = Column(Date, unique=True, nullable=False)
    messages_count = Column(Integer)
    active_members = Column(Integer)
    new_members = Column(Integer)
    sentiment_score = Column(Float)
    sentiment_label = Column(String)
    top_topics = Column(JSON)
    unresolved_questions = Column(Integer)
    status = Column(String)  # normal, atencao, critico
    created_at = Column(DateTime, default=func.now())

# app/models/github_snapshot.py
class GithubSnapshot(Base):
    __tablename__ = "github_snapshots"
    id = Column(Integer, primary_key=True, autoincrement=True)
    date = Column(Date, nullable=False)
    repo = Column(String, nullable=False)
    stars = Column(Integer)
    forks = Column(Integer)
    open_prs = Column(Integer)
    open_issues = Column(Integer)
    commits_7d = Column(Integer)
    latest_release = Column(String)
    created_at = Column(DateTime, default=func.now())
    __table_args__ = (UniqueConstraint('date', 'repo'),)

# app/models/finance_snapshot.py
class FinanceSnapshot(Base):
    __tablename__ = "finance_snapshots"
    id = Column(Integer, primary_key=True, autoincrement=True)
    date = Column(Date, unique=True, nullable=False)
    mrr = Column(Float)
    new_customers = Column(Integer)
    churned_customers = Column(Integer)
    active_subscriptions = Column(Integer)
    nfs_pendentes = Column(Integer)
    contas_a_receber = Column(Float)
    contas_a_pagar = Column(Float)
    created_at = Column(DateTime, default=func.now())

# app/models/meeting.py
class Meeting(Base):
    __tablename__ = "meetings"
    id = Column(Integer, primary_key=True, autoincrement=True)
    fathom_id = Column(Integer, unique=True)
    title = Column(String, nullable=False)
    date = Column(Date, nullable=False)
    duration_minutes = Column(Integer)
    participants = Column(JSON)
    action_items_count = Column(Integer)
    action_items_done = Column(Integer)
    project = Column(String)
    summary_excerpt = Column(String)
    created_at = Column(DateTime, default=func.now())

# app/models/sprint_snapshot.py
class SprintSnapshot(Base):
    __tablename__ = "sprint_snapshots"
    id = Column(Integer, primary_key=True, autoincrement=True)
    date = Column(Date, unique=True, nullable=False)
    total_issues = Column(Integer)
    done = Column(Integer)
    in_progress = Column(Integer)
    in_review = Column(Integer)
    blocked = Column(Integer)
    backlog = Column(Integer)
    created_at = Column(DateTime, default=func.now())

# app/models/health_snapshot.py
class HealthSnapshot(Base):
    __tablename__ = "health_snapshots"
    id = Column(Integer, primary_key=True, autoincrement=True)
    date = Column(Date, nullable=False)
    person = Column(String, nullable=False)  # davidson, isabella
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
    created_at = Column(DateTime, default=func.now())
    __table_args__ = (UniqueConstraint('date', 'person'),)

# app/models/metric.py
class Metric(Base):
    __tablename__ = "metrics"
    id = Column(Integer, primary_key=True, autoincrement=True)
    recorded_at = Column(DateTime, default=func.now())
    category = Column(String, nullable=False)
    key = Column(String, nullable=False)
    value = Column(Float)
    metadata = Column(JSON)
```

### Indices (criar na migration)

```python
Index('idx_routine_runs_name_date', RoutineRun.name, RoutineRun.started_at)
Index('idx_community_date', CommunitySnapshot.date)
Index('idx_github_date_repo', GithubSnapshot.date, GithubSnapshot.repo)
Index('idx_finance_date', FinanceSnapshot.date)
Index('idx_meetings_date', Meeting.date)
Index('idx_sprint_date', SprintSnapshot.date)
Index('idx_health_date_person', HealthSnapshot.date, HealthSnapshot.person)
Index('idx_metrics_category_date', Metric.category, Metric.recorded_at)
```

### Imports necessarios

```python
from sqlalchemy import Column, Integer, String, Float, Date, DateTime, Boolean, JSON, func, UniqueConstraint, Index
from sqlalchemy.orm import DeclarativeBase
```

### References

- [Source: architecture.md#Data Architecture > Schema]
- [Source: architecture.md#Core Architectural Decisions > Data Architecture]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List

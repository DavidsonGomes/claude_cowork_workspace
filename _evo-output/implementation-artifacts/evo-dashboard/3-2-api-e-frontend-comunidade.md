# Story 3.2: API e Frontend — Comunidade

Status: ready-for-dev

## Story

As Davidson,
I want to see community health with sentiment trends, topics, and unresolved questions,
so that I can proactively address community concerns.

## Acceptance Criteria

1. Tela mostra: mensagens 24h, membros ativos, novos membros, sentimento (badge com %)
2. Status geral como badge (normal/atencao/critico)
3. Top topicos com contagem (bar chart)
4. Perguntas sem resposta com indicador de urgencia
5. Grafico de trend de sentimento (line chart, periodo selecionavel: 7d, 30d, 90d)
6. API `GET /api/v1/community/latest` e `GET /api/v1/community/trend?days=30` retornam dados
7. Dados atualizam a cada 60s

## Tasks / Subtasks

- [ ] Task 1: Criar community_service.py (AC: 6)
  - [ ] `get_latest_snapshot(db)` → retorna ultimo CommunitySnapshot com todos os campos
  - [ ] `get_sentiment_trend(db, days)` → retorna lista de {date, sentiment_score, sentiment_label, messages_count, active_members} ordenada por date
  - [ ] Queries com filtro por periodo

- [ ] Task 2: Criar API router (AC: 6)
  - [ ] Criar `app/api/community.py` com router prefix `/api/v1/community`
  - [ ] `GET /latest` → ultimo snapshot
  - [ ] `GET /trend?days=30` → trend de sentimento (Query validado ge=1, le=365)
  - [ ] Response format `{data, meta}`
  - [ ] Registrar router em `app/main.py`

- [ ] Task 3: Criar frontend CommunityPage (AC: 1-5, 7)
  - [ ] Criar `src/hooks/useCommunity.ts` com hooks para latest e trend
  - [ ] Atualizar `src/pages/CommunityPage.tsx`:
    - Top row: 4 MetricCards (mensagens, membros ativos, novos membros, sentimento %)
    - Status badge grande (normal/atencao/critico) — reusar StatusBadge com variantes novas
    - Line chart: trend de sentimento (Recharts, reusar TrendChart)
    - Bar chart horizontal: top topicos com contagem
    - Lista de perguntas sem resposta (se disponivel no snapshot)
  - [ ] Criar `src/components/charts/BarChart.tsx` para topicos
  - [ ] PeriodFilter tabs (7d, 30d, 90d) — reusar pattern do RoutineDetailPage
  - [ ] Skeleton loading
  - [ ] Auto-refresh 60s via TanStack Query

- [ ] Task 4: Testes (AC: 1-6)
  - [ ] API: GET /api/v1/community/latest retorna formato correto
  - [ ] API: GET /api/v1/community/trend?days=7 retorna lista

## Dev Notes

### API Response Format

**GET /api/v1/community/latest:**
```json
{
  "data": {
    "date": "2026-04-06",
    "messages_count": 117,
    "active_members": 24,
    "new_members": 16,
    "sentiment_score": 0.65,
    "sentiment_label": "neutro",
    "top_topics": [
      {"topic": "Evolution Go", "count": 18},
      {"topic": "QR Code", "count": 15}
    ],
    "unresolved_questions": 4,
    "status": "atencao"
  },
  "meta": {"timestamp": "...", "source": "sqlite"}
}
```

**GET /api/v1/community/trend?days=30:**
```json
{
  "data": [
    {"date": "2026-04-06", "sentiment_score": 0.65, "messages_count": 117, "active_members": 24}
  ],
  "meta": {"timestamp": "...", "source": "sqlite"}
}
```

### UX Spec (ux-design-specification.md)

- Top row: 4 MetricCards
- Status badge grande
- Line chart: trend sentimento (primary-500 #00FFA7)
- Bar chart: top topicos (horizontal bars, primary-500)
- Perguntas sem resposta com urgencia

### Componentes Reutilizaveis (ja existem)

- `MetricCard` — de Epic 2
- `StatusBadge` — de Epic 2 (adicionar variantes `atencao`/`critico` se nao existirem)
- `TrendChart` — de Epic 2 (reusar para sentimento trend)
- `PeriodFilter` pattern — de RoutineDetailPage (extrair como componente compartilhado se quiser)

### Novo Componente

- `BarChart.tsx` — Recharts `BarChart` horizontal para topicos. Cor: primary-500. Layout: horizontal (bars da esquerda pra direita).

### Previous Story Context

- Story 3.1 criou CommunityCollector que popula `community_snapshots`
- Epic 2: pattern de service → router → page ja estabelecido

### References

- [Source: architecture.md#API & Communication Patterns]
- [Source: ux-design-specification.md#Page 4: Comunidade]
- [Source: prd.md#FR7-FR12]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List

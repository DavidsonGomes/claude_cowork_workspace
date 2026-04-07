# Story 3.1: Community Collector

Status: ready-for-dev

## Story

As the system,
I want to collect community data from pulse HTML reports into SQLite,
so that the API can serve community metrics to the frontend.

## Acceptance Criteria

1. HTML e parseado para extrair: messages_count, active_members, new_members, sentiment_score, sentiment_label, top_topics (JSON), unresolved_questions, status
2. Uma row e inserida na tabela `community_snapshots`
3. Dados historicos importados na primeira execucao (backfill)
4. Se HTML nao existe ou parse falha, collector loga erro e nao crasha

## Tasks / Subtasks

- [ ] Task 1: Criar CommunityCollector (AC: 1, 2, 4)
  - [ ] Criar `app/collectors/community_collector.py` extends BaseCollector
  - [ ] `collect()`: busca todos os HTML em `03 Comunidade/reports/daily/[C] *.html`
  - [ ] Parseia cada HTML com `html.parser` (stdlib, sem BeautifulSoup — manter deps minimas)
  - [ ] Extrai dados dos 4 metric-cards: primeiro `.value` = messages_count, segundo = active_members, terceiro = new_members
  - [ ] Extrai status do `.health-badge` class: `atencao`, `normal`, ou `critico`
  - [ ] Extrai sentimento da secao de sentimento (buscar texto com porcentagem + label)
  - [ ] Extrai top topicos (buscar secao de topicos, parsear nome + contagem)
  - [ ] Extrai perguntas sem resposta (contar items com status "Sem resposta")
  - [ ] Grava na tabela `community_snapshots` com date extraido do filename
  - [ ] Dedup por date (UNIQUE constraint ja existe no model)
  - [ ] try/except IntegrityError para duplicatas

- [ ] Task 2: Implementar backfill (AC: 3)
  - [ ] Na primeira execucao, processar TODOS os HTML historicos em `03 Comunidade/reports/daily/`
  - [ ] Extrair date do filename: `[C] YYYY-MM-DD-community-pulse.html` → `YYYY-MM-DD`
  - [ ] Logar progresso

- [ ] Task 3: Registrar no scheduler (AC: 1)
  - [ ] Em `app/core/scheduler.py`, adicionar job `collect_community` a cada 5 minutos
  - [ ] Collector tambem roda no startup

- [ ] Task 4: Testes (AC: 1-4)
  - [ ] Fixture com HTML real (copiar trecho do report)
  - [ ] Testar parse dos metric-cards
  - [ ] Testar parse do status badge
  - [ ] Testar dedup

## Dev Notes

### HTML Structure Real (de `[C] 2026-04-06-community-pulse.html`)

```html
<!-- Status badge -->
<div class="health-badge atencao">
  <div class="dot"></div> ⚠️ Atenção
</div>

<!-- 4 metric cards in a .grid -->
<div class="grid">
  <div class="metric-card">
    <div class="label">MENSAGENS (24H)</div>
    <div class="value">117</div>
  </div>
  <div class="metric-card">
    <div class="label">MEMBROS ATIVOS</div>
    <div class="value">24</div>
  </div>
  <div class="metric-card">
    <div class="label">NOVOS MEMBROS</div>
    <div class="value">16</div>
  </div>
  <div class="metric-card">
    <div class="label">CANAL MAIS ATIVO</div>
    <div class="value" style="font-size:18px;">💬 chat-pt</div>
  </div>
</div>
```

### Parsing Strategy

Usar `html.parser.HTMLParser` da stdlib (nao adicionar BeautifulSoup):
1. Parse completo do HTML
2. Encontrar divs com class `health-badge` → extrair `normal`/`atencao`/`critico`
3. Encontrar divs com class `metric-card` → extrair `.label` e `.value` por ordem
4. Para sentimento: buscar texto contendo "%" proximo a emoji de sentimento
5. Para topicos: buscar secao de topicos (pode variar — fallback: null)

### Alternativa mais robusta: regex

Se o HTML parser for complexo, usar regex simples:
```python
import re
# Status
status_match = re.search(r'health-badge\s+(normal|atencao|critico)', html)
# Metric values (first 3 are numeric)
values = re.findall(r'<div class="value"[^>]*>(\d+)</div>', html)
```

### Paths

```
/Users/etus_0104/Projects/claude_cowork_workspace/03 Comunidade/reports/daily/
  [C] 2026-04-06-community-pulse.html
```

### Previous Story Context

- Epic 2: BaseCollector ABC em `app/collectors/base.py` — reusar
- Epic 2: RoutineCollector pattern — seguir mesmo padrao (dedup, backfill, logging)
- `app/config.py` tem `WORKSPACE_ROOT` configuravel

### References

- [Source: architecture.md#Data Flow]
- [Source: prd.md#FR7-FR12]
- [Source: epics.md#Story 3.1]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List

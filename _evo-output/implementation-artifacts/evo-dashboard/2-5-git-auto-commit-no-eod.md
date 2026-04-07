# Story 2.5: Git Auto-Commit no EOD

Status: ready-for-dev

## Story

As Davidson,
I want the system to auto-commit generated files at end of day,
so that daily outputs are versioned without manual intervention.

## Acceptance Criteria

1. Apos rotina EOD terminar, arquivos em `01 Daily Logs/`, `03 Comunidade/reports/`, `02 Projects/`, `07 Reunioes/summaries/` sao staged
2. Commit criado com mensagem `chore: auto-commit daily outputs YYYY-MM-DD`
3. Arquivos em `.env`, `data/`, `node_modules/` NAO sao incluidos
4. Se nao houver mudancas, nenhum commit e criado
5. Erros no git sao logados mas nao crasham o backend

## Tasks / Subtasks

- [ ] Task 1: Criar git auto-commit service (AC: 1, 2, 3, 4, 5)
  - [ ] Criar `app/services/git_service.py`
  - [ ] Funcao `async def auto_commit_daily_outputs(workspace_root: str) -> bool`
  - [ ] Usar `asyncio.create_subprocess_exec` para chamar git
  - [ ] Stage apenas as pastas especificas: `git add "01 Daily Logs/" "03 Comunidade/reports/" "02 Projects/" "07 Reunioes/summaries/" "memory/"`
  - [ ] Verificar se ha mudancas staged: `git diff --cached --quiet` (returncode 0 = nada staged)
  - [ ] Se nada staged, retornar False sem commit
  - [ ] Se ha mudancas, commit com mensagem: `chore: auto-commit daily outputs YYYY-MM-DD`
  - [ ] Toda operacao git em try/except — logar erro, nunca crashar
  - [ ] O workspace root e `/Users/etus_0104/Projects/claude_cowork_workspace` (parent do dashboard/)

- [ ] Task 2: Registrar job no scheduler (AC: 1)
  - [ ] Em `app/core/scheduler.py`, adicionar job `auto_commit_eod`
  - [ ] Agendado para rodar as 21:30 BRT (apos EOD que roda as 21:00)
  - [ ] Usar APScheduler CronTrigger: `hour=21, minute=30, timezone='America/Sao_Paulo'`

- [ ] Task 3: Testes (AC: 1-5)
  - [ ] Mock subprocess para testar cenario com mudancas
  - [ ] Mock subprocess para testar cenario sem mudancas (nenhum commit)
  - [ ] Mock subprocess para testar erro no git (nao crasha)

## Dev Notes

### Workspace Root

O dashboard roda em `dashboard/backend/` mas o git repo root e o parent: `/Users/etus_0104/Projects/claude_cowork_workspace`. Os paths dos arquivos a commitar sao relativos ao repo root.

### Git Commands

```bash
cd /Users/etus_0104/Projects/claude_cowork_workspace
git add "01 Daily Logs/" "03 Comunidade/reports/" "02 Projects/" "07 Reunioes/summaries/" "memory/"
git diff --cached --quiet  # exit 0 = nothing staged, exit 1 = staged changes
git commit -m "chore: auto-commit daily outputs 2026-04-06"
```

### Safety

- NUNCA fazer `git add .` ou `git add -A` — apenas as pastas especificas
- NUNCA fazer `git push` — apenas commit local
- Se `git add` falha (arquivo nao existe), ignorar e continuar
- Se `git commit` falha, logar e retornar False

### Previous Story Context

- Epic 1 criou o scheduler com APScheduler
- Story 2.1 criou o runner com retry
- Este story adiciona um job scheduled ao scheduler

### References

- [Source: prd.md#FR6d]
- [Source: ROADMAP.md#Fase 1 — Git auto-commit no EOD]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List

# ============================================================
# ADW Rotinas — Makefile
# ============================================================
# Uso: make <rotina>
# Logs: ADWs/logs/
# ============================================================

PYTHON := uv run python
ADW_DIR := ADWs/rotinas

# --- Rotinas diárias ---

morning:            ## ☀️  Briefing matinal (agenda, emails, tarefas)
	$(PYTHON) $(ADW_DIR)/good_morning.py

eod:                ## 🌙 Consolidação do dia (memória, logs, tarefas, aprendizados)
	$(PYTHON) $(ADW_DIR)/end_of_day.py

sync:               ## 🎙️  Sync reuniões do Fathom + cria tarefas no Todoist
	$(PYTHON) $(ADW_DIR)/sync_meetings.py

triage:             ## 📧 Triagem de emails importantes
	$(PYTHON) $(ADW_DIR)/email_triage.py

review:             ## 📋 Organiza tarefas no Todoist (categoriza, traduz)
	$(PYTHON) $(ADW_DIR)/review_todoist.py

# --- Rotinas periódicas ---

weekly:             ## 📊 Revisão semanal completa
	$(PYTHON) $(ADW_DIR)/weekly_review.py

memory:             ## 🧠 Consolida memória (decisões, pessoas, feedbacks)
	$(PYTHON) $(ADW_DIR)/memory_sync.py

# --- Combos ---

daily: sync review  ## Combo: sync meetings + review todoist

# --- Utilitários ---

logs:               ## 📝 Mostra os últimos 10 logs (JSONL)
	@tail -20 ADWs/logs/$$(ls -t ADWs/logs/*.jsonl 2>/dev/null | head -1) 2>/dev/null || echo "Nenhum log ainda."

logs-detail:        ## 📝 Lista logs detalhados
	@ls -lt ADWs/logs/detail/ 2>/dev/null | head -11 || echo "Nenhum log ainda."

logs-tail:          ## 📝 Mostra último log detalhado completo
	@cat ADWs/logs/detail/$$(ls -t ADWs/logs/detail/ 2>/dev/null | head -1) 2>/dev/null || echo "Nenhum log ainda."

clean-logs:         ## 🗑️  Remove logs com mais de 30 dias
	@find ADWs/logs/ -name "*.log" -mtime +30 -delete 2>/dev/null; find ADWs/logs/ -name "*.jsonl" -mtime +30 -delete 2>/dev/null; echo "Logs antigos removidos."

help:               ## 📖 Mostra este help
	@grep -E '^[a-zA-Z_-]+:.*##' Makefile | sort | awk 'BEGIN {FS = ":.*## "}; {printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2}'

.PHONY: morning eod sync triage review weekly memory daily logs logs-detail logs-tail clean-logs help
.DEFAULT_GOAL := help

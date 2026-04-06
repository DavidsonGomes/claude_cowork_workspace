# ============================================================
# ADW Rotinas — Makefile
# ============================================================
# Uso: make <rotina>
# Logs: ADWs/logs/
# ============================================================

PYTHON := uv run python
ADW_DIR := ADWs/rotinas

# --- Rotinas diárias ---

morning:            ## ☀️  Briefing matinal — agenda, emails, tarefas (@clawdia)
	$(PYTHON) $(ADW_DIR)/good_morning.py

sync:               ## 🎙️  Sync reuniões Fathom → Todoist (@clawdia)
	$(PYTHON) $(ADW_DIR)/sync_meetings.py

triage:             ## 📧 Triagem de emails (@clawdia)
	$(PYTHON) $(ADW_DIR)/email_triage.py

review:             ## 📋 Organiza tarefas no Todoist (@clawdia)
	$(PYTHON) $(ADW_DIR)/review_todoist.py

memory:             ## 🧠 Consolida memória (@clawdia)
	$(PYTHON) $(ADW_DIR)/memory_sync.py

eod:                ## 🌙 Consolidação do dia — memória, logs, aprendizados (@clawdia)
	$(PYTHON) $(ADW_DIR)/end_of_day.py

# --- Rotinas semanais ---

weekly:             ## 📊 Revisão semanal completa (@clawdia)
	$(PYTHON) $(ADW_DIR)/weekly_review.py

health:             ## 🏥 Check-in semanal de saúde (@kai)
	$(PYTHON) $(ADW_DIR)/health_checkin.py

# --- Combos ---

daily: sync review  ## Combo: sync meetings + review todoist

# --- Utilitários ---

logs:               ## 📝 Mostra últimos logs (JSONL)
	@tail -20 ADWs/logs/$$(ls -t ADWs/logs/*.jsonl 2>/dev/null | head -1) 2>/dev/null || echo "Nenhum log ainda."

logs-detail:        ## 📝 Lista logs detalhados
	@ls -lt ADWs/logs/detail/ 2>/dev/null | head -11 || echo "Nenhum log ainda."

logs-tail:          ## 📝 Mostra último log completo
	@cat ADWs/logs/detail/$$(ls -t ADWs/logs/detail/ 2>/dev/null | head -1) 2>/dev/null || echo "Nenhum log ainda."

clean-logs:         ## 🗑️  Remove logs > 30 dias
	@find ADWs/logs/ -name "*.log" -mtime +30 -delete 2>/dev/null; find ADWs/logs/ -name "*.jsonl" -mtime +30 -delete 2>/dev/null; echo "Logs antigos removidos."

help:               ## 📖 Mostra este help
	@grep -E '^[a-zA-Z_-]+:.*##' Makefile | sort | awk 'BEGIN {FS = ":.*## "}; {printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2}'

.PHONY: morning sync triage review memory eod weekly health daily logs logs-detail logs-tail clean-logs help
.DEFAULT_GOAL := help

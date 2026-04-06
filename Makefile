# ============================================================
# ADW Rotinas — Makefile
# ============================================================
# Uso: make <rotina>
# Logs: ADWs/logs/
# ============================================================

PYTHON := python3
ADW_DIR := ADWs/rotinas

# --- Rotinas diárias ---

morning:            ## ☀️  Briefing matinal (agenda, emails, meetings, tarefas)
	$(PYTHON) $(ADW_DIR)/good_morning.py

eod:                ## 🌙 Encerramento do dia (sync + organiza + log)
	$(PYTHON) $(ADW_DIR)/end_of_day.py

sync:               ## 🎙️  Sync reuniões do Fathom + cria tarefas no Todoist
	$(PYTHON) $(ADW_DIR)/sync_meetings.py

triage:             ## 📧 Triagem de emails importantes
	$(PYTHON) $(ADW_DIR)/email_triage.py

review:             ## 📋 Organiza tarefas no Todoist (categoriza, traduz)
	$(PYTHON) $(ADW_DIR)/review_todoist.py

followups:          ## 🔔 Checa emails sem resposta
	$(PYTHON) $(ADW_DIR)/followups.py

# --- Rotinas periódicas ---

weekly:             ## 📊 Revisão semanal completa
	$(PYTHON) $(ADW_DIR)/weekly_review.py

memory:             ## 🧠 Consolida memória (decisões, pessoas, feedbacks)
	$(PYTHON) $(ADW_DIR)/memory_sync.py

fechamento:         ## 💰 Fechamento financeiro mensal
	$(PYTHON) $(ADW_DIR)/fechamento_mensal.py

# --- Combos ---

daily: sync review  ## Combo: sync meetings + review todoist

full-morning: morning followups  ## Combo: briefing + follow-ups

full-eod: sync review memory eod  ## Combo completo de fim de dia

# --- Utilitários ---

logs:               ## 📝 Mostra os últimos 10 logs
	@ls -lt ADWs/logs/ | head -11

clean-logs:         ## 🗑️  Remove logs com mais de 30 dias
	@find ADWs/logs/ -name "*.log" -mtime +30 -delete && echo "Logs antigos removidos."

help:               ## 📖 Mostra este help
	@grep -E '^[a-zA-Z_-]+:.*##' Makefile | sort | awk 'BEGIN {FS = ":.*## "}; {printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2}'

.PHONY: morning eod sync triage review followups weekly memory fechamento daily full-morning full-eod logs clean-logs help
.DEFAULT_GOAL := help

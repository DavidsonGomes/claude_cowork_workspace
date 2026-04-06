# ============================================================
# ADW Rotinas — Makefile
# ============================================================
# Uso: make <rotina>
# Logs: ADWs/logs/
# ============================================================

PYTHON := uv run python
ADW_DIR := ADWs/rotinas

# Carrega .env se existir
ifneq (,$(wildcard .env))
include .env
export
endif

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

linear:             ## 🗂️  Review do Linear — issues em review, blockers, stale (@atlas)
	$(PYTHON) $(ADW_DIR)/linear_review.py

community:          ## 📣 Pulso diário da comunidade Discord (@pulse)
	$(PYTHON) $(ADW_DIR)/community_daily.py

community-week:     ## 📊 Relatório semanal da comunidade Discord (@pulse)
	$(PYTHON) $(ADW_DIR)/community_weekly.py

github:             ## 🐙 Review dos repos GitHub — PRs, issues, stars (@atlas)
	$(PYTHON) $(ADW_DIR)/github_review.py

faq:                ## FAQ Sync — atualiza FAQ da comunidade (Discord + GitHub) (@pulse)
	$(PYTHON) $(ADW_DIR)/faq_sync.py

# --- Combos ---

daily: sync review  ## Combo: sync meetings + review todoist

# --- Servidores ---

scheduler:          ## ⏰ Inicia scheduler de rotinas (roda em background)
	$(PYTHON) scheduler.py

telegram:           ## 📨 Inicia bot Telegram (mostra mensagens no console)
	@set -a && source .env && set +a && $(PYTHON) telegram_server.py

# --- Utilitários ---

logs:               ## 📝 Mostra últimos logs (JSONL)
	@tail -20 ADWs/logs/$$(ls -t ADWs/logs/*.jsonl 2>/dev/null | head -1) 2>/dev/null || echo "Nenhum log ainda."

logs-detail:        ## 📝 Lista logs detalhados
	@ls -lt ADWs/logs/detail/ 2>/dev/null | head -11 || echo "Nenhum log ainda."

logs-tail:          ## 📝 Mostra último log completo
	@cat ADWs/logs/detail/$$(ls -t ADWs/logs/detail/ 2>/dev/null | head -1) 2>/dev/null || echo "Nenhum log ainda."

metrics:            ## 📈 Mostra métricas acumuladas por rotina
	@python3 -c "import json; d=json.load(open('ADWs/logs/metrics.json')); [print(f'  {k:20s} runs:{v[\"runs\"]:3d}  ok:{v[\"success_rate\"]:5.1f}%  avg:{v[\"avg_seconds\"]:5.0f}s  last:{v[\"last_run\"][:16]}') for k,v in sorted(d.items())]" 2>/dev/null || echo "Nenhuma métrica ainda."

clean-logs:         ## 🗑️  Remove logs > 30 dias
	@find ADWs/logs/ -name "*.log" -mtime +30 -delete 2>/dev/null; find ADWs/logs/ -name "*.jsonl" -mtime +30 -delete 2>/dev/null; echo "Logs antigos removidos."

help:               ## 📖 Mostra este help
	@grep -E '^[a-zA-Z_-]+:.*##' Makefile | sort | awk 'BEGIN {FS = ":.*## "}; {printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2}'

.PHONY: morning sync triage review memory eod weekly health linear community community-week github faq daily scheduler telegram logs logs-detail logs-tail metrics clean-logs help
.DEFAULT_GOAL := help

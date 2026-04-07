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

trends:             ## 📈 Análise de tendências semanal — comunidade, GitHub, financeiro (@clawdia)
	$(PYTHON) $(ADW_DIR)/trends.py

linear:             ## 🗂️  Review do Linear — issues em review, blockers, stale (@atlas)
	$(PYTHON) $(ADW_DIR)/linear_review.py

community:          ## 📣 Pulso diário da comunidade Discord (@pulse)
	$(PYTHON) $(ADW_DIR)/community_daily.py

community-week:     ## 📊 Relatório semanal da comunidade Discord (@pulse)
	$(PYTHON) $(ADW_DIR)/community_weekly.py

strategy:           ## 🎯 Strategy Digest semanal — visão consolidada do negócio (@sage)
	$(PYTHON) $(ADW_DIR)/strategy_digest.py

github:             ## 🐙 Review dos repos GitHub — PRs, issues, stars (@atlas)
	$(PYTHON) $(ADW_DIR)/github_review.py

faq:                ## FAQ Sync — atualiza FAQ da comunidade (Discord + GitHub) (@pulse)
	$(PYTHON) $(ADW_DIR)/faq_sync.py

# --- Combos ---

daily: sync review  ## Combo: sync meetings + review todoist

# --- Servidores ---

scheduler:          ## ⏰ Inicia scheduler de rotinas (roda em background)
	$(PYTHON) scheduler.py

telegram:           ## 📨 Inicia bot Telegram em background (screen)
	@if screen -list | grep -q '\.telegram'; then \
		echo "⚠ Telegram bot já está rodando. Use 'make telegram-stop' primeiro ou 'make telegram-attach' pra conectar."; \
	else \
		screen -dmS telegram claude --channels plugin:telegram@claude-plugins-official --dangerously-skip-permissions; \
		echo "✅ Telegram bot rodando em background (screen: telegram)"; \
		echo "📺 Ver: screen -r telegram"; \
		echo "🛑 Parar: make telegram-stop"; \
	fi

telegram-stop:      ## 🛑 Para o bot Telegram
	@screen -S telegram -X quit 2>/dev/null && echo "✅ Telegram bot parado" || echo "⚠ Não estava rodando"

telegram-attach:    ## 📺 Conecta ao terminal do Telegram (Ctrl+A D pra desanexar)
	@screen -r telegram

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

# --- Docker (VPS) ---

docker-up:          ## 🐳 Sobe scheduler + telegram em Docker
	docker compose up -d scheduler telegram

docker-down:        ## 🐳 Para todos os containers
	docker compose down

docker-logs:        ## 🐳 Logs dos containers
	docker compose logs -f --tail=50

docker-run:         ## 🐳 Roda rotina manualmente (ex: make docker-run ADW=good_morning.py)
	docker compose run --rm runner ADWs/rotinas/$(ADW)

docker-build:       ## 🐳 Build da imagem
	docker compose build

help:               ## 📖 Mostra este help
	@grep -E '^[a-zA-Z_-]+:.*##' Makefile | sort | awk 'BEGIN {FS = ":.*## "}; {printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2}'

.PHONY: morning sync triage review memory eod weekly health trends linear community community-week github faq strategy daily scheduler telegram telegram-stop telegram-attach logs logs-detail logs-tail metrics clean-logs docker-up docker-down docker-logs docker-run docker-build help
.DEFAULT_GOAL := help

#!/usr/bin/env python3
"""
Evolution Workspace Scheduler
Serviço que executa as rotinas automatizadas nos horários definidos.
Uso: make scheduler (ou python scheduler.py)
"""

import subprocess
import os
import sys
import signal
import schedule
import time
import json
import urllib.request
from datetime import datetime
from pathlib import Path

from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich.theme import Theme

theme = Theme({
    "info": "cyan",
    "success": "bold green",
    "warning": "yellow",
    "error": "bold red",
    "dim": "dim white",
})

console = Console(theme=theme)

WORKSPACE = Path(__file__).parent
PYTHON = "uv run python"
ADW_DIR = WORKSPACE / "ADWs" / "rotinas"

# Telegram
TELEGRAM_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID", "946857210")


def notify(text: str):
    """Envia notificação no Telegram."""
    if not TELEGRAM_BOT_TOKEN:
        return
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    data = json.dumps({
        "chat_id": TELEGRAM_CHAT_ID,
        "text": text,
        "parse_mode": "Markdown",
        "disable_web_page_preview": True,
    }).encode("utf-8")
    try:
        req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
        urllib.request.urlopen(req, timeout=5)
    except Exception:
        pass


def run_adw(name: str, script: str):
    """Executa um ADW como subprocess."""
    now = datetime.now().strftime("%H:%M")
    console.print(f"  [info]{now}[/info] [success]▶[/success] {name}")

    try:
        result = subprocess.run(
            f"{PYTHON} {ADW_DIR / script}",
            shell=True,
            cwd=str(WORKSPACE),
            timeout=900,  # 15 min max
            capture_output=True,
            text=True,
        )

        if result.returncode == 0:
            console.print(f"  [info]{now}[/info] [success]✓[/success] {name} concluído")
        else:
            console.print(f"  [info]{now}[/info] [error]✗[/error] {name} falhou (exit {result.returncode})")
            notify(f"❌ *{name}* falhou (exit {result.returncode})")

    except subprocess.TimeoutExpired:
        console.print(f"  [info]{now}[/info] [error]✗[/error] {name} timeout (15min)")
        notify(f"⏰ *{name}* timeout após 15 minutos")
    except Exception as e:
        console.print(f"  [info]{now}[/info] [error]✗[/error] {name} erro: {e}")
        notify(f"❌ *{name}* erro: {e}")


# ============================================================
# Definição das rotinas
# ============================================================

def setup_schedule():
    """Configura todas as rotinas com seus horários."""

    # --- Diárias ---
    schedule.every().day.at("06:50").do(run_adw, "Review Todoist", "review_todoist.py")
    schedule.every().day.at("07:00").do(run_adw, "Good Morning", "good_morning.py")
    schedule.every().day.at("07:15").do(run_adw, "Email Triage", "email_triage.py")
    schedule.every(30).minutes.do(run_adw, "Sync Meetings", "sync_meetings.py")
    schedule.every().day.at("20:00").do(run_adw, "Community Pulse", "community_daily.py")
    schedule.every().day.at("20:15").do(run_adw, "FAQ Sync", "faq_sync.py")
    schedule.every().day.at("21:00").do(run_adw, "End of Day", "end_of_day.py")
    schedule.every().day.at("21:15").do(run_adw, "Memory Sync", "memory_sync.py")

    # --- Semanais ---
    schedule.every().friday.at("08:00").do(run_adw, "Weekly Review", "weekly_review.py")
    schedule.every().friday.at("08:30").do(run_adw, "Trends", "trends.py")
    schedule.every().friday.at("09:00").do(run_adw, "Strategy Digest", "strategy_digest.py")
    schedule.every().monday.at("09:00").do(run_adw, "Linear Review", "linear_review.py")
    schedule.every().wednesday.at("09:00").do(run_adw, "Linear Review", "linear_review.py")
    schedule.every().friday.at("09:00").do(run_adw, "Linear Review", "linear_review.py")
    schedule.every().monday.at("09:15").do(run_adw, "GitHub Review", "github_review.py")
    schedule.every().wednesday.at("09:15").do(run_adw, "GitHub Review", "github_review.py")
    schedule.every().friday.at("09:15").do(run_adw, "GitHub Review", "github_review.py")
    schedule.every().monday.at("09:30").do(run_adw, "Community Weekly", "community_weekly.py")
    schedule.every().sunday.at("10:00").do(run_adw, "Health Check-in", "health_checkin.py")


def show_schedule():
    """Mostra tabela de rotinas agendadas."""
    table = Table(title="Rotinas Agendadas", border_style="cyan", show_lines=False)
    table.add_column("Próxima execução", style="cyan", width=20)
    table.add_column("Rotina", style="bold white")
    table.add_column("Intervalo", style="dim")

    jobs = sorted(schedule.get_jobs(), key=lambda j: j.next_run)
    for job in jobs:
        next_run = job.next_run.strftime("%Y-%m-%d %H:%M") if job.next_run else "—"
        # Extrai nome da rotina do job
        name = job.job_func.args[0] if job.job_func.args else "?"
        interval = str(job)
        table.add_row(next_run, name, interval)

    console.print(table)


def main():
    """Entry point do scheduler."""
    console.print(Panel(
        "[bold white]Evolution Workspace Scheduler[/bold white]\n"
        "[dim]Executando rotinas automatizadas • Ctrl+C para parar[/dim]",
        border_style="cyan",
        padding=(0, 2)
    ))

    setup_schedule()
    show_schedule()

    total = len(schedule.get_jobs())
    console.print(f"\n  [success]✓[/success] {total} rotinas agendadas")
    console.print(f"  [dim]Timezone: BRT (UTC-3) • Logs: ADWs/logs/[/dim]\n")

    notify(f"🟢 *Scheduler iniciado*\n{total} rotinas agendadas")

    # Graceful shutdown
    def shutdown(sig, frame):
        console.print(f"\n  [warning]⚠ Scheduler encerrado[/warning]")
        notify("🔴 *Scheduler encerrado*")
        sys.exit(0)

    signal.signal(signal.SIGINT, shutdown)
    signal.signal(signal.SIGTERM, shutdown)

    # Loop principal
    while True:
        schedule.run_pending()
        time.sleep(30)


if __name__ == "__main__":
    main()

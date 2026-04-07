#!/usr/bin/env python3
"""
Core runner para ADWs — executa Claude Code CLI com agentes, output visual, logs e notificação Telegram.
"""

import subprocess
import os
import sys
import json
from datetime import datetime
from pathlib import Path

from rich.console import Console
from rich.panel import Panel
from rich.theme import Theme

theme = Theme({
    "info": "cyan",
    "success": "bold green",
    "warning": "yellow",
    "error": "bold red",
    "step": "bold blue",
    "dim": "dim white",
})

console = Console(theme=theme)

WORKSPACE = Path(__file__).parent.parent
LOGS_DIR = Path(__file__).parent / "logs"
LOGS_DIR.mkdir(exist_ok=True)

def _timestamp():
    return datetime.now().strftime("%Y%m%d-%H%M%S")


def _save_metrics(log_name, duration, returncode, agent, stdout):
    """Salva métricas acumuladas por rotina em metrics.json."""
    metrics_file = LOGS_DIR / "metrics.json"
    try:
        metrics = json.loads(metrics_file.read_text()) if metrics_file.exists() else {}
    except (json.JSONDecodeError, OSError):
        metrics = {}

    key = log_name
    if key not in metrics:
        metrics[key] = {"runs": 0, "successes": 0, "failures": 0, "total_seconds": 0, "avg_seconds": 0, "last_run": None, "agent": agent or "none"}

    m = metrics[key]
    m["runs"] += 1
    m["total_seconds"] = round(m["total_seconds"] + duration, 1)
    m["avg_seconds"] = round(m["total_seconds"] / m["runs"], 1)
    m["last_run"] = datetime.now().isoformat()
    m["agent"] = agent or "none"

    if returncode == 0:
        m["successes"] += 1
    else:
        m["failures"] += 1

    m["success_rate"] = round((m["successes"] / m["runs"]) * 100, 1)

    metrics_file.write_text(json.dumps(metrics, indent=2, ensure_ascii=False))


def _log_to_file(log_name, prompt, stdout, stderr, returncode, duration):
    """Salva log estruturado em JSONL + arquivo detalhado."""
    log_file = LOGS_DIR / f"{datetime.now().strftime('%Y-%m-%d')}.jsonl"
    entry = {
        "timestamp": datetime.now().isoformat(),
        "run": log_name,
        "prompt": prompt[:500],
        "returncode": returncode,
        "duration_seconds": round(duration, 1),
        "stdout_lines": len(stdout.splitlines()),
        "stderr_lines": len(stderr.splitlines()),
    }
    with open(log_file, "a") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")

    detail_dir = LOGS_DIR / "detail"
    detail_dir.mkdir(exist_ok=True)
    detail_file = detail_dir / f"{_timestamp()}-{log_name}.log"
    with open(detail_file, "w") as f:
        f.write(f"TIMESTAMP: {datetime.now().isoformat()}\n")
        f.write(f"DURATION: {duration:.1f}s\n")
        f.write(f"RETURNCODE: {returncode}\n")
        f.write(f"PROMPT:\n{prompt}\n\n")
        f.write(f"{'='*60}\nSTDOUT:\n{'='*60}\n{stdout}\n\n")
        if stderr:
            f.write(f"{'='*60}\nSTDERR:\n{'='*60}\n{stderr}\n")


def run_claude(prompt: str, log_name: str = "unnamed", timeout: int = 600, agent: str = None) -> dict:
    """
    Executa Claude Code CLI com streaming de output.

    Args:
        prompt: O prompt a executar
        log_name: Nome para logs
        timeout: Timeout em segundos
        agent: Nome do agente (.claude/agents/*.md) — se None, roda sem agente
    """
    cmd = ["claude", "--print", "--dangerously-skip-permissions"]

    if agent:
        cmd.extend(["--agent", agent])

    cmd.append(prompt)

    agent_label = f"@{agent}" if agent else ""
    console.print(f"  [step]▶[/step] {log_name} [dim]{agent_label}[/dim]", end="")

    start_time = datetime.now()

    try:
        process = subprocess.Popen(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            cwd=str(WORKSPACE),
            env={**os.environ, "TERM": "dumb"},
        )

        stdout_lines = []
        line_count = 0

        for line in process.stdout:
            stdout_lines.append(line)
            line_count += 1
            stripped = line.strip()
            if stripped and not stripped.startswith("{") and len(stripped) > 3:
                display = stripped[:80] + "..." if len(stripped) > 80 else stripped
                console.print(f"\r  [dim]  → {display}[/dim]", end="")

        process.wait(timeout=timeout)

        stderr = process.stderr.read() if process.stderr else ""
        stdout = "".join(stdout_lines)
        duration = (datetime.now() - start_time).total_seconds()

        full_prompt = f"[agent:{agent}] {prompt}" if agent else prompt
        _log_to_file(log_name, full_prompt, stdout, stderr, process.returncode, duration)
        _save_metrics(log_name, duration, process.returncode, agent, stdout)

        if process.returncode == 0:
            console.print(f"\r  [success]✓[/success] {log_name} [dim]({duration:.0f}s, {line_count} linhas)[/dim]")
        else:
            console.print(f"\r  [error]✗[/error] {log_name} [dim](exit {process.returncode}, {duration:.0f}s)[/dim]")
            if stderr:
                for err_line in stderr.strip().splitlines()[:3]:
                    console.print(f"    [error]{err_line}[/error]")

        return {
            "success": process.returncode == 0,
            "stdout": stdout,
            "stderr": stderr,
            "returncode": process.returncode,
            "duration": duration,
        }

    except subprocess.TimeoutExpired:
        process.kill()
        duration = (datetime.now() - start_time).total_seconds()
        console.print(f"\r  [error]✗[/error] {log_name} [warning](timeout {timeout}s)[/warning]")
        _log_to_file(log_name, prompt, "", f"Timeout after {timeout}s", -1, duration)
        return {"success": False, "stdout": "", "stderr": f"Timeout após {timeout}s", "returncode": -1, "duration": duration}

    except KeyboardInterrupt:
        process.kill()
        duration = (datetime.now() - start_time).total_seconds()
        console.print(f"\n  [warning]⚠ Cancelado pelo usuário[/warning]")
        _log_to_file(log_name, prompt, "", "Cancelled by user", -2, duration)
        raise

    except Exception as e:
        duration = (datetime.now() - start_time).total_seconds()
        console.print(f"\r  [error]✗[/error] {log_name} [error]({e})[/error]")
        _log_to_file(log_name, prompt, "", str(e), -3, duration)
        return {"success": False, "stdout": "", "stderr": str(e), "returncode": -3, "duration": duration}


def run_skill(skill_name: str, args: str = "", log_name: str = None, timeout: int = 600, agent: str = None) -> dict:
    """Executa uma skill via CLI, opcionalmente com um agente."""
    prompt = f"Execute a skill /{skill_name} {args}".strip()
    return run_claude(prompt, log_name or skill_name, timeout, agent=agent)


def banner(title: str, subtitle: str = "", color: str = "cyan"):
    content = f"[bold white]{title}[/bold white]"
    if subtitle:
        content += f"\n[dim]{subtitle}[/dim]"
    console.print(Panel(content, border_style=color, padding=(0, 2)))


def summary(results: list, title: str = "Concluído"):
    """Mostra resumo final no terminal."""
    total_duration = sum(r.get("duration", 0) for r in results)
    success = sum(1 for r in results if r.get("success"))
    failed = len(results) - success
    status = "[success]✅ Tudo OK[/success]" if failed == 0 else f"[warning]⚠ {failed} falha(s)[/warning]"
    console.print(Panel(
        f"{status}\n[dim]Steps: {success}/{len(results)} | Tempo: {total_duration:.0f}s[/dim]",
        title=f"[bold]{title}[/bold]",
        border_style="green" if failed == 0 else "yellow",
        padding=(0, 2)
    ))

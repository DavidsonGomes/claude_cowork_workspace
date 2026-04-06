#!/usr/bin/env python3
"""
Core runner para ADWs — wrapper do Claude Code CLI.
Todos os ADWs de rotina usam este módulo.
"""

import subprocess
import os
import json
from datetime import datetime


WORKSPACE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOGS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "logs")
os.makedirs(LOGS_DIR, exist_ok=True)


def run_claude(prompt: str, log_name: str = None, timeout: int = 300) -> dict:
    """Executa Claude Code CLI programaticamente."""
    cmd = [
        "claude",
        "--print",
        "--dangerously-skip-permissions",
        prompt
    ]

    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")

    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            cwd=WORKSPACE,
            timeout=timeout
        )

        output = {
            "success": result.returncode == 0,
            "stdout": result.stdout,
            "stderr": result.stderr,
            "returncode": result.returncode
        }

        if log_name:
            log_path = os.path.join(LOGS_DIR, f"{timestamp}-{log_name}.log")
            with open(log_path, "w") as f:
                f.write(f"TIMESTAMP: {timestamp}\n")
                f.write(f"PROMPT: {prompt[:500]}\n\n")
                f.write(f"STDOUT:\n{result.stdout}\n\n")
                f.write(f"STDERR:\n{result.stderr}\n")

        return output

    except subprocess.TimeoutExpired:
        return {"success": False, "stdout": "", "stderr": f"Timeout após {timeout}s"}
    except Exception as e:
        return {"success": False, "stdout": "", "stderr": str(e)}


def run_skill(skill_name: str, args: str = "", log_name: str = None, timeout: int = 300) -> dict:
    """Executa uma skill do Claude Code via CLI."""
    prompt = f"Execute a skill /{skill_name} {args}".strip()
    return run_claude(prompt, log_name or skill_name, timeout)

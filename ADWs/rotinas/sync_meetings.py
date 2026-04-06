#!/usr/bin/env python3
"""
ADW: Sync Meetings — Puxa reuniões do Fathom + cria tarefas no Todoist
Skills: sync-meetings (fathom + todoist)
"""

import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from runner import run_skill

def main():
    print("🎙️  Sync Meetings — Sincronizando reuniões...")
    run_skill("sync-meetings", log_name="sync-meetings", timeout=600)
    print("✅ Sync concluído.")

if __name__ == "__main__":
    main()

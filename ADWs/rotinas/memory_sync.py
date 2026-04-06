#!/usr/bin/env python3
"""
ADW: Memory Sync — Consolida memória a partir de sessões e reuniões recentes
Skills: memory-management + leitura de daily logs + summaries
"""

import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from runner import run_claude

PROMPT = """Execute a rotina de consolidação de memória:

1. Leia os últimos 3 daily logs em '01 Daily Logs/' (mais recentes primeiro)
2. Leia os summaries de reuniões dos últimos 3 dias em '09 Reuniões/summaries/'
3. Para cada fonte, extraia:
   - Decisões tomadas → salvar em memory/ como tipo 'project'
   - Pessoas novas ou contexto novo sobre pessoas → salvar como tipo 'user' ou atualizar existente
   - Feedbacks ou correções de abordagem → salvar como tipo 'feedback'
   - Termos ou referências externas novas → salvar como tipo 'reference'
4. Antes de salvar, verificar se já existe memória similar — atualizar em vez de duplicar
5. Atualizar MEMORY.md com ponteiros para novos arquivos

Reportar no final: quantas memórias criadas/atualizadas por tipo.
Ser conciso — não criar memórias para coisas óbvias ou já documentadas no código.
"""

def main():
    print("🧠 Memory Sync — Consolidando memória...")
    run_claude(PROMPT, log_name="memory-sync", timeout=600)
    print("✅ Memória consolidada.")

if __name__ == "__main__":
    main()

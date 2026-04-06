#!/usr/bin/env python3
"""
ADW: Fechamento Mensal — Consolida receitas, despesas e gera relatório
Skills: stripe + omie + todoist (via agente Flux)
"""

import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from runner import run_claude

PROMPT = """Execute o fechamento financeiro do mês usando o agente @flux-financeiro:

1. Consultar dados do Stripe (cobranças, assinaturas, reembolsos do mês)
2. Consultar dados do Omie (contas a receber, contas a pagar, NFs emitidas)
3. Consolidar:
   - Receita bruta e líquida
   - Despesas por categoria
   - MRR, ARR, burn rate, runway
   - Comparativo com mês anterior
4. Gerar relatório em '07 Financeiro/reports/monthly/YYYY-MM.md'
5. Alertar sobre anomalias ou desvios >10%

Formato do relatório: resumo executivo + tabelas + riscos + próximos passos.
"""

def main():
    print("💰 Fechamento Mensal — Consolidando financeiro...")
    run_claude(PROMPT, log_name="fechamento-mensal", timeout=900)
    print("✅ Fechamento concluído.")

if __name__ == "__main__":
    main()

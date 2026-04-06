# Análise de Tendências — Semana W15

**Período:** 06 de abril de 2026
**Comparativo:** W14 (baseline 06/04) → W15

---

## Resumo Executivo

- ✅ **Melhorou:** ADWs com 100% de success rate; sentimento da comunidade subiu de "misto" para "positivo"; 78 novos membros impulsionados pelo anúncio do Summit
- ⚠️ **Piorou:** Issues no evolution-api subiram 408 → 428 (+5%) sem commits recentes (último: 24/02); evo-ai acumula 4 PRs sem triagem — 2 são spam externo
- 💡 **Oportunidade:** Integração Evo Go + Chatwoot é a feature mais pedida (5+ pedidos); lib open source já existe na comunidade — documentar oficialmente tem custo baixo e impacto alto

---

## Scorecard

| Área | Métrica | Atual (W15) | Anterior (W14) | Var | Trend | Status |
|------|---------|-------------|----------------|-----|-------|--------|
| Comunidade | WAM | 81 | 81 | 0% | → | 🟢 |
| Comunidade | Mensagens/semana | 497 | 497 (baseline) | 0% | → | 🟢 |
| Comunidade | Novos membros | 78 | — (baseline) | — | → | 🟢 |
| Comunidade | Threads fórum ativas | 29 | — (baseline) | — | → | 🟡 |
| Comunidade | Docs gaps | 6 | — (baseline) | — | → | 🟡 |
| Comunidade | Sentimento | Positivo | Misto | ↑ melhora | ↑ | 🟢 |
| GitHub | Issues abertas (evo-api) | 428 | 408 | +20 (+4,9%) | ↑ | 🔴 |
| GitHub | PRs abertos (evo-api) | ~10 | 10 | = | → | 🟡 |
| GitHub | PRs abertos (evo-ai) | 4 | — | — | → | 🟡 |
| GitHub | Stars (evo-api) | 7.785 | 7.785 | 0 | → | 🟡 |
| GitHub | Stars (evo-go) | 169 | 169 | 0 | → | 🟡 |
| GitHub | Commits recentes (evo-api) | 0 | 0 (últ. 24/02) | inativo | → | 🔴 |
| Financeiro | MRR | — | — | sem dados | → | 🟡 |
| Operacional | Success rate ADWs | 100% | 100% | = | → | 🟢 |
| Operacional | Rotinas com dados | 3 | 2 | +1 | ↑ | 🟢 |

---

## Padrões Detectados

- **Correlação Summit → Crescimento:** 78 membros novos coincidindo com anúncio do Summit. Monitorar 2 semanas pós-evento (14-20/abr) para confirmar padrão
- **Correlação Issues GitHub ↑ + Bugs Discord ↑:** +20 issues acumuladas enquanto comunidade reporta bugs recorrentes (stream:error 515, duplicação webhooks Evo Go, bloqueios). Sinal de dívida técnica acumulando sem releases
- **Evo-ai com fila de PRs degradada:** 2 PRs são spam (badge MseeP duplicado), 1 com 9+ meses parado, 1 contribuição real de AG2 engine sem review

---

## Riscos

- 🔴 **evolution-api inativo há 40+ dias** — último push 24/02; issues crescendo; bugs críticos sem fix publicado (stream:error 515 causa logout indevido)
- 🟡 **6 docs gaps acumulados** — cada gap gera múltiplos tickets de suporte no Discord
- 🟡 **Financeiro cego** — Stripe não consultado em nenhuma execução; MRR desconhecido

---

## Oportunidades

- Documentar guia oficial Evo Go + Chatwoot (lib da comunidade já existe)
- Preparar onboarding específico pós-Summit (pico esperado de membros 14-20/abr)
- Triagem de PRs no evo-ai: fechar #40 e #43 (spam), revisar #46 (AG2 engine — contribuição técnica real)

---

## Recomendações

1. **Conectar Stripe às rotinas ADW** — MRR está cego faz 2 semanas; habilitar `/int-stripe` nas próximas execuções
2. **Avaliar fix stream:error 515 no evolution-api** — Bug com reprodução 100% e solução proposta (PR #2498); encaminhar para Danilo/time
3. **Fechar PRs spam no evo-ai** — Fechar #40 e #43 como "won't merge" + revisar #46 com Danilo
4. **Criar guia oficial Evo Go + Chatwoot** — Usar lib da comunidade (yuricaetano) como base; baixo esforço, alto impacto
5. **Preparar onboarding pós-Summit** — Fluxo de boas-vindas + FAQ temático para 14-20/abr

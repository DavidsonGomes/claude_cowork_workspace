# Análise de Tendências — Semana W14 (2026-04-06)

> **Nota:** Primeira execução — sem comparativo disponível. Esta semana serve como baseline.

---

## Resumo Executivo

- ✅ **Crescimento sólido de comunidade:** 78 novos membros na semana, WAM de 81 — impulsionado pelo anúncio do Evolution Summit. Engajamento acima do esperado para early April.
- ⚠️ **GitHub em estado crítico de backlog:** 408 issues abertas no evolution-api, 10 PRs sem merge há semanas — comunidade corrigindo bugs com patches manuais. Issue #2492 denuncia abandono do projeto.
- 🔴 **Bloqueios de WhatsApp são o maior risco operacional:** 15+ instâncias baneadas em 7 dias, múltiplos relatos de ban apenas ao escanear QR code. Pode indicar mudança de política do WhatsApp — precisa de comunicado urgente.

---

## Scorecard

| Área | Métrica | Atual | Anterior | Var | Trend | Status |
|------|---------|-------|----------|-----|-------|--------|
| Comunidade | WAM | 81 | N/A (baseline) | — | — | 🟢 |
| Comunidade | Novos membros (semana) | 78 | N/A | — | — | 🟢 |
| Comunidade | Mensagens (24h) | 117 | N/A | — | — | 🟢 |
| Comunidade | Total msgs semana | 497 | N/A | — | — | 🟢 |
| Comunidade | Threads Help ativos | 29 | N/A | — | — | 🟡 |
| Comunidade | Sentimento | Misto | N/A | — | — | 🟡 |
| GitHub (evo-api) | Issues abertas | 408 | N/A | — | — | 🔴 |
| GitHub (evo-api) | PRs abertos | 10+ | N/A | — | — | 🟡 |
| GitHub (evo-api) | Stars totais | 7.785 | N/A | — | — | 🟢 |
| GitHub (evo-ai) | Issues abertas | 17 | N/A | — | — | 🟢 |
| GitHub (evo-go) | Stars totais | 169 | N/A | — | — | 🟢 |
| GitHub (evo-go) | Forks | 76 | N/A | — | — | 🟢 |
| Operacional | ADW success rate | 100% | N/A | — | — | 🟢 |
| Financeiro | MRR | N/A | N/A | — | — | — |

---

## Padrões Detectados (W14 — baseline)

- **Bloqueios de instâncias em alta:** Múltiplos usuários relatando bans logo após escanear QR code, mesmo com números antigos. Não é bug de código — possivelmente mudança de política do WhatsApp/Meta. Correlação: aparece tanto no Discord (sentimento) quanto no GitHub (issues #2497, #2488, #2489).
- **Bug QR code + stream:error 515 é sistêmico:** Issue #2498 descreve com precisão cirúrgica um bug em v2.2.3 que mata instâncias saudáveis após reconexão. Já existe diagnóstico completo com fix sugerido pela comunidade — aguarda merge.
- **Evo Go sendo adotado mas com gaps de documentação:** 5+ pedidos por semana de integração Evo Go + Chatwoot; comunidade criou bridge OSS (yuricaetano). Documentação do parâmetro `/send/media type` causa confusão recorrente.
- **Evolution Summit impulsionando crescimento:** O anúncio do Summit (14–16/abr) gerou crescimento mensurável de membros. Oportunidade para ampliar esse efeito nas próximas semanas.
- **Evo CRM gerando curiosidade:** 4 perguntas por semana sobre "o que é Evo CRM, quando lança". Com o lançamento previsto esta semana, esse volume deve explodir.

---

## Riscos

- 🔴 **Bloqueios em massa de WhatsApp:** 15+ instâncias baneadas em 7 dias relatadas por um único usuário (guilherme.cosme.lima). Pode ser mudança de política Meta. Sem comunicado proativo → frustração e abandono de usuários. Ação: comunicado + orientações de uso seguro.
- 🔴 **GitHub evolution-api com 408 issues abertas sem triagem:** Issue pública (#2492) questionando abandono do projeto. Comunidade aplicando patches em `dist/main.js` em produção como workaround. Reputação em risco.
- 🟡 **10 PRs abertos sem review:** Fixes relevantes (stream:error 515, archiveChat, mentionsEveryOne, sendList) aguardando merge. Cada dia sem merge = mais usuários afetados.
- 🟡 **Webhook duplicação no Evo Go:** 5 tickets na mesma thread. Afeta lógica de automação de clientes em produção.

---

## Oportunidades

- **Integração nativa Evo Go + Chatwoot:** Pedido mais frequente da semana (5+). Bridge OSS da comunidade já existe como base. Documentar e endossar oficialmente → satisfação imediata sem esforço de desenvolvimento.
- **Documentação do parâmetro `type` em `/send/media` (Evo Go):** Confusão recorrente, fácil de resolver com 1 parágrafo na doc. Alto impacto em suporte.
- **Capitalizar o momentum do Summit para crescimento de comunidade:** 78 membros novos só com o anúncio. Pré-launch content + contagem regressiva podem dobrar isso.
- **Evo CRM launch → pico de dúvidas:** 4 perguntas/semana agora, vai explodir na semana de lançamento. Preparar FAQ proativo antes do lançamento.

---

## Recomendações

1. **[URGENTE] Comunicado sobre bloqueios de WhatsApp** — postar no Discord e community explaining o risco de ban em v2.3.7 e boas práticas (warm-up, evitar multi-device agressivo). Sem isso, usuários culpam o produto.
2. **[URGENTE] Triagem de PRs no evolution-api** — os PRs #2498 (stream:error 515), #2471 (fileName), #2470 (mentionsEveryOne) têm fixes bem documentados. Danilo pode priorizar review rápido.
3. **Criar FAQ de Evo CRM antes do lançamento** — "O que é, quando lança, diferença do Evo AI". Já há demanda; responder proativamente reduz volume de suporte no dia D.
4. **Documentar Evo Go + Chatwoot e parâmetro `type`** — duas páginas de doc que eliminam as perguntas mais frequentes da semana. ROI alto, esforço baixo.
5. **Aproveitar Summit para campanha de membros** — criar contagem regressiva no Discord, posts de bastidores. Já está funcionando organicamente; turbinar intencionalmente.

---

*Gerado em 2026-04-06 | Fonte: Discord (daily pulse + W14 weekly), GitHub (evolution-api, evo-ai, search), ADW metrics*

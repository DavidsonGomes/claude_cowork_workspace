# Visão Geral — Estratégia

> Agente: @sage | Command: `/sage`
> Última atualização: 2026-04-06

## Estrutura

```
09 Estrategia/
├── [C] Visão Geral — Estratégia.md   ← este arquivo (index/dashboard)
├── okrs/
│   ├── OKRs.md                        ← OKRs Q4 2025 → Q4 2026 (completo)
│   └── [C] YYYY-QX-okrs.md           ← revisões trimestrais geradas pelo Sage
├── roadmap/
│   ├── Roadmap.md                     ← Roadmap estratégico 2026 (guia vivo)
│   └── [C] YYYY-roadmap.md            ← versões/atualizações geradas pelo Sage
├── analises/
│   ├── Indicadores.md                 ← KPIs estratégicos (North Star, receita, produto)
│   ├── [C] competitiva.md             ← análise competitiva (semestral)
│   ├── [C] mercado.md                 ← análise de mercado
│   └── [C] YYYY-MM-DD-briefing.md    ← briefings sob demanda
├── cenarios/
│   └── [C] YYYY-QX-cenarios.md       ← cenários otimista/base/pessimista
├── decisoes/
│   └── [C] decisoes.md                ← registro de decisões estratégicas
├── digests/
│   └── [C] YYYY-WXX-strategy-digest.md ← digest semanal gerado pelo Sage
├── plano-de-negocio/
│   ├── Visão.md                       ← visão estratégica, propósito, valores, aprendizados 2025
│   ├── Valores.md                     ← os 5 valores da Evolution (formato descritivo)
│   ├── Plano_de_Negocio.md            ← modelo de negócio, pricing, GTM, linhas de receita
│   └── CEO_Playbook.md                ← manual de liderança do CEO (aprendizados, rituais, decisões)
└── pessoas/
    └── Planos de Carreira/            ← PDIs e formulários de carreira do time
        ├── Metodologia - Plano de Carreira Evolution.md
        ├── Formulário - Mapeamento de Carreira.md
        ├── Análise CEO - Feedbacks Time vs Playbook 2026.md
        ├── Daniel Paes/               ← PDI + Formulário
        ├── Danilo Leone/              ← PDI + Formulário
        ├── Guilherme Oliveira/        ← PDI + Formulário
        └── Nickolas Melo/             ← PDI + Formulário
```

---

## Documentos principais

| Arquivo | Caminho | Descrição | Versão |
|---------|---------|-----------|--------|
| **Visão.md** | `plano-de-negocio/Visão.md` | Visão de futuro, propósito, valores, aprendizados 2025, posicionamento estratégico | v2.1 |
| **Valores.md** | `plano-de-negocio/Valores.md` | Os 5 valores da Evolution em formato descritivo completo | — |
| **Plano_de_Negocio.md** | `plano-de-negocio/Plano_de_Negocio.md` | Modelo de negócio operacional: monetização, pricing, GTM, projeções | v3.1 |
| **CEO_Playbook.md** | `plano-de-negocio/CEO_Playbook.md` | Manual de liderança: erros 2025, rituais, cultura, delegação, gestão do time | v2.x |
| **OKRs.md** | `okrs/OKRs.md` | OKRs Q4 2025 (concluído) + Q1–Q4 2026 com KRs detalhados e metas de MRR | v3.2 |
| **Roadmap.md** | `roadmap/Roadmap.md` | Roadmap de entregas trimestrais 2026 (guia vivo, revisado mensalmente) | v3.x |
| **Indicadores.md** | `analises/Indicadores.md` | KPIs estratégicos: North Star, receita, comunidade, white-label, produto, financeiro | v3.1 |

---

## Fontes de dados do Sage

| Fonte | Skill | O que extrai |
|-------|-------|-------------|
| Stripe | `/int-stripe` | MRR, ARR, churn, receita, assinaturas |
| Omie | `/int-omie` | Contas a pagar/receber, custos |
| Linear | `/int-linear-review` | Velocidade do time, backlogs, entregas |
| GitHub | `/int-github-review` | Stars, forks, issues, atividade open source |
| Comunidade | `/pulse-daily`, `/pulse-weekly` | Sentimento, crescimento, engajamento |
| Tendências | `/prod-trends` | Comparativo semanal de todas as métricas |
| Mercado | `/evo-market-research` | Concorrência, tendências do setor |

---

## Cadência estratégica

| Frequência | O que | Arquivo |
|-----------|-------|---------|
| Semanal | Strategy Digest | `digests/[C] YYYY-WXX-strategy-digest.md` |
| Trimestral | Revisão de OKRs | `okrs/[C] YYYY-QX-okrs.md` |
| Trimestral | Atualização de cenários | `cenarios/[C] YYYY-QX-cenarios.md` |
| Semestral | Análise competitiva | `analises/[C] competitiva.md` |
| On-demand | Briefings | `analises/[C] YYYY-MM-DD-briefing.md` |

---

## Contexto rápido (hot cache)

- **Propósito:** "Fazer pessoas e negócios crescerem para que seus sonhos transformem o mundo."
- **Missão (formal, março 2026):** Democratizar acesso à IA e automação para PMEs de forma acessível e simplificada
- **Visão (formal, março 2026):** Ser o ecossistema de referência que forma, treina e lança profissionais e negócios que levam IA ao mercado brasileiro
- **Tagline principal:** "A tecnologia que muda negócios, agora ao alcance de todos."
- **Posicionamento:** Evolution não é ferramenta, é ecossistema com missão — tecnologia + educação + comunidade
- **Ecossistema de produtos (março 2026):**
  - Produto 1: **Evo Community** — Contributor R$89/mês (ou R$890/ano) | Pro Support R$399/mês
  - Produto 2: **Evo Academy** — R$149/mês | R$950/ano (OTO do Contributor com 1 ano extra grátis)
  - Produto 3: **Evo Cloud** — em standby, aguardando validação plataforma open source
- **Evento âncora Q2:** Evolution Summit 14-16/04/2026 (3 lives às 19h) | Carrinho: 16-23/04 (7 dias)
- **Meta principal 2026:** R$ 200k+ MRR (desbloqueado em Q4 2026 — meta R$ 260-330k)
- **Marco salarial (META COLETIVA):** Q2 2026 — R$ 132-174k MRR → Faixa 2
- **Meta de celebração:** R$ 217k MRR em Q4 2026 → viagem de confraternização
- **Break-even:** Alcançado em Q1 2026 (MRR R$ 80-85k ≥ OPEX R$ 50-60k)
- **Base crowdfunding:** R$ 115k arrecadados | 674 contribuidores (Q4 2025)
- **Estratégia de lançamento:** ativação de demanda reprimida (não aquisição fria) — base já existe, trabalho é converter
- **Porta-voz:** Davidson como fundador visionário — fala de negócio e mercado, não de código

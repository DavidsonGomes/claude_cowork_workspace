# AI Business Framework — Análise & Roadmap Open Source

> Documento de análise funcional e plano para transformar o workspace atual em um framework open source de IA para negócios.
> Criado em: 2026-04-08

---

## 1. Visão do Produto

**O que é:** Um framework open source que dá a qualquer negócio um "operating system" alimentado por IA — com agentes especializados por área, rotinas automatizadas, memória persistente e integrações com ferramentas reais.

**Para quem:** Fundadores, CEOs de PMEs, operadores de negócio e equipes pequenas que querem automatizar operações sem construir do zero.

**Diferencial:** Não é um chatbot genérico. É um sistema opinativo com cobertura funcional real — financeiro, vendas, comunidade, produto, marketing, RH — que roda como infra do dia-a-dia.

---

## 2. Análise Funcional — Estado Atual

### 2.1 Cobertura por Área de Negócio

```
✅ Forte          ⚠️ Existe mas raso     ❌ Não existe

Operações dia-a-dia    ✅   (briefing, email triage, EOD, agenda, tarefas)
Financeiro             ✅   (P&L, DRE, reconciliação, journal entries, SOX, fechamento mensal)
PM / Projetos          ✅   (status, milestones, sprint planning, Linear/GitHub review)
Comunidade             ✅   (pulse diário/semanal/mensal, FAQ sync, sentimento)
Social Media           ✅   (posts, threads, carrosséis, calendário, performance — 13 skills)
Marketing (skills)     ✅   (campanhas, SEO, email sequences, content creation — 8 skills)
Estratégia             ⚠️   (OKR review + strategy digest + competitive analysis — básico)
Comercial / Vendas     ⚠️   (agente genérico sem funil estruturado)
Educação               ⚠️   (agente genérico sem plataforma real)
RH / People Ops        ❌
Customer Success       ❌
Jurídico / Compliance  ❌
Supply Chain           ❌
BI / Dados unificado   ❌
Produto (negócio)      ❌
```

### 2.2 Detalhamento dos Gaps

#### ❌ RH / People Ops
- Onboarding de funcionários (checklist, materiais, primeiros 30/60/90 dias)
- Tracking de 1:1s e feedback loops
- Performance reviews com templates e ciclos
- Pesquisa de clima / cultura
- Controle de férias e afastamentos
- Hiring pipeline (candidatos, entrevistas, scorecards)

#### ❌ Customer Success / Pós-venda
- Health score de clientes (baseado em uso, tickets, pagamentos)
- Churn prediction — sinais de risco e alertas
- NPS / CSAT tracking e análise
- Onboarding de clientes (checklist, ativação, marcos)
- Upsell / cross-sell triggers
- Ticket tracking com SLA

#### ❌ Jurídico / Compliance
- Gestão de contratos (vencimentos, renovações, alertas automáticos)
- Compliance checklist por área (LGPD, SOX, regulatórios)
- Privacy tracking (bases legais, consentimento, DSAR)
- Propriedade intelectual (licenças open source, trademarks)

#### ❌ Supply Chain / Operações
- Gestão de fornecedores (cadastro, avaliação, SLA)
- Procurement (cotações, aprovações, POs)
- SLA tracking de fornecedores
- Inventory (se aplicável)

#### ❌ BI / Dados Unificado
- Dashboard consolidado cross-área
- KPIs unificados com metas e thresholds
- Alertas automáticos quando KPI sai do range
- Trend analysis cross-funcional
- Cohort analysis

#### ❌ Produto (lado negócio)
- User research / discovery framework
- Feature prioritization (RICE, ICE, impact mapping)
- Product-led growth metrics (activation, retention, expansion)
- Feedback loop estruturado (comunidade → backlog → release → comunidade)
- Changelog / release communication

#### ⚠️ Comercial / Vendas — Precisa evoluir
O agente Nex existe mas falta substância:
- Funil de vendas estruturado (etapas, taxas de conversão, velocity)
- Forecasting de receita
- Follow-up automatizado com cadência configurável
- Win/loss analysis
- Integração com CRM real
- Playbooks de vendas por segmento/ICP

#### ⚠️ Estratégia — Precisa evoluir
O agente Sage cobre o básico mas falta:
- Scenario planning estruturado
- Board/investor reporting templates
- Business model canvas / lean canvas como workflow
- Strategic planning cycle (annual → quarterly → monthly)

#### ⚠️ Marketing — Skills fortes, sem orquestração
Tem 8 skills maduras mas:
- Não tem agente dedicado orquestrando
- Falta attribution tracking (de onde veio o lead)
- Falta gestão de budget de marketing
- Falta funil completo: conteúdo → lead → nurture → conversão

### 2.3 Rotinas que Faltam

| Rotina | Frequência | Propósito |
|---|---|---|
| Pipeline review | Diária | Deals em risco, follow-ups atrasados |
| Customer health check | Semanal | Clientes em risco de churn |
| Contract alerts | Semanal | Contratos vencendo em 30/60/90 dias |
| KPI digest unificado | Semanal | MRR + community + GitHub + NPS consolidado |
| Hiring funnel review | Semanal | Candidatos em aberto, próximas entrevistas |
| Marketing attribution | Mensal | De onde vieram os leads/clientes |
| Quarterly business review | Trimestral | OKRs + financeiro + produto + mercado |

### 2.4 O que já está Forte

| Componente | Detalhe |
|---|---|
| **Evo Method** | Pipeline completo de dev: Análise → Plano → Solução → Implementação. 9 agentes especializados, step-file architecture. |
| **ADW Runner** | Engine Python + Claude CLI com logging JSONL, métricas, Docker. Reutilizável. |
| **Sistema de Memória** | 3 camadas: hot cache (CLAUDE.md) → global (memory/) → per-agent. Tipado, indexado. |
| **109 Skills** | Cobertura ampla com skills de 6 a 320 linhas. Muitas production-grade. |
| **Financeiro** | GAAP-compliant: DRE, balanço, fluxo de caixa, SOX, reconciliação, fechamento mensal. |
| **Social Media** | Sistema completo: contexto de voz, 6 formatos de conteúdo, análise de performance, calendário. |
| **Comunidade** | Pulse reports, FAQ sync, sentimento, métricas de engajamento — cobertura real. |

---

## 3. Roadmap para Open Source de Respeito

### Fase 0 — Fundação (Pré-release)
**Objetivo:** Tornar o framework instalável e configurável por qualquer pessoa.

- [ ] **Config centralizada** — Um único `workspace.config.yaml` que alimenta tudo:
  - Nome, empresa, timezone, idioma
  - IDs de integração (Telegram, Discord, etc.)
  - Estrutura de pastas customizável
  - Agentes ativos e seus domínios
- [ ] **Setup wizard** — `make setup` interativo que gera config, `.env`, `CLAUDE.md`
- [ ] **`.env.example`** — Todas as variáveis documentadas
- [ ] **`CLAUDE.template.md`** — Template que o setup preenche
- [ ] **Anonimização total** — Remover CPF, CNPJ, contas bancárias, IDs pessoais
- [ ] **Agent template** — Template documentado de "como criar um agente de domínio"
- [ ] **Skill template** — Template + guia de como criar skills
- [ ] **Documentação do step-file protocol** — O padrão é genial mas não está documentado

### Fase 1 — Core Framework (v0.1)
**Objetivo:** Entregar o framework funcional com as áreas já maduras.

#### Agentes de Lançamento
| Agente | Área | Baseado em |
|---|---|---|
| **Ops Agent** | Operações dia-a-dia | Clawdia (generalizado) |
| **Finance Agent** | Financeiro | Flux (generalizado) |
| **Project Agent** | Gestão de projetos | Atlas (generalizado) |
| **Community Agent** | Comunidade | Pulse (generalizado) |
| **Social Agent** | Redes sociais | Pixel (generalizado) |
| **Strategy Agent** | Estratégia | Sage (generalizado) |
| **Sales Agent** | Comercial | Nex (expandido) |
| **Marketing Agent** | Marketing | Novo (baseado nas 8 skills existentes) |

#### Rotinas de Lançamento
- Morning briefing configurável
- Email triage
- End of day
- Community pulse
- Financial pulse
- Sprint/project review

#### Infra
- [ ] ADW Runner com retry logic e alerting
- [ ] Scheduler com timezone configurável
- [ ] Sistema de memória com cleanup automático
- [ ] Docker compose para deploy one-click
- [ ] CLI via Makefile com `make help` auto-gerado

#### Integrações Base (Adapter Pattern)
```
integrations/
├── calendar/
│   ├── adapter.md          — interface padrão
│   ├── google-calendar.md  — implementação Google
│   └── outlook.md          — implementação Outlook (futuro)
├── email/
│   ├── adapter.md
│   ├── gmail.md
│   └── outlook.md          — futuro
├── tasks/
│   ├── adapter.md
│   ├── todoist.md
│   └── linear.md
├── crm/
│   ├── adapter.md
│   ├── hubspot.md          — futuro
│   └── pipedrive.md        — futuro
├── erp/
│   ├── adapter.md
│   ├── omie.md
│   └── quickbooks.md       — futuro
├── messaging/
│   ├── adapter.md
│   ├── slack.md            — futuro
│   ├── discord.md
│   └── telegram.md
├── payments/
│   ├── adapter.md
│   └── stripe.md
└── meetings/
    ├── adapter.md
    ├── fathom.md
    └── otter.md            — futuro
```

### Fase 2 — Expansão Funcional (v0.2)
**Objetivo:** Cobrir as áreas de negócio que faltam.

#### Novos Agentes

**Customer Success Agent**
- Health score computation (usage × payments × tickets × NPS)
- Churn risk alerts (triggers configuráveis)
- Onboarding checklists por segmento de cliente
- Rotina semanal: customer health check
- Skills: cs-health-score, cs-churn-alert, cs-onboarding, cs-nps-analysis

**HR Agent**
- Hiring pipeline (candidatos → entrevista → oferta → onboarding)
- 1:1 tracking com templates e follow-ups
- Performance review cycles
- Rotina semanal: hiring funnel review
- Skills: hr-hiring-pipeline, hr-one-on-one, hr-performance-review, hr-onboarding

**Legal Agent**
- Gestão de contratos (tracking, alertas de vencimento)
- Compliance checklists (LGPD, SOX, GDPR)
- Rotina semanal: contract alerts
- Skills: legal-contract-tracker, legal-compliance-check, legal-privacy-audit

**Product Agent** (lado negócio, não dev)
- Feature prioritization frameworks (RICE, ICE)
- User research synthesis
- PLG metrics tracking (activation, retention, expansion)
- Feedback loop: comunidade → backlog → release notes
- Changelog / release communication
- Skills: product-prioritize, product-research-synthesis, product-plg-metrics, product-changelog

#### BI Unificado
- KPI registry central (cada agente registra seus KPIs)
- Dashboard aggregator que puxa de todos os agentes
- Threshold alerts cross-área
- Rotina semanal: KPI digest unificado
- Rotina trimestral: Quarterly Business Review

#### Evolução de Agentes Existentes

**Sales Agent (v2)**
- Funil estruturado com etapas, conversão, velocity
- Forecasting baseado em pipeline
- Follow-up cadence engine
- Win/loss analysis
- Playbooks por segmento

**Strategy Agent (v2)**
- Scenario planning com variáveis
- Board/investor reporting
- Business model canvas como workflow
- Annual → quarterly → monthly planning cycle

**Marketing Agent (v2)**
- Attribution tracking
- Budget management
- Funil completo: conteúdo → lead → nurture → conversão
- A/B test framework

### Fase 3 — Plataforma (v0.3)
**Objetivo:** De framework para plataforma.

- [ ] **Plugin registry** — Community marketplace para skills, agentes e integrações
- [ ] **Multi-user** — Múltiplos usuários no mesmo workspace com roles/permissões
- [ ] **Agent-to-agent messaging** — Comunicação assíncrona entre agentes (não só Party Mode)
- [ ] **Web dashboard** — UI live para métricas, status de rotinas, health dos agentes
- [ ] **Webhook system** — Eventos de negócio que disparam ações entre agentes
- [ ] **Template gallery** — Starter kits por tipo de negócio:
  - SaaS Startup
  - Agência / Consultoria
  - E-commerce
  - Open Source Project
  - Freelancer / Solo Founder

### Fase 4 — Maturidade (v1.0)
**Objetivo:** Open source de referência.

- [ ] **SDK para agentes customizados** — API clara para criar agentes em qualquer linguagem
- [ ] **Observability stack** — Métricas, traces, logs unificados (OpenTelemetry-compatible)
- [ ] **Governance framework** — Audit trail de decisões tomadas por agentes
- [ ] **Multi-LLM support** — Não preso ao Claude (suporte a OpenAI, Gemini, Llama)
- [ ] **Self-hosted vs. managed** — Opção cloud para quem não quer rodar local
- [ ] **Certificação / badges** — Para consultores que implementam o framework
- [ ] **Case studies** — Documentação de implementações reais

---

## 4. Diferencial Competitivo

### O que existe no mercado
| Projeto | O que faz | Limitação |
|---|---|---|
| AutoGPT / CrewAI | Multi-agent genérico | Sem opinião de negócio, sem rotinas |
| LangChain | Infra de LLM | Toolkit, não framework de negócio |
| Zapier AI | Automação com IA | Sem agentes especializados, sem memória |
| Notion AI / Copilot | IA dentro de uma ferramenta | Preso a um produto |

### Nosso diferencial
1. **Opinativo por área de negócio** — Não é "crie seus agentes". Já vem com agentes para cada área (financeiro, vendas, RH, CS) com rotinas e skills prontas.
2. **Rotinas automatizadas** — Não espera o usuário perguntar. O sistema roda sozinho: morning briefing, pipeline review, health check, EOD.
3. **Memória persistente tipada** — Agentes lembram contexto entre sessões. Memória versionada, indexada, com promoção/demoção automática.
4. **Integrações reais** — Não é demo. Conecta com Stripe, Gmail, Calendar, Discord, Linear, ERP de verdade.
5. **Metodologia de dev incluída** — O Evo Method é um framework de desenvolvimento completo embutido: da pesquisa ao deploy com agentes especializados.
6. **File-based, git-friendly** — Tudo é markdown e YAML. Sem banco de dados. Versionável, auditável, forkável.

---

## 5. Naming & Positioning

### Sugestões de nome
- **EvoOS** — "Operating System for Business, powered by AI"
- **Evo Framework** — Direto, conecta com Evolution API
- **BizAgent** — Genérico mas descritivo
- **FounderOS** — Posiciona para fundadores/CEOs

### Tagline options
- "Your business, on autopilot — with AI agents that actually work"
- "The open source operating system for AI-powered businesses"
- "From morning briefing to monthly close — AI agents for every business function"

---

## 6. Métricas de Sucesso do Open Source

| Métrica | Meta 6 meses | Meta 12 meses |
|---|---|---|
| GitHub Stars | 1.000 | 5.000 |
| Contributors | 10 | 50 |
| Forks ativos | 50 | 200 |
| Integrações community | 5 | 20 |
| Template kits | 3 | 8 |
| Discord members | 500 | 2.000 |

---

*Este documento é um living doc. Atualizar conforme o framework evolui.*

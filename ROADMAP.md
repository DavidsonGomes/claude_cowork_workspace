# Roadmap de Melhorias — Claude Cowork Workspace

> Última atualização: 2026-04-06
> Status: Ativo

---

## Visão

Transformar o workspace num sistema operacional pessoal completo onde rotinas automatizadas, agentes especializados e integrações trabalham juntos pra manter o Davidson informado, organizado e produtivo — com mínima intervenção manual.

---

## Estado Atual

| Componente | Qtd | Status |
|---|---|---|
| Agentes | 5 | Clawdia, Flux, Atlas, Kai, Pulse |
| Skills | 92 | Produtividade, GOG, Integrações, Finance, Marketing, Obsidian, Discord, Pulse, Evo Method |
| Rotinas (ADWs) | 13 | 8 diárias + 5 semanais |
| Integrações | 11 | Gmail, Calendar, Fathom, Todoist, Stripe, Omie, Linear, Discord, Telegram, GitHub, Canva |
| Servidores | 2 | Scheduler + Telegram Bot |
| Templates HTML | 3 | Community Pulse, Community Weekly, GitHub Review |

---

## Fase 1 — Estabilização (esta semana)

Foco: garantir que tudo que foi criado funcione de forma confiável.

- [ ] **Retry no runner** — se Claude CLI falha por timeout/crash, tentar 1x antes de desistir
- [ ] **Git auto-commit no EOD** — end-of-day faz commit dos arquivos gerados (logs, reports, FAQ, summaries)
- [X] **Testar todas as rotinas** — rodar cada `make` pelo menos 1x e corrigir problemas
- [ ] **Scheduler persistente** — criar `docker-compose.yml` ou `launchd` plist pra scheduler rodar em background mesmo fechando o terminal
- [ ] **Ajustar timeouts** — calibrar timeout de cada rotina baseado nos primeiros runs reais

---

## Fase 2 — Telegram Bidirecional (próxima semana)

Foco: transformar o Telegram na interface principal de interação rápida.

- [ ] **Comandos via Telegram** — receber mensagens como "pulso", "tarefas", "agenda", "github" e acionar as rotinas/skills correspondentes
- [ ] **Roteamento por agente** — "financeiro" → Flux, "projeto" → Atlas, "saúde" → Kai
- [ ] **Respostas formatadas** — enviar resultados das rotinas formatados pro Telegram (markdown, tabelas, emojis)
- [ ] **Confirmação de ações** — pedir OK antes de executar ações destrutivas (ex: criar tarefas, enviar emails)
- [ ] **Modo silencioso** — horário noturno (23h-7h) sem notificações, exceto alertas críticos

---

## Fase 3 — Novos Agentes (semanas 3-4)

Foco: trazer os agentes restantes do OpenClaw que fazem sentido.

- [ ] **Pixel (@pixel)** — Social media / conteúdo multicanal
  - Planejamento editorial
  - Criação de conteúdo por canal (IG, LinkedIn, X, YouTube)
  - Release review obrigatório antes de publicação
  - Skills: `mkt-*` já existem, falta o agente orquestrador
  - Command: `/pixel`

- [ ] **Nex (@nex)** — Comercial / pipeline
  - Pipeline de vendas (lead → fechamento)
  - Qualificação de leads (ICP, ticket, fit)
  - Playbooks de discovery e objeções
  - Propostas com aprovação
  - Command: `/nex`

---

## Fase 4 — Dashboard Unificado

Foco: um painel HTML único que consolida tudo.

- [ ] **Dashboard diário** — template HTML (brand Evolution) com:
  - Saúde geral do dia (semáforo)
  - Agenda resumida
  - Tarefas prioritárias
  - Emails pendentes
  - Reuniões do dia
  - Comunidade (pulso)
  - GitHub (PRs/issues)
  - Última atualização de cada rotina
- [ ] **Servido localmente** — `make dashboard` abre no browser
- [ ] **Auto-refresh** — atualiza conforme rotinas rodam

---

## Fase 5 — Inteligência e Automação Avançada

Foco: fechar loops e automatizar decisões.

- [ ] **Docs Gap → Issue + Mintlify** — quando FAQ Sync detecta pergunta recorrente sem documentação: (1) criar issue no GitHub com label `documentation`, (2) gerar draft da página de doc no formato Mintlify e abrir PR no repo de docs. O projeto de documentação usa Mintlify (https://doc.evolution-api.com) — sincronizar FAQ → docs pra fechar o loop automaticamente
- [ ] **Alertas proativos** — monitorar saldos (RunPod, Stripe), status de serviços (Supabase, DigitalOcean), e alertar no Telegram quando algo precisa de atenção
- [ ] **Weekly Digest pro time** — gerar resumo semanal formatado pra enviar no Discord/WhatsApp pro time (não só pro Davidson)
- [ ] **Changelog automático** — gerar changelog dos repos a partir de commits/PRs mergeados da semana
- [ ] **Fechamento mensal automatizado** — rotina completa de fechamento financeiro (Stripe + Omie + relatório)
- [x] **Análise de tendências** — comparar métricas de comunidade, GitHub e financeiro semana a semana, detectar tendências (skill `prod-trends`, ADW `make trends`, sexta 08:30)

---

## Fase 6 — Escala e Observabilidade

Foco: visibilidade e confiabilidade do sistema.

- [ ] **Observability dashboard** — painel de saúde das rotinas (success rate, avg time, falhas, custos de tokens)
- [ ] **Custo por rotina** — rastrear tokens consumidos por cada ADW pra otimizar prompts
- [ ] **Alertas de degradação** — se uma rotina começa a falhar mais que 20%, alertar
- [ ] **Multi-workspace** — preparar estrutura pra replicar o workspace pra outros projetos/clientes
- [ ] **Backup automático** — rotina semanal que faz backup do workspace (git push, ou sync com cloud)

---

## Backlog (ideias futuras)

| Ideia | Notas |
|-------|-------|
| Agente Sage (estratégia) | OKRs, cenários, trade-offs — do OpenClaw |
| Agente Mentor (cursos) | Evo Academy — trilhas, didática |
| Bot Discord com IA | Responder perguntas no #help usando o FAQ como base |
| Integração com Notion | Skill dedicada pra ler/escrever na base de conhecimento |
| Integração com Canva | Skill dedicada pra criar/exportar artes via MCP |
| Voice commands | Integrar com Whisper pra comandos por voz no Telegram |
| Mobile dashboard | Versão PWA do dashboard pra acessar do celular |

---

## Princípios

1. **Rotina > heroísmo** — sistemas confiáveis que rodam sozinhos valem mais que sprints heroicos
2. **Dados antes de opinião** — toda decisão baseada em evidência (métricas, logs, reports)
3. **Agente certo pro trabalho** — cada domínio tem seu especialista, não sobrecarregar um só
4. **Humano no loop** — IA sugere e executa, Davidson decide e aprova
5. **Incremental** — cada fase entrega valor independente, não depende da próxima

---

*Atualizado por Claude em 2026-04-06. Davidson pode editar a qualquer momento.*

# Plano de Implementação — Migração Agentes OpenClaw → Claude Code

**Data:** 2026-04-06
**Status:** Em andamento
**Objetivo:** Trazer os 9 agentes restantes do OpenClaw para `.claude/agents/` no formato Claude Code

---

## Referência

- **Fonte:** `/Users/etus_0104/Projects/openclaw-davidson/`
- **Destino:** `/Users/etus_0104/Projects/claude_cowork_workspace/.claude/agents/`
- **Formato base:** Ver `kai-personal-assistant.md` como referência de estrutura

---

## Checklist de Implementação

### Fase 1 — Tier 1 (Alto Valor)

- [ ] **Clawdia (main)** — Hub/coordenadora
  - Fonte: `workspace-*/workspace/shared/`, `agents/main/`, SOUL.md, IDENTITY.md
  - Adaptar: orquestração entre agentes, senso crítico, filtro de ruído
  - Arquivo: `.claude/agents/clawdia-coordinator.md`
  - Nota: definir como ela roteia para os outros agentes no modelo Claude Code

- [x] **Flux (financeiro)** — Financeiro ✅ (2026-04-06)
  - Fonte: `workspace-flux-financeiro/`
  - Adaptar: alertas proativos, métricas SaaS (MRR/ARR/burn), conferência dupla
  - Arquivo: `.claude/agents/flux-financeiro.md`
  - Nota: integração com Stripe/Omie via skills; red lines de movimentação
  - Skills: native-stripe + omie configuradas

- [ ] **Forge (dev)** — Desenvolvimento & Infra
  - Fonte: `workspace-forge-dev/`
  - Adaptar: planning mode obrigatório, infra como código, reversibilidade
  - Arquivo: `.claude/agents/forge-dev.md`
  - Nota: esse agente tem overlap com capacidades nativas do Claude Code — calibrar escopo

- [ ] **Pixel (social media)** — Conteúdo Multicanal
  - Fonte: `workspace-pixel-social-media/`
  - Adaptar: release review gate, adaptação por canal, tracking UTM, CTA único
  - Arquivo: `.claude/agents/pixel-social-media.md`
  - Nota: stack de skills grande — priorizar as essenciais

### Fase 2 — Tier 2 (Valor Sólido)

- [ ] **Atlas (projetos)** — Gestão de Projetos
  - Fonte: `workspace-atlas-project/`
  - Adaptar: tracking de milestones, detecção de blockers, roadmap
  - Arquivo: `.claude/agents/atlas-project.md`
  - Nota: integração com Linear como fonte principal

- [ ] **Sage (estratégia)** — Análise Estratégica
  - Fonte: `workspace-sage-strategy/`
  - Adaptar: OKRs, cenários, trade-offs, framework de entrega
  - Arquivo: `.claude/agents/sage-strategy.md`
  - Nota: formato padrão de entrega (resumo → evidência → risco → ação)

- [ ] **Nex (comercial)** — Pipeline Comercial
  - Fonte: `workspace-nex-comercial/`
  - Adaptar: discovery, qualificação ICP, playbooks, follow-up
  - Arquivo: `.claude/agents/nex-comercial.md`
  - Nota: tudo que sai pro cliente exige aprovação; red line de preço/desconto

### Fase 3 — Tier 3 (Complementar)

- [ ] **Pulse (comunidade)** — Radar de Comunidade
  - Fonte: `workspace-pulse-community/`
  - Adaptar: detector de padrões, FAQs, sentimento, escalação
  - Arquivo: `.claude/agents/pulse-community.md`
  - Nota: leitura de comunidade, não moderação autônoma

- [ ] **Mentor (cursos)** — Educação
  - Fonte: `workspace-mentor-courses/`
  - Adaptar: trilhas, didática, organização de conteúdo
  - Arquivo: `.claude/agents/mentor-courses.md`
  - Nota: escopo do Evo Academy

---

## Fase 4 — Infraestrutura Compartilhada

- [ ] **Atualizar CLAUDE.md** — registrar todos os agentes e quando cada um é acionado
- [ ] **Criar pasta de memória por agente** (se necessário) — `memory/agents/{nome}/`
- [ ] **Definir roteamento** — quando o Claude principal aciona cada agente
- [ ] **Testar cada agente** — validar que responde no tom e escopo corretos
- [ ] **Revisar red lines** — garantir que restrições de segurança estão no prompt

---

## Passo a Passo por Agente

Para cada agente, seguir este checklist:

1. [ ] Ler SOUL.md, IDENTITY.md, AGENTS.md e BOOTSTRAP.md do workspace no OpenClaw
2. [ ] Identificar skills e integrações necessárias (MCPs, APIs, scripts)
3. [ ] Criar o arquivo do agente em `.claude/agents/{nome}.md` com:
   - Frontmatter: name, description (com exemplos de ativação), model, color, memory
   - System prompt adaptado do SOUL.md + IDENTITY.md
   - Escopo claro (o que faz / o que não faz)
   - Diretório de trabalho e estrutura de arquivos
   - Skills/integrações documentadas com comandos
   - Nível de autonomia (L1 Observer)
   - Formato de entrega padrão
   - Red lines (nunca fazer)
   - Pessoas-chave relevantes ao domínio
4. [ ] Criar o comando manual em `.claude/commands/{nome}.md` com:
   ```
   Use o agent @{nome-do-agente} para ajudar o Davidson com [domínio]: $ARGUMENTS
   
   Se nenhum argumento foi fornecido, pergunte ao Davidson como pode ajudar no contexto de [domínio].
   ```
5. [ ] Verificar que o `/nome` aparece na lista de skills disponíveis
6. [ ] Testar com uma pergunta simples do domínio

---

## Padrão de Arquivo (Template)

```markdown
---
name: "{nome-do-agente}"
description: "Descrição curta + exemplos de quando acionar"
model: sonnet
color: {cor}
memory: project
---

{System prompt adaptado do SOUL.md + IDENTITY.md do OpenClaw}
```

---

## Decisões Pendentes

1. **Clawdia como hub** — No Claude Code, o modelo principal já faz roteamento. Clawdia vira um agente de "revisão estratégica" ou mantém papel de coordenadora?
2. **Forge vs Claude nativo** — Forge faz sentido como agente separado ou as capacidades de dev já estão no Claude principal?
3. **Memória por agente** — Cada agente tem sua pasta de memória ou usam a memória central?
4. **Model por agente** — Todos usam `sonnet` (como Kai) ou alguns justificam `opus`?

---

*Criado por Claude em 2026-04-06. Atualizar conforme implementação avança.*

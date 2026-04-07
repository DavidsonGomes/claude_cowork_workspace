---
course: agentic-engineer
updated: 2026-04-06
---

# Roadmap — Agentic Engineer

## Fase atual
Estrutura macro definida e em execução. Classe 1 tem artefatos canônicos (checklist/rubrica/DoD). Lives 01/03/04/05 documentadas. Foco atual: fechar padronização por módulo (M0..M7) e preparar material gravável.

## Prioridades

### P0 — Crítico (esta semana)
- [ ] Consolidar ficha padronizada da Live 02
- [ ] Vincular links Pixel (replay, descrição e anexos) em `lives.md`

### P1 — Importante (próximas 2 semanas)
- [ ] Materializar pacote template mestre por aula (ALUNO/INSTRUTOR/PROMPTS + PDF approved)
- [ ] Fechar critérios de certificação por módulo com rubrica incremental
- [ ] Replicar artefatos canônicos da Classe 01 para Classe 02+

### P2 — Planejado (próximo mês)
- [ ] Publicar currículo operacional fechado Classe 1→2→3 com gates de progressão
- [ ] Definir gate de progressão C1→C2→C3 com critérios auditáveis
- [ ] Fechar rubrica de certificação final (aprovado/reprovado)

## Decisões pendentes
- Sequência M2→M3: revisar com exemplos práticos adicionais
- Checklist de aprovação por classe (C1, C2, C3) — formato a definir

## Progressão oficial de módulos
1. M0 — Fundamentos de Agentic Engineering
2. M1 — Método e Especificação
3. M2 — Execução Assistida por Agentes
4. M3 — Qualidade, Review e Versionamento
5. M4 — Deploy e Operação
6. M5 — Customização com Guardrails
7. M6 — Observabilidade, Segurança e Governança
8. M7 — Capstone

## Estrutura de Classes

### Classe 1 — In-Loop (5 lives)
- Live 01: Visão inicial + setup do fluxo Spec-Driven com BMAD (consolidada, 12/12 aulas)
- Live 02: Prática aplicada inicial (realizada, ficha pendente)
- Live 03: Além do BMAD — customizar método sem quebrar o core (consolidada)
- Live 04: 1 problema, 1 sistema, 90 minutos — execução ponta a ponta com deploy
- Live 05: Conclusão da Classe 1 — certificação prática e transição para Classe 2

### Classe 2 — Sistemas Out-Loop (5 lives planejadas)
1. Transição In-Loop → Out-Loop (AFK)
2. PITER (Prompt/Input/Trigger/Environment/Review)
3. Webhooks e eventos externos (GitHub primeiro)
4. ADWs (scripts determinísticos + agentes)
5. Observabilidade, retries, validação e PR de alta confiança

**Stack oficial:** ADWs em Python/TypeScript/bash
**Limite seguro de autonomia:** 2 toques humanos (trigger inicial + aprovação de PR antes de merge)

### Classe 3 — Orquestração Multi-Agente + ZTE (5 lives planejadas)
1. O-Agent (orquestrador líder)
2. Times paralelos de agentes por domínio
3. Act-Learn-Reuse com Agent Experts
4. Meta Agentics (sistemas que constroem sistemas)
5. Zero-Touch Engineering com governança

**Guardrails ZTE:** unit+E2E, revisão automática, rollback automático, streak 5-10 execuções
**Memória de aprendizado:** Expertise Files versionados (vector store opcional)

## Princípios pedagógicos
- Posicionamento: **entregar produto no ar** (não "aprender IA" genérico)
- Público-alvo: dev pleno/sênior e founder solo
- Promessa: evoluir de executor manual para **Comandante de Computação**
- Qualidade mínima inegociável: testes + lint + documentação

# OpenClaw — Módulos

## Nível 1 — OpenClaw Core (single-agent)

### M1 — Fundamentos
- **Objetivo:** entender o que é a camada agentic, o que é o OpenClaw e os anti-padrões a evitar desde o início
- **Aulas:**
  - A1: A nova camada agentic
  - A2: O que é OpenClaw na prática
  - A3: Arquitetura base
  - A4: Anti-padrões iniciais
- **Entregável:** mapa mental da arquitetura base do OpenClaw
- **Aprovação:** consegue explicar a diferença entre OpenClaw e uma integração comum

### M2 — Setup e Runtime
- **Objetivo:** instalar e configurar o OpenClaw com Gateway, Runtime e workspace mínimo funcionando
- **Aulas:**
  - A1: Instalação e pré-requisitos
  - A2: Gateway + Runtime
  - A3: Estrutura mínima de workspace
  - A4: Checklist de setup
- **Entregável:** OpenClaw rodando localmente com checklist de setup completo
- **Aprovação:** Gateway + Runtime funcionando + checklist de setup preenchido

### M3 — Segurança Operacional
- **Objetivo:** aplicar princípios de segurança, gates pré-deploy e rollback básico desde o primeiro dia
- **Aulas:**
  - A1: Princípios de segurança
  - A2: Gates pré-deploy
  - A3: Checklist de segurança
  - A4: Rollback básico
- **Entregável:** checklist de segurança preenchido + procedimento de rollback documentado
- **Aprovação:** setup auditado com checklist de segurança + rollback testado

### M4 — Identidade, Memória e Governança
- **Objetivo:** configurar o agente principal com contrato de identidade, memória organizada e prevenção de drift
- **Aulas:**
  - A1: Contrato de agente
  - A2: Organização de memória operacional
  - A3: Decisões/pending/lessons
  - A4: Prevenção de drift
- **Entregável:** agente Cláudia com contrato configurado + memória organizada + 1 ciclo de decisão registrado
- **Aprovação:** contrato de agente funcional + registro de decisão com lição aprendida

### M5 — Rotina Operacional
- **Objetivo:** operar com SLO definido, auditoria periódica e higiene de workspace sustentável
- **Aulas:**
  - A1: SLO de automações
  - A2: Auditoria semanal
  - A3: Higiene de workspace
  - A4: Métricas de saúde
- **Entregável:** SLO documentado + rotina de auditoria executada + 1 métrica de saúde monitorada
- **Aprovação:** SLO com critério mensurável + primeira auditoria completa documentada

### M6 — Integrações e Automações (single-agent)
- **Objetivo:** criar fluxos de integração com modelo de eventos, tratamento de erro e validação operacional
- **Aulas:**
  - A1: Modelo de eventos
  - A2: Fluxos de integração com segurança
  - A3: Tratamento de erro
  - A4: Validação operacional
- **Entregável:** 1 integração funcionando com tratamento de erro e validação
- **Aprovação:** integração com pelo menos 1 cenário de erro tratado e validado

### M7 — Capstone Core
- **Objetivo:** entregar um sistema single-agent funcional em produção usando todos os artefatos do Nível 1
- **Aulas:**
  - A1: Briefing
  - A2: Implementação
  - A3: Hardening
  - A4: Defesa técnica
- **Entregável:** sistema single-agent em produção + documentação + defesa com evidências
- **Aprovação:** sistema funcional + rubrica preenchida + DoD completo

---

## Nível 2 — OpenClaw Scale (multiagentes)

### M1 — Escala para Multiagentes
- **Objetivo:** decidir com critérios objetivos quando e como escalar do single-agent para multiagentes
- **Aulas:**
  - A1: Critérios de escala
  - A2: Custos e trade-offs
  - A3: Limites do single-agent
  - A4: Plano de migração
- **Entregável:** análise de escala do projeto do Nível 1 com decisão justificada
- **Aprovação:** decisão documentada com critérios objetivos

### M2 — Coordenação Arquitetural
- **Objetivo:** definir papéis, fronteiras, handoff e resolução de conflitos entre agentes
- **Aulas:**
  - A1: Papéis e fronteiras
  - A2: Handoff
  - A3: Contratos de interface
  - A4: Resolução de conflitos
- **Entregável:** diagrama de papéis + contratos de interface entre 2 agentes
- **Aprovação:** contratos de interface funcionais e sem ambiguidade

### M3 — Tópicos e Roteamento (Telegram)
- **Objetivo:** rotear mensagens por contexto via Telegram com ownership por agente e tratamento de falhas
- **Aulas:**
  - A1: Estratégia por tópico
  - A2: Roteamento por contexto
  - A3: Ownership por agente
  - A4: Falhas comuns
- **Entregável:** roteamento funcional com 2+ agentes em tópicos Telegram distintos
- **Aprovação:** roteamento por contexto funcionando + pelo menos 1 falha tratada

### M4 — Orquestração
- **Objetivo:** delegar com segurança, sincronizar agentes e prevenir loops/spam
- **Aulas:**
  - A1: Delegação segura
  - A2: Sincronização entre agentes
  - A3: Anti-loop/anti-spam
  - A4: Recuperação de falhas
- **Entregável:** orquestração funcionando com anti-loop ativo e recuperação documentada
- **Aprovação:** sistema sem loop/spam + 1 cenário de recuperação testado

### M5 — Observabilidade
- **Objetivo:** monitorar sinais operacionais, responder a incidentes e melhorar continuamente
- **Aulas:**
  - A1: Sinais operacionais
  - A2: Monitoramento de qualidade
  - A3: Incidentes e resposta
  - A4: Melhoria contínua
- **Entregável:** dashboard mínimo de saúde + 1 incidente simulado e respondido
- **Aprovação:** pelo menos 3 sinais monitorados + playbook de incidente documentado

### M6 — Segurança Distribuída
- **Objetivo:** aplicar governança, permissões e auditoria em arquitetura multiagente
- **Aulas:**
  - A1: Governança multiagente
  - A2: Permissões e limites
  - A3: Auditoria de arquitetura
  - A4: Checklist pré-expansão
- **Entregável:** checklist de segurança distribuída preenchido + auditoria documentada
- **Aprovação:** checklist sem falhas críticas + auditoria com ação de melhoria

### M7 — Capstone Scale
- **Objetivo:** expandir o projeto Core para operação multiagente em produção com governança completa
- **Aulas:**
  - A1: Expansão do projeto Core
  - A2: Operação em produção
  - A3: Stress test
  - A4: Defesa arquitetural
- **Entregável:** sistema multiagente em produção + defesa arquitetural com evidências
- **Aprovação:** sistema funcional em produção + rubrica Nível 2 preenchida

---

## Estado atual de produção
- Materiais de setup/instalação e Gateway/Runtime (A1/A2 do Nível 1) já produzidos — aproveitáveis
- Exercícios e rubricas: pendentes de padronização
- Nível 2 (Scale): planejado como trilha separada após conclusão do Nível 1

---
date: 2026-04-06
title: Planning Evolution
project: evo-ai
type: meeting
status: summary
tags: [fathom, meeting]
recording_id: 135624447
recording_url: https://fathom.video/calls/625646479
people: [Raphael Petronilho, guilherme.gomes@brius.com.br, nickolas.oliveira@brius.com.br, daniel.paes@brius.com.br, danilo.carneiro@brius.com.br, marcelo.soares@etus.com.br, Davidson Gomes]
---

## Meeting Purpose

[Finalizar o Evo CRM para o lançamento da próxima semana.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=280.0)

## Key Takeaways

  - [**Lançamento na Próxima Semana:** O Evo CRM lança na próxima semana, com campanhas de marketing começando hoje. Prioridade imediata: testes e estabilização.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=305.0)
  - [**Protocolo de Testes:** Todo desenvolvimento novo está pausado. O time vai testar o Evo CRM hoje e amanhã, reportando todos os bugs via painel admin. **Não corrigir bugs nessa fase** para evitar conflitos de merge.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=554.0)
  - [**Fluxos Críticos:** A experiência core deve ser impecável — pipeline CRM, integração Evolution API, funcionalidade de agentes e conversas multi-canal (ex: Telegram).](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=473.0)
  - [**EvoGo & Estratégia Evolution API:** EvoGo estável. O EvoGo Manager será adaptado para servir tanto o EvoGo quanto o Evolution API V3, criando um painel unificado.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=1260.0)

## Topics

### Lançamento & Estabilização do Evo CRM

  - [**Cronograma:** Lança na próxima semana. Campanhas de marketing (email, Instagram) começam hoje e rodam diariamente até 23 de abril.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=328.0)
  - [**Prioridade Imediata:** Pausar todo desenvolvimento de novas features. Foco exclusivo em testes, correção de bugs e estabilização.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=310.0)
  - [**Protocolo de Testes:**](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=554.0)
      - [**Fase 1 (hoje e amanhã):** Apenas testar. Reportar todos os bugs via painel admin. Não corrigir bugs.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=554.0)
      - [**Fase 2 (meio da semana):** Davidson fará triagem de todos os issues reportados, removerá duplicatas e atribuirá tarefas para o time corrigir.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=1680.0)
  - [**Teste de Instalação:** Todos do time devem realizar instalação fresh usando o readme para validar o processo de setup. Crítico para Marcelo criar documentação de instalação precisa.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=439.0)

### Status EvoGo & Evolution API

  - [**EvoGo:**](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=1170.0)
      - [**Status:** Estável. Matheus corrigiu bug que impedia botões/carrosséis de funcionar em todos os dispositivos.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=1170.0)
      - [**Bugs da Comunidade:** Usuários reportam erro `400 license server`. Matheus vai monitorar o repo público.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=782.0)
      - [**Merge de PRs:** PRs públicos são mergeados no repo privado primeiro, depois rebuild e push para versão pública.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=860.0)
  - [**Evolution API:**](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=1260.0)
      - [**Estratégia do Manager:** EvoGo Manager adaptado para servir tanto EvoGo quanto Evolution API V3 — painel unificado, manutenção simplificada, não será open-source.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=1260.0)
      - [**Meta do Lançamento V3:** Usar o novo painel para conduzir migração de usuários e capturar dados de instalação.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=1500.0)

### Mudanças na WhatsApp API

  - [**Issue:** WhatsApp está substituindo números de telefone por ID de usuário (WID) em alguns payloads da API.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=1767.0)
  - [**Impacto:** Evo CRM provavelmente não afetado, pois já lida com IDs para leads. É uma troca de formato de dados simples.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=1767.0)
  - [**Contexto:** Parece ser um teste A/B limitado da Meta. Time monitorando a API oficial.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=1843.0)

## Next Steps

  - [**Todo o Time:** Instalar Evo CRM via readme e testar hoje/amanhã reportando via painel admin.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=439.0)
  - [**Davidson:** Fazer triagem de todos os issues reportados amanhã à tarde e atribuir tarefas.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=1680.0)
  - [**Marcelo:** Criar documentação oficial de instalação do Evo CRM.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=1748.0)
  - [**Matheus:** Monitorar repo público EvoGo e adaptar Manager para API V3.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=1484.0)

## Action Items

- [ ] **Davidson Gomes** — Revisar PR do Evo CRM do Danilo ([00:04:42](https://fathom.video/calls/625646479?timestamp=282.9999))
- [ ] **Davidson Gomes** — Coordenar instalação/teste do Evo CRM com o time; coletar bug reports até 07/04 às 12h ([00:07:08](https://fathom.video/calls/625646479?timestamp=428.9999))
- [ ] **Daniel Paes** — Acessar portal.evi.com.br; confirmar mensagens WhatsApp; avisar Davidson para ativar WhatsApp Web ([00:11:38](https://fathom.video/calls/625646479?timestamp=698.9999))
- [ ] **Daniel Paes** — Pedir à comunidade para abrir issues de licença do EvoGo no GitHub ([00:13:23](https://fathom.video/calls/625646479?timestamp=803.9999))
- [ ] **Matheus Gomes Pastorini** — Monitorar issues/PRs open-source do EvoGo; propor merges para Davidson ([00:13:44](https://fathom.video/calls/625646479?timestamp=824.9999))
- [ ] **Davidson Gomes** — Testar fluxo single-account/Telegram do Evo CRM ([00:15:49](https://fathom.video/calls/625646479?timestamp=949.9999))
- [ ] **Davidson Gomes** — Revisar onboarding do Evo CRM (Beacop) com Marcelo ([00:17:59](https://fathom.video/calls/625646479?timestamp=1079.9999))
- [ ] **Marcelo dos Reis Soares Junior** — Documentar instalação do Evo CRM (MCT-SERV) ([00:18:18](https://fathom.video/calls/625646479?timestamp=1098.9999))
- [ ] **Matheus Gomes Pastorini** — Testar Evolution API V2 com license manager; enviar PR ([00:18:18](https://fathom.video/calls/625646479?timestamp=1098.9999))
- [ ] **Davidson Gomes** — Atualizar EvoGo localmente
- [ ] **Nickolas de Oliveira** — Configurar Evo CRM localmente; testar fluxos core; registrar bugs
- [ ] **Davidson Gomes** — Garantir que Evo CRM armazene ID de contato WhatsApp (WID) em vez de número de telefone

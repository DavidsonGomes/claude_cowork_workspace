# Agentic Engineer Curso — Roadmap

## Estado atual
- Estrutura macro definida e em execução
- Módulos M0..M7 normalizados com objetivo, competência, entregável e critério de aprovação
- Live 01 consolidada (12/12 aulas mapeadas)
- Live 03 consolidada
- Lives 04 e 05 com roteiro consolidado

## Proposta de progressão oficial
1. M0 Fundamentos de Agentic Engineering
2. M1 Método e Especificação
3. M2 Execução Assistida por Agentes
4. M3 Qualidade, Review e Versionamento
5. M4 Deploy e Operação
6. M5 Customização com Guardrails
7. M6 Observabilidade, Segurança e Governança
8. M7 Capstone

## Próximos passos prioritários
- Consolidar ficha padronizada da Live 02
- Vincular links Pixel (replay, descrição e anexos) em `lives.md`
- Materializar pacote template mestre por aula (ALUNO/INSTRUTOR/PROMPTS + PDF approved)
- Fechar critérios de certificação por módulo com rubrica incremental
- Publicar currículo operacional fechado Classe 1→2→3 com gates de progressão e rubrica final

## Direção pedagógica consolidada (2026-03-21)
- Posicionamento do curso: **entregar produto no ar** (não “aprender IA” genérico)
- Público-alvo principal: **dev pleno/sênior e founder solo**
- Promessa de transformação: evoluir de executor manual para **Comandante de Computação**
- Qualidade mínima inegociável: **testes + lint + documentação**

## Classe 2 — Sistemas Out-Loop (5 lives)
1. Transição In-Loop -> Out-Loop (AFK)
2. PITER (Prompt/Input/Trigger/Environment/Review)
3. Webhooks e eventos externos (GitHub primeiro)
4. ADWs (scripts determinísticos + agentes)
5. Observabilidade, retries, validação e PR de alta confiança

### Regras operacionais Classe 2
- Stack oficial: **ADWs em Python/TypeScript/bash**
- Limite seguro de autonomia: **2 toques humanos**
  1) trigger inicial
  2) aprovação de PR antes de merge

## Classe 3 — Orquestração Multi-Agente + ZTE (5 lives)
1. O-Agent (orquestrador líder)
2. Times paralelos de agentes por domínio
3. Act-Learn-Reuse com Agent Experts
4. Meta Agentics (sistemas que constroem sistemas)
5. Zero-Touch Engineering com governança

### Regras operacionais Classe 3
- Adoção ZTE gradual: começar por chores/bugs conhecidos
- Features maiores: staging até confiança >90%
- Guardrails obrigatórios: unit+E2E, revisão automática (incl. visual quando aplicável), rollback automático, streak 5-10 execuções sem intervenção
- Aprendizado persistente padrão: **Expertise Files versionados** (vector store opcional)

## Atualização 2026-03-18
- Estrutura de curso reorganizada com `index.md`, `pending.md`, `aulas/`, `lives/` e `archive/`
- Artefatos canônicos da Classe 01 movidos para `aulas/classe-01/`
- Live 01 consolidada no padrão v1 (12/12)

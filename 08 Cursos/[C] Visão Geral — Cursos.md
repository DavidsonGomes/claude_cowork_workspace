# Visão Geral — Cursos (Evo Academy)

> Última atualização: 2026-04-06

## Dashboard

| Curso | Status | Módulos | Aulas produzidas | Completude |
|-------|--------|---------|-----------------|------------|
| Agentic Engineer | Em produção | 8 (M0–M7) + Classe 01 | ~12 (Lives 01/03/04/05 consolidadas) | 60% |
| Claude Code | Em planejamento | 7 (M1–M7) | 0 | 30% |
| OpenClaw | Em planejamento | 14 (N1: M1–M7 + N2: M1–M7) | 2 (A1/A2 do Nível 1 aproveitáveis) | 35% |

## Próximos passos

1. **Agentic Engineer:** consolidar ficha da Live 02 + vincular links Pixel nas lives
2. **Claude Code:** fechar outcomes mensuráveis por módulo (M1..M7) antes de qualquer gravação
3. **OpenClaw:** mapear cada aula do Core para um artefato real do stack (Build the Real Thing)
4. Todos os cursos: converter módulos em aulas graváveis (15–25 min) + padronizar rubrica

## Estrutura de pastas por curso

```
08 Cursos/
├── agentic-engineer/
│   ├── index.md          ← índice do curso
│   ├── modules.md        ← módulos M0–M7 com objetivos e entregáveis
│   ├── roadmap.md        ← prioridades e direção pedagógica
│   ├── lives.md          ← índice de lives (C1/C2/C3)
│   ├── pending.md        ← pendências priorizadas
│   ├── feedback.md       ← feedback de alunos
│   ├── aulas/            ← m00..m07 + classe-01
│   ├── lives/            ← artefatos de lives
│   └── archive/          ← legado
│
├── claude-code/
│   ├── index.md
│   ├── modules.md        ← módulos M1–M7 com aulas e entregáveis
│   ├── roadmap.md
│   ├── lives.md
│   ├── pending.md
│   ├── feedback.md
│   └── aulas/            ← m01..m07
│
└── openclaw/
    ├── index.md
    ├── modules.md        ← Nível 1 (Core) + Nível 2 (Scale)
    ├── roadmap.md
    ├── lives.md
    ├── pending.md
    ├── feedback.md
    ├── normalized-structure.md
    └── aulas/            ← m01..m07 (Nível 1)
```

## Templates disponíveis

| Template | Uso |
|----------|-----|
| `.claude/templates/course-index.md` | Índice principal de um curso novo |
| `.claude/templates/course-module.md` | README de módulo com aulas e critérios |
| `.claude/templates/lesson-plan.md` | Plano detalhado de aula individual |
| `.claude/templates/course-roadmap.md` | Roadmap com prioridades P0/P1/P2 |

## Princípios pedagógicos (transversais)

- Cada módulo fecha em: problema real → modelo mental → execução → validação
- Qualidade mínima inegociável: testes + lint + documentação
- Foco em evidência prática (artefato verificável), não apenas teoria
- Não gravar antes de ter outcomes e rubricas definidos

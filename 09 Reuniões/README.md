# Meetings

Repositório de transcrições e resumos de reuniões.

## Estrutura

- `raw/` — transcrições originais recebidas
- `processed/` — transcrições limpas/normalizadas
- `summaries/` — resumos executivos por reunião
- `index/` — índices e mapas de navegação
- `templates/` — modelos para transcript e summary
- `inbox/` — área de entrada temporária para novos arquivos ainda não organizados

## Convenção de nome

Use preferencialmente:

`YYYY-MM-DD__projeto-ou-conta__tipo__slug.md`

Exemplos:
- `2026-03-12__evolution-api__weekly__roadmap-q2.md`
- `2026-03-12__evo-ai__discovery__agentes-comerciais.md`
- `2026-03-12__interno__operacao__rituais-time.md`

## Fluxo recomendado

1. Colocar material novo em `inbox/` ou direto em `raw/<projeto>/`
2. Normalizar nome + metadata
3. Criar summary correspondente em `summaries/<projeto>/`
4. Se houver valor durável, extrair para memória curada (`memory/decisions.md`, `memory/projects.md`, etc.)

## Projetos iniciais

- `evolution-api`
- `evo-ai`
- `foundation`
- `academy`
- `comercial`
- `interno`
- `outros`

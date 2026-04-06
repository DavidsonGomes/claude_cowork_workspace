---
name: int-sync-meetings
description: "Sync meetings from Fathom — fetch new recordings, save JSON, generate transcripts and summaries, update indexes. Use when user says 'sync meetings', 'sync fathom', 'puxa as reuniões', 'atualiza meetings', 'sync calls' or similar."
---

# Sync Meetings

Pipeline completo para sincronizar reuniões do Fathom e organizar em `09 Reuniões/`.

## Pré-requisitos

- `FATHOM_API_KEY` configurada (ver skill `fathom`)
- `jq` instalado
- Script `fathom.sh` disponível em `.claude/skills/fathom/fathom.sh`

## Fluxo Completo

Ao ser acionado, execute os passos abaixo **em ordem**:

### Passo 1 — Buscar reuniões do dia

Por padrão, buscar apenas reuniões de **hoje**:

```bash
# Buscar meetings de hoje com summary e action items
{project-root}/.claude/skills/fathom/fathom.sh meetings --after "$(date +%Y-%m-%d)" --include-summary --include-actions
```

Se o usuário especificar um período diferente (ex: "sync da semana", "sync de ontem"), ajustar o `--after` e adicionar `--before` conforme necessário:
- "sync de ontem": `--after "$(date -v-1d +%Y-%m-%d)" --before "$(date +%Y-%m-%d)"`
- "sync da semana": `--after "$(date -v-7d +%Y-%m-%d)"`
- "sync do mês": `--after "$(date -v-1m +%Y-%m-%d)"`

A API já retorna `default_summary.markdown_formatted` e `action_items` completos — não precisa de chamadas extras.

### Passo 2 — Filtrar não processadas

Ler o arquivo de IDs já processados:
```
{project-root}/09 Reuniões/.state/fathom-processed-recording-ids.txt
```

Comparar com os `recording_id` retornados. Processar apenas os IDs que **não existem** nesse arquivo.

Se não houver meetings novos, informar ao usuário e parar.

### Passo 3 — Salvar JSON bruto

Para cada meeting novo, salvar o JSON completo em:
```
{project-root}/09 Reuniões/fathom/YYYY-MM-DD/YYYY-MM-DD__{recording_id}__{slug-do-titulo}.json
```

Onde:
- `YYYY-MM-DD` = data do `created_at`
- `slug-do-titulo` = título em lowercase, espaços→hifens, sem caracteres especiais

### Passo 4 — Classificar projeto

Determinar o projeto baseado no título da reunião:

| Padrão no título | Projeto |
|---|---|
| Evolution API, Evo API | `evolution-api` |
| Evo AI, EVO AI, CRM | `evo-ai` |
| Academy, Curso | `academy` |
| HostGator, HG | `evolution-api` |
| Financeiro, NF, Fatura | `foundation` |
| Planning, Sprint, Grooming | inferir do contexto |
| Comercial, Parceria | `comercial` |
| Operação, Interno, Daily | `interno` |
| (default) | `outros` |

### Passo 5 — Salvar summary

Usar o `default_summary.markdown_formatted` que já veio na resposta da API (Passo 1).

Ler o template em `.claude/templates/meeting-summary.md` e preencher com os dados da reunião.

Salvar em:
```
{project-root}/09 Reuniões/summaries/{projeto}/YYYY-MM-DD__{projeto}__meeting__{slug}__{recording_id}.summary.md
```

Formato do arquivo (baseado no template):
```markdown
---
date: YYYY-MM-DD
title: {título original}
project: {projeto}
type: meeting
status: summary
tags: [fathom, meeting]
recording_id: {recording_id}
recording_url: {url ou share_url}
people: [{nomes dos calendar_invitees}]
---

{conteúdo do default_summary.markdown_formatted}

## Action Items

{lista de action_items formatada como checklist:}
- [ ] **{assignee.name}** — {description} ([{recording_timestamp}]({recording_playback_url}))
```

### Passo 6 — Triagem Todoist (action items → tarefas)

Para cada meeting processado, extrair os `action_items` e criar tarefas no Todoist.

**Regras de triagem:**

1. **Traduzir para PT-BR** — todos os action items devem ser traduzidos para português brasileiro
2. **Projeto padrão: `Evolution`** — todas as tarefas vão pro projeto Evolution no Todoist, salvo instrução explícita diferente
3. **Contexto acionável** — cada tarefa deve ter:
   - Título claro e traduzido (não copiar o inglês cru do Fathom)
   - Comentário com contexto concreto: origem (reunião + data), objetivo, próximo passo e link do recording
4. **Agrupar por reunião** — usar seções/labels para identificar de qual reunião veio
5. **Filtrar por responsável** — criar tarefas apenas para action items atribuídos ao Davidson (ou sem assignee). Itens atribuídos a outras pessoas são registrados apenas no summary como referência
6. **Não duplicar** — verificar no arquivo de estado antes de criar:
   ```
   {project-root}/09 Reuniões/.state/fathom-todoist-sync.json
   ```
   Formato: `{ "synced_ids": { "{recording_id}": ["task_id_1", "task_id_2"] } }`

**Formato da tarefa Todoist:**

```
Título: {ação traduzida e clara em PT-BR}
Projeto: Evolution
Prioridade: p3 (default) — subir para p2 se for blocker ou deadline próximo
Comentário: 
  📋 Origem: {título da reunião} ({data})
  🎯 Objetivo: {o que essa ação resolve}
  ➡️ Próximo passo: {ação concreta}
  🔗 Referência: {link do recording_playback_url}
```

**Executar direto, sem relatório intermediário.** Não listar as tarefas antes de criar — criar e confirmar no final.

### Passo 7 — Marcar como processado

Adicionar o `recording_id` ao arquivo de estado:
```
{project-root}/09 Reuniões/.state/fathom-processed-recording-ids.txt
```

Um ID por linha. Append, não sobrescrever.

Atualizar também o `fathom-todoist-sync.json` com os IDs das tarefas criadas.

### Passo 8 — Relatório final

Ao terminar, apresentar um resumo curto:

```
## Sync Fathom — Concluído

**Período:** {data mais antiga} → {data mais recente}
**Novos:** {N} reuniões processadas
**Já processados:** {M} ignorados
**Tarefas criadas:** {T} no Todoist (projeto Evolution)

### Reuniões sincronizadas:
| Data | Título | Projeto | Tarefas |
|------|--------|---------|---------|
| ... | ... | ... | {N tarefas} |
```

Sem listar tarefas uma por uma — apenas contagem. Se o Davidson quiser detalhes, ele pede.

## Notas

- **Não reprocessar** meetings que já estão em `fathom-processed-recording-ids.txt`
- Se o transcript não estiver disponível na API (retorno vazio), salvar o summary mesmo assim e marcar o transcript como `status: pending`
- Criar diretórios automaticamente se não existirem (`fathom/YYYY-MM-DD/`, `raw/{projeto}/`, `summaries/{projeto}/`)
- Manter a convenção de nomes existente — consultar exemplos em `raw/` e `summaries/` antes de salvar
- **Triagem Todoist:** traduzir para PT-BR, projeto Evolution, contexto acionável, executar sem relatório intermediário
- **Tarefas só do Davidson** — action items de outras pessoas ficam apenas no summary
- Sempre usar pt-BR nas mensagens de status

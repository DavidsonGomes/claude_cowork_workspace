---
name: int-github-review
description: "Review GitHub repos — PRs abertos, issues da comunidade, stars/forks, releases, contribuidores. Use when user says 'checa o github', 'review do github', 'como tão os repos', 'PRs abertos', 'issues do github', 'status dos repositórios', or any reference to checking GitHub repos status."
---

# GitHub Review — Status dos Repositórios

Skill para revisar o estado dos repositórios da Evolution no GitHub: PRs abertos, issues da comunidade, atividade, stars e releases.

**Sempre responder em pt-BR.**

## Repositórios monitorados

| Repo | Descrição |
|------|-----------|
| `EvolutionAPI/evolution-api` | API principal (open source) |
| `EvolutionAPI/evo-ai` | CRM + agentes IA |
| `EvolutionAPI/evolution-go` | Evolution Go (EvoGo) |
| `EvolutionAPI/evo-crm-community` | CRM Community edition |
| `EvolutionAPI/EVO-METHOD` | Metodologia Evo |

## Fluxo

### Passo 1 — Coletar dados de cada repo

Para cada repositório, usar `gh` CLI para buscar:

```bash
# PRs abertos
gh pr list --repo EvolutionAPI/{repo} --state open --json number,title,author,createdAt,updatedAt,labels,reviewDecision --limit 20

# Issues abertas (últimas 20)
gh issue list --repo EvolutionAPI/{repo} --state open --json number,title,author,createdAt,updatedAt,labels,comments --limit 20

# Estatísticas do repo
gh api repos/EvolutionAPI/{repo} --jq '{stargazers_count, forks_count, open_issues_count, updated_at}'

# Último release
gh release list --repo EvolutionAPI/{repo} --limit 1 --json tagName,publishedAt,name

# Atividade recente (commits últimos 7 dias)
gh api "repos/EvolutionAPI/{repo}/commits?since=$(date -v-7d +%Y-%m-%dT00:00:00Z)&per_page=5" --jq 'length'
```

### Passo 2 — Analisar

Para cada repo, classificar:

1. **PRs abertos**: quantos, há quanto tempo, quem precisa revisar, review pendente
2. **Issues da comunidade**: bugs reportados, feature requests, perguntas
3. **Issues stale**: abertas há mais de 14 dias sem resposta
4. **Atividade**: commits na semana, se está ativo ou parado
5. **Crescimento**: stars/forks (comparar com dado anterior se disponível)

### Passo 3 — Relatório

Apresentar no formato:

```
## GitHub Review — {data}

### Resumo
| Repo | PRs | Issues | Stars | Commits (7d) | Status |
|------|-----|--------|-------|---------------|--------|

### PRs que precisam de atenção
| Repo | PR | Título | Autor | Dias aberto | Review |
|------|----|----|-------|-------------|--------|

### Issues da comunidade (sem resposta)
| Repo | Issue | Título | Dias sem resposta |
|------|-------|--------|-------------------|

### Issues mais votadas / comentadas
| Repo | Issue | Título | Comentários | Labels |
|------|-------|--------|------------|--------|

### Releases recentes
| Repo | Versão | Data |
|------|--------|------|

### Atividade (últimos 7 dias)
{resumo de atividade por repo — ativo/moderado/parado}
```

### Passo 4 — Salvar

Salvar relatório em `02 Projects/github-reviews/[C] YYYY-MM-DD-github-review.md`.

Criar diretório se não existir.

## Regras

- **Usar `gh` CLI** — já autenticado no sistema
- **Não criar issues ou PRs** — apenas ler e reportar
- **PRs sem review > 2 dias = alerta** — destacar
- **Issues sem resposta > 7 dias = alerta** — destacar
- **Comparar com review anterior** se existir no diretório
- **Foco em ação** — o que precisa de atenção do Davidson, não só números

# Quick Spec — social-analytics (skill unificada)

## Resumo
Skill de relatório unificado que consolida dados de TODAS as plataformas (YouTube, Instagram, LinkedIn, X/Twitter, TikTok, Twitch) num único HTML dashboard comparativo. Roda em frequências diária, semanal e mensal.

## Arquitetura

```
int-youtube     ─┐
int-instagram   ─┤
int-linkedin    ─┼─→ social-analytics ─→ HTML Report
int-twitter     ─┤
int-tiktok      ─┤
int-twitch      ─┘
```

Cada `int-*` coleta dados da API. A `social-analytics` consolida e compara.

## Template HTML: `social-analytics-report.html`

### Estrutura do relatório

**Row 1 — KPIs cross-platform (6 cards):**
- Total seguidores (soma de todas)
- Crescimento líquido do período
- Total de publicações
- Engagement rate médio
- Plataforma com maior crescimento
- Plataforma com maior engagement

**Row 2 — Tabela comparativa:**
| Plataforma | Seguidores | Delta | Posts | Engagement | Melhor Post |
|------------|-----------|-------|-------|------------|-------------|
| YouTube | X | +Y | Z | W% | "título" |
| Instagram (Davidson) | X | +Y | Z | W% | "título" |
| Instagram (Evo) | X | +Y | Z | W% | "título" |
| LinkedIn (Davidson) | X | +Y | Z | W% | "título" |
| LinkedIn (Evo) | X | +Y | Z | W% | "título" |
| X/Twitter | X | +Y | Z | W% | "título" |
| TikTok | X | +Y | Z | W% | "título" |
| Twitch | X | +Y | Z | W% | "título" |

**Row 3 — Crescimento por plataforma (barras comparativas)**

**Row 4 — Top conteúdos do período (cross-platform, ordenado por engagement)**

**Row 5 — Insights:**
- Qual plataforma priorizar?
- Que tipo de conteúdo performa melhor onde?
- Padrões de publicação (dia/hora)
- Recomendações de cross-posting

## Skills de rotina

| Skill | Período | Comando Make |
|-------|---------|-------------|
| `prod-social-analytics-daily` | Diário | `make social-daily` |
| `prod-social-analytics-weekly` | Semanal | `make social-weekly` |
| `prod-social-analytics-monthly` | Mensal | `make social-monthly` |

**Agente:** @pixel (social media)

## Output
```
04 Redes Sociais/reports/daily/[C] YYYY-MM-DD-social-analytics.html
04 Redes Sociais/reports/weekly/[C] YYYY-WXX-social-analytics.html
04 Redes Sociais/reports/monthly/[C] YYYY-MM-social-analytics.html
```

## Fallback pra plataformas sem API
Se uma plataforma ainda não tem `int-*` implementado ou a API não tá configurada:
- Mostrar "Sem dados — API não configurada" na célula
- Não quebrar o relatório
- Listar no final quais integrações faltam

## Ordem de implementação sugerida

| Prioridade | Integração | Motivo |
|-----------|------------|--------|
| 1 | **YouTube** | API gratuita, dados ricos, fácil setup |
| 2 | **Twitch** | API gratuita e aberta, setup em minutos |
| 3 | **Instagram** | Precisa Business account + Facebook App, mas é a mais importante pra social |
| 4 | **LinkedIn** | CSV export como fase 1, API depois |
| 5 | **X/Twitter** | Depende do plano ($100/mês Basic) ou CSV export |
| 6 | **TikTok** | API restritiva, aprovação demorada |

## Tasks
1. Implementar `int-youtube` e `int-twitch` primeiro (fáceis, gratuitas)
2. Criar template `social-analytics-report.html`
3. Criar skill `social-analytics` que orquestra as coletas
4. Criar ADWs e registrar no scheduler
5. Implementar as demais integrações conforme API access for obtido

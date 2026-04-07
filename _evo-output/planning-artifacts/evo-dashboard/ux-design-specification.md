---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
inputDocuments: ['prd.md', 'architecture.md', 'epics.md', 'Evolution Brand Book baixa.pdf']
status: 'complete'
completedAt: '2026-04-06'
---

# UX Design Specification — EVO Dashboard

**Author:** Davidson Gomes
**Date:** 2026-04-06

---

## UX Discovery & Context

### Product Context

Dashboard cockpit operacional local para um unico usuario (Davidson) que consolida o ecossistema de IA Evolution: 5 agentes, 14 rotinas automatizadas, 11 integracoes. Desktop-first, tema escuro, fundo em preto alinhado com a identidade visual Evolution.

### User Profile

- **Unico usuario:** Davidson Gomes — CEO, dev, power user
- **Contexto de uso:** Morning check (07h), investigacao ad hoc, weekly review (sexta)
- **Dispositivo:** MacBook, Chrome, minimo 1280px
- **Expertise:** Avancado — sem necessidade de onboarding ou tooltips
- **Frequencia:** Diaria, multiplas vezes ao dia
- **Tempo por sessao:** 2-5 minutos (overview), ate 15min (investigacao)

### Core User Need

Abrir UMA tela e entender o estado de todo o ecossistema em menos de 5 segundos. Identificar anomalias (rotinas falhadas, sentimento negativo, blockers) sem clicar em nada.

## Core Experience Definition

### Experience Principles

1. **Glanceability** — A informacao mais importante e visivel sem interacao. Cards com numeros grandes, badges coloridos, indicadores de status
2. **Information Density** — Maximo de dados por pixel. Sem espacos vazios desnecessarios, sem cards decorativos
3. **Progressive Disclosure** — Overview na Home, detalhe nas subpaginas. Nunca sobrecarregar uma unica tela
4. **Consistency** — Mesmos padroes visuais em todas as 7 telas. Um card de metrica parece igual em comunidade, financeiro e projetos
5. **Freshness Indicator** — Sempre mostrar quando os dados foram atualizados. Dados velhos sao piores que nenhum dado

### Key Interactions

| Interacao | Padrao |
|-----------|--------|
| Navegar entre dominios | Sidebar persistente com icones + labels |
| Ver overview | Home com grid de cards por dominio |
| Investigar anomalia | Clicar no card/alerta → pagina de detalhe |
| Filtrar por periodo | Dropdown/tabs: 7d, 30d, 90d, 365d |
| Ver detalhe de item | Clicar na row da tabela → expandir ou navegar |
| Refresh manual | Botao de refresh no header (alem do auto-refresh 60s) |

## Emotional Response & Feel

### Target Emotions

- **Confianca:** "Tudo esta sob controle" — verde dominante quando saudavel
- **Alerta sem panico:** Vermelho/amarelo pontual chama atencao sem alarmar
- **Fluidez:** Transicoes suaves, dados carregam rapido, sem jank
- **Profissionalismo:** Visual limpo, tipografia consistente, sem emojis excessivos

### Visual Tone

Dark mode premium — fundo preto (#000000 ou #0C111D neutral-950) com textos brancos e acentos em verde Evolution (#00FFA7). Feeling de "mission control" — dados reais, tempo real, sem decoracao.

## Design System — Evolution Brand Tokens

### Color Palette (extraida do Brand Book)

**Brand Primary (Verde Evolution):**

| Token | Hex | Uso |
|-------|-----|-----|
| `primary-50` | #F3FFF8 | — |
| `primary-100` | #E7FFF1 | — |
| `primary-200` | #CDFFE2 | — |
| `primary-300` | #9DFFCA | Badges sucesso light |
| `primary-400` | #70FFB9 | Hover states |
| `primary-500` | **#00FFA7** | **Cor principal — acentos, links, icones ativos** |
| `primary-600` | #00C681 | Texto sobre fundo claro |
| `primary-700` | #00915D | — |
| `primary-800` | #00623D | — |
| `primary-900` | #00341E | — |
| `primary-950` | #001F10 | — |

**Brand Secondary (Roxo):**

| Token | Hex | Uso |
|-------|-----|-----|
| `secondary-500` | **#8133AA** | **Acentos secundarios, graficos, hover diferenciado** |
| `secondary-300` | #BD7EE8 | Badges informativos |
| `secondary-700` | #521E6D | Borders sutis |

**Neutral (Cinzas para dark theme):**

| Token | Hex | Uso |
|-------|-----|-----|
| `neutral-50` | #F9FAFB | Texto primario em dark mode |
| `neutral-100` | #F2F4F7 | Texto secundario |
| `neutral-200` | #EAECF0 | Borders light |
| `neutral-300` | #D0D5DD | Texto terciario |
| `neutral-400` | #98A2B3 | Texto muted |
| `neutral-500` | #667085 | Placeholders |
| `neutral-600` | #475467 | Borders em dark |
| `neutral-700` | #344054 | Card borders |
| `neutral-800` | #182230 | **Card backgrounds** |
| `neutral-900` | #101828 | **Sidebar background** |
| `neutral-950` | #0C111D | **Page background** |

**Semantic Colors (do Brand Book):**

| Semantica | Uso | Tokens sugeridos |
|-----------|-----|------------------|
| **Error** | Rotinas falhadas, blockers | Red-500 (#EF4444) over neutral-800 |
| **Warning** | Sentimento atencao, timeouts | Amber-500 (#F59E0B) |
| **Success** | Rotinas OK, sentimento positivo | primary-500 (#00FFA7) |
| **Informative** | Metricas neutras, dados informativos | Blue-500 (#3B82F6) |

### Typography

**Font:** Inter (Google Fonts) — conforme Brand Book

| Elemento | Weight | Size | Line Height |
|----------|--------|------|-------------|
| Page title | Bold 700 | 24px | 32px |
| Section title | Semi Bold 600 | 18px | 28px |
| Card title | Medium 500 | 14px | 20px |
| Metric value (grande) | Bold 700 | 32px | 40px |
| Metric label | Regular 400 | 12px | 16px |
| Body text | Regular 400 | 14px | 20px |
| Table header | Medium 500 | 12px | 16px |
| Table cell | Regular 400 | 14px | 20px |
| Badge text | Medium 500 | 12px | 16px |
| Timestamp | Regular 400 | 11px | 14px, color neutral-400 |

### Spacing & Layout

| Token | Value | Uso |
|-------|-------|-----|
| `space-1` | 4px | Padding interno minimo |
| `space-2` | 8px | Gap entre badges, icones |
| `space-3` | 12px | Padding interno de cards |
| `space-4` | 16px | Gap entre cards, padding de secoes |
| `space-6` | 24px | Margin entre secoes |
| `space-8` | 32px | Padding da pagina |
| `radius-sm` | 6px | Badges, inputs |
| `radius-md` | 8px | Cards |
| `radius-lg` | 12px | Modals, panels |

### Iconography

**Lucide Icons** — consistente, leve, open source. Tamanho padrao: 20px com `stroke-width: 1.5`.

| Dominio | Icone |
|---------|-------|
| Home | `LayoutDashboard` |
| Rotinas | `Activity` |
| Comunidade | `Users` |
| Projetos | `GitBranch` |
| Financeiro | `DollarSign` |
| Reunioes | `Video` |
| Settings | `Settings` |
| Alerta | `AlertTriangle` |
| Sucesso | `CheckCircle` |
| Falha | `XCircle` |
| Trend up | `TrendingUp` |
| Trend down | `TrendingDown` |

## Visual Foundation & Layout

### Page Layout Structure

```
┌──────────────────────────────────────────────────────────┐
│ ┌─────────┐ ┌──────────────────────────────────────────┐ │
│ │         │ │ Header (logo + page title + refresh btn) │ │
│ │         │ ├──────────────────────────────────────────┤ │
│ │ Sidebar │ │                                          │ │
│ │  (220px)│ │           Page Content                   │ │
│ │         │ │           (scrollable)                   │ │
│ │  nav    │ │                                          │ │
│ │  items  │ │                                          │ │
│ │         │ │                                          │ │
│ │         │ │                                          │ │
│ └─────────┘ └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

**Sidebar:** Fixa, 220px, background `neutral-900`. Logo "evo" no topo. Nav items com icone + label. Item ativo: texto `primary-500`, borda esquerda `primary-500` 3px. Status dots ao lado de cada item (verde/vermelho).

**Header:** Altura 56px, background `neutral-950`, border-bottom `neutral-700`. Mostra: breadcrumb da pagina, botao refresh, timestamp "Atualizado ha X min".

**Content:** Padding `space-8` (32px). Background `neutral-950`. Scroll vertical.

### Grid System

**Home (cockpit):** Grid de 2-3 colunas responsivo (CSS Grid).

```
Desktop (>=1440px): 3 colunas
Desktop (>=1280px): 2 colunas
```

**Subpages:** Full-width com secoes empilhadas verticalmente. Cards em grid de 2-4 colunas para metricas, tabela full-width para listas.

### Card Anatomy

```
┌──────────────────────────────────┐
│ [Icon] Card Title    [Timestamp] │  ← header: 12px padding
│                                  │
│     32px Bold Value              │  ← metric: centralizado ou left
│     12px label "MRR"             │
│                                  │
│  ┌──────────────────────────┐    │
│  │   Mini Trend Chart       │    │  ← opcional: sparkline 48px height
│  └──────────────────────────┘    │
│                                  │
│ [Badge: +3.2%] [Badge: status]   │  ← footer: badges contextuais
└──────────────────────────────────┘

Background: neutral-800
Border: 1px solid neutral-700
Border-radius: radius-md (8px)
Padding: space-3 (12px)
Hover: border primary-500/30
```

### Status Badge System

| Status | Background | Text | Border |
|--------|-----------|------|--------|
| Success | primary-500/10 | primary-500 | primary-500/20 |
| Warning | amber-500/10 | amber-500 | amber-500/20 |
| Error | red-500/10 | red-500 | red-500/20 |
| Info | blue-500/10 | blue-500 | blue-500/20 |
| Neutral | neutral-700/50 | neutral-300 | neutral-600 |

Formato: pill shape, `radius-sm`, padding `4px 8px`, font `12px Medium 500`.

## Page-by-Page UX Specification

### Page 1: Home / Cockpit (`/`)

**Goal:** Overview de 5 segundos de todo o ecossistema.

**Layout:**

```
┌─────────────────────────────────────────────────────────┐
│  EVO Dashboard          [Refresh] Atualizado ha 2 min   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌── Health Score ──────────────────────────────────┐   │
│  │  Score: 87/100  [████████░░] 🟢 Saudavel        │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  ┌── Alertas (se houver) ───────────────────────────┐   │
│  │ ⚠ FAQ Sync falhou as 20:15  │ 🔴 EVO-582 blocked│   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─ Rotinas ──┐ ┌─ Comunidade ┐ ┌─ Sprint ────────┐   │
│  │ 12 OK      │ │ Sent: 78% 😊│ │ 6/10 done      │   │
│  │  1 falha   │ │ 4 sem resp  │ │ 1 blocker      │   │
│  │ 14 total   │ │ 234 ativos  │ │ ████████░░ 60% │   │
│  └────────────┘ └─────────────┘ └─────────────────┘   │
│                                                         │
│  ┌─ Financeiro ┐ ┌─ Reunioes ──┐ ┌─ Rotinas Hoje ─┐   │
│  │ MRR: R$XXk  │ │ 3 esta sem  │ │ 07:00 ✅ 12s   │   │
│  │ +3.2% ↑     │ │ 5 actions   │ │ 07:15 ✅  8s   │   │
│  │ Churn: 2    │ │ pendentes   │ │ 09:00 ❌ t/o   │   │
│  └─────────────┘ └─────────────┘ └────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Componentes:**
- `HealthScoreBar` — barra horizontal com score numerico e label
- `AlertBanner` — fila de alertas urgentes, clicavel, background red-500/10
- `DomainCard` — card por dominio (6 cards), clicavel → navega para subpagina
- `RoutineTimeline` — lista cronologica das rotinas do dia com status badges

### Page 2: Rotinas (`/routines`)

**Layout:** Tabela full-width com todas as 14 rotinas. Colunas: Nome, Agente, Status (badge), Ultima Exec, Duracao, Success Rate, Tokens.

**Interacao:** Clicar na row → navega para `/routines/:name` com historico e graficos.

**Graficos:** Sparklines inline na coluna "Trend" (ultimos 7 dias de success rate).

### Page 3: Detalhe de Rotina (`/routines/:name`)

**Layout:**
- Header com nome + agente + status badge grande
- Grid de metricas: Total Runs, Success Rate, Duracao Media, Tokens Total
- Filtro de periodo: tabs 7d | 30d | 90d | 365d
- Line chart: duracao ao longo do tempo
- Tabela de historico: timestamp, duracao, status, return code, retry count

### Page 4: Comunidade (`/community`)

**Layout:**
- Top row: 4 MetricCards (mensagens 24h, membros ativos, novos membros, sentimento)
- Status badge grande (normal/atencao/critico)
- Line chart: trend de sentimento (periodo selecionavel)
- Bar chart: top topicos com contagem
- Tabela: perguntas sem resposta com urgencia

### Page 5: Projetos (`/projects`)

**Layout:**
- Sprint progress: barra grande + numeros (done/in-progress/review/blocked)
- Grid de cards por repositorio (5 repos): stars, forks, PRs, issues, commits 7d
- Tabela de blockers ativos com links

### Page 6: Financeiro (`/finance`)

**Layout:**
- Top row: MetricCards (MRR, Clientes Ativos, Churn, Assinaturas)
- Line chart: MRR trend mensal
- Tabela: NFs pendentes + contas a receber/pagar

### Page 7: Reunioes (`/meetings`)

**Layout:**
- Filtros: periodo + projeto (dropdown)
- Tabela: titulo, data, duracao, participantes, action items (done/total)
- Expandir row: resumo + lista de action items com status

### Page 8: Pessoal / Saude (`/health`)

**Layout:**
- Toggle no topo: **Davidson** | **Isabella** (tabs ou segmented control)
- Top row: 7 MetricCards (peso, gordura%, musculo%, visceral, BMI, agua%, BMR)
- Cada card com badge de trend (seta verde/vermelha + variacao absoluta)
- Line chart grande: peso ao longo do tempo (periodo selecionavel)
- Dual line chart: gordura% vs musculo% ao longo do tempo
- Secao "Aderencia Semanal": diet score (barra), workouts count (numero), medicacao em dia (check verde / x vermelho)
- Secao "Sintomas": lista de sintomas com indicador de intensidade (nenhum/leve/moderado)

**Visual:** Cards de saude usam primary-500 para melhorias e red-500 para pioras. Graficos com duas linhas em cores distintas (gordura: secondary-500 roxo, musculo: primary-500 verde).

## Component Strategy

### Shared Components (Shadcn/ui base)

| Componente | Base Shadcn | Customizacao |
|------------|-------------|-------------|
| `MetricCard` | `Card` | Numero grande, label, sparkline opcional, badge |
| `StatusBadge` | `Badge` | 5 variantes (success/warning/error/info/neutral) |
| `TrendChart` | — | Recharts `LineChart` ou `AreaChart`, minimal axis |
| `BarChart` | — | Recharts `BarChart`, horizontal, cores primary-500 |
| `SprintProgress` | `Progress` | Segmentado por status (done/progress/review/blocked) |
| `DataTable` | `Table` | Sortable headers, row click handler, skeleton loading |
| `PeriodFilter` | `Tabs` | 7d | 30d | 90d | 365d |
| `AlertBanner` | `Alert` | Variantes error/warning, dismissible, clicavel |
| `PageContainer` | — | Padding, max-width, title + timestamp |
| `Sidebar` | — | Nav items com icone + label + status dot |
| `Skeleton` | `Skeleton` | Por card e por tabela (loading state) |

### Chart Configuration

**Recharts defaults:**
- Grid: desligado (clean look)
- Axis: X axis com dates, Y axis com valores. Cores: neutral-400 labels
- Line: stroke primary-500, strokeWidth 2
- Area fill: primary-500/10
- Tooltip: background neutral-800, border neutral-700, text neutral-50
- ResponsiveContainer: width 100%, height 200px (cards) ou 300px (full)

## UX Patterns

### Loading States

- **Initial load:** Skeleton components por card/tabela (Shadcn Skeleton)
- **Refresh (polling):** Sem skeleton — dados atualizam in-place silenciosamente
- **Error state:** Card mostra "Sem dados" + icone neutral-400 + timestamp ultima coleta OK

### Empty States

- **Sem dados historicos:** "Dados serao coletados automaticamente. Primeira coleta pendente."
- **Nenhum alerta:** Health Score section mostra "Tudo OK" com icone CheckCircle verde

### Navigation

- Sidebar sempre visivel (fixed, nao colapsavel no MVP)
- Breadcrumb no header: "Dashboard > Rotinas > sync-meetings"
- Cards clicaveis na Home navegam para subpaginas
- Back button do browser funciona normalmente (React Router history)

### Data Freshness

- Timestamp "Atualizado ha X min" no header (global)
- Cada card mostra timestamp da ultima coleta bem-sucedida em neutral-400, 11px
- Se dados > 2h: timestamp fica amber-500 (warning)
- Se dados > 24h: timestamp fica red-500 (stale)

## Responsive & Accessibility

### Responsive Strategy

**Desktop-first (MVP).** Breakpoints:

| Breakpoint | Layout |
|------------|--------|
| >= 1440px | 3 colunas na Home, sidebar 220px |
| >= 1280px | 2 colunas na Home, sidebar 220px |
| < 1280px | Not officially supported in MVP |

### Accessibility (Baseline)

- **Color contrast:** WCAG AA — text neutral-50 sobre neutral-800/950 = ratio > 7:1
- **Focus indicators:** Shadcn/ui defaults (ring primary-500)
- **Keyboard navigation:** Tab through sidebar items, enter to activate
- **Screen reader:** Semantic HTML (nav, main, section, article). Cards como `article` com `aria-label`
- **Reduced motion:** `prefers-reduced-motion` desabilita transicoes CSS

## Implementation Notes for Developers

### Tailwind Config Essentials

```js
// tailwind.config.ts
colors: {
  primary: {
    500: '#00FFA7',  // Verde Evolution principal
    // ... full scale from Brand Book
  },
  secondary: {
    500: '#8133AA',  // Roxo Evolution
  },
  neutral: {
    // ... full scale from Brand Book
    800: '#182230',  // Card bg
    900: '#101828',  // Sidebar bg
    950: '#0C111D',  // Page bg
  }
}
fontFamily: {
  sans: ['Inter', 'sans-serif'],
}
```

### CSS Variables (tema escuro default)

```css
:root {
  --background: #0C111D;
  --foreground: #F9FAFB;
  --card: #182230;
  --card-foreground: #F9FAFB;
  --primary: #00FFA7;
  --primary-foreground: #001F10;
  --secondary: #8133AA;
  --muted: #344054;
  --muted-foreground: #98A2B3;
  --border: #344054;
  --ring: #00FFA7;
}
```

### Logo Usage

- Sidebar topo: "evo" short logo (verde sobre dark), conforme Brand Book favicon variations
- Tab title: "EVO Dashboard"
- Favicon: icone molecular "e" verde (#00FFA7) do Brand Book

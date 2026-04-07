# Story 1.2: Inicializar Frontend React

Status: ready-for-dev

## Story

As a developer,
I want to initialize the frontend project with React, Vite, TypeScript, Shadcn/ui, and TanStack Query,
so that I have a working SPA skeleton to build upon.

## Acceptance Criteria

1. `dashboard/frontend/` existe com `package.json`, `vite.config.ts`, `tsconfig.json`
2. Shadcn/ui inicializado com `components.json` e tema escuro
3. Tailwind CSS configurado com cores Evolution (primary #00FFA7, secondary #8133AA, neutrals do brand book)
4. TanStack Query configurado com `QueryClient` e `refetchInterval: 60000`
5. React Router v6 configurado com rotas placeholder para 8 paginas
6. Layout base com Sidebar + Header + PageContainer
7. `npm run dev` inicia em `localhost:5173`
8. Vite proxy configurado: `/api` → `localhost:8000`

## Tasks / Subtasks

- [ ] Task 1: Criar projeto Vite + React + TS (AC: 1)
  - [ ] `cd dashboard && npm create vite@latest frontend -- --template react-ts`
  - [ ] `cd frontend && npm install`
  - [ ] Verificar `npm run dev` funciona

- [ ] Task 2: Instalar dependencias (AC: 2, 3, 4)
  - [ ] `npx shadcn@latest init` (selecionar: New York style, dark mode, CSS variables)
  - [ ] `npm install @tanstack/react-query react-router-dom recharts lucide-react`
  - [ ] Configurar `components.json` com alias paths

- [ ] Task 3: Configurar Tailwind com cores Evolution (AC: 3)
  - [ ] Editar `tailwind.config.ts` com palette completa do brand book:
    - primary-500: `#00FFA7` (e toda a escala 50-950)
    - secondary-500: `#8133AA`
    - neutral: escala completa (#F9FAFB a #0C111D)
  - [ ] Configurar CSS variables em `index.css`:
    - `--background: #0C111D` (neutral-950)
    - `--foreground: #F9FAFB` (neutral-50)
    - `--card: #182230` (neutral-800)
    - `--primary: #00FFA7`
    - `--border: #344054` (neutral-700)
  - [ ] Font: Inter via Google Fonts

- [ ] Task 4: Configurar TanStack Query (AC: 4)
  - [ ] Criar `QueryClient` com `defaultOptions.queries.refetchInterval: 60000`
  - [ ] Wrap `App` com `QueryClientProvider`
  - [ ] `staleTime: 30000`, `retry: 1`

- [ ] Task 5: Configurar React Router (AC: 5)
  - [ ] Criar `BrowserRouter` em `main.tsx`
  - [ ] 8 rotas placeholder: `/`, `/routines`, `/routines/:name`, `/community`, `/projects`, `/finance`, `/meetings`, `/health`
  - [ ] Cada rota com componente placeholder: `<PageContainer title="Nome"><p>Em construcao</p></PageContainer>`

- [ ] Task 6: Criar layout base (AC: 6)
  - [ ] `components/layout/Sidebar.tsx`: 220px fixo, bg neutral-900, logo "evo" no topo, nav items com icone Lucide + label, item ativo: primary-500 + borda esquerda 3px
  - [ ] `components/layout/Header.tsx`: 56px, bg neutral-950, border-bottom neutral-700, titulo da pagina, botao refresh, "Atualizado ha X min"
  - [ ] `components/layout/PageContainer.tsx`: padding 32px, titulo + children

- [ ] Task 7: Configurar Vite proxy (AC: 8)
  - [ ] Em `vite.config.ts`: `server.proxy['/api'] = { target: 'http://localhost:8000', changeOrigin: true }`

## Dev Notes

### Architecture Compliance

- **Framework:** React + Vite + TypeScript (architecture.md)
- **UI:** Shadcn/ui com Tailwind CSS
- **State:** TanStack Query v5 (server state only, sem Redux/Zustand)
- **Routing:** React Router v6
- **Charts:** Recharts (instalar agora, usar depois)
- **Icons:** Lucide React

### Brand Book Compliance (ux-design-specification.md)

- **Tema escuro por padrao** — background #0C111D
- **Fonte:** Inter (Google Fonts) — weights: 200-700
- **Cor primaria:** #00FFA7 (verde Evolution)
- **Cor secundaria:** #8133AA (roxo)
- **Cards:** bg neutral-800 (#182230), border neutral-700 (#344054), radius 8px
- **Sidebar:** bg neutral-900 (#101828), 220px fixo

### Sidebar Nav Items

| Label | Icone Lucide | Rota |
|-------|-------------|------|
| Dashboard | `LayoutDashboard` | `/` |
| Rotinas | `Activity` | `/routines` |
| Comunidade | `Users` | `/community` |
| Projetos | `GitBranch` | `/projects` |
| Financeiro | `DollarSign` | `/finance` |
| Reunioes | `Video` | `/meetings` |
| Saude | `Heart` | `/health` |

### Naming Conventions

- Componentes: `PascalCase` (`Sidebar.tsx`, `Header.tsx`)
- Hooks: `camelCase` com prefixo `use` (`useRoutines.ts`)
- Utils: `camelCase` (`api.ts`, `formatDate.ts`)
- Types: `PascalCase` (`RoutineRun`, `CommunitySnapshot`)

### Project Structure

```
dashboard/frontend/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── components.json
├── index.html
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── RoutinesPage.tsx
│   │   ├── RoutineDetailPage.tsx
│   │   ├── CommunityPage.tsx
│   │   ├── ProjectsPage.tsx
│   │   ├── FinancePage.tsx
│   │   ├── MeetingsPage.tsx
│   │   └── HealthPage.tsx
│   ├── components/
│   │   ├── ui/          # Shadcn auto-generated
│   │   └── layout/
│   │       ├── Sidebar.tsx
│   │       ├── Header.tsx
│   │       └── PageContainer.tsx
│   ├── hooks/
│   ├── lib/
│   │   ├── api.ts
│   │   └── utils.ts
│   └── types/
└── dist/               # Build output (gitignored)
```

### References

- [Source: architecture.md#Frontend Architecture]
- [Source: architecture.md#Project Structure]
- [Source: ux-design-specification.md#Design System]
- [Source: ux-design-specification.md#Visual Foundation & Layout]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List

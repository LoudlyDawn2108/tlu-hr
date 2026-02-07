# PROJECT KNOWLEDGE BASE

**Generated:** 2026-02-07
**Framework:** React 19 + TypeScript + Vite + Shadcn/ui
**State:** Zustand + TanStack Query + React Hook Form (Zod)
**Styling:** Tailwind CSS v4 + Lucide Icons

## OVERVIEW
TLU HRMS is a Human Resource Management System for Thuyloi University. It uses a hybrid architecture combining domain-driven modules (`tccb`, `tckt`) with technical layers (`components`, `hooks`). Key features include personnel management, contract workflows, and training records.

## STRUCTURE
```
src/
├── components/      # Shared UI & Feature Components
│   ├── ui/          # Atomic Shadcn/ui primitives (30+ files)
│   ├── forms/       # Complex forms & Wizard steps
│   ├── contracts/   # Domain: Contract specific UI
│   └── training/    # Domain: Training specific UI
├── pages/           # Route-level Views
│   ├── tccb/        # Core Domain: Personnel (Tổ chức cán bộ)
│   ├── admin/       # System Config & User Mgmt
│   └── auth/        # Authentication
├── hooks/           # Shared Logic (Session, Toasts)
├── lib/             # Utilities (cn, utils)
└── types/           # Global Type Definitions
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| **Entry Point** | `src/main.tsx` | Vite entry, React Root |
| **Routing** | `src/router.tsx` | App-wide route definitions |
| **Global State** | `src/stores/` | Zustand stores (Auth, etc.) |
| **API Types** | `src/types/index.ts` | Shared domain models |
| **Theme Config** | `src/index.css` | Tailwind v4 CSS variables |
| **UI Components** | `src/components/ui` | Base building blocks |

## CONVENTIONS
- **Imports**: `@/` alias for `src/`.
- **Strictness**: `strict: true`, no `any`, no unused vars.
- **Naming**: `PascalCase` for components/types, `camelCase` for functions/hooks.
- **Styling**: Tailwind utility classes via `cn()`. No inline styles.
- **Icons**: Lucide React exclusively.

## ANTI-PATTERNS (THIS PROJECT)
- **Direct Fetch**: Use TanStack Query hooks, never `fetch`/`axios` directly in components.
- **Magic Strings**: Avoid hardcoded Vietnamese labels; use constants/config.
- **Mixed Grouping**: Don't mix domain logic in `src/components/ui`.
- **Deep Drilling**: Max 2 levels of prop drilling; use Context/Zustand otherwise.
- **Weak IDs**: Use UUIDs, never `Date.now()`.

## COMMANDS
```bash
npm run dev        # Start dev server
npm run build      # Type-check & build
npm run lint       # Run ESLint
npm run preview    # Preview production build
# Testing: Manual verification via Playwright (test-contract-dialogs.ts)
```

## NOTES
- **Hybrid Structure**: Note that `components/` contains both generic (`ui`, `forms`) and domain (`contracts`, `training`) folders.
- **Acronyms**: `TCCB` = Personnel Dept, `TCKT` = Finance/Accounting.
- **Testing**: Test artifacts located in `test-screenshots/` and `qa_screenshots/`.

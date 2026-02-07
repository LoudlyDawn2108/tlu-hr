# PROJECT KNOWLEDGE BASE

**Generated:** 2026-02-07
**Framework:** React 19 + TypeScript + Vite + Shadcn/ui
**State:** Zustand + TanStack Query

## OVERVIEW
TLU HRMS is a Human Resource Management System for Thuyloi University, built with React 19, TypeScript, and Vite. It features a comprehensive dashboard for personnel management, including contracts, training, and organizational structure. The application uses a hybrid architecture with domain-driven feature modules and standard React patterns.

## STRUCTURE
```
tlu-hr/
├── src/
│   ├── components/
│   │   ├── ui/              # Shadcn/ui primitives (Radix UI based)
│   │   ├── forms/           # Form components (React Hook Form + Zod)
│   │   ├── tables/          # Data tables (TanStack Table)
│   │   ├── charts/          # Recharts visualizations
│   │   ├── contracts/       # Contract management specific components
│   │   └── training/        # Training management specific components
│   ├── pages/
│   │   ├── admin/           # Administration & Configuration
│   │   ├── auth/            # Authentication
│   │   ├── tccb/            # "Tổ chức cán bộ" (Personnel) - Core Domain
│   │   └── self-service/    # Employee self-service features
│   ├── hooks/               # Custom hooks (e.g., use-toast, useSessionTimeout)
│   ├── stores/              # Zustand state stores (auth, etc.)
│   ├── lib/                 # Utilities & libraries (cn, fetchers)
│   ├── types/               # TypeScript definitions
│   └── data/                # Static data & mocks
└── test-screenshots/        # UI verification artifacts
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| **Routes** | `src/router.tsx` | Centralized route definitions |
| **Auth Logic** | `src/stores/auth.ts` | Zustand store for user state |
| **API Types** | `src/types/index.ts` | Shared type definitions |
| **UI Config** | `components.json` | Shadcn/ui configuration |
| **Constants** | `src/lib/utils.ts` | Common utilities (cn) |
| **Forms** | `src/components/forms` | Reusable form components |

## CONVENTIONS
- **Imports**: Always use `@/` alias for `src/` (e.g., `@/components/ui/button`)
- **Styling**: Tailwind CSS v4 with `cn()` utility for class merging
- **State**: global (Zustand) vs server (TanStack Query) vs local (React state)
- **Forms**: React Hook Form + Zod for validation
- **Icons**: Lucide React (`lucide-react`)
- **Strictness**: No `any`, no unused vars, strict null checks enabled

## ANTI-PATTERNS (THIS PROJECT)
- **Magic Numbers**: Avoid hardcoding IDs/timeouts (use constants)
- **Weak IDs**: Do NOT use `Date.now()` or `Math.random()` for IDs (use UUID)
- **Inline Styles**: Avoid `style={{}}` prop (use Tailwind classes)
- **Direct Fetch**: Do not use `fetch()` directly in components (use Query hooks)
- **Props Drilling**: Avoid >2 levels (use Composition or Context/Zustand)

## COMMANDS
```bash
npm run dev      # Start dev server
npm run build    # Type-check & build
npm run lint     # Run ESLint
npm run preview  # Preview build locally
```

## NOTES
- **"TCCB"**: Acronym for "Tổ chức cán bộ" (Personnel Department)
- **Session**: Aggressive auto-logout implemented in `SessionTimeoutProvider`
- **Testing**: Currently manual verification via `test-contract-dialogs.ts` (Playwright)

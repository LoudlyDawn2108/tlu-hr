# PAGES KNOWLEDGE BASE

## OVERVIEW
Centralized page-level components organized by domain-driven feature modules (TCCB, Admin, Auth).

## STRUCTURE
```
src/pages/
├── tccb/            # "Tổ chức cán bộ" - Core Personnel, Contracts, and Training management
├── admin/           # Administration, User management, and System Settings
│   └── config/      # Metadata & Business Catalog configuration (Allowances, Units, etc.)
├── auth/            # Authentication entry points (Login)
├── self-service/    # Employee-facing features (Profile, Personal Requests)
└── tckt/            # "Tài chính kế toán" - Finance and Accounting modules
```

## WHERE TO LOOK
| Domain | Folder | Core Responsibilities |
|--------|--------|-----------------------|
| **Personnel** | `tccb/` | CRUD for Staff (`Personnel*`), Contracts, and Training records. |
| **System Config** | `admin/config/` | Management of lookup tables, salary types, and training categories. |
| **User Mgmt** | `admin/` | Creation and editing of system users and permissions. |
| **Authentication** | `auth/` | Login page and credential-related workflows. |
| **Dashboard** | `tccb/DashboardPage.tsx` | Main metrics and overview for the HR department. |

## CONVENTIONS
- **Naming**: Always suffix files with `Page.tsx` (e.g., `PersonnelListPage.tsx`).
- **Composition**: Extract complex tables or forms to `@/components/tables` or `@/components/forms`.
- **State**: Use local `useState` for UI toggles (dialogs, filters); use TanStack Query for server state.
- **Routing**: Use `useNavigate` with absolute paths defined in `src/router.tsx`.
- **Layout**: Most pages are wrapped in a layout; focus the page component on the content area.

## ANTI-PATTERNS
- **Prop Drilling**: Do not pass data through pages; use the URL (params/query) or Zustand.
- **Hardcoded Strings**: Avoid hardcoding Vietnamese UI labels for common terms; use constants if reused.
- **Fat Components**: Pages with >400 lines should be refactored by extracting UI sub-sections.
- **Mock Data**: Do not leave `data/*.json` imports in production; replace with Query hooks.
- **Direct API Calls**: Never use `axios` or `fetch` directly in a page component.

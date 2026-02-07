# Personnel Module (TCCB) - Page Guide

**Last Updated:** 2026-02-07
**Domain:** Tổ chức cán bộ (TCCB)
**Scope:** Personnel, Contracts, Training Records

## OVERVIEW
The `tccb` module is the core domain for Personnel Management at Thuyloi University. It handles the complete lifecycle of staff members, including recruitment, organizational placement, contract progression, and specialized training records.

## STRUCTURE
```
src/pages/tccb/
├── DashboardPage.tsx        # KPI overview & Personnel metrics
├── PersonnelListPage.tsx    # Master list with advanced filtering
├── PersonnelDetailPage.tsx  # 360-view (Profile, Contracts, Training)
├── PersonnelCreatePage.tsx  # New staff onboarding wizard
├── ContractListPage.tsx     # Contract tracking & Expiration alerts
├── TrainingListPage.tsx     # Staff development & Certification logs
└── OrganizationPage.tsx     # Institutional hierarchy & Unit management
```

## WHERE TO LOOK
| Feature | Files | Integration Point |
|---------|-------|-------------------|
| **Contract Actions** | `PersonnelDetailPage.tsx` | `@/components/contracts/` |
| **Training Records** | `TrainingDetailPage.tsx` | `@/components/training/` |
| **Org Structure** | `UnitDetailPage.tsx` | `@/data/organizations.json` |
| **Staff Wizard** | `PersonnelCreatePage.tsx` | `@/components/forms/` |

## CONVENTIONS
- **Naming**: Use `[Feature][Action]Page.tsx` (e.g., `PersonnelEditPage.tsx`).
- **Data Access**: Consume `personnelData`, `contractsData`, and `organizationData` (mocked in `src/data/`).
- **State Management**: Use local state for dialogs; transition to TanStack Query for API-backed data.
- **Complex UI**: Use `Tabs` in `DetailPage` to separate Contracts, Training, and Personal info.

## ANTI-PATTERNS
- **Direct API Calls**: Never use `fetch` or `axios` directly in pages. Use hooks.
- **Data Inconsistency**: Do not modify state without triggering a toast notification.
- **UI Logic Bloat**: Avoid defining complex dialog content inside page files; extract to `src/components/contracts/` or `src/components/training/`.
- **Hardcoded IDs**: Always use UUIDs/IDs from route parameters via `useParams`.

## NOTES
- Vietnamese terminology: `Tổ chức cán bộ` = Personnel Department.
- `PersonnelDetailPage` acts as the primary hub for linking contracts and training records.

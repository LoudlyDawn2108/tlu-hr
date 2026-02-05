# TLU HRMS - Context Compaction Document
> Last Updated: 2026-02-03
> Status: Phase 4 Complete, Ready for Phase 5

---

## Project Overview

**TLU HRMS** (Thuy Loi University Human Resource Management System) is a static React SPA built with:
- React 18 + TypeScript
- Vite (build tool)
- shadcn/ui (component library)
- React Router (routing)
- Zustand (auth state)
- Zod (form validation)
- Tanstack Table (data tables)

**Target Users**: TCCB (Tổ chức cán bộ - Organization Staff) officers
**Language**: Vietnamese only
**Data**: Mock JSON files (no backend, in-memory only)

---

## Completed Phases Summary

### Phase 1: Core Static SPA (tlu-hrms-ux)
**14 tasks** - Foundation of the application

| Feature | Route | Description |
|---------|-------|-------------|
| Login | `/auth/login` | Form validation, redirect to dashboard |
| Dashboard | `/tccb/dashboard` | 4 KPI cards |
| Personnel List | `/tccb/personnel` | Searchable/filterable table |
| Personnel Create | `/tccb/personnel/new` | 8-step accordion wizard |
| Personnel Detail | `/tccb/personnel/:id` | 7-tab detail view |
| Organization | `/tccb/organization` | Interactive tree view |
| Unit Detail | `/tccb/organization/:id` | Unit members and info |
| Contract List | `/tccb/contracts` | Read-only table |
| Training List | `/tccb/training` | Read-only table |

### Phase 2: Personnel CRUD (personnel-crud)
**6 tasks** - Full personnel management

- Personnel Edit Page with pre-populated accordion form
- Personnel termination workflow with dialog
- Row actions in list page (view, edit, terminate)
- Change history display in detail page
- Mapping utilities (Personnel ↔ WizardData)

### Phase 2.5: Wizard Refactor (wizard-refactor)
**5 tasks** - UX improvement

- Converted wizard from multi-page to accordion
- Zod schemas for each step
- Guided mode (create) vs Free roaming mode (edit)
- Step-level validation with error display

### Phase 3: Contract Management (contract-management + contract-wizard-fix + contract-appendix)
**12 tasks total** - Contract lifecycle

- Contract Create Page for existing personnel
- Contract extension dialog (max 2 for definite contracts)
- Contract termination dialog
- Contract fields in wizard Step 6
- Contract appendix dialog
- Contracts tab in Personnel Detail

### Phase 4: Training Management (training-management)
**11 tasks** - Training course lifecycle

- Training CRUD (Create, Read, Update)
- Personnel enrollment to courses
- Progress tracking (registered → studying → completed/dropped)
- Certificate auto-issuance on completion
- Year filter on list page
- Capacity enforcement

### Phase 5 (System Configuration)
**Completed Tasks:**
- Admin route guard (SYSTEM_ADMIN role check)
- Session timeout (30 min with 29 min warning)
- User management CRUD (create, edit, lock/unlock, password reset)
- 6 config pages: Salary, Allowance, Contract, Evaluation, Training Types, Business Catalogs
- 7 config JSON files with TLU sample data
- Contract helper refactored to use config values
**Key Files to Know:**
- Admin routes: `/admin/users`, `/admin/config/*`
- Config data: `src/data/config/*.json`
- Route guard: `src/components/AdminRoute.tsx`
- Session timeout: `src/hooks/useSessionTimeout.ts` + `src/components/SessionTimeoutProvider.tsx`

---

## Current File Structure

```
src/
├── components/
│   ├── contracts/
│   │   ├── AddAppendixDialog.tsx
│   │   ├── ContractExtensionDialog.tsx
│   │   └── ContractTerminationDialog.tsx
│   ├── forms/wizard-steps/
│   │   ├── Step1BasicInfo.tsx
│   │   ├── Step2AddressContact.tsx
│   │   ├── Step3Family.tsx
│   │   ├── Step4Education.tsx
│   │   ├── Step5UnitPosition.tsx
│   │   ├── Step6Contract.tsx
│   │   ├── Step7Salary.tsx
│   │   └── Step8Review.tsx
│   ├── training/
│   │   ├── EnrollPersonnelDialog.tsx
│   │   └── UpdateProgressDialog.tsx
│   ├── layout/
│   │   └── AppLayout.tsx (sidebar navigation)
│   ├── ui/ (shadcn components)
│   └── ProtectedRoute.tsx
├── data/
│   ├── contracts.json
│   ├── organizations.json
│   ├── personnel.json
│   ├── training.json
│   └── users.json
├── pages/
│   ├── auth/LoginPage.tsx
│   └── tccb/
│       ├── DashboardPage.tsx
│       ├── PersonnelListPage.tsx
│       ├── PersonnelCreatePage.tsx
│       ├── PersonnelEditPage.tsx
│       ├── PersonnelDetailPage.tsx
│       ├── OrganizationPage.tsx
│       ├── UnitDetailPage.tsx
│       ├── ContractListPage.tsx
│       ├── ContractCreatePage.tsx
│       ├── TrainingListPage.tsx
│       ├── TrainingCreatePage.tsx
│       ├── TrainingDetailPage.tsx
│       └── TrainingEditPage.tsx
├── utils/
│   ├── contract-helpers.ts
│   ├── personnel-mapper.ts
│   └── training-helpers.ts
├── types/
│   ├── index.ts (all type definitions)
│   └── wizard.ts (WizardData type)
├── stores/
│   └── auth.ts (Zustand auth store)
├── lib/
│   └── schemas.ts (Zod validation schemas)
└── router.tsx
```

---

## Current Routes

| Route | Page | Status |
|-------|------|--------|
| `/auth/login` | LoginPage | ✅ Complete |
| `/tccb/dashboard` | DashboardPage | ✅ Complete |
| `/tccb/personnel` | PersonnelListPage | ✅ Complete |
| `/tccb/personnel/new` | PersonnelCreatePage | ✅ Complete |
| `/tccb/personnel/:id` | PersonnelDetailPage | ✅ Complete |
| `/tccb/personnel/:id/edit` | PersonnelEditPage | ✅ Complete |
| `/tccb/organization` | OrganizationPage | ✅ Complete |
| `/tccb/organization/:id` | UnitDetailPage | ✅ Complete |
| `/tccb/contracts` | ContractListPage | ✅ Complete |
| `/tccb/contracts/new` | ContractCreatePage | ✅ Complete |
| `/tccb/training` | TrainingListPage | ✅ Complete |
| `/tccb/training/new` | TrainingCreatePage | ✅ Complete |
| `/tccb/training/:id` | TrainingDetailPage | ✅ Complete |
| `/tccb/training/:id/edit` | TrainingEditPage | ✅ Complete |

---

## Key Patterns & Conventions

### Form Pattern
- Card-based layout with CardHeader + CardContent + CardFooter
- Controlled inputs with useState
- Manual validation with error state object
- Toast notifications via sonner

### Dialog Pattern
- shadcn Dialog with DialogHeader, DialogContent, DialogFooter
- Controlled open state from parent
- onSuccess callback to update parent state
- Validation before confirm

### List Page Pattern
- DataTable with Tanstack Table
- Search input + filter dropdowns
- Row actions via DropdownMenu
- "Create" button linking to /new route

### Detail Page Pattern
- Back button + title header
- Info card on left, main content on right
- Tabs for different sections
- Action buttons (Edit, Delete, etc.)

### Data Management
- Import from JSON files: `import data from "@/data/file.json"`
- Local useState for in-memory mutations
- No persistence (data resets on page reload)
- Demo warning banner on create pages

---

## Type Definitions (Key Types)

```typescript
// Personnel (main entity)
interface Personnel {
  id: string;
  employeeCode: string;
  fullName: string;
  status: PersonnelStatus;
  currentUnit?: UnitAssignment;
  currentContract?: Contract;
  certificates: Certificate[];
  changeHistory: ChangeHistoryEntry[];
  // ... more fields
}

// Contract
interface Contract {
  id: string;
  personnelId: string;
  type: ContractType;
  status: ContractStatus;
  signDate: string;
  startDate: string;
  endDate?: string;
  appendices: ContractAppendix[];
  // ... more fields
}

// Training Course
interface TrainingCourse {
  id: string;
  name: string;
  type: TrainingType;
  status: TrainingStatus;
  startDate: string;
  endDate: string;
  participants: TrainingParticipation[];
  maxParticipants?: number;
  // ... more fields
}

// Training Participation
interface TrainingParticipation {
  id: string;
  courseId: string;
  personnelId: string;
  status: ParticipantStatus; // registered, studying, completed, dropped
  registrationDate: string;
  completionDate?: string;
  certificateId?: string;
}
```

---

## Commands

```bash
# Development
bun run dev          # Start dev server at http://localhost:5173

# Build
bun run build        # TypeScript check + Vite build

# Type check only
bun run typecheck    # or: tsc --noEmit
```

---

## Known Issues & Technical Debt

1. **Bundle Size**: Main JS chunk is 663KB (warning threshold 500KB)
   - Consider code splitting with React.lazy()
   - Dynamic imports for large pages

2. **No Persistence**: Data resets on page reload
   - Could add localStorage for demo persistence
   - Or IndexedDB for larger datasets

3. **No Tests**: Manual verification only
   - Consider adding Vitest for unit tests
   - Playwright for E2E tests

4. **Hardcoded Vietnamese**: No i18n support
   - Fine for current scope
   - Would need refactor for multi-language

---
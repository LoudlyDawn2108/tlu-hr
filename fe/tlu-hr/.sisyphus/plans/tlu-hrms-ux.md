# TLU HRMS - Static React SPA with shadcn/ui

## TL;DR

> **Quick Summary**: Build a static React SPA for Thuy Loi University HRMS focusing on TCCB (Organization Staff) Portal. Features include login, dashboard with 4 KPIs, personnel management with 8-step wizard, organization tree view, and read-only contract/training lists.
> 
> **Deliverables**:
> - Authentication flow (login page + protected routes)
> - TCCB Dashboard with 4 KPI cards
> - Personnel CRUD (list, 8-step wizard, 7-tab detail view)
> - Organization structure tree view
> - Contract and Training read-only lists
> - Mock data (15-20 personnel, 3-4 departments)
> 
> **Estimated Effort**: Large (40-60 hours)
> **Parallel Execution**: YES - 3 waves
> **Critical Path**: Mock Data → Auth → Layout → Personnel → Organization → Lists

---

## Context

### Original Request
Translate functional requirements from `needs_list.md` into a static React SPA with shadcn/ui components. Adopt a "Composite & Task-Based" design philosophy for TLU HRMS.

### Interview Summary
**Key Discussions**:
- Data Strategy: Mock JSON files in `src/data/`
- Navigation: Hybrid (task-based primary, module-based secondary)
- Personnel UX: 8-step wizard for create, 7 tabs for view
- Scope: TCCB Portal + Auth only
- Org Chart: Interactive tree view
- Language: Vietnamese only, desktop-only (1280px+)
- Testing: Manual verification via Playwright

**Research Findings**:
- HRMS dashboards should have 4-6 KPI cards with quick actions
- Personnel profiles work best with persistent header + tabbed sections
- Task-based navigation reduces cognitive load for HR workflows
- Tanstack Table + shadcn provides enterprise-grade data tables

### Metis Review
**Identified Gaps** (addressed):
- Session persistence: React state only (no localStorage)
- Route protection: Protected routes with redirect
- 4 KPIs: Total, Active, Contracts Expiring, Pending Requests
- 7 tabs defined for personnel detail
- 8 wizard steps defined with field mapping
- Desktop-only (1280px+)

---

## Work Objectives

### Core Objective
Build a functional static React SPA demonstrating TLU HRMS TCCB portal with comprehensive personnel management, organization structure visualization, and mock data.

### Concrete Deliverables
- `/auth/login` - Login page with form validation
- `/tccb/dashboard` - 4 KPI cards
- `/tccb/personnel` - Searchable/filterable personnel list
- `/tccb/personnel/new` - 8-step wizard form
- `/tccb/personnel/:id` - 7-tab detail view
- `/tccb/organization` - Interactive tree view
- `/tccb/organization/:id` - Unit detail page
- `/tccb/contracts` - Read-only contract list
- `/tccb/training` - Read-only training list
- `src/data/*.json` - Mock data files

### Definition of Done
- [x] `bun run build` exits with code 0 (no TypeScript errors)
- [x] All routes navigable without console errors
- [x] Login → Dashboard → Personnel List flow works
- [x] Personnel wizard completes all 8 steps
- [x] Organization tree expands/collapses correctly

### Must Have
- Vietnamese UI labels for all components
- Form validation with zod schemas
- Protected routes (redirect to login if not authenticated)
- Responsive sidebar collapse (desktop only)
- Loading states at page level

### Must NOT Have (Guardrails)
- NO Admin portal (user management, role permissions)
- NO TCKT portal (finance views)
- NO Self-Service portal (employee views)
- NO file upload functionality (photos, documents)
- NO file export functionality (Excel, PDF, Word)
- NO dark mode toggle
- NO i18n abstraction - hardcode Vietnamese
- NO API abstraction layer - direct JSON imports
- NO test files or test infrastructure
- NO localStorage/sessionStorage persistence
- NO generic entity components - build specific ones
- NO dynamic form generators
- NO component-level loading skeletons
- NO optimistic updates

---

## Verification Strategy (MANDATORY)

### Test Decision
- **Infrastructure exists**: NO
- **User wants tests**: Manual verification only
- **Framework**: None

### Automated Verification (Agent-Executable)

**Build Verification:**
```bash
bun run build
# Assert: Exit code 0
# Assert: No TypeScript errors in output
```

**Dev Server Verification:**
```bash
bun run dev &
sleep 3
curl -s http://localhost:5173/auth/login | grep -q "Đăng nhập"
# Assert: Contains Vietnamese login text
```

**Route Verification (via Playwright skill):**
```
1. Navigate to: http://localhost:5173/
2. Assert: Redirects to /auth/login
3. Fill: username with "admin"
4. Fill: password with "Admin123"
5. Click: submit button
6. Assert: URL changes to /tccb/dashboard
7. Assert: 4 KPI cards visible
8. Navigate to: /tccb/personnel
9. Assert: Data table visible with rows
10. Click: "Thêm nhân sự" button
11. Assert: Wizard step 1 visible
12. Screenshot: .sisyphus/evidence/wizard-step1.png
```

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately):
├── Task 1: Setup project structure and routing
├── Task 2: Create mock data files
└── Task 3: Create auth store (zustand)

Wave 2 (After Wave 1):
├── Task 4: Build layout shell (sidebar + main)
├── Task 5: Build login page
└── Task 6: Build dashboard page

Wave 3 (After Wave 2):
├── Task 7: Build personnel list page
├── Task 8: Build personnel wizard
├── Task 9: Build personnel detail page
├── Task 10: Build organization tree
├── Task 11: Build contract list
└── Task 12: Build training list

Wave 4 (Final):
└── Task 13: Integration testing and polish

Critical Path: Task 1 → Task 4 → Task 7 → Task 8
Parallel Speedup: ~35% faster than sequential
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 1 | None | 4, 5, 6 | 2, 3 |
| 2 | None | 6, 7, 8, 9, 10, 11, 12 | 1, 3 |
| 3 | None | 5, 6 | 1, 2 |
| 4 | 1 | 5, 6, 7, 8, 9, 10, 11, 12 | None |
| 5 | 3, 4 | 6, 7 | None |
| 6 | 2, 4 | None | 5 |
| 7 | 2, 4 | 8, 9 | 6 |
| 8 | 7 | 9 | 10, 11, 12 |
| 9 | 7 | None | 8, 10, 11, 12 |
| 10 | 2, 4 | None | 8, 9, 11, 12 |
| 11 | 2, 4 | None | 8, 9, 10, 12 |
| 12 | 2, 4 | None | 8, 9, 10, 11 |
| 13 | All | None | None |

---

## TODOs

### Task 1: Setup Project Structure and Routing

**What to do**:
- Create router configuration with react-router-dom
- Setup route definitions for all pages
- Create ProtectedRoute wrapper component
- Create placeholder page components

**Must NOT do**:
- No lazy loading/code splitting
- No animated transitions
- No breadcrumb component

**Recommended Agent Profile**:
- **Category**: `quick`
- **Skills**: [`frontend-design`]
  - `frontend-design`: Route setup is standard frontend task

**Parallelization**:
- **Can Run In Parallel**: YES
- **Parallel Group**: Wave 1 (with Tasks 2, 3)
- **Blocks**: Tasks 4, 5, 6
- **Blocked By**: None

**References**:
- `src/main.tsx` - Entry point to wrap with RouterProvider
- `src/types/index.ts:UserRole` - Role enum for route protection logic
- `package.json` - react-router-dom v7.13 installed

**Acceptance Criteria**:
```bash
# Create router and verify build
bun run build
# Assert: Exit code 0

# Playwright verification:
# 1. Navigate to http://localhost:5173/auth/login
# 2. Assert: Page loads without errors
# 3. Navigate to http://localhost:5173/tccb/dashboard
# 4. Assert: Redirects to /auth/login (not authenticated)
```

**Commit**: YES
- Message: `feat(router): setup react-router with protected routes`
- Files: `src/router.tsx`, `src/components/ProtectedRoute.tsx`, `src/pages/**/*.tsx`

---

### Task 2: Create Mock Data Files

**What to do**:
- Create `src/data/personnel.json` with 15-20 records
- Create `src/data/organizations.json` with 3-4 departments hierarchy
- Create `src/data/contracts.json` with sample contracts
- Create `src/data/training.json` with 5-6 courses
- Create `src/data/users.json` with test login accounts
- Ensure data follows TypeScript types exactly

**Must NOT do**:
- No data service layer abstraction
- No random data generation logic
- No async data loading utilities

**Recommended Agent Profile**:
- **Category**: `writing`
- **Skills**: []
  - Writing structured JSON data matching types

**Parallelization**:
- **Can Run In Parallel**: YES
- **Parallel Group**: Wave 1 (with Tasks 1, 3)
- **Blocks**: Tasks 6, 7, 8, 9, 10, 11, 12
- **Blocked By**: None

**References**:
- `src/types/index.ts:Personnel` (lines 350-404) - Full personnel interface
- `src/types/index.ts:OrganizationUnit` (lines 499-518) - Org unit with children
- `src/types/index.ts:Contract` (lines 267-289) - Contract interface
- `src/types/index.ts:TrainingCourse` (lines 421-441) - Training course interface
- `src/types/index.ts:User` (lines 140-151) - User account interface

**Acceptance Criteria**:
```bash
# Verify JSON files are valid and match types
bun run build
# Assert: Exit code 0 (TypeScript validates imports)

# Check file existence
ls src/data/personnel.json src/data/organizations.json src/data/contracts.json src/data/training.json src/data/users.json
# Assert: All files exist
```

**Commit**: YES
- Message: `feat(data): add mock data files for HRMS entities`
- Files: `src/data/*.json`

---

### Task 3: Create Auth Store (Zustand)

**What to do**:
- Create `src/stores/auth.ts` with zustand store
- Implement login/logout actions
- Store current user and isAuthenticated flag
- No persistence (React state only)

**Must NOT do**:
- No localStorage/sessionStorage
- No JWT token handling
- No refresh token logic

**Recommended Agent Profile**:
- **Category**: `quick`
- **Skills**: [`frontend-design`]
  - `frontend-design`: State management is frontend concern

**Parallelization**:
- **Can Run In Parallel**: YES
- **Parallel Group**: Wave 1 (with Tasks 1, 2)
- **Blocks**: Tasks 5, 6
- **Blocked By**: None

**References**:
- `src/types/index.ts:User` (lines 140-151) - User interface
- `src/types/index.ts:LoginCredentials` (lines 153-156) - Login input
- `package.json` - zustand v5.0.11 installed

**Acceptance Criteria**:
```bash
bun run build
# Assert: Exit code 0

# Type check store exports
bun -e "import { useAuthStore } from './src/stores/auth'; console.log(typeof useAuthStore)"
# Assert: Output is "function"
```

**Commit**: YES
- Message: `feat(auth): add zustand auth store with login/logout`
- Files: `src/stores/auth.ts`

---

### Task 4: Build Layout Shell

**What to do**:
- Create `src/components/layout/AppLayout.tsx` with sidebar + main content
- Use existing shadcn sidebar component
- Implement Vietnamese navigation structure (from draft)
- Add user menu in sidebar footer
- Create `src/components/layout/Header.tsx` with page title

**Must NOT do**:
- No mobile hamburger menu
- No dark mode toggle
- No notifications bell
- No search in header

**Recommended Agent Profile**:
- **Category**: `visual-engineering`
- **Skills**: [`frontend-design`, `frontend-ui-ux`]
  - `frontend-design`: Layout is core frontend work
  - `frontend-ui-ux`: Navigation UX patterns

**Parallelization**:
- **Can Run In Parallel**: NO
- **Parallel Group**: Sequential after Wave 1
- **Blocks**: Tasks 5, 6, 7, 8, 9, 10, 11, 12
- **Blocked By**: Task 1

**References**:
- `src/components/ui/sidebar.tsx` - Existing shadcn sidebar (full file)
- `src/components/ui/collapsible.tsx` - For nested menu items
- `src/index.css` - TLU custom CSS classes (`.tlu-*`)
- Draft navigation structure in `.sisyphus/drafts/tlu-hrms-ux-design.md`

**Acceptance Criteria**:
```bash
bun run build
# Assert: Exit code 0

# Playwright verification:
# 1. Navigate to http://localhost:5173/tccb/dashboard (after login)
# 2. Assert: Sidebar visible on left
# 3. Assert: Navigation items visible: "Quản lý nhân sự", "Cơ cấu tổ chức", etc.
# 4. Click: "Quản lý nhân sự" in sidebar
# 5. Assert: Submenu expands with "Danh sách hồ sơ", "Thêm hồ sơ mới"
# 6. Screenshot: .sisyphus/evidence/layout-sidebar.png
```

**Commit**: YES
- Message: `feat(layout): add app layout with Vietnamese sidebar navigation`
- Files: `src/components/layout/AppLayout.tsx`, `src/components/layout/Header.tsx`

---

### Task 5: Build Login Page

**What to do**:
- Create `src/pages/auth/LoginPage.tsx`
- Form with username and password fields
- Validation: username required, password min 8 chars with uppercase/lowercase/number
- On submit: check against mock users, call auth store login
- On success: redirect to /tccb/dashboard
- Error message for invalid credentials

**Must NOT do**:
- No "Remember me" checkbox
- No "Forgot password" link
- No registration link
- No social login buttons

**Recommended Agent Profile**:
- **Category**: `visual-engineering`
- **Skills**: [`frontend-design`]
  - `frontend-design`: Form with validation

**Parallelization**:
- **Can Run In Parallel**: NO (needs auth store)
- **Parallel Group**: Wave 2
- **Blocks**: Tasks 6, 7 (authentication required)
- **Blocked By**: Tasks 3, 4

**References**:
- `src/components/ui/form.tsx` - Form component
- `src/components/ui/input.tsx` - Input component
- `src/components/ui/button.tsx` - Button component
- `src/components/ui/card.tsx` - Card for login container
- `src/stores/auth.ts` - Auth store (Task 3)
- `src/data/users.json` - Mock users (Task 2)

**Acceptance Criteria**:
```bash
bun run build
# Assert: Exit code 0

# Playwright verification:
# 1. Navigate to http://localhost:5173/auth/login
# 2. Assert: Form visible with "Đăng nhập" title
# 3. Fill: username = "invalid", password = "wrong"
# 4. Click: submit button
# 5. Assert: Error message visible "Thông tin đăng nhập không hợp lệ"
# 6. Fill: username = "admin", password = "Admin123"
# 7. Click: submit button
# 8. Assert: URL changes to /tccb/dashboard
# 9. Screenshot: .sisyphus/evidence/login-success.png
```

**Commit**: YES
- Message: `feat(auth): add login page with form validation`
- Files: `src/pages/auth/LoginPage.tsx`

---

### Task 6: Build Dashboard Page

**What to do**:
- Create `src/pages/tccb/DashboardPage.tsx`
- 4 KPI cards in a grid:
  - Tổng số nhân sự (from mock data count)
  - Nhân sự đang hoạt động (status=ACTIVE count)
  - Hợp đồng sắp hết hạn (contracts expiring in 30 days)
  - Yêu cầu chờ duyệt (pending update requests count)
- Use Card component from shadcn
- Calculate stats from mock data

**Must NOT do**:
- No charts or graphs
- No trend indicators (+/-%)
- No click-through to detail
- No date range selector

**Recommended Agent Profile**:
- **Category**: `visual-engineering`
- **Skills**: [`frontend-design`]
  - `frontend-design`: Dashboard cards layout

**Parallelization**:
- **Can Run In Parallel**: YES (after layout)
- **Parallel Group**: Wave 2 (with Task 5)
- **Blocks**: None
- **Blocked By**: Tasks 2, 4

**References**:
- `src/components/ui/card.tsx` - Card component
- `src/data/personnel.json` - Personnel data (Task 2)
- `src/data/contracts.json` - Contract data (Task 2)
- `src/types/index.ts:DashboardStats` (lines 609-616) - Stats interface

**Acceptance Criteria**:
```bash
bun run build
# Assert: Exit code 0

# Playwright verification:
# 1. Login and navigate to http://localhost:5173/tccb/dashboard
# 2. Assert: 4 cards visible in grid
# 3. Assert: First card shows "Tổng số nhân sự" with number
# 4. Assert: Second card shows "Đang hoạt động" with number
# 5. Assert: Third card shows "HĐ sắp hết hạn" with number
# 6. Assert: Fourth card shows "Yêu cầu chờ duyệt" with number
# 7. Screenshot: .sisyphus/evidence/dashboard.png
```

**Commit**: YES
- Message: `feat(dashboard): add TCCB dashboard with 4 KPI cards`
- Files: `src/pages/tccb/DashboardPage.tsx`

---

### Task 7: Build Personnel List Page

**What to do**:
- Create `src/pages/tccb/PersonnelListPage.tsx`
- Data table using Tanstack Table + shadcn table
- Columns: Mã CB, Họ tên, Đơn vị, Chức vụ, Trạng thái, Hành động
- Search input for filtering by name/code
- Filter dropdown for status (Active/Inactive/All)
- Filter dropdown for unit
- "Thêm nhân sự" button linking to wizard
- Row click navigates to detail page
- Pagination (10 items per page)

**Must NOT do**:
- No column visibility toggle
- No column reordering
- No export buttons
- No bulk selection
- No inline editing

**Recommended Agent Profile**:
- **Category**: `visual-engineering`
- **Skills**: [`frontend-design`]
  - `frontend-design`: Data table with filters

**Parallelization**:
- **Can Run In Parallel**: YES (after layout)
- **Parallel Group**: Wave 3 (start of wave)
- **Blocks**: Tasks 8, 9
- **Blocked By**: Tasks 2, 4

**References**:
- `src/components/ui/table.tsx` - Table component
- `src/components/ui/input.tsx` - Search input
- `src/components/ui/select.tsx` - Filter dropdowns
- `src/components/ui/button.tsx` - Add button
- `src/components/ui/badge.tsx` - Status badges
- `src/data/personnel.json` - Personnel data (Task 2)
- `src/types/index.ts:Personnel` (lines 350-404)
- Official shadcn data-table docs pattern

**Acceptance Criteria**:
```bash
bun run build
# Assert: Exit code 0

# Playwright verification:
# 1. Navigate to http://localhost:5173/tccb/personnel (logged in)
# 2. Assert: Table visible with 10+ rows
# 3. Assert: Column headers: "Mã CB", "Họ tên", "Đơn vị", "Chức vụ", "Trạng thái"
# 4. Fill: search input with "Nguyen"
# 5. Assert: Table filters to show matching rows
# 6. Click: "Thêm nhân sự" button
# 7. Assert: URL changes to /tccb/personnel/new
# 8. Screenshot: .sisyphus/evidence/personnel-list.png
```

**Commit**: YES
- Message: `feat(personnel): add personnel list with search and filters`
- Files: `src/pages/tccb/PersonnelListPage.tsx`, `src/components/tables/PersonnelTable.tsx`

---

### Task 8: Build Personnel Create Wizard

**What to do**:
- Create `src/pages/tccb/PersonnelCreatePage.tsx`
- 8-step wizard with progress indicator
- Each step as a separate form section:
  - Step 1: Thông tin cơ bản (fullName, dateOfBirth, gender, idCardNumber, placeOfBirth, hometown)
  - Step 2: Địa chỉ & Liên hệ (permanentAddress, temporaryAddress, phoneNumber, personalEmail, workEmail)
  - Step 3: Gia đình (maritalStatus, spouse, children[], dependents[])
  - Step 4: Học vấn & Chứng chỉ (education[], certificates[], academicTitle, degree)
  - Step 5: Đơn vị & Chức vụ (unitAssignments[], select unit from tree)
  - Step 6: Hợp đồng (contractNumber, type, signDate, effectiveDate, expiryDate)
  - Step 7: Lương & Phụ cấp (salaryScale selection, allowances checkboxes)
  - Step 8: Xem lại & Lưu (review summary, submit button)
- Navigation: Previous/Next buttons
- Validation per step with zod
- On final submit: add to mock data (in-memory), redirect to list

**Must NOT do**:
- No save as draft functionality
- No step skip (must be sequential)
- No auto-save
- No file upload fields
- No confirmation modal before submit

**Recommended Agent Profile**:
- **Category**: `visual-engineering`
- **Skills**: [`frontend-design`, `frontend-ui-ux`]
  - `frontend-design`: Complex multi-step form
  - `frontend-ui-ux`: Wizard UX patterns

**Parallelization**:
- **Can Run In Parallel**: YES
- **Parallel Group**: Wave 3 (with Tasks 9, 10, 11, 12)
- **Blocks**: None
- **Blocked By**: Task 7

**References**:
- `src/components/ui/form.tsx` - Form component
- `src/components/ui/card.tsx` - Card for wizard container
- `src/components/ui/tabs.tsx` - For step indicator styling reference
- `src/components/ui/select.tsx` - Dropdowns
- `src/components/ui/input.tsx` - Text inputs
- `src/components/ui/calendar.tsx` - Date picker
- `src/types/index.ts:Personnel` (lines 350-404) - All fields
- `src/types/index.ts:Address` (lines 168-174) - Address sub-interface
- `src/types/index.ts:Education` (lines 217-225) - Education sub-interface
- `src/data/organizations.json` - For unit selection (Task 2)

**Acceptance Criteria**:
```bash
bun run build
# Assert: Exit code 0

# Playwright verification:
# 1. Navigate to http://localhost:5173/tccb/personnel/new
# 2. Assert: Step indicator shows "Bước 1/8"
# 3. Assert: Form fields for step 1 visible
# 4. Fill: fullName = "Nguyễn Văn Test"
# 5. Fill: dateOfBirth = "1990-01-15"
# 6. Select: gender = "Nam"
# 7. Click: "Tiếp theo" button
# 8. Assert: Step indicator shows "Bước 2/8"
# 9. Navigate through all 8 steps (fill required fields)
# 10. On step 8: Assert: Review summary visible
# 11. Click: "Lưu hồ sơ" button
# 12. Assert: URL changes to /tccb/personnel
# 13. Assert: Toast/message "Đã lưu hồ sơ thành công"
# 14. Screenshot: .sisyphus/evidence/wizard-complete.png
```

**Commit**: YES
- Message: `feat(personnel): add 8-step personnel create wizard`
- Files: `src/pages/tccb/PersonnelCreatePage.tsx`, `src/components/forms/PersonnelWizard.tsx`, `src/components/forms/wizard-steps/*.tsx`

---

### Task 9: Build Personnel Detail Page

**What to do**:
- Create `src/pages/tccb/PersonnelDetailPage.tsx`
- Persistent header: photo placeholder, name, code, status badge, unit
- 7 tabs using shadcn Tabs:
  - Tab 1: Thông tin cá nhân (personal info, address, contact)
  - Tab 2: Học vấn & Chứng chỉ (education list, certificates list)
  - Tab 3: Hợp đồng lao động (contract history table)
  - Tab 4: Lương & Phụ cấp (current salary, allowances list)
  - Tab 5: Khen thưởng & Kỷ luật (rewards/discipline tables)
  - Tab 6: Đào tạo (training participation history)
  - Tab 7: Đảng viên & Đoàn viên (party/union info)
- View-only mode (no edit functionality)
- Back button to list

**Must NOT do**:
- No edit buttons
- No status change actions
- No delete action
- No print button
- No photo upload

**Recommended Agent Profile**:
- **Category**: `visual-engineering`
- **Skills**: [`frontend-design`, `frontend-ui-ux`]
  - `frontend-design`: Complex tabbed layout
  - `frontend-ui-ux`: Profile page patterns

**Parallelization**:
- **Can Run In Parallel**: YES
- **Parallel Group**: Wave 3 (with Tasks 8, 10, 11, 12)
- **Blocks**: None
- **Blocked By**: Task 7

**References**:
- `src/components/ui/tabs.tsx` - Tabs component
- `src/components/ui/card.tsx` - Card for sections
- `src/components/ui/badge.tsx` - Status badge
- `src/components/ui/avatar.tsx` - Photo placeholder
- `src/components/ui/table.tsx` - For history tables
- `src/types/index.ts:Personnel` (lines 350-404) - Full interface
- `src/data/personnel.json` - Personnel data (Task 2)

**Acceptance Criteria**:
```bash
bun run build
# Assert: Exit code 0

# Playwright verification:
# 1. Navigate to http://localhost:5173/tccb/personnel/1 (logged in)
# 2. Assert: Header shows personnel name and code
# 3. Assert: 7 tab buttons visible
# 4. Assert: Default tab "Thông tin cá nhân" content visible
# 5. Click: "Học vấn & Chứng chỉ" tab
# 6. Assert: Education list visible
# 7. Click: "Hợp đồng lao động" tab
# 8. Assert: Contract history table visible
# 9. Screenshot: .sisyphus/evidence/personnel-detail.png
```

**Commit**: YES
- Message: `feat(personnel): add 7-tab personnel detail view`
- Files: `src/pages/tccb/PersonnelDetailPage.tsx`, `src/components/personnel/PersonnelHeader.tsx`, `src/components/personnel/tabs/*.tsx`

---

### Task 10: Build Organization Tree Page

**What to do**:
- Create `src/pages/tccb/OrganizationPage.tsx`
- Interactive tree view showing org hierarchy
- Expand/collapse functionality per node
- Show unit type icon, name, member count
- Click on unit name navigates to unit detail
- Root node: "Trường Đại học Thủy lợi"
- Create `src/components/organization/OrgTree.tsx` recursive component

**Must NOT do**:
- No drag-and-drop reordering
- No inline rename
- No context menu
- No add unit button in tree
- No search within tree

**Recommended Agent Profile**:
- **Category**: `visual-engineering`
- **Skills**: [`frontend-design`]
  - `frontend-design`: Recursive tree component

**Parallelization**:
- **Can Run In Parallel**: YES
- **Parallel Group**: Wave 3 (with Tasks 8, 9, 11, 12)
- **Blocks**: None
- **Blocked By**: Tasks 2, 4

**References**:
- `src/components/ui/collapsible.tsx` - For expand/collapse
- `src/types/index.ts:OrganizationUnit` (lines 499-518) - Org unit with children[]
- `src/data/organizations.json` - Org data (Task 2)

**Acceptance Criteria**:
```bash
bun run build
# Assert: Exit code 0

# Playwright verification:
# 1. Navigate to http://localhost:5173/tccb/organization (logged in)
# 2. Assert: Tree root "Trường Đại học Thủy lợi" visible
# 3. Assert: Child nodes visible or collapse indicator present
# 4. Click: Expand icon on a parent node
# 5. Assert: Child units become visible
# 6. Click: Unit name link
# 7. Assert: URL changes to /tccb/organization/{id}
# 8. Screenshot: .sisyphus/evidence/org-tree.png
```

**Commit**: YES
- Message: `feat(organization): add interactive organization tree view`
- Files: `src/pages/tccb/OrganizationPage.tsx`, `src/components/organization/OrgTree.tsx`, `src/components/organization/OrgTreeNode.tsx`

---

### Task 11: Build Unit Detail Page

**What to do**:
- Create `src/pages/tccb/UnitDetailPage.tsx`
- Show unit info: name, code, type, address, contact
- Show unit history (establishment, mergers if any)
- Show list of positions in unit
- Show list of members assigned to unit
- Back button to tree

**Must NOT do**:
- No edit functionality
- No add member button
- No position management

**Recommended Agent Profile**:
- **Category**: `visual-engineering`
- **Skills**: [`frontend-design`]
  - `frontend-design`: Detail page layout

**Parallelization**:
- **Can Run In Parallel**: YES
- **Parallel Group**: Wave 3 (with Tasks 8, 9, 10, 11, 12)
- **Blocks**: None
- **Blocked By**: Tasks 2, 4, 10

**References**:
- `src/components/ui/card.tsx` - Card for sections
- `src/components/ui/table.tsx` - For members table
- `src/types/index.ts:OrganizationUnit` (lines 499-518)
- `src/data/organizations.json` - Org data (Task 2)

**Acceptance Criteria**:
```bash
bun run build
# Assert: Exit code 0

# Playwright verification:
# 1. Navigate to http://localhost:5173/tccb/organization/1
# 2. Assert: Unit name and code visible
# 3. Assert: Unit type badge visible
# 4. Assert: Members table visible (if any)
# 5. Click: Back button
# 6. Assert: URL changes to /tccb/organization
# 7. Screenshot: .sisyphus/evidence/unit-detail.png
```

**Commit**: YES
- Message: `feat(organization): add unit detail page`
- Files: `src/pages/tccb/UnitDetailPage.tsx`

---

### Task 12: Build Contract List Page

**What to do**:
- Create `src/pages/tccb/ContractListPage.tsx`
- Read-only data table of all contracts
- Columns: Số HĐ, Nhân sự, Loại HĐ, Ngày ký, Ngày hiệu lực, Ngày hết hạn, Trạng thái
- Filter by status, contract type
- Search by contract number or personnel name
- Click row navigates to personnel detail

**Must NOT do**:
- No create contract button
- No edit/delete actions
- No export

**Recommended Agent Profile**:
- **Category**: `quick`
- **Skills**: [`frontend-design`]
  - `frontend-design`: Simple data table

**Parallelization**:
- **Can Run In Parallel**: YES
- **Parallel Group**: Wave 3 (with Tasks 8, 9, 10, 11)
- **Blocks**: None
- **Blocked By**: Tasks 2, 4

**References**:
- `src/components/ui/table.tsx` - Table component
- `src/types/index.ts:Contract` (lines 267-289)
- `src/data/contracts.json` - Contract data (Task 2)
- `src/pages/tccb/PersonnelListPage.tsx` - Pattern reference (Task 7)

**Acceptance Criteria**:
```bash
bun run build
# Assert: Exit code 0

# Playwright verification:
# 1. Navigate to http://localhost:5173/tccb/contracts (logged in)
# 2. Assert: Table visible with contract data
# 3. Assert: Columns include contract number, personnel name, dates
# 4. Select: Status filter = "Sắp hết hạn"
# 5. Assert: Table filters appropriately
# 6. Screenshot: .sisyphus/evidence/contract-list.png
```

**Commit**: YES
- Message: `feat(contracts): add read-only contract list page`
- Files: `src/pages/tccb/ContractListPage.tsx`

---

### Task 13: Build Training List Page

**What to do**:
- Create `src/pages/tccb/TrainingListPage.tsx`
- Read-only data table of training courses
- Columns: Tên khóa, Loại, Thời gian, Địa điểm, Số học viên, Trạng thái
- Filter by training type, status
- Search by course name

**Must NOT do**:
- No create course button
- No enrollment actions
- No export

**Recommended Agent Profile**:
- **Category**: `quick`
- **Skills**: [`frontend-design`]
  - `frontend-design`: Simple data table

**Parallelization**:
- **Can Run In Parallel**: YES
- **Parallel Group**: Wave 3 (with Tasks 8, 9, 10, 11, 12)
- **Blocks**: None
- **Blocked By**: Tasks 2, 4

**References**:
- `src/components/ui/table.tsx` - Table component
- `src/types/index.ts:TrainingCourse` (lines 421-441)
- `src/data/training.json` - Training data (Task 2)
- `src/pages/tccb/ContractListPage.tsx` - Pattern reference (Task 12)

**Acceptance Criteria**:
```bash
bun run build
# Assert: Exit code 0

# Playwright verification:
# 1. Navigate to http://localhost:5173/tccb/training (logged in)
# 2. Assert: Table visible with training course data
# 3. Assert: Columns include course name, type, dates
# 4. Screenshot: .sisyphus/evidence/training-list.png
```

**Commit**: YES
- Message: `feat(training): add read-only training list page`
- Files: `src/pages/tccb/TrainingListPage.tsx`

---

### Task 14: Integration Testing and Polish

**What to do**:
- Run `bun run build` and fix any TypeScript errors
- Test full user flow: Login → Dashboard → Personnel → Create → Detail → Org
- Fix any navigation issues
- Ensure consistent Vietnamese labeling
- Add loading states at page level
- Add empty states for lists

**Must NOT do**:
- No new features
- No refactoring
- No test file creation

**Recommended Agent Profile**:
- **Category**: `visual-engineering`
- **Skills**: [`frontend-design`, `playwright`]
  - `frontend-design`: UI polish
  - `playwright`: Full flow testing

**Parallelization**:
- **Can Run In Parallel**: NO
- **Parallel Group**: Wave 4 (final)
- **Blocks**: None
- **Blocked By**: All previous tasks

**References**:
- All created pages and components
- `.sisyphus/evidence/` - Screenshots from previous tasks

**Acceptance Criteria**:
```bash
bun run build
# Assert: Exit code 0, no errors, no warnings

# Playwright full flow verification:
# 1. Navigate to http://localhost:5173/
# 2. Assert: Redirects to /auth/login
# 3. Login with admin/Admin123
# 4. Assert: Dashboard visible with 4 KPIs
# 5. Navigate to Personnel List
# 6. Click "Thêm nhân sự"
# 7. Complete wizard (all 8 steps)
# 8. Assert: New personnel in list
# 9. Click on personnel row
# 10. Assert: 7-tab detail view
# 11. Navigate to Organization
# 12. Assert: Tree visible
# 13. Navigate to Contracts
# 14. Assert: Table visible
# 15. Navigate to Training
# 16. Assert: Table visible
# 17. Screenshot: .sisyphus/evidence/full-flow-complete.png
```

**Commit**: YES
- Message: `chore: integration testing and UI polish`
- Files: Various fixes

---

## Commit Strategy

| After Task | Message | Key Files |
|------------|---------|-----------|
| 1 | `feat(router): setup react-router with protected routes` | router.tsx, ProtectedRoute.tsx |
| 2 | `feat(data): add mock data files for HRMS entities` | data/*.json |
| 3 | `feat(auth): add zustand auth store with login/logout` | stores/auth.ts |
| 4 | `feat(layout): add app layout with Vietnamese sidebar navigation` | layout/*.tsx |
| 5 | `feat(auth): add login page with form validation` | LoginPage.tsx |
| 6 | `feat(dashboard): add TCCB dashboard with 4 KPI cards` | DashboardPage.tsx |
| 7 | `feat(personnel): add personnel list with search and filters` | PersonnelListPage.tsx |
| 8 | `feat(personnel): add 8-step personnel create wizard` | PersonnelCreatePage.tsx, wizard-steps/*.tsx |
| 9 | `feat(personnel): add 7-tab personnel detail view` | PersonnelDetailPage.tsx, tabs/*.tsx |
| 10 | `feat(organization): add interactive organization tree view` | OrganizationPage.tsx, OrgTree.tsx |
| 11 | `feat(organization): add unit detail page` | UnitDetailPage.tsx |
| 12 | `feat(contracts): add read-only contract list page` | ContractListPage.tsx |
| 13 | `feat(training): add read-only training list page` | TrainingListPage.tsx |
| 14 | `chore: integration testing and UI polish` | Various |

---

## Success Criteria

### Verification Commands
```bash
# Build passes
bun run build
# Expected: Exit code 0, no errors

# Dev server runs
bun run dev &
curl -s http://localhost:5173/auth/login | grep -q "Đăng nhập"
# Expected: Contains Vietnamese text
```

### Final Checklist
- [x] All routes accessible and functional
- [x] Login/logout flow works
- [x] Dashboard shows 4 KPIs with real counts from mock data
- [x] Personnel list displays 15-20 records
- [x] Personnel wizard completes all 8 steps
- [x] Personnel detail shows all 7 tabs
- [x] Organization tree renders hierarchy correctly
- [x] Contract and training lists display data
- [x] No TypeScript errors
- [x] No console errors during navigation
- [x] All text in Vietnamese

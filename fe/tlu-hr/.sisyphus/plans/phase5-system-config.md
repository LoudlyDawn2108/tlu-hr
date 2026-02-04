# Phase 5: System Configuration

## TL;DR

> **Quick Summary**: Implement System Administrator features (needs 1-30 from needs_list.md) including session timeout, user management, configuration management for salary scales, allowances, contracts, evaluation types, training types, and business catalogs.
> 
> **Deliverables**:
> - Session timeout (30 min auto-logout)
> - User Management UI (CRUD, lock/unlock, password reset)
> - 6 Configuration pages: Salary, Allowance, Contract, Evaluation, Training Types, Business Catalogs
> - Admin navigation menu in sidebar
> - Pre-filled mock JSON data for TLU
> 
> **Estimated Effort**: Large
> **Parallel Execution**: YES - 4 waves
> **Critical Path**: Task 1 → Task 2 → Tasks 3-7, 9 (parallel) → Task 8

---

## Context

### Original Request
Continue TLU HRMS development with Phase 5: System Configuration, covering needs 1-30 from the requirements document.

### Interview Summary
**Key Decisions**:
- Access: SYSTEM_ADMIN role only
- Persistence: In-memory (same as existing pattern, resets on reload)
- User Management: Full CRUD with password reset
- Common Catalogs: EXCLUDED for general data (ethnicity, religion, address = text input)
- Business Catalogs: INCLUDED (trình độ học vấn, chức danh khoa học, ngạch viên chức, chức vụ, danh hiệu, loại đơn vị)
- Pre-fill: Business configs with Thuy Loi University sample data

**Research Findings**:
- `types/index.ts:529-611`: Config types exist (BaseSalaryConfig, SalaryScaleConfig, etc.) but no UI
- `AppLayout.tsx`: No "System Configuration" menu - needs new section
- `contract-helpers.ts`: Hardcoded `DEFAULT_MAX_EXTENSIONS = 2` - should use config
- `users.json`: Only 2 users exist, no management UI

### Metis Review
**Identified Gaps (addressed)**:
- Persistence behavior: Confirmed in-memory only
- Password reset: Confirmed include
- Session timeout behavior: Defaults applied (mouse/keyboard activity, 1-min warning)
- Delete protection: Soft-disable only (cannot delete active items)
- Access control: Route guard + menu visibility

---

## Work Objectives

### Core Objective
Implement SYSTEM_ADMIN configuration features allowing management of users and system-wide settings for salary, allowances, contracts, evaluations, and training types.

### Concrete Deliverables
- `/admin/users` - User management page
- `/admin/config/salary` - Salary configuration page  
- `/admin/config/allowances` - Allowance types page
- `/admin/config/contracts` - Contract rules page
- `/admin/config/evaluations` - Reward/Discipline types page
- `/admin/config/training-types` - Training types page
- `/admin/config/catalogs` - Business catalogs page (6 category types)
- Session timeout with warning modal
- Admin navigation section in sidebar
- 6 new JSON data files with TLU sample data

### Definition of Done
- [ ] `bun run build` exits with code 0
- [ ] All `/admin/**` routes protected (redirect non-admin to `/tccb/dashboard`)
- [ ] Session timeout triggers after 30 min inactivity
- [ ] All 6 config pages support CRUD operations
- [ ] Business catalogs page supports 6 category types
- [ ] User management supports create, edit, lock/unlock, password reset

### Must Have
- SYSTEM_ADMIN role check on all admin routes
- Admin menu hidden for non-admin users
- Password validation (min 8 chars, uppercase, lowercase, number)
- Active/inactive toggle for all config items
- Demo warning banner on create/edit pages

### Must NOT Have (Guardrails)
- NO backend APIs or database connections
- NO localStorage persistence (in-memory only)
- NO general catalogs UI (ethnicity, religion, provinces = text input)
- NO RBAC/permissions beyond SYSTEM_ADMIN check
- NO import/export features
- NO audit log display (future phase)
- NO email verification or MFA
- NO province/district/ward pickers

---

## Verification Strategy

> **UNIVERSAL RULE: ZERO HUMAN INTERVENTION**
>
> ALL tasks must be verifiable by agent-executed commands or tools.

### Test Decision
- **Infrastructure exists**: NO (no test framework)
- **Automated tests**: None (QA via Playwright)
- **Framework**: N/A

### Agent-Executed QA Scenarios (MANDATORY — ALL tasks)

Verification Tool by Deliverable Type:

| Type | Tool | How Agent Verifies |
|------|------|-------------------|
| **Build** | Bash | `bun run build` → exit 0 |
| **Frontend/UI** | Playwright | Navigate, interact, assert DOM, screenshot |
| **Route Protection** | Playwright | Attempt access as non-admin, verify redirect |

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately):
└── Task 1: Admin Layout Infrastructure (route guard, menu, data files)

Wave 2 (After Wave 1):
└── Task 2: Session Timeout + User Management

Wave 3 (After Wave 2) - PARALLEL:
├── Task 3: Salary Configuration
├── Task 4: Allowance Configuration  
├── Task 5: Contract Configuration
├── Task 6: Evaluation Configuration
├── Task 7: Training Types Configuration
└── Task 9: Business Catalogs Configuration

Wave 4 (After Wave 3):
└── Task 8: Integration + Contract Helper Refactor
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 1 | None | 2, 3, 4, 5, 6, 7, 9 | None |
| 2 | 1 | 8 | None |
| 3 | 1 | 8 | 4, 5, 6, 7, 9 |
| 4 | 1 | 8 | 3, 5, 6, 7, 9 |
| 5 | 1 | 8 | 3, 4, 6, 7, 9 |
| 6 | 1 | 8 | 3, 4, 5, 7, 9 |
| 7 | 1 | 8 | 3, 4, 5, 6, 9 |
| 9 | 1 | 8 | 3, 4, 5, 6, 7 |
| 8 | 2, 3, 4, 5, 6, 7, 9 | None | None |

### Agent Dispatch Summary

| Wave | Tasks | Recommended Agents |
|------|-------|-------------------|
| 1 | 1 | delegate_task(category="visual-engineering", load_skills=["frontend-ui-ux"]) |
| 2 | 2 | delegate_task(category="visual-engineering", load_skills=["frontend-ui-ux"]) |
| 3 | 3, 4, 5, 6, 7, 9 | 6 parallel agents with category="quick" |
| 4 | 8 | delegate_task(category="unspecified-low", load_skills=[]) |

---

## TODOs

- [ ] 1. Admin Layout Infrastructure

  **What to do**:
  1. Create admin route guard component (`src/components/AdminRoute.tsx`)
     - Check if user.role === 'system_admin'
     - Redirect to `/tccb/dashboard` if not admin
  2. Add "Quản trị hệ thống" section to AppLayout sidebar
     - Only visible when user.role === 'system_admin'
     - Menu items: Người dùng, Cấu hình lương, Phụ cấp, Hợp đồng, Đánh giá, Loại đào tạo, Danh mục nghiệp vụ
  3. Create admin route structure in `router.tsx`
  4. Create mock data files with TLU sample data:
     - `src/data/config/base-salaries.json`
     - `src/data/config/salary-scales.json`
     - `src/data/config/allowance-types.json`
     - `src/data/config/contract-types.json`
     - `src/data/config/evaluation-types.json`
     - `src/data/config/training-types.json`
     - `src/data/config/business-catalogs.json`
     - `src/data/config/training-types.json`

  **Must NOT do**:
  - Add localStorage or any persistence
  - Create RBAC/permissions system beyond simple role check
  - Add admin features for non-SYSTEM_ADMIN roles

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI layout work with navigation and routing
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Sidebar menu design and layout patterns

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 1 (alone)
  - **Blocks**: Tasks 2, 3, 4, 5, 6, 7
  - **Blocked By**: None

  **References**:
  - `src/components/ProtectedRoute.tsx` - Existing route guard pattern (authentication check)
  - `src/components/layout/AppLayout.tsx` - Sidebar navigation structure to extend
  - `src/stores/auth.ts` - Auth store with user.role available
  - `src/types/index.ts:10-15` - UserRole enum with SYSTEM_ADMIN
  - `src/router.tsx` - Route definitions pattern
  - `src/data/users.json` - User data structure pattern

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Admin menu visible for SYSTEM_ADMIN
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running on localhost:5173
    Steps:
      1. Navigate to: http://localhost:5173/auth/login
      2. Fill: input[name="username"] → "admin"
      3. Fill: input[name="password"] → "Admin123"
      4. Click: button[type="submit"]
      5. Wait for: navigation to /tccb/dashboard (timeout: 5s)
      6. Assert: Sidebar contains text "Quản trị hệ thống"
      7. Assert: Link to /admin/users exists
      8. Screenshot: .sisyphus/evidence/task-1-admin-menu-visible.png
    Expected Result: Admin menu section visible with all config links
    Evidence: .sisyphus/evidence/task-1-admin-menu-visible.png

  Scenario: Admin menu hidden for TCCB officer
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to: http://localhost:5173/auth/login
      2. Fill: input[name="username"] → "tccb"
      3. Fill: input[name="password"] → "Tccb1234"
      4. Click: button[type="submit"]
      5. Wait for: navigation to /tccb/dashboard (timeout: 5s)
      6. Assert: Sidebar does NOT contain text "Quản trị hệ thống"
      7. Screenshot: .sisyphus/evidence/task-1-admin-menu-hidden.png
    Expected Result: Admin menu section not visible
    Evidence: .sisyphus/evidence/task-1-admin-menu-hidden.png

  Scenario: Direct admin route access blocked for non-admin
    Tool: Playwright (playwright skill)
    Preconditions: Logged in as tccb user
    Steps:
      1. Navigate directly to: http://localhost:5173/admin/users
      2. Wait for: navigation (timeout: 3s)
      3. Assert: URL is NOT /admin/users
      4. Assert: URL is /tccb/dashboard OR /403 OR /
      5. Screenshot: .sisyphus/evidence/task-1-route-blocked.png
    Expected Result: Redirected away from admin route
    Evidence: .sisyphus/evidence/task-1-route-blocked.png
  ```

  **Evidence to Capture:**
  - [ ] Screenshots in .sisyphus/evidence/task-1-*.png
  - [ ] All 6 JSON config files created with sample data

  **Commit**: YES
  - Message: `feat(admin): add admin layout infrastructure with route guard and navigation`
  - Files: `src/components/AdminRoute.tsx`, `src/components/layout/AppLayout.tsx`, `src/router.tsx`, `src/data/config/*.json`
  - Pre-commit: `bun run build`

---

- [ ] 2. Session Timeout + User Management

  **What to do**:
  1. Implement session timeout hook (`src/hooks/useSessionTimeout.ts`)
     - Track last activity (mouse move, key press, click, scroll)
     - Show warning modal at 29 minutes
     - Auto-logout at 30 minutes
     - Reset timer on activity
  2. Add SessionTimeoutProvider to App root
  3. Create User Management pages:
     - `src/pages/admin/UserListPage.tsx` - DataTable with search, filter by role/status
     - `src/pages/admin/UserCreatePage.tsx` - Form: username, password, fullName, email, role
     - `src/pages/admin/UserEditPage.tsx` - Edit form + lock/unlock + reset password
  4. Password validation: min 8 chars, uppercase, lowercase, number
  5. Role assignment dropdown: SYSTEM_ADMIN, TCCB_OFFICER, TCKT_OFFICER, EMPLOYEE

  **Must NOT do**:
  - Implement email verification or password recovery
  - Add multi-tab session sync (each tab tracks independently)
  - Store password in plain text in state (only in mock JSON for demo)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Multiple UI pages with forms and tables
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Form design, table layout, modal patterns

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2 (alone)
  - **Blocks**: Task 8
  - **Blocked By**: Task 1

  **References**:
  - `src/stores/auth.ts` - Auth store, logout function to call on timeout
  - `src/data/users.json` - User data structure
  - `src/types/index.ts:140-151` - User interface
  - `src/types/index.ts:10-21` - UserRole, AccountStatus enums
  - `src/pages/tccb/PersonnelListPage.tsx` - DataTable pattern with search/filter
  - `src/pages/tccb/PersonnelCreatePage.tsx` - Create form pattern with validation
  - `src/lib/schemas.ts` - Zod validation pattern (password rules exist here)

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Session timeout warning appears at 29 minutes
    Tool: Playwright (playwright skill)
    Preconditions: Logged in as admin, time mocking available
    Steps:
      1. Navigate to: http://localhost:5173/tccb/dashboard
      2. Mock time: advance 29 minutes (use page.clock if available, or fast-forward approach)
      3. Wait for: dialog or modal with "phiên làm việc" or "session" text (timeout: 10s)
      4. Assert: Warning modal visible with countdown
      5. Screenshot: .sisyphus/evidence/task-2-timeout-warning.png
    Expected Result: Warning modal appears before logout
    Evidence: .sisyphus/evidence/task-2-timeout-warning.png

  Scenario: Create new user successfully
    Tool: Playwright (playwright skill)
    Preconditions: Logged in as admin
    Steps:
      1. Navigate to: http://localhost:5173/admin/users
      2. Click: button containing "Thêm" or "Tạo mới"
      3. Wait for: /admin/users/new route
      4. Fill: input[name="username"] → "newuser"
      5. Fill: input[name="password"] → "NewUser123"
      6. Fill: input[name="fullName"] → "Người dùng mới"
      7. Fill: input[name="email"] → "newuser@tlu.edu.vn"
      8. Select: select[name="role"] → "tccb_officer"
      9. Click: button[type="submit"]
      10. Wait for: navigation to /admin/users (timeout: 5s)
      11. Assert: Table contains "newuser"
      12. Screenshot: .sisyphus/evidence/task-2-user-created.png
    Expected Result: New user appears in list
    Evidence: .sisyphus/evidence/task-2-user-created.png

  Scenario: Password validation rejects weak password
    Tool: Playwright (playwright skill)
    Preconditions: On user create page
    Steps:
      1. Navigate to: http://localhost:5173/admin/users/new
      2. Fill: input[name="username"] → "testuser"
      3. Fill: input[name="password"] → "weak"
      4. Fill: input[name="fullName"] → "Test"
      5. Fill: input[name="email"] → "test@tlu.edu.vn"
      6. Click: button[type="submit"]
      7. Assert: Error message visible containing "8" or "ký tự"
      8. Assert: URL still /admin/users/new (no navigation)
      9. Screenshot: .sisyphus/evidence/task-2-password-validation.png
    Expected Result: Form blocked with password error
    Evidence: .sisyphus/evidence/task-2-password-validation.png

  Scenario: Lock user account
    Tool: Playwright (playwright skill)
    Preconditions: At least 2 users exist
    Steps:
      1. Navigate to: http://localhost:5173/admin/users
      2. Find row with "tccb" username
      3. Click: dropdown menu or action button for that row
      4. Click: "Khóa" or "Lock" option
      5. Wait for: status update (timeout: 3s)
      6. Assert: Row shows "locked" or "Đã khóa" status
      7. Screenshot: .sisyphus/evidence/task-2-user-locked.png
    Expected Result: User status changed to locked
    Evidence: .sisyphus/evidence/task-2-user-locked.png

  Scenario: Reset password for user
    Tool: Playwright (playwright skill)
    Preconditions: Logged in as admin, on user edit page
    Steps:
      1. Navigate to: http://localhost:5173/admin/users
      2. Click: Edit action for any user
      3. Wait for: edit page load
      4. Click: button containing "Reset" or "Đặt lại mật khẩu"
      5. Fill: new password input → "NewPass123"
      6. Click: confirm button
      7. Assert: Success toast or message visible
      8. Screenshot: .sisyphus/evidence/task-2-password-reset.png
    Expected Result: Password reset confirmed
    Evidence: .sisyphus/evidence/task-2-password-reset.png
  ```

  **Evidence to Capture:**
  - [ ] Screenshots in .sisyphus/evidence/task-2-*.png

  **Commit**: YES
  - Message: `feat(admin): add session timeout and user management`
  - Files: `src/hooks/useSessionTimeout.ts`, `src/pages/admin/User*.tsx`, `src/components/SessionTimeoutProvider.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 3. Salary Configuration

  **What to do**:
  1. Create `src/pages/admin/config/SalaryConfigPage.tsx`
     - Two sections: Base Salary + Salary Scales
     - Base Salary: Table with amount, effectiveDate, isActive
     - Salary Scales: Accordion for each type (Lecturer, Senior Lecturer, Principal Lecturer, Specialist)
       - Each scale shows grades table with grade number and coefficient
  2. Add/Edit dialogs for base salary and salary scale grades
  3. Change reason input when editing (Need 16)
  4. Pre-fill with TLU sample data:
     - Current base salary: 1,800,000 VND (2023-07-01)
     - 4 salary scales with standard government coefficients

  **Must NOT do**:
  - Calculate actual salary amounts (just store coefficients)
  - Add overlapping date conflict resolution (latest wins by default)
  - Store change history UI (backend handles, just require reason input)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single config page following established patterns
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Accordion and table layout

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 4, 5, 6, 7)
  - **Blocks**: Task 8
  - **Blocked By**: Task 1

  **References**:
  - `src/types/index.ts:536-556` - BaseSalaryConfig, GradeConfig, SalaryScaleConfig
  - `src/data/config/base-salaries.json` - Created in Task 1
  - `src/data/config/salary-scales.json` - Created in Task 1
  - `src/pages/tccb/TrainingDetailPage.tsx` - Detail page with sections pattern
  - `src/components/ui/accordion.tsx` - Accordion component for scale sections

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: View salary configuration page
    Tool: Playwright (playwright skill)
    Steps:
      1. Login as admin
      2. Navigate to: http://localhost:5173/admin/config/salary
      3. Assert: Page title contains "Cấu hình lương" or "Salary"
      4. Assert: Base salary section visible with table
      5. Assert: Salary scales section visible with 4 scale types
      6. Screenshot: .sisyphus/evidence/task-3-salary-page.png
    Expected Result: Salary config page loads with both sections
    Evidence: .sisyphus/evidence/task-3-salary-page.png

  Scenario: Add new base salary
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to: /admin/config/salary
      2. Click: Add button in base salary section
      3. Fill: amount input → "2000000"
      4. Fill: effectiveDate input → "2025-01-01"
      5. Click: Save/Submit button
      6. Assert: New row appears in table with 2,000,000
      7. Screenshot: .sisyphus/evidence/task-3-base-salary-added.png
    Expected Result: New base salary in list
    Evidence: .sisyphus/evidence/task-3-base-salary-added.png

  Scenario: Edit salary scale grade with reason
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to: /admin/config/salary
      2. Expand: "Giảng viên" or "Lecturer" accordion
      3. Click: Edit on first grade row
      4. Change: coefficient input to new value
      5. Fill: reason input → "Điều chỉnh theo quy định mới"
      6. Click: Save button
      7. Assert: Updated coefficient shown
      8. Screenshot: .sisyphus/evidence/task-3-grade-edited.png
    Expected Result: Grade updated with reason required
    Evidence: .sisyphus/evidence/task-3-grade-edited.png
  ```

  **Commit**: YES (groups with 4, 5, 6, 7)
  - Message: `feat(admin): add salary configuration page`
  - Files: `src/pages/admin/config/SalaryConfigPage.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 4. Allowance Configuration

  **What to do**:
  1. Create `src/pages/admin/config/AllowanceConfigPage.tsx`
     - DataTable with columns: code (auto), name, type, calculationType, formula, isActive, order
     - Add/Edit dialog with all fields
     - Auto-generate code: PHC-001, PHC-002, etc. (Phụ cấp)
  2. Pre-fill with 6 standard allowance types:
     - Phụ cấp chức vụ (position)
     - Phụ cấp thâm niên (seniority)
     - Phụ cấp ưu đãi ngành (industry)
     - Phụ cấp trách nhiệm (responsibility)
     - Phụ cấp độc hại (hazardous)
     - Phụ cấp khu vực (regional)
  3. Active/inactive toggle
  4. Drag-to-reorder or order input for display order

  **Must NOT do**:
  - Implement complex formula parsing/evaluation
  - Add formula builder UI (just text input)
  - Hard delete - only soft disable

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single config page with CRUD pattern
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 3, 5, 6, 7)
  - **Blocks**: Task 8
  - **Blocked By**: Task 1

  **References**:
  - `src/types/index.ts:558-567` - AllowanceConfig
  - `src/types/index.ts:112-124` - AllowanceType, AllowanceCalculationType enums
  - `src/data/config/allowance-types.json` - Created in Task 1
  - `src/pages/tccb/ContractListPage.tsx` - DataTable with row actions pattern

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: View allowance types with 6 pre-filled entries
    Tool: Playwright (playwright skill)
    Steps:
      1. Login as admin
      2. Navigate to: /admin/config/allowances
      3. Assert: Table shows 6 rows
      4. Assert: Contains "chức vụ", "thâm niên", "ưu đãi ngành"
      5. Screenshot: .sisyphus/evidence/task-4-allowance-list.png
    Expected Result: 6 pre-filled allowance types displayed
    Evidence: .sisyphus/evidence/task-4-allowance-list.png

  Scenario: Add new allowance with auto-generated code
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to: /admin/config/allowances
      2. Click: Add button
      3. Assert: Code field shows "PHC-007" (auto-generated)
      4. Fill: name → "Phụ cấp đặc biệt"
      5. Select: type → "position" or first option
      6. Select: calculationType → "coefficient"
      7. Fill: formula → "baseSalary * 0.1"
      8. Click: Save
      9. Assert: New row in table with "PHC-007"
      10. Screenshot: .sisyphus/evidence/task-4-allowance-added.png
    Expected Result: New allowance with auto code
    Evidence: .sisyphus/evidence/task-4-allowance-added.png

  Scenario: Toggle allowance active/inactive
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to: /admin/config/allowances
      2. Find: Row with "Phụ cấp độc hại"
      3. Click: Toggle or checkbox for isActive
      4. Assert: Status changes to inactive
      5. Screenshot: .sisyphus/evidence/task-4-allowance-toggled.png
    Expected Result: Allowance deactivated
    Evidence: .sisyphus/evidence/task-4-allowance-toggled.png
  ```

  **Commit**: YES (groups with 3, 5, 6, 7)
  - Message: `feat(admin): add allowance configuration page`
  - Files: `src/pages/admin/config/AllowanceConfigPage.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 5. Contract Configuration

  **What to do**:
  1. Create `src/pages/admin/config/ContractConfigPage.tsx`
     - DataTable with 4 contract types (cannot add new types, only configure)
     - Editable fields per type: minDuration, maxDuration, maxExtensions, maxConversionTime, warningDays
     - Inline edit or dialog edit
  2. Pre-fill with standard TLU values:
     - Indefinite: no duration limits, no extensions
     - Definite: 12-36 months, max 2 extensions, 30 day warning
     - Probation: 1-6 months, max 1 contract, 7 day warning
     - Visiting: 1-12 months, no extension limit, 14 day warning
  3. Validation: min < max, positive numbers

  **Must NOT do**:
  - Allow adding new contract types (fixed 4 types)
  - Delete contract types
  - Complex business rule engine

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single config page with fixed items
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 3, 4, 6, 7)
  - **Blocks**: Task 8
  - **Blocked By**: Task 1

  **References**:
  - `src/types/index.ts:569-579` - ContractTypeConfig
  - `src/types/index.ts:36-41` - ContractType enum
  - `src/data/config/contract-types.json` - Created in Task 1
  - `src/utils/contract-helpers.ts` - DEFAULT_MAX_EXTENSIONS to be replaced

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: View contract configuration with 4 types
    Tool: Playwright (playwright skill)
    Steps:
      1. Login as admin
      2. Navigate to: /admin/config/contracts
      3. Assert: Table shows exactly 4 rows
      4. Assert: Contains "Không xác định thời hạn", "Xác định thời hạn", "Thử việc", "Thỉnh giảng"
      5. Screenshot: .sisyphus/evidence/task-5-contract-list.png
    Expected Result: 4 contract types displayed
    Evidence: .sisyphus/evidence/task-5-contract-list.png

  Scenario: Edit definite contract max extensions
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to: /admin/config/contracts
      2. Find: "Xác định thời hạn" row
      3. Click: Edit action
      4. Change: maxExtensions → 3
      5. Click: Save
      6. Assert: Row shows maxExtensions = 3
      7. Screenshot: .sisyphus/evidence/task-5-contract-edited.png
    Expected Result: Max extensions updated
    Evidence: .sisyphus/evidence/task-5-contract-edited.png

  Scenario: Validation prevents min > max duration
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to: /admin/config/contracts
      2. Edit: Probation contract
      3. Set: minDuration → 12, maxDuration → 6
      4. Click: Save
      5. Assert: Error message about min/max
      6. Assert: Form not submitted
      7. Screenshot: .sisyphus/evidence/task-5-validation-error.png
    Expected Result: Validation blocks invalid input
    Evidence: .sisyphus/evidence/task-5-validation-error.png
  ```

  **Commit**: YES (groups with 3, 4, 6, 7)
  - Message: `feat(admin): add contract configuration page`
  - Files: `src/pages/admin/config/ContractConfigPage.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 6. Evaluation Configuration

  **What to do**:
  1. Create `src/pages/admin/config/EvaluationConfigPage.tsx`
     - Two tabs/sections: Reward Types + Discipline Types
     - DataTable per section: code, name, category, description, isActive, order
     - Add/Edit dialog
  2. Pre-fill with standard types:
     - Rewards: Danh hiệu (title), Bằng khen (certificate), Giấy khen (letter)
     - Discipline: Khiển trách (warning), Cảnh cáo (reprimand), Hạ bậc (demotion), Buộc thôi việc (dismissal)
  3. Active/inactive toggle, display order

  **Must NOT do**:
  - Add severity levels or point values
  - Link to actual reward/discipline records

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single config page with two sections
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 3, 4, 5, 7)
  - **Blocks**: Task 8
  - **Blocked By**: Task 1

  **References**:
  - `src/types/index.ts:581-589` - EvaluationTypeConfig
  - `src/types/index.ts:92-103` - RewardType, DisciplineType enums
  - `src/data/config/evaluation-types.json` - Created in Task 1
  - `src/pages/tccb/TrainingDetailPage.tsx` - Tabs pattern

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: View evaluation types with rewards and disciplines
    Tool: Playwright (playwright skill)
    Steps:
      1. Login as admin
      2. Navigate to: /admin/config/evaluations
      3. Assert: Rewards section shows 3 items
      4. Assert: Discipline section shows 4 items
      5. Screenshot: .sisyphus/evidence/task-6-evaluation-list.png
    Expected Result: Both sections populated
    Evidence: .sisyphus/evidence/task-6-evaluation-list.png

  Scenario: Add new reward type
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to: /admin/config/evaluations
      2. Click: Add in Rewards section
      3. Fill: code → "HTXS"
      4. Fill: name → "Hoàn thành xuất sắc"
      5. Select: category → "reward"
      6. Click: Save
      7. Assert: New item in rewards table
      8. Screenshot: .sisyphus/evidence/task-6-reward-added.png
    Expected Result: New reward type added
    Evidence: .sisyphus/evidence/task-6-reward-added.png
  ```

  **Commit**: YES (groups with 3, 4, 5, 7)
  - Message: `feat(admin): add evaluation configuration page`
  - Files: `src/pages/admin/config/EvaluationConfigPage.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 7. Training Types Configuration

  **What to do**:
  1. Create `src/pages/admin/config/TrainingTypesPage.tsx`
     - Simple DataTable: code, name, description, isActive, order
     - Add/Edit dialog
  2. Pre-fill with standard types:
     - Đào tạo trong nước (domestic)
     - Đào tạo nước ngoài (international)
     - Đào tạo ngắn hạn (short_term)
     - Đào tạo dài hạn (long_term)
  3. Active/inactive toggle, display order

  **Must NOT do**:
  - Add commitment period or budget fields
  - Link to actual training courses

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple single table config page
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 3, 4, 5, 6)
  - **Blocks**: Task 8
  - **Blocked By**: Task 1

  **References**:
  - `src/types/index.ts:591-598` - TrainingTypeConfig
  - `src/types/index.ts:64-69` - TrainingType enum
  - `src/data/config/training-types.json` - Created in Task 1
  - `src/pages/admin/config/AllowanceConfigPage.tsx` - Similar simple table pattern

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: View training types with 4 pre-filled entries
    Tool: Playwright (playwright skill)
    Steps:
      1. Login as admin
      2. Navigate to: /admin/config/training-types
      3. Assert: Table shows 4 rows
      4. Assert: Contains "trong nước", "nước ngoài", "ngắn hạn", "dài hạn"
      5. Screenshot: .sisyphus/evidence/task-7-training-types.png
    Expected Result: 4 training types displayed
    Evidence: .sisyphus/evidence/task-7-training-types.png

  Scenario: Add new training type
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to: /admin/config/training-types
      2. Click: Add button
      3. Fill: code → "BDCM"
      4. Fill: name → "Bồi dưỡng chuyên môn"
      5. Fill: description → "Các khóa bồi dưỡng nghiệp vụ"
      6. Click: Save
      7. Assert: New row in table
      8. Screenshot: .sisyphus/evidence/task-7-type-added.png
    Expected Result: New training type added
    Evidence: .sisyphus/evidence/task-7-type-added.png
  ```

  **Commit**: YES (groups with 3, 4, 5, 6)
  - Message: `feat(admin): add training types configuration page`
  - Files: `src/pages/admin/config/TrainingTypesPage.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 8. Integration + Contract Helper Refactor

  **What to do**:
  1. Refactor `src/utils/contract-helpers.ts`:
     - Remove hardcoded `DEFAULT_MAX_EXTENSIONS = 2`
     - Import contract config from JSON
     - Use config values for validation logic
  2. Final integration testing:
     - Verify all admin routes work together
     - Ensure config values are used in existing contract logic
  3. Update any existing pages that reference hardcoded values
  4. Final build verification

  **Must NOT do**:
  - Refactor other hardcoded values (pagination, mobile breakpoint)
  - Change contract business logic behavior

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
    - Reason: Integration and refactoring work
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 4 (final)
  - **Blocks**: None
  - **Blocked By**: Tasks 2, 3, 4, 5, 6, 7, 9

  **References**:
  - `src/utils/contract-helpers.ts:1-10` - DEFAULT_MAX_EXTENSIONS constant
  - `src/data/config/contract-types.json` - Contract config to import
  - `src/pages/tccb/ContractCreatePage.tsx` - May use contract helpers

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Contract extension uses config value
    Tool: Playwright (playwright skill)
    Steps:
      1. Login as admin
      2. Navigate to: /admin/config/contracts
      3. Edit: Definite contract, set maxExtensions → 1
      4. Save changes
      5. Navigate to: /tccb/contracts
      6. Find: Active definite contract with 1 extension
      7. Attempt: Extend contract
      8. Assert: Extension blocked or warning shown (max reached)
      9. Screenshot: .sisyphus/evidence/task-8-config-applied.png
    Expected Result: Contract helper uses config value
    Evidence: .sisyphus/evidence/task-8-config-applied.png

  Scenario: Full build succeeds
    Tool: Bash
    Steps:
      1. Run: bun run build
      2. Assert: exit code 0
      3. Assert: No TypeScript errors
    Expected Result: Clean build
    Evidence: Build output

  Scenario: All admin pages accessible and functional
    Tool: Playwright (playwright skill)
    Steps:
      1. Login as admin
      2. Navigate to: /admin/users → Assert: loads without error
      3. Navigate to: /admin/config/salary → Assert: loads without error
      4. Navigate to: /admin/config/allowances → Assert: loads without error
      5. Navigate to: /admin/config/contracts → Assert: loads without error
      6. Navigate to: /admin/config/evaluations → Assert: loads without error
      7. Navigate to: /admin/config/training-types → Assert: loads without error
      8. Navigate to: /admin/config/catalogs → Assert: loads without error
      9. Screenshot: .sisyphus/evidence/task-8-all-pages.png
    Expected Result: All admin pages load
    Evidence: .sisyphus/evidence/task-8-all-pages.png
  ```

  **Commit**: YES
  - Message: `refactor(contracts): use config values instead of hardcoded constants`
  - Files: `src/utils/contract-helpers.ts`
  - Pre-commit: `bun run build`

---

- [ ] 9. Business Catalogs Configuration (Need 26)

  **What to do**:
  1. Create `src/pages/admin/config/BusinessCatalogsPage.tsx`
     - Tabs/sections for 6 business catalog types:
       - Trình độ học vấn (education_level)
       - Chức danh khoa học (academic_title) - GS, PGS
       - Ngạch viên chức (civil_service_grade)
       - Chức vụ (position)
       - Danh hiệu (honor)
       - Loại đơn vị (unit_type)
     - Each tab: DataTable with code, name, description, isActive, order
     - Add/Edit dialog per catalog type
  2. Pre-fill with TLU sample data:
     - Education levels: Tiến sĩ, Thạc sĩ, Cử nhân, Kỹ sư, Cao đẳng, Trung cấp
     - Academic titles: Giáo sư (GS), Phó Giáo sư (PGS), Không (none)
     - Civil service grades: Giảng viên hạng III, Giảng viên hạng II, Giảng viên hạng I, Chuyên viên
     - Positions: Trưởng khoa, Phó trưởng khoa, Trưởng bộ môn, Phó trưởng bộ môn, etc.
     - Honors: Nhà giáo nhân dân, Nhà giáo ưu tú, Chiến sĩ thi đua cấp Bộ, etc.
     - Unit types: Khoa, Viện, Trung tâm, Bộ môn, Phòng, Ban, Đảng ủy
  3. Active/inactive toggle (Need 28: cannot delete in-use, only inactive)
  4. Display order management

  **Must NOT do**:
  - Add general catalogs (ethnicity, religion, address = text input)
  - Add province/district/ward hierarchical catalogs
  - Hard delete - only soft disable

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single config page with tabs for multiple catalog types
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Tab layout and table patterns

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 3, 4, 5, 6, 7)
  - **Blocks**: Task 8
  - **Blocked By**: Task 1

  **References**:
  - `src/types/index.ts:600-611` - CommonCatalog interface (type union includes business types)
  - `src/types/index.ts:78-90` - AcademicTitle, Degree enums
  - `src/types/index.ts:126-134` - UnitType enum
  - `src/data/config/business-catalogs.json` - Created in Task 1
  - `src/pages/admin/config/EvaluationConfigPage.tsx` - Tabs pattern for multiple sections

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: View business catalogs page with 6 tabs
    Tool: Playwright (playwright skill)
    Steps:
      1. Login as admin
      2. Navigate to: http://localhost:5173/admin/config/catalogs
      3. Assert: Page title contains "Danh mục" or "Catalogs"
      4. Assert: 6 tabs visible: Trình độ học vấn, Chức danh khoa học, Ngạch viên chức, Chức vụ, Danh hiệu, Loại đơn vị
      5. Screenshot: .sisyphus/evidence/task-9-catalogs-page.png
    Expected Result: Business catalogs page loads with 6 tabs
    Evidence: .sisyphus/evidence/task-9-catalogs-page.png

  Scenario: View education levels with pre-filled data
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to: /admin/config/catalogs
      2. Click: "Trình độ học vấn" tab
      3. Assert: Table shows entries (Tiến sĩ, Thạc sĩ, Cử nhân, etc.)
      4. Assert: At least 4 rows visible
      5. Screenshot: .sisyphus/evidence/task-9-education-levels.png
    Expected Result: Education levels pre-populated
    Evidence: .sisyphus/evidence/task-9-education-levels.png

  Scenario: Add new position to catalog
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to: /admin/config/catalogs
      2. Click: "Chức vụ" tab
      3. Click: Add button
      4. Fill: code → "GIAMDOC"
      5. Fill: name → "Giám đốc trung tâm"
      6. Fill: description → "Người đứng đầu trung tâm"
      7. Click: Save
      8. Assert: New row in table with "Giám đốc trung tâm"
      9. Screenshot: .sisyphus/evidence/task-9-position-added.png
    Expected Result: New position added to catalog
    Evidence: .sisyphus/evidence/task-9-position-added.png

  Scenario: Toggle catalog item active/inactive
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to: /admin/config/catalogs
      2. Click: "Loại đơn vị" tab
      3. Find: Row with "Đảng ủy"
      4. Click: Toggle or checkbox for isActive
      5. Assert: Status changes to inactive
      6. Screenshot: .sisyphus/evidence/task-9-item-toggled.png
    Expected Result: Catalog item deactivated
    Evidence: .sisyphus/evidence/task-9-item-toggled.png
  ```

  **Evidence to Capture:**
  - [ ] Screenshots in .sisyphus/evidence/task-9-*.png

  **Commit**: YES (groups with 3, 4, 5, 6, 7)
  - Message: `feat(admin): add business catalogs configuration page`
  - Files: `src/pages/admin/config/BusinessCatalogsPage.tsx`
  - Pre-commit: `bun run build`

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 1 | `feat(admin): add admin layout infrastructure with route guard and navigation` | AdminRoute.tsx, AppLayout.tsx, router.tsx, config/*.json | bun run build |
| 2 | `feat(admin): add session timeout and user management` | useSessionTimeout.ts, User*.tsx | bun run build |
| 3-7, 9 | `feat(admin): add configuration pages (salary, allowance, contract, evaluation, training, catalogs)` | config/*Page.tsx | bun run build |
| 8 | `refactor(contracts): use config values instead of hardcoded constants` | contract-helpers.ts | bun run build |

---

## Success Criteria

### Verification Commands
```bash
bun run build  # Expected: exit 0, no errors
```

### Final Checklist
- [ ] All "Must Have" present
- [ ] All "Must NOT Have" absent
- [ ] Session timeout works (30 min)
- [ ] User management complete (CRUD, lock/unlock, password reset)
- [ ] All 6 config pages functional (including business catalogs)
- [ ] Business catalogs page supports 6 category types
- [ ] Admin routes protected from non-admin users
- [ ] Contract helper uses config values

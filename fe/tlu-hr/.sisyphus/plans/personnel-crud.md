# Personnel CRUD Completion - Phase 2

## TL;DR

> **Quick Summary**: Add Edit and Mark Terminated functionality to the Personnel module, completing the CRUD operations. Reuse existing 8-step wizard components for edit mode, add termination dialog with date/reason, and display mock change history.
> 
> **Deliverables**:
> - Personnel Edit page at `/tccb/personnel/:id/edit` with pre-filled wizard
> - "Sửa" (Edit) and "Đánh dấu thôi việc" (Terminate) buttons on detail page
> - Row actions dropdown (Edit/Terminate) in personnel list
> - Change history display section in personnel detail
> - Shared WizardData type and mapping utilities
> 
> **Estimated Effort**: Medium (5-7 tasks)
> **Parallel Execution**: YES - 2 waves
> **Critical Path**: Task 1 → Task 2 → Task 3 → Task 4/5 (parallel) → Task 6

---

## Context

### Original Request
Complete Personnel CRUD functionality for TLU HRMS Phase 2, focusing on Edit and Mark Terminated features as specified in needs 43-45.

### Interview Summary
**Key Discussions**:
- Edit UX: Separate page at `/tccb/personnel/:id/edit` reusing existing 8 wizard steps
- Terminate UX: AlertDialog confirmation with termination date + reason
- Change history: Backend responsibility, frontend displays mock data
- Test strategy: Manual verification via Playwright browser automation

**Research Findings**:
- WizardData type (flat) differs from Personnel type (nested) - needs mapping functions
- Step components import WizardData from PersonnelCreatePage - need to extract to shared location
- PersonnelStatus enum has ACTIVE/INACTIVE/RETIRED but no TERMINATED - use INACTIVE for terminated
- Personnel interface already has `leaveDate` and `leaveReason` fields

### Metis Review
**Identified Gaps** (addressed):
- Data transformation: Will create `personnelToWizardData()` and `wizardDataToPersonnel()` utilities
- Type extraction: Will move WizardData to `@/types/wizard.ts` before creating EditPage
- Status semantics: Use INACTIVE status + set leaveDate/leaveReason for terminated employees
- Termination fields: Date required, reason required, free text input

---

## Work Objectives

### Core Objective
Complete Personnel CRUD by adding Edit and Mark Terminated functionality to the existing view-only implementation.

### Concrete Deliverables
1. `src/types/wizard.ts` - Extracted WizardData type
2. `src/utils/personnel-mapper.ts` - Bidirectional mapping functions
3. `src/pages/tccb/PersonnelEditPage.tsx` - Edit page with pre-filled wizard
4. Updated `PersonnelDetailPage.tsx` - Edit and Terminate buttons
5. Updated `PersonnelListPage.tsx` - Row actions dropdown column
6. Mock change history display in PersonnelDetailPage

### Definition of Done
- [ ] Can edit any personnel record via /tccb/personnel/:id/edit
- [ ] Can mark personnel as terminated via confirmation dialog
- [ ] All action buttons visible and functional
- [ ] `bun run build` passes with 0 errors

### Must Have
- Separate edit page (not inline editing)
- Termination dialog with date and reason fields
- Pre-filled data in edit wizard matching existing record
- Toast notifications for success/error feedback
- Row actions in list for quick access

### Must NOT Have (Guardrails)
- DO NOT modify existing wizard step components (except import paths)
- DO NOT add form validation to wizard steps (not in scope)
- DO NOT create reusable wizard abstraction (acceptable duplication)
- DO NOT add navigation guards or unsaved changes warnings
- DO NOT implement real change history tracking (mock data only)
- DO NOT add new PersonnelStatus enum value (use INACTIVE)
- DO NOT refactor PersonnelCreatePage while adding edit

---

## Verification Strategy (MANDATORY)

### Test Decision
- **Infrastructure exists**: NO
- **User wants tests**: NO (Manual verification only)
- **Framework**: N/A

### Automated Verification (Playwright Browser Automation)

All acceptance criteria will use Playwright via the `playwright` skill for browser automation.

**Evidence Requirements:**
- Screenshots saved to `.sisyphus/evidence/` for each verification
- Playwright assertions for DOM elements and text content
- All verifications executable by agent, no manual user testing

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately):
└── Task 1: Extract WizardData type to shared location

Wave 2 (After Wave 1):
├── Task 2: Create personnel mapping utilities
└── (blocked until Task 2 complete)

Wave 3 (After Wave 2):
└── Task 3: Create PersonnelEditPage

Wave 4 (After Wave 3):
├── Task 4: Add buttons to PersonnelDetailPage (parallel)
└── Task 5: Add row actions to PersonnelListPage (parallel)

Wave 5 (After Wave 4):
└── Task 6: Add change history display

Critical Path: Task 1 → Task 2 → Task 3 → Task 4/5 → Task 6
Parallel Speedup: ~20% faster than sequential
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 1 | None | 2, 3 | None |
| 2 | 1 | 3 | None |
| 3 | 2 | 4, 5 | None |
| 4 | 3 | 6 | 5 |
| 5 | 3 | 6 | 4 |
| 6 | 4, 5 | None | None (final) |

### Agent Dispatch Summary

| Wave | Tasks | Recommended Agents |
|------|-------|-------------------|
| 1 | 1 | category="quick" |
| 2 | 2 | category="quick" |
| 3 | 3 | category="visual-engineering" with skills=["frontend-ui-ux"] |
| 4 | 4, 5 | category="quick" (parallel) |
| 5 | 6 | category="quick" |

---

## TODOs

- [x] 1. Extract WizardData Type to Shared Location

  **What to do**:
  - Create `src/types/wizard.ts`
  - Copy `WizardData` interface from `PersonnelCreatePage.tsx` (lines 17-74)
  - Export as named export: `export interface WizardData { ... }`
  - Update all wizard step imports from `"@/pages/tccb/PersonnelCreatePage"` to `"@/types/wizard"`
  - Update `PersonnelCreatePage.tsx` to import from shared location
  - Verify build passes

  **Must NOT do**:
  - DO NOT modify the WizardData structure
  - DO NOT refactor PersonnelCreatePage logic

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple file extraction and import path updates
  - **Skills**: `[]`
    - No specialized skills needed for this refactoring task

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 1 (solo)
  - **Blocks**: Tasks 2, 3
  - **Blocked By**: None (start immediately)

  **References**:
  - `src/pages/tccb/PersonnelCreatePage.tsx:17-74` - WizardData interface to extract
  - `src/components/forms/wizard-steps/Step1BasicInfo.tsx:10` - Example import to update
  - `src/components/forms/wizard-steps/Step2AddressContact.tsx:1` - Another import to update
  - All 8 step components need import updates

  **Acceptance Criteria**:

  ```bash
  # 1. Verify file exists
  test -f src/types/wizard.ts && echo "PASS: wizard.ts exists"
  
  # 2. Verify type is exported
  grep -q "export interface WizardData" src/types/wizard.ts && echo "PASS: WizardData exported"
  
  # 3. Verify all step imports updated
  grep -r "from.*PersonnelCreatePage" src/components/forms/wizard-steps/ | wc -l
  # Assert: Returns 0 (no old imports)
  
  # 4. Build passes
  bun run build
  # Assert: Exit code 0
  ```

  **Evidence to Capture:**
  - [ ] Terminal output from build command

  **Commit**: YES
  - Message: `refactor(types): extract WizardData to shared location`
  - Files: `src/types/wizard.ts`, `src/pages/tccb/PersonnelCreatePage.tsx`, `src/components/forms/wizard-steps/*.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 2. Create Personnel Mapping Utilities

  **What to do**:
  - Create `src/utils/personnel-mapper.ts`
  - Implement `personnelToWizardData(personnel: Personnel): WizardData`
    - Map nested Personnel structure to flat WizardData
    - Handle currentUnit → unitId, positionId
    - Handle currentContract → contractType, signDate, etc.
    - Handle salaryScale → salaryScaleId, etc.
  - Implement `wizardDataToPersonnel(data: WizardData, originalId?: string): Partial<Personnel>`
    - Reverse mapping for save operation
    - If originalId provided, preserve it
  - Export both functions

  **Must NOT do**:
  - DO NOT add validation logic to mappers
  - DO NOT modify Personnel or WizardData types

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Utility function creation with clear input/output
  - **Skills**: `[]`
    - No specialized skills needed

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2 (solo)
  - **Blocks**: Task 3
  - **Blocked By**: Task 1

  **References**:
  - `src/types/wizard.ts` - WizardData structure (created in Task 1)
  - `src/types/index.ts:12-48` - Personnel interface with nested fields
  - `src/types/index.ts:50-54` - PersonnelStatus enum
  - `src/data/personnel.json` - Example Personnel objects to map from

  **Acceptance Criteria**:

  ```bash
  # 1. File exists
  test -f src/utils/personnel-mapper.ts && echo "PASS: mapper exists"
  
  # 2. Functions exported
  grep -q "export function personnelToWizardData" src/utils/personnel-mapper.ts && echo "PASS: function 1"
  grep -q "export function wizardDataToPersonnel" src/utils/personnel-mapper.ts && echo "PASS: function 2"
  
  # 3. Build passes
  bun run build
  # Assert: Exit code 0
  ```

  **Evidence to Capture:**
  - [ ] Terminal output from build command

  **Commit**: YES
  - Message: `feat(utils): add personnel-to-wizard mapping utilities`
  - Files: `src/utils/personnel-mapper.ts`
  - Pre-commit: `bun run build`

---

- [ ] 3. Create PersonnelEditPage

  **What to do**:
  - Create `src/pages/tccb/PersonnelEditPage.tsx`
  - Add route in `src/router.tsx`: `/tccb/personnel/:id/edit` → PersonnelEditPage
  - Page structure:
    - Fetch personnel by ID from mock data (same pattern as PersonnelDetailPage)
    - Convert to WizardData using `personnelToWizardData()`
    - Render same 8-step wizard as create page
    - Pre-fill all steps with converted data
    - On submit: show success toast, navigate to detail page
    - Handle not found: show error message
  - Header: "Chỉnh sửa nhân sự: {employeeCode}"
  - Use same step navigation as PersonnelCreatePage

  **Must NOT do**:
  - DO NOT modify existing step components
  - DO NOT add validation to steps
  - DO NOT persist data to JSON files (mock only)
  - DO NOT add unsaved changes warning

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Full page component with wizard integration and navigation
  - **Skills**: `["frontend-ui-ux"]`
    - frontend-ui-ux: Ensures consistent UI patterns with existing pages

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (solo)
  - **Blocks**: Tasks 4, 5
  - **Blocked By**: Task 2

  **References**:
  - `src/pages/tccb/PersonnelCreatePage.tsx` - Copy structure, replace initial data with loaded personnel
  - `src/pages/tccb/PersonnelDetailPage.tsx:15-25` - Pattern for loading personnel by ID
  - `src/utils/personnel-mapper.ts` - Import and use personnelToWizardData()
  - `src/router.tsx:18-22` - Route definition pattern
  - `src/hooks/use-toast.ts` - Toast notification pattern

  **Acceptance Criteria**:

  ```
  # Playwright verification:
  1. Navigate to: http://localhost:5173/tccb/personnel/p001/edit
  2. Wait for: page to load (no loading spinner)
  3. Assert: heading contains "Chỉnh sửa nhân sự"
  4. Assert: Step 1 has pre-filled data:
     - input[name="fullName"] has value "Nguyễn Văn A"
     - input[name="dateOfBirth"] has value
  5. Click: "Tiếp theo" button 7 times to reach Step 8
  6. Assert: Step 8 (Review) shows summary data
  7. Screenshot: .sisyphus/evidence/task-3-edit-page.png
  ```

  **Evidence to Capture:**
  - [ ] Screenshot of edit page with pre-filled data
  - [ ] Terminal output from build command

  **Commit**: YES
  - Message: `feat(personnel): add edit page with wizard`
  - Files: `src/pages/tccb/PersonnelEditPage.tsx`, `src/router.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 4. Add Edit and Terminate Buttons to PersonnelDetailPage

  **What to do**:
  - Import AlertDialog components
  - Add button group to header (next to back button):
    - "Sửa" button (outline variant) → navigates to edit page
    - "Đánh dấu thôi việc" button (destructive variant) → opens AlertDialog
  - Implement termination AlertDialog:
    - Title: "Xác nhận thôi việc"
    - Description: "Bạn có chắc chắn muốn đánh dấu nhân sự này đã thôi việc?"
    - Form fields:
      - "Ngày thôi việc" (date input, required, default to today)
      - "Lý do" (textarea, required)
    - Cancel button: "Hủy"
    - Confirm button: "Xác nhận" (destructive variant)
  - On confirm: Update personnel status to INACTIVE, set leaveDate/leaveReason, show success toast
  - Hide terminate button if personnel is already INACTIVE

  **Must NOT do**:
  - DO NOT add confirmation for edit (just navigate)
  - DO NOT add additional termination fields
  - DO NOT implement actual data persistence

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Adding buttons and dialog to existing page
  - **Skills**: `[]`
    - No specialized skills needed

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Task 5)
  - **Blocks**: Task 6
  - **Blocked By**: Task 3

  **References**:
  - `src/pages/tccb/PersonnelDetailPage.tsx:28-46` - Header section to modify
  - `src/components/ui/alert-dialog.tsx` - AlertDialog component API
  - `src/components/ui/button.tsx` - Button variants (outline, destructive)
  - `src/hooks/use-toast.ts` - Toast notification usage
  - `src/pages/tccb/PersonnelCreatePage.tsx:158-165` - Example toast usage

  **Acceptance Criteria**:

  ```
  # Playwright verification:
  1. Navigate to: http://localhost:5173/tccb/personnel/p001
  2. Assert: button with text "Sửa" is visible
  3. Assert: button with text "Đánh dấu thôi việc" is visible
  4. Click: "Sửa" button
  5. Assert: URL is now /tccb/personnel/p001/edit
  6. Navigate back to: http://localhost:5173/tccb/personnel/p001
  7. Click: "Đánh dấu thôi việc" button
  8. Assert: Dialog with title "Xác nhận thôi việc" is visible
  9. Assert: Date input and textarea are present in dialog
  10. Screenshot: .sisyphus/evidence/task-4-terminate-dialog.png
  ```

  **Evidence to Capture:**
  - [ ] Screenshot of detail page with buttons
  - [ ] Screenshot of termination dialog

  **Commit**: YES (group with Task 5)
  - Message: `feat(personnel): add edit and terminate actions to detail page`
  - Files: `src/pages/tccb/PersonnelDetailPage.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 5. Add Row Actions to PersonnelListPage

  **What to do**:
  - Add new "Thao tác" (Actions) column to table (last column)
  - Implement DropdownMenu with actions:
    - "Xem chi tiết" → navigate to detail page
    - "Sửa" → navigate to edit page
    - Separator
    - "Đánh dấu thôi việc" → same AlertDialog as detail page
  - Use MoreHorizontal icon (lucide-react) as trigger
  - Preserve existing row click behavior (navigate to detail)

  **Must NOT do**:
  - DO NOT remove row click navigation
  - DO NOT add bulk actions
  - DO NOT change table structure beyond adding column

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Adding dropdown menu to table
  - **Skills**: `[]`
    - No specialized skills needed

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Task 4)
  - **Blocks**: Task 6
  - **Blocked By**: Task 3

  **References**:
  - `src/pages/tccb/PersonnelListPage.tsx:45-80` - Table structure
  - `src/components/ui/dropdown-menu.tsx` - DropdownMenu component API
  - `lucide-react` - MoreHorizontal icon for trigger
  - `src/pages/tccb/PersonnelDetailPage.tsx` - AlertDialog pattern (from Task 4)

  **Acceptance Criteria**:

  ```
  # Playwright verification:
  1. Navigate to: http://localhost:5173/tccb/personnel
  2. Assert: table header has "Thao tác" column
  3. Assert: each row has MoreHorizontal icon button
  4. Click: first row's action button (MoreHorizontal)
  5. Assert: dropdown menu is visible with items:
     - "Xem chi tiết"
     - "Sửa"
     - "Đánh dấu thôi việc"
  6. Click: "Sửa" menu item
  7. Assert: URL is now /tccb/personnel/{id}/edit
  8. Screenshot: .sisyphus/evidence/task-5-row-actions.png
  ```

  **Evidence to Capture:**
  - [ ] Screenshot of list page with actions column
  - [ ] Screenshot of dropdown menu open

  **Commit**: YES (group with Task 4)
  - Message: `feat(personnel): add row actions dropdown to list page`
  - Files: `src/pages/tccb/PersonnelListPage.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 6. Add Change History Display to PersonnelDetailPage

  **What to do**:
  - Add "Lịch sử thay đổi" section to personal info tab (or as new tab)
  - Display mock change history data:
    - Each entry shows: date, action type, changed by, reason
    - Example actions: "Tạo mới", "Cập nhật thông tin cá nhân", "Đánh dấu thôi việc"
  - Use Timeline or simple list UI pattern
  - Add mock data entries to personnel.json (2-3 history items per person)
  - Style: subtle, read-only, chronological order (newest first)

  **Must NOT do**:
  - DO NOT implement real change tracking
  - DO NOT make history editable
  - DO NOT add history for non-personnel entities

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Adding display section with mock data
  - **Skills**: `[]`
    - No specialized skills needed

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 5 (final)
  - **Blocks**: None
  - **Blocked By**: Tasks 4, 5

  **References**:
  - `src/pages/tccb/PersonnelDetailPage.tsx:50-150` - Tab content structure
  - `src/types/index.ts:55-60` - ChangeHistory interface
  - `src/data/personnel.json` - Add mock changeHistory data here
  - Timeline pattern: simple vertical list with date/action pairs

  **Acceptance Criteria**:

  ```
  # Playwright verification:
  1. Navigate to: http://localhost:5173/tccb/personnel/p001
  2. Scroll to or click tab containing change history
  3. Assert: "Lịch sử thay đổi" heading is visible
  4. Assert: At least 2 history entries are displayed
  5. Assert: Each entry shows date and action description
  6. Screenshot: .sisyphus/evidence/task-6-change-history.png
  ```

  **Evidence to Capture:**
  - [ ] Screenshot of change history section

  **Commit**: YES
  - Message: `feat(personnel): add change history display with mock data`
  - Files: `src/pages/tccb/PersonnelDetailPage.tsx`, `src/data/personnel.json`
  - Pre-commit: `bun run build`

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 1 | `refactor(types): extract WizardData to shared location` | wizard.ts, step*.tsx | bun run build |
| 2 | `feat(utils): add personnel-to-wizard mapping utilities` | personnel-mapper.ts | bun run build |
| 3 | `feat(personnel): add edit page with wizard` | PersonnelEditPage.tsx, router.tsx | bun run build |
| 4+5 | `feat(personnel): add edit/terminate actions to detail and list pages` | PersonnelDetailPage.tsx, PersonnelListPage.tsx | bun run build |
| 6 | `feat(personnel): add change history display with mock data` | PersonnelDetailPage.tsx, personnel.json | bun run build |

---

## Success Criteria

### Verification Commands
```bash
# Build passes
bun run build  # Expected: 0 errors

# Routes registered
grep -q "personnel/:id/edit" src/router.tsx  # Expected: match found
```

### Final Playwright Verification
```
1. Navigate to http://localhost:5173/tccb/personnel
2. Click action menu on first row → "Sửa"
3. Verify edit page loads with pre-filled data
4. Navigate back to list
5. Click row to view detail
6. Verify "Sửa" and "Đánh dấu thôi việc" buttons present
7. Click "Đánh dấu thôi việc", verify dialog appears
8. Scroll to change history, verify entries displayed
```

### Final Checklist
- [ ] All "Must Have" features present
- [ ] All "Must NOT Have" constraints respected
- [ ] `bun run build` passes with 0 errors
- [ ] All 6 tasks completed and verified

# Phase 4: Training Management Module

## TL;DR

> **Quick Summary**: Build complete Training Management CRUD module for TCCB officers including course list, detail, create/edit forms, personnel enrollment, and progress tracking with certificate auto-issuance.
> 
> **Deliverables**:
> - Enhanced TrainingListPage with row actions and "Tạo khóa đào tạo" button
> - TrainingDetailPage showing course info + participants
> - TrainingCreatePage with Card-based form
> - TrainingEditPage for course modifications
> - EnrollPersonnelDialog for adding participants
> - UpdateProgressDialog for status changes
> - Auto-certificate issuance on completion
> 
> **Estimated Effort**: Medium (8-12 tasks, ~2-3 days)
> **Parallel Execution**: YES - 3 waves
> **Critical Path**: Data Update → List Enhancement → Create Page → Detail Page → Dialogs

---

## Context

### Original Request
Build Training Management module (Phase 4) with:
- Training Course list page with CRUD
- Training Course detail page
- Create Training Course form
- Personnel enrollment workflow
- Progress tracking (status updates)
- Auto-update certificates on completion

### Interview Summary
**Key Discussions**:
- User confirmed this follows existing work from Phases 1-3
- Pattern to follow: Card-based forms (like ContractCreatePage), Dialog patterns (like ContractExtensionDialog)
- Manual verification via Playwright browser automation

**Research Findings**:
- Types already exist: `TrainingCourse`, `TrainingParticipation`, `TrainingPlan`, `TrainingStatus`, `TrainingType`, `ParticipantStatus`
- `training.json` exists with 6 sample courses but missing `participants` array
- Router only has `/tccb/training` for list page
- `TrainingListPage.tsx` is view-only with hardcoded participant count of 0

### Metis Review
**Identified Gaps** (addressed):

| Gap | Resolution |
|-----|------------|
| "Training plans vs courses" ambiguity | **DEFAULT**: No separate TrainingPlan UI. Implement year filter by parsing `startDate`. Label as "Năm" filter. |
| Persistence expectations | **DEFAULT**: In-memory only (JSON array push). Add visual indicator "Dữ liệu demo - không lưu sau khi tải lại" |
| Enrollment workflow | **DEFAULT**: TCCB-only enrollment. No self-registration in this phase (employee self-service is future phase). |
| Status transition rules | **DEFAULT**: Enforce logical transitions: registered → studying → completed/dropped. Block enrollment when course status ≠ open. |
| Certificate auto-update mechanism | **DEFAULT**: On completion, push new `Certificate` entry to `personnel.certificates[]` with `type: "training"`, `name: course.name`, `issueDate: today`, `status: "valid"` |
| Edit with existing participants | **DEFAULT**: Allow editing all fields. No delete if participants exist (show warning). |
| Duplicate enrollment | **ENFORCE**: Block duplicate `personnelId + courseId` pairs. |

---

## Work Objectives

### Core Objective
Build complete Training Management CRUD with enrollment and progress tracking for TCCB officers.

### Concrete Deliverables
1. `src/data/training.json` - Extended with full `TrainingCourse` fields
2. `src/pages/tccb/TrainingListPage.tsx` - Enhanced with row actions, create button, year filter
3. `src/pages/tccb/TrainingDetailPage.tsx` - New page showing course + participants
4. `src/pages/tccb/TrainingCreatePage.tsx` - New create form page
5. `src/pages/tccb/TrainingEditPage.tsx` - New edit form page
6. `src/components/training/EnrollPersonnelDialog.tsx` - Dialog to add personnel
7. `src/components/training/UpdateProgressDialog.tsx` - Dialog to change participant status
8. `src/router.tsx` - New routes added
9. `src/components/layout/AppLayout.tsx` - Sidebar updated with training sub-items

### Definition of Done
- [ ] `bun run build` exits with 0 errors
- [ ] All new routes navigable
- [ ] Create course → appears in list
- [ ] Enroll personnel → appears in participant list
- [ ] Complete participant → certificate added to personnel
- [ ] Year filter works correctly
- [ ] Capacity enforcement blocks over-enrollment

### Must Have
- CRUD operations for training courses
- Personnel enrollment to courses
- Progress status updates (registered → studying → completed/dropped)
- Certificate auto-issuance on completion
- Year filter on list page
- Capacity enforcement (maxParticipants)
- Registration window enforcement (open/close dates)

### Must NOT Have (Guardrails)
- NO TrainingPlan CRUD (just year filter by course dates)
- NO employee self-registration (TCCB-only in this phase)
- NO waitlists or approval workflows
- NO vendor/trainer management or costing
- NO file uploads or PDF certificate generation
- NO analytics/reporting beyond list view
- NO localStorage persistence (keep in-memory only like existing patterns)
- NO new state management libraries (keep local useState like existing)
- NO wizard/accordion form (use Card form like ContractCreatePage)

---

## Verification Strategy (MANDATORY)

### Test Decision
- **Infrastructure exists**: NO (no formal test setup)
- **User wants tests**: Manual verification via Playwright
- **Framework**: Playwright scripts (similar to existing patterns)

### Automated Verification (Playwright Browser)

Each TODO includes executable Playwright verification:

**Verification Pattern:**
```typescript
// Agent runs via playwright skill:
// 1. Start dev server: bun run dev
// 2. Navigate to target URL
// 3. Perform actions (click, fill, submit)
// 4. Assert DOM state (text visible, element exists)
// 5. Screenshot to .sisyphus/evidence/
```

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately):
├── Task 1: Update training.json with full fields
└── Task 2: Create training-helpers.ts utilities

Wave 2 (After Wave 1):
├── Task 3: Enhance TrainingListPage (row actions, year filter, create button)
├── Task 4: Create TrainingCreatePage
└── Task 5: Add routes to router.tsx

Wave 3 (After Wave 2):
├── Task 6: Create TrainingDetailPage
├── Task 7: Create TrainingEditPage
├── Task 8: Create EnrollPersonnelDialog
├── Task 9: Create UpdateProgressDialog
└── Task 10: Update sidebar navigation

Wave 4 (Final):
└── Task 11: Integration testing & bug fixes
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 1 | None | 3, 4, 6, 7 | 2 |
| 2 | None | 4, 6, 8, 9 | 1 |
| 3 | 1 | 6 | 4, 5 |
| 4 | 1, 2 | 7 | 3, 5 |
| 5 | None | 6, 7 | 3, 4 |
| 6 | 3, 5 | 8, 9 | 7 |
| 7 | 4, 5 | None | 6 |
| 8 | 2, 6 | 11 | 9, 10 |
| 9 | 2, 6 | 11 | 8, 10 |
| 10 | 5 | None | 8, 9 |
| 11 | 8, 9, 10 | None | None |

### Agent Dispatch Summary

| Wave | Tasks | Recommended Dispatch |
|------|-------|---------------------|
| 1 | 1, 2 | `delegate_task(category="quick", load_skills=["frontend-ui-ux"], run_in_background=true)` |
| 2 | 3, 4, 5 | Parallel dispatch after Wave 1 |
| 3 | 6, 7, 8, 9, 10 | Parallel dispatch after Wave 2 |
| 4 | 11 | Sequential, with playwright skill for verification |

---

## TODOs

### Task 1: Update training.json with Full TrainingCourse Fields

- [x] 1. Update training.json with complete TrainingCourse structure

  **What to do**:
  - Add missing fields to each course: `participants`, `budget`, `commitmentPeriod`, `registrationOpenDate`, `registrationCloseDate`, `certificateType`, `planId`, `description`, `createdAt`, `updatedAt`
  - Add sample participants to 2-3 courses for testing
  - Ensure data matches `TrainingCourse` type from `src/types/index.ts`

  **Must NOT do**:
  - Do not add new fields not in the type definition
  - Do not change existing id values (would break references)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple data file update, no UI work
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Understands TypeScript types for data consistency

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Task 2)
  - **Blocks**: Tasks 3, 4, 6, 7
  - **Blocked By**: None

  **References**:

  **Type References**:
  - `src/types/index.ts:429-449` - `TrainingCourse` interface with all required fields
  - `src/types/index.ts:418-427` - `TrainingParticipation` interface for participants array
  - `src/types/index.ts:56-62` - `TrainingStatus` enum values
  - `src/types/index.ts:64-69` - `TrainingType` enum values
  - `src/types/index.ts:71-76` - `ParticipantStatus` enum values

  **Data References**:
  - `src/data/training.json` - Current file with 6 courses, missing fields to add
  - `src/data/personnel.json` - Personnel IDs to use for sample participants

  **Acceptance Criteria**:

  **Automated Verification (Bash)**:
  ```bash
  # Verify JSON is valid
  bun -e "import data from './src/data/training.json'; console.log('Courses:', data.length); console.log('Has participants:', data.some(c => c.participants?.length > 0))"
  # Assert: Output shows "Courses: 6" and "Has participants: true"
  
  # Verify build passes
  bun run build
  # Assert: Exit code 0
  ```

  **Commit**: YES
  - Message: `feat(training): add complete TrainingCourse fields to training.json`
  - Files: `src/data/training.json`
  - Pre-commit: `bun run build`

---

### Task 2: Create training-helpers.ts Utility Functions

- [x] 2. Create training helper utilities

  **What to do**:
  - Create `src/utils/training-helpers.ts`
  - Implement: `canEnroll(course, personnelId)` - checks capacity, registration window, duplicate, course status
  - Implement: `canUpdateStatus(participation, newStatus)` - validates status transitions
  - Implement: `getYearsFromCourses(courses)` - extracts unique years for filter
  - Implement: `createCertificateFromCourse(course, participation)` - generates Certificate object
  - Implement: `formatTrainingType(type)` - Vietnamese labels
  - Implement: `formatParticipantStatus(status)` - Vietnamese labels

  **Must NOT do**:
  - No API calls or async operations
  - No state management

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Utility functions, pure TypeScript, no UI
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Understands existing helper patterns

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Task 1)
  - **Blocks**: Tasks 4, 6, 8, 9
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `src/utils/contract-helpers.ts` - Existing helper pattern with validation functions

  **Type References**:
  - `src/types/index.ts:429-449` - `TrainingCourse` interface
  - `src/types/index.ts:418-427` - `TrainingParticipation` interface
  - `src/types/index.ts:227-236` - `Certificate` interface for createCertificateFromCourse

  **Acceptance Criteria**:

  **Automated Verification (Bash)**:
  ```bash
  # Verify file exists and exports functions
  bun -e "import { canEnroll, canUpdateStatus, getYearsFromCourses } from './src/utils/training-helpers'; console.log('Functions exported:', typeof canEnroll, typeof canUpdateStatus, typeof getYearsFromCourses)"
  # Assert: Output shows "Functions exported: function function function"
  
  # Verify build passes
  bun run build
  # Assert: Exit code 0
  ```

  **Commit**: YES
  - Message: `feat(training): add training-helpers.ts utility functions`
  - Files: `src/utils/training-helpers.ts`
  - Pre-commit: `bun run build`

---

### Task 3: Enhance TrainingListPage with Row Actions and Year Filter

- [ ] 3. Enhance TrainingListPage with full functionality

  **What to do**:
  - Add "Tạo khóa đào tạo" button linking to `/tccb/training/new`
  - Add year filter dropdown (extract years from courses)
  - Add row actions dropdown (Xem chi tiết, Chỉnh sửa, Hủy khóa học)
  - Update participant count to show actual `course.participants.length`
  - Make course name clickable to detail page
  - Use local useState for courses (for in-memory updates)

  **Must NOT do**:
  - No delete action (only cancel/status change)
  - No inline editing

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI enhancements with interactive elements
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: UI patterns, shadcn components

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 5)
  - **Blocks**: Task 6
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `src/pages/tccb/PersonnelListPage.tsx` - Row actions dropdown pattern, button placement
  - `src/pages/tccb/ContractListPage.tsx` - Table with actions pattern

  **Component References**:
  - `src/components/ui/dropdown-menu.tsx` - DropdownMenu for row actions
  - `src/components/ui/button.tsx` - Button for "Tạo khóa đào tạo"
  - `src/components/ui/select.tsx` - Select for year filter

  **Current Implementation**:
  - `src/pages/tccb/TrainingListPage.tsx` - Current view-only implementation to enhance

  **Acceptance Criteria**:

  **Automated Verification (Playwright)**:
  ```
  # Agent executes via playwright browser automation:
  1. Navigate to: http://localhost:5173/tccb/training
  2. Assert: Button "Tạo khóa đào tạo" is visible
  3. Assert: Year filter select is visible
  4. Assert: Row actions button (⋮) exists on each row
  5. Click: Row actions on first row
  6. Assert: Dropdown shows "Xem chi tiết", "Chỉnh sửa", "Hủy khóa học"
  7. Screenshot: .sisyphus/evidence/task-3-training-list-enhanced.png
  ```

  **Commit**: YES
  - Message: `feat(training): enhance TrainingListPage with actions and year filter`
  - Files: `src/pages/tccb/TrainingListPage.tsx`
  - Pre-commit: `bun run build`

---

### Task 4: Create TrainingCreatePage

- [ ] 4. Create training course creation page

  **What to do**:
  - Create `src/pages/tccb/TrainingCreatePage.tsx`
  - Card-based form layout (follow ContractCreatePage pattern)
  - Fields: name*, type*, description, startDate*, endDate*, location*, budget, commitmentPeriod, registrationOpenDate, registrationCloseDate, maxParticipants, certificateType
  - Manual validation with error state
  - On submit: generate ID, push to training array, toast success, navigate to list
  - Add "Dữ liệu demo - không lưu sau khi tải lại" warning banner

  **Must NOT do**:
  - No wizard/accordion (use simple Card form)
  - No file upload
  - No participants on create (add after via detail page)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Form UI with validation
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Form patterns, validation UX

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 3, 5)
  - **Blocks**: Task 7
  - **Blocked By**: Tasks 1, 2

  **References**:

  **Pattern References**:
  - `src/pages/tccb/ContractCreatePage.tsx` - Card form layout, controlled inputs, validation pattern, toast feedback

  **Component References**:
  - `src/components/ui/card.tsx` - Card, CardHeader, CardContent, CardFooter
  - `src/components/ui/input.tsx` - Input fields
  - `src/components/ui/select.tsx` - Select for type
  - `src/components/ui/textarea.tsx` - Textarea for description
  - `src/components/ui/alert.tsx` - Alert for demo data warning

  **Type References**:
  - `src/types/index.ts:429-449` - TrainingCourse interface
  - `src/types/index.ts:64-69` - TrainingType enum for dropdown

  **Acceptance Criteria**:

  **Automated Verification (Playwright)**:
  ```
  # Agent executes via playwright browser automation:
  1. Navigate to: http://localhost:5173/tccb/training/new
  2. Assert: Page title "Tạo Khóa Đào Tạo Mới" is visible
  3. Assert: Demo data warning banner is visible
  4. Fill: input[name="name"] with "Khóa học Test"
  5. Select: type dropdown → "Trong nước"
  6. Fill: startDate, endDate, location
  7. Click: Submit button
  8. Assert: Toast "Tạo khóa đào tạo thành công" appears
  9. Assert: Redirected to /tccb/training
  10. Assert: "Khóa học Test" appears in table
  11. Screenshot: .sisyphus/evidence/task-4-training-create.png
  ```

  **Commit**: YES
  - Message: `feat(training): create TrainingCreatePage with form validation`
  - Files: `src/pages/tccb/TrainingCreatePage.tsx`
  - Pre-commit: `bun run build`

---

### Task 5: Add Training Routes to Router

- [ ] 5. Add new training routes

  **What to do**:
  - Add route: `/tccb/training/new` → TrainingCreatePage
  - Add route: `/tccb/training/:id` → TrainingDetailPage
  - Add route: `/tccb/training/:id/edit` → TrainingEditPage
  - Add imports for new page components

  **Must NOT do**:
  - Do not modify existing routes
  - Do not add nested routes

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple router configuration
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: React Router patterns

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 3, 4)
  - **Blocks**: Tasks 6, 7
  - **Blocked By**: None (but pages must exist for routes to work)

  **References**:

  **Pattern References**:
  - `src/router.tsx:1-39` - Existing route structure with dynamic params pattern

  **Acceptance Criteria**:

  **Automated Verification (Bash)**:
  ```bash
  # Verify routes are added
  grep -c "training/new\|training/:id" src/router.tsx
  # Assert: Output is 3 (new, :id detail, :id/edit)
  
  bun run build
  # Assert: Exit code 0
  ```

  **Commit**: YES (groups with Task 4)
  - Message: `feat(training): add routes for create, detail, edit pages`
  - Files: `src/router.tsx`
  - Pre-commit: `bun run build`

---

### Task 6: Create TrainingDetailPage

- [ ] 6. Create training course detail page

  **What to do**:
  - Create `src/pages/tccb/TrainingDetailPage.tsx`
  - Show course info in Card (name, type, dates, location, budget, status, etc.)
  - Participants section with Table (name, status, registration date, completion date)
  - "Thêm nhân sự" button → opens EnrollPersonnelDialog
  - Row action per participant → opens UpdateProgressDialog
  - Show capacity: "X / maxParticipants đã đăng ký"
  - Use local useState for course/participants (in-memory updates)

  **Must NOT do**:
  - No inline editing of course info (use edit page)
  - No bulk operations on participants

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Complex page with table and dialogs
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Detail page patterns, table UX

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 7, 8, 9, 10)
  - **Blocks**: Tasks 8, 9
  - **Blocked By**: Tasks 3, 5

  **References**:

  **Pattern References**:
  - `src/pages/tccb/PersonnelDetailPage.tsx` - Detail page with tabs, info cards, action buttons
  - `src/pages/tccb/UnitDetailPage.tsx` - Detail page with member list

  **Component References**:
  - `src/components/ui/card.tsx` - Card for info display
  - `src/components/ui/table.tsx` - Table for participants
  - `src/components/ui/badge.tsx` - Badge for status display
  - `src/components/ui/button.tsx` - Action buttons

  **Type References**:
  - `src/types/index.ts:429-449` - TrainingCourse
  - `src/types/index.ts:418-427` - TrainingParticipation

  **Acceptance Criteria**:

  **Automated Verification (Playwright)**:
  ```
  # Agent executes via playwright browser automation:
  1. Navigate to: http://localhost:5173/tccb/training/train-001
  2. Assert: Course name "Đào tạo nâng cao năng lực quản lý dự án" visible
  3. Assert: Participants table visible
  4. Assert: "Thêm nhân sự" button visible
  5. Assert: "Chỉnh sửa" button visible
  6. Click: "Thêm nhân sự" button
  7. Assert: Dialog opens with title containing "Thêm nhân sự"
  8. Screenshot: .sisyphus/evidence/task-6-training-detail.png
  ```

  **Commit**: YES
  - Message: `feat(training): create TrainingDetailPage with participants table`
  - Files: `src/pages/tccb/TrainingDetailPage.tsx`
  - Pre-commit: `bun run build`

---

### Task 7: Create TrainingEditPage

- [ ] 7. Create training course edit page

  **What to do**:
  - Create `src/pages/tccb/TrainingEditPage.tsx`
  - Pre-populate form with existing course data
  - Same fields as TrainingCreatePage
  - Warn if course has participants: "Khóa học đã có X học viên đăng ký"
  - On submit: update course in array, toast success, navigate to detail

  **Must NOT do**:
  - No delete button (use cancel from list page)
  - No changing course ID

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Form UI with pre-population
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Edit form patterns

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 6, 8, 9, 10)
  - **Blocks**: None
  - **Blocked By**: Tasks 4, 5

  **References**:

  **Pattern References**:
  - `src/pages/tccb/PersonnelEditPage.tsx` - Edit page with pre-populated form
  - `src/pages/tccb/TrainingCreatePage.tsx` (Task 4) - Form layout to reuse

  **Acceptance Criteria**:

  **Automated Verification (Playwright)**:
  ```
  # Agent executes via playwright browser automation:
  1. Navigate to: http://localhost:5173/tccb/training/train-001/edit
  2. Assert: Input[name="name"] has value "Đào tạo nâng cao năng lực quản lý dự án"
  3. Assert: Form is pre-populated with course data
  4. Edit: Change location to "Hà Nội - Updated"
  5. Click: Submit button
  6. Assert: Toast "Cập nhật khóa đào tạo thành công" appears
  7. Screenshot: .sisyphus/evidence/task-7-training-edit.png
  ```

  **Commit**: YES
  - Message: `feat(training): create TrainingEditPage with pre-populated form`
  - Files: `src/pages/tccb/TrainingEditPage.tsx`
  - Pre-commit: `bun run build`

---

### Task 8: Create EnrollPersonnelDialog

- [ ] 8. Create personnel enrollment dialog

  **What to do**:
  - Create `src/components/training/EnrollPersonnelDialog.tsx`
  - Combobox to search/select personnel
  - Filter out already enrolled personnel
  - Validate: capacity not exceeded, registration window open, course status = open
  - On confirm: add TrainingParticipation to course.participants, toast success
  - Show clear error messages for validation failures

  **Must NOT do**:
  - No bulk enrollment
  - No creating new personnel from this dialog

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Dialog with combobox and validation
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Dialog patterns, combobox UX

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 6, 7, 9, 10)
  - **Blocks**: Task 11
  - **Blocked By**: Tasks 2, 6

  **References**:

  **Pattern References**:
  - `src/components/contracts/ContractExtensionDialog.tsx` - Dialog with form inputs and validation
  - `src/components/contracts/AddAppendixDialog.tsx` - Dialog pattern with controlled inputs

  **Component References**:
  - `src/components/ui/dialog.tsx` - Dialog, DialogContent, DialogHeader, etc.
  - `src/components/ui/combobox.tsx` - Combobox for personnel search

  **Utility References**:
  - `src/utils/training-helpers.ts:canEnroll()` (Task 2) - Validation function

  **Data References**:
  - `src/data/personnel.json` - Personnel list for selection

  **Acceptance Criteria**:

  **Automated Verification (Playwright)**:
  ```
  # Agent executes via playwright browser automation:
  1. Navigate to: http://localhost:5173/tccb/training/train-003 (status: open)
  2. Click: "Thêm nhân sự" button
  3. Assert: Dialog visible with "Thêm nhân sự vào khóa đào tạo"
  4. Click: Combobox to open personnel list
  5. Select: First available personnel
  6. Click: Confirm button
  7. Assert: Toast success message appears
  8. Assert: New participant appears in table
  9. Screenshot: .sisyphus/evidence/task-8-enroll-dialog.png
  ```

  **Commit**: YES
  - Message: `feat(training): create EnrollPersonnelDialog with validation`
  - Files: `src/components/training/EnrollPersonnelDialog.tsx`
  - Pre-commit: `bun run build`

---

### Task 9: Create UpdateProgressDialog

- [ ] 9. Create participant progress update dialog

  **What to do**:
  - Create `src/components/training/UpdateProgressDialog.tsx`
  - Show current status, dropdown to select new status
  - Validate status transitions: registered → studying → completed/dropped
  - If new status = "completed": auto-generate certificate, add to personnel.certificates
  - Optional notes field
  - On confirm: update participation status, toast success

  **Must NOT do**:
  - No attendance tracking
  - No score/grade entry
  - No file uploads for certificates

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Dialog with status logic
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Dialog patterns, state transitions

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 6, 7, 8, 10)
  - **Blocks**: Task 11
  - **Blocked By**: Tasks 2, 6

  **References**:

  **Pattern References**:
  - `src/components/contracts/ContractTerminationDialog.tsx` - Dialog with status change logic

  **Utility References**:
  - `src/utils/training-helpers.ts:canUpdateStatus()` (Task 2) - Status transition validation
  - `src/utils/training-helpers.ts:createCertificateFromCourse()` (Task 2) - Certificate generation

  **Type References**:
  - `src/types/index.ts:71-76` - ParticipantStatus enum
  - `src/types/index.ts:227-236` - Certificate interface

  **Acceptance Criteria**:

  **Automated Verification (Playwright)**:
  ```
  # Agent executes via playwright browser automation:
  1. Navigate to: http://localhost:5173/tccb/training/train-004 (with sample participants)
  2. Click: Row action on participant with status "studying"
  3. Click: "Cập nhật tiến trình" option
  4. Assert: Dialog visible with current status shown
  5. Select: New status "Hoàn thành" (completed)
  6. Click: Confirm button
  7. Assert: Toast "Cập nhật tiến trình thành công" appears
  8. Assert: Participant status badge shows "Hoàn thành"
  9. Screenshot: .sisyphus/evidence/task-9-progress-dialog.png
  ```

  **Commit**: YES
  - Message: `feat(training): create UpdateProgressDialog with certificate auto-issuance`
  - Files: `src/components/training/UpdateProgressDialog.tsx`
  - Pre-commit: `bun run build`

---

### Task 10: Update Sidebar Navigation

- [ ] 10. Add training sub-items to sidebar

  **What to do**:
  - Add "Tạo khóa đào tạo" sub-item under Đào tạo section
  - Link to `/tccb/training/new`
  - Keep existing "Danh sách khóa đào tạo" link

  **Must NOT do**:
  - No reorganizing other navigation items
  - No icons changes

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple navigation update
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Navigation patterns

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 6, 7, 8, 9)
  - **Blocks**: None
  - **Blocked By**: Task 5

  **References**:

  **Pattern References**:
  - `src/components/layout/AppLayout.tsx` - Sidebar navigation structure

  **Acceptance Criteria**:

  **Automated Verification (Playwright)**:
  ```
  # Agent executes via playwright browser automation:
  1. Navigate to: http://localhost:5173/tccb/dashboard
  2. Assert: Sidebar contains "Đào tạo" section
  3. Expand: "Đào tạo" section if collapsed
  4. Assert: "Tạo khóa đào tạo" link visible
  5. Click: "Tạo khóa đào tạo"
  6. Assert: URL is http://localhost:5173/tccb/training/new
  7. Screenshot: .sisyphus/evidence/task-10-sidebar.png
  ```

  **Commit**: YES
  - Message: `feat(training): add create course link to sidebar navigation`
  - Files: `src/components/layout/AppLayout.tsx`
  - Pre-commit: `bun run build`

---

### Task 11: Integration Testing & Bug Fixes

- [ ] 11. Full integration testing and bug fixes

  **What to do**:
  - Run complete end-to-end flow via Playwright
  - Test: Create course → View detail → Enroll personnel → Update progress → Verify certificate
  - Fix any issues discovered
  - Verify all routes work correctly
  - Verify data persistence within session
  - Run final build verification

  **Must NOT do**:
  - No new features
  - No refactoring beyond bug fixes

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: E2E testing with browser automation
  - **Skills**: [`playwright`, `frontend-ui-ux`]
    - `playwright`: Browser automation for testing
    - `frontend-ui-ux`: Understanding of expected UI behavior

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential (Wave 4)
  - **Blocks**: None (final task)
  - **Blocked By**: Tasks 8, 9, 10

  **References**:

  **All Previous Tasks**: Review all created/modified files

  **Acceptance Criteria**:

  **Automated Verification (Playwright)**:
  ```
  # Agent executes complete E2E flow:
  
  # 1. Verify list page
  1. Navigate to: http://localhost:5173/tccb/training
  2. Assert: Page loads with table
  
  # 2. Create new course
  3. Click: "Tạo khóa đào tạo" button
  4. Fill all required fields
  5. Submit form
  6. Assert: Redirected to list, new course visible
  
  # 3. View detail
  7. Click: New course row
  8. Assert: Detail page shows course info
  
  # 4. Enroll personnel
  9. Click: "Thêm nhân sự"
  10. Select personnel, confirm
  11. Assert: Participant appears in table
  
  # 5. Update progress
  12. Click: Participant row action → "Cập nhật tiến trình"
  13. Change status to "Đang học" (studying)
  14. Confirm
  15. Assert: Status updated
  
  # 6. Complete and verify certificate
  16. Update same participant to "Hoàn thành" (completed)
  17. Assert: Success toast appears
  
  # 7. Final build check
  bun run build
  # Assert: Exit code 0
  ```

  **Evidence to Capture**:
  - [ ] Screenshot: .sisyphus/evidence/task-11-e2e-complete.png
  - [ ] Build log output

  **Commit**: YES
  - Message: `fix(training): integration fixes and verification`
  - Files: Any files with fixes
  - Pre-commit: `bun run build`

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 1 | `feat(training): add complete TrainingCourse fields to training.json` | `src/data/training.json` | `bun run build` |
| 2 | `feat(training): add training-helpers.ts utility functions` | `src/utils/training-helpers.ts` | `bun run build` |
| 3 | `feat(training): enhance TrainingListPage with actions and year filter` | `src/pages/tccb/TrainingListPage.tsx` | `bun run build` |
| 4, 5 | `feat(training): add TrainingCreatePage and routes` | `src/pages/tccb/TrainingCreatePage.tsx`, `src/router.tsx` | `bun run build` |
| 6 | `feat(training): create TrainingDetailPage with participants table` | `src/pages/tccb/TrainingDetailPage.tsx` | `bun run build` |
| 7 | `feat(training): create TrainingEditPage with pre-populated form` | `src/pages/tccb/TrainingEditPage.tsx` | `bun run build` |
| 8 | `feat(training): create EnrollPersonnelDialog with validation` | `src/components/training/EnrollPersonnelDialog.tsx` | `bun run build` |
| 9 | `feat(training): create UpdateProgressDialog with certificate auto-issuance` | `src/components/training/UpdateProgressDialog.tsx` | `bun run build` |
| 10 | `feat(training): add create course link to sidebar navigation` | `src/components/layout/AppLayout.tsx` | `bun run build` |
| 11 | `fix(training): integration fixes and verification` | Various | `bun run build` |

---

## Success Criteria

### Verification Commands
```bash
# Build verification
bun run build
# Expected: Exit code 0, no errors

# Type checking
bun run typecheck  # if script exists, otherwise tsc --noEmit
# Expected: No type errors
```

### Final Checklist
- [ ] All 11 tasks completed
- [ ] All "Must Have" present:
  - [x] CRUD for training courses
  - [x] Personnel enrollment
  - [x] Progress tracking
  - [x] Certificate auto-issuance
  - [x] Year filter
  - [x] Capacity enforcement
  - [x] Registration window enforcement
- [ ] All "Must NOT Have" absent:
  - [x] No TrainingPlan CRUD
  - [x] No employee self-registration
  - [x] No waitlists/approvals
  - [x] No file uploads
  - [x] No new state libraries
- [ ] Build passes with 0 errors
- [ ] All routes accessible
- [ ] E2E flow verified via Playwright

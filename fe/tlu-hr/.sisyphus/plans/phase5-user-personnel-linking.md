# Phase 5 Completion: User-Personnel Linking & Config Integration

## TL;DR

> **Quick Summary**: Complete Phase 5 by linking users to personnel records and ensuring configuration values are used across the application.
> 
> **Deliverables**:
> - Users linked to personnel via `personnelId` field
> - Personnel selector in User Create/Edit pages
> - Training pages using `training-types.json` config
> 
> **Estimated Effort**: Short (1-2 hours)
> **Parallel Execution**: YES - 2 waves
> **Critical Path**: Task 1 → Task 2/3/4 → Task 5/6 → Task 7

---

## Context

### Original Request
User requested:
1. Link users to personnel records (currently users are not connected to personnel)
2. Ensure configuration values are used in other modules (training pages, etc.)

### Current State
**Users.json** (2 users without personnelId):
```json
{
  "id": "user-002",
  "username": "tccb",
  "fullName": "Cán bộ Phòng TCCB",
  // NO personnelId field
}
```

**Personnel.json** (3 personnel records):
- `pers-001`: Nguyễn Văn An (CB001)
- `pers-002`: Trần Thị Bình (CB002)
- `pers-003`: Lê Văn Cường (CB003)

**Training pages**: Using hardcoded values instead of `training-types.json`

### Config Files Available
- `src/data/config/training-types.json` - 4 training types
- `src/data/config/business-catalogs.json` - 6 catalog categories

---

## Work Objectives

### Core Objective
Link users to personnel records and integrate configuration data across the application.

### Concrete Deliverables
- `src/data/users.json` - Updated with personnelId links
- `src/pages/admin/UserCreatePage.tsx` - Personnel selector added
- `src/pages/admin/UserEditPage.tsx` - Personnel selector and display added
- `src/pages/admin/UserListPage.tsx` - Shows linked personnel info
- `src/pages/tccb/TrainingCreatePage.tsx` - Uses training-types.json
- `src/pages/tccb/TrainingEditPage.tsx` - Uses training-types.json

### Definition of Done
- [x] All users can optionally link to a personnel record
- [x] Personnel selector shows available (unlinked) personnel
- [x] Training type dropdown uses config values
- [x] Build passes: `bun run build` exits 0

### Must Have
- Personnel selector is optional (user can exist without personnel link)
- Show personnel name and employee code in user list
- Training type values come from config file

### Must NOT Have (Guardrails)
- NO backend APIs - in-memory only
- NO localStorage persistence
- NO breaking existing functionality
- NO RBAC changes

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: YES (bun test available)
- **Automated tests**: NO (not requested)
- **Framework**: bun test

### Agent-Executed QA Scenarios (MANDATORY)

**Scenario 1: User-Personnel Link Display**
```
Tool: Playwright
Preconditions: Dev server running on localhost:5173
Steps:
  1. Navigate to: http://localhost:5173/login
  2. Fill: input[name="username"] → "admin"
  3. Fill: input[name="password"] → "Admin123"
  4. Click: button[type="submit"]
  5. Navigate to: /admin/users
  6. Assert: Table shows "Cán bộ liên kết" column
  7. Assert: User "tccb" row shows personnel info
  8. Screenshot: .sisyphus/evidence/task-4-user-list-personnel.png
Expected Result: User list shows linked personnel information
Evidence: .sisyphus/evidence/task-4-user-list-personnel.png
```

**Scenario 2: Personnel Selector in User Edit**
```
Tool: Playwright
Preconditions: Logged in as admin
Steps:
  1. Navigate to: /admin/users/user-001/edit
  2. Wait for: form visible
  3. Assert: Personnel selector combobox exists
  4. Click: Personnel selector trigger
  5. Assert: Dropdown shows available personnel
  6. Screenshot: .sisyphus/evidence/task-3-personnel-selector.png
Expected Result: Personnel selector works correctly
Evidence: .sisyphus/evidence/task-3-personnel-selector.png
```

**Scenario 3: Training Type Config Integration**
```
Tool: Playwright
Preconditions: Logged in as admin or tccb
Steps:
  1. Navigate to: /tccb/training/new
  2. Wait for: form visible
  3. Click: Training type selector
  4. Assert: Options include "Đào tạo trong nước" (from config)
  5. Assert: Options include "Đào tạo nước ngoài" (from config)
  6. Assert: Options include "Đào tạo ngắn hạn" (from config)
  7. Assert: Options include "Đào tạo dài hạn" (from config)
  8. Screenshot: .sisyphus/evidence/task-5-training-types.png
Expected Result: Training types come from config file
Evidence: .sisyphus/evidence/task-5-training-types.png
```

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately):
└── Task 1: Update users.json data [no dependencies]

Wave 2 (After Wave 1):
├── Task 2: UserCreatePage - add personnel selector
├── Task 3: UserEditPage - add personnel selector
├── Task 4: UserListPage - show personnel info
├── Task 5: TrainingCreatePage - use config
└── Task 6: TrainingEditPage - use config

Wave 3 (After Wave 2):
└── Task 7: Verify build and commit

Critical Path: Task 1 → Tasks 2-6 (parallel) → Task 7
Parallel Speedup: ~50% faster than sequential
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 1 | None | 2, 3, 4 | None |
| 2 | 1 | 7 | 3, 4, 5, 6 |
| 3 | 1 | 7 | 2, 4, 5, 6 |
| 4 | 1 | 7 | 2, 3, 5, 6 |
| 5 | None | 7 | 2, 3, 4, 6 |
| 6 | None | 7 | 2, 3, 4, 5 |
| 7 | 2, 3, 4, 5, 6 | None | None (final) |

---

## TODOs

- [x] 1. Update users.json with personnel links

  **What to do**:
  - Add `personnelId` field to all users
  - Link `user-002` (tccb) to `pers-001` (Nguyễn Văn An)
  - Add 2 more users linked to pers-002 and pers-003
  - Keep `user-001` (admin) with `personnelId: null` (system admin has no personnel record)

  **Must NOT do**:
  - Do not change existing user IDs
  - Do not modify personnel.json

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple JSON data update
  - **Skills**: [`git-master`]
    - `git-master`: For proper commit handling

  **Parallelization**:
  - **Can Run In Parallel**: NO (must complete first)
  - **Parallel Group**: Wave 1
  - **Blocks**: Tasks 2, 3, 4
  - **Blocked By**: None

  **References**:
  - `src/data/users.json` - Current user data (2 users)
  - `src/data/personnel.json` - Personnel IDs: pers-001, pers-002, pers-003
  - `src/types/index.ts:147` - User interface with `personnelId?: string`

  **Updated users.json content**:
  ```json
  [
    {
      "id": "user-001",
      "username": "admin",
      "password": "Admin123",
      "fullName": "Quản trị viên hệ thống",
      "email": "admin@tlu.edu.vn",
      "role": "system_admin",
      "status": "active",
      "personnelId": null,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    },
    {
      "id": "user-002",
      "username": "tccb",
      "password": "Tccb1234",
      "fullName": "Nguyễn Văn An",
      "email": "an.nv@tlu.edu.vn",
      "role": "tccb_officer",
      "status": "active",
      "personnelId": "pers-001",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    },
    {
      "id": "user-003",
      "username": "binh.tt",
      "password": "Binh1234",
      "fullName": "Trần Thị Bình",
      "email": "binh.tt@tlu.edu.vn",
      "role": "employee",
      "status": "active",
      "personnelId": "pers-002",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    },
    {
      "id": "user-004",
      "username": "cuong.lv",
      "password": "Cuong1234",
      "fullName": "Lê Văn Cường",
      "email": "cuong.lv@tlu.edu.vn",
      "role": "employee",
      "status": "active",
      "personnelId": "pers-003",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
  ```

  **Acceptance Criteria**:
  - [x] users.json contains 4 users
  - [x] Each user has `personnelId` field (null or string)
  - [x] user-002 links to pers-001
  - [x] user-003 links to pers-002
  - [x] user-004 links to pers-003

  **Commit**: NO (groups with Task 7)

---

- [x] 2. Add personnel selector to UserCreatePage

  **What to do**:
  - Import personnel data from `@/data/personnel.json`
  - Add optional personnel selector (Combobox or Select)
  - Filter to show only personnel not already linked to a user
  - Include `personnelId` in new user creation
  - Display personnel name and employee code in dropdown

  **Must NOT do**:
  - Do not make personnel selection required
  - Do not change form validation

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI component with combobox functionality
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: For proper combobox/select implementation

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 3, 4, 5, 6)
  - **Blocks**: Task 7
  - **Blocked By**: Task 1

  **References**:
  - `src/pages/admin/UserCreatePage.tsx:1-192` - Current create page
  - `src/data/personnel.json` - Personnel data with id, employeeCode, fullName
  - `src/data/users.json` - To check which personnel are already linked
  - `src/components/ui/select.tsx` - Select component pattern

  **Implementation approach**:
  ```tsx
  // Add imports
  import personnelData from "@/data/personnel.json";
  import type { Personnel } from "@/types";

  // Filter available personnel (not linked to any user)
  const availablePersonnel = useMemo(() => {
    const linkedIds = new Set((usersData as User[]).map(u => u.personnelId).filter(Boolean));
    return (personnelData as Personnel[]).filter(p => !linkedIds.has(p.id));
  }, []);

  // Add personnelId to form state
  const [formData, setFormData] = useState({
    // ... existing fields
    personnelId: "" as string | null,
  });

  // Add Select component after role selector
  <div className="space-y-2">
    <Label>Cán bộ liên kết (tùy chọn)</Label>
    <Select 
      value={formData.personnelId || ""} 
      onValueChange={(v) => handleChange("personnelId", v || null)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Chọn cán bộ..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">Không liên kết</SelectItem>
        {availablePersonnel.map((p) => (
          <SelectItem key={p.id} value={p.id}>
            {p.employeeCode} - {p.fullName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
  ```

  **Acceptance Criteria**:
  - [x] Personnel selector appears in create form
  - [x] Shows only unlinked personnel
  - [x] "Không liên kết" option exists
  - [x] New user creation includes personnelId

  **Agent-Executed QA Scenarios**:
  ```
  Scenario: Personnel selector in create form
    Tool: Playwright
    Steps:
      1. Login as admin
      2. Navigate to /admin/users/new
      3. Assert: Select with label "Cán bộ liên kết" visible
      4. Click selector trigger
      5. Assert: "Không liên kết" option exists
      6. Screenshot evidence
    Evidence: .sisyphus/evidence/task-2-create-selector.png
  ```

  **Commit**: NO (groups with Task 7)

---

- [x] 3. Add personnel selector and display to UserEditPage

  **What to do**:
  - Import personnel data
  - Show current linked personnel info (if any)
  - Add personnel selector to change link
  - Filter available personnel (include current + unlinked)
  - Update user on save

  **Must NOT do**:
  - Do not change lock/unlock functionality
  - Do not modify password reset logic

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI component with display and selection
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 2, 4, 5, 6)
  - **Blocks**: Task 7
  - **Blocked By**: Task 1

  **References**:
  - `src/pages/admin/UserEditPage.tsx:1-250` - Current edit page
  - `src/data/personnel.json` - Personnel data
  - `src/data/users.json` - User data with personnelId

  **Implementation approach**:
  ```tsx
  // Add to formData state
  const [formData, setFormData] = useState({
    // existing...
    personnelId: initialUser?.personnelId ?? null,
  });

  // Get available personnel (current user's personnel + unlinked)
  const availablePersonnel = useMemo(() => {
    const linkedIds = new Set(
      users
        .filter(u => u.id !== id) // exclude current user
        .map(u => u.personnelId)
        .filter(Boolean)
    );
    return (personnelData as Personnel[]).filter(
      p => p.id === initialUser?.personnelId || !linkedIds.has(p.id)
    );
  }, [id, initialUser]);

  // Find current personnel
  const currentPersonnel = personnelData.find(
    p => p.id === formData.personnelId
  );
  ```

  **Acceptance Criteria**:
  - [x] Shows current linked personnel (name + code)
  - [x] Personnel selector works
  - [x] Can change or remove link
  - [x] Save updates personnelId

  **Commit**: NO (groups with Task 7)

---

- [x] 4. Update UserListPage to show personnel info

  **What to do**:
  - Import personnel data
  - Add "Cán bộ liên kết" column to table
  - Display personnel name and employee code
  - Show "-" for users without personnel link

  **Must NOT do**:
  - Do not change pagination logic
  - Do not change filter functionality

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple column addition
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 7
  - **Blocked By**: Task 1

  **References**:
  - `src/pages/admin/UserListPage.tsx:1-257` - Current list page
  - `src/data/personnel.json` - Personnel lookup

  **Implementation approach**:
  ```tsx
  // Add import
  import personnelData from "@/data/personnel.json";
  import type { Personnel } from "@/types";

  // Helper to get personnel info
  const getPersonnelInfo = (personnelId: string | null | undefined) => {
    if (!personnelId) return null;
    return (personnelData as Personnel[]).find(p => p.id === personnelId);
  };

  // Add column header
  <TableHead>Cán bộ liên kết</TableHead>

  // Add column cell
  <TableCell>
    {(() => {
      const personnel = getPersonnelInfo(user.personnelId);
      return personnel 
        ? `${personnel.employeeCode} - ${personnel.fullName}`
        : <span className="text-muted-foreground">-</span>;
    })()}
  </TableCell>
  ```

  **Acceptance Criteria**:
  - [x] New column "Cán bộ liên kết" in table
  - [x] Shows "CB001 - Nguyễn Văn An" for linked users
  - [x] Shows "-" for users without personnel

  **Commit**: NO (groups with Task 7)

---

- [x] 5. Update TrainingCreatePage to use training-types.json

  **What to do**:
  - Import training types from config: `@/data/config/training-types.json`
  - Replace hardcoded SelectItem values with config data
  - Filter to show only active types
  - Sort by order field

  **Must NOT do**:
  - Do not change form validation
  - Do not change other form fields

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple data source change
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 7
  - **Blocked By**: None

  **References**:
  - `src/pages/tccb/TrainingCreatePage.tsx:135-141` - Hardcoded training types
  - `src/data/config/training-types.json` - Config data

  **Current hardcoded values (lines 135-140)**:
  ```tsx
  <SelectContent>
    <SelectItem value="domestic">Trong nước</SelectItem>
    <SelectItem value="international">Quốc tế</SelectItem>
    <SelectItem value="short_term">Ngắn hạn</SelectItem>
    <SelectItem value="long_term">Dài hạn</SelectItem>
  </SelectContent>
  ```

  **Replace with**:
  ```tsx
  // Add import at top
  import trainingTypesConfig from "@/data/config/training-types.json";

  // Define type
  interface TrainingType {
    id: string;
    code: string;
    name: string;
    isActive: boolean;
    order: number;
  }

  // Filter and sort
  const activeTrainingTypes = (trainingTypesConfig as TrainingType[])
    .filter(t => t.isActive)
    .sort((a, b) => a.order - b.order);

  // In JSX
  <SelectContent>
    {activeTrainingTypes.map((t) => (
      <SelectItem key={t.id} value={t.code}>
        {t.name}
      </SelectItem>
    ))}
  </SelectContent>
  ```

  **Acceptance Criteria**:
  - [x] No hardcoded training type values
  - [x] Types come from training-types.json
  - [x] Only active types shown
  - [x] Dropdown shows: Đào tạo trong nước, Đào tạo nước ngoài, Đào tạo ngắn hạn, Đào tạo dài hạn

  **Commit**: NO (groups with Task 7)

---

- [x] 6. Update TrainingEditPage to use training-types.json

  **What to do**:
  - Same changes as Task 5 for TrainingEditPage
  - Import training types config
  - Replace hardcoded values

  **Must NOT do**:
  - Do not change form validation
  - Do not change save logic

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Same pattern as Task 5
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 7
  - **Blocked By**: None

  **References**:
  - `src/pages/tccb/TrainingEditPage.tsx` - Edit page to update
  - `src/data/config/training-types.json` - Config data
  - Task 5 implementation - Same pattern

  **Acceptance Criteria**:
  - [x] No hardcoded training type values
  - [x] Types come from training-types.json

  **Commit**: NO (groups with Task 7)

---

- [x] 7. Verify build and commit all changes

  **What to do**:
  - Run `bun run build` to verify no errors
  - Stage all changed files
  - Commit with descriptive message

  **Must NOT do**:
  - Do not push to remote unless requested

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Standard verification and commit
  - **Skills**: [`git-master`]
    - `git-master`: For proper commit handling

  **Parallelization**:
  - **Can Run In Parallel**: NO (final task)
  - **Parallel Group**: Wave 3
  - **Blocks**: None
  - **Blocked By**: Tasks 2, 3, 4, 5, 6

  **References**:
  - All modified files from Tasks 1-6

  **Acceptance Criteria**:
  - [x] `bun run build` exits with code 0
  - [x] All changes committed

  **Agent-Executed QA Scenarios**:
  ```
  Scenario: Build verification
    Tool: Bash
    Steps:
      1. Run: bun run build
      2. Assert: exit code 0
      3. Assert: no TypeScript errors in output
    Expected Result: Build succeeds
  ```

  **Commit**: YES
  - Message: `feat(admin): link users to personnel and integrate training config`
  - Files: 
    - `src/data/users.json`
    - `src/pages/admin/UserCreatePage.tsx`
    - `src/pages/admin/UserEditPage.tsx`
    - `src/pages/admin/UserListPage.tsx`
    - `src/pages/tccb/TrainingCreatePage.tsx`
    - `src/pages/tccb/TrainingEditPage.tsx`
  - Pre-commit: `bun run build`

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 7 | `feat(admin): link users to personnel and integrate training config` | All 6 files | `bun run build` |

---

## Success Criteria

### Verification Commands
```bash
bun run build  # Expected: exit 0, no errors
```

### Final Checklist
- [x] Users linked to personnel records
- [x] Personnel selector in User Create/Edit pages
- [x] User list shows personnel info column
- [x] Training pages use config for training types
- [x] Build passes
- [x] All changes committed

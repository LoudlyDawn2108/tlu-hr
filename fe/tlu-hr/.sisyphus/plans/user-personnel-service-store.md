# User-Personnel Service/Store Layer & Page Refactoring

## TL;DR

> **Quick Summary**: Create localStorage-backed service + Zustand store layers for User and Personnel modules, refactor 7 pages from direct JSON imports to store-driven architecture, fix the auth bug (newly created users can't log in), add personnel→user reverse lookup in PersonnelDetailPage, and add optional auto-user-creation in PersonnelCreatePage.
> 
> **Deliverables**:
> - 4 new files: `user.service.ts`, `personnel.service.ts`, `user.store.ts`, `personnel.store.ts`
> - 1 type addition: `UserWithPassword` in `types/index.ts`
> - 7 refactored pages: UserList, UserCreate, UserEdit, PersonnelList, PersonnelCreate, PersonnelDetail, PersonnelEdit
> - 1 fixed store: `auth.ts` reads from `userService` instead of static JSON
> - 1 new UI section: "Tài khoản hệ thống" in PersonnelDetailPage (reverse lookup)
> - 1 new UI feature: Optional auto-create user account in PersonnelCreatePage
> 
> **Estimated Effort**: Large (6-8 hours)
> **Parallel Execution**: YES - 5 waves
> **Critical Path**: Task 1 → Task 2/3 → Task 4/5 → Task 6 → Tasks 7-13 (parallel) → Task 14

---

## Context

### Original Request
Create a service/store architecture for User and Personnel modules following the existing `config.service.ts`/`config.store.ts` pattern. Refactor all user and personnel management pages to use stores instead of direct JSON imports. Fix the authentication bug where newly created users cannot log in. Add bidirectional visibility between users and personnel (reverse lookup). Optionally auto-create user accounts when creating personnel records.

### Interview Summary
**Key Discussions**:
- Follow existing `config.service.ts`/`config.store.ts` patterns exactly (localStorage-backed CRUD, delay simulation, Zustand stores)
- NO TanStack Query — project uses Zustand stores wrapping services, not React Query
- NO JWT, NO password hashing — mock backend with plaintext passwords
- One-way data relationship: User→Personnel via `personnelId`. NO `userId` on Personnel type. Reverse lookup via user store query.
- Need `UserWithPassword` type since `User` interface (lines 140-151 of types/index.ts) lacks `password` field but JSON data has it
- Auth store must switch from static JSON import to `userService.getAll()` — this is the critical bug fix
- Replace `Date.now()` IDs with `crypto.randomUUID()` in all in-scope files
- PersonnelDetailPage needs new section showing linked user account info (reverse lookup from user store)
- PersonnelCreatePage should offer optional auto-create user account feature
- `personnelId: null` in JSON must be normalized to `undefined` when returning `User` type from service

### Research Findings
- **Config service pattern** (`src/services/config.service.ts`, 50 lines): `STORAGE_KEYS` object, `DELAY_MS = 500`, generic `delay<T>` helper, lazy seed from JSON on first read, bulk get/save methods, all async
- **Config store pattern** (`src/stores/config.store.ts`, 64 lines): Zustand `create<State>` with `isLoading: boolean`, `error: string | null`, data arrays, async `fetch*/update*` actions with `set({ isLoading: true, error: null })` → try/catch → `set({ data, isLoading: false })`
- **User pages** all import `usersData` from `@/data/users.json` directly, mutate in-memory via `push()` or direct property assignment — changes lost on page refresh
- **Personnel pages** all import `personnelData` from `@/data/personnel.json` directly, some mutations are no-ops (PersonnelListPage termination just shows toast), PersonnelEditPage validates but NEVER persists
- **Auth store** (`src/stores/auth.ts`, 95 lines): imports `mockUsers` from `users.json` directly — newly created users can't log in because auth reads from original JSON import, not from localStorage
- **Type system**: `User.personnelId?: string` (line 147), `Personnel` has NO `userId` (50+ fields, lines 358-412)
- **Data**: `users.json` has 4 users with plaintext passwords, `personnel.json` has 3 records
- **File naming convention**: dot notation — `config.service.ts`, NOT `configService.ts`

### Metis Review
**Identified Gaps** (addressed):
1. **14 files import personnelData, not just 4**: ContractCreatePage, ContractListPage, DashboardPage, OrganizationPage, UnitDetailPage, TrainingDetailPage, EnrollPersonnelDialog also import personnel JSON. → **Resolution**: Defer these 7 read-only consumers to a follow-up task (they only need seed data for display). Document as known limitation.
2. **`null` vs `undefined` for personnelId**: JSON uses `null`, TypeScript uses `?` (undefined). → **Resolution**: Service layer normalizes `null` → `undefined` when returning `User` type. `UserWithPassword` keeps `string | null` for storage, `User` gets `string | undefined`.
3. **PersonnelCreatePage pushes to BOTH personnelData AND contractsData**: → **Resolution**: Contract data management is explicitly OUT of scope. PersonnelCreatePage will persist personnel via `personnelService` but keep contract push as-is (existing behavior, not a regression).
4. **Auth + User stores race condition on same localStorage key**: → **Resolution**: Auth store's `login()` calls `userService.getAll()` directly, does not maintain separate cache. User store is single source of truth.
5. **`as any` in PersonnelDetailPage line 46**: → **Resolution**: Remove during refactoring, use proper type casting.
6. **employeeCode generation**: Keep `CB${Date.now().toString().slice(-6)}` pattern for human-readable codes; only replace `Date.now()` for `id` fields with `crypto.randomUUID()`.
7. **Auto-user-creation defaults**: Username derived from `workEmail` (before `@`), default password `TLU@` + random 4 digits, default role `employee`, implemented as collapsible section in wizard Step 8 (Review).

---

## Work Objectives

### Core Objective
Replace direct JSON import/mutation with a persistent localStorage-backed service/store architecture for User and Personnel modules, fix the authentication bug, and add cross-module visibility.

### Concrete Deliverables
- `src/services/user.service.ts` — localStorage-backed CRUD for users (with password handling)
- `src/services/personnel.service.ts` — localStorage-backed CRUD for personnel
- `src/stores/user.store.ts` — Zustand store wrapping user service
- `src/stores/personnel.store.ts` — Zustand store wrapping personnel service
- `src/types/index.ts` — `UserWithPassword` type addition
- `src/stores/auth.ts` — Fixed to use `userService` instead of static JSON
- `src/pages/admin/UserListPage.tsx` — Refactored to use `useUserStore` + `usePersonnelStore`
- `src/pages/admin/UserCreatePage.tsx` — Refactored to use stores, `crypto.randomUUID()` IDs
- `src/pages/admin/UserEditPage.tsx` — Refactored to use stores
- `src/pages/tccb/PersonnelListPage.tsx` — Refactored to use `usePersonnelStore`, working termination
- `src/pages/tccb/PersonnelCreatePage.tsx` — Refactored to use store, optional auto-user-creation
- `src/pages/tccb/PersonnelDetailPage.tsx` — Refactored to use stores, new "Tài khoản hệ thống" section
- `src/pages/tccb/PersonnelEditPage.tsx` — Refactored to use store, actually persists changes

### Definition of Done
- [ ] `npm run build` exits with code 0 (zero TypeScript errors)
- [ ] `npm run lint` exits with code 0
- [ ] No `import ... from "@/data/users.json"` in any refactored file
- [ ] No `import ... from "@/data/personnel.json"` in any of the 7 refactored pages
- [ ] No `as any` in any refactored file
- [ ] No `Date.now()` for ID generation in any refactored file
- [ ] Newly created users can log in (auth bug fixed)
- [ ] Data persists across page reloads via localStorage
- [ ] PersonnelDetailPage shows linked user account info
- [ ] PersonnelEditPage actually saves changes

### Must Have
- Exact replication of `config.service.ts` / `config.store.ts` patterns
- `crypto.randomUUID()` for all new entity IDs
- `UserWithPassword` type for service-layer password handling
- Auth store reads from `userService.getAll()`, not static JSON
- All CRUD operations persist to localStorage
- Reverse lookup: PersonnelDetailPage queries user store to find linked user
- Error handling in submit handlers: stay on page if store action fails

### Must NOT Have (Guardrails)
- NO code comments in source files
- NO `as any`, `@ts-ignore`, `@ts-expect-error`
- NO TanStack Query / React Query
- NO JWT tokens or authentication complexity
- NO password hashing — keep plaintext for mock backend
- NO modification of `Personnel` type (no `userId` field added)
- NO contract service/store (out of scope)
- NO refactoring of the 7 additional `personnelData` consumers (DashboardPage, ContractListPage, ContractCreatePage, OrganizationPage, UnitDetailPage, TrainingDetailPage, EnrollPersonnelDialog) — deferred to follow-up
- NO modifications to wizard step components (Step1BasicInfo through Step8Review) — they receive props and don't need store awareness
- NO loading spinners/skeletons unless existing page pattern already has them
- NO changes to `employeeCode` generation strategy (keep `CB` + timestamp suffix for human readability)

---

## Verification Strategy

> **UNIVERSAL RULE: ZERO HUMAN INTERVENTION**
>
> ALL tasks in this plan MUST be verifiable WITHOUT any human action.
> This is NOT conditional — it applies to EVERY task, regardless of test strategy.

### Test Decision
- **Infrastructure exists**: NO (no test framework configured for unit tests)
- **Automated tests**: NO
- **Framework**: none
- **Agent-Executed QA**: ALWAYS (mandatory for all tasks)

### Agent-Executed QA Scenarios (MANDATORY — ALL tasks)

> Without TDD, QA scenarios are the PRIMARY verification method.
> The executing agent DIRECTLY verifies the deliverable by running it.

**Verification Tool by Deliverable Type:**

| Type | Tool | How Agent Verifies |
|------|------|-------------------|
| **Service/Store files** | Bash (`npm run build`) | TypeScript compiles without errors |
| **Page refactoring** | Playwright | Navigate, interact, assert DOM, screenshot |
| **Auth bug fix** | Playwright | Create user → logout → login as new user |
| **Reverse lookup** | Playwright | Navigate to PersonnelDetailPage → assert user account section |
| **Data persistence** | Playwright | Create entity → reload page → entity still visible |

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately):
└── Task 1: Add UserWithPassword type to types/index.ts [no dependencies]

Wave 2 (After Wave 1):
├── Task 2: Create user.service.ts [depends: 1]
└── Task 3: Create personnel.service.ts [no strict dependency, but same pattern]

Wave 3 (After Wave 2):
├── Task 4: Create user.store.ts [depends: 2]
├── Task 5: Create personnel.store.ts [depends: 3]
└── Task 6: Fix auth.ts to use userService [depends: 2]

Wave 4 (After Wave 3):
├── Task 7: Refactor UserListPage [depends: 4, 5]
├── Task 8: Refactor UserCreatePage [depends: 4, 5]
├── Task 9: Refactor UserEditPage [depends: 4, 5]
├── Task 10: Refactor PersonnelListPage [depends: 5]
├── Task 11: Refactor PersonnelCreatePage [depends: 4, 5]
├── Task 12: Refactor PersonnelDetailPage [depends: 4, 5]
└── Task 13: Refactor PersonnelEditPage [depends: 5]

Wave 5 (After Wave 4):
└── Task 14: Final build verification, lint check, and commit

Critical Path: Task 1 → Task 2 → Task 4 → Task 8 (most complex page) → Task 14
Parallel Speedup: ~60% faster than sequential
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 1 | None | 2, 3 | None |
| 2 | 1 | 4, 6 | 3 |
| 3 | 1 | 5 | 2 |
| 4 | 2 | 7, 8, 9, 11, 12 | 5, 6 |
| 5 | 3 | 7, 8, 10, 11, 12, 13 | 4, 6 |
| 6 | 2 | 14 | 4, 5 |
| 7 | 4, 5 | 14 | 8, 9, 10, 11, 12, 13 |
| 8 | 4, 5 | 14 | 7, 9, 10, 11, 12, 13 |
| 9 | 4, 5 | 14 | 7, 8, 10, 11, 12, 13 |
| 10 | 5 | 14 | 7, 8, 9, 11, 12, 13 |
| 11 | 4, 5 | 14 | 7, 8, 9, 10, 12, 13 |
| 12 | 4, 5 | 14 | 7, 8, 9, 10, 11, 13 |
| 13 | 5 | 14 | 7, 8, 9, 10, 11, 12 |
| 14 | 7-13 | None | None (final) |

### Agent Dispatch Summary

| Wave | Tasks | Recommended Dispatch |
|------|-------|---------------------|
| 1 | 1 | `delegate_task(category="quick", ...)` |
| 2 | 2, 3 | `delegate_task(category="unspecified-low", ...)` — parallel |
| 3 | 4, 5, 6 | `delegate_task(category="unspecified-low", ...)` — parallel |
| 4 | 7-13 | `delegate_task(category="unspecified-high", ...)` — parallel (7 tasks) |
| 5 | 14 | `delegate_task(category="quick", load_skills=["git-master"], ...)` |

---

## TODOs

- [ ] 1. Add `UserWithPassword` type to `src/types/index.ts`

  **What to do**:
  - Add `UserWithPassword` type that extends `User` with a `password` field
  - Must be exported
  - Must use `import type` compatible syntax
  - Place it directly after the `User` interface (after line 151)

  **Exact change**:
  ```typescript
  export type UserWithPassword = User & { password: string }
  ```

  **Must NOT do**:
  - Do not modify the existing `User` interface
  - Do not add `userId` to `Personnel` interface
  - Do not add code comments

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single line addition to types file
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: No UI work involved

  **Parallelization**:
  - **Can Run In Parallel**: NO (must complete first — all services depend on this type)
  - **Parallel Group**: Wave 1
  - **Blocks**: Tasks 2, 3
  - **Blocked By**: None

  **References**:
  - `src/types/index.ts:140-151` — `User` interface definition. Place `UserWithPassword` after line 151.
  - `src/data/users.json` — JSON has `password` field on all user objects; this type makes that explicit.

  **Acceptance Criteria**:
  - [ ] `grep "UserWithPassword" src/types/index.ts` returns at least 1 match
  - [ ] `npm run build` exits with code 0
  - [ ] Type is exported and includes `password: string`

  **Agent-Executed QA Scenarios**:
  ```
  Scenario: Type compiles correctly
    Tool: Bash
    Steps:
      1. Run: npm run build
      2. Assert: exit code 0
      3. Assert: no errors mentioning "UserWithPassword"
    Expected Result: Build succeeds with new type
    Evidence: Build output captured
  ```

  **Commit**: NO (groups with Task 14)

---

- [ ] 2. Create `src/services/user.service.ts`

  **What to do**:
  - Create localStorage-backed CRUD service for users following `config.service.ts` pattern exactly
  - Import seed data from `@/data/users.json`
  - Import `UserWithPassword` type from `@/types`
  - Storage key: `tlu_hr_users`
  - Delay: 500ms simulation
  - Lazy seed: on first `getAll()`, if localStorage key doesn't exist, seed from JSON
  - Normalize `personnelId: null` → `undefined` is NOT needed at service level (service stores `UserWithPassword` which includes `null`); normalization happens when consumer strips password and converts to `User`
  - Methods:
    - `getAll(): Promise<UserWithPassword[]>` — returns all users from localStorage
    - `getById(id: string): Promise<UserWithPassword | null>` — find by ID
    - `create(user: Omit<UserWithPassword, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserWithPassword>` — generates `crypto.randomUUID()` ID, timestamps
    - `update(id: string, data: Partial<UserWithPassword>): Promise<UserWithPassword>` — updates `updatedAt`
    - `remove(id: string): Promise<void>` — removes user from array
    - `saveAll(users: UserWithPassword[]): Promise<UserWithPassword[]>` — bulk save (for compatibility with config pattern)

  **Must NOT do**:
  - Do not hash passwords
  - Do not add JWT handling
  - Do not validate password format (that's the form's job)
  - Do not add code comments
  - Do not deviate from `config.service.ts` pattern

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
    - Reason: Straightforward file creation following established pattern
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Task 3)
  - **Blocks**: Tasks 4, 6
  - **Blocked By**: Task 1

  **References**:

  **Pattern References** (MUST follow exactly):
  - `src/services/config.service.ts:1-50` — GOLD STANDARD. Replicate: `STORAGE_KEYS` object, `DELAY_MS = 500`, `delay<T>` generic function, lazy seed pattern (`getItem` → if null → set from JSON → return), all methods async returning `Promise<T>`

  **API/Type References**:
  - `src/types/index.ts:140-151` — `User` interface (the public-facing type without password)
  - `src/types/index.ts:~152` — `UserWithPassword` type (what the service stores/returns internally)
  - `src/data/users.json` — Seed data. 4 users with `id`, `username`, `password`, `fullName`, `email`, `role`, `status`, `personnelId`, `createdAt`, `updatedAt`

  **Acceptance Criteria**:
  - [ ] File exists at `src/services/user.service.ts`
  - [ ] `grep "tlu_hr_users" src/services/user.service.ts` returns match
  - [ ] `grep "crypto.randomUUID" src/services/user.service.ts` returns match
  - [ ] `grep "DELAY_MS" src/services/user.service.ts` returns match
  - [ ] `npm run build` exits with code 0

  **Agent-Executed QA Scenarios**:
  ```
  Scenario: Service file compiles and follows pattern
    Tool: Bash
    Steps:
      1. Run: npm run build
      2. Assert: exit code 0
      3. Run: grep -c "export const userService" src/services/user.service.ts
      4. Assert: output is "1"
      5. Run: grep -c "localStorage" src/services/user.service.ts
      6. Assert: output >= 2 (get and set)
    Expected Result: Service created following config pattern
    Evidence: Build output + grep results
  ```

  **Commit**: NO (groups with Task 14)

---

- [ ] 3. Create `src/services/personnel.service.ts`

  **What to do**:
  - Create localStorage-backed CRUD service for personnel following `config.service.ts` pattern exactly
  - Import seed data from `@/data/personnel.json`
  - Import `Personnel` type from `@/types`
  - Storage key: `tlu_hr_personnel`
  - Delay: 500ms simulation
  - Lazy seed: on first `getAll()`, if localStorage key doesn't exist, seed from JSON
  - Methods:
    - `getAll(): Promise<Personnel[]>` — returns all personnel from localStorage
    - `getById(id: string): Promise<Personnel | null>` — find by ID
    - `create(personnel: Omit<Personnel, 'id' | 'employeeCode' | 'createdAt' | 'updatedAt'>): Promise<Personnel>` — generates `crypto.randomUUID()` for ID, `CB${Date.now().toString().slice(-6)}` for employeeCode, timestamps
    - `update(id: string, data: Partial<Personnel>): Promise<Personnel>` — updates `updatedAt`
    - `remove(id: string): Promise<void>` — removes personnel from array
    - `saveAll(personnel: Personnel[]): Promise<Personnel[]>` — bulk save

  **Must NOT do**:
  - Do not add `userId` field handling
  - Do not create contract service
  - Do not add code comments
  - Do not change employeeCode format (keep `CB` + timestamp)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
    - Reason: Same pattern as Task 2, different entity
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Task 2)
  - **Blocks**: Task 5
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `src/services/config.service.ts:1-50` — GOLD STANDARD. Same pattern as Task 2.
  - `src/services/user.service.ts` — Sister service (created in Task 2). Same structure, different entity.

  **API/Type References**:
  - `src/types/index.ts:358-412` — `Personnel` interface (50+ fields)
  - `src/data/personnel.json` — Seed data. 3 personnel records.

  **Acceptance Criteria**:
  - [ ] File exists at `src/services/personnel.service.ts`
  - [ ] `grep "tlu_hr_personnel" src/services/personnel.service.ts` returns match
  - [ ] `grep "crypto.randomUUID" src/services/personnel.service.ts` returns match
  - [ ] `npm run build` exits with code 0

  **Agent-Executed QA Scenarios**:
  ```
  Scenario: Service file compiles and follows pattern
    Tool: Bash
    Steps:
      1. Run: npm run build
      2. Assert: exit code 0
      3. Run: grep -c "export const personnelService" src/services/personnel.service.ts
      4. Assert: output is "1"
    Expected Result: Service created following config pattern
    Evidence: Build output + grep results
  ```

  **Commit**: NO (groups with Task 14)

---

- [ ] 4. Create `src/stores/user.store.ts`

  **What to do**:
  - Create Zustand store wrapping `userService` following `config.store.ts` pattern exactly
  - Interface: `users: UserWithPassword[]`, `isLoading: boolean`, `error: string | null`
  - Actions:
    - `fetchUsers(): Promise<void>` — calls `userService.getAll()`, sets `users`
    - `createUser(data: ...): Promise<UserWithPassword>` — calls `userService.create()`, re-fetches
    - `updateUser(id: string, data: ...): Promise<UserWithPassword>` — calls `userService.update()`, re-fetches
    - `deleteUser(id: string): Promise<void>` — calls `userService.remove()`, re-fetches
  - Helper function (exported, NOT in store): `getUserWithoutPassword(user: UserWithPassword): User` — strips `password` field, normalizes `personnelId: null` → `undefined`
  - Helper function (exported): `findUserByPersonnelId(users: UserWithPassword[], personnelId: string): UserWithPassword | undefined` — for reverse lookup

  **Must NOT do**:
  - Do not add TanStack Query integration
  - Do not cache individual users (keep simple like config store)
  - Do not add code comments

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
    - Reason: Straightforward store creation following established pattern
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 5, 6)
  - **Blocks**: Tasks 7, 8, 9, 11, 12
  - **Blocked By**: Task 2

  **References**:

  **Pattern References**:
  - `src/stores/config.store.ts:1-64` — GOLD STANDARD. Replicate: interface with `isLoading`/`error`/data, `create<State>((set) => ({...}))`, async actions with `set({ isLoading: true, error: null })` → try/service call → `set({ data, isLoading: false })` → catch → `set({ error: "...", isLoading: false })`

  **API/Type References**:
  - `src/types/index.ts:140-151` — `User` interface (public type without password)
  - `src/types/index.ts:~152` — `UserWithPassword` type
  - `src/services/user.service.ts` — Service methods to wrap (created in Task 2)

  **Acceptance Criteria**:
  - [ ] File exists at `src/stores/user.store.ts`
  - [ ] `grep "useUserStore" src/stores/user.store.ts` returns match
  - [ ] `grep "isLoading" src/stores/user.store.ts` returns match
  - [ ] `grep "getUserWithoutPassword\|findUserByPersonnelId" src/stores/user.store.ts` returns match
  - [ ] `npm run build` exits with code 0

  **Agent-Executed QA Scenarios**:
  ```
  Scenario: Store compiles and exports correctly
    Tool: Bash
    Steps:
      1. Run: npm run build
      2. Assert: exit code 0
      3. Run: grep -c "export const useUserStore" src/stores/user.store.ts
      4. Assert: output is "1"
    Expected Result: Store follows config.store.ts pattern
    Evidence: Build output
  ```

  **Commit**: NO (groups with Task 14)

---

- [ ] 5. Create `src/stores/personnel.store.ts`

  **What to do**:
  - Create Zustand store wrapping `personnelService` following `config.store.ts` pattern exactly
  - Interface: `personnel: Personnel[]`, `isLoading: boolean`, `error: string | null`
  - Actions:
    - `fetchPersonnel(): Promise<void>` — calls `personnelService.getAll()`, sets `personnel`
    - `createPersonnel(data: ...): Promise<Personnel>` — calls `personnelService.create()`, re-fetches
    - `updatePersonnel(id: string, data: ...): Promise<Personnel>` — calls `personnelService.update()`, re-fetches
    - `deletePersonnel(id: string): Promise<void>` — calls `personnelService.remove()`, re-fetches
    - `terminatePersonnel(id: string, reason: string): Promise<void>` — updates status to "inactive", sets `leaveDate` and `leaveReason`, re-fetches

  **Must NOT do**:
  - Do not handle contracts in this store
  - Do not add code comments

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
    - Reason: Same pattern as Task 4, different entity
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 4, 6)
  - **Blocks**: Tasks 7, 8, 10, 11, 12, 13
  - **Blocked By**: Task 3

  **References**:

  **Pattern References**:
  - `src/stores/config.store.ts:1-64` — GOLD STANDARD. Same pattern as Task 4.
  - `src/stores/user.store.ts` — Sister store (created in Task 4).

  **API/Type References**:
  - `src/types/index.ts:358-412` — `Personnel` interface
  - `src/services/personnel.service.ts` — Service methods to wrap (created in Task 3)

  **Acceptance Criteria**:
  - [ ] File exists at `src/stores/personnel.store.ts`
  - [ ] `grep "usePersonnelStore" src/stores/personnel.store.ts` returns match
  - [ ] `grep "terminatePersonnel" src/stores/personnel.store.ts` returns match
  - [ ] `npm run build` exits with code 0

  **Agent-Executed QA Scenarios**:
  ```
  Scenario: Store compiles and exports correctly
    Tool: Bash
    Steps:
      1. Run: npm run build
      2. Assert: exit code 0
      3. Run: grep -c "export const usePersonnelStore" src/stores/personnel.store.ts
      4. Assert: output is "1"
    Expected Result: Store follows config.store.ts pattern
    Evidence: Build output
  ```

  **Commit**: NO (groups with Task 14)

---

- [ ] 6. Fix `src/stores/auth.ts` to use `userService`

  **What to do**:
  - Remove `import mockUsers from '../data/users.json'`
  - Import `userService` from `@/services/user.service`
  - Change `login()` to call `const users = await userService.getAll()` instead of using `mockUsers`
  - Find user by `username` from the service-returned array
  - Compare plaintext password (same logic, just different data source)
  - Strip password before setting user in state (use destructuring `const { password: _, ...userWithoutPassword } = foundUser`)
  - Handle `personnelId: null` → normalize to `undefined` for the `User` type in state

  **Must NOT do**:
  - Do not add JWT handling
  - Do not hash passwords
  - Do not change the `AuthState` interface
  - Do not change password validation rules
  - Do not change error messages
  - Do not add code comments

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
    - Reason: Focused refactoring of single file with clear requirements
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 4, 5)
  - **Blocks**: Task 14
  - **Blocked By**: Task 2

  **References**:

  **Pattern References**:
  - `src/stores/auth.ts:1-95` — Current auth store. Line 3: `import mockUsers from '../data/users.json'`. Line 37: `mockUsers.find(user => user.username === credentials.username)`. Line 50: password comparison. Line 72: strips password. This is the file being modified.

  **API/Type References**:
  - `src/services/user.service.ts` — `userService.getAll()` returns `Promise<UserWithPassword[]>` (created in Task 2)
  - `src/types/index.ts:140-151` — `User` interface (what auth state stores)

  **WHY This Fix Matters**:
  - Currently auth reads from the static `users.json` import. When a new user is created via `UserCreatePage` (which pushes to the in-memory JSON array), the auth store's `mockUsers` reference may or may not see it depending on module caching. With localStorage, `userService.getAll()` always reads current data.

  **Acceptance Criteria**:
  - [ ] `grep "users.json" src/stores/auth.ts` returns NO matches (exit code 1)
  - [ ] `grep "userService\|user\.service" src/stores/auth.ts` returns at least 1 match
  - [ ] `grep "mockUsers" src/stores/auth.ts` returns NO matches
  - [ ] `npm run build` exits with code 0

  **Agent-Executed QA Scenarios**:
  ```
  Scenario: Auth store compiles without JSON import
    Tool: Bash
    Steps:
      1. Run: npm run build
      2. Assert: exit code 0
      3. Run: grep "users.json" src/stores/auth.ts
      4. Assert: exit code 1 (no matches)
      5. Run: grep "userService" src/stores/auth.ts
      6. Assert: exit code 0 (match found)
    Expected Result: Auth store uses userService
    Evidence: grep output

  Scenario: Newly created user can log in (E2E - run after Task 8)
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running on localhost:5173, Tasks 2, 4, 6, 8 complete
    Steps:
      1. Navigate to: http://localhost:5173/login
      2. Fill: input[name="username"] → "admin"
      3. Fill: input[name="password"] → "Admin123"
      4. Click: button[type="submit"]
      5. Wait for: navigation away from /login (timeout: 10s)
      6. Navigate to: /admin/users/new
      7. Fill: username field → "testuser123"
      8. Fill: password field → "TestPass1"
      9. Fill: fullName field → "Test User"
      10. Fill: email field → "test@tlu.edu.vn"
      11. Select: role → "employee"
      12. Click: submit/save button
      13. Wait for: navigation to /admin/users (timeout: 10s)
      14. Click: user menu / logout button
      15. Navigate to: /login
      16. Fill: input[name="username"] → "testuser123"
      17. Fill: input[name="password"] → "TestPass1"
      18. Click: button[type="submit"]
      19. Wait for: navigation away from /login (timeout: 10s)
      20. Assert: URL is NOT /login (user logged in successfully)
      21. Screenshot: .sisyphus/evidence/task-6-auth-bug-fix.png
    Expected Result: Newly created user can log in successfully
    Failure Indicators: Login form shows error, URL stays at /login
    Evidence: .sisyphus/evidence/task-6-auth-bug-fix.png
  ```

  **Commit**: NO (groups with Task 14)

---

- [ ] 7. Refactor `src/pages/admin/UserListPage.tsx`

  **What to do**:
  - Remove `import usersData from "@/data/users.json"`
  - Remove `import personnelData from "@/data/personnel.json"` (if present)
  - Import `useUserStore` from `@/stores/user.store`
  - Import `usePersonnelStore` from `@/stores/personnel.store`
  - Replace `useState<User[]>(usersData as User[])` with store: destructure `{ users, isLoading, error, fetchUsers }` from `useUserStore()`
  - Add `useEffect(() => { fetchUsers(); }, [fetchUsers])` to load data on mount
  - Similarly for personnel: destructure from `usePersonnelStore()` for the `getPersonnelInfo` helper
  - Add `useEffect(() => { fetchPersonnel(); }, [fetchPersonnel])` for personnel data
  - Replace `handleToggleLock` to use `updateUser()` from store instead of local `setUsers`
  - The `getPersonnelInfo` helper should use personnel from the store instead of static import
  - Personnel info display in table should use store data
  - Keep all existing UI, filtering, pagination logic — just change data source

  **Must NOT do**:
  - Do not change pagination logic
  - Do not change filter UI
  - Do not change table layout (except data source for personnel column)
  - Do not add loading spinners (unless existing code already has them)
  - Do not add code comments

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Page refactoring with multiple concerns (data source, mutations, side effects)
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Understanding existing UI patterns for non-breaking refactoring

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 8, 9, 10, 11, 12, 13)
  - **Blocks**: Task 14
  - **Blocked By**: Tasks 4, 5

  **References**:

  **Pattern References**:
  - `src/pages/admin/AllowanceConfigPage.tsx` — Reference page that already uses config store. Shows the pattern: destructure from store → `useEffect(fetch, [fetch])` → `useMemo` for derived state → `await store.action()` on user interactions. Follow this consumption pattern.
  - `src/pages/admin/UserListPage.tsx:1-275` — The file being refactored. Key lines: line 3 (users JSON import), line 4 (personnel JSON import), line 63 (useState init), lines 65-68 (getPersonnelInfo), lines 88-106 (handleToggleLock with setUsers).

  **API/Type References**:
  - `src/stores/user.store.ts` — `useUserStore()` returns `{ users, isLoading, error, fetchUsers, updateUser }` (created in Task 4)
  - `src/stores/personnel.store.ts` — `usePersonnelStore()` returns `{ personnel, fetchPersonnel }` (created in Task 5)
  - `src/types/index.ts:140-151` — `User` interface

  **Acceptance Criteria**:
  - [ ] `grep "from.*@/data/users.json" src/pages/admin/UserListPage.tsx` returns NO matches
  - [ ] `grep "from.*@/data/personnel.json" src/pages/admin/UserListPage.tsx` returns NO matches
  - [ ] `grep "useUserStore" src/pages/admin/UserListPage.tsx` returns match
  - [ ] `npm run build` exits with code 0

  **Agent-Executed QA Scenarios**:
  ```
  Scenario: User list loads from store
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running on localhost:5173
    Steps:
      1. Navigate to: http://localhost:5173/login
      2. Fill: input[name="username"] → "admin"
      3. Fill: input[name="password"] → "Admin123"
      4. Click: button[type="submit"]
      5. Wait for: navigation away from /login (timeout: 10s)
      6. Navigate to: /admin/users
      7. Wait for: table visible (timeout: 10s)
      8. Assert: Table contains at least 4 rows (seed data)
      9. Assert: "Nguyễn Văn An" visible in table (from personnel link)
      10. Screenshot: .sisyphus/evidence/task-7-user-list.png
    Expected Result: User list displays data from store
    Evidence: .sisyphus/evidence/task-7-user-list.png

  Scenario: Toggle lock persists after reload
    Tool: Playwright (playwright skill)
    Preconditions: Logged in as admin, on /admin/users
    Steps:
      1. Find lock/unlock button for user "tccb"
      2. Click the toggle button
      3. Wait for: toast or status change (timeout: 5s)
      4. Reload the page (F5)
      5. Wait for: table visible (timeout: 10s)
      6. Assert: User "tccb" status has changed (persisted)
      7. Screenshot: .sisyphus/evidence/task-7-lock-persist.png
    Expected Result: Lock toggle persists across reload
    Evidence: .sisyphus/evidence/task-7-lock-persist.png
  ```

  **Commit**: NO (groups with Task 14)

---

- [ ] 8. Refactor `src/pages/admin/UserCreatePage.tsx`

  **What to do**:
  - Remove `import usersData from "@/data/users.json"`
  - Import `useUserStore` from `@/stores/user.store`
  - Import `usePersonnelStore` from `@/stores/personnel.store`
  - Destructure `{ users, fetchUsers, createUser }` from `useUserStore()`
  - Destructure `{ personnel, fetchPersonnel }` from `usePersonnelStore()`
  - Add `useEffect` to fetch both on mount
  - Replace `availablePersonnel` computation: use `personnel` from store instead of `personnelData`
  - Replace duplicate username check: use `users` from store instead of `usersData`
  - Replace `handleSubmit`:
    - Remove `(usersData as ...[]).push(newUser)` 
    - Replace with `await createUser({ username, password, fullName, email, role, personnelId, status: 'active' })`
    - Wrap in try/catch: on success → navigate; on error → show toast with error message, stay on page
  - ID generation is handled by the service (no `Date.now()` needed in this file)

  **Must NOT do**:
  - Do not change form validation (keep Zod schema as-is)
  - Do not change form layout/UI
  - Do not add password hashing
  - Do not add code comments

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Complex page with form validation, personnel linking, and mutation refactoring
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 7, 9, 10, 11, 12, 13)
  - **Blocks**: Task 14
  - **Blocked By**: Tasks 4, 5

  **References**:

  **Pattern References**:
  - `src/pages/admin/UserCreatePage.tsx:1-221` — The file being refactored. Key lines: line 15 (JSON import), line 39-42 (availablePersonnel from JSON), line 54-56 (duplicate check from JSON), line 86 (`Date.now()` ID), line 98 (`usersData.push()`).

  **API/Type References**:
  - `src/stores/user.store.ts` — `useUserStore()` with `createUser()` action
  - `src/stores/personnel.store.ts` — `usePersonnelStore()` for personnel list
  - `src/types/index.ts:140-151` — `User` interface

  **Acceptance Criteria**:
  - [ ] `grep "from.*@/data/users.json" src/pages/admin/UserCreatePage.tsx` returns NO matches
  - [ ] `grep "Date.now" src/pages/admin/UserCreatePage.tsx` returns NO matches
  - [ ] `grep "\.push(" src/pages/admin/UserCreatePage.tsx` returns NO matches
  - [ ] `npm run build` exits with code 0

  **Agent-Executed QA Scenarios**:
  ```
  Scenario: Create user persists to localStorage
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, logged in as admin
    Steps:
      1. Navigate to: /admin/users/new
      2. Wait for: form visible (timeout: 10s)
      3. Fill: username field → "newuser1"
      4. Fill: password field → "NewUser1pass"
      5. Fill: fullName field → "New User One"
      6. Fill: email field → "newuser1@tlu.edu.vn"
      7. Select: role → "employee"
      8. Click: save/submit button
      9. Wait for: navigation to /admin/users (timeout: 10s)
      10. Assert: "New User One" visible in table
      11. Reload the page (F5)
      12. Wait for: table visible (timeout: 10s)
      13. Assert: "New User One" STILL visible (persisted)
      14. Screenshot: .sisyphus/evidence/task-8-create-persist.png
    Expected Result: Created user appears in list and survives reload
    Evidence: .sisyphus/evidence/task-8-create-persist.png

  Scenario: Duplicate username shows error
    Tool: Playwright (playwright skill)
    Preconditions: Logged in as admin
    Steps:
      1. Navigate to: /admin/users/new
      2. Fill: username → "admin" (existing username)
      3. Assert: Error message about duplicate username appears
      4. Screenshot: .sisyphus/evidence/task-8-duplicate-error.png
    Expected Result: Cannot create user with existing username
    Evidence: .sisyphus/evidence/task-8-duplicate-error.png
  ```

  **Commit**: NO (groups with Task 14)

---

- [ ] 9. Refactor `src/pages/admin/UserEditPage.tsx`

  **What to do**:
  - Remove `import usersData from "@/data/users.json"`
  - Import `useUserStore` from `@/stores/user.store`
  - Import `usePersonnelStore` from `@/stores/personnel.store`
  - Destructure from stores, add `useEffect` for fetching
  - Replace user lookup: find user from store's `users` array instead of `usersData`
  - Replace `availablePersonnel`: use `personnel` from store
  - Replace save handler:
    - Remove direct property mutation (`initialUser.fullName = formData.fullName`)
    - Replace with `await updateUser(id, { fullName, email, role, personnelId, ... })`
    - Wrap in try/catch
  - Replace status toggle handler: `await updateUser(id, { status: newStatus })`
  - Replace password reset handler: `await updateUser(id, { password: newPassword })`

  **Must NOT do**:
  - Do not change form validation
  - Do not change password reset dialog UI
  - Do not change status toggle confirmation dialog
  - Do not add code comments

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Complex page with multiple mutation types (save, toggle, reset)
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4
  - **Blocks**: Task 14
  - **Blocked By**: Tasks 4, 5

  **References**:

  **Pattern References**:
  - `src/pages/admin/UserEditPage.tsx:1-285` — The file being refactored. Key lines: line 4 (JSON import), line 62 (user find from usersData), lines 80-90 (availablePersonnel from JSON), lines 117-122 (direct property mutation), lines 131-138 (status toggle mutation), lines 140-160 (password reset mutation).

  **API/Type References**:
  - `src/stores/user.store.ts` — `useUserStore()` with `updateUser()` action
  - `src/stores/personnel.store.ts` — `usePersonnelStore()` for personnel dropdown

  **Acceptance Criteria**:
  - [ ] `grep "from.*@/data/users.json" src/pages/admin/UserEditPage.tsx` returns NO matches
  - [ ] No direct property mutations (`initialUser.fullName =` etc.)
  - [ ] `npm run build` exits with code 0

  **Agent-Executed QA Scenarios**:
  ```
  Scenario: Edit user persists changes
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, logged in as admin
    Steps:
      1. Navigate to: /admin/users
      2. Click: edit button for user "tccb"
      3. Wait for: edit form loaded (timeout: 10s)
      4. Change: fullName field → "Nguyễn Văn An Updated"
      5. Click: save button
      6. Wait for: navigation or success toast (timeout: 10s)
      7. Navigate to: /admin/users
      8. Assert: "Nguyễn Văn An Updated" visible in table
      9. Reload page (F5)
      10. Assert: "Nguyễn Văn An Updated" STILL visible
      11. Screenshot: .sisyphus/evidence/task-9-edit-persist.png
    Expected Result: Edited user data persists
    Evidence: .sisyphus/evidence/task-9-edit-persist.png
  ```

  **Commit**: NO (groups with Task 14)

---

- [ ] 10. Refactor `src/pages/tccb/PersonnelListPage.tsx`

  **What to do**:
  - Remove `import personnelData from "@/data/personnel.json"`
  - Import `usePersonnelStore` from `@/stores/personnel.store`
  - Destructure `{ personnel, isLoading, error, fetchPersonnel, terminatePersonnel }` from store
  - Add `useEffect(() => { fetchPersonnel(); }, [fetchPersonnel])`
  - Replace all `personnelData` references with `personnel` from store
  - Fix termination handler: currently a no-op (just toast), replace with `await terminatePersonnel(id, reason)` which calls the store action, then show success toast
  - Keep organizations import from JSON (not in scope to refactor)

  **Must NOT do**:
  - Do not refactor organization data source (out of scope)
  - Do not change filter/pagination UI
  - Do not add code comments

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Page with filtering, pagination, and mutation (termination)
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4
  - **Blocks**: Task 14
  - **Blocked By**: Task 5

  **References**:

  **Pattern References**:
  - `src/pages/tccb/PersonnelListPage.tsx:1-340` — The file being refactored. Key lines: line ~3 (personnelData import), lines 94-114 (termination handler — NO-OP, just toast).

  **API/Type References**:
  - `src/stores/personnel.store.ts` — `usePersonnelStore()` with `terminatePersonnel()` action

  **Acceptance Criteria**:
  - [ ] `grep "from.*@/data/personnel.json" src/pages/tccb/PersonnelListPage.tsx` returns NO matches
  - [ ] `npm run build` exits with code 0

  **Agent-Executed QA Scenarios**:
  ```
  Scenario: Personnel list loads from store
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, logged in as admin or tccb
    Steps:
      1. Navigate to: /tccb/personnel
      2. Wait for: table visible (timeout: 10s)
      3. Assert: At least 3 rows (seed data)
      4. Assert: "Nguyễn Văn An" visible
      5. Screenshot: .sisyphus/evidence/task-10-personnel-list.png
    Expected Result: Personnel list renders from store
    Evidence: .sisyphus/evidence/task-10-personnel-list.png
  ```

  **Commit**: NO (groups with Task 14)

---

- [ ] 11. Refactor `src/pages/tccb/PersonnelCreatePage.tsx` + Auto-User-Creation

  **What to do**:
  - Remove `import personnelData from "@/data/personnel.json"`
  - Import `usePersonnelStore` from `@/stores/personnel.store`
  - Import `useUserStore` from `@/stores/user.store` (for auto-user-creation)
  - Destructure from stores, add `useEffect` for fetching
  - Replace `handleSubmit`:
    - Remove `personnelData.push(newPersonnel)` direct mutation
    - Replace with `await personnelStore.createPersonnel({ ... })` 
    - ID and employeeCode generation handled by service
    - Keep `contractsData.push(contract)` as-is (contracts out of scope)
    - Wrap in try/catch
  - Add auto-user-creation feature:
    - Add state: `const [createUserAccount, setCreateUserAccount] = useState(false)`
    - Add collapsible section in wizard Step 8 (Review) area or after the wizard, before the submit button
    - When `createUserAccount` is true and submit succeeds:
      - Derive username from `workEmail` (before `@`), fallback to `employeeCode.toLowerCase()`
      - Generate password: `TLU@` + 4 random digits
      - Create user with `role: 'employee'`, `status: 'active'`, `personnelId: newPersonnel.id`
      - Show password in success toast so the officer can note it down
    - When `createUserAccount` is false, skip user creation (existing behavior)

  **Must NOT do**:
  - Do not modify wizard step components (Step1 through Step8)
  - Do not create contract service
  - Do not remove contractsData push (contracts are out of scope)
  - Do not add code comments

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Most complex task — combines store refactoring with new feature (auto-user-creation)
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: New UI section for user account creation toggle

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4
  - **Blocks**: Task 14
  - **Blocked By**: Tasks 4, 5

  **References**:

  **Pattern References**:
  - `src/pages/tccb/PersonnelCreatePage.tsx:1-278` — The file being refactored. Key lines: line ~3 (personnelData import), line ~5 (contractsData import), lines 139-189 (handleSubmit with `personnelData.push()` and `contractsData.push()`), line ~170 (`pers-${Date.now()}` ID generation).
  - `src/utils/personnel-mapper.ts` — `wizardDataToPersonnel()` mapper used in submit handler. Do NOT modify this file.

  **API/Type References**:
  - `src/stores/personnel.store.ts` — `usePersonnelStore()` with `createPersonnel()` action
  - `src/stores/user.store.ts` — `useUserStore()` with `createUser()` action (for auto-user-creation)

  **Acceptance Criteria**:
  - [ ] `grep "from.*@/data/personnel.json" src/pages/tccb/PersonnelCreatePage.tsx` returns NO matches
  - [ ] `grep "Date.now" src/pages/tccb/PersonnelCreatePage.tsx` returns NO matches (ID generation moved to service)
  - [ ] `grep "\.push(" src/pages/tccb/PersonnelCreatePage.tsx` returns at most 1 match (contractsData push only)
  - [ ] `npm run build` exits with code 0

  **Agent-Executed QA Scenarios**:
  ```
  Scenario: Create personnel persists to localStorage
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, logged in as tccb or admin
    Steps:
      1. Navigate to: /tccb/personnel/new
      2. Wait for: wizard form visible (timeout: 10s)
      3. Fill wizard steps with valid data (follow existing form flow)
      4. On final step, submit
      5. Wait for: navigation to /tccb/personnel (timeout: 10s)
      6. Assert: New personnel visible in list
      7. Reload page (F5)
      8. Assert: New personnel STILL visible
      9. Screenshot: .sisyphus/evidence/task-11-create-persist.png
    Expected Result: Created personnel persists across reload
    Evidence: .sisyphus/evidence/task-11-create-persist.png

  Scenario: Auto-create user account toggle exists
    Tool: Playwright (playwright skill)
    Preconditions: Logged in, on /tccb/personnel/new
    Steps:
      1. Navigate to: /tccb/personnel/new
      2. Assert: Toggle/checkbox for "Tạo tài khoản hệ thống" exists
      3. Screenshot: .sisyphus/evidence/task-11-auto-user-toggle.png
    Expected Result: Auto-user-creation option visible
    Evidence: .sisyphus/evidence/task-11-auto-user-toggle.png
  ```

  **Commit**: NO (groups with Task 14)

---

- [ ] 12. Refactor `src/pages/tccb/PersonnelDetailPage.tsx` + Reverse Lookup

  **What to do**:
  - Remove `import personnelData from "@/data/personnel.json"`
  - Import `usePersonnelStore` from `@/stores/personnel.store`
  - Import `useUserStore` and `findUserByPersonnelId` from `@/stores/user.store`
  - Destructure from stores, add `useEffect` for fetching both
  - Replace `personnelData.find(...)` with `personnel.find(...)` from store
  - Fix termination handler: replace local state mutation with `await terminatePersonnel(id, reason)`
  - Remove `as any` cast on line 46 — use proper type for contracts
  - Add new "Tài khoản hệ thống" section (tab or info card):
    - Use `findUserByPersonnelId(users, personnelId)` to find linked user
    - If found: display username, email, role, status (as Badge), createdAt
    - If not found: display "Chưa có tài khoản hệ thống" message
    - Include link to user edit page if user exists: `/admin/users/${user.id}/edit`
  - Keep contract local state management as-is (contract service out of scope)
  - Keep organizations import from JSON (not in scope)

  **Must NOT do**:
  - Do not refactor contract data handling (out of scope)
  - Do not modify tab structure beyond adding the user account section
  - Do not add code comments

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Complex page (7 tabs, 593 lines) with new UI section
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: New "Tài khoản hệ thống" info card design

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4
  - **Blocks**: Task 14
  - **Blocked By**: Tasks 4, 5

  **References**:

  **Pattern References**:
  - `src/pages/tccb/PersonnelDetailPage.tsx:1-593` — The file being refactored. Key lines: line ~3 (personnelData import), line 42 (personnel find), line 46 (`as any` cast for contracts), lines 62-81 (termination — local state only), lines 83-102 (contract appendix — local state only).

  **API/Type References**:
  - `src/stores/personnel.store.ts` — `usePersonnelStore()` for personnel data
  - `src/stores/user.store.ts` — `useUserStore()` for reverse lookup, `findUserByPersonnelId()` helper
  - `src/types/index.ts:140-151` — `User` interface fields to display

  **UI Design for Reverse Lookup Section**:
  - Place in the "Personal" tab or as a dedicated info card at the top of the detail page
  - Use existing `Card` / `Badge` components from `src/components/ui/`
  - Display: Username, Email, Role (translated badge), Status (colored badge), Account created date
  - Link: "Chỉnh sửa tài khoản" → `/admin/users/${userId}/edit`

  **Acceptance Criteria**:
  - [ ] `grep "from.*@/data/personnel.json" src/pages/tccb/PersonnelDetailPage.tsx` returns NO matches
  - [ ] `grep "as any" src/pages/tccb/PersonnelDetailPage.tsx` returns NO matches
  - [ ] `npm run build` exits with code 0

  **Agent-Executed QA Scenarios**:
  ```
  Scenario: Reverse lookup shows linked user account
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, logged in as admin or tccb
    Steps:
      1. Navigate to: /tccb/personnel/pers-001
      2. Wait for: detail page loaded (timeout: 10s)
      3. Assert: "Tài khoản hệ thống" section/card visible
      4. Assert: Username "tccb" displayed in section
      5. Assert: Role displayed (e.g., "Cán bộ TCCB" or similar)
      6. Screenshot: .sisyphus/evidence/task-12-reverse-lookup.png
    Expected Result: Personnel detail shows linked user info
    Evidence: .sisyphus/evidence/task-12-reverse-lookup.png

  Scenario: Personnel without user shows appropriate message
    Tool: Playwright (playwright skill)
    Preconditions: A personnel record exists without linked user (may need to create one first)
    Steps:
      1. Navigate to detail page of personnel without linked user
      2. Assert: "Chưa có tài khoản hệ thống" message visible
      3. Screenshot: .sisyphus/evidence/task-12-no-user.png
    Expected Result: Clear message when no user account linked
    Evidence: .sisyphus/evidence/task-12-no-user.png
  ```

  **Commit**: NO (groups with Task 14)

---

- [ ] 13. Refactor `src/pages/tccb/PersonnelEditPage.tsx`

  **What to do**:
  - Remove `import personnelData from "@/data/personnel.json"`
  - Import `usePersonnelStore` from `@/stores/personnel.store`
  - Destructure `{ personnel, fetchPersonnel, updatePersonnel }` from store
  - Add `useEffect(() => { fetchPersonnel(); }, [fetchPersonnel])`
  - Replace personnel lookup: use `personnel.find(...)` from store
  - **FIX THE MAIN BUG**: Currently validates but NEVER persists. Replace submit handler:
    - Map wizard data to personnel format using `wizardDataToPersonnel()`
    - Call `await updatePersonnel(id, mappedData)`
    - On success: show toast, navigate to detail page
    - On error: show error toast, stay on page
  - Keep using `personnelToWizardData()` for initial data loading

  **Must NOT do**:
  - Do not modify wizard step components
  - Do not change validation logic
  - Do not add code comments

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Fixing a significant bug (no persistence) while refactoring data source
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4
  - **Blocks**: Task 14
  - **Blocked By**: Task 5

  **References**:

  **Pattern References**:
  - `src/pages/tccb/PersonnelEditPage.tsx:1-180` — The file being refactored. Key lines: line ~3 (personnelData import), line 88 (personnelToWizardData), lines 104-122 (handleSubmit that validates but NEVER persists — THIS IS THE BUG).
  - `src/utils/personnel-mapper.ts` — `wizardDataToPersonnel()` and `personnelToWizardData()` — do NOT modify these.

  **API/Type References**:
  - `src/stores/personnel.store.ts` — `usePersonnelStore()` with `updatePersonnel()` action

  **Acceptance Criteria**:
  - [ ] `grep "from.*@/data/personnel.json" src/pages/tccb/PersonnelEditPage.tsx` returns NO matches
  - [ ] `npm run build` exits with code 0
  - [ ] Edit handler calls `updatePersonnel` (not just toast)

  **Agent-Executed QA Scenarios**:
  ```
  Scenario: Edit personnel actually persists changes
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, logged in as tccb or admin
    Steps:
      1. Navigate to: /tccb/personnel/pers-001/edit
      2. Wait for: wizard form loaded with existing data (timeout: 10s)
      3. Modify: a visible field (e.g., phone number or personal email)
      4. Click: save/submit button
      5. Wait for: navigation to detail page (timeout: 10s)
      6. Assert: Changed field value is reflected
      7. Reload page (F5)
      8. Assert: Changed field value STILL reflected (persisted)
      9. Screenshot: .sisyphus/evidence/task-13-edit-persist.png
    Expected Result: Personnel edits actually save and persist
    Evidence: .sisyphus/evidence/task-13-edit-persist.png
  ```

  **Commit**: NO (groups with Task 14)

---

- [ ] 14. Final build verification, lint check, and commit

  **What to do**:
  - Run `npm run build` — must exit with code 0
  - Run `npm run lint` — must exit with code 0 (or only warnings)
  - Verify no JSON imports remain in refactored files:
    - `grep -r "from.*@/data/users.json" src/pages/admin/ src/stores/auth.ts` → no matches
    - `grep -r "from.*@/data/personnel.json" src/pages/tccb/PersonnelListPage.tsx src/pages/tccb/PersonnelCreatePage.tsx src/pages/tccb/PersonnelDetailPage.tsx src/pages/tccb/PersonnelEditPage.tsx` → no matches
  - Verify no `as any`:
    - `grep -r "as any" src/pages/admin/ src/pages/tccb/Personnel*.tsx src/stores/ src/services/` → no matches
  - Verify no `Date.now()` IDs in scope:
    - `grep -rn "Date.now()" src/pages/admin/UserCreatePage.tsx src/pages/tccb/PersonnelCreatePage.tsx src/services/` → no matches (except employeeCode in personnel.service.ts which is allowed)
  - Verify new files exist: `ls src/services/user.service.ts src/services/personnel.service.ts src/stores/user.store.ts src/stores/personnel.store.ts`
  - Verify localStorage keys: `grep "tlu_hr_" src/services/user.service.ts src/services/personnel.service.ts`
  - Stage and commit all changes

  **Must NOT do**:
  - Do not push to remote unless explicitly requested
  - Do not add code comments

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Verification and commit
  - **Skills**: [`git-master`]
    - `git-master`: For proper commit handling

  **Parallelization**:
  - **Can Run In Parallel**: NO (final verification)
  - **Parallel Group**: Wave 5
  - **Blocks**: None
  - **Blocked By**: Tasks 7-13

  **References**:
  - All files from Tasks 1-13

  **Acceptance Criteria**:
  - [ ] `npm run build` exits with code 0
  - [ ] `npm run lint` exits with code 0 (or warnings only)
  - [ ] All verification greps pass as specified
  - [ ] Git commit created with descriptive message

  **Agent-Executed QA Scenarios**:
  ```
  Scenario: Full build and lint verification
    Tool: Bash
    Steps:
      1. Run: npm run build
      2. Assert: exit code 0
      3. Run: npm run lint
      4. Assert: exit code 0 (or only warnings)
      5. Run: grep -r "from.*@/data/users.json" src/pages/admin/ src/stores/auth.ts
      6. Assert: exit code 1 (no matches)
      7. Run: grep -r "from.*@/data/personnel.json" src/pages/tccb/PersonnelListPage.tsx src/pages/tccb/PersonnelCreatePage.tsx src/pages/tccb/PersonnelDetailPage.tsx src/pages/tccb/PersonnelEditPage.tsx
      8. Assert: exit code 1 (no matches)
      9. Run: grep -r "as any" src/pages/admin/ src/pages/tccb/Personnel*.tsx src/stores/ src/services/
      10. Assert: exit code 1 (no matches)
    Expected Result: All quality gates pass
    Evidence: Command outputs captured

  Scenario: End-to-end auth bug verification
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Login as admin
      2. Create a new user: username "e2e_test", password "E2eTest1", name "E2E Tester", email "e2e@tlu.edu.vn"
      3. Logout
      4. Login as "e2e_test" / "E2eTest1"
      5. Assert: Login succeeds (URL is not /login)
      6. Screenshot: .sisyphus/evidence/task-14-e2e-auth.png
    Expected Result: The core auth bug is fixed
    Evidence: .sisyphus/evidence/task-14-e2e-auth.png
  ```

  **Commit**: YES
  - Message: `feat(core): add service/store layer for user and personnel modules

Replaces direct JSON imports with localStorage-backed services and Zustand stores.
Fixes auth bug where newly created users could not log in.
Adds personnel→user reverse lookup in PersonnelDetailPage.
Adds optional auto-user-creation in PersonnelCreatePage.
Fixes PersonnelEditPage to actually persist changes.`
  - Files:
    - `src/types/index.ts`
    - `src/services/user.service.ts` (new)
    - `src/services/personnel.service.ts` (new)
    - `src/stores/user.store.ts` (new)
    - `src/stores/personnel.store.ts` (new)
    - `src/stores/auth.ts`
    - `src/pages/admin/UserListPage.tsx`
    - `src/pages/admin/UserCreatePage.tsx`
    - `src/pages/admin/UserEditPage.tsx`
    - `src/pages/tccb/PersonnelListPage.tsx`
    - `src/pages/tccb/PersonnelCreatePage.tsx`
    - `src/pages/tccb/PersonnelDetailPage.tsx`
    - `src/pages/tccb/PersonnelEditPage.tsx`
  - Pre-commit: `npm run build && npm run lint`

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 14 | `feat(core): add service/store layer for user and personnel modules` | All 13 files | `npm run build && npm run lint` |

---

## Known Limitations (Deferred)

> These are explicitly OUT OF SCOPE for this plan. They should be addressed in follow-up work.

1. **7 additional `personnelData` consumers**: `ContractCreatePage`, `ContractListPage`, `DashboardPage`, `OrganizationPage`, `UnitDetailPage`, `TrainingDetailPage`, `EnrollPersonnelDialog` still import `personnelData` from JSON. They will see seed data but not new personnel created through the store. This is acceptable because they only need the initial 3 records for display in this iteration.

2. **Contract service/store**: `PersonnelCreatePage` still pushes to `contractsData` directly. `PersonnelDetailPage` still reads contracts from JSON. A contract service/store should be created in a future phase.

3. **`Date.now()` IDs in other files**: 15 files use `Date.now()` for IDs. Only the 7 in-scope pages are fixed. Others remain.

4. **Other data files**: `organizations.json`, `contracts.json`, `training.json`, etc. still use direct imports. Future phases should create services for these.

---

## Success Criteria

### Verification Commands
```bash
npm run build          # Expected: exit 0
npm run lint           # Expected: exit 0 (or warnings only)
```

### Final Checklist
- [ ] All 4 new files created (2 services, 2 stores)
- [ ] `UserWithPassword` type exported from types/index.ts
- [ ] Auth store reads from userService (no JSON import)
- [ ] All 7 pages refactored (no JSON imports for users/personnel)
- [ ] No `as any` in refactored files
- [ ] No `Date.now()` for ID generation in refactored files
- [ ] Data persists across page reloads (localStorage)
- [ ] Newly created users can log in (auth bug fixed)
- [ ] PersonnelDetailPage shows linked user account
- [ ] PersonnelEditPage actually saves changes
- [ ] PersonnelCreatePage has auto-user-creation option
- [ ] PersonnelListPage termination actually works
- [ ] Build passes, lint passes
- [ ] All changes committed

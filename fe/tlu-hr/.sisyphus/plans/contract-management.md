# Contract Management Phase

## TL;DR

> **Quick Summary**: Implement the full contract lifecycle (Create, View, Extend, Terminate) for TCCB officers.
> 
> **Deliverables**:
> - `ContractCreatePage`: Standalone form for creating new contracts (linked to personnel).
> - Enhanced `PersonnelDetailPage`: "Contracts" tab showing list + actions.
> - Extension Workflow: Modal to create a new "Appendix" contract linked to the previous one.
> - Termination Workflow: Modal to terminate a contract with reasoning.
> - Validation: Hardcoded rules (e.g., max 2 extensions for Definite contracts).
> 
> **Estimated Effort**: Medium (6 tasks)
> **Parallel Execution**: YES - 2 waves
> **Critical Path**: Task 1 → Task 2 → Task 3 → Task 4

---

## Context

### Original Request
Implement Contract Management module (Needs 76-87) following the current "Refactored Wizard" pattern (accordion style) where applicable.

### Interview Summary
**Decisions**:
- **Creation Flow**: Start from `PersonnelDetailPage` -> "Contracts" tab -> "Add Contract" button.
- **Extension Logic**: Create **NEW** contract record (Appendix) linked to parent via `previousContractId`.
- **Validation**: Hardcode rules (e.g., max 2 extensions) for now. Admin config is out of scope.
- **Foreign Expert**: Fields (Nationality, Passport) conditionally visible/required.

### Metis Review
**Identified Gaps** (addressed):
- **Data Sync**: Creating a contract must update `personnel.currentContract` pointer.
- **Status Transitions**: Old contract becomes `EXTENDED` immediately upon extension.
- **Routing**: `ContractCreatePage` requires `?personnelId=...` query param.

---

## Work Objectives

### Core Objective
Enable full lifecycle management of personnel contracts: Create new, Extend existing, Terminate, and View history.

### Concrete Deliverables
1. `src/pages/tccb/ContractCreatePage.tsx` - Standalone form.
2. Updated `PersonnelDetailPage.tsx` - Functional "Contracts" tab.
3. `src/components/contracts/ContractExtensionDialog.tsx` - Modal component.
4. `src/components/contracts/ContractTerminationDialog.tsx` - Modal component.
5. Updated `contracts.json` - Mock data structure to support extensions.

### Definition of Done
- [ ] Can create a new contract for an existing person (updates `currentContract`).
- [ ] Can extend a contract (creates new linked record, updates old to EXTENDED).
- [ ] Can terminate a contract (updates status to TERMINATED).
- [ ] "Contracts" tab in Detail page lists all contracts sorted by date.
- [ ] Foreign Expert toggle reveals required fields.

### Must Have
- Validation: Start Date < End Date.
- Validation: Max 2 extensions for "Definite" contracts.
- Visual Badge for contract status (Active, Extended, Terminated, Expired).
- "Add Contract" button only visible if no active contract exists (or override).

### Must NOT Have (Guardrails)
- DO NOT build Admin Configuration screens (hardcode rules).
- DO NOT implement file upload (mock only).
- DO NOT implement Print Template editor.

---

## Verification Strategy

### Automated Verification (Playwright)

**Evidence Requirements:**
- Screenshots of Create Page (with Foreign Expert toggled).
- Screenshots of Extension Dialog.
- Screenshots of "Contracts" tab showing history.

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately):
├── Task 1: Update Contract Data & Types (Foundation)
└── Task 2: Build ContractCreatePage (UI)

Wave 2 (After Wave 1):
├── Task 3: Implement "Contracts" Tab in Detail Page (Integration)
└── Task 4: Implement Extension & Termination Dialogs (Logic)

Wave 3 (Final):
└── Task 5: Integration & QA Verification
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 1 | None | 3, 4 | 2 |
| 2 | None | 3 | 1 |
| 3 | 1, 2 | 5 | 4 |
| 4 | 1 | 5 | 3 |
| 5 | 3, 4 | None | None |

---

## TODOs

- [x] 1. Update Contract Data & Types

  **What to do**:
  - Update `src/types/index.ts`: Ensure `Contract` has `previousContractId`, `isForeignExpert`, `nationality`, `passportNumber`. (Already exists, just verify/refine).
  - Update `src/data/contracts.json`: Add 2-3 sample records showing an extension chain (Contract A -> Contract B).
  - Update `src/utils/contract-helpers.ts` (create new): Add helpers for `canExtend(contract)`, `getNextContractNumber(current)`, `validateContractDates`.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

- [x] 2. Build ContractCreatePage

  **What to do**:
  - Create `src/pages/tccb/ContractCreatePage.tsx`.
  - Route: `/tccb/contracts/new` (reads `?personnelId` from URL).
  - Form Layout: Card-based (Standard form).
  - Fields:
    - Contract Number, Type, Duration.
    - Sign Date, Effective Date, Expiry Date.
    - Job Description, Note.
    - Toggle: "Foreign Expert" -> reveals Nationality, Passport, Work Permit.
  - Validation: Zod schema (dates, required fields).
  - Submit: Updates mock state (mock save), redirects to Personnel Detail.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: `["frontend-ui-ux"]`

- [x] 3. Implement "Contracts" Tab in Detail Page

  **What to do**:
  - Update `src/pages/tccb/PersonnelDetailPage.tsx`.
  - Replace placeholder in "Contracts" tab.
  - Render list of contracts (Card or Table).
  - Show status badges (Active, Extended, Terminated).
  - Actions per contract: "Gia hạn" (Extend), "Chấm dứt" (Terminate) - conditionally visible based on status.
  - Add "Thêm hợp đồng" button at top of tab (links to `/tccb/contracts/new?personnelId=...`).

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: `["frontend-ui-ux"]`

- [x] 4. Implement Extension & Termination Dialogs

  **What to do**:
  - Create `src/components/contracts/ContractExtensionDialog.tsx`.
    - Fields: New Duration, New Dates, Appendix Number.
    - Logic: Sets `previousContractId`, increments `extensionCount`.
  - Create `src/components/contracts/ContractTerminationDialog.tsx`.
    - Fields: Termination Date, Reason.
    - Logic: Sets `status` to `TERMINATED`.
  - Integrate these dialogs into `PersonnelDetailPage` (Task 3 will use them).

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `["frontend-ui-ux"]`

- [x] 5. Integration & QA Verification

  **What to do**:
  - Verify "Create -> View -> Extend -> Terminate" flow.
  - Check validation rules (dates, max extensions).
  - Take screenshots.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `["playwright"]`

---

## Commit Strategy

| After Task | Message | Files |
|------------|---------|-------|
| 1 | `chore(data): update contract mock data and types` | types/index.ts, data/contracts.json |
| 2 | `feat(contracts): add contract creation page` | pages/ContractCreatePage.tsx |
| 3 | `feat(personnel): implement contracts tab in detail view` | pages/PersonnelDetailPage.tsx |
| 4 | `feat(contracts): add extension and termination dialogs` | components/contracts/*.tsx |

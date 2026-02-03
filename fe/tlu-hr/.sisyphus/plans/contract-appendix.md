# Contract Appendix Refactor

## TL;DR

> **Quick Summary**: Refactor the Contract system to support **nested Appendices** (sub-items within a contract) distinct from Contract Extensions (new contract records).
> 
> **Deliverables**:
> - Updated `Contract` type with `appendices` array.
> - New `AddAppendixDialog` component.
> - Refactored `PersonnelDetailPage` to display nested appendices and manage contract list state.
> 
> **Estimated Effort**: Low (3 tasks)
> **Parallel Execution**: YES - 2 waves
> **Critical Path**: Task 1 → Task 2 → Task 3

---

## Context

### Original Request
User wants to distinguish "Extension" (new contract) from "Appendix" (modification to existing contract). Appendices should be nested lists, not new records.

### Interview Summary
**Decisions**:
- **Data Structure**: Add `appendices: ContractAppendix[]` to `Contract` type.
- **Fields**: Code (`appendixNumber`), Name/Content (`content`), Signed Date (`signDate`).
- **UI**: Nested list (Collapsible/Accordion) inside the Contract Card.
- **State**: Must refactor `PersonnelDetailPage` to use local React state for contracts to support updates.

### Metis Review
**Identified Gaps** (addressed):
- **State Management**: `PersonnelDetailPage` reads directly from JSON import. Must convert to `useState` to allow adding appendices dynamically in the UI.
- **Validation**: Appendix Date >= Contract Start Date.

---

## Work Objectives

### Core Objective
Allow users to add and view contract appendices without creating new contract records.

### Concrete Deliverables
1. `src/types/index.ts` updated.
2. `src/components/contracts/AddAppendixDialog.tsx` created.
3. `src/pages/tccb/PersonnelDetailPage.tsx` updated.

### Definition of Done
- [ ] Can click "Thêm phụ lục" on an Active contract.
- [ ] Dialog opens asking for Number, Content, Date.
- [ ] Validates that Date >= Contract Sign Date.
- [ ] After save, the Appendix appears nested inside the Contract Card.
- [ ] Does NOT change the main contract's status.

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately):
├── Task 1: Update Types & Data
└── Task 2: Create AddAppendixDialog

Wave 2 (After Wave 1):
└── Task 3: Integration in PersonnelDetailPage
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 1 | None | 3 | 2 |
| 2 | None | 3 | 1 |
| 3 | 1, 2 | None | None |

---

## TODOs

- [x] 1. Update Types

  **What to do**:
  - Update `src/types/index.ts`:
    - Export `interface ContractAppendix { id, appendixNumber, content, signDate }`
    - Add `appendices?: ContractAppendix[]` to `Contract` interface.
  - Update `src/data/contracts.json`: (Optional) Add empty `appendices: []` to one record to test structure, or rely on optional type.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

- [x] 2. Create AddAppendixDialog

  **What to do**:
  - Create `src/components/contracts/AddAppendixDialog.tsx`.
  - Props: `contract`, `isOpen`, `onClose`, `onSuccess(appendix)`.
  - Fields:
    - Number (Input, required)
    - Content (Textarea, required)
    - Sign Date (Input type=date, required)
  - Validation: `signDate >= contract.signDate`.
  - Mock Submit: Call `onSuccess` with new appendix object.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: `["frontend-ui-ux"]`

- [x] 3. Integration in PersonnelDetailPage

  **What to do**:
  - Refactor `PersonnelDetailPage.tsx`:
    - Change `const contracts` to `const [contracts, setContracts] = useState(...)`.
    - Add "Thêm phụ lục" button to Active contracts.
    - Implement `handleAddAppendix` logic: update the specific contract in the state array by pushing the new appendix.
    - Render the `appendices` list inside the Contract Card (use a simplified table or list).
    - Integrate `AddAppendixDialog`.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: `["frontend-ui-ux"]`

---

## Commit Strategy

| After Task | Message | Files |
|------------|---------|-------|
| 1 | `chore(types): add ContractAppendix definition` | types/index.ts |
| 2 | `feat(contracts): add AddAppendixDialog component` | components/contracts/AddAppendixDialog.tsx |
| 3 | `feat(personnel): integrate appendix management in detail view` | pages/PersonnelDetailPage.tsx |

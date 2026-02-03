# Contract Wizard Alignment

## TL;DR

> **Quick Summary**: Update the Personnel Wizard (Create/Edit) to capture missing contract fields (`contractNumber`, `jobDescription`) and ensure the "Current Contract" created in the wizard is correctly synced to the Detail Page's contract history list.
> 
> **Deliverables**:
> - Updated `WizardData` type and `step6Schema` validation.
> - Updated `Step6Contract` UI with new fields.
> - Updated `personnel-mapper.ts` to construct full `Contract` objects.
> - Updated `PersonnelCreatePage` to "persist" (mock push) data to shared arrays.
> 
> **Estimated Effort**: Low (4 tasks)
> **Parallel Execution**: YES - 2 waves
> **Critical Path**: Task 1 → Task 2 → Task 3 → Task 4

---

## Context

### Original Request
Fix inconsistency between Personnel Detail Page (Contracts Tab) and the Create/Edit Wizard. The Detail Page shows fields and history that the Wizard fails to capture.

### Interview Summary
**Decisions**:
- **Scope**: Add `contractNumber` and `jobDescription` to Wizard.
- **Strategy**: Keep Wizard creating a *single* initial contract.
- **Persistence**: Simulate saving by mutating the imported `personnelData` and `contractsData` arrays in memory so navigation works.

### Metis Review
**Identified Gaps** (addressed):
- **Validation**: Need to update Zod schema (`src/lib/schemas.ts`).
- **Data Logic**: Mapper needs to explicitly create `Contract` objects with IDs to link everything correctly.

---

## Work Objectives

### Core Objective
Ensure that a personnel created via the Wizard appears in the Detail Page with a correctly populated "Current Contract" and a corresponding entry in the "Contracts" history tab.

### Concrete Deliverables
1. `src/types/wizard.ts` updated.
2. `src/lib/schemas.ts` updated.
3. `src/components/forms/wizard-steps/Step6Contract.tsx` updated.
4. `src/utils/personnel-mapper.ts` updated.
5. `src/pages/tccb/PersonnelCreatePage.tsx` logic updated.

### Definition of Done
- [ ] Wizard Step 6 includes "Số quyết định/HĐ" and "Mô tả công việc".
- [ ] Creating a person -> Detail Page -> Contracts Tab shows the new contract.
- [ ] Contract data (Number, Dates, Type) matches what was entered.

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately):
├── Task 1: Update Types & Schemas (Foundation)
└── Task 2: Update Step6Contract UI (Visual)

Wave 2 (After Wave 1):
├── Task 3: Update Mappers (Logic)
└── Task 4: Update Persistence Logic (Integration)
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 1 | None | 3, 4 | 2 |
| 2 | None | 3, 4 | 1 |
| 3 | 1, 2 | 4 | None |
| 4 | 3 | None | None |

---

## TODOs

- [x] 1. Update Types and Schemas

  **What to do**:
  - Update `src/types/wizard.ts`: Add `contractNumber` (string) and `contractJobDescription` (string) to `WizardData`.
  - Update `src/lib/schemas.ts`: Update `step6Schema` to include these fields. `contractNumber` is required, `jobDescription` is optional.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

- [x] 2. Update Step6Contract UI

  **What to do**:
  - Update `src/components/forms/wizard-steps/Step6Contract.tsx`.
  - Add `Input` for "Số hợp đồng/Quyết định" (Required).
  - Add `Textarea` for "Mô tả công việc" (Optional).
  - Arrange fields logically (e.g., Number first).

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: `["frontend-ui-ux"]`

- [x] 3. Update Mappers

  **What to do**:
  - Update `src/utils/personnel-mapper.ts`.
  - `personnelToWizardData`: Map `personnel.currentContract.contractNumber` -> `wizardData.contractNumber`, etc.
  - `wizardDataToPersonnel`: 
    - Create a full `Contract` object (mock ID `cont-${Date.now()}`).
    - Populate all fields (dates, type, number, desc).
    - Set `status` to `ACTIVE`.
    - Push this contract to the `contracts` array of the returned Personnel object.
    - Set `currentContract` to this object.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

- [x] 4. Update Persistence Logic

  **What to do**:
  - Update `src/pages/tccb/PersonnelCreatePage.tsx`.
  - In `handleSubmit`:
    - Import `contractsData` from `src/data/contracts.json`.
    - Import `personnelData` from `src/data/personnel.json`.
    - After getting the new `personnel` object from mapper:
      - Push `personnel` to `personnelData`.
      - Push `personnel.contracts` items to `contractsData`.
    - This mocks the "Save" so Detail page can read it.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

---

## Commit Strategy

| After Task | Message | Files |
|------------|---------|-------|
| 1+2 | `feat(wizard): add contract number and desc fields` | types/wizard.ts, lib/schemas.ts, Step6Contract.tsx |
| 3 | `feat(utils): update mapper to create full contract` | utils/personnel-mapper.ts |
| 4 | `feat(personnel): implement mock persistence for new records` | pages/PersonnelCreatePage.tsx |

# Plan: Refactor Wizard to Accordion with Validation

## TL;DR

> **Quick Summary**: Refactor `PersonnelCreatePage` and `PersonnelEditPage` to use a multi-step Accordion UI instead of a single-step wizard. Implement Zod-based validation with different behaviors for Create (guided sequential) vs Edit (free roaming).
> 
> **Deliverables**:
> - New `Accordion` component (Shadcn UI).
> - Zod validation schemas in `src/lib/schemas.ts`.
> - Refactored `PersonnelCreatePage` (Guided Accordion).
> - Refactored `PersonnelEditPage` (Free Roaming Accordion).
> - Updated Step components to display validation errors.
> 
> **Estimated Effort**: Medium
> **Parallel Execution**: YES - 2 waves
> **Critical Path**: Schemas -> Component Install -> Page Refactoring

---

## Context

### Original Request
Refactor the multi-step wizard to show all steps on a single screen using collapsible accordions. Improve UX by removing "continue" button friction (or changing its behavior).

### Interview Summary
**Key Discussions**:
- **Create Mode**: Guided validation. User clicks "Next" inside accordion -> validates -> opens next step -> "Next" button disappears.
- **Edit Mode**: Free roaming. All steps accessible. Validation happens on global submit.
- **Interaction**: Accordion allows multiple sections open at once (`type="multiple"`).
- **Component**: Install missing Shadcn `Accordion`.

**Research Findings**:
- Current implementation uses manual `currentStep` state.
- No existing validation logic (inputs are uncontrolled or simple controlled without schema).
- `zod` and `react-hook-form` are dependencies but unused in the wizard.

### Metis Review
**Identified Gaps** (addressed):
- Missing `Accordion` component -> Added task to install/create.
- Missing validation logic -> Added task to create Zod schemas.
- UX difference between Create/Edit -> Explicitly separated into two different implementation tasks.

---

## Work Objectives

### Core Objective
Replace the linear "one-step-at-a-time" wizard with a vertical accordion flow that supports both guided (sequential) and free-form (edit) interaction models.

### Concrete Deliverables
- `src/components/ui/accordion.tsx`
- `src/lib/schemas.ts`
- `src/pages/tccb/PersonnelCreatePage.tsx` (Refactored)
- `src/pages/tccb/PersonnelEditPage.tsx` (Refactored)

### Definition of Done
- [ ] Create Page: Steps are accordions. "Next" button validates and opens next step.
- [ ] Edit Page: Steps are accordions. No "Next" buttons. Save validates all.
- [ ] Validation errors appear when validation fails.

### Must Have
- Zod schemas for all 8 steps.
- "Next" button disappears after successful step completion in Create mode.
- Accordion `type="multiple"`.

### Must NOT Have
- "Next" buttons in Edit mode.
- Global "Save" button enabled before all steps are valid (in Create mode).

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: NO (Only Playwright, no unit test scripts in package.json)
- **User wants tests**: Manual verification only (implied by lack of test request and infra).
- **Approach**: Manual QA procedures using browser or verification scripts.

### Automated Verification (Agent-Executable)

**For UI Changes** (using playwright):
```bash
# Verify Accordion existence
test -f src/components/ui/accordion.tsx && echo "Accordion exists"
```

**For Logic Changes** (using node/bun REPL):
```bash
# Verify schema validation (after schemas created)
node -e 'const { step1Schema } = require("./src/lib/schemas"); const res = step1Schema.safeParse({}); console.log(res.success)'
# Expected: false (validation fails on empty)
```

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Setup & Logic):
├── Task 1: Install Accordion
├── Task 2: Create Zod Schemas
└── Task 3: Update Step Components (Props & Error UI)

Wave 2 (Page Implementation):
├── Task 4: Refactor PersonnelCreatePage (Guided)
└── Task 5: Refactor PersonnelEditPage (Free Roaming)
```

---

## TODOs

- [x] 1. Install Shadcn Accordion Component

  **What to do**:
  - Run `npx shadcn@latest add accordion` OR create `src/components/ui/accordion.tsx` manually if CLI fails.
  - Ensure it exports `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: [`bash`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1

  **Verification**:
  ```bash
  ls src/components/ui/accordion.tsx
  # Expected: src/components/ui/accordion.tsx
  ```

- [x] 2. Define Zod Schemas for Wizard Steps

  **What to do**:
  - Create `src/lib/schemas.ts` (or `src/schemas/wizard.ts`).
  - Define Zod schemas for `Step1` through `Step8` based on `WizardData` interface in `src/types/wizard.ts`.
  - Ensure all required fields (marked with `*` in UI) are required in Zod.
  - Export `step1Schema`, `step2Schema`, etc., and a `fullWizardSchema`.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
  - **Skills**: [`typescript`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1

  **References**:
  - `src/types/wizard.ts` - Data structure.
  - `src/components/forms/wizard-steps/Step1BasicInfo.tsx` - To see which fields have asterisks (*).

  **Verification**:
  ```bash
  # Check if file exists and compiles
  ls src/lib/schemas.ts
  ```

- [x] 3. Update Step Components to Support Error Display

  **What to do**:
  - Update `src/components/forms/wizard-steps/Step*.tsx` (all 8 files).
  - Update `StepProps` interface to include optional `errors?: Record<string, string>`.
  - In the UI, display the error message below the input if `errors[fieldName]` exists.
  - Use red text or a standardized error component.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`, `typescript`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1

  **References**:
  - `src/components/forms/wizard-steps/Step1BasicInfo.tsx`
  - Use standard Tailwind error classes (e.g., `text-red-500 text-sm mt-1`).

- [x] 4. Refactor PersonnelCreatePage (Guided Accordion)

  **What to do**:
  - Import `Accordion` components and Schemas.
  - Change state: `activeItems` (array of step IDs) and `completedSteps` (Set of step IDs).
  - Render `Accordion` type="multiple".
  - Map through `steps` to render `AccordionItem`.
  - Inside `AccordionContent`:
    - Render Step Component with `errors` prop.
    - **Logic**: Check if step is in `completedSteps`.
      - IF NO: Render "Next" button. On click -> Validate with Schema -> If valid, add to completed, add next step to active. If invalid, set errors.
      - IF YES: Render nothing (or "Edit" button if you want to allow re-locking, but user said disappear).
  - Global "Save" button: Enable only when all steps completed.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`, `typescript`]

  **Parallelization**:
  - **Can Run In Parallel**: NO (Depends on Tasks 1, 2, 3)
  - **Parallel Group**: Wave 2
  - **Blocks**: None

  **References**:
  - `src/pages/tccb/PersonnelCreatePage.tsx`
  - `src/lib/schemas.ts`

- [x] 5. Refactor PersonnelEditPage (Free Roaming Accordion)

  **What to do**:
  - Import `Accordion` components.
  - Remove `currentStep` logic.
  - Render `Accordion` type="multiple" with `defaultValue` set to all step IDs (or just first).
  - Render Step Components directly inside Accordion Content.
  - **No "Next" buttons**.
  - Global "Save" button: Validate entire form (using `fullWizardSchema` or validating each step) on click.
  - Show errors on specific steps if validation fails.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`, `typescript`]

  **Parallelization**:
  - **Can Run In Parallel**: NO (Depends on Tasks 1, 2, 3)
  - **Parallel Group**: Wave 2

  **References**:
  - `src/pages/tccb/PersonnelEditPage.tsx`

---

## Success Criteria

### Final Checklist
- [x] `PersonnelCreatePage` shows accordion.
- [x] `PersonnelCreatePage` enforces sequential completion (guided).
- [x] `PersonnelEditPage` shows accordion (free roaming).
- [x] Steps display validation errors.
- [x] Form submission works and saves data.

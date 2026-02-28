# COMPONENTS/FORMS KNOWLEDGE BASE

**Generated:** 2026-02-07
**Context:** Complex multi-step forms (Wizard) and reusable form inputs.

## OVERVIEW
Centralized collection of form components powered by React Hook Form and Zod validation. Includes both atomic input wrappers and the complex personnel creation wizard.

## STRUCTURE
```
src/components/forms/
├── wizard-steps/    # Personnel creation wizard (8 steps)
├── WizardForm.tsx   # Main wizard orchestrator
├── DatePicker.tsx   # Reusable date input
├── Combobox.tsx     # Searchable select input
└── [Input].tsx      # Other specialized inputs
```

## WHERE TO LOOK
| Component | Location | Notes |
|-----------|----------|-------|
| **Wizard Logic** | `WizardForm.tsx` | State orchestration for multi-step flow |
| **Step 1: Info** | `wizard-steps/BasicInfoStep.tsx` | Personal details form |
| **Schemas** | `src/lib/schemas.ts` | Zod validation schemas for all steps |
| **Inputs** | `src/components/ui/input.tsx` | Base input primitive (Shadcn) |

## CONVENTIONS
- **Validation**: ALL forms must use Zod schemas defined in `@/lib/schemas`.
- **State**: Wizard state is managed via `usePersonnelStore` (Zustand) to persist across steps.
- **Hook Form**: Use `useFormContext` in child steps to access wizard methods.
- **Naming**: Step components suffix with `Step.tsx` (e.g., `SalaryStep.tsx`).

## ANTI-PATTERNS
- **Uncontrolled Inputs**: Do not use raw `<input>` tags; always wrap in `<FormField>` from Shadcn.
- **Inline Validation**: Do not write validation logic in components; use Zod schemas.
- **Local State**: Avoid `useState` for form data; use `form.watch()` or `usePersonnelStore`.

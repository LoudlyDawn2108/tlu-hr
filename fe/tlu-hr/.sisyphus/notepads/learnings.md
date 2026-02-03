# Learnings from Step6Contract UI Update

## Component Structure
- The `Step6Contract` component is part of a multi-step wizard.
- It receives `data`, `updateData`, and `errors` as props.
- It uses `shadcn/ui` components: `Input`, `Label`, `Select`, `Textarea`.

## Changes Made
- Added `contractNumber` input field at the top of the form.
- Added `contractJobDescription` textarea field at the bottom of the form.
- Both fields are bound to the `wizardData` object and support error display.
- Used `Textarea` component from `@/components/ui/textarea` for the job description.

## Verification
- Build passed with `npm run build`.

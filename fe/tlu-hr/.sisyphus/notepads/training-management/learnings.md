- When working with `TrainingCourse` status, use the `TrainingStatus` enum from `@/types` instead of string literals to avoid type errors.
- `TrainingStatus` enum values are: `PLANNED`, `OPEN`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`.
- Local state updates for `TrainingCourse` should respect the `TrainingStatus` type.
- Training Course Creation: Default status was 'planned' which prevented immediate enrollment. Changed to 'open' to facilitate the workflow. Consider adding a status selector in the creation form for better UX.

## [2026-02-03] Phase 4 Training Management - COMPLETED

### Summary
All 11 tasks completed successfully:
1. Updated training.json with full TrainingCourse fields + sample participants
2. Created training-helpers.ts with 6 utility functions
3. Enhanced TrainingListPage with row actions, year filter, create button
4. Created TrainingCreatePage with Card-based form + validation
5. Added training routes to router.tsx
6. Created TrainingDetailPage with participants table
7. Created TrainingEditPage with pre-populated form
8. Created EnrollPersonnelDialog with validation
9. Created UpdateProgressDialog with certificate auto-issuance
10. Updated sidebar navigation
11. Ran full E2E testing via Playwright

### Bug Fixed
- TrainingCreatePage was setting `status: "planned"` by default, but canEnroll() only allows enrollment when `status === "open"`. Changed default to `"open"`.
- TrainingDetailPage had placeholder `<div />` instead of actual UpdateProgressDialog component.

### Key Patterns Used
- Card-based form layout (following ContractCreatePage)
- Dialog pattern for modals (following ContractExtensionDialog)
- Row actions dropdown menu pattern
- Toast notifications for user feedback
- In-memory state management (no persistence)

### Evidence
11 screenshots captured in `.sisyphus/evidence/`

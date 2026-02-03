# Learnings - Contract Appendix

## Component Implementation
- Created `AddAppendixDialog` cloning structure from `ContractExtensionDialog`.
- Validated `signDate` against `contract.signDate` (must be same or later).
- Used `Textarea` from `@/components/ui/textarea` for content field.
- Mocked submission process with `setTimeout` and local callback.

## Issues/Notes
- `src/types/contract.ts` referenced in thought process was missing, used `src/types/index.ts` instead which contains the central definitions.
- `ContractAppendix` interface was already present in `src/types/index.ts` (added in Task 1).

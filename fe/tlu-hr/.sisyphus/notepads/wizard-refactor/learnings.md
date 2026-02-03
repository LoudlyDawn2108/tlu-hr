
## PersonnelCreatePage Refactor (Guided Accordion) (2024-02-03)
- **Guided Flow Logic**: Implemented using `activeSteps` (for open/close state) and `completedSteps` (Set of IDs for validation state).
- **Sequential Enforcement**: Disabled `AccordionItem` triggers for future steps until previous step is completed using `disabled={index > 0 && !completedSteps.has(steps[index - 1].id)}`.
- **Validation UX**: 
  - Per-step validation on "Next" click. 
  - Global re-validation on "Save" click that populates `errors` state and removes invalid steps from `completedSteps` to guide user back to errors.
- **Visual Feedback**: Added `CheckCircle2` icon for completed steps in Accordion Trigger.
- **Component Reuse**: Reused existing `Step*.tsx` components which were already prepared to accept `errors`.
- **Toast Limitation**: Re-confirmed `useToast` lacks `variant` support, stuck to simple title/description toasts.

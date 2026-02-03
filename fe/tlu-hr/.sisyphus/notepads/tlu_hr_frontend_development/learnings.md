# Learnings
- When working with JSON data that doesn't perfectly match TypeScript interfaces (e.g., extra ID fields for relational linking), explicit casting (e.g., `as any[]` then filter then `as Type[]`) is often necessary to avoid TS errors while maintaining functionality.
- Reusing existing state (`selectedContract`) for multiple dialogs (extension, termination, appendix) is efficient but requires careful cleanup (setting to null) on close.
- Shadcn `Accordion` component is great for nested lists like contract appendices.

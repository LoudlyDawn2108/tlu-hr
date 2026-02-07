# COMPONENTS KNOWLEDGE BASE

**Overview:** Central repository for UI primitives, shared form patterns, and domain-specific view logic.

## STRUCTURE
- **`ui/`**: Pure Shadcn/ui primitives. Radix-based, styling-only, no business logic.
- **`forms/`**: React Hook Form + Zod integrations. Includes `wizard-steps` for multi-stage processes.
- **`tables/` & `charts/`**: Specialized components for data-heavy views using TanStack Table and Recharts.
- **`layout/`**: Application shell, navigation, and persistent structural elements.
- **`[domain]/`**: (e.g., `contracts/`, `training/`) Feature-specific components, primarily complex dialogs and specialized widgets.

## WHERE TO LOOK
| Type | Location | Notes |
|------|----------|-------|
| **Atomic UI** | `src/components/ui/` | Check here before creating any new UI element. |
| **Input Fields** | `src/components/ui/input.tsx` | Standardized input styling. |
| **Dialogs** | `src/components/[domain]/*Dialog.tsx` | Reusable modal logic for features. |
| **Layouts** | `src/components/layout/AppLayout.tsx` | Main dashboard structure. |

## CONVENTIONS
- **Shadcn Usage**: Always use components from `ui/` as the building blocks for more complex components.
- **Styling**: Use Tailwind CSS via the `cn()` utility. Avoid arbitrary values; stick to the theme.
- **Form Patterns**: Wrap `ui/form` components. Use Zod schemas for all validation.
- **Labels**: Standardize on Vietnamese labels (hardcoded) as per existing components.
- **Composition**: Prefer component composition over giant prop lists for flexibility.

## ANTI-PATTERNS
- **Primitive Pollution**: Do NOT add business logic or domain-specific props to `src/components/ui/`.
- **Inline Overrides**: Avoid direct Tailwind classes for layout if a `ui/` component (like `Card` or `Separator`) provides the same.
- **State Bloat**: Keep components in this directory focused on view logic; lift complex state to `src/hooks` or `src/stores`.

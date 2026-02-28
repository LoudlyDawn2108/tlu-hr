# UI PRIMITIVES KNOWLEDGE BASE

**Domain:** Atomic UI Components (Shadcn/ui + Radix)
**Files:** 31 primitives

## OVERVIEW
This directory contains the atomic building blocks of the TLU HRMS interface. These components are strictly presentational (stateless), wrapping **Radix UI** primitives with **Tailwind CSS v4** styling. They provide a consistent design language and accessibility foundation for the entire application.

## STRUCTURE
| Category | Key Primitives |
|----------|----------------|
| **Inputs** | `input`, `select`, `textarea`, `switch`, `combobox` |
| **Feedback** | `alert`, `progress`, `skeleton`, `sonner` |
| **Overlays** | `dialog`, `sheet`, `popover`, `alert-dialog`, `tooltip` |
| **Data Display**| `table`, `card`, `badge`, `avatar`, `accordion` |
| **Navigation** | `dropdown-menu`, `tabs`, `sidebar` |

## WHERE TO LOOK
- **`button.tsx`**: Implementation of `cva` (class-variance-authority) for theme-consistent button variants.
- **`input.tsx`**: Standardized text entry with focus rings and disabled states.
- **`dialog.tsx`**: Modal implementation using Radix, including Portal and Overlay logic.
- **`form.tsx`**: Integration layer between `react-hook-form` and UI primitives for error handling.

## CONVENTIONS
- **Ref Forwarding**: All components MUST use `React.forwardRef` to allow parent access to DOM nodes.
- **Class Merging**: Always use the `cn()` utility to merge default styles with incoming `className` props.
- **Variant Management**: Use `cva` for components with multiple visual states (Button, Badge).
- **Prop Spreading**: Support standard HTML attributes by spreading `...props` onto the root element.
- **Accessibility**: Never bypass Radix UI defaults; ensure `aria-*` attributes are preserved.

## ANTI-PATTERNS
- **Business Logic**: Never include API calls or domain-specific logic (e.g., TCCB/TCKT validation) here.
- **Hardcoded Labels**: Avoid Vietnamese strings in primitives; use props for all text content.
- **Direct Style Overrides**: Avoid `style={{...}}`; use Tailwind classes via `cn()` exclusively.
- **Complex State**: Keep these components controlled/uncontrolled via props; use `hooks/` for complex logic.

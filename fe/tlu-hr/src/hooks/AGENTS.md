# SRC/HOOKS KNOWLEDGE BASE

## OVERVIEW
Standard utility collection for shared logic and UI state management.

## STRUCTURE
- `useSessionTimeout.ts`: Aggressive auto-logout with activity tracking and warning countdown.
- `use-toast.ts`: Simple hook for managing transient UI notifications.
- `use-mobile.ts`: Viewport-aware hook for detecting mobile screen sizes.

## WHERE TO LOOK
| Category | File | Description |
|----------|------|-------------|
| **Auth/Security** | `useSessionTimeout.ts` | Activity-based session management |
| **UI State** | `use-toast.ts` | Global toast notification control |
| **Responsive** | `use-mobile.ts` | Breakpoint-based UI logic |

## CONVENTIONS
- **Naming**: Use `useCamelCase` for logical hooks, `use-kebab-case` for Shadcn/UI derived hooks.
- **Complexity**: Keep hooks focused on a single concern (Single Responsibility).
- **Custom vs Library**: Prefer custom hooks for domain-specific logic (e.g., Session); use library hooks for general needs (Query, Form).
- **Ref usage**: Use `useRef` for timers or values that shouldn't trigger re-renders.

## ANTI-PATTERNS
- **Prop Drilling via Hooks**: Do not use hooks to bypass context when state is shared globally.
- **Direct Event Listeners**: Avoid raw `window.addEventListener` without proper cleanup in `useEffect`.
- **Mixing Logic and UI**: Hooks should return data or control functions, not JSX elements.
- **Magic Breakpoints**: Use constants for screen sizes (e.g., `MOBILE_BREAKPOINT`).

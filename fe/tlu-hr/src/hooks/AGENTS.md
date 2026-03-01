# SRC/HOOKS KNOWLEDGE BASE

## OVERVIEW
The `src/hooks` directory contains shared React hooks that encapsulate complex logic, UI states, and side effects. These hooks provide a unified interface for session management, notifications, and responsive layout detection.

## STRUCTURE
- **Auth & Security**: 
  - `useSessionTimeout.ts`: Logic for activity tracking, idle warnings, and auto-logout.
- **UI & Feedback**:
  - `use-toast.ts`: State management for transient notification overlays.
  - `use-mobile.ts`: Breakpoint detection (`768px`) for mobile-specific behaviors.
- **Utility Logic**: Centralized hooks for DOM interactions and repetitive business rules.

## WHERE TO LOOK
| Hook Name | File | Primary Function |
|-----------|------|------------------|
| `useSessionTimeout` | `useSessionTimeout.ts` | Auto-logout and idle timer control. |
| `useToast` | `use-toast.ts` | Dispatching and tracking active toasts. |
| `useIsMobile` | `use-mobile.ts` | Reactive mobile viewport detection. |

## CONVENTIONS
- **Custom vs Library**: Prefer custom hooks for project-specific business logic; use library hooks (e.g., TanStack Query) for standard data fetching.
- **Naming**:
  - `useCamelCase.ts` for logical/business hooks.
  - `use-kebab-case.ts` for UI/primitive hooks (Shadcn style).
- **Cleanup**: Always return a cleanup function in `useEffect` for timers and event listeners.
- **Refs for State**: Use `useRef` to store mutable values (like timer IDs) that shouldn't trigger re-renders.

## ANTI-PATTERNS
- **JSX in Hooks**: Hooks must return data or control functions. Never return JSX elements; keep UI logic in components.
- **Excessive State**: Avoid creating state for values that can be derived from existing props or state.
- **Magic Numbers**: Define breakpoints and timeouts as constants within the hook or a shared config.
- **Direct DOM Manipulation**: Avoid manual DOM queries; use React refs and standard hook patterns.

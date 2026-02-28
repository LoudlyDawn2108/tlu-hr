# TYPES KNOWLEDGE BASE

## OVERVIEW
Single source of truth for application-wide type definitions, domain models, and API contracts.

## STRUCTURE
- `index.ts`: Central registry for core domain entities (Personnel, Unit, Training) and shared API response types.
- `wizard.ts`: Specialized data structures for multi-step form state and onboarding flows.
- `*.ts`: Domain-specific type modules should be added here if they exceed 200 lines in `index.ts`.

## WHERE TO LOOK
| Category | Location | Notes |
|----------|----------|-------|
| **Enums** | `index.ts` (Top) | Statuses, Types, Roles, and Categories |
| **Domain Models** | `index.ts` (Middle) | `Personnel`, `Contract`, `OrganizationUnit` |
| **API Helpers** | `index.ts` (Bottom) | `ApiResponse<T>`, `PaginatedResponse<T>` |
| **Feature Types** | `wizard.ts` etc. | Localized but complex feature state |

## CONVENTIONS
- **Naming**: Use `PascalCase` for all Types, Interfaces, and Enums.
- **Enums**: Always use `enum` for fixed string sets (e.g., `UserRole`) to ensure runtime/type-time alignment.
- **Interfaces**: Prefer `interface` over `type` for domain models to allow for declaration merging/extension.
- **Centralization**: All types used in >1 component or across different layers (hook/store/view) MUST live here.

## ANTI-PATTERNS
- **Inline Types**: Do not define complex models directly in components or hooks.
- **Any-Leak**: Avoid `any` or `unknown` without explicit narrowing; use Zod for validation at boundaries.
- **Redundant Defs**: Do not redefine backend entities; keep this in sync with API specifications.
- **Local Enums**: Avoid defining enums inside component files.

# TYPES KNOWLEDGE BASE

## OVERVIEW
The `src/types` directory serves as the centralized source of truth for all TypeScript definitions within the TLU HRMS. It encompasses domain models, API request/response contracts, and application-level state structures to ensure end-to-end type safety across the frontend.

## STRUCTURE
- `index.ts`: The primary registry. Contains shared enums (roles, statuses), core domain entities (Personnel, Contract, Unit), and generic API helpers.
- `wizard.ts`: Dedicated types for the complex, multi-step personnel onboarding forms and wizard state.
- **Scalability**: If a specific domain module (e.g., Training, Salary) grows significantly, it should be extracted from `index.ts` into a dedicated file.

## WHERE TO LOOK
| Category | File | Description |
|----------|------|-------------|
| **Enums** | `index.ts` | All categorical constants (UserRole, ContractStatus, etc.) |
| **Domain Models** | `index.ts` | Primary business entities: `Personnel`, `OrganizationUnit`, `Contract` |
| **API Responses** | `index.ts` | Generic wrappers like `ApiResponse<T>` and `PaginatedResponse<T>` |
| **Feature State** | `wizard.ts` | UI-specific state models like `WizardData` |

## CONVENTIONS
- **Naming**: Use `PascalCase` for all interfaces, types, and enums.
- **Enums**: Use string-based enums exclusively for fixed domain sets (e.g., `PersonnelStatus`) to ensure runtime/type-time alignment.
- **Interfaces vs Types**:
  - Use `interface` for domain models and objects to allow for future extension/merging.
  - Use `type` for unions, intersections, or complex utility transformations.
- **Strictness**: No `any`. Use `unknown` with narrowing or Zod validation at boundaries.
- **Centralization**: All types used across different layers (hooks, stores, views) MUST be defined here.

## ANTI-PATTERNS
- **Any-Leak**: Using `any` or `unknown` without narrowing. This degrades the safety of the entire system.
- **Inline Types**: Defining complex structures directly in components, hooks, or function signatures.
- **Duplicate Enums**: Defining enums locally that mirror or compete with those in the central registry.
- **Mixed Domain**: Mixing UI-only state types with persistence-level domain models without clear separation.
- **Loose Exports**: Exporting internal implementation details that aren't needed globally.

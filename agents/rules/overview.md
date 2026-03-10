# Folder Structure - Quick Reference

**For detailed information, see:**

- [Component Organization](component-organization.md) - Component structure,
  Form/Field/Base patterns
- [Hooks, Utils & Types](hooks-utils-types.md) - Organization rules for hooks,
  utils, types
- [Code Examples](examples.md) - Complete examples and patterns

---

## Architecture Principles

The codebase follows a **hybrid/custom architecture**:

- **Route-based modules** (`src/modules/`) - Self-contained page/section modules
- **Shared reusable code** (`src/shared/`) - Components, utilities, hooks used
  across modules
- **Clear separation of concerns** - Business logic in modules, generic logic in
  shared
- **Complexity-based organization** - Simple code = single files, complex code =
  folders

**Key Principle:** Code location determined by **scope of usage** and
**complexity**.

---

## Core Directories

| Directory            | Purpose                     | When to Use                    |
| -------------------- | --------------------------- | ------------------------------ |
| `src/modules/`       | Route/page modules          | Module-specific business logic |
| `src/shared/`        | Reusable shared code        | Used across multiple modules   |
| `src/modals/`        | Modal components            | Always use folders             |
| `src/app/`           | App initialization & stores | Global config, Zustand stores  |
| `src/graphql/`       | GraphQL operations          | Queries, mutations, fragments  |
| `src/api/generated/` | Generated GraphQL code      | **DO NOT EDIT MANUALLY**       |
| `src/constants/`     | App-wide constants          | Global options, config         |
| `src/types/`         | Global type definitions     | Truly global types only        |

### Deprecated (Do Not Add New Code)

- `src/pages/` → Use `src/modules/`
- `src/forms/` → Use `src/shared/components/` or module components
- `src/shared/ui/` → Use `src/shared/components/`
- `src/assets/` → Use `src/redesign-assets/`
- `src/services/` → Being split into utils

---

## Quick Decisions

### Where Should My Component Go?

```
Used only in one module?
├─ YES → src/modules/{moduleName}/components/
└─ NO  → Is it module-specific but reusable?
         ├─ YES → src/shared/components/{ModuleName}/
         └─ NO  → src/shared/components/
                  (Form* → Form/, Field* → Field/, shadcn → common/)
```

### Where Should My Hook Go?

```
Used only in one module?
├─ YES → src/modules/{moduleName}/hooks/
└─ NO  → src/shared/lib/hooks/{category}/
```

### Where Should My Util Go?

```
Used only in one module?
├─ YES → src/modules/{moduleName}/utils/{utilName}
└─ NO  → src/shared/lib/utils/{category}/
```

### Folder vs Single File?

```
Has sub-components, types.ts, hooks.ts, or utils.ts?
├─ YES → Create folder
├─ Is it a modal? → Folder (always)
└─ NO  → Single file
```

---

## Common File Locations

| What                      | Where                                       |
| ------------------------- | ------------------------------------------- |
| Module component          | `src/modules/{moduleName}/components/`      |
| Shared component          | `src/shared/components/`                    |
| Module-specific shared    | `src/shared/components/{ModuleName}/`       |
| shadcn/base component     | `src/shared/components/common/`             |
| Form component (Form\*)   | `src/shared/components/Form/`               |
| Field component (Field\*) | `src/shared/components/Field/`              |
| Modal                     | `src/modals/{ModalName}/`                   |
| Module hook               | `src/modules/{moduleName}/hooks/`           |
| Shared hook               | `src/shared/lib/hooks/{category}/`          |
| Module util               | `src/modules/{moduleName}/utils/{utilName}` |
| Shared util               | `src/shared/lib/utils/{category}/`          |
| Module types              | `src/modules/{moduleName}/types.ts`         |
| Global types              | `src/types/`                                |
| GraphQL queries           | `src/graphql/{domain}/*.queries.graphql`    |
| GraphQL mutations         | `src/graphql/{domain}/*.mutations.graphql`  |
| Module constants          | `src/modules/{moduleName}/constants.ts`     |
| App constants             | `src/constants/`                            |
| Validation schemas        | `src/shared/lib/schema/` (shared) or module |
| Zustand microstore        | `src/app/stores/use{Name}Store.ts`          |
| Assets                    | `src/redesign-assets/{moduleName}/`         |

---

## Import Strategy

**General rule:** Path aliases for cross-module, relative imports for local
module code.

### Use Path Aliases For:

- Cross-module imports (shared, other modules, API)
- `@shared/*`, `@modules/*`, `@api/*`, etc.

### Use Relative Imports For:

- Local module code (within same module folder)
- `./components`, `../hooks`, `./types`, etc.

**Summary:**

- Same module? → Relative (`./`, `../`)
- Different module/shared? → Path alias (`@shared`, `@modules`)

---

## Naming Conventions

| Type              | Convention       | Examples                             |
| ----------------- | ---------------- | ------------------------------------ |
| Components        | PascalCase       | `Button.tsx`, `UserProfile.tsx`      |
| Hooks             | camelCase (useX) | `useAuth.ts`, `useCalendarEvents.ts` |
| Utils             | camelCase        | `formatDate.ts`, `getCanEdit.ts`     |
| Types             | camelCase        | `types.ts`, `user.ts`                |
| Constants         | camelCase        | `constants.ts`, `routes.ts`          |
| Modules (folders) | kebab-case       | `calendar/`, `athlete-management/`   |
| Component folders | PascalCase       | `Button/`, `Dialog/`                 |

**Variables:**

- Components: `PascalCase`
- Hooks: `camelCase` with `use` prefix
- Constants: `UPPER_SNAKE_CASE`
- Regular vars/functions: `camelCase`
- Types/Interfaces: `PascalCase`

---

## GraphQL Workflow

1. Create/modify `.graphql` files in `src/graphql/{domain}/`

   - `{domain}.queries.graphql`
   - `{domain}.mutations.graphql`
   - `{domain}.fragments.graphql`
   - Complex queries: `{specificQuery}.graphql`

2. Run: `npm run generate` or `npm run generate:dev`

3. Use generated hooks from `src/api/generated/hooks.ts`

4. **Never edit** files in `src/api/generated/` manually

---

## State Management (Zustand)

**Microstore pattern (preferred):**

- Simple, focused stores for specific features
- Location: `src/app/stores/use{Name}Store.ts`

**Monolithic store (legacy):**

- Complex interconnected state
- Location: `src/app/stores/config/`

**When to use:**

- Zustand: Shared state across unrelated components, persists across routes
- Props: Local state, 1-3 levels deep, clear parent → child flow
- Context: Gray area (minimal usage currently)

---

## Component Patterns

### Three-Tier Form Architecture

1. **Base Component** (`src/shared/components/`) - Standalone, can include
   shared logic
2. **Form Component** (`src/shared/components/Form/`) - react-hook-form context
3. **Field Component** (`src/shared/components/Field/`) - Standalone with
   label/errors

Example: `InputNumber.tsx`, `FormInputNumber.tsx`, `FieldInputNumber.tsx`

### Compound Components

**Without dot notation:**

```typescript
// ❌ DON'T: <Dialog.Header />
// ✅ DO: <DialogHeader />
```

### Barrel Exports (index.ts)

**Use when:**

- Component has folder structure
- Folder with 2+ exports
- Module with 2+ components

**Don't use:**

- Single file components
- Just one export

---

## Type vs Interface

**Use `interface` for component props:**

```typescript
interface ButtonProps { ... }
```

**Exception: Modals use `type`:**

```typescript
export type ModalProps = { ... }
```

**Use `type` for unions, intersections:**

```typescript
type Status = "idle" | "loading";
```

---

## Assets

**All assets in `src/redesign-assets/` organized by module:**

```
src/redesign-assets/
├── {moduleName}/
│   ├── icons/
│   ├── images/
│   └── fonts/
└── common/              # Truly shared (logo, brand)
```

**Prefer lucide-react for icons.**

---

## Module Structure Example

```
src/modules/calendar/
├── components/
│   ├── CalendarGrid/       # Complex component folder
│   │   ├── CalendarGrid.tsx
│   │   ├── types.ts
│   │   └── index.ts
│   ├── EventCard.tsx       # Simple single-file component
│   └── index.ts            # Barrel export
├── hooks/
│   ├── useCalendarEvents.ts
│   └── index.ts
├── utils/
│   └── getCalendarRange.ts
├── types.ts
├── constants.ts
└── Calendar.tsx
```

---

## Shared Components Structure

```
src/shared/components/
├── common/                 # shadcn/base pure UI components only
├── Form/                   # Form* components (react-hook-form)
├── Field/                  # Field* components (standalone)
├── Calendar/               # Calendar-specific shared
├── Exercises/              # Exercise-specific shared
└── DataTable/              # Table components
```

---

## Hook & Util Categories

**Hooks:**

- `auth/` - useAuth, usePermissions
- `data/` - useExerciseData, useAthleteData
- `ui/` - useModal, useToast
- `navigation/` - useExerciseEdit, useRouteParams

**Utils:**

- `apollo/` - pagination, cache utils
- `date/` - formatDate, dateRange
- `user/` - getCanEdit, permissions
- `validation/` - isEmail, isPhoneNumber
- `formatting/` - currency, number

---

## Summary

1. **Clear separation by scope** - Module vs shared vs global
2. **Complexity-based organization** - Simple = single file, complex = folder
3. **Smart import strategy** - Relative for local, path aliases for cross-module
4. **Category organization** - All shared code must be categorized
5. **Centralized assets** - All in `redesign-assets/` by module
6. **Avoid over-engineering** - Single file unless complexity demands folder

**When in doubt:**

- Check existing similar code
- Follow the decision flowcharts
- Ask: "Does this need to be shared?" and "Is this complex enough for a folder?"

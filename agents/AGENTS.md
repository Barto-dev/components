- When adding comments, avoid buzzwords and jargon. Be clear and concise.

## Detailed Documentation

For comprehensive guidance on specific topics, see:

- **[Folder Structure Overview](./agents/rules/overview.md)** - Quick reference
  guide with decision flowcharts and common file locations
- **[Component Organization](./agents/rules/component-organization.md)** -
  Component structure, Form/Field/Base three-tier patterns
- **[Hooks, Utils & Types](./agents/rules/hooks-utils-types.md)** - Organization
  rules for hooks, utilities, and type definitions
- **[Code Examples](./agents/rules/examples.md)** - Complete working examples
  and patterns

### Type Checking

```bash
npm run build:check        # Type check only (no emit)
```

### GraphQL Code Generation

```bash
npm run generate           # Generate types from GraphQL schemas
```

**IMPORTANT:** Always run `npm run generate` after modifying any `.graphql`
files to regenerate TypeScript types and hooks.

## Testing

This project does not currently include automated tests.

## Architecture

### Path Aliases (Critical for Development)

**Import Strategy:**

- Use **relative imports** for code within the same module (e.g.,
  `./components`, `../utils`)
- Use **path aliases** for cross-module imports

### Directory Structure

**Quick Overview:**

- **`src/app/`** - App initialization, configs, stores
  - `configs/apollo/` - Apollo Client configuration with auth middleware
  - `stores/` - Zustand stores and table settings
- **`src/modules/`** - Feature modules (calendar, chat, libraries, etc.)
- **`src/shared/`** - Shared components, utilities, hooks
  - `components/Form/` - Form components (FormInput, FormSelect, etc.)
  - `components/Field/` - Standalone field components with labels/errors
  - `components/common/` - Base UI components (shadcn)
  - `components/` - Reusable UI components
  - `lib/hooks/` - Shared hooks organized by category
  - `lib/utils/` - Utility functions organized by category
  - `lib/schema/` - Reusable Zod validation schemas
  - `widgets/` - Complex shared widgets
- **`src/graphql/`** - GraphQL queries, mutations, subscriptions (`.graphql`
  files)
- **`src/api/generated/`** - Auto-generated GraphQL types and hooks (DO NOT
  EDIT)
- **`src/modals/`** - Modal components
- **`src/redesign-assets/`** - Assets organized by module

**Deprecated folders (do not add new code):**

- `src/pages/` - Use `src/modules/` instead
- `src/forms/` - Use `src/shared/components/` or module components
- `src/shared/ui/` - Use `src/shared/components/` instead
- `src/assets/` - Use `src/redesign-assets/` instead
- `src/services/` - Being split into utils

### GraphQL Workflow

1. **Create/modify `.graphql` files** in `src/graphql/<domain>/`

- Queries: `*.queries.graphql`
- Mutations: `*.mutations.graphql`
- Fragments: `*.fragments.graphql`
- Subscriptions: `*.subscriptions.graphql`

2. **Run code generation**: `npm run generate` or `npm run generate:dev`

3. **Use generated hooks** from `src/api/generated/hooks.ts`

   ```typescript
   import { useGetExerciseByIdQuery } from "@api/generated/hooks";
   ```

4. **Apollo Client config** at `src/app/configs/apollo/index.ts`:

- HTTP endpoint: `VITE_GRAPHQL_ENDPOINT`
- WebSocket endpoint: `VITE_SUBSCRIPTIONS_ENDPOINT`
- Auth middleware automatically adds token from localStorage
- Error handling with 401 redirects to login

### State Management

**Zustand stores** in `src/app/stores/`:

- Main store configuration uses builder pattern in `config/builders/`
- Namespaced stores in `config/namespace/`
- Table-specific stores: `useTableSettingsStore`,
  `useExercisesTableSettingsStore`, etc.
- Use `useCalendarStore` for calendar state
- Store slices in `config/slices/`

Example store usage:

```typescript
import { useStore } from "@app/app/stores";

const data = useStore((state) => state.modules.exercises.data);
```

## Code Conventions

### TypeScript

- Do not add explicit return types when TypeScript can infer them

### Forms (react-hook-form)

**Always use the Form components from `@shared/components/Form`:**

```typescript
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormInput,
  FormSelect,
  FormTextarea,
  FormSwitch,
  FormDatePicker,
  FormMultiSelect
} from "@shared/components/Form";

const MyForm = () => {
  const form = useForm({
    defaultValues: { name: "" }
  });

  return (
    <Form { ...form } >
    <form onSubmit = { form.handleSubmit(onSubmit) } >
    <FormField
      control = { form.control }
  name = "name"
  isRequired
  render = {({ field })
=>
  (
    <FormInput
      label = "Name"
  placeholder = "Enter name"
  {...
    field
  }
  />
)
}
  />
  < /form>
  < /Form>
)
  ;
};
```

**Key form patterns:**

- Wrap form controls with `FormField` + `control` prop
- Use `FormField` for validation and error messages
- Select components expect: `{ id: string; label: string | number }[]`
- Available: FormInput, FormTextarea, FormSelect, FormSwitch, FormDatePicker,
  FormTimePicker, FormRadioGroup, FormMultiSelect, FormCombobox,
  FormCreatableSelect

### Styling

**Use Tailwind CSS 4:**

- Round all spacing to nearest 4px (use `gap-4`, `p-4`, `m-4`, etc.)
- Combine classes with `cn()` helper from `@shared/lib/utils/cn`

```typescript
import { cn } from "@shared/lib/utils/cn";

<div className = {
  cn(
  "base-class",
  isActive && "active-class",
  customClass
)
}
/>
```

### Component Structure

- Use **arrow functions** with **named exports**
- Check `src/shared/lib/utils` for existing utilities before creating new ones
- Follow existing patterns in similar components

### Date/Time Handling

Use `date-fns` (v4.1.0) for all date operations:

```typescript
import { addDays, format } from "date-fns";

const formattedDate = format(new Date(), "yyyy-MM-dd");
```

## Git Workflow

### Commit Message Format

**Required format:**

```
<type>(TREAD1-<issue-number>): <subject>

<body>
```

**Valid types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`,
`build`, `ci`, `chore`, `revert`, `wip`

**Example:**

```
feat(TREAD1-8176): add exercise edit navigation hook

- Introduce useExerciseEdit hook for edit navigation
- Replace role-based guards with getCanEdit helper
- Refactor ExerciseItem edit handling
```

## Key Development Patterns

### Module Structure

Modules in `src/modules/` are self-contained features:

- Calendar, chat, libraries, athlete management, etc.
- Each module has its own components, hooks, and types
- Store configuration per module in `src/app/stores/config/builders/`

### Apollo Client Patterns

**Cache policies** defined in `src/app/configs/apollo/index.ts`:

- Cursor pagination for most lists
- Custom pagination for notifications
- See `typePolicies` in Apollo config

**Authentication:**

- Token stored in localStorage: `ACCESS_TOKEN`
- Auth middleware in `middlewares.ts` adds token to requests
- 401 errors redirect to `/auth/login`
- Root user switch via `ROOT_ACCESS_TOKEN`

## Critical Notes

- **Never edit** files in `src/api/generated/` - they're auto-generated
- **Follow form patterns** - use FormField wrapper with control prop
- **Import sorting** - enforced by ESLint (case-insensitive, declarations
  ignored)

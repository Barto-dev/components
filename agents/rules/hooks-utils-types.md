# Hooks, Utils & Types Organization

Detailed rules for organizing hooks, utilities, type definitions, and related
code.

**See also:**

- [Overview](overview.md) - Quick reference and decision flowcharts
- [Component Organization](component-organization.md) - Component-specific rules
- [Code Examples](examples.md) - Complete working examples

---

## Table of Contents

1. [Hooks Organization](#hooks-organization)
2. [Utils & Helpers](#utils--helpers)
3. [Type Definitions](#type-definitions)
4. [GraphQL Files](#graphql-files)
5. [Constants & Configuration](#constants--configuration)
6. [Validation Schemas](#validation-schemas)
7. [Assets Organization](#assets-organization)
8. [Naming Conventions](#naming-conventions)
9. [Import/Export Patterns](#importexport-patterns)

---

## Hooks Organization

### Location Rules

#### Module-Specific Hooks

**Location:** `src/modules/{moduleName}/hooks/useHookName.ts`

**When to use:**

- Hook used only within one module
- Contains module-specific logic

**Example:**

```
src/modules/calendar/hooks/
├── useCalendarEvents.ts
├── useEventFilters.ts
└── index.ts
```

#### Component-Specific Hooks

**Location:** `src/modules/{moduleName}/components/{Component}/hooks.ts`

or

**Location:** `src/shared/components/{Component}/hooks.ts`

**When to use:**

- Hook used only by single component
- Tightly coupled to component logic

**Example:**

```
src/modules/calendar/components/CalendarGrid/
├── CalendarGrid.tsx
├── hooks.ts
└── types.ts
```

#### Shared Hooks

**Location:** `src/shared/lib/hooks/{category}/useHookName.ts`

**When to use:**

- Hook used across multiple modules
- Generic/reusable logic

**Required:** Must be organized in category folders.

**Example:**

```
src/shared/lib/hooks/
├── auth/
│   ├── useAuth.ts
│   └── usePermissions.ts
├── data/
│   ├── useExerciseData.ts
│   └── useAthleteData.ts
├── ui/
│   ├── useModal.ts
│   └── useToast.ts
└── navigation/
    ├── useExerciseEdit.ts
    └── useRouteParams.ts
```

### Hook Categories

**Common categories:**

- `auth/` - Authentication, permissions
- `data/` - Data fetching, processing
- `ui/` - UI state, modals, toasts
- `navigation/` - Routing, navigation helpers
- `form/` - Form utilities
- `table/` - Table state, pagination

**⚠️ Note:** Some legacy hooks exist at `src/shared/lib/hooks/` root. All new
hooks must go in category folders.

### Naming Convention

**File naming:** One hook per file, filename matches hook name

```
useCalendarEvents.ts          ✅
useExerciseData.ts           ✅
hooks.ts                     ❌ (avoid unless in component folder)
calendar.ts                  ❌ (not clear it contains hooks)
```

**Hook names:** Always start with `use`

```typescript
export const useAuth = () => { ... }           ✅
export const useCalendarEvents = () => { ... } ✅
export const getAuth = () => { ... }           ❌
export const calendarEvents = () => { ... }    ❌
```

### Simple vs Complex Hooks

#### Simple Query Hook (Keep in Component)

When hook is just a direct GraphQL query usage:

```typescript
// src/modules/libraries/modules/exercises/create/AddExercise.tsx
import { useAddExerciseMutation } from '@api/generated/hooks';

export const AddExercise = () => {
  const [addExercise, { loading }] = useAddExerciseMutation();

  const handleSubmit = async (data) => {
    await addExercise({ variables: { input: data } });
  };

  return <form onSubmit={handleSubmit}>...</form>;
};
```

#### Complex Data Hook (Separate File)

When hook involves processing, transformation, or complex logic:

```typescript
// src/modules/libraries/modules/exercises/table/hooks/useExerciseData.ts
import { useMemo } from "react";

import { useGetExercisesQuery } from "@api/generated/hooks";

export const useExerciseData = (filters) => {
  const { data, loading, error } = useGetExercisesQuery({
    variables: { filters }
  });

  const processedData = useMemo(() => {
    if (!data) return [];
    // Complex data transformation
    return data.exercises.map((exercise) => ({
      ...exercise,
      displayName: `${exercise.name} (${exercise.category})`
    }));
  }, [data]);

  return { data: processedData, loading, error };
};
```

---

## Utils & Helpers

### Location Rules

#### Module-Specific Utils

**Location:** `src/modules/{moduleName}/utils.ts`

**When to use:**

- Utility used only within one module
- Module-specific business logic

**For complex cases:**

```
src/modules/{moduleName}/utils/
├── validation.ts
├── formatting.ts
└── index.ts
```

#### Component-Specific Utils

**Location:** `src/modules/{moduleName}/components/{Component}/utils.ts`

or

**Location:** `src/shared/components/{Component}/utils.ts`

**When to use:**

- Utility used only by single component
- Tightly coupled to component

#### Shared Utils

**Location:** `src/shared/lib/utils/{category}/utilityName.ts`

**When to use:**

- Utility used across multiple modules
- Generic/reusable logic

**Required:** Must be organized in category folders.

### Utility Categories

**Required category organization:**

```
src/shared/lib/utils/
├── apollo/                  # Apollo/GraphQL utilities
│   ├── pagination.ts
│   └── cache.ts
├── date/                    # Date/time utilities
│   ├── formatDate.ts
│   └── dateRange.ts
├── user/                    # User-related utilities
│   ├── getCanEdit.ts
│   ├── getRolePermissions.ts
│   └── types.ts            # Shared types for user utils
├── validation/              # Validation helpers
│   ├── isEmail.ts
│   └── isPhoneNumber.ts
├── formatting/              # Formatting utilities
│   ├── currency.ts
│   └── number.ts
└── cn.ts                    # Root-level utils (legacy)
```

**Common categories:**

- `apollo/` - GraphQL/Apollo utilities
- `date/` - Date/time operations
- `user/` - User permissions, roles
- `validation/` - Validation helpers
- `formatting/` - Formatting functions
- `string/` - String manipulation
- `array/` - Array utilities
- `object/` - Object utilities

### Utility Examples

**Simple utility:**

```typescript
// src/shared/lib/utils/formatting/currency.ts
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount);
};
```

**Utility with shared types:**

```typescript
// src/shared/lib/utils/user/getCanEdit.ts
import type { UserPermissions } from "./types";

// src/shared/lib/utils/user/types.ts
export interface UserPermissions {
  canEdit: boolean;
  canDelete: boolean;
  canView: boolean;
}

export const getCanEdit = (permissions: UserPermissions): boolean => {
  return permissions.canEdit;
};
```

---

## Type Definitions

### Location Rules

#### Global/Shared Types

**Location:** `src/types/`

**When to use:**

- Types truly used everywhere
- App-wide type definitions

```
src/types/
├── global.d.ts
├── api.ts
└── ...
```

#### Module-Specific Types

**Location:** `src/modules/{moduleName}/types.ts`

**When to use:**

- Types used across module
- Module-specific type definitions

#### Component-Specific Types

**Location:** `src/shared/components/{Component}/types.ts`

**When to use:**

- Types for complex components
- Multiple interfaces/types
- Types shared across component files

#### Utility-Specific Types

**Location:** `src/shared/lib/utils/{category}/types.ts`

**When to use:**

- Types shared across utilities in category
- Domain-specific type definitions

### Type vs Interface

#### Use `interface` for Component Props

```typescript
// ✅ DO: Interface for component props
interface ButtonProps {
  variant: "primary" | "secondary";
  children: React.ReactNode;
}

export const Button = ({ variant, children }: ButtonProps) => {
  // ...
};
```

#### Exception: Modal Props Use `type`

```typescript
// src/modals/ExercisesModal/types.ts

// ✅ DO: Type for modal props (technical limitation)
export type ExercisesModalProps = {
  open: boolean;
  onClose: () => void;
};
```

#### Use `type` for Unions, Intersections

```typescript
// ✅ DO: Type for unions and complex types
export type Status = "idle" | "loading" | "success" | "error";

export type User = {
  id: string;
  name: string;
} & Timestamps;
```

### Inline vs Separate File

#### Inline Types (Simple)

```typescript
// src/shared/components/Button.tsx
interface ButtonProps {
  // Simple props, keep inline
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button = ({ children, onClick }: ButtonProps) => {
  // ...
};
```

#### Separate Types File (Complex)

```typescript
// src/shared/components/Dialog/types.ts
export interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface DialogHeaderProps {
  title: string;
  subtitle?: string;
}

export interface DialogActionConfig {
  label: string;
  onClick: () => void;
  variant: "primary" | "secondary";
}
```

---

## GraphQL Files

### Organization Pattern

```
src/graphql/{domain}/
├── {domain}.queries.graphql
├── {domain}.mutations.graphql
├── {domain}.fragments.graphql
├── {domain}.subscriptions.graphql    # If needed
└── {specificComplexQuery}.graphql    # Complex queries
```

### File Naming

**Default patterns:**

- Queries: `{domain}.queries.graphql`
- Mutations: `{domain}.mutations.graphql`
- Fragments: `{domain}.fragments.graphql`
- Subscriptions: `{domain}.subscriptions.graphql`

**Complex queries:** Get their own file: `{specificQuery}.graphql`

### Examples

**Standard domain organization:**

```
src/graphql/exercises/
├── exercises.queries.graphql
├── exercises.mutations.graphql
└── exercises.fragments.graphql
```

**Complex query split:**

```
src/graphql/user/
├── user.queries.graphql
├── user.mutations.graphql
├── user.fragments.graphql
└── getUserSelectList.graphql         # Complex/specific query
```

### Usage in Code

```typescript
// Auto-generated hooks from .graphql files
import {
  useGetExercisesQuery,
  useAddExerciseMutation
} from '@api/generated/hooks';

export const ExerciseList = () => {
  const { data, loading } = useGetExercisesQuery();
  return <div>{/* ... */}</div>;
};
```

---

## Constants & Configuration

### App-Level Constants

**Location:** `src/constants/`

```
src/constants/
├── options/                 # Select options, dropdown configs
│   ├── exerciseCategories.ts
│   └── userRoles.ts
├── routes.ts               # Route paths
└── config.ts               # App configuration
```

**Example:**

```typescript
// src/constants/options/exerciseCategories.ts
export const EXERCISE_CATEGORIES = [
  { id: "strength", label: "Strength" },
  { id: "cardio", label: "Cardio" },
  { id: "flexibility", label: "Flexibility" }
] as const;

export type ExerciseCategory = (typeof EXERCISE_CATEGORIES)[number]["id"];
```

### Module-Level Constants

**Location:** `src/modules/{moduleName}/constants.ts`

```typescript
// src/modules/calendar/constants.ts
export const DEFAULT_VIEW = "week";
export const CALENDAR_VIEWS = ["day", "week", "month"] as const;

export const EVENT_COLORS = {
  training: "#3B82F6",
  rest: "#10B981",
  competition: "#EF4444"
} as const;
```

### Component-Level Constants

For small, component-specific constants, define inline:

```typescript
// src/shared/components/DataTable/DataTable.tsx
const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

export const DataTable = () => {
  // ...
};
```

---

## Validation Schemas

### Location Rules

#### Reusable Schemas

**Location:** `src/shared/lib/schema/`

```
src/shared/lib/schema/
├── user.ts
├── exercise.ts
└── common.ts
```

**Example:**

```typescript
// src/shared/lib/schema/user.ts
import { z } from "zod";

export const emailSchema = z.string().email("Invalid email");
export const passwordSchema = z.string().min(8, "Min 8 characters");

export const userSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().min(1, "Name required")
});
```

#### Module/Component-Specific Validation

**Location:** `src/modules/{moduleName}/validation.ts`

or

**Location:** `src/modals/{ModalName}/validation.ts`

**Example:**

```typescript
// src/modals/ExercisesModal/validation.ts
import { z } from "zod";

export const exerciseModalSchema = z.object({
  name: z.string().min(1, "Name required"),
  category: z.string().min(1, "Category required"),
  description: z.string().optional()
});
```

#### Complex Form Validation

**Location:** `src/modules/{moduleName}/validation/`

```
validation/
├── exerciseSchema.ts
├── equipmentSchema.ts
├── index.ts
└── utils.ts
```

---

## Assets Organization

### Structure

**All assets in `src/redesign-assets/` organized by module:**

```
src/redesign-assets/
├── {moduleName}/
│   ├── icons/
│   ├── images/
│   └── fonts/
└── common/                  # Truly shared (logo, brand)
    ├── icons/
    ├── images/
    └── fonts/
```

**Key principle:** Even if asset used only by one module, it goes in
`redesign-assets/{moduleName}/`.

### Examples

```
src/redesign-assets/
├── calendar/
│   ├── icons/
│   │   └── calendar-custom.svg
│   └── images/
│       └── empty-state.png
├── exercises/
│   ├── icons/
│   │   ├── strength.svg
│   │   └── cardio.svg
│   └── images/
│       └── exercise-placeholder.png
└── common/
    ├── icons/
    │   └── logo.svg
    └── images/
        └── default-avatar.png
```

### Usage

```typescript
import CalendarIcon from "@assets/redesign-assets/calendar/icons/calendar-custom.svg";
import Logo from "@assets/redesign-assets/common/icons/logo.svg";
```

### Icon Pattern

**Prefer lucide-react:**

```typescript
import { Calendar, User, Settings } from 'lucide-react';

export const MyComponent = () => {
  return (
    <>
      <Calendar className="w-6 h-6" />
      <User className="w-6 h-6" />
    </>
  );
};
```

**Custom icons (rare):**

- Place in `src/redesign-assets/{moduleName}/icons/`
- Use as React components or inline SVG

---

## Naming Conventions

### File Naming

| Type       | Convention       | Examples                             |
| ---------- | ---------------- | ------------------------------------ |
| Components | PascalCase       | `Button.tsx`, `UserProfile.tsx`      |
| Hooks      | camelCase (useX) | `useAuth.ts`, `useCalendarEvents.ts` |
| Utils      | camelCase        | `formatDate.ts`, `getCanEdit.ts`     |
| Types      | camelCase        | `types.ts`, `user.ts`                |
| Constants  | camelCase        | `constants.ts`, `routes.ts`          |
| Validation | camelCase        | `validation.ts`, `userSchema.ts`     |
| GraphQL    | camelCase.type   | `exercises.queries.graphql`          |

### Folder Naming

| Type              | Convention | Examples                           |
| ----------------- | ---------- | ---------------------------------- |
| Modules           | kebab-case | `calendar/`, `athlete-management/` |
| Component folders | PascalCase | `Button/`, `Dialog/`               |

### Variable Naming

```typescript
// React components: PascalCase
export const UserProfile = () => {};

// Hooks: camelCase with 'use' prefix
export const useAuth = () => {};

// Constants: UPPER_SNAKE_CASE
export const API_ENDPOINT = "https://api.example.com";
export const MAX_FILE_SIZE = 5242880;

// Regular variables/functions: camelCase
const userName = "John";
const handleClick = () => {};

// Types/Interfaces: PascalCase
interface UserProfile {}
type ApiResponse = {};

// Prefer const objects over enums
const UserRole = {
  Admin: "admin",
  User: "user"
} as const;
```

### Export Naming

```typescript
// ✅ DO: Named exports
export const Button = () => {};
export const UserProfile = () => {};

// ❌ DON'T: Default exports
export default Button;
```

---

## Import/Export Patterns

### Path Aliases vs Relative Imports

**General rule:** Path aliases for cross-module, relative imports for local
module code.

#### Use Path Aliases For Cross-Module

```typescript
// ✅ DO: Path aliases for cross-module
import { ExercisesModal } from "@modals/ExercisesModal";

import { useGetExercisesQuery } from "@api/generated/hooks";

import { Button } from "@shared/components/common/Button";
import { useAuth } from "@shared/lib/hooks/auth/useAuth";
import { formatDate } from "@shared/lib/utils/date/formatDate";
```

#### Use Relative Imports For Local Module Code

```typescript
// ✅ DO: Relative imports for local module code
// In src/modules/calendar/Calendar.tsx
import { EventCard } from "./components";
import { CalendarGrid } from "./components/CalendarGrid";
import { DEFAULT_VIEW } from "./constants";
// In component folder
// In src/modules/calendar/components/CalendarGrid/CalendarGrid.tsx
import { GridCell } from "./GridCell";
import { useCalendarEvents } from "./hooks/useCalendarEvents";
import type { CalendarEvent } from "./types";
import type { GridProps } from "./types";
```

#### Summary Table

| Import From              | Import To                | Use                          |
| ------------------------ | ------------------------ | ---------------------------- |
| `src/modules/calendar/`  | Same module              | Relative (`./`, `../`)       |
| `src/modules/calendar/`  | `src/shared/`            | Path alias (`@shared/*`)     |
| `src/modules/calendar/`  | `src/modules/exercises/` | Path alias (`@modules/*`)    |
| `src/shared/components/` | `src/shared/lib/`        | Path alias (`@shared/lib/*`) |

### Available Path Aliases

```typescript
@app/*       → src/*
@shared/*    → src/shared/*
@widgets/*   → src/shared/widgets/*
@modules/*   → src/modules/*
@modals/*    → src/modals/*
@api/*       → src/api/*
@gql/*       → src/graphql/*
@assets/*    → src/assets/* (deprecated)
@redesign-assets/* → src/redesign-assets/*
```

### Import Ordering

**Auto-handled by Prettier/ESLint**

Imports automatically organized as:

1. External packages
2. Internal imports with aliases
3. Type imports

```typescript
// Auto-formatted by Prettier
import { useState } from "react";
import { useForm } from "react-hook-form";

import type { UserProfile } from "@app/types";

import { Button } from "@shared/components/common/Button";
import { useAuth } from "@shared/lib/hooks/auth/useAuth";
```

---

## Summary

### Organization Checklist

**For every hook/util/type, ask:**

1. **Scope:** Module-specific, component-specific, or shared?
2. **Category:** Which category folder? (for shared code)
3. **Complexity:** Single file or folder structure?
4. **Location:** Module, shared/lib, or component folder?

**Key Patterns:**

- **Hooks:** Always start with `use`, one per file
- **Utils:** Must be categorized if shared
- **Types:** `interface` for props, `type` for unions/modal props
- **GraphQL:** Domain-organized, complex queries get own files
- **Validation:** Reusable in `shared/lib/schema/`, specific in module
- **Assets:** All in `redesign-assets/` by module
- **Imports:** Relative for local, path aliases for cross-module

**When in doubt:**

- Check existing similar code
- Follow category conventions
- Prefer simple organization over premature complexity

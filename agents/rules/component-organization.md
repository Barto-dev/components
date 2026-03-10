# Component Organization

Detailed rules for organizing components, including structure patterns,
Form/Field/Base three-tier architecture, and composition patterns.

**See also:**

- [Overview](overview.md) - Quick reference and decision flowcharts
- [Hooks, Utils & Types](hooks-utils-types.md) - Related organization rules
- [Code Examples](examples.md) - Complete working examples

---

## Table of Contents

1. [Component Location Rules](#component-location-rules)
2. [File vs Folder Decision](#file-vs-folder-decision)
3. [Component Folder Structure](#component-folder-structure)
4. [Form Component Patterns (Three-Tier)](#form-component-patterns-three-tier)
5. [Modal Components](#modal-components)
6. [Barrel Exports](#barrel-exports)
7. [Component Composition](#component-composition)

---

## Component Location Rules

### Module-Only Components

**Location:** `src/modules/{moduleName}/components/`

**When to use:**

- Component used ONLY within one module
- Contains module-specific business logic
- Not reusable across other modules

**Example:**

```
src/modules/calendar/components/
├── CalendarGrid/
├── EventCard.tsx
└── DateSelector.tsx
```

### Module-Specific Shared Components

**Location:** `src/shared/components/{ModuleName}/`

**When to use:**

- Component is specific to a module but reusable across multiple routes
- Module-specific but needs to be shared

**Example:**

```
src/shared/components/Calendar/
├── CalendarHeader/
└── MonthView.tsx

src/shared/components/Exercises/
├── FormPrimaryEquipment/
└── ExerciseCard.tsx
```

**Usage:**

```typescript
// Used across multiple calendar routes/modules
import { CalendarHeader } from "@shared/components/Calendar";
// Used across multiple exercise contexts
import { FormPrimaryEquipment } from "@shared/components/Exercises";
```

### Generic Shared Components

**Location:** `src/shared/components/`

**When to use:**

- Truly generic/domain-agnostic component
- Used across multiple unrelated modules
- Can include logic (API/data hooks/composition logic) when needed

**Subcategories:**

#### 1. Base/shadcn Components

**Location:** `src/shared/components/common/`

Pure UI components only (shadcn/basic building blocks). No API/domain logic:

```
src/shared/components/common/
├── Button.tsx
├── Input.tsx
├── Dialog/
└── Dropdown/
```

#### 2. Form Components (react-hook-form)

**Location:** `src/shared/components/Form/`

Components that work with react-hook-form context:

```
src/shared/components/Form/
├── FormInput.tsx
├── FormSelect.tsx
├── FormInputNumber.tsx
└── FormDatePicker.tsx
```

#### 3. Field Components (Standalone)

**Location:** `src/shared/components/Field/`

Standalone components with label/error handling:

```
src/shared/components/Field/
├── FieldInput.tsx
├── FieldSelect.tsx
└── FieldInputNumber.tsx
```

#### 4. Custom Composed Components

**Location:** `src/shared/components/`

Custom components that compose base components and may include shared logic:

```
src/shared/components/
├── DataTable/
├── SearchInput.tsx
└── UserAvatar.tsx
```

---

## File vs Folder Decision

### Use Single File When:

- Component has no sub-components
- No separate types file needed (props inline)
- No dedicated utils or hooks
- Self-contained logic

**Example:**

```
src/shared/components/common/Button.tsx
src/modules/calendar/components/EventCard.tsx
```

### Use Folder When:

- Has sub-components used only by this component
- Requires separate `types.ts` file
- Has dedicated `hooks.ts` or `utils.ts`
- Multiple files related to component

**Example:**

```
src/shared/components/DataTable/
├── DataTable.tsx
├── DataTableHeader.tsx
├── DataTableRow.tsx
├── types.ts
├── utils.ts
└── index.ts
```

### Exception: Modals Always Use Folders

All modal components must use folder structure (see Modal Components section).

---

## Component Folder Structure

### Basic Structure

For components requiring folders:

```
ComponentName/
├── ComponentName.tsx       # Main component
├── SubComponentA.tsx       # Optional sub-components
├── SubComponentB.tsx       # Optional sub-components
├── components/             # Optional: sub-components folder (if 2+)
│   ├── SubComponentA.tsx
│   ├── SubComponentB.tsx
│   └── index.ts           # Barrel export for sub-components
├── types.ts               # Optional: separate types
├── utils.ts               # Optional: component-specific utils
├── hooks.ts               # Optional: component-specific hooks
└── index.ts               # Barrel export
```

### Sub-Components Folder

**When to use `components/` subfolder:**

- Component has 2+ sub-components used only by it
- Want to organize sub-components separately

**Example:**

```
FormPrimaryEquipment/
├── FormPrimaryEquipment.tsx
├── components/
│   ├── EquipmentSelect.tsx     # Used only by FormPrimaryEquipment
│   ├── CategoryFilter.tsx      # Used only by FormPrimaryEquipment
│   └── index.ts
├── types.ts
└── index.ts
```

### When to Create Separate Files

**types.ts:**

- Multiple interfaces/types (3+)
- Types shared across component files
- Complex type definitions

**utils.ts:**

- 2+ utility functions
- Complex logic worth separating
- Reusable within component

**hooks.ts:**

- Custom hooks specific to this component
- Multiple hooks related to component

**Keep inline when:**

- Single simple interface
- One small utility function
- Simple logic

---

## Form Component Patterns (Three-Tier)

Form components follow a **three-tier architecture**:

### 1. Base Component

**Location:** `src/shared/components/`

Standalone component without form context.

**Purpose:**

- Reusable controlled component (can contain input/composition logic)
- No form library dependency
- Reusable anywhere

**Pattern:**

- Takes `value` and `onChange` props
- Built on top of base components from `common/`
- No label or error handling
- If component is pure UI only, place it in `src/shared/components/common/`

**Example:**

```typescript
// src/shared/components/InputNumber.tsx
import { Input } from '@shared/components/common/Input';

interface InputNumberProps {
  value?: number;
  onChange?: (value: number) => void;
  placeholder?: string;
  min?: number;
  max?: number;
}

export const InputNumber = ({ value, onChange, placeholder, min, max }: InputNumberProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(e.target.value);
    onChange?.(numValue);
  };

  return (
    <Input
      type="number"
      value={value ?? ''}
      onChange={handleChange}
      placeholder={placeholder}
      min={min}
      max={max}
    />
  );
};
```

### 2. Form Component

**Location:** `src/shared/components/Form/`

Works with react-hook-form context.

**Purpose:**

- Integrates with react-hook-form
- Automatic validation and error display
- Used within `<Form>` context

**Pattern:**

- Uses `useFormContext()` or `useController()`
- Takes `name` prop for form field
- Handles validation errors automatically
- Wraps Base Component

**Naming:** Prefix with `Form*`

**Example:**

```typescript
// src/shared/components/Form/FormInputNumber.tsx
import { useController, useFormContext } from 'react-hook-form';
import { InputNumber } from '@shared/components/InputNumber';

interface FormInputNumberProps {
  name: string;
  label?: string;
  placeholder?: string;
  min?: number;
  max?: number;
}

export const FormInputNumber = ({ name, label, placeholder, min, max }: FormInputNumberProps) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });

  return (
    <div>
      {label && <label>{label}</label>}
      <InputNumber
        value={field.value}
        onChange={field.onChange}
        placeholder={placeholder}
        min={min}
        max={max}
      />
      {fieldState.error && <span>{fieldState.error.message}</span>}
    </div>
  );
};
```

### 3. Field Component

**Location:** `src/shared/components/Field/`

Standalone with label and error handling.

**Purpose:**

- Used without react-hook-form
- Manual state management
- Includes label and error display

**Pattern:**

- Takes `value`, `onChange`, `error` props
- Handles label and error UI
- Wraps Base Component

**Naming:** Prefix with `Field*`

**Example:**

```typescript
// src/shared/components/Field/FieldInputNumber.tsx
import { InputNumber } from '@shared/components/InputNumber';

interface FieldInputNumberProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  error?: string;
  placeholder?: string;
  min?: number;
  max?: number;
}

export const FieldInputNumber = ({ label, value, onChange, error, placeholder, min, max }: FieldInputNumberProps) => {
  return (
    <div>
      <label>{label}</label>
      <InputNumber value={value} onChange={onChange} placeholder={placeholder} min={min} max={max} />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};
```

### When to Use Each Tier

**Base Component:**

- Need just the input without form context
- Custom form implementations
- Building other components

**Form Component:**

- Using react-hook-form
- Need automatic validation
- Standard form usage

**Field Component:**

- Not using react-hook-form
- Manual state management (useState)
- Need labels and errors without form context

---

## Modal Components

**Location:** `src/modals/{ModalName}/`

### Rules for Modals

1. **Always use folders** (never single files)
2. **Props must use `type`** instead of `interface` (technical limitation)
3. **Require `types.ts` file**

### Modal Folder Structure

```
ModalName/
├── ModalName.tsx           # Main modal component
├── types.ts                # Required - use type not interface
├── validation.ts           # Optional - Zod schemas
├── utils.ts                # Optional
├── hooks.ts                # Optional
└── index.ts                # Barrel export
```

### Modal Types File

**IMPORTANT:** Must use `type` instead of `interface`:

```typescript
// src/modals/ExercisesModal/types.ts

// ✅ DO: Use type for modal props
export type ExercisesModalProps = {
  open: boolean;
  onClose: () => void;
  initialData?: ExerciseData;
};

// ❌ DON'T: Use interface
interface ExercisesModalProps { ... }
```

### Modal Example Structure

```
src/modals/ExercisesModal/
├── ExercisesModal.tsx
├── types.ts
├── validation.ts
└── index.ts
```

**types.ts:**

```typescript
export type ExercisesModalProps = {
  open: boolean;
  onClose: () => void;
};
```

**index.ts:**

```typescript
export { ExercisesModal } from "./ExercisesModal";
export type { ExercisesModalProps } from "./types";
```

---

## Barrel Exports

**File:** `index.ts`

### When to Use Barrel Exports

**Use `index.ts` when:**

1. Component has folder structure
2. Folder has 2+ exports (components/types)
3. Module has 2+ components

**Don't use when:**

- Single file component
- Just one export in folder

### Component Folder Barrel

```typescript
// src/shared/components/DataTable/index.ts
export { DataTable } from "./DataTable";
export { DataTableHeader } from "./DataTableHeader";
export { DataTableRow } from "./DataTableRow";
export type { DataTableProps, DataTableRowProps } from "./types";
```

**Usage:**

```typescript
import {
  DataTable,
  DataTableHeader,
  DataTableRow
} from "@shared/components/DataTable";
```

### Module Components Barrel

When module has 2+ components:

```typescript
// src/modules/calendar/components/index.ts
export { CalendarGrid } from "./CalendarGrid"; // From folder
export { EventCard } from "./EventCard"; // Single file
export { DatePicker } from "./DatePicker"; // From folder
```

**Usage:**

```typescript
import { CalendarGrid, EventCard } from "./components";
```

### Sub-Components Barrel

When component has `components/` subfolder:

```typescript
// src/shared/components/FormPrimaryEquipment/components/index.ts
export { EquipmentSelect } from "./EquipmentSelect";
export { CategoryFilter } from "./CategoryFilter";
```

**Usage:**

```typescript
// In FormPrimaryEquipment.tsx
import { CategoryFilter, EquipmentSelect } from "./components";
```

### Single File (No Barrel)

```typescript
// src/shared/components/common/Button.tsx
export const Button = () => { ... };

// Direct import - no index.ts needed
import { Button } from '@shared/components/common/Button';
```

---

## Component Composition

### Compound Components Without Dot Notation

**Pattern:** Separate named components (no dot notation)

```typescript
// ❌ DON'T: Dot notation
<Dialog.Header title="..." />
<Dialog.Content>...</Dialog.Content>

// ✅ DO: Separate named components
<DialogHeader title="..." />
<DialogContent>...</DialogContent>
```

**Why:** Cleaner imports, better tree-shaking, aligns with module system.

### Component Composition Example

**Dialog component:**

```typescript
// Dialog.tsx
export const Dialog = ({ children, open, onClose }: DialogProps) => {
  return (
    <div>
      {children}
    </div>
  );
};

// DialogHeader.tsx
export const DialogHeader = ({ title }: DialogHeaderProps) => {
  return <div>{title}</div>;
};

// index.ts
export { Dialog } from './Dialog';
export { DialogHeader } from './DialogHeader';
export { DialogContent } from './DialogContent';
```

**Usage:**

```typescript
import { Dialog, DialogHeader, DialogContent } from '@shared/components/Dialog';

<Dialog open={open} onClose={onClose}>
  <DialogHeader title="Confirm" />
  <DialogContent>Are you sure?</DialogContent>
</Dialog>
```

### Prefer Third-Party Components

**Best practices:**

- Use shadcn components when possible
- shadcn base components → `src/shared/components/common/`
- Custom wrappers/compositions → `src/shared/components/`
- Don't reinvent the wheel

**Example:**

```typescript
// ✅ DO: Use shadcn
import { Button } from "@shared/components/common/Button";

// ❌ DON'T: Create custom when shadcn exists
// Custom Button implementation...
```

---

## Summary

### Component Organization Checklist

**For every component, ask:**

1. **Scope:** Module-only, module-specific shared, or generic shared?
2. **Complexity:** Single file or folder structure?
3. **Type:** Base, Form, Field, or custom?
4. **Location:** Module components/, shared components/, or common/?
5. **Exports:** Need index.ts barrel export?

**Key Patterns:**

- **Three-tier forms:** Base → Form (react-hook-form) → Field (standalone)
- **Module-specific shared:** `src/shared/components/{ModuleName}/`
- **Modals:** Always folders, always use `type` for props
- **Barrel exports:** Use for folders and multiple exports
- **Composition:** Separate named components (no dot notation)
- **Imports:** Relative for local module, path aliases for cross-module

**When in doubt:**

- Check existing similar components
- Follow the decision flowcharts in overview.md
- Prefer simple single files over premature folder structure

# Code Examples

Detailed working examples for common patterns and structures.

**See also:**

- [Overview](overview.md) - Quick reference
- [Component Organization](component-organization.md) - Component rules
- [Hooks, Utils & Types](hooks-utils-types.md) - Organization rules

---

## Table of Contents

1. [Complete Module Example](#complete-module-example)
2. [Complete Shared Component Example](#complete-shared-component-example)
3. [Form Component Example (Three-Tier)](#form-component-example-three-tier)
4. [Modal Example](#modal-example)
5. [Hook Examples](#hook-examples)
6. [Utility Examples](#utility-examples)
7. [Validation Examples](#validation-examples)
8. [State Management Examples](#state-management-examples)

---

## Complete Module Example

### Module Structure

```
src/modules/calendar/
├── components/
│   ├── CalendarGrid/
│   │   ├── CalendarGrid.tsx
│   │   ├── GridCell.tsx
│   │   ├── GridSkeleton.tsx
│   │   ├── types.ts
│   │   ├── utils.ts
│   │   └── index.ts
│   ├── EventCard.tsx
│   └── index.ts
├── hooks/
│   ├── useCalendarEvents.ts
│   ├── useEventFilters.ts
│   └── index.ts
├── types.ts
├── constants.ts
└── Calendar.tsx
```

### Module Main Component

```typescript
// src/modules/calendar/Calendar.tsx
import { CalendarGrid, EventCard } from './components';
import { useCalendarEvents } from './hooks';
import { DEFAULT_VIEW } from './constants';
import type { CalendarEvent } from './types';

export const Calendar = () => {
  const { events, loading } = useCalendarEvents();

  return (
    <div className="calendar-container">
      <CalendarGrid events={events} loading={loading} />
    </div>
  );
};
```

### Module Types

```typescript
// src/modules/calendar/types.ts
export interface CalendarEvent {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  type: EventType;
}

export type EventType = "training" | "rest" | "competition";

export interface CalendarFilters {
  dateRange: {
    start: Date;
    end: Date;
  };
  eventTypes: EventType[];
}
```

### Module Constants

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

### Module Hook

```typescript
// src/modules/calendar/hooks/useCalendarEvents.ts
import { useMemo } from "react";

import { useGetCalendarEventsQuery } from "@api/generated/hooks";

import type { CalendarEvent } from "../types";

export const useCalendarEvents = () => {
  const { data, loading, error } = useGetCalendarEventsQuery();

  const events = useMemo(() => {
    if (!data?.events) return [];

    return data.events.map(
      (event): CalendarEvent => ({
        id: event.id,
        title: event.title,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
        type: event.type
      })
    );
  }, [data]);

  return { events, loading, error };
};
```

### Component with Subfolder

```typescript
// src/modules/calendar/components/CalendarGrid/CalendarGrid.tsx
import { GridCell } from './GridCell';
import { GridSkeleton } from './GridSkeleton';
import { calculateGridDays } from './utils';
import type { CalendarGridProps } from './types';

export const CalendarGrid = ({ events, loading }: CalendarGridProps) => {
  const gridDays = calculateGridDays(new Date());

  if (loading) {
    return <GridSkeleton />;
  }

  return (
    <div className="calendar-grid">
      {gridDays.map(day => (
        <GridCell
          key={day.toISOString()}
          date={day}
          events={events.filter(e => isSameDay(e.startDate, day))}
        />
      ))}
    </div>
  );
};
```

```typescript
// src/modules/calendar/components/CalendarGrid/types.ts
import type { CalendarEvent } from "../../types";

export interface CalendarGridProps {
  events: CalendarEvent[];
  loading: boolean;
}

export interface GridCellProps {
  date: Date;
  events: CalendarEvent[];
}
```

```typescript
// src/modules/calendar/components/CalendarGrid/utils.ts
export const calculateGridDays = (month: Date): Date[] => {
  // Calculate days to display in grid
  const days: Date[] = [];
  // ... implementation
  return days;
};
```

```typescript
// src/modules/calendar/components/CalendarGrid/index.ts
export { CalendarGrid } from "./CalendarGrid";
export type { CalendarGridProps } from "./types";
```

### Components Barrel Export

```typescript
// src/modules/calendar/components/index.ts
export { CalendarGrid } from "./CalendarGrid";
export { EventCard } from "./EventCard";
```

---

## Complete Shared Component Example

### Complex Dialog Component

```
src/shared/components/Dialog/
├── Dialog.tsx
├── DialogHeader.tsx
├── DialogTitle.tsx
├── DialogContent.tsx
├── DialogFooter.tsx
├── types.ts
├── utils.ts
└── index.ts
```

### Types File

```typescript
// src/shared/components/Dialog/types.ts
export interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export interface DialogHeaderProps {
  title: string;
  subtitle?: string;
  onClose?: () => void;
}

export interface DialogContentProps {
  children: React.ReactNode;
}

export interface DialogFooterProps {
  children: React.ReactNode;
}
```

### Main Component

```typescript
// src/shared/components/Dialog/Dialog.tsx
import { cn } from '@shared/lib/utils/cn';
import type { DialogProps } from './types';

export const Dialog = ({ open, onClose, children, size = 'md' }: DialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className={cn(
        'relative bg-white rounded-lg shadow-lg p-6',
        size === 'sm' && 'max-w-sm',
        size === 'md' && 'max-w-md',
        size === 'lg' && 'max-w-lg',
      )}>
        {children}
      </div>
    </div>
  );
};
```

### Sub-Components

```typescript
// src/shared/components/Dialog/DialogHeader.tsx
import type { DialogHeaderProps } from './types';

export const DialogHeader = ({ title, subtitle, onClose }: DialogHeaderProps) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        {onClose && (
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        )}
      </div>
      {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
    </div>
  );
};
```

```typescript
// src/shared/components/Dialog/DialogContent.tsx
import type { DialogContentProps } from './types';

export const DialogContent = ({ children }: DialogContentProps) => {
  return <div className="py-4">{children}</div>;
};
```

```typescript
// src/shared/components/Dialog/DialogFooter.tsx
import type { DialogFooterProps } from './types';

export const DialogFooter = ({ children }: DialogFooterProps) => {
  return (
    <div className="flex justify-end gap-2 mt-6">
      {children}
    </div>
  );
};
```

### Barrel Export

```typescript
// src/shared/components/Dialog/index.ts
export { Dialog } from "./Dialog";
export { DialogHeader } from "./DialogHeader";
export { DialogTitle } from "./DialogTitle";
export { DialogContent } from "./DialogContent";
export { DialogFooter } from "./DialogFooter";
export type {
  DialogProps,
  DialogHeaderProps,
  DialogContentProps
} from "./types";
```

### Usage Example

```typescript
import { Dialog, DialogHeader, DialogContent, DialogFooter } from '@shared/components/Dialog';
import { Button } from '@shared/components/common/Button';

export const ConfirmDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} size="md">
      <DialogHeader title="Confirm Action" subtitle="Are you sure?" />
      <DialogContent>
        This action cannot be undone.
      </DialogContent>
      <DialogFooter>
        <Button variant="secondary" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
```

---

## Form Component Example (Three-Tier)

### Base Component

```typescript
// src/shared/components/InputNumber.tsx
import { Input } from '@shared/components/common/Input';

interface InputNumberProps {
  value?: number;
  onChange?: (value: number) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export const InputNumber = ({
  value,
  onChange,
  placeholder,
  min,
  max,
  disabled
}: InputNumberProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(e.target.value);
    if (!isNaN(numValue)) {
      onChange?.(numValue);
    }
  };

  return (
    <Input
      type="number"
      value={value ?? ''}
      onChange={handleChange}
      placeholder={placeholder}
      min={min}
      max={max}
      disabled={disabled}
    />
  );
};
```

### Form Component (react-hook-form)

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
  disabled?: boolean;
}

export const FormInputNumber = ({
  name,
  label,
  placeholder,
  min,
  max,
  disabled
}: FormInputNumberProps) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });

  return (
    <div className="form-field">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <InputNumber
        value={field.value}
        onChange={field.onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        disabled={disabled}
      />
      {fieldState.error && (
        <span className="text-red-500 text-sm mt-1">
          {fieldState.error.message}
        </span>
      )}
    </div>
  );
};
```

### Field Component (Standalone)

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
  disabled?: boolean;
  required?: boolean;
}

export const FieldInputNumber = ({
  label,
  value,
  onChange,
  error,
  placeholder,
  min,
  max,
  disabled,
  required
}: FieldInputNumberProps) => {
  return (
    <div className="field">
      <label className="block text-sm font-medium mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <InputNumber
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        disabled={disabled}
      />
      {error && (
        <span className="text-red-500 text-sm mt-1">{error}</span>
      )}
    </div>
  );
};
```

### Usage Examples

**Using Base Component:**

```typescript
export const SimpleCounter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <InputNumber value={count} onChange={setCount} min={0} max={100} />
    </div>
  );
};
```

**Using Form Component:**

```typescript
import { useForm, FormProvider } from 'react-hook-form';
import { FormInputNumber } from '@shared/components/Form';

export const ExerciseForm = () => {
  const form = useForm({
    defaultValues: {
      sets: 3,
      reps: 10
    }
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormInputNumber name="sets" label="Sets" min={1} max={10} />
        <FormInputNumber name="reps" label="Reps" min={1} max={100} />
      </form>
    </FormProvider>
  );
};
```

**Using Field Component:**

```typescript
import { FieldInputNumber } from '@shared/components/Field';

export const ManualForm = () => {
  const [sets, setSets] = useState(3);
  const [error, setError] = useState('');

  const handleChange = (value: number) => {
    if (value < 1) {
      setError('Must be at least 1');
    } else {
      setError('');
      setSets(value);
    }
  };

  return (
    <FieldInputNumber
      label="Sets"
      value={sets}
      onChange={handleChange}
      error={error}
      min={1}
      max={10}
      required
    />
  );
};
```

---

## Modal Example

### Modal Structure

```
src/modals/ExercisesModal/
├── ExercisesModal.tsx
├── types.ts
├── validation.ts
└── index.ts
```

### Types (Must Use `type`)

```typescript
// src/modals/ExercisesModal/types.ts

// ✅ Must use type (not interface) for modal props
export type ExercisesModalProps = {
  open: boolean;
  onClose: () => void;
  initialData?: ExerciseData;
  onSubmit: (data: ExerciseFormData) => void;
};

export type ExerciseData = {
  id: string;
  name: string;
  category: string;
  description: string;
};

export type ExerciseFormData = {
  name: string;
  category: string;
  description: string;
};
```

### Validation

```typescript
// src/modals/ExercisesModal/validation.ts
import { z } from "zod";

export const exerciseModalSchema = z.object({
  name: z.string().min(1, "Exercise name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(10, "Description must be at least 10 characters")
});

export type ExerciseModalFormData = z.infer<typeof exerciseModalSchema>;
```

### Modal Component

```typescript
// src/modals/ExercisesModal/ExercisesModal.tsx
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogHeader, DialogContent, DialogFooter } from '@shared/components/Dialog';
import { FormInput, FormTextarea, FormSelect } from '@shared/components/Form';
import { Button } from '@shared/components/common/Button';
import { exerciseModalSchema } from './validation';
import type { ExercisesModalProps } from './types';

export const ExercisesModal = ({ open, onClose, initialData, onSubmit }: ExercisesModalProps) => {
  const form = useForm({
    resolver: zodResolver(exerciseModalSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      category: initialData?.category ?? '',
      description: initialData?.description ?? ''
    }
  });

  const handleSubmit = (data: any) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} size="lg">
      <DialogHeader
        title={initialData ? 'Edit Exercise' : 'Create Exercise'}
        onClose={onClose}
      />
      <DialogContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormInput
              name="name"
              label="Exercise Name"
              placeholder="Enter exercise name"
            />
            <FormSelect
              name="category"
              label="Category"
              options={[
                { id: 'strength', label: 'Strength' },
                { id: 'cardio', label: 'Cardio' }
              ]}
            />
            <FormTextarea
              name="description"
              label="Description"
              placeholder="Enter description"
            />
          </form>
        </FormProvider>
      </DialogContent>
      <DialogFooter>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={form.handleSubmit(handleSubmit)}>
          {initialData ? 'Update' : 'Create'}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
```

### Barrel Export

```typescript
// src/modals/ExercisesModal/index.ts
export { ExercisesModal } from "./ExercisesModal";
export type {
  ExercisesModalProps,
  ExerciseData,
  ExerciseFormData
} from "./types";
```

---

## Hook Examples

### Simple Hook (Module-Specific)

```typescript
// src/modules/calendar/hooks/useCalendarEvents.ts
import { useGetCalendarEventsQuery } from "@api/generated/hooks";

export const useCalendarEvents = () => {
  const { data, loading, error } = useGetCalendarEventsQuery();

  return {
    events: data?.events ?? [],
    loading,
    error
  };
};
```

### Complex Hook (Shared)

```typescript
// src/shared/lib/hooks/data/useExerciseData.ts
import { useMemo } from "react";

import { useGetExercisesQuery } from "@api/generated/hooks";

interface UseExerciseDataOptions {
  filters?: ExerciseFilters;
  sortBy?: "name" | "category";
}

export const useExerciseData = (options: UseExerciseDataOptions = {}) => {
  const { filters, sortBy = "name" } = options;

  const { data, loading, error, refetch } = useGetExercisesQuery({
    variables: { filters },
    skip: !filters
  });

  const processedData = useMemo(() => {
    if (!data?.exercises) return [];

    let exercises = data.exercises.map((exercise) => ({
      ...exercise,
      displayName: `${exercise.name} (${exercise.category})`
    }));

    // Sort
    if (sortBy === "name") {
      exercises.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      exercises.sort((a, b) => a.category.localeCompare(b.category));
    }

    return exercises;
  }, [data, sortBy]);

  return {
    exercises: processedData,
    loading,
    error,
    refetch
  };
};
```

---

## Utility Examples

### Simple Utility

```typescript
// src/shared/lib/utils/formatting/currency.ts
export const formatCurrency = (
  amount: number,
  currency: string = "USD"
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency
  }).format(amount);
};
```

### Utility with Types

```typescript
// src/shared/lib/utils/user/getCanEdit.ts
import type { UserPermissions } from "./types";
// src/shared/lib/utils/user/getRolePermissions.ts
import type { User, UserPermissions } from "./types";

// src/shared/lib/utils/user/types.ts
export interface UserPermissions {
  canEdit: boolean;
  canDelete: boolean;
  canView: boolean;
  isAdmin: boolean;
}

export interface User {
  id: string;
  role: "admin" | "user" | "viewer";
}

export const getCanEdit = (permissions: UserPermissions): boolean => {
  return permissions.canEdit || permissions.isAdmin;
};

export const getRolePermissions = (user: User): UserPermissions => {
  switch (user.role) {
    case "admin":
      return {
        canEdit: true,
        canDelete: true,
        canView: true,
        isAdmin: true
      };
    case "user":
      return {
        canEdit: true,
        canDelete: false,
        canView: true,
        isAdmin: false
      };
    case "viewer":
      return {
        canEdit: false,
        canDelete: false,
        canView: true,
        isAdmin: false
      };
  }
};
```

---

## Validation Examples

### Shared Schema

```typescript
// src/shared/lib/schema/user.ts
import { z } from "zod";

export const emailSchema = z
  .string()
  .email("Invalid email address")
  .min(1, "Email is required");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain uppercase letter")
  .regex(/[0-9]/, "Password must contain number")
  .regex(/[^A-Za-z0-9]/, "Password must contain special character");

export const userSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().min(1, "Name is required"),
  role: z.enum(["admin", "user", "viewer"])
});

export type UserFormData = z.infer<typeof userSchema>;
```

### Module Schema

```typescript
// src/modules/libraries/modules/exercises/create/validation.ts
import { z } from "zod";

export const createExerciseSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  primaryEquipment: z.string().optional(),
  alternativeEquipment: z.array(z.string()).optional(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"])
});

export type CreateExerciseFormData = z.infer<typeof createExerciseSchema>;
```

---

## State Management Examples

### Microstore (Preferred)

```typescript
// src/app/stores/useCalendarStore.ts
import { create } from "zustand";

interface CalendarState {
  selectedDate: Date;
  view: "day" | "week" | "month";
  filters: CalendarFilters;
  setSelectedDate: (date: Date) => void;
  setView: (view: "day" | "week" | "month") => void;
  setFilters: (filters: CalendarFilters) => void;
  resetFilters: () => void;
}

const DEFAULT_FILTERS: CalendarFilters = {
  eventTypes: [],
  searchQuery: ""
};

export const useCalendarStore = create<CalendarState>((set) => ({
  selectedDate: new Date(),
  view: "week",
  filters: DEFAULT_FILTERS,

  setSelectedDate: (date) => set({ selectedDate: date }),
  setView: (view) => set({ view }),
  setFilters: (filters) => set({ filters }),
  resetFilters: () => set({ filters: DEFAULT_FILTERS })
}));
```

**Usage:**

```typescript
import { useCalendarStore } from '@app/stores/useCalendarStore';

export const CalendarHeader = () => {
  const { selectedDate, view, setView } = useCalendarStore();

  return (
    <div>
      <h2>{selectedDate.toLocaleDateString()}</h2>
      <button onClick={() => setView('day')}>Day</button>
      <button onClick={() => setView('week')}>Week</button>
      <button onClick={() => setView('month')}>Month</button>
    </div>
  );
};

export const CalendarGrid = () => {
  const { selectedDate, view, filters } = useCalendarStore();

  // Use state...
  return <div>...</div>;
};
```

---

## Summary

These examples demonstrate:

1. **Module organization** - Complete module with components, hooks, types
2. **Shared components** - Complex components with sub-components and barrel
   exports
3. **Form patterns** - Three-tier architecture (Base, Form, Field)
4. **Modal structure** - Proper modal organization with type usage
5. **Hook patterns** - Simple and complex hooks with proper organization
6. **Utility patterns** - Simple utilities and utilities with shared types
7. **Validation** - Reusable schemas and module-specific schemas
8. **State management** - Microstore pattern with Zustand

**Key takeaways:**

- Keep it simple until complexity demands structure
- Use relative imports within modules
- Follow three-tier pattern for form components
- Modals always use folders and `type` for props
- Organize shared code in category folders
- Prefer composition over premature abstraction

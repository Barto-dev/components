---
name: implementation-planner
description: Creates detailed implementation plans with small, verifiable iterations from planning documents. Reads the planning document from `planning/{featureName}/planning.md`, asks comprehensive questions about iteration breakdown, component choices, folder structure, reusable helpers, and implementation order. Outputs to `planning/{featureName}/implementation.md`. Use after frontend-planning-partner has created a planning document. Triggers include "implementation plan", "create iterations", "break down the plan", "let's implement", or when ready to convert a planning document into actionable steps.
---

# Implementation Planner

Convert planning documents into detailed, small iteration plans that can be verified step-by-step.

## Prerequisites

Before running this skill, ensure:
- A planning document exists at `planning/{featureName}/planning.md`
- The planning document was created by the `frontend-planning-partner` skill

## Workflow

### 1. Load Planning Document

**First, ask the user:**
- "Which feature are we implementing?" (to locate the correct planning folder)

**Then:**
- Read the planning document from `planning/{featureName}/planning.md`
- Parse and understand:
  - Feature overview and goals
  - Proposed architecture
  - Component hierarchy
  - Auto-generatable vs deep thinking items
  - Edge cases identified
  - Open questions

**If no planning document exists:**
- Inform the user: "No planning document found. Would you like to run the `frontend-planning-partner` skill first?"

### 2. Gather Implementation Requirements

Lead a comprehensive Q&A session to understand exactly how to implement. Ask questions in these categories:

#### A. Iteration Strategy

**Ask:**
- "How granular do you want iterations? (e.g., one component per iteration, or group related items)"
- "What's your preferred iteration size? (e.g., 5-10 minutes of work, or larger chunks)"
- "Do you want to review after each iteration before proceeding?"
- "Should we start with scaffolding (empty components, folders) or dive into implementation?"

#### B. Component Decisions

For each component identified in the planning document:

**Ask:**
- "For `{ComponentName}`, should we:
  - Create from scratch
  - Extend an existing component (which one?)
  - Use a compound component pattern
  - Wrap an external library component"
- "What existing components can be reused as-is?"
- "Are there any shadcn/ui components we should use?"
- "Should any components be generic/reusable or feature-specific?"

#### C. Folder Structure

**Ask:**
- "Where should the main feature folder live? (e.g., `src/modules/{feature}/`, `src/features/{feature}/`)"
- "What subfolders do you want? Common options:
  - `components/` - Feature-specific components
  - `hooks/` - Custom hooks
  - `helpers/` or `utils/` - Utility functions
  - `types/` - TypeScript types/interfaces
  - `constants/` - Constants and config
  - `api/` or `services/` - API calls
  - `context/` - React context if needed"
- "Should shared utilities go in the feature folder or a global location?"

#### D. Reusable Code

**Explore the codebase and ask:**
- "I found these existing helpers that might be useful: [list]. Should we use any of these?"
- "I found these existing hooks: [list]. Are any applicable?"
- "Are there existing API patterns we should follow?"
- "Any existing types/interfaces we should extend?"

#### E. API & Data Layer

**Ask:**
- "For API calls, should we:
  - Add to existing service files
  - Create new service files
  - Use inline fetch/axios calls"
- "What's the data fetching pattern? (React Query, SWR, useEffect, existing hooks)"
- "Do we need optimistic updates?"
- "Should we add mock data for development?"

#### F. State Management

**Ask:**
- "Where should state live?
  - Local component state
  - Feature-level context
  - Global store (Redux, Zustand, etc.)
  - URL state"
- "Are there existing contexts we should tap into?"
- "Do we need to create a new context for this feature?"

#### G. Testing Strategy

**Ask:**
- "What level of testing do you want in iterations?
  - No tests initially, add later
  - Basic tests with each component
  - Full test coverage per iteration"
- "Which testing library? (Jest, Vitest, React Testing Library, etc.)"
- "Should we include E2E tests?"

#### H. Order of Implementation

**Ask:**
- "What's the critical path? (What must be built first)"
- "Are there any dependencies between components?"
- "Should we build UI first (with mock data) or data layer first?"
- "Any components that are blockers for others?"

### 3. Create Iteration Plan

**Use the Task tool with `subagent_type: "Plan"` to analyze and create iterations:**

```
prompt: "Analyze the planning document at planning/{featureName}/planning.md and create a detailed iteration plan with the following requirements:

[Include user's answers from Step 2]

Create iterations following these principles:
- Each iteration should be small and verifiable (5-15 minutes of work)
- Each iteration should result in something that can be visually or functionally verified
- Dependencies should be resolved in earlier iterations
- Group related small tasks (e.g., 'create types' can include multiple interfaces)

Iteration types to consider:
1. Scaffolding - Create empty files, folders, basic exports
2. Types - Define TypeScript interfaces and types
3. Helpers/Utils - Create utility functions
4. Hooks - Create custom hooks
5. API Layer - Create service functions
6. Components - Create React components (one per iteration for complex ones)
7. Integration - Wire components together
8. Polish - Error handling, loading states, edge cases
9. Testing - Add tests

Identify critical files, consider architectural trade-offs, and provide a step-by-step breakdown."
```

**After the Plan subagent returns:**
- Review the suggested iterations
- Adjust based on user preferences from Step 2
- Ensure iterations are properly ordered with dependencies clear

### 4. Write Implementation Document

Create the implementation document at `planning/{featureName}/implementation.md`:

```markdown
# {Feature Name} - Implementation Plan

## Overview
[Brief summary of what we're implementing, referencing the planning document]

## Implementation Settings

### Iteration Strategy
- **Granularity:** [User's preference]
- **Review after each:** [Yes/No]
- **Starting approach:** [Scaffolding first / Implementation first]

### Folder Structure
```
src/modules/{feature}/
├── components/
├── hooks/
├── helpers/
├── types/
├── api/
└── index.ts
```

### Reusable Code Identified
- **Helpers:** [List with paths]
- **Hooks:** [List with paths]
- **Components:** [List with paths]
- **Types:** [List with paths]

### API Pattern
- **Approach:** [Service files / React Query / etc.]
- **Existing services to extend:** [List]

### State Management
- **Approach:** [Local / Context / Global]
- **Existing contexts to use:** [List]

---

## Iterations

### Iteration 1: [Title]
**Goal:** [What this iteration achieves]
**Verify by:** [How to verify it worked]

**Tasks:**
- [ ] [Specific task with file path]
- [ ] [Specific task with file path]

**Files to create/modify:**
- `path/to/file.ts` - [What to do]

---

### Iteration 2: [Title]
**Goal:** [What this iteration achieves]
**Verify by:** [How to verify it worked]
**Depends on:** Iteration 1

**Tasks:**
- [ ] [Specific task with file path]
- [ ] [Specific task with file path]

**Files to create/modify:**
- `path/to/file.ts` - [What to do]

---

[Continue for all iterations...]

---

## Summary

### Total Iterations: [Number]

### Iteration Breakdown:
- Scaffolding: [Count]
- Types: [Count]
- Helpers: [Count]
- Hooks: [Count]
- API: [Count]
- Components: [Count]
- Integration: [Count]
- Polish: [Count]
- Testing: [Count]

### Estimated Components: [Number]
### Estimated New Files: [Number]

## Notes
[Any additional notes, warnings, or considerations]

## Related Documents
- Planning: `planning/{featureName}/planning.md`
```

### 5. Confirm and Offer Next Steps

After saving the implementation document:

**Tell the user:**
- "Implementation plan saved to `planning/{featureName}/implementation.md`"
- "Total iterations: [X]"
- "Ready to start with Iteration 1: [Title]?"

**Ask:**
- "Would you like to review or modify any iterations?"
- "Should we start implementing Iteration 1?"
- "Do you want me to show you the full plan first?"

## Key Principles

**Keep iterations small:**
- User should be able to verify each iteration quickly
- Prefer many small iterations over few large ones
- Each iteration should have a clear "done" state

**Be specific:**
- Always include exact file paths
- Include exact component/function names
- Reference existing code when applicable

**Respect existing patterns:**
- Follow conventions found in the codebase
- Use existing utilities and helpers when possible
- Match the project's folder structure style

**Make dependencies clear:**
- Explicitly state which iterations depend on others
- Order iterations so dependencies come first
- Group independent iterations that could be done in parallel

## Example Iteration Styles

**Scaffolding iteration:**
```markdown
### Iteration 1: Create Feature Folder Structure
**Goal:** Set up the folder structure for the feature
**Verify by:** Folders exist with index.ts files

**Tasks:**
- [ ] Create `src/modules/user-dashboard/` folder
- [ ] Create subfolders: components, hooks, helpers, types, api
- [ ] Create index.ts barrel exports in each folder
```

**Component iteration:**
```markdown
### Iteration 3: Create UserStatsCard Component
**Goal:** Create the card component that displays user statistics
**Verify by:** Component renders with mock data in Storybook/dev

**Tasks:**
- [ ] Create `UserStatsCard.tsx` with props interface
- [ ] Add basic layout with Tailwind classes
- [ ] Export from components/index.ts

**Files to create:**
- `src/modules/user-dashboard/components/UserStatsCard.tsx`
```

**Hook iteration:**
```markdown
### Iteration 5: Create useUserStats Hook
**Goal:** Create hook to fetch and manage user statistics
**Verify by:** Hook returns data when called in a test component
**Depends on:** Iteration 2 (types), Iteration 4 (API service)

**Tasks:**
- [ ] Create `useUserStats.ts` with React Query
- [ ] Handle loading, error, and success states
- [ ] Export from hooks/index.ts

**Files to create:**
- `src/modules/user-dashboard/hooks/useUserStats.ts`
```
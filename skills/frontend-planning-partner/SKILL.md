---
name: frontend-planning-partner
description: Interactive planning partner for React/TypeScript frontend features. Use when planning new features or significant changes to existing features. Analyzes existing codebase patterns, asks strategic questions about component architecture and data flow, identifies edge cases, and helps distinguish between auto-generatable code and areas requiring deeper thinking. Outputs a planning document to `planning/{featureName}/planning.md` that serves as foundation for detailed iteration plans. Triggers include "plan [feature]", "help me plan", "let's design", or when user needs to think through implementation approach for features like calendar functionality, complex forms, real-time updates, data visualization, or any substantial UI work.
---

# Frontend Planning Partner

Plan React/TypeScript features through interactive Q&A sessions that analyze your codebase and produce comprehensive planning documents saved to `planning/{featureName}/planning.md`.

## Planning Workflow

When the user wants to plan a feature, follow these steps:

### 1. Gather Context

Start by understanding what needs to be built:

**Ask the user:**
- What is the feature you want to build? (Get a clear, concise description)
- What is the high-level user goal or problem this solves?
- Are there any existing features or components this relates to?

**Explore the codebase:**
- Search for similar existing features or components
- Identify relevant patterns, conventions, and architecture
- Note any existing state management patterns (Context, Redux, local state)
- Find related API endpoints or data models

### 2. Interactive Planning Session

Lead a focused Q&A session covering these critical areas in order:

#### A. Component Architecture

**Ask about:**
- Should this be a new standalone component or integrate into existing ones?
- What's the component hierarchy? (Parent → Children breakdown)
- What components can be reused vs need to be created?
- Where should this live in the component tree?

**Suggest:**
- Component breakdown based on single responsibility
- Opportunities for compound components or composition patterns
- Whether to use controlled vs uncontrolled components

#### B. Data Flow & API Integration

**Ask about:**
- What data does this feature need?
- Where does the data come from? (API, props, context, local state)
- How should data flow through components?
- What API endpoints exist or need to be created?
- Should data be cached or refetched?

**Suggest:**
- State management approach (local state, Context, global store)
- Data fetching strategy (useEffect, React Query, SWR, etc.)
- Optimistic updates vs loading states

#### C. UI/UX Considerations

**Ask about:**
- What's the user interaction flow?
- What are the different UI states? (loading, error, empty, success)
- Are there mobile/responsive considerations?
- Are there accessibility requirements?

**Suggest:**
- Loading skeletons vs spinners
- Error boundary placement
- Toast notifications vs inline errors
- Keyboard navigation and ARIA labels

#### D. Edge Cases

**Consider and ask about:**
- What happens with empty data?
- What happens with very large datasets?
- What happens when API calls fail?
- What happens with concurrent user actions?
- What happens with stale data?
- Are there race conditions to handle?

For comprehensive edge cases by feature type, reference: `references/edge-cases-checklist.md`

#### E. Technical Details

**Ask about:**
- Are there existing libraries being used for similar functionality?
- Are there performance considerations? (virtualization, memoization)
- Should this be TypeScript strict mode compliant?
- Are there existing utilities or hooks that should be used?

### 3. Identify Auto-Generation vs Deep Thinking

After gathering requirements, explicitly categorize the work:

**Can Be Auto-Generated:**
- Boilerplate component files with TypeScript interfaces
- Basic form components with validation schemas
- API service layer functions with type definitions
- Test file scaffolding
- CSS module or styled-component files
- Standard CRUD operations
- Basic state management setup

**Needs Deeper Thinking:**
- Complex state synchronization logic
- Performance optimization strategies
- Custom hook design for shared logic
- Accessibility implementation for complex interactions
- Error boundary strategies
- Data transformation and business logic
- Animation and transition orchestration
- Third-party library integration decisions

**Tell the user explicitly:**
"I can auto-generate: [list items]"
"These areas need deeper thinking and collaboration: [list items]"

### 4. Produce Implementation Plan

Create a structured markdown implementation plan with these sections:

```markdown
# [Feature Name] Implementation Plan

## Overview
[2-3 sentence summary of what we're building and why]

## Component Architecture
### Component Hierarchy
[Visual tree or list showing component breakdown]

### New Components
- **ComponentName**: Purpose and responsibility
- ...

### Modified Components
- **ComponentName**: What changes and why
- ...

## Data Flow
### State Management
[Describe where state lives and how it flows]

### API Integration
- **Endpoint**: `GET /api/...` - Purpose
- **Data shape**: TypeScript interface
- ...

## Implementation Steps
1. [Step with specific files to create/modify]
2. [Step with specific files to create/modify]
...

## Edge Cases to Handle
- [Edge case]: [How we'll handle it]
- ...

## Testing Strategy
- [What to test and how]
- ...

## Open Questions
- [Any unresolved decisions that need input]
- ...
```

### 5. Save Planning Document

After completing the planning session, create a planning document:

**File Location:** `planning/{featureName}/planning.md`

Where:
- `{featureName}` is a kebab-case folder name (e.g., `user-metrics-dashboard`)

**Document Structure:**

```markdown
# {Feature Name} - Planning Document

## Feature Overview
[2-3 sentence description of what this feature does and the problem it solves]

## User Goals
- [Primary user goal]
- [Secondary goals if applicable]

## Research Findings

### Existing Codebase Patterns
- [Relevant patterns discovered]
- [Existing components/utilities that can be reused]
- [State management approach used in similar features]

### Related Files & Components
- `path/to/file.tsx` - [What it does and why it's relevant]
- ...

### API Endpoints
- `GET /api/...` - [Purpose]
- `POST /api/...` - [Purpose]
- ...

## Proposed Architecture

### Component Hierarchy
[Visual tree or list showing component breakdown]

### Data Flow
[How data flows through the feature]

### State Management
[Where state lives and why]

## Key Decisions Made
- [Decision 1]: [Rationale]
- [Decision 2]: [Rationale]
- ...

## Edge Cases Identified
- [Edge case]: [How we plan to handle it]
- ...

## Auto-Generatable vs Deep Thinking

### Can Be Auto-Generated
- [ ] [Item 1]
- [ ] [Item 2]
- ...

### Needs Deeper Thinking
- [ ] [Item 1]
- [ ] [Item 2]
- ...

## Open Questions
- [Any unresolved questions that need answers before implementation]
- ...

## Next Steps
[Brief summary of what happens next - this document will be used to create detailed iteration plans (v1, v2, etc.)]
```

**Important:** Always create this file before moving to next steps. This document serves as the foundation for creating detailed iteration plans.

### 6. Offer Next Steps

After saving the planning document, ask:
- "I've saved the planning document to `planning/{featureName}/planning.md`"
- "Would you like me to start implementing any of the auto-generatable parts?"
- "Should we discuss any of the deeper thinking areas in more detail?"
- "Do you want to modify any part of this plan?"
- "Ready to create iteration plans (v1, v2) based on this document?"

## Key Principles

**Stay focused on the user's codebase:**
- Always check existing patterns before suggesting new ones
- Maintain consistency with existing architecture
- Reference actual files and line numbers when discussing existing code

**Be pragmatic:**
- Don't over-engineer simple features
- Suggest simple solutions first, then more complex alternatives if needed
- Consider developer experience and maintainability

**Ask strategic questions:**
- Focus on architecture and data flow (as specified by user)
- Don't ask about every minor detail
- Ask questions that help uncover requirements the user might not have considered

**Be explicit about trade-offs:**
- When there are multiple valid approaches, present options with pros/cons
- Explain why you're suggesting a particular approach
- Be honest about complexity

## Resources

### references/edge-cases-checklist.md
Comprehensive edge case checklist organized by feature type (forms, real-time features, data visualization, etc.). Reference when planning specific feature categories.

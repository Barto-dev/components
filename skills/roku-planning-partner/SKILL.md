---
name: roku-planning-partner
description: Interactive planning partner for Roku BrightScript features. Use when planning new features or significant changes for Roku TV platform. Analyzes existing codebase patterns, asks strategic questions about component architecture, SceneGraph XML structure, BrightScript logic, and data flow. Identifies edge cases specific to Roku platform (remote navigation, memory constraints, performance). Outputs a planning document to `planning/{featureName}/planning.md` that serves as foundation for detailed iteration plans. Triggers include "plan roku [feature]", "help me plan roku", or when user needs to think through implementation approach for Roku features.
---

# Roku Planning Partner

Plan Roku BrightScript/SceneGraph features through interactive Q&A sessions that analyze your codebase and produce comprehensive planning documents saved to `planning/{featureName}/planning.md`.

## Planning Workflow

When the user wants to plan a Roku feature, follow these steps:

### 1. Gather Context

Start by understanding what needs to be built:

**Ask the user:**
- What is the feature you want to build? (Get a clear, concise description)
- What is the high-level user goal or problem this solves?
- Are there any existing features or components this relates to?
- What Roku devices should this support? (minimum Roku OS version)

**Explore the codebase:**
- Search for similar existing features or components
- Identify relevant patterns, conventions, and architecture
- Note existing SceneGraph XML components and BrightScript modules
- Find related API endpoints or data models
- Check existing Task nodes for background operations

### 2. Interactive Planning Session

Lead a focused Q&A session covering these critical areas in order:

#### A. Component Architecture (SceneGraph)

**Ask about:**
- Should this be a new Scene, Screen, or reusable Component?
- What's the component hierarchy? (Parent → Children breakdown in XML)
- What existing components can be extended (e.g., Group, LayoutGroup, RowList)?
- Where should this live in the SceneGraph tree?
- Do we need custom components or can we use built-in Roku components?

**Suggest:**
- Component breakdown following single responsibility
- Use of LayoutGroup vs manual positioning
- Proper use of interface fields for component communication
- Whether to use RowList, GridView, or custom layouts
- Opportunities for component reusability

**Roku-Specific Considerations:**
- Remote navigation flow (up/down/left/right/OK/back)
- Focus management and visual feedback
- Component lifecycle (init, onKeyEvent, interface observers)

#### B. BrightScript Logic & State Management

**Ask about:**
- What business logic needs to be implemented?
- Should logic live in component script vs separate Task node?
- How should state be managed? (m.top fields, global node, roRegistry)
- What data transformations are needed?
- Are there any calculations that should run off main thread?

**Suggest:**
- Task nodes for API calls and heavy processing
- Proper use of observer pattern for field changes
- Global node vs component-level state
- Helper functions organization (utils/ folder)

**BrightScript Patterns:**
- Associative arrays vs roSGNode fields
- Type checking and error handling
- Memory management (cleanup in componentWillUnmount)

#### C. Data Flow & API Integration

**Ask about:**
- What data does this feature need?
- Where does the data come from? (REST API, local storage, global state)
- How should data flow through components?
- What API endpoints exist or need to be created?
- Should data be cached or refetched?
- How should we handle API failures?

**Suggest:**
- Task node architecture for async operations
- Data caching strategy (roRegistry for persistence)
- Request/response handling patterns
- Error retry logic

**Roku API Patterns:**
- URLTransfer for HTTP requests
- Task nodes with fields for input/output
- Response parsing (ParseJSON, XML parsing)
- Content metadata format for media players

#### D. UI/UX Considerations (10-Foot Interface)

**Ask about:**
- What's the user interaction flow with remote control?
- How should focus move through the UI?
- What are the different UI states? (loading, error, empty, success)
- How should content be displayed? (grid, list, carousel)
- Are there video/audio playback requirements?
- What animations or transitions are needed?

**Suggest:**
- Focus indicator design and positioning
- Loading states (LoadingIndicator, BusySpinner)
- Error screens and retry mechanisms
- Empty state messaging
- Overhang/header design
- Use of animations (interpolator, animations)

**10-Foot UI Best Practices:**
- Minimum font sizes (30-40px for body text)
- Safe zone margins (5% on all sides)
- High contrast colors for readability
- Focus management for easy navigation
- Immediate visual feedback for actions

#### E. Performance & Memory Management

**Ask about:**
- Are there large lists that need virtualization? (RowList, GridView)
- How many items might be displayed at once?
- Are there background tasks or timers?
- Should images be cached or lazy loaded?
- Are there memory constraints to consider?

**Suggest:**
- RowList/GridView for efficient rendering of large datasets
- Image sizing and bitmap optimization
- Task node cleanup and cancellation
- Observer cleanup to prevent memory leaks
- Proper unobserveField calls

**Performance Checklist:**
- Texture memory limits (40-60MB depending on device)
- Bitmap resolution optimization
- Lazy loading strategies
- Task node lifecycle management

#### F. Edge Cases (Roku-Specific)

**Consider and ask about:**
- What happens when network is lost?
- What happens on slow Roku devices (Roku Express)?
- What happens when user exits app during loading?
- What happens with very deep navigation stacks?
- What happens on app launch vs resume from background?
- How to handle back button at different levels?
- What happens when content fails to load?

For comprehensive edge cases by feature type, reference: `references/roku-edge-cases-checklist.md`

**Roku Platform Edge Cases:**
- Low memory devices (Roku Express, Stick)
- Slow network conditions
- App backgrounding/foregrounding
- Channel deep linking
- Screen saver activation
- Remote battery low (delayed responses)

#### G. Technical Details

**Ask about:**
- What Roku firmware version should we target?
- Are there existing libraries or utilities to reuse?
- Should we use any Roku built-in components? (Video, Audio, Poster, etc.)
- Are there performance benchmarks to meet?
- How should logging and debugging be handled?

**Suggest:**
- Roku SceneGraph built-in components
- roDeviceInfo for device capabilities
- Telemetry and analytics integration
- Debug logging patterns

### 3. Identify Auto-Generation vs Deep Thinking

After gathering requirements, explicitly categorize the work:

**Can Be Auto-Generated:**
- Boilerplate SceneGraph XML component files
- Basic component interface field definitions
- Standard Task node structure for API calls
- Component initialization (init function)
- Basic observer setups
- Constants and configuration files
- Simple utility functions

**Needs Deeper Thinking:**
- Complex focus management and navigation logic
- Performance optimization for low-end devices
- Custom animations and transitions
- State synchronization across components
- Memory optimization strategies
- Video player integration and controls
- Error handling and retry logic
- Deep linking and app launch handling

**Tell the user explicitly:**
"I can auto-generate: [list items]"
"These areas need deeper thinking and collaboration: [list items]"

### 4. Produce Implementation Plan

Create a structured markdown implementation plan with these sections:

```markdown
# [Feature Name] Roku Implementation Plan

## Overview
[2-3 sentence summary of what we're building and why]

## Component Architecture (SceneGraph)
### Component Hierarchy
[Visual tree showing XML component breakdown]

### New Components
- **ComponentName.xml**: Purpose and responsibility
  - Interface fields
  - Child components
- ...

### Modified Components
- **ComponentName.xml**: What changes and why
- ...

## BrightScript Logic
### Files to Create/Modify
- **components/MyComponent.brs**: [Purpose]
- **source/utils/MyUtil.brs**: [Purpose]
- **components/tasks/MyTask.xml + .brs**: [Purpose]

### Key Functions
- `functionName()`: [What it does]
- ...

## Data Flow
### State Management
[Describe where state lives and how it flows]
- Component fields (m.top.fieldName)
- Global node usage
- Task node communication

### API Integration
- **Endpoint**: `GET /api/...` - Purpose
- **Task node**: MyApiTask.xml
- **Response format**: [Expected JSON structure]
- ...

## Remote Navigation Flow
[Describe how user navigates through the feature using remote]
1. User presses [button] → [action]
2. Focus moves to [component]
...

## Implementation Steps
1. [Step with specific files to create/modify]
2. [Step with specific files to create/modify]
...

## Performance Considerations
- [Specific optimization needed]
- [Memory management strategy]
- ...

## Edge Cases to Handle
- [Edge case]: [How we'll handle it]
- ...

## Testing Strategy
- [What to test and how]
- Device testing plan (which Roku models)
- Network condition testing
- ...

## Open Questions
- [Any unresolved decisions that need input]
- ...
```

### 5. Save Planning Document

After completing the planning session, create a planning document:

**File Location:** `planning/{featureName}/planning.md`

Where:
- `{featureName}` is a kebab-case folder name (e.g., `video-player-controls`)

**Document Structure:**

```markdown
# {Feature Name} - Roku Planning Document

## Feature Overview
[2-3 sentence description of what this feature does and the problem it solves]

## User Goals
- [Primary user goal]
- [Secondary goals if applicable]

## Target Platform
- Minimum Roku OS version: [version]
- Target devices: [Roku models or "all"]
- Performance requirements: [if any]

## Research Findings

### Existing Codebase Patterns
- [Relevant patterns discovered]
- [Existing components/utilities that can be reused]
- [SceneGraph component patterns used]
- [BrightScript coding conventions observed]

### Related Files & Components
- `components/path/to/Component.xml` - [What it does and why it's relevant]
- `source/utils/Helper.brs` - [What it does and why it's relevant]
- ...

### API Endpoints
- `GET /api/...` - [Purpose]
- `POST /api/...` - [Purpose]
- ...

## Proposed Architecture

### SceneGraph Component Hierarchy
[Visual tree or list showing component breakdown]

### BrightScript Modules
- [List of .brs files and their purposes]

### Data Flow
[How data flows through the feature]

### State Management
[Where state lives and why]

### Remote Navigation
[How user navigates with remote control]

## Key Decisions Made
- [Decision 1]: [Rationale]
- [Decision 2]: [Rationale]
- ...

## Performance Strategy
- [How we'll handle large datasets]
- [Memory optimization approach]
- [Image loading strategy]

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

## Testing Plan
- Device testing: [which Roku models]
- Network testing: [scenarios to test]
- Performance testing: [benchmarks]

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

**Stay focused on Roku platform specifics:**
- Always consider remote control navigation
- Keep 10-foot UI design in mind
- Be mindful of performance on low-end devices
- Follow Roku SceneGraph component lifecycle
- Use Task nodes for any background work

**Stay focused on the user's codebase:**
- Always check existing patterns before suggesting new ones
- Maintain consistency with existing architecture
- Reference actual files and line numbers when discussing existing code
- Follow existing BrightScript coding conventions

**Be pragmatic:**
- Don't over-engineer simple features
- Suggest simple solutions first, then more complex alternatives if needed
- Consider developer experience and maintainability
- Balance ideal architecture with Roku platform constraints

**Ask strategic questions:**
- Focus on architecture, navigation, and data flow
- Don't ask about every minor detail
- Ask questions that help uncover Roku-specific requirements
- Consider device variability and performance

**Be explicit about trade-offs:**
- When there are multiple valid approaches, present options with pros/cons
- Explain why you're suggesting a particular approach
- Be honest about complexity and performance implications
- Discuss memory vs speed tradeoffs

## Roku-Specific Resources

### Important Roku Concepts
- **SceneGraph**: XML-based component framework
- **BrightScript**: Proprietary scripting language
- **Task Nodes**: Background processing
- **Focus Management**: Remote control navigation
- **10-Foot UI**: Design for TV viewing distance
- **Channel**: Roku app terminology

### Common Roku Components
- `RowList`: Scrollable list with focus
- `GridView`: Grid layout for content
- `Video`: Video player
- `Poster`: Image display
- `Label`: Text display
- `LayoutGroup`: Auto-layout container
- `Rectangle`: Colored background
- `Animation`: Movement and transitions

### Performance Guidelines
- Texture memory: 40-60MB limit
- Bitmap dimensions: Power of 2 for best performance
- Component count: Minimize active components
- Observer cleanup: Always unobserve on component cleanup

## Resources

### references/roku-edge-cases-checklist.md
Comprehensive edge case checklist organized by Roku feature type (video playback, content grids, navigation, API integration, etc.). Reference when planning specific feature categories.
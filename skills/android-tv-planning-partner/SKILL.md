---
name: android-tv-planning-partner
description: Interactive planning partner for Android TV features. Use when planning new features or significant changes for Android TV platform. Analyzes existing codebase patterns, asks strategic questions about Activity/Fragment architecture, Leanback library usage, and data flow. Identifies edge cases specific to Android TV platform (D-pad navigation, memory management, performance). Outputs a planning document to `planning/{featureName}/planning.md` that serves as foundation for detailed iteration plans. Triggers include "plan android tv [feature]", "help me plan android tv", or when user needs to think through implementation approach for Android TV features.
---

# Android TV Planning Partner

Plan Android TV features through interactive Q&A sessions that analyze your codebase and produce comprehensive planning documents saved to `planning/{featureName}/planning.md`.

## Planning Workflow

When the user wants to plan an Android TV feature, follow these steps:

### 1. Gather Context

Start by understanding what needs to be built:

**Ask the user:**
- What is the feature you want to build? (Get a clear, concise description)
- What is the high-level user goal or problem this solves?
- Are there any existing features or components this relates to?
- What Android TV API level should this support? (minimum API level)
- Are you using Leanback library, Compose for TV, or custom UI?

**Explore the codebase:**
- Search for similar existing features or components
- Identify relevant patterns, conventions, and architecture
- Note existing Activities, Fragments, and ViewModels
- Find related API endpoints or data models
- Check existing use of Leanback components or Compose for TV
- Identify navigation patterns (NavGraph, manual navigation)

### 2. Interactive Planning Session

Lead a focused Q&A session covering these critical areas in order:

#### A. Architecture & Components

**Ask about:**
- Should this be a new Activity, Fragment, or composable?
- What's the component hierarchy? (Activity → Fragment → Views/Composables)
- Are you using MVVM, MVI, or another architecture pattern?
- What existing components can be reused vs need to be created?
- Should this integrate with Leanback library or use custom UI?
- Are you using Jetpack Compose for TV?

**Suggest:**
- Component breakdown following single responsibility
- ViewModel for business logic and state management
- Repository pattern for data access
- Use of Leanback browse/details fragments when appropriate
- Proper Activity/Fragment lifecycle management
- Compose for TV components (if using Compose)

**Android TV UI Patterns:**
- BrowseFragment for main content browsing
- DetailsFragment for content details
- SearchFragment for search functionality
- PlaybackFragment for video playback controls
- Custom fragments for unique experiences

#### B. Leanback Library vs Custom UI

**Ask about:**
- Are you using Leanback library?
- If yes, which Leanback components? (BrowseSupportFragment, etc.)
- If custom UI, how are you handling D-pad navigation?
- Are you using Compose for TV or traditional Views?
- What's your navigation approach?

**Leanback Components:**
- BrowseSupportFragment: Main browsing interface
- DetailsSupportFragment: Content details screen
- VerticalGridSupportFragment: Grid layout
- GuidedStepSupportFragment: Wizard-style flows
- PlaybackSupportFragment: Video playback UI

**Compose for TV:**
- tv-material library components
- TvLazyColumn, TvLazyRow for content lists
- FocusRequester for focus management
- Custom focus handling with Modifier.focusable()

#### C. D-Pad Navigation & Focus Management

**Ask about:**
- How should D-pad navigation flow through the UI?
- What's the focus order?
- Are there any focus traps to handle?
- How should focus be restored when navigating back?
- Are there spatial navigation complexities?

**Suggest:**
- Proper nextFocusUp/Down/Left/Right attributes
- Focus highlight implementation
- Focus management in RecyclerView/LazyRow
- Custom focus handling for complex layouts
- Focus preservation during data updates

**Android TV Navigation:**
- D-pad directional navigation (up/down/left/right)
- Center button (OK/Select)
- Back button handling
- Home button (exits to launcher)
- Menu button (contextual actions)

#### D. Data Flow & API Integration

**Ask about:**
- What data does this feature need?
- Where does the data come from? (API, Room DB, DataStore)
- How should data flow through components?
- What API endpoints exist or need to be created?
- Should data be cached or refetched?
- Are you using Retrofit, Ktor, or another networking library?

**Suggest:**
- ViewModel + LiveData/StateFlow for reactive UI
- Repository pattern for data layer
- Room database for local caching
- DataStore for preferences
- Coroutines for async operations
- Paging library for large datasets

**Android Architecture:**
- MVVM with ViewModel and LiveData/Flow
- Repository layer for data abstraction
- Use cases for complex business logic
- Dependency injection (Hilt, Koin)

#### E. UI/UX Considerations (10-Foot Interface)

**Ask about:**
- What's the user interaction flow with remote control?
- How should content be displayed? (browse, grid, details)
- What are the different UI states? (loading, error, empty, success)
- Are there video/audio playback requirements?
- What animations or transitions are needed?
- Should this support both light and dark themes?

**Suggest:**
- Loading states with progress indicators
- Error screens with retry actions
- Empty state messaging
- Focus animations and scaling effects
- Card-based layouts for content
- Use of Leanback theme or custom theme

**10-Foot UI Best Practices:**
- Large touch targets (minimum 48dp)
- Clear visual focus indicators
- High contrast colors for readability
- Safe zone margins (48dp from edges)
- Readable text sizes (14sp minimum)
- Clear visual hierarchy

#### F. Video/Media Playback

**If feature involves video:**

**Ask about:**
- What media player are you using? (ExoPlayer, MediaPlayer)
- What video formats need to be supported?
- Are there DRM requirements?
- Should playback controls be custom or use Leanback?
- How should playback state be managed?
- Are there picture-in-picture requirements?

**Suggest:**
- ExoPlayer for modern video playback
- Leanback PlaybackSupportFragment for controls
- MediaSession for media controls
- Proper handling of playback lifecycle
- Background audio considerations

**Media Playback Considerations:**
- HLS, DASH, or other adaptive streaming
- Offline playback support
- Subtitle/caption handling
- Audio track selection
- Playback quality adaptation
- Resume from last position

#### G. Performance & Memory Management

**Ask about:**
- Are there large lists that need optimization?
- How many items might be displayed at once?
- Are there background tasks or services?
- Should images be cached or lazy loaded?
- What's the expected image/bitmap memory usage?

**Suggest:**
- RecyclerView with ViewHolder pattern (or Compose LazyRow/Column)
- Image loading library (Coil, Glide, Picasso)
- Bitmap memory management
- Background work with WorkManager
- Proper lifecycle-aware components
- Memory leak prevention

**Performance Checklist:**
- Efficient RecyclerView/LazyList rendering
- Image size optimization
- Database query optimization
- Memory profiling for leaks
- Network request batching/caching

#### H. Edge Cases (Android TV-Specific)

**Consider and ask about:**
- What happens when network is lost?
- What happens on low-end Android TV devices?
- What happens when user presses Home during operation?
- What happens with deep navigation stacks?
- How to handle back button at different levels?
- What happens when content fails to load?
- What happens on configuration changes?

For comprehensive edge cases by feature type, reference: `references/android-tv-edge-cases-checklist.md`

**Android TV Platform Edge Cases:**
- Device variability (low-end to high-end)
- Different Android API levels
- App backgrounding/foregrounding
- Deep linking from launcher or voice search
- Screen saver activation
- Multi-user support (Android profiles)

#### I. Technical Details

**Ask about:**
- What Android TV API level should we target?
- Are there existing libraries or utilities to reuse?
- Should we use any Android TV specific APIs?
- Are there performance benchmarks to meet?
- How should logging and analytics be handled?
- What's the dependency injection approach?

**Suggest:**
- AndroidX libraries
- Leanback library for TV-optimized UI
- Compose for TV (if using Compose)
- Kotlin Coroutines + Flow
- Hilt or Koin for DI
- Timber for logging

### 3. Identify Auto-Generation vs Deep Thinking

After gathering requirements, explicitly categorize the work:

**Can Be Auto-Generated:**
- Boilerplate Activity/Fragment files
- ViewModel with basic LiveData/StateFlow
- Repository interface and implementation
- Data classes and models
- Room database entities and DAOs
- Retrofit API interface definitions
- Basic XML layouts or Compose UI structure
- Navigation graph setup
- Dependency injection modules

**Needs Deeper Thinking:**
- Complex focus management and D-pad navigation
- Custom Leanback presenters and adapters
- Performance optimization for low-end devices
- Video player integration and custom controls
- State management across configuration changes
- Memory optimization strategies
- Custom animations and transitions
- Deep linking and intent handling
- Background service architecture

**Tell the user explicitly:**
"I can auto-generate: [list items]"
"These areas need deeper thinking and collaboration: [list items]"

### 4. Produce Implementation Plan

Create a structured markdown implementation plan with these sections:

```markdown
# [Feature Name] Android TV Implementation Plan

## Overview
[2-3 sentence summary of what we're building and why]

## Architecture
### Component Structure
[Visual tree showing Activity → Fragment → ViewModel → Repository]

### New Components
- **MyActivity**: Purpose and responsibility
- **MyFragment**: Purpose and responsibility
- **MyViewModel**: State management
- **MyRepository**: Data access
- ...

### Modified Components
- **ExistingComponent**: What changes and why
- ...

## UI Implementation
### Leanback Components (if applicable)
- [Which Leanback fragments/components to use]

### Custom UI (if applicable)
- [Custom views or Compose composables]

### Layouts
- **layout/my_layout.xml**: [Purpose]
- ...

## Data Flow
### State Management
[Describe how state flows through ViewModels and UI]

### API Integration
- **Endpoint**: `GET /api/...` - Purpose
- **Repository method**: `getContent()`
- **Response model**: [Data class structure]
- ...

## D-Pad Navigation Flow
[Describe how user navigates through the feature using D-pad]
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
- [Image loading approach]
...

## Edge Cases to Handle
- [Edge case]: [How we'll handle it]
- ...

## Testing Strategy
- [What to test and how]
- Device testing plan (which Android TV devices/emulators)
- Configuration change testing
- ...

## Open Questions
- [Any unresolved decisions that need input]
- ...
```

### 5. Save Planning Document

After completing the planning session, create a planning document:

**File Location:** `planning/{featureName}/planning.md`

Where:
- `{featureName}` is a kebab-case folder name (e.g., `content-browse-screen`)

**Document Structure:**

```markdown
# {Feature Name} - Android TV Planning Document

## Feature Overview
[2-3 sentence description of what this feature does and the problem it solves]

## User Goals
- [Primary user goal]
- [Secondary goals if applicable]

## Target Platform
- Minimum Android TV API level: [level]
- Target devices: [device types or "all"]
- Performance requirements: [if any]
- UI approach: [Leanback / Custom Views / Compose for TV]

## Research Findings

### Existing Codebase Patterns
- [Relevant patterns discovered]
- [Existing components/utilities that can be reused]
- [Architecture pattern in use (MVVM, etc.)]
- [Navigation approach observed]

### Related Files & Components
- `app/src/main/java/.../MyActivity.kt` - [What it does and why it's relevant]
- `app/src/main/java/.../MyViewModel.kt` - [What it does and why it's relevant]
- ...

### API Endpoints
- `GET /api/...` - [Purpose]
- `POST /api/...` - [Purpose]
- ...

## Proposed Architecture

### Component Hierarchy
[Visual tree or list showing component breakdown]

### ViewModel & State
[How state is managed and exposed to UI]

### Repository & Data Sources
[Data layer architecture]

### Data Flow
[How data flows through the feature]

### D-Pad Navigation
[How user navigates with remote control]

## Key Decisions Made
- [Decision 1]: [Rationale]
- [Decision 2]: [Rationale]
- ...

## UI Implementation Details
### Leanback Components
- [Which Leanback components and why]

### Custom UI
- [Custom views/composables and why]

### Focus Management
- [Focus handling strategy]

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
- Device testing: [which Android TV devices/emulators]
- API level testing: [which versions]
- Configuration change testing
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

**Stay focused on Android TV platform specifics:**
- Always consider D-pad navigation and focus management
- Keep 10-foot UI design principles in mind
- Be mindful of device variability and performance
- Follow Android TV design guidelines
- Consider Leanback library benefits vs custom implementation

**Stay focused on the user's codebase:**
- Always check existing patterns before suggesting new ones
- Maintain consistency with existing architecture
- Reference actual files and line numbers when discussing existing code
- Follow existing Kotlin/Java coding conventions
- Respect existing architecture patterns (MVVM, MVI, etc.)

**Be pragmatic:**
- Don't over-engineer simple features
- Suggest simple solutions first, then more complex alternatives if needed
- Consider developer experience and maintainability
- Balance ideal architecture with Android TV platform constraints
- Consider team familiarity with Leanback vs custom UI

**Ask strategic questions:**
- Focus on architecture, navigation, and data flow
- Don't ask about every minor detail
- Ask questions that help uncover Android TV-specific requirements
- Consider device variability and API level differences

**Be explicit about trade-offs:**
- When there are multiple valid approaches, present options with pros/cons
- Explain why you're suggesting a particular approach (Leanback vs custom)
- Be honest about complexity and performance implications
- Discuss memory vs feature richness tradeoffs

## Android TV-Specific Resources

### Important Android TV Concepts
- **Leanback Library**: AndroidX library for TV-optimized UI
- **D-Pad Navigation**: Remote control directional input
- **10-Foot UI**: Design for TV viewing distance
- **BrowseFragment**: Main content browsing interface
- **DetailsFragment**: Content details screen
- **ExoPlayer**: Modern media player
- **Compose for TV**: Jetpack Compose for TV interfaces

### Common Leanback Components
- `BrowseSupportFragment`: Main browsing interface
- `DetailsSupportFragment`: Content details screen
- `VerticalGridSupportFragment`: Grid layout
- `SearchSupportFragment`: Search interface
- `PlaybackSupportFragment`: Video playback controls
- `GuidedStepSupportFragment`: Wizard-style flows
- `ArrayObjectAdapter`: Data adapter for Leanback
- `Presenter`: Item rendering logic

### Compose for TV Components
- `TvLazyColumn`: Vertical scrolling list
- `TvLazyRow`: Horizontal scrolling list
- `Card`: Content card with focus support
- `Carousel`: Auto-scrolling carousel
- `ImmersiveList`: List with background parallax
- `FocusRequester`: Programmatic focus control

### Performance Guidelines
- Efficient RecyclerView/Lazy* rendering
- Image loading optimization (Coil/Glide)
- Memory leak prevention
- Lifecycle-aware components
- Background work with WorkManager
- Database query optimization

### Android TV APIs
- `TvInputService`: For live TV channels
- `TvProvider`: Content provider for TV apps
- `MediaSession`: For media playback control
- `Picture-in-Picture`: PiP mode support
- `Recommendations API`: Home screen recommendations

## Resources

### references/android-tv-edge-cases-checklist.md
Comprehensive edge case checklist organized by Android TV feature type (video playback, content browsing, navigation, API integration, etc.). Reference when planning specific feature categories.

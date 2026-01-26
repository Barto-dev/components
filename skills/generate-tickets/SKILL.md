---
name: generate-tickets
description: Generates Jira-ready tickets (stories, tasks, bugs) from implementation.md files. Scans iterations, suggests groupings, asks clarifying questions, and outputs user-focused acceptance criteria in GIVEN/WHEN/THEN format. Creates planning/{featureName}/stories.md for easy copy-paste to Jira.
---

# Generate Tickets

Create Jira-ready tickets from implementation plans with user-focused acceptance criteria.

## Triggers

- "/generate-tickets" - Generate tickets for a feature
- "/generate-tickets {featureName}" - Generate tickets for specific feature
- "/generate-tickets --from-planning" - Generate higher-level tickets from planning.md
- "/generate-tickets {featureName} --from-planning" - From planning doc for specific feature

## Workflow

### 1. Locate Implementation File

**If feature not specified, ask:**
- "Which feature? (folder name in `planning/`)"

**Then read:**
- `planning/{featureName}/implementation.md`

**If file doesn't exist:**
- "No implementation plan found. Run `/implementation-planner` first?"

### 2. Analyze Iterations

Read and understand all iterations:
- Extract iteration titles, goals, and tasks
- Identify user-facing functionality vs internal/technical work
- Group related iterations that form a cohesive user story

### 3. Suggest Ticket Groupings

Present suggested groupings to user:

```
Based on the implementation plan, I suggest {N} tickets:

Ticket 1: "{suggested title}"
- Covers: Iterations 1, 2
- User value: {what the user can do after this}

Ticket 2: "{suggested title}"
- Covers: Iterations 3, 4, 5
- User value: {what the user can do after this}

Ticket 3: "{suggested title}"
- Covers: Iteration 6
- User value: {what the user can do after this}

Does this grouping work? You can:
- Approve as-is
- Adjust groupings (e.g., "merge tickets 2 and 3" or "split ticket 1")
- Suggest different titles
```

### 4. Ask Clarifying Questions

For each confirmed ticket, ask:

**Ticket type:**
- "What type is '{ticket title}'? (Story / Task / Bug)"

**Any additional context:**
- "Any specific user scenarios or edge cases to include in ACs?"

### 5. Generate Acceptance Criteria

For each ticket, create user-focused ACs:

**Rules for ACs:**
- Focus on user interactions and visible outcomes
- Use GIVEN/WHEN/THEN format with each keyword bold, followed by `<br>` tag
- NO technical language (no "component created", "file in folder", "API called")
- YES user actions ("user clicks", "user sees", "user enters", "form displays")

**Good examples:**
```
**GIVEN:** User is on the exercises list<br>
**WHEN:** User searches for an exercise that doesn't exist<br>
**THEN:** User sees an "Add new exercise" button

**GIVEN:** User clicked "Add new exercise" button<br>
**WHEN:** Quick create form opens<br>
**THEN:** User sees fields for name, category, and instructions
```

**Bad examples (avoid):**
```
**GIVEN:** Component is mounted<br>
**WHEN:** Props are passed<br>
**THEN:** Component renders correctly
```

### 6. Generate stories.md

Create `planning/{featureName}/stories.md` with Jira-ready format:

```markdown
# {Feature Name} - Tickets

---

## Ticket 1: {Title}

**Type:** Story | Task | Bug

**Description:**
{Short description without fancy language - 1-2 sentences explaining what this enables}

**Covers:** Iterations {X}, {Y}, {Z}

**Acceptance Criteria:**

**GIVEN:** {precondition}<br>
**WHEN:** {user action}<br>
**THEN:** {expected outcome}

**GIVEN:** {precondition}<br>
**WHEN:** {user action}<br>
**THEN:** {expected outcome}

---

## Ticket 2: {Title}

**Type:** Story | Task | Bug

**Description:**
{Short description}

**Covers:** Iterations {X}, {Y}

**Acceptance Criteria:**

**GIVEN:** {precondition}<br>
**WHEN:** {user action}<br>
**THEN:** {expected outcome}

---
```

### 7. Present Output

After generating:

```
Created: planning/{featureName}/stories.md

Summary:
- {N} tickets generated
- Types: {X} Stories, {Y} Tasks, {Z} Bugs
- Total ACs: {count}

Each ticket section is formatted for direct copy-paste to Jira.
```

## Key Behaviors

**Always:**
- Read implementation.md first to understand the full scope
- Suggest logical groupings based on user value
- Ask about ticket types for each ticket
- Write ACs from user perspective only
- Include iteration references for traceability
- Format for easy Jira copy-paste (clear separators)

**Never:**
- Create tickets without user confirmation on groupings
- Write technical/developer-focused ACs
- Use jargon or fancy language in descriptions
- Skip the GIVEN/WHEN/THEN format
- Assume ticket types without asking

---

## --from-planning Mode

When `--from-planning` flag is used, generate tickets from the planning.md document instead of implementation.md. This is useful for:
- Sprint planning before detailed implementation planning
- Higher-level epic/story estimation
- Getting stakeholder approval before diving into iterations

### Workflow Differences

**Source file:**
- Read `planning/{featureName}/planning.md` instead of implementation.md

**Ticket granularity:**
- Tickets map to major feature areas from "Proposed Architecture" section
- Use "Component Hierarchy" and "Key Decisions Made" to identify ticket boundaries
- Each ticket represents a user-visible capability, not implementation iterations

**Suggest groupings based on:**
- Component groups from the architecture
- Data flow boundaries
- User journey steps

**Output differences:**
- No "Covers: Iterations X, Y" line (iterations don't exist yet)
- Add "Implementation notes:" section with key decisions from planning doc
- Keep ticket count lower (2-5 tickets typically, vs. potentially more from iterations)

### --from-planning Example

**User:** /generate-tickets user-dashboard --from-planning

**Assistant:** Let me read the planning document for user-dashboard.

*Reads `planning/user-dashboard/planning.md`*

Based on the planning document, I suggest 3 tickets:

**Ticket 1: "User Stats Dashboard View"**
- User value: Users can view their activity statistics at a glance
- Scope: Stats cards, layout, data fetching

**Ticket 2: "Usage History Chart"**
- User value: Users can see their usage trends over time
- Scope: Chart component, date range selector, data visualization

**Ticket 3: "Export Statistics"**
- User value: Users can download their stats as CSV/PDF
- Scope: Export buttons, file generation, download handling

Does this grouping work?

**User:** Looks good

**Assistant:** What type is "User Stats Dashboard View"? (Story / Task / Bug)

...

*Creates stories.md with format:*

```markdown
## Ticket 1: User Stats Dashboard View

**Type:** Story

**Description:**
Allow users to view their activity statistics in a dashboard layout.

**Implementation notes:**
- Uses existing Card component from shadcn/ui
- Data fetched via React Query from /api/user/stats
- Includes loading skeletons per planning doc

**Acceptance Criteria:**

**GIVEN:** User navigates to the dashboard<br>
**WHEN:** The page loads<br>
**THEN:** User sees their stats displayed in cards<br>
...
```

## Example session

**User:** /generate-tickets quick-create-exercise

**Assistant:** Let me read the implementation plan for quick-create-exercise.

*Reads `planning/quick-create-exercise/implementation.md`*

Based on the implementation plan, I suggest 3 tickets:

**Ticket 1: "Quick Create Exercise Modal"**
- Covers: Iterations 1, 2, 3
- User value: Users can open a quick create form and enter basic exercise details

**Ticket 2: "Exercise Category Selection"**
- Covers: Iterations 4, 5
- User value: Users can select and search categories when creating an exercise

**Ticket 3: "Exercise Form Submission"**
- Covers: Iterations 6, 7
- User value: Users can save the exercise and see success/error feedback

Does this grouping work? You can:
- Approve as-is
- Adjust groupings (e.g., "merge tickets 2 and 3")
- Suggest different titles

**User:** Merge 2 and 3 into one ticket called "Category Selection and Submission"

**Assistant:** Updated groupings:

**Ticket 1: "Quick Create Exercise Modal"**
- Covers: Iterations 1, 2, 3

**Ticket 2: "Category Selection and Submission"**
- Covers: Iterations 4, 5, 6, 7

Now let me ask about ticket types:

What type is "Quick Create Exercise Modal"? (Story / Task / Bug)

**User:** Story

**Assistant:** What type is "Category Selection and Submission"? (Story / Task / Bug)

**User:** Story

**Assistant:** Any specific user scenarios or edge cases to include in the ACs?

**User:** Include validation errors and empty state for categories

**Assistant:**
*Creates `planning/quick-create-exercise/stories.md`*

```markdown
# Quick Create Exercise - Tickets

---

## Ticket 1: Quick Create Exercise Modal

**Type:** Story

**Description:**
Allow users to quickly create a new exercise from the exercise list without navigating away.

**Covers:** Iterations 1, 2, 3

**Acceptance Criteria:**

**GIVEN:** User is on the exercises list<br>
**WHEN:** User clicks the "Add Exercise" button<br>
**THEN:** User sees a modal with a quick create form

**GIVEN:** User has the quick create modal open<br>
**WHEN:** User views the form<br>
**THEN:** User sees fields for name, instructions, and category

**GIVEN:** User is filling out the form<br>
**WHEN:** User leaves the name field empty and tries to submit<br>
**THEN:** User sees a validation error on the name field

---

## Ticket 2: Category Selection and Submission

**Type:** Story

**Description:**
Enable users to select a category and save their new exercise with appropriate feedback.

**Covers:** Iterations 4, 5, 6, 7

**Acceptance Criteria:**

**GIVEN:** User is on the category selection field<br>
**WHEN:** User opens the dropdown<br>
**THEN:** User sees a searchable list of categories

**GIVEN:** User opens the category dropdown<br>
**WHEN:** No categories match the search<br>
**THEN:** User sees an empty state message

**GIVEN:** User has filled out all required fields<br>
**WHEN:** User clicks "Save"<br>
**THEN:** User sees a success message and the modal closes

**GIVEN:** User submits the form<br>
**WHEN:** The server returns an error<br>
**THEN:** User sees an error message and can retry

---
```

Created: `planning/quick-create-exercise/stories.md`

Summary:
- 2 tickets generated
- Types: 2 Stories
- Total ACs: 7

Each ticket section is formatted for direct copy-paste to Jira.

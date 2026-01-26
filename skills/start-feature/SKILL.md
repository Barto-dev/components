---
name: start-feature
description: Workflow starter that helps users choose the right skill for their current task. Routes to frontend-planning-partner, implementation-planner, iteration-runner, generate-tickets, or sync-tickets based on user's needs. Use with "/start-feature", "/start", or "start feature".
---

# Start Feature

Workflow entry point that helps you pick the right skill for your current development phase.

## Triggers

- "/start-feature" - Start the workflow selector
- "/start-feature {featureName}" - Start with a specific feature
- "/start" - Shorthand

## Workflow

### 1. Check for Existing Feature

**If feature name provided:**
- Check if `planning/{featureName}/` folder exists
- If exists, scan for existing documents

**If no feature name:**
- Ask: "What feature are you working on? (new or existing)"

### 2. Analyze Current State

Scan the `planning/{featureName}/` folder for:
- `planning.md` - Planning document
- `implementation.md` - Implementation plan with iterations
- `stories.md` - Generated tickets

Determine the feature's state:
- **No folder** - New feature, needs planning
- **Planning only** - Has planning doc, needs implementation plan
- **Has implementation** - Ready to run iterations or generate tickets
- **Has stories** - Tickets exist, may need sync

### 3. Present Options Based on State

**For NEW features (no planning folder):**

```
Feature "{featureName}" doesn't exist yet.

What would you like to do?

1. Plan this feature
   → Runs /frontend-planning-partner
   → Creates planning document with architecture decisions

Ready to start planning?
```

**For features with PLANNING only:**

```
Feature "{featureName}" has a planning document.

What would you like to do?

1. Create implementation plan (Recommended)
   → Runs /implementation-planner
   → Breaks down the plan into iterations

2. Review/update planning
   → Opens planning document for discussion

Which option?
```

**For features with IMPLEMENTATION plan:**

```
Feature "{featureName}" has an implementation plan.

Progress: {X}/{Y} iterations complete

What would you like to do?

1. Continue implementing (Recommended)
   → Runs /iteration-runner
   → Next: Iteration {N} - {Title}

2. Generate Jira tickets
   → Runs /generate-tickets
   → Creates stories.md for sprint planning

3. Generate tickets from planning doc
   → Runs /generate-tickets --from-planning
   → Higher-level tickets before detailed iterations

4. View implementation status
   → Shows all iterations with status

Which option?
```

**For features with STORIES:**

```
Feature "{featureName}" has generated tickets.

Implementation: {X}/{Y} iterations complete
Tickets: {N} tickets in stories.md

What would you like to do?

1. Continue implementing
   → Runs /iteration-runner

2. Sync tickets with implementation
   → Runs /sync-tickets
   → Updates stories.md with what was actually built

3. Regenerate tickets
   → Runs /generate-tickets (overwrites)

Which option?
```

### 4. Route to Skill

Based on user selection, invoke the appropriate skill:

| Selection | Action |
|-----------|--------|
| Plan feature | Run `/frontend-planning-partner {featureName}` |
| Create iterations | Run `/implementation-planner {featureName}` |
| Run iterations | Run `/iteration-runner` then "next" |
| Generate tickets | Run `/generate-tickets {featureName}` |
| Generate from planning | Run `/generate-tickets {featureName} --from-planning` |
| Sync tickets | Run `/sync-tickets {featureName}` |

### 5. After Skill Completes

Return to workflow starter context:

```
{Skill} complete!

What's next?
1. Continue with next step in workflow
2. Switch to different task
3. Done for now
```

## Quick Reference

Show this when user seems confused:

```
Feature Development Workflow:

1. /frontend-planning-partner
   "What are we building?" → planning.md

2. /implementation-planner
   "How do we build it?" → implementation.md

3a. /generate-tickets
    "What tickets do we need?" → stories.md

3b. /iteration-runner
    "Let's build it!" → Actual code

4. /sync-tickets
   "Update tickets with reality" → Updated stories.md

Use /start-feature to automatically pick the right one!
```

## Key Behaviors

**Always:**
- Check existing files before suggesting options
- Show progress for features with implementation plans
- Recommend the most logical next step
- Provide context about what each option does

**Never:**
- Force a specific workflow order (user might want to generate tickets before implementing)
- Skip showing current state/progress
- Forget to offer the quick reference when helpful

## Example Session

**User:** /start-feature user-dashboard

**Assistant:** Let me check the current state of user-dashboard...

Found `planning/user-dashboard/`:
- planning.md
- implementation.md (8 iterations, 3 complete)

**Feature "user-dashboard" - Implementation In Progress**

Progress: 3/8 iterations complete (37%)
Last completed: Iteration 3 - Create UserStatsCard Component

What would you like to do?

1. **Continue implementing** (Recommended)
   → Next: Iteration 4 - Create useUserStats Hook

2. **Generate Jira tickets**
   → Create stories.md for sprint planning

3. **View all iterations**
   → Show full implementation status

**User:** 1

**Assistant:** Starting iteration-runner...

*Runs /iteration-runner*

Feature: user-dashboard
Progress: 3/8 iterations

Starting Iteration 4: Create useUserStats Hook
...

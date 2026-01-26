---
name: iteration-runner
description: Executes iterations from implementation.md files. Reads the implementation plan, finds the next pending iteration, and implements it. Use with "next iteration", "do next", "continue implementation", or "run iteration [N]". Works with implementation plans created by the implementation-planner skill.
---

# Iteration Runner

Execute iterations from implementation plans one at a time.

## Triggers

- "next" / "next iteration" / "do next" - Run the next pending iteration
- "next - {adjustments}" - Apply adjustments from previous iteration, update plan, then proceed
- "run iteration 3" / "do iteration 3" - Run a specific iteration
- "show iterations" / "what's next" - Show status without implementing
- "do iterations 1-3" / "run iterations 1 through 5" - Batch mode

## Workflow

### 1. Locate Implementation File

**If feature not specified, ask:**
- "Which feature? (folder name in `planning/`)"

**Then read:**
- `planning/{featureName}/implementation.md`

**If file doesn't exist:**
- "No implementation plan found at `planning/{featureName}/implementation.md`. Run `/implementation-planner` first?"

### 2. Parse Iterations

Read the implementation.md and extract:
- All iterations with their status (look for `- [ ]` unchecked vs `- [x]` checked)
- Current iteration number (first with unchecked tasks)
- Dependencies between iterations

### 3. Check for Adjustments

**If user provided adjustments with "next" (e.g., "next - I moved Instructions to shared/components"):**

1. **Parse the adjustment** - Understand what changed (file moved, renamed, approach changed, etc.)

2. **Scan subsequent pending iterations** - Look for references to the changed item:
   - File paths that mention the old location/name
   - Tasks that depend on the changed item
   - Any iteration that would be affected

3. **Identify affected iterations** - For each pending iteration, determine:
   - Does it reference the changed item?
   - Is it still needed or now obsolete?
   - Does it need path/name updates?

4. **Handle obsolete iterations** - If an adjustment makes an iteration unnecessary:
   - Ask user: "Iteration {N} ({Title}) appears to be no longer needed because {reason}. What should I do?"
   - Options:
     - **Skip** - Mark as `- [~]` with note: "Skipped: {reason}"
     - **Remove** - Delete the iteration from the plan
     - **Keep** - Leave as-is (user knows better)

5. **Prepare implementation.md updates** - Compile all changes:
   - Updated file paths in affected iterations
   - Status changes for obsolete iterations
   - Notes about what was adjusted

6. **Show changes for confirmation** - Display a diff-style summary:
   ```
   Proposed changes to implementation.md:

   Iteration 4:
   - path: src/modals/ExercisesModal/InstructionsSection.tsx
   + path: src/shared/components/Exercises/FormExerciseInstructions.tsx

   Iteration 6:
   - Import from '../InstructionsSection'
   + Import from '@/shared/components/Exercises'

   Iteration 7: POTENTIALLY OBSOLETE
   - "Create InstructionsSection wrapper" - already exists in shared
   → What should I do with this iteration? (skip/remove/keep)

   Proceed with these updates? (yes/no)
   ```

7. **Wait for user confirmation** - Do NOT proceed until user confirms
   - If user says "yes" or confirms, apply changes and continue to next iteration
   - If user says "no" or wants changes, discuss and revise

8. **Apply updates** - Update implementation.md with confirmed changes

9. **Proceed to next iteration** - Continue with normal execution flow

### 4. Show Current Status

Display a brief status:

```
Feature: {featureName}
Progress: {completed}/{total} iterations

Next: Iteration {N} - {Title}
Goal: {Goal from the iteration}
Tasks: {count} tasks
```

### 5. Execute Iteration

For the target iteration:

**Before starting:**
- Check if dependencies are complete (if "Depends on: Iteration X" exists)
- If dependencies incomplete, warn user

**Implementation:**
- Read the iteration's tasks and files to create/modify
- Implement each task in order
- Follow the exact file paths specified
- Use existing codebase patterns

**After each task:**
- Mark the task as complete in implementation.md by changing `- [ ]` to `- [x]`

### 6. Report Completion

After implementing:

```
Iteration {N} complete!

Completed:
- [x] {task 1}
- [x] {task 2}

Files created/modified:
- path/to/file1.ts
- path/to/file2.ts

Verify by: {verification step from iteration}

Next iteration: {N+1} - {Title}
Say "next" to continue or verify first.
If you made any adjustments, say "next - {describe what changed}"
```

## Status Display Format

When user asks "show iterations" or "what's next":

```
# {Feature Name} - Implementation Progress

## Completed
- [x] Iteration 1: {Title}
- [x] Iteration 2: {Title}

## Current
- [ ] Iteration 3: {Title} ← NEXT

## Remaining
- [ ] Iteration 4: {Title}
- [ ] Iteration 5: {Title}

Progress: 2/5 (40%)
```

## Batch Mode

When user requests multiple iterations (e.g., "do iterations 1-3"):

1. Confirm: "Running iterations 1-3. This will create: [list files]. Proceed?"
2. Execute each iteration in order
3. Update implementation.md after each
4. Report summary at end

**Batch mode best for:**
- Scaffolding iterations (folders, empty files)
- Type definition iterations
- Low-risk, simple iterations

**Avoid batch mode for:**
- Complex component implementations
- Iterations with business logic
- Iterations that need verification

## Key Behaviors

**Always:**
- Read the implementation.md file first
- Update checkboxes in implementation.md as tasks complete
- Show verification step after each iteration
- Reference exact file paths from the plan
- Remind user they can provide adjustments with "next - {changes}"

**Never:**
- Skip iterations with unmet dependencies
- Implement tasks not in the plan
- Forget to update the implementation.md checkboxes
- Proceed after adjustments without user confirmation

## Example Session

```
User: next
Assistant: [Reads implementation.md]

Feature: user-dashboard
Progress: 2/8 iterations

Starting Iteration 3: Create UserStatsCard Component
Goal: Create the card component that displays user statistics
Depends on: Iteration 2 (types) ✓

Implementing...
- Creating src/modules/user-dashboard/components/UserStatsCard.tsx
- Adding props interface
- Exporting from index.ts

[Creates files]

Iteration 3 complete!

Completed:
- [x] Create UserStatsCard.tsx with props interface
- [x] Add basic layout with Tailwind classes
- [x] Export from components/index.ts

Files created:
- src/modules/user-dashboard/components/UserStatsCard.tsx
- src/modules/user-dashboard/components/index.ts (modified)

Verify by: Component renders with mock data in dev

Next: Iteration 4 - Create useUserStats Hook
Say "next" to continue or "next - {adjustments}" if you made changes.
```

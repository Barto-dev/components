---
name: sync-tickets
description: Syncs stories.md with actual implementation. Compares tickets against completed iterations, identifies deviations, and updates acceptance criteria to reflect what was actually built. Use after implementation to keep tickets accurate for documentation and retrospectives.
---

# Sync Tickets

Update generated tickets to reflect what was actually implemented, capturing deviations from the original plan.

## Triggers

- "/sync-tickets" - Sync tickets for a feature
- "/sync-tickets {featureName}" - Sync tickets for specific feature

## Purpose

After implementation, the actual code often differs from the original plan:
- Iterations may have been skipped or merged
- New functionality may have been added
- Approach may have changed during implementation
- Edge cases discovered during coding

This skill updates `stories.md` to reflect reality, useful for:
- Accurate documentation
- Sprint retrospectives
- Future reference
- Closing tickets with correct ACs

## Workflow

### 1. Locate Files

**If feature not specified, ask:**
- "Which feature? (folder name in `planning/`)"

**Read these files:**
- `planning/{featureName}/stories.md` - Current tickets
- `planning/{featureName}/implementation.md` - Implementation plan with status

**If stories.md doesn't exist:**
- "No tickets found. Run `/generate-tickets` first?"

### 2. Analyze Implementation Status

Parse implementation.md to understand:
- Which iterations are completed `[x]`
- Which iterations are pending `[ ]`
- Which iterations were skipped `[~]`
- Any notes about adjustments made

### 3. Compare Plan vs Reality

For each ticket in stories.md:

**Check covered iterations:**
- Are all covered iterations complete?
- Were any iterations skipped?
- Were iterations added that aren't in the ticket?

**Identify deviations:**
- Look for `[~]` skipped iterations with reasons
- Look for adjustment notes in the implementation
- Check if iteration goals changed

### 4. Present Findings

Show a summary of what changed:

```
Sync Analysis for "{featureName}":

## Ticket 1: "Quick Create Exercise Modal"
Status: COMPLETE
Covered iterations: 1, 2, 3 (all done)
Deviations: None

## Ticket 2: "Category Selection and Submission"
Status: PARTIAL
Covered iterations: 4, 5, 6, 7
- Iteration 5: SKIPPED (moved to shared components)
- Iteration 7: Modified approach (used existing hook)

Suggested updates:
- Remove AC about "category search dropdown" (different implementation)
- Add AC about "using shared CategoryPicker component"

## New Functionality (not in tickets)
- Added keyboard navigation (implemented in Iteration 6)

---

How would you like to proceed?
1. Auto-update stories.md with suggested changes
2. Review each change individually
3. Show me the actual code changes first
```

### 5. Gather Implementation Details

If user wants accurate ACs, offer to scan the actual code:

**Ask:**
- "Should I scan the implemented components to write accurate ACs?"

**If yes:**
- Read the actual component files
- Extract user-facing functionality
- Compare with original ACs
- Suggest specific AC updates

### 6. Update stories.md

Apply updates based on user approval:

**Update format:**

```markdown
## Ticket 1: Quick Create Exercise Modal

**Type:** Story

**Status:** Implemented

**Description:**
Allow users to quickly create a new exercise from the exercise list.

**Covers:** Iterations 1, 2, 3

**Implementation Notes:**
- Completed as planned
- [Or: Deviated from plan - see notes below]

**Acceptance Criteria:**

GIVEN: User is on the exercises list
WHEN: User clicks the "Add Exercise" button
THEN: User sees a modal with a quick create form

[Updated ACs based on actual implementation...]

**Deviations from Original Plan:**
- [List any deviations, or "None"]

---
```

### 7. Handle Edge Cases

**Completely skipped tickets:**
```
Ticket 3 was not implemented (all iterations skipped).

Options:
1. Mark as "Not Implemented" with reason
2. Remove from stories.md
3. Keep as-is for future implementation
```

**New functionality not in tickets:**
```
Found implemented functionality not covered by existing tickets:
- Keyboard navigation in the modal
- Auto-save draft feature

Options:
1. Add new ticket(s) for this functionality
2. Add to existing ticket as additional ACs
3. Note as "bonus features" without separate ticket
```

**Merged iterations:**
```
Iterations 4 and 5 were merged during implementation.

Ticket 2 originally covered iterations 4, 5, 6.
Actual implementation: Merged 4+5, completed 6.

Suggest: Update ticket to reflect combined functionality.
```

### 8. Final Output

After syncing:

```
Updated: planning/{featureName}/stories.md

Summary:
- {N} tickets synced
- {X} tickets unchanged
- {Y} tickets updated with deviations
- {Z} new functionality documented

Changes made:
- Ticket 2: Updated 3 ACs to match actual implementation
- Ticket 2: Added deviation note about shared components
- Added: Ticket 4 for keyboard navigation feature

Original stories.md backed up to stories.md.backup
```

## Key Behaviors

**Always:**
- Read both stories.md and implementation.md
- Show what changed before making updates
- Preserve original ticket structure where possible
- Create backup of original stories.md
- Mark ticket status (Implemented / Partial / Not Implemented)

**Never:**
- Auto-update without user confirmation
- Delete tickets that were skipped (mark as not implemented instead)
- Lose original ACs (add new ones, comment out changed ones if needed)
- Ignore new functionality discovered during sync

## Example Session

**User:** /sync-tickets quick-create-exercise

**Assistant:** Let me analyze the implementation status...

*Reads stories.md and implementation.md*

**Sync Analysis for "quick-create-exercise":**

## Ticket 1: "Quick Create Exercise Modal"
**Status:** COMPLETE
Iterations 1, 2, 3 - All completed
**Deviations:** None detected

## Ticket 2: "Category Selection and Submission"
**Status:** COMPLETE with changes
Iterations 4, 5, 6, 7

**Changes detected:**
- Iteration 5 adjusted: Used shared `FormExerciseInstructions` instead of creating new component
- Iteration 7 skipped: Validation was handled in Iteration 6

**Suggested AC updates:**
- Original: "User sees fields for name, instructions, and category"
- Updated: "User sees fields for name, category, and rich text instructions editor"

---

How would you like to proceed?
1. Auto-update with suggested changes
2. Review each change individually
3. Scan actual code for more accurate ACs

**User:** 1

**Assistant:** Updating stories.md...

*Updates the file*

Updated: `planning/quick-create-exercise/stories.md`

Summary:
- 2 tickets synced
- 1 ticket unchanged (Ticket 1)
- 1 ticket updated (Ticket 2)
  - Modified 2 acceptance criteria
  - Added implementation notes about shared component usage

Backup saved to: `stories.md.backup`
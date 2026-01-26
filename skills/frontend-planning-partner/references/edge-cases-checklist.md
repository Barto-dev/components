# Edge Cases Checklist

Comprehensive edge cases to consider when planning frontend features, organized by feature type.

## Table of Contents
- [General (All Features)](#general-all-features)
- [Forms & Input](#forms--input)
- [Calendar & Date/Time Features](#calendar--datetime-features)
- [Real-Time Features](#real-time-features)
- [Data Visualization](#data-visualization)
- [File Uploads](#file-uploads)
- [Lists & Tables](#lists--tables)
- [Navigation & Routing](#navigation--routing)

---

## General (All Features)

**Data States:**
- Empty state (no data available)
- Loading state (data being fetched)
- Error state (fetch failed)
- Partial data (some fields missing)
- Stale data (outdated but displayed)

**API & Network:**
- Network timeout
- API returns 4xx/5xx errors
- API returns unexpected data shape
- Concurrent API requests (race conditions)
- API changes while component is mounted
- Retry logic and exponential backoff

**User Actions:**
- Rapid clicking (debouncing/throttling needed)
- Concurrent user actions
- User navigates away before action completes
- User refreshes page mid-action
- Multiple tabs open simultaneously

**Performance:**
- Very large datasets (pagination/virtualization)
- Slow devices/networks
- Memory leaks
- Re-render optimization

**Accessibility:**
- Keyboard navigation
- Screen reader compatibility
- Focus management
- Color contrast
- ARIA labels and roles

---

## Forms & Input

**Validation:**
- Client-side vs server-side validation conflicts
- Async validation (checking username availability, etc.)
- Field dependencies (conditional validation)
- Validation timing (onChange vs onBlur vs onSubmit)
- Error message display and clearing

**User Interaction:**
- Unsaved changes warning (beforeunload)
- Auto-save vs manual save
- Form reset behavior
- Disabled state during submission
- Double submission prevention
- Copy/paste with formatting
- Autocomplete interference

**Data Handling:**
- Very long text input (textarea limits)
- Special characters in input
- XSS prevention
- Sanitization before submission
- File size limits (if applicable)
- Max length enforcement

**Multi-Step Forms:**
- Navigation between steps with validation
- Progress preservation
- Back button behavior
- Step dependencies
- Partial form submission
- URL state synchronization

---

## Calendar & Date/Time Features

**Date Handling:**
- Timezone conversions
- Daylight saving time transitions
- Date formatting localization
- Invalid date inputs
- Leap years
- Month boundary edge cases (e.g., Jan 31 + 1 month)

**Recurring Events:**
- Infinite recurrence vs end date
- Exception dates (skip specific occurrences)
- Recurrence pattern conflicts with calendar boundaries
- Editing single occurrence vs all occurrences
- Deleting recurring events
- Maximum number of generated instances
- Timezone for recurring events

**UI/UX:**
- Past dates selection (allow/disallow)
- Date range validation (start must be before end)
- Min/max date constraints
- Disabled dates
- Multi-calendar scenarios (different timezones)
- Week start day (Sunday vs Monday)

**Edge Cases:**
- Event spanning multiple days
- All-day events
- Events at midnight (timezone handling)
- Very long date ranges (performance)

---

## Real-Time Features

**Connection Management:**
- Initial connection failure
- Connection drops mid-session
- Reconnection logic with exponential backoff
- Connection state display to user
- Heartbeat/ping-pong for connection health

**Data Synchronization:**
- Message ordering (out-of-order delivery)
- Duplicate messages
- Message loss
- Conflict resolution (concurrent edits)
- Offline queue and sync when reconnected
- Optimistic updates vs server confirmation

**Performance:**
- High-frequency updates (throttling)
- Large payload handling
- Memory management (cleaning old messages)
- Scroll position maintenance during updates

**User Experience:**
- Typing indicators
- "User X is online" status
- Notification management (don't spam)
- Unread counts
- Message delivery status (sent, delivered, read)

---

## Data Visualization

**Data Handling:**
- Empty dataset (no data to visualize)
- Single data point
- Very large datasets (10k+ points)
- Data with null/undefined values
- Extreme outliers affecting scale
- Data updates while chart is visible

**Rendering:**
- Responsive sizing (container changes)
- Print/export functionality
- Dark mode support
- Tooltip overflow (edges of screen)
- Legend overflow
- Label collisions

**Interaction:**
- Hover states on small targets
- Click handlers on dense visualizations
- Zoom and pan boundaries
- Filter/drill-down state management
- Animation performance

**Accessibility:**
- Alt text for charts
- Keyboard navigation through data points
- Screen reader descriptions
- Color blindness considerations
- Sufficient contrast ratios

---

## File Uploads

**Validation:**
- File type validation (MIME type vs extension)
- File size limits (client and server)
- Multiple file selection
- Duplicate file detection
- Malicious file detection

**Upload Process:**
- Upload progress tracking
- Pause/resume/cancel upload
- Network interruption during upload
- Upload failure and retry
- Chunked upload for large files
- Concurrent upload limits

**User Experience:**
- Preview before upload (images, PDFs)
- Drag-and-drop zone
- Paste from clipboard
- File name sanitization
- Upload queue management
- Error messaging

**Post-Upload:**
- Processing time (virus scan, compression)
- File access permissions
- File deletion
- Storage quota limits

---

## Lists & Tables

**Data Loading:**
- Pagination (page size, total count)
- Infinite scroll (end detection, loading more)
- Virtual scrolling (large lists)
- Sort order preservation
- Filter state preservation
- Search debouncing

**Selection:**
- Single vs multi-select
- Select all (current page vs all pages)
- Selection preservation during filter/sort
- Bulk actions on selected items
- Selection limits

**Editing:**
- Inline editing (save/cancel)
- Concurrent edits by multiple users
- Validation in table cells
- Row reordering (drag-and-drop)
- Add/delete rows

**Display:**
- Column resizing
- Column reordering
- Column visibility toggle
- Sticky headers
- Row grouping/expansion
- Mobile responsive layout (card view)
- Empty state when filtered

---

## Navigation & Routing

**Route Changes:**
- Unsaved changes warning before navigation
- URL state synchronization
- Deep linking (restore state from URL)
- Invalid routes (404 handling)
- Protected routes (authentication)

**History Management:**
- Browser back/forward buttons
- Programmatic navigation
- Scroll position restoration
- Modal/drawer close on back button

**State Preservation:**
- Tab state (which tab is active)
- Filter/search state in URL
- Scroll position in lists
- Form state across navigation

**Edge Cases:**
- Refreshing on a dynamic route
- Sharing URLs with state
- Redirect loops
- Permission changes mid-session

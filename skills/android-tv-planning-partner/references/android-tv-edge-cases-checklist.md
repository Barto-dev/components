# Android TV Edge Cases Checklist

Comprehensive edge cases to consider when planning Android TV features, organized by feature type.

## Table of Contents
- [General (All Features)](#general-all-features)
- [Video Playback](#video-playback)
- [Content Browsing & Lists](#content-browsing--lists)
- [D-Pad Navigation & Focus](#d-pad-navigation--focus)
- [API Integration & Networking](#api-integration--networking)
- [Memory & Performance](#memory--performance)
- [Activity & Fragment Lifecycle](#activity--fragment-lifecycle)
- [Authentication & User State](#authentication--user-state)
- [Leanback Library Specifics](#leanback-library-specifics)

---

## General (All Features)

**Device Variability:**
- Low-end Android TV devices (limited RAM/CPU)
- High-end devices (4K, HDR support)
- Different Android TV API levels (21+)
- Different manufacturers (Sony, Nvidia Shield, Mi Box, etc.)
- Screen resolution differences (720p, 1080p, 4K)
- Different remote types (basic D-pad, voice remote, game controller)

**Network Conditions:**
- No network connection at launch
- Network loss during operation
- Slow/unstable network (high latency)
- Network switch (WiFi to Ethernet)
- Timeout handling and retry logic
- Airplane mode activation

**Data States:**
- Empty state (no content available)
- Loading state (data being fetched)
- Error state (fetch failed)
- Partial data (some fields missing/null)
- Stale data (cached but outdated)
- Pagination loading states

**User Actions:**
- Rapid button pressing (need debouncing)
- Back button spam
- Navigation during loading
- Exiting app mid-operation
- Home button press
- Voice search activation

**Configuration Changes:**
- Screen orientation (though rare on TV)
- Language/locale changes
- Theme changes (light/dark mode)
- Display size changes
- Night mode activation

---

## Video Playback

**Content Loading:**
- Invalid video URL
- Video format not supported
- DRM/Widevine issues
- Manifest parsing errors (HLS, DASH, Smooth Streaming)
- Subtitle/caption file errors
- Audio track availability
- Network issues during initial buffering

**Playback States:**
- Buffering during playback
- Network interruption mid-playback
- Seek to unbuffered position
- Playback on low-end devices (frame drops)
- Audio/video sync issues
- Bitrate adaptation (quality switching)
- HDR content on non-HDR displays

**ExoPlayer Specific:**
- Player initialization failures
- Surface rendering issues
- Codec availability on device
- Audio focus management
- Background audio continuation
- Player release and cleanup

**User Controls:**
- Seek during buffering
- Rapid seek operations
- Play/pause spam
- Fast forward/rewind (trick play)
- Speed playback (1.5x, 2x)
- Audio/subtitle track switching
- Picture-in-Picture activation

**Video Player Edge Cases:**
- Very long videos (>2 hours)
- Live streams with no duration
- 360° video handling
- Multiple audio tracks
- Multiple subtitle tracks
- Closed captions styling
- Adaptive streaming quality changes

**PlaybackFragment (Leanback):**
- Custom action handling
- Progress bar updates
- Thumbnail preview generation
- Related content display
- Background video continuation
- Playback controls timeout

**Error Recovery:**
- Automatic retry on playback failure
- Fallback to lower quality
- Resume from last position
- Error message display in PlaybackFragment
- Return to details/browse on error
- DRM license renewal

---

## Content Browsing & Lists

**RecyclerView / Leanback Lists:**
- Empty content list
- Single item in list
- Very large datasets (1000+ items)
- Dynamic content updates (add/remove items)
- Item focus during data refresh
- Smooth scrolling performance
- ViewHolder recycling issues

**BrowseSupportFragment:**
- Category row headers
- Multiple row types
- Row selection changes
- Empty categories/rows
- Dynamic row addition/removal
- Row focus preservation
- Headers dock behavior

**Data Loading:**
- Lazy loading / pagination
- Next page load failure
- Duplicate items in pagination
- Content refresh while user browsing
- Cache invalidation
- Pre-loading next items
- Infinite scroll implementation

**Item Rendering:**
- Missing or broken images
- Image aspect ratio inconsistencies
- Very long text titles (truncation)
- Special characters in metadata
- Missing metadata fields
- Placeholder images during load
- Card focus scaling animations

**Focus & Navigation:**
- Focus on deleted item
- Navigation while loading more content
- Jump to item not yet loaded
- Grid/list boundary handling
- Focus persistence on back navigation
- Side menu focus management
- Search bar focus

**Presenters (Leanback):**
- Custom presenter implementation
- ViewHolder binding errors
- Image loading in presenters
- Focus state handling
- Click listeners
- Long click handling

---

## D-Pad Navigation & Focus

**Basic Navigation:**
- D-pad directional navigation (up/down/left/right)
- OK/Select button handling
- Back button behavior
- Menu button context actions
- Home button (exits app)
- Fast scrolling with D-pad hold

**Focus Management:**
- Initial focus on screen load
- Focus indicator visibility and styling
- Focus trap in complex layouts
- Focus restoration after dialog/overlay close
- Custom focus order (nextFocusUp/Down/Left/Right)
- Focus with keyboard input (rare, but possible)

**Complex Layouts:**
- Focus between RecyclerView and other views
- Focus in GridLayoutManager
- Focus across multiple fragments
- Focus in nested RecyclerViews
- Focus with ViewPager
- Focus in modal dialogs

**Leanback Focus:**
- GuidedStepFragment focus flow
- BrowseSupportFragment side menu focus
- DetailsSupportFragment action button focus
- SearchFragment focus management
- Focus across browse rows

**Edge Cases:**
- Focus on invisible/gone views
- Focus during view animations
- Focus with dynamically added views
- Focus after configuration change
- Focus with soft keyboard (voice input)
- Gamepad vs D-pad focus differences

---

## API Integration & Networking

**Request Handling:**
- API endpoint unavailable (404, 500)
- Request timeout (slow network)
- Malformed response JSON/XML
- Unexpected response structure
- Empty response body
- Very large response payload (OOM risk)
- SSL/TLS certificate errors

**Retrofit / OkHttp:**
- Network interceptor issues
- Request/response logging
- Authentication token injection
- Timeout configuration
- Retry logic implementation
- Certificate pinning

**Coroutines & Flow:**
- Cancellation of in-flight requests
- Exception handling in coroutines
- Flow collection cancellation
- Proper dispatcher usage (IO, Main)
- Structured concurrency
- ViewModel scope vs lifecycle scope

**Authentication:**
- Token expiration mid-session
- 401 unauthorized response
- Token refresh logic (refresh token)
- Login required redirect
- Session timeout
- Re-authentication flow
- OAuth flow on TV (device code flow)

**Error Handling:**
- Network error vs server error distinction
- Retry logic with exponential backoff
- Maximum retry attempts
- Partial failure (batch requests)
- User-friendly error messages
- Fallback to cached data

**Data Caching:**
- Room database caching strategy
- Cache invalidation rules
- DataStore for preferences
- Stale-while-revalidate pattern
- Cache versioning
- Cache size limits
- Clear cache functionality

---

## Memory & Performance

**Memory Management:**
- Bitmap memory management
- Image loading optimization (Coil, Glide)
- Large list memory usage
- Memory leaks (ViewModels, listeners)
- Context leaks in background work
- Proper resource cleanup

**Performance Optimization:**
- RecyclerView rendering performance
- ViewHolder pattern optimization
- Image decoding performance
- Lazy initialization of heavy objects
- Background thread usage (Coroutines)
- Database query optimization (Room)

**Low-End Devices:**
- Reduced image quality
- Fewer simultaneous network requests
- Simplified animations
- Limited cache sizes
- Graceful degradation of features
- Performance profiling

**Memory Leaks:**
- Unregistered callbacks/listeners
- LiveData/Flow not cancelled
- Static context references
- Inner class references
- Bitmap not recycled
- Cursor not closed

**Image Loading:**
- Coil/Glide configuration
- Image size optimization
- Placeholder and error images
- Disk cache size limits
- Memory cache configuration
- Image format (WebP, JPEG, PNG)

---

## Activity & Fragment Lifecycle

**Activity Lifecycle:**
- onCreate initialization
- onStart / onResume navigation
- onPause / onStop cleanup
- onDestroy resource release
- Configuration changes (recreate)
- Process death and restoration

**Fragment Lifecycle:**
- Fragment transaction issues
- Fragment back stack management
- Fragment arguments passing
- Nested fragments
- Fragment retained instance
- Fragment result API

**ViewModel:**
- ViewModel initialization
- ViewModel scope (Activity vs Fragment)
- SavedStateHandle for state preservation
- ViewModel cleanup (onCleared)
- Shared ViewModel between fragments
- ViewModel factory setup

**Lifecycle-Aware Components:**
- LiveData observation
- Flow collection with lifecycle
- Lifecycle observer registration
- Proper unregistration/cancellation
- repeatOnLifecycle usage

**Background Work:**
- WorkManager for deferrable tasks
- Foreground service for long-running work
- Service lifecycle management
- Background execution limits (API 26+)
- Doze mode and app standby

**State Preservation:**
- onSaveInstanceState usage
- Saved state registry
- ViewModel + SavedStateHandle
- Parcelable data classes
- Configuration change handling

---

## Authentication & User State

**Login Flow:**
- Invalid credentials
- Network error during login
- Token storage (EncryptedSharedPreferences)
- Biometric authentication (optional)
- Auto-login on app launch
- Remember me functionality

**Session Management:**
- Access token expiration
- Refresh token logic
- Logout functionality
- Session timeout
- Concurrent session handling
- Device limit enforcement

**OAuth / Device Code Flow:**
- Device code generation
- User authentication on another device
- Polling for authorization
- Timeout during authentication
- QR code display for easy pairing

**User Profiles:**
- Multi-profile support (Android user profiles)
- Profile switching
- Profile-specific preferences
- Profile data synchronization
- Guest/anonymous mode

**Authorization:**
- Feature access by subscription tier
- Content access restrictions
- Parental controls
- Geographic restrictions (geo-blocking)
- Device authorization limits

**Persistent State:**
- Encrypted preferences (DataStore)
- User settings persistence
- Watch history / resume points
- Favorites / bookmarks
- Download queue state
- Settings migration on app update

---

## Leanback Library Specifics

**BrowseSupportFragment:**
- Multiple row setup
- Header/row focus behavior
- Side menu configuration
- Brand color customization
- Headless mode (no headers)
- Dynamic row updates

**DetailsSupportFragment:**
- Overview row setup
- Action buttons configuration
- Related content rows
- Background image parallax
- Custom actions handling
- Transition from browse to details

**VerticalGridSupportFragment:**
- Grid column configuration
- Item spacing
- Load more items
- Focus handling in grid
- Empty state display

**SearchSupportFragment:**
- Search query handling
- Search result updates
- Voice search integration
- Search suggestions
- Delayed search (debouncing)
- Empty search results

**GuidedStepFragment:**
- Multi-step wizard flows
- Custom actions/buttons
- Input validation
- Back navigation between steps
- Step completion tracking
- Finish action handling

**Presenters:**
- Custom presenter implementation
- ViewHolder recycling
- Image loading in presenters
- Focus drawable customization
- Item click handling
- Item selection state

**ArrayObjectAdapter:**
- Adapter setup with presenter
- Dynamic item addition/removal
- Adapter data updates
- DiffUtil for efficient updates
- Multiple item types

---

## Additional Considerations

**Deep Linking:**
- Deep link intent handling
- Navigation to specific content
- Invalid deep link params
- Authentication required for deep link
- Deep link from voice search
- App link verification

**Voice Search:**
- Voice input integration
- Search results from voice
- Direct content launch from voice
- Voice command handling
- Speech recognition errors

**Recommendations:**
- Home screen recommendations API
- Recommendation card creation
- Recommendation updates
- Notification channels for recommendations
- Recommendation images

**Picture-in-Picture:**
- PiP mode activation
- PiP window size
- Custom PiP actions
- PiP during navigation
- PiP aspect ratio
- Exit PiP handling

**Localization:**
- Multiple language support
- RTL layout support (Arabic, Hebrew)
- Date/time formatting
- Currency formatting
- String length variations affecting layout
- Plurals and quantities

**Accessibility:**
- TalkBack support
- Focus order for screen readers
- Content descriptions
- Proper heading structure
- Announcement strings
- High contrast mode

**Analytics & Telemetry:**
- Event tracking (Firebase, custom)
- Screen view tracking
- User interaction tracking
- Error logging and crash reporting
- Performance metrics (startup time, frame rate)
- Network request monitoring

**Testing:**
- Unit tests for ViewModels
- Integration tests for Repository
- UI tests with Espresso
- Leanback component testing
- Navigation testing
- Mock API responses

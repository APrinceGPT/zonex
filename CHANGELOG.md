# Changelog

All notable changes to **Zonex** are documented here.  
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.4.1] — 2026-05-16

### Fixed
- **All linter warnings resolved** in `popup.html` and `css/styles.css` (8 total):
  - Removed 7× inline `style="display:none;"` attributes from `popup.html`; defaults moved to CSS ID rules (`#resultSection`, `#settingsModal`, `#fromTimezoneSearch`, `#toTimezoneSearch`, `#tab-worldclock`, `#tab-planner`, `#importFile`). JS `element.style.display` assignments continue to work — inline styles set by JS still override CSS rules.
  - Restored `<meta name="viewport" content="width=device-width, initial-scale=1.0">`. Safe to revert because `body { width: 480px }` is now hard-coded in pixels (not a CSS variable that could be poisoned).
  - Added `-webkit-backdrop-filter` prefix to `.modal` for Safari 9+ support.
  - Added `-webkit-user-select` prefix to `.skeleton` for Safari 3+ support.

---

## [1.4.0] — 2026-05-16

### Fixed
- **Global CSS variable poisoning** — the `@media (max-width: 380px)` block was overriding `--popup-w: 100%` on every popup open, because Chrome renders extension popups from a near-zero-width shell before layout is applied. This silently made all width-related CSS resolve to `100%` of a tiny viewport, so no width changes ever had a visual effect.
- **`body` width now hard-coded in pixels** — replaced `min-width: var(--popup-w)` with `width: 480px` so no media query or CSS variable can override the popup's base width.
- **Viewport meta fixed** — changed `width=device-width` to `width=480`; `device-width` in an extension popup told Chrome to size the viewport from the device screen rather than from the body, competing with our explicit width declaration.
- **Responsive breakpoint removed** — deleted the `@media (max-width: 380px)` block entirely; extension popups have a fixed size and do not benefit from sub-400 px responsive rules.

### Changed
- Popup width increased **460 px → 480 px** for more breathing room.
- Horizontal padding increased **22 px → 24 px** proportionally.
- `white-space: nowrap` added to `.tab-btn` so "World Clock" can never wrap onto a second line.

---

## [1.3.1] — 2026-05-15

### Fixed
- **Only scrollbars visible** — three compounding CSS bugs:
  1. `body` had no `min-width`; the 460 px container overflowed the popup shell invisibly.
  2. `.container` used `overflow: hidden` + `display: flex` with only `min-height` — all content beyond the visible strip was clipped.
  3. `.main-content` had `flex: 1; overflow-y: auto` without a bounded parent height, so scroll never triggered and content was hidden by the parent's `overflow: hidden`.
- Removed orphaned `flex-shrink: 0` from `.header` and `.tab-nav`.

---

## [1.3.0] — 2026-05-15

### Fixed
- **Time display wrapping** — `white-space: nowrap` on `.header-time` prevents "3:22 AM" splitting across lines.
- **Popup too narrow / compacted** — container widened 380 px → 460 px.

### Changed
- **Tab-based navigation** — Convert / World Clock / Planner tabs replace the single long-scrolling column.
- **Header redesigned** — live clock and timezone inline in a 3-column grid (logo | clock | settings), removing the standalone timezone card.
- **From/To timezone selects side-by-side** — single `.timezone-row` with icon-only swap button.
- **Result card horizontal** — From → To cards side-by-side with animated arrow.
- **Quick Convert** — 4-column grid with flag emoji and city labels.
- **FAB removed** — replaced by Planner tab.
- **CSS Design System v1.3** — `--popup-w`, tighter padding tokens, updated shadow/surface hierarchy.
- `updateCurrentTimezone()` formats compact "City · GMT+X" header label.

### Added
- `switchTab(tabName)` in `ZonexApp`.
- `tabIconPop`, `panelFadeIn`, `arrowPulse`, `clockItemIn` keyframe animations.
- Custom scrollbar on `.main-content`.
- Sticky modal header.

---

## [1.2.0] — 2026-05-08

### Fixed
- Corrupted `<title>` tag — body content injected into `<head>`.
- Structural HTML — FAB, meeting planner, and modal placed outside `</main>`.
- Modal ESC handler checked `display === 'block'`; corrected to `display === 'flex'`.
- Notification slide-out replaced with CSS exit animation.

### Added
- Dark mode (`[data-theme="dark"]`) with Settings toggle; persisted to `localStorage`.
- Full CSS Design Token system — all colors, radii, shadows, gradients in `:root`.
- Swap button with spring rotation hover.
- Ripple + icon spin on Convert button.
- Modal, result, world-clock, FAB animations.
- `prefers-reduced-motion` support.
- Skeleton loader (`.skeleton` + shimmer).
- Focus management on modal open/close.
- ARIA labels, roles, `aria-labelledby`, `aria-hidden` throughout.

---

## [1.1.0] — prior release

### Added
- World clock, meeting planner, quick convert city buttons.
- DST detection and info display.
- Export / Import settings as JSON.

---

## [1.0.0] — initial release

### Added
- Core timezone conversion with 50+ zones across 4 regions.
- 12 h / 24 h format toggle with persistent preference.
- Default timezone GMT+8 (Asia/Manila).
- Settings persistence via `chrome.storage.sync`.
- Accessibility: focus states, keyboard navigation.


### Fixed
- **Critical rendering bug — only scrollbars visible** — Three compounding CSS bugs caused the extension popup to render as a blank view with only scrollbars:
  1. `body` had no `min-width` set. Chrome extension popups size to the body, not to child elements. Without `body { min-width: 460px }` the popup window defaulted to a very narrow width; the 460 px container overflowed the popup invisibly.
  2. `.container` used `overflow: hidden` + `display: flex; flex-direction: column` with only `min-height` (not a fixed `height`). The `overflow: hidden` clipped all content that grew beyond the visible popup area.
  3. `.main-content` used `flex: 1; overflow-y: auto` — but `overflow-y: auto` on a flex child only scrolls when the parent has a **fixed** height. With the parent having only `min-height`, the scroll never triggered and content was simply clipped by the parent's `overflow: hidden`.
- **Removed `flex-shrink: 0`** from `.header` and `.tab-nav` — these properties were residuals from when `.container` was a flex parent; they are no-ops outside a flex container.

---

## [1.3.0] — 2026-05-15

### Fixed
- **Time display wrapping** — `white-space: nowrap` added to `.header-time` so "3:22 AM" can never split onto two lines regardless of browser locale or font rendering.
- **Popup too narrow / compacted** — container widened from 380 px → 460 px, giving every element room to breathe.

### Changed
- **Tab-based navigation** — three focused tabs (Convert / World Clock / Planner) replace the single long-scrolling column. Each tab shows only its own content, eliminating the need to scroll through unrelated sections.
- **Header redesigned** — the large standalone "Current Timezone" card is removed. Live clock and timezone are now shown inline in the header (3-column grid: logo | clock | settings), saving ~130 px of vertical space.
- **From/To timezone selects are now side-by-side** — a compact `.timezone-row` layout with the swap button between them as an icon-only control, reducing 2 stacked form rows to a single row.
- **Swap button** — simplified to icon-only (↕) with a 90° rotation hover animation, matching the compact timezone-row.
- **Result card** — changed from vertical (stacked) to horizontal (From → To side by side) with a right-pointing animated arrow, making conversions immediately scannable.
- **Quick Convert** — 4 city buttons now laid out in a single 4-column grid row with country flag emoji and compact uppercase city labels.
- **World Clock and Planner** — moved to dedicated tabs with a `.panel-topbar` header (title + Add Clock button).
- **FAB removed** — replaced by the Planner tab button; the fixed-position FAB conflicted with the tab layout.
- **CSS Design System updated** — new `--popup-w: 460px`, tighter `--pad-x / --pad-y` tokens, updated shadow scale, all background/border/text tokens revised for new surface hierarchy.
- **`updateCurrentTimezone()`** — now formats a compact "City · GMT+X" string for the header instead of the full label.
- `populateTimezones()` placeholder text shortened to "Select timezone…".

### Added
- `switchTab(tabName)` method in `ZonexApp` — manages `aria-selected` and panel visibility.
- Tab icon pop animation (`tabIconPop` keyframe) on active tab.
- Panel fade-in animation (`panelFadeIn`) when switching tabs.
- Arrow pulse animation (`arrowPulse`) on the horizontal result arrow.
- Clock item stagger entrance (`clockItemIn`) with per-child delays.
- Custom scrollbar styling on `.main-content` (thin, subtle).
- Modal header made `position: sticky` so the title/close button stays visible when scrolling long settings.

---

## [1.2.0] — 2026-05-08

### Fixed
- Corrupted `<title>` tag — content from `<body>` had been accidentally injected into `<head>`.
- Structural HTML error — FAB, meeting planner, and modal were outside `</main>`.
- Modal ESC-key handler checked `display === 'block'`; corrected to `display === 'flex'`.
- Notification slide-out replaced with CSS `notification-exit` animation class.
- Bare `<i class="fas fa-search">` replaced with accessible `<button class="search-icon-btn">`.

### Added
- Dark mode (`[data-theme="dark"]`) with toggle in Settings; persisted to `localStorage`.
- CSS Design Tokens — all colors, shadows, radii, gradients in `:root` custom properties.
- Swap button with spring rotation hover.
- Ripple effect + icon spin on Convert button.
- Modal scale-in animation (`modalSlideIn`).
- Result section slide-in animation (`resultSlideIn`).
- World clock stagger animation.
- FAB pulse ring.
- `prefers-reduced-motion` support.
- Skeleton loader CSS (`.skeleton` + shimmer).
- Focus management on modal open/close.
- All icon-only buttons given `aria-label`; decorative icons `aria-hidden`.
- `<section>` landmarks with `aria-label`; modal `role="dialog"` + `aria-labelledby`.

---

## [1.1.0] — prior release

### Added
- World clock, meeting planner, quick convert city buttons.
- DST detection and info display.
- Export / Import settings as JSON.
- `chrome.storage.sync` persistence.
- Keyboard shortcut `Ctrl+Shift+Z`.

---

## [1.0.0] — initial release

### Added
- Core timezone conversion, 12h/24h toggle, settings modal, basic world clock, Inter font, Font Awesome, Manifest V3.

### Fixed
- **Critical:** Corrupted `<title>` tag — content from `<body>` had been accidentally injected into the `<head>`, causing the browser to misparse the entire HTML document.
- **Critical:** Structural HTML error — `<div class="fab-container">`, meeting planner, and the settings modal were outside `</main>` but rendered as siblings inside `.container` with inconsistent depth.
- Modal ESC-key handler checked `display === 'block'`; corrected to `display === 'flex'` to match new modal layout.
- Notification slide-out was driven by an inline `transform` style; replaced with CSS `notification-exit` animation class for consistent motion.
- Bare `<i class="fas fa-search">` was used as a click target (not keyboard-accessible); replaced with `<button class="search-icon-btn">` with proper `aria-label`.

### Added
- **Dark mode** — full CSS token system (`[data-theme="dark"]`) with toggle in Settings; preference persisted to `localStorage`.
- **CSS Design Tokens** — all colors, shadows, radii, gradients, and motion durations are now CSS custom properties under `:root`, eliminating ~30 duplicated hard-coded values.
- **Swap button** — swaps source and destination timezones and re-runs conversion immediately.
- **Ripple effect** on the Convert button for tactile feedback.
- **Convert icon spin** (`spinOnce` keyframe) fires on each conversion click.
- **Modal scale-in animation** (`modalSlideIn`) — modal appears with a spring-eased scale + fade instead of instantly.
- **Result section slide-in animation** (`resultSlideIn`) — result card enters with a spring scale, replaying on each new conversion.
- **Stagger animation** for world clock list items (each child offset by 60 ms).
- **Bouncing arrow** animation between original and converted result cards.
- **FAB pulse ring** — ambient pulse halo on the floating action button.
- **Settings cog close-btn** rotate-on-hover animation (matches settings-btn gear spin).
- **Skeleton loader CSS** (`.skeleton` + shimmer keyframe) ready for async data states.
- `prefers-reduced-motion` media query — disables all animations for users who prefer reduced motion (WCAG 2.1 §2.3.3).
- Time preset buttons now trigger conversion immediately if a destination timezone is selected.
- Meeting planner FAB toggle correctly bound with `aria-expanded` state updates.
- Focus is moved into the settings modal on open, and returned to the settings button on close (keyboard accessibility).

### Changed
- `modal` now uses `display: flex` with `align-items/justify-content: center` instead of `position: absolute + transform: translate(-50%, -50%)` for more robust centring.
- All icon-only buttons now carry `aria-label` and all decorative `<i>` elements have `aria-hidden="true"`.
- All interactive `<section>` elements have `aria-label` for landmark navigation.
- `<h3>Settings</h3>` promoted to `<h2>` with `id="settingsModalTitle"` referenced by `aria-labelledby` on the dialog.
- Checkbox settings replaced with custom toggle-switch components (accessible, `role="switch"`).
- `transition: all` replaced with specific property transitions throughout for better rendering performance.
- Fixed `width: 380px` on `.container` kept but `min-height` retained; single `@media (max-width: 400px)` breakpoint maintained.
- Notification toast now uses CSS animation class instead of inline `style.transform`.

---

## [1.1.0] — prior release

### Added
- World clock section with add/remove clocks.
- Meeting planner with optimal time slots.
- Quick convert city buttons (New York, London, Tokyo, Sydney).
- DST detection and information display.
- Export / Import settings as JSON.
- `chrome.storage.sync` persistence.
- Keyboard shortcut `Ctrl+Shift+Z` / `Cmd+Shift+Z`.

---

## [1.0.0] — initial release

### Added
- Core timezone conversion (from → to).
- 12 h / 24 h format toggle.
- Settings modal with default timezone and format preferences.
- Basic world clock.
- Inter typeface + Font Awesome icons.
- Manifest V3 with `storage`, `activeTab`, `contextMenus`, `notifications` permissions.

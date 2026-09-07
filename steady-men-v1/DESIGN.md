# Steady Men Reading-First Redesign

## Direction
The daily passage leads, with its Bible App action immediately available. White space, ink, forest green, quiet gold, and book-like serif reading typography create a grounded experience without a promotional hero or dashboard.

## Shared system
- Colors: white canvas, ink #182b35, green #24483c, deep green #142922, gold #806020, pale green #f1f5f1, muted text #58675f.
- Typography: local Segoe UI/system sans for controls and dates; Georgia/serif for reading references, notes, and principal headings. No remote font requests.
- Layout: 1152px maximum content width, open full-width sections, thin borders, restrained 4px control corners.
- Controls: primary Bible action first; share actions second. Touch controls are at least 44px high. Visible keyboard focus and reduced-motion support are required.
- Mobile: bottom navigation for Today, Reading Plan, and Study Nights; More menu for secondary destinations. Reading rows stack with notes and actions intact.
- Completion is date-based only: subdued surfaces and textual status, never personal tracking or achievements.
- Icons: locally hosted Lucide icons with their license in assets/icons; no external runtime dependency.

## Logo integration
The approved assets/steady-men-crest.png is unchanged. It anchors the masthead, About area, footer, and error page. Existing alternative brand files remain intact; no new mark or wordmark was generated.

## Before and after
The former introductory/card-heavy presentation becomes a daily reader: passage, Bible action, sharing, and note come first. Previous/next reading controls and linked plan dates support catching up without changing what counts as today. The week selector shortens navigation through the long plan. Study Nights and resources use simple readable rows, and the existing purpose and participation wording has a dedicated About section.

## Preserved
The Fall data file and downloadable DOCX are byte-for-byte unchanged from the production base. All 76 dates, 66 assigned readings, 10 Open Sundays, notes, themes, seven gatherings, four optional overviews, Bible links, both copied-message formats, Leading at Home, and blank WhatsApp URL remain intact. General optional videos stay hidden.

## Technical improvements
One stylesheet replaces competing base/override styles. Semantic regions, native accordions, menu focus handling, accessible control names, a live clipboard status, and clipboard fallback are retained or improved. Invalid date previews are rejected. Toronto midnight refresh and browser-history navigation are covered. The service worker cache is versioned, only successful resources are cached, and unknown paths cannot overwrite the offline homepage. A branded 404 is available online and offline.

## Verification
- Built-in Node tests cover the full schedule, exact link strings, copy formats, gatherings, real calendar previews, Toronto daylight saving boundaries, and downloads.
- Playwright in Microsoft Edge checked nine widths from 320px to 1440px with every plan week expanded: no horizontal clipping.
- Both real clipboard buttons were checked on the homepage and plan for seven dates, including study nights, overview days, and the Luke 23 CSB exception.
- Previous/next, Today, linked dates, browser Back, week selection, navigation bounds, keyboard menu/accordion use, and copy failure/fallback were exercised.
- Pre-start, today, past/future, Open Sundays, final reading, wrap-up, and automatic Toronto midnight rollover were checked.
- Automated axe WCAG A/AA checks at 375px and 1440px reported no violations.
- Downloaded guide matched the source bytes; PWA offline homepage and 404 checks passed; no application console errors.
- No build, lint, or typecheck tooling exists in this static repository; JavaScript syntax checks and Node tests are the available project checks.

Automated accessibility checks do not replace a complete assistive-technology review. Physical iPhone/Android installation and YouVersion app handoff have not been tested; standard HTTPS Bible.com links are unchanged.

## Release and decisions
Review the feature-branch preview before merging. Production remains unchanged until approval. No content, theology, program, or branding decisions are required for this proposal, and no program changes are recommended as part of the redesign. Publishing will activate the new service-worker cache; the prior design remains recoverable through Git history.

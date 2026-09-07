# Steady Men Navy-and-Gold Refresh

## Direction
This second iteration follows Josh's clarified preference: refresh the existing darker website instead of replacing its identity. Keep the navy/gold contrast, recognizable crest, and single scrolling page. The passage and both copy actions must be immediately visible on a phone. The previous light/green proposal is retained in Git history, not used as the design direction.

## Shared system
- Colors: navy #172632, deeper sidebar #111e29, gold #dbb36d, accessible dark gold #815817 on light surfaces, white and cool light grey #f2f4f5.
- Typography: local Segoe UI/system sans with stronger, compact headings and readable notes. Georgia is reserved for the existing foundation quotation. No remote font requests.
- Layout: a 236px desktop sidebar (216px on smaller laptops), 1140px maximum inner content width, full-width contrasting sections, thin dividers, and 6px control corners.
- Controls: a compact gold Bible action and equally tappable outlined copy buttons. All actions are at least 44px high. Share controls sit side-by-side on phones and remain above the bottom navigation without scrolling.
- Mobile: bottom navigation for Today, Reading Plan, and Study Nights; More menu for secondary destinations. Reading rows stack with notes and actions intact.
- Completion is date-based only: subdued surfaces and textual status, never personal tracking or achievements.
- Icons: locally hosted Lucide icons with their license in assets/icons; no external runtime dependency.

## Logo integration
The approved assets/steady-men-crest.png is unchanged. It anchors the masthead, About area, footer, and error page. Existing alternative brand files remain intact; no new mark or wordmark was generated.

## Before and after
The familiar dark desktop sidebar returns. The opening section combines the session identity and daily reading in a tighter navy composition; gold actions, restrained dividers, and brighter type provide contrast. Unlike the live site's separate introductory banner and tall cards, the daily actions are immediately available. Unlike the first redesign, there is no oversized serif passage, sparse white opening, or understated text-only sharing action. Announcements sit below the daily actions on phones. The reading plan has dark expanded-week headers and light readable entries; all navigation still scrolls within one page.

Previous/next reading controls and linked plan dates support catching up without changing what counts as today. The week selector shortens navigation through the long plan. Study Nights and resources remain easy to scan, and existing purpose and participation wording stays in About.

## Preserved
The Fall data file and downloadable DOCX are byte-for-byte unchanged from the production base. All 76 dates, 66 assigned readings, 10 Open Sundays, notes, themes, seven gatherings, four optional overviews, Bible links, both copied-message formats, Leading at Home, and blank WhatsApp URL remain intact. General optional videos stay hidden.

## Technical improvements
One stylesheet replaces competing base/override styles. Semantic regions, native accordions, menu focus handling, accessible control names, a live clipboard status, and clipboard fallback are retained or improved. Invalid date previews are rejected. Toronto midnight refresh and browser-history navigation are covered. The service worker cache is versioned, only successful resources are cached, and unknown paths cannot overwrite the offline homepage. A branded 404 is available online and offline.

## Verification
- Built-in Node tests cover the full schedule, exact link strings, copy formats, gatherings, real calendar previews, Toronto daylight saving boundaries, and downloads.
- The committed mobile browser test checks all 66 assigned readings at 375x600px: passage, Bible action, and both copy buttons are visible, unobstructed, and fit their controls. It also checks 320x568, 390x664, and 430x740px phones, pre-start/final states, Open Sundays, and the responsive 404.
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

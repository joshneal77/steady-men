# Steady Men - Fall Session 2026

The active static website is `steady-men-v1/`. Rooted in the Word follows Luke + Acts from September 21 through December 5, 2026, with a wrap-up gathering on December 7. The final Fall guide is the content source of truth.

## Deployment

Keep this directory as the Vercel project root. There is no framework, package install, build step, or committed `vercel.json`. Make changes on a feature branch and use a pull request. Keep the approved `assets/steady-men-crest.png` branding.

## Content

Edit `js/study-data.js` for:

- `startDate` and `endDate`: the reading-plan date range.
- `READING_PLAN`: dates, exact Scripture references, Reading Notes, and book headings. Each assigned reading stays within one chapter. Sundays use `openDay: true` with no passage or copy buttons.
- `overview`: an optional `{ title, url }` on a reading. Only September 21, October 8, November 2, and November 17 have BibleProject overviews in this session.
- `studyNights`: all gathering dates, titles, times, locations, and notes. Reading-day reminders come from this same list. The December 7 gathering remains visible after the readings end.
- `studyPackageUrl`: the current guide download in `assets/`. A blank value makes the download unavailable; it does not fall back to an older guide.
- `whatsAppUrl`: keep blank while men are added individually.
- `showOptionalResources` and `optionalResources`: the general video area stays hidden and empty for Fall. This setting does not hide the four reading-specific BibleProject links. Do not add RightNow Media or a video curriculum.
- `brotherhoodReminders`: short connection reminders.

Update session headings, purpose wording, Leading at Home, and resource labels in `index.html`. Update the description in `manifest.webmanifest` when changing sessions. There is no assigned Fall memory passage in the source guide; Leading at Home uses Deuteronomy 6:5-9 as its optional reference.

## Links and sharing

`js/app.js` generates HTTPS Bible.com CSB links for Luke and Acts. Cross-chapter and combined readings are deliberately unsupported. `whatsappText` contains the date, passage, and link, plus an optional overview only when assigned. `readingLinkText` contains just the date, passage, and link. Both buttons retain clipboard feedback.

October 28 keeps the guide's `Luke 23:1-25` reference. Its optional `bibleUrl` field uses the verified same-chapter URL `https://www.bible.com/bible/1713/LUK.23.1-16,18-25.CSB`: Bible.com's continuous CSB range currently returns "No Available Verses." Keep this exception unless the continuous link has been rechecked successfully. Other reading links are generated normally.

## Verification

The reading-first visual system and redesign review notes are in [DESIGN.md](DESIGN.md). The redesign must be reviewed on its preview deployment before merging into production.

The previous/next controls and linked plan dates use `?day=YYYY-MM-DD` to browse a reading without changing today's completion status or the next gathering. The Today control returns to the actual Toronto date. `?preview=` simulates today for testing; the two parameters can be combined. The week selector opens one week, and Current week returns to the real/preview date.

From this directory:

```sh
node --check js/app.js
node --check js/study-data.js
node --check service-worker.js
node tests/site.test.cjs
git diff --check
```

There are no separate lint, typecheck, or build commands for this HTML/CSS/vanilla JavaScript site. The Node tests cover every plan date and link, both share formats, the overview schedule, gatherings, Toronto dates, and current resources.

Serve this directory locally for clipboard and PWA testing. Check desktop and mobile widths (including 320px and 375px), both copy buttons, completed-day links, the mobile menu, and the guide download. Use `?preview=YYYY-MM-DD` for date previews:

- `2026-09-20`: before launch.
- `2026-09-21`: opening reading, launch gathering, first overview.
- `2026-09-27`: Open Sunday.
- `2026-10-05` and `2026-10-06`: Tuesday Study Night 2, not Monday.
- `2026-10-08`, `2026-11-02`, `2026-11-17`: the other section overviews.
- `2026-12-05`: final reading.
- `2026-12-06` and `2026-12-07`: readings complete, wrap-up still upcoming/today.
- `2026-12-08`: gatherings complete.

The site uses America/Toronto time and refreshes daily content at the date change or when returning to the tab. Past entries remain readable and interactive. Increment the service-worker cache name when publishing content changes; core files use fresh network responses with an offline fallback.

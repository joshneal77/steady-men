# Steady Men v1

This folder is the active static website for the Steady Men Rooted in the Word daily reading hub.

## Deployment note
The site lives in `steady-men-v1/`. Do not move these files unless the Vercel project root has been checked first. This repository does not currently include a `vercel.json`, so the active deployment root may be set in Vercel project settings.

## What to edit
Most routine content changes happen in `js/study-data.js`.

- `startDate` and `endDate`: Rooted in the Word date range.
- `whatsAppUrl`: leave blank when men are being added to WhatsApp individually; add a group invite link only if the site should show one.
- `studyPackageUrl`: path or URL for the uploaded full guide file. If blank, the site uses `assets/steady-men-rooted-in-the-word-full-guide.docx.pdf`.
- `studyNights`: dates, titles, times, locations, and notes.
- `optionalResources`: optional video or support links shown under Resources.
- `brotherhoodReminders`: short rotating connection reminders.
- `READING_PLAN`: daily readings, themes, study night reminders, and short notes.

The page generates Bible.com / YouVersion CSB links in `js/app.js`. Simple readings use direct passage links, while multi-chapter or multi-passage readings use Bible.com search links with CSB selected. If future readings introduce a new Bible book, add its Bible.com code to `BIBLE_BOOK_CODES`. Do not paste large Bible passages directly into the site.

## Date previews
Use the `preview` query string to test a specific study day:

```text
?preview=2026-07-12
```

Useful checks:

- `?preview=2026-07-11` before the reading plan starts and intro night
- `?preview=2026-07-12` first reading day
- `?preview=2026-07-19` open Sunday
- `?preview=2026-07-24` first in-person Study Night
- `?preview=2026-08-21` Brotherhood & Accountability Study Night
- `?preview=2026-09-05` final reading day
- `?preview=2026-09-06` after the study ends

The automatic daily reading uses `America/Toronto` time for the Niagara, Ontario group.

## PWA files
- `manifest.webmanifest` controls the installable app name, colors, and icon.
- `service-worker.js` caches core files and prefers fresh network responses so updates are not stuck behind old cached pages.
- `assets/steady-men-crest.png` is the approved crest used for the page logo, favicon, Apple touch icon, and installable app icon.

## Logo assets
The approved crest-only logo is `assets/steady-men-crest.png`.

Use that file for compact logo placements such as the sidebar, mobile header, hero mark, footer, favicon, and app install icon. Do not restore the old temporary `assets/brand-mark.svg` or generated `icons/icon-192.png` / `icons/icon-512.png` files unless there is a clear replacement plan.

The full guide link should point to a real, non-empty file before launch. If the guide file is not ready, leave `studyPackageUrl` empty so the resource card can be marked unavailable.

# Steady Men v1

This folder is the active static website for the Steady Men Rooted in the Word daily reading hub.

## Deployment note
The site lives in `steady-men-v1/`. Do not move these files unless the Vercel project root has been checked first. This repository does not currently include a `vercel.json`, so the active deployment root may be set in Vercel project settings.

## What to edit
Most routine content changes happen in `js/study-data.js`.

- `startDate` and `endDate`: Rooted in the Word date range.
- `whatsAppUrl`: leave blank when men are being added to WhatsApp individually; add a group invite link only if the site should show one.
- `studyPackageUrl`: path or URL for the uploaded full guide file. If blank, the site uses `assets/steady-men-1613-summer-group.docx`.
- `showOptionalResources`: set to `false` to hide the optional video/resource section without deleting the links.
- `studyNights`: dates, titles, times, locations, and notes. Use `dateLabel: "Date TBD"` with a blank `date` when a gathering date is not set yet.
- `optionalResources`: optional video or support links shown under Resources.
- `brotherhoodReminders`: short rotating connection reminders.
- `READING_PLAN`: daily readings, themes, study night reminders, and short notes.

The page generates Bible.com / YouVersion CSB links in `js/app.js`. Simple readings and supported cross-chapter readings use direct passage links; unknown formats fall back to Bible.com search with CSB selected. If future readings introduce a new Bible book, add its Bible.com code to `BIBLE_BOOK_CODES`. Do not paste large Bible passages directly into the site.

## Date previews
Use the `preview` query string to test a specific study day:

```text
?preview=2026-07-19
```

Useful checks:

- `?preview=2026-07-18` before the reading plan starts and intro gathering
- `?preview=2026-07-19` first reading day
- `?preview=2026-07-26` open Sunday
- `?preview=2026-07-27` Steady Men Night 1
- `?preview=2026-07-28` Date TBD next-gathering state
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

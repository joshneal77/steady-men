# Steady Men v1

This folder is the active static website for the Steady Men daily Summer Study hub.

## Deployment note
The site lives in `steady-men-v1/`. Do not move these files unless the Vercel project root has been checked first. This repository does not currently include a `vercel.json`, so the active deployment root may be set in Vercel project settings.

## What to edit
Most routine content changes happen in `js/study-data.js`.

- `startDate` and `endDate`: Summer Study date range.
- `showStudyVideos`: set to `false` to hide the weekly video section.
- `whatsAppUrl`: paste the group invite link when ready.
- `studyPackageUrl`: path or URL for the study package PDF.
- `gatherings`: dates, titles, times, and locations.
- `videos`: optional weekly sermon/study content.
- `brotherhoodReminders`: short rotating connection reminders.
- `READING_PLAN`: daily readings and short notes.

The page uses BibleGateway links generated in `js/app.js`. Do not paste large Bible passages directly into the site.

## Date previews
Use the `preview` query string to test a specific study day:

```text
?preview=2026-07-05
```

Useful checks:

- `?preview=2026-07-04` before the study starts
- `?preview=2026-07-05` first study day
- `?preview=2026-07-17` gathering day
- `?preview=2026-09-05` final study day
- `?preview=2026-09-06` after the study ends

The automatic daily reading uses `America/Toronto` time for the Niagara, Ontario group.

## PWA files
- `manifest.webmanifest` controls the installable app name, colors, and icons.
- `service-worker.js` caches core files and prefers fresh network responses so updates are not stuck behind old cached pages.
- `icons/icon-192.png` and `icons/icon-512.png` are used by the manifest and mobile install surfaces.

## Known content decisions
The current logo file is `assets/brand-mark.svg`. If an approved crest-only production logo replaces it later, keep the filename or update all references together.

The study package PDF link should point to a real, non-empty PDF before launch. If the PDF is not ready, leave `studyPackageUrl` empty so the resource card can be marked unavailable.

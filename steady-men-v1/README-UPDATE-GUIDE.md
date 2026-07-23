# Steady Men v1 - Update Guide

## What this website does
- Automatically shows the correct daily reading between July 19 and September 5, 2026.
- Shows a short Reading Note, a brotherhood reminder, Psalm 1:1-3, the next gathering, and optional support resources.
- Uses America/Toronto time for the daily reading.
- Works on computer and phone. Once hosted, it can be added to a phone home screen as a PWA.

## The main content file
Most updates belong in `js/study-data.js`.

At the top, you can change:
- `startDate` and `endDate` for the study range.
- `whatsAppUrl`, which should stay blank when men are added individually.
- `studyPackageUrl`, which points to the current full guide download.
- `showOptionalResources`, which can be set to `false` to hide the optional video/resource section.
- `studyNights`, which controls the Intro Gathering and Steady Men Night dates, times, locations, and notes. Use `dateLabel: "Date TBD"` with a blank `date` when a gathering date is not set yet.
- `optionalResources`, which controls the optional videos/support resources.
- `READING_PLAN`, which controls each date, Scripture reading, theme, week focus, Study Night reminder, and Reading Note.

## Current gathering dates
- Saturday, July 18, 2026 at 9:00 PM - Intro Gathering
- Monday, July 27, 2026 at 8:00 PM - Steady Men Night 1
- Date TBD - Steady Men Night 2
- Date TBD - Steady Men Night 3

## Preview a day
Add `?preview=YYYY-MM-DD` to the end of the address.

Useful checks:
- `?preview=2026-07-18`
- `?preview=2026-07-19`
- `?preview=2026-07-26`
- `?preview=2026-07-27`
- `?preview=2026-07-28` to check the Date TBD next-gathering state
- `?preview=2026-09-05`
- `?preview=2026-09-06`

## Bible links
The site generates Bible.com / YouVersion CSB links in `js/app.js`. Simple references and supported cross-chapter references use direct passage links. Unknown formats fall back to Bible.com search links with CSB selected.

If a future reading uses a Bible book that is not already listed, add its Bible.com code to `BIBLE_BOOK_CODES` in `js/app.js`.

## Resources
The current guide download is `assets/steady-men-1613-summer-group.docx`.

If a PDF version is created later, upload it to `assets/` and update `studyPackageUrl` in `js/study-data.js`.

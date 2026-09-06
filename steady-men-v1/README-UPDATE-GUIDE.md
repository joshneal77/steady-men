# Updating the Fall website

The current session is September 21 - December 5, 2026, reading Luke and Acts. The uploaded source is `assets/steady-men-fall-2026-final.docx`.

## Readings and sharing

Edit `READING_PLAN` in `js/study-data.js`. Keep each reference and note exactly as listed in the guide. Each passage must stay within one chapter. Open Sundays have `openDay: true` and no Bible or copy buttons.

The app generates CSB Bible.com links. Copy for WhatsApp includes only the date, reading, Bible link, and an optional BibleProject overview on a section-start day. Copy Reading Link includes only the date, reading, and Bible link, even on overview or Study Night days.

October 28 has a verified `bibleUrl` override because Bible.com's continuous Luke 23:1-25 CSB link returns no verses. The displayed reading stays exactly as listed in the guide; the link opens the available verses as two ranges within the same chapter. See the README before changing this exception.

The four optional overview dates are September 21 (Luke 1-9), October 8 (Luke 10-24), November 2 (Acts 1-12), and November 17 (Acts 13-28). Edit each reading's `overview` object to update a link.

## Study Nights

Edit `STUDY_CONFIG.studyNights` in `js/study-data.js`. The upcoming gathering and reading-day reminders both use this list. All nights are in person, 8:00-9:30 PM, with details shared through WhatsApp.

- Monday, September 21: Study Night 1 / Launch Night.
- Tuesday, October 6: Study Night 2. Do not move this to October 5.
- Monday, October 19: Study Night 3.
- Monday, November 2: Study Night 4.
- Monday, November 16: Study Night 5.
- Monday, November 30: Study Night 6.
- Monday, December 7: Study Night 7 / Wrap-up Night.

## Resources and page wording

Upload a replacement guide to `assets/` and set `studyPackageUrl` in `js/study-data.js`. Keep `whatsAppUrl` blank. The general video area is hidden with `showOptionalResources: false`; the four optional BibleProject links belong only to their readings. No RightNow Media links are included.

Session headings, the purpose statement, Leading at Home, and resource labels live in `index.html`. The download is the original final Word document, unchanged. A PDF may be added later.

## Before publishing

Follow the checks and preview dates in `README.md`. Confirm narrow phone widths, both copy buttons, guide download, and Toronto date behavior. Bump `CACHE_NAME` in `service-worker.js` so offline users receive the new session files. Publish through a feature branch and pull request.

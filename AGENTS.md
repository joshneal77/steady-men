# Steady Men Maintenance Notes

## Project purpose
Steady Men is a Christian men's discipleship initiative rooted in 1 Corinthians 16:13-14. The current website is a simple daily hub for the Rooted in the Word Fall Session 2026: Luke + Acts, September 21 - December 5.

The homepage should stay focused on Today's Journey: today's reading and guide note, brotherhood reminder, purpose, next Study Night, optional Leading at Home, and resources.

## Active website root
The active static website lives in `steady-men-v1/`.

Do not move, rename, or flatten this folder unless the Vercel project root has been checked first. There is no committed `vercel.json`; deployment root may be configured in Vercel settings.

## Technical constraints
- Keep the site static: HTML, CSS, and vanilla JavaScript.
- Do not migrate to React, Next.js, a database, login/accounts, analytics, CMS, payments, Supabase, or another paid service.
- Do not collect personal prayer requests or sensitive user data.
- Do not commit directly to `main`; use a feature branch and PR.

## Visual direction
Use the reading-first design system in `steady-men-v1/DESIGN.md`: white, dark ink, restrained forest green and gold, serif reading typography, open section layouts, and thin dividers. Shared tokens and components live in `css/styles.css`; do not add a competing override stylesheet.

The site should feel clean, grounded, calm, encouraging, masculine without being aggressive, rooted in Scripture, and easy to understand quickly.

Use the approved crest-only mark where available. Do not invent or generate replacement logos. If approved logo assets are missing, identify that in the PR instead of fabricating branding.

## Editable content
Most routine updates belong in `steady-men-v1/js/study-data.js`:

- daily reading notes and Scripture references
- Study Night dates, times, locations, and notes
- WhatsApp link
- study package/resource links
- optional video details and `showOptionalResources` visibility
- brotherhood reminder rotation

Keep Bible links easy to update, but do not embed large copyrighted Bible passages.

## Testing expectations
For site changes, check:

- `steady-men-v1/index.html` loads with no missing local assets
- desktop and narrow mobile layouts
- `?preview=2026-09-20` before launch
- `?preview=2026-09-21` first reading, Launch Night, and first optional overview
- `?preview=2026-09-27` Open Sunday
- `?preview=2026-10-06` Tuesday Study Night 2 (not October 5)
- `?preview=2026-10-08`, `?preview=2026-11-02`, and `?preview=2026-11-17` other optional overviews
- `?preview=2026-12-05` final reading
- `?preview=2026-12-06` readings complete, December 7 wrap-up still upcoming
- `?preview=2026-12-08` all gatherings complete
- `node tests/site.test.cjs` from the active website root
- both copy buttons, with overview links only in WhatsApp on the four assigned dates
- America/Toronto date behavior for today's reading
- service worker cache changes do not trap stale pages

For pull requests, include what changed, why, deployment risks, tests performed, remaining decisions, and how to update content.

Keep readings within a single chapter as listed in the final Fall DOCX. Study Night reminders are derived from `studyNights`; do not maintain duplicate dates in individual readings. Keep the optional general video section hidden for Fall and do not add RightNow Media. The full guide download is `assets/steady-men-fall-2026-final.docx`. See the website README for the sharing rules and content locations.

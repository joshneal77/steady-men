# Steady Men Maintenance Notes

## Project purpose
Steady Men is a Christian men's discipleship initiative rooted in 1 Corinthians 16:13-14. The current website is Version 1: a simple daily hub for men participating in the Rooted in the Word summer reading plan.

The homepage should stay focused on Today's Journey: today's reading, reflection, brotherhood reminder, memory focus, next Study Night, and resources.

## Active website root
The active static website lives in `steady-men-v1/`.

Do not move, rename, or flatten this folder unless the Vercel project root has been checked first. There is no committed `vercel.json`; deployment root may be configured in Vercel settings.

## Technical constraints
- Keep the site static: HTML, CSS, and vanilla JavaScript.
- Do not migrate to React, Next.js, a database, login/accounts, analytics, CMS, payments, Supabase, or another paid service.
- Do not collect personal prayer requests or sensitive user data.
- Do not commit directly to `main`; use a feature branch and PR.

## Visual direction
Use the established identity: dark navy `#17212B`, gold `#BE8B3B`, white or warm off-white, clean modern typography, restrained card styling, and thin gold dividers.

The site should feel clean, grounded, calm, encouraging, masculine without being aggressive, rooted in Scripture, and easy to understand quickly.

Use the approved crest-only mark where available. Do not invent or generate replacement logos. If approved logo assets are missing, identify that in the PR instead of fabricating branding.

## Editable content
Most routine updates belong in `steady-men-v1/js/study-data.js`:

- daily reading notes and Scripture references
- Study Night dates, times, locations, and notes
- WhatsApp link
- study package/resource links
- optional video details
- brotherhood reminder rotation

Keep Bible links easy to update, but do not embed large copyrighted Bible passages.

## Testing expectations
For site changes, check:

- `steady-men-v1/index.html` loads with no missing local assets
- desktop and narrow mobile layouts
- `?preview=2026-07-11` before the reading plan starts and intro night
- `?preview=2026-07-12` first reading day
- `?preview=2026-07-19` open Sunday
- `?preview=2026-07-24` first in-person Study Night
- `?preview=2026-08-21` Brotherhood & Accountability Study Night
- `?preview=2026-09-05` final reading day
- `?preview=2026-09-06` after the study ends
- America/Toronto date behavior for today's reading
- service worker cache changes do not trap stale pages

For pull requests, include what changed, why, deployment risks, tests performed, remaining decisions, and how to update content.

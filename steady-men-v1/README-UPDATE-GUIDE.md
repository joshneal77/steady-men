# Steady Men v1 — Update Guide

## What this website does
- Automatically shows the correct daily reading between July 5 and September 5, 2026.
- Shows a short reading note, a brotherhood reminder, Psalm 1:1–3, the next gathering, and the current YouTube study.
- Works on computer and phone. Once hosted, it can be added to a phone home screen as a PWA.

## The one file you will edit most often
Open `js/study-data.js` in GitHub or a text editor.

At the top, you can change:
- `showStudyVideos`: Set to `false` to remove the weekly video section entirely.
- `whatsAppUrl`: Paste the WhatsApp invite link when you have one.
- Gathering `time` and `location`.
- Video links, titles, and summaries.
- Each daily reading’s `note`.

## Replace the temporary mark with your final approved logo
This build uses a clean temporary navy/gold `assets/brand-mark.svg` because the approved crest file was not available in the website folder. When ready, replace that file with your actual crest while keeping the same filename: `assets/brand-mark.svg`.

## Uploading this to GitHub
1. In your `steady-men` GitHub repository, delete the old website files if you want a clean replacement.
2. Upload **the contents** of this folder, not the folder itself.
3. Commit the changes.
4. Vercel should redeploy automatically.

## Preview a day before the study starts
Add `?preview=2026-07-10` to the end of the address. Example:
`https://your-domain.ca/?preview=2026-07-10`

Remove the `?preview=...` part before sharing the site with the group.

## Bible links
The buttons currently open BibleGateway in NIV. In `js/app.js`, search `version=NIV` if you want to use another supported version or another Bible service.

# Backend — Google Apps Script grade book

A tiny Apps Script Web App that receives quiz and self-check submissions
from the class workspace and appends them as rows in a Google Sheet, so you
can see everyone's scores in one place instead of only in each student's own
browser.

## What gets sent

Everything on the site that currently produces a score is synced here:

| Sheet (auto-created) | Source on the site |
|---|---|
| `Quiz` | The 15-question pre/post knowledge test |
| `Confidence` | The confidence self-assessment (+ post-course intention questions) |
| `Followup` | The 30-day follow-up survey |
| `ExerciseSelfCheck` | Each exercise's "ตรวจการบ้านของคุณ" self-check |
| `WorkshopSelfCheck` | The final workshop's self-check |

Each row is tagged with the name the student typed into "ชื่อของคุณ" in the
sidebar (or "ไม่ระบุชื่อ" if they left it blank — there's no login, so this
is just a name string, not a verified identity).

**Privacy note:** the deployed Web App URL lives in the site's public
JavaScript source, so anyone who reads it could in principle POST rows to
your sheet too. The optional `SHARED_SECRET` below is a light deterrent
against that, not real security — don't put anything sensitive in this
sheet beyond names and scores.

## Deploy it (one-time, from your Google account)

1. Create a new Google Sheet (this is where scores will land) — e.g. "Excel Power Query — Grade Book".
2. In that Sheet, go to **Extensions → Apps Script**. This opens a script project already bound to the sheet.
3. Delete the placeholder `Code.gs` content and paste in the contents of [`Code.gs`](Code.gs) from this folder.
4. Open **Project Settings** (gear icon) → under "Show appsscript.json manifest file" check the box. A new `appsscript.json` tab appears in the editor — replace its contents with [`appsscript.json`](appsscript.json) from this folder.
5. (Optional but recommended) In `Code.gs`, set `SHARED_SECRET` to a random string of your choosing, e.g. `"pq2026-xyz"`.
6. Click **Deploy → New deployment**. Choose type **Web app**. Set:
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Click **Deploy**, authorize the permissions Google asks for (it's your own script accessing your own sheet), then copy the **Web app URL** (ends in `/exec`).
8. Open [`app.js`](../app.js) in the site and near the top set:
   ```js
   const GAS_ENDPOINT = "PASTE_YOUR_/exec_URL_HERE";
   const GAS_SECRET = "pq2026-xyz"; // must match SHARED_SECRET in Code.gs, or leave both "" to skip
   ```
9. Commit and push. New submissions will now also land as rows in your Sheet.

## Updating the script later

Whenever you change grading logic and want it reflected in the sheet, edit
`Code.gs` in this folder, then copy the updated content into the
script.google.com editor and click **Deploy → Manage deployments → Edit →
New version** (a plain save without a new version won't affect the live
`/exec` URL).

## If you'd rather use `clasp` (Apps Script CLI)

This folder is laid out so you can push it with
[`clasp`](https://github.com/google/clasp) instead of copy-pasting:

```bash
npm install -g @google/clasp
clasp login                 # opens a browser to authorize your Google account
clasp create --type webapp --title "Excel Power Query Grade Book" --rootDir ./backend
clasp push
clasp deploy
```

`clasp login` needs an interactive browser sign-in, so run these commands
yourself in a normal terminal rather than through an agent session.

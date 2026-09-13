# Backend — Google Apps Script grade book

**Status: deployed.** This project (`scriptId` in [`.clasp.json`](.clasp.json)) is
already live and wired into `GAS_ENDPOINT` in [`app.js`](../app.js). The rest of
this doc is for redeploying, updating the code, or setting up a fresh copy
from scratch.

A tiny Apps Script Web App that receives quiz and self-check submissions
from the class workspace and appends them as rows in a Google Sheet, so you
can see everyone's scores in one place instead of only in each student's own
browser. The sheet is created automatically on first submission (see
`getOrCreateSpreadsheet_` in `Code.gs`) — no manual binding to a Sheet needed;
just find "Excel Power Query — Grade Book" in the deploying account's Google
Drive, or visit the deployed URL with a plain GET request, which returns a
link to it.

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

## Set up a fresh copy from scratch

1. Go to [script.google.com](https://script.google.com) → **New project** (a standalone script — it doesn't need to be bound to a Sheet).
2. Delete the placeholder code and paste in the contents of [`Code.gs`](Code.gs) from this folder.
3. Open **Project Settings** (gear icon) → check "Show appsscript.json manifest file". A new `appsscript.json` tab appears — replace its contents with [`appsscript.json`](appsscript.json) from this folder.
4. (Optional but recommended) In `Code.gs`, set `SHARED_SECRET` to a random string of your choosing, e.g. `"pq2026-xyz"`.
5. Click **Deploy → New deployment**. Choose type **Web app**. Set:
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Click **Deploy**, authorize the permissions Google asks for, then copy the **Web app URL** (ends in `/exec`).
7. Open [`app.js`](../app.js) and near the top set:
   ```js
   const GAS_ENDPOINT = "PASTE_YOUR_/exec_URL_HERE";
   const GAS_SECRET = "pq2026-xyz"; // must match SHARED_SECRET in Code.gs, or leave both "" to skip
   ```
8. Commit and push. New submissions will now also land as rows in your Sheet.

> **A gotcha we hit doing this ourselves:** creating the deployment via
> `clasp deploy` (the Apps Script API) did not reliably apply "Anyone, even
> anonymous" access, even with the manifest set correctly — it either 403'd
> anonymous requests or redirected them to a Google sign-in page. Doing the
> final **Deploy → New deployment** step through the script.google.com UI
> (step 5 above) is what actually worked. If you push code changes with
> `clasp push`, that's fine — just do the deployment/access step itself
> through the UI.

## Updating the script later

Edit `Code.gs` in this folder, then either:
- **Via the UI:** paste the updated content into the script.google.com editor and click **Deploy → Manage deployments → Edit (pencil icon) → New version** (a plain save without a new version won't affect the live `/exec` URL), or
- **Via clasp** (already logged in and configured — see `.clasp.json` in this folder): `clasp push` from within this `backend/` directory uploads the code; you still need to bump the live deployment's version through **Manage deployments** in the UI (per the gotcha above) for changes to reach the `/exec` URL.

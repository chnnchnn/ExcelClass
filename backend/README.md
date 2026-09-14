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
| `FileUploads` (log only) | Filename/size/link for every homework file a student uploads |
| `Chat` | Messages posted from the shared class chat panel (💬 button, top-right of the header) |
| `Notes` | Text notes saved from the Note page (📝 in the sidebar) via its "บันทึกลง Google Sheet" button |

Students can also upload an actual homework file (`.xlsx`/`.xlsm`/`.xls`, max
8MB — keep `MAX_UPLOAD_BYTES` in sync between `Code.gs` and `app.js` if you
change it) via the "⬆ ส่งไฟล์การบ้าน" button under the name field in the
sidebar. Each file lands in Google Drive under **`SUBMISSIONS_FOLDER_ID` (a
fixed folder ID set in `Code.gs`) → &lt;student name&gt;/**, with a
subfolder auto-created per student the first time they upload. Re-uploading
a file with the same name replaces the previous one (old copy moved to
Drive trash) instead of piling up duplicates. `FileUploads` just logs the
metadata + a link to each file — it isn't the actual storage.

**One-time extra step for file uploads:** the first time you deploy this
version, the script needs to request Google Drive access, which it never
needed before. In the Apps Script editor, pick `oneTimeAuthorizeDriveAccess`
from the function dropdown, click **Run**, and click **Allow** on the
permissions screen (you may need to click "Advanced" → "Go to [project]
(unsafe)" first — expected for a personal, unverified script). Then bump the
live deployment (**Deploy → Manage deployments → Edit → Deploy**) so the web
app runs with the new permission. Until you do this, upload attempts fail
with a clean "unauthorized" error — score/quiz syncing is unaffected either
way.

> **The gotcha that actually bit us:** `oneTimeAuthorizeDriveAccess` only
> called `DriveApp.getFolderById(...)` (a read). Google granted a scope that
> covered reading the folder but not creating files/folders inside it, and
> that gap doesn't surface until doPost actually tries to write — with an
> error message identical to "no Drive access at all", so it looks like the
> authorization didn't take even though it partially did. The function now
> deliberately tests both `getFolderById` (read) **and** `createFolder`
> (write) so a re-run either fully succeeds or fails at a point that tells
> you which half is missing. If uploads ever start failing again with a
> DriveApp error, re-run this function first.

**Chat:** the 💬 button in the top-right of the header opens a shared chat
panel — every message a student posts is appended to the `Chat` sheet, and
all visitors' browsers poll `GET <exec-url>?action=chat&since=<lastId>` every
few seconds to pick up new messages, so everyone sees the same conversation
(not just their own browser). This needs no extra authorization step beyond
what quiz/score syncing already uses (`SpreadsheetApp`) — it does not touch
Drive.

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

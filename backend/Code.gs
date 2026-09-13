/**
 * Excel Power Query — Class Workspace backend
 *
 * Receives score/self-check submissions posted from the static site
 * (app.js -> syncToBackend) and appends them as rows to a Google Sheet.
 * The sheet is created automatically on first submission (see
 * getOrCreateSpreadsheet_) — no manual binding needed. Deploy as a Web App
 * (Execute as: Me, Who has access: Anyone) and paste the resulting /exec URL
 * into GAS_ENDPOINT in app.js on the site. See README.md in this folder.
 */

// Must match GAS_SECRET in app.js. Change this to your own value before
// deploying — it is only a light deterrent (it ships inside the public page
// source), not real access control. Leave both sides "" to disable the check.
const SHARED_SECRET = "8cdec58aa71b2346b8ad9ef149185808";

const HEADERS = {
  quiz: ["เวลา", "ชื่อนักเรียน", "รอบ (pre/post)", "คะแนน", "เต็ม", "ยังไม่ทราบ (ข้อ)", "รายละเอียดคำตอบ (JSON)"],
  confidence: ["เวลา", "ชื่อนักเรียน", "รอบ (pre/post)", "คะแนนความมั่นใจเฉลี่ย", "ความตั้งใจนำไปใช้ (1-5)", "งานที่ตั้งใจทำ", "อุปสรรคที่คาดว่าจะเจอ"],
  followup: ["เวลา", "ชื่อนักเรียน", "คำตอบทั้งหมด (JSON)"],
  exercise: ["เวลา", "ชื่อนักเรียน", "แบบฝึกหัดที่", "คะแนน", "เต็ม", "ผ่านครบทุกข้อ", "รายละเอียด (JSON)"],
  workshop: ["เวลา", "ชื่อนักเรียน", "คะแนน", "เต็ม", "ผ่านครบทุกข้อ", "รายละเอียด (JSON)"],
  file: ["เวลา", "ชื่อนักเรียน", "ชื่อไฟล์", "ขนาดไฟล์", "ลิงก์ไฟล์ใน Drive"],
  chat: ["เวลา", "ชื่อนักเรียน", "ข้อความ"],
};

// Max characters kept per chat message (matches MAX_CHAT_MESSAGE_LENGTH in app.js).
const MAX_CHAT_MESSAGE_LENGTH = 500;

// How many recent chat messages a client gets back when it has no "since" cursor yet.
const CHAT_HISTORY_LIMIT = 100;

// Max size for an uploaded homework file's base64 payload (bytes, decoded). Keep
// in sync with MAX_UPLOAD_BYTES in app.js.
const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

// Fixed Google Drive folder that receives all homework uploads (one subfolder
// per student name inside it). Must be owned by, or shared as Editor with,
// the account that owns/deploys this script (it runs as "Execute as: Me").
const SUBMISSIONS_FOLDER_ID = "18oMdTkibeRqSQ9L5BJk6PT8roQtxWuVP";

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (SHARED_SECRET && body.secret !== SHARED_SECRET) {
      return jsonResponse({ ok: false, error: "unauthorized" });
    }
    if (body.type === "file") {
      return handleFileUpload_(body);
    }
    const sheetName = HEADERS[body.type] ? capitalize_(body.type) : null;
    if (!sheetName) return jsonResponse({ ok: false, error: "unknown submission type: " + body.type });

    const sheet = getOrCreateSheet_(sheetName, HEADERS[body.type]);
    sheet.appendRow(buildRow_(body.type, body));
    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function handleFileUpload_(body) {
  const name = (body.name || "").trim() || "ไม่ระบุชื่อ";
  const fileName = (body.fileName || "homework").trim();
  const mimeType = body.mimeType || "application/octet-stream";
  const base64Data = body.fileData || "";
  if (!base64Data) return jsonResponse({ ok: false, error: "no file data" });

  const bytes = Utilities.base64Decode(base64Data);
  if (bytes.length > MAX_UPLOAD_BYTES) {
    return jsonResponse({ ok: false, error: "file too large (max " + (MAX_UPLOAD_BYTES / 1024 / 1024) + "MB)" });
  }

  const rootFolder = DriveApp.getFolderById(SUBMISSIONS_FOLDER_ID);
  const studentFolder = getOrCreateChildFolder_(rootFolder, name);

  // replace any earlier submission with the same filename instead of piling up duplicates
  const existingFiles = studentFolder.getFilesByName(fileName);
  while (existingFiles.hasNext()) {
    existingFiles.next().setTrashed(true);
  }

  const blob = Utilities.newBlob(bytes, mimeType, fileName);
  const file = studentFolder.createFile(blob);

  const sheet = getOrCreateSheet_("FileUploads", HEADERS.file);
  sheet.appendRow([new Date(), name, fileName, Math.round(bytes.length / 1024) + " KB", file.getUrl()]);

  return jsonResponse({ ok: true, url: file.getUrl() });
}

function getOrCreateChildFolder_(parent, name) {
  const existing = parent.getFoldersByName(name);
  if (existing.hasNext()) return existing.next();
  return parent.createFolder(name);
}

/**
 * ONE-TIME SETUP after adding (or changing) file-upload support: this script
 * calls DriveApp, a permission it never needed before, so the account running
 * it must grant Drive access. In the Apps Script editor, pick this function
 * ("oneTimeAuthorizeDriveAccess") from the function dropdown, click Run, and
 * click Allow on the permissions screen (you may need to click "Advanced" →
 * "Go to [project] (unsafe)" first — that's expected for a personal,
 * unverified script). Then re-deploy: Deploy → Manage deployments → Edit →
 * Deploy, so the live web app picks up the permission.
 *
 * Important: this function deliberately tests both READ (getFolderById) and
 * WRITE (createFolder) access, not just read. Google can grant a narrower
 * read-only Drive scope from a consent screen if the only thing it saw you
 * authorize was a read call — that scope doesn't cover creating folders/files,
 * and the failure only shows up later when doPost actually tries to write,
 * with an error that looks identical to "not authorized at all". If uploads
 * ever start failing again with a DriveApp authorization error, re-run this
 * function — if only "Drive READ ok" logs and it then throws on the
 * createFolder line, that confirms it's this same read-vs-write gap.
 */
function oneTimeAuthorizeDriveAccess() {
  const folder = DriveApp.getFolderById(SUBMISSIONS_FOLDER_ID);
  Logger.log("Drive READ ok. Folder name: " + folder.getName());
  const testFolder = folder.createFolder("_authorization_test_" + new Date().getTime());
  Logger.log("Drive WRITE ok. Created: " + testFolder.getName());
  testFolder.setTrashed(true);
  Logger.log("Cleaned up test folder. All good.");
}

function doGet(e) {
  const params = (e && e.parameter) || {};
  if (params.action === "chat") {
    return getChatMessages_(params);
  }
  const ss = getOrCreateSpreadsheet_();
  return ContentService.createTextOutput(
    "Excel Power Query class backend is running.\nGrade book: " + ss.getUrl()
  ).setMimeType(ContentService.MimeType.TEXT);
}

// Returns chat messages after row `since` (its row number in the Chat sheet),
// or the last CHAT_HISTORY_LIMIT messages if `since` is absent — this is what
// the site polls with fetch() to show everyone the same shared chat.
function getChatMessages_(params) {
  const sheet = getOrCreateSheet_("Chat", HEADERS.chat);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return jsonResponse({ ok: true, messages: [] });

  const since = parseInt(params.since, 10) || 0;
  const startRow = since >= 1 ? since + 1 : Math.max(2, lastRow - CHAT_HISTORY_LIMIT + 1);
  if (startRow > lastRow) return jsonResponse({ ok: true, messages: [] });

  const values = sheet.getRange(startRow, 1, lastRow - startRow + 1, 3).getValues();
  const messages = values.map((row, i) => ({
    id: startRow + i,
    time: row[0] instanceof Date ? row[0].toISOString() : String(row[0]),
    name: row[1],
    message: row[2],
  }));
  return jsonResponse({ ok: true, messages });
}

function buildRow_(type, body) {
  const now = new Date();
  const name = (body.name || "").trim() || "ไม่ระบุชื่อ";
  switch (type) {
    case "quiz":
      return [now, name, body.mode || "", body.score, body.total, body.unknown, JSON.stringify(body.answers || [])];
    case "confidence":
      return [now, name, body.mode || "", body.average, body.intentionScore || "", body.project || "", body.blocker || ""];
    case "followup":
      return [now, name, JSON.stringify(body.answers || [])];
    case "exercise":
      return [now, name, body.exerciseId, body.score, body.total, body.allPass ? "ผ่าน" : "ไม่ผ่าน", JSON.stringify(body.inputs || [])];
    case "workshop":
      return [now, name, body.score, body.total, body.allPass ? "ผ่าน" : "ไม่ผ่าน", JSON.stringify(body.inputs || [])];
    case "chat":
      return [now, name, String(body.message || "").slice(0, MAX_CHAT_MESSAGE_LENGTH)];
    default:
      return [now, name, JSON.stringify(body)];
  }
}

function getOrCreateSpreadsheet_() {
  const props = PropertiesService.getScriptProperties();
  const existingId = props.getProperty("SHEET_ID");
  if (existingId) {
    try {
      return SpreadsheetApp.openById(existingId);
    } catch (err) {
      // fall through and provision a new one if the saved id no longer resolves
    }
  }
  const ss = SpreadsheetApp.create("Excel Power Query — Grade Book");
  props.setProperty("SHEET_ID", ss.getId());
  return ss;
}

function getOrCreateSheet_(name, headers) {
  const ss = getOrCreateSpreadsheet_();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  }
  return sheet;
}

function capitalize_(type) {
  const names = { quiz: "Quiz", confidence: "Confidence", followup: "Followup", exercise: "ExerciseSelfCheck", workshop: "WorkshopSelfCheck", chat: "Chat" };
  return names[type] || null;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

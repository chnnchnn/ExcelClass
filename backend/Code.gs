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
};

// Max size for an uploaded homework file's base64 payload (bytes, decoded). Keep
// in sync with MAX_UPLOAD_BYTES in app.js.
const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

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

  const stamp = Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd_HHmmss");
  const blob = Utilities.newBlob(bytes, mimeType, stamp + "_" + fileName);

  const rootFolder = getOrCreateSubmissionsFolder_();
  const studentFolder = getOrCreateChildFolder_(rootFolder, name);
  const file = studentFolder.createFile(blob);

  const sheet = getOrCreateSheet_("FileUploads", HEADERS.file);
  sheet.appendRow([new Date(), name, fileName, Math.round(bytes.length / 1024) + " KB", file.getUrl()]);

  return jsonResponse({ ok: true, url: file.getUrl() });
}

function getOrCreateSubmissionsFolder_() {
  const props = PropertiesService.getScriptProperties();
  const existingId = props.getProperty("SUBMISSIONS_FOLDER_ID");
  if (existingId) {
    try {
      return DriveApp.getFolderById(existingId);
    } catch (err) {
      // fall through and provision a new one if the saved id no longer resolves
    }
  }
  const folder = DriveApp.createFolder("Excel Power Query — การบ้านที่ส่ง (Student Submissions)");
  props.setProperty("SUBMISSIONS_FOLDER_ID", folder.getId());
  return folder;
}

function getOrCreateChildFolder_(parent, name) {
  const existing = parent.getFoldersByName(name);
  if (existing.hasNext()) return existing.next();
  return parent.createFolder(name);
}

/**
 * ONE-TIME SETUP after adding file-upload support: this script now calls
 * DriveApp, a permission it never needed before, so the account running it
 * must grant Drive access. In the Apps Script editor, pick this function
 * ("oneTimeAuthorizeDriveAccess") from the function dropdown and click Run —
 * a permissions screen will appear; click Allow. Do this once, then re-deploy
 * (Deploy → Manage deployments → Edit → Deploy) so the live web app runs
 * with the new permission. Skip if uploads already work.
 */
function oneTimeAuthorizeDriveAccess() {
  DriveApp.getRootFolder();
}

function doGet(e) {
  const ss = getOrCreateSpreadsheet_();
  return ContentService.createTextOutput(
    "Excel Power Query class backend is running.\nGrade book: " + ss.getUrl()
  ).setMimeType(ContentService.MimeType.TEXT);
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
  const names = { quiz: "Quiz", confidence: "Confidence", followup: "Followup", exercise: "ExerciseSelfCheck", workshop: "WorkshopSelfCheck" };
  return names[type] || null;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

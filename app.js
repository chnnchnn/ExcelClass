const chapters = [
  {
    id: "editor", number: "01", title: "รู้จัก Power Query และหน้าจอ Editor",
    intro: "เปลี่ยนงานคัดลอก วาง และจัดรูปแบบซ้ำ ๆ ให้เป็นขั้นตอนที่กด Refresh แล้วทำงานซ้ำได้ทุกครั้ง",
    outcomes: ["นำเข้าตาราง Excel และโหลดผลลัพธ์กลับเป็นตารางใหม่", "อ่าน แก้ และลบ Applied Steps ได้", "อธิบายบทบาทของ Power Query ในกระบวนการ ETL ได้"],
    conceptTitle: "แนวคิดหลัก", concept: "ETL คือ Extract, Transform และ Load งานรายงานที่เคยทำด้วยมือก็เป็น ETL อยู่แล้ว เพียงแต่ Power Query บันทึกชุดคำสั่งไว้และนำกลับมาเล่นซ้ำเมื่อ Refresh แทนการทำใหม่ทีละขั้นตอน.",
    steps: ["Data → Get Data → เลือกแหล่งข้อมูล", "ตรวจดูขั้นตอนทั้งหมดที่ Applied Steps", "เปิด Home → Advanced Editor เมื่อต้องการดูโค้ดที่ระบบเขียน", "ส่งผลลัพธ์กลับ Excel ด้วย Home → Close & Load หรือ Close & Load To"],
    table: [["ต้องการ", "ไปที่"], ["เข้าไปแก้ Query ที่ทำไว้", "ดับเบิลคลิกชื่อ Query ใน Queries & Connections"], ["เปลี่ยนชื่อขั้นตอน", "ดับเบิลคลิกชื่อขั้นตอนแล้วพิมพ์ใหม่"], ["ดูโค้ด M", "Home → Advanced Editor"]],
    trap: "เลือกทั้งชีทแทนที่จะเลือก Excel Table ทำให้เซลล์ว่างและข้อความส่วนเกินติดมาด้วย เลือกตารางเสมอเมื่อมีตารางต้นทางอยู่แล้ว.",
    quiz: "ถ้าลบขั้นตอนหนึ่งแล้วขั้นตอนถัดไป Error สาเหตุคืออะไร?", answer: "เพราะแต่ละขั้นทำงานต่อจากผลลัพธ์ของขั้นก่อนหน้า ขั้นที่ตามมาอาจอ้างถึงคอลัมน์หรือค่าที่ขั้นที่ลบเป็นผู้สร้างไว้."
  },
  {
    id: "sources", number: "02", title: "นำเข้าข้อมูลจากหลายแหล่ง",
    intro: "ใช้ตัวเชื่อมต่อให้ตรงกับแหล่งข้อมูล และจัดโครงสร้างไฟล์ที่ยังไม่สะอาดก่อนเริ่มแปลงข้อมูล.",
    outcomes: ["นำเข้า CSV, TXT, JSON และตารางบนเว็บพร้อมตั้งค่าตัวคั่นและ encoding", "กำจัดหัวรายงานและบรรทัดขยะ", "รวมไฟล์ในโฟลเดอร์เดียวด้วย From Folder"],
    conceptTitle: "เลือกตัวเชื่อมต่อให้ถูก", concept: "เมื่อมีตัวเชื่อมต่อเฉพาะทาง เช่น SQL Server ให้เลือกใช้แทน ODBC ทั่วไป เพราะรองรับความสามารถของแหล่งข้อมูลได้ดีกว่าและอาจใช้ Query Folding เพื่อความเร็วกับข้อมูลขนาดใหญ่.",
    steps: ["ตัดแถวหัวรายงาน: Home → Remove Rows → Remove Top Rows", "ใช้ Use First Row as Headers", "กรองแถวปิดท้ายรายงานที่คอลัมน์หลักเป็นค่าว่าง", "กรองเฉพาะนามสกุลไฟล์ที่ต้องการเมื่อใช้ From Folder"],
    table: [["สิ่งที่ From Folder สร้าง", "หน้าที่"], ["พารามิเตอร์ตัวอย่างไฟล์", "ชี้ไฟล์ที่ใช้เป็นตัวอย่าง"], ["Query ไฟล์ตัวอย่าง", "ที่ทดลองแปลงข้อมูล"], ["Transform File", "ฟังก์ชันที่ใช้แปลงทุกไฟล์"], ["Query ผลลัพธ์", "ตารางรวมที่ใช้งานจริง"]],
    trap: "อย่าสลับลำดับตัดหัวรายงานกับ Use First Row as Headers ไม่เช่นนั้นข้อความหัวรายงานจะกลายเป็นชื่อคอลัมน์. ตัดไฟล์ชื่อขึ้นต้น ~$ ออกจากโฟลเดอร์ด้วย.",
    quiz: "ถ้าต้องเปลี่ยนวิธีแปลงข้อมูลของทุกไฟล์ในโฟลเดอร์ ต้องแก้ที่ Query ไหน?", answer: "แก้ที่ Query ไฟล์ตัวอย่าง ระบบจะนำขั้นตอนนั้นไปใช้กับทุกไฟล์ผ่าน Transform File."
  },
  {
    id: "clean", number: "03", title: "ทำความสะอาดข้อมูล",
    intro: "ลำดับในการทำความสะอาดสำคัญพอ ๆ กับเครื่องมือที่ใช้ เพราะการสลับลำดับเพียงนิดเดียวอาจทำให้ยอดและจำนวนแถวผิดได้.",
    outcomes: ["วิเคราะห์ปัญหาจากข้อมูลดิบก่อนลงมือแก้", "ทำความสะอาดตามลำดับที่ลดข้อผิดพลาด", "ใช้ Data Profiling ตรวจคุณภาพข้อมูล"],
    conceptTitle: "ลำดับที่แนะนำ", concept: "เริ่มจากโครงตารางก่อน จากนั้นลดข้อมูลที่ไม่จำเป็น จัดข้อความให้มาตรฐาน แปลงชนิดข้อมูล แล้วค่อยตรวจค่าว่าง แถวซ้ำ และ Error. ลำดับนี้ไม่ใช่กฎตายตัว แต่ช่วยลดปัญหาได้มาก.",
    steps: ["ตัดหัวรายงานและแถวขยะ แล้วใช้แถวแรกเป็นหัวคอลัมน์", "ลบคอลัมน์ที่ไม่ใช้", "Trim และทำตัวพิมพ์ให้สม่ำเสมอในคอลัมน์ข้อความ", "ทำค่าที่สะกดไม่ตรงกันให้เป็นมาตรฐาน", "Change Type โดยใช้ Using Locale สำหรับวันที่", "ทำธงให้ค่าว่างหรือค่าผิดปกติก่อนตัดสินใจลบ", "ลบแถวซ้ำ แล้วตรวจ Column Quality"],
    table: [["Data Profiling", "ใช้ตรวจ"], ["Column Quality", "สัดส่วนค่าดี Error และค่าว่าง"], ["Column Distribution", "จำนวนค่าที่ไม่ซ้ำและการสะกดไม่ตรงกัน"], ["Column Profile", "สถิติโดยละเอียดของคอลัมน์ที่เลือก"]],
    trap: "วันที่รูปแบบ วัน/เดือน/ปี ต้องใช้ Change Type → Using Locale เสมอ มิฉะนั้น 05/03/2026 อาจถูกตีความเป็น 3 พฤษภาคมแทน 5 มีนาคม.",
    quiz: "ทำไมต้อง Trim ก่อนลบแถวซ้ำ?", answer: "ค่า C007 และช่องว่างตามด้วย C007 ดูเหมือนกันแต่เป็นข้อความคนละค่า จึงต้องตัดช่องว่างก่อนให้ Power Query จับว่าเป็นแถวซ้ำ."
  },
  {
    id: "merge", number: "04", title: "Merge และ Append",
    intro: "ตัดสินใจจากรูปทรงของข้อมูล: Merge เพิ่มคอลัมน์จากการจับคู่ด้วยกุญแจ ส่วน Append เพิ่มแถวด้วยการซ้อนตาราง.",
    outcomes: ["แยกสถานการณ์ที่เหมาะกับ Merge และ Append", "เลือก Join ได้ตามผลลัพธ์ที่ต้องการ", "ใช้ Anti Join ตรวจข้อมูลตกหล่นก่อนส่งรายงาน"],
    conceptTitle: "แยกให้ออกด้วยภาพเดียว", concept: "Merge วางสองตารางไว้ข้างกันแล้วเชื่อมด้วย key ผลคือคอลัมน์เพิ่มขึ้น. Append วางตารางต่อกันลงมา ผลคือแถวเพิ่มขึ้น. ในงานจริงให้ Append ข้อมูลให้ครบก่อน แล้วค่อย Merge ตารางอ้างอิง.",
    steps: ["ตรวจให้ key ทั้งสองฝั่งเป็นชนิดข้อมูลเดียวกัน", "Trim และทำค่าข้อความให้มาตรฐานก่อนจับคู่", "จดจำนวนแถวก่อน Merge", "เลือก Left Outer เป็นค่าเริ่มต้นของงานส่วนใหญ่", "ตรวจจำนวนแถวหลัง Merge และใช้ Left Anti ดูรายการที่จับคู่ไม่เจอ"],
    table: [["Join", "ใช้เมื่อ"], ["Left Outer", "เก็บทุกแถวตารางซ้ายและเติมข้อมูลที่จับคู่ได้"], ["Inner", "ต้องการเฉพาะแถวที่จับคู่กัน ระวังแถวหายเงียบ"], ["Full Outer", "ตรวจความครบถ้วนของสองระบบ"], ["Left Anti", "หาข้อมูลฝั่งซ้ายที่ไม่มีคู่ เช่นรหัสลูกค้าที่ไม่อยู่ทะเบียน"]],
    trap: "ถ้าตารางอ้างอิงมี key ซ้ำ การ Merge อาจทำให้จำนวนแถวเพิ่มขึ้นผิดปกติ. ตรวจ uniqueness ของ key และดู row count ทุกครั้ง.",
    quiz: "สถานการณ์ใดควร Append ก่อน Merge?", answer: "เมื่อมีไฟล์ธุรกรรมหลายเดือนหรือหลายสาขาที่มีโครงสร้างเดียวกัน ให้รวมเป็นตารางเดียวก่อน แล้วจึง Merge ตารางอ้างอิงครั้งเดียว."
  },
  {
    id: "shape", number: "05", title: "พลิกรูปทรงข้อมูล",
    intro: "เลือก Unpivot, Pivot และ Group By ให้ตรงกับงาน เพื่อแปลงรายงานที่ออกแบบมาเพื่ออ่านให้เป็นตารางที่พร้อมวิเคราะห์.",
    outcomes: ["ตัดสินใจได้ว่าเมื่อไรควร Unpivot หรือ Pivot", "จัดข้อมูลแบบกว้างให้พร้อมทำ PivotTable", "สรุปข้อมูลด้วย Group By ได้"],
    conceptTitle: "ตารางที่วิเคราะห์ง่ายต้องยาว ไม่ใช่กว้าง", concept: "ข้อมูลที่มีเดือนหรือประเภทอยู่เป็นหลายคอลัมน์เหมาะกับการอ่านแต่ไม่เหมาะกับการกรองและทำ PivotTable. Unpivot จะเปลี่ยนหัวคอลัมน์เหล่านั้นให้กลายเป็นค่าในคอลัมน์เดียว ทำให้เพิ่มเดือนใหม่ได้โดยไม่ต้องแก้สูตร.",
    steps: ["เลือกคอลัมน์ที่ต้องคงไว้ เช่น รหัสสินค้า", "Transform → Unpivot Other Columns", "เปลี่ยนชื่อ Attribute และ Value ให้มีความหมาย", "ตั้งชนิดข้อมูลของ Value ให้ถูกต้อง", "ใช้ Group By เมื่อต้องการสรุปยอดเป็นระดับที่ต้องการ"],
    table: [["เครื่องมือ", "ผลลัพธ์"], ["Unpivot", "เปลี่ยนหลายคอลัมน์ให้เป็นคู่ Attribute และ Value"], ["Pivot", "เปลี่ยนค่าจากแถวกลับไปเป็นคอลัมน์"], ["Group By", "รวม คำนวณ หรือสรุปข้อมูลตามกลุ่ม"]],
    trap: "อย่า Unpivot คอลัมน์ที่เป็นตัวระบุ เช่น รหัสลูกค้า หรือวันที่รายการ เลือกคงไว้ก่อน แล้วจึง Unpivot Other Columns.",
    quiz: "ทำไมตารางยอดขาย Jan, Feb, Mar เป็นหลายคอลัมน์จึงไม่ยืดหยุ่น?", answer: "เพราะเพิ่มเดือนใหม่แล้วโครงสร้างตารางเปลี่ยน การแปลงเป็น Month และ Amount ทำให้กรอง รวม และสร้าง PivotTable ได้โดยไม่ต้องแก้โครงสร้างทุกเดือน."
  },
  {
    id: "m", number: "06", title: "คอลัมน์คำนวณและภาษา M",
    intro: "ใช้ Custom Column ทำกติกาธุรกิจให้ชัดเจน และอ่านโครงสร้างภาษา M เพื่อแก้ปัญหาได้อย่างมีเหตุผล.",
    outcomes: ["สร้าง Custom Column ด้วยเงื่อนไขและฟังก์ชันพื้นฐาน", "อ่านโครงสร้าง let ... in และชื่อขั้นตอนที่มีช่องว่าง", "ใช้ try otherwise จัดการ Error อย่างพอดี"],
    conceptTitle: "อ่าน M ให้ออกก่อนเขียน", concept: "Query คือชุดของชื่อขั้นตอน แต่ละชื่อเก็บผลลัพธ์จากขั้นก่อนหน้าไว้. บล็อก let ประกาศขั้นตอน และ in ระบุว่าจะส่งขั้นตอนใดออกเป็นผลลัพธ์สุดท้าย. อ่านจากบนลงล่างจะช่วยให้ตามรอยปัญหาได้.",
    steps: ["Add Column → Custom Column", "อ้างคอลัมน์ด้วยรูปแบบ [ชื่อคอลัมน์]", "จัดลำดับเงื่อนไขเฉพาะให้มาก่อนเงื่อนไขกว้าง", "ตรวจชนิดข้อมูลของผลลัพธ์", "ใช้ try otherwise เฉพาะจุดที่รู้ว่ามีความเสี่ยง และเก็บ Query แยกสำหรับแถวที่ผิดปกติ"],
    table: [["ตัวอย่าง", "ความหมาย"], ["if [ยอด] > 10000 then \"สูง\" else \"ปกติ\"", "สร้างเงื่อนไข"], ["Text.Trim([รหัส])", "ตัดช่องว่าง"], ["Date.StartOfMonth([วันที่])", "หาวันแรกของเดือน"], ["try Number.From([ค่า]) otherwise null", "จัดการค่าที่แปลงไม่ได้"]],
    trap: "try ทำให้ Query เดินต่อได้ แต่ก็อาจซ่อนปัญหา จึงไม่ควรครอบทุกสูตรโดยไม่ตรวจว่ามีแถวใดผิดปกติ.",
    quiz: "ทำไมชื่อขั้นตอนที่มีช่องว่างจึงเขียนเป็น #\"Changed Type\"?", answer: "ภาษา M ต้องครอบชื่อ identifier ที่มีช่องว่างด้วย #\"...\" เพื่อให้ parser รู้ว่าเป็นชื่อขั้นตอนเดียวกัน."
  },
  {
    id: "deliver", number: "07", title: "การโหลด การจัดระเบียบ และการส่งมอบ",
    intro: "ทำ Query ให้คนอื่นรับช่วงต่อได้และให้ Refresh ได้อย่างมั่นใจ แม้ข้อมูลต้นทางมีการเปลี่ยนเล็กน้อย.",
    outcomes: ["เลือกวิธีโหลดที่ช่วยให้ไฟล์เล็กลง", "จัดระเบียบ Query ให้คนอื่นอ่านต่อได้", "ตั้งค่าและทดสอบการ Refresh ก่อนส่งมอบ"],
    conceptTitle: "โหลดเท่าที่ต้องใช้", concept: "ตารางที่เป็นเพียงข้อมูลอ้างอิงหรือขั้นตอนกลางควรเลือก Only Create Connection เพื่อลดขนาดไฟล์และไม่สร้างชีทที่ผู้ใช้ไม่จำเป็นต้องเห็น. โหลดเฉพาะผลลัพธ์ที่ใช้รายงานจริง.",
    steps: ["ตั้งชื่อ Query และ Applied Steps ให้สื่อความหมาย", "ใส่คำอธิบายให้ขั้นตอนที่มีเหตุผลธุรกิจ", "แยก Query ที่ยาวด้วย Extract Previous", "สร้างกลุ่มใน Queries pane", "ทดสอบปิด เปิด และ Refresh ด้วยข้อมูลต้นทางใหม่ก่อนส่งมอบ"],
    table: [["คำนำหน้าชื่อ", "ตัวอย่าง"], ["src_", "src_SalesFolder"], ["dim_", "dim_Customer"], ["fact_", "fact_Sales"], ["out_", "out_MonthlyReport"]],
    trap: "อย่าแก้ตัวเลขบนชีทผลลัพธ์โดยตรง เพราะ Refresh ครั้งถัดไปจะเขียนทับทุกอย่าง ต้องย้อนกลับไปแก้ที่ Query หรือข้อมูลต้นทาง.",
    quiz: "เมื่อใดควรใช้ Only Create Connection?", answer: "ใช้กับ Query ที่เป็นตารางอ้างอิง ขั้นตอนกลาง หรือผลลัพธ์ที่ไม่ต้องแสดงในชีท แต่ยังต้องใช้ให้ Query อื่นอ้างอิง."
  }
];

const principles = [
  ["Power Query ไม่ได้แก้ข้อมูล แต่บันทึกสูตรการแก้", "ทุกครั้งที่ Refresh ระบบอ่านข้อมูลต้นทางใหม่แล้วเล่น Applied Steps ซ้ำ."],
  ["ชีทคือปลายทาง ไม่ใช่ต้นทาง", "แก้ข้อมูลที่ Query หรือไฟล์ต้นทาง ไม่ใช่ตารางผลลัพธ์บนชีท."],
  ["ลำดับของขั้นตอนมีความหมาย", "Trim ก่อนลบแถวซ้ำ และตรวจชนิดข้อมูลก่อนคำนวณ."],
  ["ชนิดข้อมูลคือความถูกต้อง", "ข้อความรวมยอดและเรียงวันที่ได้ไม่เหมือนตัวเลขหรือวันที่จริง."],
  ["Error คือข้อความตอบกลับ", "อ่านเหตุผล ข้อความ และ Details ก่อนเปลี่ยนอะไร."],
  ["จำนวนแถวคือเครื่องมือตรวจสอบ", "ดู row count ก่อนและหลังขั้นตอนสำคัญ โดยเฉพาะ Merge และ Filter."]
];

const esc = (text) => String(text).replace(/[&<>"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[char]));
const table = (rows) => `<table class="data-table"><thead><tr>${rows[0].map(c => `<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>${rows.slice(1).map(row => `<tr>${row.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const stored = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const completed = () => stored("pq-completed", []);
const setViewHash = (value) => { location.hash = value; };

const codeBlock = (text) => `<pre class="code-block">${esc(text)}</pre>`;
const reveal = (openLabel, closeLabel, innerHtml) => `<button type="button" class="reveal-btn" data-open="${esc(openLabel)}" data-close="${esc(closeLabel)}">${esc(openLabel)}</button><div class="reveal-panel">${innerHtml}</div>`;
const zipLink = (folder, label) => `<a class="zip-link" href="data-files/${encodeURIComponent(folder)}.zip" download>⬇ ${esc(label || `ดาวน์โหลดไฟล์ข้อมูล ${folder}`)}</a>`;
const MASCOT_REFRESH_URL = "https://liff.line.me/2011577141-9ukdVg3q";

function renderNav() {
  const chapterLinks = chapters.map(c => `<button class="nav-link" data-view="chapter" data-id="${c.id}"><span class="nav-number">${c.number}</span>${esc(c.title)}</button>`).join("");
  const exerciseLinks = exercisesData.map(e => `<button class="nav-link" data-view="exercise" data-id="${e.id}"><span class="nav-number">${String(e.id).padStart(2, "0")}</span>${esc(e.title)}</button>`).join("");
  document.querySelector("#chapter-nav").innerHTML = `
    <div class="nav-group-label">คู่มือผู้เรียน · 7 บท</div>
    ${chapterLinks}
    <div class="nav-group-label">ห้องเรียน</div>
    <button class="nav-link" data-view="slides"><span class="nav-number">▤</span>สไลด์บรรยาย (87 แผ่น)</button>
    <div class="nav-group-label">แบบฝึกหัด · 7 ชุด</div>
    ${exerciseLinks}
    <button class="nav-link" data-view="workshop"><span class="nav-number">★</span>Workshop สุดท้าย</button>
    <div class="nav-group-label">วัดผลและทรัพยากร</div>
    <button class="nav-link" data-view="assessment"><span class="nav-number">✎</span>แบบทดสอบและความมั่นใจ</button>
    <button class="nav-link" data-view="datafiles"><span class="nav-number">⇩</span>ไฟล์ฝึกปฏิบัติ</button>
  `;
}

function renderHome() {
  const done = completed().length;
  const workspaceCards = [
    ["slides", null, "▤", "สไลด์บรรยาย", "87 แผ่นที่ใช้สอนจริงทั้ง 8 ชั่วโมง พร้อมโน้ตผู้สอนสรุปในทุกแผ่น"],
    ["exercise", "1", "✎", "แบบฝึกหัด 7 ชุด", "ลงมือทำระหว่างเรียน พร้อมเกณฑ์ตรวจคำตอบด้วยตัวเองและเฉลยโค้ด M"],
    ["workshop", null, "★", "Workshop สุดท้าย", "โจทย์รายงานยอดขายครึ่งปี ไทยเฟรช เทรดดิ้ง พร้อมเกณฑ์ประเมิน 100 คะแนน"],
    ["assessment", null, "✓", "แบบทดสอบและความมั่นใจ", "ทำก่อน–หลังเรียนเพื่อดูว่าความเข้าใจเปลี่ยนไปแค่ไหน"],
    ["datafiles", null, "⇩", "ไฟล์ฝึกปฏิบัติ", "ดาวน์โหลดชุดข้อมูลตัวอย่างของทุกบทเรียนไปฝึกกับ Excel จริง"],
  ];
  return `<section class="hero" id="start"><div><div class="eyebrow">ห้องเรียนออนไลน์ 8 ชั่วโมง · กรณีศึกษา ไทยเฟรช เทรดดิ้ง</div><h1>ห้องเรียนที่ทำให้<br>งานซ้ำ ๆ จบด้วย Refresh</h1><p class="lede">ครบทั้งคู่มือ สไลด์บรรยาย แบบฝึกหัด Workshop สุดท้าย และแบบทดสอบ ใช้ระหว่างเรียนและกลับมาเปิดเมื่อเจองานจริง เป้าหมายไม่ใช่จำทุกเมนู แต่คือสร้างขั้นตอนที่เชื่อถือได้และทำงานซ้ำแทนคุณ.</p><div class="hero-meta"><span class="tag">7 บทเรียน</span><span class="tag">87 สไลด์</span><span class="tag">แบบฝึกหัด 7 ชุด</span><span class="tag">Workshop สุดท้าย</span><span class="tag">แบบทดสอบก่อน–หลัง</span></div><div class="progress-wrap"><div class="progress-label"><span>ความคืบหน้าบทเรียนคู่มือ</span><span>${done} / ${chapters.length} บท</span></div><div class="progress"><i style="width:${done / chapters.length * 100}%"></i></div></div></div><a class="hero-mascot-link" href="${MASCOT_REFRESH_URL}" title="คลิกมาสคอตเพื่อรีเฟรชโปรแกรม"><img class="hero-mascot" src="assets/mascot.jpg" alt="Power Bot มาสคอตประจำห้องเรียน Excel Power Query — คลิกเพื่อรีเฟรชโปรแกรม" /></a></section>
  <section><div class="eyebrow">ห้องเรียนของคุณ</div><h2>ทุกอย่างที่ใช้ในคอร์สอยู่ในที่เดียว</h2>
  <div class="workspace-grid">${workspaceCards.map(([view, id, icon, title, desc]) => `<button class="workspace-card" data-view="${view}" ${id ? `data-id="${id}"` : ""}><span class="workspace-icon">${icon}</span><strong>${esc(title)}</strong><small>${esc(desc)}</small></button>`).join("")}</div></section>
  <section class="home-grid"><div><div class="eyebrow">เริ่มจากบทเรียน</div><h2>เรียนทีละบท แล้วลองกับงานของตัวเอง</h2><div class="chapter-list">${chapters.map(c => `<button class="chapter-row" data-view="chapter" data-id="${c.id}"><span class="number">${c.number}</span><span><strong>${esc(c.title)}</strong><small>${esc(c.intro)}</small></span><span class="row-arrow">→</span></button>`).join("")}</div></div><div><div class="eyebrow">จำไว้ก่อนเริ่ม</div><h2>หกภาพในหัวที่ถูกต้อง</h2>${principles.map(p => `<article class="principle"><strong>${esc(p[0])}</strong><p>${esc(p[1])}</p></article>`).join("")}</div></section>`;
}

function renderChapter(id) {
  const c = chapters.find(item => item.id === id) || chapters[0];
  const isDone = completed().includes(c.id);
  return `<section class="chapter-header"><div><div class="eyebrow">บทที่ ${c.number}</div><h1>${esc(c.title)}</h1><p class="lede">${esc(c.intro)}</p></div><div class="chapter-no">CHAPTER ${c.number}</div></section>
  <section class="content-grid"><div><div class="learning"><h3>เมื่อจบบทนี้ คุณจะทำสิ่งเหล่านี้ได้</h3><ul>${c.outcomes.map(item => `<li>${esc(item)}</li>`).join("")}</ul></div><h3>${esc(c.conceptTitle)}</h3><p>${esc(c.concept)}</p><h3>ขั้นตอนที่ต้องทำให้คล่อง</h3><ol class="steps">${c.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol>${table(c.table)}<div class="trap"><strong>กับดักของบทนี้</strong><br>${esc(c.trap)}</div><div class="checklist"><label class="check-item ${isDone ? "done" : ""}"><input class="chapter-check" data-id="${c.id}" type="checkbox" ${isDone ? "checked" : ""}><span>ฉันเรียนและลองทำบทนี้กับข้อมูลตัวอย่างแล้ว</span></label></div><div class="quiz"><div class="eyebrow">ทดสอบตัวเอง</div><h3>${esc(c.quiz)}</h3><button class="reveal-answer">แสดงแนวคำตอบ</button><div class="quiz-answer">${esc(c.answer)}</div></div></div><aside class="side-note"><strong>ก่อน Refresh ทุกครั้ง</strong>ตรวจว่า Query อยู่ที่ขั้นตอนสุดท้าย จำนวนแถวสมเหตุสมผล และไม่มี Error ที่ Column Quality.</aside></section>`;
}

function renderPlan() {
  const fields = stored("pq-plan", {});
  const week = (number, title, copy, items) => `<article class="week"><div class="eyebrow">สัปดาห์ ${number}</div><h3>${title}</h3><p>${copy}</p><ul class="plain-list">${items.map(i => `<li>${i}</li>`).join("")}</ul></article>`;
  return `<section><div class="eyebrow">หลังจบคอร์ส</div><h1>แผน 30 วัน</h1><p class="lede">เลือกงานที่น่ารำคาญที่สุด ไม่ใช่งานใหญ่ที่สุด: งานซ้ำทุกสัปดาห์หรือทุกเดือน ใช้เวลาอย่างน้อย 30 นาที และมีขั้นตอนคล้ายเดิมทุกครั้ง.</p><div class="plan-grid">${week(1, "ลงมือกับงานจริง", "เลือกงานเล็กพอที่จะเริ่มได้ทันที", ["รวมรายงานจากหลายสาขา", "ทำความสะอาดไฟล์ export", "แทนที่ copy-paste รายเดือน"])}${week(2, "ทำให้มันทำงานเอง", "พิสูจน์ว่า Refresh แล้วได้ผลลัพธ์เดิม", ["เติมข้อมูลใหม่แล้ว Refresh All", "ใช้ Only Create Connection", "ตั้งชื่อและจัดกลุ่ม Query"])}${week(3, "สอนคนอื่นหนึ่งคน", "อธิบาย 15 นาทีจะเผยช่องโหว่ในความเข้าใจ", ["ให้เพื่อนลอง Refresh", "ดูว่าเขาติดตรงไหน", "เขียนที่มาของไฟล์ไว้ในชีท"])}${week(4, "ขยายผล", "นำวิธีเดิมไปใช้กับงานที่สอง", ["เลือกงานที่คล้ายงานแรก", "แยกกติกาที่ใช้ซ้ำ", "กลับมาทบทวนคู่มือ"])} </div><h2>งานจริงที่คุณจะเริ่ม</h2><form id="plan-form" class="form-grid"><div class="field full"><label for="project">งานที่ฉันจะทำใหม่ด้วย Power Query คือ</label><input id="project" name="project" value="${esc(fields.project || "")}" placeholder="เช่น รวมไฟล์ยอดขายรายเดือน" /></div><div class="field"><label for="minutes">ปกติงานนี้ใช้เวลา (นาที)</label><input id="minutes" name="minutes" inputmode="numeric" value="${esc(fields.minutes || "")}" /></div><div class="field"><label for="source">ข้อมูลต้นทางอยู่ที่ไหน</label><input id="source" name="source" value="${esc(fields.source || "")}" /></div><div class="field"><label for="start">วันที่เริ่มลงมือ</label><input id="start" name="start" type="date" value="${esc(fields.start || "")}" /></div><div class="field"><label for="support">คนที่ฉันจะบอก</label><input id="support" name="support" value="${esc(fields.support || "")}" /></div><button class="primary-button" type="submit">บันทึกแผนของฉัน</button></form><h2 style="margin-top:48px">ทบทวนแบบเว้นระยะ</h2><div class="review-grid"><article class="review"><strong>วันที่ 1</strong><p>เล่าลำดับการทำความสะอาด อธิบาย Merge กับ Append และรวมไฟล์ 3 ไฟล์ให้ได้ภายใน 10 นาที.</p></article><article class="review"><strong>วันที่ 7</strong><p>อธิบาย Trim ก่อนลบแถวซ้ำ เขียน let ... in และบอกเวลาที่ควรใช้ Only Create Connection.</p></article><article class="review"><strong>วันที่ 30</strong><p>อ่าน M code ของตัวเองทุกบรรทัด ตรวจรายการส่งมอบ และบันทึกเวลาที่ประหยัดได้.</p></article></div></section>`;
}

function renderCheatsheet() {
  const code = [
    ["จัดการตาราง", `Table.PromoteHeaders(t)\nTable.SelectRows(t, each ...)\nTable.SelectColumns(t, {"a", "b"})\nTable.RemoveColumns(t, {"a"})\nTable.Distinct(t, {"คีย์"})\nTable.AddColumn(t, "ชื่อ", each ...)\nTable.Skip(t, 4)\nTable.RowCount(t)`],
    ["รวมและพลิกตาราง", `Table.NestedJoin(t1, {"k"}, t2, {"k"}, "ใหม่", JoinKind.LeftOuter)\nTable.ExpandTableColumn(t, "ใหม่", {"คอลัมน์ที่ต้องการ"})\nTable.Combine({t1, t2, t3})\nTable.UnpivotOtherColumns(t, {"คงไว้"}, "Attribute", "Value")\nTable.Pivot(t, รายการค่า, "คอลัมน์", "ค่า")\nTable.Group(t, {"ภาค"}, {{"ยอดรวม", each List.Sum([ยอด]), type number}})`],
    ["ข้อความ ตัวเลข และวันที่", `Text.Trim(x)     Text.Clean(x)     Text.Upper(x)\nText.Proper(x)   Text.StartsWith(x, "FR")\nText.Replace(x, "เก่า", "ใหม่")\nNumber.Round(x, 2)\nDate.Year(d)     Date.Month(d)\nDate.StartOfMonth(d)\nDate.ToText(d, "yyyy-MM")`],
    ["ตรรกะ รายการ และ Error", `if ... then ... else ...\nand    or    not\n[คอลัมน์] = null\ntry ... otherwise ค่าสำรอง\nList.Sum({...})  List.Max({...})\n#"ชื่อ ที่มีช่องว่าง"\n#shared`]
  ];
  return `<section><div class="eyebrow">Reference</div><h1>M Cheat Sheet</h1><p class="lede">ไม่ต้องจำทั้งหมดในครั้งแรก เริ่มจำ 5 ตัวนี้ก่อน: <code>Text.Trim</code>, <code>Table.SelectRows</code>, <code>Table.AddColumn</code>, <code>Date.StartOfMonth</code> และ <code>try otherwise</code>.</p>${code.map(([title, value]) => `<h2 style="margin-top:42px">${title}</h2><pre class="code-block">${esc(value)}</pre>`).join("")}<div class="side-note"><strong>หาฟังก์ชันโดยไม่ต้องท่อง</strong>สร้าง Blank Query แล้วพิมพ์ <code>= #shared</code> ในแถบสูตร จากนั้นกรองด้วยคำที่ต้องการ เช่น <code>Date.</code> หรือ <code>Text.</code>.</div></section>`;
}

function renderTroubleshoot() {
  return `<section><div class="eyebrow">คู่มือแก้ปัญหา</div><h1>เปิดหน้านี้ทุกครั้งที่ติด</h1><p class="lede">ก่อนแก้ ให้แยกก่อนว่าเป็น Error ระดับขั้นตอน หรือ Error ในบางเซลล์ แล้วดูจำนวนแถวว่ามากหรือน้อยกว่าที่ควร.</p><h2>อ่านข้อความ Error ให้เป็น</h2>${table([["ส่วนของข้อความ", "อ่านหาอะไร"], ["เหตุผล", "ก่อนเครื่องหมายทวิภาค เช่น Expression.Error"], ["ข้อความ", "คำอธิบายว่าอะไรผิด เช่น ไม่พบคอลัมน์"], ["Details", "ชื่อคอลัมน์ ค่า หรือ object ที่เป็นต้นเหตุ"]])}<h2>ตรวจตามจำนวนแถว</h2>${table([["อาการ", "สาเหตุที่พบบ่อย"], ["แถวมากกว่าที่ควร", "ลบซ้ำก่อน Trim, key ในตารางอ้างอิงซ้ำ, Split into Rows โดยไม่ตั้งใจ"], ["แถวน้อยกว่าที่ควร", "ใช้ Inner Join, วันที่แปลงไม่ได้แล้วถูกกรอง, มี Filter ค้าง"], ["แถวตรงแต่ยอดไม่ตรง", "สูตรผิด, คอลัมน์ยังเป็นข้อความ, ลำดับเงื่อนไขผิด"]])}<h2>สามทางเลือกเมื่อ Error อยู่ในเซลล์</h2><ol class="steps"><li>แก้ข้อมูลต้นทาง เมื่อ Error คือข้อมูลผิดจริง</li><li>แทนค่าหรือทำความสะอาด เมื่อมีรูปแบบที่คาดเดาได้</li><li>เก็บ Error ไว้เป็น Query แยก เมื่อ Error เป็นสัญญาณให้ธุรกิจตรวจสอบ</li></ol></section>`;
}

function hourNumOf(slide) {
  const m = /^ชั่วโมงที่\s*(\d+)/.exec(slide.hour || "");
  return m ? parseInt(m[1], 10) : null;
}

function buildAgendaSections() {
  const introSlides = slidesData.filter(s => s.session.startsWith("Course Intro"));
  const appendixSlides = slidesData.filter(s => s.session.startsWith("ภาคผนวก"));
  // session-divider slides carry no hour of their own — fold each into the hour it originally introduced
  const dividerHourMap = { "Session 1 Divider": 1, "Session 2 Divider": 4, "Session 3 Divider": 7 };
  const sections = [{ type: "intro", title: "ก่อนเริ่มเรียน", slides: introSlides }];
  courseAgenda.forEach(sess => {
    const rows = sess.items.map(item => {
      if (item.break) return { type: "break", duration: item.duration };
      const dividers = slidesData.filter(s => dividerHourMap[s.title] === item.hour);
      const hourSlides = slidesData.filter(s => hourNumOf(s) === item.hour);
      return { type: "hour", ...item, slides: [...dividers, ...hourSlides] };
    });
    sections.push({ type: "session", title: sess.session, subtitle: sess.sessionEn, rows });
  });
  sections.push({ type: "appendix", title: "ภาคผนวก และปิดคอร์ส", slides: appendixSlides });
  return sections;
}

function agendaContextFor(slide) {
  const hourNum = hourNumOf(slide);
  if (hourNum != null) {
    const sess = courseAgenda.find(s => s.items.some(it => it.hour === hourNum));
    if (sess) return `${sess.session} · ${slide.hour}`;
  }
  return slide.hour ? `${slide.session} · ${slide.hour}` : slide.session;
}

const slideRow = (s) => `<button class="chapter-row" data-view="slides" data-id="${s.n}"><span class="number">${s.n}</span><span><strong>${esc(s.title)}</strong></span><span class="row-arrow">→</span></button>`;

function renderSlideJump(currentN) {
  const sections = buildAgendaSections();
  const optgroupFor = (title, slides) => slides.length ? `<optgroup label="${esc(title)}">${slides.map(s => `<option value="${s.n}" ${s.n === currentN ? "selected" : ""}>${s.n}. ${esc(s.title)}</option>`).join("")}</optgroup>` : "";
  let html = optgroupFor(sections[0].title, sections[0].slides);
  sections.filter(s => s.type === "session").forEach(sess => {
    sess.rows.forEach(row => { if (row.type === "hour") html += optgroupFor(`${sess.title} · ชั่วโมงที่ ${row.hour}`, row.slides); });
  });
  const appendixSection = sections[sections.length - 1];
  html += optgroupFor(appendixSection.title, appendixSection.slides);
  return `<select id="slide-jump" class="slide-jump">${html}</select>`;
}

function renderSlides(id) {
  const n = parseInt(id, 10);
  const slide = slidesData.find(s => s.n === n);
  if (!slide) {
    const sections = buildAgendaSections();
    const introHtml = `<h2 style="margin-top:36px">${esc(sections[0].title)}</h2><div class="chapter-list">${sections[0].slides.map(slideRow).join("")}</div>`;
    const sessionsHtml = sections.filter(s => s.type === "session").map(sess => `
      <h2 style="margin-top:36px">${esc(sess.title)}</h2>
      <p class="lede" style="font-size:14px;margin-top:-6px">${esc(sess.subtitle)}</p>
      ${sess.rows.map(row => row.type === "break"
        ? `<div class="agenda-break">พัก ${esc(row.duration)}</div>`
        : `<h3>${esc((row.slides.find(s => s.hour) || {}).hour || `ชั่วโมงที่ ${row.hour}`)}</h3>
           <p class="agenda-hour-meta">${esc(row.objective)} · กิจกรรม: ${esc(row.activity)} · ${esc(row.duration)}</p>
           <div class="chapter-list">${row.slides.map(slideRow).join("")}</div>`
      ).join("")}
    `).join("");
    const appendixSection = sections[sections.length - 1];
    const appendixHtml = `<h2 style="margin-top:36px">${esc(appendixSection.title)}</h2><div class="chapter-list">${appendixSection.slides.map(slideRow).join("")}</div>`;
    return `<section><div class="eyebrow">ห้องเรียน</div><h1>สไลด์บรรยาย 87 แผ่น</h1><p class="lede">สไลด์ต้นฉบับที่ใช้บรรยายทั้ง 8 ชั่วโมง จัดเรียงตามกำหนดการสอนจริง พร้อมสรุปโน้ตผู้สอนในแต่ละแผ่น เลือกหัวข้อที่ต้องการทบทวน หรือกด "เริ่มดูตั้งแต่ต้น" เพื่อไล่ดูทีละแผ่น</p>
    <button class="primary-button" data-view="slide-start" style="margin-bottom:28px">▶ เริ่มดูตั้งแต่แผ่นที่ 1</button>
    ${introHtml}${sessionsHtml}${appendixHtml}
    </section>`;
  }
  const idx = slidesData.findIndex(s => s.n === n);
  const prev = slidesData[idx - 1];
  const next = slidesData[idx + 1];
  return `<section class="slide-deck">
    <div class="slide-toolbar">
      <button class="ghost-button" data-view="slides">← สารบัญสไลด์</button>
      <span class="slide-counter">สไลด์ ${slide.n} / ${slidesData.length}</span>
      ${renderSlideJump(slide.n)}
    </div>
    <div class="slide-context">${esc(agendaContextFor(slide))}</div>
    <div class="slide-card">
      <h1>${esc(slide.title)}</h1>
      <div class="slide-body">${slide.bodyHtml}</div>
    </div>
    <button type="button" class="reveal-btn" data-open="แสดงโน้ตผู้สอน" data-close="ซ่อนโน้ตผู้สอน">แสดงโน้ตผู้สอน</button>
    <div class="reveal-panel notes-panel">${slide.notesHtml || "<p>ไม่มีโน้ตเพิ่มเติมสำหรับแผ่นนี้</p>"}</div>
    <div class="slide-nav-buttons">
      <button class="ghost-button" data-view="slides" data-id="${prev ? prev.n : slide.n}" ${prev ? "" : "disabled"}>← แผ่นก่อนหน้า</button>
      <button class="primary-button" data-view="slides" data-id="${next ? next.n : slide.n}" ${next ? "" : "disabled"}>แผ่นถัดไป →</button>
    </div>
  </section>`;
}

function solutionsBlock(solutions) {
  if (!solutions || !solutions.length) return "";
  const inner = solutions.map(s => `<h4>${esc(s.label)}</h4>${codeBlock(s.code)}`).join("");
  return `<div class="solution-wrap">${reveal("ดูเฉลยโค้ด M", "ซ่อนเฉลยโค้ด M", inner)}</div>`;
}

function renderExercise(id) {
  const idx = exercisesData.findIndex(e => e.id === parseInt(id, 10));
  const e = exercisesData[idx] || exercisesData[0];
  const prev = exercisesData[idx - 1];
  const next = exercisesData[idx + 1];
  return `<section class="chapter-header"><div><div class="eyebrow">แบบฝึกหัดที่ ${e.id} · ${esc(e.time)}</div><h1>${esc(e.title)}</h1><p class="lede">${esc(e.hour)}</p></div><div class="chapter-no">EX ${String(e.id).padStart(2, "0")}</div></section>
  <section class="content-grid"><div>
  <p><strong>ไฟล์ที่ใช้:</strong> ${esc(e.files)} ${e.folder ? zipLink(e.folder, "ดาวน์โหลดไฟล์ประกอบชุดนี้") : ""}</p>
  ${e.intro ? `<p>${esc(e.intro)}</p>` : ""}
  <h3>โจทย์</h3>
  <ol class="steps">${e.tasks.map(t => /^(ส่วนที่|ข้อควรระวัง)/.test(t) ? `</ol><p><strong>${esc(t)}</strong></p><ol class="steps">` : `<li>${esc(t)}</li>`).join("")}</ol>
  ${e.hint ? `<div class="side-note" style="position:static;margin:20px 0"><strong>คำใบ้</strong>${esc(e.hint)}</div>` : ""}
  <h3>เกณฑ์ตรวจคำตอบด้วยตัวเอง</h3>
  ${table(e.checks)}
  ${e.hrCase ? `<h3>คำตอบของกรณีศึกษา HR</h3>${table(e.hrCase)}` : ""}
  ${e.challenge && e.challenge.length ? `<h3>ข้อท้าทายเพิ่มเติม</h3><ul>${e.challenge.map(c => `<li>${esc(c)}</li>`).join("")}</ul>` : ""}
  ${e.pitfalls && e.pitfalls.length ? `<div class="trap"><strong>จุดที่ผู้เรียนพลาดบ่อย</strong><ul style="margin:8px 0 0;padding-left:18px">${e.pitfalls.map(p => `<li>${esc(p)}</li>`).join("")}</ul></div>` : ""}
  <h3>เฉลย</h3>
  <p class="lede" style="font-size:14px">แนะนำให้ลองทำเองจนสุดความสามารถก่อนเปิดดูเฉลย โค้ดในเอกสารเป็นเพียงหนึ่งในหลายวิธีที่ถูกต้อง</p>
  ${solutionsBlock(e.solutions)}
  <div class="exercise-pager">
    ${prev ? `<button class="ghost-button" data-view="exercise" data-id="${prev.id}">← แบบฝึกหัดที่ ${prev.id}</button>` : "<span></span>"}
    ${next ? `<button class="primary-button" data-view="exercise" data-id="${next.id}">แบบฝึกหัดที่ ${next.id} →</button>` : `<button class="primary-button" data-view="workshop">ไป Workshop สุดท้าย →</button>`}
  </div>
  </div><aside class="side-note"><strong>กติกาสำคัญ 3 ข้อ</strong>1) แก้ที่ Power Query Editor เสมอ อย่าแก้ตัวเลขในชีทตรง ๆ<br>2) ตั้งชนิดข้อมูลให้ครบก่อนถือว่างานเสร็จ<br>3) จดจำนวนแถวก่อนและหลังทุกขั้นตอนสำคัญ</aside></section>`;
}

function renderWorkshop() {
  const w = workshopFinalData;
  return `<section class="chapter-header"><div><div class="eyebrow">ชั่วโมงที่ 8 · ${esc(w.meta)}</div><h1>${esc(w.title)}</h1><p class="lede">${esc(w.subtitle)}</p></div><div class="chapter-no">FINAL</div></section>
  <section class="content-grid"><div>
  <h3>สถานการณ์สมมติ</h3><p>${esc(w.scenario)}</p>
  <div class="trap"><strong>ภารกิจที่แท้จริง</strong>${esc(w.mission)}</div>
  <h3>ข้อมูลที่ได้รับ และปัญหาที่ซ่อนอยู่</h3>
  ${table(w.dataTable)}
  <p>${esc(w.columnNote)}</p>
  <p>${zipLink(w.folder, "ดาวน์โหลดไฟล์ข้อมูล Workshop สุดท้าย")}</p>
  <h3>ผลลัพธ์ที่ต้องส่ง</h3>
  ${w.deliverables.map(d => `<h4>${esc(d.heading)}</h4>${d.body ? `<p>${esc(d.body)}</p>` : ""}${d.rows ? table(d.rows) : ""}${d.bullets ? `<ul>${d.bullets.map(b => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}`).join("")}
  <h3>แผนการทำงาน 8 ขั้น</h3>
  <ol class="steps">${w.plan.map(([h, b]) => `<li><strong>${esc(h)}</strong><br>${esc(b)}</li>`).join("")}</ol>
  <h3>เกณฑ์ประเมินผลงาน (100 คะแนน)</h3>
  ${table(w.rubric)}
  <div class="side-note" style="position:static;margin:20px 0"><strong>ข้อท้าทายเพิ่มคะแนน</strong>${esc(w.bonus)}</div>
  <h3>ตัวเลขที่ใช้ตรวจคำตอบ</h3>
  <ul>${w.checkNumbers.map(c => `<li>${esc(c)}</li>`).join("")}</ul>
  <p><strong>ถ้าตัวเลขไม่ตรง ให้ไล่ตรวจตามลำดับนี้:</strong></p>
  <ol class="steps">${w.diagnostics.map(d => `<li>${esc(d)}</li>`).join("")}</ol>
  <p>${esc(w.closing)}</p>
  <h3>เฉลย Workshop สุดท้าย</h3>
  ${reveal("ดูตัวเลขคำตอบที่ถูกต้อง", "ซ่อนตัวเลขคำตอบ", table(w.answerNumbers))}
  <div style="margin-top:14px">${solutionsBlock(w.solutionCode)}</div>
  <h4 style="margin-top:24px">เมื่อตัวเลขของคุณไม่ตรงกับเฉลย</h4>
  ${table(w.diagnosticTable)}
  </div><aside class="side-note"><strong>ก่อนเริ่ม Workshop</strong>ทำแบบฝึกหัดที่ 1–7 ให้ครบก่อน เพราะ Workshop นี้รวมทุกทักษะเข้าด้วยกัน — Merge, Unpivot, คอลัมน์คำนวณ, การจัดระเบียบ Query และ Refresh</aside></section>`;
}

function quizState(mode) { return stored(`pq-quiz-${mode}`, null); }

function renderQuizTab(mode) {
  const existing = quizState(mode);
  const modeLabel = mode === "pre" ? "ก่อนเรียน (Pre-test)" : "หลังเรียน (Post-test)";
  const other = quizState(mode === "pre" ? "post" : "pre");
  let resultHtml = "";
  if (existing) {
    resultHtml = `<div class="quiz-result">
      <p><strong>คะแนนของคุณ (${esc(modeLabel)}):</strong> ${existing.score} / ${quizQuestions.length} — เลือก "ยังไม่ทราบ" ${existing.unknown} ข้อ</p>
      ${other ? `<p>เทียบกับอีกรอบ: ${other.score} / ${quizQuestions.length} (${mode === "pre" ? "หลังเรียน" : "ก่อนเรียน"}) — ส่วนต่าง ${mode === "pre" ? other.score - existing.score : existing.score - other.score} คะแนน</p>` : ""}
      <h4>ทบทวนรายข้อ</h4>
      <ol class="steps">${quizQuestions.map((q, i) => `<li><strong>${esc(q.q)}</strong><br>คำตอบของคุณ: ${esc(q.choices[existing.answers[i]] ?? "ไม่ได้ตอบ")} ${existing.answers[i] === q.answer ? "✓ ถูกต้อง" : `✗ คำตอบที่ถูกคือ "${esc(q.choices[q.answer])}"`}<br><small class="muted">วัด: ${esc(q.topic)} (ชั่วโมงที่ ${esc(q.hour)})</small></li>`).join("")}</ol>
      <button type="button" class="ghost-button" data-action="retake-quiz" data-mode="${mode}">ทำแบบทดสอบชุดนี้ใหม่</button>
    </div>`;
  } else {
    resultHtml = `<form id="quiz-form" data-mode="${mode}">
      <ol class="steps">${quizQuestions.map((q, i) => `<li><strong>${esc(q.q)}</strong>
        <div class="choice-list">${q.choices.map((c, ci) => `<label class="choice-row"><input type="radio" name="q${i}" value="${ci}" required>${esc(c)}</label>`).join("")}</div>
      </li>`).join("")}</ol>
      <button class="primary-button" type="submit">ส่งคำตอบ (${modeLabel})</button>
    </form>`;
  }
  return `<div class="quiz-intro"><p>${esc(assessmentIntro.why)}</p></div>${resultHtml}`;
}

function renderConfidenceTab(mode) {
  const key = `pq-confidence-${mode}`;
  const existing = stored(key, null);
  const modeLabel = mode === "pre" ? "ก่อนเรียน" : "หลังเรียน";
  if (existing) {
    const avg = (existing.ratings.reduce((a, b) => a + b, 0) / existing.ratings.length).toFixed(1);
    return `<div class="quiz-result"><p><strong>ความมั่นใจเฉลี่ย (${esc(modeLabel)}):</strong> ${avg} / 5</p>
    <ol class="steps">${confidenceItems.map((c, i) => `<li>${esc(c)} — <strong>${existing.ratings[i]} / 5</strong></li>`).join("")}</ol>
    ${existing.intention ? `<p><strong>ความตั้งใจนำไปใช้:</strong> ${existing.intention.score} / 5<br>งานที่ตั้งใจจะทำ: ${esc(existing.intention.project || "-")}<br>สิ่งที่อาจทำให้ไม่ได้ลงมือ: ${esc(existing.intention.blocker || "-")}</p>` : ""}
    <button type="button" class="ghost-button" data-action="retake-confidence" data-mode="${mode}">ทำแบบประเมินนี้ใหม่</button>
    </div>`;
  }
  return `<form id="confidence-form" data-mode="${mode}">
    <p class="lede" style="font-size:14px">ให้คะแนนความมั่นใจของคุณในแต่ละข้อ 1 = ทำไม่ได้เลย และ 5 = ทำได้เองอย่างมั่นใจ</p>
    <ol class="steps">${confidenceItems.map((c, i) => `<li>ฉันสามารถ...${esc(c)}
      <div class="scale-row">${[1, 2, 3, 4, 5].map(v => `<label class="scale-choice"><input type="radio" name="c${i}" value="${v}" required>${v}</label>`).join("")}</div>
    </li>`).join("")}</ol>
    ${mode === "post" ? `<h4>เฉพาะครั้งหลังเรียน — ความตั้งใจนำไปใช้</h4>
    <p>ฉันตั้งใจจะนำสิ่งที่เรียนไปใช้กับงานจริงภายในสองสัปดาห์</p>
    <div class="scale-row">${[1, 2, 3, 4, 5].map(v => `<label class="scale-choice"><input type="radio" name="intentionScore" value="${v}" required>${v}</label>`).join("")}</div>
    <div class="field full" style="margin-top:12px"><label>งานที่ฉันตั้งใจจะเอาไปทำใหม่ด้วย Power Query คือ</label><input name="project" /></div>
    <div class="field full" style="margin-top:12px"><label>สิ่งที่อาจทำให้ฉันไม่ได้ลงมือ คือ</label><input name="blocker" /></div>` : ""}
    <button class="primary-button" type="submit" style="margin-top:18px">บันทึกแบบประเมิน (${esc(modeLabel)})</button>
  </form>`;
}

function renderFollowupTab() {
  const existing = stored("pq-followup", null);
  if (existing) {
    return `<div class="quiz-result"><p>บันทึกแบบติดตาม 30 วันไว้แล้วเมื่อ ${esc(new Date(existing.savedAt).toLocaleDateString("th-TH"))}</p>
    <ol class="steps">${followupQuestions.map((q, i) => `<li>${esc(q.q)}<br><strong>${esc(Array.isArray(existing.answers[i]) ? existing.answers[i].join(", ") : (existing.answers[i] || "-"))}</strong></li>`).join("")}</ol>
    <button type="button" class="ghost-button" data-action="retake-followup">กรอกแบบติดตามใหม่</button>
    </div>`;
  }
  return `<form id="followup-form">
    <ol class="steps">${followupQuestions.map((q, i) => {
      if (q.type === "text") return `<li>${esc(q.q)}<input name="f${i}" class="text-answer" /></li>`;
      const inputType = q.type === "multi" ? "checkbox" : "radio";
      return `<li>${esc(q.q)}${q.note ? `<br><small class="muted">${esc(q.note)}</small>` : ""}
      <div class="choice-list">${q.choices.map(c => `<label class="choice-row"><input type="${inputType}" name="f${i}" value="${esc(c)}">${esc(c)}</label>`).join("")}</div></li>`;
    }).join("")}</ol>
    <button class="primary-button" type="submit">บันทึกแบบติดตาม 30 วัน</button>
  </form>`;
}

function renderAssessment(tab, mode) {
  const t = tab || "quiz";
  const m = mode || "pre";
  const tabs = [
    ["quiz", "แบบทดสอบความรู้ 15 ข้อ"],
    ["confidence", "ความมั่นใจในการลงมือทำ"],
    ["followup", "ติดตาม 30 วัน"],
  ];
  const body = t === "confidence" ? renderConfidenceTab(m) : t === "followup" ? renderFollowupTab() : renderQuizTab(m);
  const modeSwitch = t !== "followup" ? `<div class="mode-switch">
    <button class="ghost-button ${m === "pre" ? "active" : ""}" data-view="assessment" data-id="${t}" data-sub="pre">ก่อนเรียน</button>
    <button class="ghost-button ${m === "post" ? "active" : ""}" data-view="assessment" data-id="${t}" data-sub="post">หลังเรียน</button>
  </div>` : "";
  return `<section><div class="eyebrow">วัดผลการเรียนรู้</div><h1>แบบทดสอบและความมั่นใจ</h1><p class="lede">${esc(assessmentIntro.howToUse)}</p>
  <div class="tab-row">${tabs.map(([id, label]) => `<button class="tab-btn ${t === id ? "active" : ""}" data-view="assessment" data-id="${id}" data-sub="pre">${esc(label)}</button>`).join("")}</div>
  ${modeSwitch}
  <div class="assessment-body">${body}</div>
  </section>`;
}

function renderDataFiles() {
  const folders = [
    ["01_Import", "ชั่วโมง 1–2", "TXT (คั่น Tab), CSV, XLSX, JSON (ซ้อนชั้น), HTML (สำหรับ From Web แบบออฟไลน์), ไฟล์ที่มีหัวรายงาน 4 บรรทัด, โฟลเดอร์รายเดือน 12 ไฟล์"],
    ["02_Cleaning", "ชั่วโมง 3", "ไฟล์ข้อมูลสกปรกที่มีปัญหาครบ 10 แบบโดยตั้งใจ + ตารางเทียบชื่อภาค"],
    ["03_Merge", "ชั่วโมง 4", "คำสั่งซื้อรายไตรมาส 4 ไฟล์, ทะเบียนลูกค้า/สินค้า, HR + Payroll (มีรหัสจับคู่ไม่ได้ทั้งสองฝั่งเพื่อสอน Anti Join)"],
    ["04_Reshape", "ชั่วโมง 5", "งบประมาณตารางกว้าง, ผลสำรวจ 3 ปี, ข้อมูลที่ต้อง Split, ข้อมูลแนวยาวสำหรับ Pivot"],
    ["05_Custom", "ชั่วโมง 6", "กติกาธุรกิจ: ส่วนลดขั้นบันได, ค่าขนส่งรายภาค, อัตราคอมมิชชัน"],
    ["06_FinalWorkshop", "ชั่วโมง 8", "ข้อมูลขายดิบ 6 เดือน + ทะเบียน 4 ไฟล์ + เป้าหมายรายภาค + วันหยุด 2026"],
  ];
  return `<section><div class="eyebrow">ทรัพยากรประกอบการเรียน</div><h1>ไฟล์ฝึกปฏิบัติ</h1>
  <p class="lede">ดาวน์โหลดไฟล์ตัวอย่างแล้วแตกไปไว้ที่ <code>C:\\PQTraining\\DataFiles\\</code> บนเครื่องของคุณ เพื่อให้ตรงกับเส้นทางที่อ้างอิงในแบบฝึกหัด สไลด์ และเฉลยทุกฉบับ</p>
  <p>${zipLink("all-data-files", "ดาวน์โหลดไฟล์ทั้งหมดในชุดเดียว")}</p>
  <div class="chapter-list">${folders.map(([f, hour, desc]) => `<div class="chapter-row" style="cursor:default"><span class="number">${esc(hour)}</span><span><strong>${esc(f)}</strong><small>${esc(desc)}</small></span><span>${zipLink(f, "ดาวน์โหลด")}</span></div>`).join("")}</div>
  <div class="side-note" style="position:static;margin-top:28px"><strong>ข้อกำหนดของเครื่อง</strong>Excel 2016 ขึ้นไป หรือ Microsoft 365 (Power Query ติดมาในตัวแล้ว) · Excel เวอร์ชัน 2010–2013 ต้องติดตั้ง Power Query Add-in แยกต่างหาก · Excel for Mac รองรับฟีเจอร์ไม่ครบ โดยเฉพาะ From Folder และ Data Model</div>
  </section>`;
}

function renderSearch(term) {
  const needle = term.trim().toLowerCase();
  if (!needle) return renderHome();
  const results = chapters.filter(c => Object.values(c).some(value => JSON.stringify(value).toLowerCase().includes(needle)));
  return `<section><div class="eyebrow">ค้นหา</div><h1>ผลลัพธ์สำหรับ “${esc(term)}”</h1><div class="search-results">${results.length ? results.map(c => `<article class="result"><button data-view="chapter" data-id="${c.id}">บทที่ ${c.number} · ${esc(c.title)}</button><p>${esc(c.intro)}</p></article>`).join("") : "<p>ยังไม่พบหัวข้อที่ตรงกัน ลองค้นหาคำ เช่น Merge, Trim, From Folder หรือ Error</p>"}</div></section>`;
}

function toast(message) { const el = document.querySelector("#toast-template").content.firstElementChild.cloneNode(true); el.textContent = message; document.body.append(el); setTimeout(() => el.remove(), 2400); }
function render() {
  const hash = location.hash.replace("#", "");
  const parts = hash.split("/");
  const view = parts[0];
  const id = parts[1];
  const sub = parts[2];
  const app = document.querySelector("#app");
  const search = document.querySelector("#search");
  const active = view === "chapter" || view === "exercise" ? id : (view === "slides" ? "" : "");
  document.querySelectorAll(".nav-link").forEach(el => {
    const isChapterOrExercise = (el.dataset.view === "chapter" || el.dataset.view === "exercise") && el.dataset.view === view;
    const isSingle = ["slides", "workshop", "assessment", "datafiles"].includes(el.dataset.view) && el.dataset.view === view;
    el.classList.toggle("active", (isChapterOrExercise && el.dataset.id === id) || isSingle);
  });
  app.innerHTML =
    view === "chapter" ? renderChapter(id) :
    view === "plan" ? renderPlan() :
    view === "cheatsheet" ? renderCheatsheet() :
    view === "troubleshoot" ? renderTroubleshoot() :
    view === "slides" ? renderSlides(id) :
    view === "exercise" ? renderExercise(id) :
    view === "workshop" ? renderWorkshop() :
    view === "assessment" ? renderAssessment(id, sub) :
    view === "datafiles" ? renderDataFiles() :
    search.value ? renderSearch(search.value) : renderHome();
  const sidebarEl = document.querySelector("#sidebar");
  if (!sidebarEl.classList.contains("pinned")) {
    sidebarEl.classList.remove("open");
    document.querySelector("#sidebar-backdrop").classList.remove("show");
  }
  window.scrollTo(0, 0);
}

renderNav();
document.addEventListener("click", event => {
  const target = event.target.closest("[data-view], .reveal-answer, .reveal-btn, [data-action]");
  if (!target) return;
  if (target.classList.contains("reveal-answer")) {
    target.nextElementSibling.classList.toggle("show");
    target.textContent = target.nextElementSibling.classList.contains("show") ? "ซ่อนแนวคำตอบ" : "แสดงแนวคำตอบ";
    return;
  }
  if (target.classList.contains("reveal-btn")) {
    const panel = target.nextElementSibling;
    panel.classList.toggle("show");
    target.textContent = panel.classList.contains("show") ? target.dataset.close : target.dataset.open;
    return;
  }
  if (target.dataset.action === "retake-quiz") { localStorage.removeItem(`pq-quiz-${target.dataset.mode}`); render(); return; }
  if (target.dataset.action === "retake-confidence") { localStorage.removeItem(`pq-confidence-${target.dataset.mode}`); render(); return; }
  if (target.dataset.action === "retake-followup") { localStorage.removeItem("pq-followup"); render(); return; }
  if (!target.dataset.view) return;
  event.preventDefault();
  if (target.dataset.view === "slide-start") { setViewHash("slides/1"); return; }
  const hashParts = [target.dataset.view];
  if (target.dataset.id !== undefined) hashParts.push(target.dataset.id);
  if (target.dataset.sub !== undefined) hashParts.push(target.dataset.sub);
  const next = hashParts.join("/");
  if (location.hash === `#${next}`) render(); else setViewHash(next);
});
document.querySelector("#app").addEventListener("change", event => {
  if (event.target.matches(".chapter-check")) {
    const id = event.target.dataset.id; const next = new Set(completed());
    event.target.checked ? next.add(id) : next.delete(id);
    save("pq-completed", [...next]);
    event.target.closest(".check-item").classList.toggle("done", event.target.checked);
    toast(event.target.checked ? "บันทึกความคืบหน้าแล้ว" : "นำสถานะออกแล้ว");
    return;
  }
  if (event.target.id === "slide-jump") { setViewHash(`slides/${event.target.value}`); }
});
document.querySelector("#app").addEventListener("submit", event => {
  const form = event.target;
  if (form.id === "plan-form") { event.preventDefault(); save("pq-plan", Object.fromEntries(new FormData(form))); toast("บันทึกแผน 30 วันแล้ว"); return; }
  if (form.id === "quiz-form") {
    event.preventDefault();
    const mode = form.dataset.mode;
    const data = new FormData(form);
    const answers = quizQuestions.map((q, i) => parseInt(data.get(`q${i}`), 10));
    const score = answers.filter((a, i) => a === quizQuestions[i].answer).length;
    const unknown = answers.filter(a => a === 4).length;
    save(`pq-quiz-${mode}`, { answers, score, unknown, savedAt: Date.now() });
    toast("บันทึกผลแบบทดสอบแล้ว");
    render();
    return;
  }
  if (form.id === "confidence-form") {
    event.preventDefault();
    const mode = form.dataset.mode;
    const data = new FormData(form);
    const ratings = confidenceItems.map((c, i) => parseInt(data.get(`c${i}`), 10));
    const payload = { ratings, savedAt: Date.now() };
    if (mode === "post") {
      payload.intention = { score: parseInt(data.get("intentionScore"), 10), project: data.get("project"), blocker: data.get("blocker") };
    }
    save(`pq-confidence-${mode}`, payload);
    toast("บันทึกแบบประเมินความมั่นใจแล้ว");
    render();
    return;
  }
  if (form.id === "followup-form") {
    event.preventDefault();
    const data = new FormData(form);
    const answers = followupQuestions.map((q, i) => q.type === "multi" ? data.getAll(`f${i}`) : data.get(`f${i}`));
    save("pq-followup", { answers, savedAt: Date.now() });
    toast("บันทึกแบบติดตาม 30 วันแล้ว");
    render();
  }
});
document.querySelector("#search").addEventListener("input", event => { const next = event.target.value.trim() ? "search" : "start"; if (location.hash === `#${next}`) render(); else setViewHash(next); });
const sidebarEl = document.querySelector("#sidebar");
const backdropEl = document.querySelector("#sidebar-backdrop");
const pinButton = document.querySelector("#pin-button");

function setSidebarOpen(open) {
  sidebarEl.classList.toggle("open", open);
  backdropEl.classList.toggle("show", open && !sidebarEl.classList.contains("pinned"));
}
function setSidebarPinned(pinned) {
  sidebarEl.classList.toggle("pinned", pinned);
  document.body.classList.toggle("sidebar-pinned", pinned);
  pinButton.setAttribute("aria-pressed", String(pinned));
  save("pq-sidebar-pinned", pinned);
  backdropEl.classList.toggle("show", sidebarEl.classList.contains("open") && !pinned);
}

document.querySelector("#menu-button").addEventListener("click", () => setSidebarOpen(!sidebarEl.classList.contains("open")));
backdropEl.addEventListener("click", () => setSidebarOpen(false));
pinButton.addEventListener("click", () => {
  const nextPinned = !sidebarEl.classList.contains("pinned");
  setSidebarPinned(nextPinned);
  setSidebarOpen(nextPinned);
  toast(nextPinned ? "ปักหมุดเมนูแล้ว — เปิดค้างไว้ทุกครั้ง" : "เลิกปักหมุดเมนูแล้ว");
});
setSidebarPinned(stored("pq-sidebar-pinned", false));
document.addEventListener("mousemove", event => {
  if (event.clientX <= 6 && !sidebarEl.classList.contains("open") && !sidebarEl.classList.contains("pinned")) setSidebarOpen(true);
});

document.querySelector(".density-switch").addEventListener("click", event => {
  const btn = event.target.closest(".density-option");
  if (!btn) return;
  setDensity(btn.dataset.density);
});
function setDensity(mode) {
  document.documentElement.dataset.density = mode;
  document.querySelectorAll(".density-option").forEach(b => b.classList.toggle("active", b.dataset.density === mode));
  localStorage.setItem("pq-density", mode);
}
setDensity(localStorage.getItem("pq-density") || "compact");

document.querySelector("#theme-button").addEventListener("click", () => { const next = document.documentElement.dataset.theme === "dark" ? "" : "dark"; document.documentElement.dataset.theme = next; localStorage.setItem("pq-theme", next); });
document.documentElement.dataset.theme = localStorage.getItem("pq-theme") || "";
window.addEventListener("hashchange", render);
render();

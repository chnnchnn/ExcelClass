// โครงสร้างชั่วโมงเรียนต้นแบบ — อ้างอิงสไลด์ "Course Structure" (สไลด์ที่ 3) และสไลด์
// Session Divider ที่ใช้กำกับหัวข้อ session ตลอดทั้ง 87 สไลด์ในไฟล์ slides-data.js
//
// โครงสร้างนี้คือ Session 1 (ชม.1–3) / Session 2 (ชม.4–6) / Session 3 (ชม.7–8)
// พัก 15 นาทีระหว่างชม.2 กับชม.3 (ไม่ใช่หลังชม.3 ตามที่ตีความจากสไลด์ Course Structure
// ในตอนแรก — ผู้สอนยืนยันว่าตารางเวลาจริงพักก่อนเข้าชม.3), พักกลางวัน 1 ชั่วโมงระหว่างชม.4
// กับชม.5 (จุดกึ่งกลางของวัน), และพัก 15 นาทีอีกครั้งหลังชม.6

const courseAgenda = [
  {
    session: "Session 1 — พื้นฐานและการเตรียมข้อมูล (ชั่วโมงที่ 1–3)",
    sessionEn: "Foundations & Data Preparation",
    items: [
      { hour: 1, objective: "เข้าใจประโยชน์ของ Power Query เทียบกับงานทำมือ และภาพรวมกระบวนการ ETL", activity: "แนะนำขั้นตอน Import → Transform → Load", duration: "50 นาที" },
      { hour: 2, objective: "นำเข้าข้อมูลจากหลายแหล่งและรวมหลายไฟล์ได้อย่างชำนาญ", activity: "ฝึกปฏิบัติ: นำเข้าชุดข้อมูลหลายแหล่งและรวมทั้งโฟลเดอร์", duration: "60 นาที" },
      { break: true, duration: "15 นาที" },
      { hour: 3, objective: "เรียนรู้พื้นฐานการทำความสะอาดข้อมูลและความสำคัญของชนิดข้อมูลที่ถูกต้อง", activity: "แบบฝึกหัด: ทำความสะอาดข้อมูลยอดขายที่สกปรก", duration: "60 นาที" },
    ],
  },
  {
    session: "Session 2 — การแปลงและจัดโครงสร้างข้อมูล (ชั่วโมงที่ 4–6)",
    sessionEn: "Data Transformation & Structuring",
    items: [
      { hour: 4, objective: "เรียนรู้การ Merge (join) และ Append (ต่อแถว) ระหว่าง Query", activity: "กรณีศึกษา: รวมข้อมูล HR กับ Payroll", duration: "55 นาที" },
      { break: true, icon: "🍱", label: "พักกลางวัน", duration: "1 ชั่วโมง" },
      { hour: 5, objective: "พลิกรูปทรงข้อมูลด้วย Pivot/Unpivot และจัดการคอลัมน์", activity: "แบบฝึกหัด: แปลงรูปผลสำรวจ", duration: "50 นาที" },
      { hour: 6, objective: "ใช้ตรรกะเงื่อนไข IF และสูตร M พื้นฐานสร้างคอลัมน์คำนวณ", activity: "ฝึกปฏิบัติ: สร้างคอลัมน์คำนวณ", duration: "60 นาที" },
      { break: true, duration: "15 นาที" },
    ],
  },
  {
    session: "Session 3 — การใช้งานจริงและระบบอัตโนมัติ (ชั่วโมงที่ 7–8)",
    sessionEn: "Real-World Application & Automation",
    items: [
      { hour: 7, objective: "เข้าใจตัวเลือกการโหลดข้อมูลและการเชื่อมกับ Data Model พร้อมทำให้ Refresh และการจัดการ Query ที่พึ่งพากันเป็นระบบอัตโนมัติ", activity: "เชื่อม Power Query กับ PivotTable และจัดระเบียบ Query", duration: "60 นาที" },
      { hour: 8, objective: "นำทักษะทั้งหมดไปใช้กับโปรเจกต์จริงแบบครบวงจร", activity: "Workshop สุดท้าย: นำเข้า ทำความสะอาด แปลง และโหลดข้อมูลบริษัทจริง", duration: "55 นาที" },
    ],
  },
];

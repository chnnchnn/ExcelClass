// โครงสร้างชั่วโมงเรียนต้นแบบ — สกัดจาก Excel_PowerQuery_course_agenda.xlsx (ชีท agenda)
// ใช้จัดกลุ่มหน้าสไลด์ให้ตรงกับกำหนดการสอนจริง
//
// หมายเหตุ: โครงสร้างนี้ (เช้า ชม.1-4 / บ่าย ชม.5-8 พักหลัง ชม.2 และ ชม.6) ตั้งใจใช้
// ต่างจากโครงสร้าง Session 1/2/3 ในโฟลเดอร์ Excel_PowerQuery_by_cluade (README, สไลด์
// ต้นฉบับ, คู่มือผู้สอน — ซึ่งพัก 15 นาทีหลัง ชม.3 และ ชม.6) เพราะเป็นตารางเวลาเฉพาะของ
// รุ่นเรียนนี้ (Limagrain) ถ้าจะสอนรุ่นอื่นที่ใช้ตารางเดิม ให้แก้ไฟล์นี้ให้กลับไปตรงกับ
// โครงสร้าง Session 1/2/3 แทน

const courseAgenda = [
  {
    session: "Day 1 ช่วงเช้า — ปูพื้นฐานและเตรียมข้อมูล",
    sessionEn: "Foundations & Data Preparation",
    items: [
      { hour: 1, objective: "เข้าใจประโยชน์ของ Power Query เทียบกับงานทำมือ และภาพรวมกระบวนการ ETL", activity: "แนะนำขั้นตอน Import → Transform → Load", duration: "50 นาที" },
      { hour: 2, objective: "นำเข้าข้อมูลจากหลายแหล่งและรวมหลายไฟล์ได้อย่างชำนาญ", activity: "ฝึกปฏิบัติ: นำเข้าชุดข้อมูลหลายแหล่งและรวมทั้งโฟลเดอร์", duration: "60 นาที" },
      { break: true, duration: "15 นาที" },
      { hour: 3, objective: "เรียนรู้พื้นฐานการทำความสะอาดข้อมูลและความสำคัญของชนิดข้อมูลที่ถูกต้อง", activity: "แบบฝึกหัด: ทำความสะอาดข้อมูลยอดขายที่สกปรก", duration: "60 นาที" },
      { hour: 4, objective: "เรียนรู้การ Merge (join) และ Append (ต่อแถว) ระหว่าง Query", activity: "กรณีศึกษา: รวมข้อมูล HR กับ Payroll", duration: "55 นาที" },
    ],
  },
  {
    session: "Day 1 ช่วงบ่าย — แปลงและจัดโครงสร้างข้อมูล",
    sessionEn: "Data Transformation & Structuring",
    items: [
      { hour: 5, objective: "พลิกรูปทรงข้อมูลด้วย Pivot/Unpivot และจัดการคอลัมน์", activity: "แบบฝึกหัด: แปลงรูปผลสำรวจ", duration: "50 นาที" },
      { hour: 6, objective: "ใช้ตรรกะเงื่อนไข IF และสูตร M พื้นฐานสร้างคอลัมน์คำนวณ", activity: "ฝึกปฏิบัติ: สร้างคอลัมน์คำนวณ", duration: "60 นาที" },
      { break: true, duration: "15 นาที" },
      { hour: 7, objective: "เข้าใจตัวเลือกการโหลดข้อมูลและการเชื่อมกับ Data Model พร้อมทำให้ Refresh และการจัดการ Query ที่พึ่งพากันเป็นระบบอัตโนมัติ", activity: "เชื่อม Power Query กับ PivotTable และจัดระเบียบ Query", duration: "60 นาที" },
      { hour: 8, objective: "นำทักษะทั้งหมดไปใช้กับโปรเจกต์จริงแบบครบวงจร", activity: "Workshop สุดท้าย: นำเข้า ทำความสะอาด แปลง และโหลดข้อมูลบริษัทจริง", duration: "55 นาที" },
    ],
  },
];

# Excel Power Query — Class Workspace

A static class workspace for the 8-hour Excel Power Query course (case study: ThaiFresh Trading). It bundles the learner handbook, the full lecture slide deck, all 7 exercise sets with self-check answers and M-code solutions, the final workshop brief with its 100-point rubric, a pre/post knowledge quiz with confidence self-assessment and a 30-day follow-up, and downloadable practice data files — all in one no-build-step static site.

## Contents

- **คู่มือผู้เรียน** — the original 7-chapter handbook (unchanged reading experience).
- **สไลด์บรรยาย** — all 87 lecture slides grouped by session/hour, with instructor speaker notes toggle-able per slide.
- **แบบฝึกหัด** — all 7 exercise sets: tasks, self-check answer tables, pitfalls, and a reveal-to-see M-code solution.
- **Workshop สุดท้าย** — the final workshop scenario, deliverable spec, 8-step plan, 100-point rubric, and full solution code.
- **แบบทดสอบและความมั่นใจ** — the 15-question pre/post knowledge test (auto-scored, stored per-browser), the 10-item confidence self-assessment, and the 30-day follow-up survey.
- **ไฟล์ฝึกปฏิบัติ** — zipped sample data files per lesson folder (and one combined pack) for hands-on practice in Excel.

Source content was extracted verbatim from the course's Word/PowerPoint/Excel materials (`03_แบบฝึกหัด_Exercises.docx`, `04_Workshop_Final.docx`, `05_เฉลย_Solutions_M_Code.docx`, `07_คู่มือผู้เรียน_Learner_Handbook.docx`, `08_แบบวัดผล_Assessment_Toolkit.docx`, `02_Excel_PowerQuery_Slides.pptx`) and the `01_DataFiles_ไฟล์ข้อมูลตัวอย่าง` sample dataset. The quiz/confidence/follow-up tools save results to the visitor's own browser (`localStorage`) only — nothing is sent anywhere.

## Publish with GitHub Pages

1. Open the repository **Settings** then **Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose branch `main` and folder `/(root)`, then save.

The published site will be available at `https://chnnchnn.github.io/ExcelClass/`.

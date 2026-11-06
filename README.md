# EduAlert — Hệ thống Quản lý Đào tạo, Giám sát Học vụ & Cảnh báo sớm Nguy cơ Sinh viên

> **Đơn vị ứng dụng mẫu:** Trường Đại học Mở TP.HCM (HCMCOU)
> **Căn cứ:** Quy chế đào tạo tín chỉ & Thông tư 08/2021/TT-BGDĐT
> **Phiên bản:** 2.5 — Next.js 16 (App Router), React 19, Tailwind CSS 4
> **Hiện trạng:** chạy hoàn toàn trên **dữ liệu mẫu (mock) trong bộ nhớ trình duyệt**, chưa có backend/database, chưa có đăng nhập thật, chưa có kiểm thử tự động.

---

## 🧩 5 phân hệ (tương ứng User Story US-01 … US-05)

| Mã | Phân hệ | Màn hình trên sidebar |
| :-: | :--- | :--- |
| US-01 | Quản lý Khoa (mã tự sinh, Audit Log) | Quản Lý Khoa |
| US-02 | Quản lý Ngành & CTĐT (workspace 4 tab) | Quản Lý Ngành & CTĐT |
| US-03 | Quản lý Bảng điểm (Group by Môn → Lớp) | Quản Lý Bảng Điểm |
| US-04 | Giám sát lớp & Cảnh báo sớm (lớp `DH22CS01C`, 45 SV) | Cảnh Báo Sớm Nguy Cơ |
| US-05 | Smart Academic Planner (Target GPA, What-If) | Smart Academic Planner |

---

## 📂 Cấu trúc thư mục

```
Project-EduAlert/
├── app/                  # Next.js App Router (layout.jsx, page.jsx, globals.css)
│   └── index.html, app.js, styles.css, engine/   # ⚠️ Mockup tĩnh đời đầu (v1), không còn dùng cho bản Next.js
├── src/
│   ├── components/       # UI theo phân hệ: FacultyManagement, FacultyMajorManagement,
│   │                     #   CourseGrades, EarlyWarning, SmartPlanner, Sidebar, Header…
│   ├── engine/           # OUGradeEngine.js (tính điểm, Rule Engine), mockData.js, studentAuditHelper.js
│   └── types/index.ts    # Kiểu dữ liệu
├── engine/               # Bản engine độc lập đời đầu (v1)
└── docs/                 # Tài liệu — xem mục dưới
```

> Thư mục `app/index.html`, `app/app.js`, `app/engine/` và `engine/` ở gốc là di sản của bản mockup v1. Nguồn đang chạy là `src/`.

---

## 📚 Tài liệu

| File | Nội dung | Trạng thái |
| :--- | :--- | :--- |
| [`docs/00_Kien_Truc_Tong_Quan_Du_An_EduAlert_V2.md`](docs/00_Kien_Truc_Tong_Quan_Du_An_EduAlert_V2.md) | Kiến trúc tổng quan, RBAC, case study `DH22CS01C`, quy tắc nghiệp vụ | **Hiện hành (v2.5)** |
| [`docs/02_Quy_Tac_Tinh_Diem_OU.md`](docs/02_Quy_Tac_Tinh_Diem_OU.md) | Thang điểm, công thức GPA, 4 quy tắc cảnh báo, phân loại | **Hiện hành** |
| [`docs/user_stories/`](docs/user_stories/README.md) | US-01 … US-05 | **Hiện hành (v2.5)** |
| [`docs/01_Tong_Quan_Du_An_EduAlert.md`](docs/01_Tong_Quan_Du_An_EduAlert.md) | Tổng quan MVP 14 ngày | **Deprecated (v1)** — chỉ để tham khảo lịch sử |

---

## 🎯 Kịch bản demo nhanh (dữ liệu mẫu)

1. **Cảnh Báo Sớm Nguy Cơ** (màn mặc định): lớp `DH22CS01C` — 45 SV phân 4 nhóm: **3** nguy cơ buộc thôi học, **5** cảnh báo học vụ, **8** tín hiệu sớm, **29** an toàn. Sinh viên rủi ro cao nhất: Nguyễn Văn An (`2251050001`, Risk 96%). Mở hồ sơ để xem 4 điều kiện TT08 và lập biên bản tư vấn.
2. **Smart Academic Planner**: đối chiếu CTĐT 141 TC, đặt GPA mục tiêu, mô phỏng What-If trả nợ môn F (xem ví dụ số liệu trong `docs/user_stories/US-05_...`).
3. **Quản Lý Khoa / Ngành & CTĐT**: thêm khoa (mã `OU+YYMMDD+XXX`), thêm ngành (mã `[Ký hiệu khoa]+YYMM+XXX`), nạp môn liên ngành, xem Audit Log.
4. **Quản Lý Bảng Điểm**: nhóm theo môn → mở rộng ra các lớp → nhập điểm QT 40% + Thi 60%.

# EduAlert - Hệ Thống Cảnh Báo Sớm Học Vụ & Trợ Lý Học Tập Tích Hợp AI

> **Đơn vị đào tạo chuẩn:** Trường Đại học Mở TP.HCM (HCMCOU)  
> **Quy chế áp dụng:** Thông tư 08/2021/TT-BGDĐT & Quy chế tín chỉ HCMCOU  
> **Kiến trúc:** Monorepo (Frontend Next.js + Backend NestJS + MongoDB Cloud)  
> **Phiên bản:** v2.5 Enterprise  

---

## 📁 Cấu Trúc Dự Án (Monorepo)

```text
Project-EduAlert/
├── frontend/                 # Giao diện người dùng & Web App (Next.js 16, React 19, Tailwind CSS)
│   ├── app/                  # App Router, Trang Đăng nhập, API Route Handlers
│   ├── src/                  # Components, Engine tính điểm OU, Model Mongoose, Services
│   ├── package.json
│   └── ...
├── backend/                  # Máy chủ nghiệp vụ độc lập (NestJS Framework, TypeScript)
│   ├── src/                  # Modules: faculties, majors, classes, students, grades
│   ├── data/                 # JSON Database Persistence (data/db.json)
│   ├── package.json
│   └── ...
├── docs/                     # Toàn bộ tài liệu báo cáo đề tài, đặc tả kỹ thuật, hướng dẫn
│   ├── BAO_CAO_TOAN_DIEN_DU_AN_EDUALERT.md
│   └── 00_Gioi_Thieu_Tong_Quan_Du_An_EduAlert.md
├── .gitignore
└── README.md
```

---

## 🚀 Công Nghệ Sử Dụng (Tech Stack)

* **Frontend:** Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4, Lucide React.
* **Backend:** NestJS 11, Express, Node.js 22, TypeScript.
* **Database:** MongoDB Atlas Cloud (Mongoose ODM) & JSON Data Persistence.
* **Artificial Intelligence (AI):** Google Gemini 1.5/2.0 Flash API (Phân tích nguy cơ học vụ, soạn thảo kế hoạch can thiệp).
* **Quy chế học vụ:** Động cơ luật TT 08/2021/TT-BGDĐT & Quy chuẩn thang điểm 4/10 Đại học Mở TP.HCM.

---

## 🛠️ Hướng Dẫn Khởi Chạy Local (Quick Start)

### 1. Khởi chạy Backend (NestJS - Port 5000)
```bash
cd backend
npm install
npm run start:dev
```
> Server Backend sẵn sàng tại: `http://localhost:5000`

### 2. Khởi chạy Frontend (Next.js - Port 3000)
Mở một cửa sổ Terminal mới:
```bash
cd frontend
npm install
npm run dev
```
> Web App sẵn sàng tại: `http://localhost:3000`

---

## 🔑 Tài Khoản Đăng Nhập Mẫu (Demo Accounts)

| Vai trò | Tên đăng nhập (Username / MSSV) | Mật khẩu mặc định | Quyền hạn |
| :--- | :--- | :--- | :--- |
| **Quản trị viên (Admin)** | `admin` | `Admin@123` | Quản lý tài khoản, Khoa, Ngành, Bảng điểm, Toàn quyền hệ thống |
| **Giảng viên / CVHT** | `gv.nam` | `Giangvien@123` | Cảnh báo sớm, Hồ sơ 360°, Nhập bảng điểm lớp phụ trách (`DH22CS01C`) |
| **Sinh viên** | `2251050001` | `Sinhvien@123` | Xem Hồ sơ cá nhân, Smart Academic Planner (141 TC) |

---

## ☁️ Triển Khai Lên Vercel (Production)
1. Đăng nhập [vercel.com](https://vercel.com).
2. Import repository `legiahan2705/Project-EduAlert`.
3. Cài đặt **Root Directory**: `frontend`.
4. Thêm biến môi trường:
   * `MONGODB_URI`: `mongodb+srv://legiahancv_db_user:i0s1KKMnXuSQpUPz@edualert.378ybyw.mongodb.net/edualert?retryWrites=true&w=majority`
5. Bấm **Deploy**.

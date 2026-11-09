# EduAlert - Hệ Thống Cảnh Báo Sớm Học Vụ & Trợ Lý Học Tập Tích Hợp AI

> **Đơn vị đào tạo chuẩn:** Trường Đại học Mở TP.HCM (HCMCOU)  
> **Quy chế áp dụng:** Thông tư 08/2021/TT-BGDĐT & Quy chế tín chỉ HCMCOU  
> **Kiến trúc:** Next.js Full-Stack (Frontend React 19 + Backend Serverless API + MongoDB Atlas)  
> **Deploy:** Vercel Cloud Platform & MongoDB Atlas  

---

## 📁 Cấu Trúc Dự Án (Phân Tách Rõ Frontend & Backend)

Dự án sử dụng kiến trúc **Full-stack tiêu chuẩn của Next.js**, trong đó Frontend và Backend được phân tách rõ ràng theo từng thư mục nghiệp vụ:

```text
Project-EduAlert/
│
├── 🌐 PHẦN BACKEND (Serverless API, CSDL & Xác thực)
│   ├── app/api/                     # Toàn bộ API Route Handlers (RESTful Endpoints)
│   │   ├── auth/                    # API Đăng nhập, Đăng xuất, Lấy phiên (login, logout, me)
│   │   ├── users/                   # API Quản lý tài khoản Admin, Giảng viên, Sinh viên
│   │   ├── faculties/               # API Quản lý Khoa đào tạo
│   │   ├── majors/                  # API Quản lý Ngành & Khung chương trình đào tạo
│   │   ├── grades/                  # API Quản lý & Cập nhật Bảng điểm học phần
│   │   ├── students/                # API Dữ liệu sinh viên & Nhật ký tư vấn (counseling)
│   │   └── ai-counseling/           # API Tích hợp Trợ lý AI Google Gemini
│   ├── src/models/                  # Định nghĩa CSDL MongoDB (Mongoose Schemas: User, Student,...)
│   └── src/lib/                     # Thư viện Backend:
│       ├── mongodb.js               # Kết nối Cơ sở dữ liệu MongoDB Atlas Cloud
│       ├── session.js               # Quản lý phiên Cookie HMAC & Middleware Authorize
│       └── users.js                 # Mã hóa mật khẩu (scrypt/salt) & Khởi tạo tài khoản mẫu
│
├── 🎨 PHẦN FRONTEND (Giao diện người dùng & Trải nghiệm UX)
│   ├── src/components/              # Toàn bộ UI Components (React 19 + Tailwind CSS)
│   │   ├── EarlyWarning/            # Tab 1: Màn hình Cảnh báo sớm nguy cơ học vụ & Modal Hồ sơ 360°
│   │   ├── SmartPlanner/            # Tab 2: Kế hoạch học tập thông minh (141 Tín chỉ)
│   │   ├── FacultyManagement/       # Tab 3: Màn hình Quản trị Khoa (Mã tự sinh, Audit Log)
│   │   ├── FacultyMajorManagement/  # Tab 4: Màn hình Quản trị Ngành & Khung CTĐT
│   │   ├── CourseGrades/            # Tab 5: Màn hình Quản lý Bảng điểm (Phân quyền theo Giảng viên)
│   │   ├── UserManagement/          # Tab 6: Màn hình Quản lý tài khoản (Admin Only)
│   │   ├── Header.jsx               # Thanh điều hướng trên, thông báo nguy cơ, chuông cảnh báo
│   │   └── Sidebar.jsx              # Menu bên trái phân quyền theo Role
│   ├── app/page.jsx                 # Trang chính điều phối ứng dụng (Dashboard)
│   ├── app/login/page.jsx           # Trang Đăng nhập hệ thống (Sinh viên, Giảng viên, Admin)
│   └── app/globals.css              # Thiết kế giao diện (Tailwind CSS v4 & ERP Styling)
│
├── ⚙️ PHẦN THUẬT TOÁN HỌC VỤ (Core Business Rules Engine)
│   ├── src/engine/OUGradeEngine.js  # Bộ quy tắc tính điểm chuẩn OU (thang 10, thang chữ, thang 4)
│   ├── src/engine/studentAuditHelper.js # Đánh giá điều kiện cảnh báo học vụ theo Thông tư 08
│   └── src/engine/mockData.js       # Dữ liệu sinh viên, khoa, ngành mẫu chuẩn
│
├── 📚 TÀI LIỆU & BÁO CÁO ĐỀ TÀI
│   ├── docs/BAO_CAO_TOAN_DIEN_DU_AN_EDUALERT.md # Báo cáo kỹ thuật chi tiết toàn diện
│   └── docs/00_Gioi_Thieu_Tong_Quan_Du_An_EduAlert.md # Tổng quan đề tài & Luận chứng
│
├── scripts/                         # Script bảo trì:
│   └── seedUsers.mjs                # Script nạp 1 Admin, 7 Giảng viên, 45 Sinh viên lên MongoDB
├── package.json                     # Cấu hình dự án & Dependencies
└── next.config.mjs                  # Cấu hình Next.js
```

---

## 🛠️ Hướng Dẫn Chạy Local

Chỉ cần đứng ngay tại thư mục `Project-EduAlert`:

```bash
# 1. Cài đặt thư viện (nếu chưa cài)
npm install

# 2. Khởi chạy toàn bộ hệ thống (cả Frontend và Backend API)
npm run dev
# Mở trình duyệt tại: http://localhost:3000
```

---

## 🔑 Danh Sách Tài Khoản Phân Quyền (Tự Động)

| Vai trò | Tên đăng nhập (Username / MSSV) | Mật khẩu | Quyền hạn nghiệp vụ |
| :--- | :--- | :--- | :--- |
| **Quản trị viên (Admin)** | `admin` | `Admin@123` | Quản lý tài khoản, Khoa, Ngành, Bảng điểm, Toàn quyền hệ thống |
| **Giảng viên Nhập môn lập trình** | `gv.vinh` | `Giangvien@123` | Nhập & sửa bảng điểm môn **Nhập môn lập trình** (`COSC1301`) |
| **Giảng viên Cấu trúc dữ liệu** | `gv.tuan` | `Giangvien@123` | Nhập & sửa bảng điểm môn **CTDL & Giải thuật** (`COSC2301`) |
| **Giảng viên Cơ sở dữ liệu** | `gv.quan` | `Giangvien@123` | Nhập & sửa bảng điểm môn **Cơ sở dữ liệu** (`COSC2302`) |
| **Giảng viên Kế toán** | `gv.thuy` | `Giangvien@123` | Nhập & sửa bảng điểm môn **Nguyên lý kế toán** (`ACCT1301`) |
| **Cố vấn học tập (CVHT)** | `gv.nam` | `Giangvien@123` | Hồ sơ 360°, Gợi ý AI, Bảng điểm lớp `DH22CS01C` |
| **Sinh viên** | `2251050001` -> `2251050045` | `Sinhvien@123` | Chỉ xem Hồ sơ & Điểm số của bản thân (không có quyền sửa) |

---

## ☁️ Triển Khai Lên Vercel (Production)
1. Đăng nhập [vercel.com](https://vercel.com).
2. Import repository `legiahan2705/Project-EduAlert`.
3. Để **Root Directory** mặc định `./` (thư mục gốc).
4. Thêm biến môi trường:
   * `MONGODB_URI`: `mongodb+srv://legiahancv_db_user:i0s1KKMnXuSQpUPz@edualert.378ybyw.mongodb.net/edualert?retryWrites=true&w=majority`
5. Bấm **Deploy**. Vercel sẽ tự động build thành công ngay lập tức!

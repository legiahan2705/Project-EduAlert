# EduAlert - Hệ Thống Cảnh Báo Sớm Học Vụ & Trợ Lý Học Tập Tích Hợp AI

> **Đơn vị đào tạo chuẩn tham chiếu:** Trường Đại học Mở TP.HCM (HCMCOU)  
> **Quy chế áp dụng:** Thông tư 08/2021/TT-BGDĐT & Quy chế đào tạo theo hệ thống tín chỉ HCMCOU  
> **Kiến trúc:** Next.js Full-Stack (Frontend React 19 + Turbopack + Backend Serverless API + MongoDB Atlas Cloud Mongoose ORM)  
> **Deploy:** Tự động hóa qua Vercel Cloud Platform & MongoDB Atlas Cluster  

---

## 🌟 Tổng Quan Dự Án & Giá Trị Cốt Lõi

**EduAlert** là nền tảng quản trị và hỗ trợ học vụ đại học thông minh, chuyển dịch từ mô hình *"Xử lý kỷ luật bị động"* (khi sinh viên đã nhận quyết định buộc thôi học) sang **"Giám sát cảnh báo sớm chủ động"** kết hợp công cụ tự phục vụ (Self-Service) và Trợ lý Cố vấn AI cá nhân hóa.

### Điểm nổi bật mới nhất:
1. **Quản trị Cơ cấu Đào tạo & Mã Ngành Tự Sinh:** Tự sinh mã ngành theo quy chuẩn `[Ký hiệu Khoa] + YYMM + XXX` (kèm Live Preview Badge trực quan, giải thích công thức), quản lý khung CTĐT chuẩn 141 tín chỉ 8 học kỳ.
2. **Quy trình Lớp học & Sinh viên từ Năm 1:** Mọi sinh viên được tiếp nhận vào lớp từ đầu Năm 1 (HK1). Hệ thống **tự động tính toán GPA tích lũy, số tín chỉ đạt và nợ môn từ bảng điểm chi tiết của từng môn học trong CTĐT** sau khi giảng viên nhập điểm (không nhập điểm tích lũy ban đầu thủ công).
3. **Phân quyền vai trò người dùng nghiêm ngặt (RBAC):**
   * **Quản trị viên (Admin):** Quản lý toàn bộ Khoa, Ngành, CTĐT, Lớp học vụ, Tài khoản người dùng và xem tổng quan cảnh báo toàn trường. Admin **không trực tiếp can thiệp/nhập bảng điểm học phần**.
   * **Giảng viên bộ môn / CVHT (Lecturer):** Chỉ được quyền xem và nhập điểm các môn học/lớp được phân công; theo dõi hồ sơ học vụ 360° của lớp phụ trách.
   * **Sinh viên (Student):** Tra cứu tiến độ học tập, bảng điểm, sử dụng Smart Academic Planner (Target GPA & What-If) và nhận tư vấn định hướng từ AI.
4. **Tự phục vụ khôi phục mật khẩu (Self-Service Forgot Password):** Người dùng quên mật khẩu có thể tự xác thực danh tính qua Email trường / SĐT hồ sơ trên màn hình đăng nhập và cập nhật mật khẩu mới được băm an toàn qua thuật toán `scryptSync`.

---

## 📁 Cấu Trúc Dự Án (Full-Stack Next.js App Router)

```text
Project-EduAlert/
│
├── 🌐 PHẦN BACKEND (Serverless API, CSDL Cloud & Xác thực)
│   ├── app/api/                     # RESTful API Route Handlers
│   │   ├── auth/                    # Xác thực: login, logout, me, forgot-password
│   │   ├── users/                   # Quản lý tài khoản Admin, Giảng viên, Sinh viên
│   │   ├── faculties/               # Quản lý Khoa đào tạo (Mã tự sinh OU+YYMMDD+XXX)
│   │   ├── majors/                  # Quản lý Ngành & Khung CTĐT 141 Tín chỉ
│   │   ├── classes/                 # Quản lý Lớp học vụ, CVHT & Sĩ số sinh viên
│   │   ├── students/                # Dữ liệu sinh viên, Hồ sơ 360° & Counseling Log
│   │   ├── grades/                  # Quản lý Bảng điểm học phần & Tự động tái tính GPA
│   │   └── ai-counseling/           # Tích hợp Trợ lý AI Google Gemini API
│   ├── src/models/index.js          # Mongoose Schemas (User, Student, Class, GradeSheet, Curriculum,...)
│   └── src/lib/                     # Module thư viện Backend:
│       ├── mongodb.js               # Kết nối Mongoose tới MongoDB Atlas Cloud
│       ├── session.js               # Cookie HMAC-SHA256, Middleware & Phân quyền RBAC
│       ├── users.js                 # Mã hóa scryptSync/salt & Quản lý User Store
│       └── gradeSheets.js           # Bộ phát sinh bảng điểm theo CTĐT 4 năm (8 học kỳ)
│
├── 🎨 PHẦN FRONTEND (Giao diện người dùng & UX Hiện đại)
│   ├── src/components/              # UI Components chuẩn Modular ERP
│   │   ├── EarlyWarning/            # Tab 1: Cảnh báo sớm 4 nhóm rủi ro & Hồ sơ 360°
│   │   ├── SmartPlanner/            # Tab 2: Kế hoạch học tập thông minh 141 TC (Target GPA & What-If)
│   │   ├── FacultyManagement/       # Tab 3: Quản lý Khoa (Mã tự sinh, Audit Trail)
│   │   ├── FacultyMajorManagement/  # Tab 4: Quản lý Ngành, CTĐT 8 HK & Lớp - Sinh viên
│   │   ├── CourseGrades/            # Tab 5: Quản lý Bảng điểm theo môn/lớp (Dành cho Giảng viên)
│   │   ├── UserManagement/          # Tab 6: Quản lý Tài khoản người dùng (Admin Only)
│   │   ├── Auth/ForgotPasswordModal.jsx # Cửa sổ tự khôi phục mật khẩu 2 bước
│   │   ├── Header.jsx               # Header ERP, thông báo cảnh báo, chuông thông báo
│   │   └── Sidebar.jsx              # Menu bên trái tự động hiển thị theo vai trò (Role)
│   ├── app/page.jsx                 # Dashboard chính điều phối tab theo phân quyền
│   ├── app/login/page.jsx           # Trang Đăng nhập hệ thống & Tự khôi phục mật khẩu
│   └── app/globals.css              # Hệ thống phong cách ERP, Tailwind CSS & Responsive Layout
│
├── ⚙️ PHẦN THUẬT TOÁN HỌC VỤ (Core Business Rules Engine)
│   ├── src/engine/OUGradeEngine.js  # Quy tắc tính điểm OU (TK10 = 0.4*QT + 0.6*Thi, thang chữ & 4.0)
│   ├── src/engine/studentAuditHelper.js # Đánh giá 4 Quy tắc Cảnh báo học vụ Thông tư 08/2021
│   └── src/engine/mockData.js       # Dữ liệu chuẩn mực về sinh viên, môn học, khung CTĐT
│
├── 📚 TÀI LIỆU & BÁO CÁO TOÀN DIỆN
│   ├── docs/BAO_CAO_TOAN_DIEN_DU_AN_EDUALERT.md # Báo cáo chi tiết kỹ thuật toàn diện
│   ├── docs/BAO_CAO_TONG_KET_DU_AN_EDUALERT.md  # Báo cáo tổng kết dự án
│   ├── docs/00_Gioi_Thieu_Tong_Quan_Du_An_EduAlert.md # Luận chứng đề tài & Giá trị thực tiễn
│   ├── docs/00_Kien_Truc_Tong_Quan_Du_An_EduAlert_V2.md # Kiến trúc kỹ thuật và luồng dữ liệu
│   └── docs/user_stories/           # Toàn bộ User Stories chi tiết (US-01 đến US-06)
│
├── scripts/                         # Script tự động hóa bảo trì:
│   └── seedAll.mjs                  # Nạp toàn diện Khoa, Ngành, Lớp, CTĐT 4 năm, Bảng điểm & Sinh viên
├── package.json                     # Cấu hình dự án & Dependencies
└── next.config.mjs                  # Cấu hình Next.js (Turbopack, Server External Packages)
```

---

## 🛠️ Hướng Dẫn Chạy Local

Chỉ cần đứng tại thư mục `Project-EduAlert`:

```bash
# 1. Cài đặt thư viện dependencies
npm install

# 2. Khởi chạy môi trường phát triển (Full-Stack Next.js)
npm run dev

# Mở trình duyệt web tại địa chỉ: http://localhost:3000
```

---

## 🔑 Danh Sách Tài Khoản Phân Quyền (Tự Động Khởi Tạo)

| Vai trò | Tên đăng nhập (Username / MSSV) | Mật khẩu mặc định | Quyền hạn nghiệp vụ |
| :--- | :--- | :--- | :--- |
| **Quản trị viên (Admin)** | `admin` | `Admin@123` | Quản lý Tài khoản, Khoa, Ngành, CTĐT, Lớp học, Giám sát cảnh báo toàn hệ thống *(Không quản lý/nhập bảng điểm)* |
| **Giảng viên Nhập môn lập trình** | `gv.vinh` | `Giangvien@123` | Nhập & lưu bảng điểm môn `COSC1301`, `COSC3302`, `COSC4601` |
| **Giảng viên CTDL & Giải thuật** | `gv.tuan` | `Giangvien@123` | Nhập & lưu bảng điểm môn `COSC2301`, `COSC2305`, `COSC4301` |
| **Giảng viên Cơ sở dữ liệu** | `gv.quan` | `Giangvien@123` | Nhập & lưu bảng điểm môn `COSC2302`, `COSC2304` |
| **Giảng viên Nguyên lý kế toán** | `gv.thuy` | `Giangvien@123` | Nhập & lưu bảng điểm môn `ACCT1301` |
| **Cố vấn học tập (CVHT)** | `gv.nam` | `Giangvien@123` | Theo dõi lớp `DH22CS01C`, mở Hồ sơ 360°, ghi Nhật ký tư vấn, kích hoạt AI |
| **Sinh viên** | `2251050001` $\to$ `2251050045` | `Sinhvien@123` | Tra cứu tiến độ học tập cá nhân, Kế hoạch học tập 141 TC, mô phỏng What-If |

> 💡 **Tự đổi mật khẩu:** Bất kỳ tài khoản nào quên mật khẩu đều có thể bấm **"Quên mật khẩu?"** trên giao diện đăng nhập để tự khôi phục thông qua Email sinh viên (`[MSSV]@student.ou.edu.vn`) hoặc Số điện thoại đăng ký.

---

## ☁️ Triển Khai Lên Vercel (Production Cloud)

Dự án được cấu hình sẵn sàng triển khai tự động qua Vercel GitHub CI/CD:
1. Push code lên nhánh `main` của repository `https://github.com/legiahan2705/Project-EduAlert`.
2. Vercel tự động nhận commit, chạy Turbopack build tối ưu hóa và phát hành production URL tức thời.
3. Biến môi trường trên Vercel:
   * `MONGODB_URI`: Chuỗi kết nối MongoDB Atlas Cluster.
   * `AUTH_SECRET`: Khóa bí mật bảo vệ Session Cookie HMAC.
   * `GEMINI_API_KEY`: Khóa API Google Gemini AI (hỗ trợ tư vấn thông minh).

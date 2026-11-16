# EduAlert

EduAlert là hệ thống hỗ trợ quản lý đào tạo và theo dõi tình hình học tập của sinh viên. Ứng dụng cung cấp cảnh báo sớm theo dữ liệu học vụ, hồ sơ sinh viên, công cụ lập kế hoạch học tập và các chức năng quản trị theo vai trò.

> **Đơn vị tham chiếu:** Trường Đại học Mở TP.HCM (HCMCOU)  
> **Nhóm thực hiện:** Lê Gia Hân, Vũ Hải Trung  
> **Công nghệ:** Next.js 16, React 19, MongoDB Atlas và Mongoose  
> **Triển khai:** Vercel

## Tổng quan chức năng

- **Cảnh báo sớm và hồ sơ học tập:** Theo dõi GPA, tín chỉ nợ, mức độ rủi ro và lịch sử tư vấn; hỗ trợ cố vấn xem hồ sơ sinh viên.
- **Smart Academic Planner:** Đối chiếu tiến độ với chương trình đào tạo, xem bảng điểm và mô phỏng kế hoạch học tập/What-If.
- **Quản lý cơ cấu đào tạo:** Quản lý khoa, ngành, chương trình đào tạo, lớp học vụ và sinh viên.
- **Quản lý bảng điểm:** Giảng viên xem và cập nhật bảng điểm theo môn, lớp được phân công.
- **Quản lý tài khoản và phân quyền:** Các vai trò quản trị viên, giảng viên và sinh viên có quyền truy cập khác nhau; API kiểm tra quyền truy cập.
- **Tư vấn học tập có AI:** Có thể sử dụng Gemini khi cấu hình API key; hệ thống có phương án tư vấn dự phòng dựa trên quy tắc khi dịch vụ AI không khả dụng.
- **Xác thực tài khoản:** Đăng nhập, đăng xuất, quản lý phiên và đổi/khôi phục mật khẩu.

## Công nghệ sử dụng

- Next.js App Router và React
- JavaScript ES modules
- MongoDB Atlas với Mongoose
- Tailwind CSS 4 và CSS tùy chỉnh
- Vercel cho triển khai ứng dụng
- Google Gemini API tùy chọn cho chức năng tư vấn AI

## Cấu trúc dự án

```text
Project-EduAlert/
├── app/
│   ├── api/                      # Route handlers: auth, users, faculties, majors,
│   │                             # classes, students, grades, ai-counseling
│   ├── login/                    # Trang đăng nhập
│   ├── page.jsx                 # Dashboard và điều phối giao diện theo vai trò
│   ├── layout.jsx               # Layout và metadata
│   └── globals.css              # CSS toàn cục
├── src/
│   ├── components/              # Giao diện: cảnh báo, planner, quản lý và xác thực
│   ├── engine/                  # Các tiện ích nghiệp vụ
│   ├── lib/                     # Kết nối MongoDB, phiên, vai trò và người dùng
│   ├── models/                  # Mongoose schemas
│   └── services/                # Client gọi API
├── engine/                      # Bộ quy tắc điểm, phân tích học vụ và dữ liệu mẫu
├── scripts/
│   ├── seedAll.mjs              # Nạp dữ liệu mẫu và bảng điểm vào MongoDB
│   └── seedUsers.mjs            # Khởi tạo/cập nhật tài khoản mẫu
├── docs/                         # Báo cáo, kiến trúc, hướng dẫn và user stories
├── package.json
└── next.config.mjs
```

## Yêu cầu

- Node.js tương thích với phiên bản Next.js trong `package.json`
- npm
- MongoDB Atlas hoặc MongoDB tương thích

## Chạy ứng dụng local

1. Cài đặt dependencies:

   ```bash
   npm install
   ```

2. Tạo file `.env.local` ở thư mục gốc và khai báo cấu hình cần thiết:

   ```dotenv
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
   AUTH_SECRET=<chuoi-bi-mat-ngau-nhien>
   GEMINI_API_KEY=<gemini-api-key-tuy-chon>
   ```

   `GEMINI_API_KEY` chỉ cần thiết nếu muốn bật tích hợp Gemini. Không đưa thông tin bí mật thật vào Git.

3. Nạp dữ liệu mẫu vào cơ sở dữ liệu (nếu cần):

   ```bash
   npm run seed
   ```

   Có thể chỉ khởi tạo/cập nhật tài khoản mẫu bằng `npm run seed:users`.

4. Khởi chạy môi trường phát triển:

   ```bash
   npm run dev
   ```

5. Mở [http://localhost:3000](http://localhost:3000).

Các lệnh dự án khác:

```bash
npm run build  # Build ứng dụng
npm run start  # Chạy bản build production
```

## Dữ liệu và tài khoản mẫu

Các script seed khởi tạo dữ liệu mẫu phục vụ chạy thử, gồm quản trị viên, giảng viên, sinh viên, khoa, ngành, lớp và bảng điểm. Tài khoản và mật khẩu mẫu được định nghĩa trong mã nguồn; hãy đổi mật khẩu sau khi đăng nhập và không sử dụng dữ liệu/mật khẩu mẫu cho môi trường production.

## Biến môi trường

| Tên | Bắt buộc | Mô tả |
| :--- | :---: | :--- |
| `MONGODB_URI` | Có | URI kết nối tới MongoDB. |
| `AUTH_SECRET` | Có cho cấu hình phiên bảo mật | Bí mật dùng để ký và bảo vệ phiên đăng nhập. |
| `GEMINI_API_KEY` | Không | API key để sử dụng tư vấn qua Google Gemini; chức năng tư vấn có phương án dự phòng khi không cấu hình. |

## Triển khai

Dự án có thể triển khai trên Vercel và kết nối với MongoDB Atlas. Cấu hình các biến môi trường cần thiết (`MONGODB_URI`, `AUTH_SECRET` và tùy chọn `GEMINI_API_KEY`) trong project settings của Vercel trước khi deploy.

Ứng dụng đang được triển khai tại: [project-edu-alert.vercel.app](https://project-edu-alert.vercel.app).

## Tài liệu

Tài liệu báo cáo, kiến trúc, hướng dẫn và user stories được lưu trong thư mục [`docs/`](./docs).

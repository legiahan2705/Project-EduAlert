# HƯỚNG DẪN KHỞI CHẠY HỆ THỐNG EDUALERT (FRONTEND & NESTJS BACKEND)

Dự án gồm 2 phần độc lập:
1. **Frontend:** Next.js 16 (App Router), React 19, TypeScript (`Project-EduAlert`) - Cổng `http://localhost:3000`
2. **Backend:** NestJS, TypeScript, JSON Database Persistence (`Project-EduAlert-Backend`) - Cổng `http://localhost:5000`

---

## 1. KHỞI ĐỘNG BACKEND (NestJS API & JSON Database)

Mở một cửa sổ Terminal (PowerShell):
```bash
cd D:\Han_PersonalSpace\Project-EduAlert-Backend
npm run start:dev
```
* **URL Backend:** `http://localhost:5000`
* **File lưu trữ CSDL:** `D:\Han_PersonalSpace\Project-EduAlert-Backend\data\db.json`  
  *(Mọi thao tác Thêm/Sửa/Xóa Khoa, Ngành, Điểm số, Nhật ký tư vấn CVHT đều được ghi tự động vào file JSON này và không bị mất khi tắt máy).*

### Danh sách API Endpoints:
- `GET /api/faculties` - Lấy danh sách Khoa
- `POST /api/faculties` - Thêm Khoa mới
- `PUT /api/faculties/:code` - Cập nhật Khoa
- `DELETE /api/faculties/:code` - Xóa Khoa
- `GET /api/majors` - Lấy danh sách Ngành
- `POST /api/majors` - Thêm Ngành mới
- `GET /api/majors/:code/curriculum` - Lấy khung CTĐT của Ngành
- `PUT /api/majors/:code/curriculum` - Cập nhật khung CTĐT
- `GET /api/students` - Lấy danh sách 45 sinh viên
- `GET /api/students/:maSV` - Xem chi tiết 1 sinh viên
- `POST /api/students/:maSV/counseling` - Lưu nhật ký tư vấn học vụ
- `GET /api/classes` - Lấy danh sách Lớp học
- `GET /api/grades` - Lấy danh sách Bảng điểm môn học
- `PUT /api/grades/:sheetId` - Lưu cập nhật điểm học phần

---

## 2. KHỞI ĐỘNG FRONTEND (Next.js)

Mở một cửa sổ Terminal khác:
```bash
cd D:\Han_PersonalSpace\Project-EduAlert
npm run dev
```
* **URL Ứng dụng:** `http://localhost:3000`
* Frontend sẽ tự động gọi API `http://localhost:5000/api` để lấy dữ liệu. Nếu Backend tắt, Frontend sẽ tự động dùng dữ liệu dự phòng an toàn.


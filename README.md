# EduAlert - Hệ Thống Cảnh Báo Sớm Học Vụ & Trợ Lý Học Tập Tích Hợp AI

> **Đơn vị đào tạo chuẩn:** Trường Đại học Mở TP.HCM (HCMCOU)  
> **Quy chế áp dụng:** Thông tư 08/2021/TT-BGDĐT & Quy chế tín chỉ HCMCOU  
> **Phiên bản:** v2.5 Enterprise Cloud  
> **Deploy:** Vercel Serverless Platform & MongoDB Atlas Cloud  

---

## 📌 Giới Thiệu Nhanh
**EduAlert** là nền tảng quản lý học vụ thông minh giúp chuyển đổi mô hình từ **"xử lý kỷ luật bị động"** sang **"cảnh báo sớm chủ động"**. Hệ thống hỗ trợ Cố vấn học tập (CVHT) khoanh vùng sinh viên có nguy cơ bị buộc thôi học chỉ trong 3 giây, đồng thời tích hợp **Trợ lý AI (Google Gemini LLM)** để tự động phân tích tâm lý, đưa ra kế hoạch hành động và soạn sẵn email động viên sinh viên.

---

## 🚀 Tech Stack Chính
- **Frontend:** Next.js 16 (App Router, Turbopack), React 19, TypeScript.
- **UI/UX:** Enterprise ERP Clean System (Forest Emerald & Slate), Tailwind CSS v4, Lucide React Icons.
- **Backend API:** Next.js Serverless API Routes (`/api/*`).
- **Database:** MongoDB Atlas Cloud (Mongoose ODM).
- **Artificial Intelligence:** Google Gemini 1.5 Flash API (Prompt Engineering, NLG, Sentiment & Risk Clustering).
- **Hosting / CI-CD:** Vercel Cloud & GitHub.

---

## 🛠️ Khởi Chạy Nhanh (Local Development)

```bash
# 1. Clone repository
git clone https://github.com/legiahan2705/Project-EduAlert.git
cd Project-EduAlert

# 2. Cài đặt thư viện
npm install

# 3. Tạo file môi trường .env.local
echo "MONGODB_URI=mongodb+srv://legiahancv_db_user:i0s1KKMnXuSQpUPz@edualert.378ybyw.mongodb.net/edualert?retryWrites=true&w=majority" > .env.local

# 4. Khởi chạy dự án
npm run dev
# Mở trình duyệt tại: http://localhost:3000
```

---

## ☁️ Triển Khai Lên Vercel (Production)
1. Đăng nhập [vercel.com](https://vercel.com) bằng tài khoản GitHub `legiahan2705`.
2. Import repo `Project-EduAlert`.
3. Thêm biến môi trường:
   - `MONGODB_URI`: `mongodb+srv://legiahancv_db_user:i0s1KKMnXuSQpUPz@edualert.378ybyw.mongodb.net/edualert?retryWrites=true&w=majority`
4. Bấm **Deploy**.

---

## 📚 Bộ Tài Liệu Chi Tiết Dự Án
- **Báo cáo tổng kết đồ án toàn diện:** [`docs/BAO_CAO_TONG_KET_DU_AN_EDUALERT.md`](docs/BAO_CAO_TONG_KET_DU_AN_EDUALERT.md)
- **Tài liệu giới thiệu tổng quan:** [`docs/00_Gioi_Thieu_Tong_Quan_Du_An_EduAlert.md`](docs/00_Gioi_Thieu_Tong_Quan_Du_An_EduAlert.md)
- **Quy tắc tính điểm & 4 Rule TT08:** [`docs/02_Quy_Tac_Tinh_Diem_OU.md`](docs/02_Quy_Tac_Tinh_Diem_OU.md)
- **Bộ User Stories 5 phân hệ:** [`docs/user_stories/`](docs/user_stories/)

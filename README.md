# EduAlert — Hệ thống Phân tích, Dự báo & Cảnh báo sớm Nguy cơ Học tập Đa cấp độ
> **Quy chế tín chỉ Trường Đại học Mở TP.HCM (HCMCOU) & Thông tư 08/2021/TT-BGDĐT**  
> **Phiên bản MVP 14 ngày:** Hoàn thiện 4 phân hệ cốt lõi + Bộ tính điểm `OUGradeEngine` độc lập + Web App Mockup tương tác cao.

---

## 📂 Cấu Trúc Thư Mục Dự Án

```
Project-EduAlert/
├── docs/                                 # Tài liệu kỹ thuật & Đặc tả nghiệp vụ
│   ├── 01_Tong_Quan_Du_An_EduAlert.md   # Kiến trúc hệ thống, 4 phân hệ, lộ trình 14 ngày
│   └── 02_Quy_Tac_Tinh_Diem_OU.md        # Thang điểm, công thức GPA và 4 luật cảnh báo TT 08
│
├── engine/                               # Module tính toán lõi (Pure TypeScript/JavaScript)
│   ├── OUGradeEngine.js                 # Thuật toán tính điểm TK, quy đổi A+->F, GPA HK, GPA TL, Rule Engine
│   └── mockData.js                      # Bộ dữ liệu mẫu: 40 sinh viên Lớp DH21IT01 & CTĐT 141 tín chỉ
│
└── app/                                  # Ứng dụng Web Mockup chạy được ngay
    ├── index.html                       # Giao diện chính phân quyền CVHT & Sinh viên (4 Phân hệ)
    ├── styles.css                       # Giao diện hiện đại (Glassmorphism, Dark UI, Responsive)
    ├── app.js                           # Controller kết nối Engine, State và DOM events
    └── engine/                          # Bản sao Engine nội bộ phục vụ chạy web server độc lập
```

---

## 🚀 Hướng Dẫn Mở Ứng Dụng Mockup Demo

Ứng dụng web mockup đang được phục vụ tại cổng nội bộ:
👉 **URL truy cập trực tiếp:** [http://localhost:3030](http://localhost:3030)  
*(Hoặc mở trực tiếp file `app/index.html` trong bất kỳ trình duyệt web hiện đại nào)*.

---

## 🎯 Kịch Bản Demo Nhanh 4 Phân Hệ

1. **Phân hệ 1: Quản lý điểm theo Lớp - Môn - Kỳ**
   * Chọn học kỳ `HK3`, Lớp `DH21IT01`, Môn `COSC2302 - Cơ sở dữ liệu`.
   * Bấm nút **"📁 Import Excel (Diem.xlsx)"**: Mô phỏng nạp 30 sinh viên từ file Excel xuất từ cổng `tienichsv.ou.edu.vn`.
   * **Thử nghiệm sửa điểm trực tiếp (Inline Edit):** Click vào ô Điểm QT hoặc Điểm Thi của bất kỳ sinh viên nào $\to$ Xem điểm tổng kết hệ 10, Điểm chữ và Kết quả tự động nhảy tức thì theo công thức ĐH Mở TP.HCM.
   * Thống kê tự động: 24 Đạt (80%), 6 Rớt môn (20%), ĐTB môn 6.45/10.

2. **Phân hệ 2: Chương trình đào tạo & Tiến độ tích lũy**
   * Xem tiến độ hoàn thành CTĐT ngành CNTT 141 tín chỉ của sinh viên: **82 / 141 tín chỉ** (58%).
   * Lọc danh sách môn theo trạng thái: *Tất cả*, *✓ Đã đạt (Xanh)*, *✗ Đang nợ (Đỏ)*, *⏳ Chưa học (Xám)*.
   * Chú thích rõ ràng các môn điều kiện không tích lũy GPA: **GDTC, GDQP-AN**.

3. **Phân hệ 3: Phân tích & Cảnh báo sớm (CVHT)**
   * Xem tổng quan phân bố lớp: **25 Bình thường**, **10 Cảnh báo sớm**, **5 Nguy cơ cao**.
   * Bảng xếp hạng rủi ro ưu tiên tư vấn (0 - 100 điểm).
   * Click vào sinh viên **Trần Minh Tú (2151010005)** để mở **Hồ sơ cảnh báo**:
     * Kiểm tra 4 điều kiện Thông tư 08: Hiện rõ 3/4 điều kiện bị vi phạm (Rớt môn > 50%, nợ 20 TC, GPA HK 0.90 < 1.0, GPA TL 1.55 < 1.6).
     * Giải thích nguyên nhân tự động bằng ngôn ngữ tự nhiên.
     * **Sổ tay tư vấn CVHT:** Chọn trạng thái can thiệp (*Đang hỗ trợ*) $\to$ Nhập biên bản làm việc $\to$ Bấm lưu vào lịch sử.

4. **Phân hệ 4: Smart Academic Planner (Sinh viên)**
   * Chuyển sang vai trò **🎓 Sinh Viên** trên thanh Topbar (Tài khoản Nguyễn Văn An - GPA hiện tại 3.10).
   * **(a) Tính GPA Mục tiêu:** Nhập GPA mong muốn `3.20` $\to$ Hệ thống tự động giải bài toán tính mức điểm cần đạt: **3.34/4.0** trên 59 tín chỉ còn lại. Thử nhập `3.90` để xem cảnh báo mục tiêu bất khả thi!
   * **(b) Gợi ý môn cải thiện:** Xem bảng xếp hạng các môn điểm C, D mang lại mức tăng $\Delta GPA$ cao nhất khi cải thiện lên điểm A.
   * **(c) Kịch bản GPA kỳ tới:** Nhập dự kiến kỳ tới đạt GPA `3.40` $\to$ Xem GPA tích lũy mới nhảy lên `3.15` (+0.05).
   * **(d) Mô phỏng What-If đăng ký môn:** Tick chọn các môn dự kiến kỳ 6 $\to$ Hệ thống tính toán tải học tập (`Load`) và độ rủi ro trượt môn lịch sử (`planRisk`) để đưa ra khuyến cáo cân bằng.

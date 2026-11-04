# EduAlert – Hệ Thống Phân Tích & Cảnh Báo Sớm Nguy Cơ Học Tập Đa Cấp Độ
> **Chuẩn quy chế đào tạo theo hệ thống tín chỉ — Trường Đại học Mở TP.HCM (HCMCOU)**  
> **Lộ trình triển khai MVP Demo:** 14 ngày | **Đối tượng:** Cố vấn học tập (CVHT) & Sinh viên

---

## 1. Giới Thiệu & Mục Tiêu Dự Án
EduAlert là giải pháp hỗ trợ ra quyết định trong quản lý đào tạo và cố vấn học tập đại học. Thay vì chỉ cảnh báo khi sinh viên đã bị điểm kém hoặc rớt môn, EduAlert kết hợp **Động cơ luật quy chế (Rule Engine theo Thông tư 08/2021/TT-BGDĐT & ĐH Mở TP.HCM)** cùng công cụ **Smart Academic Planner** giúp:
* **Phát hiện sớm:** Nhận diện sinh viên rơi vào vùng nguy cơ ngay sau khi công bố điểm học kỳ.
* **Giải thích nguyên nhân:** Chỉ rõ vi phạm điều kiện nào (GPA tích lũy, tỷ lệ trượt môn, trần nợ tín chỉ).
* **Định hướng hành động:** Giúp sinh viên tự mô phỏng GPA mục tiêu, chọn môn học lại/cải thiện tối ưu để kéo điểm tích lũy.
* **Độc lập dữ liệu:** Không phụ thuộc vào API nội bộ của nhà trường; hệ thống hỗ trợ import file Excel trực tiếp (tương thích mẫu xuất `Diem.xlsx` từ cổng `tienichsv.ou.edu.vn`).

---

## 2. Kiến Trúc 4 Phân Hệ Cốt Lõi (Lộ Trình 14 Ngày)

```
                    ┌──────────────────────────────────────────────┐
                    │               EDU-ALERT PORTAL               │
                    │        (Chuyển đổi vai trò CVHT / SV)        │
                    └──────────────────────┬───────────────────────┘
                                           │
         ┌──────────────────┬──────────────┴─────┬──────────────────┐
         ▼                  ▼                    ▼                  ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│   PHÂN HỆ 1     │ │   PHÂN HỆ 2     │ │   PHÂN HỆ 3     │ │   PHÂN HỆ 4     │
│  Quản lý Điểm   │ │ CTĐT & Tiến Độ  │ │ Phân Tích &     │ │ Smart Academic  │
│ Lớp - Môn - Kỳ  │ │   Tốt Nghiệp    │ │ Cảnh Báo Sớm    │ │     Planner     │
├─────────────────┤ ├─────────────────┤ ├─────────────────┤ ├─────────────────┤
│• Chọn kỳ/lớp/môn│ │• Import CTĐT 141│ │• Dashboard lớp  │ │• GPA Mục tiêu   │
│• Import Excel   │ │  tín chỉ ngành  │ │• Phân tích môn  │ │• Gợi ý cải thiện│
│• Tính tự động:  │ │• Đo tiến độ hoàn│ │• Hồ sơ cảnh báo │ │• Điểm cần duy trì│
│  QT + Thi -> TK │ │  thành (78/141) │ │• Rule Engine 08 │ │• Mô phỏng What-If│
│• Sửa điểm inline│ │• Nhận diện môn nợ│ │• Sổ tay tư vấn │ │  đăng ký môn học│
└─────────────────┘ └─────────────────┘ └─────────────────┘ └─────────────────┘
```

### Chi tiết 4 phân hệ:
1. **Phân hệ 1: Quản lý điểm theo học kỳ, lớp, môn (Grade Management)**
   * Import danh sách lớp kèm Điểm quá trình (trọng số $40\%$) và Điểm thi ($60\%$).
   * Tự động tính: Điểm tổng kết hệ 10, Điểm chữ (A+, A, B+, B, C+, C, D+, D, F), Điểm hệ 4 (0.0 – 4.0), Kết quả (Đạt / Không đạt).
   * Cho phép CVHT chỉnh sửa điểm trực tiếp (Inline Editing) và cập nhật tức thì.
2. **Phân hệ 2: Chương trình đào tạo & Tiến độ (Curriculum & Graduation Audit)**
   * Khung CTĐT 141 tín chỉ (Cơ sở nhóm ngành, Chuyên ngành, Tự chọn, Môn điều kiện).
   * Phân loại trạng thái từng môn: *Đã đạt*, *Đang nợ*, *Đang học*, *Chưa học*.
   * Kiểm tra điều kiện môn tiên quyết (Prerequisites).
   * Tách biệt rõ các môn điều kiện không tính vào GPA tích lũy: GDTC, GDQP-AN (`IsTichLuy = false`).
3. **Phân hệ 3: Phân tích & Cảnh báo sớm (Rule Engine & Early Warning)**
   * **Rule Engine 4 điều kiện** theo Thông tư 08/2021 và quy chế ĐH Mở TP.HCM:
     1. Tín chỉ không đạt trong kỳ $> 50\%$ tín chỉ đăng ký.
     2. Nợ đọng tín chỉ toàn khóa $> 24$ tín chỉ.
     3. GPA học kỳ $< 0.8$ (HK1) hoặc $< 1.0$ (các kỳ sau).
     4. GPA tích lũy dưới sàn theo năm (Năm 1 $< 1.2$; Năm 2 $< 1.4$; Năm 3 $< 1.6$; Năm 4+ $< 1.8$).
   * Phân 3 mức cảnh báo: **Bình thường**, **Cảnh báo sớm** (chạm 1 điều kiện), **Nguy cơ cao** (chạm $\ge 2$ điều kiện hoặc tái diễn).
   * Điểm rủi ro mô phỏng $0 - 100$ để xếp hạng ưu tiên can thiệp.
   * Ghi nhận tiến trình tư vấn của CVHT (*Chưa liên hệ $\to$ Đã liên hệ $\to$ Đang hỗ trợ $\to$ Đã cải thiện*).
4. **Phân hệ 4: Smart Academic Planner (Trọng tâm cho Sinh viên)**
   * **Tính GPA Mục tiêu:** Tính điểm trung bình cần đạt trên số tín chỉ còn lại để chạm mục tiêu bằng (ví dụ: kéo từ 2.6 lên 3.2).
   * **Gợi ý môn cải thiện:** Xếp hạng các môn điểm D, C mang lại mức tăng GPA tích lũy cao nhất khi học lại.
   * **Mức điểm an toàn cần giữ:** Tính điểm sàn các kỳ còn lại để bảo toàn loại tốt nghiệp.
   * **Mô phỏng What-If:** Chọn thử tổ hợp môn kỳ tới, tính áp lực tải học tập (`loadPressure`) và độ rủi ro trượt môn lịch sử (`planRisk`).

---

## 3. Lộ Trình Triển Khai 14 Ngày
| Ngày | Nội dung thực hiện | Đầu ra (Deliverables) |
| :---: | :--- | :--- |
| **Ngày 1–2** | Thiết kế cơ sở dữ liệu (PostgreSQL/Schema), Authentication & RBAC | Database tables & Auth Service |
| **Ngày 3–4** | Quản lý học kỳ, lớp, môn học; Module Import Excel/CSV | Giao diện import & Xem trước dữ liệu |
| **Ngày 5–6** | Xây dựng lõi `OUGradeEngine` chuẩn ĐH Mở TP.HCM; Unit Test | Module tính điểm, GPA kỳ, GPA tích lũy |
| **Ngày 7–8** | Dashboard lớp học, Thống kê môn học, Hồ sơ sinh viên | Giao diện phân tích đa chiều |
| **Ngày 9** | Hoàn thiện Rule Engine 4 điều kiện cảnh báo học vụ | Bộ cảnh báo tự động & Giải thích nguyên nhân |
| **Ngày 10–11**| Import CTĐT, Đối chiếu tiến độ tốt nghiệp 141 tín chỉ | Thanh tiến độ & Phân loại trạng thái môn |
| **Ngày 12** | Phân hệ Smart Academic Planner (GPA mục tiêu, Gợi ý môn cải thiện) | Module tính toán kéo điểm |
| **Ngày 13** | Mô phỏng What-if đăng ký môn học & Nhật ký tư vấn CVHT | Kịch bản đăng ký môn & Sổ tay tư vấn |
| **Ngày 14** | Nạp dữ liệu demo hoàn chỉnh (40 SV), Kiểm thử toàn diện & Báo cáo | Ứng dụng chạy mượt mà, sẵn sàng bảo vệ |

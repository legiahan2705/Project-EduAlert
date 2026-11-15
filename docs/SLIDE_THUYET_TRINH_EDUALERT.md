# BỘ SLIDE THUYẾT TRÌNH BÁO CÁO ĐỀ TÀI: EDUALERT

> **Đề tài:** EduAlert - Hệ Thống Cảnh Báo Sớm Nguy Cơ Học Tập Đa Cấp Độ & Trợ Lý Kế Hoạch Học Tập Tín Chỉ Tích Hợp AI  
> **Đơn vị áp dụng:** Trường Đại học Mở TP.HCM (Áp dụng Quy chế đào tạo tín chỉ & Thông tư 08/2021/TT-BGDĐT)  
> **Thời lượng báo cáo đề xuất:** 12 - 15 phút (kèm 5 phút demo trực tiếp hệ thống)  

---

## 📌 MỤC LỤC BỘ SLIDE (12 SLIDES CHUẨN BÁO CÁO ĐỒ ÁN)

1. **Slide 1:** Trang Tiêu Đề (Title Slide)
2. **Slide 2:** Đặt Vấn Đề & Lý Do Chọn Đề Tài (Problem Statement)
3. **Slide 3:** Mục Đích & Sứ Mệnh Của Hệ Thống (Goals & Mission)
4. **Slide 4:** Đối Tượng Phục Vụ & Mô Hình 3 Phân Quyền (Stakeholders & RBAC)
5. **Slide 5:** Cơ Sở Pháp Lý & Bộ Quy Tắc Nhận Diện Nguy Cơ (TT 08/2021/TT-BGDĐT)
6. **Slide 6:** Kiến Trúc Hệ Thống & Ngăn Xếp Công Nghệ (System Architecture & Tech Stack)
7. **Slide 7:** Phân Hệ Quản Trị Viên (Admin) - Chuẩn Hóa CTĐT 141 TC
8. **Slide 8:** Phân Hệ Giảng Viên - Strict RBAC & Dashboard Cảnh Báo Sớm
9. **Slide 9:** Phân Hệ Sinh Viên - Dashboard & Hồ Sơ Học Vụ 360°
10. **Slide 10:** Phân Hệ Sinh Viên - Smart Academic Planner (Bản Đồ 141 TC)
11. **Slide 11:** Hai Tính Năng Đột Phá: Target GPA Calculator & Mô Phỏng What-If
12. **Slide 12:** Đóng Góp Của Đề Tài, Kết Luận & Hướng Phát Triển (Conclusion)

---

## CHI TIẾT NỘI DUNG TỪNG SLIDE (KÈM GỢI Ý BỐ CỤC & NÓI)

---

### SLIDE 1: TRANG TIÊU ĐỀ (TITLE SLIDE)
* **Tiêu đề chính:** EDUALERT
* **Tiêu đề phụ:** HỆ THỐNG CẢNH BÁO SỚM NGUY CƠ HỌC TẬP ĐA CẤP ĐỘ & TRỢ LÝ KẾ HOẠCH HỌC TẬP TÍN CHỈ TÍCH HỢP AI
* **Khẩu hiệu (Tagline):** *Từ Giám sát Học vụ Bị động sang Can thiệp Sớm và Trao quyền Tự chủ cho Sinh viên*
* **Thông tin báo cáo:**
  * Giảng viên hướng dẫn: [Điền tên GVHD]
  * Sinh viên thực hiện: [Điền tên SV / Nhóm thực hiện]
  * Chuyên ngành: Công nghệ Thông tin / Khoa học Máy tính
  * Ngày báo cáo: Tháng 11/2026

---

### SLIDE 2: ĐẶT VẤN ĐỀ & LÝ DO CHỌN ĐỀ TÀI (PROBLEM STATEMENT)
* **Bối cảnh thực tế:**
  * Đào tạo theo học chế tín chỉ mang lại sự linh hoạt cao nhưng đặt gánh nặng lớn lên khả năng tự quản lý lộ trình học tập của sinh viên.
* **Những tồn đọng nhức nhối hiện nay:**
  1. **Cảnh báo học vụ bị động và chậm trễ:** Nhà trường và CVHT thường chỉ xử lý khi sinh viên đã nhận quyết định cảnh cáo mức 2 hoặc buộc thôi học (ở cuối học kỳ).
  2. **Sinh viên thiếu công cụ định hướng:** Sinh viên bị điểm F thường hoang mang, không biết cách tính điểm bù, không rõ trả nợ môn nào thì tối ưu GPA.
  3. **Quy trình nhập điểm và phân công phân mảnh:** Thiếu cơ chế phân quyền nhập điểm chặt chẽ (Strict RBAC) giữa giảng viên phụ trách môn và lớp học phần.
  4. **Tỷ lệ sinh viên bị đình chỉ/thôi học hàng năm còn cao:** Gây lãng phí nguồn lực đào tạo của gia đình, nhà trường và xã hội.

---

### SLIDE 3: MỤC ĐÍCH & SỨ MỆNH CỦA HỆ THỐNG (GOALS & MISSION)
* **Mục tiêu tổng quát:**
  * Xây dựng một nền tảng số hóa học vụ toàn diện, chuyển đổi mô hình từ **"Xử lý hậu quả"** sang **"Dự báo, cảnh báo sớm và can thiệp kịp thời"**.
* **3 Trụ cột sứ mệnh cốt lõi:**
  1. **Chủ động phát hiện rủi ro (Proactive Detection):** Áp dụng 4 quy tắc nghiêm ngặt của Thông tư 08/2021 để phân tầng sinh viên theo 4 mức độ rủi ro ngay khi có điểm thành phần.
  2. **Hỗ trợ can thiệp thông minh (AI-Powered Counseling):** Tích hợp Gemini AI giúp CVHT bóc tách nguyên nhân sa sút và tự động soạn thảo thư tư vấn cá nhân hóa.
  3. **Trao quyền tự chủ cho sinh viên (Student Empowerment):** Cung cấp công cụ mô phỏng toán học giúp sinh viên tự tính toán mục tiêu ra trường (Target GPA) và kịch bản thế điểm học lại (What-If Simulator) để thoát hiểm.

---

### SLIDE 4: ĐỐI TƯỢNG PHỤC VỤ & MÔ HÌNH 3 PHÂN QUYỀN (STAKEHOLDERS & RBAC)
* **Hệ thống phục vụ 3 nhóm đối tượng chính với phân quyền chặt chẽ:**
  * **1. Quản trị viên (Admin - Phòng Đào tạo):**
    * Quản lý danh mục Khoa, Ngành và Khung CTĐT chuẩn (141 tín chỉ).
    * Quản lý lớp sinh hoạt, danh sách sinh viên năm 1 và tài khoản hệ thống.
    * Phân công Giảng viên phụ trách môn học cho từng lớp cụ thể.
  * **2. Giảng viên & Cố vấn học tập (CVHT):**
    * Nhập điểm thành phần (QT 40% & Thi 60%) cho các lớp được phân công.
    * Theo dõi Dashboard cảnh báo sớm, xem Hồ sơ học vụ 360° của sinh viên lớp mình.
    * Kích hoạt Trợ lý AI để gửi email tư vấn và lưu nhật ký hỗ trợ sinh viên.
  * **3. Sinh viên (End Users):**
    * Tra cứu học bạ điện tử 360°, theo dõi diễn biến GPA qua các học kỳ.
    * Sử dụng Smart Academic Planner để theo dõi tiến độ 141 tín chỉ.
    * Tự tính toán điểm mục tiêu và mô phỏng kế hoạch học tập cá nhân.

---

### SLIDE 5: CƠ SỞ PHÁP LÝ & BỘ QUY TẮC TT 08/2021/TT-BGDĐT
* **Khung tham chiếu học vụ:** Quy chế đào tạo đại học ban hành theo **Thông tư 08/2021/TT-BGDĐT** của Bộ GD&ĐT & Quy định của Trường ĐH Mở TP.HCM.
* **Bộ 4 Quy Tắc Cảnh Báo Sớm (Early Warning Rule Engine):**
  * **Quy tắc 1 (GPA dưới sàn an toàn):** Điểm TB tích lũy dưới ngưỡng sàn theo năm đào tạo (Năm 1: < 1.20, Năm 2: < 1.40, Năm 3: < 1.60, Năm 4: < 1.80).
  * **Quy tắc 2 (Nợ đọng tín chỉ tích lũy):** Tổng số tín chỉ chưa đạt (điểm F) vượt quá 24 tín chỉ toàn khóa.
  * **Quy tắc 3 (Tín chỉ rớt trong kỳ):** Số tín chỉ không đạt trong một học kỳ vượt quá 50% tổng số tín chỉ đã đăng ký của kỳ đó.
  * **Quy tắc 4 (Điểm rèn luyện thấp):** ĐRL học kỳ dưới 50 điểm (xếp loại Yếu/Kém), ảnh hưởng đến điều kiện học vụ.
* **Thang đo rủi ro tổng hợp (Risk Score 0 - 100 điểm):** Phân tầng sinh viên thành 4 nhóm: *Bình thường $\to$ Cần lưu ý $\to$ Cảnh báo học vụ $\to$ Nguy cơ Buộc thôi học*.

---

### SLIDE 6: KIẾN TRÚC HỆ THỐNG & NGĂN XẾP CÔNG NGHỆ (TECH STACK)
* **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS, Lucide Icons, Responsive ERP Layout.
* **Backend & API:** Next.js API Routes (Serverless Architecture), RESTful API endpoints.
* **Cơ sở dữ liệu:** MongoDB Atlas (Cloud Database) qua Mongoose ODM, thiết kế Schema chuẩn hóa dữ liệu học vụ (Faculties, Majors, Classes, Students, CourseGrades, Users).
* **Bảo mật & Phân quyền (Security):**
  * Cơ chế Strict Role-Based Access Control (RBAC).
  * Mã hóa mật khẩu một chiều chuẩn công nghiệp `scrypt` kèm salt ngẫu nhiên.
  * Session token an toàn qua HttpOnly Cookies.
* **Trí tuệ nhân tạo (AI Integration):** Google Gemini API (bóc tách dữ liệu học vụ, đánh giá nhóm tâm lý và đề xuất lộ trình can thiệp học tập).

---

### SLIDE 7: PHÂN HỆ QUẢN TRỊ VIÊN (ADMIN CAPABILITIES)
* **1. Quản lý Khoa & Ngành Đào Tạo:**
  * Mã Khoa / Mã Ngành tự động sinh theo chuẩn quy ước: `[Mã Khoa] + YYMM + XXX` kèm Live Preview Badge.
  * Lưu trữ bền vững (Persistent Storage) trên MongoDB Atlas, chặn xóa an toàn khi đang có dữ liệu con.
* **2. Khung Chương Trình Đào Tạo Chuẩn 141 Tín Chỉ:**
  * Thiết lập cấu trúc 30 - 45 học phần phân bổ khoa học qua 8 học kỳ.
* **3. Quản trị Lớp học & Tiếp nhận Sinh viên:**
  * Đưa sinh viên vào lớp từ đầu Năm 1 (HK1).
  * Điểm số ban đầu bằng 0, tự động tích lũy khi có kết quả điểm học phần.
  * Tự cấp tài khoản mặc định `Sinhvien@123` cho sinh viên mới.
* **4. Phân Công Giảng Viên Phụ Trách Bảng Điểm:**
  * Cấu hình phân quyền cụ thể: Giảng viên A phụ trách Môn B của Lớp C.

---

### SLIDE 8: PHÂN HỆ GIẢNG VIÊN & CỐ VẤN HỌC TẬP (LECTURER & ADVISOR)
* **1. Quản Lý & Nhập Bảng Điểm (Strict RBAC):**
  * Chỉ Giảng viên được Admin phân công mới có nút xanh **"Nhập Điểm"**; các môn khác bị khóa ở chế độ "Chỉ Xem".
  * Nhập điểm Quá trình (40%) và Điểm Thi (60%) $\to$ Hệ thống tự động tính: Điểm hệ 10, Điểm chữ (A, B+, B, C, D, F) và Điểm thang 4 theo chuẩn ĐH Mở.
* **2. Dashboard Cảnh Báo Sớm Nguy Cơ:**
  * Phân loại tự động toàn bộ sinh viên trong lớp thành 4 thẻ màu: *Bình thường (Xanh)*, *Cần lưu ý (Vàng)*, *Cảnh báo (Cam)*, *Buộc thôi học (Đỏ)*.
* **3. Hồ Sơ Học Vụ 360° & Trợ Lý AI Gemini:**
  * Bấm xem hồ sơ sinh viên: Phân tích chi tiết vi phạm từng Rule.
  * Trợ lý AI tự động đọc bảng điểm $\to$ phân tích nguyên nhân $\to$ sinh sẵn **Email tư vấn cá nhân hóa** để CVHT gửi ngay cho sinh viên.
  * Ghi nhật ký tư vấn (Counseling Log) theo dõi tiến độ can thiệp qua từng mốc thời gian.

---

### SLIDE 9: PHÂN HỆ SINH VIÊN - DASHBOARD & HỒ SƠ 360° (STUDENT PROFILE)
* **Giao diện thân thiện, tối giản, lấy sinh viên làm trung tâm (Student-Centric):**
* **1. Bốn Thẻ Chỉ Số Nhanh:**
  * GPA Tích lũy (tô màu theo cảnh báo), Tín chỉ đã đạt, Nợ tín chỉ (F), và Huy hiệu diện học vụ.
* **2. Minh bạch cách tính rủi ro (Risk Breakdown):**
  * Hiển thị điểm nền và thanh điểm trọng số đóng góp từ điểm rớt, GPA và điểm rèn luyện.
* **3. Đối chiếu 4 Tiêu chí Thông tư 08:**
  * Nhận biết chính xác bản thân đang an toàn hay vi phạm quy định nào.
* **4. Biểu Đồ Diễn Biến Điểm Số (GpaTrendChart):**
  * Vẽ đồ thị SVG tương tác thể hiện đường GPA tích lũy và GPA học kỳ.
  * **Đường đứt nét đỏ cảnh báo ngưỡng sàn quy chế** — Giúp sinh viên trực quan hóa vị trí an toàn của mình.
* **5. Nhật Ký CVHT:** Xem lại toàn bộ lời dặn dò, hỗ trợ của Thầy Cô.

---

### SLIDE 10: PHÂN HỆ SINH VIÊN - SMART ACADEMIC PLANNER
* **Bản đồ lộ trình hoàn thành 141 Tín Chỉ Đào Tạo:**
* **1. Metadata Summary Banner:**
  * Tích hợp thanh đổi sinh viên nhanh để kiểm thử nhiều trường hợp học lực.
* **2. Hệ 4 Card ERP Thống Kê Học Vụ:**
  * Tỷ lệ hoàn thành CTĐT (% Tiến độ), Khối lượng tín chỉ nợ F, và Khối lượng tín chỉ còn lại cần học để tốt nghiệp.
* **3. Sub-tab 1: Đối Chiếu Khung CTĐT:**
  * Gom nhóm các môn bị rớt (F) đưa lên bảng cảnh báo đỏ ưu tiên trả nợ.
  * Danh mục các môn học còn lại trong CTĐT được sắp xếp theo học kỳ kèm nút `+ Thêm vào Kế Hoạch`.
* **4. Sub-tab 2: Bảng Điểm Đã Lưu (Học bạ điện tử):**
  * Hiển thị minh bạch toàn bộ các môn đã học, điểm thành phần 40% - 60% được đồng bộ tức thì từ Giảng viên.

---

### SLIDE 11: HAI "VŨ KHÍ" ĐỘT PHÁ CỦA SMART PLANNER
* **Công cụ 1: Target GPA Calculator (Tính Điểm Cần Đạt):**
  * **Bài toán:** Sinh viên muốn tốt nghiệp loại Khá ($GPA \ge 2.50$) hoặc loại Giỏi ($GPA \ge 3.20$) thì các kỳ tới phải học thế nào?
  * **Giải pháp:** Hệ thống chạy thuật toán phân bổ tín chỉ còn lại:
    $$\text{GPA Kỳ Tới Cần Đạt} = \frac{\text{Target GPA} \times 141 - \text{GPA Hiện Tại} \times \text{TC Đã Tích Lũy}}{\text{Số TC Còn Lại}}$$
  * Đưa ra khuyến cáo khoa học: Điểm trung bình mỗi môn cần đạt và tính khả thi thực tế.
* **Công cụ 2: Mô Phỏng What-If (Thế Điểm Học Lại Môn F):**
  * **Nguyên lý tín chỉ:** Khi học lại môn F, **điểm mới sẽ thay thế hoàn toàn điểm F cũ trong công thức tính GPA tích lũy**.
  * **Hiệu quả thực tế:**
    * Sinh viên chọn học lại 2 môn F $\to$ Giả định đạt điểm B+ hoặc A.
    * Kết quả Live: GPA tích lũy bật tăng vọt (ví dụ từ $1.15 \to 2.05$).
    * Trạng thái học vụ đổi ngoạn mục: **Thoát khỏi diện Nguy cơ Buộc thôi học**!
    * Mang lại niềm tin và lộ trình cứu vãn học vụ cụ thể cho sinh viên.

---

### SLIDE 12: ĐÓNG GÓP, KẾT LUẬN & HƯỚNG PHÁT TRIỂN (CONCLUSION)
* **Những đóng góp nổi bật của đề tài:**
  1. Xây dựng hoàn chỉnh chu trình khép kín: **Admin cấu hình $\to$ Giảng viên nhập điểm & cảnh báo $\to$ Sinh viên tự lập kế hoạch**.
  2. Bám sát thực tế Quy chế đào tạo của Trường ĐH Mở và Thông tư 08/2021/TT-BGDĐT.
  3. Ứng dụng AI thiết thực, giải phóng thời gian soạn thảo tư vấn học vụ cho giảng viên.
  4. Tính năng What-If mang giá trị nhân văn sâu sắc, giúp giảm thiểu tỷ lệ sinh viên bỏ học/bị buộc thôi học.
* **Hướng phát triển trong tương lai:**
  * Mở rộng tích hợp cổng API trực tiếp với Hệ thống Quản lý Đào tạo (Edusoft/SIS) hiện có của trường.
  * Phát triển Chatbot trợ lý học vụ AI hoạt động 24/7 trên ứng dụng di động (Mobile App).
  * Ứng dụng Machine Learning nâng cao để dự báo nguy cơ trượt môn trước kỳ thi cuối kỳ dựa trên điểm chuyên cần và quá trình.
* **Lời kết:** Nhóm xin chân thành cảm ơn Quý Thầy Cô trong Hội đồng đã lắng nghe!

---
*(Hết nội dung bộ Slide — Tài liệu chuẩn bị cho bảo vệ đồ án / demo sản phẩm EduAlert)*

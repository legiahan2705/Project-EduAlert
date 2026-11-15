# NỘI DUNG SLIDE THUYẾT TRÌNH ĐỒ ÁN: EDUALERT
*(Viết theo văn phong sinh viên báo cáo thực tế: ngắn gọn, thực tế, dễ hiểu, không sáo rỗng)*

---

## SLIDE 1: GIỚI THIỆU ĐỀ TÀI
* **Tên đề tài:** EduAlert - Website Theo Dõi Học Tập & Cảnh Báo Sớm Nguy Cơ Cho Sinh Viên
* **Người thực hiện:** [Tên của bạn / nhóm]
* **Giảng viên hướng dẫn:** [Tên Thầy/Cô]
* **Mục đích buổi báo cáo:** Giới thiệu hệ thống hỗ trợ sinh viên tự quản lý tiến độ học tập và giúp nhà trường cảnh báo sớm sinh viên có nguy cơ rớt môn, thôi học.

---

## SLIDE 2: VÌ SAO NHÓM LÀM WEBSITE NÀY? (LÝ DO CHỌN ĐỀ TÀI)
*Xuất phát từ chính những khó khăn có thật của sinh viên và thầy cô:*

* **Về phía Sinh viên:**
  * Học tín chỉ rất dễ bị "lạc trôi": Không nhớ mình đã học bao nhiêu tín chỉ, còn nợ môn gì, thiếu môn gì để ra trường.
  * Khi lỡ bị điểm F: Rất hoang mang, không biết phải học lại môn nào để kéo điểm lên, và kỳ sau phải ráng được bao nhiêu điểm mới thoát diện cảnh cáo.
  * Thường chỉ biết mình bị cảnh cáo khi đã có quyết định từ trường thì mọi chuyện đã quá muộn.
* **Về phía Giảng viên / Cố vấn học tập (CVHT):**
  * Mỗi lớp 40 - 50 sinh viên, rất khó để dò từng bảng điểm xem bạn nào đang học yếu để nhắc nhở kịp thời.

---

## SLIDE 3: MỤC TIÊU CỦA WEBSITE (WEB NÀY LÀM RA ĐỂ GIẢI QUYẾT GÌ?)
*Website tập trung vào **3 mục tiêu thiết thực nhất cho sinh viên**:*

1. **Giúp sinh viên tự theo dõi tiến độ học tập:**
   * Xem mình đã hoàn thành bao nhiêu % trên tổng số 141 tín chỉ để ra trường.
   * Biết rõ môn nào đã qua, môn nào đang nợ để chủ động đăng ký học phần.
2. **Cảnh báo sớm để không bị đuổi học:**
   * Hệ thống tự tính điểm và báo ngay sinh viên đang ở mức an toàn hay nguy hiểm theo quy chế trường.
3. **Giúp sinh viên cải thiện điểm số (Tính năng ăn tiền):**
   * Cho sinh viên tự tính xem các kỳ tới cần đạt bao nhiêu điểm để ra trường loại Khá, Giỏi.
   * Cho sinh viên thử "thế điểm F": Giả sử học lại môn F được điểm B hay A thì GPA nhảy lên bao nhiêu, có thoát bị đuổi học không.

---

## SLIDE 4: WEBSITE PHỤC VỤ NHỮNG AI? (3 ĐỐI TƯỢNG SỬ DỤNG)
* **1. Sinh viên (Đối tượng phục vụ chính):**
  * Vào xem bảng điểm, xem mình có bị cảnh báo học vụ không, tự lên kế hoạch học tập để cải thiện điểm.
* **2. Giảng viên & Cố vấn học tập:**
  * Nhập điểm môn học nhanh chóng (hệ thống tự tính điểm 10, thang chữ, thang 4).
  * Nhìn vào danh sách lọc sẵn những bạn sinh viên đang bị nguy hiểm để liên hệ nhắc nhở.
* **3. Quản trị viên (Admin):**
  * Thêm ngành, thêm môn học (khung 141 tín chỉ), tạo lớp, thêm sinh viên và phân công giảng viên dạy môn nào lớp nào.

---

## SLIDE 5: TÍNH NĂNG CHO SINH VIÊN (1) - HỒ SƠ CỦA TÔI & BẢNG ĐIỂM
*Sinh viên đăng nhập vào là thấy ngay tình hình học tập của bản thân:*

* **4 Thẻ số liệu quan trọng nhất:**
  * GPA tích lũy hiện tại (Ví dụ: `2.82` - loại Khá, hoặc `1.15` - báo động đỏ).
  * Số tín chỉ đã đậu (Ví dụ: `41 TC`).
  * Số tín chỉ nợ (Ví dụ: `0 TC` hoặc nợ bao nhiêu môn F).
  * Tình trạng học vụ: An toàn / Cảnh báo / Nguy cơ buộc thôi học.
* **Biểu đồ diễn biến điểm qua từng kỳ:**
  * Vẽ biểu đồ đường xem điểm của mình qua các kỳ đang đi lên hay đi xuống.
  * Có sẵn đường vạch đỏ (ngưỡng an toàn) để biết mình có bị rớt xuống dưới mức nguy hiểm không.
* **Học bạ điện tử chi tiết:**
  * Xem rõ điểm Quá trình (40%), Điểm Thi (60%), điểm tổng kết của từng môn.

---

## SLIDE 6: TÍNH NĂNG CHO SINH VIÊN (2) - THEO DÕI TIẾN ĐỘ 141 TÍN CHỈ
*Phân hệ **Smart Academic Planner** giúp sinh viên không bị sót môn:*

* **Thanh tiến độ CTĐT:**
  * Báo rõ sinh viên đã học được bao nhiêu % chương trình (Ví dụ: 41/141 TC = 29%).
  * Còn lại bao nhiêu tín chỉ và bao nhiêu môn nữa thì đủ điều kiện tốt nghiệp.
* **Bảng gom các môn rớt (F):**
  * Gom riêng các môn bị rớt ra một bảng màu đỏ trên đầu để sinh viên biết đường ưu tiên đăng ký học lại trước.
* **Bảng danh sách môn chưa học:**
  * Chia rõ từng môn thuộc học kỳ nào để sinh viên biết kỳ tới nên đăng ký môn gì.

---

## SLIDE 7: TÍNH NĂNG CẢI THIỆN ĐIỂM - TÍNH ĐIỂM MỤC TIÊU (TARGET GPA)
*Giải quyết câu hỏi đau đầu của sinh viên: "Kỳ sau phải ráng bao nhiêu điểm để tốt nghiệp loại Khá / Giỏi?"*

* **Cách hoạt động cực kỳ đơn giản:**
  * Sinh viên chọn mục tiêu mong muốn: Ví dụ muốn ra trường **loại Giỏi (GPA 3.20)**.
  * Hệ thống tự lấy số tín chỉ còn lại và điểm hiện tại để tính ngược lại:
    $$\text{Điểm kỳ tới cần đạt} = \frac{\text{Điểm mục tiêu} \times 141 - \text{Điểm hiện tại} \times \text{TC đã học}}{\text{Số TC còn lại}}$$
  * Kết quả hiển thị ngay: *"Từ giờ đến khi ra trường, mỗi môn bạn cần đạt trung bình 3.36 (tức là mức B+ hoặc A) là sẽ đạt loại Giỏi!"*
  * Giúp sinh viên có con số cụ thể để phấn đấu, không còn mơ hồ.

---

## SLIDE 8: TÍNH NĂNG CỨU CÁNH - MÔ PHỎNG WHAT-IF (THẾ ĐIỂM HỌC LẠI)
*Giúp những sinh viên đang bị nợ môn thấy được "ánh sáng cuối đường hầm":*

* **Quy chế tín chỉ thực tế:** Khi học lại môn F, **điểm mới sẽ thay thế hoàn toàn điểm F cũ khi tính GPA**.
* **Công cụ Mô phỏng What-If hoạt động ra sao?**
  * Sinh viên tick chọn những môn mình đang bị F (Ví dụ: Giải tích, Lập trình OOP).
  * Nhập thử mức điểm mình tự tin sẽ đạt nếu học lại (Ví dụ: đạt điểm B+ hoặc A).
  * Bấm xem kết quả: Hệ thống tính trước cho sinh viên thấy:
    * **GPA nhảy vọt:** Từ `1.15` nhảy thẳng lên `2.05`.
    * **Tình trạng học vụ:** Từ `Nguy cơ bị đuổi học` $\to$ chuyển thành `An toàn / Bình thường`.
* **Ý nghĩa:** Cho sinh viên thấy chỉ cần tập trung trả nợ 2-3 môn quan trọng là cứu được cả quá trình học, không bị bỏ cuộc giữa chừng.

---

## SLIDE 9: TÍNH NĂNG CHO GIẢNG VIÊN & CỐ VẤN HỌC TẬP
*Giúp Thầy Cô đỡ tốn công sức mà vẫn theo sát được sinh viên:*

* **1. Nhập điểm tiện lợi:**
  * Giảng viên chỉ cần nhập điểm Quá trình (40%) và Điểm Thi (60%).
  * Hệ thống tự động tính ra điểm 10, quy đổi ra điểm chữ (A, B, C, D, F) và hệ 4 theo đúng quy chế ĐH Mở.
  * Phân quyền chặt: Thầy Cô nào được phân công dạy lớp đó môn đó thì mới sửa được điểm.
* **2. Bảng cảnh báo sớm sinh viên yếu:**
  * Tự động lọc ra danh sách những sinh viên trong lớp đang có nguy cơ bị cảnh cáo học vụ để CVHT kịp thời nhắc nhở, nhắn tin hỗ trợ.

---

## SLIDE 10: QUY CHẾ TÍNH CẢNH BÁO (DỰA THEO THÔNG TƯ 08/2021 BGD&ĐT)
*Hệ thống không tự ý đánh giá bừa, mà bám sát 4 tiêu chí quy chế của Bộ:*

1. **Điểm GPA dưới sàn:** Năm 1 dưới 1.20, Năm 2 dưới 1.40, Năm 3 dưới 1.60.
2. **Nợ quá nhiều môn:** Tổng số tín chỉ nợ vượt quá 24 tín chỉ toàn khóa.
3. **Rớt nhiều trong 1 kỳ:** Trong kỳ rớt hơn 50% số tín chỉ đăng ký.
4. **Điểm rèn luyện thấp:** Điểm rèn luyện dưới 50 điểm (loại Yếu/Kém).
*$\to$ Dựa vào 4 tiêu chí này, hệ thống sẽ xếp sinh viên vào diện An toàn hay Nguy hiểm để nhắc nhở.*

---

## SLIDE 11: CÔNG NGHỆ XÂY DỰNG WEBSITE
*Nhóm ưu tiên công nghệ hiện đại, chạy nhanh, mượt mà trên cả máy tính lẫn điện thoại:*

* **Giao diện & Logic (Frontend & Backend):** Next.js 16, React 19, Tailwind CSS.
* **Cơ sở dữ liệu (Database):** MongoDB Atlas (Lưu trữ đám mây, dữ liệu luôn được lưu thực tế, không lo mất dữ liệu).
* **Bảo mật:** Phân quyền 3 vai trò rõ ràng, mật khẩu được mã hóa an toàn.

---

## SLIDE 12: TỔNG KẾT & HƯỚNG PHÁT TRIỂN
* **Những gì đề tài đã làm được:**
  * Giải quyết đúng nỗi lo của sinh viên: Biết rõ tiến độ 141 tín chỉ, biết cách kéo điểm, biết mô phỏng học lại để không bị đuổi học.
  * Hỗ trợ đắc lực cho Giảng viên trong việc chấm điểm và quản lý học vụ lớp sinh hoạt.
  * Website chạy mượt, giao diện rõ ràng, bám sát thực tế quy chế tín chỉ.
* **Hướng phát triển tiếp theo:**
  * Làm thêm phiên bản Mobile App cho sinh viên tiện tra cứu trên điện thoại.
  * Gửi thông báo tự động qua Email hoặc Zalo khi sinh viên có điểm mới hoặc rơi vào mức cảnh báo.
* **Lời kết:** Nhóm em xin chân thành cảm ơn Quý Thầy Cô đã lắng nghe phần trình bày!

---
*(Hết nội dung 12 Slide)*

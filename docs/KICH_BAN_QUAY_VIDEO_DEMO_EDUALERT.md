# KỊCH BẢN QUAY VIDEO DEMO & GIỚI THIỆU HỆ THỐNG EDUALERT
## Chuẩn kịch bản quay: 3 Phân quyền (Admin $\to$ Giảng viên $\to$ Sinh viên)

* **Tên đề tài:** EduAlert - Hệ Thống Cảnh Báo Sớm Học Vụ & Trợ Lý Kế Hoạch Học Tập Tín Chỉ Tích Hợp AI
* **Thời lượng đề xuất:** 6 - 8 phút (Rất vừa vặn cho buổi báo cáo đồ án, bảo vệ luận văn hoặc demo sản phẩm)
* **Phần mềm quay khuyến nghị:** OBS Studio, Loom, Camtasia, hoặc phím tắt Windows `Win + Alt + R`
* **Chuẩn bị trước khi quay:**
  1. Mở sẵn trình duyệt (Chrome/Edge) tại: `http://localhost:3000` (hoặc liên kết Vercel đã deploy).
  2. Bật độ phân giải màn hình 1080p (Full HD - $1920 \times 1080$), zoom trình duyệt 100% hoặc 110% cho giao diện rõ nét.
  3. Danh sách 3 tài khoản mẫu thực chiến:
     * **Quản trị viên (Admin):** `admin` / `Admin@123`
     * **Giảng viên (Lecturer):** `gv.han` / `123456789` (ThS. Lê Gia Hân) hoặc `gv.nam` / `Giangvien@123`
     * **Sinh viên (Student):** `2251012099` (Vũ Hải Trung) hoặc `2251050001` (Nguyễn Văn An) / `Sinhvien@123`

---

## TỔNG QUAN TIẾN TRÌNH QUAY (FLOW CHART)

```
[Phần 1: Giới thiệu 3 Role & Quên MK] (0:00 - 1:00)
                  │
                  ▼
[Phần 2: Quản trị viên (Admin)] (1:00 - 3:00)
  ├─ Quản lý Khoa & Ngành Đào Tạo (Mã tự sinh, Live Badge)
  ├─ Khung CTĐT 141 tín chỉ & Quản lý Lớp học
  ├─ Thêm Sinh viên vào lớp (Chuẩn Năm 1, tự cấp tài khoản)
  └─ Cấu hình Phân công Giảng viên phụ trách môn học
                  │
                  ▼
[Phần 3: Giảng viên & CVHT] (3:00 - 5:15)
  ├─ Quản lý Bảng điểm (Strict RBAC: Chỉ GV phụ trách mới được nhập điểm)
  ├─ Nhập điểm QT 40% & Thi 60% -> Tự động tính điểm hệ 10, hệ 4, điểm chữ -> Lưu DB
  ├─ Dashboard Cảnh báo sớm nguy cơ học vụ (4 Rules Thông tư 08)
  └─ Hồ sơ 360° sinh viên & Trợ lý AI Gemini can thiệp học vụ
                  │
                  ▼
[Phần 4: Sinh viên] (5:15 - 7:00)
  ├─ Xem điểm học phần & GPA tích lũy được cập nhật tức thì
  ├─ Smart Academic Planner (Theo dõi tiến độ 141 tín chỉ)
  ├─ Target GPA Calculator (Tính điểm cần đạt để ra trường loại Khá/Giỏi)
  └─ Mô phỏng What-If thế điểm học lại môn F -> Bật tăng GPA thoát diện Buộc thôi học
                  │
                  ▼
[Phần 5: Lời kết & Đóng video] (7:00 - 7:30)
```

---

## BẢNG KỊCH BẢN CHI TIẾT TỪNG PHÂN CẢNH (STORYBOARD)

### PHẦN 1: MỞ ĐẦU & GIỚI THIỆU 3 PHÂN QUYỀN (0:00 - 1:00)

| Thời gian | Thao tác trên màn hình | Lời thoại thuyết minh (Voiceover) | Ghi chú & Hiệu ứng |
| :--- | :--- | :--- | :--- |
| **0:00 - 0:30** | Màn hình hiển thị trang Đăng nhập (`/login`) với giao diện sạch đẹp, biểu tượng nón cử nhân EduAlert. | *"Kính chào Thầy Cô và Hội đồng đánh giá. Trong đào tạo đại học theo học chế tín chỉ, việc giám sát học vụ truyền thống thường bị động — nhà trường chỉ xử lý kỷ luật khi sinh viên đã chạm ngưỡng bị buộc thôi học. Để giải quyết triệt để bài toán này, nhóm chúng em đã xây dựng **EduAlert — Hệ thống Cảnh báo sớm học vụ & Trợ lý học tập thông minh tích hợp AI**."* | Giữ chuột ở giữa, lia nhẹ sang logo EduAlert. |
| **0:30 - 0:45** | Bấm lần lượt qua 3 Tab vai trò ở thanh chọn Role: **Sinh viên**, **Giảng viên**, **Quản trị viên**. | *"Hệ thống được thiết kế theo mô hình Phân quyền chặt chẽ (RBAC) với 3 vai trò rõ rệt: **Quản trị viên** cấu hình cơ cấu đào tạo và phân công giảng dạy; **Giảng viên** phụ trách nhập điểm và theo dõi cảnh báo học vụ sinh viên; và **Sinh viên** tự chủ theo dõi lộ trình và mô phỏng cải thiện điểm số."* | Bấm chuyển đổi mượt mà giữa 3 role. |
| **0:45 - 1:00** | Bấm vào liên kết **"Quên mật khẩu?"** dưới ô mật khẩu $\to$ Modal 2 bước mở ra. Nhập thử MSSV `2251050001` $\to$ Hiện tên sinh viên $\to$ Bấm Đóng. | *"Đặc biệt, hệ thống hỗ trợ tính năng **Tự phục hồi mật khẩu** qua mã hóa scrypt, giúp người dùng chủ động lấy lại tài khoản mà không cần can thiệp thủ công từ quản trị viên."* | Mở modal, thao tác lướt qua rồi đóng lại. |

---

### PHẦN 2: ROLE 1 - QUẢN TRỊ VIÊN (ADMIN) CẤU HÌNH ĐÀO TẠO (1:00 - 3:00)

| Thời gian | Thao tác trên màn hình | Lời thoại thuyết minh (Voiceover) | Ghi chú & Hiệu ứng |
| :--- | :--- | :--- | :--- |
| **1:00 - 1:20** | Chọn tab **Quản trị viên** $\to$ Đăng nhập `admin` / `Admin@123` $\to$ Vào trang quản trị. Menu bên trái hiện đầy đủ các phân hệ quản lý. | *"Đầu tiên, chúng ta bước vào vai trò **Quản trị viên (Admin)**. Admin nắm toàn quyền thiết lập cơ cấu tổ chức đào tạo, phân quyền tài khoản và cấu hình phân công học vụ."* | Đăng nhập Admin thành công. |
| **1:20 - 1:45** | Bấm menu **"Quản Lý Khoa"** $\to$ Lướt qua danh sách khoa $\to$ Bấm menu **"Quản Lý Ngành & CTĐT"** $\to$ Bấm nút **"+ Thêm Ngành Mới"**. | *"Tại phân hệ **Quản Lý Ngành & CTĐT**, khi tạo ngành mới, mã ngành được hệ thống tự động sinh theo chuẩn [Mã Khoa] + YYMM + XXX kèm Live Preview Badge trực quan. Ngay khi bấm Tạo, toàn bộ thông tin lập tức được lưu vĩnh viễn vào cơ sở dữ liệu MongoDB Atlas."* | Chọn thử Khoa, chỉ chuột vào huy hiệu Mã tự sinh. Bấm Hủy. |
| **1:45 - 2:15** | Chọn ngành **Demo (`DEMO2611001`)** $\to$ Bấm **"Xem Chi Tiết Ngành"** $\to$ Tab **"Khung CTĐT"** hiện ra 30 môn học (141 tín chỉ). Chuyển sang sub-tab **"Danh Sách Lớp & Sinh Viên"**. | *"Bước vào ngành đào tạo, hệ thống nạp Khung chương trình đào tạo chuẩn 141 tín chỉ chia theo 8 học kỳ. Tại tab Lớp học, ta thấy lớp `DH22IT01C`. Mọi sinh viên mới đều được tiếp nhận vào lớp từ đầu Năm 1 (HK1). Hệ thống không cho nhập điểm tích lũy ban đầu tùy tiện, mà điểm số và số tín chỉ đạt sẽ được tự động tính toán từ bảng điểm của từng môn học khi giảng viên chấm điểm."* | Cuộn nhẹ xem 30 môn CTĐT và danh sách 25 sinh viên lớp `DH22IT01C`. |
| **2:15 - 2:35** | Bấm nút **"+ Thêm Sinh Viên Mới"** $\to$ Modal hiện ra với thông báo quy chế Năm 1 và tự sinh tài khoản `Sinhvien@123`. | *"Khi thêm sinh viên vào lớp, hệ thống tự động liên kết sinh viên vào danh sách điểm của tất cả các môn học thuộc lớp đó và kích hoạt tài khoản đăng nhập tự động cho sinh viên."* | Thao tác mở modal, chỉ vào thông báo rồi đóng modal. |
| **2:35 - 3:00** | Bấm vào menu **"Quản Lý Bảng Điểm"**. Chỉ chuột vào huy hiệu: *'Bảng điểm tự động khởi tạo theo CTĐT chuẩn'*. Tìm lớp `DH22IT01C`, môn `COSC1301`. Bấm nút **"Phân công"** (icon `UserCheck`). | *"Điểm cải tiến vượt bậc: Bảng điểm không cần tạo thủ công mà được tự động sinh theo Khung CTĐT của từng lớp. Tại đây, Admin thực hiện **Phân công Giảng viên phụ trách**: Chọn tài khoản `gv.han - Demo (ThS. Lê Gia Hân)` phụ trách môn Nhập môn lập trình cho lớp `DH22IT01C`. Chỉ giảng viên được phân công này mới có quyền nhập và sửa điểm!"* | Modal Phân công hiện ra $\to$ Chọn `gv.han` $\to$ Bấm Xác Nhận Phân Công $\to$ Thông báo thành công hiện lên. |

---

### PHẦN 3: ROLE 2 - GIẢNG VIÊN NHẬP ĐIỂM & THEO DÕI NGUY CƠ (3:00 - 5:15)

| Thời gian | Thao tác trên màn hình | Lời thoại thuyết minh (Voiceover) | Ghi chú & Hiệu ứng |
| :--- | :--- | :--- | :--- |
| **3:00 - 3:20** | Đăng xuất Admin $\to$ Chọn tab Giảng viên $\to$ Đăng nhập `gv.han` / `123456789` $\to$ Vào giao diện Giảng viên ThS. Lê Gia Hân. | *"Bây giờ, chúng ta chuyển sang vai trò **Giảng viên và Cố vấn học tập** với tài khoản `gv.han` vừa được Admin phân công."* | Thao tác đăng nhập Giảng viên mượt mà. |
| **3:20 - 3:55** | Bấm vào tab **"Quản Lý Bảng Điểm"** $\to$ Mở rộng môn **`COSC1301`** $\to$ Tại dòng lớp `DH22IT01C` hiện nút xanh **"Nhập Điểm"**, còn các lớp khác không phụ trách hiện nút xám **"Xem Điểm"**. Bấm vào **"Nhập Điểm"**. | *"Nhờ cơ chế phân quyền nghiêm ngặt (Strict RBAC), với môn và lớp do mình phụ trách, Giảng viên có nút xanh **'Nhập Điểm'**; còn các môn của giảng viên khác sẽ bị khóa ở chế độ 'Chỉ Xem'. Vào màn hình chấm điểm, Giảng viên nhập Điểm Quá trình 40% và Điểm Thi 60%. Hệ thống tức thì tự động tính Điểm hệ 10, quy đổi thang điểm 4 và thang điểm chữ theo quy chế Đại học Mở."* | Thử sửa 1-2 điểm sinh viên $\to$ Thấy điểm tổng kết và điểm chữ nhảy tự động $\to$ Bấm **"Lưu Bảng Điểm"** (hiện tích xanh lưu DB). |
| **3:55 - 4:40** | Bấm menu bên trái **"Cảnh Báo Sớm Nguy Cơ"** $\to$ Dashboard phân tầng 4 nhóm sinh viên theo Thông tư 08 hiện ra (Bình thường, Cần lưu ý, Cảnh báo học vụ, Nguy cơ buộc thôi học). | *"Ngay sau khi lưu bảng điểm, hệ thống tự động chạy thuật toán phân tích trên toàn bộ cơ sở dữ liệu. Tại Dashboard Cảnh Báo Sớm, Cố vấn học tập nhìn thấy bức tranh toàn cảnh: Sinh viên được tự động phân vào 4 mức độ rủi ro dựa trên 4 Rule nghiêm ngặt của Thông tư 08 (GPA dưới sàn, nợ tín chỉ vượt ngưỡng, sa sút liên tiếp và điểm rèn luyện thấp)."* | Rê chuột qua 4 thẻ thống kê và danh sách sinh viên được gắn nhãn màu đỏ/vàng/xanh. |
| **4:40 - 5:15** | Bấm vào sinh viên có nguy cơ cao (ví dụ: **Đặng Tuấn Kiệt** hoặc **Nguyễn Văn An**) $\to$ Bấm **"Xem Hồ Sơ 360°"**. Cuộn xem phân tích vi phạm Rule và mở tab **"Trợ Lý AI Cố Vấn"**. | *"Mở Hồ sơ 360° của sinh viên, CVHT nắm được mọi ngóc ngách: từ lịch sử học tập, các quy tắc vi phạm đến bảng điểm chi tiết. Đặc biệt, Trợ lý AI tích hợp Gemini phân tích nguyên nhân học tập và tự động soạn sẵn **Email tư vấn cá nhân hóa**, giúp CVHT gửi ngay thông báo hỗ trợ sinh viên kịp thời."* | Chỉ chuột vào khung gợi ý và Email của AI. Đóng modal. |

---

### PHẦN 4: ROLE 3 - SINH VIÊN & TRỢ LÝ HỌC TẬP THÔNG MINH (5:15 - 7:00)

| Thời gian | Thao tác trên màn hình | Lời thoại thuyết minh (Voiceover) | Ghi chú & Hiệu ứng |
| :--- | :--- | :--- | :--- |
| **5:15 - 5:35** | Đăng xuất Giảng viên $\to$ Chọn tab **Sinh viên** $\to$ Đăng nhập `2251012099` (hoặc `2251050001`) / `Sinhvien@123` $\to$ Vào trang cá nhân sinh viên. | *"Và cuối cùng là vai trò trung tâm của hệ thống: **Sinh viên**. Sinh viên đăng nhập vào hệ thống để chủ động nắm bắt tình trạng học tập của chính mình thay vì chờ đợi thông báo kỷ luật từ phòng đào tạo."* | Đăng nhập tài khoản sinh viên. |
| **5:35 - 6:00** | Trên Dashboard sinh viên: Thấy ngay GPA tích lũy, số tín chỉ đã đạt và tình trạng cảnh báo. Bấm vào tab **"Smart Academic Planner"**. | *"Sinh viên nhìn thấy ngay tiến độ tích lũy trên tổng 141 tín chỉ. Bảng điểm từng môn học vừa được giảng viên nhập ban nãy đã được cập nhật tức thì vào hồ sơ cá nhân với đầy đủ điểm số hệ 10 và hệ chữ."* | Cuộn xem bảng điểm cá nhân và thanh tiến độ tín chỉ. |
| **6:00 - 6:30** | Cuộn đến công cụ **"Target GPA Calculator"** $\to$ Chọn mục tiêu tốt nghiệp loại Khá (GPA 2.50) hoặc Giỏi (3.20). Xem hệ thống tính điểm kỳ tới. | *"Công cụ **Target GPA Calculator** giải quyết nỗi băn khoăn lớn nhất của sinh viên: 'Cần đạt bao nhiêu điểm ở các kỳ còn lại để ra trường loại Khá hoặc Giỏi?'. Hệ thống tự động tính toán mục tiêu điểm kỳ tới một cách khoa học và thực tế."* | Thao tác kéo/chọn mục tiêu, hệ thống hiển thị điểm cần đạt. |
| **6:30 - 7:00** | Cuộn xuống công cụ **"Mô Phỏng Thế Điểm Học Lại Môn F (What-If)"** $\to$ Tích chọn học lại các môn bị điểm F $\to$ Chọn điểm giả định đạt B hoặc C $\to$ Khung kết quả màu xanh lá hiện lên: GPA tích lũy vọt tăng và nhãn cảnh báo chuyển sang An toàn. | *"Đặc biệt nhất là tính năng **Mô Phỏng What-If**: Theo quy chế tín chỉ, điểm học lại môn F sẽ thay thế hoàn toàn điểm cũ khi tính GPA tích lũy. Khi sinh viên thử chọn học lại các môn nợ, hệ thống tính toán trước: GPA tích lũy lập tức bật tăng từ 1.15 lên 1.95 và chuyển sang diện **THOÁT NGUY CƠ BUỘC THÔI HỌC**! Tính năng này mang lại cho sinh viên lộ trình cứu vãn rõ ràng và niềm tin tiếp tục con đường học đại học."* | Zoom nhẹ vào khung kết quả What-If xanh lá rực rỡ. |

---

### PHẦN 5: TỔNG KẾT & LỜI KẾT (7:00 - 7:30)

| Thời gian | Thao tác trên màn hình | Lời thoại thuyết minh (Voiceover) | Ghi chú & Hiệu ứng |
| :--- | :--- | :--- | :--- |
| **7:00 - 7:30** | Quay trở về trang Tổng quan hoặc trang Đăng nhập. Di chuyển chuột nhẹ nhàng chào kết thúc. | *"Tóm lại, **EduAlert** đã số hóa toàn diện quy trình học vụ: từ khâu Quản trị đào tạo chuẩn chỉ của Admin, quyền Nhập điểm và Cảnh báo sớm của Giảng viên, cho đến Công cụ lập kế hoạch học tập tự phục vụ cho Sinh viên. Hệ thống chứng minh tính khả thi thực tế cao, bám sát quy chế và sẵn sàng triển khai tại các trường đại học. Nhóm chúng em xin chân thành cảm ơn Quý Thầy Cô và các bạn đã theo dõi!"* | Giọng kết tự tin, chuyên nghiệp. Kết thúc video. |

---

## 🎬 5 NGUYÊN TẮC VÀNG KHI QUAY ĐỂ VIDEO ĐẠT ĐIỂM TỐI ĐA

1. **Chuẩn bị sẵn 3 cửa sổ/tab:** Mở sẵn các trình duyệt hoặc tab ẩn danh đăng nhập sẵn Admin, Giảng viên (`gv.han`), Sinh viên (`2251012099` hoặc `2251050001`) để chuyển đổi tức thì không cần gõ lại mất thời gian.
2. **Quy tắc dừng chuột 2 giây:** Khi bấm vào các tính năng quan trọng (như nút *Phân công GV*, nút *Lưu Bảng Điểm*, nút *Xem Hồ Sơ 360°*, hoặc *Kết quả What-If*), hãy **giữ chuột tĩnh 1 đến 2 giây** để người xem kịp đọc số liệu và cảm nhận được sự mượt mà.
3. **Giọng nói dứt khoát, hào hứng:** Nhấn mạnh các từ khóa đắt giá: *Strict RBAC, Tự động hóa CTĐT, Thông tư 08, Trợ lý AI Gemini, Mô phỏng What-If*.
4. **Không để màn hình chết:** Vừa nói vừa rê chuột theo nội dung tương ứng để mắt người xem luôn tập trung vào điểm sáng của tính năng.
5. **Kiểm tra âm lượng micro:** Thu thử 15 giây đầu để kiểm tra âm lượng mic rõ ràng, không rè, không quá nhỏ trước khi quay trọn vẹn toàn bộ video.

# KỊCH BẢN QUAY VIDEO DEMO & GIỚI THIỆU HỆ THỐNG EDUALERT
## (Kết hợp Giới thiệu đề tài + Hướng dẫn sử dụng thực tế 3 Phân quyền)

* **Tên dự án:** EduAlert - Hệ Thống Cảnh Báo Sớm Học Vụ & Trợ Lý Học Tập Tích Hợp AI
* **Thời lượng đề xuất:** 5 - 6 phút (Chuẩn báo cáo đồ án / Thuyết trình sản phẩm)
* **Công cụ quay khuyến nghị:** OBS Studio, Loom, hoặc Clipchamp (Windows + Alt + R)
* **Chuẩn bị trước khi quay:**
  1. Mở sẵn trình duyệt tại: `http://localhost:3000` (hoặc link Vercel)
  2. Bật độ phân giải màn hình 1080p (Full HD), phóng to trình duyệt khoảng 100% hoặc 110% để chữ rõ ràng.
  3. Ghi nhớ các tài khoản demo:
     * Admin: `admin` / `Admin@123`
     * Giảng viên: `gv.nam` / `Giangvien@123`
     * Sinh viên: `2251050001` / `Sinhvien@123`

---

## BẢNG KỊCH BẢN CHI TIẾT TỪNG PHÂN CẢNH (STORYBOARD)

### PHẦN 1: MỞ ĐẦU & BỐI CẢNH DỰ ÁN (0:00 - 0:45)

| Thời gian | Thao tác trên màn hình | Lời thoại thuyết minh (Voiceover) | Ghi chú & Hiệu ứng |
| :--- | :--- | :--- | :--- |
| **0:00 - 0:25** | Màn hình hiển thị trang Đăng nhập EduAlert (`/login`) với gradient xanh ngọc bích sang trọng, logo nón cử nhân chuyển động nhẹ. | *"Kính chào Thầy Cô và các bạn. Trong mô hình đào tạo theo hệ thống tín chỉ, mỗi học kỳ có hàng trăm sinh viên rơi vào tình trạng bị cảnh báo học vụ, thậm chí bị buộc thôi học trong sự ngỡ ngàng vì không kiểm soát được điểm F và GPA tích lũy. Cố vấn học tập thì thiếu công cụ cảnh báo sớm, còn nhà trường chỉ xử lý hậu quả ở phần ngọn."* | Để chuột nhẹ nhàng ở giữa màn hình. |
| **0:25 - 0:45** | Rê chuột qua 3 tab vai trò: Sinh viên, Giảng viên, Quản trị viên. | *"Xuất phát từ thực trạng đó, nhóm chúng em đã nghiên cứu và phát triển **EduAlert** — Nền tảng chuyển đổi số trong quản lý học vụ: Chuyển dịch từ 'Xử lý kỷ luật bị động' sang 'Giám sát cảnh báo sớm chủ động' bám sát Thông tư 08 của Bộ Giáo dục & Đào tạo, đồng thời tích hợp Trợ lý AI và công cụ tự phục vụ cho sinh viên."* | Di chuyển chuột lướt qua các vai trò. |

---

### PHẦN 2: TÍNH NĂNG ĐĂNG NHẬP & TỰ PHỤC HỒI MẬT KHẨU (0:45 - 1:20)

| Thời gian | Thao tác trên màn hình | Lời thoại thuyết minh (Voiceover) | Ghi chú & Hiệu ứng |
| :--- | :--- | :--- | :--- |
| **0:45 - 1:05** | Bấm vào liên kết **"Quên mật khẩu?"** ngay dưới ô mật khẩu $\to$ Modal 2 bước hiện ra. Nhập MSSV `2251050001` và email `2251050001@student.ou.edu.vn` $\to$ Bấm **"Tiếp Tục Xác Minh"**. | *"Đầu tiên, hệ thống cung cấp tính năng Tự phục hồi mật khẩu tiện lợi. Khi người dùng quên mật khẩu, chỉ cần bấm 'Quên mật khẩu?'. Hệ thống sẽ xác thực danh tính qua Email trường hoặc Số điện thoại trong hồ sơ."* | Zoom nhẹ vào Modal xác minh. |
| **1:05 - 1:20** | Bước 2 hiện ra với tên sinh viên "Nguyễn Văn An". Nhập mật khẩu mới `Sinhvien@123` $\to$ Bấm **"Cập Nhật Mật Khẩu"** $\to$ Màn hình hiện tích xanh thành công $\to$ Bấm **"Đăng Nhập Ngay"**. | *"Khi xác thực chính xác, người dùng có thể tự đặt mật khẩu mới với thuật toán mã hóa scrypt bảo mật. Bấm 'Đăng Nhập Ngay', hệ thống sẽ tự động điền thông tin để đăng nhập tức thì."* | Thao tác dứt khoát, mượt mà. |

---

### PHẦN 3: PHÂN HỆ QUẢN TRỊ VIÊN (ADMIN) - QUẢN LÝ ĐÀO TẠO (1:20 - 2:30)

| Thời gian | Thao tác trên màn hình | Lời thoại thuyết minh (Voiceover) | Ghi chú & Hiệu ứng |
| :--- | :--- | :--- | :--- |
| **1:20 - 1:35** | Chọn tab **Quản trị viên** $\to$ Đăng nhập với `admin` / `Admin@123` $\to$ Vào Dashboard. | *"Tiếp theo, chúng ta đăng nhập với vai trò Quản trị viên (Admin). Admin có quyền quản trị toàn diện cơ cấu đào tạo gồm Khoa, Ngành, Khung chương trình đào tạo, Lớp học vụ và Quản lý tài khoản."* | Màn hình chuyển vào Dashboard quản trị. |
| **1:35 - 1:55** | Bấm menu bên trái **"Quản Lý Ngành & CTĐT"** $\to$ Bấm nút **"+ Thêm Ngành Mới"**. Chọn Khoa: Công nghệ sinh học. Chỉ vào **Live Preview Badge** đang tự động sinh mã dạng `FBT2611001`. | *"Tại phân hệ Quản lý Ngành, khi tạo ngành mới, hệ thống áp dụng cơ chế tự sinh mã chuẩn hóa [Ký hiệu Khoa] + YYMM + XXX kèm Live Preview Badge trực quan. Giao diện được thiết kế 2 cột cân xứng chuẩn Clean ERP, loại bỏ hoàn toàn các khoảng trắng thừa."* | Rê chuột chỉ vào khung xem trước mã ngành. |
| **1:55 - 2:15** | Nhấp vào ngành **Khoa học máy tính** $\to$ Bấm **"Xem Chi Tiết"** $\to$ Chuyển qua tab **"Danh Sách Lớp & Sinh Viên"**. | *"Đặc biệt, hệ thống áp dụng quy định đào tạo chuẩn: Mọi sinh viên mới đều được tiếp nhận vào lớp từ đầu Năm 1 (HK1). Hệ thống không cho phép nhập tùy tiện GPA tích lũy ban đầu, mà điểm tích lũy và số tín chỉ đạt sẽ được tự động tính toán từ bảng điểm của từng môn học trong CTĐT."* | Rê chuột qua danh sách sinh viên lớp `DH22CS01C`. |
| **2:15 - 2:30** | Bấm vào nút **"+ Thêm Sinh Viên"** $\to$ Modal thêm sinh viên mở ra với ghi chú về quy định Năm 1 và tự sinh tài khoản. | *"Khi thêm sinh viên vào lớp, hệ thống sẽ tự động liên kết sinh viên vào danh sách điểm của tất cả các môn học thuộc lớp đó và kích hoạt tài khoản đăng nhập tự động."* | Bấm Hủy modal và Đăng xuất Admin. |

---

### PHẦN 4: PHÂN HỆ GIẢNG VIÊN & CỐ VẤN HỌC TẬP (2:30 - 3:55)

| Thời gian | Thao tác trên màn hình | Lời thoại thuyết minh (Voiceover) | Ghi chú & Hiệu ứng |
| :--- | :--- | :--- | :--- |
| **2:30 - 2:45** | Đăng nhập tài khoản Giảng viên: `gv.nam` / `Giangvien@123` $\to$ Vào trang chính. | *"Bây giờ, chúng ta đăng nhập với vai trò Giảng viên và Cố vấn học tập (CVHT). Để bảo đảm tính khách quan, Admin không trực tiếp quản lý bảng điểm; chỉ Giảng viên được phân công mới có quyền nhập điểm."* | Chuyển vai trò sang Giảng viên. |
| **2:45 - 3:15** | Bấm vào tab **"Quản Lý Bảng Điểm"** $\to$ Thấy danh sách bảng điểm được **Group by theo môn học**. Mở rộng môn `COSC1301` $\to$ Bấm **"Nhập Điểm"** bảng điểm lớp `DH22CS01C`. | *"Bảng điểm được gom nhóm thông minh theo Môn học. Giảng viên nhập điểm Quá trình (40%) và Điểm Thi (60%), hệ thống sẽ tự động tính Điểm tổng kết hệ 10, quy đổi thang chữ và thang điểm 4. Khi bấm 'Lưu Bảng Điểm', hệ thống lập tức tự động cập nhật lại GPA tích lũy cho sinh viên trong CSDL."* | Nhập thử 1 điểm và bấm Lưu. |
| **3:15 - 3:55** | Bấm vào tab **"Cảnh Báo Sớm Nguy Cơ"** $\to$ Dashboard phân tầng 4 nhóm sinh viên hiện ra. Nhấp vào sinh viên **Nguyễn Văn An** $\to$ Bấm **"Xem Hồ Sơ 360°"**. | *"Đây là trái tim của hệ thống: Dashboard Giám sát cảnh báo sớm tự động phân loại sinh viên thành 4 nhóm theo Thông tư 08. Mở Hồ sơ 360° của sinh viên Nguyễn Văn An, ta thấy rõ các bài test 4 Quy tắc vi phạm, lịch sử điểm sa sút, và kích hoạt Trợ lý AI Gemini để phân tích nguyên nhân tâm lý cũng như tự soạn thảo Email can thiệp cho CVHT."* | Mở modal Hồ sơ 360°, cuộn xem AI gợi ý. |

---

### PHẦN 5: PHÂN HỆ SINH VIÊN - KẾ HOẠCH HỌC TẬP THÔNG MINH (3:55 - 5:10)

| Thời gian | Thao tác trên màn hình | Lời thoại thuyết minh (Voiceover) | Ghi chú & Hiệu ứng |
| :--- | :--- | :--- | :--- |
| **3:55 - 4:15** | Đăng xuất Giảng viên $\to$ Đăng nhập vai trò **Sinh viên** với MSSV `2251050001` / `Sinhvien@123`. | *"Cuối cùng, chúng ta đăng nhập với tư cách sinh viên Nguyễn Văn An — người đang nằm trong diện Nguy cơ buộc thôi học với GPA chỉ 1.15 và nợ 26 tín chỉ."* | Đăng nhập tài khoản sinh viên. |
| **4:15 - 4:40** | Bấm vào tab **"Smart Academic Planner"** $\to$ Xem thanh tiến độ tích lũy 141 tín chỉ. Kéo xuống mục **Target GPA Calculator** $\to$ Chọn mục tiêu tốt nghiệp loại Khá (2.50). | *"Tại giao diện Smart Academic Planner, sinh viên tự đối chiếu tiến độ hoàn thành chuẩn 141 tín chỉ. Công cụ Target GPA Calculator cho biết chính xác để ra trường loại Khá, sinh viên cần đạt bao nhiêu điểm ở các học kỳ còn lại."* | Thao tác tính Target GPA. |
| **4:40 - 5:10** | Kéo xuống mục **"Mô Phỏng Thế Điểm Học Lại Môn F (What-If)"** $\to$ Tích chọn học lại 2 môn F: *Nhập môn lập trình* và *Toán rời rạc* với điểm B. Xem kết quả GPA tích lũy vọt từ **1.15 lên 1.95**, số tín chỉ nợ giảm xuống. | *"Đặc biệt là công cụ Mô phỏng What-If: Sinh viên thử nghiệm kịch bản học lại môn F. Khi điểm mới thay thế điểm F cũ, GPA tích lũy lập tức bật tăng từ 1.15 lên 1.95 và hệ thống thông báo THOÁT KHỎI DIỆN BUỘC THÔI HỌC! Điều này mang lại động lực và lộ trình giải cứu cụ thể cho sinh viên."* | Zoom vào khung kết quả What-If xanh lá. |

---

### PHẦN 6: KẾT LUẬN & ĐÓNG VIDEO (5:10 - 5:30)

| Thời gian | Thao tác trên màn hình | Lời thoại thuyết minh (Voiceover) | Ghi chú & Hiệu ứng |
| :--- | :--- | :--- | :--- |
| **5:10 - 5:30** | Quay trở về màn hình Tổng quan Dashboard hoặc trang giới thiệu. Rê chuột chào kết. | *"Như vậy, EduAlert không chỉ là một công cụ giám sát điểm số, mà là một giải pháp toàn diện kết hợp chặt chẽ giữa quy chế đào tạo tín chỉ, công nghệ điện toán đám mây và Trí tuệ Nhân tạo để đồng hành cùng từng sinh viên. Cảm ơn Thầy Cô và các bạn đã chú ý theo dõi video demo của nhóm chúng em!"* | Giọng nói tự tin, cảm ơn kết thúc. |

---

## 💡 MẸO ĐỂ QUAY VIDEO CHUYÊN NGHIỆP

1. **Chuẩn bị tab trình duyệt:** Mở sẵn các tài khoản ở các cửa sổ ẩn danh hoặc trình duyệt khác nhau (hoặc đăng nhập nhanh bằng thanh chuyển vai trò ở trang login) để không bị gián đoạn.
2. **Âm thanh:** Dùng tai nghe có mic chống ồn, nói với tốc độ vừa phải, dứt khoát.
3. **Thao tác chuột:** Rê chuột nhẹ nhàng, dừng lại 1-2 giây tại những nút quan trọng (như Live Preview Badge, nút Hồ sơ 360°, kết quả What-If) trước khi nhấp chuột để người xem kịp quan sát.

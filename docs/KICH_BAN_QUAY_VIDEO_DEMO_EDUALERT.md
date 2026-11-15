# KỊCH BẢN QUAY VIDEO DEMO & GIỚI THIỆU HỆ THỐNG EDUALERT
## Chuẩn kịch bản quay: 3 Phân quyền (Admin $\to$ Giảng viên $\to$ Sinh viên)

* **Tên đề tài:** EduAlert - Hệ Thống Cảnh Báo Sớm Học Vụ & Trợ Lý Kế Hoạch Học Tập Tín Chỉ Tích Hợp AI
* **Thời lượng đề xuất:** 7 - 9 phút (Thời lượng lý tưởng để phô diễn trọn vẹn chiều sâu nghiệp vụ và kỹ thuật)
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
[Phần 4: Sinh viên - Dashboard, Hồ sơ cá nhân & Smart Planner] (5:15 - 8:05)
  ├─ 4.1: Đăng nhập Sinh viên & Dashboard Tổng quan học vụ
  ├─ 4.2: Phân hệ "Hồ Sơ Của Tôi" (Thẻ KPI, Biểu đồ Trend GPA, Đối chiếu TT08, Lời dặn CVHT)
  ├─ 4.3: Smart Academic Planner (Summary Banner, Đối chiếu CTĐT 141 TC, Bảng điểm chi tiết)
  ├─ 4.4: Target GPA Calculator (Tính toán điểm kỳ tới để tốt nghiệp Khá / Giỏi)
  └─ 4.5: Mô phỏng What-If thế điểm học lại môn F (Bật tăng GPA -> Thoát buộc thôi học)
                  │
                  ▼
[Phần 5: Lời kết & Đóng video] (8:05 - 8:35)
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

### PHẦN 4: ROLE 3 - PHÂN HỆ SINH VIÊN (DASHBOARD, HỒ SƠ CỦA TÔI & SMART ACADEMIC PLANNER) (5:15 - 8:25)

| Thời gian | Thao tác trên màn hình | Lời thoại thuyết minh (Voiceover) | Ghi chú & Hiệu ứng |
| :--- | :--- | :--- | :--- |
| **5:15 - 5:45**<br>*(Màn 4.1: Đăng nhập Sinh viên & Dashboard)* | • Bấm Đăng xuất Giảng viên ở menu tài khoản góc trên bên phải.<br>• Chọn tab **Sinh viên** tại màn hình đăng nhập.<br>• Đăng nhập tài khoản sinh viên có cảnh báo học vụ: `2251050001` (Nguyễn Văn An) / mật khẩu `Sinhvien@123` *(hoặc `2251012099` - Vũ Hải Trung)*.<br>• Màn hình sinh viên hiện ra với Header cá nhân hóa và thanh Sidebar tinh gọn. | *"Và bây giờ, chúng ta bước vào vai trò trung tâm có ý nghĩa quyết định nhất của hệ thống: **Phân hệ Sinh viên**. Thay vì cách làm truyền thống — sinh viên hoàn toàn bị động chờ nhận giấy báo kỷ luật hoặc quyết định buộc thôi học từ Phòng đào tạo — EduAlert trao quyền cho sinh viên trở thành người làm chủ lộ trình học tập của chính mình.<br><br>Đăng nhập với tài khoản sinh viên Nguyễn Văn An, giao diện được thiết kế tối giản, trực quan và loại bỏ hoàn toàn các nút thao tác quản trị phức tạp, chỉ tập trung vào 2 phân hệ cốt lõi: **Hồ Sơ Của Tôi** và **Smart Academic Planner**."* | Thao tác đăng nhập mượt mà.<br>Lia chuột qua Header cá nhân và thanh Sidebar 2 menu: *Hồ Sơ Của Tôi* và *Smart Planner (141 TC)*. |
| **5:45 - 6:35**<br>*(Màn 4.2: Phân hệ "Hồ Sơ Của Tôi" - Dossier 360°)* | • Màn hình mặc định mở tab **"Hồ Sơ Của Tôi"** (hoặc bấm vào menu trên Sidebar).<br>• Rê chuột qua **4 Thẻ Chỉ Số Nhanh** trên đầu:<br>  1. *GPA Tích Lũy:* Tô đỏ nổi bật `1.15 / 4.00`.<br>  2. *Tín Chỉ Đạt:* `32 TC`.<br>  3. *Nợ Tín Chỉ:* Tô đỏ `26 TC`.<br>  4. *Mức Độ Nguy Cơ:* Huy hiệu đỏ `Nguy cơ Buộc thôi học (Mức 3)`.<br>• Cuộn xuống bảng **"Chỉ Số Rủi Ro Được Tính Như Thế Nào?"** (Thanh điểm `90/100`).<br>• Cuộn xem bảng **"Kết Quả Đối Chiếu 4 Quy Tắc Cảnh Báo Học Vụ (TT 08/2021)"**.<br>• Dừng lại tại mục **"Diễn Biến Điểm Số Qua Các Học Kỳ"**: Chỉ chuột vào **Biểu đồ đường SVG tương tác (GpaTrendChart)** với 2 đường GPA tích lũy, GPA học kỳ và **đường đứt nét màu đỏ** (Ngưỡng quy chế TT08).<br>• Lướt qua bảng lịch sử học kỳ và mục **"Nhật Ký Tư Vấn Của CVHT"**. | *"Ngay tại phân hệ **Hồ Sơ Của Tôi**, sinh viên nắm bắt bức tranh học vụ 360° toàn diện. 4 thẻ chỉ số nhanh tức thì gióng lên hồi chuông cảnh báo: GPA tích lũy hiện tại đang chạm đáy `1.15`, nợ đọng tới `26 tín chỉ`, và mức độ rủi ro được hệ thống xếp vào diện `Nguy cơ Buộc thôi học`.<br><br>Kéo xuống dưới, sinh viên hiểu rõ lý do tại sao mình bị cảnh báo thông qua **Bảng đối chiếu 4 quy tắc của Thông tư 08**: Hệ thống chỉ rõ vi phạm Rule 1 vì GPA dưới ngưỡng sàn 1.20 và Rule 2 vì số tín chỉ nợ vượt quá 24 TC.<br><br>Đặc biệt, **Biểu đồ diễn biến điểm số trực quan** so sánh đường GPA thực tế với **đường đứt nét đỏ — ranh giới an toàn của quy chế**. Sinh viên thấy rõ điểm rơi tụt dốc của mình qua từng kỳ. Ngay bên dưới là **Nhật ký tư vấn**, nơi lưu lại toàn bộ biên bản trao đổi và hướng dẫn của Cố vấn học tập, tạo sự kết nối chặt chẽ giữa nhà trường và sinh viên."* | **Giữ chuột 2 giây** tại Biểu đồ Trend GPA và đường đứt nét đỏ quy chế.<br>Chỉ vào huy hiệu vi phạm Rule màu đỏ/xanh.<br>Cuộn mượt mà. |
| **6:35 - 7:15**<br>*(Màn 4.3: Phân hệ Smart Academic Planner & Đối chiếu CTĐT)* | • Bấm vào menu **"Smart Planner"** trên thanh Sidebar (Huy hiệu xanh `141 TC`).<br>• Quan sát thanh **Summary Banner** hiển thị đầy đủ thông tin: MSSV, Họ tên, Lớp học, Ngành đào tạo, CVHT và Diện học vụ.<br>• Rê chuột qua **4 Cards ERP Thống Kê**:<br>  1. *GPA Tích lũy (1.15 / 4.00)*.<br>  2. *Tín chỉ tích lũy (32 / 141 TC - Đã hoàn thành 22.7% CTĐT)*.<br>  3. *Nợ tín chỉ (26 TC - 9 môn F)*.<br>  4. *Chương trình còn lại (34 môn - 109 TC)*.<br>• Tại sub-tab **"1. Đối Chiếu CTĐT (141 TC)"**: Cuộn xem bảng đỏ *Danh Sách Môn Bị Rớt (F)* và danh sách môn chưa học.<br>• Bấm chuyển sang sub-tab **"2. Bảng Điểm Đã Lưu"**: Bảng điểm điện tử hiện ra đầy đủ cột: Điểm QT (40%), Điểm Thi (60%), TK hệ 10, Điểm chữ và Hệ 4. | *"Chuyển sang phân hệ đắt giá nhất của hệ thống: **Smart Academic Planner — Trợ lý kế hoạch học tập tín chỉ**.<br><br>Tại đây, thanh tiến độ tổng thể đối chiếu toàn bộ kết quả của sinh viên với Khung chương trình đào tạo chuẩn 141 tín chỉ. Hệ thống tự động bóc tách: Sinh viên đã hoàn thành 22.7% chương trình, còn nợ 9 môn bị điểm F tương đương 26 tín chỉ, và còn lại 34 môn cần hoàn thành để tốt nghiệp.<br><br>Bấm sang tab **Bảng Điểm Đã Lưu**, sinh viên xem được học bạ điện tử chi tiết đến từng đầu điểm thành phần: Quá trình 40%, Thi 60%, Tổng kết hệ 10, Điểm chữ và Điểm thang 4. Bảng điểm này được đồng bộ thời gian thực từ khâu nhập điểm của Giảng viên ban nãy, đảm bảo tính minh bạch tuyệt đối."* | Chuyển đổi giữa 2 sub-tab *Đối Chiếu CTĐT* và *Bảng Điểm Đã Lưu*.<br>Rê chuột qua các cột điểm 40% - 60% và điểm chữ. |
| **7:15 - 7:45**<br>*(Màn 4.4: Target GPA Calculator - Tính điểm mục tiêu)* | • Bấm chuyển sang sub-tab **"3. Tính Điểm Cần Đạt (Target GPA)"**.<br>• Tại khung tính toán, chọn mục tiêu tốt nghiệp: Nhấp chọn loại **Khá (GPA 2.50)** hoặc loại **Giỏi (GPA 3.20)**.<br>• Quan sát hệ thống tự động chạy công thức và render kết quả tính toán chi tiết cho các học kỳ còn lại. | *"Một bài toán lớn mà hầu hết sinh viên tín chỉ đều bế tắc là: 'Bây giờ GPA mình đang thấp như vậy, thì các kỳ tới phải học được bao nhiêu điểm mới có thể ra trường loại Khá hoặc Giỏi?'. EduAlert giải quyết câu hỏi này bằng công cụ **Target GPA Calculator**.<br><br>Khi sinh viên chọn mục tiêu tốt nghiệp loại Khá (GPA 2.50), hệ thống tự động áp dụng công thức toán học phân bổ trên 109 tín chỉ còn lại và đưa ra kết quả chính xác: Sinh viên cần đạt mức điểm trung bình tối thiểu là **2.85/4.00 (tương đương mức B/B+)** cho mỗi môn học tiếp theo. Công cụ còn phân tích độ khả thi thực tế, giúp sinh viên xác lập mục tiêu học tập rõ ràng thay vì mơ hồ, hoang mang."* | Bấm chuyển đổi giữa mục tiêu 2.50 và 3.20.<br>Chỉ vào dòng công thức tính toán và điểm trung bình yêu cầu mỗi kỳ. |
| **7:45 - 8:25**<br>*(Màn 4.5: Mô Phỏng What-If Thế Điểm Học Lại Môn F)* | • Bấm chuyển sang sub-tab **"4. Mô Phỏng What-If"**.<br>• Danh sách môn mô phỏng hiện ra gồm các môn F nợ đọng.<br>• Thao tác tích chọn học lại 2 môn cốt lõi: *Giải tích 1* (3 TC) và *Lập trình hướng đối tượng* (3 TC).<br>• Chỉnh điểm giả định từ điểm F cũ lên điểm **B+ (3.0)** hoặc **A (3.5)**.<br>• Tích chọn thêm 2 môn mới của kỳ tiếp theo với điểm dự kiến **B (2.5)**.<br>• **Khoảnh khắc bùng nổ (Highlight của Video):** Khung kết quả mô phỏng xanh lá hiện ra với thông số so sánh Trước vs Sau.<br>• Chỉ chuột vào sự thay đổi: GPA tăng từ **1.15 $\to$ 2.05**, và Trạng thái học vụ đổi từ **"Nguy cơ Buộc thôi học (Mức 3)"** sang **"Bình thường / An toàn"**! | *"Và đây chính là tính năng đột phá mang tính nhân văn sâu sắc nhất của EduAlert: **Mô Phỏng What-If — Cứu cánh học vụ**.<br><br>Theo quy chế học chế tín chỉ, khi sinh viên học lại một môn bị điểm F, **điểm thi mới sẽ thay thế hoàn toàn điểm F cũ trong công thức tính GPA tích lũy**. Tận dụng quy chế này, EduAlert cho phép sinh viên giả định kịch bản trả nợ: Giả sử em học lại môn Giải tích và Lập trình OOP, nỗ lực đạt điểm B+ hoặc A, đồng thời học 2 môn mới đạt loại B.<br><br>Kết quả mô phỏng nhảy số tức thì ngay trước mắt: **GPA tích lũy bật tăng vọt từ 1.15 lên 2.05!** Và điều kỳ diệu nhất: Hệ thống thông báo sinh viên chính thức **THOÁT KHỎI DIỆN NGUY CƠ BUỘC THÔI HỌC**! Thay vì rơi vào tuyệt vọng và bỏ học, sinh viên đã nhìn thấy rõ ràng con đường cứu vãn sự nghiệp đại học của mình."* | **Zoom nhẹ hoặc giữ chuột 3 giây** vào Khung Kết Quả Mô Phỏng What-If màu xanh lá.<br>Nhấn mạnh giọng nói ở câu chốt: *'Bật tăng GPA và Thoát khỏi diện buộc thôi học'*. |

---

### PHẦN 5: TỔNG KẾT & LỜI KẾT (8:25 - 8:55)

| Thời gian | Thao tác trên màn hình | Lời thoại thuyết minh (Voiceover) | Ghi chú & Hiệu ứng |
| :--- | :--- | :--- | :--- |
| **8:25 - 8:55** | • Quay trở về màn hình Dashboard hoặc chuyển về trang Đăng nhập `/login`.<br>• Rê chuột chậm rãi, mượt mà giữa logo EduAlert và khẩu hiệu *ĐH Mở TP.HCM • TT 08/2021*.<br>• Màn hình giữ tĩnh, phong thái tự tin kết thúc video. | *"Kính thưa Thầy Cô và Hội đồng đánh giá. Như vậy, qua video vừa rồi, nhóm chúng em đã trình diễn trọn vẹn sức mạnh của **EduAlert** thông qua 3 phân quyền tác nghiệp:<br>1. **Quản trị viên:** Thiết lập cơ cấu tổ chức, chuẩn hóa CTĐT 141 tín chỉ và phân công giảng dạy chặt chẽ.<br>2. **Giảng viên & CVHT:** Nhập điểm với Strict RBAC, giám sát 4 nhóm rủi ro theo Thông tư 08 và kích hoạt trợ lý AI can thiệp sớm.<br>3. **Sinh viên:** Tự chủ tra cứu hồ sơ 360°, sử dụng Smart Planner, tính Target GPA và mô phỏng What-If để thoát nguy cơ thôi học.<br><br>Hệ thống không chỉ dừng lại ở một đồ án lý thuyết mà đã được kiểm chứng bằng dữ liệu thực chiến, bám sát từng điều khoản quy chế và sẵn sàng triển khai thực tế. Nhóm chúng em xin trân trọng cảm ơn Quý Thầy Cô và các bạn đã chú ý lắng nghe và theo dõi!"* | Giọng kết truyền cảm, dứt khoát, chuyên nghiệp.<br>Kết thúc quay video. |

---

## 🎬 5 NGUYÊN TẮC VÀNG KHI QUAY ĐỂ VIDEO ĐẠT ĐIỂM TỐI ĐA

1. **Chuẩn bị sẵn 3 cửa sổ/tab:** Mở sẵn các trình duyệt hoặc tab ẩn danh đăng nhập sẵn Admin, Giảng viên (`gv.han`), Sinh viên (`2251012099` hoặc `2251050001`) để chuyển đổi tức thì không cần gõ lại mất thời gian.
2. **Quy tắc dừng chuột 2 giây:** Khi bấm vào các tính năng quan trọng (như nút *Phân công GV*, nút *Lưu Bảng Điểm*, nút *Xem Hồ Sơ 360°*, hoặc *Kết quả What-If*), hãy **giữ chuột tĩnh 1 đến 2 giây** để người xem kịp đọc số liệu và cảm nhận được sự mượt mà.
3. **Giọng nói dứt khoát, hào hứng:** Nhấn mạnh các từ khóa đắt giá: *Strict RBAC, Tự động hóa CTĐT, Thông tư 08, Trợ lý AI Gemini, Mô phỏng What-If*.
4. **Không để màn hình chết:** Vừa nói vừa rê chuột theo nội dung tương ứng để mắt người xem luôn tập trung vào điểm sáng của tính năng.
5. **Kiểm tra âm lượng micro:** Thu thử 15 giây đầu để kiểm tra âm lượng mic rõ ràng, không rè, không quá nhỏ trước khi quay trọn vẹn toàn bộ video.

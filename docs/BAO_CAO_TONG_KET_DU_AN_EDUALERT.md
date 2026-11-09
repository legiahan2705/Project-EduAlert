# BÁO CÁO TỔNG KẾT ĐỒ ÁN / DỰ ÁN: EDUALERT
## HỆ THỐNG GIÁM SÁT CẢNH BÁO SỚM HỌC VỤ & TRỢ LÝ HỌC TẬP THÔNG MINH TÍCH HỢP AI
> **Đơn vị đào tạo tham chiếu:** Trường Đại học Mở TP.HCM (HCMCOU)  
> **Quy chế áp dụng:** Quy chế đào tạo tín chỉ HCMCOU & **Thông tư 08/2021/TT-BGDĐT**  
> **Phiên bản:** v2.5 Enterprise Cloud  
> **Tác giả / Nhóm phát triển:** Lê Gia Hân & Cộng sự  
> **Repository GitHub:** [https://github.com/legiahan2705/Project-EduAlert](https://github.com/legiahan2705/Project-EduAlert)  
> **Nền tảng Deploy:** Vercel Cloud Serverless & MongoDB Atlas Cloud  

---

## MỤC LỤC
1. [GIỚI THIỆU & BỐI CẢNH DỰ ÁN](#1-giới-thiệu--bối-cảnh-dự-án)
2. [MỤC TIÊU DỰ ÁN](#2-mục-tiêu-dự-án)
3. [CƠ SỞ PHÁP LÝ & QUY CHẾ NGHIỆP VỤ](#3-cơ-sở-pháp-lý--quy-chế-nghiệp-vụ)
4. [KIẾN TRÚC HỆ THỐNG & CÔNG NGHỆ (TECH STACK & ARCHITECTURE)](#4-kiến-trúc-hệ-thống--công-nghệ-tech-stack--architecture)
5. [THIẾT KẾ CƠ SỞ DỮ LIỆU (DATABASE SCHEMA - MONGODB)](#5-thiết-kế-cơ-sở-dữ-liệu-database-schema---mongodb)
6. [CHI TIẾT CÁC TÍNH NĂNG HỆ THỐNG](#6-chi-tiết-các-tính-năng-hệ-thống)
7. [VẬN DỤNG TRÍ TUỆ NHÂN TẠO (AI GENERATIVE & SENTIMENT ANALYSIS)](#7-vận-dụng-trí-tuệ-nhân-tạo-ai-generative--sentiment-analysis)
8. [CASE STUDY ĐIỂN HÌNH: CỨU NGUY SINH VIÊN NGUYỄN VĂN AN](#8-case-study-điển-hình-cứu-nguy-sinh-viên-nguyễn-văn-an)
9. [HƯỚNG DẪN CÀI ĐẶT & TRIỂN KHAI (DEPLOYMENT GUIDE)](#9-hướng-dẫn-cài-đặt--triển-khai-deployment-guide)
10. [KẾT LUẬN & HƯỚNG PHÁT TRIỂN](#10-kết-luận--hướng-phát-triển)

---

## 1. GIỚI THIỆU & BỐI CẢNH DỰ ÁN

### 1.1. Thực trạng nhức nhối trong giáo dục đại học
Trong mô hình đào tạo theo hệ thống tín chỉ tại các trường đại học Việt Nam hiện nay, mỗi năm có từ **3% đến 7% sinh viên bị cảnh báo học vụ**, và hàng trăm trường hợp bị **buộc thôi học** mỗi học kỳ.
* **Đối với sinh viên:** Sinh viên năm 1, năm 2 thường chưa thích nghi được với phương pháp tự học. Khi bị điểm F (rớt môn), phần lớn sinh viên có tâm lý buông xuôi hoặc nghĩ "để kỳ sau học bù". Sinh viên hoàn toàn không lường trước được điểm F kéo tụt Điểm trung bình chung tích lũy (GPA) khủng khiếp ra sao và ngưỡng vi phạm nào sẽ dẫn đến quyết định buộc thôi học từ Ban Giám hiệu.
* **Đối với Cố vấn học tập (CVHT):** Một giảng viên thường kiêm nhiệm quản lý từ 1 đến 2 lớp (khoảng 45 – 90 sinh viên). Dữ liệu điểm gửi về thường là các bảng tính Excel rời rạc, điểm quá trình và điểm thi tách biệt. CVHT **không thể rà soát thủ công** từng sinh viên để phát hiện nguy cơ trước khi Phòng Quản lý Đào tạo ban hành danh sách kỷ luật.
* **Đối với Nhà trường:** Xử lý kỷ luật chỉ là biện pháp "chữa cháy" ở phần ngọn. Việc sinh viên thôi học gây lãng phí nguồn lực xã hội, ảnh hưởng trực tiếp đến uy tín và chỉ số tốt nghiệp đúng hạn của nhà trường.

### 1.2. Sứ mệnh của EduAlert
> **EduAlert được xây dựng để chuyển đổi mô hình quản lý học vụ: từ "Xử lý kỷ luật bị động" sang "Cảnh báo sớm chủ động và Trợ lý đồng hành cứu nguy cho từng sinh viên".**

---

## 2. MỤC TIÊU DỰ ÁN

1. **Số hóa & Tự động hóa quy chế cảnh báo:** Tự động đối chiếu điểm số với 4 Quy tắc (Rules) của Bộ Giáo dục & Đào tạo (Thông tư 08/2021/TT-BGDĐT) để phân tầng sinh viên thành 4 nhóm nguy cơ ngay lập tức.
2. **Hỗ trợ Cố vấn học tập (CVHT) can thiệp sớm:** Cung cấp Dashboard trực quan theo dõi lớp học trọng điểm (Lớp DH22CS01C - 45 sinh viên), mở Hồ sơ 360° chỉ trong 1 cú click chuột.
3. **Trợ lý cá nhân hóa AI:** Ứng dụng mô hình Ngôn ngữ Lớn (Gemini LLM API) để phân loại nguyên nhân tâm lý sa sút và tự động soạn thảo kế hoạch hành động kèm Email động viên sinh viên.
4. **Trao quyền cho sinh viên (Student Self-Service):** Công cụ **Smart Academic Planner** giúp sinh viên đối chiếu tiến độ hoàn thành 141 tín chỉ, tính điểm cần đạt để ra trường bằng Khá/Giỏi, và đặc biệt là công cụ **Mô phỏng What-If** thấy trước hiệu ứng "thế điểm" học lại môn F để thoát khỏi diện đuổi học.

---

## 3. CƠ SỞ PHÁP LÝ & QUY CHẾ NGHIỆP VỤ

Dự án được lập trình tuân thủ nghiêm ngặt theo 2 văn bản pháp lý chính thống:

### 3.1. Quy chế đào tạo tín chỉ Đại học Mở TP.HCM (HCMCOU)
* **Công thức tính điểm học phần (Thang điểm 10):**
  $$\text{Điểm TK10} = (\text{Điểm QT} \times 0.4) + (\text{Điểm Thi} \times 0.6)$$
  *(Làm tròn đến 1 chữ số thập phân)*
* **Thang quy đổi chuẩn 4.0 và Điểm chữ:**
  * $9.0 - 10.0 \to \text{A+} (4.0)$ | $8.5 - 8.9 \to \text{A} (3.5)$ | $8.0 - 8.4 \to \text{B+} (3.0)$
  * $7.0 - 7.9 \to \text{B} (2.5)$ | $6.5 - 6.9 \to \text{C+} (2.0)$ | $5.5 - 6.4 \to \text{C} (1.5)$
  * $5.0 - 5.4 \to \text{D+} (1.0)$ | $4.0 - 4.9 \to \text{D} (1.0)$ | $< 4.0 \to \text{F} (0.0 - \text{Không đạt})$
* **Quy tắc "Thế điểm" (Chìa khóa lội ngược dòng):**
  Khi sinh viên đăng ký học lại một môn học từng bị điểm F ($0.0$) và đạt điểm mới ($\ge 4.0$), **điểm mới sẽ thay thế hoàn toàn điểm F cũ** trong công thức tính GPA tích lũy, giúp điểm tích lũy bật tăng trở lại nhanh chóng.

### 3.2. 4 Quy tắc Cảnh báo học vụ (Thông tư 08/2021/TT-BGDĐT)
Hệ thống cài đặt sẵn động cơ Rule Engine quét tự động:
* **Rule 1 (Rớt môn trong kỳ quá nửa):** Tổng số tín chỉ không đạt trong học kỳ $> 50\%$ tổng số tín chỉ đăng ký học kỳ đó.
* **Rule 2 (Nợ đọng tín chỉ toàn khóa):** Tổng số tín chỉ nợ chưa trả $> 24$ tín chỉ.
* **Rule 3 (ĐTB học kỳ chạm sàn):** $\text{GPA học kỳ} < 0.80$ (Học kỳ đầu tiên) hoặc $< 1.00$ (Các học kỳ tiếp theo).
* **Rule 4 (ĐTB tích lũy chạm đáy theo năm):** $\text{GPA tích lũy}$ dưới ngưỡng sàn:
  * Năm 1: $< 1.20$
  * Năm 2: $< 1.40$
  * Năm 3: $< 1.60$
  * Năm 4 trở đi: $< 1.80$
* **Buộc thôi học (Mức 3):** Sinh viên bị cảnh báo học vụ 2 lần liên tiếp hoặc vượt quá khung thời gian đào tạo tối đa.

---

## 4. KIẾN TRÚC HỆ THỐNG & CÔNG NGHỆ (TECH STACK & ARCHITECTURE)

Hệ thống được xây dựng theo kiến trúc **Fullstack Cloud-Native** hiện đại, sẵn sàng triển khai toàn cầu:

```mermaid
flowchart TD
    Client["Trình duyệt Client (Web / Mobile)"]

    subgraph VERCEL["VERCEL CLOUD SERVERLESS PLATFORM"]
        FE["Next.js 16 (App Router) & React 19 Frontend\nTailwind CSS v4 & Lucide Icons"]
        API["Next.js API Serverless Routes (/api/*)\n• /api/faculties\n• /api/majors\n• /api/students\n• /api/grades\n• /api/ai-counseling"]
    end

    subgraph CLOUD["CLOUD SERVICES (EXTERNAL)"]
        Mongo["MongoDB Atlas (Cloud M0 Database)\nCluster: edualert.378ybyw.mongodb.net"]
        Gemini["Google Gemini 1.5 Flash API\nGenerative AI & LLM Prompting"]
    end

    Client -->|HTTPS / UI| FE
    FE -->|Fetch / REST| API
    API -->|Mongoose ODM| Mongo
    API -->|AI Prompting| Gemini
```

### Chi tiết Tech Stack:
* **Frontend Framework:** Next.js 16.4 (App Router với Turbopack), React 19, TypeScript.
* **UI/UX Design System:** Enterprise ERP Clean Design (Tone màu chủ đạo: Forest Emerald `#064e3b` & Slate), Tailwind CSS v4, Lucide React Icons.
* **Backend:** Next.js Serverless API Routes (tích hợp song song giải pháp NestJS v11 độc lập trong thư mục `Project-EduAlert-Backend`).
* **Cơ sở dữ liệu (Database):** MongoDB Atlas Cloud (Cụm Cloud Serverless, kết nối qua Mongoose ODM) với cơ chế In-memory fallback dự phòng.
* **Trí tuệ nhân tạo (AI):** Google Gemini 1.5 Flash API tích hợp Prompt Engineering & Academic Knowledge Graph.
* **Nền tảng Deploy:** Vercel Cloud (Tự động CI/CD qua GitHub push).

---

## 5. THIẾT KẾ CƠ SỞ DỮ LIỆU (DATABASE SCHEMA - MONGODB)

Database được tổ chức thành 5 Collection chính trong MongoDB Cloud:

```mermaid
erDiagram
    FACULTY ||--o{ MAJOR : "trực thuộc (1-n)"
    MAJOR ||--o{ CLASS : "quản lý lớp (1-n)"
    CLASS ||--o{ STUDENT : "danh sách sinh viên (1-n)"
    MAJOR ||--|| CURRICULUM : "khung 141 TC (1-1)"
    STUDENT ||--o{ GRADE_SHEET : "kết quả học tập"

    FACULTY {
        string id PK
        string code "OU+YYMMDD+XXX"
        string name "Tên Khoa VN"
        string nameEn "Tên Khoa EN"
        string shortCode "FIT, FECO..."
        string status "ACTIVE/INACTIVE"
        array auditLogs "Lịch sử chỉnh sửa"
    }

    MAJOR {
        string id PK
        string code "[Viết tắt]+YYMMXXX"
        string name "Tên Ngành"
        string facultyCode "Mã Khoa"
        number creditsStandard "141 TC"
        string status "ACTIVE/INACTIVE"
    }

    STUDENT {
        string maSV PK "2251050001"
        string hoTen "Nguyễn Văn An"
        string lop "DH22CS01C"
        number gpaTL "1.15"
        number gpaHK "0.82"
        number tcTichLuy "28"
        number tcNo "26"
        string level "DROP_OUT_RISK"
        array historySemesters "Lịch sử HK1-HK3"
        array counselingLog "Nhật ký tư vấn CVHT"
    }

    GRADE_SHEET {
        string id PK "BD-DH22CS01C-COSC2301"
        string maLop "DH22CS01C"
        string maMon "COSC2301"
        string tenMon "Cấu trúc dữ liệu"
        array grades "Chi tiết điểm 45 SV"
    }

    CURRICULUM {
        string majorCode PK
        array courses "33 môn học (141 TC)"
    }
```

---

## 6. CHI TIẾT CÁC TÍNH NĂNG HỆ THỐNG

### 6.1. Phân hệ 1: Quản lý Khoa (Faculty Management)
* Mã Khoa tự sinh chuẩn hệ thống: `OU + YYMMDD + XXX` (Ví dụ: `OU261104001`).
* Khai báo đầy đủ tên tiếng Việt, tiếng Anh, ký hiệu viết tắt không trùng lặp (FIT, FECO, FAAF, FBA, FFL).
* **Ràng buộc an toàn:** Không cho phép xóa khoa khi khoa đã có ngành đào tạo liên kết; chỉ cho phép kích hoạt / vô hiệu hóa.
* **Audit Trail:** Tra cứu lịch sử thao tác của người dùng (thời gian, người sửa, giá trị cũ, giá trị mới).

### 6.2. Phân hệ 2: Quản lý Ngành & Khung CTĐT 141 Tín Chỉ
* Mã ngành tự sinh: `[Ký hiệu Khoa] + YYMM + XXX` (Ví dụ: `FIT2200001` - Ngành Khoa học máy tính).
* Workspace chi tiết ngành gồm 4 Tab nghiệp vụ:
  * **Tab 1 - Tổng quan:** Thông tin chuẩn tín chỉ (141 TC), quy mô đào tạo.
  * **Tab 2 - Chương trình đào tạo:** Cho phép thêm/sửa/xóa môn học trong CTĐT, đặc biệt hỗ trợ nạp **môn liên ngành từ các khoa khác** (Toán, Ngoại ngữ, Kinh tế).
  * **Tab 3 - Danh sách lớp:** Quản lý các lớp thuộc ngành và CVHT phụ trách.
  * **Tab 4 - Lịch sử:** Ghi lại mọi biến động cấu hình chương trình.

### 6.3. Phân hệ 3: Quản lý Bảng điểm (Course Grade Management)
* Thiết kế dạng **Group by Course:** Gom nhóm danh sách theo môn học, mở rộng (expand) để xem các lớp đang học môn đó.
* Mã bảng điểm tự sinh: `BD-[Mã Lớp]-[Mã Môn]`.
* Bảng nhập điểm tương tác nhanh (Spreadsheet-like): Nhập điểm Quá trình (40%) và Điểm Thi (60%), hệ thống tự động tính điểm TK10, tự quy đổi thang 4.0 và điểm chữ tức thì.

### 6.4. Phân hệ 4: Dashboard Giám sát Cảnh báo sớm & Hồ sơ 360°
* **Case study trọng điểm:** Lớp **DH22CS01C (45 sinh viên)** ngành Khoa học máy tính, Khóa 2022.
* **Phân tầng can thiệp 4 nhóm sinh viên:**
  1. 🔴 **Nhóm 1 - Nguy cơ Buộc thôi học (1 SV):** Vi phạm $\ge 2$ lần liên tiếp (Ví dụ: Nguyễn Văn An - GPA 1.15, nợ 26 TC).
  2. 🟠 **Nhóm 2 - Cảnh báo học vụ Mức 1 (4 SV):** GPA dưới sàn, nợ từ 8 – 14 TC.
  3. 🟡 **Nhóm 3 - Tín hiệu sớm (4 SV):** GPA từ 1.25 – 1.68, rải rác điểm D/F, có nguy cơ trượt dốc.
  4. 🟢 **Nhóm 4 - An toàn & Xuất sắc (36 SV):** Tích lũy tốt, đúng tiến độ.
* **Hồ Sơ Học Vụ 360° (Student Dossier):** Xem bài test 4 Rule của Bộ GD&ĐT, diễn biến điểm số các kỳ học, và Sổ tay ghi chép nhật ký tư vấn của CVHT (lưu trực tiếp về CSDL đám mây).

### 6.5. Phân hệ 5: Kế hoạch học tập thông minh (Smart Academic Planner)
* **Đối chiếu 141 Tín chỉ:** Thước đo hoàn thành CTĐT, phân chia rõ ràng: Môn đã đạt (🟢), Môn rớt F cần trả nợ (🔴), Môn còn lại chưa học (🟡).
* **Tính điểm cần đạt (Target GPA Calculator):** 
  $$\text{GPA}_{\text{cần đạt}} = \frac{\text{GPA}_{\text{mục tiêu}} \times 141 - \text{GPA}_{\text{hiện tại}} \times \text{TC}_{\text{đã đạt}}}{\text{TC}_{\text{còn lại}}}$$
  Đưa ra cảnh báo tính khả thi: Rất khả thi, Thách thức cao, hoặc Bất khả thi (nếu vượt quá 4.0 $\to$ hướng dẫn bắt buộc phải học cải thiện môn D).
* **Mô phỏng học tập What-If:** Giả định kết quả học lại môn F và học môn mới kỳ tới $\to$ Tính toán trước bước nhảy GPA và xác nhận thoát khỏi diện cảnh báo học vụ.

---

## 7. VẬN DỤNG TRÍ TUỆ NHÂN TẠO (AI GENERATIVE & SENTIMENT ANALYSIS)

Hệ thống tích hợp AI qua API Route [`/api/ai-counseling`](file:///D:/Han_PersonalSpace/Project-EduAlert/app/api/ai-counseling/route.js) với 2 năng lực cốt lõi:

```mermaid
flowchart TD
    Data["Dữ liệu Sinh viên:\n• Bảng điểm 3 học kỳ\n• Danh sách môn rớt F\n• Tín chỉ nợ & Vi phạm TT08"]
    
    subgraph AI["GOOGLE GEMINI LLM ENGINE"]
        Prompt["Prompt Engineering:\nChuyên gia Cố vấn Học vụ HCMCOU"]
        NLP["Phân tích ngữ nghĩa & Phân cụm nguyên nhân"]
        Gen["Sinh ngôn ngữ tự nhiên (NLG)"]
    end

    subgraph OUT["KẾT QUẢ ĐẦU RA TẠI MODAL 360°"]
        O1["1. Báo cáo nhận định tổng quan cho CVHT"]
        O2["2. Phân loại nguyên nhân sa sút (Làm thêm / Hổng kiến thức / Chọn nhầm ngành)"]
        O3["3. Kế hoạch hành động 3 bước giảm tải"]
        O4["4. Bản thảo Email động viên ân cần (Có nút Sao Chép 1-Click)"]
    end

    Data --> Prompt --> NLP & Gen --> OUT
```

---

## 8. CASE STUDY ĐIỂN HÌNH: CỨU NGUY SINH VIÊN NGUYỄN VĂN AN

* **Hồ sơ sinh viên:** Nguyễn Văn An (MSSV: `2251050001`), Lớp `DH22CS01C`, Ngành Khoa học máy tính.
* **Hiện trạng rủi ro:** 
  * GPA tích lũy: **1.15 / 4.00**.
  * Tín chỉ nợ: **26 TC** (Vượt trần 24 TC của Rule 2).
  * Môn rớt: Rớt F môn *Cấu trúc dữ liệu và giải thuật* (3 TC) và *Tiếng Anh 2* (3 TC).
  * Trạng thái: **Nguy cơ Buộc thôi học (Mức 3)**.
* **Quy trình cứu nguy thực tế qua EduAlert:**
  1. **Bước 1 - Phát hiện:** CVHT mở Dashboard Cảnh báo, hệ thống lập tức gắn cờ đỏ bạn An ở vị trí ưu tiên số 1.
  2. **Bước 2 - Phân tích AI:** Mở Hồ sơ 360°, bấm **"AI Cố Vấn & Email"**. AI chỉ ra An bị hổng kiến thức nền tảng và quá tải do đi làm thêm; AI tự sinh bản thảo thư mời An lên gặp cố vấn với văn phong thấu hiểu, không gây áp lực.
  3. **Bước 3 - Thiết lập kế hoạch với Smart Planner:** CVHT mở tab Mô phỏng What-If, tư vấn An kỳ tới giảm tải xuống 12 TC, chỉ tập trung trả nợ 2 môn F đạt điểm B+.
  4. **Bước 4 - Kết quả dự phóng:** Nhờ cơ chế "thế điểm", GPA tích lũy của An lập tức bật từ **1.15 lên 1.95**, nợ tín chỉ giảm về 20 TC $\to$ **Hệ thống hiển thị huy hiệu: THOÁT KHỎI DIỆN BUỘC THÔI HỌC!**

---

## 9. HƯỚNG DẪN CÀI ĐẶT & TRIỂN KHAI (DEPLOYMENT GUIDE)

### 9.1. Chạy môi trường Local Development
```bash
# 1. Clone repository từ GitHub
git clone https://github.com/legiahan2705/Project-EduAlert.git
cd Project-EduAlert

# 2. Cài đặt toàn bộ thư viện dependencies
npm install

# 3. Tạo file cấu hình môi trường .env.local (đã cấu hình sẵn MongoDB Cloud)
echo "MONGODB_URI=mongodb+srv://legiahancv_db_user:i0s1KKMnXuSQpUPz@edualert.378ybyw.mongodb.net/edualert?retryWrites=true&w=majority" > .env.local

# 4. Khởi chạy ứng dụng
npm run dev
# Truy cập: http://localhost:3000
```

### 9.2. Triển khai lên Vercel Cloud (Serverless)
1. Đăng nhập [vercel.com](https://vercel.com) bằng tài khoản GitHub `legiahan2705`.
2. Bấm **Add New... $\to$ Project** $\to$ Chọn `Project-EduAlert` $\to$ Bấm **Import**.
3. Tại mục **Environment Variables**, cấu hình biến:
   * **Name:** `MONGODB_URI`
   * **Value:** `mongodb+srv://legiahancv_db_user:i0s1KKMnXuSQpUPz@edualert.378ybyw.mongodb.net/edualert?retryWrites=true&w=majority`
4. Bấm **Deploy**. Sau 45 giây, hệ thống sẽ online toàn cầu với tên miền chính thức dạng: `https://project-edualert.vercel.app`.

---

## 10. KẾT LUẬN & HƯỚNG PHÁT TRIỂN

### 10.1. Kết luận
Dự án **EduAlert** đã giải quyết trọn vẹn bài toán nhức nhối trong quản lý học vụ đại học. Bằng việc kết hợp hài hòa giữa **tính chuẩn xác của quy chế đào tạo** và **sự thông minh, đồng cảm của AI Generative**, hệ thống không chỉ là một công cụ quản lý mà thực sự trở thành một người đồng hành tin cậy của cả giảng viên cố vấn và sinh viên.

### 10.2. Hướng phát triển trong tương lai
* Tích hợp đồng bộ dữ liệu trực tiếp với hệ thống LMS (Moodle / Canvas) của trường để theo dõi chuyên cần thời gian thực.
* Phát triển chatbot tương tác đa kênh (Zalo OA / Telegram Bot) tự động gửi thông báo lịch thi và nhắc nhở học vụ đến từng sinh viên và phụ huynh.
* Áp dụng thuật toán tối ưu hóa di truyền (Genetic Algorithm) để tự động sắp xếp thời khóa biểu cá nhân hóa không bị trùng lịch cho sinh viên trả nợ môn.


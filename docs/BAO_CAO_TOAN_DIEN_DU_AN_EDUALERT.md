# BÁO CÁO TOÀN DIỆN ĐỒ ÁN / DỰ ÁN: EDUALERT
## HỆ THỐNG GIÁM SÁT CẢNH BÁO SỚM HỌC VỤ & TRỢ LÝ HỌC TẬP THÔNG MINH TÍCH HỢP AI
> **Đơn vị đào tạo chuẩn tham chiếu:** Trường Đại học Mở TP.HCM (HCMCOU)  
> **Khung pháp lý áp dụng:** Thông tư 08/2021/TT-BGDĐT & Quy chế đào tạo tín chỉ HCMCOU  
> **Phiên bản hệ thống:** v2.5 Enterprise Cloud  
> **Chủ nhiệm đề tài / Nhóm tác giả:** Lê Gia Hân & Cộng sự  
> **Source code Repository:** [https://github.com/legiahan2705/Project-EduAlert](https://github.com/legiahan2705/Project-EduAlert)  
> **Môi trường triển khai:** Vercel Serverless Cloud & MongoDB Atlas Cloud  

---

## MỤC LỤC CHI TIẾT
1. [TỔNG QUAN & BỐI CẢNH ĐỀ TÀI](#1-tổng-quan--bối-cảnh-đề-tài)
2. [MỤC TIÊU DỰ ÁN & ĐỐI TƯỢNG PHỤC VỤ](#2-mục-tiêu-dự-án--đối-tượng-phục-vụ)
3. [CƠ SỞ PHÁP LÝ & BỘ QUY TẮC NGHIỆP VỤ (BUSINESS RULES)](#3-cơ-sở-pháp-lý--bộ-quy-tắc-nghiệp-vụ-business-rules)
4. [KIẾN TRÚC HỆ THỐNG (FULLSTACK ARCHITECTURE - FE, BE, DB & AI)](#4-kiến-trúc-hệ-thống-fullstack-architecture---fe-be-db--ai)
5. [THIẾT KẾ CƠ SỞ DỮ LIỆU CLOUD (MONGODB SCHEMA & ERD)](#5-thiết-kế-cơ-sở-dữ-liệu-cloud-mongodb-schema--erd)
6. [HỆ THỐNG CÁC TÍNH NĂNG VÀ USER STORIES (US)](#6-hệ-thống-các-tính-năng-và-user-stories-us)
7. [LOGIC THUẬT TOÁN ĐIỀU HÀNH (RULE ENGINE, TARGET GPA & WHAT-IF)](#7-logic-thuật-toán-điều-hành-rule-engine-target-gpa--what-if)
8. [ỨNG DỤNG TRÍ TUỆ NHÂN TẠO (AI GENERATIVE & SENTIMENT CLUSTERING)](#8-ứng-dụng-trí-tuệ-nhân-tạo-ai-generative--sentiment-clustering)
9. [CASE STUDY ĐIỂN HÌNH: GIẢI CỨU HỌC VỤ SINH VIÊN NGUYỄN VĂN AN](#9-case-study-điển-hình-giải-cứu-học-vụ-sinh-viên-nguyễn-văn-an)
10. [HƯỚNG DẪN CÀI ĐẶT, VẬN HÀNH & TRIỂN KHAI (DEPLOYMENT GUIDE)](#10-hướng-dẫn-cài-đặt-vận-hành--triển-khai-deployment-guide)
11. [KẾT LUẬN & ĐỊNH HƯỚNG MỞ RỘNG ĐỀ TÀI](#11-kết-luận--định-hướng-mở-rộng-đề-tài)

---

## 1. TỔNG QUAN & BỐI CẢNH ĐỀ TÀI

### 1.1. Thực trạng trong quản trị học vụ bậc đại học
Trong phương thức đào tạo theo hệ thống tín chỉ tại các trường đại học hiện nay, tính tự chủ trong học tập của sinh viên được đặt lên hàng đầu. Tuy nhiên, mặt trái của mô hình này là:
* **Sinh viên thiếu định hướng và thông tin:** Sinh viên (đặc biệt là năm 1 và năm 2) chưa quen với cường độ học đại học. Khi nhận điểm F (rớt môn), phần lớn sinh viên có tâm lý xem nhẹ, nghĩ rằng "kỳ sau học bù là xong". Sinh viên không hề biết rằng điểm F ($0.0$) kéo tụt Điểm trung bình tích lũy (GPA) nghiêm trọng như thế nào và ngưỡng vi phạm nào sẽ dẫn đến quyết định buộc thôi học từ Ban Giám hiệu.
* **Cố vấn học tập (CVHT) quá tải và thiếu công cụ:** Mỗi giảng viên thường làm cố vấn cho 1 đến 2 lớp (khoảng 45 – 90 sinh viên). Dữ liệu gửi về cho giảng viên thường là các file Excel điểm thô, tách biệt giữa điểm quá trình và điểm thi cuối kỳ. CVHT không có công cụ tính toán tự động để rà quét sinh viên nào đang vi phạm quy chế trước khi Phòng Quản lý Đào tạo ban hành danh sách kỷ luật.
* **Nhà trường xử lý hậu quả ở phần ngọn:** Các quyết định Cảnh báo học vụ (CBHV) và Buộc thôi học thường chỉ được công bố khi học kỳ đã kết thúc hoàn toàn. Lúc này, mọi sự can thiệp đều đã quá muộn, gây thiệt hại lớn về kinh tế cho gia đình và ảnh hưởng trực tiếp đến chỉ số hoàn thành khóa học của nhà trường.

### 1.2. Sứ mệnh của dự án EduAlert
> **EduAlert là nền tảng chuyển đổi số trong quản lý học vụ: Chuyển dịch toàn diện từ mô hình "Xử lý kỷ luật bị động" sang "Giám sát cảnh báo sớm chủ động", đồng thời trao quyền cho sinh viên bằng các công cụ tính toán kế hoạch học tập thông minh và Trợ lý Cố vấn AI cá nhân hóa.**

---

## 2. MỤC TIÊU DỰ ÁN & ĐỐI TƯỢNG PHỤC VỤ

### 2.1. Mục tiêu cốt lõi
1. **Tự động hóa 100% việc sàng lọc rủi ro học vụ:** Bám sát Thông tư 08/2021/TT-BGDĐT để phân loại toàn bộ sinh viên trong lớp thành 4 nhóm can thiệp ngay khi có điểm thành phần.
2. **Trợ lý ảo hỗ trợ Cố vấn học tập (CVHT):** Cung cấp Dashboard theo dõi lớp trọng điểm, mở Hồ sơ học vụ 360° chỉ trong 1 cú click, tích hợp AI phân tích nguyên nhân tâm lý và tự soạn thảo thư động viên sinh viên.
3. **Cung cấp công cụ tự phục vụ (Self-Service) cho sinh viên:** Giúp sinh viên tự đối chiếu tiến độ hoàn thành 141 tín chỉ, tính điểm trung bình cần đạt để tốt nghiệp loại Khá/Giỏi, và thử nghiệm kịch bản "thế điểm" What-If để thoát hiểm.

### 2.2. Đối tượng phục vụ (User Personas)

```mermaid
flowchart TD
    EduAlert["HỆ THỐNG EDUALERT v2.5"]
    
    EduAlert --> User1["1. Sinh Viên\n(Student)"]
    EduAlert --> User2["2. Cố Vấn Học Tập\n(Academic Advisor)"]
    EduAlert --> User3["3. Giảng Viên Bộ Môn\n(Lecturer / Grader)"]
    EduAlert --> User4["4. Ban Quản Lý Đào Tạo\n(Dean / Academic Admin)"]

    User1 --- A["• Tự xem tiến độ 141 TC\n• Đặt mục tiêu tốt nghiệp\n• Mô phỏng What-If trả nợ F"]
    User2 --- B["• Dashboard theo dõi lớp học\n• Xem Hồ sơ 360° & 4 Rule TT08\n• AI gợi ý lộ trình & soạn email\n• Lưu nhật ký tư vấn học vụ"]
    User3 --- C["• Quản lý bảng điểm theo môn\n• Nhập điểm QT 40% & Thi 60%\n• Tự động tính TK10 & Thang 4"]
    User4 --- D["• CRUD danh mục Khoa & Mã tự sinh\n• Cấu hình khung CTĐT 141 TC\n• Ràng buộc toàn vẹn dữ liệu\n• Báo cáo tỷ lệ rủi ro toàn khóa"]
```

---

## 3. CƠ SỞ PHÁP LÝ & BỘ QUY TẮC NGHIỆP VỤ (BUSINESS RULES)

Hệ thống được lập trình tuân thủ nghiêm ngặt theo 2 bộ quy chế chính thống:

### 3.1. Quy chế đào tạo tín chỉ Đại học Mở TP.HCM (HCMCOU)
1. **Công thức tính điểm học phần (Điểm tổng kết thang 10):**
   $$\text{Điểm TK10} = (\text{Điểm QT} \times 0.4) + (\text{Điểm Thi} \times 0.6)$$
   *(Quy tắc làm tròn: Làm tròn số học đến 1 chữ số thập phân)*
2. **Bảng quy đổi điểm chữ và thang điểm 4.0 chuẩn:**
   * $9.0 \le \text{TK10} \le 10.0 \to \text{Điểm chữ: } \text{A+} \ (4.0) \ - \text{Xuất sắc}$
   * $8.5 \le \text{TK10} < 9.0 \to \text{Điểm chữ: } \text{A} \ (3.5) \ - \text{Giỏi}$
   * $8.0 \le \text{TK10} < 8.5 \to \text{Điểm chữ: } \text{B+} \ (3.0) \ - \text{Khá giỏi}$
   * $7.0 \le \text{TK10} < 8.0 \to \text{Điểm chữ: } \text{B} \ (2.5) \ - \text{Khá}$
   * $6.5 \le \text{TK10} < 7.0 \to \text{Điểm chữ: } \text{C+} \ (2.0) \ - \text{Trung bình khá}$
   * $5.5 \le \text{TK10} < 6.5 \to \text{Điểm chữ: } \text{C} \ (1.5) \ - \text{Trung bình}$
   * $5.0 \le \text{TK10} < 5.5 \to \text{Điểm chữ: } \text{D+} \ (1.0) \ - \text{Trung bình yếu}$
   * $4.0 \le \text{TK10} < 5.0 \to \text{Điểm chữ: } \text{D} \ (1.0) \ - \text{Yếu (Đạt)}$
   * $\text{TK10} < 4.0 \to \text{Điểm chữ: } \text{F} \ (0.0) \ - \text{Kém (Không đạt / Rớt môn)}$

3. **Cơ chế "Thế điểm" môn học lại (Grade Replacement Rule):**
   * Khi sinh viên đăng ký học lại một học phần từng bị điểm F ($0.0$) và đạt điểm mới ($\ge 4.0$), điểm số mới sẽ **thay thế hoàn toàn** điểm F cũ khi tính Điểm trung bình tích lũy (GPA).
   * Đây là cơ chế đòn bẩy quan trọng nhất mà EduAlert ứng dụng vào tính năng mô phỏng What-If giúp sinh viên lội ngược dòng.

### 3.2. 4 Quy tắc Cảnh báo học vụ (Theo Thông tư 08/2021/TT-BGDĐT)
Sinh viên bị hệ thống cảnh báo nếu vi phạm một trong các điều kiện sau:
* **Rule 1 (Rớt môn trong kỳ quá nửa):** Tổng số tín chỉ không đạt trong học kỳ $> 50\%$ tổng số tín chỉ đăng ký học kỳ đó.
* **Rule 2 (Tổng nợ đọng toàn khóa):** Tổng số tín chỉ nợ chưa trả vượt quá 24 tín chỉ ($> 24$ TC).
* **Rule 3 (ĐTB học kỳ chạm sàn):** $\text{GPA học kỳ} < 0.80$ (đối với học kỳ đầu tiên) hoặc $< 1.00$ (đối với các học kỳ tiếp theo).
* **Rule 4 (ĐTB tích lũy chạm đáy theo năm đào tạo):** $\text{GPA tích lũy}$ dưới ngưỡng sàn an toàn:
  * Năm thứ nhất: $< 1.20$
  * Năm thứ hai: $< 1.40$
  * Năm thứ ba: $< 1.60$
  * Năm thứ tư trở đi: $< 1.80$
* **Khung chế tài Buộc thôi học (Mức 3):** Sinh viên bị cảnh báo học vụ 2 lần liên tiếp hoặc vượt quá thời gian tối đa được phép học tập tại trường.

---

## 4. KIẾN TRÚC HỆ THỐNG (FULLSTACK ARCHITECTURE - FE, BE, DB & AI)

Hệ thống được thiết kế theo kiến trúc **Fullstack Cloud-Native** hiện đại:

```mermaid
flowchart TD
    User["Người dùng cuối (Trình duyệt Web / Mobile)"]

    subgraph FE_LAYER["FRONTEND LAYER (Next.js 16 Client)"]
        UI["Giao diện Enterprise ERP (Emerald & Slate)\nTailwind CSS v4 & Lucide Icons"]
        State["State Management & API Service Layer\n(src/services/api.js)"]
    end

    subgraph BE_LAYER["BACKEND API LAYER (Next.js Serverless Routes)"]
        R_Fac["/api/faculties (CRUD Khoa)"]
        R_Maj["/api/majors (CRUD Ngành & CTĐT)"]
        R_Stu["/api/students (45 Sinh viên & Counseling Log)"]
        R_Grd["/api/grades (Bảng điểm môn học)"]
        R_AI["/api/ai-counseling (Trợ lý Cố vấn AI)"]
    end

    subgraph DB_LAYER["DATABASE LAYER (MongoDB Atlas Cloud)"]
        M_Conn["Mongoose Connection Pool (src/lib/mongodb.js)"]
        M_Colls["Collections:\n• faculties\n• majors\n• students\n• gradesheets\n• curricula"]
    end

    subgraph AI_LAYER["AI INTEGRATION LAYER"]
        Gemini["Google Gemini 1.5 Flash API\nPrompt Engineering & NLG"]
        Fallback["Intelligent Academic Knowledge Graph\n(Fallback Engine tự động)"]
    end

    User -->|Tương tác UI| UI
    UI --> State
    State -->|Fetch HTTP/REST| BE_LAYER
    R_Fac & R_Maj & R_Stu & R_Grd --> M_Conn --> M_Colls
    R_AI --> Gemini
    Gemini -.->|Dự phòng khi mất kết nối| Fallback
```

### Chi tiết các tầng công nghệ:
1. **Frontend:**
   - **Framework:** Next.js 16.4.3 (Turbopack bundler), React 19.
   - **Styling:** Tailwind CSS v4, phong cách thiết kế **Enterprise ERP Clean System** lấy cảm hứng từ các hệ thống quản trị chất lượng hiện đại (Tone màu chủ đạo: Xanh rừng ngọc bích `#064e3b` và Đá phiến `#0f172a`).
   - **Thư viện biểu tượng:** Lucide React Icons đồng bộ.
2. **Backend API:**
   - **Kiến trúc:** Next.js Serverless API Routes (`app/api/*`) hỗ trợ mở rộng không giới hạn trên hạ tầng Serverless.
   - **Giải pháp dự phòng doanh nghiệp:** Kèm theo source code **NestJS v11 (TypeScript)** độc lập trong thư mục `Project-EduAlert-Backend` phục vụ cho mô hình Microservices khi cần.
3. **Cơ sở dữ liệu (Database):**
   - **Cloud Database:** MongoDB Atlas Serverless Cloud (Cụm `edualert.378ybyw.mongodb.net`).
   - **Quản lý dữ liệu:** Mongoose ODM với cơ chế tự động Seed dữ liệu mẫu khi khởi tạo lần đầu và cơ chế In-memory fallback bảo đảm ứng dụng không bao giờ bị gián đoạn.
4. **Trí tuệ nhân tạo (AI):**
   - **Mô hình:** Google Gemini 1.5 Flash API thông qua kỹ thuật Prompt Engineering đóng vai Chuyên gia Cố vấn học vụ.
5. **Nền tảng triển khai (DevOps / Deployment):**
   - Tích hợp Git Version Control trên GitHub (`legiahan2705/Project-EduAlert`).
   - Tự động Build & Deploy liên tục (CI/CD) trên **Vercel Cloud**.

---

## 5. THIẾT KẾ CƠ SỞ DỮ LIỆU CLOUD (MONGODB SCHEMA & ERD)

Dữ liệu học vụ được chuẩn hóa thành 5 Collection chính trong MongoDB:

```mermaid
erDiagram
    FACULTY ||--o{ MAJOR : "chứa các ngành (1-n)"
    MAJOR ||--o{ CLASS : "quản lý các lớp (1-n)"
    MAJOR ||--|| CURRICULUM : "quy định khung 141 TC (1-1)"
    CLASS ||--o{ STUDENT : "danh sách 45 sinh viên (1-n)"
    STUDENT ||--o{ GRADE_RECORD : "lịch sử điểm học phần"

    FACULTY {
        string id PK "OU261104001"
        string code "Mã Khoa tự sinh"
        string name "Tên Khoa tiếng Việt"
        string nameEn "Tên Khoa tiếng Anh"
        string shortCode "FIT, FECO..."
        string status "ACTIVE/INACTIVE"
        array auditLogs "Lịch sử chỉnh sửa"
    }

    MAJOR {
        string id PK "FIT2200001"
        string code "[Viết tắt]+YYMMXXX"
        string name "Tên Ngành (Khoa học máy tính)"
        string facultyCode "Mã Khoa (FIT)"
        number creditsStandard "141 TC"
        string status "ACTIVE/INACTIVE"
        array auditLogs "Lịch sử cập nhật"
    }

    CURRICULUM {
        string majorCode PK "FIT2200001"
        array courses "Danh mục 33 môn học và môn liên ngành"
    }

    STUDENT {
        string maSV PK "2251050001"
        string hoTen "Nguyễn Văn An"
        string lop "DH22CS01C"
        string maNganh "FIT2200001"
        number gpaTL "1.15"
        number gpaHK "0.82"
        number tcTichLuy "28"
        number tcNo "26"
        string level "DROP_OUT_RISK"
        array historySemesters "Lịch sử HK1-HK3"
        array counselingLog "Nhật ký tư vấn CVHT"
    }

    GRADE_RECORD {
        string sheetId PK "BD-DH22CS01C-COSC2301"
        string maLop "DH22CS01C"
        string maMon "COSC2301"
        string tenMon "Cấu trúc dữ liệu và giải thuật"
        number soTC "3"
        array grades "Chi tiết điểm QT & Thi của sinh viên"
    }
```

---

## 6. HỆ THỐNG CÁC TÍNH NĂNG VÀ USER STORIES (US)

Dự án được phân rã thành 5 User Story nghiệp vụ tương ứng với 5 phân hệ giao diện:

### 6.1. User Story US-01: Quản Lý Danh Mục Khoa (Faculty Management)
* **User Story:** *"Là Ban Quản lý Đào tạo, tôi muốn CRUD danh mục khoa với mã tự sinh theo cấu trúc quy định, lưu nhật ký sửa đổi và ngăn chặn việc xóa các khoa đã có ngành trực thuộc để bảo đảm toàn vẹn dữ liệu."*
* **Tính năng:**
  * Mã Khoa tự sinh: `OU + YYMMDD + XXX` (Ví dụ: `OU261104001`).
  * Khai báo tên tiếng Việt, tiếng Anh, ký hiệu viết tắt duy nhất (FIT, FECO, FAAF, FBA, FFL).
  * Chặn xóa thông minh: Nếu khoa đã có ngành liên kết $\to$ Khóa nút xóa, chỉ cho phép Vô hiệu hóa / Kích hoạt.
  * Audit Trail: Xem lịch sử ai đã sửa, vào lúc nào, giá trị cũ và mới.

### 6.2. User Story US-02: Quản Lý Ngành & Khung CTĐT 141 Tín Chỉ
* **User Story:** *"Là Ban Đào tạo, tôi muốn tạo ngành học mới với mã tự sinh theo ký hiệu khoa, cấu hình khung CTĐT chuẩn 141 tín chỉ gồm cả các môn liên ngành để phục vụ lộ trình học tập."*
* **Tính năng:**
  * Mã ngành tự sinh: `[Ký hiệu Khoa] + YYMM + XXX` (Ví dụ: `FIT2200001`).
  * Workspace 4 Subtabs:
    1. *Tổng quan:* Chuẩn 141 TC, văn bằng, quy mô đào tạo.
    2. *Chương trình đào tạo:* Quản lý 33 môn học, cho phép thêm môn liên ngành từ Khoa Ngoại ngữ (Tiếng Anh 1, 2) hoặc Khoa Kinh tế (Kinh tế vi mô).
    3. *Danh sách lớp:* Quản lý các lớp thuộc ngành và CVHT phụ trách.
    4. *Lịch sử:* Nhật ký thay đổi chương trình.

### 6.3. User Story US-03: Quản Lý Bảng Điểm & Nhập Điểm Học Phần
* **User Story:** *"Là Giảng viên bộ môn, tôi muốn bảng điểm được gom nhóm theo môn học và mở rộng ra từng lớp, có thể nhập điểm quá trình và thi trực tiếp để hệ thống tự động tính điểm tổng kết."*
* **Tính năng:**
  * Bố cục **Group by Course:** Gom nhóm theo mã môn $\to$ bung mở danh sách bảng điểm các lớp.
  * Mã bảng điểm tự sinh: `BD-[Mã Lớp]-[Mã Môn]`.
  * Nhập điểm tương tác: Nhập QT (40%) và Thi (60%), hệ thống tự tính TK10, tự quy đổi điểm chữ và thang điểm 4 tức thì.

### 6.4. User Story US-04: Dashboard Giám Sát Cảnh Báo Sớm & Hồ Sơ 360°
* **User Story:** *"Là Cố vấn học tập, tôi muốn có Dashboard theo dõi toàn bộ 45 sinh viên lớp DH22CS01C, tự động khoanh vùng các sinh viên có nguy cơ bị đuổi học và mở Hồ sơ 360° để nắm rõ các quy tắc vi phạm."*
* **Tính năng:**
  * Phân tầng tự động 4 nhóm học vụ:
    * 🔴 **Nhóm 1 - Nguy cơ Buộc thôi học (1 SV):** Vi phạm $\ge 2$ lần liên tiếp.
    * 🟠 **Nhóm 2 - Cảnh báo học vụ Mức 1 (4 SV):** GPA dưới sàn, nợ từ 8 – 14 TC.
    * 🟡 **Nhóm 3 - Tín hiệu sớm (4 SV):** GPA $1.25 - 1.68$, rải rác điểm D/F.
    * 🟢 **Nhóm 4 - An toàn & Xuất sắc (36 SV):** Tích lũy tốt, đúng tiến độ.
  * **Hồ Sơ Học Vụ 360°:** Bóc tách bài test 4 Rule của Bộ GD&ĐT, lịch sử điểm HK1–HK3, và Form ghi nhận nhật ký tư vấn lưu trực tiếp về CSDL đám mây.

### 6.5. User Story US-05: Kế Hoạch Học Tập Thông Minh (Smart Academic Planner)
* **User Story:** *"Là Sinh viên, tôi muốn đối chiếu tiến độ tích lũy với chuẩn 141 tín chỉ, tính điểm cần đạt để tốt nghiệp loại Khá/Giỏi, và mô phỏng việc học lại môn F để thấy trước kết quả thoát khỏi diện đuổi học."*
* **Tính năng:**
  * Thước đo hoàn thành CTĐT: Phân loại môn Đạt (🟢), môn Nợ F (🔴), môn Còn lại (🟡).
  * Công cụ Target GPA Calculator: Tính toán điểm trung bình cần đạt cho các tín chỉ còn lại.
  * Bộ mô phỏng What-If: Thử nghiệm kịch bản học lại môn rớt $\to$ Kích hoạt cơ chế thế điểm và hiển thị kết quả thoát khỏi diện cảnh báo học vụ.

---

## 7. LOGIC THUẬT TOÁN ĐIỀU HÀNH (RULE ENGINE, TARGET GPA & WHAT-IF)

### 7.1. Thuật toán phân tầng rủi ro (Risk Evaluation Algorithm)
```javascript
// Trích xuất logic từ src/engine/OUGradeEngine.js
evaluateAcademicWarning({ year, semesterCredits, failedCreditsInSem, gpaSem, gpaCumulative, debtCreditsTotal, hadPreviousWarning }) {
  const minGPA_TL = year <= 1 ? 1.2 : year <= 2 ? 1.4 : year <= 3 ? 1.6 : 1.8;
  const minGPA_Sem = 1.0;

  const rule1 = semesterCredits > 0 && failedCreditsInSem > 0.5 * semesterCredits;
  const rule2 = debtCreditsTotal > 24;
  const rule3 = gpaSem < minGPA_Sem;
  const rule4 = gpaCumulative < minGPA_TL;

  // Xếp loại nguy cơ
  if (hadPreviousWarning && (rule1 || rule2 || rule3 || rule4)) {
    return { level: 'DROP_OUT_RISK', text: 'Nguy cơ Buộc thôi học (Mức 3)' };
  }
  if (rule1 || rule2 || rule3 || rule4) {
    return { level: 'WARNING', text: 'Cảnh báo học vụ (Mức 1)' };
  }
  if (gpaCumulative <= 1.70) {
    return { level: 'EARLY_SIGNAL', text: 'Tín hiệu sớm (Nguy cơ rớt môn)' };
  }
  return { level: 'SAFE', text: 'An toàn' };
}
```

### 7.2. Thuật toán tính điểm cần đạt (Target GPA Engine)
$$\text{GPA}_{\text{cần đạt}} = \frac{\text{GPA}_{\text{mục tiêu}} \times 141 - \text{GPA}_{\text{hiện tại}} \times \text{TC}_{\text{đã tích lũy}}}{\text{TC}_{\text{còn lại}}}$$
* Nếu $\text{GPA}_{\text{cần đạt}} \le 3.20$: Mục tiêu rất khả thi, duy trì phong độ.
* Nếu $3.20 < \text{GPA}_{\text{cần đạt}} \le 3.60$: Thách thức cao, đòi hỏi tỷ lệ điểm A/B+ chiếm trên 70%.
* Nếu $\text{GPA}_{\text{cần đạt}} > 4.00$: **Bất khả thi nếu chỉ học môn mới** $\to$ Hệ thống kích hoạt khuyến nghị: *"Bắt buộc sinh viên phải đăng ký học cải thiện từ 2 đến 4 môn điểm D/D+ để thay thế điểm cũ"*.

### 7.3. Thuật toán mô phỏng thế điểm What-If (What-If Simulation Engine)
1. Lấy danh sách các môn học tham gia mô phỏng (gồm môn học lại điểm F và môn học mới).
2. Với môn học lại: Tìm môn F cũ trong lịch sử, trừ điểm chất lượng cũ ($0 \times \text{Số TC}$) và cộng điểm chất lượng mới ($\text{TargetGrade} \times \text{Số TC}$).
3. Giảm số tín chỉ nợ tương ứng: $\text{Nợ mới} = \text{Nợ cũ} - \sum \text{TC môn F được trả nợ}$.
4. Tính lại GPA tích lũy mới và chạy lại Rule Engine để kiểm tra điều kiện thoát cảnh báo.

---

## 8. ỨNG DỤNG TRÍ TUỆ NHÂN TẠO (AI GENERATIVE & SENTIMENT CLUSTERING)

Hệ thống tích hợp mô hình **Google Gemini 1.5 Flash API** qua Endpoint `/api/ai-counseling` nhằm nâng cấp bài toán từ số học thuần túy lên mức thấu hiểu con người:

```mermaid
sequenceDiagram
    autonumber
    actor CVHT as Cố Vấn Học Tập
    participant UI as Modal Hồ Sơ 360°
    participant API as /api/ai-counseling
    participant LLM as Google Gemini 1.5 Flash

    CVHT->>UI: Bấm nút "AI Cố Vấn & Email"
    UI->>API: Gửi thông tin SV (GPA 1.15, nợ 26 TC, rớt CTDL, lịch sử 3 kỳ)
    API->>LLM: Gửi Prompt chuyên gia Cố vấn học vụ kèm bộ luật TT08
    Note over LLM: Phân tích ngữ nghĩa & Phân cụm nguyên nhân sa sút
    LLM-->>API: Trả về JSON: Nhận định, Nguyên nhân, Lộ trình 3 bước, Email
    API-->>UI: Hiển thị Tab Trợ Lý AI
    CVHT->>UI: Bấm nút "Sao Chép Thư" gửi trực tiếp cho Sinh viên
```

### 2 Năng lực AI cốt lõi:
1. **AI Sentiment & Risk Clustering (Phân cụm nguyên nhân sa sút):**
   - Phân tích tương quan giữa điểm số và lịch sử học tập để nhận diện:
     * *Nhóm 1:* Mất cân bằng thời gian do đi làm thêm quá giờ.
     * *Nhóm 2:* Hổng kiến thức nền tảng chuỗi môn tiên quyết (Lập trình $\to$ Cấu trúc dữ liệu).
     * *Nhóm 3:* Mất phương hướng hoặc chọn nhầm ngành đại học.
2. **AI Generative Action Plan & Email Draft (Lộ trình hành động & Soạn thư):**
   - Tự động sinh kế hoạch can thiệp 3 bước thực tế (giảm tải số tín chỉ đăng ký, ghép nhóm bạn cùng tiến).
   - Tự động soạn sẵn bản thảo email với văn phong ân cần, đồng cảm nhưng rõ ràng về tính pháp lý để CVHT gửi ngay cho sinh viên/phụ huynh.

---

## 9. CASE STUDY ĐIỂN HÌNH: GIẢI CỨU HỌC VỤ SINH VIÊN NGUYỄN VĂN AN

### 9.1. Thông số ban đầu của sinh viên
* **Họ tên:** Nguyễn Văn An | **MSSV:** `2251050001` | **Lớp:** `DH22CS01C`.
* **GPA tích lũy:** **1.15 / 4.00** | **GPA học kỳ gần nhất:** **0.82**.
* **Tín chỉ nợ đọng:** **26 TC** (Rớt môn *Cấu trúc dữ liệu và giải thuật* và *Tiếng Anh 2*).
* **Trạng thái quy chế:** Đã bị cảnh báo học vụ ở học kỳ trước $\to$ Kỳ này tiếp tục vi phạm cả 4 Rule $\to$ **Đứng trước quyết định Buộc thôi học**.

### 9.2. Kịch bản giải cứu qua 4 bước trên EduAlert
1. **Bước 1 - Phát hiện:** CVHT mở Dashboard Cảnh báo sớm, hệ thống lập tức gắn cờ đỏ sinh viên Nguyễn Văn An ở vị trí đầu tiên của Nhóm 1.
2. **Bước 2 - Phân tích AI:** Mở Hồ sơ 360°, bấm **"AI Cố Vấn & Email"**. AI phân tích và chỉ ra An bị quá tải do đi làm thêm và hổng kiến thức lập trình cơ sở; AI tự soạn bức thư mời An lên gặp cố vấn với thái độ động viên.
3. **Bước 3 - Thiết lập kế hoạch với Smart Planner:** CVHT cùng An mở tab Mô phỏng What-If. Thống nhất kịch bản kỳ tới An giảm tải đăng ký xuống 12 tín chỉ, ưu tiên học lại 2 môn F đạt điểm B+.
4. **Bước 4 - Kết quả mô phỏng:** Nhờ cơ chế "thế điểm", GPA tích lũy của An lập tức bật tăng từ **1.15 lên 1.95**, số tín chỉ nợ giảm từ 26 xuống 20 TC $\to$ **Hệ thống hiển thị thông báo: THOÁT KHỎI DIỆN BUỘC THÔI HỌC!** Sinh viên lấy lại niềm tin và có lộ trình học tập khả thi.

---

## 10. HƯỚNG DẪN CÀI ĐẶT, VẬN HÀNH & TRIỂN KHAI (DEPLOYMENT GUIDE)

### 10.1. Môi trường phát triển Local (Local Development)
Yêu cầu: Đã cài đặt **Node.js (v18 trở lên)** và **Git**.

```bash
# Bước 1: Clone mã nguồn từ GitHub
git clone https://github.com/legiahan2705/Project-EduAlert.git
cd Project-EduAlert

# Bước 2: Cài đặt toàn bộ thư viện dependencies
npm install

# Bước 3: Cấu hình biến môi trường kết nối MongoDB Cloud (.env.local)
echo "MONGODB_URI=mongodb+srv://legiahancv_db_user:i0s1KKMnXuSQpUPz@edualert.378ybyw.mongodb.net/edualert?retryWrites=true&w=majority" > .env.local

# Bước 4: Khởi chạy môi trường phát triển
npm run dev

# Mở trình duyệt truy cập: http://localhost:3000
```

### 10.2. Triển khai Production lên Vercel Serverless Platform
1. Truy cập **[vercel.com](https://vercel.com)** và đăng nhập bằng tài khoản GitHub `legiahan2705`.
2. Bấm nút **"Add New..."** $\to$ Chọn **"Project"** $\to$ Chọn repository **`Project-EduAlert`**.
3. Tại mục **Environment Variables**, khai báo biến:
   * **Key:** `MONGODB_URI`
   * **Value:** `mongodb+srv://legiahancv_db_user:i0s1KKMnXuSQpUPz@edualert.378ybyw.mongodb.net/edualert?retryWrites=true&w=majority`
4. Bấm **"Deploy"**. Vercel sẽ tự động build và cấp tên miền toàn cầu: `https://project-edualert.vercel.app`.

---

## 11. KẾT LUẬN & ĐỊNH HƯỚNG MỞ RỘNG ĐỀ TÀI

### 11.1. Kết luận
Dự án **EduAlert v2.5 Enterprise Cloud** đã hiện thực hóa thành công một hệ sinh thái quản lý học vụ thông minh, khép kín từ khâu quản lý danh mục Khoa, Ngành, Bảng điểm đến khâu giám sát cảnh báo sớm và tư vấn cải thiện điểm số. Dự án chứng minh tính hiệu quả vượt trội khi kết hợp giữa **sự chuẩn xác của quy chế đào tạo** và **năng lực thấu hiểu, đồng cảm của Trí tuệ Nhân tạo Generative AI**.

### 11.2. Định hướng mở rộng trong tương lai
* **Đồng bộ thời gian thực với LMS (Canvas / Moodle):** Lấy dữ liệu chuyên cần và điểm quá trình giữa kỳ để đưa ra cảnh báo sớm từ tuần thứ 4 của học kỳ.
* **Tích hợp kênh liên lạc đa nền tảng:** Tự động gửi thông báo học vụ và thư nhắc nhở qua Zalo ZNS / Telegram Bot đến sinh viên và phụ huynh.
* **Thuật toán tối ưu hóa thời khóa biểu (Genetic Algorithm):** Tự động sắp xếp lịch học lại các môn nợ F cho sinh viên mà không bị trùng lịch với các môn học mới.

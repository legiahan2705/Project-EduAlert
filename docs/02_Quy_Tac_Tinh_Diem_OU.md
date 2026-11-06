# Bảng Quy Chuẩn Điểm Số & Luật Cảnh Báo Học Vụ — ĐH Mở TP.HCM (HCMCOU)

---

## 1. Công Thức Tính Điểm Tổng Kết Học Phần (Thang 10)
$$\text{Điểm TK (hệ 10)} = (\text{Điểm Quá Trình} \times w_{\text{QT}}) + (\text{Điểm Thi} \times w_{\text{Thi}})$$
* **Mặc định đề cương:** $w_{\text{QT}} = 0.4$ (40%), $w_{\text{Thi}} = 0.6$ (60%).
* Điểm làm tròn đến **1 chữ số thập phân**.
* **Điều kiện Đạt học phần:** $\text{Điểm TK} \ge 4.0$. (Đây là điều kiện duy nhất `OUGradeEngine` áp dụng.)
* **Điểm liệt:** ngưỡng điểm thi bị coi là liệt do đề cương từng học phần quy định; hệ thống hiện **chưa áp dụng** ngưỡng này. *(Cần xác nhận với quy chế/đề cương trước khi đưa vào engine.)*

---

## 2. Thang Quy Đổi Chuẩn (Thang 10 $\rightarrow$ Điểm Chữ $\rightarrow$ Thang 4)
| Thang điểm 10 | Điểm chữ (`diem_tk_chu`) | Thang điểm 4 (`diem_tk_so`) | Đánh giá kết quả |
| :---: | :---: | :---: | :---: |
| **9.0 – 10.0** | **A+** | **4.0** | Xuất sắc (Đạt) |
| **8.5 – 8.9** | **A** | **3.5** | Giỏi (Đạt) |
| **8.0 – 8.4** | **B+** | **3.0** | Khá giỏi (Đạt) |
| **7.0 – 7.9** | **B** | **2.5** | Khá (Đạt) |
| **6.5 – 6.9** | **C+** | **2.0** | Trung bình khá (Đạt) |
| **5.5 – 6.4** | **C** | **1.5** | Trung bình (Đạt) |
| **5.0 – 5.4** | **D+** | **1.0** | Trung bình yếu (Đạt) |
| **4.0 – 4.9** | **D** | **1.0** | Yếu (Đạt) |
| **Dưới 4.0** | **F** | **0.0** | **Kém (Không đạt / Rớt môn)** |

---

## 3. Công Thức Tính GPA Học Kỳ & GPA Tích Lũy

### 3.1. GPA Học Kỳ (Semester GPA)
$$\text{GPA}_{\text{HK}} = \frac{\sum_{i=1}^{n} (\text{Điểm hệ 4}_i \times \text{Số TC}_i)}{\sum_{i=1}^{n} \text{Số TC}_i}$$
* Áp dụng cho mọi học phần có đăng ký trong học kỳ (bao gồm các môn bị điểm **F**).
* Làm tròn đến 2 chữ số thập phân.

### 3.2. GPA Tích Lũy (Cumulative GPA)
$$\text{GPA}_{\text{TL}} = \frac{\sum_{k \in \mathcal{K}} (\text{Điểm hệ 4}_k \times \text{Số TC}_k)}{\sum_{k \in \mathcal{K}} \text{Số TC}_k}$$
* **Quy tắc 1 (Môn điều kiện):** Bỏ qua các môn có `IsTichLuy = false` (như Giáo dục thể chất, Giáo dục Quốc phòng - An ninh). Môn này chỉ lấy chứng chỉ, không tính vào GPA tích lũy.
* **Quy tắc 2 (Học lại / Học cải thiện):** Khi sinh viên học lại môn bị F hoặc học cải thiện điểm D/C, **điểm của lần học sau cùng** sẽ thay thế điểm cũ trong tập hợp $\mathcal{K}$, số tín chỉ chỉ được cộng 1 lần.

---

## 4. Bốn Quy Tắc Cảnh Báo Học Vụ (Thông tư 08/2021 & HCMCOU)
1. **Rule 1 (Rớt môn trong kỳ):** Tổng số tín chỉ không đạt trong kỳ $> 50\%$ tổng số tín chỉ đăng ký học kỳ đó.
2. **Rule 2 (Trần nợ tín chỉ toàn khóa):** Tổng số tín chỉ nợ đọng (chưa hoàn thành) $> 24$ tín chỉ.
3. **Rule 3 (Sàn GPA học kỳ):** $\text{GPA}_{\text{HK}} < 0.8$ ở HK đầu tiên; $< 1.0$ ở các học kỳ tiếp theo.
4. **Rule 4 (Sàn GPA tích lũy theo năm đào tạo):**
   * Năm 1 (sau HK1, HK2): $\text{GPA}_{\text{TL}} < 1.2$
   * Năm 2 (sau HK3, HK4): $\text{GPA}_{\text{TL}} < 1.4$
   * Năm 3 (sau HK5, HK6): $\text{GPA}_{\text{TL}} < 1.6$
   * Năm 4 trở đi (sau HK7 trở đi): $\text{GPA}_{\text{TL}} < 1.8$

> Số thứ tự Rule 1–4 ở trên là **cách đánh số duy nhất** dùng trong toàn bộ tài liệu và trong `OUGradeEngine.evaluateAcademicWarning` (`rule1`…`rule4`). "Số lần bị cảnh báo học vụ (CBHV) liên tiếp" **không phải** Rule thứ 5 mà là dữ kiện lịch sử (`warningCount`) dùng ở mục 5.

## 5. Hai Cách Phân Loại (Không Được Nhầm Lẫn)

**(a) Mức đánh giá của Rule Engine — 3 mức, tính theo số Rule vi phạm tại thời điểm rà soát** (`level` trả về từ `evaluateAcademicWarning`):

| Mức | Điều kiện |
| :--- | :--- |
| **Bình thường** (`NORMAL`) | Vi phạm 0 Rule |
| **Cảnh báo sớm** (`EARLY_WARNING`) | Vi phạm đúng 1 Rule |
| **Nguy cơ cao** (`HIGH_RISK`) | Vi phạm $\ge 2$ Rule, **hoặc** vi phạm $\ge 1$ Rule khi kỳ trước đã bị cảnh báo |

**(b) Phân tầng can thiệp của CVHT — 4 nhóm, dùng cho Dashboard giám sát lớp (US-04):** kết hợp kết quả Rule Engine với lịch sử CBHV (`warningCount`).

| Nhóm | Tên | Tiêu chí |
| :-: | :--- | :--- |
| 1 | **Nguy cơ buộc thôi học** | Đã bị CBHV $\ge 2$ lần liên tiếp (`warningCount` $\ge 2$) |
| 2 | **Cảnh báo học vụ** | Bị CBHV lần 1 (`warningCount` = 1), tức vi phạm $\ge 1$ Rule. Một sinh viên Nhóm 2 vẫn có thể vi phạm nhiều Rule cùng lúc |
| 3 | **Tín hiệu sớm** | Chưa vi phạm Rule nào (mức `NORMAL`) nhưng $\text{GPA}_{\text{TL}} \le 1.70$ (tức sát sàn an toàn của năm học). *Dự kiến bổ sung: rớt môn tiên quyết quan trọng — dữ liệu môn tiên quyết chưa có trong code* |
| 4 | **An toàn / Khá giỏi** | Không thuộc ba nhóm trên: không vi phạm Rule nào và $\text{GPA}_{\text{TL}} > 1.70$ (xếp loại hiển thị: Khá $\ge 2.50$, Giỏi $\ge 3.20$, Xuất sắc $\ge 3.60$) |

**Nguồn dữ liệu và cách tính (đã cài đặt trong `OUGradeEngine.classifyStudent`):** nhóm **được tính từ dữ liệu**, không nhập tay. Rule 1 và Rule 3 chấm theo học kỳ gần nhất trong `historySemesters`; Rule 2 theo `tcNo`; Rule 4 theo `gpaTL` và năm học; nhóm 1 theo `warningCount`. `warningCount` (lịch sử CBHV) hiện là dữ liệu đầu vào, chưa tự suy ra từ các học kỳ cũ.

> Ví dụ: Phạm Minh Tuấn vi phạm 3 Rule (Rule 1: rớt $12/21$ TC $\approx 57\%$; Rule 3: GPA HK $0.85 < 1.0$; Rule 4: $\text{GPA}_{\text{TL}}$ $1.36 < 1.40$) nên Rule Engine cho mức **Nguy cơ cao**; nhưng đây là lần CBHV đầu tiên nên thuộc **Nhóm 2** khi phân tầng can thiệp.

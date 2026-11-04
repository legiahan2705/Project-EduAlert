# Bảng Quy Chuẩn Điểm Số & Luật Cảnh Báo Học Vụ — ĐH Mở TP.HCM (HCMCOU)

---

## 1. Công Thức Tính Điểm Tổng Kết Học Phần (Thang 10)
$$\text{Điểm TK (hệ 10)} = (\text{Điểm Quá Trình} \times w_{\text{QT}}) + (\text{Điểm Thi} \times w_{\text{Thi}})$$
* **Mặc định đề cương:** $w_{\text{QT}} = 0.4$ (40%), $w_{\text{Thi}} = 0.6$ (60%).
* Điểm làm tròn đến **1 chữ số thập phân**.
* **Điều kiện Đạt học phần:** $\text{Điểm TK} \ge 4.0$ và Điểm thi không bị điểm liệt.

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

### Phân loại mức cảnh báo:
* **Bình thường:** Vi phạm 0 điều kiện.
* **Cảnh báo sớm:** Vi phạm 1 điều kiện.
* **Nguy cơ cao (Kỷ luật học vụ):** Vi phạm $\ge 2$ điều kiện hoặc đã bị cảnh báo ở kỳ trước.

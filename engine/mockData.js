/**
 * mockData.js
 * Bộ dữ liệu mẫu chuẩn thực tế cho Lớp DH21IT01 (Khóa 2021, Năm 3, sau 5 học kỳ)
 * Chương trình đào tạo ngành Công nghệ thông tin - ĐH Mở TP.HCM (Tổng 141 tín chỉ)
 */

export const MOCK_CURRICULUM = [
  // Học kỳ 1
  { maMon: 'COSC1301', tenMon: 'Nhập môn lập trình', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, pFailHistory: 0.18 },
  { maMon: 'MATH1301', tenMon: 'Đại số tuyến tính', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, pFailHistory: 0.22 },
  { maMon: 'MATH1302', tenMon: 'Giải tích 1', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, pFailHistory: 0.32 },
  { maMon: 'ENGL1301', tenMon: 'Tiếng Anh 1', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, pFailHistory: 0.12 },
  { maMon: 'PHED1101', tenMon: 'Giáo dục thể chất 1 (Điền kinh)', soTC: 1, nhom: 'Môn điều kiện', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: false, pFailHistory: 0.05 },
  
  // Học kỳ 2
  { maMon: 'COSC1302', tenMon: 'Kỹ thuật lập trình', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: 'COSC1301', hkDuKien: 2, isTichLuy: true, pFailHistory: 0.25 },
  { maMon: 'MATH1303', tenMon: 'Toán rời rạc', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 2, isTichLuy: true, pFailHistory: 0.24 },
  { maMon: 'COSC1303', tenMon: 'Kiến trúc máy tính', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 2, isTichLuy: true, pFailHistory: 0.15 },
  { maMon: 'ENGL1302', tenMon: 'Tiếng Anh 2', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: 'ENGL1301', hkDuKien: 2, isTichLuy: true, pFailHistory: 0.14 },
  { maMon: 'PHED1102', tenMon: 'Giáo dục thể chất 2 (Bóng bàn)', soTC: 1, nhom: 'Môn điều kiện', batBuoc: true, tienQuyet: 'PHED1101', hkDuKien: 2, isTichLuy: false, pFailHistory: 0.04 },
  { maMon: 'MILI1101', tenMon: 'Giáo dục quốc phòng - An ninh', soTC: 8, nhom: 'Môn điều kiện', batBuoc: true, tienQuyet: '', hkDuKien: 2, isTichLuy: false, pFailHistory: 0.02 },

  // Học kỳ 3
  { maMon: 'COSC2301', tenMon: 'Cấu trúc dữ liệu và giải thuật', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: 'COSC1302', hkDuKien: 3, isTichLuy: true, pFailHistory: 0.28 },
  { maMon: 'COSC2302', tenMon: 'Cơ sở dữ liệu', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 3, isTichLuy: true, pFailHistory: 0.20 },
  { maMon: 'COSC2303', tenMon: 'Lập trình hướng đối tượng', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: 'COSC1302', hkDuKien: 3, isTichLuy: true, pFailHistory: 0.16 },
  { maMon: 'STAT1301', tenMon: 'Xác suất thống kê', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: 'MATH1302', hkDuKien: 3, isTichLuy: true, pFailHistory: 0.26 },
  { maMon: 'POLI1301', tenMon: 'Triết học Mác - Lênin', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: '', hkDuKien: 3, isTichLuy: true, pFailHistory: 0.10 },

  // Học kỳ 4
  { maMon: 'COSC2304', tenMon: 'Hệ quản trị cơ sở dữ liệu', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2302', hkDuKien: 4, isTichLuy: true, pFailHistory: 0.22 },
  { maMon: 'COSC2305', tenMon: 'Hệ điều hành', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: 'COSC1303', hkDuKien: 4, isTichLuy: true, pFailHistory: 0.19 },
  { maMon: 'COSC2306', tenMon: 'Mạng máy tính', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 4, isTichLuy: true, pFailHistory: 0.17 },
  { maMon: 'COSC2307', tenMon: 'Công nghệ phần mềm', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2303', hkDuKien: 4, isTichLuy: true, pFailHistory: 0.15 },
  { maMon: 'POLI1202', tenMon: 'Kinh tế chính trị Mác - Lênin', soTC: 2, nhom: 'Đại cương', batBuoc: true, tienQuyet: 'POLI1301', hkDuKien: 4, isTichLuy: true, pFailHistory: 0.08 },

  // Học kỳ 5 (Học kỳ vừa kết thúc)
  { maMon: 'COSC3301', tenMon: 'Lập trình Web hiện đại', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2302', hkDuKien: 5, isTichLuy: true, pFailHistory: 0.18 },
  { maMon: 'COSC3302', tenMon: 'Trí tuệ nhân tạo', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2301', hkDuKien: 5, isTichLuy: true, pFailHistory: 0.25 },
  { maMon: 'COSC3303', tenMon: 'Phân tích thiết kế hệ thống', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2307', hkDuKien: 5, isTichLuy: true, pFailHistory: 0.16 },
  { maMon: 'COSC3304', tenMon: 'An toàn và bảo mật thông tin', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2306', hkDuKien: 5, isTichLuy: true, pFailHistory: 0.20 },
  { maMon: 'POLI1203', tenMon: 'Chủ nghĩa xã hội khoa học', soTC: 2, nhom: 'Đại cương', batBuoc: true, tienQuyet: 'POLI1301', hkDuKien: 5, isTichLuy: true, pFailHistory: 0.07 },

  // Học kỳ 6 (Học kỳ tới - Dùng cho What-If Planner)
  { maMon: 'COSC3305', tenMon: 'Phát triển ứng dụng di động', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2303', hkDuKien: 6, isTichLuy: true, pFailHistory: 0.22 },
  { maMon: 'COSC3306', tenMon: 'Điện toán đám mây & DevOps', soTC: 3, nhom: 'Chuyên ngành', batBuoc: false, tienQuyet: 'COSC2306', hkDuKien: 6, isTichLuy: true, pFailHistory: 0.24 },
  { maMon: 'COSC3307', tenMon: 'Khai phá dữ liệu & Big Data', soTC: 3, nhom: 'Chuyên ngành', batBuoc: false, tienQuyet: 'COSC2302', hkDuKien: 6, isTichLuy: true, pFailHistory: 0.30 },
  { maMon: 'COSC3308', tenMon: 'Kiểm thử phần mềm tự động', soTC: 3, nhom: 'Chuyên ngành', batBuoc: false, tienQuyet: 'COSC2307', hkDuKien: 6, isTichLuy: true, pFailHistory: 0.15 },
  { maMon: 'POLI1204', tenMon: 'Tư tưởng Hồ Chí Minh', soTC: 2, nhom: 'Đại cương', batBuoc: true, tienQuyet: 'POLI1301', hkDuKien: 6, isTichLuy: true, pFailHistory: 0.05 },
  { maMon: 'PROJ3201', tenMon: 'Đồ án môn học chuyên ngành', soTC: 2, nhom: 'Đồ án', batBuoc: true, tienQuyet: 'COSC3301', hkDuKien: 6, isTichLuy: true, pFailHistory: 0.18 },

  // Các học kỳ cuối (HK7, HK8)
  { maMon: 'COSC4301', tenMon: 'Học máy & Xử lý ngôn ngữ tự nhiên', soTC: 3, nhom: 'Tự chọn', batBuoc: false, tienQuyet: 'COSC3302', hkDuKien: 7, isTichLuy: true, pFailHistory: 0.25 },
  { maMon: 'COSC4302', tenMon: 'Bảo mật ứng dụng Web & API', soTC: 3, nhom: 'Tự chọn', batBuoc: false, tienQuyet: 'COSC3304', hkDuKien: 7, isTichLuy: true, pFailHistory: 0.18 },
  { maMon: 'INTN4301', tenMon: 'Thực tập tốt nghiệp', soTC: 4, nhom: 'Thực tập', batBuoc: true, tienQuyet: '', hkDuKien: 7, isTichLuy: true, pFailHistory: 0.02 },
  { maMon: 'THES4901', tenMon: 'Khóa luận tốt nghiệp / Đồ án TN', soTC: 10, nhom: 'Tốt nghiệp', batBuoc: true, tienQuyet: 'INTN4301', hkDuKien: 8, isTichLuy: true, pFailHistory: 0.05 }
];

export const TOTAL_PROGRAM_CREDITS = 141; // Tổng tín chỉ yêu cầu tốt nghiệp

/**
 * 40 Sinh viên mẫu của Lớp DH21IT01 (Sau 5 học kỳ)
 */
export const MOCK_STUDENTS = [
  // Sinh viên mẫu 1: Nguyễn Văn An - Học lực Khá Giỏi, dùng Planner kéo điểm
  {
    maSV: '2151010001',
    hoTen: 'Nguyễn Văn An',
    lop: 'DH21IT01',
    nganh: 'Công nghệ thông tin',
    khoaHoc: '2021 - 2025',
    namHoc: 3,
    gpaTL: 3.10,
    tcTichLuy: 82,
    tcNo: 0,
    level: 'NORMAL',
    levelText: 'Bình thường',
    levelBadge: 'badge-success',
    riskScore: 12,
    hadPrevWarning: false,
    historySemesters: [
      { hk: 'HK1 (2021-2022)', tcDK: 16, tcKD: 0, gpaHK: 3.25, gpaTL: 3.25 },
      { hk: 'HK2 (2021-2022)', tcDK: 19, tcKD: 0, gpaHK: 3.15, gpaTL: 3.20 },
      { hk: 'HK3 (2022-2023)', tcDK: 15, tcKD: 0, gpaHK: 3.00, gpaTL: 3.12 },
      { hk: 'HK4 (2022-2023)', tcDK: 17, tcKD: 0, gpaHK: 3.10, gpaTL: 3.11 },
      { hk: 'HK5 (2023-2024)', tcDK: 14, tcKD: 0, gpaHK: 3.05, gpaTL: 3.10 },
    ],
    completedCourses: [
      { maMon: 'COSC1301', tenMon: 'Nhập môn lập trình', soTC: 3, diemTK10: 8.5, grade4: 3.5, letter: 'A', isTichLuy: true, pass: true },
      { maMon: 'MATH1301', tenMon: 'Đại số tuyến tính', soTC: 3, diemTK10: 7.2, grade4: 2.5, letter: 'B', isTichLuy: true, pass: true },
      { maMon: 'MATH1302', tenMon: 'Giải tích 1', soTC: 3, diemTK10: 5.5, grade4: 1.5, letter: 'C', isTichLuy: true, pass: true },
      { maMon: 'COSC1302', tenMon: 'Kỹ thuật lập trình', soTC: 3, diemTK10: 7.5, grade4: 2.5, letter: 'B', isTichLuy: true, pass: true },
      { maMon: 'MATH1303', tenMon: 'Toán rời rạc', soTC: 3, diemTK10: 6.0, grade4: 1.5, letter: 'C', isTichLuy: true, pass: true },
      { maMon: 'COSC2301', tenMon: 'Cấu trúc dữ liệu và giải thuật', soTC: 3, diemTK10: 8.2, grade4: 3.0, letter: 'B+', isTichLuy: true, pass: true },
      { maMon: 'COSC2302', tenMon: 'Cơ sở dữ liệu', soTC: 3, diemTK10: 6.5, grade4: 2.0, letter: 'C+', isTichLuy: true, pass: true },
      { maMon: 'COSC2307', tenMon: 'Công nghệ phần mềm', soTC: 3, diemTK10: 8.8, grade4: 3.5, letter: 'A', isTichLuy: true, pass: true },
      { maMon: 'PHED1101', tenMon: 'Giáo dục thể chất 1', soTC: 1, diemTK10: 8.0, grade4: 3.0, letter: 'B+', isTichLuy: false, pass: true },
      { maMon: 'MILI1101', tenMon: 'Giáo dục quốc phòng - An ninh', soTC: 8, diemTK10: 8.5, grade4: 3.5, letter: 'A', isTichLuy: false, pass: true }
    ],
    counselingLog: []
  },

  // Sinh viên mẫu 2: Trần Minh Tú - NGUY CƠ CAO (Kỷ luật học vụ, nợ 20 TC, rớt >50% kỳ gần nhất)
  {
    maSV: '2151010005',
    hoTen: 'Trần Minh Tú',
    lop: 'DH21IT01',
    nganh: 'Công nghệ thông tin',
    khoaHoc: '2021 - 2025',
    namHoc: 3,
    gpaTL: 1.55,
    tcTichLuy: 52,
    tcNo: 20,
    level: 'HIGH_RISK',
    levelText: 'Nguy cơ cao (Diện kỷ luật)',
    levelBadge: 'badge-danger',
    riskScore: 92,
    hadPrevWarning: true,
    historySemesters: [
      { hk: 'HK1 (2021-2022)', tcDK: 16, tcKD: 0, gpaHK: 2.40, gpaTL: 2.40 },
      { hk: 'HK2 (2021-2022)', tcDK: 16, tcKD: 3, gpaHK: 1.80, gpaTL: 2.10 },
      { hk: 'HK3 (2022-2023)', tcDK: 15, tcKD: 6, gpaHK: 1.30, gpaTL: 1.85 },
      { hk: 'HK4 (2022-2023)', tcDK: 17, tcKD: 6, gpaHK: 1.25, gpaTL: 1.68 },
      { hk: 'HK5 (2023-2024)', tcDK: 14, tcKD: 9, gpaHK: 0.90, gpaTL: 1.55 }, // Rớt 9/14 TC (>50%), GPA HK 0.9 (<1.0), GPA TL 1.55 (<1.6 sàn năm 3)
    ],
    completedCourses: [
      { maMon: 'COSC1301', tenMon: 'Nhập môn lập trình', soTC: 3, diemTK10: 6.0, grade4: 1.5, letter: 'C', isTichLuy: true, pass: true },
      { maMon: 'MATH1301', tenMon: 'Đại số tuyến tính', soTC: 3, diemTK10: 3.5, grade4: 0.0, letter: 'F', isTichLuy: true, pass: false }, // Nợ
      { maMon: 'MATH1302', tenMon: 'Giải tích 1', soTC: 3, diemTK10: 3.0, grade4: 0.0, letter: 'F', isTichLuy: true, pass: false }, // Nợ
      { maMon: 'COSC1302', tenMon: 'Kỹ thuật lập trình', soTC: 3, diemTK10: 5.0, grade4: 1.0, letter: 'D', isTichLuy: true, pass: true },
      { maMon: 'COSC2301', tenMon: 'Cấu trúc dữ liệu và giải thuật', soTC: 3, diemTK10: 3.2, grade4: 0.0, letter: 'F', isTichLuy: true, pass: false }, // Nợ
      { maMon: 'COSC2302', tenMon: 'Cơ sở dữ liệu', soTC: 3, diemTK10: 3.8, grade4: 0.0, letter: 'F', isTichLuy: true, pass: false }, // Nợ
      { maMon: 'COSC3301', tenMon: 'Lập trình Web hiện đại', soTC: 3, diemTK10: 3.5, grade4: 0.0, letter: 'F', isTichLuy: true, pass: false }, // Nợ
      { maMon: 'COSC3302', tenMon: 'Trí tuệ nhân tạo', soTC: 3, diemTK10: 3.0, grade4: 0.0, letter: 'F', isTichLuy: true, pass: false }, // Nợ
      { maMon: 'POLI1301', tenMon: 'Triết học Mác - Lênin', soTC: 3, diemTK10: 6.0, grade4: 1.5, letter: 'C', isTichLuy: true, pass: true }
    ],
    counselingLog: [
      { date: '15/10/2023', status: 'Đang hỗ trợ', note: 'Sinh viên đi làm thêm ca đêm quá nhiều dẫn đến vắng học và thi rớt hàng loạt môn. Đã lập biên bản cam kết hạn chế làm thêm, ưu tiên đăng ký trả nợ các môn Giải tích 1 và Cơ sở dữ liệu.' }
    ]
  },

  // Sinh viên mẫu 3: Lê Hoàng Long - CẢNH BÁO SỚM (Nợ 12 TC, GPA giảm dần)
  {
    maSV: '2151010003',
    hoTen: 'Lê Hoàng Long',
    lop: 'DH21IT01',
    nganh: 'Công nghệ thông tin',
    khoaHoc: '2021 - 2025',
    namHoc: 3,
    gpaTL: 1.95,
    tcTichLuy: 65,
    tcNo: 12,
    level: 'EARLY_WARNING',
    levelText: 'Cảnh báo sớm',
    levelBadge: 'badge-warning',
    riskScore: 68,
    hadPrevWarning: false,
    historySemesters: [
      { hk: 'HK1 (2021-2022)', tcDK: 16, tcKD: 0, gpaHK: 2.80, gpaTL: 2.80 },
      { hk: 'HK2 (2021-2022)', tcDK: 16, tcKD: 3, gpaHK: 2.20, gpaTL: 2.50 },
      { hk: 'HK3 (2022-2023)', tcDK: 15, tcKD: 3, gpaHK: 1.90, gpaTL: 2.28 },
      { hk: 'HK4 (2022-2023)', tcDK: 17, tcKD: 3, gpaHK: 1.60, gpaTL: 2.08 },
      { hk: 'HK5 (2023-2024)', tcDK: 14, tcKD: 3, gpaHK: 1.40, gpaTL: 1.95 },
    ],
    completedCourses: [
      { maMon: 'COSC1301', tenMon: 'Nhập môn lập trình', soTC: 3, diemTK10: 7.0, grade4: 2.5, letter: 'B', isTichLuy: true, pass: true },
      { maMon: 'MATH1302', tenMon: 'Giải tích 1', soTC: 3, diemTK10: 3.5, grade4: 0.0, letter: 'F', isTichLuy: true, pass: false },
      { maMon: 'COSC2301', tenMon: 'Cấu trúc dữ liệu và giải thuật', soTC: 3, diemTK10: 3.8, grade4: 0.0, letter: 'F', isTichLuy: true, pass: false },
      { maMon: 'COSC2302', tenMon: 'Cơ sở dữ liệu', soTC: 3, diemTK10: 5.0, grade4: 1.0, letter: 'D', isTichLuy: true, pass: true },
      { maMon: 'COSC3302', tenMon: 'Trí tuệ nhân tạo', soTC: 3, diemTK10: 3.2, grade4: 0.0, letter: 'F', isTichLuy: true, pass: false }
    ],
    counselingLog: []
  },

  // Thêm các sinh viên khác của lớp (tổng hợp 40 SV)
  { maSV: '2151010002', hoTen: 'Phạm Thị Bích', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 3.45, tcTichLuy: 85, tcNo: 0, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 8 },
  { maSV: '2151010004', hoTen: 'Hoàng Quốc Cường', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 2.85, tcTichLuy: 76, tcNo: 3, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 22 },
  { maSV: '2151010006', hoTen: 'Vũ Thị Duyên', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 2.65, tcTichLuy: 72, tcNo: 6, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 28 },
  { maSV: '2151010007', hoTen: 'Đặng Hữu Đạt', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 3.65, tcTichLuy: 88, tcNo: 0, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 5 },
  { maSV: '2151010008', hoTen: 'Bùi Gia Hân', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 1.85, tcTichLuy: 60, tcNo: 15, level: 'EARLY_WARNING', levelText: 'Cảnh báo sớm', levelBadge: 'badge-warning', riskScore: 65 },
  { maSV: '2151010009', hoTen: 'Đỗ Trọng Hiếu', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 2.95, tcTichLuy: 79, tcNo: 3, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 20 },
  { maSV: '2151010010', hoTen: 'Lý Kim Hoa', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 1.52, tcTichLuy: 48, tcNo: 22, level: 'HIGH_RISK', levelText: 'Nguy cơ cao (Diện kỷ luật)', levelBadge: 'badge-danger', riskScore: 90, hadPrevWarning: true },
  { maSV: '2151010011', hoTen: 'Mai Văn Hùng', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 2.70, tcTichLuy: 74, tcNo: 3, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 25 },
  { maSV: '2151010012', hoTen: 'Ngô Tấn Khoa', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 3.30, tcTichLuy: 83, tcNo: 0, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 10 },
  { maSV: '2151010013', hoTen: 'Dương Thị Lan', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 1.90, tcTichLuy: 62, tcNo: 12, level: 'EARLY_WARNING', levelText: 'Cảnh báo sớm', levelBadge: 'badge-warning', riskScore: 62 },
  { maSV: '2151010014', hoTen: 'Trịnh Quang Minh', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 2.45, tcTichLuy: 68, tcNo: 6, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 35 },
  { maSV: '2151010015', hoTen: 'Đoàn Nhật Nam', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 1.48, tcTichLuy: 46, tcNo: 26, level: 'HIGH_RISK', levelText: 'Nguy cơ cao (Diện kỷ luật)', levelBadge: 'badge-danger', riskScore: 95, hadPrevWarning: true },
  { maSV: '2151010016', hoTen: 'Lâm Hoài Phong', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 3.05, tcTichLuy: 80, tcNo: 0, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 14 },
  { maSV: '2151010017', hoTen: 'Võ Minh Quân', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 2.20, tcTichLuy: 66, tcNo: 9, level: 'EARLY_WARNING', levelText: 'Cảnh báo sớm', levelBadge: 'badge-warning', riskScore: 55 },
  { maSV: '2151010018', hoTen: 'Thái Mỹ Quyên', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 3.50, tcTichLuy: 86, tcNo: 0, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 6 },
  { maSV: '2151010019', hoTen: 'Phan Tấn Sang', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 2.35, tcTichLuy: 67, tcNo: 6, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 38 },
  { maSV: '2151010020', hoTen: 'Chu Thanh Sơn', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 1.58, tcTichLuy: 51, tcNo: 21, level: 'HIGH_RISK', levelText: 'Nguy cơ cao (Diện kỷ luật)', levelBadge: 'badge-danger', riskScore: 88, hadPrevWarning: true },
  { maSV: '2151010021', hoTen: 'Tạ Minh Tâm', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 3.15, tcTichLuy: 82, tcNo: 0, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 11 },
  { maSV: '2151010022', hoTen: 'Lưu Ngọc Thảo', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 2.80, tcTichLuy: 75, tcNo: 3, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 24 },
  { maSV: '2151010023', hoTen: 'Đinh Công Thịnh', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 2.10, tcTichLuy: 64, tcNo: 9, level: 'EARLY_WARNING', levelText: 'Cảnh báo sớm', levelBadge: 'badge-warning', riskScore: 58 },
  { maSV: '2151010024', hoTen: 'Vương Vĩnh Thuận', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 3.20, tcTichLuy: 82, tcNo: 0, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 12 },
  { maSV: '2151010025', hoTen: 'Hà Phương Thúy', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 3.60, tcTichLuy: 87, tcNo: 0, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 6 },
  { maSV: '2151010026', hoTen: 'Bạch Đình Trọng', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 1.98, tcTichLuy: 65, tcNo: 9, level: 'EARLY_WARNING', levelText: 'Cảnh báo sớm', levelBadge: 'badge-warning', riskScore: 52 },
  { maSV: '2151010027', hoTen: 'Lê Cẩm Tú', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 2.90, tcTichLuy: 78, tcNo: 3, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 21 },
  { maSV: '2151010028', hoTen: 'Triệu Thanh Tùng', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 1.42, tcTichLuy: 44, tcNo: 27, level: 'HIGH_RISK', levelText: 'Nguy cơ cao (Diện kỷ luật)', levelBadge: 'badge-danger', riskScore: 98, hadPrevWarning: true },
  { maSV: '2151010029', hoTen: 'Huỳnh Khánh Vân', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 3.40, tcTichLuy: 85, tcNo: 0, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 9 },
  { maSV: '2151010030', hoTen: 'Tôn Thất Vĩ', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 2.50, tcTichLuy: 70, tcNo: 6, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 32 },
  { maSV: '2151010031', hoTen: 'Phùng Bảo Vy', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 2.75, tcTichLuy: 75, tcNo: 3, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 23 },
  { maSV: '2151010032', hoTen: 'Đỗ Hữu Xuân', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 3.00, tcTichLuy: 80, tcNo: 0, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 15 },
  { maSV: '2151010033', hoTen: 'Lương Nhã Ý', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 3.70, tcTichLuy: 89, tcNo: 0, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 4 },
  { maSV: '2151010034', hoTen: 'Châu Vĩnh An', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 2.05, tcTichLuy: 64, tcNo: 9, level: 'EARLY_WARNING', levelText: 'Cảnh báo sớm', levelBadge: 'badge-warning', riskScore: 56 },
  { maSV: '2151010035', hoTen: 'Tô Gia Bảo', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 2.60, tcTichLuy: 71, tcNo: 6, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 30 },
  { maSV: '2151010036', hoTen: 'Trương Quốc Đạt', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 1.88, tcTichLuy: 61, tcNo: 12, level: 'EARLY_WARNING', levelText: 'Cảnh báo sớm', levelBadge: 'badge-warning', riskScore: 64 },
  { maSV: '2151010037', hoTen: 'Quách Mỹ Hạnh', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 3.35, tcTichLuy: 84, tcNo: 0, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 9 },
  { maSV: '2151010038', hoTen: 'Nghiêm Minh Khôi', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 2.15, tcTichLuy: 65, tcNo: 9, level: 'EARLY_WARNING', levelText: 'Cảnh báo sớm', levelBadge: 'badge-warning', riskScore: 57 },
  { maSV: '2151010039', hoTen: 'Phó Gia Linh', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 3.10, tcTichLuy: 81, tcNo: 0, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 13 },
  { maSV: '2151010040', hoTen: 'Âu Dương Quân', lop: 'DH21IT01', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 1.92, tcTichLuy: 62, tcNo: 12, level: 'EARLY_WARNING', levelText: 'Cảnh báo sớm', levelBadge: 'badge-warning', riskScore: 61 },
];

/**
 * Danh sách sinh viên thực tế học môn Cơ sở dữ liệu (COSC2302) trong HK3 - Lớp DH21IT01
 * Phục vụ demo Phân hệ 1 (Quản lý điểm)
 */
export const MOCK_CLASS_SUBJECT_SCORES = [
  { maSV: '2151010001', hoTen: 'Nguyễn Văn An', diemQT: 7.5, diemThi: 6.0 },
  { maSV: '2151010002', hoTen: 'Phạm Thị Bích', diemQT: 8.5, diemThi: 8.0 },
  { maSV: '2151010003', hoTen: 'Lê Hoàng Long', diemQT: 5.0, diemThi: 5.0 },
  { maSV: '2151010004', hoTen: 'Hoàng Quốc Cường', diemQT: 7.0, diemThi: 6.5 },
  { maSV: '2151010005', hoTen: 'Trần Minh Tú', diemQT: 4.5, diemThi: 3.2 }, // Rớt môn F
  { maSV: '2151010006', hoTen: 'Vũ Thị Duyên', diemQT: 6.0, diemThi: 6.0 },
  { maSV: '2151010007', hoTen: 'Đặng Hữu Đạt', diemQT: 9.5, diemThi: 9.0 },
  { maSV: '2151010008', hoTen: 'Bùi Gia Hân', diemQT: 5.0, diemThi: 3.5 }, // Rớt môn F
  { maSV: '2151010009', hoTen: 'Đỗ Trọng Hiếu', diemQT: 8.0, diemThi: 7.0 },
  { maSV: '2151010010', hoTen: 'Lý Kim Hoa', diemQT: 3.5, diemThi: 2.5 }, // Rớt môn F
  { maSV: '2151010011', hoTen: 'Mai Văn Hùng', diemQT: 7.0, diemThi: 7.5 },
  { maSV: '2151010012', hoTen: 'Ngô Tấn Khoa', diemQT: 8.5, diemThi: 8.5 },
  { maSV: '2151010013', hoTen: 'Dương Thị Lan', diemQT: 5.5, diemThi: 4.0 },
  { maSV: '2151010014', hoTen: 'Trịnh Quang Minh', diemQT: 6.5, diemThi: 6.0 },
  { maSV: '2151010015', hoTen: 'Đoàn Nhật Nam', diemQT: 3.0, diemThi: 2.0 }, // Rớt môn F
  { maSV: '2151010016', hoTen: 'Lâm Hoài Phong', diemQT: 8.0, diemThi: 7.5 },
  { maSV: '2151010017', hoTen: 'Võ Minh Quân', diemQT: 6.0, diemThi: 4.5 },
  { maSV: '2151010018', hoTen: 'Thái Mỹ Quyên', diemQT: 9.0, diemThi: 8.5 },
  { maSV: '2151010019', hoTen: 'Phan Tấn Sang', diemQT: 7.0, diemThi: 5.5 },
  { maSV: '2151010020', hoTen: 'Chu Thanh Sơn', diemQT: 4.0, diemThi: 3.5 }, // Rớt môn F
  { maSV: '2151010021', hoTen: 'Tạ Minh Tâm', diemQT: 8.0, diemThi: 8.0 },
  { maSV: '2151010022', hoTen: 'Lưu Ngọc Thảo', diemQT: 7.5, diemThi: 7.0 },
  { maSV: '2151010023', hoTen: 'Đinh Công Thịnh', diemQT: 5.5, diemThi: 5.0 },
  { maSV: '2151010024', hoTen: 'Vương Vĩnh Thuận', diemQT: 8.0, diemThi: 8.0 },
  { maSV: '2151010025', hoTen: 'Hà Phương Thúy', diemQT: 9.0, diemThi: 9.0 },
  { maSV: '2151010026', hoTen: 'Bạch Đình Trọng', diemQT: 5.5, diemThi: 4.5 },
  { maSV: '2151010027', hoTen: 'Lê Cẩm Tú', diemQT: 7.5, diemThi: 7.0 },
  { maSV: '2151010028', hoTen: 'Triệu Thanh Tùng', diemQT: 3.0, diemThi: 2.5 }, // Rớt môn F
  { maSV: '2151010029', hoTen: 'Huỳnh Khánh Vân', diemQT: 8.5, diemThi: 8.5 },
  { maSV: '2151010030', hoTen: 'Tôn Thất Vĩ', diemQT: 7.0, diemThi: 6.0 }
];

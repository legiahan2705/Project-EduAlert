/**
 * mockData.js inside app/engine/
 * Dữ liệu độc lập cho EduAlert
 * Tổ chức phân cấp chuẩn:
 * 1. Khoa (Faculties)
 * 2. Ngành thuộc Khoa (Majors belonging to Faculty)
 * 3. Chương trình đào tạo của Ngành (Curriculum: Danh sách môn học & số tín chỉ)
 * 4. Lớp học trong Ngành (Classes belonging to Major)
 * 5. Sinh viên trong Lớp (Students belonging to Class)
 * 6. Điểm môn học (Course grades)
 */

// 1. DANH SÁCH KHOA CÓ SẴN
export const MOCK_FACULTIES = [
  {
    maKhoa: 'FIT',
    tenKhoa: 'Khoa Công nghệ thông tin',
    truongKhoa: 'TS. Lê Xuân Vĩnh',
    vanPhong: 'Phòng A201, Cơ sở 371 Nguyễn Kiệm',
    sdt: '(028) 3930 0072',
    email: 'fit@ou.edu.vn'
  },
  {
    maKhoa: 'FECO',
    tenKhoa: 'Khoa Kinh tế',
    truongKhoa: 'PGS.TS. Nguyễn Văn Hùng',
    vanPhong: 'Phòng B102, Cơ sở 97 Võ Văn Tần',
    sdt: '(028) 3930 0073',
    email: 'feco@ou.edu.vn'
  },
  {
    maKhoa: 'FAAF',
    tenKhoa: 'Khoa Kế toán - Kiểm toán',
    truongKhoa: 'TS. Phan Thị Thùy',
    vanPhong: 'Phòng C301, Cơ sở 97 Võ Văn Tần',
    sdt: '(028) 3930 0074',
    email: 'faaf@ou.edu.vn'
  },
  {
    maKhoa: 'FBA',
    tenKhoa: 'Khoa Quản trị kinh doanh',
    truongKhoa: 'PGS.TS. Trần Thị Lan',
    vanPhong: 'Phòng B205, Cơ sở 97 Võ Văn Tần',
    sdt: '(028) 3930 0075',
    email: 'fba@ou.edu.vn'
  },
  {
    maKhoa: 'FFL',
    tenKhoa: 'Khoa Ngoại ngữ',
    truongKhoa: 'TS. Hoàng Minh Đạo',
    vanPhong: 'Phòng D101, Cơ sở 35-37 Hồ Hảo Hớn',
    sdt: '(028) 3930 0076',
    email: 'ffl@ou.edu.vn'
  }
];

// 2. DANH SÁCH NGÀNH (THUỘC KHOA)
export const MOCK_MAJORS = [
  // Thuộc Khoa Công nghệ thông tin (FIT)
  {
    maNganh: '7480201',
    tenNganh: 'Công nghệ thông tin',
    maKhoa: 'FIT',
    tongTC: 141,
    heDaoTao: 'Chính quy',
    moTa: 'Đào tạo kỹ sư, cử nhân CNTT chuyên sâu về phần mềm, an toàn thông tin, trí tuệ nhân tạo và hệ thống mạng.',
    trangThai: 'ACTIVE'
  },
  {
    maNganh: '7480103',
    tenNganh: 'Kỹ thuật phần mềm',
    maKhoa: 'FIT',
    tongTC: 140,
    heDaoTao: 'Chính quy',
    moTa: 'Đào tạo kỹ sư chuyên trách kiến trúc phần mềm, kiểm thử tự động, quy trình DevOps và phát triển hệ sinh thái ứng dụng.',
    trangThai: 'ACTIVE'
  },
  {
    maNganh: '7480104',
    tenNganh: 'Hệ thống thông tin',
    maKhoa: 'FIT',
    tongTC: 138,
    heDaoTao: 'Chính quy',
    moTa: 'Kết hợp công nghệ và quản trị doanh nghiệp, phân tích yêu cầu phần mềm (BA), ERP và cơ sở dữ liệu lớn.',
    trangThai: 'ACTIVE'
  },

  // Thuộc Khoa Kinh tế (FECO)
  {
    maNganh: '7310101',
    tenNganh: 'Kinh tế học',
    maKhoa: 'FECO',
    tongTC: 135,
    heDaoTao: 'Chính quy',
    moTa: 'Trang bị kiến thức kinh tế vĩ mô, vi mô, phân tích định lượng chính sách và tài chính công.',
    trangThai: 'ACTIVE'
  },
  {
    maNganh: '7310106',
    tenNganh: 'Kinh tế quốc tế',
    maKhoa: 'FECO',
    tongTC: 136,
    heDaoTao: 'Chính quy',
    moTa: 'Tập trung thương mại quốc tế, đầu tư trực tiếp nước ngoài, chuỗi giá trị toàn cầu và logistics.',
    trangThai: 'ACTIVE'
  },

  // Thuộc Khoa Kế toán - Kiểm toán (FAAF)
  {
    maNganh: '7340301',
    tenNganh: 'Kế toán',
    maKhoa: 'FAAF',
    tongTC: 134,
    heDaoTao: 'Chính quy',
    moTa: 'Đào tạo cử nhân kế toán tài chính, kế toán quản trị, thuế và hệ thống thông tin kế toán doanh nghiệp.',
    trangThai: 'ACTIVE'
  },
  {
    maNganh: '7340302',
    tenNganh: 'Kiểm toán',
    maKhoa: 'FAAF',
    tongTC: 136,
    heDaoTao: 'Chính quy',
    moTa: 'Kiểm toán độc lập, kiểm toán nội bộ, đánh giá rủi ro tài chính và kiểm soát tuân thủ quy chuẩn kế toán.',
    trangThai: 'ACTIVE'
  },

  // Thuộc Khoa Quản trị kinh doanh (FBA)
  {
    maNganh: '7340101',
    tenNganh: 'Quản trị kinh doanh',
    maKhoa: 'FBA',
    tongTC: 135,
    heDaoTao: 'Chính quy',
    moTa: 'Nắm vững chiến lược kinh doanh, quản trị chuỗi cung ứng, quản trị nguồn nhân lực và phát triển thị trường.',
    trangThai: 'ACTIVE'
  }
];

// 3. CHƯƠNG TRÌNH ĐÀO TẠO NGÀNH (DANH SÁCH MÔN HỌC & TÍN CHỈ THEO TỪNG NGÀNH)
export const MOCK_MAJOR_CURRICULUM = {
  // Ngành Công nghệ thông tin (7480201)
  '7480201': [
    { maMon: 'COSC1301', tenMon: 'Nhập môn lập trình', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, pFailHistory: 0.18 },
    { maMon: 'MATH1301', tenMon: 'Đại số tuyến tính', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, pFailHistory: 0.22 },
    { maMon: 'MATH1302', tenMon: 'Giải tích 1', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, pFailHistory: 0.32 },
    { maMon: 'ENGL1301', tenMon: 'Tiếng Anh 1', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, pFailHistory: 0.12 },
    { maMon: 'PHED1101', tenMon: 'Giáo dục thể chất 1', soTC: 1, nhom: 'Môn điều kiện', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: false, pFailHistory: 0.05 },

    { maMon: 'COSC1302', tenMon: 'Kỹ thuật lập trình', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: 'COSC1301', hkDuKien: 2, isTichLuy: true, pFailHistory: 0.25 },
    { maMon: 'MATH1303', tenMon: 'Toán rời rạc', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 2, isTichLuy: true, pFailHistory: 0.24 },
    { maMon: 'COSC1303', tenMon: 'Kiến trúc máy tính', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 2, isTichLuy: true, pFailHistory: 0.15 },
    { maMon: 'ENGL1302', tenMon: 'Tiếng Anh 2', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: 'ENGL1301', hkDuKien: 2, isTichLuy: true, pFailHistory: 0.14 },
    { maMon: 'MILI1101', tenMon: 'Giáo dục quốc phòng - An ninh', soTC: 8, nhom: 'Môn điều kiện', batBuoc: true, tienQuyet: '', hkDuKien: 2, isTichLuy: false, pFailHistory: 0.02 },

    { maMon: 'COSC2301', tenMon: 'Cấu trúc dữ liệu và giải thuật', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: 'COSC1302', hkDuKien: 3, isTichLuy: true, pFailHistory: 0.28 },
    { maMon: 'COSC2302', tenMon: 'Cơ sở dữ liệu', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 3, isTichLuy: true, pFailHistory: 0.20 },
    { maMon: 'COSC2303', tenMon: 'Lập trình hướng đối tượng', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: 'COSC1302', hkDuKien: 3, isTichLuy: true, pFailHistory: 0.16 },
    { maMon: 'STAT1301', tenMon: 'Xác suất thống kê', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: 'MATH1302', hkDuKien: 3, isTichLuy: true, pFailHistory: 0.26 },
    { maMon: 'POLI1301', tenMon: 'Triết học Mác - Lênin', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: '', hkDuKien: 3, isTichLuy: true, pFailHistory: 0.10 },

    { maMon: 'COSC2304', tenMon: 'Hệ quản trị cơ sở dữ liệu', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2302', hkDuKien: 4, isTichLuy: true, pFailHistory: 0.22 },
    { maMon: 'COSC2305', tenMon: 'Hệ điều hành', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: 'COSC1303', hkDuKien: 4, isTichLuy: true, pFailHistory: 0.19 },
    { maMon: 'COSC2306', tenMon: 'Mạng máy tính', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 4, isTichLuy: true, pFailHistory: 0.17 },
    { maMon: 'COSC2307', tenMon: 'Công nghệ phần mềm', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2303', hkDuKien: 4, isTichLuy: true, pFailHistory: 0.15 },
    { maMon: 'POLI1202', tenMon: 'Kinh tế chính trị Mác - Lênin', soTC: 2, nhom: 'Đại cương', batBuoc: true, tienQuyet: 'POLI1301', hkDuKien: 4, isTichLuy: true, pFailHistory: 0.08 },

    { maMon: 'COSC3301', tenMon: 'Lập trình Web hiện đại', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2302', hkDuKien: 5, isTichLuy: true, pFailHistory: 0.18 },
    { maMon: 'COSC3302', tenMon: 'Trí tuệ nhân tạo', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2301', hkDuKien: 5, isTichLuy: true, pFailHistory: 0.25 },
    { maMon: 'COSC3303', tenMon: 'Phân tích thiết kế hệ thống', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2307', hkDuKien: 5, isTichLuy: true, pFailHistory: 0.16 },
    { maMon: 'COSC3304', tenMon: 'An toàn và bảo mật thông tin', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2306', hkDuKien: 5, isTichLuy: true, pFailHistory: 0.20 },
    { maMon: 'POLI1203', tenMon: 'Chủ nghĩa xã hội khoa học', soTC: 2, nhom: 'Đại cương', batBuoc: true, tienQuyet: 'POLI1301', hkDuKien: 5, isTichLuy: true, pFailHistory: 0.07 },

    { maMon: 'COSC3305', tenMon: 'Phát triển ứng dụng di động', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2303', hkDuKien: 6, isTichLuy: true, pFailHistory: 0.22 },
    { maMon: 'COSC3306', tenMon: 'Điện toán đám mây & DevOps', soTC: 3, nhom: 'Chuyên ngành', batBuoc: false, tienQuyet: 'COSC2306', hkDuKien: 6, isTichLuy: true, pFailHistory: 0.24 },
    { maMon: 'COSC3307', tenMon: 'Khai phá dữ liệu & Big Data', soTC: 3, nhom: 'Chuyên ngành', batBuoc: false, tienQuyet: 'COSC2302', hkDuKien: 6, isTichLuy: true, pFailHistory: 0.30 },
    { maMon: 'COSC3308', tenMon: 'Kiểm thử phần mềm tự động', soTC: 3, nhom: 'Chuyên ngành', batBuoc: false, tienQuyet: 'COSC2307', hkDuKien: 6, isTichLuy: true, pFailHistory: 0.15 },
    { maMon: 'POLI1204', tenMon: 'Tư tưởng Hồ Chí Minh', soTC: 2, nhom: 'Đại cương', batBuoc: true, tienQuyet: 'POLI1301', hkDuKien: 6, isTichLuy: true, pFailHistory: 0.05 },
    { maMon: 'PROJ3201', tenMon: 'Đồ án môn học chuyên ngành', soTC: 2, nhom: 'Đồ án', batBuoc: true, tienQuyet: 'COSC3301', hkDuKien: 6, isTichLuy: true, pFailHistory: 0.18 },

    { maMon: 'INTN4301', tenMon: 'Thực tập tốt nghiệp', soTC: 4, nhom: 'Thực tập', batBuoc: true, tienQuyet: '', hkDuKien: 7, isTichLuy: true, pFailHistory: 0.02 },
    { maMon: 'THES4901', tenMon: 'Khóa luận tốt nghiệp / Đồ án TN', soTC: 10, nhom: 'Tốt nghiệp', batBuoc: true, tienQuyet: 'INTN4301', hkDuKien: 8, isTichLuy: true, pFailHistory: 0.05 }
  ],

  // Ngành Kỹ thuật phần mềm (7480103)
  '7480103': [
    { maMon: 'COSC1301', tenMon: 'Nhập môn lập trình', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, pFailHistory: 0.18 },
    { maMon: 'MATH1301', tenMon: 'Đại số tuyến tính', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, pFailHistory: 0.22 },
    { maMon: 'COSC1302', tenMon: 'Kỹ thuật lập trình', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: 'COSC1301', hkDuKien: 2, isTichLuy: true, pFailHistory: 0.25 },
    { maMon: 'SOFT2301', tenMon: 'Nhập môn Kỹ thuật phần mềm', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: 'COSC1301', hkDuKien: 2, isTichLuy: true, pFailHistory: 0.16 },
    { maMon: 'COSC2301', tenMon: 'Cấu trúc dữ liệu và giải thuật', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: 'COSC1302', hkDuKien: 3, isTichLuy: true, pFailHistory: 0.28 },
    { maMon: 'SOFT2302', tenMon: 'Thiết kế kiến trúc phần mềm', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'SOFT2301', hkDuKien: 3, isTichLuy: true, pFailHistory: 0.20 },
    { maMon: 'COSC2302', tenMon: 'Cơ sở dữ liệu', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 3, isTichLuy: true, pFailHistory: 0.20 },
    { maMon: 'SOFT3301', tenMon: 'Quy trình Agile & Quản lý dự án', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'SOFT2301', hkDuKien: 4, isTichLuy: true, pFailHistory: 0.14 },
    { maMon: 'SOFT3302', tenMon: 'Kiểm thử & Đảm bảo chất lượng phần mềm', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'SOFT2301', hkDuKien: 5, isTichLuy: true, pFailHistory: 0.19 },
    { maMon: 'SOFT3303', tenMon: 'DevOps & CI/CD Pipeline', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2306', hkDuKien: 6, isTichLuy: true, pFailHistory: 0.22 },
    { maMon: 'THES4902', tenMon: 'Đồ án Tốt nghiệp Kỹ thuật phần mềm', soTC: 10, nhom: 'Tốt nghiệp', batBuoc: true, tienQuyet: '', hkDuKien: 8, isTichLuy: true, pFailHistory: 0.04 }
  ],

  // Ngành Hệ thống thông tin (7480104)
  '7480104': [
    { maMon: 'COSC1301', tenMon: 'Nhập môn lập trình', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, pFailHistory: 0.18 },
    { maMon: 'INFO1301', tenMon: 'Tổng quan Hệ thống thông tin', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, pFailHistory: 0.12 },
    { maMon: 'COSC2302', tenMon: 'Cơ sở dữ liệu', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 2, isTichLuy: true, pFailHistory: 0.20 },
    { maMon: 'INFO2301', tenMon: 'Phân tích yêu cầu nghiệp vụ (BA)', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'INFO1301', hkDuKien: 3, isTichLuy: true, pFailHistory: 0.15 },
    { maMon: 'INFO2302', tenMon: 'Hệ thống thông tin quản lý (MIS)', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'INFO1301', hkDuKien: 4, isTichLuy: true, pFailHistory: 0.18 },
    { maMon: 'INFO3301', tenMon: 'Hệ thống hoạch định tài nguyên ERP', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'INFO2302', hkDuKien: 5, isTichLuy: true, pFailHistory: 0.21 },
    { maMon: 'INFO3302', tenMon: 'Kinh doanh thông minh & Kho dữ liệu (BI)', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2302', hkDuKien: 6, isTichLuy: true, pFailHistory: 0.25 },
    { maMon: 'THES4903', tenMon: 'Khóa luận tốt nghiệp HTTT', soTC: 10, nhom: 'Tốt nghiệp', batBuoc: true, tienQuyet: '', hkDuKien: 8, isTichLuy: true, pFailHistory: 0.05 }
  ],

  // Ngành Kế toán (7340301) - Khoa FAAF
  '7340301': [
    { maMon: 'ACCT1301', tenMon: 'Nguyên lý kế toán', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, pFailHistory: 0.15 },
    { maMon: 'ECON1301', tenMon: 'Kinh tế vi mô', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, pFailHistory: 0.20 },
    { maMon: 'ACCT2301', tenMon: 'Kế toán tài chính 1', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'ACCT1301', hkDuKien: 2, isTichLuy: true, pFailHistory: 0.22 },
    { maMon: 'ACCT2302', tenMon: 'Kế toán quản trị 1', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'ACCT1301', hkDuKien: 3, isTichLuy: true, pFailHistory: 0.18 },
    { maMon: 'TAX1301', tenMon: 'Luật thuế và kế toán thuế', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'ACCT1301', hkDuKien: 4, isTichLuy: true, pFailHistory: 0.16 },
    { maMon: 'AUDI2301', tenMon: 'Kiểm toán căn bản', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'ACCT2301', hkDuKien: 5, isTichLuy: true, pFailHistory: 0.19 },
    { maMon: 'THES4905', tenMon: 'Khóa luận tốt nghiệp Kế toán', soTC: 10, nhom: 'Tốt nghiệp', batBuoc: true, tienQuyet: '', hkDuKien: 8, isTichLuy: true, pFailHistory: 0.03 }
  ],

  // Ngành Kiểm toán (7340302) - Khoa FAAF
  '7340302': [
    { maMon: 'ACCT1301', tenMon: 'Nguyên lý kế toán', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, pFailHistory: 0.15 },
    { maMon: 'AUDI2301', tenMon: 'Kiểm toán căn bản', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: 'ACCT1301', hkDuKien: 2, isTichLuy: true, pFailHistory: 0.18 },
    { maMon: 'AUDI3301', tenMon: 'Kiểm toán tài chính chuyên sâu', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'AUDI2301', hkDuKien: 3, isTichLuy: true, pFailHistory: 0.22 },
    { maMon: 'AUDI3302', tenMon: 'Kiểm soát nội bộ và quản trị rủi ro', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'AUDI2301', hkDuKien: 4, isTichLuy: true, pFailHistory: 0.17 },
    { maMon: 'THES4906', tenMon: 'Khóa luận tốt nghiệp Kiểm toán', soTC: 10, nhom: 'Tốt nghiệp', batBuoc: true, tienQuyet: '', hkDuKien: 8, isTichLuy: true, pFailHistory: 0.04 }
  ],

  // Ngành Kinh tế học (7310101) - Khoa FECO
  '7310101': [
    { maMon: 'ECON1301', tenMon: 'Kinh tế vi mô 1', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, pFailHistory: 0.18 },
    { maMon: 'ECON1302', tenMon: 'Kinh tế vĩ mô 1', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: 'ECON1301', hkDuKien: 2, isTichLuy: true, pFailHistory: 0.20 },
    { maMon: 'ECON2301', tenMon: 'Kinh tế lượng', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: 'ECON1301', hkDuKien: 3, isTichLuy: true, pFailHistory: 0.28 },
    { maMon: 'ECON2302', tenMon: 'Kinh tế phát triển', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'ECON1302', hkDuKien: 4, isTichLuy: true, pFailHistory: 0.14 },
    { maMon: 'THES4907', tenMon: 'Khóa luận tốt nghiệp Kinh tế', soTC: 10, nhom: 'Tốt nghiệp', batBuoc: true, tienQuyet: '', hkDuKien: 8, isTichLuy: true, pFailHistory: 0.04 }
  ],

  // Ngành Quản trị kinh doanh (7340101) - Khoa FBA
  '7340101': [
    { maMon: 'MGMT1301', tenMon: 'Nguyên lý quản trị', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, pFailHistory: 0.10 },
    { maMon: 'ECON1301', tenMon: 'Kinh tế vi mô', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, pFailHistory: 0.20 },
    { maMon: 'ECON1302', tenMon: 'Kinh tế vĩ mô', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: 'ECON1301', hkDuKien: 2, isTichLuy: true, pFailHistory: 0.22 },
    { maMon: 'MKTG2301', tenMon: 'Marketing căn bản', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: 'MGMT1301', hkDuKien: 2, isTichLuy: true, pFailHistory: 0.12 },
    { maMon: 'FINA2301', tenMon: 'Tài chính doanh nghiệp', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'ECON1301', hkDuKien: 3, isTichLuy: true, pFailHistory: 0.26 },
    { maMon: 'MGMT2302', tenMon: 'Quản trị nguồn nhân lực', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'MGMT1301', hkDuKien: 3, isTichLuy: true, pFailHistory: 0.15 },
    { maMon: 'MGMT3301', tenMon: 'Quản trị chuỗi cung ứng (SCM)', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'MGMT1301', hkDuKien: 4, isTichLuy: true, pFailHistory: 0.19 },
    { maMon: 'MGMT3302', tenMon: 'Quản trị chiến lược', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'MGMT1301', hkDuKien: 5, isTichLuy: true, pFailHistory: 0.18 },
    { maMon: 'THES4904', tenMon: 'Khóa luận tốt nghiệp QTKD', soTC: 10, nhom: 'Tốt nghiệp', batBuoc: true, tienQuyet: '', hkDuKien: 8, isTichLuy: true, pFailHistory: 0.05 }
  ]
};

export const MOCK_CURRICULUM = MOCK_MAJOR_CURRICULUM['7480201'];
export const TOTAL_PROGRAM_CREDITS = 141;

// 4. DANH SÁCH LỚP HỌC (THUỘC NGÀNH)
export const MOCK_CLASSES = [
  // Ngành CNTT (7480201)
  {
    maNganh: '7480201',
    maLop: 'DH21IT01',
    tenLop: 'ĐH CNTT Khóa 2021 - Lớp 01',
    khoaHoc: '2021 - 2025',
    namHocThu: 3,
    cvht: 'ThS. Nguyễn Hoàng Nam',
    emailCVHT: 'nam.nh@ou.edu.vn',
    phongHoc: 'A302 - Cơ sở 371 Nguyễn Kiệm'
  },
  {
    maNganh: '7480201',
    maLop: 'DH21IT02',
    tenLop: 'ĐH CNTT Khóa 2021 - Lớp 02',
    khoaHoc: '2021 - 2025',
    namHocThu: 3,
    cvht: 'TS. Trần Thị Bích',
    emailCVHT: 'bich.tt@ou.edu.vn',
    phongHoc: 'A304 - Cơ sở 371 Nguyễn Kiệm'
  },
  {
    maNganh: '7480201',
    maLop: 'DH22IT01',
    tenLop: 'ĐH CNTT Khóa 2022 - Lớp 01',
    khoaHoc: '2022 - 2026',
    namHocThu: 2,
    cvht: 'ThS. Lê Văn Dũng',
    emailCVHT: 'dung.lv@ou.edu.vn',
    phongHoc: 'B201 - Cơ sở 371 Nguyễn Kiệm'
  },

  // Ngành Kỹ thuật phần mềm (7480103)
  {
    maNganh: '7480103',
    maLop: 'DH21SE01',
    tenLop: 'ĐH Kỹ thuật phần mềm 2021 - Lớp 01',
    khoaHoc: '2021 - 2025',
    namHocThu: 3,
    cvht: 'TS. Phạm Minh Tuấn',
    emailCVHT: 'tuan.pm@ou.edu.vn',
    phongHoc: 'C102 - Cơ sở 371 Nguyễn Kiệm'
  },

  // Ngành Hệ thống thông tin (7480104)
  {
    maNganh: '7480104',
    maLop: 'DH21IS01',
    tenLop: 'ĐH Hệ thống thông tin 2021 - Lớp 01',
    khoaHoc: '2021 - 2025',
    namHocThu: 3,
    cvht: 'ThS. Đỗ Hồng Quân',
    emailCVHT: 'quan.dh@ou.edu.vn',
    phongHoc: 'C104 - Cơ sở 371 Nguyễn Kiệm'
  },

  // Ngành Kế toán (7340301) - Khoa FAAF
  {
    maNganh: '7340301',
    maLop: 'DH21KT01',
    tenLop: 'ĐH Kế toán Khóa 2021 - Lớp 01',
    khoaHoc: '2021 - 2025',
    namHocThu: 3,
    cvht: 'ThS. Đặng Thị Kim Loan',
    emailCVHT: 'loan.dtk@ou.edu.vn',
    phongHoc: 'C203 - Cơ sở 97 Võ Văn Tần'
  },
  {
    maNganh: '7340301',
    maLop: 'DH21KT02',
    tenLop: 'ĐH Kế toán Khóa 2021 - Lớp 02',
    khoaHoc: '2021 - 2025',
    namHocThu: 3,
    cvht: 'TS. Nguyễn Hữu Duyên',
    emailCVHT: 'duyen.nh@ou.edu.vn',
    phongHoc: 'C205 - Cơ sở 97 Võ Văn Tần'
  },

  // Ngành Kinh tế học (7310101) - Khoa FECO
  {
    maNganh: '7310101',
    maLop: 'DH21EC01',
    tenLop: 'ĐH Kinh tế học 2021 - Lớp 01',
    khoaHoc: '2021 - 2025',
    namHocThu: 3,
    cvht: 'TS. Vũ Đình Thành',
    emailCVHT: 'thanh.vd@ou.edu.vn',
    phongHoc: 'B301 - Cơ sở 97 Võ Văn Tần'
  },

  // Ngành Quản trị kinh doanh (7340101) - Khoa FBA
  {
    maNganh: '7340101',
    maLop: 'DH21BA01',
    tenLop: 'ĐH Quản trị kinh doanh 2021 - Lớp 01',
    khoaHoc: '2021 - 2025',
    namHocThu: 3,
    cvht: 'TS. Nguyễn Thị Mai',
    emailCVHT: 'mai.nt@ou.edu.vn',
    phongHoc: 'D201 - Cơ sở 97 Võ Văn Tần'
  }
];

// 5. DANH SÁCH SINH VIÊN (GẮN VỚI LỚP VÀ NGÀNH)
export const MOCK_STUDENTS = [
  // Sinh viên lớp DH21IT01 (Ngành CNTT)
  {
    maSV: '2151010001',
    hoTen: 'Nguyễn Văn An',
    gioiTinh: 'Nam',
    ngaySinh: '15/04/2003',
    lop: 'DH21IT01',
    maNganh: '7480201',
    nganh: 'Công nghệ thông tin',
    namHoc: 3,
    gpaTL: 3.10,
    tcTichLuy: 82,
    tcNo: 0,
    level: 'NORMAL',
    levelText: 'Bình thường',
    levelBadge: 'badge-success',
    riskScore: 12,
    hadPrevWarning: false,
    email: '2151010001an@ou.edu.vn',
    sdt: '0903123456',
    historySemesters: [
      { hk: 'HK1', tcDK: 16, tcKD: 0, gpaHK: 3.25, gpaTL: 3.25 },
      { hk: 'HK2', tcDK: 19, tcKD: 0, gpaHK: 3.15, gpaTL: 3.20 },
      { hk: 'HK3', tcDK: 15, tcKD: 0, gpaHK: 3.00, gpaTL: 3.12 },
      { hk: 'HK4', tcDK: 17, tcKD: 0, gpaHK: 3.10, gpaTL: 3.11 },
      { hk: 'HK5', tcDK: 14, tcKD: 0, gpaHK: 3.05, gpaTL: 3.10 },
    ],
    completedCourses: [
      { maMon: 'COSC1301', tenMon: 'Nhập môn lập trình', soTC: 3, diemTK10: 8.5, grade4: 3.5, letter: 'A', isTichLuy: true, pass: true },
      { maMon: 'MATH1301', tenMon: 'Đại số tuyến tính', soTC: 3, diemTK10: 7.2, grade4: 2.5, letter: 'B', isTichLuy: true, pass: true },
      { maMon: 'MATH1302', tenMon: 'Giải tích 1', soTC: 3, diemTK10: 5.5, grade4: 1.5, letter: 'C', isTichLuy: true, pass: true },
      { maMon: 'COSC1302', tenMon: 'Kỹ thuật lập trình', soTC: 3, diemTK10: 7.5, grade4: 2.5, letter: 'B', isTichLuy: true, pass: true },
      { maMon: 'MATH1303', tenMon: 'Toán rời rạc', soTC: 3, diemTK10: 6.0, grade4: 1.5, letter: 'C', isTichLuy: true, pass: true },
      { maMon: 'COSC2301', tenMon: 'Cấu trúc dữ liệu và giải thuật', soTC: 3, diemTK10: 8.2, grade4: 3.0, letter: 'B+', isTichLuy: true, pass: true },
      { maMon: 'COSC2302', tenMon: 'Cơ sở dữ liệu', soTC: 3, diemTK10: 6.5, grade4: 2.0, letter: 'C+', isTichLuy: true, pass: true },
      { maMon: 'COSC2307', tenMon: 'Công nghệ phần mềm', soTC: 3, diemTK10: 8.8, grade4: 3.5, letter: 'A', isTichLuy: true, pass: true }
    ],
    counselingLog: []
  },
  {
    maSV: '2151010005',
    hoTen: 'Trần Minh Tú',
    gioiTinh: 'Nam',
    ngaySinh: '20/08/2003',
    lop: 'DH21IT01',
    maNganh: '7480201',
    nganh: 'Công nghệ thông tin',
    namHoc: 3,
    gpaTL: 1.55,
    tcTichLuy: 52,
    tcNo: 20,
    level: 'HIGH_RISK',
    levelText: 'Nguy cơ cao (Diện kỷ luật)',
    levelBadge: 'badge-danger',
    riskScore: 92,
    hadPrevWarning: true,
    email: '2151010005tu@ou.edu.vn',
    sdt: '0912345678',
    historySemesters: [
      { hk: 'HK1', tcDK: 16, tcKD: 0, gpaHK: 2.40, gpaTL: 2.40 },
      { hk: 'HK2', tcDK: 16, tcKD: 3, gpaHK: 1.80, gpaTL: 2.10 },
      { hk: 'HK3', tcDK: 15, tcKD: 6, gpaHK: 1.30, gpaTL: 1.85 },
      { hk: 'HK4', tcDK: 17, tcKD: 6, gpaHK: 1.25, gpaTL: 1.68 },
      { hk: 'HK5', tcDK: 14, tcKD: 9, gpaHK: 0.90, gpaTL: 1.55 },
    ],
    completedCourses: [
      { maMon: 'COSC1301', tenMon: 'Nhập môn lập trình', soTC: 3, diemTK10: 6.0, grade4: 1.5, letter: 'C', isTichLuy: true, pass: true },
      { maMon: 'MATH1301', tenMon: 'Đại số tuyến tính', soTC: 3, diemTK10: 3.5, grade4: 0.0, letter: 'F', isTichLuy: true, pass: false },
      { maMon: 'MATH1302', tenMon: 'Giải tích 1', soTC: 3, diemTK10: 3.0, grade4: 0.0, letter: 'F', isTichLuy: true, pass: false },
      { maMon: 'COSC1302', tenMon: 'Kỹ thuật lập trình', soTC: 3, diemTK10: 5.0, grade4: 1.0, letter: 'D', isTichLuy: true, pass: true },
      { maMon: 'COSC2301', tenMon: 'Cấu trúc dữ liệu và giải thuật', soTC: 3, diemTK10: 3.2, grade4: 0.0, letter: 'F', isTichLuy: true, pass: false },
      { maMon: 'COSC2302', tenMon: 'Cơ sở dữ liệu', soTC: 3, diemTK10: 3.8, grade4: 0.0, letter: 'F', isTichLuy: true, pass: false },
      { maMon: 'COSC3301', tenMon: 'Lập trình Web hiện đại', soTC: 3, diemTK10: 3.5, grade4: 0.0, letter: 'F', isTichLuy: true, pass: false }
    ],
    counselingLog: [
      { date: '15/10/2023', status: 'Đang hỗ trợ', note: 'Sinh viên làm thêm ca đêm quá nhiều, vắng học và thi rớt hàng loạt môn. Đã lập biên bản cam kết hạn chế làm thêm, ưu tiên đăng ký trả nợ Giải tích 1 và Cơ sở dữ liệu.' }
    ]
  },
  {
    maSV: '2151010003',
    hoTen: 'Lê Hoàng Long',
    gioiTinh: 'Nam',
    ngaySinh: '11/02/2003',
    lop: 'DH21IT01',
    maNganh: '7480201',
    nganh: 'Công nghệ thông tin',
    namHoc: 3,
    gpaTL: 1.95,
    tcTichLuy: 65,
    tcNo: 12,
    level: 'EARLY_WARNING',
    levelText: 'Cảnh báo sớm',
    levelBadge: 'badge-warning',
    riskScore: 68,
    hadPrevWarning: false,
    email: '2151010003long@ou.edu.vn',
    sdt: '0988776655',
    historySemesters: [
      { hk: 'HK1', tcDK: 16, tcKD: 0, gpaHK: 2.80, gpaTL: 2.80 },
      { hk: 'HK2', tcDK: 16, tcKD: 3, gpaHK: 2.20, gpaTL: 2.50 },
      { hk: 'HK3', tcDK: 15, tcKD: 3, gpaHK: 1.90, gpaTL: 2.28 },
      { hk: 'HK4', tcDK: 17, tcKD: 3, gpaHK: 1.60, gpaTL: 2.08 },
      { hk: 'HK5', tcDK: 14, tcKD: 3, gpaHK: 1.40, gpaTL: 1.95 },
    ],
    completedCourses: [
      { maMon: 'COSC1301', tenMon: 'Nhập môn lập trình', soTC: 3, diemTK10: 7.0, grade4: 2.5, letter: 'B', isTichLuy: true, pass: true },
      { maMon: 'MATH1302', tenMon: 'Giải tích 1', soTC: 3, diemTK10: 3.5, grade4: 0.0, letter: 'F', isTichLuy: true, pass: false },
      { maMon: 'COSC2301', tenMon: 'Cấu trúc dữ liệu và giải thuật', soTC: 3, diemTK10: 3.8, grade4: 0.0, letter: 'F', isTichLuy: true, pass: false },
      { maMon: 'COSC2302', tenMon: 'Cơ sở dữ liệu', soTC: 3, diemTK10: 5.0, grade4: 1.0, letter: 'D', isTichLuy: true, pass: true }
    ],
    counselingLog: []
  },
  { maSV: '2151010002', hoTen: 'Phạm Thị Bích', gioiTinh: 'Nữ', ngaySinh: '02/09/2003', lop: 'DH21IT01', maNganh: '7480201', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 3.45, tcTichLuy: 85, tcNo: 0, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 8, email: '2151010002bich@ou.edu.vn', sdt: '0933112233' },
  { maSV: '2151010004', hoTen: 'Hoàng Quốc Cường', gioiTinh: 'Nam', ngaySinh: '14/12/2003', lop: 'DH21IT01', maNganh: '7480201', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 2.85, tcTichLuy: 76, tcNo: 3, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 22, email: '2151010004cuong@ou.edu.vn', sdt: '0977665544' },
  { maSV: '2151010006', hoTen: 'Vũ Thị Duyên', gioiTinh: 'Nữ', ngaySinh: '18/06/2003', lop: 'DH21IT01', maNganh: '7480201', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 2.65, tcTichLuy: 72, tcNo: 6, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 28, email: '2151010006duyen@ou.edu.vn', sdt: '0944556677' },
  { maSV: '2151010007', hoTen: 'Đặng Hữu Đạt', gioiTinh: 'Nam', ngaySinh: '29/01/2003', lop: 'DH21IT01', maNganh: '7480201', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 3.65, tcTichLuy: 88, tcNo: 0, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 5, email: '2151010007dat@ou.edu.vn', sdt: '0911223344' },
  { maSV: '2151010008', hoTen: 'Bùi Gia Hân', gioiTinh: 'Nữ', ngaySinh: '05/11/2003', lop: 'DH21IT01', maNganh: '7480201', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 1.85, tcTichLuy: 60, tcNo: 15, level: 'EARLY_WARNING', levelText: 'Cảnh báo sớm', levelBadge: 'badge-warning', riskScore: 65, email: '2151010008han@ou.edu.vn', sdt: '0922334455' },
  { maSV: '2151010009', hoTen: 'Đỗ Trọng Hiếu', gioiTinh: 'Nam', ngaySinh: '10/03/2003', lop: 'DH21IT01', maNganh: '7480201', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 2.95, tcTichLuy: 79, tcNo: 3, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 20, email: '2151010009hieu@ou.edu.vn', sdt: '0933445566' },
  { maSV: '2151010010', hoTen: 'Lý Kim Hoa', gioiTinh: 'Nữ', ngaySinh: '22/07/2003', lop: 'DH21IT01', maNganh: '7480201', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 1.52, tcTichLuy: 48, tcNo: 22, level: 'HIGH_RISK', levelText: 'Nguy cơ cao (Diện kỷ luật)', levelBadge: 'badge-danger', riskScore: 90, hadPrevWarning: true, email: '2151010010hoa@ou.edu.vn', sdt: '0944556677' },

  // Sinh viên lớp DH21IT02 (Ngành CNTT)
  { maSV: '2151010041', hoTen: 'Ngô Quốc Bảo', gioiTinh: 'Nam', ngaySinh: '12/05/2003', lop: 'DH21IT02', maNganh: '7480201', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 3.12, tcTichLuy: 81, tcNo: 0, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 12, email: '2151010041bao@ou.edu.vn', sdt: '0901234567' },
  { maSV: '2151010042', hoTen: 'Võ Kiều Diễm', gioiTinh: 'Nữ', ngaySinh: '19/09/2003', lop: 'DH21IT02', maNganh: '7480201', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 1.70, tcTichLuy: 55, tcNo: 18, level: 'EARLY_WARNING', levelText: 'Cảnh báo sớm', levelBadge: 'badge-warning', riskScore: 72, email: '2151010042diem@ou.edu.vn', sdt: '0902345678' },
  { maSV: '2151010043', hoTen: 'Lê Minh Hưng', gioiTinh: 'Nam', ngaySinh: '25/11/2003', lop: 'DH21IT02', maNganh: '7480201', nganh: 'Công nghệ thông tin', namHoc: 3, gpaTL: 2.80, tcTichLuy: 74, tcNo: 3, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 24, email: '2151010043hung@ou.edu.vn', sdt: '0903456789' },

  // Sinh viên lớp DH21SE01 (Ngành Kỹ thuật phần mềm)
  { maSV: '2151020001', hoTen: 'Đoàn Gia Phúc', gioiTinh: 'Nam', ngaySinh: '08/04/2003', lop: 'DH21SE01', maNganh: '7480103', nganh: 'Kỹ thuật phần mềm', namHoc: 3, gpaTL: 3.25, tcTichLuy: 84, tcNo: 0, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 10, email: '2151020001phuc@ou.edu.vn', sdt: '0904567890' },
  { maSV: '2151020002', hoTen: 'Nguyễn Thùy Trang', gioiTinh: 'Nữ', ngaySinh: '14/10/2003', lop: 'DH21SE01', maNganh: '7480103', nganh: 'Kỹ thuật phần mềm', namHoc: 3, gpaTL: 1.62, tcTichLuy: 50, tcNo: 21, level: 'HIGH_RISK', levelText: 'Nguy cơ cao', levelBadge: 'badge-danger', riskScore: 89, email: '2151020002trang@ou.edu.vn', sdt: '0905678901' },

  // Sinh viên lớp DH21IS01 (Ngành Hệ thống thông tin)
  { maSV: '2151030001', hoTen: 'Lý Quốc Huy', gioiTinh: 'Nam', ngaySinh: '03/07/2003', lop: 'DH21IS01', maNganh: '7480104', nganh: 'Hệ thống thông tin', namHoc: 3, gpaTL: 2.95, tcTichLuy: 78, tcNo: 3, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 18, email: '2151030001huy@ou.edu.vn', sdt: '0906789012' },

  // Sinh viên lớp DH21KT01 (Khoa Kế toán - Kiểm toán)
  { maSV: '2153010001', hoTen: 'Nguyễn Bích Phương', gioiTinh: 'Nữ', ngaySinh: '10/05/2003', lop: 'DH21KT01', maNganh: '7340301', nganh: 'Kế toán', namHoc: 3, gpaTL: 3.35, tcTichLuy: 82, tcNo: 0, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 10, email: '2153010001phuong@ou.edu.vn', sdt: '0938112233' },
  { maSV: '2153010002', hoTen: 'Trần Văn Thái', gioiTinh: 'Nam', ngaySinh: '24/09/2003', lop: 'DH21KT01', maNganh: '7340301', nganh: 'Kế toán', namHoc: 3, gpaTL: 1.75, tcTichLuy: 56, tcNo: 15, level: 'EARLY_WARNING', levelText: 'Cảnh báo sớm', levelBadge: 'badge-warning', riskScore: 65, email: '2153010002thai@ou.edu.vn', sdt: '0938223344' },

  // Sinh viên lớp DH21EC01 (Khoa Kinh tế)
  { maSV: '2154010001', hoTen: 'Vũ Quốc Đạt', gioiTinh: 'Nam', ngaySinh: '18/03/2003', lop: 'DH21EC01', maNganh: '7310101', nganh: 'Kinh tế học', namHoc: 3, gpaTL: 3.05, tcTichLuy: 76, tcNo: 0, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 14, email: '2154010001dat@ou.edu.vn', sdt: '0948334455' },
  { maSV: '2154010002', hoTen: 'Lê Thảo My', gioiTinh: 'Nữ', ngaySinh: '12/11/2003', lop: 'DH21EC01', maNganh: '7310101', nganh: 'Kinh tế học', namHoc: 3, gpaTL: 1.58, tcTichLuy: 52, tcNo: 18, level: 'HIGH_RISK', levelText: 'Nguy cơ cao', levelBadge: 'badge-danger', riskScore: 88, email: '2154010002my@ou.edu.vn', sdt: '0948445566' },

  // Sinh viên lớp DH21BA01 (Khoa QTKD)
  { maSV: '2152010001', hoTen: 'Trương Hoàng My', gioiTinh: 'Nữ', ngaySinh: '28/02/2003', lop: 'DH21BA01', maNganh: '7340101', nganh: 'Quản trị kinh doanh', namHoc: 3, gpaTL: 3.40, tcTichLuy: 85, tcNo: 0, level: 'NORMAL', levelText: 'Bình thường', levelBadge: 'badge-success', riskScore: 7, email: '2152010001my@ou.edu.vn', sdt: '0907890123' },
  { maSV: '2152010002', hoTen: 'Phan Tấn Lộc', gioiTinh: 'Nam', ngaySinh: '16/12/2003', lop: 'DH21BA01', maNganh: '7340101', nganh: 'Quản trị kinh doanh', namHoc: 3, gpaTL: 1.82, tcTichLuy: 58, tcNo: 15, level: 'EARLY_WARNING', levelText: 'Cảnh báo sớm', levelBadge: 'badge-warning', riskScore: 66, email: '2152010002loc@ou.edu.vn', sdt: '0908901234' }
];

// 6. BẢNG ĐIỂM CHI TIẾT THEO MÔN HỌC (MÃ MÔN - MÃ NGÀNH)
export const MOCK_COURSE_GRADES = {
  // Môn: Cơ sở dữ liệu (COSC2302) - Ngành CNTT (7480201)
  'COSC2302': [
    { maSV: '2151010001', hoTen: 'Nguyễn Văn An', lop: 'DH21IT01', diemQT: 7.5, diemThi: 6.0 },
    { maSV: '2151010002', hoTen: 'Phạm Thị Bích', lop: 'DH21IT01', diemQT: 8.5, diemThi: 8.0 },
    { maSV: '2151010003', hoTen: 'Lê Hoàng Long', lop: 'DH21IT01', diemQT: 5.0, diemThi: 5.0 },
    { maSV: '2151010004', hoTen: 'Hoàng Quốc Cường', lop: 'DH21IT01', diemQT: 7.0, diemThi: 6.5 },
    { maSV: '2151010005', hoTen: 'Trần Minh Tú', lop: 'DH21IT01', diemQT: 4.5, diemThi: 3.2 },
    { maSV: '2151010006', hoTen: 'Vũ Thị Duyên', lop: 'DH21IT01', diemQT: 6.0, diemThi: 6.0 },
    { maSV: '2151010007', hoTen: 'Đặng Hữu Đạt', lop: 'DH21IT01', diemQT: 9.5, diemThi: 9.0 },
    { maSV: '2151010008', hoTen: 'Bùi Gia Hân', lop: 'DH21IT01', diemQT: 5.0, diemThi: 3.5 },
    { maSV: '2151010009', hoTen: 'Đỗ Trọng Hiếu', lop: 'DH21IT01', diemQT: 8.0, diemThi: 7.0 },
    { maSV: '2151010010', hoTen: 'Lý Kim Hoa', lop: 'DH21IT01', diemQT: 3.5, diemThi: 2.5 }
  ],

  // Môn: Cấu trúc dữ liệu và giải thuật (COSC2301)
  'COSC2301': [
    { maSV: '2151010001', hoTen: 'Nguyễn Văn An', lop: 'DH21IT01', diemQT: 8.5, diemThi: 8.0 },
    { maSV: '2151010002', hoTen: 'Phạm Thị Bích', lop: 'DH21IT01', diemQT: 9.0, diemThi: 8.5 },
    { maSV: '2151010003', hoTen: 'Lê Hoàng Long', lop: 'DH21IT01', diemQT: 4.5, diemThi: 3.0 },
    { maSV: '2151010005', hoTen: 'Trần Minh Tú', lop: 'DH21IT01', diemQT: 3.5, diemThi: 3.0 },
    { maSV: '2151010007', hoTen: 'Đặng Hữu Đạt', lop: 'DH21IT01', diemQT: 9.5, diemThi: 9.5 }
  ],

  // Môn: Nguyên lý kế toán (ACCT1301) - Ngành Kế toán
  'ACCT1301': [
    { maSV: '2153010001', hoTen: 'Nguyễn Bích Phương', lop: 'DH21KT01', diemQT: 8.5, diemThi: 8.0 },
    { maSV: '2153010002', hoTen: 'Trần Văn Thái', lop: 'DH21KT01', diemQT: 5.0, diemThi: 4.0 }
  ],

  // Môn: Kinh tế vi mô 1 (ECON1301) - Ngành Kinh tế học
  'ECON1301': [
    { maSV: '2154010001', hoTen: 'Vũ Quốc Đạt', lop: 'DH21EC01', diemQT: 8.0, diemThi: 7.5 },
    { maSV: '2154010002', hoTen: 'Lê Thảo My', lop: 'DH21EC01', diemQT: 4.0, diemThi: 3.5 }
  ]
};

export const MOCK_CLASS_SUBJECT_SCORES = MOCK_COURSE_GRADES['COSC2302'];

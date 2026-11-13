/**
 * mockData.js inside src/engine/
 * Dữ liệu độc lập cho EduAlert v2.5 (Chuẩn Enterprise SIS & TT 08/2021)
 * 1. Khoa: Mã tự sinh OU+YYMMDD+XXX, Tên VN, Tên EN, Viết tắt, Audit Log
 * 2. Ngành: Mã tự sinh [Viết tắt]+YYMMXXX, Tên VN, Tên EN, Chuẩn TC (141), CTĐT liên ngành, Lớp, Audit Log
 * 3. Lớp học: Lớp trọng điểm DH22CS01C (45 sinh viên) - Ngành Khoa học máy tính, Khoa CNTT
 * 4. Sinh viên: 45 sinh viên lớp DH22CS01C phân 4 nhóm rủi ro học vụ
 * 5. Bảng điểm: Group by Môn -> Expand Lớp, mã tự sinh BD-[Lớp]-[Môn]
 */

import { OUGradeEngine } from './OUGradeEngine.js';

// 1. DANH SÁCH KHOA (Mã: OU + YYMMDD + XXX)
export const MOCK_FACULTIES = [
  {
    id: 'OU261104001',
    code: 'OU261104001',
    name: 'Khoa Công nghệ thông tin',
    nameEn: 'Faculty of Information Technology',
    shortCode: 'FIT',
    dean: 'TS. Lê Xuân Vĩnh',
    office: 'Phòng A201, Cơ sở 371 Nguyễn Kiệm, Gò Vấp',
    phone: '(028) 3930 0072',
    email: 'fit@ou.edu.vn',
    status: 'ACTIVE',
    createdBy: 'ThS. Lê Gia Hân',
    createdAt: '2026-11-04 08:00:00',
    auditLogs: [
      {
        id: 'LOG-F-001',
        timestamp: '2026-11-04 08:00:00',
        userId: 'ADMIN01',
        userName: 'ThS. Lê Gia Hân',
        action: 'CREATE',
        field: 'Toàn bộ',
        oldValue: '-',
        newValue: 'Khởi tạo khoa mới: Khoa Công nghệ thông tin (FIT)'
      }
    ]
  },
  {
    id: 'OU261104002',
    code: 'OU261104002',
    name: 'Khoa Kinh tế',
    nameEn: 'Faculty of Economics',
    shortCode: 'FECO',
    dean: 'PGS.TS. Nguyễn Văn Hùng',
    office: 'Phòng B102, Cơ sở 97 Võ Văn Tần, Q.3',
    phone: '(028) 3930 0073',
    email: 'feco@ou.edu.vn',
    status: 'ACTIVE',
    createdBy: 'ThS. Lê Gia Hân',
    createdAt: '2026-11-04 08:15:00',
    auditLogs: [
      {
        id: 'LOG-F-002',
        timestamp: '2026-11-04 08:15:00',
        userId: 'ADMIN01',
        userName: 'ThS. Lê Gia Hân',
        action: 'CREATE',
        field: 'Toàn bộ',
        oldValue: '-',
        newValue: 'Khởi tạo khoa mới: Khoa Kinh tế (FECO)'
      }
    ]
  },
  {
    id: 'OU261104003',
    code: 'OU261104003',
    name: 'Khoa Kế toán - Kiểm toán',
    nameEn: 'Faculty of Accounting and Auditing',
    shortCode: 'FAAF',
    dean: 'TS. Phan Thị Thùy',
    office: 'Phòng C301, Cơ sở 97 Võ Văn Tần, Q.3',
    phone: '(028) 3930 0074',
    email: 'faaf@ou.edu.vn',
    status: 'ACTIVE',
    createdBy: 'ThS. Lê Gia Hân',
    createdAt: '2026-11-04 08:20:00',
    auditLogs: [
      {
        id: 'LOG-F-003',
        timestamp: '2026-11-04 08:20:00',
        userId: 'ADMIN01',
        userName: 'ThS. Lê Gia Hân',
        action: 'CREATE',
        field: 'Toàn bộ',
        oldValue: '-',
        newValue: 'Khởi tạo khoa: Khoa Kế toán - Kiểm toán (FAAF)'
      }
    ]
  },
  {
    id: 'OU261104004',
    code: 'OU261104004',
    name: 'Khoa Quản trị kinh doanh',
    nameEn: 'Faculty of Business Administration',
    shortCode: 'FBA',
    dean: 'PGS.TS. Trần Thị Lan',
    office: 'Phòng B205, Cơ sở 97 Võ Văn Tần, Q.3',
    phone: '(028) 3930 0075',
    email: 'fba@ou.edu.vn',
    status: 'ACTIVE',
    createdBy: 'ThS. Lê Gia Hân',
    createdAt: '2026-11-04 08:30:00',
    auditLogs: [
      {
        id: 'LOG-F-004',
        timestamp: '2026-11-04 08:30:00',
        userId: 'ADMIN01',
        userName: 'ThS. Lê Gia Hân',
        action: 'CREATE',
        field: 'Toàn bộ',
        oldValue: '-',
        newValue: 'Khởi tạo khoa: Khoa Quản trị kinh doanh (FBA)'
      }
    ]
  },
  {
    id: 'OU261104005',
    code: 'OU261104005',
    name: 'Khoa Ngoại ngữ',
    nameEn: 'Faculty of Foreign Languages',
    shortCode: 'FFL',
    dean: 'TS. Hoàng Minh Đạo',
    office: 'Phòng D101, Cơ sở 35-37 Hồ Hảo Hớn, Q.1',
    phone: '(028) 3930 0076',
    email: 'ffl@ou.edu.vn',
    status: 'ACTIVE',
    createdBy: 'ThS. Lê Gia Hân',
    createdAt: '2026-11-04 08:45:00',
    auditLogs: [
      {
        id: 'LOG-F-005',
        timestamp: '2026-11-04 08:45:00',
        userId: 'ADMIN01',
        userName: 'ThS. Lê Gia Hân',
        action: 'CREATE',
        field: 'Toàn bộ',
        oldValue: '-',
        newValue: 'Khởi tạo khoa: Khoa Ngoại ngữ (FFL)'
      }
    ]
  },
  {
    id: 'OU261104006',
    code: 'OU261104006',
    name: 'Khoa Công nghệ sinh học (Dự bị)',
    nameEn: 'Faculty of Biotechnology (Standby)',
    shortCode: 'FBT',
    dean: 'Chưa bổ nhiệm',
    office: 'Phòng E102, Cơ sở 371 Nguyễn Kiệm',
    phone: '(028) 3930 0088',
    email: 'biotech@ou.edu.vn',
    status: 'INACTIVE',
    createdBy: 'ThS. Lê Gia Hân',
    createdAt: '2026-11-04 09:00:00',
    auditLogs: [
      {
        id: 'LOG-F-006',
        timestamp: '2026-11-04 09:00:00',
        userId: 'ADMIN01',
        userName: 'ThS. Lê Gia Hân',
        action: 'CREATE',
        field: 'Toàn bộ',
        oldValue: '-',
        newValue: 'Khởi tạo khoa dự bị chưa có ngành'
      }
    ]
  }
];

// KHO MÔN HỌC TOÀN TRƯỜNG (Dùng để thêm vào CTĐT các ngành, kể cả môn liên ngành)
export const GLOBAL_COURSE_POOL = [
  // Khoa CNTT
  { maMon: 'COSC1301', tenMon: 'Nhập môn lập trình', soTC: 3, maKhoa: 'FIT', nhom: 'Cơ sở ngành', pFailHistory: 0.18 },
  { maMon: 'MATH1301', tenMon: 'Đại số tuyến tính', soTC: 3, maKhoa: 'FIT', nhom: 'Đại cương', pFailHistory: 0.22 },
  { maMon: 'MATH1302', tenMon: 'Giải tích 1', soTC: 3, maKhoa: 'FIT', nhom: 'Đại cương', pFailHistory: 0.25 },
  { maMon: 'MATH1304', tenMon: 'Giải tích 2', soTC: 3, maKhoa: 'FIT', nhom: 'Đại cương', pFailHistory: 0.30 },
  { maMon: 'COSC1302', tenMon: 'Kỹ thuật lập trình', soTC: 3, maKhoa: 'FIT', nhom: 'Cơ sở ngành', pFailHistory: 0.25 },
  { maMon: 'MATH1303', tenMon: 'Toán rời rạc', soTC: 3, maKhoa: 'FIT', nhom: 'Cơ sở ngành', pFailHistory: 0.24 },
  { maMon: 'COSC1303', tenMon: 'Kiến trúc máy tính', soTC: 3, maKhoa: 'FIT', nhom: 'Cơ sở ngành', pFailHistory: 0.15 },
  { maMon: 'COSC2301', tenMon: 'Cấu trúc dữ liệu và giải thuật', soTC: 3, maKhoa: 'FIT', nhom: 'Cơ sở ngành', pFailHistory: 0.28 },
  { maMon: 'COSC2302', tenMon: 'Cơ sở dữ liệu', soTC: 3, maKhoa: 'FIT', nhom: 'Cơ sở ngành', pFailHistory: 0.20 },
  { maMon: 'COSC2303', tenMon: 'Lập trình hướng đối tượng', soTC: 3, maKhoa: 'FIT', nhom: 'Cơ sở ngành', pFailHistory: 0.16 },
  { maMon: 'COSC2304', tenMon: 'Hệ quản trị cơ sở dữ liệu', soTC: 3, maKhoa: 'FIT', nhom: 'Chuyên ngành', pFailHistory: 0.22 },
  { maMon: 'COSC2305', tenMon: 'Hệ điều hành', soTC: 3, maKhoa: 'FIT', nhom: 'Cơ sở ngành', pFailHistory: 0.19 },
  { maMon: 'COSC2306', tenMon: 'Mạng máy tính', soTC: 3, maKhoa: 'FIT', nhom: 'Cơ sở ngành', pFailHistory: 0.17 },
  { maMon: 'COSC2307', tenMon: 'Công nghệ phần mềm', soTC: 3, maKhoa: 'FIT', nhom: 'Chuyên ngành', pFailHistory: 0.15 },
  { maMon: 'COSC3301', tenMon: 'Lập trình Web hiện đại', soTC: 3, maKhoa: 'FIT', nhom: 'Chuyên ngành', pFailHistory: 0.18 },
  { maMon: 'COSC3302', tenMon: 'Trí tuệ nhân tạo (AI)', soTC: 3, maKhoa: 'FIT', nhom: 'Chuyên ngành', pFailHistory: 0.25 },
  { maMon: 'COSC3304', tenMon: 'An toàn và bảo mật hệ thống', soTC: 3, maKhoa: 'FIT', nhom: 'Chuyên ngành', pFailHistory: 0.20 },
  
  // Khoa Ngoại ngữ & Đại cương
  { maMon: 'ENGL1301', tenMon: 'Tiếng Anh 1 (General English)', soTC: 3, maKhoa: 'FFL', nhom: 'Đại cương', pFailHistory: 0.12 },
  { maMon: 'ENGL1302', tenMon: 'Tiếng Anh 2 (Academic English)', soTC: 3, maKhoa: 'FFL', nhom: 'Đại cương', pFailHistory: 0.14 },
  { maMon: 'POLI1301', tenMon: 'Triết học Mác - Lênin', soTC: 3, maKhoa: 'FIT', nhom: 'Đại cương', pFailHistory: 0.10 },
  { maMon: 'POLI1202', tenMon: 'Kinh tế chính trị Mác - Lênin', soTC: 2, maKhoa: 'FIT', nhom: 'Đại cương', pFailHistory: 0.08 },
  
  // Khoa Kinh tế & FAAF (Môn liên ngành)
  { maMon: 'ECON1301', tenMon: 'Kinh tế vi mô', soTC: 3, maKhoa: 'FECO', nhom: 'Đại cương/Liên ngành', pFailHistory: 0.18 },
  { maMon: 'ACCT1301', tenMon: 'Nguyên lý kế toán doanh nghiệp', soTC: 3, maKhoa: 'FAAF', nhom: 'Liên ngành', pFailHistory: 0.15 },
  { maMon: 'MGMT1301', tenMon: 'Quản trị học đại cương', soTC: 3, maKhoa: 'FBA', nhom: 'Liên ngành', pFailHistory: 0.10 }
];

// 2. DANH SÁCH NGÀNH (Mã: [Viết tắt Khoa] + YYMM + XXX)
export const MOCK_MAJORS = [
  // Khoa CNTT (FIT)
  {
    id: 'FIT2200001',
    code: 'FIT2200001',
    name: 'Khoa học máy tính',
    nameEn: 'Computer Science',
    facultyCode: 'FIT',
    facultyId: 'OU261104001',
    facultyName: 'Khoa Công nghệ thông tin',
    creditsStandard: 141,
    degreeLevel: 'Kỹ sư / Cử nhân Chính quy',
    description: 'Chuyên sâu thuật toán, cấu trúc dữ liệu, trí tuệ nhân tạo, khoa học dữ liệu và kiến trúc hệ thống phân tán.',
    status: 'ACTIVE',
    createdBy: 'ThS. Nguyễn Hoàng Nam',
    createdAt: '2022-06-15 09:00:00',
    auditLogs: [
      {
        id: 'LOG-M-001',
        timestamp: '2022-06-15 09:00:00',
        userId: 'AD01',
        userName: 'ThS. Nguyễn Hoàng Nam',
        action: 'CREATE',
        field: 'Toàn bộ',
        oldValue: '-',
        newValue: 'Tạo ngành Khoa học máy tính (FIT2200001)'
      }
    ]
  },
  {
    id: 'FIT2200002',
    code: 'FIT2200002',
    name: 'Công nghệ thông tin',
    nameEn: 'Information Technology',
    facultyCode: 'FIT',
    facultyId: 'OU261104001',
    facultyName: 'Khoa Công nghệ thông tin',
    creditsStandard: 141,
    degreeLevel: 'Kỹ sư Chính quy',
    description: 'Đào tạo kỹ sư CNTT phát triển phần mềm, an toàn thông tin và hệ thống mạng doanh nghiệp.',
    status: 'ACTIVE',
    createdBy: 'ThS. Lê Gia Hân',
    createdAt: '2022-06-15 09:30:00',
    auditLogs: []
  },
  {
    id: 'FIT2200003',
    code: 'FIT2200003',
    name: 'Kỹ thuật phần mềm',
    nameEn: 'Software Engineering',
    facultyCode: 'FIT',
    facultyId: 'OU261104001',
    facultyName: 'Khoa Công nghệ thông tin',
    creditsStandard: 140,
    degreeLevel: 'Kỹ sư Chính quy',
    description: 'Đào tạo kiến trúc phần mềm, kiểm thử tự động, DevOps và quản trị dự án phần mềm theo Agile.',
    status: 'ACTIVE',
    createdBy: 'ThS. Lê Gia Hân',
    createdAt: '2022-06-15 10:00:00',
    auditLogs: []
  },
  // Khoa Kinh tế (FECO)
  {
    id: 'FECO2200001',
    code: 'FECO2200001',
    name: 'Kinh tế học',
    nameEn: 'Economics',
    facultyCode: 'FECO',
    facultyId: 'OU261104002',
    facultyName: 'Khoa Kinh tế',
    creditsStandard: 135,
    degreeLevel: 'Cử nhân',
    description: 'Kinh tế lượng, phân tích chính sách vĩ mô và tài chính công.',
    status: 'ACTIVE',
    createdBy: 'ThS. Lê Gia Hân',
    createdAt: '2022-06-20 10:00:00',
    auditLogs: []
  },
  // Khoa Kế toán (FAAF)
  {
    id: 'FAAF2200001',
    code: 'FAAF2200001',
    name: 'Kế toán doanh nghiệp',
    nameEn: 'Corporate Accounting',
    facultyCode: 'FAAF',
    facultyId: 'OU261104003',
    facultyName: 'Khoa Kế toán - Kiểm toán',
    creditsStandard: 138,
    degreeLevel: 'Cử nhân',
    description: 'Chuẩn mực kế toán quốc tế IFRS, báo cáo tài chính và kiểm soát thuế.',
    status: 'ACTIVE',
    createdBy: 'ThS. Lê Gia Hân',
    createdAt: '2022-06-20 11:00:00',
    auditLogs: []
  },
  // Khoa Quản trị kinh doanh (FBA)
  {
    id: 'FBA2200001',
    code: 'FBA2200001',
    name: 'Quản trị kinh doanh',
    nameEn: 'Business Administration',
    facultyCode: 'FBA',
    facultyId: 'OU261104004',
    facultyName: 'Khoa Quản trị kinh doanh',
    creditsStandard: 135,
    degreeLevel: 'Cử nhân',
    description: 'Đào tạo kỹ năng quản trị chiến lược, marketing số, nhân sự và chuỗi cung ứng hiện đại.',
    status: 'ACTIVE',
    createdBy: 'ThS. Lê Gia Hân',
    createdAt: '2022-06-22 09:00:00',
    auditLogs: []
  },
  // Khoa Ngoại ngữ (FFL)
  {
    id: 'FFL2200001',
    code: 'FFL2200001',
    name: 'Ngôn ngữ Anh',
    nameEn: 'English Studies',
    facultyCode: 'FFL',
    facultyId: 'OU261104005',
    facultyName: 'Khoa Ngoại ngữ',
    creditsStandard: 135,
    degreeLevel: 'Cử nhân',
    description: 'Biên phiên dịch, tiếng Anh thương mại và phương pháp giảng dạy hiện đại.',
    status: 'ACTIVE',
    createdBy: 'ThS. Lê Gia Hân',
    createdAt: '2022-06-22 09:30:00',
    auditLogs: []
  }
];

// 3. KHUNG CHƯƠNG TRÌNH ĐÀO TẠO (CTĐT) THEO NGÀNH (Hỗ trợ nạp môn liên ngành)
export const MOCK_MAJOR_CURRICULUM = {
  // Ngành Khoa học máy tính (FIT2200001) - 4 năm (8 học kỳ)
  'FIT2200001': [
    // HỌC KỲ 1 (NĂM 1)
    { maMon: 'COSC1301', tenMon: 'Nhập môn lập trình', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'MATH1301', tenMon: 'Đại số tuyến tính', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'MATH1302', tenMon: 'Giải tích 1', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'ENGL1301', tenMon: 'Tiếng Anh 1', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, maKhoa: 'FFL' },
    { maMon: 'POLI1301', tenMon: 'Triết học Mác - Lênin', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, maKhoa: 'FIT' },
    
    // HỌC KỲ 2 (NĂM 1)
    { maMon: 'COSC1302', tenMon: 'Kỹ thuật lập trình', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: 'COSC1301', hkDuKien: 2, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'MATH1303', tenMon: 'Toán rời rạc', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 2, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'MATH1304', tenMon: 'Giải tích 2', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: 'MATH1302', hkDuKien: 2, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC1303', tenMon: 'Kiến trúc máy tính', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 2, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'ENGL1302', tenMon: 'Tiếng Anh 2', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: 'ENGL1301', hkDuKien: 2, isTichLuy: true, maKhoa: 'FFL' },

    // HỌC KỲ 3 (NĂM 2)
    { maMon: 'COSC2301', tenMon: 'Cấu trúc dữ liệu và giải thuật', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: 'COSC1302', hkDuKien: 3, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC2302', tenMon: 'Cơ sở dữ liệu', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 3, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC2303', tenMon: 'Lập trình hướng đối tượng', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: 'COSC1302', hkDuKien: 3, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'POLI1202', tenMon: 'Kinh tế chính trị Mác - Lênin', soTC: 2, nhom: 'Đại cương', batBuoc: true, tienQuyet: 'POLI1301', hkDuKien: 3, isTichLuy: true, maKhoa: 'FIT' },

    // HỌC KỲ 4 (NĂM 2)
    { maMon: 'COSC2304', tenMon: 'Hệ quản trị cơ sở dữ liệu', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2302', hkDuKien: 4, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC2305', tenMon: 'Hệ điều hành', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: 'COSC1303', hkDuKien: 4, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC2306', tenMon: 'Mạng máy tính', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 4, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC2307', tenMon: 'Công nghệ phần mềm', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2303', hkDuKien: 4, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'ACCT1301', tenMon: 'Nguyên lý kế toán doanh nghiệp', soTC: 3, nhom: 'Tự chọn liên ngành', batBuoc: false, tienQuyet: '', hkDuKien: 4, isTichLuy: true, maKhoa: 'FAAF' },

    // HỌC KỲ 5 (NĂM 3)
    { maMon: 'COSC3301', tenMon: 'Lập trình Web hiện đại', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2302', hkDuKien: 5, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC3302', tenMon: 'Trí tuệ nhân tạo (AI)', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2301', hkDuKien: 5, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC3304', tenMon: 'An toàn và bảo mật hệ thống', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2306', hkDuKien: 5, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'ECON1301', tenMon: 'Kinh tế vi mô', soTC: 3, nhom: 'Tự chọn liên ngành', batBuoc: false, tienQuyet: '', hkDuKien: 5, isTichLuy: true, maKhoa: 'FECO' },

    // HỌC KỲ 6 (NĂM 3)
    { maMon: 'COSC3305', tenMon: 'Học máy và ứng dụng (Machine Learning)', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC3302', hkDuKien: 6, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC3306', tenMon: 'Lập trình thiết bị di động', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2303', hkDuKien: 6, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'MGMT1301', tenMon: 'Quản trị học đại cương', soTC: 3, nhom: 'Tự chọn liên ngành', batBuoc: false, tienQuyet: '', hkDuKien: 6, isTichLuy: true, maKhoa: 'FBA' },

    // HỌC KỲ 7 (NĂM 4)
    { maMon: 'COSC4301', tenMon: 'Điện toán đám mây & DevOps', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2305', hkDuKien: 7, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC4302', tenMon: 'Phân tích dữ liệu lớn (Big Data)', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2304', hkDuKien: 7, isTichLuy: true, maKhoa: 'FIT' },

    // HỌC KỲ 8 (NĂM 4 - TỐT NGHIỆP)
    { maMon: 'COSC4401', tenMon: 'Thực tập doanh nghiệp tốt nghiệp', soTC: 4, nhom: 'Tốt nghiệp', batBuoc: true, tienQuyet: '', hkDuKien: 8, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC4601', tenMon: 'Khóa luận tốt nghiệp cử nhân', soTC: 6, nhom: 'Tốt nghiệp', batBuoc: true, tienQuyet: '', hkDuKien: 8, isTichLuy: true, maKhoa: 'FIT' }
  ],

  // Ngành Công nghệ thông tin (FIT2200002) - 4 năm (8 học kỳ)
  'FIT2200002': [
    { maMon: 'COSC1301', tenMon: 'Nhập môn lập trình', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'MATH1301', tenMon: 'Đại số tuyến tính', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'ENGL1301', tenMon: 'Tiếng Anh 1', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, maKhoa: 'FFL' },
    { maMon: 'POLI1301', tenMon: 'Triết học Mác - Lênin', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, maKhoa: 'FIT' },

    { maMon: 'COSC1302', tenMon: 'Kỹ thuật lập trình', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: 'COSC1301', hkDuKien: 2, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC1303', tenMon: 'Kiến trúc máy tính', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 2, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'MATH1303', tenMon: 'Toán rời rạc', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 2, isTichLuy: true, maKhoa: 'FIT' },

    { maMon: 'COSC2301', tenMon: 'Cấu trúc dữ liệu và giải thuật', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: 'COSC1302', hkDuKien: 3, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC2302', tenMon: 'Cơ sở dữ liệu', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 3, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC2306', tenMon: 'Mạng máy tính', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 3, isTichLuy: true, maKhoa: 'FIT' },

    { maMon: 'COSC2304', tenMon: 'Hệ quản trị cơ sở dữ liệu', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2302', hkDuKien: 4, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC2305', tenMon: 'Hệ điều hành', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: 'COSC1303', hkDuKien: 4, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC2307', tenMon: 'Công nghệ phần mềm', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2301', hkDuKien: 4, isTichLuy: true, maKhoa: 'FIT' },

    { maMon: 'COSC3301', tenMon: 'Lập trình Web hiện đại', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2302', hkDuKien: 5, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC3304', tenMon: 'An toàn và bảo mật hệ thống', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2306', hkDuKien: 5, isTichLuy: true, maKhoa: 'FIT' },

    { maMon: 'COSC3306', tenMon: 'Lập trình thiết bị di động', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2301', hkDuKien: 6, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC4301', tenMon: 'Điện toán đám mây & DevOps', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2305', hkDuKien: 7, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC4401', tenMon: 'Thực tập doanh nghiệp tốt nghiệp', soTC: 4, nhom: 'Tốt nghiệp', batBuoc: true, tienQuyet: '', hkDuKien: 8, isTichLuy: true, maKhoa: 'FIT' }
  ],

  // Ngành Kỹ thuật phần mềm (FIT2200003) - 4 năm (8 học kỳ)
  'FIT2200003': [
    { maMon: 'COSC1301', tenMon: 'Nhập môn lập trình', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'MATH1301', tenMon: 'Đại số tuyến tính', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC1302', tenMon: 'Kỹ thuật lập trình', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: 'COSC1301', hkDuKien: 2, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC2301', tenMon: 'Cấu trúc dữ liệu và giải thuật', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: 'COSC1302', hkDuKien: 3, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC2303', tenMon: 'Lập trình hướng đối tượng', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: 'COSC1302', hkDuKien: 3, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC2307', tenMon: 'Công nghệ phần mềm', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2303', hkDuKien: 4, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC3301', tenMon: 'Lập trình Web hiện đại', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2302', hkDuKien: 5, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC3306', tenMon: 'Lập trình thiết bị di động', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2303', hkDuKien: 6, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC4301', tenMon: 'Điện toán đám mây & DevOps', soTC: 3, nhom: 'Chuyên ngành', batBuoc: true, tienQuyet: 'COSC2305', hkDuKien: 7, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC4601', tenMon: 'Đồ án tốt nghiệp phần mềm', soTC: 6, nhom: 'Tốt nghiệp', batBuoc: true, tienQuyet: '', hkDuKien: 8, isTichLuy: true, maKhoa: 'FIT' }
  ],

  // Ngành Kinh tế học (FECO2200001) - 4 năm (8 học kỳ)
  'FECO2200001': [
    { maMon: 'ECON1301', tenMon: 'Kinh tế vi mô', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, maKhoa: 'FECO' },
    { maMon: 'MATH1301', tenMon: 'Toán cao cấp cho kinh tế', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, maKhoa: 'FECO' },
    { maMon: 'ENGL1301', tenMon: 'Tiếng Anh thương mại 1', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: '', hkDuKien: 2, isTichLuy: true, maKhoa: 'FFL' },
    { maMon: 'ACCT1301', tenMon: 'Nguyên lý kế toán doanh nghiệp', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 3, isTichLuy: true, maKhoa: 'FAAF' },
    { maMon: 'MGMT1301', tenMon: 'Quản trị học đại cương', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 4, isTichLuy: true, maKhoa: 'FBA' },
    { maMon: 'COSC1301', tenMon: 'Tin học ứng dụng trong kinh tế', soTC: 3, nhom: 'Tự chọn liên ngành', batBuoc: false, tienQuyet: '', hkDuKien: 5, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC4401', tenMon: 'Thực tập tốt nghiệp kinh tế', soTC: 4, nhom: 'Tốt nghiệp', batBuoc: true, tienQuyet: '', hkDuKien: 8, isTichLuy: true, maKhoa: 'FECO' }
  ],

  // Ngành Kế toán doanh nghiệp (FAAF2200001) - 4 năm (8 học kỳ)
  'FAAF2200001': [
    { maMon: 'ACCT1301', tenMon: 'Nguyên lý kế toán doanh nghiệp', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, maKhoa: 'FAAF' },
    { maMon: 'ECON1301', tenMon: 'Kinh tế vi mô', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: '', hkDuKien: 2, isTichLuy: true, maKhoa: 'FECO' },
    { maMon: 'MGMT1301', tenMon: 'Quản trị học đại cương', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 3, isTichLuy: true, maKhoa: 'FBA' },
    { maMon: 'COSC1301', tenMon: 'Hệ thống thông tin kế toán', soTC: 3, nhom: 'Tự chọn liên ngành', batBuoc: false, tienQuyet: '', hkDuKien: 4, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC4401', tenMon: 'Thực tập tốt nghiệp kế toán', soTC: 4, nhom: 'Tốt nghiệp', batBuoc: true, tienQuyet: '', hkDuKien: 8, isTichLuy: true, maKhoa: 'FAAF' }
  ],

  // Ngành Quản trị kinh doanh (FBA2200001) - 4 năm (8 học kỳ)
  'FBA2200001': [
    { maMon: 'MGMT1301', tenMon: 'Quản trị học đại cương', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, maKhoa: 'FBA' },
    { maMon: 'ECON1301', tenMon: 'Kinh tế vi mô', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, maKhoa: 'FECO' },
    { maMon: 'ENGL1301', tenMon: 'Tiếng Anh thương mại 1', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: '', hkDuKien: 2, isTichLuy: true, maKhoa: 'FFL' },
    { maMon: 'ACCT1301', tenMon: 'Nguyên lý kế toán doanh nghiệp', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 2, isTichLuy: true, maKhoa: 'FAAF' },
    { maMon: 'COSC1301', tenMon: 'Chuyển đổi số trong doanh nghiệp', soTC: 3, nhom: 'Tự chọn liên ngành', batBuoc: false, tienQuyet: '', hkDuKien: 3, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC4401', tenMon: 'Thực tập tốt nghiệp quản trị', soTC: 4, nhom: 'Tốt nghiệp', batBuoc: true, tienQuyet: '', hkDuKien: 8, isTichLuy: true, maKhoa: 'FBA' }
  ],

  // Ngành Ngôn ngữ Anh (FFL2200001) - 4 năm (8 học kỳ)
  'FFL2200001': [
    { maMon: 'ENGL1301', tenMon: 'Kỹ năng Nghe - Nói tiếng Anh 1', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, maKhoa: 'FFL' },
    { maMon: 'ENGL1302', tenMon: 'Kỹ năng Đọc - Viết tiếng Anh 1', soTC: 3, nhom: 'Cơ sở ngành', batBuoc: true, tienQuyet: '', hkDuKien: 1, isTichLuy: true, maKhoa: 'FFL' },
    { maMon: 'POLI1301', tenMon: 'Triết học Mác - Lênin', soTC: 3, nhom: 'Đại cương', batBuoc: true, tienQuyet: '', hkDuKien: 2, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'MGMT1301', tenMon: 'Giao tiếp kinh doanh quốc tế', soTC: 3, nhom: 'Tự chọn liên ngành', batBuoc: false, tienQuyet: '', hkDuKien: 3, isTichLuy: true, maKhoa: 'FBA' },
    { maMon: 'COSC1301', tenMon: 'Tin học ứng dụng văn phòng', soTC: 3, nhom: 'Tự chọn liên ngành', batBuoc: false, tienQuyet: '', hkDuKien: 4, isTichLuy: true, maKhoa: 'FIT' },
    { maMon: 'COSC4401', tenMon: 'Thực tập biên phiên dịch', soTC: 4, nhom: 'Tốt nghiệp', batBuoc: true, tienQuyet: '', hkDuKien: 8, isTichLuy: true, maKhoa: 'FFL' }
  ]
};

// 4. DANH SÁCH LỚP HỌC (ĐẦY ĐỦ CÁC NGÀNH)
export const MOCK_CLASSES = [
  {
    id: 'DH22CS01C',
    maLop: 'DH22CS01C',
    tenLop: 'ĐH Khoa học máy tính Khóa 2022 - Lớp 01C',
    maNganh: 'FIT2200001',
    nganh: 'Khoa học máy tính',
    khoaHoc: '2022 - 2026',
    namHocThu: 2,
    siSo: 45,
    cvht: 'ThS. Nguyễn Hoàng Nam',
    emailCVHT: 'nam.nh@ou.edu.vn',
    phongHoc: 'A302 - Cơ sở 371 Nguyễn Kiệm',
    ghiChu: 'Lớp trọng điểm rà soát nguy cơ học vụ năm thứ 2'
  },
  {
    id: 'DH22CS02C',
    maLop: 'DH22CS02C',
    tenLop: 'ĐH Khoa học máy tính Khóa 2022 - Lớp 02C',
    maNganh: 'FIT2200001',
    nganh: 'Khoa học máy tính',
    khoaHoc: '2022 - 2026',
    namHocThu: 2,
    siSo: 15,
    cvht: 'TS. Trần Thị Bích',
    emailCVHT: 'bich.tt@ou.edu.vn',
    phongHoc: 'A304 - Cơ sở 371 Nguyễn Kiệm',
    ghiChu: 'Lớp chuẩn'
  },
  {
    id: 'DH22IT01',
    maLop: 'DH22IT01',
    tenLop: 'ĐH Công nghệ thông tin Khóa 2022 - Lớp 01',
    maNganh: 'FIT2200002',
    nganh: 'Công nghệ thông tin',
    khoaHoc: '2022 - 2026',
    namHocThu: 2,
    siSo: 15,
    cvht: 'ThS. Lê Văn Dũng',
    emailCVHT: 'dung.lv@ou.edu.vn',
    phongHoc: 'B201 - Cơ sở 371 Nguyễn Kiệm',
    ghiChu: 'Lớp CNTT định hướng kỹ thuật phần mềm & mạng'
  },
  {
    id: 'DH22SE01',
    maLop: 'DH22SE01',
    tenLop: 'ĐH Kỹ thuật phần mềm Khóa 2022 - Lớp 01',
    maNganh: 'FIT2200003',
    nganh: 'Kỹ thuật phần mềm',
    khoaHoc: '2022 - 2026',
    namHocThu: 2,
    siSo: 15,
    cvht: 'TS. Phạm Minh Tuấn',
    emailCVHT: 'tuan.pm@ou.edu.vn',
    phongHoc: 'A401 - Cơ sở 371 Nguyễn Kiệm',
    ghiChu: 'Lớp kỹ sư phát triển ứng dụng'
  },
  {
    id: 'DH22EC01',
    maLop: 'DH22EC01',
    tenLop: 'ĐH Kinh tế học Khóa 2022 - Lớp 01',
    maNganh: 'FECO2200001',
    nganh: 'Kinh tế học',
    khoaHoc: '2022 - 2026',
    namHocThu: 2,
    siSo: 15,
    cvht: 'PGS.TS. Nguyễn Văn Hùng',
    emailCVHT: 'hung.nv@ou.edu.vn',
    phongHoc: 'B102 - Cơ sở 97 Võ Văn Tần',
    ghiChu: 'Lớp cử nhân kinh tế vĩ mô'
  },
  {
    id: 'DH22AC01',
    maLop: 'DH22AC01',
    tenLop: 'ĐH Kế toán doanh nghiệp Khóa 2022 - Lớp 01',
    maNganh: 'FAAF2200001',
    nganh: 'Kế toán doanh nghiệp',
    khoaHoc: '2022 - 2026',
    namHocThu: 2,
    siSo: 15,
    cvht: 'TS. Phan Thị Thùy',
    emailCVHT: 'thuy.pt@ou.edu.vn',
    phongHoc: 'C301 - Cơ sở 97 Võ Văn Tần',
    ghiChu: 'Lớp chuẩn kế toán IFRS'
  },
  {
    id: 'DH22BA01',
    maLop: 'DH22BA01',
    tenLop: 'ĐH Quản trị kinh doanh Khóa 2022 - Lớp 01',
    maNganh: 'FBA2200001',
    nganh: 'Quản trị kinh doanh',
    khoaHoc: '2022 - 2026',
    namHocThu: 2,
    siSo: 15,
    cvht: 'PGS.TS. Trần Thị Lan',
    emailCVHT: 'lan.tt@ou.edu.vn',
    phongHoc: 'B205 - Cơ sở 97 Võ Văn Tần',
    ghiChu: 'Lớp quản trị doanh nghiệp và chuỗi cung ứng'
  },
  {
    id: 'DH22EN01',
    maLop: 'DH22EN01',
    tenLop: 'ĐH Ngôn ngữ Anh Khóa 2022 - Lớp 01',
    maNganh: 'FFL2200001',
    nganh: 'Ngôn ngữ Anh',
    khoaHoc: '2022 - 2026',
    namHocThu: 2,
    siSo: 15,
    cvht: 'ThS. Hoàng Thị Mai',
    emailCVHT: 'mai.ht@ou.edu.vn',
    phongHoc: 'D201 - Cơ sở 371 Nguyễn Kiệm',
    ghiChu: 'Lớp cử nhân Anh ngữ thương mại'
  }
];

// Helper sinh 45 sinh viên cho lớp DH22CS01C với 4 nhóm rõ rệt
// Lịch sử 3 học kỳ (HK1, HK2 năm 2022-2023; HK3 năm 2023-2024), HK3 là kỳ vừa qua dùng để chấm Rule 1 & Rule 3.
// Ràng buộc để số liệu khớp nhau:
//  - Σ tcDK = tcTichLuy + tcNo và Σ tcKD = tcNo (chưa học lại môn nào)
//  - HK3 lấy đúng gpaHK / gpaTL của sinh viên
//  - GPA HK1 = gpaTL + 0.25, GPA HK2 suy ra để GPA tích lũy cuối kỳ khớp gpaTL (môn F tính 0 điểm, có cộng tín chỉ)
//  - flat = true: GPA mọi kỳ bằng nhau (dùng cho nhóm an toàn)
const SEMESTER_LABELS = ['HK1 (2022-2023)', 'HK2 (2022-2023)', 'HK3 (2023-2024)'];
const round2 = (n) => Math.round(n * 100) / 100;

const buildHistory = ({ dk, kd, gpaHK, gpaTL, flat = false }) => {
  const totalCredits = dk[0] + dk[1] + dk[2];
  let gpaBySem;
  if (flat) {
    gpaBySem = [gpaHK, gpaHK, gpaHK];
  } else {
    const gpa1 = Math.min(4, round2(gpaTL + 0.25));
    const points2 = gpaTL * totalCredits - gpa1 * dk[0] - gpaHK * dk[2];
    gpaBySem = [gpa1, Math.max(0, Math.min(4, round2(points2 / dk[1]))), gpaHK];
  }

  let points = 0;
  let credits = 0;
  return dk.map((tc, i) => {
    points += gpaBySem[i] * tc;
    credits += tc;
    return {
      hk: SEMESTER_LABELS[i],
      tcDK: tc,
      tcKD: kd[i],
      gpaHK: gpaBySem[i],
      gpaTL: i === dk.length - 1 ? gpaTL : round2(points / credits)
    };
  });
};

const generateDH22CS01CStudents = () => {
  const students = [];

  // NHÓM 1: NGUY CƠ BUỘC THÔI HỌC (3 SINH VIÊN - ĐỎ ĐẬM)
  students.push({
    maSV: '2251050001',
    hoTen: 'Nguyễn Văn An',
    gioiTinh: 'Nam',
    ngaySinh: '14/03/2004',
    lop: 'DH22CS01C',
    maNganh: 'FIT2200001',
    nganh: 'Khoa học máy tính',
    namHoc: 2,
    gpaTL: 1.15,
    gpaHK: 0.82,
    tcTichLuy: 28,
    tcNo: 26,
    riskScore: 96,
    hadPrevWarning: true,
    warningCount: 2,
    drl: 45,
    email: '2251050001an@ou.edu.vn',
    sdt: '0903111222',
    notes: 'Bị CBHV 2 kỳ liên tiếp. Nợ 26 TC chuỗi tiên quyết. Cần can thiệp khẩn cấp!',
    // HK2 rớt 12/22 TC (54.5% > 50%) -> CBHV lần 1; HK3 GPA HK 0.82 < 1.0 -> CBHV lần 2
    historySemesters: buildHistory({ dk: [18, 22, 14], kd: [8, 12, 6], gpaHK: 0.82, gpaTL: 1.15 }),
    counselingLog: [
      { date: '20/10/2026', type: 'Gặp trực tiếp', note: 'CVHT cảnh báo nguy cơ bị buộc thôi học theo TT 08/2021. Yêu cầu làm đơn cam kết học lại môn COSC1301 và MATH1303 ở HK tới.' }
    ]
  });

  students.push({
    maSV: '2251050015',
    hoTen: 'Trần Quốc Bảo',
    gioiTinh: 'Nam',
    ngaySinh: '22/07/2004',
    lop: 'DH22CS01C',
    maNganh: 'FIT2200001',
    nganh: 'Khoa học máy tính',
    namHoc: 2,
    gpaTL: 1.28,
    gpaHK: 0.95,
    tcTichLuy: 32,
    tcNo: 28,
    riskScore: 92,
    hadPrevWarning: true,
    warningCount: 2,
    drl: 50,
    email: '2251050015bao@ou.edu.vn',
    sdt: '0903333444',
    notes: 'Vi phạm tiêu chí nợ > 24 TC và CPA Năm 2 < 1.40.',
    historySemesters: buildHistory({ dk: [20, 22, 18], kd: [8, 12, 8], gpaHK: 0.95, gpaTL: 1.28 }),
    counselingLog: []
  });

  students.push({
    maSV: '2251050032',
    hoTen: 'Lê Hoàng Long',
    gioiTinh: 'Nam',
    ngaySinh: '05/11/2004',
    lop: 'DH22CS01C',
    maNganh: 'FIT2200001',
    nganh: 'Khoa học máy tính',
    namHoc: 2,
    gpaTL: 1.32,
    gpaHK: 0.78,
    tcTichLuy: 30,
    tcNo: 25,
    riskScore: 90,
    hadPrevWarning: true,
    warningCount: 2,
    drl: 48,
    email: '2251050032long@ou.edu.vn',
    sdt: '0903555666',
    notes: 'Kỳ 3 rớt 60% số tín chỉ đăng ký. Thuộc diện xem xét buộc thôi học.',
    // HK3 rớt 9/15 TC = 60%; HK2 rớt 12/22 TC (54.5%) -> CBHV lần 1
    historySemesters: buildHistory({ dk: [18, 22, 15], kd: [4, 12, 9], gpaHK: 0.78, gpaTL: 1.32 }),
    counselingLog: []
  });

  // NHÓM 2: CẢNH BÁO HỌC VỤ TT08 (5 SINH VIÊN - CAM)
  const group2 = [
    // dk / kd: TC đăng ký / TC không đạt của HK1, HK2, HK3 (HK3 = kỳ vừa qua)
    { mssv: '2251050008', ten: 'Phạm Minh Tuấn', gpa: 1.36, hk: 0.85, no: 15, dk: [18, 18, 21], kd: [1, 2, 12], lyDo: 'GPA TL Năm 2 < 1.40 và GPA HK < 1.00' },
    { mssv: '2251050019', ten: 'Đỗ Thanh Hà', gpa: 1.38, hk: 1.10, no: 12, dk: [17, 19, 18], kd: [2, 2, 8], lyDo: 'GPA TL Năm 2 dưới ngưỡng 1.40' },
    { mssv: '2251050024', ten: 'Vũ Anh Khoa', gpa: 1.45, hk: 0.90, no: 18, dk: [20, 22, 18], kd: [4, 4, 10], lyDo: 'Rớt > 50% tín chỉ trong học kỳ vừa qua' },
    { mssv: '2251050036', ten: 'Hoàng Trọng Nghĩa', gpa: 1.39, hk: 1.05, no: 14, dk: [20, 20, 16], kd: [4, 5, 5], lyDo: 'GPA TL Năm 2 chạm ngưỡng cảnh báo' },
    { mssv: '2251050041', ten: 'Bùi Thu Trang', gpa: 1.42, hk: 0.88, no: 16, dk: [21, 22, 15], kd: [5, 5, 6], lyDo: 'GPA HK < 1.00 vi phạm ĐK2 TT08' }
  ];

  group2.forEach((item, idx) => {
    students.push({
      maSV: item.mssv,
      hoTen: item.ten,
      gioiTinh: idx % 2 === 0 ? 'Nam' : 'Nữ',
      ngaySinh: `1${idx + 1}/05/2004`,
      lop: 'DH22CS01C',
      maNganh: 'FIT2200001',
      nganh: 'Khoa học máy tính',
      namHoc: 2,
      gpaTL: item.gpa,
      gpaHK: item.hk,
      tcTichLuy: 42,
      tcNo: item.no,
      riskScore: 72,
      hadPrevWarning: false,
      warningCount: 1,
      drl: 62,
      email: `${item.mssv}@ou.edu.vn`,
      sdt: `091200000${idx}`,
      notes: item.lyDo,
      historySemesters: buildHistory({ dk: item.dk, kd: item.kd, gpaHK: item.hk, gpaTL: item.gpa }),
      counselingLog: []
    });
  });

  // NHÓM 3: TÍN HIỆU SỚM (8 SINH VIÊN - VÀNG)
  for (let i = 1; i <= 8; i++) {
    const idNum = 100 + i;
    students.push({
      maSV: `2251050${idNum}`,
      hoTen: `Sinh Viên Tín Hiệu Sớm ${i}`,
      gioiTinh: i % 2 === 0 ? 'Nam' : 'Nữ',
      ngaySinh: `0${i}/08/2004`,
      lop: 'DH22CS01C',
      maNganh: 'FIT2200001',
      nganh: 'Khoa học máy tính',
      namHoc: 2,
      gpaTL: Number((1.45 + (i * 0.03)).toFixed(2)),
      gpaHK: Number((1.50 + (i * 0.05)).toFixed(2)),
      tcTichLuy: 48,
      tcNo: 6,
      riskScore: 48,
      hadPrevWarning: false,
      warningCount: 0,
      drl: 68,
      email: `2251050${idNum}@ou.edu.vn`,
      sdt: `0934000${idNum}`,
      notes: 'Rớt 1 môn tiên quyết (Kỹ thuật lập trình hoặc Giải tích 2). GPA tiệm cận ngưỡng.',
      historySemesters: buildHistory({
        dk: [18, 18, 18],
        kd: [0, 3, 3],
        gpaHK: Number((1.50 + (i * 0.05)).toFixed(2)),
        gpaTL: Number((1.45 + (i * 0.03)).toFixed(2))
      }),
      counselingLog: []
    });
  }

  // NHÓM 4: AN TOÀN & KHÁ GIỎI (29 SINH VIÊN - XANH LÁ)
  const namesSafe = [
    'Lê Gia Hân', 'Trần Bảo Ngọc', 'Nguyễn Thị Minh Châu', 'Hoàng Nhật Minh',
    'Phan Đăng Khôi', 'Võ Quốc Huy', 'Dương Thúy Quỳnh', 'Trịnh Bá Phong',
    'Mai Tuấn Kiệt', 'Hồ Diễm My', 'Cao Minh Trí', 'Tô Vĩnh Phát',
    'Lý Huỳnh Đức', 'Đặng Thảo Vy', 'Ngô Kiến Huy', 'Hà Thùy Linh'
  ];

  for (let i = 1; i <= 29; i++) {
    const idNum = 200 + i;
    const name = namesSafe[i - 1] || `Sinh Viên Khá Giỏi ${i}`;
    const gpa = Number((2.55 + ((i % 15) * 0.09)).toFixed(2));
    const tcTL = 56 + (i % 6);
    const tcSem = Math.round(tcTL / 3);
    students.push({
      maSV: `2251050${idNum}`,
      hoTen: name,
      gioiTinh: i % 3 === 0 ? 'Nữ' : 'Nam',
      ngaySinh: `1${i % 9}/02/2004`,
      lop: 'DH22CS01C',
      maNganh: 'FIT2200001',
      nganh: 'Khoa học máy tính',
      namHoc: 2,
      gpaTL: gpa > 4.0 ? 3.85 : gpa,
      gpaHK: gpa > 4.0 ? 3.90 : gpa,
      tcTichLuy: tcTL,
      tcNo: 0,
      riskScore: 8,
      hadPrevWarning: false,
      warningCount: 0,
      drl: 85,
      email: `2251050${idNum}@ou.edu.vn`,
      sdt: `0978000${idNum}`,
      notes: 'Tiến độ học tập tốt, đạt chuẩn CTĐT.',
      historySemesters: buildHistory({
        dk: [tcSem, tcSem, tcTL - 2 * tcSem],
        kd: [0, 0, 0],
        gpaHK: gpa > 4.0 ? 3.90 : gpa,
        gpaTL: gpa > 4.0 ? 3.85 : gpa,
        flat: true
      }),
      counselingLog: []
    });
  }

  return students;
};

// Helper sinh 15 sinh viên chuẩn cho mỗi lớp của tất cả các ngành còn lại
const generateStudentsForOtherClasses = () => {
  const otherClasses = [
    { lop: 'DH22CS02C', maNganh: 'FIT2200001', nganh: 'Khoa học máy tính', prefix: '22510502', startNum: 11 },
    { lop: 'DH22IT01', maNganh: 'FIT2200002', nganh: 'Công nghệ thông tin', prefix: '22510600', startNum: 1 },
    { lop: 'DH22SE01', maNganh: 'FIT2200003', nganh: 'Kỹ thuật phần mềm', prefix: '22510700', startNum: 1 },
    { lop: 'DH22EC01', maNganh: 'FECO2200001', nganh: 'Kinh tế học', prefix: '22520100', startNum: 1 },
    { lop: 'DH22AC01', maNganh: 'FAAF2200001', nganh: 'Kế toán doanh nghiệp', prefix: '22520200', startNum: 1 },
    { lop: 'DH22BA01', maNganh: 'FBA2200001', nganh: 'Quản trị kinh doanh', prefix: '22520300', startNum: 1 },
    { lop: 'DH22EN01', maNganh: 'FFL2200001', nganh: 'Ngôn ngữ Anh', prefix: '22530100', startNum: 1 }
  ];

  const namesPool = [
    ['Nguyễn Văn Thành', 'Nam', '15/02/2004'],
    ['Trần Thị Thảo', 'Nữ', '20/04/2004'],
    ['Lê Minh Quân', 'Nam', '10/05/2004'],
    ['Phạm Hoàng Nam', 'Nam', '18/06/2004'],
    ['Hoàng Ngọc Bích', 'Nữ', '22/07/2004'],
    ['Vũ Đức Thắng', 'Nam', '05/08/2004'],
    ['Đặng Thu Hằng', 'Nữ', '14/09/2004'],
    ['Bùi Quang Huy', 'Nam', '30/10/2004'],
    ['Đỗ Phương Anh', 'Nữ', '12/11/2004'],
    ['Hồ Tuấn Kiệt', 'Nam', '25/12/2004'],
    ['Ngô Thanh Trúc', 'Nữ', '08/01/2004'],
    ['Dương Gia Bảo', 'Nam', '17/02/2004'],
    ['Lý Thảo My', 'Nữ', '03/03/2004'],
    ['Phan Quốc Trung', 'Nam', '29/03/2004'],
    ['Võ Khánh Linh', 'Nữ', '11/04/2004']
  ];

  const students = [];

  for (const c of otherClasses) {
    for (let i = 0; i < 15; i++) {
      const idNum = String(c.startNum + i).padStart(2, '0');
      const maSV = `${c.prefix}${idNum}`;
      const [hoTen, gioiTinh, ngaySinh] = namesPool[i];

      let gpaTL, gpaHK, tcTichLuy, tcNo, riskScore, hadPrevWarning, warningCount, drl, notes, dk, kd;

      if (i === 0) {
        // Sinh viên 1: Nguy cơ cao / Buộc thôi học (để kiểm tra cảnh báo học vụ TT08)
        gpaTL = 1.18;
        gpaHK = 0.85;
        tcTichLuy = 28;
        tcNo = 24;
        riskScore = 94;
        hadPrevWarning = true;
        warningCount = 2;
        drl = 46;
        notes = 'Bị cảnh báo học vụ 2 học kỳ liên tiếp, nợ nhiều tín chỉ chuỗi tiên quyết.';
        dk = [18, 18, 16];
        kd = [6, 12, 6];
      } else if (i === 1) {
        // Sinh viên 2: Cảnh báo học vụ
        gpaTL = 1.72;
        gpaHK = 1.55;
        tcTichLuy = 40;
        tcNo = 12;
        riskScore = 72;
        hadPrevWarning = true;
        warningCount = 1;
        drl = 58;
        notes = 'GPA dưới 2.0, cần theo dõi và hỗ trợ cải thiện điểm.';
        dk = [18, 18, 16];
        kd = [3, 6, 3];
      } else if (i === 2) {
        // Sinh viên 3: Cảnh báo sớm
        gpaTL = 1.95;
        gpaHK = 1.85;
        tcTichLuy = 46;
        tcNo = 6;
        riskScore = 52;
        hadPrevWarning = false;
        warningCount = 0;
        drl = 65;
        notes = 'Điểm tiệm cận ngưỡng cảnh báo học vụ.';
        dk = [18, 18, 16];
        kd = [0, 3, 3];
      } else if (i >= 13) {
        // Sinh viên 14-15: Xuất sắc
        gpaTL = Number((3.65 + (i - 13) * 0.15).toFixed(2));
        gpaHK = Number((3.70 + (i - 13) * 0.15).toFixed(2));
        tcTichLuy = 58;
        tcNo = 0;
        riskScore = 5;
        hadPrevWarning = false;
        warningCount = 0;
        drl = 92;
        notes = 'Sinh viên giỏi/xuất sắc, tiến độ đào tạo vượt chuẩn.';
        dk = [20, 20, 18];
        kd = [0, 0, 0];
      } else {
        // Sinh viên 4-13: Bình thường / Khá
        const delta = ((i - 3) * 0.08);
        gpaTL = Number((2.60 + delta).toFixed(2));
        gpaHK = Number((2.65 + delta).toFixed(2));
        tcTichLuy = 52 + (i % 4);
        tcNo = 0;
        riskScore = 15;
        hadPrevWarning = false;
        warningCount = 0;
        drl = 78 + (i % 10);
        notes = 'Tiến độ học tập bình thường.';
        dk = [18, 18, tcTichLuy - 36];
        kd = [0, 0, 0];
      }

      students.push({
        maSV,
        hoTen,
        gioiTinh,
        ngaySinh,
        lop: c.lop,
        maNganh: c.maNganh,
        nganh: c.nganh,
        namHoc: 2,
        gpaTL,
        gpaHK,
        tcTichLuy,
        tcNo,
        riskScore,
        hadPrevWarning,
        warningCount,
        drl,
        email: `${maSV}@ou.edu.vn`,
        sdt: `09${Math.floor(10000000 + Math.random() * 90000000)}`,
        notes,
        historySemesters: buildHistory({
          dk,
          kd,
          gpaHK,
          gpaTL,
          flat: tcNo === 0
        }),
        counselingLog: []
      });
    }
  }

  return students;
};

// 5. TẬP HỢP TOÀN BỘ SINH VIÊN (45 SV Lớp DH22CS01C + 105 SV các ngành khác = 150 SV)
export const MOCK_STUDENTS = [
  ...generateDH22CS01CStudents(),
  ...generateStudentsForOtherClasses()
].map((student) => {
  const { warningEval, ...classification } = OUGradeEngine.classifyStudent(student);
  return { ...student, ...classification };
});

// 6. DANH SÁCH BẢNG ĐIỂM (GROUP BY THEO MÃ MÔN HỌC -> EXPAND LỚP HỌC)
export const MOCK_COURSE_GRADES = [
  // MÔN 1: COSC1301 - Nhập môn lập trình (Khoa FIT)
  {
    maBangDiem: 'BD-DH22CS01C-COSC1301',
    maMon: 'COSC1301',
    tenMon: 'Nhập môn lập trình',
    soTC: 3,
    maKhoa: 'FIT',
    maLop: 'DH22CS01C',
    tenLop: 'ĐH Khoa học máy tính Khóa 2022 - Lớp 01C',
    giangVien: 'TS. Lê Xuân Vĩnh',
    hocKy: 'HK1 - 2022-2023',
    siSo: 45,
    trangThai: 'COMPLETED',
    statusText: 'Đã hoàn tất',
    progress: 100,
    grades: [
      { maSV: '2251050001', hoTen: 'Nguyễn Văn An', diemQT: 3.5, diemThi: 3.0, diemTK10: 3.2, letter: 'F', grade4: 0.0, pass: false },
      { maSV: '2251050015', hoTen: 'Trần Quốc Bảo', diemQT: 4.0, diemThi: 3.5, diemTK10: 3.7, letter: 'F', grade4: 0.0, pass: false },
      { maSV: '2251050032', hoTen: 'Lê Hoàng Long', diemQT: 4.0, diemThi: 3.0, diemTK10: 3.4, letter: 'F', grade4: 0.0, pass: false },
      { maSV: '2251050201', hoTen: 'Lê Gia Hân', diemQT: 9.5, diemThi: 9.0, diemTK10: 9.2, letter: 'A+', grade4: 4.0, pass: true },
      { maSV: '2251050202', hoTen: 'Trần Bảo Ngọc', diemQT: 8.5, diemThi: 8.0, diemTK10: 8.2, letter: 'B+', grade4: 3.5, pass: true }
    ]
  },
  {
    maBangDiem: 'BD-DH22CS02C-COSC1301',
    maMon: 'COSC1301',
    tenMon: 'Nhập môn lập trình',
    soTC: 3,
    maKhoa: 'FIT',
    maLop: 'DH22CS02C',
    tenLop: 'ĐH Khoa học máy tính Khóa 2022 - Lớp 02C',
    giangVien: 'ThS. Nguyễn Hoàng Nam',
    hocKy: 'HK1 - 2022-2023',
    siSo: 42,
    trangThai: 'COMPLETED',
    statusText: 'Đã hoàn tất',
    progress: 100,
    grades: []
  },

  // MÔN 2: COSC2301 - Cấu trúc dữ liệu và giải thuật (Khoa FIT)
  {
    maBangDiem: 'BD-DH22CS01C-COSC2301',
    maMon: 'COSC2301',
    tenMon: 'Cấu trúc dữ liệu và giải thuật',
    soTC: 3,
    maKhoa: 'FIT',
    maLop: 'DH22CS01C',
    tenLop: 'ĐH Khoa học máy tính Khóa 2022 - Lớp 01C',
    giangVien: 'TS. Phạm Minh Tuấn',
    hocKy: 'HK3 - 2023-2024',
    siSo: 45,
    trangThai: 'IN_PROGRESS',
    statusText: 'Đang nhập',
    progress: 65,
    grades: [
      { maSV: '2251050001', hoTen: 'Nguyễn Văn An', diemQT: 3.0, diemThi: null, diemTK10: null, letter: '-', grade4: null, pass: null },
      { maSV: '2251050201', hoTen: 'Lê Gia Hân', diemQT: 9.0, diemThi: 8.5, diemTK10: 8.7, letter: 'A', grade4: 3.7, pass: true }
    ]
  },

  // MÔN 3: COSC2302 - Cơ sở dữ liệu (Khoa FIT)
  {
    maBangDiem: 'BD-DH22CS01C-COSC2302',
    maMon: 'COSC2302',
    tenMon: 'Cơ sở dữ liệu',
    soTC: 3,
    maKhoa: 'FIT',
    maLop: 'DH22CS01C',
    tenLop: 'ĐH Khoa học máy tính Khóa 2022 - Lớp 01C',
    giangVien: 'ThS. Đỗ Hồng Quân',
    hocKy: 'HK3 - 2023-2024',
    siSo: 45,
    trangThai: 'COMPLETED',
    statusText: 'Đã hoàn tất',
    progress: 100,
    grades: []
  },

  // MÔN 4: ACCT1301 - Nguyên lý kế toán doanh nghiệp (Môn liên ngành từ Khoa FAAF)
  {
    maBangDiem: 'BD-DH22CS01C-ACCT1301',
    maMon: 'ACCT1301',
    tenMon: 'Nguyên lý kế toán doanh nghiệp',
    soTC: 3,
    maKhoa: 'FAAF',
    maLop: 'DH22CS01C',
    tenLop: 'ĐH Khoa học máy tính Khóa 2022 - Lớp 01C',
    giangVien: 'TS. Phan Thị Thùy',
    hocKy: 'HK4 - 2023-2024',
    siSo: 45,
    trangThai: 'NOT_STARTED',
    statusText: 'Chưa nhập',
    progress: 0,
    grades: []
  }
];

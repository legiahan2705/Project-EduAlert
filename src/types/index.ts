/**
 * TypeScript Definitions for EduAlert System v2.5
 */

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'STATUS_CHANGE';
  field?: string;
  oldValue: string;
  newValue: string;
}

export interface Faculty {
  id: string;
  code: string; // Tự sinh: OU + YYMMDD + XXX
  name: string;
  nameEn: string;
  shortCode: string; // FIT, FECO, FAAF... Duy nhất
  dean?: string;
  office?: string;
  phone?: string;
  email?: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdBy: string;
  createdAt: string;
  auditLogs: AuditLogEntry[];
}

export interface CurriculumCourse {
  maMon: string;
  tenMon: string;
  soTC: number;
  nhom: string;
  batBuoc: boolean;
  tienQuyet?: string;
  hkDuKien: number;
  isTichLuy: boolean;
  maKhoa?: string;
  pFailHistory?: number;
}

export interface Major {
  id: string;
  code: string; // Tự sinh: [Ký hiệu viết tắt] + YYMM + XXX
  name: string;
  nameEn?: string;
  facultyCode: string;
  facultyId: string;
  facultyName?: string;
  creditsStandard: number; // Thường là 141
  degreeLevel?: string;
  description?: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdBy: string;
  createdAt: string;
  auditLogs: AuditLogEntry[];
}

export interface ClassInfo {
  id: string;
  maLop: string;
  tenLop: string;
  maNganh: string;
  nganh?: string;
  khoaHoc: string;
  namHocThu: number;
  siSo: number;
  cvht: string;
  emailCVHT?: string;
  phongHoc?: string;
  ghiChu?: string;
}

export interface StudentGradeItem {
  maSV: string;
  hoTen: string;
  diemQT: number | null;
  diemThi: number | null;
  diemTK10: number | null;
  letter: string;
  grade4: number | null;
  pass: boolean | null;
}

export interface CourseGrade {
  maBangDiem: string; // Tự sinh: BD-[Lớp]-[Môn]
  maMon: string;
  tenMon: string;
  soTC: number;
  maKhoa: string;
  maLop: string;
  tenLop: string;
  giangVien: string;
  hocKy: string;
  siSo: number;
  trangThai: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED';
  statusText?: string;
  progress: number;
  grades: StudentGradeItem[];
}

export interface Student {
  maSV: string;
  hoTen: string;
  gioiTinh: string;
  ngaySinh: string;
  lop: string;
  maNganh: string;
  nganh: string;
  namHoc: number;
  gpaTL: number;
  gpaHK: number;
  tcTichLuy: number;
  tcNo: number;
  level: 'DROP_OUT_RISK' | 'WARNING' | 'EARLY_SIGNAL' | 'SAFE';
  levelText: string;
  riskScore: number;
  hadPrevWarning: boolean;
  warningCount: number;
  drl?: number;
  email: string;
  sdt: string;
  notes?: string;
  counselingLog?: Array<{
    date: string;
    type?: string;
    note: string;
  }>;
}

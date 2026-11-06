import mongoose from 'mongoose';

// 1. Khoa
const FacultySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  name: { type: String, required: true },
  nameEn: String,
  shortCode: { type: String, required: true },
  dean: String,
  office: String,
  phone: String,
  email: String,
  status: { type: String, default: 'ACTIVE' },
  createdBy: String,
  createdAt: String,
  auditLogs: [mongoose.Schema.Types.Mixed],
}, { timestamps: true });

// 2. Ngành
const MajorSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  name: { type: String, required: true },
  nameEn: String,
  facultyCode: String,
  facultyId: String,
  facultyName: String,
  creditsStandard: { type: Number, default: 141 },
  degreeLevel: String,
  description: String,
  status: { type: String, default: 'ACTIVE' },
  createdBy: String,
  createdAt: String,
  auditLogs: [mongoose.Schema.Types.Mixed],
}, { timestamps: true });

// 3. Sinh viên
const StudentSchema = new mongoose.Schema({
  maSV: { type: String, required: true, unique: true },
  hoTen: { type: String, required: true },
  gioiTinh: String,
  ngaySinh: String,
  lop: String,
  maNganh: String,
  nganh: String,
  namHoc: Number,
  gpaTL: Number,
  gpaHK: Number,
  tcTichLuy: Number,
  tcNo: Number,
  riskScore: Number,
  hadPrevWarning: Boolean,
  warningCount: Number,
  drl: Number,
  email: String,
  sdt: String,
  notes: String,
  historySemesters: [mongoose.Schema.Types.Mixed],
  counselingLog: [mongoose.Schema.Types.Mixed],
  level: String,
  levelText: String,
}, { timestamps: true });

// 4. Bảng điểm
const GradeSheetSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  maLop: String,
  maMon: String,
  tenMon: String,
  soTC: Number,
  hocKy: String,
  namHoc: String,
  giangVien: String,
  soSV: Number,
  ngayCapNhat: String,
  grades: [mongoose.Schema.Types.Mixed],
}, { timestamps: true });

// 5. Khung CTĐT
const CurriculumSchema = new mongoose.Schema({
  majorCode: { type: String, required: true, unique: true },
  courses: [mongoose.Schema.Types.Mixed],
}, { timestamps: true });

export const Faculty = mongoose.models.Faculty || mongoose.model('Faculty', FacultySchema);
export const Major = mongoose.models.Major || mongoose.model('Major', MajorSchema);
export const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);
export const GradeSheet = mongoose.models.GradeSheet || mongoose.model('GradeSheet', GradeSheetSchema);
export const Curriculum = mongoose.models.Curriculum || mongoose.model('Curriculum', CurriculumSchema);


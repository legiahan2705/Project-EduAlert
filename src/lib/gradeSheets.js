import { MOCK_MAJOR_CURRICULUM } from '@/engine/mockData';
import { GradeSheet, Class } from '@/models';

// Danh sách giảng viên mặc định theo mã môn hoặc phân công tự động
const LECTURER_ASSIGNMENTS = {
  COSC1301: { name: 'TS. Lê Xuân Vĩnh', email: 'vinh.lx@ou.edu.vn' },
  COSC1302: { name: 'ThS. Nguyễn Hoàng Nam', email: 'nam.nh@ou.edu.vn' },
  COSC2301: { name: 'TS. Phạm Minh Tuấn', email: 'tuan.pm@ou.edu.vn' },
  COSC2302: { name: 'ThS. Đỗ Hồng Quân', email: 'quan.dh@ou.edu.vn' },
  COSC2303: { name: 'TS. Lê Xuân Vĩnh', email: 'vinh.lx@ou.edu.vn' },
  COSC2304: { name: 'ThS. Đỗ Hồng Quân', email: 'quan.dh@ou.edu.vn' },
  COSC2305: { name: 'TS. Phạm Minh Tuấn', email: 'tuan.pm@ou.edu.vn' },
  COSC2306: { name: 'ThS. Lê Văn Dũng', email: 'dung.lv@ou.edu.vn' },
  COSC2307: { name: 'ThS. Nguyễn Hoàng Nam', email: 'nam.nh@ou.edu.vn' },
  COSC3301: { name: 'ThS. Lê Văn Dũng', email: 'dung.lv@ou.edu.vn' },
  COSC3302: { name: 'TS. Lê Xuân Vĩnh', email: 'vinh.lx@ou.edu.vn' },
  COSC3304: { name: 'TS. Phạm Minh Tuấn', email: 'tuan.pm@ou.edu.vn' },
  COSC3305: { name: 'TS. Lê Xuân Vĩnh', email: 'vinh.lx@ou.edu.vn' },
  COSC3306: { name: 'ThS. Lê Văn Dũng', email: 'dung.lv@ou.edu.vn' },
  COSC4301: { name: 'TS. Phạm Minh Tuấn', email: 'tuan.pm@ou.edu.vn' },
  COSC4401: { name: 'ThS. Nguyễn Hoàng Nam', email: 'nam.nh@ou.edu.vn' },
  COSC4601: { name: 'TS. Lê Xuân Vĩnh', email: 'vinh.lx@ou.edu.vn' },
  ACCT1301: { name: 'TS. Phan Thị Thùy', email: 'thuy.pt@ou.edu.vn' },
  ECON1301: { name: 'PGS.TS. Nguyễn Văn Hùng', email: 'hung.nv@ou.edu.vn' },
  MGMT1301: { name: 'PGS.TS. Trần Thị Lan', email: 'lan.tt@ou.edu.vn' },
  ENGL1301: { name: 'ThS. Hoàng Thị Mai', email: 'mai.ht@ou.edu.vn' },
  ENGL1302: { name: 'ThS. Hoàng Thị Mai', email: 'mai.ht@ou.edu.vn' },
  MATH1301: { name: 'TS. Trần Thị Bích', email: 'bich.tt@ou.edu.vn' },
  MATH1302: { name: 'TS. Trần Thị Bích', email: 'bich.tt@ou.edu.vn' },
  MATH1303: { name: 'TS. Trần Thị Bích', email: 'bich.tt@ou.edu.vn' },
  MATH1304: { name: 'TS. Trần Thị Bích', email: 'bich.tt@ou.edu.vn' },
};

/**
 * Tính toán năm học theo năm bắt đầu niên khóa và số thứ tự học kỳ (HK1 -> HK8)
 * HK1, HK2 -> Năm 1: startYear - startYear + 1
 * HK3, HK4 -> Năm 2: startYear + 1 - startYear + 2
 * HK5, HK6 -> Năm 3: startYear + 2 - startYear + 3
 * HK7, HK8 -> Năm 4: startYear + 3 - startYear + 4
 */
export function calculateAcademicYear(khoaHoc, hkNum) {
  const match = String(khoaHoc || '').match(/\d{4}/);
  const startYear = match ? parseInt(match[0], 10) : 2022;
  const yearOffset = Math.floor((Math.max(1, hkNum) - 1) / 2);
  const y1 = startYear + yearOffset;
  const y2 = y1 + 1;
  return `${y1} - ${y2}`;
}

/**
 * Sinh danh sách bảng điểm (GradeSheet) cho 1 lớp dựa theo CTĐT 4 năm (8 học kỳ)
 */
export function generateGradeSheetsForClass(classInfo, customCurriculum = null) {
  const majorCode = classInfo.maNganh || classInfo.majorCode || 'FIT2200001';
  const curriculum =
    customCurriculum ||
    MOCK_MAJOR_CURRICULUM[majorCode] ||
    MOCK_MAJOR_CURRICULUM['FIT2200001'] ||
    [];

  const maLop = classInfo.maLop || classInfo.id;
  const tenLop = classInfo.tenLop || `Lớp ${maLop}`;
  const khoaHoc = classInfo.khoaHoc || '2022 - 2026';
  const nganh = classInfo.nganh || classInfo.tenNganh || 'Khoa học máy tính';

  // Xác định học kỳ hiện tại theo năm học thứ của lớp (mặc định năm 2 -> HK3)
  const currentSemesterNum = classInfo.namHocThu ? classInfo.namHocThu * 2 - 1 : 3;

  return curriculum.map((course) => {
    const hkNum = Number(course.hkDuKien) || 1;
    const hocKy = `HK${hkNum}`;
    const namHoc = calculateAcademicYear(khoaHoc, hkNum);
    const id = `BD-${maLop}-${course.maMon}`;

    let trangThai = 'NOT_STARTED';
    let statusText = 'Chưa nhập';
    let progress = 0;

    if (hkNum < currentSemesterNum) {
      trangThai = 'COMPLETED';
      statusText = 'Đã hoàn tất';
      progress = 100;
    } else if (hkNum === currentSemesterNum) {
      trangThai = 'IN_PROGRESS';
      statusText = 'Đang nhập';
      progress = 65;
    }

    const lecturer =
      LECTURER_ASSIGNMENTS[course.maMon] ||
      (classInfo.cvht
        ? { name: classInfo.cvht, email: classInfo.emailCVHT || 'cvht@ou.edu.vn' }
        : { name: 'ThS. Nguyễn Hoàng Nam', email: 'nam.nh@ou.edu.vn' });

    return {
      id,
      code: id,
      maBangDiem: id,
      maLop,
      tenLop,
      khoaHoc,
      maNganh: majorCode,
      tenNganh: nganh,
      maKhoa: course.maKhoa || 'FIT',
      tenKhoa: course.maKhoa === 'FAAF' ? 'Khoa Kế toán - Kiểm toán' : course.maKhoa === 'FECO' ? 'Khoa Kinh tế' : 'Khoa Công nghệ thông tin',
      maMon: course.maMon,
      tenMon: course.tenMon,
      soTC: course.soTC || 3,
      nhom: course.nhom || 'Cơ sở ngành',
      giangVien: lecturer.name,
      emailGV: lecturer.email,
      hocKy,
      namHoc,
      siSo: Number(classInfo.siSo) || 0,
      trangThai,
      statusText,
      progress,
      grades: [],
      ngayCapNhat: new Date().toISOString().slice(0, 10),
    };
  });
}

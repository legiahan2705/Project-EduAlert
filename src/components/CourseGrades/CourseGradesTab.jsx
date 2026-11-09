'use client';

import { useState, useMemo } from 'react';
import { 
  Download, 
  Upload, 
  Save, 
  Plus, 
  Edit3, 
  Search, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  FolderKanban,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Users,
  FileSpreadsheet,
  X,
  Eye
} from 'lucide-react';
import { OUGradeEngine } from '@/engine/OUGradeEngine';

// Danh sách bảng điểm mẫu khởi tạo (Có lớp trọng điểm DH22CS01C - 45 sinh viên)
const INITIAL_GRADE_SHEETS = [
  // 1. MÔN NHẬP MÔN LẬP TRÌNH (COSC1301)
  {
    id: 'BD-DH22CS01C-COSC1301',
    code: 'BD-DH22CS01C-COSC1301',
    maLop: 'DH22CS01C',
    tenLop: 'ĐH Khoa học máy tính Khóa 2022 - Lớp 01C',
    khoaHoc: '2022 - 2026',
    maNganh: 'FIT2200001',
    tenNganh: 'Khoa học máy tính',
    maKhoa: 'FIT',
    tenKhoa: 'Khoa Công nghệ thông tin',
    maMon: 'COSC1301',
    tenMon: 'Nhập môn lập trình',
    soTC: 3,
    nhom: 'Cơ sở ngành',
    giangVien: 'TS. Lê Xuân Vĩnh',
    emailGV: 'vinh.lx@ou.edu.vn',
    hocKy: 'HK1',
    namHoc: '2022 - 2023',
    siSo: 45,
    trangThai: 'COMPLETED',
    ngayCapNhat: '2026-11-04'
  },
  {
    id: 'BD-DH22CS02C-COSC1301',
    code: 'BD-DH22CS02C-COSC1301',
    maLop: 'DH22CS02C',
    tenLop: 'ĐH Khoa học máy tính Khóa 2022 - Lớp 02C',
    khoaHoc: '2022 - 2026',
    maNganh: 'FIT2200001',
    tenNganh: 'Khoa học máy tính',
    maKhoa: 'FIT',
    tenKhoa: 'Khoa Công nghệ thông tin',
    maMon: 'COSC1301',
    tenMon: 'Nhập môn lập trình',
    soTC: 3,
    nhom: 'Cơ sở ngành',
    giangVien: 'ThS. Nguyễn Hoàng Nam',
    emailGV: 'nam.nh@ou.edu.vn',
    hocKy: 'HK1',
    namHoc: '2022 - 2023',
    siSo: 42,
    trangThai: 'COMPLETED',
    ngayCapNhat: '2026-11-04'
  },

  // 2. MÔN CẤU TRÚC DỮ LIỆU VÀ GIẢI THUẬT (COSC2301)
  {
    id: 'BD-DH22CS01C-COSC2301',
    code: 'BD-DH22CS01C-COSC2301',
    maLop: 'DH22CS01C',
    tenLop: 'ĐH Khoa học máy tính Khóa 2022 - Lớp 01C',
    khoaHoc: '2022 - 2026',
    maNganh: 'FIT2200001',
    tenNganh: 'Khoa học máy tính',
    maKhoa: 'FIT',
    tenKhoa: 'Khoa Công nghệ thông tin',
    maMon: 'COSC2301',
    tenMon: 'Cấu trúc dữ liệu và giải thuật',
    soTC: 3,
    nhom: 'Cơ sở ngành',
    giangVien: 'TS. Phạm Minh Tuấn',
    emailGV: 'tuan.pm@ou.edu.vn',
    hocKy: 'HK3',
    namHoc: '2023 - 2024',
    siSo: 45,
    trangThai: 'IN_PROGRESS',
    ngayCapNhat: '2026-11-04'
  },

  // 3. MÔN CƠ SỞ DỮ LIỆU (COSC2302)
  {
    id: 'BD-DH22CS01C-COSC2302',
    code: 'BD-DH22CS01C-COSC2302',
    maLop: 'DH22CS01C',
    tenLop: 'ĐH Khoa học máy tính Khóa 2022 - Lớp 01C',
    khoaHoc: '2022 - 2026',
    maNganh: 'FIT2200001',
    tenNganh: 'Khoa học máy tính',
    maKhoa: 'FIT',
    tenKhoa: 'Khoa Công nghệ thông tin',
    maMon: 'COSC2302',
    tenMon: 'Cơ sở dữ liệu',
    soTC: 3,
    nhom: 'Cơ sở ngành',
    giangVien: 'ThS. Đỗ Hồng Quân',
    emailGV: 'quan.dh@ou.edu.vn',
    hocKy: 'HK3',
    namHoc: '2023 - 2024',
    siSo: 45,
    trangThai: 'COMPLETED',
    ngayCapNhat: '2026-11-04'
  },

  // 4. MÔN LIÊN NGÀNH: NGUYÊN LÝ KẾ TOÁN (ACCT1301) TỪ KHOA FAAF
  {
    id: 'BD-DH22CS01C-ACCT1301',
    code: 'BD-DH22CS01C-ACCT1301',
    maLop: 'DH22CS01C',
    tenLop: 'ĐH Khoa học máy tính Khóa 2022 - Lớp 01C',
    khoaHoc: '2022 - 2026',
    maNganh: 'FIT2200001',
    tenNganh: 'Khoa học máy tính',
    maKhoa: 'FAAF',
    tenKhoa: 'Khoa Kế toán - Kiểm toán',
    maMon: 'ACCT1301',
    tenMon: 'Nguyên lý kế toán doanh nghiệp',
    soTC: 3,
    nhom: 'Tự chọn liên ngành',
    giangVien: 'TS. Phan Thị Thùy',
    emailGV: 'thuy.pt@ou.edu.vn',
    hocKy: 'HK4',
    namHoc: '2023 - 2024',
    siSo: 45,
    trangThai: 'PENDING',
    ngayCapNhat: '2026-11-04'
  }
];

export default function CourseGradesTab({
  majors,
  curriculumByMajor,
  faculties,
  classes,
  students,
  currentUser = null
}) {
  const [gradeSheets, setGradeSheets] = useState(INITIAL_GRADE_SHEETS);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'entry'
  const [activeSheet, setActiveSheet] = useState(null);

  // Kiểm tra quyền chỉnh sửa bảng điểm của người dùng hiện tại
  const canEditSheet = (sheet) => {
    if (!currentUser) return true;
    if (currentUser.role === 'admin') return true;
    if (currentUser.role === 'lecturer') {
      const matchName = sheet.giangVien === currentUser.name;
      const matchClass = (currentUser.classes || []).includes(sheet.maLop);
      const matchCourse = (currentUser.coursesTaught || []).includes(sheet.maMon);
      return matchName || matchCourse;
    }
    return false;
  };

  // Group by Mã Môn: state lưu danh sách các môn đang được mở rộng (expanded)
  const [expandedCourses, setExpandedCourses] = useState(['COSC1301', 'COSC2301']);

  // Bộ lọc danh sách
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFaculty, setFilterFaculty] = useState('ALL');
  const [filterSemester, setFilterSemester] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Modal mở bảng điểm mới
  const [isNewSheetModalOpen, setIsNewSheetModalOpen] = useState(false);
  const [newSheetData, setNewSheetData] = useState({
    maMon: 'COSC1301',
    maLop: 'DH22CS01C',
    giangVien: 'ThS. Nguyễn Hoàng Nam',
    hocKy: 'HK3',
    namHoc: '2023 - 2024'
  });

  // State nhập điểm chi tiết
  const [gradeRows, setGradeRows] = useState([]);
  const [saveAlert, setSaveAlert] = useState(false);
  const [searchStudentInSheet, setSearchStudentInSheet] = useState('');

  // 1. Xử lý Toggle Expand / Collapse theo Mã Môn
  const toggleExpand = (maMon) => {
    setExpandedCourses(prev => 
      prev.includes(maMon) ? prev.filter(c => c !== maMon) : [...prev, maMon]
    );
  };

  // 2. Thuật toán Group By theo Mã Môn
  const groupedCourses = useMemo(() => {
    // Lọc các bảng điểm theo filter trước
    const filtered = gradeSheets.filter(sheet => {
      if (filterFaculty !== 'ALL' && sheet.maKhoa !== filterFaculty) return false;
      if (filterSemester !== 'ALL' && sheet.hocKy !== filterSemester) return false;
      if (filterStatus !== 'ALL' && sheet.trangThai !== filterStatus) return false;

      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchCourse = sheet.tenMon.toLowerCase().includes(q) || sheet.maMon.toLowerCase().includes(q);
        const matchClass = sheet.maLop.toLowerCase().includes(q) || sheet.tenLop.toLowerCase().includes(q);
        const matchLecturer = sheet.giangVien.toLowerCase().includes(q);
        if (!matchCourse && !matchClass && !matchLecturer) return false;
      }
      return true;
    });

    // Nhóm theo maMon
    const groups = new Map();
    filtered.forEach(sheet => {
      if (!groups.has(sheet.maMon)) {
        groups.set(sheet.maMon, {
          maMon: sheet.maMon,
          tenMon: sheet.tenMon,
          soTC: sheet.soTC,
          maKhoa: sheet.maKhoa,
          tenKhoa: sheet.tenKhoa,
          nhom: sheet.nhom,
          sheets: []
        });
      }
      groups.get(sheet.maMon).sheets.push(sheet);
    });

    return Array.from(groups.values());
  }, [gradeSheets, filterFaculty, filterSemester, filterStatus, searchTerm]);

  // 3. Mở Workspace Nhập Điểm Cho 1 Bảng Điểm Của Lớp
  const handleOpenGradeEntry = (sheet) => {
    setActiveSheet(sheet);

    // Lấy danh sách sinh viên thuộc lớp của bảng điểm đó
    const classStudents = students.filter(s => s.lop === sheet.maLop);
    const targetStudents = classStudents.length > 0 ? classStudents : students.slice(0, 45);

    // Sinh điểm mẫu hoặc nạp điểm đã có
    const initialRows = targetStudents.map(s => {
      // Giả lập điểm theo học lực sẵn có của sinh viên
      let qt = 7.5;
      let thi = 7.0;
      if (s.level === 'DROP_OUT_RISK') {
        qt = 3.5;
        thi = 3.0;
      } else if (s.level === 'WARNING') {
        qt = 5.0;
        thi = 4.0;
      } else if (s.gpaTL >= 3.5) {
        qt = 9.0;
        thi = 8.5;
      }

      const tk10 = Number((qt * 0.4 + thi * 0.6).toFixed(1));
      const gradeResult = (OUGradeEngine.computeOUGrade || OUGradeEngine.convertGrade).call(OUGradeEngine, tk10);

      return {
        maSV: s.maSV,
        hoTen: s.hoTen,
        lop: s.lop,
        diemQT: qt,
        diemThi: thi,
        diemTK10: tk10,
        letter: gradeResult.letter,
        grade4: gradeResult.grade4,
        pass: tk10 >= 4.0
      };
    });

    setGradeRows(initialRows);
    setViewMode('entry');
    setSaveAlert(false);
  };

  // 4. Xử lý sửa điểm inline trong bảng
  const handleScoreChange = (maSV, field, value) => {
    let numVal = parseFloat(value);
    if (isNaN(numVal)) numVal = null;
    else numVal = Math.min(10, Math.max(0, numVal));

    setGradeRows(prev => prev.map(row => {
      if (row.maSV === maSV) {
        const newQT = field === 'diemQT' ? numVal : row.diemQT;
        const newThi = field === 'diemThi' ? numVal : row.diemThi;

        let tk10 = null;
        let letter = '-';
        let grade4 = null;
        let pass = null;

        if (newQT !== null && newThi !== null) {
          tk10 = Number((newQT * 0.4 + newThi * 0.6).toFixed(1));
          const res = (OUGradeEngine.computeOUGrade || OUGradeEngine.convertGrade).call(OUGradeEngine, tk10);
          letter = res.letter;
          grade4 = res.grade4;
          pass = tk10 >= 4.0;
        }

        return {
          ...row,
          [field]: numVal,
          diemTK10: tk10,
          letter,
          grade4,
          pass
        };
      }
      return row;
    }));
  };

  // 5. Lưu bảng điểm
  const handleSaveGrades = () => {
    setSaveAlert(true);
    // Cập nhật trạng thái bảng điểm sang Hoàn tất
    setGradeSheets(prev => prev.map(s => {
      if (s.id === activeSheet.id) {
        return {
          ...s,
          trangThai: 'COMPLETED',
          ngayCapNhat: new Date().toISOString().slice(0, 10)
        };
      }
      return s;
    }));
    setTimeout(() => setSaveAlert(false), 4000);
  };

  // 6. Xử lý Tạo Bảng Điểm Mới (Rule Simple Nhất: BD-[Lớp]-[Môn])
  const handleCreateSheet = (e) => {
    e.preventDefault();
    const autoCode = `BD-${newSheetData.maLop}-${newSheetData.maMon}`;
    
    // Kiểm tra trùng
    if (gradeSheets.some(s => s.code === autoCode || s.id === autoCode)) {
      alert(`Bảng điểm của Lớp ${newSheetData.maLop} cho môn ${newSheetData.maMon} đã tồn tại!`);
      return;
    }

    const cls = classes.find(c => c.maLop === newSheetData.maLop) || { maLop: newSheetData.maLop, tenLop: newSheetData.maLop, siSo: 45, khoaHoc: '2022-2026' };
    const curList = Object.values(curriculumByMajor).flat();
    const crs = curList.find(c => c.maMon === newSheetData.maMon) || { maMon: newSheetData.maMon, tenMon: newSheetData.maMon, soTC: 3, nhom: 'Chuyên ngành' };

    const newSheet = {
      id: autoCode,
      code: autoCode,
      maLop: cls.maLop,
      tenLop: cls.tenLop,
      khoaHoc: cls.khoaHoc,
      maNganh: cls.maNganh || 'FIT2200001',
      tenNganh: 'Khoa học máy tính',
      maKhoa: 'FIT',
      tenKhoa: 'Khoa Công nghệ thông tin',
      maMon: crs.maMon,
      tenMon: crs.tenMon,
      soTC: crs.soTC,
      nhom: crs.nhom,
      giangVien: newSheetData.giangVien.trim(),
      emailGV: 'giangvien@ou.edu.vn',
      hocKy: newSheetData.hocKy,
      namHoc: newSheetData.namHoc,
      siSo: cls.siSo || 45,
      trangThai: 'PENDING',
      ngayCapNhat: new Date().toISOString().slice(0, 10)
    };

    setGradeSheets([newSheet, ...gradeSheets]);
    // Tự động mở rộng môn vừa tạo
    if (!expandedCourses.includes(crs.maMon)) {
      setExpandedCourses([...expandedCourses, crs.maMon]);
    }
    setIsNewSheetModalOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* ============================================================ */}
      {/* CHẾ ĐỘ 1: DANH SÁCH BẢNG ĐIỂM (GROUP BY THEO MÔN HỌC)        */}
      {/* ============================================================ */}
      {viewMode === 'list' && (
        <>
          {/* Summary Banner */}
          <div className="summary-banner">
            <div className="flex items-center gap-6">
              <div className="summary-meta-item">
                <span className="summary-meta-label">Tổng Số Môn Học</span>
                <span className="summary-meta-val text-emerald-800 text-lg">
                  {groupedCourses.length} Học Phần
                </span>
              </div>
              <div className="summary-meta-item border-l border-slate-200 pl-6">
                <span className="summary-meta-label">Tổng Số Bảng Điểm / Lớp</span>
                <span className="summary-meta-val text-slate-800">
                  {gradeSheets.length} Bảng Điểm
                </span>
              </div>
              <div className="summary-meta-item border-l border-slate-200 pl-6">
                <span className="summary-meta-label">Lớp Trọng Điểm</span>
                <span className="summary-meta-val text-emerald-700 font-bold">
                  DH22CS01C (45 SV)
                </span>
              </div>
            </div>

            <button 
              onClick={() => setIsNewSheetModalOpen(true)}
              className="btn-primary"
            >
              <Plus size={16} />
              + Mở Bảng Điểm Lớp Học Phần
            </button>
          </div>

          {/* Card Bảng Điểm & Group By Accordion */}
          <div className="erp-card">
            {/* Filter Header */}
            <div className="erp-card-header flex-wrap gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-[300px]">
                <div className="relative flex-1">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text"
                    placeholder="Tìm theo mã môn, tên môn, lớp (DH22CS01C), giảng viên..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="erp-input pl-9"
                  />
                </div>

                <select 
                  value={filterFaculty}
                  onChange={(e) => setFilterFaculty(e.target.value)}
                  className="erp-input w-40"
                >
                  <option value="ALL">-- Tất Cả Khoa --</option>
                  {faculties.map(f => (
                    <option key={f.id || f.shortCode} value={f.shortCode}>
                      {f.shortCode} - {f.name}
                    </option>
                  ))}
                </select>

                <select 
                  value={filterSemester}
                  onChange={(e) => setFilterSemester(e.target.value)}
                  className="erp-input w-36"
                >
                  <option value="ALL">-- Tất Cả Học Kỳ --</option>
                  <option value="HK1">Học kỳ 1</option>
                  <option value="HK2">Học kỳ 2</option>
                  <option value="HK3">Học kỳ 3</option>
                  <option value="HK4">Học kỳ 4</option>
                </select>
              </div>

              <span className="text-xs text-slate-500">
                Hiển thị <strong>{groupedCourses.length}</strong> môn học
              </span>
            </div>

            {/* Accordion Tree View: Cột Môn Học -> Expand Danh Sách Lớp */}
            <div className="divide-y divide-slate-100">
              {groupedCourses.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  Không tìm thấy môn học hoặc bảng điểm nào phù hợp.
                </div>
              ) : (
                groupedCourses.map(courseGroup => {
                  const isExpanded = expandedCourses.includes(courseGroup.maMon);
                  const totalStudentsInCourse = courseGroup.sheets.reduce((sum, s) => sum + (s.siSo || 45), 0);

                  return (
                    <div key={courseGroup.maMon} className="transition-colors">
                      {/* DÒNG CHA: MÔN HỌC (CLICK ĐỂ EXPAND / COLLAPSE) */}
                      <div 
                        onClick={() => toggleExpand(courseGroup.maMon)}
                        className={`p-4 flex items-center justify-between cursor-pointer transition-all ${
                          isExpanded ? 'bg-emerald-50/60 border-l-4 border-emerald-600' : 'bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <button 
                            type="button" 
                            className="p-1 text-slate-400 hover:text-slate-600 transition-transform"
                          >
                            {isExpanded ? <ChevronDown size={18} className="text-emerald-700" /> : <ChevronRight size={18} />}
                          </button>

                          <span className="font-mono text-xs font-bold text-emerald-900 bg-white border border-emerald-200 px-2 py-0.5 rounded shadow-sm">
                            {courseGroup.maMon}
                          </span>

                          <div>
                            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                              {courseGroup.tenMon}
                              <span className="text-xs font-normal text-slate-500">
                                ({courseGroup.soTC} Tín chỉ • {courseGroup.nhom})
                              </span>
                            </h4>
                            <p className="text-[11px] text-slate-500">
                              Khoa phụ trách: <span className="font-semibold text-slate-700">{courseGroup.tenKhoa || courseGroup.maKhoa}</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="badge-pill success text-xs">
                            <Users size={12} />
                            {courseGroup.sheets.length} Lớp đang học ({totalStudentsInCourse} SV)
                          </span>
                        </div>
                      </div>

                      {/* DÒNG CON: DANH SÁCH BẢNG ĐIỂM CỦA CÁC LỚP CÓ HỌC MÔN ĐÓ */}
                      {isExpanded && (
                        <div className="bg-slate-50/80 p-4 pl-12 border-t border-slate-100">
                          <div className="erp-table-wrapper bg-white shadow-sm">
                            <table className="erp-table">
                              <thead>
                                <tr>
                                  <th style={{ width: '45px' }}>#</th>
                                  <th>Mã Bảng Điểm (Tự Sinh)</th>
                                  <th>Lớp Học Phần</th>
                                  <th>Giảng Viên Phụ Trách</th>
                                  <th>Học Kỳ</th>
                                  <th>Sĩ Số</th>
                                  <th>Tiến Độ Nhập Điểm</th>
                                  <th>Trạng Thái</th>
                                  <th style={{ textAlign: 'center', width: '130px' }}>Hành Động</th>
                                </tr>
                              </thead>
                              <tbody>
                                {courseGroup.sheets.map((sheet, sIdx) => {
                                  const isCompleted = sheet.trangThai === 'COMPLETED';
                                  const isInProgress = sheet.trangThai === 'IN_PROGRESS';

                                  return (
                                    <tr key={sheet.id}>
                                      <td className="text-slate-400 font-mono text-center text-xs">
                                        {sIdx + 1}
                                      </td>
                                      <td>
                                        <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                                          {sheet.code || sheet.id}
                                        </span>
                                      </td>
                                      <td>
                                        <div>
                                          <p className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                                            {sheet.maLop}
                                            {sheet.maLop === 'DH22CS01C' && (
                                              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-px rounded">
                                                Lớp Trọng Điểm
                                              </span>
                                            )}
                                          </p>
                                          <p className="text-[11px] text-slate-500">{sheet.khoaHoc}</p>
                                        </div>
                                      </td>
                                      <td>
                                        <div className="text-xs">
                                          <p className="font-semibold text-slate-800">{sheet.giangVien}</p>
                                          <p className="text-slate-400">{sheet.emailGV}</p>
                                        </div>
                                      </td>
                                      <td>
                                        <span className="font-semibold text-xs text-slate-700">
                                          {sheet.hocKy}
                                        </span>
                                      </td>
                                      <td>
                                        <span className="font-bold text-xs text-slate-800">
                                          {sheet.siSo || 45} SV
                                        </span>
                                      </td>
                                      <td>
                                        <div className="w-28 space-y-1">
                                          <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                                            <span>Tiến độ</span>
                                            <span>{isCompleted ? '100%' : isInProgress ? '65%' : '0%'}</span>
                                          </div>
                                          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                            <div 
                                              className={`h-full ${isCompleted ? 'bg-emerald-600' : isInProgress ? 'bg-amber-500' : 'bg-slate-300'}`}
                                              style={{ width: isCompleted ? '100%' : isInProgress ? '65%' : '0%' }}
                                            />
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        {isCompleted ? (
                                          <span className="badge-pill success">
                                            <CheckCircle2 size={11} /> Đã hoàn tất
                                          </span>
                                        ) : isInProgress ? (
                                          <span className="badge-pill warning">
                                            Đang nhập
                                          </span>
                                        ) : (
                                          <span className="badge-pill neutral">
                                            Chưa nhập
                                          </span>
                                        )}
                                      </td>
                                      <td>
                                        <div className="flex items-center justify-center gap-1.5">
                                          {canEditSheet(sheet) ? (
                                            <button
                                              onClick={() => handleOpenGradeEntry(sheet)}
                                              className="btn-primary text-xs py-1 px-2.5 flex items-center gap-1.5"
                                              title="Nhập và chỉnh sửa điểm học phần"
                                            >
                                              <Edit3 size={13} />
                                              Nhập Điểm
                                            </button>
                                          ) : (
                                            <button
                                              onClick={() => handleOpenGradeEntry(sheet)}
                                              className="px-2.5 py-1 text-xs rounded-lg border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 font-medium transition-colors"
                                              title="Xem điểm số (Chỉ giảng viên phụ trách môn này mới được chỉnh sửa)"
                                            >
                                              <Eye size={13} />
                                              Xem Điểm
                                            </button>
                                          )}
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}

      {/* ============================================================ */}
      {/* CHẾ ĐỘ 2: WORKSPACE NHẬP ĐIỂM CHI TIẾT                       */}
      {/* ============================================================ */}
      {viewMode === 'entry' && activeSheet && (
        <div className="space-y-4">
          {/* Top Bar Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setViewMode('list')}
              className="btn-outline text-xs py-1.5 px-3 flex items-center gap-1.5"
            >
              <ArrowLeft size={14} />
              ← Quay lại Danh sách Bảng Điểm
            </button>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => alert('Xuất bảng điểm Excel chuẩn Cổng Đào Tạo OU...')}
                className="btn-outline text-xs py-1.5"
              >
                <Download size={14} /> Tải Mẫu Excel
              </button>
              {canEditSheet(activeSheet) ? (
                <>
                  <button 
                    onClick={() => alert('Import bảng điểm Excel thành công!')}
                    className="btn-outline text-xs py-1.5"
                  >
                    <Upload size={14} /> Import Excel
                  </button>
                  <button 
                    onClick={handleSaveGrades}
                    className="btn-primary text-xs py-1.5 px-4"
                  >
                    <Save size={14} /> Lưu Bảng Điểm
                  </button>
                </>
              ) : (
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                  <AlertCircle size={14} /> Chế độ chỉ xem
                </span>
              )}
            </div>
          </div>

          {/* Alert thông báo chỉ xem */}
          {!canEditSheet(activeSheet) && (
            <div className="p-3 bg-amber-50 border border-amber-300 text-amber-900 rounded-xl text-xs font-semibold flex items-center gap-2">
              <AlertCircle size={16} className="text-amber-700 flex-shrink-0" />
              <span>
                <strong>Chế độ Chỉ Xem:</strong> Bảng điểm này do giảng viên <strong>{activeSheet.giangVien}</strong> phụ trách giảng dạy. Bạn không có quyền chỉnh sửa điểm số môn/lớp này.
              </span>
            </div>
          )}

          {/* Alert thông báo lưu */}
          {saveAlert && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-md text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-700" />
              Đã lưu thành công bảng điểm môn {activeSheet.tenMon} ({activeSheet.maMon}) cho lớp {activeSheet.maLop}! Kết quả GPA tích lũy đã được đồng bộ tự động.
            </div>
          )}

          {/* Banner Thông Tin Môn & Lớp Đang Nhập */}
          <div className="summary-banner">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  {activeSheet.code || activeSheet.id}
                </span>
                <span className="badge-pill success text-xs">
                  Lớp {activeSheet.maLop}
                </span>
                <span className="badge-pill neutral text-xs">
                  {activeSheet.hocKy} ({activeSheet.namHoc})
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Môn: {activeSheet.tenMon} ({activeSheet.maMon} - {activeSheet.soTC} Tín chỉ)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Giảng viên: <strong>{activeSheet.giangVien}</strong> • Tỷ lệ đánh giá: <strong>QT 40% — Thi 60%</strong> (Chuẩn OU)
              </p>
            </div>

            <div className="flex items-center gap-6 border-l border-slate-200 pl-6 text-right">
              <div className="summary-meta-item">
                <span className="summary-meta-label">Sĩ Số</span>
                <span className="summary-meta-val text-lg text-slate-900">{gradeRows.length} SV</span>
              </div>
              <div className="summary-meta-item">
                <span className="summary-meta-label">Đạt Môn</span>
                <span className="summary-meta-val text-lg text-emerald-700">
                  {gradeRows.filter(r => r.pass).length} SV
                </span>
              </div>
              <div className="summary-meta-item">
                <span className="summary-meta-label">Rớt Môn (F)</span>
                <span className="summary-meta-val text-lg text-red-600">
                  {gradeRows.filter(r => r.pass === false).length} SV
                </span>
              </div>
            </div>
          </div>

          {/* Bảng Nhập Điểm Cho Từng Sinh Viên */}
          <div className="erp-card">
            <div className="erp-card-header">
              <div className="relative w-80">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Tìm sinh viên theo tên hoặc MSSV..."
                  value={searchStudentInSheet}
                  onChange={(e) => setSearchStudentInSheet(e.target.value)}
                  className="erp-input pl-9"
                />
              </div>

              <span className="text-xs text-slate-500">
                Công thức: <strong>Điểm TK10 = QT &times; 0.4 + Thi &times; 0.6</strong> (Làm tròn 1 chữ số thập phân)
              </span>
            </div>

            <div className="erp-table-wrapper border-0 rounded-none">
              <table className="erp-table">
                <thead>
                  <tr>
                    <th style={{ width: '45px' }}>STT</th>
                    <th style={{ width: '130px' }}>MSSV</th>
                    <th>Họ và Tên Sinh Viên</th>
                    <th style={{ width: '120px' }}>Điểm QT (40%)</th>
                    <th style={{ width: '120px' }}>Điểm Thi (60%)</th>
                    <th style={{ width: '120px' }}>Tổng Kết (10)</th>
                    <th style={{ width: '100px' }}>Điểm Chữ</th>
                    <th style={{ width: '90px' }}>Thang 4</th>
                    <th style={{ width: '110px' }}>Kết Quả</th>
                  </tr>
                </thead>
                <tbody>
                  {gradeRows
                    .filter(r => 
                      !searchStudentInSheet.trim() || 
                      r.hoTen.toLowerCase().includes(searchStudentInSheet.toLowerCase()) ||
                      r.maSV.includes(searchStudentInSheet)
                    )
                    .map((row, idx) => (
                      <tr key={row.maSV}>
                        <td className="text-slate-400 font-mono text-center text-xs">{idx + 1}</td>
                        <td className="font-mono font-semibold text-slate-800 text-xs">{row.maSV}</td>
                        <td>
                          <span className="font-semibold text-slate-900 text-xs">{row.hoTen}</span>
                        </td>
                        <td>
                          <input 
                            type="number"
                            step="0.1"
                            min="0"
                            max="10"
                            disabled={!canEditSheet(activeSheet)}
                            value={row.diemQT !== null ? row.diemQT : ''}
                            onChange={(e) => handleScoreChange(row.maSV, 'diemQT', e.target.value)}
                            className={`erp-input w-20 py-1 text-center font-bold ${!canEditSheet(activeSheet) ? 'bg-slate-100 cursor-not-allowed text-slate-500 border-dashed' : ''}`}
                          />
                        </td>
                        <td>
                          <input 
                            type="number"
                            step="0.1"
                            min="0"
                            max="10"
                            disabled={!canEditSheet(activeSheet)}
                            value={row.diemThi !== null ? row.diemThi : ''}
                            onChange={(e) => handleScoreChange(row.maSV, 'diemThi', e.target.value)}
                            className={`erp-input w-20 py-1 text-center font-bold ${!canEditSheet(activeSheet) ? 'bg-slate-100 cursor-not-allowed text-slate-500 border-dashed' : ''}`}
                          />
                        </td>
                        <td>
                          <span className={`font-bold text-sm ${row.diemTK10 < 4.0 ? 'text-red-600' : 'text-slate-900'}`}>
                            {row.diemTK10 !== null ? row.diemTK10 : '—'}
                          </span>
                        </td>
                        <td>
                          <span className={`badge-pill ${row.letter === 'F' ? 'danger' : 'neutral'} font-bold`}>
                            {row.letter}
                          </span>
                        </td>
                        <td>
                          <span className="font-mono text-xs font-semibold text-slate-700">
                            {row.grade4 !== null ? row.grade4.toFixed(1) : '—'}
                          </span>
                        </td>
                        <td>
                          {row.pass === true ? (
                            <span className="badge-pill success">Đạt</span>
                          ) : row.pass === false ? (
                            <span className="badge-pill danger">Rớt</span>
                          ) : (
                            <span className="badge-pill neutral">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL MỞ BẢNG ĐIỂM MỚI (RULE SIMPLE NHẤT)                    */}
      {/* ============================================================ */}
      {isNewSheetModalOpen && (
        <div className="erp-modal-overlay">
          <div className="erp-modal-content">
            <div className="erp-modal-header">
              <h3 className="erp-modal-title flex items-center gap-2">
                <FileSpreadsheet size={18} className="text-emerald-700" />
                Mở Bảng Điểm Lớp Học Phần Mới
              </h3>
              <button onClick={() => setIsNewSheetModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateSheet}>
              <div className="erp-modal-body space-y-4">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-900">
                  Mã bảng điểm sẽ tự sinh tự động theo quy chuẩn: <strong>BD-[Mã Lớp]-[Mã Môn]</strong>.
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      1. Chọn Học Phần / Môn Học (*)
                    </label>
                    <select
                      value={newSheetData.maMon}
                      onChange={(e) => setNewSheetData({ ...newSheetData, maMon: e.target.value })}
                      className="erp-input font-medium"
                      required
                    >
                      <option value="COSC1301">COSC1301 - Nhập môn lập trình (3 TC)</option>
                      <option value="COSC2301">COSC2301 - Cấu trúc dữ liệu & giải thuật (3 TC)</option>
                      <option value="COSC2302">COSC2302 - Cơ sở dữ liệu (3 TC)</option>
                      <option value="COSC2303">COSC2303 - Lập trình hướng đối tượng (3 TC)</option>
                      <option value="ACCT1301">ACCT1301 - Nguyên lý kế toán (3 TC - FAAF)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      2. Chọn Lớp Học Phần (*)
                    </label>
                    <select
                      value={newSheetData.maLop}
                      onChange={(e) => setNewSheetData({ ...newSheetData, maLop: e.target.value })}
                      className="erp-input font-medium"
                      required
                    >
                      <option value="DH22CS01C">DH22CS01C - ĐH Khoa học máy tính 01C (45 SV)</option>
                      <option value="DH22CS02C">DH22CS02C - ĐH Khoa học máy tính 02C (42 SV)</option>
                      <option value="DH21IT01">DH21IT01 - ĐH Công nghệ thông tin 01 (38 SV)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      3. Giảng Viên Phụ Trách (*)
                    </label>
                    <input 
                      type="text"
                      placeholder="VD: TS. Lê Xuân Vĩnh"
                      value={newSheetData.giangVien}
                      onChange={(e) => setNewSheetData({ ...newSheetData, giangVien: e.target.value })}
                      className="erp-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      4. Học Kỳ Nhập Điểm
                    </label>
                    <select
                      value={newSheetData.hocKy}
                      onChange={(e) => setNewSheetData({ ...newSheetData, hocKy: e.target.value })}
                      className="erp-input"
                    >
                      <option value="HK1">Học kỳ 1 (2023 - 2024)</option>
                      <option value="HK2">Học kỳ 2 (2023 - 2024)</option>
                      <option value="HK3">Học kỳ 3 (2023 - 2024)</option>
                      <option value="HK4">Học kỳ 4 (2023 - 2024)</option>
                    </select>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-100 rounded text-xs text-slate-600 font-mono">
                  Mã dự kiến: <strong>BD-{newSheetData.maLop}-{newSheetData.maMon}</strong>
                </div>
              </div>

              <div className="erp-modal-footer">
                <button 
                  type="button" 
                  onClick={() => setIsNewSheetModalOpen(false)}
                  className="btn-outline"
                >
                  Hủy Bỏ
                </button>
                <button 
                  type="submit"
                  className="btn-primary"
                >
                  Xác Nhận Mở Bảng Điểm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

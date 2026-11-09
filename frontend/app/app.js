import { OUGradeEngine } from './engine/OUGradeEngine.js';
import { 
  MOCK_FACULTIES,
  MOCK_MAJORS, 
  MOCK_MAJOR_CURRICULUM, 
  MOCK_CLASSES, 
  MOCK_STUDENTS, 
  MOCK_COURSE_GRADES, 
  TOTAL_PROGRAM_CREDITS 
} from './engine/mockData.js';
import {
  getStudentTranscript,
  auditStudentCurriculum,
  simulateStudentPlan
} from './engine/studentAuditHelper.js';

// ============================================================
// APPLICATION STATE
// ============================================================
const state = {
  currentTab: 'tab-warning',
  currentRole: 'CVHT', // 'CVHT' | 'STUDENT' | 'ADMIN'
  currentStudentId: '2151010001', // Nguyễn Văn An default
  
  // 1. Khoa & Ngành (Faculties & Majors Management)
  faculties: JSON.parse(JSON.stringify(MOCK_FACULTIES)),
  selectedFaculty: 'ALL',
  majors: JSON.parse(JSON.stringify(MOCK_MAJORS)),
  selectedMajorCode: '7480201',
  majorSearchText: '',
  majorsViewMode: 'table', // 'table' | 'grid'
  activeMajorSubtab: 'curriculum', // 'curriculum' | 'classes'

  // 2. Chương trình đào tạo ngành (Curriculum: Môn học & Tín chỉ)
  curriculumByMajor: JSON.parse(JSON.stringify(MOCK_MAJOR_CURRICULUM)),
  wsCurriculumSemester: 'ALL',
  wsCurriculumSearch: '',

  // 3. Lớp học & Danh sách sinh viên
  classes: JSON.parse(JSON.stringify(MOCK_CLASSES)),
  selectedClassCode: 'DH21IT01',
  wsStudentSearch: '',
  students: JSON.parse(JSON.stringify(MOCK_STUDENTS)),

  // 4. Quản lý Bảng điểm (Lớp học phần & Giảng viên)
  courseGrades: JSON.parse(JSON.stringify(MOCK_COURSE_GRADES)),
  gradeSheetsViewMode: 'list', // 'list' | 'detail'
  gradeSheetsList: [
    { id: 'GS_DH21IT01_COSC2302', maLop: 'DH21IT01', tenLop: 'ĐH CNTT Khóa 2021 - Lớp 01', khoaHoc: '2021 - 2025', maNganh: '7480201', tenNganh: 'Công nghệ thông tin', maKhoa: 'FIT', tenKhoa: 'Khoa Công nghệ thông tin', maMon: 'COSC2302', tenMon: 'Cơ sở dữ liệu', soTC: 3, nhom: 'Cơ sở ngành', giangVien: 'TS. Đỗ Hồng Quân', emailGV: 'quan.dh@ou.edu.vn', hocKy: 'HK3', namHoc: '2023 - 2024', trangThai: 'COMPLETED', ngayCapNhat: '02/11/2024' },
    { id: 'GS_DH21IT01_COSC2301', maLop: 'DH21IT01', tenLop: 'ĐH CNTT Khóa 2021 - Lớp 01', khoaHoc: '2021 - 2025', maNganh: '7480201', tenNganh: 'Công nghệ thông tin', maKhoa: 'FIT', tenKhoa: 'Khoa Công nghệ thông tin', maMon: 'COSC2301', tenMon: 'Cấu trúc dữ liệu và giải thuật', soTC: 3, nhom: 'Cơ sở ngành', giangVien: 'ThS. Nguyễn Hoàng Nam', emailGV: 'nam.nh@ou.edu.vn', hocKy: 'HK3', namHoc: '2023 - 2024', trangThai: 'COMPLETED', ngayCapNhat: '01/11/2024' },
    { id: 'GS_DH21IT02_COSC2303', maLop: 'DH21IT02', tenLop: 'ĐH CNTT Khóa 2021 - Lớp 02', khoaHoc: '2021 - 2025', maNganh: '7480201', tenNganh: 'Công nghệ thông tin', maKhoa: 'FIT', tenKhoa: 'Khoa Công nghệ thông tin', maMon: 'COSC2303', tenMon: 'Lập trình hướng đối tượng', soTC: 3, nhom: 'Cơ sở ngành', giangVien: 'TS. Trần Thị Bích', emailGV: 'bich.tt@ou.edu.vn', hocKy: 'HK3', namHoc: '2023 - 2024', trangThai: 'COMPLETED', ngayCapNhat: '30/10/2024' },
    { id: 'GS_DH22IT01_COSC1302', maLop: 'DH22IT01', tenLop: 'ĐH CNTT Khóa 2022 - Lớp 01', khoaHoc: '2022 - 2026', maNganh: '7480201', tenNganh: 'Công nghệ thông tin', maKhoa: 'FIT', tenKhoa: 'Khoa Công nghệ thông tin', maMon: 'COSC1302', tenMon: 'Kỹ thuật lập trình', soTC: 3, nhom: 'Cơ sở ngành', giangVien: 'ThS. Lê Văn Dũng', emailGV: 'dung.lv@ou.edu.vn', hocKy: 'HK3', namHoc: '2023 - 2024', trangThai: 'IN_PROGRESS', ngayCapNhat: '28/10/2024' },
    { id: 'GS_DH21SE01_COSC1301', maLop: 'DH21SE01', tenLop: 'ĐH Kỹ thuật phần mềm 2021 - Lớp 01', khoaHoc: '2021 - 2025', maNganh: '7480103', tenNganh: 'Kỹ thuật phần mềm', maKhoa: 'FIT', tenKhoa: 'Khoa Công nghệ thông tin', maMon: 'COSC1301', tenMon: 'Nhập môn lập trình', soTC: 3, nhom: 'Cơ sở ngành', giangVien: 'TS. Phạm Minh Tuấn', emailGV: 'tuan.pm@ou.edu.vn', hocKy: 'HK3', namHoc: '2023 - 2024', trangThai: 'IN_PROGRESS', ngayCapNhat: '26/10/2024' },
    { id: 'GS_DH21IS01_MATH1301', maLop: 'DH21IS01', tenLop: 'ĐH Hệ thống thông tin 2021 - Lớp 01', khoaHoc: '2021 - 2025', maNganh: '7480104', tenNganh: 'Hệ thống thông tin', maKhoa: 'FIT', tenKhoa: 'Khoa Công nghệ thông tin', maMon: 'MATH1301', tenMon: 'Đại số tuyến tính', soTC: 3, nhom: 'Đại cương', giangVien: 'ThS. Đỗ Văn Hùng', emailGV: 'hung.dv@ou.edu.vn', hocKy: 'HK3', namHoc: '2023 - 2024', trangThai: 'PENDING', ngayCapNhat: 'Chưa cập nhật' },
    { id: 'GS_DH21KT01_ACCT1301', maLop: 'DH21KT01', tenLop: 'ĐH Kế toán Khóa 2021 - Lớp 01', khoaHoc: '2021 - 2025', maNganh: '7340301', tenNganh: 'Kế toán', maKhoa: 'FAAF', tenKhoa: 'Khoa Kế toán - Kiểm toán', maMon: 'ACCT1301', tenMon: 'Nguyên lý kế toán', soTC: 3, nhom: 'Cơ sở ngành', giangVien: 'TS. Nguyễn Hữu Duyên', emailGV: 'duyen.nh@ou.edu.vn', hocKy: 'HK3', namHoc: '2023 - 2024', trangThai: 'COMPLETED', ngayCapNhat: '25/10/2024' },
    { id: 'GS_DH21AU01_AUDT2301', maLop: 'DH21AU01', tenLop: 'ĐH Kiểm toán Khóa 2021 - Lớp 01', khoaHoc: '2021 - 2025', maNganh: '7340302', tenNganh: 'Kiểm toán', maKhoa: 'FAAF', tenKhoa: 'Khoa Kế toán - Kiểm toán', maMon: 'AUDT2301', tenMon: 'Kiểm toán căn bản', soTC: 3, nhom: 'Chuyên ngành', giangVien: 'ThS. Đinh Thị Lan', emailGV: 'lan.dt@ou.edu.vn', hocKy: 'HK3', namHoc: '2023 - 2024', trangThai: 'IN_PROGRESS', ngayCapNhat: '24/10/2024' },
    { id: 'GS_DH21BA01_MGMT1301', maLop: 'DH21BA01', tenLop: 'ĐH Quản trị kinh doanh 2021 - Lớp 01', khoaHoc: '2021 - 2025', maNganh: '7340101', tenNganh: 'Quản trị kinh doanh', maKhoa: 'FBA', tenKhoa: 'Khoa Quản trị kinh doanh', maMon: 'MGMT1301', tenMon: 'Nguyên lý quản trị', soTC: 3, nhom: 'Cơ sở ngành', giangVien: 'TS. Trần Đình Cường', emailGV: 'cuong.td@ou.edu.vn', hocKy: 'HK3', namHoc: '2023 - 2024', trangThai: 'COMPLETED', ngayCapNhat: '20/10/2024' },
    { id: 'GS_DH21EC01_ECON1301', maLop: 'DH21EC01', tenLop: 'ĐH Kinh tế học Khóa 2021 - Lớp 01', khoaHoc: '2021 - 2025', maNganh: '7310101', tenNganh: 'Kinh tế học', maKhoa: 'FECO', tenKhoa: 'Khoa Kinh tế và Quản lý công', maMon: 'ECON1301', tenMon: 'Kinh tế vi mô 1', soTC: 3, nhom: 'Đại cương', giangVien: 'PGS.TS. Nguyễn Văn Hùng', emailGV: 'hung.nv@ou.edu.vn', hocKy: 'HK3', namHoc: '2023 - 2024', trangThai: 'COMPLETED', ngayCapNhat: '18/10/2024' }
  ],
  listFilterFaculty: 'ALL',
  listFilterMajor: 'ALL',
  listFilterClass: 'ALL',
  listFilterSemester: 'ALL',
  listFilterStatus: 'ALL',
  listSearchQuery: '',
  selectedGradeFaculty: 'FIT',
  selectedGradeMajor: '7480201',
  selectedGradeClass: 'DH21IT01',
  selectedGradeCourse: 'COSC2302',
  selectedGradeSemester: 'HK3',
  gradeStudentSearch: '',
  wQT: 0.4,
  wThi: 0.6,

  // 5. Cảnh báo sớm (Hỗ trợ phân cấp theo Ngành & Lớp)
  selectedWarningFilter: 'ALL',
  warningSelectedMajor: 'ALL',
  warningSelectedClass: 'ALL',
  activeModalStudent: null,

  // 6. Mô phỏng học tập & audit CTĐT
  simActiveSubtab: 'audit', // 'audit' | 'transcript' | 'simulate'
  simItems: []
};

// ============================================================
// INITIALIZATION
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  setupSidebarNavigation();
  setupUserSimulator();
  setupTab1EarlyWarning();
  setupTab2SmartPlanner();
  setupFacultyMajorManagement();
  setupTab5CourseGrades();
  setupQuickGuide();
});

// ============================================================
// 1. SIDEBAR NAVIGATION & ROUTING
// ============================================================
function setupSidebarNavigation() {
  const navBtns = document.querySelectorAll('.nav-item-btn');
  
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });
}

function switchTab(tabId) {
  state.currentTab = tabId;

  // Update nav buttons
  document.querySelectorAll('.nav-item-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-tab') === tabId);
  });

  // Update visible pane
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.toggle('active', pane.id === tabId);
  });

  // Update Breadcrumb title
  const bcTitles = {
    'tab-warning': 'Cảnh Báo Sớm Nguy Cơ Học Tập (Thông tư 08/2021)',
    'tab-planner': 'Smart Academic Planner (Kế hoạch học tập cá nhân)',
    'tab-faculties-majors': 'Quản Lý Khoa, Ngành & Cơ Cấu Đào Tạo (OU EduAlert)',
    'tab-course-grades': 'Quản Lý Điểm Học Phần Theo Môn & Ngành'
  };
  const bcElement = document.getElementById('bc-current-title');
  if (bcElement) {
    bcElement.textContent = bcTitles[tabId] || 'Hệ thống EduAlert';
  }

  // Refresh view data if needed
  if (tabId === 'tab-faculties-majors') renderFacultyMajorManagement();
  if (tabId === 'tab-course-grades') renderCourseGradesTable();
  if (tabId === 'tab-planner') renderTab2SmartPlanner();
}

// ============================================================
// 2. USER SIMULATOR (GIẢ LẬP NGƯỜI DÙNG BÊN SIDEBAR)
// ============================================================
function setupUserSimulator() {
  const btnCVHT = document.getElementById('sim-role-cvht');
  const btnStudent = document.getElementById('sim-role-student');
  const btnAdmin = document.getElementById('sim-role-admin');

  const avatarEl = document.getElementById('sim-persona-avatar');
  const nameEl = document.getElementById('sim-persona-name');
  const descEl = document.getElementById('sim-persona-desc');
  const tagEl = document.getElementById('sim-active-role-tag');
  
  const studentPickerContainer = document.getElementById('sim-student-picker-container');
  const studentSelectDropdown = document.getElementById('sim-student-select');

  const topbarAvatar = document.getElementById('topbar-avatar');
  const topbarName = document.getElementById('topbar-name');

  // Populate student selector
  studentSelectDropdown.innerHTML = state.students.map(s => 
    `<option value="${s.maSV}">${s.maSV} - ${s.hoTen} (${s.levelText || 'Bình thường'})</option>`
  ).join('');

  function setPersona(role) {
    state.currentRole = role;
    btnCVHT.classList.toggle('active', role === 'CVHT');
    btnStudent.classList.toggle('active', role === 'STUDENT');
    btnAdmin.classList.toggle('active', role === 'ADMIN');

    if (role === 'CVHT') {
      avatarEl.textContent = 'CV';
      nameEl.textContent = 'ThS. Nguyễn Hoàng Nam';
      descEl.textContent = 'Cố vấn học tập · Khoa CNTT';
      tagEl.textContent = 'CVHT';
      studentPickerContainer.style.display = 'none';

      topbarAvatar.textContent = 'CV';
      topbarName.textContent = 'ThS. Nguyễn Hoàng Nam (CVHT)';
    } else if (role === 'STUDENT') {
      avatarEl.textContent = 'SV';
      tagEl.textContent = 'Sinh Viên';
      studentPickerContainer.style.display = 'block';
      updateActiveStudentPersona();
    } else if (role === 'ADMIN') {
      avatarEl.textContent = 'KH';
      nameEl.textContent = 'TS. Trần Minh Trí';
      descEl.textContent = 'Phó Trưởng Khoa CNTT';
      tagEl.textContent = 'Khoa';
      studentPickerContainer.style.display = 'none';

      topbarAvatar.textContent = 'KH';
      topbarName.textContent = 'Ban Chủ Nhiệm Khoa';
    }
  }

  function updateActiveStudentPersona() {
    const student = state.students.find(s => s.maSV === state.currentStudentId) || state.students[0];
    if (student) {
      nameEl.textContent = student.hoTen;
      descEl.textContent = `MSSV: ${student.maSV} · Lớp: ${student.lop}`;

      topbarAvatar.textContent = '🎓';
      topbarName.textContent = `${student.hoTen} (${student.maSV})`;

      document.getElementById('sim-quick-gpa').textContent = student.gpaTL !== undefined ? student.gpaTL.toFixed(2) : '3.10';
      document.getElementById('sim-quick-debt').textContent = `${student.tcNo || 0} TC`;

      const badgeEl = document.getElementById('sim-quick-badge');
      badgeEl.className = `badge ${student.levelBadge || 'badge-success'}`;
      badgeEl.textContent = student.levelText || 'Bình thường';
    }
  }

  btnCVHT.addEventListener('click', () => {
    setPersona('CVHT');
    switchTab('tab-warning');
  });

  btnStudent.addEventListener('click', () => {
    setPersona('STUDENT');
    switchTab('tab-planner');
  });

  btnAdmin.addEventListener('click', () => {
    setPersona('ADMIN');
    switchTab('tab-curriculum-crud');
  });

  studentSelectDropdown.addEventListener('change', (e) => {
    state.currentStudentId = e.target.value;
    updateActiveStudentPersona();
    renderTab2SmartPlanner();
  });

  // Default setup
  setPersona('CVHT');
}

// ============================================================
// 3. TAB 1: CẢNH BÁO SỚM NGUY CƠ (CVHT)
// ============================================================
function setupTab1EarlyWarning() {
  const majorSelect = document.getElementById('warning-major-filter');
  const classSelect = document.getElementById('warning-class-filter');
  const levelSelect = document.getElementById('warning-level-filter');
  const btnExport = document.getElementById('btn-export-warning-list');

  // Populate major dropdown
  if (majorSelect) {
    let majorHtml = `<option value="ALL">-- Tất Cả Các Ngành (${state.majors.length} ngành) --</option>`;
    state.majors.forEach(m => {
      majorHtml += `<option value="${m.maNganh}">${m.tenNganh} (${m.maNganh})</option>`;
    });
    majorSelect.innerHTML = majorHtml;

    majorSelect.addEventListener('change', (e) => {
      state.warningSelectedMajor = e.target.value;
      state.warningSelectedClass = 'ALL';
      updateWarningClassOptions();
      renderEarlyWarningTable();
    });
  }

  function updateWarningClassOptions() {
    if (!classSelect) return;
    if (state.warningSelectedMajor === 'ALL') {
      let classHtml = `<option value="ALL">-- Tất Cả Các Lớp (Xem chung toàn trường) --</option>`;
      state.classes.forEach(c => {
        classHtml += `<option value="${c.maLop}">Lớp ${c.maLop} - ${c.tenLop}</option>`;
      });
      classSelect.innerHTML = classHtml;
    } else {
      const filteredClasses = state.classes.filter(c => c.maNganh === state.warningSelectedMajor);
      let classHtml = `<option value="ALL">-- Xem Chung Tất Cả Lớp Thuộc Ngành (${filteredClasses.length} lớp) --</option>`;
      filteredClasses.forEach(c => {
        classHtml += `<option value="${c.maLop}">Lớp ${c.maLop} - ${c.tenLop}</option>`;
      });
      classSelect.innerHTML = classHtml;
    }
  }

  updateWarningClassOptions();

  if (classSelect) {
    classSelect.addEventListener('change', (e) => {
      state.warningSelectedClass = e.target.value;
      renderEarlyWarningTable();
    });
  }

  if (levelSelect) {
    levelSelect.addEventListener('change', (e) => {
      state.selectedWarningFilter = e.target.value;
      renderEarlyWarningTable();
    });
  }

  if (btnExport) {
    btnExport.addEventListener('click', () => {
      alert('Đã xuất báo cáo cảnh báo học vụ chuẩn Thông tư 08/2021!');
    });
  }

  // Modal close
  document.getElementById('close-modal-btn')?.addEventListener('click', () => {
    document.getElementById('student-dossier-modal')?.classList.remove('active');
  });

  // Save counseling note
  document.getElementById('btn-save-counseling')?.addEventListener('click', () => {
    const status = document.getElementById('counseling-status-select').value;
    const note = document.getElementById('counseling-note-input').value.trim();
    if (!note) {
      alert('Vui lòng nhập nội dung buổi tư vấn/can thiệp!');
      return;
    }

    if (state.activeModalStudent) {
      if (!state.activeModalStudent.counselingLog) state.activeModalStudent.counselingLog = [];
      const today = new Date().toLocaleDateString('vi-VN');
      state.activeModalStudent.counselingLog.unshift({
        date: today,
        status: status,
        note: note
      });
      document.getElementById('counseling-note-input').value = '';
      renderCounselingHistory(state.activeModalStudent);
      alert('Đã lưu thành công biên bản tư vấn vào sổ tay cố vấn học tập!');
    }
  });

  renderEarlyWarningTable();
}

function renderEarlyWarningTable() {
  const tbody = document.getElementById('early-warning-table-body');
  if (!tbody) return;

  let filtered = state.students;

  // Filter by major
  if (state.warningSelectedMajor !== 'ALL') {
    filtered = filtered.filter(s => s.maNganh === state.warningSelectedMajor);
  }

  // Filter by class
  if (state.warningSelectedClass !== 'ALL') {
    filtered = filtered.filter(s => s.lop === state.warningSelectedClass);
  }

  // Filter by risk level
  if (state.selectedWarningFilter !== 'ALL') {
    filtered = filtered.filter(s => s.level === state.selectedWarningFilter);
  }

  // Update metrics on top
  const totalScope = state.students.filter(s => 
    (state.warningSelectedMajor === 'ALL' || s.maNganh === state.warningSelectedMajor) &&
    (state.warningSelectedClass === 'ALL' || s.lop === state.warningSelectedClass)
  );

  const hrEl = document.getElementById('metric-high-risk');
  const ewEl = document.getElementById('metric-early-warning');
  if (hrEl) hrEl.textContent = totalScope.filter(s => s.level === 'HIGH_RISK').length;
  if (ewEl) ewEl.textContent = totalScope.filter(s => s.level === 'EARLY_WARNING').length;

  // Sort by riskScore descending
  filtered.sort((a, b) => (b.riskScore || 0) - (a.riskScore || 0));

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="10" style="text-align:center; padding:32px; color:var(--text-dim);">
          Không tìm thấy sinh viên nào trong phạm vi Ngành / Lớp và bộ lọc đã chọn.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map((st, idx) => {
    const rowClass = st.level === 'HIGH_RISK' ? 'highlight-danger' : '';
    const majorObj = state.majors.find(m => m.maNganh === st.maNganh);
    const majorName = majorObj ? majorObj.tenNganh : (st.nganh || st.maNganh);

    return `
      <tr class="${rowClass}">
        <td><strong>${idx + 1}</strong></td>
        <td><code>${st.maSV}</code></td>
        <td><strong>${st.hoTen}</strong></td>
        <td><span class="pill-badge" style="font-size:0.75rem;">${st.lop}</span></td>
        <td><small style="color:var(--text-main); font-weight:600;">${majorName}</small></td>
        <td><strong style="color:${st.gpaTL < 1.6 ? 'var(--danger)' : st.gpaTL < 2.0 ? 'var(--warning-dark)' : 'var(--text-main)'};">${st.gpaTL.toFixed(2)}</strong></td>
        <td><span class="${st.tcNo > 10 ? 'text-danger' : ''}">${st.tcNo} TC</span></td>
        <td>
          <div style="display:flex; align-items:center; gap:8px;">
            <div style="width:55px; height:6px; background:#e2e8f0; border-radius:3px; overflow:hidden;">
              <div style="width:${st.riskScore}%; height:100%; background:${st.riskScore > 75 ? '#dc2626' : st.riskScore > 40 ? '#d97706' : '#059669'};"></div>
            </div>
            <span style="font-weight:700; font-size:0.78rem;">${st.riskScore}%</span>
          </div>
        </td>
        <td><span class="badge ${st.levelBadge}">${st.levelText}</span></td>
        <td style="text-align: right;">
          <div style="display: inline-flex; gap: 6px; justify-content: flex-end;">
            <button class="btn btn-outline-navy btn-sm btn-sim-student" data-id="${st.maSV}" title="Chuyển sang tab Mô phỏng học tập cho sinh viên này" style="display:inline-flex; align-items:center; gap:4px; font-size:0.74rem; padding:4px 8px;">
              <svg class="btn-svg" viewBox="0 0 24 24" style="width:13px; height:13px;"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              Mô Phỏng
            </button>
            <button class="btn btn-outline-navy btn-sm btn-open-dossier" data-id="${st.maSV}" title="Xem hồ sơ học vụ" style="display:inline-flex; align-items:center; gap:4px; font-size:0.74rem; padding:4px 8px;">
              <svg class="btn-svg" viewBox="0 0 24 24" style="width:13px; height:13px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              Hồ Sơ
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  // Attach sim button click
  tbody.querySelectorAll('.btn-sim-student').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const mssv = btn.getAttribute('data-id');
      switchToStudentSimulation(mssv);
    });
  });

  // Attach dossier click
  tbody.querySelectorAll('.btn-open-dossier').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const mssv = btn.getAttribute('data-id');
      const student = state.students.find(s => s.maSV === mssv);
      if (student) openStudentDossierModal(student);
    });
  });
}

function switchToStudentSimulation(mssv) {
  state.currentStudentId = mssv;
  switchTab('tab-planner');
  const inputSearch = document.getElementById('sim-mssv-input');
  if (inputSearch) inputSearch.value = mssv;
  const quickSelect = document.getElementById('sim-student-quick-select');
  if (quickSelect) quickSelect.value = mssv;

  initSimulationItemsForCurrentStudent();
  renderTab2SmartPlanner();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openStudentDossierModal(student) {
  state.activeModalStudent = student;
  const modal = document.getElementById('student-dossier-modal');

  document.getElementById('modal-student-name').textContent = `${student.hoTen} (${student.maSV}) - Lớp ${student.lop}`;
  const badgeEl = document.getElementById('modal-student-badge');
  badgeEl.className = `badge ${student.levelBadge}`;
  badgeEl.textContent = student.levelText;

  // Stamp
  const stampBox = document.getElementById('modal-stamp-badge');
  const stampVerdict = document.getElementById('modal-stamp-text');
  const stampScore = document.getElementById('modal-stamp-score');

  stampScore.textContent = student.riskScore;
  if (student.level === 'HIGH_RISK') {
    stampBox.style.borderColor = '#dc2626';
    stampBox.style.color = '#dc2626';
    stampVerdict.textContent = 'NGUY CƠ CAO';
  } else if (student.level === 'EARLY_WARNING') {
    stampBox.style.borderColor = '#d97706';
    stampBox.style.color = '#d97706';
    stampVerdict.textContent = 'CẢNH BÁO SỚM';
  } else {
    stampBox.style.borderColor = '#059669';
    stampBox.style.color = '#059669';
    stampVerdict.textContent = 'BÌNH THƯỜNG';
  }

  // Evaluate Rule Engine 4 TT08 checks
  const lastSem = (student.historySemesters && student.historySemesters[student.historySemesters.length - 1]) || { tcDK: 14, tcKD: 6, gpaHK: 1.25 };
  const evalResult = OUGradeEngine.evaluateAcademicWarning({
    year: student.namHoc || 3,
    isFirstSem: false,
    semesterCredits: lastSem.tcDK,
    failedCreditsInSem: lastSem.tcKD,
    gpaSem: lastSem.gpaHK,
    gpaCumulative: student.gpaTL,
    debtCreditsTotal: student.tcNo,
    hadPreviousWarning: student.hadPrevWarning || false
  });

  const ruleList = document.getElementById('modal-rule-checks');
  ruleList.innerHTML = evalResult.checks.map(c => `
    <div class="rule-item ${c.hit ? 'hit' : ''}">
      <span class="rule-status-badge ${c.hit ? 'fail' : 'pass'}">${c.hit ? 'Chạm ngưỡng' : 'Đạt'}</span>
      <div>
        <strong>${c.name}</strong>: ${c.desc}
      </div>
    </div>
  `).join('');

  document.getElementById('modal-reason-explain').innerHTML = `
    <strong>Phân tích từ Rule Engine:</strong> ${evalResult.reasonExplain || 'Áp dụng quy chuẩn đánh giá tự động Thông tư 08/2021.'}
  `;

  renderCounselingHistory(student);
  modal.classList.add('active');
}

function renderCounselingHistory(student) {
  const container = document.getElementById('counseling-history-list');
  if (!student.counselingLog || student.counselingLog.length === 0) {
    container.innerHTML = '<p style="font-size:0.8rem; color:var(--text-dim); font-style:italic;">Chưa có biên bản tư vấn nào trước đây.</p>';
    return;
  }
  container.innerHTML = student.counselingLog.map(log => `
    <div class="history-item">
      <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
        <strong>Ngày: ${log.date}</strong>
        <span class="badge badge-warning">${log.status}</span>
      </div>
      <div>${log.note}</div>
    </div>
  `).join('');
}

// ============================================================
// 4. TAB 2: SMART ACADEMIC PLANNER & SIMULATION (TÍNH NĂNG CHUNG)
// ============================================================
function setupTab2SmartPlanner() {
  const btnSearch = document.getElementById('sim-btn-search-mssv');
  const inputSearch = document.getElementById('sim-mssv-input');
  const quickSelect = document.getElementById('sim-student-quick-select');

  // Populate quick select
  if (quickSelect) {
    quickSelect.innerHTML = state.students.map(s => `
      <option value="${s.maSV}" ${s.maSV === state.currentStudentId ? 'selected' : ''}>
        ${s.maSV} — ${s.hoTen} (${s.lop} - ${s.nganh || s.maNganh})
      </option>
    `).join('');

    quickSelect.addEventListener('change', (e) => {
      const mssv = e.target.value;
      state.currentStudentId = mssv;
      if (inputSearch) inputSearch.value = mssv;
      const errEl = document.getElementById('sim-search-error-msg');
      if (errEl) errEl.style.display = 'none';
      initSimulationItemsForCurrentStudent();
      renderTab2SmartPlanner();
    });
  }

  // Handle Search button & enter key
  function performSearch() {
    const query = inputSearch ? inputSearch.value.trim().toLowerCase() : '';
    if (!query) return;

    const found = state.students.find(s => 
      s.maSV.toLowerCase() === query || 
      s.hoTen.toLowerCase().includes(query)
    );

    const errorEl = document.getElementById('sim-search-error-msg');
    if (found) {
      if (errorEl) errorEl.style.display = 'none';
      state.currentStudentId = found.maSV;
      if (quickSelect) quickSelect.value = found.maSV;
      initSimulationItemsForCurrentStudent();
      renderTab2SmartPlanner();
    } else {
      if (errorEl) {
        errorEl.textContent = `Không tìm thấy sinh viên có MSSV hoặc Tên: "${inputSearch.value}". Vui lòng thử các MSSV có sẵn trong danh sách!`;
        errorEl.style.display = 'block';
      }
    }
  }

  if (btnSearch) btnSearch.addEventListener('click', performSearch);
  if (inputSearch) {
    inputSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        performSearch();
      }
    });
  }

  // Subtabs switching (Audit, Transcript, Simulate)
  const btnAudit = document.getElementById('sim-subtab-btn-audit');
  const btnTranscript = document.getElementById('sim-subtab-btn-transcript');
  const btnSimulate = document.getElementById('sim-subtab-btn-simulate');

  function switchSimSubtab(tabName) {
    state.simActiveSubtab = tabName;
    if (btnAudit) btnAudit.classList.toggle('active', tabName === 'audit');
    if (btnTranscript) btnTranscript.classList.toggle('active', tabName === 'transcript');
    if (btnSimulate) btnSimulate.classList.toggle('active', tabName === 'simulate');

    const paneAudit = document.getElementById('sim-pane-audit');
    const paneTranscript = document.getElementById('sim-pane-transcript');
    const paneSimulate = document.getElementById('sim-pane-simulate');

    if (paneAudit) paneAudit.style.display = tabName === 'audit' ? 'block' : 'none';
    if (paneTranscript) paneTranscript.style.display = tabName === 'transcript' ? 'block' : 'none';
    if (paneSimulate) paneSimulate.style.display = tabName === 'simulate' ? 'block' : 'none';
  }

  if (btnAudit) btnAudit.addEventListener('click', () => switchSimSubtab('audit'));
  if (btnTranscript) btnTranscript.addEventListener('click', () => switchSimSubtab('transcript'));
  if (btnSimulate) btnSimulate.addEventListener('click', () => switchSimSubtab('simulate'));

  initSimulationItemsForCurrentStudent();
  renderTab2SmartPlanner();
}

function initSimulationItemsForCurrentStudent() {
  const student = state.students.find(s => s.maSV === state.currentStudentId) || state.students[0];
  if (!student) return;

  const audit = auditStudentCurriculum(student, state.curriculumByMajor);
  if (!audit) return;

  state.simItems = [
    ...audit.failedCourses.map(c => ({
      maMon: c.maMon,
      tenMon: c.tenMon,
      soTC: c.soTC,
      isRetake: true,
      oldGrade4: c.grade4,
      oldLetter: c.letter,
      targetGrade4: 3.0,
      targetLetter: 'B',
      selected: true
    })),
    ...audit.remainingCourses.slice(0, 3).map(c => ({
      maMon: c.maMon,
      tenMon: c.tenMon,
      soTC: c.soTC,
      isRetake: false,
      oldGrade4: 0,
      oldLetter: '-',
      targetGrade4: 3.0,
      targetLetter: 'B',
      selected: true
    }))
  ];
}

function renderTab2SmartPlanner() {
  const student = state.students.find(s => s.maSV === state.currentStudentId) || state.students[0];
  if (!student) return;

  const audit = auditStudentCurriculum(student, state.curriculumByMajor);
  if (!audit) return;

  const studentClass = state.classes.find(c => c.maLop === student.lop) || {
    maLop: student.lop,
    tenLop: `Lớp ${student.lop}`,
    cvht: 'Cố vấn học tập',
    khoaHoc: '2021 - 2025'
  };

  const studentMajor = state.majors.find(m => m.maNganh === student.maNganh) || {
    maNganh: student.maNganh || '7480201',
    tenNganh: student.nganh || 'Công nghệ thông tin',
    tongTC: 141
  };

  // 1. Update Student Banner
  document.getElementById('planner-student-banner-name').textContent = student.hoTen;
  document.getElementById('planner-student-banner-tag').textContent = `Sinh viên Năm ${student.namHoc || 3}`;
  document.getElementById('planner-student-banner-info').innerHTML = `
    Ngành: <strong>${studentMajor.tenNganh} (${studentMajor.maNganh})</strong> | Lớp: <strong>${studentClass.maLop}</strong> (${studentClass.tenLop}) | CVHT: <strong>${studentClass.cvht}</strong>
  `;
  document.getElementById('planner-student-banner-gpa').textContent = student.gpaTL.toFixed(2);
  document.getElementById('planner-student-banner-earned').textContent = `${audit.stats.passedCredits} / ${studentMajor.tongTC || 141} TC`;
  document.getElementById('planner-student-banner-debt').textContent = `${student.tcNo || 0} TC`;
  document.getElementById('planner-student-banner-remaining').textContent = `${audit.stats.remainingCount} môn`;

  // 2. Render Pane 1: Audit CTĐT
  renderSimPaneAudit(student, audit, studentMajor);

  // 3. Render Pane 2: Bảng điểm
  renderSimPaneTranscript(audit);

  // 4. Render Pane 3: Mô phỏng
  renderSimPaneSimulate(student, studentMajor);
}

function renderSimPaneAudit(student, audit, studentMajor) {
  const pane = document.getElementById('sim-pane-audit');
  if (!pane) return;

  pane.innerHTML = `
    <div style="display: flex; flexDirection: column; gap: 16px;">
      <!-- Stats 3 boxes -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">
        <div style="background: var(--success-soft); border: 1px solid var(--success-border); border-radius: 8px; padding: 14px 16px;">
          <span style="font-size: 0.74rem; font-weight: 700; color: var(--success-dark); text-transform: uppercase;">
            🟢 MÔN ĐÃ TÍCH LŨY (ĐẠT)
          </span>
          <div style="font-size: 1.6rem; font-weight: 800; color: var(--success-dark); margin-top: 4px;">
            ${audit.stats.passedCount} môn
          </div>
          <span style="font-size: 0.76rem; color: var(--text-dim);">
            Đã tích lũy ${audit.stats.passedCredits} tín chỉ an toàn
          </span>
        </div>

        <div style="background: ${audit.stats.failedCount > 0 ? 'var(--danger-soft)' : '#f8fafc'}; border: 1px solid ${audit.stats.failedCount > 0 ? 'var(--danger-border)' : '#e2e8f0'}; border-radius: 8px; padding: 14px 16px;">
          <span style="font-size: 0.74rem; font-weight: 700; color: ${audit.stats.failedCount > 0 ? 'var(--danger-dark)' : 'var(--text-dim)'}; text-transform: uppercase;">
            🔴 MÔN BỊ RỚT (F) CẦN TRẢ NỢ
          </span>
          <div style="font-size: 1.6rem; font-weight: 800; color: ${audit.stats.failedCount > 0 ? 'var(--danger)' : 'var(--text-dim)'}; margin-top: 4px;">
            ${audit.stats.failedCount} môn
          </div>
          <span style="font-size: 0.76rem; color: ${audit.stats.failedCount > 0 ? 'var(--danger-dark)' : 'var(--text-dim)'};">
            ${audit.stats.failedCount > 0 ? `Chiếm ${audit.stats.failedCredits} TC nợ đọng cần trả nợ ngay` : 'Không có môn nào bị rớt F'}
          </span>
        </div>

        <div style="background: var(--warning-soft); border: 1px solid var(--warning-border); border-radius: 8px; padding: 14px 16px;">
          <span style="font-size: 0.74rem; font-weight: 700; color: var(--warning-dark); text-transform: uppercase;">
            🟡 MÔN CÒN LẠI TRONG CTĐT
          </span>
          <div style="font-size: 1.6rem; font-weight: 800; color: var(--warning-dark); margin-top: 4px;">
            ${audit.stats.remainingCount} môn
          </div>
          <span style="font-size: 0.76rem; color: var(--text-dim);">
            Cần hoàn tất ${audit.stats.remainingCredits} TC để đủ điều kiện tốt nghiệp
          </span>
        </div>
      </div>

      <!-- Môn rớt (nếu có) -->
      ${audit.failedCourses.length > 0 ? `
        <div class="content-card" style="border: 1px solid var(--danger-border); padding: 16px 20px; border-radius: 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--danger); margin: 0;">
              Danh Sách Môn Bị Rớt (F) Cần Ưu Tiên Đăng Ký Trả Nợ
            </h3>
            <span class="badge badge-danger">Trọng số Thông tư 08</span>
          </div>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width: 40px;">STT</th>
                  <th>Mã Môn</th>
                  <th>Tên Học Phần</th>
                  <th>Số TC</th>
                  <th>Điểm QT</th>
                  <th>Điểm Thi</th>
                  <th>Điểm TK10</th>
                  <th>Điểm Chữ</th>
                  <th>Trạng Thái</th>
                </tr>
              </thead>
              <tbody>
                ${audit.failedCourses.map((c, idx) => `
                  <tr class="highlight-danger">
                    <td>${idx + 1}</td>
                    <td><code>${c.maMon}</code></td>
                    <td><strong>${c.tenMon}</strong></td>
                    <td><span class="badge badge-primary">${c.soTC} TC</span></td>
                    <td>${c.diemQT !== undefined ? c.diemQT.toFixed(1) : '-'}</td>
                    <td>${c.diemThi !== undefined ? c.diemThi.toFixed(1) : '-'}</td>
                    <td><strong style="color: var(--danger);">${c.diemTK10 !== undefined ? c.diemTK10.toFixed(1) : '-'}</strong></td>
                    <td><span class="badge badge-danger">F (0.0)</span></td>
                    <td><strong style="color: var(--danger);">Không Đạt (Rớt môn)</strong></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}

      <!-- Môn còn lại chưa học -->
      <div class="content-card" style="padding: 16px 20px; border-radius: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div>
            <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--text-main); margin: 0;">
              Danh Sách Các Môn Chưa Học Còn Lại Trong CTĐT (${audit.remainingCourses.length} môn)
            </h3>
            <p style="font-size: 0.8rem; color: var(--text-dim); margin: 2px 0 0 0;">
              Chương trình đào tạo ngành ${studentMajor.tenNganh} (Mã ngành: ${studentMajor.maNganh}).
            </p>
          </div>
        </div>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 40px;">STT</th>
                <th>Mã Môn</th>
                <th>Tên Môn Học</th>
                <th>Số TC</th>
                <th>Khối Kiến Thức</th>
                <th>Học Kỳ Dự Kiến</th>
                <th>Tính Chất</th>
                <th>Điều Kiện Tiên Quyết</th>
              </tr>
            </thead>
            <tbody>
              ${audit.remainingCourses.map((c, idx) => `
                <tr>
                  <td>${idx + 1}</td>
                  <td><code>${c.maMon}</code></td>
                  <td><strong>${c.tenMon}</strong></td>
                  <td><span class="badge badge-primary">${c.soTC} TC</span></td>
                  <td>${c.nhom || 'Chuyên ngành'}</td>
                  <td>Học kỳ ${c.hkDuKien}</td>
                  <td>
                    <span class="badge ${c.batBuoc !== false ? 'badge-success' : 'badge-warning'}">
                      ${c.batBuoc !== false ? 'Bắt buộc' : 'Tự chọn'}
                    </span>
                  </td>
                  <td>
                    ${c.tienQuyet ? `<code>${c.tienQuyet}</code>` : '<span style="color: var(--text-dim);">-</span>'}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderSimPaneTranscript(audit) {
  const pane = document.getElementById('sim-pane-transcript');
  if (!pane) return;

  pane.innerHTML = `
    <div class="content-card" style="padding: 16px 20px; border-radius: 10px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <div>
          <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--text-main); margin: 0;">
            Toàn Bộ Bảng Điểm Học Phần Đã Lưu
          </h3>
          <p style="font-size: 0.8rem; color: var(--text-dim); margin: 2px 0 0 0;">
            Quy chế ĐH Mở: Điểm TK10 = 0.4*QT + 0.6*Thi. Điểm mới khi học lại sẽ thay thế điểm cũ.
          </p>
        </div>
        <span class="pill-badge" style="font-weight: 700;">
          Tổng: ${audit.transcript.length} học phần đã lưu
        </span>
      </div>

      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 40px;">STT</th>
              <th>Mã Môn</th>
              <th>Tên Môn Học</th>
              <th>Số TC</th>
              <th>Điểm QT (40%)</th>
              <th>Điểm Thi (60%)</th>
              <th>Điểm TK10</th>
              <th>Điểm Chữ</th>
              <th>Thang 4</th>
              <th>Kết Quả</th>
            </tr>
          </thead>
          <tbody>
            ${audit.transcript.map((c, idx) => `
              <tr class="${!c.pass ? 'highlight-danger' : ''}">
                <td>${idx + 1}</td>
                <td><code>${c.maMon}</code></td>
                <td><strong>${c.tenMon}</strong></td>
                <td><span class="badge badge-primary">${c.soTC} TC</span></td>
                <td>${c.diemQT !== undefined ? c.diemQT.toFixed(1) : '-'}</td>
                <td>${c.diemThi !== undefined ? c.diemThi.toFixed(1) : '-'}</td>
                <td>
                  <strong style="color: ${c.pass ? 'var(--text-main)' : 'var(--danger)'};">
                    ${c.diemTK10 !== undefined ? c.diemTK10.toFixed(1) : '-'}
                  </strong>
                </td>
                <td>
                  <span class="badge ${c.pass ? 'badge-success' : 'badge-danger'}">
                    ${c.letter}
                  </span>
                </td>
                <td><strong>${c.grade4 !== undefined ? c.grade4.toFixed(1) : '-'}</strong></td>
                <td>
                  <span class="badge ${c.pass ? 'badge-success' : 'badge-danger'}">
                    ${c.pass ? 'Đạt' : 'Rớt môn (F)'}
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderSimPaneSimulate(student, studentMajor) {
  const pane = document.getElementById('sim-pane-simulate');
  if (!pane) return;

  const selectedItems = state.simItems.filter(i => i.selected);
  const simResult = simulateStudentPlan(student, selectedItems);

  pane.innerHTML = `
    <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 16px;">
      <!-- Cột trái: Danh sách môn mô phỏng -->
      <div class="content-card" style="padding: 16px 20px; border-radius: 10px;">
        <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--text-main); margin-bottom: 4px;">
          Thiết Lập Kịch Bản Môn Học Dự Kiến
        </h3>
        <p style="font-size: 0.8rem; color: var(--text-dim); margin-bottom: 14px;">
          Tích chọn các môn trả nợ hoặc môn học mới và chọn mức điểm kỳ vọng.
        </p>

        <div style="display: flex; flexDirection: column; gap: 10px; max-height: 480px; overflow-y: auto;">
          ${state.simItems.map((item, idx) => `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; border-radius: 8px; background: ${item.selected ? (item.isRetake ? '#fef2f2' : '#f0fdf4') : '#f8fafc'}; border: 1px solid ${item.selected ? (item.isRetake ? '#fecaca' : '#bbf7d0') : '#e2e8f0'};">
              <label style="display: flex; align-items: center; gap: 10px; flex: 1; cursor: pointer; margin: 0;">
                <input type="checkbox" class="sim-item-checkbox" data-index="${idx}" ${item.selected ? 'checked' : ''}>
                <div>
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <strong>${item.maMon}</strong> - <span>${item.tenMon}</span>
                    <span class="badge badge-primary" style="font-size: 0.68rem;">${item.soTC} TC</span>
                  </div>
                  <div style="font-size: 0.74rem; margin-top: 2px;">
                    ${item.isRetake ? `
                      <span style="color: var(--danger); font-weight: 700;">
                        [Trả Nợ Môn F] Thay thế điểm cũ F (0.0)
                      </span>
                    ` : `
                      <span style="color: var(--text-dim);">[Môn Mới CTĐT] Đăng ký mới kỳ tới</span>
                    `}
                  </div>
                </div>
              </label>

              ${item.selected ? `
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span style="font-size: 0.76rem; color: var(--text-dim); white-space: nowrap;">Điểm:</span>
                  <select class="form-control form-control-sm sim-item-grade-select" data-index="${idx}" style="min-width: 90px; font-weight: 700;">
                    <option value="4.0" ${item.targetGrade4 === 4.0 ? 'selected' : ''}>A+ (4.0)</option>
                    <option value="3.5" ${item.targetGrade4 === 3.5 ? 'selected' : ''}>A (3.5)</option>
                    <option value="3.0" ${item.targetGrade4 === 3.0 ? 'selected' : ''}>B+ (3.0)</option>
                    <option value="2.5" ${item.targetGrade4 === 2.5 ? 'selected' : ''}>B (2.5)</option>
                    <option value="2.0" ${item.targetGrade4 === 2.0 ? 'selected' : ''}>C+ (2.0)</option>
                    <option value="1.5" ${item.targetGrade4 === 1.5 ? 'selected' : ''}>C (1.5)</option>
                    <option value="1.0" ${item.targetGrade4 === 1.0 ? 'selected' : ''}>D (1.0)</option>
                    <option value="0.0" ${item.targetGrade4 === 0.0 ? 'selected' : ''}>F (0.0)</option>
                  </select>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Cột phải: Kết quả dự báo -->
      <div class="content-card" style="padding: 16px 20px; border-radius: 10px;">
        <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--navy-primary); margin-bottom: 4px;">
          Kết Quả Dự Báo Sau Mô Phỏng
        </h3>
        <p style="font-size: 0.8rem; color: var(--text-dim); margin-bottom: 16px;">
          Tự động đánh giá theo Rule Engine Thông tư 08 và Quy chế đào tạo OU.
        </p>

        ${simResult ? `
          <div>
            ${simResult.isEscapedWarning ? `
              <div style="background: var(--success-soft); border: 1px solid var(--success-border); border-radius: 8px; padding: 12px 14px; margin-bottom: 16px; color: var(--success-dark); font-weight: 700; font-size: 0.86rem;">
                🎉 Kịch bản này giúp sinh viên <strong>THOÁT DIỆN CẢNH BÁO HỌC VỤ</strong> và trở về trạng thái Bình Thường!
              </div>
            ` : ''}

            <!-- Grid 4 ô so sánh -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px;">
              <div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0;">
                <span style="font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700;">
                  GPA HIỆN TẠI
                </span>
                <div style="font-size: 1.45rem; fontWeight: 800; color: var(--text-main); margin-top: 2px;">
                  ${simResult.currentGPA.toFixed(2)}
                </div>
                <span class="badge ${student.levelBadge}" style="margin-top: 4px; display: inline-block;">
                  ${student.levelText}
                </span>
              </div>

              <div style="background: #eff6ff; padding: 12px; border-radius: 8px; border: 1px solid #bfdbfe;">
                <span style="font-size: 0.72rem; color: var(--primary); text-transform: uppercase; font-weight: 700;">
                  GPA DỰ KIẾN MỚI
                </span>
                <div style="font-size: 1.45rem; fontWeight: 800; color: var(--primary); margin-top: 2px;">
                  ${simResult.predictedGPA.toFixed(2)}
                  <small style="font-size: 0.82rem; color: ${simResult.diffGPA >= 0 ? 'var(--success)' : 'var(--danger)'};">
                    (${simResult.diffGPA >= 0 ? '+' : ''}${simResult.diffGPA.toFixed(2)})
                  </small>
                </div>
                <span class="badge ${simResult.newLevelBadge}" style="margin-top: 4px; display: inline-block;">
                  ${simResult.newLevelText}
                </span>
              </div>

              <div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0;">
                <span style="font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700;">
                  NỢ TÍN CHỈ HIỆN TẠI
                </span>
                <div style="font-size: 1.3rem; fontWeight: 800; color: ${simResult.currentDebt > 0 ? 'var(--danger)' : 'var(--success)'}; margin-top: 2px;">
                  ${simResult.currentDebt} TC
                </div>
              </div>

              <div style="background: #eff6ff; padding: 12px; border-radius: 8px; border: 1px solid #bfdbfe;">
                <span style="font-size: 0.72rem; color: var(--primary); text-transform: uppercase; font-weight: 700;">
                  NỢ TÍN CHỈ SAU TRẢ NỢ
                </span>
                <div style="font-size: 1.3rem; fontWeight: 800; color: ${simResult.predictedDebt === 0 ? 'var(--success)' : 'var(--warning-dark)'}; margin-top: 2px;">
                  ${simResult.predictedDebt} TC
                  ${simResult.reducedDebt > 0 ? `<small style="font-size: 0.78rem; color: var(--success);">(-${simResult.reducedDebt} TC)</small>` : ''}
                </div>
              </div>
            </div>

            <!-- Tóm tắt số liệu -->
            <div style="background: #f8fafc; padding: 12px; border-radius: 8px; margin-bottom: 14px; font-size: 0.82rem; line-height: 1.6;">
              <div>🔹 Số môn tham gia mô phỏng: <strong>${selectedItems.length} môn</strong> (${selectedItems.reduce((s, i) => s + i.soTC, 0)} TC).</div>
              <div>🔹 Môn trả nợ điểm F: <strong>${simResult.retakeCount} môn</strong>.</div>
              <div>🔹 Môn học mới kỳ tới: <strong>${simResult.newCoursesCount} môn</strong>.</div>
              <div>🔹 Tín chỉ tích lũy dự phóng: <strong>${simResult.predictedCredits} / ${studentMajor.tongTC || 141} TC</strong>.</div>
            </div>

            <!-- Lời khuyên tư vấn -->
            <div style="background: var(--primary-soft); border: 1px solid var(--primary-border); padding: 12px; border-radius: 8px; color: var(--primary-dark); font-size: 0.82rem; line-height: 1.5;">
              <strong>Khuyến Nghị Học Vụ:</strong> ${simResult.advice}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  // Attach checkbox change
  pane.querySelectorAll('.sim-item-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      const idx = parseInt(cb.getAttribute('data-index'), 10);
      if (state.simItems[idx]) {
        state.simItems[idx].selected = cb.checked;
        renderSimPaneSimulate(student, studentMajor);
      }
    });
  });

  // Attach grade select change
  pane.querySelectorAll('.sim-item-grade-select').forEach(sel => {
    sel.addEventListener('change', () => {
      const idx = parseInt(sel.getAttribute('data-index'), 10);
      if (state.simItems[idx]) {
        state.simItems[idx].targetGrade4 = parseFloat(sel.value);
        renderSimPaneSimulate(student, studentMajor);
      }
    });
  });
}

// ============================================================
// 5. QUẢN LÝ KHOA & NGÀNH (KHOA -> NGÀNH -> CTĐT + LỚP & SV)
// ============================================================
function setupFacultyMajorManagement() {
  // 1. Setup Major Search
  const majorSearchInput = document.getElementById('major-search-input');
  if (majorSearchInput) {
    majorSearchInput.addEventListener('input', (e) => {
      state.majorSearchText = e.target.value.toLowerCase().trim();
      renderMajorsView();
    });
  }

  // 2. Setup View Mode Toggle (Table vs Cards)
  const btnViewTable = document.getElementById('btn-view-mode-table');
  const btnViewGrid = document.getElementById('btn-view-mode-grid');

  if (btnViewTable && btnViewGrid) {
    btnViewTable.addEventListener('click', () => {
      state.majorsViewMode = 'table';
      btnViewTable.classList.add('active');
      btnViewGrid.classList.remove('active');
      renderMajorsView();
    });

    btnViewGrid.addEventListener('click', () => {
      state.majorsViewMode = 'grid';
      btnViewGrid.classList.add('active');
      btnViewTable.classList.remove('active');
      renderMajorsView();
    });
  }

  // 2b. Setup Back to Majors List Button
  const btnBackToList = document.getElementById('btn-back-to-majors-list');
  if (btnBackToList) {
    btnBackToList.addEventListener('click', () => {
      closeMajorDetailPage();
    });
  }

  // 3. Setup Subtab Switcher in Workspace (CTĐT vs Lớp & SV)
  const btnSubCurriculum = document.getElementById('subtab-btn-curriculum');
  const btnSubClasses = document.getElementById('subtab-btn-classes');

  if (btnSubCurriculum && btnSubClasses) {
    btnSubCurriculum.addEventListener('click', () => {
      state.activeMajorSubtab = 'curriculum';
      renderActiveMajorWorkspace();
    });

    btnSubClasses.addEventListener('click', () => {
      state.activeMajorSubtab = 'classes';
      renderActiveMajorWorkspace();
    });
  }

  // 4. Setup Workspace Banner Actions (Edit Major info & Toggle status)
  const btnEditMajor = document.getElementById('btn-edit-active-major');
  if (btnEditMajor) {
    btnEditMajor.addEventListener('click', () => {
      openEditMajorModal(state.selectedMajorCode);
    });
  }

  const btnToggleStatus = document.getElementById('btn-toggle-active-major-status');
  if (btnToggleStatus) {
    btnToggleStatus.addEventListener('click', () => {
      toggleMajorStatus(state.selectedMajorCode);
    });
  }

  // 5. Setup Curriculum Subtab Filters
  const wsSemFilter = document.getElementById('ws-curriculum-semester-filter');
  if (wsSemFilter) {
    wsSemFilter.addEventListener('change', (e) => {
      state.wsCurriculumSemester = e.target.value;
      renderCurriculumSubtab();
    });
  }

  const wsCurrSearch = document.getElementById('ws-curriculum-search');
  if (wsCurrSearch) {
    wsCurrSearch.addEventListener('input', (e) => {
      state.wsCurriculumSearch = e.target.value.toLowerCase().trim();
      renderCurriculumSubtab();
    });
  }

  // 6. Setup Student Search in Class
  const wsStudentSearchInput = document.getElementById('ws-student-search-input');
  if (wsStudentSearchInput) {
    wsStudentSearchInput.addEventListener('input', (e) => {
      state.wsStudentSearch = e.target.value.toLowerCase().trim();
      renderClassStudentsTable();
    });
  }

  // 7. Setup Modals
  setupMajorModal();
  setupEditMajorModal();
  setupClassModal();
  setupCurriculumModal();
  setupStudentModal();

  // Initial Render
  renderFacultyMajorManagement();
}

function renderFacultyMajorManagement() {
  renderFacultyFilterPills();
  renderMajorsView();
  renderActiveMajorWorkspace();
}

// ------------------------------------------------------------
// Faculty Filter Pills
// ------------------------------------------------------------
function renderFacultyFilterPills() {
  const container = document.getElementById('faculties-filter-container');
  if (!container) return;

  const allActive = state.selectedFaculty === 'ALL';
  let html = `
    <button class="faculty-pill-btn ${allActive ? 'active' : ''}" data-khoa="ALL">
      Tất Cả Khoa (${state.majors.length} ngành)
    </button>
  `;

  state.faculties.forEach(fac => {
    const isAct = state.selectedFaculty === fac.maKhoa;
    const majorCount = state.majors.filter(m => m.maKhoa === fac.maKhoa).length;
    html += `
      <button class="faculty-pill-btn ${isAct ? 'active' : ''}" data-khoa="${fac.maKhoa}">
        <strong>${fac.maKhoa}</strong> · ${fac.tenKhoa} (${majorCount})
      </button>
    `;
  });

  container.innerHTML = html;

  container.querySelectorAll('.faculty-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.selectedFaculty = btn.getAttribute('data-khoa');
      renderFacultyFilterPills();
      renderMajorsView();
    });
  });
}

// ------------------------------------------------------------
// Majors View (Table View & Grid View)
// ------------------------------------------------------------
function renderMajorsView() {
  let filtered = state.majors;

  // Filter by Faculty
  if (state.selectedFaculty !== 'ALL') {
    filtered = filtered.filter(m => m.maKhoa === state.selectedFaculty);
  }

  // Filter by Search
  if (state.majorSearchText) {
    filtered = filtered.filter(m => 
      m.tenNganh.toLowerCase().includes(state.majorSearchText) ||
      m.maNganh.toLowerCase().includes(state.majorSearchText)
    );
  }

  const countBadge = document.getElementById('majors-count-badge');
  if (countBadge) {
    countBadge.textContent = `${filtered.length} Ngành`;
  }

  const tableWrapper = document.getElementById('majors-table-wrapper');
  const cardsContainer = document.getElementById('majors-cards-container');

  if (state.majorsViewMode === 'table') {
    if (tableWrapper) tableWrapper.style.display = 'block';
    if (cardsContainer) cardsContainer.style.display = 'none';
    renderMajorsTable(filtered);
  } else {
    if (tableWrapper) tableWrapper.style.display = 'none';
    if (cardsContainer) cardsContainer.style.display = 'grid';
    renderMajorCards(filtered);
  }
}

// ------------------------------------------------------------
// 1. Bảng Danh Sách Ngành (Table View)
// ------------------------------------------------------------
function renderMajorsTable(filtered) {
  const tbody = document.getElementById('majors-table-tbody');
  if (!tbody) return;

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" style="text-align:center; padding:32px; color:var(--text-dim);">
          Không tìm thấy ngành đào tạo nào phù hợp với bộ lọc. Bấm <strong>"+ Tạo Ngành Mới"</strong> để thêm ngành vào khoa này.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map((m, idx) => {
    const isSelected = m.maNganh === state.selectedMajorCode;
    const isInactive = m.trangThai === 'INACTIVE';
    const fac = state.faculties.find(f => f.maKhoa === m.maKhoa);
    const facName = fac ? fac.tenKhoa : m.maKhoa;

    const courses = state.curriculumByMajor[m.maNganh] || [];
    const majorClasses = state.classes.filter(c => c.maNganh === m.maNganh);
    const majorStudents = state.students.filter(s => s.maNganh === m.maNganh);

    return `
      <tr class="${isInactive ? 'row-inactive' : ''}" style="${isSelected ? 'background: #eff6ff;' : ''}" data-ma-nganh="${m.maNganh}">
        <td>${idx + 1}</td>
        <td><span class="major-code-tag">${m.maNganh}</span></td>
        <td>
          <div style="font-weight: 700; color: var(--text-main); font-size: 0.9rem;">${m.tenNganh}</div>
          <small style="color: var(--text-dim); font-size: 0.74rem; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; max-width: 260px;">
            ${m.moTa || 'Chương trình đào tạo đại học chính quy.'}
          </small>
        </td>
        <td><span class="pill-badge" style="font-size: 0.72rem;">${facName}</span></td>
        <td><strong>${m.tongTC}</strong> TC</td>
        <td><span class="badge badge-primary">${courses.length} môn</span></td>
        <td><strong>${majorClasses.length}</strong> lớp (${majorStudents.length} SV)</td>
        <td>
          ${isInactive 
            ? '<span class="badge badge-inactive">Đã vô hiệu hóa</span>' 
            : '<span class="badge badge-success">Đang hoạt động</span>'
          }
        </td>
        <td style="text-align: right;">
          <div class="btn-icon-group" style="justify-content: flex-end;">
            <button class="btn-icon btn-icon-view btn-view-major" data-id="${m.maNganh}" title="Xem chi tiết ngành và CTĐT" aria-label="Xem chi tiết">
              <svg class="btn-svg" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
            <button class="btn-icon btn-icon-edit btn-edit-major-row" data-id="${m.maNganh}" title="Chỉnh sửa thông tin ngành" aria-label="Sửa thông tin ngành">
              <svg class="btn-svg" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
            <button class="btn-icon ${isInactive ? 'btn-icon-activate' : 'btn-icon-deactivate'} btn-toggle-major-status" data-id="${m.maNganh}" title="${isInactive ? 'Kích hoạt lại ngành' : 'Vô hiệu hóa ngành'}" aria-label="${isInactive ? 'Kích hoạt ngành' : 'Vô hiệu hóa ngành'}">
              ${isInactive 
                ? '<svg class="btn-svg" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' 
                : '<svg class="btn-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>'
              }
            </button>
            <button class="btn-icon btn-icon-delete btn-delete-major" data-id="${m.maNganh}" title="Xóa ngành khỏi hệ thống" aria-label="Xóa ngành">
              <svg class="btn-svg" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  // Attach handlers
  tbody.querySelectorAll('.btn-view-major').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      selectAndScrollToMajor(id);
    });
  });

  tbody.querySelectorAll('.btn-edit-major-row').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      openEditMajorModal(id);
    });
  });

  tbody.querySelectorAll('.btn-toggle-major-status').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      toggleMajorStatus(id);
    });
  });

  tbody.querySelectorAll('.btn-delete-major').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      deleteMajor(id);
    });
  });

  tbody.querySelectorAll('tr[data-ma-nganh]').forEach(row => {
    row.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      const id = row.getAttribute('data-ma-nganh');
      selectAndScrollToMajor(id);
    });
  });
}

// ------------------------------------------------------------
// 2. Dạng Thẻ Grid (Cards View)
// ------------------------------------------------------------
function renderMajorCards(filtered) {
  const container = document.getElementById('majors-cards-container');
  if (!container) return;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 28px; text-align: center; background: #ffffff; border: 1px dashed var(--border-color); border-radius: 8px; color: var(--text-dim);">
        Không tìm thấy ngành đào tạo nào phù hợp với bộ lọc. Bấm <strong>"+ Tạo Ngành Mới"</strong> để thêm ngành vào khoa này.
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(m => {
    const isSelected = m.maNganh === state.selectedMajorCode;
    const isInactive = m.trangThai === 'INACTIVE';
    const fac = state.faculties.find(f => f.maKhoa === m.maKhoa);
    const facName = fac ? fac.tenKhoa : m.maKhoa;

    const courses = state.curriculumByMajor[m.maNganh] || [];
    const majorClasses = state.classes.filter(c => c.maNganh === m.maNganh);
    const majorStudents = state.students.filter(s => s.maNganh === m.maNganh);

    return `
      <div class="major-card ${isSelected ? 'active' : ''} ${isInactive ? 'card-inactive' : ''}" data-ma-nganh="${m.maNganh}">
        <div>
          <div class="major-card-header">
            <span class="major-code-tag">${m.maNganh}</span>
            <div style="display:flex; gap:6px; align-items:center;">
              <span class="pill-badge" style="font-size:0.7rem;">${m.maKhoa}</span>
              ${isInactive 
                ? '<span class="badge badge-inactive" style="font-size:0.65rem;">Đã vô hiệu hóa</span>' 
                : '<span class="badge badge-success" style="font-size:0.65rem;">Đang hoạt động</span>'
              }
            </div>
          </div>
          <h4 class="major-card-title">${m.tenNganh}</h4>
          <p class="major-faculty-name">${facName}</p>
          <p style="font-size:0.78rem; color:var(--text-muted); margin-top:8px; line-height:1.4; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
            ${m.moTa || 'Chương trình đào tạo đại học chính quy chuẩn chất lượng cao.'}
          </p>
        </div>

        <div>
          <div class="major-card-stats">
            <span>Chuẩn: <strong>${m.tongTC} TC</strong></span>
            <span>CTĐT: <strong>${courses.length} môn</strong></span>
            <span>Lớp: <strong>${majorClasses.length} lớp</strong></span>
          </div>
          <div class="btn-icon-group" style="justify-content: flex-end; margin-top: 12px;">
            <button class="btn-icon btn-icon-view btn-view-major" data-id="${m.maNganh}" title="Xem chi tiết ngành và CTĐT" aria-label="Xem chi tiết">
              <svg class="btn-svg" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
            <button class="btn-icon btn-icon-edit btn-edit-major-row" data-id="${m.maNganh}" title="Chỉnh sửa thông tin ngành" aria-label="Sửa thông tin ngành">
              <svg class="btn-svg" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
            <button class="btn-icon ${isInactive ? 'btn-icon-activate' : 'btn-icon-deactivate'} btn-toggle-major-status" data-id="${m.maNganh}" title="${isInactive ? 'Kích hoạt lại ngành' : 'Vô hiệu hóa ngành'}" aria-label="${isInactive ? 'Kích hoạt ngành' : 'Vô hiệu hóa ngành'}">
              ${isInactive 
                ? '<svg class="btn-svg" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' 
                : '<svg class="btn-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>'
              }
            </button>
            <button class="btn-icon btn-icon-delete btn-delete-major" data-id="${m.maNganh}" title="Xóa ngành khỏi hệ thống" aria-label="Xóa ngành">
              <svg class="btn-svg" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.btn-view-major').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      selectAndScrollToMajor(id);
    });
  });

  container.querySelectorAll('.btn-edit-major-row').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      openEditMajorModal(id);
    });
  });

  container.querySelectorAll('.btn-toggle-major-status').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      toggleMajorStatus(id);
    });
  });

  container.querySelectorAll('.btn-delete-major').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      deleteMajor(id);
    });
  });

  container.querySelectorAll('.major-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      const id = card.getAttribute('data-ma-nganh');
      selectAndScrollToMajor(id);
    });
  });
}

// ------------------------------------------------------------
// Helper: Select & Open Major Detail Page
// ------------------------------------------------------------
function selectAndScrollToMajor(maNganh) {
  openMajorDetailPage(maNganh);
}

function openMajorDetailPage(maNganh) {
  state.selectedMajorCode = maNganh;
  const listContainer = document.getElementById('majors-list-view-container');
  const detailContainer = document.getElementById('major-detail-page-container');
  if (listContainer) listContainer.style.display = 'none';
  if (detailContainer) detailContainer.style.display = 'block';

  const major = state.majors.find(m => m.maNganh === maNganh);
  const titleEl = document.getElementById('ws-breadcrumb-major-title');
  if (titleEl && major) {
    titleEl.textContent = `Chi Tiết Ngành: ${major.tenNganh} (${major.maNganh})`;
  }

  renderActiveMajorWorkspace();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeMajorDetailPage() {
  const listContainer = document.getElementById('majors-list-view-container');
  const detailContainer = document.getElementById('major-detail-page-container');
  if (detailContainer) detailContainer.style.display = 'none';
  if (listContainer) listContainer.style.display = 'block';
  renderMajorsView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ------------------------------------------------------------
// Helper: Toggle Major Status (Vô hiệu hóa / Kích hoạt)
// ------------------------------------------------------------
function toggleMajorStatus(maNganh) {
  const major = state.majors.find(m => m.maNganh === maNganh);
  if (!major) return;

  const willDeactivate = major.trangThai !== 'INACTIVE';
  major.trangThai = willDeactivate ? 'INACTIVE' : 'ACTIVE';

  if (willDeactivate) {
    alert(`Đã vô hiệu hóa ngành "${major.tenNganh}" (${major.maNganh}). Ngành này sẽ tạm ngưng tuyển sinh và mở lớp đào tạo mới.`);
  } else {
    alert(`Đã kích hoạt lại ngành "${major.tenNganh}" (${major.maNganh}) hoạt động bình thường!`);
  }

  renderMajorsView();
  renderActiveMajorWorkspace();
}

// ------------------------------------------------------------
// Helper: Delete Major (Xóa ngành)
// ------------------------------------------------------------
function deleteMajor(maNganh) {
  const major = state.majors.find(m => m.maNganh === maNganh);
  if (!major) return;

  const confirmMsg = `Bạn có chắc chắn muốn xóa ngành "${major.tenNganh}" (Mã ngành: ${major.maNganh}) khỏi hệ thống?\n\nLưu ý: Hành động này sẽ xóa dữ liệu chương trình đào tạo của ngành và hủy liên kết các lớp học.`;
  if (confirm(confirmMsg)) {
    state.majors = state.majors.filter(m => m.maNganh !== maNganh);
    delete state.curriculumByMajor[maNganh];

    if (state.selectedMajorCode === maNganh) {
      state.selectedMajorCode = state.majors.length > 0 ? state.majors[0].maNganh : '';
    }

    alert(`Đã xóa thành công ngành "${major.tenNganh}" (${major.maNganh}) khỏi hệ thống!`);
    renderFacultyFilterPills();
    renderMajorsView();
    renderActiveMajorWorkspace();
  }
}

// ------------------------------------------------------------
// Active Major Workspace (View Xem Chi Tiết Ngành)
// ------------------------------------------------------------
function renderActiveMajorWorkspace() {
  const major = state.majors.find(m => m.maNganh === state.selectedMajorCode) || state.majors[0];
  const workspaceEl = document.getElementById('major-active-workspace');
  if (!major) {
    if (workspaceEl) workspaceEl.style.display = 'none';
    return;
  }
  if (workspaceEl) workspaceEl.style.display = 'block';

  // 1. Update Banner
  const fac = state.faculties.find(f => f.maKhoa === major.maKhoa);
  const facName = fac ? fac.tenKhoa : major.maKhoa;
  const isInactive = major.trangThai === 'INACTIVE';

  const courses = state.curriculumByMajor[major.maNganh] || [];
  const majorClasses = state.classes.filter(c => c.maNganh === major.maNganh);
  const majorStudents = state.students.filter(s => s.maNganh === major.maNganh);

  const elCode = document.getElementById('ws-major-code');
  const elFac = document.getElementById('ws-major-faculty');
  const elStatusBadge = document.getElementById('ws-major-status-badge');
  const elName = document.getElementById('ws-major-name');
  const elDesc = document.getElementById('ws-major-desc');

  if (elCode) elCode.textContent = major.maNganh;
  if (elFac) elFac.textContent = facName;
  if (elStatusBadge) {
    elStatusBadge.textContent = isInactive ? 'Đã vô hiệu hóa' : 'Đang hoạt động';
    elStatusBadge.className = isInactive ? 'badge badge-inactive' : 'badge badge-success';
  }
  if (elName) elName.textContent = `Ngành: ${major.tenNganh} (Mã ngành: ${major.maNganh})`;
  if (elDesc) elDesc.textContent = `${facName} · Hệ ${major.heDaoTao || 'Chính quy'} · ${major.moTa || 'Chuẩn đầu ra ' + major.tongTC + ' tín chỉ tích lũy.'}`;

  const elTc = document.getElementById('ws-major-total-tc');
  const elCourseCount = document.getElementById('ws-major-course-count');
  const elClassCount = document.getElementById('ws-major-class-count');
  const elStudentCount = document.getElementById('ws-major-student-count');

  if (elTc) elTc.textContent = major.tongTC;
  if (elCourseCount) elCourseCount.textContent = courses.length;
  if (elClassCount) elClassCount.textContent = majorClasses.length;
  if (elStudentCount) elStudentCount.textContent = majorStudents.length;

  // Banner status toggle button
  const btnToggleStatus = document.getElementById('btn-toggle-active-major-status');
  if (btnToggleStatus) {
    btnToggleStatus.textContent = isInactive ? 'Kích Hoạt Ngành' : 'Vô Hiệu Hóa';
    btnToggleStatus.style.color = isInactive ? 'var(--success-dark)' : 'var(--warning-dark)';
    btnToggleStatus.style.borderColor = isInactive ? 'var(--success-border)' : 'var(--warning-border)';
  }

  // 2. Toggle Subtabs
  const btnSubCurr = document.getElementById('subtab-btn-curriculum');
  const btnSubClasses = document.getElementById('subtab-btn-classes');
  const paneCurr = document.getElementById('subtab-pane-curriculum');
  const paneClasses = document.getElementById('subtab-pane-classes');

  if (state.activeMajorSubtab === 'curriculum') {
    if (btnSubCurr) btnSubCurr.classList.add('active');
    if (btnSubClasses) btnSubClasses.classList.remove('active');
    if (paneCurr) paneCurr.style.display = 'block';
    if (paneClasses) paneClasses.style.display = 'none';
    renderCurriculumSubtab();
  } else {
    if (btnSubCurr) btnSubCurr.classList.remove('active');
    if (btnSubClasses) btnSubClasses.classList.add('active');
    if (paneCurr) paneCurr.style.display = 'none';
    if (paneClasses) paneClasses.style.display = 'block';
    renderClassesSubtab();
  }
}

// ------------------------------------------------------------
// Subtab 1: Chương trình đào tạo ngành (Môn học & Tín chỉ)
// ------------------------------------------------------------
function renderCurriculumSubtab() {
  const tbody = document.getElementById('ws-curriculum-tbody');
  if (!tbody) return;

  const allCourses = state.curriculumByMajor[state.selectedMajorCode] || [];
  let filtered = allCourses;

  if (state.wsCurriculumSemester !== 'ALL') {
    const sem = parseInt(state.wsCurriculumSemester, 10);
    filtered = filtered.filter(c => c.hkDuKien === sem);
  }

  if (state.wsCurriculumSearch) {
    filtered = filtered.filter(c => 
      c.maMon.toLowerCase().includes(state.wsCurriculumSearch) ||
      c.tenMon.toLowerCase().includes(state.wsCurriculumSearch)
    );
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" style="text-align:center; padding:28px; color:var(--text-dim);">
          Chưa có học phần nào trong chương trình đào tạo của ngành này. Bấm <strong>"+ Thêm Môn Vào CTĐT"</strong> để bổ sung môn học và số tín chỉ.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map((c, idx) => {
    const origIndex = allCourses.indexOf(c);
    return `
      <tr>
        <td>${idx + 1}</td>
        <td><code>${c.maMon}</code></td>
        <td><strong>${c.tenMon}</strong></td>
        <td><span class="badge badge-primary">${c.soTC} TC</span></td>
        <td>${c.nhom}</td>
        <td>${c.tienQuyet ? `<code>${c.tienQuyet}</code>` : '<span style="color:var(--text-dim);">-</span>'}</td>
        <td>Học kỳ ${c.hkDuKien}</td>
        <td>
          <span class="badge ${c.batBuoc ? 'badge-success' : 'badge-warning'}">
            ${c.batBuoc ? 'Bắt buộc' : 'Tự chọn'}
          </span>
        </td>
        <td>
          <div class="btn-icon-group">
            <button class="btn-icon btn-icon-edit btn-edit-course" data-index="${origIndex}" title="Sửa thông tin học phần" aria-label="Sửa học phần">
              <svg class="btn-svg" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
            <button class="btn-icon btn-icon-delete btn-delete-course" data-index="${origIndex}" title="Xóa học phần khỏi CTĐT" aria-label="Xóa học phần">
              <svg class="btn-svg" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  // Attach Edit Course
  tbody.querySelectorAll('.btn-edit-course').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      const c = allCourses[idx];
      if (!c) return;

      document.getElementById('curriculum-modal-title').textContent = `Chỉnh Sửa Học Phần: ${c.maMon} - ${c.tenMon}`;
      document.getElementById('curriculum-edit-index').value = idx;
      document.getElementById('curr-ma-mon').value = c.maMon;
      document.getElementById('curr-ten-mon').value = c.tenMon;
      document.getElementById('curr-so-tc').value = c.soTC;
      document.getElementById('curr-hk').value = c.hkDuKien;
      document.getElementById('curr-nhom').value = c.nhom;
      document.getElementById('curr-tien-quyet').value = c.tienQuyet || '';
      document.getElementById('curr-loai').value = c.batBuoc ? 'true' : 'false';

      document.getElementById('curriculum-modal').classList.add('active');
    });
  });

  // Attach Delete Course
  tbody.querySelectorAll('.btn-delete-course').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      const c = allCourses[idx];
      if (!c) return;

      if (confirm(`Bạn có chắc chắn muốn xóa học phần "${c.tenMon}" (${c.maMon}) khỏi CTĐT ngành này?`)) {
        allCourses.splice(idx, 1);
        renderActiveMajorWorkspace();
        renderMajorsView();
      }
    });
  });
}

// ------------------------------------------------------------
// Subtab 2: Danh sách Lớp & Sinh viên trong ngành
// ------------------------------------------------------------
function renderClassesSubtab() {
  const pillsContainer = document.getElementById('ws-class-pills-container');
  const majorClasses = state.classes.filter(c => c.maNganh === state.selectedMajorCode);

  if (!majorClasses.some(c => c.maLop === state.selectedClassCode)) {
    state.selectedClassCode = majorClasses.length > 0 ? majorClasses[0].maLop : '';
  }

  if (pillsContainer) {
    if (majorClasses.length === 0) {
      pillsContainer.innerHTML = `<span style="font-size:0.82rem; color:var(--text-dim);">Chưa có lớp nào thuộc ngành này. Bấm nút <strong>"+ Tạo Lớp Mới Thuộc Ngành"</strong> để tạo lớp.</span>`;
    } else {
      pillsContainer.innerHTML = majorClasses.map(c => {
        const isAct = c.maLop === state.selectedClassCode;
        const count = state.students.filter(s => s.lop === c.maLop).length;
        return `
          <button class="class-pill-btn ${isAct ? 'active' : ''}" data-ma-lop="${c.maLop}">
            <strong>${c.maLop}</strong> (${count} SV)
          </button>
        `;
      }).join('');

      pillsContainer.querySelectorAll('.class-pill-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          state.selectedClassCode = btn.getAttribute('data-ma-lop');
          renderClassesSubtab();
        });
      });
    }
  }

  updateClassSummaryBanner();
  renderClassStudentsTable();
}

function updateClassSummaryBanner() {
  const currentClass = state.classes.find(c => c.maLop === state.selectedClassCode);
  const classStudents = state.students.filter(s => s.lop === state.selectedClassCode);

  const banner = document.getElementById('ws-selected-class-banner');
  if (!banner) return;

  if (currentClass) {
    banner.style.display = 'flex';
    document.getElementById('ws-class-title').textContent = `Lớp: ${currentClass.maLop} — ${currentClass.tenLop}`;
    document.getElementById('ws-class-meta').innerHTML = `
      <span>Mã ngành: <strong>${currentClass.maNganh}</strong></span> · 
      <span>Niên khóa: <strong>${currentClass.khoaHoc}</strong></span> · 
      <span>CVHT: <strong>${currentClass.cvht}</strong></span> · 
      <span>Phòng: <strong>${currentClass.phongHoc || 'A302 - Cơ sở 371 Nguyễn Kiệm'}</strong></span>
    `;
    document.getElementById('ws-class-count').textContent = `${classStudents.length} SV`;

    const avgGPA = classStudents.length > 0 
      ? (classStudents.reduce((sum, s) => sum + s.gpaTL, 0) / classStudents.length).toFixed(2)
      : '0.00';
    document.getElementById('ws-class-gpa').textContent = avgGPA;
  } else {
    banner.style.display = 'none';
  }
}

function renderClassStudentsTable() {
  const tbody = document.getElementById('ws-class-students-tbody');
  if (!tbody) return;

  if (!state.selectedClassCode) {
    tbody.innerHTML = `<tr><td colspan="10" style="text-align:center; padding:24px; color:var(--text-dim);">Vui lòng chọn hoặc tạo một lớp học để xem danh sách sinh viên.</td></tr>`;
    return;
  }

  let studentsOfClass = state.students.filter(s => s.lop === state.selectedClassCode);

  if (state.wsStudentSearch) {
    studentsOfClass = studentsOfClass.filter(s => 
      s.maSV.toLowerCase().includes(state.wsStudentSearch) ||
      s.hoTen.toLowerCase().includes(state.wsStudentSearch)
    );
  }

  if (studentsOfClass.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" style="text-align:center; padding:24px; color:var(--text-dim);">Chưa có sinh viên nào trong lớp này. Nhấn nút <strong>"+ Thêm Sinh Viên Vào Lớp"</strong> để thêm mới.</td></tr>`;
    return;
  }

  tbody.innerHTML = studentsOfClass.map((s, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td><code>${s.maSV}</code></td>
      <td><strong>${s.hoTen}</strong></td>
      <td>${s.gioiTinh || 'Nam'}</td>
      <td>${s.ngaySinh || '01/01/2003'}</td>
      <td><strong>${s.gpaTL.toFixed(2)}</strong></td>
      <td>${s.tcTichLuy || 0} TC</td>
      <td><span class="${s.tcNo > 10 ? 'text-danger' : ''}">${s.tcNo || 0} TC</span></td>
      <td><span class="badge ${s.levelBadge}">${s.levelText}</span></td>
      <td>
        <div style="display:flex; gap:6px;">
          <button class="btn btn-outline-navy btn-sm btn-view-student-dossier" data-id="${s.maSV}">Xem</button>
          <button class="btn btn-outline-navy btn-sm btn-remove-student-class" data-id="${s.maSV}" style="color:var(--danger); border-color:#fecaca;">Xóa</button>
        </div>
      </td>
    </tr>
  `).join('');

  tbody.querySelectorAll('.btn-view-student-dossier').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const st = state.students.find(x => x.maSV === id);
      if (st) openStudentDossierModal(st);
    });
  });

  tbody.querySelectorAll('.btn-remove-student-class').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (confirm(`Bạn có chắc chắn muốn xóa sinh viên ${id} ra khỏi lớp học này?`)) {
        state.students = state.students.filter(x => x.maSV !== id);
        updateClassSummaryBanner();
        renderClassStudentsTable();
      }
    });
  });
}

// ------------------------------------------------------------
// MODAL HANDLERS
// ------------------------------------------------------------
function setupMajorModal() {
  const modal = document.getElementById('modal-add-major');
  const btnOpen = document.getElementById('btn-open-create-major-modal');
  const btnClose = document.getElementById('close-major-modal-btn');
  const btnCancel = document.getElementById('btn-cancel-major');
  const form = document.getElementById('major-form');

  if (!modal || !btnOpen || !form) return;

  btnOpen.addEventListener('click', () => {
    form.reset();
    // Default to currently filtered faculty if not ALL
    if (state.selectedFaculty !== 'ALL') {
      const selectKhoa = document.getElementById('major-form-khoa');
      if (selectKhoa) selectKhoa.value = state.selectedFaculty;
    }
    modal.classList.add('active');
  });

  if (btnClose) btnClose.addEventListener('click', () => modal.classList.remove('active'));
  if (btnCancel) btnCancel.addEventListener('click', () => modal.classList.remove('active'));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const maKhoa = document.getElementById('major-form-khoa').value;
    const maNganh = document.getElementById('major-form-ma-nganh').value.trim();
    const tenNganh = document.getElementById('major-form-ten-nganh').value.trim();
    const tongTC = parseInt(document.getElementById('major-form-tong-tc').value, 10) || 140;
    const heDaoTao = document.getElementById('major-form-he-dt').value;
    const moTa = document.getElementById('major-form-mota').value.trim();

    if (state.majors.some(m => m.maNganh === maNganh)) {
      alert(`Mã ngành "${maNganh}" đã tồn tại trong hệ thống. Vui lòng chọn mã ngành khác!`);
      return;
    }

    const newMajor = {
      maNganh,
      tenNganh,
      maKhoa,
      tongTC,
      heDaoTao,
      moTa
    };

    state.majors.push(newMajor);
    state.curriculumByMajor[maNganh] = [];
    state.selectedMajorCode = maNganh;

    modal.classList.remove('active');
    alert(`Đã tạo thành công ngành mới "${tenNganh}" (Mã ngành: ${maNganh}) thuộc ${getFacultyName(maKhoa)}!`);

    renderFacultyFilterPills();
    renderMajorsView();
    renderActiveMajorWorkspace();
  });
}

function openEditMajorModal(maNganh) {
  const major = state.majors.find(m => m.maNganh === maNganh);
  if (!major) return;

  const modal = document.getElementById('modal-edit-major');
  if (!modal) return;

  const titleEl = document.getElementById('modal-edit-major-title');
  if (titleEl) titleEl.textContent = `Chỉnh Sửa Ngành: ${major.tenNganh} (${major.maNganh})`;

  const elMa = document.getElementById('edit-major-ma-nganh');
  const elFac = document.getElementById('edit-major-khoa-display');
  const elName = document.getElementById('edit-major-ten-nganh');
  const elTc = document.getElementById('edit-major-tong-tc');
  const elHe = document.getElementById('edit-major-he-dt');
  const elStatus = document.getElementById('edit-major-status');
  const elMota = document.getElementById('edit-major-mota');

  if (elMa) elMa.value = major.maNganh;
  if (elFac) elFac.value = `${major.maKhoa} — ${getFacultyName(major.maKhoa)}`;
  if (elName) elName.value = major.tenNganh;
  if (elTc) elTc.value = major.tongTC;
  if (elHe) elHe.value = major.heDaoTao || 'Chính quy';
  if (elStatus) elStatus.value = major.trangThai || 'ACTIVE';
  if (elMota) elMota.value = major.moTa || '';

  modal.classList.add('active');
}

function setupEditMajorModal() {
  const modal = document.getElementById('modal-edit-major');
  const btnClose = document.getElementById('close-edit-major-modal-btn');
  const btnCancel = document.getElementById('btn-cancel-edit-major');
  const form = document.getElementById('edit-major-form');

  if (!modal || !form) return;

  if (btnClose) btnClose.addEventListener('click', () => modal.classList.remove('active'));
  if (btnCancel) btnCancel.addEventListener('click', () => modal.classList.remove('active'));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const maNganh = document.getElementById('edit-major-ma-nganh').value;
    const major = state.majors.find(m => m.maNganh === maNganh);
    if (!major) return;

    major.tenNganh = document.getElementById('edit-major-ten-nganh').value.trim();
    major.tongTC = parseInt(document.getElementById('edit-major-tong-tc').value, 10) || major.tongTC;
    major.heDaoTao = document.getElementById('edit-major-he-dt').value;
    major.trangThai = document.getElementById('edit-major-status').value;
    major.moTa = document.getElementById('edit-major-mota').value.trim();

    modal.classList.remove('active');
    alert(`Đã cập nhật thành công thông tin ngành "${major.tenNganh}" (${major.maNganh})!`);

    renderMajorsView();
    renderActiveMajorWorkspace();
  });
}

function setupClassModal() {
  const modal = document.getElementById('class-modal');
  const btnOpen = document.getElementById('ws-btn-add-class');
  const btnClose = document.getElementById('close-class-modal-btn');
  const btnCancel = document.getElementById('btn-cancel-class');
  const form = document.getElementById('class-form');

  if (!modal || !form) return;

  if (btnOpen) {
    btnOpen.addEventListener('click', () => {
      form.reset();
      modal.classList.add('active');
    });
  }

  if (btnClose) btnClose.addEventListener('click', () => modal.classList.remove('active'));
  if (btnCancel) btnCancel.addEventListener('click', () => modal.classList.remove('active'));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const maLop = document.getElementById('class-form-ma-lop').value.trim().toUpperCase();
    const tenLop = document.getElementById('class-form-ten-lop').value.trim();
    const nienKhoa = document.getElementById('class-form-nien-khoa').value.trim();
    const cvht = document.getElementById('class-form-cvht').value.trim();
    const phong = document.getElementById('class-form-phong').value.trim();

    if (state.classes.some(c => c.maLop === maLop)) {
      alert(`Mã lớp "${maLop}" đã tồn tại. Vui lòng nhập mã lớp khác!`);
      return;
    }

    state.classes.push({
      maNganh: state.selectedMajorCode,
      maLop,
      tenLop,
      khoaHoc: nienKhoa,
      namHocThu: 1,
      cvht,
      emailCVHT: `${maLop.toLowerCase()}@ou.edu.vn`,
      phongHoc: phong
    });

    state.selectedClassCode = maLop;
    modal.classList.remove('active');
    alert(`Đã thêm thành công lớp học "${tenLop}" (${maLop}) vào ngành ${getMajorName(state.selectedMajorCode)}!`);

    renderClassesSubtab();
    renderMajorsView(); // update counts
  });
}

function setupCurriculumModal() {
  const modal = document.getElementById('curriculum-modal');
  const btnOpen = document.getElementById('ws-btn-add-course');
  const btnClose = document.getElementById('close-curriculum-modal-btn');
  const btnCancel = document.getElementById('btn-cancel-curriculum');
  const form = document.getElementById('curriculum-form');

  if (!modal || !form) return;

  if (btnOpen) {
    btnOpen.addEventListener('click', () => {
      document.getElementById('curriculum-modal-title').textContent = `Thêm Môn Học Vào CTĐT Ngành ${getMajorName(state.selectedMajorCode)}`;
      document.getElementById('curriculum-edit-index').value = '-1';
      form.reset();
      modal.classList.add('active');
    });
  }

  if (btnClose) btnClose.addEventListener('click', () => modal.classList.remove('active'));
  if (btnCancel) btnCancel.addEventListener('click', () => modal.classList.remove('active'));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const editIndex = parseInt(document.getElementById('curriculum-edit-index').value, 10);
    const maMon = document.getElementById('curr-ma-mon').value.trim().toUpperCase();
    const tenMon = document.getElementById('curr-ten-mon').value.trim();
    const soTC = parseInt(document.getElementById('curr-so-tc').value, 10) || 3;
    const hkDuKien = parseInt(document.getElementById('curr-hk').value, 10) || 1;
    const nhom = document.getElementById('curr-nhom').value;
    const tienQuyet = document.getElementById('curr-tien-quyet').value.trim().toUpperCase();
    const batBuoc = document.getElementById('curr-loai').value === 'true';

    const courseObj = {
      maMon,
      tenMon,
      soTC,
      hkDuKien,
      nhom,
      tienQuyet,
      batBuoc,
      isTichLuy: nhom !== 'Môn điều kiện',
      pFailHistory: 0.15
    };

    if (!state.curriculumByMajor[state.selectedMajorCode]) {
      state.curriculumByMajor[state.selectedMajorCode] = [];
    }

    const currList = state.curriculumByMajor[state.selectedMajorCode];
    if (editIndex >= 0 && editIndex < currList.length) {
      currList[editIndex] = courseObj;
      alert(`Đã cập nhật học phần "${tenMon}" (${maMon})!`);
    } else {
      currList.push(courseObj);
      alert(`Đã thêm học phần "${tenMon}" (${maMon}) vào CTĐT ngành!`);
    }

    modal.classList.remove('active');
    renderActiveMajorWorkspace();
    renderMajorsView();
  });
}

function setupStudentModal() {
  const modal = document.getElementById('student-modal');
  const btnOpen = document.getElementById('ws-btn-add-student');
  const btnClose = document.getElementById('close-student-modal-btn');
  const btnCancel = document.getElementById('btn-cancel-student');
  const form = document.getElementById('student-form');

  if (!modal || !form) return;

  if (btnOpen) {
    btnOpen.addEventListener('click', () => {
      if (!state.selectedClassCode) {
        alert('Vui lòng chọn hoặc tạo một lớp học trước khi thêm sinh viên!');
        return;
      }
      form.reset();
      modal.classList.add('active');
    });
  }

  if (btnClose) btnClose.addEventListener('click', () => modal.classList.remove('active'));
  if (btnCancel) btnCancel.addEventListener('click', () => modal.classList.remove('active'));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const maSV = document.getElementById('stu-form-ma-sv').value.trim();
    const hoTen = document.getElementById('stu-form-ho-ten').value.trim();
    const gioiTinh = document.getElementById('stu-form-gioi-tinh').value;
    const ngaySinh = document.getElementById('stu-form-ngay-sinh').value.trim();
    const gpa = parseFloat(document.getElementById('stu-form-gpa').value) || 2.5;
    const tc = parseInt(document.getElementById('stu-form-tc').value, 10) || 60;

    if (state.students.some(s => s.maSV === maSV)) {
      alert(`Mã sinh viên "${maSV}" đã tồn tại trong hệ thống!`);
      return;
    }

    const newStudent = {
      maSV,
      hoTen,
      gioiTinh,
      ngaySinh,
      lop: state.selectedClassCode,
      maNganh: state.selectedMajorCode,
      nganh: getMajorName(state.selectedMajorCode),
      namHoc: 3,
      gpaTL: gpa,
      tcTichLuy: tc,
      tcNo: gpa < 2.0 ? 12 : 0,
      level: gpa < 1.6 ? 'HIGH_RISK' : gpa < 2.0 ? 'EARLY_WARNING' : 'NORMAL',
      levelText: gpa < 1.6 ? 'Nguy cơ cao' : gpa < 2.0 ? 'Cảnh báo sớm' : 'Bình thường',
      levelBadge: gpa < 1.6 ? 'badge-danger' : gpa < 2.0 ? 'badge-warning' : 'badge-success',
      riskScore: gpa < 1.6 ? 85 : gpa < 2.0 ? 60 : 15,
      email: `${maSV}@ou.edu.vn`,
      sdt: '0901234567',
      historySemesters: [],
      completedCourses: []
    };

    state.students.push(newStudent);
    alert(`Đã thêm thành công sinh viên "${hoTen}" (${maSV}) vào lớp ${state.selectedClassCode}!`);
    modal.classList.remove('active');

    updateClassSummaryBanner();
    renderClassStudentsTable();
    renderMajorsView();
  });
}

function getMajorName(maNganh) {
  const m = state.majors.find(x => x.maNganh === maNganh);
  return m ? m.tenNganh : maNganh;
}

function getFacultyName(maKhoa) {
  const f = state.faculties.find(x => x.maKhoa === maKhoa);
  return f ? f.tenKhoa : maKhoa;
}

// ============================================================
// 7. TAB 5: QUẢN LÝ ĐIỂM MÔN HỌC (THEO MÔN & NGÀNH)
// ============================================================
function setupTab5CourseGrades() {
  // Elements của View 1: Danh Sách Bảng Điểm
  const viewListEl = document.getElementById('grade-view-list');
  const viewDetailEl = document.getElementById('grade-view-detail');
  const btnBackToList = document.getElementById('btn-back-to-grade-list');

  const listFacultySelect = document.getElementById('list-filter-faculty');
  const listMajorSelect = document.getElementById('list-filter-major');
  const listClassSelect = document.getElementById('list-filter-class');
  const listSemSelect = document.getElementById('list-filter-semester');
  const listStatusSelect = document.getElementById('list-filter-status');
  const listSearchInput = document.getElementById('list-search-input');
  const btnResetListFilter = document.getElementById('btn-reset-list-filter');

  const btnListTemplate = document.getElementById('btn-list-download-template');
  const btnListImport = document.getElementById('btn-list-import-excel');
  const btnOpenNewModal = document.getElementById('btn-open-new-sheet-modal');

  // Elements của View 2: Chi Tiết Nhập Điểm
  const facultySelect = document.getElementById('grade-faculty-select');
  const majorSelect = document.getElementById('grade-major-select');
  const classSelect = document.getElementById('grade-class-select');
  const courseSelect = document.getElementById('grade-course-select');
  const semSelect = document.getElementById('grade-semester-select');
  const searchInput = document.getElementById('grade-search-student-input');

  const btnTemplate = document.getElementById('btn-download-course-template');
  const btnImport = document.getElementById('btn-import-course-excel');
  const btnSave = document.getElementById('btn-save-course-scores');

  // ============================================================
  // A. SETUP VIEW 1: DANH SÁCH BẢNG ĐIỂM (MASTER VIEW)
  // ============================================================
  function populateListFaculties() {
    if (!listFacultySelect) return;
    listFacultySelect.innerHTML = `
      <option value="ALL">-- Tất Cả Khoa --</option>
      ${state.faculties.map(f => `<option value="${f.maKhoa}">${f.maKhoa} — ${f.tenKhoa}</option>`).join('')}
    `;
    listFacultySelect.value = state.listFilterFaculty;

    listFacultySelect.addEventListener('change', (e) => {
      state.listFilterFaculty = e.target.value;
      state.listFilterMajor = 'ALL';
      state.listFilterClass = 'ALL';
      populateListMajors();
      renderGradeSheetsListTable();
    });
  }

  function populateListMajors() {
    if (!listMajorSelect) return;
    const filtered = state.listFilterFaculty === 'ALL'
      ? state.majors
      : state.majors.filter(m => m.maKhoa === state.listFilterFaculty);

    listMajorSelect.innerHTML = `
      <option value="ALL">-- Tất Cả Ngành --</option>
      ${filtered.map(m => `<option value="${m.maNganh}">${m.maNganh} — ${m.tenNganh}</option>`).join('')}
    `;
    listMajorSelect.value = state.listFilterMajor;

    populateListClasses();
  }

  if (listMajorSelect) {
    listMajorSelect.addEventListener('change', (e) => {
      state.listFilterMajor = e.target.value;
      state.listFilterClass = 'ALL';
      populateListClasses();
      renderGradeSheetsListTable();
    });
  }

  function populateListClasses() {
    if (!listClassSelect) return;
    const filtered = state.listFilterMajor === 'ALL'
      ? state.classes
      : state.classes.filter(c => c.maNganh === state.listFilterMajor);

    listClassSelect.innerHTML = `
      <option value="ALL">-- Tất Cả Lớp --</option>
      ${filtered.map(c => `<option value="${c.maLop}">${c.maLop} — ${c.tenLop}</option>`).join('')}
    `;
    listClassSelect.value = state.listFilterClass;
  }

  if (listClassSelect) {
    listClassSelect.addEventListener('change', (e) => {
      state.listFilterClass = e.target.value;
      renderGradeSheetsListTable();
    });
  }

  if (listSemSelect) {
    listSemSelect.addEventListener('change', (e) => {
      state.listFilterSemester = e.target.value;
      renderGradeSheetsListTable();
    });
  }

  if (listStatusSelect) {
    listStatusSelect.addEventListener('change', (e) => {
      state.listFilterStatus = e.target.value;
      renderGradeSheetsListTable();
    });
  }

  if (listSearchInput) {
    listSearchInput.addEventListener('input', (e) => {
      state.listSearchQuery = e.target.value.toLowerCase().trim();
      renderGradeSheetsListTable();
    });
  }

  if (btnResetListFilter) {
    btnResetListFilter.addEventListener('click', () => {
      state.listFilterFaculty = 'ALL';
      state.listFilterMajor = 'ALL';
      state.listFilterClass = 'ALL';
      state.listFilterSemester = 'ALL';
      state.listFilterStatus = 'ALL';
      state.listSearchQuery = '';

      if (listFacultySelect) listFacultySelect.value = 'ALL';
      if (listSemSelect) listSemSelect.value = 'ALL';
      if (listStatusSelect) listStatusSelect.value = 'ALL';
      if (listSearchInput) listSearchInput.value = '';

      populateListMajors();
      renderGradeSheetsListTable();
    });
  }

  if (btnListTemplate) {
    btnListTemplate.addEventListener('click', () => {
      alert('Đang tải file mẫu nhập điểm Excel chuẩn Đại học Mở TP.HCM: "Mau_Nhap_Diem_HocPhan_OU.xlsx"...');
    });
  }

  if (btnListImport) {
    btnListImport.addEventListener('click', () => {
      alert('Chức năng Import Excel: Vui lòng chọn file bảng điểm Excel (.xlsx) chuẩn mẫu OU để nạp điểm hàng loạt.');
    });
  }

  if (btnOpenNewModal) {
    btnOpenNewModal.addEventListener('click', () => {
      const tenGV = prompt('Nhập tên Giảng viên phụ trách học phần mới:');
      if (tenGV && tenGV.trim()) {
        const newSheet = {
          id: `GS_DH21IT01_NEW_${Date.now()}`,
          maLop: 'DH21IT01',
          tenLop: 'ĐH CNTT Khóa 2021 - Lớp 01',
          khoaHoc: '2021 - 2025',
          maNganh: '7480201',
          tenNganh: 'Công nghệ thông tin',
          maKhoa: 'FIT',
          tenKhoa: 'Khoa Công nghệ thông tin',
          maMon: 'COSC2303',
          tenMon: 'Lập trình hướng đối tượng',
          soTC: 3,
          nhom: 'Cơ sở ngành',
          giangVien: tenGV.trim(),
          emailGV: 'gv@ou.edu.vn',
          hocKy: 'HK3',
          namHoc: '2023 - 2024',
          trangThai: 'PENDING',
          ngayCapNhat: 'Vừa tạo mới'
        };
        state.gradeSheetsList.unshift(newSheet);
        alert(`Đã mở thành công bảng điểm mới cho lớp ${newSheet.maLop} - môn ${newSheet.tenMon}!`);
        renderGradeSheetsListTable();
      }
    });
  }

  // Chuyển view từ Detail quay lại List
  if (btnBackToList) {
    btnBackToList.addEventListener('click', () => {
      if (viewDetailEl) viewDetailEl.style.display = 'none';
      if (viewListEl) viewListEl.style.display = 'block';
      renderGradeSheetsListTable();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================================
  // B. HÀM RENDER BẢNG DANH SÁCH BẢNG ĐIỂM
  // ============================================================
  function renderGradeSheetsListTable() {
    const tbody = document.getElementById('grade-sheets-table-body');
    if (!tbody) return;

    // Lọc danh sách bảng điểm
    let filtered = state.gradeSheetsList.filter(item => {
      if (state.listFilterFaculty !== 'ALL' && item.maKhoa !== state.listFilterFaculty) return false;
      if (state.listFilterMajor !== 'ALL' && item.maNganh !== state.listFilterMajor) return false;
      if (state.listFilterClass !== 'ALL' && item.maLop !== state.listFilterClass) return false;
      if (state.listFilterSemester !== 'ALL' && item.hocKy !== state.listFilterSemester) return false;
      if (state.listFilterStatus !== 'ALL' && item.trangThai !== state.listFilterStatus) return false;

      if (state.listSearchQuery) {
        const q = state.listSearchQuery;
        const matchCourse = item.tenMon.toLowerCase().includes(q) || item.maMon.toLowerCase().includes(q);
        const matchClass = item.maLop.toLowerCase().includes(q) || item.tenLop.toLowerCase().includes(q);
        const matchLecturer = item.giangVien.toLowerCase().includes(q);
        const matchMajor = item.tenNganh.toLowerCase().includes(q);
        if (!matchCourse && !matchClass && !matchLecturer && !matchMajor) return false;
      }
      return true;
    });

    // Cập nhật 4 thẻ KPI
    const total = state.gradeSheetsList.length;
    const completed = state.gradeSheetsList.filter(s => s.trangThai === 'COMPLETED').length;
    const inProgress = state.gradeSheetsList.filter(s => s.trangThai === 'IN_PROGRESS').length;
    const pending = state.gradeSheetsList.filter(s => s.trangThai === 'PENDING').length;

    const elTotal = document.getElementById('metric-sheet-total');
    const elCompleted = document.getElementById('metric-sheet-completed');
    const elInProgress = document.getElementById('metric-sheet-inprogress');
    const elPending = document.getElementById('metric-sheet-pending');
    const countBadge = document.getElementById('list-count-badge');

    if (elTotal) elTotal.innerHTML = `${total} <span style="font-size:0.82rem; font-weight:600; color:var(--text-dim);">Lớp học phần</span>`;
    if (elCompleted) elCompleted.innerHTML = `${completed} <span style="font-size:0.82rem; font-weight:600; color:var(--text-dim);">(${Math.round(completed / total * 100)}%)</span>`;
    if (elInProgress) elInProgress.innerHTML = `${inProgress} <span style="font-size:0.82rem; font-weight:600; color:var(--text-dim);">Bảng điểm</span>`;
    if (elPending) elPending.innerHTML = `${pending} <span style="font-size:0.82rem; font-weight:600; color:var(--text-dim);">Bảng điểm</span>`;
    if (countBadge) countBadge.textContent = `Hiển thị: ${filtered.length} / ${total} Bảng điểm`;

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="10" style="text-align:center; padding:36px; color:var(--text-dim);">Không tìm thấy bảng điểm nào khớp với điều kiện lọc hiện tại.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map((sheet, idx) => {
      const classSV = state.students.filter(s => s.lop === sheet.maLop);
      const countSV = classSV.length > 0 ? classSV.length : 10;

      const statusBadge = sheet.trangThai === 'COMPLETED'
        ? { label: '✓ Đã hoàn tất', cls: 'badge-success', pct: 100 }
        : sheet.trangThai === 'IN_PROGRESS'
        ? { label: '⏳ Đang nhập', cls: 'badge-warning', pct: 60 }
        : { label: '⚠️ Chưa nhập', cls: '', pct: 0, style: 'background:#f1f5f9; color:#64748b;' };

      return `
        <tr>
          <td>${idx + 1}</td>
          <td>
            <div style="display:flex; flex-direction:column; gap:2px;">
              <div style="display:flex; align-items:center; gap:6px;">
                <span class="major-code-tag" style="font-size:0.72rem; padding:2px 6px;">${sheet.maMon}</span>
                <strong style="color:var(--text-main); font-size:0.9rem;">${sheet.tenMon}</strong>
              </div>
              <span style="font-size:0.75rem; color:var(--text-dim);">${sheet.soTC} Tín chỉ · <span style="color:var(--primary); font-weight:600;">${sheet.nhom}</span></span>
            </div>
          </td>
          <td>
            <div style="display:flex; flex-direction:column; gap:2px;">
              <span class="badge" style="background:#e0e7ff; color:#3730a3; font-weight:800; align-self:flex-start;">${sheet.maLop}</span>
              <span style="font-size:0.75rem; color:var(--text-dim);">${sheet.khoaHoc}</span>
            </div>
          </td>
          <td>
            <div style="font-size:0.82rem; font-weight:600; color:var(--text-main);">${sheet.tenNganh}</div>
            <div style="font-size:0.74rem; color:var(--text-dim);">${sheet.tenKhoa || sheet.maKhoa}</div>
          </td>
          <td>
            <div style="display:flex; align-items:center; gap:8px;">
              <div class="persona-avatar-box" style="width:28px; height:28px; font-size:0.72rem;">GV</div>
              <div>
                <div style="font-weight:700; font-size:0.84rem; color:var(--text-main);">${sheet.giangVien}</div>
                <div style="font-size:0.72rem; color:var(--text-dim);">${sheet.emailGV}</div>
              </div>
            </div>
          </td>
          <td>
            <span class="pill-badge" style="font-weight:700; font-size:0.74rem;">${sheet.hocKy}</span>
          </td>
          <td>
            <strong>${countSV} SV</strong>
          </td>
          <td>
            <div style="display:flex; flex-direction:column; gap:4px; min-width:110px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span class="badge ${statusBadge.cls}" style="${statusBadge.style || ''} font-size:0.68rem; font-weight:700;">${statusBadge.label}</span>
                <span style="font-size:0.72rem; font-weight:700; color:var(--text-dim);">${statusBadge.pct}%</span>
              </div>
              <div style="width:100%; height:5px; background:#e2e8f0; borderRadius:4px; overflow:hidden;">
                <div style="width:${statusBadge.pct}%; height:100%; background:${statusBadge.pct === 100 ? 'var(--success)' : statusBadge.pct > 0 ? '#f59e0b' : '#cbd5e1'}; border-radius:4px;"></div>
              </div>
            </div>
          </td>
          <td>
            ${sheet.trangThai === 'COMPLETED' ? `
              <div style="font-size:0.78rem;">
                <span style="color:var(--success); font-weight:700;">Đạt 90%</span> · 
                <span style="font-weight:700; color:var(--primary);">ĐTB 6.8</span>
              </div>
            ` : `<span style="font-size:0.75rem; color:var(--text-dim);">Đang cập nhật</span>`}
          </td>
          <td style="text-align:center;">
            <div style="display:flex; gap:6px; justify-content:center;">
              <button class="btn btn-primary btn-sm btn-open-sheet-entry" data-sheet-id="${sheet.id}" style="font-weight:700; padding:4px 10px; font-size:0.78rem;">
                ✏️ Nhập Điểm
              </button>
              <button class="btn btn-outline-navy btn-sm" onclick="alert('Xuất file Excel bảng điểm: ${sheet.maMon}_${sheet.maLop}.xlsx')" style="padding:4px 8px;">
                📥
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Gắn sự kiện nhấn nút "Nhập Điểm" chuyển sang Detail View
    tbody.querySelectorAll('.btn-open-sheet-entry').forEach(btn => {
      btn.addEventListener('click', () => {
        const sheetId = btn.getAttribute('data-sheet-id');
        const targetSheet = state.gradeSheetsList.find(s => s.id === sheetId);
        if (!targetSheet) return;

        state.selectedGradeFaculty = targetSheet.maKhoa;
        state.selectedGradeMajor = targetSheet.maNganh;
        state.selectedGradeClass = targetSheet.maLop;
        state.selectedGradeCourse = targetSheet.maMon;
        state.selectedGradeSemester = targetSheet.hocKy || 'HK3';

        // Ẩn List view, hiện Detail view
        if (viewListEl) viewListEl.style.display = 'none';
        if (viewDetailEl) viewDetailEl.style.display = 'block';

        // Đồng bộ các select trong detail view
        if (facultySelect) facultySelect.value = state.selectedGradeFaculty;
        populateGradeMajors();
        updateCourseMetaBanner();
        renderCourseGradesTable();

        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  // Khởi tạo List view
  populateListFaculties();
  populateListMajors();
  renderGradeSheetsListTable();

  // ============================================================
  // C. SETUP VIEW 2: CHI TIẾT NHẬP ĐIỂM (DETAIL VIEW)
  // ============================================================
  if (facultySelect) {
    facultySelect.innerHTML = `
      <option value="ALL">-- Tất cả Khoa --</option>
      ${state.faculties.map(f => `<option value="${f.maKhoa}">${f.maKhoa} — ${f.tenKhoa}</option>`).join('')}
    `;
    facultySelect.value = state.selectedGradeFaculty;

    facultySelect.addEventListener('change', (e) => {
      state.selectedGradeFaculty = e.target.value;
      populateGradeMajors();
    });
  }

  function populateGradeMajors() {
    if (!majorSelect) return;
    const filtered = state.selectedGradeFaculty === 'ALL'
      ? state.majors
      : state.majors.filter(m => m.maKhoa === state.selectedGradeFaculty);

    if (filtered.length === 0) {
      majorSelect.innerHTML = `<option value="">-- Không có ngành nào --</option>`;
      state.selectedGradeMajor = '';
    } else {
      majorSelect.innerHTML = filtered.map(m => `
        <option value="${m.maNganh}">${m.maNganh} — ${m.tenNganh} (${m.tongTC} TC)</option>
      `).join('');
      if (!filtered.some(m => m.maNganh === state.selectedGradeMajor)) {
        state.selectedGradeMajor = filtered[0].maNganh;
      }
      majorSelect.value = state.selectedGradeMajor;
    }

    populateGradeClasses();
    populateGradeCourses();
  }

  if (majorSelect) {
    majorSelect.addEventListener('change', (e) => {
      state.selectedGradeMajor = e.target.value;
      populateGradeClasses();
      populateGradeCourses();
    });
  }

  function populateGradeClasses() {
    if (!classSelect) return;
    const filtered = state.classes.filter(c => c.maNganh === state.selectedGradeMajor);

    if (filtered.length === 0) {
      classSelect.innerHTML = `<option value="">-- Chưa có lớp trong ngành này --</option>`;
      state.selectedGradeClass = '';
    } else {
      classSelect.innerHTML = filtered.map(c => `
        <option value="${c.maLop}">${c.maLop} — ${c.tenLop} (${c.cvht})</option>
      `).join('');
      if (!filtered.some(c => c.maLop === state.selectedGradeClass)) {
        state.selectedGradeClass = filtered[0].maLop;
      }
      classSelect.value = state.selectedGradeClass;
    }

    updateCourseMetaBanner();
    renderCourseGradesTable();
  }

  if (classSelect) {
    classSelect.addEventListener('change', (e) => {
      state.selectedGradeClass = e.target.value;
      updateCourseMetaBanner();
      renderCourseGradesTable();
    });
  }

  function populateGradeCourses() {
    if (!courseSelect) return;
    const coursesInMajor = state.curriculumByMajor[state.selectedGradeMajor] || [];

    if (coursesInMajor.length === 0) {
      courseSelect.innerHTML = `<option value="">-- Chưa có môn trong CTĐT ngành này --</option>`;
      state.selectedGradeCourse = '';
    } else {
      courseSelect.innerHTML = coursesInMajor.map(c => 
        `<option value="${c.maMon}">${c.maMon} — ${c.tenMon} (${c.soTC} TC | ${c.nhom})</option>`
      ).join('');
      if (!coursesInMajor.some(c => c.maMon === state.selectedGradeCourse)) {
        state.selectedGradeCourse = coursesInMajor[0].maMon;
      }
      courseSelect.value = state.selectedGradeCourse;
    }

    updateCourseMetaBanner();
    renderCourseGradesTable();
  }

  if (courseSelect) {
    courseSelect.addEventListener('change', (e) => {
      state.selectedGradeCourse = e.target.value;
      updateCourseMetaBanner();
      renderCourseGradesTable();
    });
  }

  if (semSelect) {
    semSelect.value = state.selectedGradeSemester;
    semSelect.addEventListener('change', (e) => {
      state.selectedGradeSemester = e.target.value;
      renderCourseGradesTable();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.gradeStudentSearch = e.target.value.toLowerCase().trim();
      renderCourseGradesTable();
    });
  }

  if (btnTemplate) {
    btnTemplate.addEventListener('click', () => {
      alert(`Đang tải file mẫu: "Mau_BangDiem_${state.selectedGradeCourse}_${state.selectedGradeClass}.xlsx"\nCột quy định: STT, Mã SV, Họ Tên, Lớp, Điểm Quá Trình (40%), Điểm Thi (60%).`);
    });
  }

  if (btnImport) {
    btnImport.addEventListener('click', () => {
      alert(`Đã import thành công bảng điểm cho môn ${state.selectedGradeCourse} - Lớp ${state.selectedGradeClass} từ file Excel!\nHệ thống tự động tính điểm TK10 và chuyển đổi thang điểm 4 & điểm chữ OU.`);
      renderCourseGradesTable();
    });
  }

  if (btnSave) {
    btnSave.addEventListener('click', () => {
      alert(`✅ ĐÃ LƯU BẢNG ĐIỂM THÀNH CÔNG!\n- Học phần: ${state.selectedGradeCourse}\n- Lớp học phần: ${state.selectedGradeClass}\n- Toàn bộ điểm học phần đã được chốt và đồng bộ vào hồ sơ sinh viên.`);
    });
  }
}

function updateCourseMetaBanner() {
  const allCourses = Object.values(state.curriculumByMajor).flat();
  const currentCourse = allCourses.find(c => c.maMon === state.selectedGradeCourse) || {
    maMon: state.selectedGradeCourse,
    tenMon: 'Học phần chuyên ngành',
    soTC: 3
  };

  const currentClass = state.classes.find(c => c.maLop === state.selectedGradeClass) || {
    maLop: state.selectedGradeClass,
    tenLop: `Lớp ${state.selectedGradeClass}`,
    cvht: 'ThS. Nguyễn Hoàng Nam'
  };

  const currentMajor = state.majors.find(m => m.maNganh === state.selectedGradeMajor);

  // Giảng viên phụ trách học phần
  const lecturer = currentCourse.maMon === 'COSC2302'
    ? 'TS. Đỗ Hồng Quân'
    : currentCourse.maMon === 'COSC2301'
    ? 'ThS. Nguyễn Hoàng Nam'
    : currentCourse.maMon === 'ACCT1301'
    ? 'TS. Nguyễn Hữu Duyên'
    : currentCourse.maMon === 'MGMT1301'
    ? 'TS. Trần Đình Cường'
    : (currentClass.cvht || 'Giảng viên phụ trách');

  const elCode = document.getElementById('course-meta-code');
  const elClass = document.getElementById('course-meta-class');
  const elTitle = document.getElementById('course-meta-title');
  const elLecturer = document.getElementById('course-meta-lecturer');
  const elFaculty = document.getElementById('course-meta-faculty');

  if (elCode) elCode.textContent = currentCourse.maMon || 'HỌC PHẦN';
  if (elClass) elClass.textContent = currentClass ? `Lớp ${currentClass.maLop}` : 'Chưa chọn lớp';
  if (elTitle) elTitle.textContent = `Môn: ${currentCourse.tenMon} (${currentCourse.soTC} Tín Chỉ)`;
  if (elLecturer) elLecturer.textContent = lecturer;
  if (elFaculty) elFaculty.textContent = currentMajor ? getFacultyName(currentMajor.maKhoa) : 'Khoa CNTT';
}

function renderCourseGradesTable() {
  const tbody = document.getElementById('course-grades-table-body');
  if (!tbody) return;

  if (!state.selectedGradeClass || !state.selectedGradeCourse) {
    tbody.innerHTML = `<tr><td colspan="10" style="text-align:center; padding:24px; color:var(--text-dim);">Vui lòng chọn lớp học phần và môn học để nhập điểm.</td></tr>`;
    return;
  }

  // Danh sách sinh viên thuộc lớp đang chọn
  const classStudents = state.students.filter(s => s.lop === state.selectedGradeClass);

  if (classStudents.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" style="text-align:center; padding:24px; color:var(--text-dim);">Lớp học <strong>${state.selectedGradeClass}</strong> hiện chưa có sinh viên nào. Vui lòng thêm sinh viên vào lớp tại mục Quản Lý Lớp Học.</td></tr>`;
    updateGradeSummaryMetrics(0, 0, 0, 0);
    return;
  }

  // Khóa lưu điểm: `${maMon}_${maLop}`
  const gradeKey = `${state.selectedGradeCourse}_${state.selectedGradeClass}`;
  
  if (!state.courseGrades[gradeKey]) {
    // Khởi tạo bảng điểm thực tế cho sinh viên trong lớp nếu chưa tồn tại
    state.courseGrades[gradeKey] = classStudents.map((st, idx) => {
      const baseQT = Math.min(10, Math.max(3, Math.round(((st.gpaTL * 2.2) + (idx % 3) * 0.4) * 10) / 10));
      const baseThi = Math.min(10, Math.max(2, Math.round(((st.gpaTL * 2.1) - (st.tcNo > 0 ? 1.5 : 0)) * 10) / 10));
      return {
        maSV: st.maSV,
        hoTen: st.hoTen,
        lop: st.lop,
        diemQT: baseQT,
        diemThi: baseThi
      };
    });
  }

  const scores = state.courseGrades[gradeKey];

  // Lọc theo từ khóa tìm kiếm
  let displayList = scores;
  if (state.gradeStudentSearch) {
    displayList = scores.filter(s => 
      s.maSV.toLowerCase().includes(state.gradeStudentSearch) ||
      s.hoTen.toLowerCase().includes(state.gradeStudentSearch)
    );
  }

  const countBadge = document.getElementById('grade-student-count-badge');
  if (countBadge) {
    countBadge.textContent = `${displayList.length} / ${scores.length} Sinh viên`;
  }

  if (displayList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" style="text-align:center; padding:24px; color:var(--text-dim);">Không tìm thấy sinh viên nào khớp với từ khóa "<strong>${state.gradeStudentSearch}</strong>" trong lớp này.</td></tr>`;
    return;
  }

  let passCount = 0;
  let failCount = 0;
  let totalTK10 = 0;

  tbody.innerHTML = displayList.map((row, idx) => {
    const tk10 = OUGradeEngine.calcDiemTK10(row.diemQT, row.diemThi, state.wQT, state.wThi);
    const conv = OUGradeEngine.convertGrade(tk10);
    row.diemTK10 = tk10;
    row.grade4 = conv.grade4;
    row.letter = conv.letter;
    row.pass = conv.pass;

    if (conv.pass) passCount++; else failCount++;
    if (tk10 !== null) totalTK10 += tk10;

    const rowClass = !conv.pass ? 'highlight-danger' : '';

    return `
      <tr class="${rowClass}" data-masv="${row.maSV}">
        <td>${idx + 1}</td>
        <td><code>${row.maSV}</code></td>
        <td><strong>${row.hoTen}</strong></td>
        <td><span class="badge" style="background:#e0e7ff; color:#3730a3; font-weight:700;">${row.lop}</span></td>
        <td>
          <input type="number" min="0" max="10" step="0.1" value="${row.diemQT}" 
            class="table-input-number score-qt-input" data-masv="${row.maSV}">
        </td>
        <td>
          <input type="number" min="0" max="10" step="0.1" value="${row.diemThi}" 
            class="table-input-number score-thi-input" data-masv="${row.maSV}">
        </td>
        <td><strong class="score-tk10" style="font-size:1.05rem; color:var(--primary);">${tk10 !== null ? tk10.toFixed(1) : '-'}</strong></td>
        <td><span class="badge ${conv.pass ? 'badge-success' : 'badge-danger'} score-letter" style="font-weight:700;">${conv.letter}</span></td>
        <td><strong class="score-grade4">${conv.grade4.toFixed(1)}</strong></td>
        <td>
          <span class="badge ${conv.pass ? 'badge-success' : 'badge-danger'} score-pass" style="font-weight:700;">
            ${conv.pass ? '✓ Đạt' : '✗ Rớt môn (F)'}
          </span>
        </td>
      </tr>
    `;
  }).join('');

  // Cập nhật thống kê
  updateGradeSummaryMetrics(scores.length, passCount, failCount, totalTK10);

  // Gắn sự kiện thay đổi điểm trực tiếp (Inline Editing)
  tbody.querySelectorAll('.score-qt-input, .score-thi-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const maSV = e.target.getAttribute('data-masv');
      const targetRow = scores.find(s => s.maSV === maSV);
      if (!targetRow) return;

      const rowTr = e.target.closest('tr');
      const qtVal = Math.min(10, Math.max(0, parseFloat(rowTr.querySelector('.score-qt-input').value) || 0));
      const thiVal = Math.min(10, Math.max(0, parseFloat(rowTr.querySelector('.score-thi-input').value) || 0));

      targetRow.diemQT = qtVal;
      targetRow.diemThi = thiVal;

      const newTK10 = OUGradeEngine.calcDiemTK10(qtVal, thiVal, state.wQT, state.wThi);
      const newConv = OUGradeEngine.convertGrade(newTK10);

      targetRow.diemTK10 = newTK10;
      targetRow.grade4 = newConv.grade4;
      targetRow.letter = newConv.letter;
      targetRow.pass = newConv.pass;

      rowTr.querySelector('.score-tk10').textContent = newTK10 !== null ? newTK10.toFixed(1) : '-';
      
      const badgeLetter = rowTr.querySelector('.score-letter');
      badgeLetter.textContent = newConv.letter;
      badgeLetter.className = `badge ${newConv.pass ? 'badge-success' : 'badge-danger'} score-letter`;

      rowTr.querySelector('.score-grade4').textContent = newConv.grade4.toFixed(1);

      const badgePass = rowTr.querySelector('.score-pass');
      badgePass.textContent = newConv.pass ? '✓ Đạt' : '✗ Rớt môn (F)';
      badgePass.className = `badge ${newConv.pass ? 'badge-success' : 'badge-danger'} score-pass`;

      rowTr.classList.toggle('highlight-danger', !newConv.pass);

      // Recompute whole class stats
      let p = 0, f = 0, sum = 0;
      scores.forEach(s => {
        const sTk10 = OUGradeEngine.calcDiemTK10(s.diemQT, s.diemThi, state.wQT, state.wThi);
        const sConv = OUGradeEngine.convertGrade(sTk10);
        if (sConv.pass) p++; else f++;
        if (sTk10 !== null) sum += sTk10;
      });
      updateGradeSummaryMetrics(scores.length, p, f, sum);
    });
  });
}

function updateGradeSummaryMetrics(total, passCount, failCount, totalTK10) {
  const avg = total > 0 ? (totalTK10 / total).toFixed(2) : '0.00';
  const elTotal = document.getElementById('metric-course-total');
  const elPassed = document.getElementById('metric-course-passed');
  const elFailed = document.getElementById('metric-course-failed');
  const elAvg = document.getElementById('metric-course-avg');

  if (elTotal) elTotal.textContent = `${total} SV`;
  if (elPassed) elPassed.textContent = total > 0 ? `${passCount} (${Math.round(passCount / total * 100)}%)` : '0 (0%)';
  if (elFailed) elFailed.textContent = total > 0 ? `${failCount} (${Math.round(failCount / total * 100)}%)` : '0 (0%)';
  if (elAvg) elAvg.textContent = `${avg}/10`;
}

// ============================================================
// 8. QUICK GUIDE MODAL / ALERT
// ============================================================
function setupQuickGuide() {
  const btn = document.getElementById('btn-quick-guide');
  btn.addEventListener('click', () => {
    alert(
      'HƯỚNG DẪN SỬ DỤNG HỆ THỐNG EDUALERT:\n\n' +
      '1. GIẢ LẬP NGƯỜI DÙNG (BÊN TRÁI SIDEBAR):\n' +
      '   - Chọn vai trò CVHT để xem cảnh báo học vụ và tư vấn sinh viên.\n' +
      '   - Chọn vai trò Sinh viên để trải nghiệm Smart Academic Planner (tính GPA mục tiêu, What-If simulation).\n' +
      '   - Chọn Khoa để quản lý lộ trình đào tạo và các lớp học.\n\n' +
      '2. QUẢN LÝ LỘ TRÌNH:\n' +
      '   - CRUD lộ trình học phần theo từng Ngành và Mã ngành (CNTT 7480201, KTPM 7480103, HTTT 7480104, QTKD 7340101).\n\n' +
      '3. QUẢN LÝ LỚP HỌC:\n' +
      '   - Theo cấu trúc: Mã ngành -> Mã lớp -> Danh sách sinh viên thuộc lớp. Thêm lớp mới, thêm sinh viên.\n\n' +
      '4. QUẢN LÝ BẢNG ĐIỂM (LỚP HỌC PHẦN & GIẢNG VIÊN):\n' +
      '   - Phân cấp 4 tầng: Khoa -> Ngành -> Lớp học phần -> Môn học. Giảng viên trực tiếp nhập điểm QT (40%) và Thi (60%), hệ thống tự động tính điểm TK10 và xếp loại điểm chữ theo Quy chế ĐH Mở TP.HCM.'
    );
  });
}

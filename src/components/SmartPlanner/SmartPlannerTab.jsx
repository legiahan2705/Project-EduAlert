'use client';

import { useState } from 'react';
import { 
  BookOpen, 
  ClipboardList, 
  Target, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  Calculator, 
  Award, 
  TrendingUp, 
  RotateCcw, 
  Plus, 
  Search, 
  ChevronRight,
  ArrowRight,
  User,
  GraduationCap,
  ExternalLink,
  Info
} from 'lucide-react';
import { OUGradeEngine } from '@/engine/OUGradeEngine';
import {
  getStudentTranscript,
  auditStudentCurriculum,
  simulateStudentPlan
} from '@/engine/studentAuditHelper';

export default function SmartPlannerTab({
  student,
  students = [],
  majors = [],
  classes = [],
  curriculumByMajor = {},
  onSelectStudent
}) {
  const [searchInput, setSearchInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Sinh viên hiện tại
  const currentStudent = student || (students.length > 0 ? students[0] : null);

  // Đối chiếu CTĐT và Bảng điểm của sinh viên hiện tại
  const auditResult = currentStudent ? auditStudentCurriculum(currentStudent, curriculumByMajor) : null;

  // Khởi tạo các môn mô phỏng: lấy các môn rớt F (nếu có) và 2 môn chưa học
  const initialSimItems = auditResult
    ? [
        ...auditResult.failedCourses.map((c) => ({
          maMon: c.maMon,
          tenMon: c.tenMon,
          soTC: c.soTC,
          isRetake: true,
          oldGrade4: c.grade4,
          oldLetter: c.letter,
          targetGrade4: 3.0, // Mặc định trả nợ đạt B+
          targetLetter: 'B+',
          selected: true
        })),
        ...auditResult.remainingCourses.slice(0, 3).map((c) => ({
          maMon: c.maMon,
          tenMon: c.tenMon,
          soTC: c.soTC,
          isRetake: false,
          oldGrade4: 0,
          oldLetter: '-',
          targetGrade4: 3.0, // Mặc định học mới đạt B+
          targetLetter: 'B+',
          selected: true
        }))
      ]
    : [];

  const [simItems, setSimItems] = useState(initialSimItems);
  const [activeViewSubtab, setActiveViewSubtab] = useState('audit'); // 'audit' | 'transcript' | 'target_gpa' | 'simulate'
  const [targetGPAInput, setTargetGPAInput] = useState(3.2);

  // Xử lý tìm kiếm MSSV
  const handleSearchMSSV = (e) => {
    e.preventDefault();
    const query = searchInput.trim().toLowerCase();
    if (!query) return;

    const found = students.find(
      (s) =>
        s.maSV.toLowerCase() === query ||
        s.hoTen.toLowerCase().includes(query)
    );

    if (found) {
      setErrorMessage('');
      if (onSelectStudent) onSelectStudent(found);
      const newAudit = auditStudentCurriculum(found, curriculumByMajor);
      if (newAudit) {
        setSimItems([
          ...newAudit.failedCourses.map((c) => ({
            maMon: c.maMon,
            tenMon: c.tenMon,
            soTC: c.soTC,
            isRetake: true,
            oldGrade4: c.grade4,
            oldLetter: c.letter,
            targetGrade4: 3.0,
            targetLetter: 'B+',
            selected: true
          })),
          ...newAudit.remainingCourses.slice(0, 3).map((c) => ({
            maMon: c.maMon,
            tenMon: c.tenMon,
            soTC: c.soTC,
            isRetake: false,
            oldGrade4: 0,
            oldLetter: '-',
            targetGrade4: 3.0,
            targetLetter: 'B+',
            selected: true
          }))
        ]);
      }
    } else {
      setErrorMessage(`Không tìm thấy sinh viên có MSSV: "${searchInput}"`);
    }
  };

  const handleSelectQuick = (maSV) => {
    const found = students.find((s) => s.maSV === maSV);
    if (found) {
      setErrorMessage('');
      setSearchInput(found.maSV);
      if (onSelectStudent) onSelectStudent(found);

      const newAudit = auditStudentCurriculum(found, curriculumByMajor);
      if (newAudit) {
        setSimItems([
          ...newAudit.failedCourses.map((c) => ({
            maMon: c.maMon,
            tenMon: c.tenMon,
            soTC: c.soTC,
            isRetake: true,
            oldGrade4: c.grade4,
            oldLetter: c.letter,
            targetGrade4: 3.0,
            targetLetter: 'B+',
            selected: true
          })),
          ...newAudit.remainingCourses.slice(0, 3).map((c) => ({
            maMon: c.maMon,
            tenMon: c.tenMon,
            soTC: c.soTC,
            isRetake: false,
            oldGrade4: 0,
            oldLetter: '-',
            targetGrade4: 3.0,
            targetLetter: 'B+',
            selected: true
          }))
        ]);
      }
    }
  };

  const handleAddCourseToSim = (course, isRetake = false) => {
    // Nếu môn đã có trong simItems thì bật selected lên
    const exists = simItems.find((item) => item.maMon === course.maMon);
    if (exists) {
      setSimItems((prev) =>
        prev.map((item) =>
          item.maMon === course.maMon ? { ...item, selected: true } : item
        )
      );
    } else {
      setSimItems((prev) => [
        ...prev,
        {
          maMon: course.maMon,
          tenMon: course.tenMon,
          soTC: course.soTC,
          isRetake,
          oldGrade4: course.grade4 || 0,
          oldLetter: course.letter || '-',
          targetGrade4: 3.0,
          targetLetter: 'B+',
          selected: true
        }
      ]);
    }
    setActiveViewSubtab('simulate');
  };

  const handleSimGradeChange = (maMon, targetGrade4) => {
    const g4 = parseFloat(targetGrade4);
    let letter = 'B';
    if (g4 >= 4.0) letter = 'A+';
    else if (g4 >= 3.5) letter = 'A';
    else if (g4 >= 3.0) letter = 'B+';
    else if (g4 >= 2.5) letter = 'B';
    else if (g4 >= 2.0) letter = 'C+';
    else if (g4 >= 1.5) letter = 'C';
    else if (g4 >= 1.0) letter = 'D';
    else letter = 'F';

    setSimItems((prev) =>
      prev.map((item) =>
        item.maMon === maMon
          ? { ...item, targetGrade4: g4, targetLetter: letter }
          : item
      )
    );
  };

  const handleToggleSimItem = (maMon) => {
    setSimItems((prev) =>
      prev.map((item) =>
        item.maMon === maMon ? { ...item, selected: !item.selected } : item
      )
    );
  };

  if (!currentStudent || !auditResult) {
    return (
      <div className="erp-card" style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>
        Đang tải hồ sơ sinh viên & chương trình đào tạo...
      </div>
    );
  }

  const studentClass = classes.find((c) => c.maLop === currentStudent.lop) || {
    maLop: currentStudent.lop,
    tenLop: `Lớp ${currentStudent.lop}`,
    cvht: 'ThS. Nguyễn Hoàng Nam',
    khoaHoc: '2022 - 2026'
  };

  const studentMajor = majors.find((m) => m.maNganh === currentStudent.maNganh) || {
    maNganh: currentStudent.maNganh || '7480201',
    tenNganh: currentStudent.nganh || 'Khoa học máy tính',
    tongTC: 141
  };

  const selectedSimItems = simItems.filter((i) => i.selected);
  const simResult = simulateStudentPlan(currentStudent, selectedSimItems);

  // Badge trạng thái học vụ
  const getRiskBadge = (level) => {
    if (level === 3) return <span className="badge-pill danger">Nguy cơ Buộc thôi học (Mức 3)</span>;
    if (level === 2) return <span className="badge-pill warning">Cảnh báo học vụ Mức 2</span>;
    if (level === 1) return <span className="badge-pill warning">Cảnh báo học vụ Mức 1</span>;
    return <span className="badge-pill success">Bình thường</span>;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* 1. METADATA SUMMARY BANNER (Chuẩn ảnh mẫu Quality Management) */}
      <div className="summary-banner" style={{ flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <div className="summary-meta-item">
            <span className="summary-meta-label">MÃ SINH VIÊN & HỌ TÊN</span>
            <span className="summary-meta-val" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#064e3b', fontWeight: 800 }}>{currentStudent.maSV}</span>
              <span>—</span>
              <span>{currentStudent.hoTen}</span>
            </span>
          </div>

          <div className="summary-meta-item">
            <span className="summary-meta-label">LỚP HỌC & NGÀNH ĐÀO TẠO</span>
            <span className="summary-meta-val">
              {currentStudent.lop} <span style={{ color: '#94a3b8' }}>•</span> {studentMajor.tenNganh}
            </span>
          </div>

          <div className="summary-meta-item">
            <span className="summary-meta-label">CỐ VẤN HỌC TẬP</span>
            <span className="summary-meta-val">{studentClass.cvht}</span>
          </div>

          <div className="summary-meta-item">
            <span className="summary-meta-label">DIỆN HỌC VỤ HIỆN TẠI</span>
            <span className="summary-meta-val">
              {getRiskBadge(currentStudent.mucCanhBao || (currentStudent.gpaTL < 1.2 ? 3 : 0))}
            </span>
          </div>
        </div>

        {/* Thanh chuyển nhanh sinh viên bên phải */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Đổi SV:</span>
          <select
            value={currentStudent.maSV}
            onChange={(e) => handleSelectQuick(e.target.value)}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              fontSize: '12.5px',
              fontWeight: 600,
              color: '#0f172a',
              background: '#f8fafc',
              cursor: 'pointer'
            }}
          >
            {students.map((s) => (
              <option key={s.maSV} value={s.maSV}>
                {s.maSV} - {s.hoTen} ({s.lop})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. 4 CARDS THỐNG KÊ HỌC VỤ (HỆ CARD ERP TINH GỌN) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
        {/* Card 1: GPA */}
        <div className="erp-card" style={{ padding: '14px 18px', margin: 0 }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
            GPA TÍCH LŨY
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '4px' }}>
            <span style={{ fontSize: '24px', fontWeight: 800, color: currentStudent.gpaTL < 2.0 ? '#b91c1c' : '#047857' }}>
              {currentStudent.gpaTL.toFixed(2)}
            </span>
            <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>/ 4.00</span>
          </div>
          <div style={{ fontSize: '11.5px', color: currentStudent.gpaTL < 2.0 ? '#ef4444' : '#10b981', marginTop: '2px', fontWeight: 500 }}>
            {currentStudent.gpaTL < 1.2 ? 'Dưới ngưỡng quy chế TT08' : 'Đạt chuẩn tích lũy'}
          </div>
        </div>

        {/* Card 2: Tín chỉ đã đạt */}
        <div className="erp-card" style={{ padding: '14px 18px', margin: 0 }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
            TÍN CHỈ ĐÃ TÍCH LŨY
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '4px' }}>
            <span style={{ fontSize: '24px', fontWeight: 800, color: '#047857' }}>
              {auditResult.stats.passedCredits}
            </span>
            <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>
              / {studentMajor.tongTC || 141} TC
            </span>
          </div>
          <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
            Đã hoàn thành {auditResult.stats.progressPercent}% CTĐT
          </div>
        </div>

        {/* Card 3: Nợ tín chỉ */}
        <div className="erp-card" style={{ padding: '14px 18px', margin: 0, backgroundColor: auditResult.stats.failedCount > 0 ? '#fffdfd' : '#ffffff' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: auditResult.stats.failedCount > 0 ? '#b91c1c' : '#64748b', textTransform: 'uppercase' }}>
            NỢ TÍN CHỈ (F)
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '4px' }}>
            <span style={{ fontSize: '24px', fontWeight: 800, color: auditResult.stats.failedCount > 0 ? '#b91c1c' : '#15803d' }}>
              {currentStudent.tcNo || 0} TC
            </span>
            <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>
              ({auditResult.stats.failedCount} môn F)
            </span>
          </div>
          <div style={{ fontSize: '11.5px', color: auditResult.stats.failedCount > 0 ? '#b91c1c' : '#15803d', marginTop: '2px', fontWeight: 500 }}>
            {auditResult.stats.failedCount > 0 ? 'Cần ưu tiên trả nợ' : 'Không có môn nợ đọng'}
          </div>
        </div>

        {/* Card 4: CTĐT còn lại */}
        <div className="erp-card" style={{ padding: '14px 18px', margin: 0 }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
            CHƯƠNG TRÌNH CÒN LẠI
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '4px' }}>
            <span style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>
              {auditResult.stats.remainingCount}
            </span>
            <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>
              môn ({auditResult.stats.remainingCredits} TC)
            </span>
          </div>
          <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
            Cần học để đủ điều kiện ra trường
          </div>
        </div>
      </div>

      {/* 3. SUBTABS NAVIGATION BAR CHUẨN ERP */}
      <div className="erp-tabs-bar" style={{ margin: 0 }}>
        <button
          type="button"
          className={`erp-tab-btn ${activeViewSubtab === 'audit' ? 'active' : ''}`}
          onClick={() => setActiveViewSubtab('audit')}
        >
          <BookOpen className="w-4 h-4" />
          <span>1. Đối Chiếu CTĐT (141 TC)</span>
        </button>

        <button
          type="button"
          className={`erp-tab-btn ${activeViewSubtab === 'transcript' ? 'active' : ''}`}
          onClick={() => setActiveViewSubtab('transcript')}
        >
          <ClipboardList className="w-4 h-4" />
          <span>2. Bảng Điểm Đã Lưu ({auditResult.transcript.length} môn)</span>
        </button>

        <button
          type="button"
          className={`erp-tab-btn ${activeViewSubtab === 'target_gpa' ? 'active' : ''}`}
          onClick={() => setActiveViewSubtab('target_gpa')}
        >
          <Target className="w-4 h-4" />
          <span>3. Tính Điểm Cần Đạt (Target GPA)</span>
        </button>

        <button
          type="button"
          className={`erp-tab-btn ${activeViewSubtab === 'simulate' ? 'active' : ''}`}
          onClick={() => setActiveViewSubtab('simulate')}
        >
          <Sparkles className="w-4 h-4" />
          <span>4. Mô Phỏng What-If ({selectedSimItems.length} môn dự kiến)</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* SUBTAB 1: ĐỐI CHIẾU CHƯƠNG TRÌNH ĐÀO TẠO                  */}
      {/* ========================================================= */}
      {activeViewSubtab === 'audit' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* A. BẢNG MÔN RỚT F (NẾU CÓ) */}
          {auditResult.failedCourses.length > 0 && (
            <div className="erp-card">
              <div className="erp-card-header" style={{ borderLeft: '4px solid #ef4444' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span className="erp-card-title" style={{ color: '#b91c1c' }}>
                    Danh Sách Môn Bị Rớt (F) Cần Ưu Tiên Đăng Ký Trả Nợ
                  </span>
                </div>
                <span className="badge-pill danger">
                  Chiếm {auditResult.stats.failedCredits} TC nợ đọng
                </span>
              </div>

              <div className="erp-table-wrapper">
                <table className="erp-table">
                  <thead>
                    <tr>
                      <th style={{ width: '48px', textAlign: 'center' }}>STT</th>
                      <th style={{ width: '120px' }}>Mã Môn</th>
                      <th>Tên Học Phần</th>
                      <th style={{ width: '80px', textAlign: 'center' }}>Số TC</th>
                      <th style={{ width: '90px', textAlign: 'center' }}>Điểm QT</th>
                      <th style={{ width: '90px', textAlign: 'center' }}>Điểm Thi</th>
                      <th style={{ width: '90px', textAlign: 'center' }}>Điểm TK10</th>
                      <th style={{ width: '90px', textAlign: 'center' }}>Điểm Chữ</th>
                      <th style={{ width: '130px', textAlign: 'center' }}>Trạng Thái</th>
                      <th style={{ width: '180px', textAlign: 'center' }}>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditResult.failedCourses.map((c, idx) => (
                      <tr key={`failed-${c.maMon}-${idx}`} style={{ backgroundColor: '#fffdfd' }}>
                        <td style={{ textAlign: 'center', color: '#64748b' }}>{idx + 1}</td>
                        <td>
                          <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>
                            {c.maMon}
                          </code>
                        </td>
                        <td style={{ fontWeight: 600, color: '#0f172a' }}>{c.tenMon}</td>
                        <td style={{ textAlign: 'center' }}>
                          <span className="badge-pill neutral">{c.soTC} TC</span>
                        </td>
                        <td style={{ textAlign: 'center' }}>{c.diemQT !== undefined ? c.diemQT.toFixed(1) : '-'}</td>
                        <td style={{ textAlign: 'center' }}>{c.diemThi !== undefined ? c.diemThi.toFixed(1) : '-'}</td>
                        <td style={{ textAlign: 'center', fontWeight: 700, color: '#b91c1c' }}>
                          {c.diemTK10 !== undefined ? c.diemTK10.toFixed(1) : '-'}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span className="badge-pill danger">F (0.0)</span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span className="badge-pill danger">Chưa đạt</span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            type="button"
                            className="btn-primary"
                            style={{ padding: '5px 10px', fontSize: '12px' }}
                            onClick={() => handleAddCourseToSim(c, true)}
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Đưa Vào Mô Phỏng</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* B. BẢNG MÔN CÒN LẠI CHƯA HỌC */}
          <div className="erp-card">
            <div className="erp-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock className="w-4 h-4 text-emerald-700" />
                <span className="erp-card-title">
                  Danh Sách Môn Chưa Học Còn Lại Trong CTĐT ({auditResult.remainingCourses.length} môn)
                </span>
              </div>
              <button
                type="button"
                className="btn-primary"
                style={{ fontSize: '12px', padding: '5px 12px' }}
                onClick={() => setActiveViewSubtab('simulate')}
              >
                <span>Mở Trình Mô Phỏng Kế Hoạch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="erp-table-wrapper">
              <table className="erp-table">
                <thead>
                  <tr>
                    <th style={{ width: '48px', textAlign: 'center' }}>STT</th>
                    <th style={{ width: '120px' }}>Mã Môn</th>
                    <th>Tên Môn Học Phần</th>
                    <th style={{ width: '80px', textAlign: 'center' }}>Số TC</th>
                    <th style={{ width: '140px' }}>Khối Kiến Thức</th>
                    <th style={{ width: '100px', textAlign: 'center' }}>Kỳ Dự Kiến</th>
                    <th style={{ width: '110px', textAlign: 'center' }}>Tính Chất</th>
                    <th style={{ width: '120px' }}>Tiên Quyết</th>
                    <th style={{ width: '150px', textAlign: 'center' }}>Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {auditResult.remainingCourses.map((c, idx) => (
                    <tr key={`rem-${c.maMon}-${idx}`}>
                      <td style={{ textAlign: 'center', color: '#64748b' }}>{idx + 1}</td>
                      <td>
                        <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>
                          {c.maMon}
                        </code>
                      </td>
                      <td style={{ fontWeight: 600, color: '#0f172a' }}>{c.tenMon}</td>
                      <td style={{ textAlign: 'center' }}>
                        <span className="badge-pill neutral">{c.soTC} TC</span>
                      </td>
                      <td style={{ color: '#475569', fontSize: '12px' }}>{c.nhom || 'Chuyên ngành'}</td>
                      <td style={{ textAlign: 'center', color: '#64748b' }}>Học kỳ {c.hkDuKien || '-'}</td>
                      <td style={{ textAlign: 'center' }}>
                        <span className={`badge-pill ${c.batBuoc !== false ? 'success' : 'neutral'}`}>
                          {c.batBuoc !== false ? 'Bắt buộc' : 'Tự chọn'}
                        </span>
                      </td>
                      <td>
                        {c.tienQuyet ? (
                          <code style={{ fontSize: '11px', color: '#64748b' }}>{c.tienQuyet}</code>
                        ) : (
                          <span style={{ color: '#94a3b8', fontSize: '12px' }}>Không</span>
                        )}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          type="button"
                          className="icon-btn"
                          title="Thêm vào danh sách mô phỏng kỳ tới"
                          style={{
                            padding: '4px 10px',
                            fontSize: '12px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: '#064e3b',
                            border: '1px solid #cbd5e1'
                          }}
                          onClick={() => handleAddCourseToSim(c, false)}
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Mô Phỏng</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUBTAB 2: BẢNG ĐIỂM ĐÃ LƯU TRONG HỆ THỐNG                */}
      {/* ========================================================= */}
      {activeViewSubtab === 'transcript' && (
        <div className="erp-card">
          <div className="erp-card-header">
            <div>
              <span className="erp-card-title">
                Bảng Điểm Tích Lũy Chi Tiết ({auditResult.transcript.length} học phần)
              </span>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>
                Quy chế OU: Điểm TK10 = 0.4 &times; QT + 0.6 &times; Thi (Quy tròn 1 chữ số thập phân).
              </p>
            </div>
            <span className="badge-pill info">
              Đã tích lũy: {auditResult.stats.passedCredits} tín chỉ
            </span>
          </div>

          <div className="erp-table-wrapper">
            <table className="erp-table">
              <thead>
                <tr>
                  <th style={{ width: '48px', textAlign: 'center' }}>STT</th>
                  <th style={{ width: '120px' }}>Mã Môn</th>
                  <th>Tên Môn Học</th>
                  <th style={{ width: '80px', textAlign: 'center' }}>Số TC</th>
                  <th style={{ width: '90px', textAlign: 'center' }}>Điểm QT</th>
                  <th style={{ width: '90px', textAlign: 'center' }}>Điểm Thi</th>
                  <th style={{ width: '90px', textAlign: 'center' }}>Điểm TK10</th>
                  <th style={{ width: '90px', textAlign: 'center' }}>Điểm Chữ</th>
                  <th style={{ width: '90px', textAlign: 'center' }}>Thang 4</th>
                  <th style={{ width: '120px', textAlign: 'center' }}>Kết Quả</th>
                </tr>
              </thead>
              <tbody>
                {auditResult.transcript.map((c, idx) => (
                  <tr key={`trans-${c.maMon}-${idx}`} style={{ backgroundColor: !c.pass ? '#fffdfd' : 'transparent' }}>
                    <td style={{ textAlign: 'center', color: '#64748b' }}>{idx + 1}</td>
                    <td>
                      <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>
                        {c.maMon}
                      </code>
                    </td>
                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{c.tenMon}</td>
                    <td style={{ textAlign: 'center' }}>
                      <span className="badge-pill neutral">{c.soTC} TC</span>
                    </td>
                    <td style={{ textAlign: 'center' }}>{c.diemQT !== undefined ? c.diemQT.toFixed(1) : '-'}</td>
                    <td style={{ textAlign: 'center' }}>{c.diemThi !== undefined ? c.diemThi.toFixed(1) : '-'}</td>
                    <td style={{ textAlign: 'center', fontWeight: 700, color: c.pass ? '#0f172a' : '#b91c1c' }}>
                      {c.diemTK10 !== undefined ? c.diemTK10.toFixed(1) : '-'}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className={`badge-pill ${c.pass ? 'success' : 'danger'}`}>
                        {c.letter}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 600 }}>
                      {c.grade4 !== undefined ? c.grade4.toFixed(1) : '-'}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className={`badge-pill ${c.pass ? 'success' : 'danger'}`}>
                        {c.pass ? 'Đạt' : 'Rớt môn (F)'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUBTAB 3: TÍNH ĐIỂM CẦN ĐẠT (TARGET GPA)                  */}
      {/* ========================================================= */}
      {activeViewSubtab === 'target_gpa' && (() => {
        const targetVal = parseFloat(targetGPAInput) || 3.0;
        const passedTC = auditResult.stats.passedCredits || 0;
        const totalTC = studentMajor.tongTC || 141;
        const remainTC = Math.max(0, totalTC - passedTC);
        const currentGPA = currentStudent.gpaTL || 0;

        const targetCalc = OUGradeEngine.calcTargetGPANeeded(
          currentGPA,
          passedTC,
          targetVal,
          remainTC
        );

        const gpaNeeded = targetCalc.gpaNeeded;
        const isPossible = targetCalc.possible;
        
        let feasibilityBadge = {
          label: 'Mục Tiêu Rất Khả Thi',
          badgeCls: 'success',
          advice: 'Sinh viên chỉ cần duy trì học lực Khá / Khá Giỏi đều đặn qua các học kỳ tới là sẽ tốt nghiệp đạt mục tiêu.'
        };

        if (!isPossible) {
          feasibilityBadge = {
            label: 'Bất Khả Thi Nếu Không Trả Nợ F',
            badgeCls: 'danger',
            advice: 'Điểm GPA hiện tại và số tín chỉ còn lại không đủ để kéo điểm. Giải pháp: Sinh viên bắt buộc phải trả nợ môn F và học cải thiện các môn D để thay thế điểm.'
          };
        } else if (gpaNeeded > 3.6) {
          feasibilityBadge = {
            label: 'Thách Thức Cực Lớn (Cần A/A+ Toàn Bộ)',
            badgeCls: 'warning',
            advice: 'Đòi hỏi sinh viên phải đạt điểm A hoặc A+ ở gần như toàn bộ các môn học còn lại trong CTĐT.'
          };
        } else if (gpaNeeded > 3.2) {
          feasibilityBadge = {
            label: 'Khả Thi Nhưng Cần Nỗ Lực Cao',
            badgeCls: 'info',
            advice: 'Đòi hỏi sinh viên phải đạt tỷ lệ điểm A (4.0) và B+ (3.5) chiếm tối thiểu 70% các môn học còn lại.'
          };
        }

        const letterEquivalent = gpaNeeded >= 3.6 ? 'A / A+ (Điểm 10: 8.5 - 10)'
          : gpaNeeded >= 3.2 ? 'B+ đến A (Điểm 10: 8.0 - 8.9)'
          : gpaNeeded >= 2.8 ? 'B đến B+ (Điểm 10: 7.0 - 8.4)'
          : gpaNeeded >= 2.4 ? 'B (Điểm 10: 6.5 - 7.4)'
          : 'C+ trở lên (Điểm 10: 5.5 - 6.9)';

        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '16px' }}>
            {/* Cột trái: Nhập mục tiêu */}
            <div className="erp-card" style={{ padding: '20px' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                Thiết Lập Mục Tiêu GPA Ra Trường
              </div>
              <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>
                Chọn hoặc kéo trượt mức GPA bạn mong muốn khi tốt nghiệp để hệ thống tính toán.
              </p>

              {/* Quick Preset Buttons */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
                  CHỌN NHANH MỨC XẾP LOẠI TỐT NGHIỆP:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  <button
                    type="button"
                    className={`icon-btn ${targetVal === 2.5 ? 'active' : ''}`}
                    onClick={() => setTargetGPAInput(2.5)}
                    style={{
                      padding: '8px 12px',
                      textAlign: 'left',
                      borderRadius: '6px',
                      background: targetVal === 2.5 ? '#064e3b' : '#f8fafc',
                      color: targetVal === 2.5 ? '#ffffff' : '#0f172a',
                      border: '1px solid #cbd5e1'
                    }}
                  >
                    <div style={{ fontSize: '12.5px', fontWeight: 700 }}>GPA 2.50</div>
                    <div style={{ fontSize: '11px', opacity: 0.8 }}>Loại Khá</div>
                  </button>

                  <button
                    type="button"
                    className={`icon-btn ${targetVal === 3.0 ? 'active' : ''}`}
                    onClick={() => setTargetGPAInput(3.0)}
                    style={{
                      padding: '8px 12px',
                      textAlign: 'left',
                      borderRadius: '6px',
                      background: targetVal === 3.0 ? '#064e3b' : '#f8fafc',
                      color: targetVal === 3.0 ? '#ffffff' : '#0f172a',
                      border: '1px solid #cbd5e1'
                    }}
                  >
                    <div style={{ fontSize: '12.5px', fontWeight: 700 }}>GPA 3.00</div>
                    <div style={{ fontSize: '11px', opacity: 0.8 }}>Loại Khá Giỏi</div>
                  </button>

                  <button
                    type="button"
                    className={`icon-btn ${targetVal === 3.2 ? 'active' : ''}`}
                    onClick={() => setTargetGPAInput(3.2)}
                    style={{
                      padding: '8px 12px',
                      textAlign: 'left',
                      borderRadius: '6px',
                      background: targetVal === 3.2 ? '#064e3b' : '#f8fafc',
                      color: targetVal === 3.2 ? '#ffffff' : '#0f172a',
                      border: '1px solid #cbd5e1'
                    }}
                  >
                    <div style={{ fontSize: '12.5px', fontWeight: 700 }}>GPA 3.20</div>
                    <div style={{ fontSize: '11px', opacity: 0.8 }}>Loại Giỏi (Bằng đỏ)</div>
                  </button>

                  <button
                    type="button"
                    className={`icon-btn ${targetVal === 3.6 ? 'active' : ''}`}
                    onClick={() => setTargetGPAInput(3.6)}
                    style={{
                      padding: '8px 12px',
                      textAlign: 'left',
                      borderRadius: '6px',
                      background: targetVal === 3.6 ? '#064e3b' : '#f8fafc',
                      color: targetVal === 3.6 ? '#ffffff' : '#0f172a',
                      border: '1px solid #cbd5e1'
                    }}
                  >
                    <div style={{ fontSize: '12.5px', fontWeight: 700 }}>GPA 3.60</div>
                    <div style={{ fontSize: '11px', opacity: 0.8 }}>Loại Xuất Sắc</div>
                  </button>
                </div>
              </div>

              {/* Slider */}
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>Tùy chỉnh mục tiêu:</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <input
                      type="number"
                      min="2.0"
                      max="4.0"
                      step="0.05"
                      value={targetGPAInput}
                      onChange={(e) => setTargetGPAInput(parseFloat(e.target.value) || 2.0)}
                      style={{
                        width: '65px',
                        padding: '4px 6px',
                        textAlign: 'center',
                        fontWeight: 700,
                        fontSize: '13px',
                        border: '1px solid #cbd5e1',
                        borderRadius: '4px'
                      }}
                    />
                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>/ 4.0</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="2.0"
                  max="4.0"
                  step="0.05"
                  value={targetGPAInput}
                  onChange={(e) => setTargetGPAInput(parseFloat(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer' }}
                />
              </div>

              {/* Thông số học vụ hiện tại */}
              <div style={{ fontSize: '12.5px', lineHeight: 1.8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '4px' }}>
                  <span style={{ color: '#64748b' }}>GPA tích lũy hiện tại:</span>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>{currentGPA.toFixed(2)} / 4.0</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', padding: '4px 0' }}>
                  <span style={{ color: '#64748b' }}>Tín chỉ đã tích lũy:</span>
                  <span style={{ fontWeight: 700, color: '#15803d' }}>{passedTC} TC</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px' }}>
                  <span style={{ color: '#64748b' }}>Tín chỉ còn lại cần học:</span>
                  <span style={{ fontWeight: 700, color: '#064e3b' }}>{remainTC} TC ({auditResult.stats.remainingCount} môn)</span>
                </div>
              </div>
            </div>

            {/* Cột phải: Kết quả tính toán */}
            <div className="erp-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                    Kết Quả Tính Toán Điểm Cần Đạt
                  </span>
                  <span className={`badge-pill ${feasibilityBadge.badgeCls}`}>
                    {feasibilityBadge.label}
                  </span>
                </div>

                {/* Score Banner */}
                <div
                  style={{
                    background: isPossible ? '#f0fdf4' : '#fef2f2',
                    border: `1px solid ${isPossible ? '#bbf7d0' : '#fecaca'}`,
                    borderRadius: '8px',
                    padding: '16px',
                    textAlign: 'center',
                    marginBottom: '16px'
                  }}
                >
                  <div style={{ fontSize: '11px', fontWeight: 700, color: isPossible ? '#15803d' : '#b91c1c', textTransform: 'uppercase' }}>
                    ĐIỂM TRUNG BÌNH CẦN ĐẠT MỖI TÍN CHỈ CÒN LẠI
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: 900, color: isPossible ? '#064e3b' : '#b91c1c', margin: '6px 0' }}>
                    {isPossible ? gpaNeeded.toFixed(2) : '> 4.00'}
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#94a3b8' }}> / 4.00</span>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>
                    Mức điểm chữ tương đương: <span style={{ color: '#064e3b', fontWeight: 700 }}>{letterEquivalent}</span>
                  </div>
                </div>

                {/* Lời khuyên */}
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '12px', fontSize: '12px', lineHeight: 1.6, color: '#334155' }}>
                  <strong style={{ color: '#0f172a' }}>Tư vấn Cố vấn học tập: </strong>
                  {feasibilityBadge.advice}
                </div>
              </div>

              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setActiveViewSubtab('simulate')}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Chuyển Sang Mô Phỏng Kịch Bản Trả Nợ</span>
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ========================================================= */}
      {/* SUBTAB 4: MÔ PHỎNG WHAT-IF VÀ DỰ BÁO KẾT QUẢ             */}
      {/* ========================================================= */}
      {activeViewSubtab === 'simulate' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px' }}>
          {/* Cột trái: Thiết lập kịch bản */}
          <div className="erp-card" style={{ padding: '18px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
              Thiết Lập Kịch Bản Môn Học Dự Kiến Kỳ Tới
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '14px' }}>
              Chọn các môn trả nợ F hoặc môn mới để hệ thống tính lại GPA tích lũy và kiểm tra diện cảnh báo học vụ.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '520px', overflowY: 'auto' }}>
              {simItems.map((item, idx) => (
                <div
                  key={`sim-${item.maMon}-${idx}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    background: item.selected ? (item.isRetake ? '#fffdfd' : '#f0fdf4') : '#f8fafc',
                    border: `1px solid ${item.selected ? (item.isRetake ? '#fecaca' : '#bbf7d0') : '#e2e8f0'}`
                  }}
                >
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, cursor: 'pointer', margin: 0 }}>
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => handleToggleSimItem(item.maMon)}
                      style={{ width: '15px', height: '15px', cursor: 'pointer' }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <code style={{ fontSize: '12px', fontWeight: 700 }}>{item.maMon}</code>
                        <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#0f172a' }}>{item.tenMon}</span>
                        <span className="badge-pill neutral" style={{ fontSize: '11px' }}>{item.soTC} TC</span>
                      </div>
                      <div style={{ fontSize: '11.5px', marginTop: '2px' }}>
                        {item.isRetake ? (
                          <span style={{ color: '#b91c1c', fontWeight: 600 }}>
                            [Trả Nợ Môn F] Thay thế hoàn toàn điểm cũ (F 0.0)
                          </span>
                        ) : (
                          <span style={{ color: '#047857', fontWeight: 500 }}>
                            [Môn Mới CTĐT] Đăng ký mới kỳ tới
                          </span>
                        )}
                      </div>
                    </div>
                  </label>

                  {item.selected && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '11.5px', color: '#64748b' }}>Mục tiêu:</span>
                      <select
                        value={item.targetGrade4}
                        onChange={(e) => handleSimGradeChange(item.maMon, e.target.value)}
                        style={{
                          padding: '3px 8px',
                          borderRadius: '4px',
                          border: '1px solid #cbd5e1',
                          fontSize: '12px',
                          fontWeight: 700,
                          color: '#0f172a'
                        }}
                      >
                        <option value="4.0">A+ (4.0)</option>
                        <option value="3.5">A (3.5)</option>
                        <option value="3.0">B+ (3.0)</option>
                        <option value="2.5">B (2.5)</option>
                        <option value="2.0">C+ (2.0)</option>
                        <option value="1.5">C (1.5)</option>
                        <option value="1.0">D (1.0)</option>
                        <option value="0.0">F (0.0)</option>
                      </select>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Cột phải: Kết quả dự phóng */}
          <div className="erp-card" style={{ padding: '18px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#064e3b', marginBottom: '4px' }}>
              Kết Quả Dự Báo Sau Mô Phỏng
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '14px' }}>
              Tính toán theo Rule Engine Thông tư 08 & Quy chế tín chỉ ĐH Mở TP.HCM.
            </p>

            {simResult && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Alert Thoát Cảnh Báo */}
                {simResult.isEscapedWarning && (
                  <div
                    style={{
                      background: '#ecfdf5',
                      border: '1px solid #a7f3d0',
                      borderRadius: '6px',
                      padding: '10px 14px',
                      color: '#064e3b',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Kịch bản này giúp sinh viên <strong>THOÁT DIỆN CẢNH BÁO HỌC VỤ</strong> và trở về trạng thái bình thường!</span>
                  </div>
                )}

                {/* Grid So Sánh */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                      GPA HIỆN TẠI
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
                      {simResult.currentGPA.toFixed(2)}
                    </div>
                    <div style={{ marginTop: '4px' }}>
                      {getRiskBadge(currentStudent.mucCanhBao || 3)}
                    </div>
                  </div>

                  <div style={{ background: '#f0fdf4', padding: '12px', borderRadius: '6px', border: '1px solid #bbf7d0' }}>
                    <div style={{ fontSize: '11px', color: '#047857', fontWeight: 700, textTransform: 'uppercase' }}>
                      GPA MÔ PHỎNG DỰ PHÓNG
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#047857', marginTop: '2px' }}>
                      {simResult.predictedGPA.toFixed(2)}{' '}
                      <small style={{ fontSize: '12px', color: simResult.diffGPA >= 0 ? '#15803d' : '#b91c1c' }}>
                        ({simResult.diffGPA >= 0 ? `+${simResult.diffGPA.toFixed(2)}` : simResult.diffGPA.toFixed(2)})
                      </small>
                    </div>
                    <div style={{ marginTop: '4px' }}>
                      <span className={`badge-pill ${simResult.newLevelBadge}`}>
                        {simResult.newLevelText}
                      </span>
                    </div>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                      NỢ TÍN CHỈ HIỆN TẠI
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: simResult.currentDebt > 0 ? '#b91c1c' : '#15803d', marginTop: '2px' }}>
                      {simResult.currentDebt} TC
                    </div>
                  </div>

                  <div style={{ background: '#f0fdf4', padding: '12px', borderRadius: '6px', border: '1px solid #bbf7d0' }}>
                    <div style={{ fontSize: '11px', color: '#047857', fontWeight: 700, textTransform: 'uppercase' }}>
                      NỢ TÍN CHỈ SAU TRẢ NỢ
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: simResult.predictedDebt === 0 ? '#15803d' : '#854d0e', marginTop: '2px' }}>
                      {simResult.predictedDebt} TC{' '}
                      {simResult.reducedDebt > 0 && (
                        <small style={{ fontSize: '11px', color: '#15803d' }}>
                          (-{simResult.reducedDebt} TC)
                        </small>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tóm tắt */}
                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '6px', fontSize: '12px', lineHeight: 1.6, color: '#475569' }}>
                  <div>• Tổng môn tham gia mô phỏng: <strong>{selectedSimItems.length} môn</strong> ({selectedSimItems.reduce((s, i) => s + i.soTC, 0)} TC).</div>
                  <div>• Số môn trả nợ điểm F: <strong>{simResult.retakeCount} môn</strong>.</div>
                  <div>• Tín chỉ tích lũy sau mô phỏng: <strong>{simResult.predictedCredits} / {studentMajor.tongTC || 141} TC</strong>.</div>
                </div>

                {/* Khuyến nghị */}
                <div style={{ background: '#ecfdf5', border: '1px solid #bbf7d0', padding: '12px', borderRadius: '6px', color: '#064e3b', fontSize: '12px', lineHeight: 1.5 }}>
                  <strong>Khuyến Nghị Học Vụ: </strong>
                  {simResult.advice}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

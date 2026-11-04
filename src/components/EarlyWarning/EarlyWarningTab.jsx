'use client';

import { useState } from 'react';
import { 
  Users, 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Filter, 
  Eye,
  Sparkles,
  Download,
  Calendar,
  Building2,
  GraduationCap
} from 'lucide-react';

export default function EarlyWarningTab({
  students = [],
  majors = [],
  classes = [],
  onViewStudentDossier,
  onOpenSimulation
}) {
  const [selectedMajor, setSelectedMajor] = useState('FIT2200001'); // Khoa học máy tính
  const [selectedClass, setSelectedClass] = useState('DH22CS01C'); // Lớp 45 SV trọng điểm
  const [riskFilter, setRiskFilter] = useState('ALL'); 
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Lọc theo Ngành
  let baseByMajor = students;
  if (selectedMajor !== 'ALL') {
    baseByMajor = baseByMajor.filter((s) => (s.maNganh || s.majorCode) === selectedMajor);
  }

  // Danh sách các lớp phù hợp với ngành đã chọn
  const availableClasses = selectedMajor === 'ALL'
    ? classes
    : classes.filter((c) => (c.maNganh || c.majorCode) === selectedMajor);

  // 2. Lọc tiếp theo Lớp
  let baseByClass = baseByMajor;
  if (selectedClass !== 'ALL') {
    baseByClass = baseByClass.filter((s) => (s.lop || s.classCode) === selectedClass);
  }

  // 3. Thống kê metrics
  const totalInScope = baseByClass.length;
  const dropOutCount = baseByClass.filter((s) => s.level === 'DROP_OUT_RISK' || s.level === 'HIGH_RISK').length;
  const warningCount = baseByClass.filter((s) => s.level === 'WARNING' || s.level === 'EARLY_WARNING').length;
  const earlySignalCount = baseByClass.filter((s) => s.level === 'EARLY_SIGNAL').length;
  const safeCount = baseByClass.filter((s) => s.level === 'SAFE' || s.level === 'NORMAL').length;

  // 4. Lọc tiếp theo Mức nguy cơ và Tìm kiếm
  let filtered = baseByClass;
  if (riskFilter !== 'ALL') {
    filtered = filtered.filter((s) => {
      if (riskFilter === 'DROP_OUT_RISK') return s.level === 'DROP_OUT_RISK' || s.level === 'HIGH_RISK';
      if (riskFilter === 'WARNING') return s.level === 'WARNING' || s.level === 'EARLY_WARNING';
      if (riskFilter === 'EARLY_SIGNAL') return s.level === 'EARLY_SIGNAL';
      if (riskFilter === 'SAFE') return s.level === 'SAFE' || s.level === 'NORMAL';
      return s.level === riskFilter;
    });
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(
      (s) =>
        s.hoTen.toLowerCase().includes(q) ||
        s.maSV.toLowerCase().includes(q) ||
        (s.lop && s.lop.toLowerCase().includes(q))
    );
  }

  filtered.sort((a, b) => (b.riskScore || 0) - (a.riskScore || 0));

  const currentClassObj = classes.find((c) => (c.maLop || c.id) === selectedClass) || {
    maLop: selectedClass,
    tenLop: `Lớp ${selectedClass}`,
    cvht: 'ThS. Nguyễn Hoàng Nam',
    siSo: 45
  };

  const getMajorName = (majorCode) => {
    const m = majors.find((x) => (x.code || x.id || x.maNganh) === majorCode);
    return m ? (m.name || m.tenNganh) : 'Khoa học máy tính';
  };

  return (
    <div className="space-y-4">
      {/* =========================================================================
          META SUMMARY BANNER (THIẾT KẾ GIỐNG 100% ẢNH MẪU QUALITY MANAGEMENT)
          ========================================================================= */}
      <div className="summary-banner">
        <div className="grid grid-cols-4 gap-8">
          <div className="summary-meta-item">
            <span className="summary-meta-label">Lớp Theo Dõi:</span>
            <span className="summary-meta-val flex items-center gap-1.5">
              <span className="text-emerald-900 font-bold">{currentClassObj.maLop}</span>
              <span className="text-xs text-slate-500 font-normal">({currentClassObj.tenLop})</span>
            </span>
          </div>

          <div className="summary-meta-item">
            <span className="summary-meta-label">Ngành Đào Tạo:</span>
            <span className="summary-meta-val text-slate-900 truncate">
              {getMajorName(selectedMajor)} (FIT)
            </span>
          </div>

          <div className="summary-meta-item">
            <span className="summary-meta-label">CVHT Phụ Trách:</span>
            <span className="summary-meta-val text-slate-900">
              {currentClassObj.cvht || 'ThS. Nguyễn Hoàng Nam'}
            </span>
          </div>

          <div className="summary-meta-item">
            <span className="summary-meta-label">Sĩ Số / Khóa:</span>
            <span className="summary-meta-val text-slate-900">
              <strong>{totalInScope}</strong> sinh viên (K2022)
            </span>
          </div>
        </div>

        {/* CỤM BADGE TỔNG HỢP NGUY CƠ (BÊN PHẢI GIỐNG ẢNH MẪU) */}
        <div className="flex flex-col items-end gap-1.5 pl-6 border-l border-slate-200">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Phân Tầng Học Vụ (TT08):
          </span>
          <div className="flex items-center gap-2">
            <span className="badge-pill danger text-xs">
              Buộc thôi học: <strong>{dropOutCount}</strong>
            </span>
            <span className="badge-pill warning text-xs">
              Cảnh báo: <strong>{warningCount}</strong>
            </span>
            <span className="badge-pill warning text-xs" style={{ background: '#fef3c7', color: '#92400e', borderColor: '#fde68a' }}>
              Tín hiệu sớm: <strong>{earlySignalCount}</strong>
            </span>
            <span className="badge-pill success text-xs">
              An toàn: <strong>{safeCount}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* FILTER & ACTION BAR */}
      <div className="erp-card">
        <div className="erp-card-header">
          {/* Bộ lọc nhanh lớp và ngành */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-600">Ngành:</span>
              <select
                className="erp-input font-medium py-1"
                value={selectedMajor}
                onChange={(e) => {
                  setSelectedMajor(e.target.value);
                  setSelectedClass('ALL');
                }}
              >
                <option value="ALL">-- Tất cả ngành --</option>
                {majors.map((m) => {
                  const mCode = m.code || m.id || m.maNganh;
                  return (
                    <option key={mCode} value={mCode}>
                      {m.name || m.tenNganh} ({mCode})
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-600">Lớp:</span>
              <select
                className="erp-input font-medium py-1"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="ALL">-- Tất cả lớp --</option>
                {availableClasses.map((c) => {
                  const cCode = c.maLop || c.id || c.code;
                  return (
                    <option key={cCode} value={cCode}>
                      Lớp {cCode} ({c.siSo || 45} SV)
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Ô tìm kiếm */}
            <div className="relative w-64">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm tên hoặc MSSV..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="erp-input pl-8 py-1 text-xs w-full"
              />
            </div>
          </div>

          {/* Cụm Tabs Lọc Mức Nguy Cơ */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setRiskFilter('ALL')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                riskFilter === 'ALL' 
                  ? 'bg-emerald-900 text-white shadow-sm' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Tất cả ({totalInScope})
            </button>

            <button
              onClick={() => setRiskFilter('DROP_OUT_RISK')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                riskFilter === 'DROP_OUT_RISK' 
                  ? 'bg-red-600 text-white shadow-sm' 
                  : 'bg-white border border-slate-200 text-red-600 hover:bg-red-50'
              }`}
            >
              Buộc thôi học ({dropOutCount})
            </button>

            <button
              onClick={() => setRiskFilter('WARNING')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                riskFilter === 'WARNING' 
                  ? 'bg-amber-600 text-white shadow-sm' 
                  : 'bg-white border border-slate-200 text-amber-700 hover:bg-amber-50'
              }`}
            >
              Cảnh báo ({warningCount})
            </button>

            <button
              onClick={() => setRiskFilter('SAFE')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                riskFilter === 'SAFE' 
                  ? 'bg-emerald-700 text-white shadow-sm' 
                  : 'bg-white border border-slate-200 text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              An toàn ({safeCount})
            </button>
          </div>
        </div>

        {/* BẢNG DỮ LIỆU SINH VIÊN (CHUẨN BẢNG QUALITY MANAGEMENT) */}
        <div className="erp-table-wrapper border-0 rounded-none">
          <table className="erp-table">
            <thead>
              <tr>
                <th style={{ width: '45px', textAlign: 'center' }}>STT</th>
                <th style={{ width: '110px' }}>MSSV</th>
                <th>HỌ VÀ TÊN SINH VIÊN</th>
                <th style={{ width: '100px' }}>LỚP</th>
                <th style={{ width: '90px', textAlign: 'right' }}>GPA HK</th>
                <th style={{ width: '90px', textAlign: 'right' }}>GPA TL</th>
                <th style={{ width: '90px', textAlign: 'right' }}>TÍN CHỈ NỢ</th>
                <th style={{ width: '80px', textAlign: 'right' }}>ĐRL</th>
                <th style={{ width: '140px' }}>CHỈ SỐ RỦI RO</th>
                <th style={{ width: '160px' }}>ĐÁNH GIÁ (TT 08)</th>
                <th style={{ width: '120px', textAlign: 'center' }}>THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center py-8 text-slate-400 text-xs">
                    Không tìm thấy sinh viên nào trong phạm vi và điều kiện lọc đã chọn.
                  </td>
                </tr>
              ) : (
                filtered.map((s, idx) => {
                  const isDropOut = s.level === 'DROP_OUT_RISK' || s.level === 'HIGH_RISK';
                  const isWarning = s.level === 'WARNING' || s.level === 'EARLY_WARNING';
                  const isEarly = s.level === 'EARLY_SIGNAL';

                  return (
                    <tr 
                      key={s.maSV || `SV_${idx}`}
                      className={isDropOut ? 'bg-red-50/30' : ''}
                    >
                      <td className="text-slate-400 font-mono text-center text-xs">
                        {idx + 1}
                      </td>
                      <td>
                        <span className="font-mono font-bold text-slate-800 text-xs bg-slate-100 px-2 py-0.5 rounded">
                          {s.maSV}
                        </span>
                      </td>
                      <td>
                        <div>
                          <p className="font-bold text-slate-900 text-xs">{s.hoTen}</p>
                          {s.notes && (
                            <p className="text-[11px] text-slate-500 truncate max-w-[240px]">
                              {s.notes}
                            </p>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="badge-pill neutral font-bold text-xs">
                          {s.lop}
                        </span>
                      </td>
                      <td className="text-right font-mono font-bold text-xs">
                        <span className={s.gpaHK !== undefined && s.gpaHK < 1.0 ? 'text-red-600' : 'text-slate-800'}>
                          {s.gpaHK !== undefined ? s.gpaHK.toFixed(2) : '—'}
                        </span>
                      </td>
                      <td className="text-right font-mono font-bold text-xs">
                        <span className={s.gpaTL < 1.4 ? 'text-red-600' : s.gpaTL < 2.0 ? 'text-amber-600' : 'text-emerald-700'}>
                          {s.gpaTL.toFixed(2)}
                        </span>
                      </td>
                      <td className="text-right font-mono font-bold text-xs">
                        <span className={s.tcNo > 10 ? 'text-red-600 font-bold' : 'text-slate-700'}>
                          {s.tcNo} TC
                        </span>
                      </td>
                      <td className="text-right font-mono text-xs text-slate-700">
                        {s.drl || 75}
                      </td>
                      <td>
                        <div className="w-24 space-y-1">
                          <div className="flex justify-between text-[10px] font-bold">
                            <span className="text-slate-400">RỦI RO</span>
                            <span className={s.riskScore >= 80 ? 'text-red-600' : s.riskScore >= 50 ? 'text-amber-600' : 'text-emerald-700'}>
                              {s.riskScore}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                s.riskScore >= 80 ? 'bg-red-600' : 
                                s.riskScore >= 50 ? 'bg-amber-500' : 'bg-emerald-600'
                              }`}
                              style={{ width: `${s.riskScore}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        {isDropOut ? (
                          <span className="badge-pill danger font-bold text-[11px]">
                            Buộc thôi học
                          </span>
                        ) : isWarning ? (
                          <span className="badge-pill warning font-bold text-[11px]">
                            Cảnh báo học vụ
                          </span>
                        ) : isEarly ? (
                          <span className="badge-pill warning text-[11px]" style={{ background: '#fef3c7', color: '#92400e', borderColor: '#fde68a' }}>
                            Tín hiệu sớm
                          </span>
                        ) : (
                          <span className="badge-pill success font-bold text-[11px]">
                            Đạt chuẩn
                          </span>
                        )}
                      </td>
                      <td>
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => onViewStudentDossier(s)}
                            className="btn-icon"
                            title="Xem hồ sơ học vụ và biên bản tư vấn CVHT"
                          >
                            <Eye size={14} />
                          </button>

                          <button
                            type="button"
                            onClick={() => onOpenSimulation(s)}
                            className="btn-icon"
                            style={{ color: '#064e3b' }}
                            title="Mô phỏng What-If đăng ký trả nợ môn"
                          >
                            <Sparkles size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

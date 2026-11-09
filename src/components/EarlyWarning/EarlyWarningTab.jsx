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
import { PROCESS_STATUSES, getProcessStatus } from '@/lib/processStatus';

// Thang màu rủi ro thống nhất (thanh, %, badge cùng một ngưỡng)
const riskTone = (score = 0) =>
  score >= 85 ? { bar: 'bg-red-600', text: 'text-red-600' }
  : score >= 60 ? { bar: 'bg-orange-500', text: 'text-orange-600' }
  : score >= 30 ? { bar: 'bg-amber-400', text: 'text-amber-600' }
  : { bar: 'bg-emerald-500', text: 'text-emerald-700' };

const levelGroup = (level) =>
  level === 'DROP_OUT_RISK' || level === 'HIGH_RISK' ? 'DROP_OUT_RISK'
  : level === 'WARNING' || level === 'EARLY_WARNING' ? 'WARNING'
  : level === 'EARLY_SIGNAL' ? 'EARLY_SIGNAL'
  : 'SAFE';

export default function EarlyWarningTab({
  students = [],
  majors = [],
  classes = [],
  onViewStudentDossier,
  onOpenSimulation
}) {
  const [selectedMajor, setSelectedMajor] = useState(classes[0]?.maNganh || classes[0]?.majorCode || 'FIT2200001');
  const [selectedClass, setSelectedClass] = useState(classes[0]?.maLop || classes[0]?.id || 'DH22CS01C');
  const [riskFilter, setRiskFilter] = useState('AT_RISK'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [processFilter, setProcessFilter] = useState('ALL');

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
  if (riskFilter === 'AT_RISK') {
    filtered = filtered.filter((s) => levelGroup(s.level) !== 'SAFE');
  } else if (riskFilter !== 'ALL') {
    filtered = filtered.filter((s) => levelGroup(s.level) === riskFilter);
  }
  const atRiskCount = totalInScope - safeCount;
  const showClassCol = selectedClass === 'ALL';

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(
      (s) =>
        s.hoTen.toLowerCase().includes(q) ||
        s.maSV.toLowerCase().includes(q) ||
        (s.lop && s.lop.toLowerCase().includes(q))
    );
  }

  if (processFilter !== 'ALL') {
    filtered = filtered.filter((s) => getProcessStatus(s).key === processFilter);
  }

  filtered.sort((a, b) => (b.riskScore || 0) - (a.riskScore || 0));

  const currentClassObj = classes.find((c) => (c.maLop || c.id) === selectedClass) || {
    maLop: selectedClass,
    tenLop: `Lớp ${selectedClass}`,
    cvht: 'ThS. Nguyễn Hoàng Nam',
    siSo: 45
  };

  // Xuất danh sách đang hiển thị ra CSV (UTF-8 có BOM để Excel đọc đúng tiếng Việt)
  const handleExport = () => {
    const levelLabel = { DROP_OUT_RISK: 'Buộc thôi học', WARNING: 'Cảnh báo', EARLY_SIGNAL: 'Tín hiệu sớm', SAFE: 'Đạt chuẩn' };
    const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const header = ['STT', 'MSSV', 'Họ và tên', 'Lớp', 'GPA HK', 'GPA TL', 'Tín chỉ nợ', 'ĐRL', 'Rủi ro (%)', 'Đánh giá (TT 08)', 'Trạng thái xử lý', 'Liên hệ gần nhất', 'Lý do / Ghi chú'];
    const rows = filtered.map((s, i) => {
      const ps = getProcessStatus(s);
      return [
        i + 1, s.maSV, s.hoTen, s.lop,
        s.gpaHK !== undefined ? s.gpaHK.toFixed(2) : '',
        s.gpaTL?.toFixed(2), s.tcNo, s.drl, s.riskScore,
        levelLabel[levelGroup(s.level)], ps.key, ps.lastDate || '', s.notes || ''
      ];
    });
    const csv = '﻿' + [header, ...rows].map((r) => r.map(esc).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `canh-bao-hoc-vu_${selectedClass}_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3 md:gap-8 w-full">
          <div className="summary-meta-item">
            <span className="summary-meta-label">Lớp Theo Dõi:</span>
            <span className="summary-meta-val flex items-center gap-1.5">
              <span className="text-emerald-900 font-bold">{currentClassObj.maLop}</span>
              <span className="hidden md:inline text-xs text-slate-500 font-normal">({currentClassObj.tenLop})</span>
            </span>
          </div>
          <div className="summary-meta-item hide-on-mobile">
            <span className="summary-meta-label">Ngành Đào Tạo:</span>
            <span className="summary-meta-val text-slate-900 truncate">{getMajorName(selectedMajor)} (FIT)</span>
          </div>
          <div className="summary-meta-item">
            <span className="summary-meta-label">CVHT Phụ Trách:</span>
            <span className="summary-meta-val text-slate-900">{currentClassObj.cvht || 'ThS. Nguyễn Hoàng Nam'}</span>
          </div>
          <div className="summary-meta-item">
            <span className="summary-meta-label">Sĩ Số / Khóa:</span>
            <span className="summary-meta-val text-slate-900"><strong>{totalInScope}</strong> sinh viên (K2022)</span>
          </div>
        </div>
      </div>

      {/* THẺ KPI - BẤM ĐỂ LỌC */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { key: 'AT_RISK', label: 'Cần theo dõi', value: atRiskCount, color: '#064e3b', hint: 'Tất cả nhóm có nguy cơ' },
          { key: 'DROP_OUT_RISK', label: 'Buộc thôi học', value: dropOutCount, color: '#dc2626', hint: 'GPA/TC nợ vượt ngưỡng TT08' },
          { key: 'WARNING', label: 'Cảnh báo học vụ', value: warningCount, color: '#ea580c', hint: 'Cần can thiệp trong học kỳ' },
          { key: 'EARLY_SIGNAL', label: 'Tín hiệu sớm', value: earlySignalCount, color: '#d97706', hint: 'Rớt môn tiên quyết' },
          { key: 'SAFE', label: 'An toàn', value: safeCount, color: '#059669', hint: 'Đạt chuẩn CTĐT' },
        ].map((k) => {
          const active = riskFilter === k.key;
          return (
            <button
              key={k.key}
              type="button"
              onClick={() => setRiskFilter(k.key)}
              title={k.hint}
              className={`text-left rounded-lg bg-white px-3 py-2 md:px-4 md:py-3 transition-all hover:shadow-md ${k.key === 'AT_RISK' ? 'col-span-2 md:col-span-1' : ''}`}
              style={{
                border: `1px solid ${active ? k.color : '#e2e8f0'}`,
                borderLeft: `4px solid ${k.color}`,
                boxShadow: active ? `0 0 0 2px ${k.color}22` : undefined,
              }}
            >
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">{k.label}</div>
              <div className="text-xl md:text-2xl font-bold leading-tight" style={{ color: k.color }}>{k.value}</div>
              <div className="hidden md:block text-[10px] text-slate-400">
                {totalInScope ? Math.round((k.value / totalInScope) * 100) : 0}% sĩ số
              </div>
            </button>
          );
        })}
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
            <div className="relative w-full md:w-64">
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

          <div className="flex items-center gap-x-3 gap-y-1 flex-wrap justify-end text-xs text-slate-500">
            <select
              className="erp-input py-1 text-xs"
              value={processFilter}
              onChange={(e) => setProcessFilter(e.target.value)}
              title="Lọc theo trạng thái xử lý của CVHT"
            >
              <option value="ALL">Xử lý: tất cả</option>
              {PROCESS_STATUSES.map((p) => (
                <option key={p.key} value={p.key}>{p.key}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleExport}
              disabled={filtered.length === 0}
              className="erp-btn erp-btn-outline flex items-center gap-1"
              style={{ padding: '4px 10px', fontSize: '12px' }}
              title="Tải danh sách đang hiển thị (mở được bằng Excel)"
            >
              <Download size={13} /> Xuất Excel
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 text-xs text-slate-500 border-t border-slate-100">
          <span>Hiển thị <strong className="text-slate-800">{filtered.length}</strong>/{totalInScope} sinh viên, xếp theo rủi ro giảm dần</span>
          {riskFilter !== 'ALL' ? (
            <button type="button" onClick={() => setRiskFilter('ALL')} className="font-semibold text-emerald-800 hover:underline">
              Xem tất cả ({totalInScope})
            </button>
          ) : (
            <button type="button" onClick={() => setRiskFilter('AT_RISK')} className="font-semibold text-emerald-800 hover:underline">
              Chỉ nhóm nguy cơ
            </button>
          )}
        </div>

        {/* DANH SÁCH DẠNG THẺ (ĐIỆN THOẠI) */}
        <div className="md:hidden divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              Không tìm thấy sinh viên nào trong phạm vi và điều kiện lọc đã chọn.
            </div>
          ) : (
            filtered.map((s, idx) => {
              const ps = getProcessStatus(s);
              const grp = levelGroup(s.level);
              const lvl = {
                DROP_OUT_RISK: { text: 'Buộc thôi học', cls: 'danger' },
                WARNING: { text: 'Cảnh báo', cls: 'warning' },
                EARLY_SIGNAL: { text: 'Tín hiệu sớm', cls: 'warning' },
                SAFE: { text: 'Đạt chuẩn', cls: 'success' },
              }[grp];
              return (
                <div key={s.maSV || `SVm_${idx}`} className={`p-3 ${grp === 'DROP_OUT_RISK' ? 'bg-red-50/40' : ''}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 text-sm truncate">{s.hoTen}</p>
                      <p className="font-mono text-[11px] text-slate-500">{s.maSV}{showClassCol ? ` · ${s.lop}` : ''}</p>
                    </div>
                    <span className={`badge-pill ${lvl.cls} font-bold text-[11px] whitespace-nowrap`}>{lvl.text}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className={`h-full ${riskTone(s.riskScore).bar}`} style={{ width: `${s.riskScore}%` }} />
                    </div>
                    <span className={`text-xs font-bold font-mono ${riskTone(s.riskScore).text}`}>Rủi ro {s.riskScore}%</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-2 text-center">
                    <div className="rounded bg-slate-50 py-1">
                      <div className="text-[10px] text-slate-500">GPA TL</div>
                      <div className={`text-xs font-bold font-mono ${s.gpaTL < 1.4 ? 'text-red-600' : s.gpaTL < 2.0 ? 'text-amber-600' : 'text-emerald-700'}`}>{s.gpaTL.toFixed(2)}</div>
                    </div>
                    <div className="rounded bg-slate-50 py-1">
                      <div className="text-[10px] text-slate-500">Tín chỉ nợ</div>
                      <div className={`text-xs font-bold font-mono ${s.tcNo > 10 ? 'text-red-600' : 'text-slate-700'}`}>{s.tcNo} TC</div>
                    </div>
                    <div className="rounded bg-slate-50 py-1">
                      <div className="text-[10px] text-slate-500">ĐRL</div>
                      <div className="text-xs font-bold font-mono text-slate-700">{s.drl || 75}</div>
                    </div>
                  </div>

                  {s.notes && <p className="text-[11px] text-slate-500 mt-2 line-clamp-2">{s.notes}</p>}

                  <div className="flex items-center justify-between gap-2 mt-2">
                    <span
                      style={{ background: ps.bg, color: ps.color, border: `1px solid ${ps.border}`, borderRadius: '999px', padding: '2px 9px', fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap' }}
                    >
                      {ps.key}
                    </span>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => onViewStudentDossier(s)} className="erp-btn erp-btn-outline flex items-center gap-1" style={{ padding: '5px 10px', fontSize: '12px' }}>
                        <Eye size={13} /> Hồ sơ
                      </button>
                      <button type="button" onClick={() => onOpenSimulation(s)} className="erp-btn erp-btn-outline flex items-center gap-1" style={{ padding: '5px 10px', fontSize: '12px', color: '#064e3b' }}>
                        <Sparkles size={13} /> Mô phỏng
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* BẢNG DỮ LIỆU SINH VIÊN (CHUẨN BẢNG QUALITY MANAGEMENT) */}
        <div className="hidden md:block erp-table-wrapper border-0 rounded-none" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <table className="erp-table">
            <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
              <tr>
                <th style={{ width: '45px', textAlign: 'center' }}>STT</th>
                <th style={{ width: '110px' }}>MSSV</th>
                <th>HỌ VÀ TÊN SINH VIÊN</th>
                {showClassCol && <th style={{ width: '100px' }}>LỚP</th>}
                <th style={{ width: '90px', textAlign: 'right' }}>GPA HK</th>
                <th style={{ width: '90px', textAlign: 'right' }}>GPA TL</th>
                <th style={{ width: '90px', textAlign: 'right' }}>TÍN CHỈ NỢ</th>
                <th style={{ width: '80px', textAlign: 'right' }}>ĐRL</th>
                <th style={{ width: '150px' }}>CHỈ SỐ RỦI RO</th>
                <th style={{ width: '130px' }}>ĐÁNH GIÁ (TT 08)</th>
                <th style={{ width: '130px' }}>XỬ LÝ</th>
                <th style={{ width: '120px', textAlign: 'center' }}>THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={showClassCol ? 12 : 11} className="text-center py-8 text-slate-400 text-xs">
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
                            <p className="text-[11px] text-slate-500 truncate max-w-[360px]" title={s.notes}>
                              {s.notes}
                            </p>
                          )}
                        </div>
                      </td>
                      {showClassCol && (
                        <td>
                          <span className="badge-pill neutral font-bold text-xs">{s.lop}</span>
                        </td>
                      )}
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
                        <div className="flex items-center gap-2 w-32">
                          <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div className={`h-full ${riskTone(s.riskScore).bar}`} style={{ width: `${s.riskScore}%` }} />
                          </div>
                          <span className={`w-9 text-right text-xs font-bold font-mono ${riskTone(s.riskScore).text}`}>
                            {s.riskScore}%
                          </span>
                        </div>
                      </td>
                      <td>
                        {isDropOut ? (
                          <span className="badge-pill danger font-bold text-[11px]">
                            Buộc thôi học
                          </span>
                        ) : isWarning ? (
                          <span className="badge-pill warning font-bold text-[11px]">
                            Cảnh báo
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
                        {(() => {
                          const ps = getProcessStatus(s);
                          return (
                            <button
                              type="button"
                              onClick={() => onViewStudentDossier(s)}
                              title={ps.lastDate ? `Liên hệ gần nhất: ${ps.lastDate}. Bấm để mở hồ sơ` : 'Chưa có nhật ký tư vấn. Bấm để mở hồ sơ'}
                              style={{ background: ps.bg, color: ps.color, border: `1px solid ${ps.border}`, borderRadius: '999px', padding: '2px 9px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}
                            >
                              {ps.key}
                            </button>
                          );
                        })()}
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

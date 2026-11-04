'use client';

import { Eye, Pencil, Power, Trash2, CheckCircle2, XCircle } from 'lucide-react';

export default function MajorsTable({
  majors = [],
  faculties = [],
  curriculumByMajor = {},
  classes = [],
  students = [],
  selectedMajorCode,
  onSelectMajor,
  onOpenEditMajor,
  onToggleStatus,
  onDeleteMajor,
  onOpenCreateMajor
}) {
  const getFacultyName = (facultyCode) => {
    const f = faculties.find((fac) => (fac.shortCode || fac.maKhoa) === facultyCode);
    return f ? f.name || f.tenKhoa : facultyCode;
  };

  if (majors.length === 0) {
    return (
      <div className="erp-card p-12 text-center text-slate-400 text-xs">
        Không tìm thấy ngành đào tạo nào phù hợp với bộ lọc hiện tại.
      </div>
    );
  }

  return (
    <div className="erp-table-wrapper border-0 rounded-none">
      <table className="erp-table">
        <thead>
          <tr>
            <th style={{ width: '45px', textAlign: 'center' }}>STT</th>
            <th style={{ width: '120px' }}>MÃ NGÀNH</th>
            <th>TÊN NGÀNH ĐÀO TẠO</th>
            <th>KHOA TRỰC THUỘC</th>
            <th style={{ width: '120px', textAlign: 'right' }}>CHUẨN TÍN CHỈ</th>
            <th style={{ width: '110px', textAlign: 'right' }}>CTĐT (MÔN)</th>
            <th style={{ width: '140px' }}>QUY MÔ LỚP / SV</th>
            <th style={{ width: '130px' }}>TRẠNG THÁI</th>
            <th style={{ width: '140px', textAlign: 'center' }}>THAO TÁC</th>
          </tr>
        </thead>
        <tbody>
          {majors.map((m, idx) => {
            const mCode = m.code || m.id || m.maNganh || `major-${idx}`;
            const mName = m.name || m.tenNganh;
            const mNameEn = m.nameEn;
            const isInactive = m.status === 'INACTIVE' || m.trangThai === 'INACTIVE';
            const courses = curriculumByMajor[mCode] || [];
            const majorClasses = classes.filter((c) => (c.maNganh || c.majorCode) === mCode);
            const majorStudents = students.filter((s) => (s.maNganh || s.majorCode) === mCode);
            const facName = getFacultyName(m.facultyCode || m.maKhoa);

            return (
              <tr
                key={`major-row-${mCode}-${idx}`}
                className={isInactive ? 'bg-slate-50/60' : ''}
              >
                <td className="text-slate-400 font-mono text-center text-xs">
                  {idx + 1}
                </td>
                <td>
                  <span className="font-mono font-bold text-slate-800 text-xs bg-slate-100 px-2 py-0.5 rounded">
                    {mCode}
                  </span>
                </td>
                <td>
                  <div>
                    <button 
                      onClick={() => onSelectMajor(mCode)}
                      className="font-bold text-slate-900 text-xs hover:text-emerald-800 text-left cursor-pointer"
                    >
                      {mName}
                    </button>
                    {mNameEn && (
                      <p className="text-[11px] text-slate-400 italic">
                        {mNameEn}
                      </p>
                    )}
                  </div>
                </td>
                <td>
                  <span className="badge-pill neutral font-semibold text-xs">
                    {facName} ({m.facultyCode || m.maKhoa})
                  </span>
                </td>
                <td className="text-right font-mono font-bold text-xs">
                  <span className="text-emerald-900">{m.creditsStandard || m.tongTC || 141} TC</span>
                </td>
                <td className="text-right font-mono font-bold text-xs text-slate-700">
                  {courses.length} môn
                </td>
                <td>
                  <span className="text-xs text-slate-800 font-medium">
                    <strong>{majorClasses.length}</strong> lớp • <strong>{majorStudents.length}</strong> SV
                  </span>
                </td>
                <td>
                  {!isInactive ? (
                    <span className="badge-pill success">
                      <CheckCircle2 size={11} /> Đang hoạt động
                    </span>
                  ) : (
                    <span className="badge-pill neutral">
                      <XCircle size={11} /> Vô hiệu hóa
                    </span>
                  )}
                </td>
                <td>
                  <div className="flex items-center justify-center gap-1.5">
                    {/* Xem chi tiết 4 Tab */}
                    <button
                      type="button"
                      onClick={() => onSelectMajor(mCode)}
                      className="btn-icon"
                      title="Xem chi tiết ngành (Tổng quan, CTĐT, Lớp, Lịch sử)"
                    >
                      <Eye size={13} />
                    </button>

                    {/* Chỉnh sửa */}
                    <button
                      type="button"
                      onClick={() => onOpenEditMajor(m)}
                      className="btn-icon"
                      title="Chỉnh sửa thông tin ngành"
                    >
                      <Pencil size={13} />
                    </button>

                    {/* Vô hiệu hóa / Kích hoạt */}
                    <button
                      type="button"
                      onClick={() => onToggleStatus(mCode)}
                      className={`btn-icon ${isInactive ? 'text-emerald-700' : ''}`}
                      title={isInactive ? 'Kích hoạt lại ngành' : 'Vô hiệu hóa ngành'}
                    >
                      <Power size={13} />
                    </button>

                    {/* Xóa */}
                    <button
                      type="button"
                      onClick={() => onDeleteMajor(mCode)}
                      className="btn-icon danger"
                      title="Xóa ngành khỏi hệ thống"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

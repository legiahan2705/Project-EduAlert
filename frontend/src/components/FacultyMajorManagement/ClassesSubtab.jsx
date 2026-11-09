'use client';

import { useState } from 'react';
import { Plus, Users, Search, Eye, Trash2, GraduationCap } from 'lucide-react';

export default function ClassesSubtab({
  major,
  classes = [],
  students = [],
  selectedClassCode,
  onSelectClass,
  onOpenCreateClass,
  onOpenAddStudent,
  onViewStudentDossier,
  onRemoveStudent
}) {
  const [studentSearch, setStudentSearch] = useState('');

  const majorCode = major.code || major.id || major.maNganh;
  const majorClasses = classes.filter((c) => (c.maNganh || c.majorCode) === majorCode);
  const currentClass = majorClasses.find((c) => (c.maLop || c.id) === selectedClassCode) || majorClasses[0];

  let studentsOfClass = currentClass ? students.filter((s) => s.lop === (currentClass.maLop || currentClass.id)) : [];

  if (studentSearch.trim()) {
    const q = studentSearch.toLowerCase().trim();
    studentsOfClass = studentsOfClass.filter(
      (s) => s.hoTen.toLowerCase().includes(q) || s.maSV.toLowerCase().includes(q)
    );
  }

  const avgClassGPA =
    studentsOfClass.length > 0
      ? (
          studentsOfClass.reduce((sum, s) => sum + (s.gpaTL || 0), 0) /
          studentsOfClass.length
        ).toFixed(2)
      : '0.00';

  return (
    <div className="space-y-4">
      {/* Cụm Chọn Lớp & Nút Tạo Lớp Mới */}
      <div className="erp-card p-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
              Lớp Thuộc Ngành:
            </span>
            {majorClasses.length === 0 ? (
              <span className="text-xs text-slate-400">
                Chưa có lớp nào thuộc ngành này.
              </span>
            ) : (
              majorClasses.map((c) => {
                const cCode = c.maLop || c.id;
                const isActive = currentClass && (currentClass.maLop || currentClass.id) === cCode;
                const count = students.filter((s) => s.lop === cCode).length;
                return (
                  <button
                    key={cCode}
                    type="button"
                    onClick={() => onSelectClass(cCode)}
                    className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-900 text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {cCode} ({count || c.siSo || 45} SV)
                  </button>
                );
              })
            )}
          </div>

          <button
            type="button"
            className="btn-outline text-xs py-1.5"
            onClick={onOpenCreateClass}
          >
            <Plus size={14} />
            + Thêm Lớp Mới
          </button>
        </div>
      </div>

      {currentClass && (
        <div className="erp-card">
          {/* Header Thông Tin Lớp Đang Chọn */}
          <div className="erp-card-header flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  {currentClass.maLop || currentClass.id}
                </span>
                <span className="font-bold text-slate-900 text-sm">
                  {currentClass.tenLop}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Niên khóa: <strong>{currentClass.khoaHoc}</strong> • CVHT: <strong>{currentClass.cvht}</strong> • Phòng học: <strong>{currentClass.phongHoc || 'A302 - 371 Nguyễn Kiệm'}</strong>
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right text-xs">
                <span className="text-slate-400 block">SĨ SỐ / ĐTB LỚP</span>
                <span className="font-bold text-slate-900 text-sm">
                  {studentsOfClass.length} SV • ĐTB {avgClassGPA}
                </span>
              </div>

              <div className="relative w-56">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm SV trong lớp..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="erp-input pl-8 py-1 text-xs w-full"
                />
              </div>

              <button
                type="button"
                className="btn-primary"
                onClick={onOpenAddStudent}
              >
                <Plus size={14} />
                + Thêm Sinh Viên
              </button>
            </div>
          </div>

          {/* Bảng Danh Sách Sinh Viên Thuộc Lớp */}
          <div className="erp-table-wrapper border-0 rounded-none">
            <table className="erp-table">
              <thead>
                <tr>
                  <th style={{ width: '45px', textAlign: 'center' }}>STT</th>
                  <th style={{ width: '130px' }}>MSSV</th>
                  <th>HỌ VÀ TÊN SINH VIÊN</th>
                  <th>GIỚI TÍNH</th>
                  <th style={{ textAlign: 'right', width: '90px' }}>GPA TL</th>
                  <th style={{ textAlign: 'right', width: '100px' }}>TÍN CHỈ ĐẠT</th>
                  <th style={{ textAlign: 'right', width: '100px' }}>NỢ MÔN F</th>
                  <th style={{ width: '150px' }}>ĐÁNH GIÁ HỌC VỤ</th>
                  <th style={{ width: '110px', textAlign: 'center' }}>THAO TÁC</th>
                </tr>
              </thead>
              <tbody>
                {studentsOfClass.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-8 text-slate-400 text-xs">
                      Không tìm thấy sinh viên nào trong lớp này.
                    </td>
                  </tr>
                ) : (
                  studentsOfClass.map((s, idx) => {
                    const isDropOut = s.level === 'DROP_OUT_RISK' || s.level === 'HIGH_RISK';
                    const isWarning = s.level === 'WARNING' || s.level === 'EARLY_WARNING';

                    return (
                      <tr key={s.maSV || `STU_${idx}`}>
                        <td className="text-slate-400 font-mono text-center text-xs">
                          {idx + 1}
                        </td>
                        <td>
                          <span className="font-mono font-bold text-slate-800 text-xs bg-slate-100 px-2 py-0.5 rounded">
                            {s.maSV}
                          </span>
                        </td>
                        <td>
                          <span className="font-bold text-slate-900 text-xs">{s.hoTen}</span>
                        </td>
                        <td className="text-xs text-slate-600">
                          {s.gioiTinh || 'Nam'}
                        </td>
                        <td className="text-right font-mono font-bold text-xs">
                          <span className={s.gpaTL < 1.4 ? 'text-red-600' : s.gpaTL < 2.0 ? 'text-amber-600' : 'text-emerald-700'}>
                            {s.gpaTL.toFixed(2)}
                          </span>
                        </td>
                        <td className="text-right font-mono font-bold text-xs text-slate-800">
                          {s.tcTichLuy} TC
                        </td>
                        <td className="text-right font-mono font-bold text-xs">
                          <span className={s.tcNo > 0 ? 'text-red-600' : 'text-slate-400'}>
                            {s.tcNo || 0} TC
                          </span>
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
                          ) : (
                            <span className="badge-pill success text-[11px]">
                              Bình thường
                            </span>
                          )}
                        </td>
                        <td>
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => onViewStudentDossier(s)}
                              className="btn-icon"
                              title="Xem hồ sơ học vụ sinh viên"
                            >
                              <Eye size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={() => onRemoveStudent(s.maSV)}
                              className="btn-icon danger"
                              title="Xóa sinh viên khỏi lớp"
                            >
                              <Trash2 size={13} />
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
      )}
    </div>
  );
}

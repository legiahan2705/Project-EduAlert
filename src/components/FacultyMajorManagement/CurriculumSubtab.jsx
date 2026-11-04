'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, BookOpen, Share2 } from 'lucide-react';

export default function CurriculumSubtab({
  major,
  curriculum = [],
  onOpenAddCourse,
  onOpenEditCourse,
  onDeleteCourse
}) {
  const [semesterFilter, setSemesterFilter] = useState('ALL');
  const [searchText, setSearchText] = useState('');

  const courses = curriculum || [];
  let filtered = courses;

  if (semesterFilter !== 'ALL') {
    const sem = parseInt(semesterFilter, 10);
    filtered = filtered.filter((c) => c.hkDuKien === sem);
  }

  if (searchText.trim()) {
    const q = searchText.toLowerCase().trim();
    filtered = filtered.filter(
      (c) => c.maMon.toLowerCase().includes(q) || c.tenMon.toLowerCase().includes(q)
    );
  }

  // Thống kê tín chỉ CTĐT
  const totalCreditsInCurriculum = courses.reduce((sum, c) => sum + (c.soTC || 3), 0);
  const coreCoursesCount = courses.filter((c) => c.batBuoc).length;
  const electiveCoursesCount = courses.filter((c) => !c.batBuoc).length;

  return (
    <div className="erp-card">
      {/* Header Filters & Add Course Button */}
      <div className="erp-card-header flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <select
            className="erp-input font-medium py-1 text-xs w-48"
            value={semesterFilter}
            onChange={(e) => setSemesterFilter(e.target.value)}
          >
            <option value="ALL">-- Tất cả học kỳ (1 - 8) --</option>
            <option value="1">Học kỳ 1</option>
            <option value="2">Học kỳ 2</option>
            <option value="3">Học kỳ 3</option>
            <option value="4">Học kỳ 4</option>
            <option value="5">Học kỳ 5</option>
            <option value="6">Học kỳ 6</option>
            <option value="7">Học kỳ 7</option>
            <option value="8">Học kỳ 8 (Tốt nghiệp)</option>
          </select>

          <div className="relative w-64">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm theo mã hoặc tên học phần..."
              className="erp-input pl-8 py-1 text-xs w-full"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-xs text-slate-500">
            Tích lũy: <strong className="text-emerald-900">{totalCreditsInCurriculum}</strong> / {major.creditsStandard || 141} TC
            <span className="mx-2">•</span>
            Bắt buộc: <strong>{coreCoursesCount}</strong> <span className="mx-1">•</span> Tự chọn: <strong>{electiveCoursesCount}</strong>
          </div>

          <button
            type="button"
            className="btn-primary"
            onClick={onOpenAddCourse}
          >
            <Plus size={15} />
            + Thêm Môn Vào CTĐT
          </button>
        </div>
      </div>

      {/* Bảng Học Phần CTĐT */}
      <div className="erp-table-wrapper border-0 rounded-none">
        <table className="erp-table">
          <thead>
            <tr>
              <th style={{ width: '45px', textAlign: 'center' }}>STT</th>
              <th style={{ width: '120px' }}>MÃ HỌC PHẦN</th>
              <th>TÊN HỌC PHẦN</th>
              <th style={{ width: '90px', textAlign: 'right' }}>SỐ TC</th>
              <th>KHỐI KIẾN THỨC</th>
              <th>HỌC PHẦN TIÊN QUYẾT</th>
              <th style={{ width: '100px', textAlign: 'center' }}>HK DỰ KIẾN</th>
              <th style={{ width: '130px' }}>PHÂN LOẠI</th>
              <th style={{ width: '110px', textAlign: 'center' }}>THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-8 text-slate-400 text-xs">
                  Chưa có học phần nào trong danh sách. Bấm <strong>"+ Thêm Môn Vào CTĐT"</strong> để bổ sung.
                </td>
              </tr>
            ) : (
              filtered.map((c, idx) => {
                const origIndex = courses.indexOf(c);
                const isInterdisciplinary = c.nhom?.includes('liên ngành') || (c.maKhoa && c.maKhoa !== 'FIT');

                return (
                  <tr key={c.maMon + '-' + idx}>
                    <td className="text-slate-400 font-mono text-center text-xs">
                      {idx + 1}
                    </td>
                    <td>
                      <span className="font-mono font-bold text-slate-800 text-xs bg-slate-100 px-2 py-0.5 rounded">
                        {c.maMon}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900 text-xs">{c.tenMon}</span>
                        {isInterdisciplinary && (
                          <span className="badge-pill purple text-[10px]" title="Môn liên ngành từ Khoa khác">
                            <Share2 size={10} /> Liên ngành
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="text-right font-mono font-bold text-xs">
                      <span className="text-emerald-900">{c.soTC} TC</span>
                    </td>
                    <td>
                      <span className="text-xs text-slate-600 font-medium">
                        {c.nhom || 'Chuyên ngành'}
                      </span>
                    </td>
                    <td>
                      {c.tienQuyet ? (
                        <span className="badge-pill neutral font-mono text-xs">
                          {c.tienQuyet}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="text-center font-bold text-xs text-slate-700">
                      HK {c.hkDuKien}
                    </td>
                    <td>
                      {c.batBuoc ? (
                        <span className="badge-pill success text-xs">
                          Bắt buộc
                        </span>
                      ) : (
                        <span className="badge-pill warning text-xs">
                          Tự chọn
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          className="btn-icon"
                          onClick={() => onOpenEditCourse(c, origIndex)}
                          title="Chỉnh sửa môn học"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          type="button"
                          className="btn-icon danger"
                          onClick={() => onDeleteCourse(origIndex)}
                          title="Xóa môn khỏi CTĐT"
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
  );
}

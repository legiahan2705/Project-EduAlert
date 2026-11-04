'use client';

import { Eye, Edit2, CheckCircle2, Ban, Trash2, BookOpen, Users, Award } from 'lucide-react';

export default function MajorsGrid({
  majors,
  faculties,
  curriculumByMajor,
  classes,
  students,
  selectedMajorCode,
  onSelectMajor,
  onOpenEditMajor,
  onToggleStatus,
  onDeleteMajor
}) {
  const getFacultyName = (maKhoa) => {
    const f = faculties.find((fac) => fac.maKhoa === maKhoa);
    return f ? f.tenKhoa : maKhoa;
  };

  if (majors.length === 0) {
    return (
      <div style={{ gridColumn: '1 / -1', padding: '36px', textAlign: 'center', background: '#ffffff', border: '1px dashed var(--border-color)', borderRadius: '12px', color: 'var(--text-dim)' }}>
        Không tìm thấy ngành đào tạo nào phù hợp với bộ lọc.
      </div>
    );
  }

  return (
    <div className="majors-cards-grid">
      {majors.map((m) => {
        const isSelected = m.maNganh === selectedMajorCode;
        const isInactive = m.trangThai === 'INACTIVE';
        const courses = curriculumByMajor[m.maNganh] || [];
        const majorClasses = classes.filter((c) => c.maNganh === m.maNganh);
        const facName = getFacultyName(m.maKhoa);

        return (
          <div
            key={m.maNganh}
            className={`major-card ${isSelected ? 'active' : ''} ${isInactive ? 'card-inactive' : ''}`}
            onClick={() => onSelectMajor(m.maNganh)}
          >
            <div>
              <div className="major-card-header">
                <span className="major-code-tag">{m.maNganh}</span>
                <span className="pill-badge">{m.maKhoa}</span>
              </div>
              <h3 className="major-card-title">{m.tenNganh}</h3>
              <div className="major-card-fac" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{facName}</span>
                {isInactive && (
                  <span className="badge badge-inactive" style={{ fontSize: '0.65rem' }}>Đã vô hiệu hóa</span>
                )}
              </div>
              <p className="major-card-desc">
                {m.moTa || 'Chương trình đào tạo đại học chính quy chuẩn chất lượng cao.'}
              </p>
            </div>

            <div>
              <div className="major-card-stats">
                <span>Chuẩn: <strong>{m.tongTC} TC</strong></span>
                <span>CTĐT: <strong>{courses.length} môn</strong></span>
                <span>Lớp: <strong>{majorClasses.length} lớp</strong></span>
              </div>

              <div
                className="btn-icon-group"
                style={{ marginTop: '12px', justifyContent: 'flex-end', display: 'flex', gap: '6px' }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* 1. Xem Chi Tiết */}
                <button
                  type="button"
                  className="btn-icon btn-icon-view"
                  onClick={() => onSelectMajor(m.maNganh)}
                  title="Xem chi tiết ngành & Chương trình đào tạo"
                  aria-label="Xem chi tiết"
                >
                  <Eye className="w-4 h-4" />
                </button>

                {/* 2. Sửa thông tin ngành */}
                <button
                  type="button"
                  className="btn-icon btn-icon-edit"
                  onClick={() => onOpenEditMajor(m)}
                  title="Chỉnh sửa thông tin ngành"
                  aria-label="Chỉnh sửa ngành"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                {/* 3. Vô hiệu hóa / Kích hoạt */}
                {isInactive ? (
                  <button
                    type="button"
                    className="btn-icon btn-icon-activate"
                    onClick={() => onToggleStatus(m.maNganh)}
                    title="Kích hoạt lại ngành hoạt động"
                    aria-label="Kích hoạt ngành"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-icon btn-icon-deactivate"
                    onClick={() => onToggleStatus(m.maNganh)}
                    title="Vô hiệu hóa ngành (tạm ngưng)"
                    aria-label="Vô hiệu hóa ngành"
                  >
                    <Ban className="w-4 h-4 text-amber-600" />
                  </button>
                )}

                {/* 4. Xóa ngành */}
                <button
                  type="button"
                  className="btn-icon btn-icon-delete"
                  onClick={() => onDeleteMajor(m.maNganh)}
                  title="Xóa ngành khỏi hệ thống"
                  aria-label="Xóa ngành"
                >
                  <Trash2 className="w-4 h-4 text-rose-600" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

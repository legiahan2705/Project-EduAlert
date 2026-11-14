'use client';

import { 
  X, 
  Building2, 
  GraduationCap, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  FileText, 
  Pencil,
  Save
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function EditMajorModal({ 
  isOpen, 
  onClose, 
  major, 
  faculties = [], 
  onUpdateMajor,
  onSaveMajor 
}) {
  const [tenNganh, setTenNganh] = useState('');
  const [tongTC, setTongTC] = useState(141);
  const [heDaoTao, setHeDaoTao] = useState('Kỹ sư / Cử nhân Chính quy');
  const [trangThai, setTrangThai] = useState('ACTIVE');
  const [moTa, setMoTa] = useState('');

  useEffect(() => {
    if (major) {
      setTenNganh(major.name || major.tenNganh || '');
      setTongTC(major.creditsStandard || major.tongTC || 141);
      setHeDaoTao(major.degreeLevel || major.heDaoTao || 'Kỹ sư / Cử nhân Chính quy');
      setTrangThai(major.status || major.trangThai || 'ACTIVE');
      setDescriptionSafe(major.description || major.moTa || '');
    }
  }, [major]);

  const setDescriptionSafe = (val) => setMoTa(val);

  if (!isOpen || !major) return null;

  const mCode = major.code || major.id || major.maNganh;
  const fCode = major.facultyCode || major.maKhoa;
  const fac = faculties.find((f) => f.shortCode === fCode || f.id === fCode);
  const facName = fac ? fac.name : (major.facultyName || fCode);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...major,
      name: tenNganh.trim(),
      tenNganh: tenNganh.trim(),
      creditsStandard: parseInt(tongTC, 10) || 141,
      tongTC: parseInt(tongTC, 10) || 141,
      degreeLevel: heDaoTao,
      heDaoTao,
      status: trangThai,
      trangThai,
      description: moTa.trim(),
      moTa: moTa.trim()
    };

    const saveHandler = onUpdateMajor || onSaveMajor;
    if (saveHandler) saveHandler(updated);
    onClose();
  };

  return (
    <div className="erp-modal-overlay" onClick={onClose}>
      <div 
        className="erp-modal-content max-w-2xl w-[95%] shadow-2xl rounded-xl border border-slate-200 overflow-hidden" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="erp-modal-header bg-gradient-to-r from-slate-50 via-white to-emerald-50/30 px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-900 text-white flex items-center justify-center shadow-sm">
              <Pencil size={18} className="text-emerald-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                Chỉnh Sửa Ngành: {major.name || major.tenNganh}
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono">
                  {mCode}
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Cập nhật thông tin đào tạo, chỉ tiêu tín chỉ và trạng thái hoạt động
              </p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* MODAL BODY */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="erp-modal-body p-6 space-y-4.5 max-h-[75vh] overflow-y-auto">
            {/* KHOA TRỰC THUỘC (READONLY BADGE) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Building2 size={13} className="text-emerald-700" />
                Khoa Quản Lý Trực Thuộc
              </label>
              <div className="px-3 py-2 bg-slate-100 border border-slate-200 rounded-md text-xs font-semibold text-slate-700 flex items-center justify-between">
                <span>{fCode} — {facName}</span>
                <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-mono">
                  Cố định theo mã ngành
                </span>
              </div>
            </div>

            {/* FORM 2-COLUMN GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <BookOpen size={13} className="text-emerald-700" />
                  Tên Ngành Đào Tạo (*)
                </label>
                <input 
                  type="text"
                  className="erp-input w-full font-medium text-slate-900 shadow-2xs"
                  value={tenNganh}
                  onChange={(e) => setTenNganh(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Award size={13} className="text-emerald-700" />
                  Chuẩn Tín Chỉ Tốt Nghiệp (*)
                </label>
                <div className="relative">
                  <input 
                    type="number"
                    min="100"
                    max="200"
                    className="erp-input w-full font-bold text-emerald-900 pr-14 shadow-2xs"
                    value={tongTC}
                    onChange={(e) => setTongTC(e.target.value)}
                    required
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 pointer-events-none">
                    Tín chỉ
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <GraduationCap size={13} className="text-emerald-700" />
                  Bậc / Hệ Đào Tạo
                </label>
                <select 
                  className="erp-input w-full font-medium text-slate-800 bg-white shadow-2xs"
                  value={heDaoTao}
                  onChange={(e) => setHeDaoTao(e.target.value)}
                >
                  <option value="Kỹ sư / Cử nhân Chính quy">Kỹ sư / Cử nhân Chính quy</option>
                  <option value="Chương trình Chất lượng cao">Chương trình Chất lượng cao</option>
                  <option value="Liên thông Đại học Chính quy">Liên thông Đại học Chính quy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-700" />
                  Trạng Thái Tuyển Sinh
                </label>
                <select 
                  className="erp-input w-full font-semibold bg-white shadow-2xs"
                  value={trangThai}
                  onChange={(e) => setTrangThai(e.target.value)}
                >
                  <option value="ACTIVE">ACTIVE — Đang hoạt động & tuyển sinh</option>
                  <option value="INACTIVE">INACTIVE — Tạm ngưng hoạt động</option>
                </select>
              </div>
            </div>

            {/* MÔ TẢ (FULL WIDTH) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <FileText size={13} className="text-emerald-700" />
                Mô Tả Mục Tiêu & Chuẩn Đầu Ra
              </label>
              <textarea 
                className="erp-input w-full text-slate-800 resize-none leading-relaxed shadow-2xs"
                rows={3}
                value={moTa}
                onChange={(e) => setMoTa(e.target.value)}
                placeholder="Mô tả mục tiêu đào tạo, chuẩn đầu ra..."
              />
            </div>
          </div>

          {/* MODAL FOOTER */}
          <div className="erp-modal-footer bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/70 rounded-lg transition-colors border border-slate-200"
            >
              Hủy Bỏ
            </button>
            <button 
              type="submit"
              className="btn-primary px-5 py-2 text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Save size={15} />
              Lưu Thay Đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

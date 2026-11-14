'use client';

import { X, Building2, Calendar, User, MapPin, Plus } from 'lucide-react';
import { useState } from 'react';

export default function ClassModal({ isOpen, onClose, majorName, onAddClass }) {
  const [maLop, setMaLop] = useState('');
  const [tenLop, setTenLop] = useState('');
  const [nienKhoa, setNienKhoa] = useState('2022 - 2026');
  const [cvht, setCvht] = useState('');
  const [phong, setPhong] = useState('Cơ sở 371 Nguyễn Kiệm, Gò Vấp');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddClass({
      maLop: maLop.trim().toUpperCase(),
      tenLop: tenLop.trim(),
      khoaHoc: nienKhoa.trim(),
      namHocThu: 1,
      cvht: cvht.trim(),
      emailCVHT: `${maLop.trim().toLowerCase()}@ou.edu.vn`,
      phongHoc: phong.trim()
    });
    setMaLop('');
    setTenLop('');
    setCvht('');
    onClose();
  };

  return (
    <div className="erp-modal-overlay" onClick={onClose}>
      <div 
        className="erp-modal-content max-w-2xl w-[95%] shadow-2xl rounded-xl border border-slate-200 overflow-hidden" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="erp-modal-header bg-gradient-to-r from-slate-50 via-white to-emerald-50/30 px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-900 text-white flex items-center justify-center shadow-sm">
              <Building2 size={20} className="text-emerald-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                Thêm Lớp Học Mới
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono">
                  {majorName}
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Khởi tạo lớp sinh hoạt và tự động sinh 8 học kỳ bảng điểm theo CTĐT
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

        {/* BODY */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="erp-modal-body p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  Mã Lớp Học (*)
                </label>
                <input
                  type="text"
                  className="erp-input w-full font-bold uppercase text-slate-900 shadow-2xs"
                  placeholder="Ví dụ: DH22IT02"
                  value={maLop}
                  onChange={(e) => setMaLop(e.target.value)}
                  required
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Định danh lớp sinh hoạt, ví dụ: DH22IT02
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  Tên Lớp Học Chi Tiết (*)
                </label>
                <input
                  type="text"
                  className="erp-input w-full font-medium text-slate-900 shadow-2xs"
                  placeholder="Ví dụ: ĐH CNTT Khóa 2022 - Lớp 02"
                  value={tenLop}
                  onChange={(e) => setTenLop(e.target.value)}
                  required
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Tên đầy đủ hiển thị trên biểu mẫu học vụ
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Calendar size={13} className="text-emerald-700" />
                  Niên Khóa Đào Tạo (*)
                </label>
                <input
                  type="text"
                  className="erp-input w-full font-semibold text-slate-800 shadow-2xs"
                  placeholder="2022 - 2026"
                  value={nienKhoa}
                  onChange={(e) => setNienKhoa(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <User size={13} className="text-emerald-700" />
                  Cố Vấn Học Tập (CVHT) (*)
                </label>
                <input
                  type="text"
                  className="erp-input w-full font-medium text-slate-800 shadow-2xs"
                  placeholder="Ví dụ: ThS. Trần Văn Minh"
                  value={cvht}
                  onChange={(e) => setCvht(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <MapPin size={13} className="text-emerald-700" />
                Phòng Sinh Hoạt / Cơ Sở Học
              </label>
              <input
                type="text"
                className="erp-input w-full text-slate-800 shadow-2xs"
                placeholder="Cơ sở 371 Nguyễn Kiệm, Gò Vấp"
                value={phong}
                onChange={(e) => setPhong(e.target.value)}
              />
            </div>
          </div>

          {/* FOOTER */}
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
              <Plus size={15} />
              Tạo Lớp Học
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

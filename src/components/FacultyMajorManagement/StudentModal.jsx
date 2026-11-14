'use client';

import { X, UserPlus, User, Calendar, Award, Plus, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function StudentModal({ isOpen, onClose, selectedClassCode, onAddStudent }) {
  const [maSV, setMaSV] = useState('');
  const [hoTen, setHoTen] = useState('');
  const [gioiTinh, setGioiTinh] = useState('Nam');
  const [ngaySinh, setNgaySinh] = useState('10/10/2004');
  const [gpaTL, setGpaTL] = useState(2.80);
  const [tcTichLuy, setTcTichLuy] = useState(54);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddStudent({
      maSV: maSV.trim(),
      hoTen: hoTen.trim(),
      gioiTinh,
      ngaySinh: ngaySinh.trim(),
      gpaTL: parseFloat(gpaTL) || 2.5,
      tcTichLuy: parseInt(tcTichLuy, 10) || 0,
      lop: selectedClassCode
    });
    setMaSV('');
    setHoTen('');
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
              <UserPlus size={20} className="text-emerald-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                Thêm Sinh Viên Mới
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono">
                  {selectedClassCode}
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Tự động khởi tạo tài khoản sinh viên đăng nhập hệ thống (Mật khẩu: Sinhvien@123)
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
            {/* THÔNG BÁO TÀI KHOẢN TỰ SINH */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-center gap-2">
              <Sparkles size={16} className="text-emerald-700 shrink-0" />
              <span>
                Sau khi thêm, sinh viên có thể dùng <strong>MSSV</strong> để đăng nhập và xem hồ sơ học tập cá nhân.
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  Mã Số Sinh Viên (MSSV) (*)
                </label>
                <input
                  type="text"
                  className="erp-input w-full font-bold font-mono text-slate-900 shadow-2xs"
                  placeholder="Ví dụ: 2251050226"
                  value={maSV}
                  onChange={(e) => setMaSV(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <User size={13} className="text-emerald-700" />
                  Họ Và Tên Sinh Viên (*)
                </label>
                <input
                  type="text"
                  className="erp-input w-full font-semibold text-slate-900 shadow-2xs"
                  placeholder="Ví dụ: Nguyễn Gia Huy"
                  value={hoTen}
                  onChange={(e) => setHoTen(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  Giới Tính
                </label>
                <select
                  className="erp-input w-full font-medium text-slate-800 bg-white shadow-2xs"
                  value={gioiTinh}
                  onChange={(e) => setGioiTinh(e.target.value)}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Calendar size={13} className="text-emerald-700" />
                  Ngày Sinh (DD/MM/YYYY)
                </label>
                <input
                  type="text"
                  className="erp-input w-full font-medium text-slate-800 shadow-2xs"
                  placeholder="10/10/2004"
                  value={ngaySinh}
                  onChange={(e) => setNgaySinh(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Award size={13} className="text-emerald-700" />
                  GPA Tích Lũy Ban Đầu (Hệ 4)
                </label>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  max="4"
                  className="erp-input w-full font-bold text-emerald-900 shadow-2xs"
                  value={gpaTL}
                  onChange={(e) => setGpaTL(e.target.value)}
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Dùng để tính mức độ rủi ro học vụ ban đầu
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  Tín Chỉ Đã Tích Lũy
                </label>
                <input
                  type="number"
                  min="0"
                  max="160"
                  className="erp-input w-full font-bold text-slate-900 shadow-2xs"
                  value={tcTichLuy}
                  onChange={(e) => setTcTichLuy(e.target.value)}
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Số tín chỉ đạt chuẩn tích lũy đến hiện tại
                </span>
              </div>
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
              Thêm Vào Lớp & Khởi Tạo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

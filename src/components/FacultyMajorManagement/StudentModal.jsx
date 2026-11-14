'use client';

import { X, UserPlus, User, Calendar, Phone, Mail, Plus, Sparkles, BookOpen } from 'lucide-react';
import { useState } from 'react';

export default function StudentModal({ isOpen, onClose, selectedClassCode, onAddStudent }) {
  const [maSV, setMaSV] = useState('');
  const [hoTen, setHoTen] = useState('');
  const [gioiTinh, setGioiTinh] = useState('Nam');
  const [ngaySinh, setNgaySinh] = useState('10/10/2005');
  const [sdt, setSdt] = useState('');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleMssvChange = (val) => {
    setMaSV(val);
    if (!email || email.endsWith('@student.ou.edu.vn')) {
      setEmail(val ? `${val.trim().toLowerCase()}@student.ou.edu.vn` : '');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddStudent({
      maSV: maSV.trim(),
      hoTen: hoTen.trim(),
      gioiTinh,
      ngaySinh: ngaySinh.trim(),
      sdt: sdt.trim(),
      email: email.trim() || `${maSV.trim().toLowerCase()}@student.ou.edu.vn`,
      namHoc: 1,
      gpaTL: 0,
      gpaHK: 0,
      tcTichLuy: 0,
      tcNo: 0,
      lop: selectedClassCode
    });
    setMaSV('');
    setHoTen('');
    setSdt('');
    setEmail('');
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
                Thêm Sinh Viên Mới Vào Lớp
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono">
                  {selectedClassCode}
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Khởi đầu lộ trình học từ Năm 1 (HK1). Tự động tạo tài khoản sinh viên (Mật khẩu: Sinhvien@123)
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
            {/* THÔNG BÁO LỘ TRÌNH ĐÀO TẠO CHUẨN */}
            <div className="p-3.5 bg-emerald-50/90 border border-emerald-200 rounded-lg text-xs text-emerald-950 flex items-start gap-3">
              <div className="w-7 h-7 rounded-md bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                <BookOpen size={15} />
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-emerald-900 flex items-center gap-2">
                  Quy định lộ trình học vụ: Bắt đầu từ Năm 1 (HK1)
                  <span className="text-[10px] bg-emerald-200/70 text-emerald-900 font-semibold px-1.5 py-0.2 rounded">
                    Không nhập điểm ban đầu
                  </span>
                </p>
                <p className="text-slate-600 text-[11.5px] leading-relaxed">
                  Sinh viên mới được xếp vào lớp từ đầu Năm 1. Điểm GPA tích lũy và số tín chỉ đạt sẽ được hệ thống tính toán tự động từ bảng điểm từng môn học trong chương trình đào tạo của lớp khi giảng viên nhập điểm.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  Mã Số Sinh Viên (MSSV) (*)
                </label>
                <input
                  type="text"
                  className="erp-input w-full font-bold font-mono text-slate-900 shadow-2xs"
                  placeholder="Ví dụ: 2451050001"
                  value={maSV}
                  onChange={(e) => handleMssvChange(e.target.value)}
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
                  placeholder="10/10/2005"
                  value={ngaySinh}
                  onChange={(e) => setNgaySinh(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Phone size={13} className="text-emerald-700" />
                  Số Điện Thoại (Tùy chọn)
                </label>
                <input
                  type="tel"
                  className="erp-input w-full font-medium text-slate-800 shadow-2xs"
                  placeholder="0901234567"
                  value={sdt}
                  onChange={(e) => setSdt(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Mail size={13} className="text-emerald-700" />
                  Email Sinh Viên
                </label>
                <input
                  type="email"
                  className="erp-input w-full font-mono text-xs text-slate-800 shadow-2xs"
                  placeholder="2451050001@student.ou.edu.vn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* THÔNG BÁO TÀI KHOẢN ĐĂNG NHẬP */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 flex items-center gap-2">
              <Sparkles size={15} className="text-emerald-600 shrink-0" />
              <span>
                Hệ thống tự động kích hoạt tài khoản sinh viên: Tên đăng nhập là <strong>MSSV</strong>, mật khẩu mặc định <code>Sinhvien@123</code>.
              </span>
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

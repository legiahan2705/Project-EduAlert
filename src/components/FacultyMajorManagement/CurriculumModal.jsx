'use client';

import { useState, useEffect } from 'react';
import { X, BookOpen, Share2 } from 'lucide-react';
import { GLOBAL_COURSE_POOL } from '@/engine/mockData';

export default function CurriculumModal({
  isOpen,
  onClose,
  majorName,
  courseToEdit,
  editIndex,
  onSaveCourse
}) {
  const [sourceMode, setSourceMode] = useState('POOL'); // 'POOL' (Từ ngành/khoa khác) | 'CUSTOM' (Tự tạo)
  const [selectedPoolCode, setSelectedPoolCode] = useState('');
  
  const [maMon, setMaMon] = useState('');
  const [tenMon, setTenMon] = useState('');
  const [soTC, setSoTC] = useState(3);
  const [hkDuKien, setHkDuKien] = useState(1);
  const [nhom, setNhom] = useState('Chuyên ngành');
  const [tienQuyet, setTienQuyet] = useState('');
  const [batBuoc, setBatBuoc] = useState(true);

  const isEdit = editIndex !== -1 && courseToEdit;

  useEffect(() => {
    if (courseToEdit && editIndex !== -1) {
      setSourceMode('CUSTOM');
      setMaMon(courseToEdit.maMon || '');
      setTenMon(courseToEdit.tenMon || '');
      setSoTC(courseToEdit.soTC || 3);
      setHkDuKien(courseToEdit.hkDuKien || 1);
      setNhom(courseToEdit.nhom || 'Chuyên ngành');
      setTienQuyet(courseToEdit.tienQuyet || '');
      setBatBuoc(courseToEdit.batBuoc !== false);
    } else {
      setSourceMode('POOL');
      setSelectedPoolCode(GLOBAL_COURSE_POOL[0]?.maMon || '');
      if (GLOBAL_COURSE_POOL[0]) {
        setMaMon(GLOBAL_COURSE_POOL[0].maMon);
        setTenMon(GLOBAL_COURSE_POOL[0].tenMon);
        setSoTC(GLOBAL_COURSE_POOL[0].soTC);
        setNhom(GLOBAL_COURSE_POOL[0].nhom);
      }
      setHkDuKien(1);
      setTienQuyet('');
      setBatBuoc(true);
    }
  }, [courseToEdit, editIndex, isOpen]);

  if (!isOpen) return null;

  // Khi chọn môn từ Kho toàn trường (kể cả liên ngành)
  const handleSelectFromPool = (code) => {
    setSelectedPoolCode(code);
    const item = GLOBAL_COURSE_POOL.find(c => c.maMon === code);
    if (item) {
      setMaMon(item.maMon);
      setTenMon(item.tenMon);
      setSoTC(item.soTC);
      setNhom(item.maKhoa !== 'FIT' ? 'Tự chọn liên ngành' : item.nhom);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const courseObj = {
      maMon: maMon.trim().toUpperCase(),
      tenMon: tenMon.trim(),
      soTC: parseInt(soTC, 10) || 3,
      hkDuKien: parseInt(hkDuKien, 10) || 1,
      nhom,
      tienQuyet: tienQuyet.trim().toUpperCase(),
      batBuoc: Boolean(batBuoc),
      isTichLuy: nhom !== 'Môn điều kiện',
      pFailHistory: courseToEdit?.pFailHistory || 0.15
    };

    onSaveCourse(courseObj, editIndex);
    onClose();
  };

  return (
    <div className="erp-modal-overlay">
      <div className="erp-modal-content">
        <div className="erp-modal-header">
          <h3 className="erp-modal-title flex items-center gap-2">
            <BookOpen size={18} className="text-emerald-700" />
            {isEdit
              ? `Chỉnh Sửa Học Phần: ${courseToEdit.maMon} - ${courseToEdit.tenMon}`
              : `Thêm Môn Học Vào CTĐT ${majorName}`}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="erp-modal-body space-y-4">
            {!isEdit && (
              <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setSourceMode('POOL')}
                  className={`flex-1 py-1.5 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    sourceMode === 'POOL' ? 'bg-white shadow-sm text-emerald-800' : 'text-slate-600'
                  }`}
                >
                  <Share2 size={13} />
                  Chọn môn từ Kho/Ngành khác (Liên ngành)
                </button>
                <button
                  type="button"
                  onClick={() => setSourceMode('CUSTOM')}
                  className={`flex-1 py-1.5 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    sourceMode === 'CUSTOM' ? 'bg-white shadow-sm text-emerald-800' : 'text-slate-600'
                  }`}
                >
                  <BookOpen size={13} />
                  Tự nhập môn học mới
                </button>
              </div>
            )}

            {sourceMode === 'POOL' && !isEdit && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Chọn môn từ Kho trường & các ngành khác:
                </label>
                <select
                  value={selectedPoolCode}
                  onChange={(e) => handleSelectFromPool(e.target.value)}
                  className="erp-input w-full font-medium"
                >
                  {GLOBAL_COURSE_POOL.map((c) => (
                    <option key={c.maMon} value={c.maMon}>
                      [{c.maMon}] {c.tenMon} ({c.soTC} TC) - Khoa {c.maKhoa}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500 mt-1">
                  * Hỗ trợ thêm các môn từ Khoa Kinh tế (FECO), Kế toán (FAAF), Ngoại ngữ (FFL) làm môn liên ngành.
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mã Học Phần (*)</label>
                <input
                  type="text"
                  value={maMon}
                  onChange={(e) => setMaMon(e.target.value)}
                  className="erp-input w-full uppercase font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Số Tín Chỉ (*)</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={soTC}
                  onChange={(e) => setSoTC(e.target.value)}
                  className="erp-input w-full font-bold"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tên Học Phần (*)</label>
              <input
                type="text"
                value={tenMon}
                onChange={(e) => setTenMon(e.target.value)}
                className="erp-input w-full font-medium"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Khối Kiến Thức</label>
                <select
                  value={nhom}
                  onChange={(e) => setNhom(e.target.value)}
                  className="erp-input w-full"
                >
                  <option value="Đại cương">Đại cương</option>
                  <option value="Cơ sở ngành">Cơ sở ngành</option>
                  <option value="Chuyên ngành">Chuyên ngành</option>
                  <option value="Tự chọn liên ngành">Tự chọn liên ngành</option>
                  <option value="Đồ án">Đồ án / Thực tập</option>
                  <option value="Môn điều kiện">Môn điều kiện (GDTC/GDQP)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Học Kỳ Đề Xuất (1-8)</label>
                <input
                  type="number"
                  min={1}
                  max={8}
                  value={hkDuKien}
                  onChange={(e) => setHkDuKien(e.target.value)}
                  className="erp-input w-full font-bold"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Học Phần Tiên Quyết</label>
                <input
                  type="text"
                  placeholder="VD: COSC1301"
                  value={tienQuyet}
                  onChange={(e) => setTienQuyet(e.target.value)}
                  className="erp-input w-full uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phân Loại Học Phần</label>
                <select
                  value={batBuoc ? 'true' : 'false'}
                  onChange={(e) => setBatBuoc(e.target.value === 'true')}
                  className="erp-input w-full"
                >
                  <option value="true">Bắt buộc</option>
                  <option value="false">Tự chọn</option>
                </select>
              </div>
            </div>
          </div>

          <div className="erp-modal-footer">
            <button 
              type="button" 
              onClick={onClose}
              className="btn-outline"
            >
              Hủy
            </button>
            <button 
              type="submit"
              className="btn-primary"
            >
              {isEdit ? 'Cập Nhật Môn Học' : 'Thêm Vào CTĐT'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

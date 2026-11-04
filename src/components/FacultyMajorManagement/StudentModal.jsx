'use client';

import { X } from 'lucide-react';
import { useState } from 'react';

export default function StudentModal({ isOpen, onClose, selectedClassCode, onAddStudent }) {
  const [maSV, setMaSV] = useState('');
  const [hoTen, setHoTen] = useState('');
  const [gioiTinh, setGioiTinh] = useState('Nam');
  const [ngaySinh, setNgaySinh] = useState('10/10/2003');
  const [gpaTL, setGpaTL] = useState(2.80);
  const [tcTichLuy, setTcTichLuy] = useState(65);

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
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-box modal-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Thêm Sinh Viên Vào Lớp {selectedClassCode}</h3>
          <button type="button" className="modal-close-btn" onClick={onClose}><X className="w-4 h-4" /></button>
        </div>

        <div className="modal-body-content">
          <form onSubmit={handleSubmit}>
            <div className="form-row-2">
              <div>
                <label>Mã số sinh viên (*):</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ví dụ: 2151010045"
                  value={maSV}
                  onChange={(e) => setMaSV(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Họ và tên (*):</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ví dụ: Nguyễn Gia Huy"
                  value={hoTen}
                  onChange={(e) => setHoTen(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row-2" style={{ marginTop: '12px' }}>
              <div>
                <label>Giới tính:</label>
                <select
                  className="form-control"
                  value={gioiTinh}
                  onChange={(e) => setGioiTinh(e.target.value)}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>
              <div>
                <label>Ngày sinh:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="DD/MM/YYYY"
                  value={ngaySinh}
                  onChange={(e) => setNgaySinh(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row-2" style={{ marginTop: '12px' }}>
              <div>
                <label>GPA tích lũy ban đầu (Hệ 4):</label>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  max="4"
                  className="form-control"
                  value={gpaTL}
                  onChange={(e) => setGpaTL(e.target.value)}
                />
              </div>
              <div>
                <label>Tín chỉ tích lũy:</label>
                <input
                  type="number"
                  min="0"
                  max="150"
                  className="form-control"
                  value={tcTichLuy}
                  onChange={(e) => setTcTichLuy(e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button type="button" className="btn btn-outline-navy" onClick={onClose}>
                Hủy
              </button>
              <button type="submit" className="btn btn-primary">
                Thêm Vào Lớp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

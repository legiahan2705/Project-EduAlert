'use client';

import { X } from 'lucide-react';
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
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-box modal-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Thêm Lớp Học Mới Vào Ngành {majorName}</h3>
          <button type="button" className="modal-close-btn" onClick={onClose}><X className="w-4 h-4" /></button>
        </div>

        <div className="modal-body-content">
          <form onSubmit={handleSubmit}>
            <div className="form-row-2">
              <div>
                <label>Mã lớp (*):</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ví dụ: DH22IT02"
                  value={maLop}
                  onChange={(e) => setMaLop(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Tên lớp (*):</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ví dụ: ĐH CNTT Khóa 2022 - Lớp 02"
                  value={tenLop}
                  onChange={(e) => setTenLop(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row-2" style={{ marginTop: '12px' }}>
              <div>
                <label>Niên khóa:</label>
                <input
                  type="text"
                  className="form-control"
                  value={nienKhoa}
                  onChange={(e) => setNienKhoa(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Cố vấn học tập (CVHT):</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ví dụ: ThS. Trần Văn Minh"
                  value={cvht}
                  onChange={(e) => setCvht(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ marginTop: '12px' }}>
              <label>Phòng học / Văn phòng khoa:</label>
              <input
                type="text"
                className="form-control"
                value={phong}
                onChange={(e) => setPhong(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button type="button" className="btn btn-outline-navy" onClick={onClose}>
                Hủy
              </button>
              <button type="submit" className="btn btn-primary">
                Tạo Lớp Học
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

'use client';

import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function EditMajorModal({ isOpen, onClose, major, faculties, onSaveMajor }) {
  const [tenNganh, setTenNganh] = useState('');
  const [tongTC, setTongTC] = useState(140);
  const [heDaoTao, setHeDaoTao] = useState('Chính quy');
  const [trangThai, setTrangThai] = useState('ACTIVE');
  const [moTa, setMoTa] = useState('');

  useEffect(() => {
    if (major) {
      setTenNganh(major.tenNganh || '');
      setTongTC(major.tongTC || 140);
      setHeDaoTao(major.heDaoTao || 'Chính quy');
      setTrangThai(major.trangThai || 'ACTIVE');
      setMoTa(major.moTa || '');
    }
  }, [major]);

  if (!isOpen || !major) return null;

  const fac = faculties.find((f) => f.maKhoa === major.maKhoa);
  const facName = fac ? fac.tenKhoa : major.maKhoa;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveMajor({
      ...major,
      tenNganh: tenNganh.trim(),
      tongTC: parseInt(tongTC, 10) || major.tongTC,
      heDaoTao,
      trangThai,
      moTa: moTa.trim()
    });
    onClose();
  };

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-box modal-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Chỉnh Sửa Ngành: {major.tenNganh} ({major.maNganh})</h3>
          <button type="button" className="modal-close-btn" onClick={onClose}><X className="w-4 h-4" /></button>
        </div>

        <div className="modal-body-content">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Khoa trực thuộc:</label>
              <input
                type="text"
                className="form-control"
                value={`${major.maKhoa} — ${facName}`}
                disabled
                style={{ background: '#f1f5f9', color: 'var(--text-muted)' }}
              />
            </div>

            <div className="form-row-2" style={{ marginTop: '12px' }}>
              <div>
                <label>Tên ngành đào tạo (*):</label>
                <input
                  type="text"
                  className="form-control"
                  value={tenNganh}
                  onChange={(e) => setTenNganh(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Tổng tín chỉ chuẩn (*):</label>
                <input
                  type="number"
                  min="100"
                  max="200"
                  className="form-control"
                  value={tongTC}
                  onChange={(e) => setTongTC(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row-2" style={{ marginTop: '12px' }}>
              <div>
                <label>Hệ đào tạo:</label>
                <select
                  className="form-control"
                  value={heDaoTao}
                  onChange={(e) => setHeDaoTao(e.target.value)}
                >
                  <option value="Chính quy">Chính quy</option>
                  <option value="Chất lượng cao">Chất lượng cao</option>
                </select>
              </div>

              <div>
                <label>Trạng thái hoạt động:</label>
                <select
                  className="form-control"
                  value={trangThai}
                  onChange={(e) => setTrangThai(e.target.value)}
                >
                  <option value="ACTIVE">Đang hoạt động</option>
                  <option value="INACTIVE">Đã vô hiệu hóa (Tạm ngưng)</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: '12px' }}>
              <label>Mô tả định hướng ngành:</label>
              <textarea
                className="form-control"
                rows="3"
                value={moTa}
                onChange={(e) => setMoTa(e.target.value)}
                placeholder="Mô tả mục tiêu đào tạo, chuẩn đầu ra..."
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button type="button" className="btn btn-outline-navy" onClick={onClose}>
                Hủy
              </button>
              <button type="submit" className="btn btn-primary">
                Lưu Thay Đổi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

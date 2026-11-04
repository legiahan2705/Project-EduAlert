'use client';

import { HelpCircle, X, UserCheck, GraduationCap, Building2, CheckCircle2 } from 'lucide-react';

export default function QuickGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-box modal-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Hướng Dẫn Sử Dụng Hệ Thống EduAlert
          </h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Đóng">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="modal-body-content" style={{ maxHeight: '70vh', overflowY: 'auto', fontSize: '0.88rem', lineHeight: '1.6' }}>
          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ color: 'var(--primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <UserCheck className="w-4 h-4" />
              1. GIẢ LẬP NGƯỜI DÙNG (BÊN TRÁI SIDEBAR)
            </h4>
            <p><strong>Cố vấn học tập (CVHT):</strong> Giám sát danh sách sinh viên nguy cơ học vụ theo Thông tư 08/2021, mở hồ sơ chi tiết và ghi nhật ký tư vấn.</p>
            <p><strong>Sinh viên (SV):</strong> Trải nghiệm Smart Academic Planner (tính GPA mục tiêu tốt nghiệp, mô phỏng What-If đăng ký môn).</p>
            <p><strong>Khoa:</strong> Quản lý danh mục Khoa, Ngành đào tạo, CTĐT và các lớp sinh viên.</p>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ color: 'var(--primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 className="w-4 h-4" />
              2. BỐN PHÂN HỆ CỐT LÕI
            </h4>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li><strong>Phân hệ 1 — Quản lý Bảng Điểm:</strong> Nạp điểm Excel, sửa điểm trực tiếp (inline edit), tự động tính GPA HK, quy đổi A+ $\to$ F theo chuẩn OU.</li>
              <li><strong>Phân hệ 2 — Quản lý Khoa - Ngành:</strong> Xem cây đào tạo Khoa $\to$ Ngành $\to$ CTĐT và Lớp học sinh viên.</li>
              <li><strong>Phân hệ 3 — Cảnh báo sớm:</strong> Quét 4 điều kiện Thông tư 08 (GPA &lt; 0.8, nợ &gt; 24 TC, rớt môn &gt; 50%), xếp hạng rủi ro 0-100.</li>
              <li><strong>Phân hệ 4 — Smart Planner:</strong> Tính mức GPA cần đạt cho các tín chỉ còn lại để đạt chuẩn ra trường, mô phỏng kết quả What-If khi trả nợ môn F.</li>
            </ul>
          </div>
        </div>
        <div className="modal-footer" style={{ borderTop: '1px solid var(--border-color)', padding: '12px 18px', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn-primary btn-sm" onClick={onClose}>
            Đã Hiểu
          </button>
        </div>
      </div>
    </div>
  );
}

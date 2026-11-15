'use client';

import { useState } from 'react';
import { KeyRound } from 'lucide-react';

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #cbd5e1',
  borderRadius: '8px',
  fontSize: '14px',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
};

const labelStyle = { display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' };

/**
 * Modal bắt đổi mật khẩu (không thể đóng khi forced = true).
 * onSuccess được gọi sau khi đổi thành công.
 */
export default function ChangePasswordModal({ forced = true, onSuccess, onClose }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (newPassword.length < 6) return setError('Mật khẩu mới phải có ít nhất 6 ký tự');
    if (newPassword !== confirmPassword) return setError('Xác nhận mật khẩu không khớp');
    if (newPassword === currentPassword) return setError('Mật khẩu mới phải khác mật khẩu hiện tại');

    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Không đổi được mật khẩu');
      onSuccess?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay active" style={{ zIndex: 9999 }}>
      <div className="modal-box modal-md" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        <div className="modal-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <KeyRound className="w-5 h-5 text-emerald-600" />
            {forced ? 'Đổi mật khẩu lần đầu' : 'Đổi mật khẩu'}
          </h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body-content" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {forced && (
              <p style={{ margin: 0, fontSize: '13px', color: '#475569' }}>
                Mật khẩu hiện tại do quản trị viên cấp. Vui lòng đặt mật khẩu riêng của bạn để tiếp tục sử dụng hệ thống.
              </p>
            )}
            <div>
              <label style={labelStyle}>Mật khẩu hiện tại</label>
              <input type="password" style={inputStyle} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} autoComplete="current-password" required />
            </div>
            <div>
              <label style={labelStyle}>Mật khẩu mới (tối thiểu 6 ký tự)</label>
              <input type="password" style={inputStyle} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} autoComplete="new-password" required />
            </div>
            <div>
              <label style={labelStyle}>Xác nhận mật khẩu mới</label>
              <input type="password" style={inputStyle} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" required />
            </div>
            {error && <div style={{ color: '#be123c', fontSize: '13px', fontWeight: 600 }}>{error}</div>}
          </div>
          <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            {!forced && (
              <button type="button" className="btn btn-outline" onClick={onClose} disabled={submitting}>
                Hủy
              </button>
            )}
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Đang lưu...' : 'Đổi mật khẩu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

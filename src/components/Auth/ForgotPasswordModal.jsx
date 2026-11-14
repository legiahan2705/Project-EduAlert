'use client';

import { useState, useEffect } from 'react';
import {
  X,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export default function ForgotPasswordModal({
  isOpen,
  onClose,
  initialUsername = '',
  onSuccessReset,
}) {
  const [step, setStep] = useState(1); // 1: verify, 2: new password, 3: success
  const [username, setUsername] = useState('');
  const [verifyInfo, setVerifyInfo] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verifiedUser, setVerifiedUser] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setUsername(initialUsername || '');
      setVerifyInfo(
        initialUsername && /^\d+$/.test(initialUsername.trim())
          ? `${initialUsername.trim().toLowerCase()}@student.ou.edu.vn`
          : ''
      );
      setNewPassword('');
      setConfirmPassword('');
      setError('');
      setVerifiedUser(null);
    }
  }, [isOpen, initialUsername]);

  if (!isOpen) return null;

  // Bước 1: Xác thực tài khoản
  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');

    const u = username.trim();
    const v = verifyInfo.trim();

    if (!u) {
      setError('Vui lòng nhập Tên đăng nhập hoặc Mã số sinh viên (MSSV)');
      return;
    }
    if (!v) {
      setError('Vui lòng nhập Email hoặc Số điện thoại xác minh');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify',
          username: u,
          verifyInfo: v,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || 'Xác thực tài khoản không thành công');
        return;
      }

      setVerifiedUser(data.user);
      setStep(2);
    } catch {
      setError('Không kết nối được máy chủ, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  // Bước 2: Cập nhật mật khẩu mới
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (!newPassword || newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp, vui lòng kiểm tra lại');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reset',
          username: username.trim(),
          verifyInfo: verifyInfo.trim(),
          newPassword,
          confirmPassword,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || 'Cập nhật mật khẩu thất bại');
        return;
      }

      setStep(3);
    } catch {
      setError('Không kết nối được máy chủ, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  // Đăng nhập ngay sau khi đổi mật khẩu
  const handleFinish = () => {
    if (onSuccessReset) {
      onSuccessReset({
        username: username.trim(),
        password: newPassword,
        role: verifiedUser?.role || 'student',
      });
    }
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          background: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          border: '1px solid #e2e8f0',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div
          style={{
            padding: '18px 22px',
            background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <KeyRound size={20} color="#a7f3d0" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '15.5px', fontWeight: 800 }}>
                Quên Mật Khẩu
              </h3>
              <p
                style={{
                  margin: '2px 0 0',
                  fontSize: '11.5px',
                  color: '#a7f3d0',
                }}
              >
                Tự khôi phục mật khẩu tài khoản EduAlert
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#a7f3d0',
              cursor: 'pointer',
              padding: 4,
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={19} />
          </button>
        </div>

        {/* PROGRESS STEP INDICATOR */}
        {step < 3 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 22px',
              background: '#f8fafc',
              borderBottom: '1px solid #e2e8f0',
              fontSize: '11.5px',
              fontWeight: 600,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: step === 1 ? '#047857' : '#10b981',
              }}
            >
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: step === 1 ? '#047857' : '#10b981',
                  color: '#fff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                1
              </span>
              Xác minh tài khoản
            </div>

            <div
              style={{
                flex: 1,
                height: 2,
                background: step === 2 ? '#10b981' : '#cbd5e1',
                margin: '0 10px',
              }}
            />

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: step === 2 ? '#047857' : '#94a3b8',
              }}
            >
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: step === 2 ? '#047857' : '#e2e8f0',
                  color: step === 2 ? '#fff' : '#64748b',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                2
              </span>
              Đặt mật khẩu mới
            </div>
          </div>
        )}

        {/* BODY */}
        <div style={{ padding: '22px' }}>
          {error && (
            <div
              style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#b91c1c',
                fontSize: '12.5px',
                padding: '9px 12px',
                borderRadius: '8px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* BƯỚC 1: XÁC THỰC */}
          {step === 1 && (
            <form onSubmit={handleVerify}>
              <div style={{ marginBottom: 14 }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: '#334155',
                    marginBottom: 5,
                  }}
                >
                  Tên đăng nhập hoặc MSSV (*)
                </label>
                <div style={{ position: 'relative' }}>
                  <User
                    size={16}
                    color="#64748b"
                    style={{
                      position: 'absolute',
                      left: 11,
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                  />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                      const val = e.target.value;
                      setUsername(val);
                      if (
                        !verifyInfo ||
                        verifyInfo.endsWith('@student.ou.edu.vn')
                      ) {
                        setVerifyInfo(
                          val ? `${val.trim().toLowerCase()}@student.ou.edu.vn` : ''
                        );
                      }
                    }}
                    placeholder="VD: 2251050001, gv.nam, admin"
                    autoFocus
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 34px',
                      border: '1px solid #cbd5e1',
                      borderRadius: 8,
                      fontSize: 13.5,
                      fontWeight: 600,
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: '#334155',
                    marginBottom: 5,
                  }}
                >
                  Email hoặc Số điện thoại xác minh (*)
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail
                    size={16}
                    color="#64748b"
                    style={{
                      position: 'absolute',
                      left: 11,
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                  />
                  <input
                    type="text"
                    value={verifyInfo}
                    onChange={(e) => setVerifyInfo(e.target.value)}
                    placeholder="VD: 2251050001@student.ou.edu.vn hoặc 0912345..."
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 34px',
                      border: '1px solid #cbd5e1',
                      borderRadius: 8,
                      fontSize: 13.5,
                    }}
                  />
                </div>
                <span
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    color: '#64748b',
                    marginTop: 5,
                    lineHeight: '1.4',
                  }}
                >
                  Sinh viên dùng email trường (<code>[MSSV]@student.ou.edu.vn</code>) hoặc số điện thoại hồ sơ. Giảng viên dùng email <code>@ou.edu.vn</code>.
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '11px',
                  borderRadius: 8,
                  border: 'none',
                  background: loading ? '#6b9a8b' : '#064e3b',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 13.5,
                  cursor: loading ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  boxShadow: '0 4px 6px -1px rgba(6, 78, 59, 0.2)',
                }}
              >
                {loading ? 'Đang xác thực...' : 'Tiếp Tục Xác Minh'}
                <ArrowRight size={16} />
              </button>
            </form>
          )}

          {/* BƯỚC 2: NHẬP MẬT KHẨU MỚI */}
          {step === 2 && (
            <form onSubmit={handleResetPassword}>
              {/* Thẻ thông tin user đã xác thực */}
              <div
                style={{
                  padding: '10px 12px',
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    background: '#10b981',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ShieldCheck size={17} />
                </div>
                <div>
                  <div
                    style={{ fontSize: 13, fontWeight: 700, color: '#064e3b' }}
                  >
                    {verifiedUser?.name || username}
                  </div>
                  <div style={{ fontSize: 11, color: '#047857' }}>
                    Tài khoản: <strong>{verifiedUser?.username || username}</strong> · Vai trò:{' '}
                    {verifiedUser?.role === 'admin'
                      ? 'Quản trị viên'
                      : verifiedUser?.role === 'lecturer'
                      ? 'Giảng viên'
                      : 'Sinh viên'}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 14 }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: '#334155',
                    marginBottom: 5,
                  }}
                >
                  Mật khẩu mới (*)
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock
                    size={16}
                    color="#64748b"
                    style={{
                      position: 'absolute',
                      left: 11,
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                  />
                  <input
                    type={showNewPw ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Tối thiểu 6 ký tự"
                    autoFocus
                    required
                    style={{
                      width: '100%',
                      padding: '10px 40px 10px 34px',
                      border: '1px solid #cbd5e1',
                      borderRadius: 8,
                      fontSize: 13.5,
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPw((v) => !v)}
                    style={{
                      position: 'absolute',
                      right: 8,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#64748b',
                      padding: 4,
                    }}
                  >
                    {showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: 18 }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: '#334155',
                    marginBottom: 5,
                  }}
                >
                  Xác nhận mật khẩu mới (*)
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock
                    size={16}
                    color="#64748b"
                    style={{
                      position: 'absolute',
                      left: 11,
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                  />
                  <input
                    type={showConfirmPw ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu mới"
                    required
                    style={{
                      width: '100%',
                      padding: '10px 40px 10px 34px',
                      border: '1px solid #cbd5e1',
                      borderRadius: 8,
                      fontSize: 13.5,
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPw((v) => !v)}
                    style={{
                      position: 'absolute',
                      right: 8,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#64748b',
                      padding: 4,
                    }}
                  >
                    {showConfirmPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    background: '#f8fafc',
                    color: '#475569',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Quay lại
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: 8,
                    border: 'none',
                    background: loading ? '#6b9a8b' : '#064e3b',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 13.5,
                    cursor: loading ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  <Sparkles size={16} />
                  {loading ? 'Đang lưu mật khẩu...' : 'Cập Nhật Mật Khẩu'}
                </button>
              </div>
            </form>
          )}

          {/* BƯỚC 3: THÀNH CÔNG */}
          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '10px 0 6px' }}>
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: '50%',
                  background: '#dcfce7',
                  color: '#15803d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 14px',
                }}
              >
                <CheckCircle2 size={32} />
              </div>

              <h4
                style={{
                  fontSize: '17px',
                  fontWeight: 800,
                  color: '#064e3b',
                  margin: '0 0 6px',
                }}
              >
                Đặt Lại Mật Khẩu Thành Công!
              </h4>

              <p
                style={{
                  fontSize: '13px',
                  color: '#475569',
                  lineHeight: '1.5',
                  margin: '0 0 20px',
                }}
              >
                Tài khoản <strong>{username}</strong> đã được cập nhật mật khẩu mới.
                Bạn có thể đăng nhập ngay bây giờ.
              </p>

              <button
                type="button"
                onClick={handleFinish}
                style={{
                  width: '100%',
                  padding: '11px',
                  borderRadius: 8,
                  border: 'none',
                  background: '#064e3b',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  boxShadow: '0 4px 6px -1px rgba(6, 78, 59, 0.2)',
                }}
              >
                Đăng Nhập Ngay
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

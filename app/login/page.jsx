'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap, ShieldCheck, UserCog, BookOpen, Eye, EyeOff, LogIn, CheckCircle2, User, Lock } from 'lucide-react';
import ForgotPasswordModal from '@/components/Auth/ForgotPasswordModal';

const ROLES = [
  { key: 'student', label: 'Sinh viên', icon: GraduationCap, userLabel: 'Mã số sinh viên', placeholder: 'VD: 2251050001' },
  { key: 'lecturer', label: 'Giảng viên', icon: BookOpen, userLabel: 'Tên đăng nhập', placeholder: 'VD: gv.nam' },
  { key: 'admin', label: 'Quản trị viên', icon: UserCog, userLabel: 'Tên đăng nhập', placeholder: 'admin' },
];

// Gợi ý tài khoản demo — chỉ hiện khi chạy chế độ phát triển (không lộ trên bản deploy)
const DEV_HINTS = {
  student: 'Demo: 2251050001 / Sinhvien@123',
  lecturer: 'Demo: gv.han / 123456789 (hoặc gv.nam / Giangvien@123)',
  admin: 'Demo: admin / Admin@123',
};
const SHOW_HINT = process.env.NODE_ENV !== 'production';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState('lecturer');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false);

  // Đã đăng nhập thì vào thẳng ứng dụng
  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => (r.ok ? router.replace('/') : null))
      .catch(() => {});
  }, [router]);

  const current = ROLES.find((r) => r.key === role);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    if (!username.trim() || !password) {
      setError('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, username, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Đăng nhập thất bại');
        return;
      }
      router.replace('/');
    } catch {
      setError('Không kết nối được máy chủ, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessReset = ({ username: newU, password: newP, role: newRole }) => {
    if (newRole && ['student', 'lecturer', 'admin'].includes(newRole)) {
      setRole(newRole);
    }
    if (newU) setUsername(newU);
    if (newP) setPassword(newP);
    setError('');
    setSuccessMsg('Mật khẩu mới đã được cập nhật thành công! Nhấn Đăng nhập để tiếp tục.');
  };

  return (
    <div className="login-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', color: '#ecfdf5', marginBottom: '24px' }}>
          <div style={{ width: 56, height: 56, margin: '0 auto 12px', borderRadius: 16, background: 'linear-gradient(135deg, #34d399, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,0,0,.25)' }}>
            <GraduationCap size={30} color="#fff" />
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0, letterSpacing: '-0.3px' }}>EduAlert</h1>
          <p style={{ fontSize: 13.5, margin: '6px 0 0', color: '#d1fae5' }}>Hệ thống cảnh báo sớm học vụ · ĐH Mở TP.HCM</p>
        </div>

        <form onSubmit={handleSubmit} className="login-card">
          <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: 8 }}>Đăng nhập với tư cách</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
            {ROLES.map((r) => {
              const Icon = r.icon;
              const active = role === r.key;
              return (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => { setRole(r.key); setError(''); setSuccessMsg(''); }}
                  aria-pressed={active}
                  className={`login-role ${active ? 'active' : ''}`}
                >
                  {active && (
                    <span className="login-role-check"><CheckCircle2 size={16} color="#059669" fill="#fff" /></span>
                  )}
                  <Icon size={20} />
                  {r.label}
                </button>
              );
            })}
          </div>

          <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#334155', marginBottom: 4 }} htmlFor="username">
            {current.userLabel}
          </label>
          <div className="login-field">
            <User size={16} className="field-icon" />
            <input
              id="username"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={current.placeholder}
              autoComplete="username"
              autoCapitalize="none"
            />
          </div>

          <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#334155', marginBottom: 4 }} htmlFor="password">
            Mật khẩu
          </label>
          <div className="login-field" style={{ marginBottom: 8 }}>
            <Lock size={16} className="field-icon" />
            <input
              id="password"
              className="login-input"
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              aria-label={showPw ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 4 }}
            >
              {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>

          {/* QUÊN MẬT KHẨU LINK */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
            <button
              type="button"
              onClick={() => {
                setError('');
                setSuccessMsg('');
                setIsForgotOpen(true);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#047857',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                padding: '2px 0',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
            >
              Quên mật khẩu?
            </button>
          </div>

          {/* THÔNG BÁO LỖI HOẶC THÀNH CÔNG */}
          {error && (
            <div role="alert" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', fontSize: 12.5, padding: '8px 10px', borderRadius: 8, marginBottom: 12 }}>
              {error}
            </div>
          )}

          {successMsg && (
            <div role="status" style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#065f46', fontSize: 12.5, padding: '8px 10px', borderRadius: 8, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <CheckCircle2 size={16} className="shrink-0" color="#059669" />
              <span>{successMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="login-submit"
          >
            <LogIn size={16} />
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>

          {SHOW_HINT && (
            <p style={{ fontSize: 11.5, color: '#94a3b8', textAlign: 'center', margin: '12px 0 0' }}>{DEV_HINTS[role]}</p>
          )}
          <p style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center', margin: '10px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            <ShieldCheck size={12} /> Phiên đăng nhập hết hạn sau 8 giờ
          </p>
        </form>
      </div>

      {/* MODAL QUÊN MẬT KHẨU */}
      <ForgotPasswordModal
        isOpen={isForgotOpen}
        onClose={() => setIsForgotOpen(false)}
        initialUsername={username}
        onSuccessReset={handleSuccessReset}
      />
    </div>
  );
}

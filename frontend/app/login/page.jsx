'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap, ShieldCheck, UserCog, BookOpen, Eye, EyeOff, LogIn } from 'lucide-react';

const ROLES = [
  { key: 'student', label: 'Sinh viên', icon: GraduationCap, userLabel: 'Mã số sinh viên', placeholder: 'VD: 2251050001' },
  { key: 'lecturer', label: 'Giảng viên', icon: BookOpen, userLabel: 'Tên đăng nhập', placeholder: 'VD: gv.nam' },
  { key: 'admin', label: 'Quản trị viên', icon: UserCog, userLabel: 'Tên đăng nhập', placeholder: 'admin' },
];

// Gợi ý tài khoản demo — chỉ hiện khi chạy chế độ phát triển (không lộ trên bản deploy)
const DEV_HINTS = {
  student: 'Demo: 2251050001 / Sinhvien@123',
  lecturer: 'Demo: gv.nam / Giangvien@123',
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
  const [loading, setLoading] = useState(false);

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

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', background: 'linear-gradient(160deg, #064e3b 0%, #065f46 45%, #f0fdf4 45%)' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', color: '#ecfdf5', marginBottom: '18px' }}>
          <div style={{ width: 52, height: 52, margin: '0 auto 10px', borderRadius: 14, background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <GraduationCap size={28} color="#fff" />
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>EduAlert</h1>
          <p style={{ fontSize: 13, margin: '4px 0 0', color: '#a7f3d0' }}>Hệ thống cảnh báo sớm học vụ · ĐH Mở TP.HCM</p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 14, padding: '22px 20px', boxShadow: '0 20px 40px rgba(15,23,42,.18)' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: 8 }}>Đăng nhập với tư cách</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
            {ROLES.map((r) => {
              const Icon = r.icon;
              const active = role === r.key;
              return (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => { setRole(r.key); setError(''); }}
                  aria-pressed={active}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    padding: '10px 4px', borderRadius: 10, cursor: 'pointer', fontSize: 12, fontWeight: 700,
                    border: `1.5px solid ${active ? '#064e3b' : '#e2e8f0'}`,
                    background: active ? '#ecfdf5' : '#fff',
                    color: active ? '#064e3b' : '#64748b',
                  }}
                >
                  <Icon size={20} />
                  {r.label}
                </button>
              );
            })}
          </div>

          <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#334155', marginBottom: 4 }} htmlFor="username">
            {current.userLabel}
          </label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={current.placeholder}
            autoComplete="username"
            autoCapitalize="none"
            style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 8, fontSize: 14, marginBottom: 12 }}
          />

          <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#334155', marginBottom: 4 }} htmlFor="password">
            Mật khẩu
          </label>
          <div style={{ position: 'relative', marginBottom: 12 }}>
            <input
              id="password"
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              style={{ width: '100%', padding: '10px 40px 10px 12px', border: '1px solid #cbd5e1', borderRadius: 8, fontSize: 14 }}
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

          {error && (
            <div role="alert" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', fontSize: 12.5, padding: '8px 10px', borderRadius: 8, marginBottom: 12 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px', borderRadius: 8, border: 'none', background: loading ? '#6b9a8b' : '#064e3b', color: '#fff', fontWeight: 700, fontSize: 14, cursor: loading ? 'default' : 'pointer' }}
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
    </div>
  );
}

// Phiên đăng nhập bằng cookie httpOnly có ký HMAC (không cần thư viện ngoài).
// Chỉ dùng ở phía server (route handler).
import crypto from 'node:crypto';
import { NextResponse } from 'next/server';

export const COOKIE_NAME = 'edualert_session';
const SESSION_TTL_SEC = 60 * 60 * 8; // 8 giờ

const isProd = process.env.NODE_ENV === 'production';

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (secret) return secret;
  if (isProd) throw new Error('Chưa cấu hình AUTH_SECRET trên server.');
  return 'edualert-dev-secret-chi-dung-khi-phat-trien';
}

const b64 = (buf) => Buffer.from(buf).toString('base64url');
const sign = (data) => crypto.createHmac('sha256', getSecret()).update(data).digest('base64url');

export function createSessionToken(user) {
  const payload = {
    username: user.username,
    role: user.role,
    name: user.name,
    maSV: user.maSV || null,
    classes: user.classes || null,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SEC,
  };
  const body = b64(JSON.stringify(payload));
  return `${body}.${sign(body)}`;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return null;
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;
  const expected = sign(body);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export function setSessionCookie(res, user) {
  res.cookies.set(COOKIE_NAME, createSessionToken(user), {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProd,
    path: '/',
    maxAge: SESSION_TTL_SEC,
  });
}

export function clearSessionCookie(res) {
  res.cookies.set(COOKIE_NAME, '', { httpOnly: true, sameSite: 'lax', secure: isProd, path: '/', maxAge: 0 });
}

export function getSession(req) {
  return verifySessionToken(req.cookies.get(COOKIE_NAME)?.value);
}

/**
 * Kiểm tra đăng nhập và vai trò.
 * Dùng: const auth = authorize(req, ['admin','lecturer']); if (auth.error) return auth.error;
 */
export function authorize(req, roles) {
  const session = getSession(req);
  if (!session) {
    return { error: NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 }) };
  }
  if (roles && !roles.includes(session.role)) {
    return { error: NextResponse.json({ error: 'Không đủ quyền truy cập' }, { status: 403 }) };
  }
  return { session };
}

// Sinh viên: chỉ bản ghi của mình. Giảng viên: các lớp mình phụ trách. Quản trị: tất cả.
export function canAccessStudent(session, student) {
  if (!session || !student) return false;
  if (session.role === 'admin') return true;
  if (session.role === 'lecturer') return (session.classes || []).includes(student.lop);
  if (session.role === 'student') return session.maSV === student.maSV;
  return false;
}

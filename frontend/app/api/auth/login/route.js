import { NextResponse } from 'next/server';
import { setSessionCookie } from '@/lib/session';
import { ROLES, authenticateUser } from '@/lib/users';

// Giới hạn đăng nhập sai: 5 lần / 10 phút cho mỗi (IP + tên đăng nhập)
const attempts = new Map();
const MAX_FAILS = 5;
const WINDOW_MS = 10 * 60 * 1000;

const LIMIT_ENABLED = process.env.NODE_ENV === 'production';

function tooMany(key) {
  if (!LIMIT_ENABLED) return false;
  const rec = attempts.get(key);
  if (!rec) return false;
  if (Date.now() - rec.first > WINDOW_MS) {
    attempts.delete(key);
    return false;
  }
  return rec.count >= MAX_FAILS;
}

function recordFail(key) {
  const rec = attempts.get(key);
  if (!rec || Date.now() - rec.first > WINDOW_MS) attempts.set(key, { count: 1, first: Date.now() });
  else rec.count += 1;
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Dữ liệu không hợp lệ' }, { status: 400 });
  }
  const { role, username, password } = body || {};

  if (!ROLES.includes(role)) {
    return NextResponse.json({ error: 'Vui lòng chọn vai trò đăng nhập' }, { status: 400 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  const key = `${ip}|${role}|${String(username || '').toLowerCase()}`;
  if (tooMany(key)) {
    return NextResponse.json({ error: 'Đăng nhập sai quá nhiều lần, vui lòng thử lại sau 10 phút' }, { status: 429 });
  }

  const authResult = await authenticateUser(role, username, password);

  if (!authResult.success) {
    recordFail(key);
    return NextResponse.json({ error: authResult.error || 'Sai tên đăng nhập hoặc mật khẩu' }, { status: 401 });
  }

  attempts.delete(key);
  const user = authResult.user;

  const res = NextResponse.json({
    user: {
      _id: user._id,
      username: user.username,
      role: user.role,
      name: user.name,
      maSV: user.maSV || null,
      classes: user.classes || [],
      facultyCode: user.facultyCode || null,
    },
  });

  setSessionCookie(res, user);
  return res;
}

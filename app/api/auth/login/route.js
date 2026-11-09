import { NextResponse } from 'next/server';
import { setSessionCookie } from '@/lib/session';
import { ROLES, findUser, passwordMatches, isRoleConfigured } from '@/lib/users';

// Giới hạn đăng nhập sai: 5 lần / 10 phút cho mỗi (IP + tên đăng nhập). Lưu trong bộ nhớ của tiến trình.
const attempts = new Map();
const MAX_FAILS = 5;
const WINDOW_MS = 10 * 60 * 1000;

// Chỉ khóa khi chạy thật (production) để lúc phát triển/kiểm thử không tự khóa mình
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
  if (!isRoleConfigured(role)) {
    return NextResponse.json({ error: 'Vai trò này chưa được cấu hình mật khẩu trên máy chủ' }, { status: 503 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  const key = `${ip}|${role}|${String(username || '').toLowerCase()}`;
  if (tooMany(key)) {
    return NextResponse.json({ error: 'Đăng nhập sai quá nhiều lần, vui lòng thử lại sau 10 phút' }, { status: 429 });
  }

  const user = findUser(role, username);
  // Luôn so khớp mật khẩu (kể cả khi không có tài khoản) để thời gian phản hồi không lộ thông tin
  const ok = passwordMatches(role, password) && Boolean(user);
  if (!ok) {
    recordFail(key);
    return NextResponse.json({ error: 'Sai tên đăng nhập hoặc mật khẩu' }, { status: 401 });
  }

  attempts.delete(key);
  const res = NextResponse.json({
    user: { username: user.username, role: user.role, name: user.name, maSV: user.maSV || null },
  });
  setSessionCookie(res, user);
  return res;
}

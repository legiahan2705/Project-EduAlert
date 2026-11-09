// Tài khoản đăng nhập (dữ liệu demo, chưa lưu trong database).
// Mật khẩu lấy từ biến môi trường; chỉ khi chạy phát triển mới dùng mật khẩu mặc định.
import crypto from 'node:crypto';
import { MOCK_CLASSES, MOCK_STUDENTS } from '@/engine/mockData';

export const ROLES = ['admin', 'lecturer', 'student'];

const isProd = process.env.NODE_ENV === 'production';

const DEV_DEFAULTS = {
  admin: 'Admin@123',
  lecturer: 'Giangvien@123',
  student: 'Sinhvien@123',
};
const ENV_KEYS = {
  admin: 'ADMIN_PASSWORD',
  lecturer: 'LECTURER_PASSWORD',
  student: 'STUDENT_PASSWORD',
};

function passwordFor(role) {
  const fromEnv = process.env[ENV_KEYS[role]];
  if (fromEnv) return fromEnv;
  return isProd ? null : DEV_DEFAULTS[role];
}

const SALT = 'edualert-demo-salt';
const hash = (pw) => crypto.scryptSync(pw, SALT, 32);

export function passwordMatches(role, input) {
  const expected = passwordFor(role);
  if (!expected || typeof input !== 'string') return false;
  return crypto.timingSafeEqual(hash(input), hash(expected));
}

export function isRoleConfigured(role) {
  return Boolean(passwordFor(role));
}

const LECTURERS = [
  { username: 'gv.nam', name: 'ThS. Nguyễn Hoàng Nam', cvht: 'ThS. Nguyễn Hoàng Nam' },
  { username: 'gv.bich', name: 'TS. Trần Thị Bích', cvht: 'TS. Trần Thị Bích' },
  { username: 'gv.dung', name: 'ThS. Lê Văn Dũng', cvht: 'ThS. Lê Văn Dũng' },
];

export function findUser(role, username) {
  const uname = String(username || '').trim().toLowerCase();
  if (!uname) return null;

  if (role === 'admin' && uname === 'admin') {
    return { username: 'admin', role: 'admin', name: 'Quản trị viên' };
  }
  if (role === 'lecturer') {
    const l = LECTURERS.find((x) => x.username === uname);
    if (!l) return null;
    const classes = MOCK_CLASSES.filter((c) => c.cvht === l.cvht).map((c) => c.maLop);
    return { username: l.username, role: 'lecturer', name: l.name, classes };
  }
  if (role === 'student') {
    const s = MOCK_STUDENTS.find((x) => x.maSV.toLowerCase() === uname);
    if (!s) return null;
    return { username: s.maSV, role: 'student', name: s.hoTen, maSV: s.maSV };
  }
  return null;
}

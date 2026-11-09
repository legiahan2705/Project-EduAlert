import crypto from 'node:crypto';
import { connectDB } from './mongodb.js';
import { User } from '../models/index.js';
import { MOCK_CLASSES, MOCK_STUDENTS } from '../engine/mockData.js';

export const ROLES = ['admin', 'lecturer', 'student'];

const isProd = process.env.NODE_ENV === 'production';

export const DEV_DEFAULTS = {
  admin: 'Admin@123',
  lecturer: 'Giangvien@123',
  student: 'Sinhvien@123',
};

const ENV_KEYS = {
  admin: 'ADMIN_PASSWORD',
  lecturer: 'LECTURER_PASSWORD',
  student: 'STUDENT_PASSWORD',
};

export function passwordFor(role) {
  const fromEnv = process.env[ENV_KEYS[role]];
  if (fromEnv) return fromEnv;
  return isProd ? null : DEV_DEFAULTS[role];
}

/**
 * Hash password sử dụng scrypt an toàn
 */
export function hashNewPassword(pw) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(pw, salt, 32).toString('hex');
  return { hash, salt };
}

export function verifyPassword(inputPw, storedHash, salt) {
  if (!inputPw || !storedHash || !salt) return false;
  try {
    const inputHash = crypto.scryptSync(inputPw, salt, 32).toString('hex');
    const a = Buffer.from(inputHash, 'hex');
    const b = Buffer.from(storedHash, 'hex');
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/**
 * Khởi tạo dữ liệu người dùng mẫu ban đầu trên MongoDB nếu bảng User còn trống
 */
export async function seedDefaultUsersIfEmpty() {
  await connectDB();
  const count = await User.countDocuments();
  if (count > 0) return;

  console.log('🌱 Seeding initial users into MongoDB...');

  // 1. Admin
  const adminPw = hashNewPassword(passwordFor('admin') || 'Admin@123');
  await User.create({
    username: 'admin',
    passwordHash: adminPw.hash,
    salt: adminPw.salt,
    role: 'admin',
    name: 'Quản trị viên Hệ thống',
    email: 'admin@ou.edu.vn',
    phone: '0901234567',
    status: 'ACTIVE',
    createdBy: 'system',
  });

  // 2. Giảng viên demo
  const gvPw = hashNewPassword(passwordFor('lecturer') || 'Giangvien@123');
  await User.create({
    username: 'gv.nam',
    passwordHash: gvPw.hash,
    salt: gvPw.salt,
    role: 'lecturer',
    name: 'ThS. Nguyễn Hoàng Nam',
    email: 'nam.nh@ou.edu.vn',
    phone: '0912345678',
    facultyCode: 'OU-FIT',
    facultyName: 'Khoa Công nghệ thông tin',
    classes: ['DH22CS01C'],
    status: 'ACTIVE',
    createdBy: 'system',
  });

  await User.create({
    username: 'gv.bich',
    passwordHash: gvPw.hash,
    salt: gvPw.salt,
    role: 'lecturer',
    name: 'TS. Trần Thị Bích',
    email: 'bich.tt@ou.edu.vn',
    phone: '0923456789',
    facultyCode: 'OU-FIT',
    facultyName: 'Khoa Công nghệ thông tin',
    classes: ['DH22CS02C'],
    status: 'ACTIVE',
    createdBy: 'system',
  });

  // 3. Sinh viên demo
  const svPw = hashNewPassword(passwordFor('student') || 'Sinhvien@123');
  await User.create({
    username: '2251050001',
    passwordHash: svPw.hash,
    salt: svPw.salt,
    role: 'student',
    name: 'Nguyễn Văn An',
    email: '2251050001@student.ou.edu.vn',
    phone: '0934567890',
    maSV: '2251050001',
    maLop: 'DH22CS01C',
    maNganh: 'FIT2200001',
    tenNganh: 'Khoa học máy tính',
    status: 'ACTIVE',
    createdBy: 'system',
  });

  console.log('✅ Seeded 4 default users (admin, gv.nam, gv.bich, 2251050001)');
}

/**
 * Tìm và xác thực tài khoản từ MongoDB
 */
export async function authenticateUser(role, username, password) {
  const uname = String(username || '').trim().toLowerCase();
  if (!uname || !password) return { success: false, error: 'Thiếu thông tin đăng nhập' };

  try {
    await connectDB();
    await seedDefaultUsersIfEmpty();

    const user = await User.findOne({ role, username: uname });
    if (!user) {
      return { success: false, error: 'Tên đăng nhập hoặc vai trò không chính xác' };
    }

    if (user.status === 'LOCKED') {
      return { success: false, error: 'Tài khoản này đã bị khóa. Vui lòng liên hệ Quản trị viên.' };
    }

    const isMatch = verifyPassword(password, user.passwordHash, user.salt);
    if (!isMatch) {
      return { success: false, error: 'Mật khẩu không chính xác' };
    }

    return {
      success: true,
      user: {
        _id: user._id.toString(),
        username: user.username,
        role: user.role,
        name: user.name,
        email: user.email,
        phone: user.phone,
        facultyCode: user.facultyCode,
        facultyName: user.facultyName,
        classes: user.classes || [],
        maSV: user.maSV,
        maLop: user.maLop,
        maNganh: user.maNganh,
        status: user.status,
      },
    };
  } catch (err) {
    console.error('Error in authenticateUser:', err);
    // Fallback: nếu lỗi kết nối database, dùng logic demo dự phòng
    return fallbackAuthenticate(role, uname, password);
  }
}

/**
 * Fallback dự phòng khi không kết nối được MongoDB
 */
function fallbackAuthenticate(role, uname, password) {
  const expected = passwordFor(role);
  if (!expected || password !== expected) {
    return { success: false, error: 'Mật khẩu không chính xác (chế độ dự phòng)' };
  }

  if (role === 'admin' && uname === 'admin') {
    return { success: true, user: { username: 'admin', role: 'admin', name: 'Quản trị viên (Offline)' } };
  }
  if (role === 'lecturer' && uname === 'gv.nam') {
    return { success: true, user: { username: 'gv.nam', role: 'lecturer', name: 'ThS. Nguyễn Hoàng Nam', classes: ['DH22CS01C'] } };
  }
  if (role === 'student' && uname === '2251050001') {
    return { success: true, user: { username: '2251050001', role: 'student', name: 'Nguyễn Văn An', maSV: '2251050001' } };
  }

  return { success: false, error: 'Tài khoản không tồn tại' };
}

// Backward compatibility
export function isRoleConfigured(role) {
  return true;
}

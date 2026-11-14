import crypto from 'node:crypto';
import { connectDB } from './mongodb.js';
import { User } from '../models/index.js';
import { MOCK_STUDENTS } from '../engine/mockData.js';

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
  return DEV_DEFAULTS[role];
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

// 1. Danh sách giảng viên các môn học và CVHT hiện có trong hệ thống
export const INITIAL_LECTURERS = [
  {
    username: 'gv.vinh',
    name: 'TS. Lê Xuân Vĩnh',
    email: 'vinh.lx@ou.edu.vn',
    phone: '0912345001',
    facultyCode: 'FIT',
    facultyName: 'Khoa Công nghệ thông tin',
    classes: ['DH22CS01C', 'DH22IT01', 'DH22SE01'],
    coursesTaught: ['COSC1301', 'COSC3302', 'COSC4601'],
  },
  {
    username: 'gv.nam',
    name: 'ThS. Nguyễn Hoàng Nam',
    email: 'nam.nh@ou.edu.vn',
    phone: '0912345002',
    facultyCode: 'FIT',
    facultyName: 'Khoa Công nghệ thông tin',
    classes: ['DH22CS01C', 'DH22CS02C', 'DH22SE01'],
    coursesTaught: ['COSC1301', 'COSC1302', 'COSC2307'],
  },
  {
    username: 'gv.tuan',
    name: 'TS. Phạm Minh Tuấn',
    email: 'tuan.pm@ou.edu.vn',
    phone: '0912345003',
    facultyCode: 'FIT',
    facultyName: 'Khoa Công nghệ thông tin',
    classes: ['DH22CS01C', 'DH22SE01'],
    coursesTaught: ['COSC2301', 'COSC2305', 'COSC4301'],
  },
  {
    username: 'gv.quan',
    name: 'ThS. Đỗ Hồng Quân',
    email: 'quan.dh@ou.edu.vn',
    phone: '0912345004',
    facultyCode: 'FIT',
    facultyName: 'Khoa Công nghệ thông tin',
    classes: ['DH22CS01C', 'DH22IT01'],
    coursesTaught: ['COSC2302', 'COSC2304'],
  },
  {
    username: 'gv.thuy',
    name: 'TS. Phan Thị Thùy',
    email: 'thuy.pt@ou.edu.vn',
    phone: '0912345005',
    facultyCode: 'FAAF',
    facultyName: 'Khoa Kế toán - Kiểm toán',
    classes: ['DH22AC01', 'DH22CS01C'],
    coursesTaught: ['ACCT1301'],
  },
  {
    username: 'gv.hung',
    name: 'PGS.TS. Nguyễn Văn Hùng',
    email: 'hung.nv@ou.edu.vn',
    phone: '0912345008',
    facultyCode: 'FECO',
    facultyName: 'Khoa Kinh tế',
    classes: ['DH22EC01'],
    coursesTaught: ['ECON1301'],
  },
  {
    username: 'gv.lan',
    name: 'PGS.TS. Trần Thị Lan',
    email: 'lan.tt@ou.edu.vn',
    phone: '0912345009',
    facultyCode: 'FBA',
    facultyName: 'Khoa Quản trị kinh doanh',
    classes: ['DH22BA01'],
    coursesTaught: ['MGMT1301'],
  },
  {
    username: 'gv.mai',
    name: 'ThS. Hoàng Thị Mai',
    email: 'mai.ht@ou.edu.vn',
    phone: '0912345010',
    facultyCode: 'FFL',
    facultyName: 'Khoa Ngoại ngữ',
    classes: ['DH22EN01'],
    coursesTaught: ['ENGL1301', 'ENGL1302'],
  },
  {
    username: 'gv.bich',
    name: 'TS. Trần Thị Bích',
    email: 'bich.tt@ou.edu.vn',
    phone: '0912345006',
    facultyCode: 'FIT',
    facultyName: 'Khoa Công nghệ thông tin',
    classes: ['DH22CS02C'],
    coursesTaught: ['MATH1301', 'MATH1302', 'MATH1303'],
  },
  {
    username: 'gv.dung',
    name: 'ThS. Lê Văn Dũng',
    email: 'dung.lv@ou.edu.vn',
    phone: '0912345007',
    facultyCode: 'FIT',
    facultyName: 'Khoa Công nghệ thông tin',
    classes: ['DH22IT01'],
    coursesTaught: ['COSC2306', 'COSC3301', 'COSC3306'],
  },
];

/**
 * Sinh danh sách tất cả các user ban đầu (1 Admin, 7 Giảng viên, 45 Sinh viên)
 */
export function buildAllInitialUsers() {
  const users = [];

  // 1. Quản trị viên (Chỉ giữ đúng 1 tài khoản)
  const adminPw = hashNewPassword(passwordFor('admin') || 'Admin@123');
  users.push({
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

  // 2. Các Giảng viên
  const gvPw = hashNewPassword(passwordFor('lecturer') || 'Giangvien@123');
  for (const gv of INITIAL_LECTURERS) {
    users.push({
      username: gv.username,
      passwordHash: gvPw.hash,
      salt: gvPw.salt,
      role: 'lecturer',
      name: gv.name,
      email: gv.email,
      phone: gv.phone,
      facultyCode: gv.facultyCode,
      facultyName: gv.facultyName,
      classes: gv.classes,
      coursesTaught: gv.coursesTaught || [],
      status: 'ACTIVE',
      createdBy: 'system',
    });
  }

  // 3. Toàn bộ 45 Sinh viên trong MOCK_STUDENTS
  const svPw = hashNewPassword(passwordFor('student') || 'Sinhvien@123');
  for (const s of (MOCK_STUDENTS || [])) {
    users.push({
      username: s.maSV.toLowerCase(),
      passwordHash: svPw.hash,
      salt: svPw.salt,
      role: 'student',
      name: s.hoTen,
      email: s.email || `${s.maSV}@student.ou.edu.vn`,
      phone: s.sdt || '',
      maSV: s.maSV,
      maLop: s.lop || 'DH22CS01C',
      maNganh: s.maNganh || 'FIT2200001',
      tenNganh: s.nganh || 'Khoa học máy tính',
      status: 'ACTIVE',
      createdBy: 'system',
    });
  }

  return users;
}

/**
 * Khởi tạo dữ liệu người dùng mẫu ban đầu trên MongoDB
 */
export async function seedDefaultUsersIfEmpty() {
  const conn = await connectDB();
  if (!conn) return;

  const count = await User.countDocuments();
  const allUsers = buildAllInitialUsers();
  // Nếu chưa có hoặc chưa đủ sinh viên, thực hiện upsert bổ sung toàn bộ
  if (count < allUsers.length) {
    console.log(`🌱 Seeding/syncing ${allUsers.length} users into MongoDB...`);

    for (const u of allUsers) {
      await User.findOneAndUpdate(
        { username: u.username },
        { $setOnInsert: u },
        { upsert: true, returnDocument: 'after' }
      );
    }
    console.log(`✅ Synced ${allUsers.length} users successfully into MongoDB!`);
  }
}

/**
 * Tìm và xác thực tài khoản từ MongoDB (kèm fallback đầy đủ)
 */
export async function authenticateUser(role, username, password) {
  const uname = String(username || '').trim().toLowerCase();
  if (!uname || !password) return { success: false, error: 'Thiếu thông tin đăng nhập' };

  try {
    const conn = await connectDB();
    if (conn) {
      await seedDefaultUsersIfEmpty();

      const user = await User.findOne({ role, username: uname });
      if (user) {
        if (user.status === 'LOCKED') {
          return { success: false, error: 'Tài khoản này đã bị khóa. Vui lòng liên hệ Quản trị viên.' };
        }

        const isMatch = verifyPassword(password, user.passwordHash, user.salt);
        if (isMatch) {
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
              coursesTaught: user.coursesTaught || [],
              maSV: user.maSV,
              maLop: user.maLop,
              maNganh: user.maNganh,
              status: user.status,
            },
          };
        } else {
          return { success: false, error: 'Mật khẩu không chính xác' };
        }
      }
    }
  } catch (err) {
    console.warn('MongoDB query failed, falling back to local user store:', err.message);
  }

  // Fallback: nếu chưa kết nối được MongoDB do IP whitelist hoặc mất mạng
  return fallbackAuthenticate(role, uname, password);
}

export const RUNTIME_PASSWORD_OVERRIDES = new Map();

export async function resetUserPassword(username, newPassword) {
  const uname = String(username || '').trim().toLowerCase();
  if (!uname || !newPassword || newPassword.length < 6) {
    throw new Error('Mật khẩu mới phải có tối thiểu 6 ký tự');
  }

  const { hash, salt } = hashNewPassword(newPassword);
  RUNTIME_PASSWORD_OVERRIDES.set(uname, { passwordHash: hash, salt });

  try {
    const conn = await connectDB();
    if (conn) {
      await seedDefaultUsersIfEmpty();
      await User.findOneAndUpdate(
        { username: uname },
        { $set: { passwordHash: hash, salt } },
        { returnDocument: 'after' }
      );
    }
  } catch (err) {
    console.warn('MongoDB password reset update failed:', err.message);
  }

  return { success: true };
}

/**
 * Fallback dự phòng cho toàn bộ Admin, Giảng viên và 45 Sinh viên
 */
function fallbackAuthenticate(role, uname, password) {
  const override = RUNTIME_PASSWORD_OVERRIDES.get(uname);
  if (override) {
    const isMatch = verifyPassword(password, override.passwordHash, override.salt);
    if (!isMatch) return { success: false, error: 'Mật khẩu không chính xác' };
  } else {
    const expectedPw = passwordFor(role);
    if (!expectedPw || password !== expectedPw) {
      return { success: false, error: 'Mật khẩu không chính xác' };
    }
  }

  // 1. Admin
  if (role === 'admin' && uname === 'admin') {
    return {
      success: true,
      user: {
        username: 'admin',
        role: 'admin',
        name: 'Quản trị viên Hệ thống',
        email: 'admin@ou.edu.vn',
      },
    };
  }

  // 2. Giảng viên
  if (role === 'lecturer') {
    const gv = INITIAL_LECTURERS.find((x) => x.username === uname);
    if (gv) {
      return {
        success: true,
        user: {
          username: gv.username,
          role: 'lecturer',
          name: gv.name,
          email: gv.email,
          facultyCode: gv.facultyCode,
          classes: gv.classes,
          coursesTaught: gv.coursesTaught || [],
        },
      };
    }
  }

  // 3. Sinh viên (45 sinh viên trong MOCK_STUDENTS)
  if (role === 'student') {
    const sv = (MOCK_STUDENTS || []).find((x) => x.maSV.toLowerCase() === uname);
    if (sv) {
      return {
        success: true,
        user: {
          username: sv.maSV,
          role: 'student',
          name: sv.hoTen,
          maSV: sv.maSV,
          maLop: sv.lop,
          maNganh: sv.maNganh,
          email: sv.email || `${sv.maSV}@student.ou.edu.vn`,
        },
      };
    }
  }

  return { success: false, error: 'Tên đăng nhập hoặc vai trò không chính xác' };
}

export function isRoleConfigured(role) {
  return true;
}

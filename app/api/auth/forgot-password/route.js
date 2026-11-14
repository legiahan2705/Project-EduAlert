import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models';
import {
  INITIAL_LECTURERS,
  resetUserPassword,
  seedDefaultUsersIfEmpty,
} from '@/lib/users';
import { MOCK_STUDENTS } from '@/engine/mockData';

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const { action, username, verifyInfo, newPassword, confirmPassword } = body;

    const uname = String(username || '').trim().toLowerCase();
    const vInfo = String(verifyInfo || '').trim().toLowerCase();

    if (!uname) {
      return NextResponse.json({ error: 'Vui lòng nhập Tên đăng nhập hoặc MSSV' }, { status: 400 });
    }
    if (!vInfo) {
      return NextResponse.json({ error: 'Vui lòng nhập Email hoặc Số điện thoại xác minh' }, { status: 400 });
    }

    // 1. Tìm thông tin người dùng trong DB hoặc Mock
    let foundUser = null;

    try {
      const conn = await connectDB();
      if (conn) {
        await seedDefaultUsersIfEmpty();
        foundUser = await User.findOne({ username: uname }).lean();
      }
    } catch (err) {
      console.warn('DB connection in forgot-password:', err.message);
    }

    // Fallback tìm trong INITIAL_LECTURERS, MOCK_STUDENTS hoặc admin nếu DB chưa có
    if (!foundUser) {
      if (uname === 'admin') {
        foundUser = {
          username: 'admin',
          name: 'Quản trị viên Hệ thống',
          email: 'admin@ou.edu.vn',
          phone: '0901234567',
          role: 'admin',
          status: 'ACTIVE',
        };
      } else {
        const gv = INITIAL_LECTURERS.find((x) => x.username.toLowerCase() === uname);
        if (gv) {
          foundUser = { ...gv, role: 'lecturer', status: 'ACTIVE' };
        } else {
          const sv = (MOCK_STUDENTS || []).find((x) => x.maSV.toLowerCase() === uname);
          if (sv) {
            foundUser = {
              username: sv.maSV.toLowerCase(),
              name: sv.hoTen,
              email: sv.email || `${sv.maSV.toLowerCase()}@student.ou.edu.vn`,
              phone: sv.sdt || '',
              role: 'student',
              status: 'ACTIVE',
            };
          }
        }
      }
    }

    if (!foundUser) {
      return NextResponse.json({ error: 'Không tìm thấy tài khoản với Tên đăng nhập / MSSV này' }, { status: 404 });
    }

    if (foundUser.status === 'LOCKED') {
      return NextResponse.json({ error: 'Tài khoản này đã bị khóa. Vui lòng liên hệ Quản trị viên để được hỗ trợ.' }, { status: 403 });
    }

    // 2. Xác thực Email / Số điện thoại
    const userEmail = String(foundUser.email || '').trim().toLowerCase();
    const userPhone = String(foundUser.phone || '').trim().replace(/\D/g, '');
    const defaultStudentEmail = `${uname}@student.ou.edu.vn`;
    const cleanVInfo = vInfo.replace(/\D/g, '');

    const isEmailMatch =
      vInfo === userEmail ||
      (foundUser.role === 'student' && vInfo === defaultStudentEmail);

    const isPhoneMatch =
      cleanVInfo.length >= 8 &&
      userPhone.length >= 8 &&
      (cleanVInfo === userPhone || userPhone.endsWith(cleanVInfo) || cleanVInfo.endsWith(userPhone));

    if (!isEmailMatch && !isPhoneMatch) {
      return NextResponse.json({
        error: 'Email hoặc Số điện thoại xác minh không khớp với thông tin hồ sơ tài khoản',
      }, { status: 400 });
    }

    // Nếu chỉ là bước kiểm tra xác thực (action === 'verify')
    if (action === 'verify') {
      return NextResponse.json({
        success: true,
        user: {
          username: foundUser.username,
          name: foundUser.name,
          role: foundUser.role,
        },
      });
    }

    // Bước Đặt lại mật khẩu mới
    if (!newPassword || newPassword.trim().length < 6) {
      return NextResponse.json({ error: 'Mật khẩu mới phải có ít nhất 6 ký tự' }, { status: 400 });
    }
    if (confirmPassword && newPassword !== confirmPassword) {
      return NextResponse.json({ error: 'Xác nhận mật khẩu mới không khớp' }, { status: 400 });
    }

    await resetUserPassword(uname, newPassword.trim());

    return NextResponse.json({
      success: true,
      message: 'Đặt lại mật khẩu thành công! Bạn có thể đăng nhập ngay với mật khẩu mới.',
      username: foundUser.username,
      role: foundUser.role,
    });
  } catch (error) {
    console.error('Error in forgot-password API:', error);
    return NextResponse.json({ error: error.message || 'Lỗi xử lý yêu cầu đặt lại mật khẩu' }, { status: 500 });
  }
}

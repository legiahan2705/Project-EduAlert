import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models';
import { authorize } from '@/lib/session';
import { hashNewPassword } from '@/lib/users';

export async function PUT(req, { params }) {
  const auth = authorize(req, ['admin']);
  if (auth.error) return auth.error;

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: 'Thiếu mã người dùng' }, { status: 400 });
  }

  try {
    await connectDB();
    const body = await req.json();
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ error: 'Không tìm thấy người dùng' }, { status: 404 });
    }

    // Không cho phép tự khóa hoặc tự đổi vai trò của chính mình
    if (user.username === auth.session.username) {
      if (body.status === 'LOCKED') {
        return NextResponse.json({ error: 'Bạn không thể tự khóa tài khoản của chính mình!' }, { status: 400 });
      }
      if (body.role && body.role !== 'admin') {
        return NextResponse.json({ error: 'Bạn không thể tự hủy vai trò Quản trị viên của mình!' }, { status: 400 });
      }
    }

    if (body.name) user.name = body.name.trim();
    if (body.email !== undefined) user.email = body.email.trim();
    if (body.phone !== undefined) user.phone = body.phone.trim();
    if (body.role && ['admin', 'lecturer', 'student'].includes(body.role)) user.role = body.role;
    if (body.status && ['ACTIVE', 'LOCKED'].includes(body.status)) user.status = body.status;

    if (body.facultyCode !== undefined) user.facultyCode = body.facultyCode;
    if (body.facultyName !== undefined) user.facultyName = body.facultyName;
    if (body.classes !== undefined) user.classes = Array.isArray(body.classes) ? body.classes : [body.classes];

    if (body.maSV !== undefined) user.maSV = body.maSV;
    if (body.maLop !== undefined) user.maLop = body.maLop;
    if (body.maNganh !== undefined) user.maNganh = body.maNganh;
    if (body.tenNganh !== undefined) user.tenNganh = body.tenNganh;

    // Nếu có yêu cầu đặt lại mật khẩu mới
    if (body.newPassword && body.newPassword.trim()) {
      if (body.newPassword.trim().length < 6) {
        return NextResponse.json({ error: 'Mật khẩu mới phải có ít nhất 6 ký tự' }, { status: 400 });
      }
      const { hash, salt } = hashNewPassword(body.newPassword.trim());
      user.passwordHash = hash;
      user.salt = salt;
    }

    await user.save();

    const userObj = user.toObject();
    delete userObj.passwordHash;
    delete userObj.salt;

    return NextResponse.json(userObj);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: error.message || 'Lỗi khi cập nhật tài khoản' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const auth = authorize(req, ['admin']);
  if (auth.error) return auth.error;

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: 'Thiếu mã người dùng' }, { status: 400 });
  }

  try {
    await connectDB();
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ error: 'Không tìm thấy người dùng' }, { status: 404 });
    }

    // Không cho phép tự xóa tài khoản của chính mình
    if (user.username === auth.session.username) {
      return NextResponse.json({ error: 'Bạn không thể tự xóa tài khoản đang đăng nhập!' }, { status: 400 });
    }

    // Đảm bảo luôn còn ít nhất 1 admin
    if (user.role === 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin' });
      if (adminCount <= 1) {
        return NextResponse.json({ error: 'Không thể xóa Quản trị viên duy nhất của hệ thống!' }, { status: 400 });
      }
    }

    await User.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Đã xóa tài khoản thành công' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Lỗi khi xóa tài khoản' }, { status: 500 });
  }
}


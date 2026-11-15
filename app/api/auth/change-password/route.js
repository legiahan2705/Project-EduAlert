import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models';
import { authorize } from '@/lib/session';
import { hashNewPassword, verifyPassword } from '@/lib/users';

// Người dùng đã đăng nhập tự đổi mật khẩu (dùng cho lần đăng nhập đầu hoặc đổi chủ động).
export async function POST(req) {
  const auth = authorize(req);
  if (auth.error) return auth.error;

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Dữ liệu không hợp lệ' }, { status: 400 });
  }
  const { currentPassword, newPassword, confirmPassword } = body || {};

  if (!currentPassword) {
    return NextResponse.json({ error: 'Vui lòng nhập mật khẩu hiện tại' }, { status: 400 });
  }
  if (!newPassword || newPassword.length < 6) {
    return NextResponse.json({ error: 'Mật khẩu mới phải có ít nhất 6 ký tự' }, { status: 400 });
  }
  if (confirmPassword !== undefined && newPassword !== confirmPassword) {
    return NextResponse.json({ error: 'Xác nhận mật khẩu không khớp' }, { status: 400 });
  }
  if (newPassword === currentPassword) {
    return NextResponse.json({ error: 'Mật khẩu mới phải khác mật khẩu hiện tại' }, { status: 400 });
  }

  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ error: 'Chưa kết nối được cơ sở dữ liệu nên không thể đổi mật khẩu' }, { status: 503 });
    }

    const user = await User.findOne({ username: auth.session.username });
    if (!user) {
      return NextResponse.json({ error: 'Không tìm thấy tài khoản' }, { status: 404 });
    }
    if (!verifyPassword(currentPassword, user.passwordHash, user.salt)) {
      return NextResponse.json({ error: 'Mật khẩu hiện tại không chính xác' }, { status: 401 });
    }

    const { hash, salt } = hashNewPassword(newPassword);
    user.passwordHash = hash;
    user.salt = salt;
    user.mustChangePassword = false;
    await user.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in change-password API:', error);
    return NextResponse.json({ error: 'Lỗi khi đổi mật khẩu' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models';

export async function GET(req) {
  const session = getSession(req);
  if (!session) return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });

  // Cờ bắt đổi mật khẩu nằm trong DB (không đưa vào cookie để đổi xong có hiệu lực ngay)
  let mustChangePassword = false;
  try {
    const conn = await connectDB();
    if (conn) {
      const u = await User.findOne({ username: session.username }).select('mustChangePassword').lean();
      mustChangePassword = !!u?.mustChangePassword;
    }
  } catch {
    mustChangePassword = false;
  }

  return NextResponse.json({
    user: {
      username: session.username,
      role: session.role,
      name: session.name,
      maSV: session.maSV,
      classes: session.classes,
      mustChangePassword,
    },
  });
}

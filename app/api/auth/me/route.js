import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

export async function GET(req) {
  const session = getSession(req);
  if (!session) return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
  return NextResponse.json({
    user: {
      username: session.username,
      role: session.role,
      name: session.name,
      maSV: session.maSV,
      classes: session.classes,
    },
  });
}

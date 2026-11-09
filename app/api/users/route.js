import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models';
import { authorize } from '@/lib/session';
import { hashNewPassword, seedDefaultUsersIfEmpty, buildAllInitialUsers } from '@/lib/users';

export async function GET(req) {
  const auth = authorize(req, ['admin']);
  if (auth.error) return auth.error;

  try {
    await connectDB();
    await seedDefaultUsersIfEmpty();

    const { searchParams } = new URL(req.url);
    const roleFilter = searchParams.get('role');
    const statusFilter = searchParams.get('status');
    const search = searchParams.get('search');

    const query = {};
    if (roleFilter && roleFilter !== 'ALL') {
      query.role = roleFilter;
    }
    if (statusFilter && statusFilter !== 'ALL') {
      query.status = statusFilter;
    }
    if (search && search.trim()) {
      const q = search.trim();
      query.$or = [
        { username: { $regex: q, $options: 'i' } },
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { maSV: { $regex: q, $options: 'i' } },
      ];
    }

    let users = await User.find(query)
      .select('-passwordHash -salt')
      .sort({ createdAt: -1 })
      .lean();

    if (!users || users.length === 0) {
      const fallbackList = buildAllInitialUsers().map((u, idx) => ({
        _id: `user-init-${idx}`,
        username: u.username,
        role: u.role,
        name: u.name,
        email: u.email,
        phone: u.phone,
        facultyCode: u.facultyCode,
        facultyName: u.facultyName,
        classes: u.classes || [],
        coursesTaught: u.coursesTaught || [],
        maSV: u.maSV,
        maLop: u.maLop,
        tenNganh: u.tenNganh,
        status: u.status,
      }));
      return NextResponse.json(fallbackList);
    }

    return NextResponse.json(users);
  } catch (error) {
    console.warn('Error fetching users from DB, returning fallback initial users:', error.message);
    const fallbackList = buildAllInitialUsers().map((u, idx) => ({
      _id: `user-init-${idx}`,
      username: u.username,
      role: u.role,
      name: u.name,
      email: u.email,
      phone: u.phone,
      facultyCode: u.facultyCode,
      facultyName: u.facultyName,
      classes: u.classes || [],
      coursesTaught: u.coursesTaught || [],
      maSV: u.maSV,
      maLop: u.maLop,
      tenNganh: u.tenNganh,
      status: u.status,
    }));
    return NextResponse.json(fallbackList);
  }
}

export async function POST(req) {
  const auth = authorize(req, ['admin']);
  if (auth.error) return auth.error;

  try {
    await connectDB();
    const body = await req.json();

    const {
      username,
      password,
      role,
      name,
      email,
      phone,
      facultyCode,
      facultyName,
      classes,
      maSV,
      maLop,
      maNganh,
      tenNganh,
    } = body;

    const cleanUsername = String(username || '').trim().toLowerCase();
    if (!cleanUsername || cleanUsername.length < 3) {
      return NextResponse.json({ error: 'Tên đăng nhập phải có ít nhất 3 ký tự' }, { status: 400 });
    }
    if (!password || password.length < 6) {
      return NextResponse.json({ error: 'Mật khẩu phải có ít nhất 6 ký tự' }, { status: 400 });
    }
    if (!['admin', 'lecturer', 'student'].includes(role)) {
      return NextResponse.json({ error: 'Vai trò người dùng không hợp lệ' }, { status: 400 });
    }
    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Vui lòng nhập họ và tên' }, { status: 400 });
    }

    // Kiểm tra trùng username
    const existing = await User.findOne({ username: cleanUsername });
    if (existing) {
      return NextResponse.json({ error: `Tên đăng nhập "${cleanUsername}" đã tồn tại trên hệ thống` }, { status: 409 });
    }

    // Mã hóa mật khẩu
    const { hash, salt } = hashNewPassword(password);

    const newUser = await User.create({
      username: cleanUsername,
      passwordHash: hash,
      salt: salt,
      role,
      name: name.trim(),
      email: (email || '').trim(),
      phone: (phone || '').trim(),
      facultyCode: facultyCode || '',
      facultyName: facultyName || '',
      classes: Array.isArray(classes) ? classes : (classes ? [classes] : []),
      maSV: role === 'student' ? (maSV || cleanUsername) : '',
      maLop: role === 'student' ? (maLop || '') : '',
      maNganh: role === 'student' ? (maNganh || '') : '',
      tenNganh: role === 'student' ? (tenNganh || '') : '',
      status: 'ACTIVE',
      createdBy: auth.session.username,
    });

    const userObj = newUser.toObject();
    delete userObj.passwordHash;
    delete userObj.salt;

    return NextResponse.json(userObj, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: error.message || 'Lỗi khi tạo tài khoản' }, { status: 500 });
  }
}


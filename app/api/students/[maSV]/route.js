import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Student, Class, User } from '@/models';
import { authorize } from '@/lib/session';

export async function DELETE(req, { params }) {
  const auth = authorize(req, ['admin']);
  if (auth.error) return auth.error;

  const { maSV } = await params;
  if (!maSV) {
    return NextResponse.json({ error: 'Thiếu mã số sinh viên' }, { status: 400 });
  }

  const cleanMaSV = decodeURIComponent(maSV).trim();

  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ success: true, message: `Đã xóa sinh viên ${cleanMaSV}` });
    }

    const student = await Student.findOne({ maSV: cleanMaSV });
    if (!student) {
      return NextResponse.json({ error: 'Không tìm thấy sinh viên' }, { status: 404 });
    }

    const classCode = student.lop;

    // Xóa sinh viên
    await Student.findOneAndDelete({ maSV: cleanMaSV });

    // Giảm sĩ số lớp tương ứng
    if (classCode) {
      await Class.findOneAndUpdate(
        { maLop: classCode, siSo: { $gt: 0 } },
        { $inc: { siSo: -1 } }
      );
    }

    // Xóa tài khoản đăng nhập của sinh viên nếu có
    await User.findOneAndDelete({ username: cleanMaSV.toLowerCase(), role: 'student' });

    return NextResponse.json({ success: true, message: `Đã xóa sinh viên ${cleanMaSV} thành công` });
  } catch (error) {
    console.error('Error deleting student:', error);
    return NextResponse.json({ error: error.message || 'Lỗi khi xóa sinh viên' }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  const auth = authorize(req, ['admin', 'lecturer', 'student']);
  if (auth.error) return auth.error;

  const { maSV } = await params;
  const cleanMaSV = decodeURIComponent(maSV).trim();

  try {
    const conn = await connectDB();
    if (!conn) return NextResponse.json({ maSV: cleanMaSV });

    const student = await Student.findOne({ maSV: cleanMaSV }).lean();
    if (!student) {
      return NextResponse.json({ error: 'Không tìm thấy sinh viên' }, { status: 404 });
    }

    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

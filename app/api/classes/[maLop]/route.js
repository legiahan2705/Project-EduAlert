import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Class, Student, GradeSheet } from '@/models';
import { authorize } from '@/lib/session';

export async function DELETE(req, { params }) {
  const auth = authorize(req, ['admin']);
  if (auth.error) return auth.error;

  const { maLop } = await params;
  if (!maLop) {
    return NextResponse.json({ error: 'Thiếu mã lớp' }, { status: 400 });
  }

  const cleanMaLop = decodeURIComponent(maLop).trim().toUpperCase();

  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ success: true, message: `Đã xóa lớp ${cleanMaLop}` });
    }

    // Kiểm tra lớp có sinh viên không
    const studentCount = await Student.countDocuments({ lop: cleanMaLop });
    if (studentCount > 0) {
      return NextResponse.json(
        { error: `Không thể xóa lớp "${cleanMaLop}" vì đang có ${studentCount} sinh viên trực thuộc!` },
        { status: 400 }
      );
    }

    await Class.findOneAndDelete({ maLop: cleanMaLop });
    // Xóa các bảng điểm của lớp này
    await GradeSheet.deleteMany({ maLop: cleanMaLop });

    return NextResponse.json({ success: true, message: `Đã xóa lớp ${cleanMaLop} thành công` });
  } catch (error) {
    console.error('Error deleting class:', error);
    return NextResponse.json({ error: error.message || 'Lỗi khi xóa lớp' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const auth = authorize(req, ['admin']);
  if (auth.error) return auth.error;

  const { maLop } = await params;
  const cleanMaLop = decodeURIComponent(maLop).trim().toUpperCase();

  try {
    const conn = await connectDB();
    const data = await req.json();
    if (!conn) return NextResponse.json(data);

    const updated = await Class.findOneAndUpdate(
      { maLop: cleanMaLop },
      { $set: data },
      { returnDocument: 'after' }
    );
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating class:', error);
    return NextResponse.json({ error: error.message || 'Lỗi khi cập nhật lớp' }, { status: 500 });
  }
}


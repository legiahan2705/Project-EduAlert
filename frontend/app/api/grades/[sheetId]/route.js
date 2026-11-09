import { NextResponse } from 'next/server';
import { authorize } from '@/lib/session';
import { connectDB } from '@/lib/mongodb';
import { GradeSheet } from '@/models';

export async function PUT(req, { params }) {
  const auth = authorize(req, ['admin', 'lecturer']);
  if (auth.error) return auth.error;
  try {
    const { sheetId } = await params;
    const sheetData = await req.json();

    // Giảng viên chỉ được phép lưu điểm môn/lớp do chính mình phụ trách
    if (auth.session.role === 'lecturer') {
      const isOwner =
        sheetData.giangVien === auth.session.name ||
        (auth.session.coursesTaught || []).includes(sheetData.maMon) ||
        (auth.session.classes || []).includes(sheetData.maLop);
      if (!isOwner) {
        return NextResponse.json(
          { error: `Bạn không phải giảng viên phụ trách môn này (${sheetData.giangVien || 'khác'}). Bạn không có quyền chỉnh sửa điểm số!` },
          { status: 403 }
        );
      }
    }

    const conn = await connectDB();
    if (!conn) return NextResponse.json(sheetData);

    const updated = await GradeSheet.findOneAndUpdate(
      { id: sheetId },
      sheetData,
      { new: true, upsert: true }
    );
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


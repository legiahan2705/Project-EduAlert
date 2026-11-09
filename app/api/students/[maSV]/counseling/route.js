import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Student } from '@/models';
import { authorize, canAccessStudent } from '@/lib/session';
import { MOCK_STUDENTS } from '@/engine/mockData';

export async function POST(req, { params }) {
  const auth = authorize(req, ['admin', 'lecturer']);
  if (auth.error) return auth.error;
  try {
    const { maSV } = await params;
    const noteObj = await req.json();
    const conn = await connectDB();
    const target = conn ? await Student.findOne({ maSV }).lean() : MOCK_STUDENTS.find((s) => s.maSV === maSV);
    if (!target) return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    if (!canAccessStudent(auth.session, target)) {
      return NextResponse.json({ error: 'Không đủ quyền truy cập' }, { status: 403 });
    }
    if (!conn) return NextResponse.json({ success: true, note: noteObj });

    const student = await Student.findOne({ maSV });
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    const currentLogs = student.counselingLog || [];
    student.counselingLog = [noteObj, ...currentLogs];
    await student.save();

    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


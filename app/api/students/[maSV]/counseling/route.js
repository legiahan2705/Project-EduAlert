import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Student } from '@/models';

export async function POST(req, { params }) {
  try {
    const { maSV } = await params;
    const noteObj = await req.json();
    const conn = await connectDB();
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

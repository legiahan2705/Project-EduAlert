import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Student } from '@/models';
import { authorize, canAccessStudent } from '@/lib/session';
import { MOCK_STUDENTS } from '@/engine/mockData';

export async function GET(req) {
  const auth = authorize(req, ['admin', 'lecturer', 'student']);
  if (auth.error) return auth.error;
  const scope = (list) => list.filter((s) => canAccessStudent(auth.session, s));
  try {
    const conn = await connectDB();
    if (!conn) return NextResponse.json(scope(MOCK_STUDENTS));

    let students = await Student.find().lean();
    if (students.length === 0) {
      await Student.insertMany(MOCK_STUDENTS);
      students = await Student.find().lean();
    }
    return NextResponse.json(scope(students));
  } catch (error) {
    return NextResponse.json(scope(MOCK_STUDENTS));
  }
}


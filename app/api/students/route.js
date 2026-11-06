import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Student } from '@/models';
import { MOCK_STUDENTS } from '@/engine/mockData';

export async function GET() {
  try {
    const conn = await connectDB();
    if (!conn) return NextResponse.json(MOCK_STUDENTS);

    let students = await Student.find().lean();
    if (students.length === 0) {
      await Student.insertMany(MOCK_STUDENTS);
      students = await Student.find().lean();
    }
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json(MOCK_STUDENTS);
  }
}


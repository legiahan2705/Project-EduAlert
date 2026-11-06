import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { GradeSheet } from '@/models';
import { MOCK_COURSE_GRADES } from '@/engine/mockData';

export async function GET() {
  try {
    const conn = await connectDB();
    if (!conn) return NextResponse.json(MOCK_COURSE_GRADES);

    let grades = await GradeSheet.find().lean();
    if (grades.length === 0) {
      await GradeSheet.insertMany(MOCK_COURSE_GRADES);
      grades = await GradeSheet.find().lean();
    }
    return NextResponse.json(grades);
  } catch (error) {
    return NextResponse.json(MOCK_COURSE_GRADES);
  }
}


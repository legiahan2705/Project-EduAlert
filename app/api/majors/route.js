import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Major } from '@/models';
import { MOCK_MAJORS } from '@/engine/mockData';

export async function GET() {
  try {
    const conn = await connectDB();
    if (!conn) return NextResponse.json(MOCK_MAJORS);

    let majors = await Major.find().sort({ createdAt: -1 }).lean();
    if (majors.length === 0) {
      await Major.insertMany(MOCK_MAJORS);
      majors = await Major.find().sort({ createdAt: -1 }).lean();
    }
    return NextResponse.json(majors);
  } catch (error) {
    return NextResponse.json(MOCK_MAJORS);
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const conn = await connectDB();
    if (!conn) return NextResponse.json({ ...data, _mock: true });

    const created = await Major.create(data);
    return NextResponse.json(created);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

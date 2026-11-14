import { NextResponse } from 'next/server';
import { authorize } from '@/lib/session';
import { connectDB } from '@/lib/mongodb';
import { Major } from '@/models';
import { MOCK_MAJORS } from '@/engine/mockData';

export async function GET(req) {
  const auth = authorize(req, ['admin', 'lecturer', 'student']);
  if (auth.error) return auth.error;
  try {
    const conn = await connectDB();
    if (!conn) return NextResponse.json(MOCK_MAJORS);

    let majors = await Major.find().sort({ createdAt: -1 }).lean();
    if (majors.length < MOCK_MAJORS.length) {
      for (const m of MOCK_MAJORS) {
        await Major.findOneAndUpdate(
          { code: m.code },
          { $setOnInsert: m },
          { upsert: true, returnDocument: 'after' }
        );
      }
      majors = await Major.find().sort({ createdAt: -1 }).lean();
    }
    return NextResponse.json(majors);
  } catch (error) {
    return NextResponse.json(MOCK_MAJORS);
  }
}

export async function POST(req) {
  const auth = authorize(req, ['admin']);
  if (auth.error) return auth.error;
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


import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { GradeSheet } from '@/models';

export async function PUT(req, { params }) {
  try {
    const { sheetId } = await params;
    const sheetData = await req.json();
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

import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Faculty } from '@/models';

export async function PUT(req, { params }) {
  try {
    const { code } = await params;
    const updates = await req.json();
    const conn = await connectDB();
    if (!conn) return NextResponse.json(updates);

    const updated = await Faculty.findOneAndUpdate(
      { $or: [{ code }, { id: code }] },
      updates,
      { new: true }
    );
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { code } = await params;
    const conn = await connectDB();
    if (!conn) return NextResponse.json({ success: true });

    await Faculty.findOneAndDelete({ $or: [{ code }, { id: code }] });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

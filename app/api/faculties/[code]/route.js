import { NextResponse } from 'next/server';
import { authorize } from '@/lib/session';
import { connectDB } from '@/lib/mongodb';
import { Faculty } from '@/models';

export async function PUT(req, { params }) {
  const auth = authorize(req, ['admin']);
  if (auth.error) return auth.error;
  try {
    const { code } = await params;
    const cleanCode = decodeURIComponent(code).trim();
    const updates = await req.json();
    const conn = await connectDB();
    if (!conn) return NextResponse.json(updates);

    const updated = await Faculty.findOneAndUpdate(
      { $or: [{ code: cleanCode }, { id: cleanCode }, { shortCode: cleanCode }] },
      updates,
      { returnDocument: 'after' }
    );
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const auth = authorize(req, ['admin']);
  if (auth.error) return auth.error;
  try {
    const { code } = await params;
    const cleanCode = decodeURIComponent(code).trim();
    const conn = await connectDB();
    if (!conn) return NextResponse.json({ success: true });

    await Faculty.findOneAndDelete({ $or: [{ code: cleanCode }, { id: cleanCode }, { shortCode: cleanCode }] });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


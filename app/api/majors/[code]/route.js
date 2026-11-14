import { NextResponse } from 'next/server';
import { authorize } from '@/lib/session';
import { connectDB } from '@/lib/mongodb';
import { Major } from '@/models';

export async function PUT(req, { params }) {
  const auth = authorize(req, ['admin']);
  if (auth.error) return auth.error;
  try {
    const { code } = await params;
    const updates = await req.json();
    const conn = await connectDB();
    if (!conn) return NextResponse.json(updates);

    const updated = await Major.findOneAndUpdate(
      { $or: [{ code }, { id: code }] },
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
    const conn = await connectDB();
    if (!conn) return NextResponse.json({ success: true });

    await Major.findOneAndDelete({ $or: [{ code }, { id: code }] });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


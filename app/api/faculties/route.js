import { NextResponse } from 'next/server';
import { authorize } from '@/lib/session';
import { connectDB } from '@/lib/mongodb';
import { Faculty } from '@/models';
import { MOCK_FACULTIES } from '@/engine/mockData';

export async function GET(req) {
  const auth = authorize(req, ['admin', 'lecturer', 'student']);
  if (auth.error) return auth.error;
  try {
    const conn = await connectDB();
    if (!conn) {
      // Nếu chưa có MONGODB_URI thì trả về dữ liệu mẫu an toàn
      return NextResponse.json(MOCK_FACULTIES);
    }

    let faculties = await Faculty.find().sort({ createdAt: -1 }).lean();
    if (faculties.length === 0) {
      // Tự động khởi tạo dữ liệu ban đầu lên Cloud
      await Faculty.insertMany(MOCK_FACULTIES);
      faculties = await Faculty.find().sort({ createdAt: -1 }).lean();
    }
    return NextResponse.json(faculties);
  } catch (error) {
    console.error('Error fetching faculties:', error);
    return NextResponse.json(MOCK_FACULTIES);
  }
}

export async function POST(req) {
  const auth = authorize(req, ['admin']);
  if (auth.error) return auth.error;
  try {
    const data = await req.json();
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ ...data, _mock: true });
    }

    const code = String(data.code || data.id || '').trim();
    const shortCode = String(data.shortCode || '').trim().toUpperCase();

    if (!code) {
      return NextResponse.json({ error: 'Mã khoa không được để trống' }, { status: 400 });
    }

    const existing = await Faculty.findOne({ $or: [{ code }, { id: code }, { shortCode }] });
    if (existing) {
      return NextResponse.json({ error: `Khoa với mã "${code}" hoặc ký hiệu "${shortCode}" đã tồn tại!` }, { status: 409 });
    }

    const created = await Faculty.create({
      ...data,
      id: code,
      code,
      shortCode,
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating faculty:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Faculty } from '@/models';
import { MOCK_FACULTIES } from '@/engine/mockData';

export async function GET() {
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
  try {
    const data = await req.json();
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ ...data, _mock: true });
    }

    const created = await Faculty.create(data);
    return NextResponse.json(created);
  } catch (error) {
    console.error('Error creating faculty:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


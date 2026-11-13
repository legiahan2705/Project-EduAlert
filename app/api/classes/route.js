import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Class, Major, GradeSheet } from '@/models';
import { authorize } from '@/lib/session';
import { MOCK_CLASSES } from '@/engine/mockData';
import { generateGradeSheetsForClass } from '@/lib/gradeSheets';

export async function GET(req) {
  const auth = authorize(req, ['admin', 'lecturer', 'student']);
  if (auth.error) return auth.error;

  try {
    const conn = await connectDB();
    if (!conn) return NextResponse.json(MOCK_CLASSES);

    let classes = await Class.find().sort({ createdAt: -1 }).lean();
    if (classes.length < MOCK_CLASSES.length) {
      for (const c of MOCK_CLASSES) {
        await Class.findOneAndUpdate(
          { maLop: c.maLop },
          { $setOnInsert: c },
          { upsert: true, new: true }
        );
      }
      classes = await Class.find().sort({ createdAt: -1 }).lean();
    }
    return NextResponse.json(classes);
  } catch (error) {
    console.error('Error in GET /api/classes:', error);
    return NextResponse.json(MOCK_CLASSES);
  }
}

export async function POST(req) {
  const auth = authorize(req, ['admin']);
  if (auth.error) return auth.error;

  try {
    const conn = await connectDB();
    const data = await req.json();

    const maLop = String(data.maLop || '').trim().toUpperCase();
    const tenLop = String(data.tenLop || '').trim();
    const maNganh = String(data.maNganh || '').trim();

    if (!maLop) {
      return NextResponse.json({ error: 'Mã lớp không được để trống' }, { status: 400 });
    }
    if (!tenLop) {
      return NextResponse.json({ error: 'Tên lớp không được để trống' }, { status: 400 });
    }
    if (!maNganh) {
      return NextResponse.json({ error: 'Mã ngành không được để trống' }, { status: 400 });
    }

    if (!conn) {
      return NextResponse.json({
        id: maLop,
        maLop,
        tenLop,
        maNganh,
        ...data,
        _mock: true,
      });
    }

    // Kiểm tra trùng mã lớp
    const existing = await Class.findOne({ maLop });
    if (existing) {
      return NextResponse.json({ error: `Mã lớp "${maLop}" đã tồn tại trên hệ thống!` }, { status: 409 });
    }

    // Tìm tên ngành nếu chưa có
    let nganh = data.nganh || '';
    if (!nganh) {
      const m = await Major.findOne({ code: maNganh }).lean();
      if (m) nganh = m.name;
    }

    const newClass = await Class.create({
      id: maLop,
      maLop,
      tenLop,
      maNganh,
      nganh,
      khoaHoc: data.khoaHoc || '2022 - 2026',
      namHocThu: Number(data.namHocThu) || 1,
      siSo: Number(data.siSo) || 0,
      cvht: data.cvht ? String(data.cvht).trim() : '',
      emailCVHT: data.emailCVHT || `${maLop.toLowerCase()}@ou.edu.vn`,
      phongHoc: data.phongHoc || 'A302 - Cơ sở 371 Nguyễn Kiệm',
      ghiChu: data.ghiChu || '',
    });

    // Tự động khởi tạo toàn bộ Bảng điểm cho lớp học mới theo CTĐT 4 năm (8 học kỳ)
    try {
      const generatedSheets = generateGradeSheetsForClass(newClass);
      if (generatedSheets.length > 0) {
        await GradeSheet.insertMany(generatedSheets, { ordered: false });
      }
    } catch (sheetErr) {
      console.warn('Lưu bảng điểm tự động cho lớp mới:', sheetErr?.message);
    }

    return NextResponse.json(newClass, { status: 201 });
  } catch (error) {
    console.error('Error creating class:', error);
    return NextResponse.json({ error: error.message || 'Lỗi khi tạo lớp mới' }, { status: 500 });
  }
}


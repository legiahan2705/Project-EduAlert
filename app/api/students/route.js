import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Student, Class, User } from '@/models';
import { authorize, canAccessStudent } from '@/lib/session';
import { MOCK_STUDENTS } from '@/engine/mockData';
import { hashNewPassword } from '@/lib/users';

export async function GET(req) {
  const auth = authorize(req, ['admin', 'lecturer', 'student']);
  if (auth.error) return auth.error;
  const scope = (list) => list.filter((s) => canAccessStudent(auth.session, s));
  try {
    const conn = await connectDB();
    if (!conn) return NextResponse.json(scope(MOCK_STUDENTS));

    let students = await Student.find().lean();
    if (students.length === 0) {
      await Student.insertMany(MOCK_STUDENTS);
      students = await Student.find().lean();
    }
    return NextResponse.json(scope(students));
  } catch (error) {
    return NextResponse.json(scope(MOCK_STUDENTS));
  }
}

export async function POST(req) {
  const auth = authorize(req, ['admin']);
  if (auth.error) return auth.error;

  try {
    const conn = await connectDB();
    const data = await req.json();

    const maSV = String(data.maSV || '').trim();
    const hoTen = String(data.hoTen || '').trim();
    const lop = String(data.lop || '').trim().toUpperCase();

    if (!maSV) {
      return NextResponse.json({ error: 'Mã số sinh viên (MSSV) không được để trống' }, { status: 400 });
    }
    if (!hoTen) {
      return NextResponse.json({ error: 'Họ và tên sinh viên không được để trống' }, { status: 400 });
    }
    if (!lop) {
      return NextResponse.json({ error: 'Lớp sinh hoạt không được để trống' }, { status: 400 });
    }

    if (!conn) {
      return NextResponse.json({ ...data, maSV, hoTen, lop, _mock: true }, { status: 201 });
    }

    // Kiểm tra trùng MSSV
    const existing = await Student.findOne({ maSV });
    if (existing) {
      return NextResponse.json({ error: `Sinh viên với MSSV "${maSV}" đã tồn tại trên hệ thống!` }, { status: 409 });
    }

    // Lấy thông tin ngành từ lớp nếu có
    let maNganh = data.maNganh || '';
    let nganh = data.nganh || '';
    const classDoc = await Class.findOne({ maLop: lop }).lean();
    if (classDoc) {
      if (!maNganh) maNganh = classDoc.maNganh;
      if (!nganh) nganh = classDoc.nganh;
    }

    const gpaTL = parseFloat(data.gpaTL) || 2.5;
    const tcTichLuy = parseInt(data.tcTichLuy, 10) || 0;
    const tcNo = parseInt(data.tcNo, 10) || 0;

    // Đánh giá sơ bộ trạng thái học vụ
    let level = 'NORMAL';
    let levelText = 'Học tập bình thường';
    let riskScore = 15;

    if (gpaTL < 1.0) {
      level = 'DROP_OUT_RISK';
      levelText = 'Nguy cơ buộc thôi học';
      riskScore = 88;
    } else if (gpaTL < 1.4 || tcNo >= 12) {
      level = 'HIGH_RISK';
      levelText = 'Rủi ro cao (Cảnh báo lần 2)';
      riskScore = 72;
    } else if (gpaTL < 2.0 || tcNo >= 6) {
      level = 'WARNING';
      levelText = 'Cảnh báo học vụ';
      riskScore = 55;
    }

    const newStudent = await Student.create({
      maSV,
      hoTen,
      gioiTinh: data.gioiTinh || 'Nam',
      ngaySinh: data.ngaySinh || '01/01/2004',
      lop,
      maNganh,
      nganh,
      namHoc: parseInt(data.namHoc, 10) || 2,
      gpaTL,
      gpaHK: parseFloat(data.gpaHK) || gpaTL,
      tcTichLuy,
      tcNo,
      riskScore,
      hadPrevWarning: Boolean(data.hadPrevWarning),
      warningCount: parseInt(data.warningCount, 10) || 0,
      drl: parseInt(data.drl, 10) || 75,
      email: data.email || `${maSV.toLowerCase()}@student.ou.edu.vn`,
      sdt: data.sdt || '',
      notes: data.notes || '',
      historySemesters: data.historySemesters || [],
      counselingLog: data.counselingLog || [],
      level,
      levelText,
    });

    // Cập nhật tăng sĩ số lớp
    if (classDoc) {
      await Class.findOneAndUpdate({ maLop: lop }, { $inc: { siSo: 1 } });
    }

    // Tự động tạo tài khoản đăng nhập cho sinh viên này (nếu chưa có)
    const existingUser = await User.findOne({ username: maSV.toLowerCase() });
    if (!existingUser) {
      const { hash, salt } = hashNewPassword('Sinhvien@123');
      await User.create({
        username: maSV.toLowerCase(),
        passwordHash: hash,
        salt,
        role: 'student',
        name: hoTen,
        email: data.email || `${maSV.toLowerCase()}@student.ou.edu.vn`,
        phone: data.sdt || '',
        maSV,
        maLop: lop,
        maNganh,
        tenNganh: nganh,
        status: 'ACTIVE',
        createdBy: auth.session.username,
      });
    }

    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    console.error('Error creating student:', error);
    return NextResponse.json({ error: error.message || 'Lỗi khi thêm sinh viên' }, { status: 500 });
  }
}

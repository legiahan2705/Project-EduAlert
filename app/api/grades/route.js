import { NextResponse } from 'next/server';
import { authorize } from '@/lib/session';
import { connectDB } from '@/lib/mongodb';
import { GradeSheet, Class } from '@/models';
import { MOCK_CLASSES, MOCK_COURSE_GRADES } from '@/engine/mockData';
import { generateGradeSheetsForClass } from '@/lib/gradeSheets';

export async function GET(req) {
  const auth = authorize(req, ['admin', 'lecturer']);
  if (auth.error) return auth.error;
  try {
    const conn = await connectDB();
    if (!conn) return NextResponse.json(MOCK_COURSE_GRADES);

    let grades = await GradeSheet.find().sort({ hocKy: 1, maMon: 1 }).lean();
    if (grades.length < 60) {
      // Tự động sinh bảng điểm cho toàn bộ các lớp theo CTĐT 4 năm (8 học kỳ)
      let allClasses = await Class.find().lean();
      if (!allClasses || allClasses.length === 0) {
        allClasses = MOCK_CLASSES;
      }

      const allGeneratedSheets = [];
      for (const cls of allClasses) {
        const sheets = generateGradeSheetsForClass(cls);
        allGeneratedSheets.push(...sheets);
      }

      // Giữ lại hoặc cập nhật điểm sinh viên chi tiết từ dữ liệu mẫu
      const mockGradeMap = new Map();
      for (const mg of MOCK_COURSE_GRADES) {
        mockGradeMap.set(mg.maBangDiem || mg.id, mg);
      }

      for (const s of allGeneratedSheets) {
        const key = s.id;
        const existingMock = mockGradeMap.get(key);
        if (existingMock) {
          s.grades = existingMock.grades || [];
          s.trangThai = existingMock.trangThai || s.trangThai;
          s.statusText = existingMock.statusText || s.statusText;
          s.progress = existingMock.progress ?? s.progress;
          s.giangVien = existingMock.giangVien || s.giangVien;
        }

        // Upsert vào MongoDB để đồng bộ trọn vẹn
        await GradeSheet.findOneAndUpdate(
          { id: s.id },
          { $set: s },
          { upsert: true, returnDocument: 'after' }
        );
      }

      grades = await GradeSheet.find().sort({ hocKy: 1, maMon: 1 }).lean();
    }
    return NextResponse.json(grades);
  } catch (error) {
    console.error('Error in GET /api/grades:', error);
    return NextResponse.json(MOCK_COURSE_GRADES);
  }
}


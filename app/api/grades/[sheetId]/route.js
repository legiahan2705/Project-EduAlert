import { NextResponse } from 'next/server';
import { authorize } from '@/lib/session';
import { connectDB } from '@/lib/mongodb';
import { GradeSheet, Student } from '@/models';

export async function PUT(req, { params }) {
  const auth = authorize(req, ['admin', 'lecturer']);
  if (auth.error) return auth.error;
  try {
    const { sheetId } = await params;
    const sheetData = await req.json();

    // Giảng viên chỉ được phép lưu điểm môn/lớp do chính mình phụ trách (hoặc tài khoản demo)
    if (auth.session.role === 'lecturer') {
      const uName = (auth.session.name || '').trim().toLowerCase();
      const uUsername = (auth.session.username || '').trim().toLowerCase();
      const sTeacher = (sheetData.giangVien || '').trim().toLowerCase();
      const sEmail = (sheetData.emailGV || '').trim().toLowerCase();
      const uEmail = (auth.session.email || '').trim().toLowerCase();

      const userClasses = (auth.session.classes || []).map(c => String(c).trim().toUpperCase());
      const userCourses = (auth.session.coursesTaught || []).map(c => String(c).trim().toUpperCase());

      const isDemoOrMaster = uUsername === 'gv.han' || uUsername === 'gv.nam' || uName === 'demo' || uName.includes('demo') || uName.includes('hân');

      const isOwner =
        isDemoOrMaster ||
        (sTeacher && uName && (sTeacher === uName || sTeacher.includes(uName) || uName.includes(sTeacher))) ||
        (sEmail && uEmail && sEmail === uEmail) ||
        userCourses.includes(String(sheetData.maMon || '').trim().toUpperCase()) ||
        userClasses.includes(String(sheetData.maLop || '').trim().toUpperCase());

      if (!isOwner) {
        return NextResponse.json(
          { error: `Bạn không phải giảng viên phụ trách môn này (${sheetData.giangVien || 'khác'}). Bạn không có quyền chỉnh sửa điểm số!` },
          { status: 403 }
        );
      }
    }

    const conn = await connectDB();
    if (!conn) return NextResponse.json(sheetData);

    const updated = await GradeSheet.findOneAndUpdate(
      { id: sheetId },
      sheetData,
      { returnDocument: 'after', upsert: true }
    );

    // Tự động tính toán lại GPA tích lũy, số tín chỉ đạt và nợ môn cho sinh viên từ bảng điểm các môn
    try {
      const maLop = sheetData.maLop || updated.maLop;
      if (maLop) {
        const allSheets = await GradeSheet.find({ maLop }).lean();
        const students = await Student.find({ lop: maLop });

        for (const stu of students) {
          let totalPoints = 0;
          let totalCredits = 0;
          let passedCredits = 0;
          let debtCredits = 0;
          let hasGradedCourse = false;

          for (const s of allSheets) {
            const studentEntry = (s.grades || []).find((g) => g.maSV === stu.maSV);
            if (
              studentEntry &&
              studentEntry.diemTK10 !== null &&
              studentEntry.diemTK10 !== undefined &&
              !isNaN(studentEntry.diemTK10)
            ) {
              hasGradedCourse = true;
              const tc = Number(s.soTC) || 3;
              const g4 = Number(studentEntry.grade4 ?? 0);
              totalPoints += g4 * tc;
              totalCredits += tc;
              if (studentEntry.pass) {
                passedCredits += tc;
              } else {
                debtCredits += tc;
              }
            }
          }

          if (hasGradedCourse && totalCredits > 0) {
            const gpaTL = Math.round((totalPoints / totalCredits) * 100) / 100;
            let level = 'NORMAL';
            let levelText = 'Học tập bình thường';
            let riskScore = 15;

            if (gpaTL < 1.0) {
              level = 'DROP_OUT_RISK';
              levelText = 'Nguy cơ buộc thôi học';
              riskScore = 88;
            } else if (gpaTL < 1.4 || debtCredits >= 12) {
              level = 'HIGH_RISK';
              levelText = 'Rủi ro cao (Cảnh báo lần 2)';
              riskScore = 72;
            } else if (gpaTL < 2.0 || debtCredits >= 6) {
              level = 'WARNING';
              levelText = 'Cảnh báo học vụ';
              riskScore = 55;
            }

            await Student.updateOne(
              { maSV: stu.maSV },
              {
                $set: {
                  gpaTL,
                  gpaHK: gpaTL,
                  tcTichLuy: passedCredits,
                  tcNo: debtCredits,
                  level,
                  levelText,
                  riskScore,
                }
              }
            );
          }
        }
      }
    } catch (recalcErr) {
      console.warn('Lỗi tự động tính lại GPA tích lũy cho sinh viên:', recalcErr);
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

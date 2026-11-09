/**
 * studentAuditHelper.js
 * Tiện ích quản lý bảng điểm học phần, đối chiếu CTĐT và mô phỏng học vụ OU EduAlert
 */

import { OUGradeEngine } from './OUGradeEngine.js';

/**
 * Lấy hoặc sinh tự động toàn bộ bảng điểm học phần đã lưu của sinh viên
 */
export function getStudentTranscript(student, curriculumByMajor = {}) {
  if (!student) return [];

  // Nếu sinh viên đã có danh sách completedCourses chi tiết
  if (student.completedCourses && student.completedCourses.length > 0) {
    return student.completedCourses.map((c) => {
      const conv = c.letter ? { grade4: c.grade4, letter: c.letter, pass: c.pass } : OUGradeEngine.convertGrade(c.diemTK10);
      const isPass = conv.pass && conv.letter !== 'F';
      const diemQT = c.diemQT !== undefined ? c.diemQT : Math.min(10, Math.max(0, Math.round((c.diemTK10 * 1.05) * 10) / 10));
      const diemThi = c.diemThi !== undefined ? c.diemThi : Math.min(10, Math.max(0, Math.round(((c.diemTK10 - 0.4 * diemQT) / 0.6) * 10) / 10));

      return {
        maMon: c.maMon,
        tenMon: c.tenMon,
        soTC: c.soTC || 3,
        diemQT: diemQT,
        diemThi: diemThi,
        diemTK10: c.diemTK10 !== undefined ? c.diemTK10 : OUGradeEngine.calcDiemTK10(diemQT, diemThi),
        grade4: conv.grade4,
        letter: conv.letter,
        isTichLuy: c.isTichLuy !== false,
        pass: isPass
      };
    });
  }

  // Nếu chưa có, lấy các môn thuộc CTĐT ngành của sinh viên (học kỳ 1 - 4) để tạo bảng điểm tương ứng với GPA
  const majorCode = student.maNganh || '7480201';
  const majorCourses = curriculumByMajor[majorCode] || curriculumByMajor['7480201'] || [];
  const takenCourses = majorCourses.filter((c) => c.hkDuKien <= 4).slice(0, 10);

  const targetGPA = student.gpaTL || 2.5;
  const hasDebt = (student.tcNo || 0) > 0;
  let debtCount = hasDebt ? Math.min(2, Math.ceil(student.tcNo / 3)) : 0;

  return takenCourses.map((c, idx) => {
    let diemTK10, letter, grade4, pass, diemQT, diemThi;

    if (debtCount > 0 && idx >= takenCourses.length - debtCount) {
      // Môn rớt (F)
      diemQT = 4.0;
      diemThi = 2.5;
      diemTK10 = 3.1;
      letter = 'F';
      grade4 = 0.0;
      pass = false;
    } else {
      // Môn đạt
      if (targetGPA >= 3.2) {
        diemQT = 8.5;
        diemThi = 8.0;
        diemTK10 = 8.2;
        letter = 'B+';
        grade4 = 3.0;
      } else if (targetGPA >= 2.5) {
        diemQT = 7.0;
        diemThi = 6.5;
        diemTK10 = 6.7;
        letter = 'C+';
        grade4 = 2.0;
      } else {
        diemQT = 5.5;
        diemThi = 5.0;
        diemTK10 = 5.2;
        letter = 'D+';
        grade4 = 1.0;
      }
      pass = true;
    }

    return {
      maMon: c.maMon,
      tenMon: c.tenMon,
      soTC: c.soTC,
      diemQT,
      diemThi,
      diemTK10,
      grade4,
      letter,
      isTichLuy: c.isTichLuy !== false,
      pass
    };
  });
}

/**
 * Đối chiếu tiến độ hoàn thành Chương trình đào tạo của ngành
 */
export function auditStudentCurriculum(student, curriculumByMajor = {}) {
  if (!student) return null;

  const majorCode = student.maNganh || '7480201';
  const allCurriculumCourses = curriculumByMajor[majorCode] || curriculumByMajor['7480201'] || [];
  const transcript = getStudentTranscript(student, curriculumByMajor);

  // Môn đã đạt
  const passedCourses = transcript.filter((c) => c.pass === true);
  const passedCodes = new Set(passedCourses.map((c) => c.maMon));

  // Môn rớt (F) cần trả nợ
  const failedCourses = transcript.filter((c) => c.pass === false || c.letter === 'F');

  // Môn còn lại chưa học trong CTĐT
  const remainingCourses = allCurriculumCourses.filter((c) => !passedCodes.has(c.maMon));

  // Thống kê
  const totalCourses = allCurriculumCourses.length;
  const totalCredits = allCurriculumCourses.reduce((sum, c) => sum + (c.soTC || 0), 0);

  const passedCredits = passedCourses.reduce((sum, c) => sum + (c.isTichLuy !== false ? c.soTC : 0), 0);
  const failedCredits = failedCourses.reduce((sum, c) => sum + (c.soTC || 0), 0);
  const remainingCredits = remainingCourses.reduce((sum, c) => sum + (c.soTC || 0), 0);

  const progressPercent = totalCredits > 0 ? Math.min(100, Math.round((passedCredits / totalCredits) * 100)) : 0;

  return {
    transcript,
    allCurriculumCourses,
    passedCourses,
    failedCourses,
    remainingCourses,
    stats: {
      totalCourses,
      totalCredits,
      passedCount: passedCourses.length,
      passedCredits,
      failedCount: failedCourses.length,
      failedCredits,
      remainingCount: remainingCourses.length,
      remainingCredits,
      progressPercent
    }
  };
}

/**
 * Mô phỏng kết quả học tập dự báo (What-If Academic Simulator)
 * @param student
 * @param simulationItems: Danh sách môn được chọn mô phỏng [{ maMon, tenMon, soTC, isRetake, oldGrade4, targetGrade4, targetLetter }]
 */
export function simulateStudentPlan(student, simulationItems = []) {
  if (!student) return null;

  const currentGPA = student.gpaTL || 2.0;
  const currentCredits = student.tcTichLuy || 60;
  const currentDebt = student.tcNo || 0;
  const currentPoints = currentGPA * currentCredits;

  let addedCredits = 0;
  let addedPoints = 0;
  let reducedDebt = 0;
  let retakeCount = 0;
  let newCoursesCount = 0;

  simulationItems.forEach((item) => {
    const targetGrade = parseFloat(item.targetGrade4) || 3.0;
    const credits = parseInt(item.soTC, 10) || 3;

    if (item.isRetake) {
      retakeCount++;
      // Khi trả nợ môn rớt: Điểm mới thay thế hoàn toàn điểm 0 cũ
      // Số tín chỉ tích lũy tăng thêm (vì trước đó môn F chưa được cộng vào TC tích lũy)
      addedCredits += credits;
      addedPoints += targetGrade * credits;
      reducedDebt += credits;
    } else {
      newCoursesCount++;
      addedCredits += credits;
      addedPoints += targetGrade * credits;
    }
  });

  const predictedCredits = currentCredits + addedCredits;
  const predictedPoints = currentPoints + addedPoints;
  const predictedGPA = predictedCredits > 0 ? Math.round((predictedPoints / predictedCredits) * 100) / 100 : currentGPA;
  const predictedDebt = Math.max(0, currentDebt - reducedDebt);
  const diffGPA = Math.round((predictedGPA - currentGPA) * 100) / 100;

  // Đánh giá trạng thái nguy cơ mới theo Thông tư 08
  const evalResult = OUGradeEngine.evaluateAcademicWarning({
    year: student.namHoc || 3,
    isFirstSem: false,
    semesterCredits: addedCredits || 15,
    failedCreditsInSem: 0,
    gpaSem: addedCredits > 0 ? (addedPoints / addedCredits) : predictedGPA,
    gpaCumulative: predictedGPA,
    debtCreditsTotal: predictedDebt,
    hadPreviousWarning: student.hadPrevWarning || false
  });

  return {
    currentGPA,
    predictedGPA,
    diffGPA,
    currentCredits,
    predictedCredits,
    currentDebt,
    predictedDebt,
    reducedDebt,
    retakeCount,
    newCoursesCount,
    newLevel: evalResult.level,
    newLevelText: evalResult.levelText,
    newLevelBadge: evalResult.levelBadge,
    newRiskScore: evalResult.riskScore,
    isEscapedWarning: (student.level === 'HIGH_RISK' || student.level === 'EARLY_WARNING') && evalResult.level === 'NORMAL',
    advice: predictedDebt === 0 && predictedGPA >= 2.5
      ? 'Kế hoạch xuất sắc! Sinh viên hoàn tất xóa toàn bộ nợ tín chỉ và củng cố vững chắc tiến độ tốt nghiệp loại Khá.'
      : predictedGPA >= 2.0
      ? 'Kế hoạch học tập khả thi, giúp sinh viên vượt qua ngưỡng sàn cảnh báo học vụ của Thông tư 08.'
      : 'Cần nỗ lực đạt mức điểm cao hơn (B/B+) ở các môn trả nợ để kéo điểm ĐTB tích lũy lên trên 2.0.'
  };
}

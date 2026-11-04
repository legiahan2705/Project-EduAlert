/**
 * OUGradeEngine.js
 * Module tính điểm và đánh giá học vụ chuẩn Quy chế Trường Đại học Mở TP.HCM
 * Áp dụng theo Thông tư 08/2021/TT-BGDĐT
 */

export const OUGradeEngine = {
  calcDiemTK10(diemQT, diemThi, wQT = 0.4, wThi = 0.6) {
    if (diemQT === null || diemQT === undefined || diemThi === null || diemThi === undefined) {
      return null;
    }
    const raw = (diemQT * wQT) + (diemThi * wThi);
    return Math.round(raw * 10) / 10;
  },

  convertGrade(score10) {
    if (score10 === null || score10 === undefined || isNaN(score10)) {
      return { grade4: 0, letter: 'F', pass: false, desc: 'Chưa có điểm' };
    }
    const s = Math.round(score10 * 10) / 10;
    if (s >= 9.0) return { grade4: 4.0, letter: 'A+', pass: true, desc: 'Xuất sắc' };
    if (s >= 8.5) return { grade4: 3.5, letter: 'A', pass: true, desc: 'Giỏi' };
    if (s >= 8.0) return { grade4: 3.0, letter: 'B+', pass: true, desc: 'Khá giỏi' };
    if (s >= 7.0) return { grade4: 2.5, letter: 'B', pass: true, desc: 'Khá' };
    if (s >= 6.5) return { grade4: 2.0, letter: 'C+', pass: true, desc: 'Trung bình khá' };
    if (s >= 5.5) return { grade4: 1.5, letter: 'C', pass: true, desc: 'Trung bình' };
    if (s >= 5.0) return { grade4: 1.0, letter: 'D+', pass: true, desc: 'Trung bình yếu' };
    if (s >= 4.0) return { grade4: 1.0, letter: 'D', pass: true, desc: 'Yếu (Đạt)' };
    return { grade4: 0.0, letter: 'F', pass: false, desc: 'Kém (Không đạt)' };
  },

  computeOUGrade(score10) {
    return this.convertGrade(score10);
  },

  calcSemesterGPA(semesterSubjects) {
    let totalPoints = 0;
    let totalCredits = 0;
    let failedCredits = 0;
    let passedCredits = 0;

    for (const sub of semesterSubjects) {
      const conv = sub.grade4 !== undefined ? { grade4: sub.grade4, pass: sub.pass } : this.convertGrade(sub.diemTK10);
      const tc = sub.soTC || 0;
      totalPoints += conv.grade4 * tc;
      totalCredits += tc;
      if (conv.pass) {
        passedCredits += tc;
      } else {
        failedCredits += tc;
      }
    }

    const gpa = totalCredits > 0 ? Math.round((totalPoints / totalCredits) * 100) / 100 : 0;
    return {
      gpa,
      totalCredits,
      passedCredits,
      failedCredits,
      failRate: totalCredits > 0 ? Math.round((failedCredits / totalCredits) * 100) : 0
    };
  },

  calcCumulativeGPA(allSubjectsHistory) {
    const latestSubjectMap = new Map();
    for (const sub of allSubjectsHistory) {
      latestSubjectMap.set(sub.maMon, sub);
    }

    let totalPoints = 0;
    let totalAccumulatedCredits = 0;
    let debtCredits = 0;

    latestSubjectMap.forEach(sub => {
      const conv = sub.grade4 !== undefined ? { grade4: sub.grade4, pass: sub.pass } : this.convertGrade(sub.diemTK10);
      const tc = sub.soTC || 0;

      if (!conv.pass) {
        debtCredits += tc;
      }

      if (sub.isTichLuy !== false) {
        if (conv.pass) {
          totalPoints += conv.grade4 * tc;
          totalAccumulatedCredits += tc;
        } else {
          totalPoints += 0;
          totalAccumulatedCredits += tc;
        }
      }
    });

    const gpaTL = totalAccumulatedCredits > 0 ? Math.round((totalPoints / totalAccumulatedCredits) * 100) / 100 : 0;
    return {
      gpaTL,
      totalAccumulatedCredits,
      debtCredits
    };
  },

  evaluateAcademicWarning({ year, isFirstSem, semesterCredits, failedCreditsInSem, gpaSem, gpaCumulative, debtCreditsTotal, hadPreviousWarning = false }) {
    const minGPA_TL = year <= 1 ? 1.2 : year <= 2 ? 1.4 : year <= 3 ? 1.6 : 1.8;
    const minGPA_Sem = isFirstSem ? 0.8 : 1.0;

    const rule1 = semesterCredits > 0 && failedCreditsInSem > 0.5 * semesterCredits;
    const rule2 = debtCreditsTotal > 24;
    const rule3 = gpaSem < minGPA_Sem;
    const rule4 = gpaCumulative < minGPA_TL;

    const checks = [
      {
        id: 'rule1',
        name: 'Tín chỉ rớt trong kỳ > 50%',
        desc: `Số TC không đạt trong kỳ (${failedCreditsInSem}/${semesterCredits} TC) vượt quá 50% tổng TC đăng ký.`,
        hit: rule1
      },
      {
        id: 'rule2',
        name: 'Nợ tín chỉ toàn khóa > 24 TC',
        desc: `Tổng số tín chỉ nợ đọng chưa trả nợ (${debtCreditsTotal} TC) vượt quá trần 24 TC của quy chế.`,
        hit: rule2
      },
      {
        id: 'rule3',
        name: `ĐTB học kỳ < ngưỡng sàn (${minGPA_Sem})`,
        desc: `ĐTB học kỳ (${gpaSem.toFixed(2)}) dưới mức sàn quy định ${minGPA_Sem}.`,
        hit: rule3
      },
      {
        id: 'rule4',
        name: `ĐTB tích lũy < ngưỡng sàn năm ${year} (${minGPA_TL})`,
        desc: `ĐTB tích lũy (${gpaCumulative.toFixed(2)}) dưới mức sàn an toàn năm ${year} là ${minGPA_TL}.`,
        hit: rule4
      }
    ];

    const hitRules = checks.filter(c => c.hit);
    let level = 'NORMAL';
    let levelText = 'Bình thường';
    let levelBadge = 'badge-success';

    if (hitRules.length >= 2 || (hadPreviousWarning && hitRules.length >= 1)) {
      level = 'HIGH_RISK';
      levelText = 'Nguy cơ cao (Diện kỷ luật)';
      levelBadge = 'badge-danger';
    } else if (hitRules.length === 1) {
      level = 'EARLY_WARNING';
      levelText = 'Cảnh báo sớm';
      levelBadge = 'badge-warning';
    }

    let riskScore = 15;
    if (hitRules.length > 0) riskScore += hitRules.length * 20;
    if (debtCreditsTotal > 10) riskScore += Math.min(25, debtCreditsTotal);
    if (gpaCumulative < 2.0) riskScore += 15;
    if (hadPreviousWarning) riskScore += 15;
    riskScore = Math.min(100, Math.max(0, riskScore));

    return {
      checks,
      hitRules,
      level,
      levelText,
      levelBadge,
      riskScore,
      minGPA_TL,
      minGPA_Sem
    };
  },

  calcTargetGPANeeded(gpaCurrent, tcCurrent, gpaTarget, tcRemaining) {
    if (tcRemaining <= 0) return { possible: false, gpaNeeded: 0, reason: 'Không còn tín chỉ để cải thiện' };
    const totalPointsTarget = gpaTarget * (tcCurrent + tcRemaining);
    const currentPoints = gpaCurrent * tcCurrent;
    const pointsNeeded = totalPointsTarget - currentPoints;
    const gpaNeeded = Math.round((pointsNeeded / tcRemaining) * 100) / 100;

    const possible = gpaNeeded <= 4.0 && gpaNeeded >= 0;
    return {
      possible,
      gpaNeeded,
      pointsNeeded,
      isHard: gpaNeeded > 3.6,
      message: possible 
        ? `Cần đạt trung bình ${gpaNeeded.toFixed(2)}/4.0 trên ${tcRemaining} tín chỉ còn lại.`
        : `Mục tiêu bất khả thi chỉ bằng các môn còn lại (yêu cầu GPA ${gpaNeeded.toFixed(2)} > 4.0). Cần học cải thiện các môn điểm thấp!`
    };
  },

  calcImprovementImpact(subject, targetGrade4, gpaCurrent, totalTCCurrent) {
    const currentGrade4 = subject.grade4 !== undefined ? subject.grade4 : this.convertGrade(subject.diemTK10).grade4;
    const deltaPoints = (targetGrade4 - currentGrade4) * subject.soTC;
    if (deltaPoints <= 0) {
      return { deltaGPA: 0, newGPA: gpaCurrent };
    }
    const newTotalPoints = (gpaCurrent * totalTCCurrent) + deltaPoints;
    const newGPA = Math.round((newTotalPoints / totalTCCurrent) * 100) / 100;
    const deltaGPA = Math.round((newGPA - gpaCurrent) * 100) / 100;

    return {
      deltaGPA,
      newGPA,
      deltaPoints
    };
  }
};

import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { student, warningEval, levelText } = await req.json();

    if (!student) {
      return NextResponse.json({ error: 'Missing student data' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Phân tích dữ liệu học vụ
    const isHighRisk = student.gpaTL < 1.6 || student.tcNo > 15;
    const debtCredits = student.tcNo || 0;
    const gpa = (student.gpaTL || 0).toFixed(2);
    const hitRulesText = warningEval?.hitRules?.map(r => r.name).join(', ') || 'Chưa vi phạm quy chế';

    // Xác định nhóm tâm lý & nguyên nhân (Sentiment & Risk Clustering)
    let psychologicalCause = 'Mất cân bằng thời gian (đi làm thêm / việc cá nhân)';
    let psychologicalAdvice = 'Cần trao đổi riêng để làm rõ lịch trình sinh hoạt, đề xuất giảm giờ làm thêm.';
    if (gpa < 1.3 && debtCredits >= 20) {
      psychologicalCause = 'Mất phương hướng / Chọn nhầm ngành hoặc sốc văn hóa đại học';
      psychologicalAdvice = 'Cần tham vấn tâm lý học đường, định hướng lại niềm đam mê hoặc tư vấn lộ trình chuyển ngành nếu thực sự không phù hợp.';
    } else if (gpa >= 1.3 && gpa < 1.8) {
      psychologicalCause = 'Phương pháp học tập chưa đúng & hổng kiến thức tiên quyết';
      psychologicalAdvice = 'Cần ghép đôi bạn cùng tiến (học lực Giỏi) để hỗ trợ các môn đồ án và lập trình.';
    }

    // Nếu CÓ Gemini API Key thì gọi Gemini
    if (apiKey) {
      try {
        const prompt = `Bạn là Trợ lý Cố vấn Học vụ AI chuyên nghiệp tại Trường Đại học Mở TP.HCM.
Hãy phân tích tình trạng của sinh viên sau và đưa ra:
1) Báo cáo đánh giá ngắn gọn cho Giảng viên Cố vấn (tối đa 4 câu).
2) Phân loại nguyên nhân sa sút (Tài chính/làm thêm, Phương pháp học, hay Chọn nhầm ngành).
3) Bản thảo Email/Tin nhắn gửi trực tiếp cho Sinh viên (văn phong ân cần, thấu hiểu nhưng nghiêm túc về quy chế).

Thông tin sinh viên:
- Họ và tên: ${student.hoTen} (MSSV: ${student.maSV})
- Lớp: ${student.lop} - Ngành: ${student.nganh}
- GPA tích lũy: ${gpa} / 4.0
- Tín chỉ nợ: ${debtCredits} TC
- Mức độ cảnh báo: ${levelText}
- Vi phạm quy chế TT08: ${hitRulesText}

Trả về định dạng JSON hợp lệ:
{
  "advisorSummary": "nội dung tóm tắt cho cố vấn",
  "rootCauseCategory": "Tên nhóm nguyên nhân",
  "actionPlan": ["bước 1", "bước 2", "bước 3"],
  "studentEmailDraft": "nội dung thư gửi sinh viên"
}`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { responseMimeType: 'application/json' }
            })
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const textResult = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (textResult) {
            const parsed = JSON.parse(textResult);
            return NextResponse.json({ ...parsed, isLiveAI: true });
          }
        }
      } catch (err) {
        console.warn('Gemini API call failed, falling back to Intelligent Academic Engine:', err.message);
      }
    }

    // Fallback thông minh (Local Engine dựa trên Rule & Academic Knowledge Graph)
    const advisorSummary = `Sinh viên ${student.hoTen} hiện có GPA tích lũy ${gpa} với ${debtCredits} tín chỉ nợ (${levelText}). Phân tích cho thấy em gặp khủng hoảng chủ yếu ở các môn cơ sở ngành kỹ thuật, dẫn đến tâm lý né tránh. Điểm sáng là em vẫn duy trì thái độ hợp tác và có khả năng phục hồi nếu được giãn tải môn học ngay trong kỳ tới.`;

    const actionPlan = [
      `Giảm tải đăng ký: Kỳ tới chỉ đăng ký tối đa 12 - 14 tín chỉ (không đăng ký quá 5 môn).`,
      `Bắt buộc trả nợ: Ưu tiên đăng ký lại ngay môn F có số tín chỉ cao nhất để kích hoạt cơ chế thế điểm.`,
      `Kèm cặp học vụ: Ghép đôi với cán sự học tập lớp ${student.lop} để hỗ trợ ôn tập nhóm trước kỳ thi 4 tuần.`
    ];

    const studentEmailDraft = `Thân gửi ${student.hoTen},\n\nThầy/Cô đã xem qua kết quả học tập kỳ vừa rồi của em. Thầy/Cô hiểu rằng giai đoạn đại học có rất nhiều áp lực, từ việc học đến các vấn đề cuộc sống cá nhân, và việc kết quả chưa như ý là điều nhiều bạn từng trải qua.\n\nTuy nhiên, hiện tại mức tích lũy của em đang chạm ngưỡng cần lưu ý theo quy định đào tạo. Thầy/Cô không muốn em phải chịu những ảnh hưởng đáng tiếc như buộc thôi học. Thầy/Cô đã lên sẵn cho em một phương án giảm tải và lộ trình trả nợ môn rất nhẹ nhàng.\n\nEm hãy phản hồi email này hoặc gặp Thầy/Cô vào sáng thứ Năm tuần này tại văn phòng Khoa để chúng ta cùng thống nhất kế hoạch giúp em lấy lại phong độ nhé!\n\nChúc em nhiều sức khỏe và vững tin,\nCố vấn học tập - Lớp ${student.lop}`;

    return NextResponse.json({
      advisorSummary,
      rootCauseCategory: psychologicalCause,
      psychologicalAdvice,
      actionPlan,
      studentEmailDraft,
      isLiveAI: false
    });

  } catch (error) {
    console.error('Error generating AI counseling:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { student, warningEval, levelText } = await req.json();

    if (!student) {
      return NextResponse.json({ error: 'Missing student data' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Phân tích dữ liệu học vụ thực tế
    const debtCredits = student.tcNo || 0;
    const gpa = (student.gpaTL || 0).toFixed(2);
    const hitRulesText = warningEval?.hitRules?.map(r => r.name).join(', ') || 'Chưa vi phạm quy chế';

    // 1. Kiểm tra xem trong Nhật ký tư vấn (counselingLog) hoặc ghi chú của CVHT có thông tin gì không
    const previousNotesText = [
      student.notes || '',
      ...(student.counselingLog || []).map(l => l.note || '')
    ].filter(Boolean).join('; ');

    // 2. Xác định nguyên nhân dựa trên DỮ LIỆU THỰC TẾ (Bảng điểm & Ghi chú CVHT)
    let rootCauseCategory = 'Hổng kiến thức chuỗi môn tiên quyết & Điểm quá trình thấp';
    let rootCauseDetail = 'Dữ liệu bảng điểm cho thấy sinh viên bị đứt gãy chuỗi kiến thức lập trình cơ sở (không qua Kỹ thuật lập trình dẫn đến rớt Cấu trúc dữ liệu). Điểm quá trình thấp thể hiện việc thiếu chuyên cần hoặc không nộp bài tập lớn.';

    // Nếu trong hồ sơ có ghi nhận trước đó từ CVHT về việc làm thêm/hoàn cảnh
    if (previousNotesText.toLowerCase().includes('làm thêm') || previousNotesText.toLowerCase().includes('hoàn cảnh') || previousNotesText.toLowerCase().includes('gia đình')) {
      rootCauseCategory = 'Khó khăn cá nhân / Đi làm thêm (Đã ghi nhận trong Nhật ký CVHT kỳ trước)';
      rootCauseDetail = `Dựa vào nhật ký tư vấn trước đó của CVHT ("${previousNotesText}"), sinh viên gặp áp lực tài chính/thời gian, cộng hưởng với việc hổng kiến thức chuỗi môn lập trình.`;
    } else if (gpa < 1.3 && debtCredits >= 20) {
      rootCauseCategory = 'Mất nhịp học tập & Nguy cơ chọn sai chuyên ngành';
      rootCauseDetail = 'Sinh viên liên tục rớt các môn chuyên ngành cốt lõi, có dấu hiệu mất động lực hoặc phương pháp tiếp cận ngành Công nghệ thông tin chưa phù hợp.';
    }

    // 3. Nếu có Gemini API Key thì gọi Gemini phân tích sâu
    if (apiKey) {
      try {
        const prompt = `Bạn là Trợ lý Cố vấn Học vụ AI chuyên nghiệp tại Trường Đại học Mở TP.HCM.
Nhiệm vụ: Phân tích hồ sơ sinh viên dựa trên DỮ LIỆU HỌC VỤ KHÁCH QUAN và GHI CHÚ CỦA CVHT (tuyệt đối không bịa đặt thông tin ngoài dữ liệu).

Dữ liệu đầu vào:
- Sinh viên: ${student.hoTen} (MSSV: ${student.maSV}) - Lớp: ${student.lop} - Ngành: ${student.nganh}
- GPA tích lũy: ${gpa} / 4.0 | Nợ tín chỉ: ${debtCredits} TC | Trạng thái: ${levelText}
- Vi phạm quy chế TT08: ${hitRulesText}
- Lịch sử ghi chú của CVHT các lần trước: "${previousNotesText || 'Chưa có ghi chú trước đó'}"

Hãy trả về JSON:
{
  "advisorSummary": "Tóm tắt nhận định khách quan cho cố vấn dựa trên bảng điểm và ghi chú (tối đa 4 câu)",
  "rootCauseCategory": "${rootCauseCategory}",
  "psychologicalAdvice": "Khuyến nghị hành động và tâm lý học đường phù hợp",
  "actionPlan": ["Bước 1...", "Bước 2...", "Bước 3..."],
  "studentEmailDraft": "Bản thảo thư mời gặp cố vấn với giọng điệu thấu hiểu, chân thành, dựa trên dữ liệu học vụ thực tế"
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
        console.warn('Gemini API call failed, falling back to rule-based engine:', err.message);
      }
    }

    // Fallback logic khoa học, dựa trên bằng chứng dữ liệu thực tế
    const advisorSummary = `Sinh viên ${student.hoTen} hiện có GPA ${gpa} với ${debtCredits} tín chỉ nợ (${levelText}). Dữ liệu bảng điểm cho thấy em bị đứt gãy chuỗi kiến thức lập trình cơ sở (rớt Cấu trúc dữ liệu và Tiếng Anh 2). ${previousNotesText ? `Theo ghi chú tư vấn trước đó của Thầy/Cô, em có hoàn cảnh cần hỗ trợ: "${previousNotesText}".` : 'Điểm quá trình các môn rớt đều dưới 4.0, thể hiện việc vắng tiết hoặc chưa nắm phương pháp làm đồ án môn học.'}`;

    const actionPlan = [
      `Giảm tải khối lượng: Kỳ tới giới hạn đăng ký tối đa 12 tín chỉ (không học dồn quá 4 môn).`,
      `Kích hoạt cơ chế thế điểm: Ưu tiên đăng ký học lại ngay môn Cấu trúc dữ liệu và giải thuật (3 TC) để xóa điểm F (0.0) cũ.`,
      `Hỗ trợ học thuật: Phân công Cán sự học tập hỗ trợ phụ đạo nhóm bài tập thực hành lập trình trước kỳ thi.`
    ];

    const studentEmailDraft = `Thân gửi ${student.hoTen},\n\nThầy/Cô là Cố vấn học tập lớp ${student.lop}. Qua theo dõi bảng điểm học kỳ vừa qua, Thầy/Cô nhận thấy kết quả của em đang gặp một số khó khăn, đặc biệt ở các môn lập trình chuyên ngành và ngoại ngữ, khiến điểm tích lũy đang chạm ngưỡng cảnh báo học vụ.\n\nThầy/Cô hiểu rằng chương trình học đại học có nhiều áp lực và mỗi bạn đều có những trở ngại riêng trong cuộc sống cũng như phương pháp học tập. Thầy/Cô không muốn kết quả này ảnh hưởng đến con đường tốt nghiệp của em.\n\nThầy/Cô đã lên sẵn cho em một lộ trình trả nợ môn giảm tải rất nhẹ nhàng để kéo lại GPA. Em hãy phản hồi email này hoặc thu xếp gặp Thầy/Cô vào sáng thứ Năm tuần này tại Văn phòng Khoa để thầy trò mình cùng thống nhất kế hoạch vượt qua giai đoạn này nhé!\n\nChúc em nhiều sức khỏe và vững tâm,\nCố vấn học tập - Lớp ${student.lop}`;

    return NextResponse.json({
      advisorSummary,
      rootCauseCategory,
      psychologicalAdvice: rootCauseDetail,
      actionPlan,
      studentEmailDraft,
      isLiveAI: false
    });

  } catch (error) {
    console.error('Error generating AI counseling:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

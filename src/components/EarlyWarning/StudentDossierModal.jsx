'use client';

import { useState } from 'react';
import { 
  X, 
  User, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Save, 
  MessageSquare, 
  Calendar, 
  Award,
  BookOpen,
  Sparkles,
  Mail,
  Copy,
  BrainCircuit,
  Compass,
  Check,
  Send
} from 'lucide-react';
import { OUGradeEngine } from '@/engine/OUGradeEngine';

export default function StudentDossierModal({ student, isOpen, onClose, onSaveCounselingNote }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'ai_assistant'
  const [counselingNote, setCounselingNote] = useState('');
  const [counselingStatus, setCounselingStatus] = useState('Đang hỗ trợ');
  
  // AI State
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiReport, setAiReport] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!isOpen || !student) return null;

  // Một nguồn duy nhất cho việc chấm Rule 1–4
  const { warningEval, level, levelText } = OUGradeEngine.classifyStudent(student);
  const levelBadgeClass = {
    DROP_OUT_RISK: 'badge-danger',
    WARNING: 'badge-warning',
    EARLY_SIGNAL: 'badge-warning',
    SAFE: 'badge-success'
  }[level] || '';

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!counselingNote.trim()) return;
    const today = new Date().toLocaleDateString('vi-VN');
    onSaveCounselingNote(student.maSV, {
      date: today,
      status: counselingStatus,
      note: counselingNote.trim()
    });
    setCounselingNote('');
    alert(`Đã lưu nhật ký tư vấn cho sinh viên ${student.hoTen} (${student.maSV})!`);
  };

  // Gọi API AI Cố vấn
  const handleGenerateAI = async () => {
    setIsGeneratingAI(true);
    try {
      const res = await fetch('/api/ai-counseling', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student,
          warningEval,
          levelText
        })
      });
      const data = await res.json();
      setAiReport(data);
    } catch (err) {
      console.error('AI Error:', err);
      alert('Không thể kết nối đến trợ lý AI, vui lòng thử lại.');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleCopyEmail = () => {
    if (!aiReport?.studentEmailDraft) return;
    navigator.clipboard.writeText(aiReport.studentEmailDraft);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-box modal-lg" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '880px', borderRadius: '12px' }}>
        {/* HEADER GỌN GÀNG */}
        <div className="modal-header" style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="w-10 h-10 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-sm">
              {student.hoTen.split(' ').pop().charAt(0)}
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                Hồ Sơ Học Vụ 360°: {student.hoTen}
              </h3>
              <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '2px' }}>
                MSSV: <strong>{student.maSV}</strong> · Lớp: <strong>{student.lop}</strong> · {student.nganh}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Nút Kích hoạt AI Cố vấn */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('ai_assistant');
                if (!aiReport) handleGenerateAI();
              }}
              className={`erp-btn ${activeTab === 'ai_assistant' ? 'erp-btn-primary' : 'erp-btn-outline'}`}
              style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>AI Cố Vấn &amp; Email</span>
            </button>

            <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Đóng">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SUBTABS CHUYỂN ĐỔI: TỔNG QUAN VS TRỢ LÝ AI */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', padding: '0 20px' }}>
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '10px 16px',
              fontSize: '12.5px',
              fontWeight: 600,
              border: 'none',
              background: 'transparent',
              color: activeTab === 'overview' ? '#064e3b' : '#64748b',
              borderBottom: activeTab === 'overview' ? '2px solid #064e3b' : '2px solid transparent',
              cursor: 'pointer'
            }}
          >
            Tổng Quan &amp; Quy Chế TT08
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('ai_assistant');
              if (!aiReport) handleGenerateAI();
            }}
            style={{
              padding: '10px 16px',
              fontSize: '12.5px',
              fontWeight: 600,
              border: 'none',
              background: 'transparent',
              color: activeTab === 'ai_assistant' ? '#064e3b' : '#64748b',
              borderBottom: activeTab === 'ai_assistant' ? '2px solid #064e3b' : '2px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <BrainCircuit className="w-4 h-4 text-emerald-700" />
            Trợ Lý AI Cá Nhân Hóa (Gemini LLM)
          </button>
        </div>

        {/* NỘI DUNG MODAL */}
        <div className="modal-body-content" style={{ maxHeight: '72vh', overflowY: 'auto', padding: '20px' }}>
          
          {/* TAB 1: TỔNG QUAN & QUY CHẾ */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* 4 Chỉ Số Nhanh */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>GPA TÍCH LŨY</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: student.gpaTL < 1.6 ? '#b91c1c' : '#047857', marginTop: '2px' }}>
                    {student.gpaTL.toFixed(2)}
                  </div>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>TÍN CHỈ ĐẠT</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
                    {student.tcTichLuy} TC
                  </div>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>NỢ TÍN CHỈ</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: student.tcNo > 10 ? '#b91c1c' : '#0f172a', marginTop: '2px' }}>
                    {student.tcNo} TC
                  </div>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>MỨC ĐỘ NGUY CƠ</div>
                  <div style={{ marginTop: '4px' }}>
                    <span className={`badge-pill ${student.gpaTL < 1.6 ? 'danger' : 'success'}`} style={{ fontSize: '11px' }}>
                      {levelText}
                    </span>
                  </div>
                </div>
              </div>

              {/* Đánh giá 4 Rules TT08 (Thu gọn) */}
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderBottom: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  KẾT QUẢ ĐỐI CHIẾU 4 QUY TẮC CẢNH BÁO HỌC VỤ (TT 08/2021)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', padding: '12px' }}>
                  {warningEval.checks.map((c) => (
                    <div
                      key={c.id}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: `1px solid ${c.hit ? '#fecaca' : '#bbf7d0'}`,
                        background: c.hit ? '#fffdfd' : '#f0fdf4',
                        fontSize: '12px'
                      }}
                    >
                      <div style={{ fontWeight: 700, color: c.hit ? '#b91c1c' : '#15803d', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {c.hit ? <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" /> : <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
                        <span>{c.hit ? 'Vi phạm: ' : 'Đạt: '} {c.name}</span>
                      </div>
                      <div style={{ color: '#64748b', fontSize: '11.5px', marginTop: '3px', paddingLeft: '22px' }}>
                        {c.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lịch sử học kỳ */}
              {student.historySemesters && student.historySemesters.length > 0 && (
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                  <div style={{ background: '#f8fafc', padding: '10px 14px', borderBottom: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
                    DIỄN BIẾN ĐIỂM SỐ QUA CÁC HỌC KỲ
                  </div>
                  <table className="erp-table">
                    <thead>
                      <tr>
                        <th>Học Kỳ</th>
                        <th style={{ textAlign: 'center' }}>TC Đăng Ký</th>
                        <th style={{ textAlign: 'center' }}>TC Rớt (F)</th>
                        <th style={{ textAlign: 'center' }}>GPA Học Kỳ</th>
                        <th style={{ textAlign: 'center' }}>GPA Tích Lũy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.historySemesters.map((h, i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 600 }}>{h.hk}</td>
                          <td style={{ textAlign: 'center' }}>{h.tcDK} TC</td>
                          <td style={{ textAlign: 'center', color: h.tcKD > 0 ? '#b91c1c' : '#10b981', fontWeight: 700 }}>
                            {h.tcKD} TC
                          </td>
                          <td style={{ textAlign: 'center', fontWeight: 600 }}>{h.gpaHK.toFixed(2)}</td>
                          <td style={{ textAlign: 'center', fontWeight: 800, color: '#064e3b' }}>{h.gpaTL.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Nhật ký tư vấn */}
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MessageSquare className="w-4 h-4 text-emerald-700" />
                  NHẬT KÝ TƯ VẤN CỦA CỐ VẤN HỌC TẬP
                </div>

                {student.counselingLog && student.counselingLog.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
                    {student.counselingLog.map((log, i) => (
                      <div key={i} style={{ background: '#ffffff', padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '11px', marginBottom: '2px' }}>
                          <span>{log.date}</span>
                          <span className="badge-pill warning" style={{ fontSize: '10.5px' }}>{log.status}</span>
                        </div>
                        <div style={{ color: '#0f172a' }}>{log.note}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px' }}>
                    Chưa có nhật ký nào được ghi lại.
                  </div>
                )}

                <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '8px' }}>
                  <select
                    value={counselingStatus}
                    onChange={(e) => setCounselingStatus(e.target.value)}
                    style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', fontWeight: 600 }}
                  >
                    <option value="Đang hỗ trợ">Đang hỗ trợ</option>
                    <option value="Đã cam kết">Đã cam kết</option>
                    <option value="Chuyển cố vấn">Chuyển cố vấn</option>
                    <option value="Hoàn thành">Hoàn thành</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Ghi nhanh nội dung trao đổi với sinh viên..."
                    value={counselingNote}
                    onChange={(e) => setCounselingNote(e.target.value)}
                    style={{ flex: 1, padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                    required
                  />
                  <button type="submit" className="btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                    <Save className="w-3.5 h-3.5" />
                    <span>Lưu</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 2: TRỢ LÝ CỐ VẤN AI (GEMINI LLM) */}
          {activeTab === 'ai_assistant' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {isGeneratingAI ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
                  <Sparkles className="w-8 h-8 text-amber-500 animate-spin mx-auto mb-3" />
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                    AI đang bóc tách hồ sơ &amp; tạo lộ trình cá nhân hóa...
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                    Đang nạp quy chế TT08, bảng điểm các kỳ và nhận diện nhóm tâm lý sinh viên
                  </div>
                </div>
              ) : aiReport ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Card 1: Nhận định cố vấn & Phân loại tâm lý */}
                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '13px', color: '#064e3b' }}>
                        <BrainCircuit className="w-4 h-4 text-emerald-700" />
                        BÁO CÁO CỐ VẤN TỪ TRỢ LÝ AI
                      </div>
                      <span className="badge-pill info" style={{ fontSize: '11px' }}>
                        {aiReport.isLiveAI ? 'Live Gemini AI' : 'Academic AI Engine'}
                      </span>
                    </div>

                    <p style={{ fontSize: '12.5px', lineHeight: 1.6, color: '#0f172a', margin: '0 0 10px 0' }}>
                      {aiReport.advisorSummary}
                    </p>

                    <div style={{ background: '#ffffff', borderRadius: '6px', padding: '10px 12px', border: '1px solid #dcfce7', fontSize: '12px' }}>
                      <span style={{ fontWeight: 700, color: '#047857' }}>Phân loại tình trạng học vụ: </span>
                      <strong style={{ color: '#b91c1c' }}>{aiReport.academicCategory || aiReport.rootCauseCategory}</strong>
                      <div style={{ color: '#64748b', marginTop: '3px', fontSize: '11.5px' }}>
                        {aiReport.academicDetail || aiReport.psychologicalAdvice}
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Kế hoạch hành động 3 bước */}
                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Compass className="w-4 h-4 text-emerald-700" />
                      LỘ TRÌNH CAN THIỆP ĐỀ XUẤT (3 BƯỚC)
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12.5px', color: '#334155', lineHeight: 1.7 }}>
                      {aiReport.actionPlan?.map((step, idx) => (
                        <li key={idx}><strong>Bước {idx + 1}:</strong> {step}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Card 3: Bản thảo Email gửi sinh viên */}
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Mail className="w-4 h-4 text-blue-600" />
                        BẢN THẢO THƯ ĐỘNG VIÊN &amp; NHẮC NHỞ HỌC VỤ
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="erp-btn erp-btn-outline"
                        style={{ padding: '4px 10px', fontSize: '11.5px', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedEmail ? 'Đã Sao Chép' : 'Sao Chép Thư'}</span>
                      </button>
                    </div>

                    <textarea
                      readOnly
                      rows={8}
                      value={aiReport.studentEmailDraft}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '12px',
                        lineHeight: 1.6,
                        color: '#0f172a',
                        background: '#ffffff',
                        fontFamily: 'inherit',
                        resize: 'none'
                      }}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderTop: '1px solid #e2e8f0', background: '#f8fafc' }}>
          <span style={{ fontSize: '11.5px', color: '#64748b' }}>
            Hệ thống Cố vấn Học vụ Thông minh EduAlert
          </span>
          <button type="button" className="btn-secondary" style={{ padding: '6px 14px', fontSize: '12px' }} onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

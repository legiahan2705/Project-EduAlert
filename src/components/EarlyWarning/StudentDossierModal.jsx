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
import { NOTE_STATUS_OPTIONS } from '@/lib/processStatus';

// Biểu đồ đường GPA qua các học kỳ, kèm đường ngưỡng an toàn của quy chế
function GpaTrendChart({ history, threshold }) {
  const W = 520, H = 170, padL = 40, padR = 40, padT = 14, padB = 28;
  const n = history.length;
  const x = (i) => (n === 1 ? (padL + W - padR) / 2 : padL + (i * (W - padL - padR)) / (n - 1));
  const y = (v) => padT + (1 - Math.min(4, Math.max(0, v)) / 4) * (H - padT - padB);
  const line = (key) => history.map((h, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(h[key])}`).join(' ');
  const series = [
    { key: 'gpaTL', color: '#047857', label: 'GPA tích lũy' },
    { key: 'gpaHK', color: '#2563eb', label: 'GPA học kỳ' },
  ];
  return (
    <div style={{ padding: '10px 14px 4px' }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '640px', height: 'auto', display: 'block', margin: '0 auto' }} role="img" aria-label="Biểu đồ GPA qua các học kỳ">
        {[0, 1, 2, 3, 4].map((g) => (
          <g key={g}>
            <line x1={padL} x2={W - padR} y1={y(g)} y2={y(g)} stroke="#e2e8f0" strokeWidth="1" />
            <text x={padL - 6} y={y(g) + 3} fontSize="10" fill="#94a3b8" textAnchor="end">{g}</text>
          </g>
        ))}
        {threshold != null && (
          <line x1={padL} x2={W - padR} y1={y(threshold)} y2={y(threshold)} stroke="#dc2626" strokeWidth="1.2" strokeDasharray="5 4" />
        )}
        {series.map((s) => (
          <g key={s.key}>
            {n > 1 && <path d={line(s.key)} fill="none" stroke={s.color} strokeWidth="2.2" />}
            {history.map((h, i) => (
              <g key={i}>
                <circle cx={x(i)} cy={y(h[s.key])} r="3.8" fill="#fff" stroke={s.color} strokeWidth="2" />
                <text x={x(i)} y={y(h[s.key]) + (s.key === 'gpaTL' ? -8 : 15)} fontSize="10.5" fontWeight="700" fill={s.color} textAnchor="middle">
                  {h[s.key].toFixed(2)}
                </text>
              </g>
            ))}
          </g>
        ))}
        {history.map((h, i) => (
          <text key={i} x={x(i)} y={H - 8} fontSize="10.5" fill="#64748b" textAnchor="middle">{String(h.hk).split(' ')[0]}</text>
        ))}
      </svg>
      <div style={{ display: 'flex', gap: '14px', fontSize: '11px', color: '#64748b', justifyContent: 'center', paddingBottom: '6px' }}>
        {series.map((s) => (
          <span key={s.key} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: 12, height: 3, background: s.color, display: 'inline-block', borderRadius: 2 }} /> {s.label}
          </span>
        ))}
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: 12, borderTop: '2px dashed #dc2626', display: 'inline-block' }} /> Ngưỡng quy chế ({threshold})
        </span>
      </div>
    </div>
  );
}

const aiRiskColor = (score = 0) =>
  score >= 85 ? '#dc2626' : score >= 60 ? '#ea580c' : score >= 30 ? '#d97706' : '#059669';

export default function StudentDossierModal({ student, isOpen, onClose, onSaveCounselingNote, mode = 'staff', inline = false }) {
  const isStudent = mode === 'student'; // sinh viên: chỉ xem hồ sơ của mình, không dùng AI cố vấn / ghi nhật ký
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'ai_assistant'
  const [counselingNote, setCounselingNote] = useState('');
  const [counselingStatus, setCounselingStatus] = useState('Đang hỗ trợ');
  
  // AI State
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiReport, setAiReport] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [emailEdit, setEmailEdit] = useState(null); // null = chưa chỉnh sửa, dùng bản AI

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
      setEmailEdit(null);
    } catch (err) {
      console.error('AI Error:', err);
      alert('Không thể kết nối đến trợ lý AI, vui lòng thử lại.');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleCopyEmail = () => {
    const text = emailEdit ?? aiReport?.studentEmailDraft;
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className={`modal-overlay active ${inline ? 'dossier-inline' : ''}`} onClick={inline ? undefined : onClose}>
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

          {!inline && (<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Đóng">
              <X className="w-4 h-4" />
            </button>
          </div>)}
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
              display: isStudent ? 'none' : 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <BrainCircuit className="w-4 h-4 text-emerald-700" />
            Trợ Lý AI Cố Vấn
            {aiReport && (
              <span style={{ fontSize: '10px', fontWeight: 700, padding: '1px 6px', borderRadius: '999px', background: aiReport.isLiveAI ? '#dcfce7' : '#e2e8f0', color: aiReport.isLiveAI ? '#047857' : '#475569' }}>
                {aiReport.isLiveAI ? 'Live' : 'Dự phòng'}
              </span>
            )}
          </button>
        </div>

        {/* NỘI DUNG MODAL */}
        <div className="modal-body-content" style={{ maxHeight: '72vh', overflowY: 'auto', padding: '20px' }}>
          
          {/* TAB 1: TỔNG QUAN & QUY CHẾ */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* 4 Chỉ Số Nhanh */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
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

              {/* Giải thích chỉ số rủi ro */}
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderBottom: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 700, color: '#0f172a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>CHỈ SỐ RỦI RO ĐƯỢC TÍNH NHƯ THẾ NÀO?</span>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: aiRiskColor(warningEval.riskScore) }}>
                    {warningEval.riskScore}/100
                  </span>
                </div>
                <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {warningEval.riskBreakdown.map((r, i) => (
                    <div key={i} style={{ fontSize: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
                        <span style={{ fontWeight: 600, color: '#0f172a' }}>{r.label}</span>
                        <span style={{ fontWeight: 800, fontFamily: 'monospace', color: '#334155' }}>+{r.points}</span>
                      </div>
                      <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden', margin: '4px 0 2px' }}>
                        <div style={{ width: `${Math.min(100, (r.points / 40) * 100)}%`, height: '100%', background: i === 0 ? '#94a3b8' : '#dc2626' }} />
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{r.note}</div>
                    </div>
                  ))}
                  <div style={{ borderTop: '1px dashed #cbd5e1', paddingTop: '6px', fontSize: '11px', color: '#64748b' }}>
                    Tổng cộng {warningEval.riskRaw}{warningEval.riskRaw > 100 ? ' (giới hạn tối đa 100)' : ''} điểm theo Rule Engine.
                    {!isStudent && typeof student.riskScore === 'number' && student.riskScore !== warningEval.riskScore && (
                      <> Dữ liệu sinh viên đang lưu sẵn giá trị {student.riskScore}% (hiển thị ở bảng danh sách).</>
                    )}
                  </div>
                </div>
              </div>

              {/* Đánh giá 4 Rules TT08 (Thu gọn) */}
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderBottom: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  KẾT QUẢ ĐỐI CHIẾU 4 QUY TẮC CẢNH BÁO HỌC VỤ (TT 08/2021)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '8px', padding: '12px' }}>
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
                  <GpaTrendChart history={student.historySemesters} threshold={warningEval.minGPA_TL} />
                  <div style={{ overflowX: 'auto' }}>
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

                {!isStudent && (<form onSubmit={handleAddNote} style={{ display: 'flex', gap: '8px' }}>
                  <select
                    value={counselingStatus}
                    onChange={(e) => setCounselingStatus(e.target.value)}
                    style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', fontWeight: 600 }}
                  >
                    {NOTE_STATUS_OPTIONS.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
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
                </form>)}
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
                  {/* 1. Chỉ số nền */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                    {[
                      { label: 'GPA tích lũy', value: Number(student.gpaTL ?? 0).toFixed(2), color: student.gpaTL < 1.4 ? '#dc2626' : student.gpaTL < 2.0 ? '#d97706' : '#047857' },
                      { label: 'Tín chỉ nợ', value: `${student.tcNo ?? 0} TC`, color: (student.tcNo ?? 0) > 10 ? '#dc2626' : '#334155' },
                      { label: 'Điểm rèn luyện', value: student.drl ?? '—', color: '#334155' },
                      { label: 'Chỉ số rủi ro', value: `${student.riskScore ?? 0}%`, color: aiRiskColor(student.riskScore) },
                    ].map((k) => (
                      <div key={k.label} style={{ border: '1px solid #e2e8f0', borderTop: `3px solid ${k.color}`, borderRadius: '8px', padding: '10px 12px', background: '#fff' }}>
                        <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '.03em' }}>{k.label}</div>
                        <div style={{ fontSize: '20px', fontWeight: 800, color: k.color, lineHeight: 1.2 }}>{k.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* 2. Kết luận phân loại (nổi bật) */}
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: '#fef2f2', border: '1px solid #fecaca', borderLeft: '4px solid #dc2626', borderRadius: '8px', padding: '12px 14px' }}>
                    <AlertTriangle className="w-5 h-5" style={{ color: '#dc2626', flexShrink: 0, marginTop: '1px' }} />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#991b1b' }}>
                        {levelText ? `${levelText}: ` : ''}{aiReport.academicCategory || aiReport.rootCauseCategory}
                      </div>
                      <div style={{ fontSize: '12px', color: '#7f1d1d', marginTop: '2px' }}>
                        {aiReport.academicDetail || aiReport.psychologicalAdvice}
                      </div>
                    </div>
                  </div>

                  {/* 3. Nhận định của AI */}
                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '12.5px', color: '#064e3b', marginBottom: '6px' }}>
                      <BrainCircuit className="w-4 h-4 text-emerald-700" />
                      NHẬN ĐỊNH CỦA TRỢ LÝ AI
                    </div>
                    <p style={{ fontSize: '12.5px', lineHeight: 1.6, color: '#0f172a', margin: 0 }}>
                      {aiReport.advisorSummary}
                    </p>
                  </div>

                  {/* 4. Lộ trình can thiệp dạng bước */}
                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px 16px' }}>
                    <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0f172a', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Compass className="w-4 h-4 text-emerald-700" />
                      LỘ TRÌNH CAN THIỆP ĐỀ XUẤT ({aiReport.actionPlan?.length || 0} BƯỚC)
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {aiReport.actionPlan?.map((step, idx) => {
                        const parts = String(step).split(/:\s(.+)/s);
                        const hasTitle = parts.length > 1 && parts[0].length <= 60;
                        return (
                          <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '10px 12px', background: '#f8fafc', borderRadius: '8px' }}>
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#064e3b', color: '#fff', fontSize: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              {idx + 1}
                            </div>
                            <div style={{ fontSize: '12.5px', lineHeight: 1.55, color: '#334155' }}>
                              {hasTitle ? (<><strong style={{ color: '#0f172a' }}>{parts[0]}:</strong> {parts[1]}</>) : step}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 5. Thư động viên (gập, chỉnh sửa được) */}
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => setEmailOpen((v) => !v)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '12.5px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        <Mail className="w-4 h-4 text-blue-600" />
                        THƯ ĐỘNG VIÊN &amp; NHẮC NHỞ HỌC VỤ
                        <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>{emailOpen ? '▾ Thu gọn' : '▸ Mở để xem và chỉnh sửa'}</span>
                      </button>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={handleGenerateAI}
                          className="erp-btn erp-btn-outline"
                          style={{ padding: '4px 10px', fontSize: '11.5px', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>Tạo lại</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleCopyEmail}
                          className="erp-btn erp-btn-outline"
                          style={{ padding: '4px 10px', fontSize: '11.5px', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedEmail ? 'Đã sao chép' : 'Sao chép thư'}</span>
                        </button>
                      </div>
                    </div>

                    {emailOpen && (
                      <div style={{ padding: '0 16px 14px' }}>
                        <textarea
                          rows={10}
                          value={emailEdit ?? aiReport.studentEmailDraft ?? ''}
                          onChange={(e) => setEmailEdit(e.target.value)}
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
                            resize: 'vertical'
                          }}
                        />
                        {emailEdit !== null && (
                          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                            Bạn đã chỉnh sửa nội dung thư.{' '}
                            <button type="button" onClick={() => setEmailEdit(null)} style={{ background: 'none', border: 'none', color: '#047857', fontWeight: 700, cursor: 'pointer', padding: 0 }}>
                              Khôi phục bản AI
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* FOOTER */}
        {!inline && (<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderTop: '1px solid #e2e8f0', background: '#f8fafc' }}>
          <span style={{ fontSize: '11.5px', color: '#64748b' }}>
            Hệ thống Cố vấn Học vụ Thông minh EduAlert
          </span>
          <button type="button" className="btn-secondary" style={{ padding: '6px 14px', fontSize: '12px' }} onClick={onClose}>
            Đóng
          </button>
        </div>)}
      </div>
    </div>
  );
}

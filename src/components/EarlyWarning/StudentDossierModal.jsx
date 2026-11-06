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
  BookOpen
} from 'lucide-react';
import { OUGradeEngine } from '@/engine/OUGradeEngine';

export default function StudentDossierModal({ student, isOpen, onClose, onSaveCounselingNote }) {
  const [counselingNote, setCounselingNote] = useState('');
  const [counselingStatus, setCounselingStatus] = useState('Đang hỗ trợ');

  if (!isOpen || !student) return null;

  // Một nguồn duy nhất cho việc chấm Rule 1–4 (Rule 1 & 3 theo học kỳ gần nhất trong lịch sử) và xếp nhóm
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

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-box modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="persona-avatar-box" style={{ width: '38px', height: '38px', borderRadius: '10px' }}>
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>
                Hồ Sơ Học Vụ Sinh Viên: {student.hoTen}
              </h3>
              <small style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                MSSV: <strong>{student.maSV}</strong> · Lớp: <strong>{student.lop}</strong> · Ngành: <strong>{student.nganh}</strong>
              </small>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Đóng">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="modal-body-content" style={{ maxHeight: '76vh', overflowY: 'auto' }}>
          {/* Key Metrics Banner */}
          <div 
            className="dossier-metrics-banner" 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: '12px', 
              padding: '16px', 
              background: '#f8fafc', 
              borderRadius: '10px', 
              border: '1px solid var(--border-color)', 
              marginBottom: '18px' 
            }}
          >
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', display: 'block', fontWeight: 700 }}>
                GPA TÍCH LŨY
              </span>
              <strong style={{ fontSize: '1.4rem', fontFamily: 'monospace', color: student.gpaTL < 2.0 ? 'var(--danger)' : 'var(--primary)' }}>
                {student.gpaTL.toFixed(2)}
              </strong>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', display: 'block', fontWeight: 700 }}>
                TÍN CHỈ ĐẠT
              </span>
              <strong style={{ fontSize: '1.4rem', fontFamily: 'monospace' }}>
                {student.tcTichLuy} TC
              </strong>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', display: 'block', fontWeight: 700 }}>
                TÍN CHỈ NỢ ĐỌNG
              </span>
              <strong style={{ fontSize: '1.4rem', fontFamily: 'monospace', color: student.tcNo > 10 ? 'var(--danger)' : 'var(--text-main)' }}>
                {student.tcNo} TC
              </strong>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', display: 'block', fontWeight: 700 }}>
                MỨC ĐỘ NGUY CƠ
              </span>
              <span className={`badge ${levelBadgeClass}`} style={{ marginTop: '4px', display: 'inline-block' }}>
                {levelText}
              </span>
              <span style={{ display: 'block', marginTop: '4px', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Rule Engine: {warningEval.levelText} ({warningEval.hitRules.length}/4 quy tắc vi phạm)
              </span>
            </div>
          </div>

          {/* 4 Regulatory Checks (TT 08/2021) */}
          <div style={{ marginBottom: '18px' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, marginBottom: '10px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              ĐÁNH GIÁ NGUY CƠ THEO QUY CHẾ ĐÀO TẠO (TT 08/2021/TT-BGDĐT)
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
              {warningEval.checks.map((c) => (
                <div
                  key={c.id}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: `1px solid ${c.hit ? 'var(--danger-border)' : 'var(--success-border)'}`,
                    background: c.hit ? 'var(--danger-soft)' : 'var(--success-soft)',
                    fontSize: '0.84rem'
                  }}
                >
                  <div style={{ fontWeight: 700, color: c.hit ? 'var(--danger-dark)' : 'var(--success-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {c.hit ? (
                      <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    )}
                    <span>{c.hit ? 'Vi phạm: ' : 'Đạt: '} {c.name}</span>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.76rem', marginTop: '4px', paddingLeft: '22px' }}>
                    {c.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Semester History */}
          {student.historySemesters && student.historySemesters.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 800, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar className="w-4 h-4 text-blue-600" />
                LỊCH SỬ HỌC TẬP THEO HỌC KỲ
              </h4>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Học Kỳ</th>
                    <th style={{ textAlign: 'center' }}>TC Đăng Ký</th>
                    <th style={{ textAlign: 'center' }}>TC Không Đạt</th>
                    <th style={{ textAlign: 'center' }}>GPA Học Kỳ</th>
                    <th style={{ textAlign: 'center' }}>GPA Tích Lũy</th>
                  </tr>
                </thead>
                <tbody>
                  {student.historySemesters.map((h, i) => (
                    <tr key={i}>
                      <td><strong>{h.hk}</strong></td>
                      <td style={{ textAlign: 'center', fontFamily: 'monospace' }}>{h.tcDK} TC</td>
                      <td style={{ textAlign: 'center', fontFamily: 'monospace' }}>
                        <span className={h.tcKD > 0 ? 'text-danger font-bold' : ''}>{h.tcKD} TC</span>
                      </td>
                      <td style={{ textAlign: 'center', fontFamily: 'monospace' }}>{h.gpaHK.toFixed(2)}</td>
                      <td style={{ textAlign: 'center', fontFamily: 'monospace' }}>
                        <strong>{h.gpaTL.toFixed(2)}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Counseling Log & Add Note Form */}
          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MessageSquare className="w-4 h-4 text-indigo-600" />
              NHẬT KÝ TƯ VẤN &amp; HỖ TRỢ HỌC VỤ
            </h4>

            {student.counselingLog && student.counselingLog.length > 0 ? (
              <div style={{ marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {student.counselingLog.map((log, i) => (
                  <div key={i} style={{ background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.84rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <strong style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        Ngày: {log.date}
                      </strong>
                      <span className="badge badge-warning">{log.status}</span>
                    </div>
                    <p style={{ margin: 0, color: 'var(--text-muted)' }}>{log.note}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginBottom: '14px' }}>
                Chưa có nhật ký tư vấn nào cho sinh viên này.
              </p>
            )}

            <form onSubmit={handleAddNote}>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <select
                  className="form-control form-control-sm"
                  style={{ width: '160px', fontWeight: 600 }}
                  value={counselingStatus}
                  onChange={(e) => setCounselingStatus(e.target.value)}
                >
                  <option value="Đang hỗ trợ">Đang hỗ trợ</option>
                  <option value="Đã cam kết">Đã cam kết</option>
                  <option value="Chuyển cố vấn">Chuyển cố vấn</option>
                  <option value="Hoàn thành">Hoàn thành</option>
                </select>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Ghi chú nội dung tư vấn, thỏa thuận lộ trình cải thiện điểm..."
                  value={counselingNote}
                  onChange={(e) => setCounselingNote(e.target.value)}
                  style={{ flex: 1, minWidth: '220px' }}
                  required
                />
                <button 
                  type="submit" 
                  className="btn btn-primary btn-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Lưu Ghi Chú</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '14px 20px', borderTop: '1px solid var(--border-color)' }}>
          <button type="button" className="btn btn-outline-navy btn-sm" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

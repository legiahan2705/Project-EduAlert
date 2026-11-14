'use client';

import { useState } from 'react';
import { 
  X, 
  Layers, 
  AlertCircle, 
  Building2, 
  GraduationCap, 
  BookOpen, 
  Globe, 
  Award, 
  CheckCircle2, 
  FileText, 
  Sparkles,
  Plus
} from 'lucide-react';

export default function AddMajorModal({ 
  isOpen, 
  onClose, 
  faculties = [], 
  majors = [],
  defaultFaculty, 
  onAddMajor 
}) {
  const initialFaculty = defaultFaculty && defaultFaculty !== 'ALL' 
    ? defaultFaculty 
    : (faculties[0]?.shortCode || 'FIT');

  const [selectedFacultyCode, setSelectedFacultyCode] = useState(initialFaculty);
  const [name, setName] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [creditsStandard, setCreditsStandard] = useState(141);
  const [degreeLevel, setDegreeLevel] = useState('Kỹ sư / Cử nhân Chính quy');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // Thuật toán tự sinh mã ngành: [Ký hiệu viết tắt khoa] + YYMM + XXX
  const generateMajorCode = (facCode) => {
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const prefix = `${facCode}${yy}${mm}`;

    const existingInMonth = majors.filter(m => {
      const code = m.code || m.id || m.maNganh;
      return code && code.startsWith(prefix);
    });

    const nextSeq = String(existingInMonth.length + 1).padStart(3, '0');
    return `${prefix}${nextSeq}`;
  };

  const currentFaculty = faculties.find(
    f => f.shortCode === selectedFacultyCode || f.id === selectedFacultyCode
  ) || faculties[0] || { shortCode: 'FIT', name: 'Khoa Công nghệ thông tin' };

  const previewCode = generateMajorCode(currentFaculty.shortCode || selectedFacultyCode);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Vui lòng nhập tên ngành đào tạo (Tiếng Việt).');
      return;
    }

    const fac = currentFaculty;
    const newCode = generateMajorCode(fac.shortCode);
    const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 19);

    const newMajor = {
      id: newCode,
      code: newCode,
      maNganh: newCode,
      name: name.trim(),
      tenNganh: name.trim(),
      nameEn: nameEn.trim(),
      facultyCode: fac.shortCode,
      maKhoa: fac.shortCode,
      facultyId: fac.id,
      facultyName: fac.name,
      creditsStandard: parseInt(creditsStandard, 10) || 141,
      tongTC: parseInt(creditsStandard, 10) || 141,
      degreeLevel,
      heDaoTao: degreeLevel,
      description: description.trim(),
      moTa: description.trim(),
      status: 'ACTIVE',
      trangThai: 'ACTIVE',
      createdBy: 'ThS. Lê Gia Hân',
      createdAt: nowStr,
      auditLogs: [
        {
          id: `LOG-M-${Date.now()}`,
          timestamp: nowStr,
          userId: 'ADMIN01',
          userName: 'ThS. Lê Gia Hân',
          action: 'CREATE',
          field: 'Toàn bộ',
          oldValue: '-',
          newValue: `Khởi tạo ngành: ${name.trim()} (${newCode}) thuộc ${fac.name}`
        }
      ]
    };

    onAddMajor(newMajor);
    onClose();
  };

  return (
    <div className="erp-modal-overlay" onClick={onClose}>
      <div 
        className="erp-modal-content max-w-2xl w-[95%] shadow-2xl rounded-xl border border-slate-200 overflow-hidden" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="erp-modal-header bg-gradient-to-r from-slate-50 via-white to-emerald-50/30 px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-900 text-white flex items-center justify-center shadow-sm">
              <Layers size={20} className="text-emerald-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                Tạo Ngành Đào Tạo Mới
                <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono">
                  Mã Tự Sinh
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Thiết lập thông tin ngành học & chuẩn tích lũy tín chỉ Trường ĐH Mở TP.HCM
              </p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* MODAL BODY */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="erp-modal-body p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            {error && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs flex items-center gap-2.5 animate-fadeIn">
                <AlertCircle size={16} className="text-red-600 shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* LIVE PREVIEW BADGE */}
            <div className="bg-gradient-to-r from-emerald-50/90 via-emerald-50/50 to-slate-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-800 text-emerald-200 flex items-center justify-center shadow-inner">
                  <Sparkles size={20} />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                    Mã Ngành Dự Kiến Sẽ Cấp Phát
                  </div>
                  <div className="flex items-center gap-2.5 mt-0.5">
                    <span className="font-mono text-lg font-black text-emerald-950 tracking-wide">
                      {previewCode}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                      Tự động tính toán
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right text-[11px] hidden sm:block border-l border-emerald-200/80 pl-4">
                <div className="text-slate-500 font-medium">Quy chuẩn sinh mã:</div>
                <div className="font-mono text-slate-800 font-bold mt-0.5">
                  [{currentFaculty.shortCode || selectedFacultyCode}] + YYMM + XXX
                </div>
              </div>
            </div>

            {/* FORM 2-COLUMN GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
              {/* Khoa Trực Thuộc */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Building2 size={13} className="text-emerald-700" />
                  Khoa Trực Thuộc <span className="text-red-500">*</span>
                </label>
                <select 
                  value={selectedFacultyCode}
                  onChange={(e) => setSelectedFacultyCode(e.target.value)}
                  className="erp-input w-full font-semibold text-slate-800 bg-white shadow-2xs"
                  required
                >
                  {faculties.map((f) => (
                    <option key={f.id || f.shortCode} value={f.shortCode}>
                      {f.shortCode} - {f.name}
                    </option>
                  ))}
                </select>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Tiền tố mã ngành sẽ lấy theo mã viết tắt của khoa
                </span>
              </div>

              {/* Hệ Đào Tạo */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <GraduationCap size={13} className="text-emerald-700" />
                  Bậc / Hệ Đào Tạo <span className="text-red-500">*</span>
                </label>
                <select 
                  value={degreeLevel}
                  onChange={(e) => setDegreeLevel(e.target.value)}
                  className="erp-input w-full font-medium text-slate-800 bg-white shadow-2xs"
                >
                  <option value="Kỹ sư / Cử nhân Chính quy">Kỹ sư / Cử nhân Chính quy</option>
                  <option value="Chương trình Chất lượng cao">Chương trình Chất lượng cao</option>
                  <option value="Liên thông Đại học Chính quy">Liên thông Đại học Chính quy</option>
                  <option value="Đào tạo Từ xa / Vừa làm vừa học">Đào tạo Từ xa / Vừa làm vừa học</option>
                </select>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Hệ chuẩn quy định định mức học phần và chuẩn đầu ra
                </span>
              </div>

              {/* Tên Ngành (Tiếng Việt) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <BookOpen size={13} className="text-emerald-700" />
                  Tên Ngành Đào Tạo (Tiếng Việt) <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text"
                  placeholder="VD: Khoa học dữ liệu và Trí tuệ nhân tạo"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError('');
                  }}
                  className="erp-input w-full font-medium text-slate-900 placeholder:text-slate-400 shadow-2xs"
                  required
                />
              </div>

              {/* Tên Ngành (Tiếng Anh) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Globe size={13} className="text-emerald-700" />
                  Tên Ngành Bằng Tiếng Anh
                </label>
                <input 
                  type="text"
                  placeholder="VD: Data Science and Artificial Intelligence"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  className="erp-input w-full font-medium text-slate-900 placeholder:text-slate-400 shadow-2xs italic"
                />
              </div>

              {/* Chuẩn Tín Chỉ */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Award size={13} className="text-emerald-700" />
                  Chuẩn Tín Chỉ Tốt Nghiệp <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input 
                    type="number"
                    min={100}
                    max={200}
                    value={creditsStandard}
                    onChange={(e) => setCreditsStandard(e.target.value)}
                    className="erp-input w-full font-bold text-emerald-900 pr-16 shadow-2xs"
                    required
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 pointer-events-none">
                    Tín chỉ
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Chuẩn đại học chính quy thông thường: 135 – 145 tín chỉ
                </span>
              </div>

              {/* Trạng Thái Hoạt Động */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-700" />
                  Trạng Thái Khởi Tạo
                </label>
                <div className="h-[37px] flex items-center px-3 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                  <span className="font-bold text-emerald-800">ACTIVE</span>
                  <span className="text-slate-300 mx-2">•</span>
                  <span className="text-slate-600 font-medium">Kích hoạt tuyển sinh ngay</span>
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Ngành mới sẽ sẵn sàng để mở lớp và gắn CTĐT
                </span>
              </div>
            </div>

            {/* Mô Tả Mục Tiêu (Full Width) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <FileText size={13} className="text-emerald-700" />
                Mô Tả Mục Tiêu Đào Tạo & Chuẩn Đầu Ra
              </label>
              <textarea 
                rows={3}
                placeholder="Mô tả tóm tắt mục tiêu đào tạo, định hướng chuyên sâu, vị trí việc làm sau khi tốt nghiệp và chuẩn năng lực của sinh viên..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="erp-input w-full text-slate-800 placeholder:text-slate-400 resize-none leading-relaxed shadow-2xs"
              />
            </div>
          </div>

          {/* MODAL FOOTER */}
          <div className="erp-modal-footer bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/70 rounded-lg transition-colors border border-slate-200"
            >
              Hủy Bỏ
            </button>
            <button 
              type="submit"
              className="btn-primary px-5 py-2 text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Plus size={15} />
              Tạo Ngành & Tự Sinh Mã
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

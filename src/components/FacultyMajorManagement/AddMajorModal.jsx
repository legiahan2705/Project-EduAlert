'use client';

import { useState } from 'react';
import { X, Layers, AlertCircle } from 'lucide-react';

export default function AddMajorModal({ 
  isOpen, 
  onClose, 
  faculties, 
  majors,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Vui lòng nhập tên ngành đào tạo.');
      return;
    }

    const fac = faculties.find(f => f.shortCode === selectedFacultyCode || f.id === selectedFacultyCode) || faculties[0];
    const newCode = generateMajorCode(fac.shortCode);
    const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 19);

    const newMajor = {
      id: newCode,
      code: newCode,
      maNganh: newCode, // Tương thích ngược
      name: name.trim(),
      tenNganh: name.trim(), // Tương thích ngược
      nameEn: nameEn.trim(),
      facultyCode: fac.shortCode,
      maKhoa: fac.shortCode, // Tương thích ngược
      facultyId: fac.id,
      facultyName: fac.name,
      creditsStandard: parseInt(creditsStandard, 10) || 141,
      tongTC: parseInt(creditsStandard, 10) || 141, // Tương thích ngược
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
    <div className="erp-modal-overlay">
      <div className="erp-modal-content">
        <div className="erp-modal-header">
          <h3 className="erp-modal-title flex items-center gap-2">
            <Layers size={18} className="text-emerald-700" />
            Tạo Ngành Đào Tạo Mới (Mã Tự Sinh [Ký hiệu]+YYMMXXX)
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="erp-modal-body space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded text-xs flex items-center gap-2">
                <AlertCircle size={15} />
                {error}
              </div>
            )}

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-900">
              Mã ngành sẽ tự sinh theo quy chuẩn: <strong>[{selectedFacultyCode}] + YYMM + XXX</strong> (Ví dụ: {selectedFacultyCode}2611001).
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Khoa Trực Thuộc <span className="text-red-500">*</span>
                </label>
                <select 
                  value={selectedFacultyCode}
                  onChange={(e) => setSelectedFacultyCode(e.target.value)}
                  className="erp-input font-medium"
                  required
                >
                  {faculties.map((f) => (
                    <option key={f.id || f.shortCode} value={f.shortCode}>
                      {f.shortCode} - {f.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Chuẩn Tín Chỉ Tốt Nghiệp <span className="text-red-500">*</span>
                </label>
                <input 
                  type="number"
                  min={100}
                  max={200}
                  value={creditsStandard}
                  onChange={(e) => setCreditsStandard(e.target.value)}
                  className="erp-input font-bold"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tên Ngành Đào Tạo (Tiếng Việt) <span className="text-red-500">*</span>
              </label>
              <input 
                type="text"
                placeholder="VD: Khoa học dữ liệu và Trí tuệ nhân tạo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="erp-input"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tên Ngành Theo Tiếng Anh
              </label>
              <input 
                type="text"
                placeholder="VD: Data Science and Artificial Intelligence"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                className="erp-input"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Hệ Đào Tạo
              </label>
              <select 
                value={degreeLevel}
                onChange={(e) => setDegreeLevel(e.target.value)}
                className="erp-input"
              >
                <option value="Kỹ sư / Cử nhân Chính quy">Kỹ sư / Cử nhân Chính quy</option>
                <option value="Chất lượng cao">Chất lượng cao</option>
                <option value="Liên thông đại học">Liên thông đại học</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mô Tả Mục Tiêu Đào Tạo
              </label>
              <textarea 
                rows={3}
                placeholder="Mô tả định hướng nghề nghiệp và chuẩn đầu ra..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="erp-input"
              />
            </div>
          </div>

          <div className="erp-modal-footer">
            <button 
              type="button" 
              onClick={onClose}
              className="btn-outline"
            >
              Hủy
            </button>
            <button 
              type="submit"
              className="btn-primary"
            >
              Tạo Ngành & Tự Sinh Mã
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

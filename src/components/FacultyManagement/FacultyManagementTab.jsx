'use client';

import { useState } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  History, 
  Pencil, 
  Trash2, 
  Power, 
  CheckCircle2, 
  XCircle,
  AlertCircle,
  X,
  School
} from 'lucide-react';

export default function FacultyManagementTab({
  faculties,
  setFaculties,
  majors
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'ACTIVE' | 'INACTIVE'

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const [currentFaculty, setCurrentFaculty] = useState(null);
  const [historyFaculty, setHistoryFaculty] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    shortCode: '',
    dean: '',
    office: '',
    phone: '',
    email: ''
  });
  const [formError, setFormError] = useState('');

  // 1. Helper tự sinh mã khoa: OU + YYMMDD + XXX
  const generateFacultyCode = () => {
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const datePrefix = `OU${yy}${mm}${dd}`;

    const todayFaculties = faculties.filter(f => f.code && f.code.startsWith(datePrefix));
    const nextSeq = String(todayFaculties.length + 1).padStart(3, '0');
    return `${datePrefix}${nextSeq}`;
  };

  // 2. Mở Modal Thêm Khoa
  const handleOpenAdd = () => {
    setFormData({
      name: '',
      nameEn: '',
      shortCode: '',
      dean: '',
      office: '',
      phone: '',
      email: ''
    });
    setFormError('');
    setIsAddModalOpen(true);
  };

  // 3. Xử lý Thêm Khoa Mới
  const handleSaveAdd = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.nameEn.trim() || !formData.shortCode.trim()) {
      setFormError('Vui lòng điền đầy đủ Tên khoa (VN, EN) và Ký hiệu viết tắt.');
      return;
    }

    const shortCodeClean = formData.shortCode.trim().toUpperCase();
    if (faculties.some(f => f.shortCode.toUpperCase() === shortCodeClean)) {
      setFormError(`Ký hiệu viết tắt "${shortCodeClean}" đã tồn tại! Vui lòng chọn ký hiệu khác.`);
      return;
    }

    const newCode = generateFacultyCode();
    const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 19);

    const newFaculty = {
      id: newCode,
      code: newCode,
      name: formData.name.trim(),
      nameEn: formData.nameEn.trim(),
      shortCode: shortCodeClean,
      dean: formData.dean.trim() || 'Chưa bổ nhiệm',
      office: formData.office.trim() || 'Văn phòng chính',
      phone: formData.phone.trim() || '-',
      email: formData.email.trim() || '-',
      status: 'ACTIVE',
      createdBy: 'ThS. Lê Gia Hân',
      createdAt: nowStr,
      auditLogs: [
        {
          id: `LOG-F-${Date.now()}`,
          timestamp: nowStr,
          userId: 'ADMIN01',
          userName: 'ThS. Lê Gia Hân',
          action: 'CREATE',
          field: 'Toàn bộ',
          oldValue: '-',
          newValue: `Khởi tạo khoa mới: ${formData.name.trim()} (${shortCodeClean})`
        }
      ]
    };

    setFaculties([newFaculty, ...faculties]);
    setIsAddModalOpen(false);
  };

  // 4. Mở Modal Chỉnh Sửa
  const handleOpenEdit = (faculty) => {
    setCurrentFaculty(faculty);
    setFormData({
      name: faculty.name,
      nameEn: faculty.nameEn || '',
      shortCode: faculty.shortCode,
      dean: faculty.dean || '',
      office: faculty.office || '',
      phone: faculty.phone || '',
      email: faculty.email || ''
    });
    setFormError('');
    setIsEditModalOpen(true);
  };

  // 5. Xử lý Lưu Chỉnh Sửa Khoa
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.nameEn.trim() || !formData.shortCode.trim()) {
      setFormError('Vui lòng điền đầy đủ Tên khoa (VN, EN) và Ký hiệu viết tắt.');
      return;
    }

    const shortCodeClean = formData.shortCode.trim().toUpperCase();
    if (faculties.some(f => f.id !== currentFaculty.id && f.shortCode.toUpperCase() === shortCodeClean)) {
      setFormError(`Ký hiệu viết tắt "${shortCodeClean}" đã được sử dụng bởi khoa khác.`);
      return;
    }

    const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 19);
    const changes = [];
    if (currentFaculty.name !== formData.name.trim()) {
      changes.push(`Tên VN: "${currentFaculty.name}" -> "${formData.name.trim()}"`);
    }
    if (currentFaculty.shortCode !== shortCodeClean) {
      changes.push(`Ký hiệu: "${currentFaculty.shortCode}" -> "${shortCodeClean}"`);
    }

    const newLog = {
      id: `LOG-F-${Date.now()}`,
      timestamp: nowStr,
      userId: 'ADMIN01',
      userName: 'ThS. Lê Gia Hân',
      action: 'UPDATE',
      field: 'Thông tin chung',
      oldValue: `${currentFaculty.name} (${currentFaculty.shortCode})`,
      newValue: changes.join('; ') || 'Cập nhật thông tin liên hệ'
    };

    setFaculties(faculties.map(f => {
      if (f.id === currentFaculty.id) {
        return {
          ...f,
          name: formData.name.trim(),
          nameEn: formData.nameEn.trim(),
          shortCode: shortCodeClean,
          dean: formData.dean.trim(),
          office: formData.office.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          auditLogs: [newLog, ...(f.auditLogs || [])]
        };
      }
      return f;
    }));

    setIsEditModalOpen(false);
  };

  // 6. Xử lý Đổi trạng thái Kích hoạt / Vô hiệu hóa
  const handleToggleStatus = (faculty) => {
    const newStatus = faculty.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 19);

    const log = {
      id: `LOG-F-${Date.now()}`,
      timestamp: nowStr,
      userId: 'ADMIN01',
      userName: 'ThS. Lê Gia Hân',
      action: 'STATUS_CHANGE',
      field: 'Trạng thái',
      oldValue: faculty.status,
      newValue: newStatus
    };

    setFaculties(faculties.map(f => {
      if (f.id === faculty.id) {
        return {
          ...f,
          status: newStatus,
          auditLogs: [log, ...(f.auditLogs || [])]
        };
      }
      return f;
    }));
  };

  // 7. Xử lý Xóa Khoa
  const handleDeleteFaculty = (faculty) => {
    const linkedMajors = majors.filter(m => (m.facultyCode || m.maKhoa) === faculty.shortCode || m.facultyId === faculty.id);
    if (linkedMajors.length > 0) {
      alert(`KHÔNG THỂ XÓA KHOA!\n\nKhoa "${faculty.name}" hiện đang có ${linkedMajors.length} ngành đào tạo liên kết (${linkedMajors.map(m => m.name || m.tenNganh).join(', ')}).\n\nTheo quy tắc toàn vẹn dữ liệu: Chỉ được phép xóa khi khoa mới tạo chưa có ngành nào. Nếu khoa không còn tuyển sinh, vui lòng chuyển sang "Vô hiệu hóa".`);
      return;
    }

    if (window.confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn Khoa "${faculty.name}" (${faculty.code})?\nThao tác này không thể phục hồi.`)) {
      setFaculties(faculties.filter(f => f.id !== faculty.id));
    }
  };

  const handleOpenHistory = (faculty) => {
    setHistoryFaculty(faculty);
    setIsHistoryModalOpen(true);
  };

  const filteredFaculties = faculties.filter(f => {
    const matchesSearch = 
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (f.nameEn && f.nameEn.toLowerCase().includes(searchTerm.toLowerCase())) ||
      f.shortCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (f.code && f.code.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = 
      statusFilter === 'ALL' ? true : f.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const activeFacCount = faculties.filter(f => f.status === 'ACTIVE').length;
  const inactiveFacCount = faculties.filter(f => f.status === 'INACTIVE').length;

  return (
    <div className="space-y-4">
      {/* =========================================================================
          META SUMMARY BANNER (CHUẨN ẢNH MẪU QUALITY MANAGEMENT)
          ========================================================================= */}
      <div className="summary-banner">
        <div className="grid grid-cols-4 gap-8">
          <div className="summary-meta-item">
            <span className="summary-meta-label">Tổng Số Khoa:</span>
            <span className="summary-meta-val text-emerald-900 font-bold text-base">
              {faculties.length} Khoa Trực Thuộc
            </span>
          </div>

          <div className="summary-meta-item">
            <span className="summary-meta-label">Trường Đào Tạo:</span>
            <span className="summary-meta-val text-slate-800">
              Trường Đại học Mở TP.HCM
            </span>
          </div>

          <div className="summary-meta-item">
            <span className="summary-meta-label">Quy Chế Áp Dụng:</span>
            <span className="summary-meta-val text-slate-800">
              Quy chế tín chỉ 2021 &amp; TT 08/2021
            </span>
          </div>

          <div className="summary-meta-item">
            <span className="summary-meta-label">Cơ Sở Hoạt Động:</span>
            <span className="summary-meta-val text-slate-800">
              97 Võ Văn Tần &amp; 371 Nguyễn Kiệm
            </span>
          </div>
        </div>

        {/* Cụm Action & Badges bên phải giống ảnh mẫu */}
        <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Trạng Thái Khoa:
            </span>
            <div className="flex items-center gap-1.5">
              <span className="badge-pill success text-xs">
                Hoạt động: <strong>{activeFacCount}</strong>
              </span>
              <span className="badge-pill neutral text-xs">
                Vô hiệu hóa: <strong>{inactiveFacCount}</strong>
              </span>
            </div>
          </div>

          <button 
            onClick={handleOpenAdd}
            className="btn-primary"
          >
            <Plus size={15} />
            + Thêm Khoa Mới
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="erp-card">
        {/* Card Filter Bar */}
        <div className="erp-card-header">
          <div className="flex items-center gap-3">
            <div className="relative w-80">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                placeholder="Tìm theo mã OU, tên khoa, ký hiệu (FIT...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="erp-input pl-8 py-1 text-xs w-full"
              />
            </div>

            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="erp-input w-44 py-1 text-xs font-medium"
            >
              <option value="ALL">-- Tất cả trạng thái --</option>
              <option value="ACTIVE">Đang hoạt động</option>
              <option value="INACTIVE">Vô hiệu hóa</option>
            </select>
          </div>

          <span className="text-xs text-slate-500">
            Hiển thị <strong>{filteredFaculties.length}</strong> / {faculties.length} khoa
          </span>
        </div>

        {/* Table Content */}
        <div className="erp-table-wrapper border-0 rounded-none">
          <table className="erp-table">
            <thead>
              <tr>
                <th style={{ width: '45px', textAlign: 'center' }}>STT</th>
                <th style={{ width: '130px' }}>MÃ KHOA</th>
                <th style={{ width: '90px' }}>KÝ HIỆU</th>
                <th>TÊN KHOA (TIẾNG VIỆT &amp; TIẾNG ANH)</th>
                <th>TRƯỞNG KHOA &amp; LIÊN HỆ</th>
                <th>NGƯỜI TẠO / NGÀY TẠO</th>
                <th style={{ width: '120px', textAlign: 'center' }}>NGÀNH LIÊN KẾT</th>
                <th style={{ width: '130px' }}>TRẠNG THÁI</th>
                <th style={{ width: '130px', textAlign: 'center' }}>THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {filteredFaculties.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-slate-400 text-xs">
                    Không tìm thấy khoa nào phù hợp với bộ lọc
                  </td>
                </tr>
              ) : (
                filteredFaculties.map((faculty, idx) => {
                  const linkedMajorsCount = majors.filter(
                    m => (m.facultyCode || m.maKhoa) === faculty.shortCode || m.facultyId === faculty.id
                  ).length;
                  const canDelete = linkedMajorsCount === 0;

                  return (
                    <tr key={faculty.id}>
                      <td className="text-slate-400 font-mono text-center text-xs">{idx + 1}</td>
                      <td>
                        <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                          {faculty.code || faculty.id}
                        </span>
                      </td>
                      <td>
                        <span className="font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-xs font-mono">
                          {faculty.shortCode}
                        </span>
                      </td>
                      <td>
                        <div>
                          <p className="font-bold text-slate-900 text-xs">{faculty.name}</p>
                          <p className="text-[11px] text-slate-400 italic">{faculty.nameEn || '—'}</p>
                        </div>
                      </td>
                      <td>
                        <div className="text-xs">
                          <p className="font-semibold text-slate-800">{faculty.dean || 'Chưa cập nhật'}</p>
                          <p className="text-[11px] text-slate-500">{faculty.phone} • {faculty.email}</p>
                        </div>
                      </td>
                      <td>
                        <div className="text-xs">
                          <p className="font-semibold text-slate-800">{faculty.createdBy || 'Hệ thống'}</p>
                          <p className="text-[11px] text-slate-400">{faculty.createdAt ? faculty.createdAt.slice(0, 10) : '2026-11-04'}</p>
                        </div>
                      </td>
                      <td className="text-center">
                        <span className={`badge-pill ${linkedMajorsCount > 0 ? 'info' : 'neutral'} text-xs font-bold`}>
                          {linkedMajorsCount} Ngành
                        </span>
                      </td>
                      <td>
                        {faculty.status === 'ACTIVE' ? (
                          <span className="badge-pill success">
                            <CheckCircle2 size={11} /> Đang hoạt động
                          </span>
                        ) : (
                          <span className="badge-pill neutral">
                            <XCircle size={11} /> Vô hiệu hóa
                          </span>
                        )}
                      </td>
                      <td>
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleToggleStatus(faculty)}
                            title={faculty.status === 'ACTIVE' ? 'Vô hiệu hóa khoa' : 'Kích hoạt khoa'}
                            className={`btn-icon ${faculty.status === 'ACTIVE' ? '' : 'text-emerald-700'}`}
                          >
                            <Power size={13} />
                          </button>

                          <button
                            onClick={() => handleOpenEdit(faculty)}
                            title="Chỉnh sửa khoa"
                            className="btn-icon"
                          >
                            <Pencil size={13} />
                          </button>

                          <button
                            onClick={() => handleOpenHistory(faculty)}
                            title="Xem lịch sử thao tác (Audit log)"
                            className="btn-icon"
                          >
                            <History size={13} />
                          </button>

                          <button
                            onClick={() => handleDeleteFaculty(faculty)}
                            disabled={!canDelete}
                            title={canDelete ? 'Xóa khoa chưa có ngành' : 'Không được xóa khoa đã có ngành liên kết'}
                            className={`btn-icon danger ${!canDelete ? 'opacity-30 cursor-not-allowed hover:bg-white hover:text-slate-400 hover:border-slate-200' : ''}`}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL THÊM KHOA */}
      {isAddModalOpen && (
        <div className="erp-modal-overlay">
          <div className="erp-modal-content">
            <div className="erp-modal-header">
              <h3 className="erp-modal-title flex items-center gap-2">
                <Building2 size={17} className="text-emerald-800" />
                Thêm Khoa Mới (Mã Tự Sinh OU+YYMMDD+XXX)
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={17} />
              </button>
            </div>

            <form onSubmit={handleSaveAdd}>
              <div className="erp-modal-body space-y-3.5">
                {formError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded text-xs flex items-center gap-2">
                    <AlertCircle size={15} />
                    {formError}
                  </div>
                )}

                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-900 font-medium">
                  Mã khoa sẽ được hệ thống tự động sinh theo công thức <strong>OU + YYMMDD + XXX</strong> khi lưu.
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Ký Hiệu Viết Tắt <span className="text-red-500">* (Duy nhất)</span>
                    </label>
                    <input 
                      type="text"
                      placeholder="VD: FIT, FECO, FAAF..."
                      value={formData.shortCode}
                      onChange={(e) => setFormData({ ...formData, shortCode: e.target.value.toUpperCase() })}
                      className="erp-input uppercase font-bold w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Trưởng Khoa Phụ Trách
                    </label>
                    <input 
                      type="text"
                      placeholder="VD: TS. Lê Xuân Vĩnh"
                      value={formData.dean}
                      onChange={(e) => setFormData({ ...formData, dean: e.target.value })}
                      className="erp-input w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tên Khoa (Tiếng Việt) <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text"
                    placeholder="VD: Khoa Công nghệ thông tin"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="erp-input w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tên Khoa Theo Tiếng Anh <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text"
                    placeholder="VD: Faculty of Information Technology"
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    className="erp-input w-full"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Văn Phòng Khoa</label>
                    <input 
                      type="text"
                      placeholder="Phòng A201..."
                      value={formData.office}
                      onChange={(e) => setFormData({ ...formData, office: e.target.value })}
                      className="erp-input w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Số Điện Thoại</label>
                    <input 
                      type="text"
                      placeholder="(028)..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="erp-input w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Liên Hệ</label>
                    <input 
                      type="email"
                      placeholder="khoa@ou.edu.vn"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="erp-input w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="erp-modal-footer">
                <button 
                  type="button" 
                  onClick={() => setIsAddModalOpen(false)}
                  className="btn-outline"
                >
                  Hủy Bỏ
                </button>
                <button 
                  type="submit"
                  className="btn-primary"
                >
                  Lưu &amp; Tự Sinh Mã Khoa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CHỈNH SỬA KHOA */}
      {isEditModalOpen && currentFaculty && (
        <div className="erp-modal-overlay">
          <div className="erp-modal-content">
            <div className="erp-modal-header">
              <h3 className="erp-modal-title flex items-center gap-2">
                <Pencil size={17} className="text-emerald-800" />
                Chỉnh Sửa Khoa [{currentFaculty.code || currentFaculty.id}]
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={17} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit}>
              <div className="erp-modal-body space-y-3.5">
                {formError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded text-xs flex items-center gap-2">
                    <AlertCircle size={15} />
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Ký Hiệu Viết Tắt <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text"
                      value={formData.shortCode}
                      onChange={(e) => setFormData({ ...formData, shortCode: e.target.value.toUpperCase() })}
                      className="erp-input uppercase font-bold w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Trưởng Khoa</label>
                    <input 
                      type="text"
                      value={formData.dean}
                      onChange={(e) => setFormData({ ...formData, dean: e.target.value })}
                      className="erp-input w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tên Khoa (Tiếng Việt) *</label>
                  <input 
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="erp-input w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tên Khoa Theo Tiếng Anh *</label>
                  <input 
                    type="text"
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    className="erp-input w-full"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Văn Phòng</label>
                    <input 
                      type="text"
                      value={formData.office}
                      onChange={(e) => setFormData({ ...formData, office: e.target.value })}
                      className="erp-input w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Điện Thoại</label>
                    <input 
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="erp-input w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                    <input 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="erp-input w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="erp-modal-footer">
                <button 
                  type="button" 
                  onClick={() => setIsEditModalOpen(false)}
                  className="btn-outline"
                >
                  Hủy Bỏ
                </button>
                <button 
                  type="submit"
                  className="btn-primary"
                >
                  Cập Nhật &amp; Ghi Vết Lịch Sử
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL XEM LỊCH SỬ THAO TÁC (AUDIT LOG) */}
      {isHistoryModalOpen && historyFaculty && (
        <div className="erp-modal-overlay">
          <div className="erp-modal-content max-w-2xl">
            <div className="erp-modal-header">
              <h3 className="erp-modal-title flex items-center gap-2">
                <History size={17} className="text-emerald-800" />
                Lịch Sử Thao Tác (Audit Log) - Khoa: {historyFaculty.name} ({historyFaculty.shortCode})
              </h3>
              <button onClick={() => setIsHistoryModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={17} />
              </button>
            </div>

            <div className="erp-modal-body p-0">
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>Thời Gian</th>
                    <th>Người Thực Hiện</th>
                    <th>Hành Động</th>
                    <th>Giá Trị Cũ</th>
                    <th>Giá Trị Mới</th>
                  </tr>
                </thead>
                <tbody>
                  {!historyFaculty.auditLogs || historyFaculty.auditLogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-6 text-slate-400 text-xs">
                        Chưa có lịch sử thay đổi nào được ghi nhận
                      </td>
                    </tr>
                  ) : (
                    historyFaculty.auditLogs.map((log) => (
                      <tr key={log.id}>
                        <td className="font-mono text-xs text-slate-500 whitespace-nowrap">
                          {log.timestamp}
                        </td>
                        <td>
                          <span className="font-semibold text-slate-800 text-xs">
                            {log.userName}
                          </span>
                        </td>
                        <td>
                          <span className={`badge-pill ${
                            log.action === 'CREATE' ? 'success' : 
                            log.action === 'STATUS_CHANGE' ? 'warning' : 'info'
                          }`}>
                            {log.action}
                          </span>
                        </td>
                        <td className="text-xs text-slate-500 font-mono">
                          {log.oldValue}
                        </td>
                        <td className="text-xs font-semibold text-slate-800">
                          {log.newValue}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="erp-modal-footer">
              <button 
                onClick={() => setIsHistoryModalOpen(false)}
                className="btn-outline"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

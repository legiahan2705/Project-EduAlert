'use client';

import { useState } from 'react';
import { 
  ArrowLeft, 
  Info, 
  BookOpen, 
  Users, 
  History, 
  Pencil, 
  Power, 
  CheckCircle2, 
  XCircle,
  Plus,
  Building2,
  Calendar,
  User,
  GraduationCap
} from 'lucide-react';
import CurriculumSubtab from './CurriculumSubtab';
import ClassesSubtab from './ClassesSubtab';

export default function MajorDetailWorkspace({
  major,
  faculties,
  curriculum,
  classes,
  students,
  selectedClassCode,
  onSelectClass,
  onOpenEditMajor,
  onToggleStatus,
  onOpenAddCourse,
  onOpenEditCourse,
  onDeleteCourse,
  onOpenCreateClass,
  onDeleteClass,
  onOpenAddStudent,
  onViewStudentDossier,
  onRemoveStudent,
  onBackToList
}) {
  // 4 Tab theo đúng yêu cầu: 'overview' | 'curriculum' | 'classes' | 'history'
  const [activeTab, setActiveTab] = useState('overview');

  if (!major) return null;

  const fac = faculties.find((f) => f.shortCode === major.facultyCode || f.id === major.facultyId);
  const facName = fac ? fac.name : (major.facultyName || major.facultyCode);
  const isInactive = major.status === 'INACTIVE';

  const courses = curriculum || [];
  const majorCode = major.code || major.id || major.maNganh;
  const majorClasses = classes.filter((c) => (c.maNganh || c.majorCode) === majorCode);
  const majorClassCodes = new Set(majorClasses.map((c) => c.maLop || c.id));
  const majorStudents = students.filter(
    (s) => (s.maNganh || s.majorCode) === majorCode || majorClassCodes.has(s.lop)
  );

  return (
    <div className="space-y-4">
      {/* Top Navigation & Back Button */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBackToList}
          className="btn-outline text-xs py-1.5 px-3 flex items-center gap-1.5 text-slate-700"
        >
          <ArrowLeft size={14} />
          ← Quay lại Danh sách Ngành
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenEditMajor(major)}
            className="btn-outline text-xs py-1.5"
          >
            <Pencil size={13} className="mr-1" />
            Chỉnh Sửa Ngành
          </button>

          <button
            onClick={() => onToggleStatus(major)}
            className={`btn-outline text-xs py-1.5 ${isInactive ? 'text-emerald-700 font-semibold' : 'text-slate-600'}`}
          >
            <Power size={13} className="mr-1" />
            {isInactive ? 'Kích Hoạt Lại' : 'Vô Hiệu Hóa'}
          </button>
        </div>
      </div>

      {/* Workspace Banner */}
      <div className="summary-banner">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-xs font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              {major.code || major.id}
            </span>
            <span className="badge-pill neutral text-xs">
              {facName}
            </span>
            {isInactive ? (
              <span className="badge-pill neutral">
                <XCircle size={12} /> Vô hiệu hóa
              </span>
            ) : (
              <span className="badge-pill success">
                <CheckCircle2 size={12} /> Đang hoạt động
              </span>
            )}
          </div>

          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            Ngành: {major.name}
            {major.nameEn && (
              <span className="text-sm font-normal text-slate-500 italic">
                ({major.nameEn})
              </span>
            )}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {major.degreeLevel || 'Kỹ sư / Cử nhân'} • Chuẩn đầu ra {major.creditsStandard || 141} tín chỉ tích lũy.
          </p>
        </div>

        {/* Mini KPI stats */}
        <div className="flex items-center gap-6 border-l border-slate-200 pl-6">
          <div className="summary-meta-item text-right">
            <span className="summary-meta-label">Chuẩn Tín Chỉ</span>
            <span className="summary-meta-val text-lg text-emerald-800">{major.creditsStandard || 141} TC</span>
          </div>
          <div className="summary-meta-item text-right">
            <span className="summary-meta-label">Môn Trong CTĐT</span>
            <span className="summary-meta-val text-lg text-slate-800">{courses.length} môn</span>
          </div>
          <div className="summary-meta-item text-right">
            <span className="summary-meta-label">Lớp Sinh Hoạt</span>
            <span className="summary-meta-val text-lg text-slate-800">{majorClasses.length} lớp</span>
          </div>
          <div className="summary-meta-item text-right">
            <span className="summary-meta-label">Tổng Sinh Viên</span>
            <span className="summary-meta-val text-lg text-slate-800">{majorStudents.length} SV</span>
          </div>
        </div>
      </div>

      {/* 4 Tabs Bar */}
      <div className="erp-tabs-bar">
        <button
          onClick={() => setActiveTab('overview')}
          className={`erp-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
        >
          <Info size={15} />
          1. Thông Tin Tổng Quan
        </button>

        <button
          onClick={() => setActiveTab('curriculum')}
          className={`erp-tab-btn ${activeTab === 'curriculum' ? 'active' : ''}`}
        >
          <BookOpen size={15} />
          2. Chương Trình Đào Tạo ({courses.length})
        </button>

        <button
          onClick={() => setActiveTab('classes')}
          className={`erp-tab-btn ${activeTab === 'classes' ? 'active' : ''}`}
        >
          <Users size={15} />
          3. Danh Sách Lớp ({majorClasses.length})
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`erp-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
        >
          <History size={15} />
          4. Lịch Sử Thao Tác (Audit Log)
        </button>
      </div>

      {/* TAB 1: THÔNG TIN TỔNG QUAN NGÀNH */}
      {activeTab === 'overview' && (
        <div className="erp-card p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600 border-b border-slate-100 pb-2">
                Thông Tin Cơ Bản
              </h3>
              
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block mb-0.5">Mã ngành tự sinh:</span>
                  <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">
                    {major.code || major.id}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Khoa trực thuộc:</span>
                  <span className="font-semibold text-emerald-800">
                    {facName} ({major.facultyCode})
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Tên tiếng Việt:</span>
                  <span className="font-semibold text-slate-900">{major.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Tên tiếng Anh:</span>
                  <span className="italic text-slate-600">{major.nameEn || '—'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Hệ đào tạo:</span>
                  <span className="font-medium text-slate-800">{major.degreeLevel || 'Chính quy'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Chuẩn tốt nghiệp:</span>
                  <span className="font-bold text-emerald-700">{major.creditsStandard || 141} Tín chỉ</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-slate-400 text-xs block mb-1">Mô tả đào tạo & Chuẩn đầu ra:</span>
                <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded border border-slate-100 leading-relaxed">
                  {major.description || 'Chương trình đào tạo tích lũy theo quy chế tín chỉ của Trường Đại học Mở TP.HCM.'}
                </p>
              </div>
            </div>

            <div className="space-y-4 border-l border-slate-100 pl-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600 border-b border-slate-100 pb-2">
                Thông Tin Quản Trị & Kiểm Toán
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3">
                  <User size={15} className="text-slate-400" />
                  <div>
                    <span className="text-slate-400 block">Người tạo ngành:</span>
                    <span className="font-semibold text-slate-800">{major.createdBy || 'ThS. Nguyễn Hoàng Nam'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar size={15} className="text-slate-400" />
                  <div>
                    <span className="text-slate-400 block">Ngày khởi tạo:</span>
                    <span className="font-semibold text-slate-800">{major.createdAt || '2026-11-04'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <GraduationCap size={15} className="text-slate-400" />
                  <div>
                    <span className="text-slate-400 block">Quy mô hiện tại:</span>
                    <span className="font-semibold text-slate-800">
                      {majorClasses.length} lớp học • {majorStudents.length} sinh viên theo học
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-900 text-xs">
                  <strong>Trạng thái: </strong>
                  {major.status === 'ACTIVE' ? (
                    <span className="text-emerald-700 font-semibold">Đang hoạt động & tuyển sinh</span>
                  ) : (
                    <span className="text-slate-500 font-semibold">Đã tạm dừng tuyển sinh</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CHƯƠNG TRÌNH ĐÀO TẠO (HỖ TRỢ CRUD MÔN & THÊM MÔN LIÊN NGÀNH) */}
      {activeTab === 'curriculum' && (
        <CurriculumSubtab
          major={major}
          curriculum={courses}
          onOpenAddCourse={onOpenAddCourse}
          onOpenEditCourse={onOpenEditCourse}
          onDeleteCourse={onDeleteCourse}
        />
      )}

      {/* TAB 3: DANH SÁCH LỚP HỌC & SINH VIÊN */}
      {activeTab === 'classes' && (
        <ClassesSubtab
          major={major}
          classes={majorClasses}
          students={students}
          selectedClassCode={selectedClassCode}
          onSelectClass={onSelectClass}
          onOpenCreateClass={onOpenCreateClass}
          onDeleteClass={onDeleteClass}
          onOpenAddStudent={onOpenAddStudent}
          onViewStudentDossier={onViewStudentDossier}
          onRemoveStudent={onRemoveStudent}
        />
      )}

      {/* TAB 4: LỊCH SỬ THAO TÁC (AUDIT LOG NGÀNH) */}
      {activeTab === 'history' && (
        <div className="erp-card">
          <div className="erp-card-header">
            <h3 className="erp-card-title text-sm">
              <History size={16} className="text-emerald-700" />
              Lịch Sử Thay Đổi & Kiểm Toán Ngành [{major.code || major.id}]
            </h3>
          </div>

          <div className="erp-table-wrapper border-0 rounded-none">
            <table className="erp-table">
              <thead>
                <tr>
                  <th style={{ width: '160px' }}>Thời Gian</th>
                  <th style={{ width: '180px' }}>Người Thực Hiện</th>
                  <th style={{ width: '120px' }}>Hành Động</th>
                  <th>Phạm Vi / Trường Thay Đổi</th>
                  <th>Giá Trị Cũ</th>
                  <th>Giá Trị Mới</th>
                </tr>
              </thead>
              <tbody>
                {!major.auditLogs || major.auditLogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-slate-400">
                      Chưa có lịch sử thay đổi nào được ghi nhận cho ngành này
                    </td>
                  </tr>
                ) : (
                  major.auditLogs.map((log, lIdx) => (
                    <tr key={log.id || log._id || `${log.timestamp || 'log'}-${lIdx}`}>
                      <td className="font-mono text-xs text-slate-500 whitespace-nowrap">
                        {log.timestamp}
                      </td>
                      <td className="font-medium text-slate-800 text-xs">
                        {log.userName}
                      </td>
                      <td>
                        <span className={`badge-pill ${
                          log.action === 'CREATE' ? 'success' : 
                          log.action === 'STATUS_CHANGE' ? 'warning' : 'info'
                        }`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="text-xs text-slate-700">
                        {log.field || 'Thông tin ngành'}
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
        </div>
      )}
    </div>
  );
}

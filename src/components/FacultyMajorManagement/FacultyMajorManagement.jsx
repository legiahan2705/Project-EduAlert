'use client';

import { useState } from 'react';
import { Plus, Search, Building2, Layers } from 'lucide-react';
import { eduAlertApi } from '@/services/api';
import MajorsTable from './MajorsTable';
import MajorDetailWorkspace from './MajorDetailWorkspace';
import AddMajorModal from './AddMajorModal';
import EditMajorModal from './EditMajorModal';
import CurriculumModal from './CurriculumModal';
import ClassModal from './ClassModal';
import StudentModal from './StudentModal';

export default function FacultyMajorManagement({
  faculties = [],
  majors = [],
  setMajors,
  curriculumByMajor = {},
  setCurriculumByMajor,
  classes = [],
  setClasses,
  students = [],
  setStudents,
  selectedMajorCode,
  setSelectedMajorCode,
  selectedClassCode,
  setSelectedClassCode,
  onViewStudentDossier
}) {
  const [selectedFaculty, setSelectedFaculty] = useState('ALL');
  const [majorSearch, setMajorSearch] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'detail'

  // Modals state
  const [isAddMajorOpen, setIsAddMajorOpen] = useState(false);
  const [isEditMajorOpen, setIsEditMajorOpen] = useState(false);
  const [majorToEdit, setMajorToEdit] = useState(null);

  const [isCurriculumModalOpen, setIsCurriculumModalOpen] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState(null);
  const [courseEditIndex, setCourseEditIndex] = useState(-1);

  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);

  // 1. Filter majors
  let filteredMajors = majors;
  if (selectedFaculty !== 'ALL') {
    filteredMajors = filteredMajors.filter(
      (m) => (m.facultyCode || m.maKhoa) === selectedFaculty
    );
  }
  if (majorSearch.trim()) {
    const q = majorSearch.toLowerCase().trim();
    filteredMajors = filteredMajors.filter((m) => {
      const name = m.name || m.tenNganh || '';
      const code = m.code || m.id || m.maNganh || '';
      return name.toLowerCase().includes(q) || code.toLowerCase().includes(q);
    });
  }

  const activeMajor = majors.find(
    (m) => (m.code || m.id || m.maNganh) === selectedMajorCode
  ) || majors[0];

  const activeCurriculum = activeMajor
    ? curriculumByMajor[activeMajor.code || activeMajor.id || activeMajor.maNganh] || []
    : [];

  // Handlers
  const handleSelectMajor = (code) => {
    setSelectedMajorCode(code);
    setViewMode('detail');
  };

  const handleToggleStatus = (code) => {
    setMajors((prev) =>
      prev.map((m) => {
        const mCode = m.code || m.id || m.maNganh;
        if (mCode === code) {
          const currentStatus = m.status || m.trangThai;
          const nextStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
          return {
            ...m,
            status: nextStatus,
            trangThai: nextStatus,
            auditLogs: [
              {
                id: `LOG-M-${Date.now()}`,
                timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
                userId: 'ADMIN01',
                userName: 'ThS. Lê Gia Hân',
                action: 'STATUS_CHANGE',
                field: 'Trạng thái',
                oldValue: currentStatus,
                newValue: nextStatus
              },
              ...(m.auditLogs || [])
            ]
          };
        }
        return m;
      })
    );
  };

  const handleDeleteMajor = (code) => {
    const target = majors.find((m) => (m.code || m.id || m.maNganh) === code);
    if (!target) return;

    // Kiểm tra lớp trực thuộc
    const linkedClasses = classes.filter((c) => (c.maNganh || c.majorCode) === code);
    if (linkedClasses.length > 0) {
      alert(`KHÔNG THỂ XÓA NGÀNH!\n\nNgành "${target.name || target.tenNganh}" đang có ${linkedClasses.length} lớp học trực thuộc. Vui lòng chuyển hoặc xóa lớp trước.`);
      return;
    }

    if (confirm(`Bạn có chắc chắn muốn xóa ngành "${target.name || target.tenNganh}" (${code}) khỏi hệ thống?`)) {
      setMajors((prev) => prev.filter((m) => (m.code || m.id || m.maNganh) !== code));
    }
  };

  const handleAddMajor = (newMajor) => {
    setMajors([newMajor, ...majors]);
    setCurriculumByMajor({
      ...curriculumByMajor,
      [newMajor.code]: []
    });
  };

  const handleSaveCourse = (courseObj, editIndex) => {
    if (!activeMajor) return;
    const majorCode = activeMajor.code || activeMajor.id || activeMajor.maNganh;
    const currentList = [...activeCurriculum];

    if (editIndex === -1) {
      currentList.push(courseObj);
    } else {
      currentList[editIndex] = courseObj;
    }

    setCurriculumByMajor({
      ...curriculumByMajor,
      [majorCode]: currentList
    });
  };

  const handleDeleteCourse = (courseIndex) => {
    if (!activeMajor) return;
    const majorCode = activeMajor.code || activeMajor.id || activeMajor.maNganh;
    const currentList = [...activeCurriculum];
    currentList.splice(courseIndex, 1);

    setCurriculumByMajor({
      ...curriculumByMajor,
      [majorCode]: currentList
    });
  };

  // 1. Thêm lớp học mới
  const handleAddClass = async (classData) => {
    try {
      const majorCode = activeMajor?.code || activeMajor?.id || activeMajor?.maNganh || '';
      const majorName = activeMajor?.name || activeMajor?.tenNganh || '';
      const payload = {
        ...classData,
        maNganh: majorCode,
        nganh: majorName
      };
      const created = await eduAlertApi.createClass(payload);
      setClasses((prev) => [created, ...prev]);
      setSelectedClassCode(created.maLop || created.id);
      setIsClassModalOpen(false);
      alert(`Đã thêm lớp học "${created.maLop}" thành công!`);
    } catch (err) {
      alert(err.message || 'Lỗi khi thêm lớp học');
    }
  };

  // 2. Xóa lớp học
  const handleDeleteClass = async (maLop) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa lớp học "${maLop}"?`)) return;
    try {
      await eduAlertApi.deleteClass(maLop);
      setClasses((prev) => prev.filter((c) => (c.maLop || c.id) !== maLop));
      if (selectedClassCode === maLop) {
        setSelectedClassCode('');
      }
      alert(`Đã xóa lớp "${maLop}" thành công!`);
    } catch (err) {
      alert(err.message || 'Lỗi khi xóa lớp');
    }
  };

  // 3. Thêm sinh viên mới vào lớp
  const handleAddStudent = async (studentData) => {
    try {
      const majorCode = activeMajor?.code || activeMajor?.id || activeMajor?.maNganh || '';
      const majorName = activeMajor?.name || activeMajor?.tenNganh || '';
      const payload = {
        ...studentData,
        maNganh: majorCode,
        nganh: majorName
      };
      const created = await eduAlertApi.createStudent(payload);
      setStudents((prev) => [created, ...prev]);
      // Cập nhật tăng sĩ số lớp
      setClasses((prev) =>
        prev.map((c) =>
          (c.maLop || c.id) === (created.lop || payload.lop)
            ? { ...c, siSo: (c.siSo || 0) + 1 }
            : c
        )
      );
      setIsStudentModalOpen(false);
      alert(`Đã thêm sinh viên "${created.hoTen}" (${created.maSV}) vào lớp ${created.lop} thành công!\n\nTài khoản sinh viên đã được khởi tạo tự động (Mật khẩu mặc định: Sinhvien@123).`);
    } catch (err) {
      alert(err.message || 'Lỗi khi thêm sinh viên');
    }
  };

  // 4. Xóa sinh viên khỏi lớp
  const handleRemoveStudent = async (maSV) => {
    if (!confirm(`Bạn có chắc muốn xóa sinh viên "${maSV}" khỏi hệ thống?`)) return;
    try {
      const targetStudent = students.find((s) => s.maSV === maSV);
      const studentLop = targetStudent?.lop;

      await eduAlertApi.deleteStudent(maSV);
      setStudents((prev) => prev.filter((s) => s.maSV !== maSV));
      // Cập nhật giảm sĩ số lớp
      if (studentLop) {
        setClasses((prev) =>
          prev.map((c) =>
            (c.maLop || c.id) === studentLop
              ? { ...c, siSo: Math.max(0, (c.siSo || 1) - 1) }
              : c
          )
        );
      }
      alert(`Đã xóa sinh viên "${maSV}" thành công!`);
    } catch (err) {
      alert(err.message || 'Lỗi khi xóa sinh viên');
    }
  };

  return (
    <div className="space-y-4">
      {viewMode === 'list' ? (
        <>
          {/* SUMMARY BANNER */}
          <div className="summary-banner">
            <div className="flex items-center gap-8">
              <div className="summary-meta-item">
                <span className="summary-meta-label">Tổng Số Ngành</span>
                <span className="summary-meta-val text-emerald-900 text-lg">
                  {majors.length} Ngành Đào Tạo
                </span>
              </div>
              <div className="summary-meta-item border-l border-slate-200 pl-8">
                <span className="summary-meta-label">Trường Đào Tạo</span>
                <span className="summary-meta-val text-slate-800">
                  Trường Đại học Mở TP.HCM (OU)
                </span>
              </div>
              <div className="summary-meta-item border-l border-slate-200 pl-8">
                <span className="summary-meta-label">Chuẩn Đào Tạo</span>
                <span className="summary-meta-val text-slate-800">
                  Chính quy 141 Tín chỉ • Đa ngành
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsAddMajorOpen(true)}
              className="btn-primary"
            >
              <Plus size={15} />
              + Thêm Ngành Mới
            </button>
          </div>

          {/* MAIN CARD */}
          <div className="erp-card">
            {/* Header Filters */}
            <div className="erp-card-header flex-wrap gap-3">
              {/* Pills Filter Khoa */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-semibold text-slate-600 mr-1">Khoa:</span>
                <button
                  type="button"
                  onClick={() => setSelectedFaculty('ALL')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                    selectedFaculty === 'ALL'
                      ? 'bg-emerald-900 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Tất cả ({majors.length})
                </button>
                {faculties.map((f, idx) => {
                  const fCode = f.shortCode || f.code || f.maKhoa || f.id;
                  const count = majors.filter((m) => (m.facultyCode || m.maKhoa) === fCode).length;
                  const isActive = selectedFaculty === fCode;
                  return (
                    <button
                      key={fCode || `fac-btn-${idx}`}
                      type="button"
                      onClick={() => setSelectedFaculty(fCode)}
                      className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-emerald-900 text-white shadow-sm'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {fCode} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Ô Search */}
              <div className="relative w-64">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm theo tên hoặc mã ngành..."
                  value={majorSearch}
                  onChange={(e) => setMajorSearch(e.target.value)}
                  className="erp-input pl-8 py-1 text-xs w-full"
                />
              </div>
            </div>

            {/* Bảng danh sách ngành */}
            <MajorsTable
              majors={filteredMajors}
              faculties={faculties}
              curriculumByMajor={curriculumByMajor}
              classes={classes}
              students={students}
              selectedMajorCode={selectedMajorCode}
              onSelectMajor={handleSelectMajor}
              onOpenEditMajor={(m) => {
                setMajorToEdit(m);
                setIsEditMajorOpen(true);
              }}
              onToggleStatus={handleToggleStatus}
              onDeleteMajor={handleDeleteMajor}
              onOpenCreateMajor={() => setIsAddMajorOpen(true)}
            />
          </div>
        </>
      ) : (
        /* WORKSPACE CHI TIẾT 4 TAB */
        <MajorDetailWorkspace
          major={activeMajor}
          faculties={faculties}
          curriculum={activeCurriculum}
          classes={classes}
          students={students}
          selectedClassCode={selectedClassCode}
          onSelectClass={setSelectedClassCode}
          onOpenEditMajor={(m) => {
            setMajorToEdit(m);
            setIsEditMajorOpen(true);
          }}
          onToggleStatus={() => handleToggleStatus(activeMajor.code || activeMajor.id || activeMajor.maNganh)}
          onOpenAddCourse={() => {
            setCourseToEdit(null);
            setCourseEditIndex(-1);
            setIsCurriculumModalOpen(true);
          }}
          onOpenEditCourse={(c, idx) => {
            setCourseToEdit(c);
            setCourseEditIndex(idx);
            setIsCurriculumModalOpen(true);
          }}
          onDeleteCourse={handleDeleteCourse}
          onOpenCreateClass={() => setIsClassModalOpen(true)}
          onDeleteClass={handleDeleteClass}
          onOpenAddStudent={() => setIsStudentModalOpen(true)}
          onViewStudentDossier={onViewStudentDossier}
          onRemoveStudent={handleRemoveStudent}
          onBackToList={() => setViewMode('list')}
        />
      )}

      {/* MODALS */}
      <AddMajorModal
        isOpen={isAddMajorOpen}
        onClose={() => setIsAddMajorOpen(false)}
        faculties={faculties}
        majors={majors}
        defaultFaculty={selectedFaculty}
        onAddMajor={handleAddMajor}
      />

      <EditMajorModal
        isOpen={isEditMajorOpen}
        onClose={() => setIsEditMajorOpen(false)}
        major={majorToEdit}
        faculties={faculties}
        onUpdateMajor={(updated) => {
          setMajors((prev) =>
            prev.map((m) =>
              (m.code || m.id || m.maNganh) === (updated.code || updated.id || updated.maNganh)
                ? updated
                : m
            )
          );
          setIsEditMajorOpen(false);
        }}
      />

      <CurriculumModal
        isOpen={isCurriculumModalOpen}
        onClose={() => setIsCurriculumModalOpen(false)}
        majorName={activeMajor?.name || activeMajor?.tenNganh || ''}
        courseToEdit={courseToEdit}
        editIndex={courseEditIndex}
        onSaveCourse={handleSaveCourse}
      />

      {/* MODAL THÊM LỚP HỌC MỚI */}
      <ClassModal
        isOpen={isClassModalOpen}
        onClose={() => setIsClassModalOpen(false)}
        majorName={activeMajor?.name || activeMajor?.tenNganh || ''}
        onAddClass={handleAddClass}
      />

      {/* MODAL THÊM SINH VIÊN MỚI */}
      <StudentModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        selectedClassCode={
          selectedClassCode ||
          (classes.find((c) => (c.maNganh || c.majorCode) === (activeMajor?.code || activeMajor?.id))?.maLop) ||
          ''
        }
        onAddStudent={handleAddStudent}
      />
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import QuickGuideModal from '@/components/QuickGuideModal';

import EarlyWarningTab from '@/components/EarlyWarning/EarlyWarningTab';
import StudentDossierModal from '@/components/EarlyWarning/StudentDossierModal';
import SmartPlannerTab from '@/components/SmartPlanner/SmartPlannerTab';
import FacultyManagementTab from '@/components/FacultyManagement/FacultyManagementTab';
import FacultyMajorManagement from '@/components/FacultyMajorManagement/FacultyMajorManagement';
import CourseGradesTab from '@/components/CourseGrades/CourseGradesTab';

import { eduAlertApi } from '@/services/api';
import { TABS_BY_ROLE, DEFAULT_TAB } from '@/lib/roles';

import {
  MOCK_FACULTIES,
  MOCK_MAJORS,
  MOCK_MAJOR_CURRICULUM,
  MOCK_CLASSES,
  MOCK_STUDENTS,
  MOCK_COURSE_GRADES
} from '@/engine/mockData';

export default function EduAlertApp() {
  const router = useRouter();

  // Phiên đăng nhập: null = chưa kiểm tra xong
  const [user, setUser] = useState(null);

  // Navigation State
  const [currentTab, setCurrentTab] = useState('tab-warning');
  const [currentStudentId, setCurrentStudentId] = useState(null);

  // Core Data State: bắt đầu rỗng, nạp sau khi biết người dùng là ai (để không lộ dữ liệu ngoài phạm vi)
  const [faculties, setFaculties] = useState([]);
  const [majors, setMajors] = useState([]);
  const [selectedMajorCode, setSelectedMajorCode] = useState('FIT2200001'); // Khoa học máy tính
  const [selectedClassCode, setSelectedClassCode] = useState('DH22CS01C'); // Lớp 45 SV

  const [curriculumByMajor, setCurriculumByMajor] = useState(MOCK_MAJOR_CURRICULUM);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [courseGrades, setCourseGrades] = useState([]);

  // Giới hạn dữ liệu theo vai trò: sinh viên chỉ thấy mình, giảng viên chỉ thấy lớp phụ trách
  const inScope = (u, stu) =>
    u.role === 'admin' ||
    (u.role === 'lecturer' && (u.classes || []).includes(stu.lop)) ||
    (u.role === 'student' && u.maSV === stu.maSV);

  // 1. Kiểm tra đăng nhập; chưa đăng nhập thì chuyển sang /login
  useEffect(() => {
    let cancelled = false;
    fetch('/api/auth/me')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled) return;
        if (!data?.user) {
          router.replace('/login');
          return;
        }
        const u = data.user;
        setCurrentTab(DEFAULT_TAB[u.role] || 'tab-warning');
        if (u.role === 'student') setCurrentStudentId(u.maSV);
        setUser(u);
      })
      .catch(() => {
        if (!cancelled) router.replace('/login');
      });
    return () => {
      cancelled = true;
    };
  }, [router]);

  // 2. Tải dữ liệu sau khi đã đăng nhập
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    async function loadBackendData() {
      const canSeeGrades = user.role !== 'student';
      const [facList, majList, stuList, clsList, grdList] = await Promise.all([
        eduAlertApi.getFaculties(MOCK_FACULTIES),
        eduAlertApi.getMajors(MOCK_MAJORS),
        eduAlertApi.getStudents(MOCK_STUDENTS),
        eduAlertApi.getClasses(MOCK_CLASSES),
        canSeeGrades ? eduAlertApi.getCourseGrades(MOCK_COURSE_GRADES) : Promise.resolve([])
      ]);
      if (cancelled) return;

      const myStudents = (stuList || []).filter((s) => inScope(user, s));
      const myClassCodes = new Set(myStudents.map((s) => s.lop));
      const myClasses = (clsList || []).filter(
        (c) => user.role === 'admin' || myClassCodes.has(c.maLop) || (user.classes || []).includes(c.maLop)
      );

      if (facList) setFaculties(facList);
      if (majList) setMajors(majList);
      setStudents(myStudents);
      setClasses(myClasses);
      setCourseGrades(grdList || []);
    }

    loadBackendData();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      router.replace('/login');
    }
  };

  // Modals
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // ngăn kéo menu trên điện thoại
  const [dossierStudent, setDossierStudent] = useState(null);
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  const handleOpenDossier = (student) => {
    setDossierStudent(student);
    setIsDossierOpen(true);
  };

  const handleSaveCounselingNote = async (maSV, noteObj) => {
    // 1. Cập nhật state nội bộ
    setStudents((prev) =>
      prev.map((s) => {
        if (s.maSV === maSV) {
          const log = s.counselingLog ? [noteObj, ...s.counselingLog] : [noteObj];
          return { ...s, counselingLog: log };
        }
        return s;
      })
    );
    if (dossierStudent && dossierStudent.maSV === maSV) {
      setDossierStudent((prev) => ({
        ...prev,
        counselingLog: prev.counselingLog ? [noteObj, ...prev.counselingLog] : [noteObj]
      }));
    }

    // 2. Lưu trực tiếp về NestJS Backend JSON DB
    await eduAlertApi.addCounselingNote(maSV, noteObj);
  };

  const currentStudent = students.find((s) => s.maSV === currentStudentId) || students[0];

  // Đang kiểm tra đăng nhập
  if (!user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', color: '#064e3b', fontWeight: 600 }}>
        Đang kiểm tra phiên đăng nhập...
      </div>
    );
  }

  const allowedTabs = TABS_BY_ROLE[user.role] || [];
  const canUse = (tab) => allowedTabs.includes(tab) && currentTab === tab;
  const dropOutCount = students.filter((s) => s.level === 'DROP_OUT_RISK' || s.level === 'HIGH_RISK').length;

  // Thông báo: sinh viên đang bị cảnh báo (không tính nhóm an toàn / tín hiệu sớm), rủi ro cao xếp trước
  const WARNING_LEVELS = ['DROP_OUT_RISK', 'HIGH_RISK', 'WARNING', 'EARLY_WARNING'];
  const notifications = (user.role === 'student' ? [] : students)
    .filter((s) => WARNING_LEVELS.includes(s.level))
    .sort((a, b) => (b.riskScore || 0) - (a.riskScore || 0));

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
        allowedTabs={allowedTabs}
        warningCount={user.role === 'student' ? 0 : dropOutCount}
      />
      <div
        className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <main className="app-main-wrapper">
        <Header
          currentTab={currentTab}
          onOpenGuide={() => setIsGuideOpen(true)}
          onToggleSidebar={() => setIsSidebarOpen((v) => !v)}
          user={user}
          onLogout={handleLogout}
          notifications={notifications}
          onSelectNotification={handleOpenDossier}
          onViewAllNotifications={() => setCurrentTab('tab-warning')}
        />

        <div className="app-content-body">
          {/* TAB 1: GIÁM SÁT & CẢNH BÁO SỚM HỌC VỤ (LỚP DH22CS01C) */}
          {canUse('tab-warning') && (
            <EarlyWarningTab
              students={students}
              majors={majors}
              classes={classes}
              onViewStudentDossier={handleOpenDossier}
              onOpenSimulation={(s) => {
                setCurrentStudentId(s.maSV);
                setCurrentTab('tab-planner');
              }}
            />
          )}

          {/* SINH VIÊN: HỒ SƠ CỦA TÔI (chỉ xem) */}
          {canUse('tab-me') && currentStudent && (
            <StudentDossierModal
              student={currentStudent}
              isOpen
              inline
              mode="student"
              onClose={() => {}}
              onSaveCounselingNote={() => {}}
            />
          )}

          {/* TAB 2: SMART ACADEMIC PLANNER */}
          {canUse('tab-planner') && (
            <SmartPlannerTab
              student={currentStudent}
              students={students}
              majors={majors}
              classes={classes}
              curriculumByMajor={curriculumByMajor}
              onSelectStudent={(s) => setCurrentStudentId(s.maSV)}
            />
          )}

          {/* TAB 3: QUẢN LÝ KHOA (MÃ TỰ SINH OU+YYMMDD+XXX, AUDIT LOG, CHẶN XÓA) */}
          {canUse('tab-faculties') && (
            <FacultyManagementTab
              faculties={faculties}
              setFaculties={setFaculties}
              majors={majors}
            />
          )}

          {/* TAB 4: QUẢN LÝ NGÀNH & CTĐT (VIEW 4 TAB, THÊM MÔN LIÊN NGÀNH) */}
          {canUse('tab-majors') && (
            <FacultyMajorManagement
              faculties={faculties}
              majors={majors}
              setMajors={setMajors}
              curriculumByMajor={curriculumByMajor}
              setCurriculumByMajor={setCurriculumByMajor}
              classes={classes}
              setClasses={setClasses}
              students={students}
              setStudents={setStudents}
              selectedMajorCode={selectedMajorCode}
              setSelectedMajorCode={setSelectedMajorCode}
              selectedClassCode={selectedClassCode}
              setSelectedClassCode={setSelectedClassCode}
              onViewStudentDossier={handleOpenDossier}
            />
          )}

          {/* TAB 5: QUẢN LÝ BẢNG ĐIỂM (GROUP BY MÔN -> EXPAND LỚP) */}
          {canUse('tab-course-grades') && (
            <CourseGradesTab
              majors={majors}
              curriculumByMajor={curriculumByMajor}
              courseGrades={courseGrades}
              setCourseGrades={setCourseGrades}
              faculties={faculties}
              classes={classes}
              students={students}
            />
          )}
        </div>
      </main>

      {/* Quick Guide Modal */}
      <QuickGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Student Dossier Modal */}
      <StudentDossierModal
        student={dossierStudent}
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        onSaveCounselingNote={handleSaveCounselingNote}
      />
    </div>
  );
}

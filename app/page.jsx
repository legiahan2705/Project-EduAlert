'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import QuickGuideModal from '@/components/QuickGuideModal';

import EarlyWarningTab from '@/components/EarlyWarning/EarlyWarningTab';
import StudentDossierModal from '@/components/EarlyWarning/StudentDossierModal';
import SmartPlannerTab from '@/components/SmartPlanner/SmartPlannerTab';
import FacultyManagementTab from '@/components/FacultyManagement/FacultyManagementTab';
import FacultyMajorManagement from '@/components/FacultyMajorManagement/FacultyMajorManagement';
import CourseGradesTab from '@/components/CourseGrades/CourseGradesTab';

import {
  MOCK_FACULTIES,
  MOCK_MAJORS,
  MOCK_MAJOR_CURRICULUM,
  MOCK_CLASSES,
  MOCK_STUDENTS,
  MOCK_COURSE_GRADES
} from '@/engine/mockData';

export default function EduAlertApp() {
  // Navigation State (Mặc định vào tab Giám Sát Cảnh Báo theo dõi lớp DH22CS01C)
  const [currentTab, setCurrentTab] = useState('tab-warning'); 
  const [currentStudentId, setCurrentStudentId] = useState('2251050001'); // Nguyễn Văn An (Nguy cơ buộc thôi học)

  // Core Data State
  const [faculties, setFaculties] = useState(MOCK_FACULTIES);
  const [majors, setMajors] = useState(MOCK_MAJORS);
  const [selectedMajorCode, setSelectedMajorCode] = useState('FIT2200001'); // Khoa học máy tính
  const [selectedClassCode, setSelectedClassCode] = useState('DH22CS01C'); // Lớp 45 SV

  const [curriculumByMajor, setCurriculumByMajor] = useState(MOCK_MAJOR_CURRICULUM);
  const [classes, setClasses] = useState(MOCK_CLASSES);
  const [students, setStudents] = useState(MOCK_STUDENTS);
  const [courseGrades, setCourseGrades] = useState(MOCK_COURSE_GRADES);

  // Modals
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [dossierStudent, setDossierStudent] = useState(null);
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  const handleOpenDossier = (student) => {
    setDossierStudent(student);
    setIsDossierOpen(true);
  };

  const handleSaveCounselingNote = (maSV, noteObj) => {
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
  };

  const currentStudent = students.find((s) => s.maSV === currentStudentId) || students[0];

  // Thông báo: sinh viên đang bị cảnh báo (không tính nhóm an toàn / tín hiệu sớm), rủi ro cao xếp trước
  const WARNING_LEVELS = ['DROP_OUT_RISK', 'HIGH_RISK', 'WARNING', 'EARLY_WARNING'];
  const notifications = students
    .filter((s) => WARNING_LEVELS.includes(s.level))
    .sort((a, b) => (b.riskScore || 0) - (a.riskScore || 0));

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
      />

      {/* Main Content Area */}
      <main className="app-main-wrapper">
        <Header
          currentTab={currentTab}
          onOpenGuide={() => setIsGuideOpen(true)}
          notifications={notifications}
          onSelectNotification={handleOpenDossier}
          onViewAllNotifications={() => setCurrentTab('tab-warning')}
        />

        <div className="app-content-body">
          {/* TAB 1: GIÁM SÁT & CẢNH BÁO SỚM HỌC VỤ (LỚP DH22CS01C) */}
          {currentTab === 'tab-warning' && (
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

          {/* TAB 2: SMART ACADEMIC PLANNER */}
          {currentTab === 'tab-planner' && (
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
          {currentTab === 'tab-faculties' && (
            <FacultyManagementTab
              faculties={faculties}
              setFaculties={setFaculties}
              majors={majors}
            />
          )}

          {/* TAB 4: QUẢN LÝ NGÀNH & CTĐT (VIEW 4 TAB, THÊM MÔN LIÊN NGÀNH) */}
          {currentTab === 'tab-majors' && (
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
          {currentTab === 'tab-course-grades' && (
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

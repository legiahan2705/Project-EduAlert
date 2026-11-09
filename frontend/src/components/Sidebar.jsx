'use client';

import { 
  Building2, 
  Layers, 
  FileSpreadsheet, 
  AlertTriangle, 
  Compass, 
  ShieldCheck,
  GraduationCap,
  User,
  Users
} from 'lucide-react';

export default function Sidebar({
  currentTab,
  onSelectTab,
  isOpen = false,
  allowedTabs = [],
  warningCount = 0
}) {
  const hide = (tab) => (allowedTabs.includes(tab) ? undefined : { display: 'none' });
  return (
    <aside className={`app-sidebar ${isOpen ? 'open' : ''}`}>
      {/* Brand Header (Emerald Box + EduAlert) */}
      <div className="sidebar-brand">
        <div className="brand-icon-box">
          <GraduationCap size={20} />
        </div>
        <div>
          <h1 className="brand-title">EduAlert</h1>
          <p className="brand-subtitle">ĐH Mở TP.HCM • TT 08/2021</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        {/* NHÓM 1: GIÁM SÁT & CẢNH BÁO */}
        <div className="nav-section-title">Giám Sát & Học Vụ</div>

        <button
          type="button"
          onClick={() => onSelectTab('tab-me')}
          style={hide('tab-me')}
          className={`nav-item ${currentTab === 'tab-me' ? 'active' : ''}`}
        >
          <User size={17} />
          <span>Hồ Sơ Của Tôi</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('tab-warning')}
          style={hide('tab-warning')}
          className={`nav-item ${currentTab === 'tab-warning' ? 'active' : ''}`}
        >
          <AlertTriangle size={17} />
          <span>Cảnh Báo Sớm Nguy Cơ</span>
          {warningCount > 0 && <span className="nav-badge danger">{warningCount}</span>}
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('tab-planner')}
          style={hide('tab-planner')}
          className={`nav-item ${currentTab === 'tab-planner' ? 'active' : ''}`}
        >
          <Compass size={17} />
          <span>Smart Academic Planner</span>
          <span className="nav-badge">141 TC</span>
        </button>

        {/* NHÓM 2: QUẢN TRỊ ĐÀO TẠO */}
        <div className="nav-section-title mt-4" style={['tab-faculties', 'tab-majors', 'tab-course-grades', 'tab-users'].some((t) => allowedTabs.includes(t)) ? undefined : { display: 'none' }}>Quản Trị Đào Tạo</div>

        <button
          type="button"
          onClick={() => onSelectTab('tab-users')}
          style={hide('tab-users')}
          className={`nav-item ${currentTab === 'tab-users' ? 'active' : ''}`}
        >
          <Users size={17} />
          <span>Quản Lý Tài Khoản</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('tab-faculties')}
          style={hide('tab-faculties')}
          className={`nav-item ${currentTab === 'tab-faculties' ? 'active' : ''}`}
        >
          <Building2 size={17} />
          <span>Quản Lý Khoa</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('tab-majors')}
          style={hide('tab-majors')}
          className={`nav-item ${currentTab === 'tab-majors' ? 'active' : ''}`}
        >
          <Layers size={17} />
          <span>Quản Lý Ngành & CTĐT</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('tab-course-grades')}
          style={hide('tab-course-grades')}
          className={`nav-item ${currentTab === 'tab-course-grades' ? 'active' : ''}`}
        >
          <FileSpreadsheet size={17} />
          <span>Quản Lý Bảng Điểm</span>
        </button>
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <span className="flex items-center gap-1.5 text-xs text-emerald-200">
          <ShieldCheck size={14} />
          Quy chế tín chỉ 2021
        </span>
        <span className="text-xs font-mono text-emerald-300">v2.5</span>
      </div>
    </aside>
  );
}

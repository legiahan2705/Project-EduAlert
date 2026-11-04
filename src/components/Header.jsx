'use client';

import { 
  Calendar, 
  HelpCircle, 
  Layers, 
  Bell,
  ChevronRight
} from 'lucide-react';

export default function Header({
  currentTab,
  onOpenGuide
}) {
  const getTabLabel = () => {
    switch (currentTab) {
      case 'tab-warning':
        return 'Giám Sát & Cảnh Báo Sớm Nguy Cơ (TT 08/2021)';
      case 'tab-planner':
        return 'Kế Hoạch Học Tập Thông Minh (Smart Planner)';
      case 'tab-faculties':
        return 'Quản Lý Khoa Trực Thuộc';
      case 'tab-majors':
        return 'Quản Lý Ngành Đào Tạo & Khung CTĐT 141 Tín Chỉ';
      case 'tab-course-grades':
        return 'Quản Lý Bảng Điểm Lớp Học Phần (Group By Môn)';
      default:
        return 'Hệ Thống Quản Trị Đào Tạo EduAlert';
    }
  };

  return (
    <header className="app-topbar">
      {/* Breadcrumb Path */}
      <div className="topbar-left">
        <nav className="breadcrumb-path">
          <Layers size={15} className="text-emerald-700" />
          <span>EduAlert</span>
          <ChevronRight size={13} className="text-slate-300" />
          <span className="current">{getTabLabel()}</span>
        </nav>
      </div>

      {/* Right Controls */}
      <div className="topbar-right">
        {/* Term Badge */}
        <div className="topbar-term-badge">
          <Calendar size={13} className="text-emerald-700" />
          <span>Năm học: <strong>2023 - 2024</strong> (Học kỳ 3)</span>
        </div>

        {/* Quick Guide Button */}
        <button
          type="button"
          onClick={onOpenGuide}
          className="btn-outline text-xs py-1.5 px-3 flex items-center gap-1.5"
          title="Xem hướng dẫn sử dụng nhanh"
        >
          <HelpCircle size={14} className="text-slate-500" />
          <span>Hướng Dẫn</span>
        </button>

        {/* Notification Bell */}
        <button 
          className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          title="Thông báo mới"
        >
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Real User Profile Badge (No mock switcher) */}
        <div className="user-profile-badge">
          <div className="user-avatar-circle">
            LH
          </div>
          <div className="user-details">
            <span className="user-name">Lê Gia Hân</span>
            <span className="user-role-title">Quản Trị Viên / CVHT</span>
          </div>
        </div>
      </div>
    </header>
  );
}

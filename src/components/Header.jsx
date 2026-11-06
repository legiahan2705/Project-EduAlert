'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Calendar,
  HelpCircle,
  Layers,
  Bell,
  ChevronRight
} from 'lucide-react';

const MAX_NOTIFICATIONS_SHOWN = 6;

const isDropOut = (level) => level === 'DROP_OUT_RISK' || level === 'HIGH_RISK';

export default function Header({
  currentTab,
  onOpenGuide,
  notifications = [],
  onSelectNotification,
  onViewAllNotifications
}) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const notifRef = useRef(null);

  // Đóng danh sách khi bấm ra ngoài hoặc nhấn Escape
  useEffect(() => {
    if (!isNotifOpen) return undefined;
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setIsNotifOpen(false);
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsNotifOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isNotifOpen]);

  const toggleNotifications = () => {
    setIsNotifOpen((open) => !open);
    setHasUnread(false);
  };

  const shownNotifications = notifications.slice(0, MAX_NOTIFICATIONS_SHOWN);
  const hiddenCount = Math.max(0, notifications.length - shownNotifications.length);

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
        <div className="notif-wrapper" ref={notifRef}>
          <button
            type="button"
            className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            title="Thông báo mới"
            aria-label="Thông báo"
            aria-haspopup="true"
            aria-expanded={isNotifOpen}
            onClick={toggleNotifications}
          >
            <Bell size={17} />
            {hasUnread && notifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>

          {isNotifOpen && (
            <div className="notif-panel" role="menu">
              <div className="notif-panel-header">
                <strong>Thông báo</strong>
                <span>{notifications.length} sinh viên cần chú ý</span>
              </div>

              {shownNotifications.length === 0 ? (
                <div className="notif-empty">Không có cảnh báo nào.</div>
              ) : (
                <ul className="notif-list">
                  {shownNotifications.map((s) => (
                    <li key={s.maSV}>
                      <button
                        type="button"
                        className="notif-item"
                        role="menuitem"
                        onClick={() => {
                          setIsNotifOpen(false);
                          if (onSelectNotification) onSelectNotification(s);
                        }}
                      >
                        <span className={`notif-dot ${isDropOut(s.level) ? 'danger' : 'warning'}`} />
                        <span className="notif-text">
                          <span className="notif-title">
                            {s.hoTen} <small>({s.maSV})</small>
                          </span>
                          <span className="notif-desc">
                            {s.levelText} · GPA TL {Number(s.gpaTL).toFixed(2)} · Nợ {s.tcNo} TC
                          </span>
                        </span>
                        <span className="notif-risk">{s.riskScore}%</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <div className="notif-panel-footer">
                {hiddenCount > 0 && <span>và {hiddenCount} sinh viên khác</span>}
                <button
                  type="button"
                  className="notif-viewall"
                  onClick={() => {
                    setIsNotifOpen(false);
                    if (onViewAllNotifications) onViewAllNotifications();
                  }}
                >
                  Xem tất cả
                </button>
              </div>
            </div>
          )}
        </div>

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

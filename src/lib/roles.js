// Phân quyền giao diện theo vai trò (phần quyền thật được kiểm tra lại ở các route API).
export const ROLE_LABEL = {
  admin: 'Quản trị viên',
  lecturer: 'Giảng viên',
  student: 'Sinh viên',
};

export const TABS_BY_ROLE = {
  admin: ['tab-warning', 'tab-planner', 'tab-faculties', 'tab-majors', 'tab-users'],
  lecturer: ['tab-warning', 'tab-planner', 'tab-course-grades'],
  student: ['tab-me', 'tab-planner'],
};

export const DEFAULT_TAB = {
  admin: 'tab-warning',
  lecturer: 'tab-warning',
  student: 'tab-me',
};

export function initialsOf(name = '') {
  const parts = name.replace(/^(ThS\.|TS\.|PGS\.|GS\.)\s*/i, '').trim().split(/\s+/);
  return (parts[parts.length - 1]?.[0] || 'U').toUpperCase();
}

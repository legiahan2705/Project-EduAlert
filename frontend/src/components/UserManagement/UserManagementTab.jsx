'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Users,
  UserPlus,
  Search,
  ShieldCheck,
  BookOpen,
  GraduationCap,
  Key,
  Pencil,
  Trash2,
  Lock,
  Unlock,
  CheckCircle2,
  AlertCircle,
  X,
  Eye,
  EyeOff,
  RefreshCw,
  Building2,
  Layers
} from 'lucide-react';
import { eduAlertApi } from '@/services/api';

const ROLE_CONFIG = {
  admin: {
    label: 'Quản trị viên',
    color: 'bg-rose-50 text-rose-700 border-rose-200',
    badgeBg: 'bg-rose-600',
    icon: ShieldCheck,
  },
  lecturer: {
    label: 'Giảng viên',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    badgeBg: 'bg-emerald-600',
    icon: BookOpen,
  },
  student: {
    label: 'Sinh viên',
    color: 'bg-sky-50 text-sky-700 border-sky-200',
    badgeBg: 'bg-sky-600',
    icon: GraduationCap,
  },
};

export default function UserManagementTab({
  faculties = [],
  majors = [],
  classes = [],
  currentUser = null,
}) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isResetPwModalOpen, setIsResetPwModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Notifications
  const [notification, setNotification] = useState(null); // { type: 'success' | 'error', message }

  const showNotify = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Form states
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'lecturer',
    name: '',
    email: '',
    phone: '',
    facultyCode: '',
    facultyName: '',
    classes: [],
    maSV: '',
    maLop: '',
    maNganh: '',
    tenNganh: '',
  });

  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'lecturer',
    status: 'ACTIVE',
    facultyCode: '',
    facultyName: '',
    classes: [],
    maSV: '',
    maLop: '',
    maNganh: '',
    tenNganh: '',
  });

  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setRefreshing(true);
      const data = await eduAlertApi.getUsers();
      if (Array.isArray(data)) {
        setUsers(data);
      }
    } catch (err) {
      showNotify('error', 'Không thể nạp danh sách tài khoản: ' + err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filtered users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      if (roleFilter !== 'ALL' && u.role !== roleFilter) return false;
      if (statusFilter !== 'ALL' && u.status !== statusFilter) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        const matchName = (u.name || '').toLowerCase().includes(q);
        const matchUsername = (u.username || '').toLowerCase().includes(q);
        const matchEmail = (u.email || '').toLowerCase().includes(q);
        const matchMaSV = (u.maSV || '').toLowerCase().includes(q);
        return matchName || matchUsername || matchEmail || matchMaSV;
      }
      return true;
    });
  }, [users, roleFilter, statusFilter, searchTerm]);

  // Statistics
  const stats = useMemo(() => {
    return {
      total: users.length,
      admin: users.filter((u) => u.role === 'admin').length,
      lecturer: users.filter((u) => u.role === 'lecturer').length,
      student: users.filter((u) => u.role === 'student').length,
      locked: users.filter((u) => u.status === 'LOCKED').length,
    };
  }, [users]);

  // Open Add Modal
  const handleOpenAdd = (defaultRole = 'lecturer') => {
    setFormError('');
    setShowPassword(false);
    setFormData({
      username: '',
      password: '',
      role: defaultRole,
      name: '',
      email: '',
      phone: '',
      facultyCode: faculties[0]?.code || '',
      facultyName: faculties[0]?.name || '',
      classes: [],
      maSV: '',
      maLop: classes[0]?.maLop || '',
      maNganh: majors[0]?.code || '',
      tenNganh: majors[0]?.name || '',
    });
    setIsAddModalOpen(true);
  };

  // Submit Add User
  const handleCreateUser = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.username.trim() || formData.username.trim().length < 3) {
      setFormError('Tên đăng nhập phải có ít nhất 3 ký tự');
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      setFormError('Mật khẩu khởi tạo phải có ít nhất 6 ký tự');
      return;
    }
    if (!formData.name.trim()) {
      setFormError('Vui lòng nhập họ và tên');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        ...formData,
        username: formData.username.trim().toLowerCase(),
        name: formData.name.trim(),
        maSV: formData.role === 'student' ? (formData.maSV || formData.username.trim()) : '',
      };
      const created = await eduAlertApi.createUser(payload);
      showNotify('success', `Đã tạo tài khoản "${created.username}" thành công!`);
      setIsAddModalOpen(false);
      fetchUsers();
    } catch (err) {
      setFormError(err.message || 'Lỗi khi tạo tài khoản');
    } finally {
      setSubmitting(false);
    }
  };

  // Open Edit Modal
  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setFormError('');
    setEditFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      role: user.role,
      status: user.status || 'ACTIVE',
      facultyCode: user.facultyCode || '',
      facultyName: user.facultyName || '',
      classes: user.classes || [],
      maSV: user.maSV || '',
      maLop: user.maLop || '',
      maNganh: user.maNganh || '',
      tenNganh: user.tenNganh || '',
    });
    setIsEditModalOpen(true);
  };

  // Submit Edit User
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    setFormError('');

    try {
      setSubmitting(true);
      await eduAlertApi.updateUser(selectedUser._id, editFormData);
      showNotify('success', `Đã cập nhật thông tin tài khoản "${selectedUser.username}"!`);
      setIsEditModalOpen(false);
      fetchUsers();
    } catch (err) {
      setFormError(err.message || 'Lỗi khi cập nhật tài khoản');
    } finally {
      setSubmitting(false);
    }
  };

  // Open Reset Password Modal
  const handleOpenResetPw = (user) => {
    setSelectedUser(user);
    setNewPassword('');
    setShowPassword(false);
    setFormError('');
    setIsResetPwModalOpen(true);
  };

  // Submit Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    if (!newPassword || newPassword.length < 6) {
      setFormError('Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }

    try {
      setSubmitting(true);
      await eduAlertApi.updateUser(selectedUser._id, { newPassword });
      showNotify('success', `Đã cấp lại mật khẩu mới cho "${selectedUser.username}" thành công!`);
      setIsResetPwModalOpen(false);
    } catch (err) {
      setFormError(err.message || 'Lỗi khi đặt lại mật khẩu');
    } finally {
      setSubmitting(false);
    }
  };

  // Toggle Lock/Unlock User
  const handleToggleLock = async (user) => {
    if (user.username === currentUser?.username) {
      showNotify('error', 'Bạn không thể tự khóa tài khoản của chính mình!');
      return;
    }

    const newStatus = user.status === 'LOCKED' ? 'ACTIVE' : 'LOCKED';
    const actionName = newStatus === 'LOCKED' ? 'khóa' : 'mở khóa';

    if (!confirm(`Bạn có chắc chắn muốn ${actionName} tài khoản "${user.username}" (${user.name})?`)) {
      return;
    }

    try {
      await eduAlertApi.updateUser(user._id, { status: newStatus });
      showNotify('success', `Đã ${actionName} tài khoản "${user.username}"!`);
      fetchUsers();
    } catch (err) {
      showNotify('error', err.message);
    }
  };

  // Delete User
  const handleDeleteUser = async (user) => {
    if (user.username === currentUser?.username) {
      showNotify('error', 'Bạn không thể tự xóa tài khoản của chính mình!');
      return;
    }

    if (!confirm(`CẢNH BÁO: Xóa tài khoản "${user.username}" (${user.name}) sẽ không thể phục hồi.\nBạn có chắc chắn muốn xóa?`)) {
      return;
    }

    try {
      await eduAlertApi.deleteUser(user._id);
      showNotify('success', `Đã xóa tài khoản "${user.username}" thành công!`);
      fetchUsers();
    } catch (err) {
      showNotify('error', err.message);
    }
  };

  // Toggle class selection for lecturer in modal
  const toggleLecturerClass = (classCode, isEdit = false) => {
    if (isEdit) {
      setEditFormData((prev) => {
        const cur = prev.classes || [];
        const next = cur.includes(classCode) ? cur.filter((c) => c !== classCode) : [...cur, classCode];
        return { ...prev, classes: next };
      });
    } else {
      setFormData((prev) => {
        const cur = prev.classes || [];
        const next = cur.includes(classCode) ? cur.filter((c) => c !== classCode) : [...cur, classCode];
        return { ...prev, classes: next };
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all duration-300 ${
            notification.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : 'bg-rose-50 border-rose-300 text-rose-800'
          }`}
        >
          {notification.type === 'success' ? <CheckCircle2 size={18} className="text-emerald-600" /> : <AlertCircle size={18} className="text-rose-600" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Users size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Quản Lý Tài Khoản Hệ Thống</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Phân quyền vai trò, quản lý phân công lớp giảng dạy và cấp phát tài khoản trực tiếp trên CSDL MongoDB
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchUsers}
              disabled={refreshing}
              className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium flex items-center gap-1.5 transition-colors disabled:opacity-50"
              title="Làm mới danh sách"
            >
              <RefreshCw size={15} className={refreshing ? 'animate-spin text-emerald-600' : ''} />
              <span>Đồng bộ</span>
            </button>

            <button
              onClick={() => handleOpenAdd('lecturer')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold flex items-center gap-2 shadow-sm transition-all"
            >
              <UserPlus size={16} />
              <span>+ Thêm Tài Khoản</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 pt-6 border-t border-slate-100">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="text-xs font-medium text-slate-500">Tổng tài khoản</div>
            <div className="text-2xl font-bold text-slate-800 mt-1">{stats.total}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200/70">
            <div className="text-xs font-medium text-rose-600 flex items-center gap-1">
              <ShieldCheck size={13} /> Quản trị viên
            </div>
            <div className="text-2xl font-bold text-rose-700 mt-1">{stats.admin}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/70">
            <div className="text-xs font-medium text-emerald-700 flex items-center gap-1">
              <BookOpen size={13} /> Giảng viên (Nhập điểm)
            </div>
            <div className="text-2xl font-bold text-emerald-800 mt-1">{stats.lecturer}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-200/70">
            <div className="text-xs font-medium text-sky-700 flex items-center gap-1">
              <GraduationCap size={13} /> Sinh viên
            </div>
            <div className="text-2xl font-bold text-sky-800 mt-1">{stats.student}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/70">
            <div className="text-xs font-medium text-amber-700 flex items-center gap-1">
              <Lock size={13} /> Đang bị khóa
            </div>
            <div className="text-2xl font-bold text-amber-800 mt-1">{stats.locked}</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo họ tên, username, email, MSSV..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
          />
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto">
          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-emerald-500"
          >
            <option value="ALL">Tất cả vai trò</option>
            <option value="admin">Quản trị viên (Admin)</option>
            <option value="lecturer">Giảng viên (Lecturer)</option>
            <option value="student">Sinh viên (Student)</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-emerald-500"
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="ACTIVE">Đang hoạt động</option>
            <option value="LOCKED">Đã khóa</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            <RefreshCw size={24} className="animate-spin mx-auto text-emerald-600 mb-2" />
            Đang tải danh sách người dùng từ MongoDB...
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            Không tìm thấy tài khoản nào phù hợp với bộ lọc.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Người Dùng</th>
                  <th className="py-3.5 px-4">Tên Đăng Nhập</th>
                  <th className="py-3.5 px-4">Vai Trò</th>
                  <th className="py-3.5 px-4">Phạm Vi & Phân Công</th>
                  <th className="py-3.5 px-4 text-center">Trạng Thái</th>
                  <th className="py-3.5 px-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u) => {
                  const roleCfg = ROLE_CONFIG[u.role] || ROLE_CONFIG.student;
                  const Icon = roleCfg.icon;
                  const isCurrent = u.username === currentUser?.username;

                  return (
                    <tr key={u._id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Name & Contact */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-xs ${roleCfg.badgeBg}`}>
                            {(u.name || 'U').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                              {u.name}
                              {isCurrent && (
                                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-medium">
                                  Bạn
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-400">
                              {u.email || u.phone ? (
                                <span>{u.email} {u.phone && `• ${u.phone}`}</span>
                              ) : (
                                <span className="italic">Chưa có liên hệ</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Username */}
                      <td className="py-3 px-4">
                        <code className="text-xs font-mono font-semibold bg-slate-100 text-slate-700 px-2 py-1 rounded-md border border-slate-200">
                          {u.username}
                        </code>
                      </td>

                      {/* Role */}
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border ${roleCfg.color}`}>
                          <Icon size={13} />
                          {roleCfg.label}
                        </span>
                      </td>

                      {/* Scope & Assigned Classes */}
                      <td className="py-3 px-4">
                        {u.role === 'lecturer' ? (
                          <div className="space-y-1">
                            {u.facultyName && (
                              <div className="text-xs text-slate-600 flex items-center gap-1">
                                <Building2 size={12} className="text-slate-400" />
                                {u.facultyName}
                              </div>
                            )}
                            <div className="flex flex-wrap items-center gap-1">
                              <span className="text-[11px] text-slate-400">Lớp nhập điểm:</span>
                              {(u.classes || []).length > 0 ? (
                                u.classes.map((c) => (
                                  <span
                                    key={c}
                                    className="text-[11px] font-mono bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200"
                                  >
                                    {c}
                                  </span>
                                ))
                              ) : (
                                <span className="text-[11px] text-amber-600 italic">Chưa phân lớp</span>
                              )}
                            </div>
                            {(u.coursesTaught || []).length > 0 && (
                              <div className="flex flex-wrap items-center gap-1">
                                <span className="text-[11px] text-slate-400">Môn giảng dạy:</span>
                                {u.coursesTaught.map((co) => (
                                  <span
                                    key={co}
                                    className="text-[11px] font-mono bg-sky-50 text-sky-700 px-1.5 py-0.5 rounded border border-sky-200"
                                  >
                                    {co}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : u.role === 'student' ? (
                          <div className="text-xs text-slate-600 space-y-0.5">
                            <div>
                              Lớp: <span className="font-semibold text-slate-800">{u.maLop || 'DH22CS01C'}</span>
                            </div>
                            {u.tenNganh && <div className="text-[11px] text-slate-400">{u.tenNganh}</div>}
                          </div>
                        ) : (
                          <span className="text-xs text-slate-500 font-medium">Toàn quyền hệ thống</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4 text-center">
                        {u.status === 'LOCKED' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-full">
                            <Lock size={10} /> Đã khóa
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                            <CheckCircle2 size={10} /> Hoạt động
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          {/* Đặt lại mật khẩu */}
                          <button
                            onClick={() => handleOpenResetPw(u)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                            title="Đặt lại mật khẩu"
                          >
                            <Key size={15} />
                          </button>

                          {/* Sửa thông tin */}
                          <button
                            onClick={() => handleOpenEdit(u)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-sky-700 hover:bg-sky-50 transition-colors"
                            title="Chỉnh sửa thông tin"
                          >
                            <Pencil size={15} />
                          </button>

                          {/* Khóa / Mở khóa */}
                          <button
                            onClick={() => handleToggleLock(u)}
                            disabled={isCurrent}
                            className={`p-1.5 rounded-lg transition-colors ${
                              isCurrent
                                ? 'text-slate-300 cursor-not-allowed'
                                : u.status === 'LOCKED'
                                ? 'text-emerald-600 hover:bg-emerald-50'
                                : 'text-amber-600 hover:bg-amber-50'
                            }`}
                            title={u.status === 'LOCKED' ? 'Mở khóa tài khoản' : 'Khóa tài khoản'}
                          >
                            {u.status === 'LOCKED' ? <Unlock size={15} /> : <Lock size={15} />}
                          </button>

                          {/* Xóa */}
                          <button
                            onClick={() => handleDeleteUser(u)}
                            disabled={isCurrent}
                            className={`p-1.5 rounded-lg transition-colors ${
                              isCurrent ? 'text-slate-300 cursor-not-allowed' : 'text-rose-500 hover:bg-rose-50'
                            }`}
                            title="Xóa tài khoản"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL 1: THÊM TÀI KHOẢN MỚI */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <UserPlus size={18} />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Tạo Tài Khoản Người Dùng Mới</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleCreateUser} className="p-6 overflow-y-auto space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle size={15} />
                  <span>{formError}</span>
                </div>
              )}

              {/* Role Selector Tabs */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  1. Chọn Vai Trò Tài Khoản <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['lecturer', 'student', 'admin'].map((r) => {
                    const cfg = ROLE_CONFIG[r];
                    const active = formData.role === r;
                    const Icon = cfg.icon;
                    return (
                      <button
                        key={r}
                        type="button"
                        onClick={() => {
                          setFormData((p) => ({
                            ...p,
                            role: r,
                            username: '',
                          }));
                        }}
                        className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                          active
                            ? 'border-emerald-500 bg-emerald-50/50 text-emerald-800 ring-2 ring-emerald-200'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Icon size={18} className={active ? 'text-emerald-700' : 'text-slate-400'} />
                        <span className="text-xs font-semibold">{cfg.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Username & Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {formData.role === 'student' ? 'Mã Số Sinh Viên (MSSV)' : 'Tên Đăng Nhập'}{' '}
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder={
                      formData.role === 'student'
                        ? 'VD: 2251050042'
                        : formData.role === 'lecturer'
                        ? 'VD: gv.huong'
                        : 'VD: admin.khoa'
                    }
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mật Khẩu Khởi Tạo <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Ít nhất 6 ký tự..."
                      className="w-full px-3 py-2 pr-9 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Họ Và Tên <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={
                    formData.role === 'lecturer' ? 'VD: TS. Lê Thị Hương' : 'VD: Nguyễn Văn Bảo'
                  }
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@ou.edu.vn"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Số Điện Thoại</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0901234567"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* GIẢNG VIÊN: Khoa & Phân công lớp nhập điểm */}
              {formData.role === 'lecturer' && (
                <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-3">
                  <div className="font-semibold text-xs text-emerald-900 flex items-center gap-1.5">
                    <BookOpen size={14} /> Phân Công Giảng Viên & Lớp Nhập Điểm
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Khoa Phụ Trách</label>
                    <select
                      value={formData.facultyCode}
                      onChange={(e) => {
                        const fac = faculties.find((f) => f.code === e.target.value);
                        setFormData({
                          ...formData,
                          facultyCode: e.target.value,
                          facultyName: fac?.name || '',
                        });
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                    >
                      <option value="">-- Chọn Khoa --</option>
                      {faculties.map((f) => (
                        <option key={f.code} value={f.code}>
                          {f.code} - {f.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      Chọn Các Lớp Giảng Viên Có Quyền Nhập Điểm / CVHT:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-36 overflow-y-auto p-2 bg-white rounded-lg border border-slate-200">
                      {classes.map((cls) => {
                        const checked = formData.classes.includes(cls.maLop);
                        return (
                          <label
                            key={cls.maLop}
                            className={`flex items-center gap-2 p-1.5 rounded-md text-xs cursor-pointer border transition-colors ${
                              checked ? 'bg-emerald-50 border-emerald-300 font-semibold text-emerald-800' : 'border-slate-100 hover:bg-slate-50'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleLecturerClass(cls.maLop, false)}
                              className="accent-emerald-600 rounded"
                            />
                            <span>{cls.maLop}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* SINH VIÊN: Lớp & Ngành */}
              {formData.role === 'student' && (
                <div className="p-3.5 rounded-xl bg-sky-50/50 border border-sky-200 space-y-3">
                  <div className="font-semibold text-xs text-sky-900 flex items-center gap-1.5">
                    <GraduationCap size={14} /> Thông Tin Sinh Hoạt Lớp & Ngành Học
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Lớp Học</label>
                      <select
                        value={formData.maLop}
                        onChange={(e) => setFormData({ ...formData, maLop: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 bg-white"
                      >
                        {classes.map((c) => (
                          <option key={c.maLop} value={c.maLop}>
                            {c.maLop}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Ngành Học</label>
                      <select
                        value={formData.maNganh}
                        onChange={(e) => {
                          const maj = majors.find((m) => m.code === e.target.value);
                          setFormData({
                            ...formData,
                            maNganh: e.target.value,
                            tenNganh: maj?.name || '',
                          });
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 bg-white"
                      >
                        {majors.map((m) => (
                          <option key={m.code} value={m.code}>
                            {m.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Footer Actions */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-all disabled:opacity-50"
                >
                  {submitting ? 'Đang tạo...' : 'Tạo Tài Khoản'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: CHỈNH SỬA TÀI KHOẢN */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Pencil size={17} className="text-sky-600" />
                <h3 className="font-bold text-slate-900 text-base">
                  Cập Nhật: <span className="font-mono text-emerald-700">{selectedUser.username}</span>
                </h3>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="p-6 overflow-y-auto space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle size={15} />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Họ Và Tên</label>
                <input
                  type="text"
                  required
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Số Điện Thoại</label>
                  <input
                    type="text"
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Trạng Thái Tài Khoản</label>
                <select
                  value={editFormData.status}
                  onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white"
                >
                  <option value="ACTIVE">Hoạt động (Cho phép đăng nhập)</option>
                  <option value="LOCKED">Khóa (Chặn đăng nhập)</option>
                </select>
              </div>

              {/* Giảng viên classes update */}
              {selectedUser.role === 'lecturer' && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-xs font-semibold text-slate-700">Các Lớp Được Nhập Điểm:</div>
                  <div className="grid grid-cols-2 gap-1.5 max-h-32 overflow-y-auto">
                    {classes.map((cls) => {
                      const checked = (editFormData.classes || []).includes(cls.maLop);
                      return (
                        <label
                          key={cls.maLop}
                          className={`flex items-center gap-2 p-1.5 rounded-md text-xs cursor-pointer border ${
                            checked ? 'bg-emerald-50 border-emerald-300 font-semibold text-emerald-800' : 'border-slate-200 bg-white'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleLecturerClass(cls.maLop, true)}
                            className="accent-emerald-600 rounded"
                          />
                          <span>{cls.maLop}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-sm transition-all disabled:opacity-50"
                >
                  {submitting ? 'Đang lưu...' : 'Lưu Thay Đổi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ĐẶT LẠI MẬT KHẨU (RESET PASSWORD) */}
      {isResetPwModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Key size={17} className="text-amber-600" />
                <h3 className="font-bold text-slate-900 text-base">Cấp Lại Mật Khẩu</h3>
              </div>
              <button
                onClick={() => setIsResetPwModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleResetPassword} className="p-6 space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle size={15} />
                  <span>{formError}</span>
                </div>
              )}

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                Cấp lại mật khẩu cho tài khoản:{' '}
                <strong className="text-slate-900 font-mono">{selectedUser.username}</strong> ({selectedUser.name})
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mật Khẩu Mới <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)..."
                    className="w-full px-3 py-2 pr-9 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsResetPwModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-sm transition-all disabled:opacity-50"
                >
                  {submitting ? 'Đang cập nhật...' : 'Xác Nhận Đổi Mật Khẩu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


// Tự động dùng Relative path (/api) khi deploy lên Vercel, hoặc dùng biến môi trường nếu có
const API_BASE = '/api';

// Gọi API; nếu phiên đăng nhập hết hạn (401) thì chuyển về trang đăng nhập
async function apiFetch(url, options) {
  const res = await fetch(url, options);
  if (res.status === 401 && typeof window !== 'undefined') {
    window.location.href = '/login';
  }
  return res;
}

export const eduAlertApi = {
  // Khoa
  async getFaculties(fallback) {
    try {
      const res = await apiFetch(`${API_BASE}/faculties`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error, using fallback:', e.message);
    }
    return fallback;
  },

  async createFaculty(data) {
    try {
      const res = await apiFetch(`${API_BASE}/faculties`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.error(e);
    }
    return null;
  },

  async updateFaculty(code, data) {
    try {
      const res = await apiFetch(`${API_BASE}/faculties/${code}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.error(e);
    }
    return null;
  },

  async deleteFaculty(code) {
    try {
      const res = await apiFetch(`${API_BASE}/faculties/${code}`, { method: 'DELETE' });
      if (res.ok) return await res.json();
    } catch (e) {
      console.error(e);
    }
    return null;
  },

  // Ngành
  async getMajors(fallback) {
    try {
      const res = await apiFetch(`${API_BASE}/majors`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error, using fallback');
    }
    return fallback;
  },

  async createMajor(data) {
    try {
      const res = await apiFetch(`${API_BASE}/majors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.error(e);
    }
    return null;
  },

  async updateMajor(code, data) {
    try {
      const res = await apiFetch(`${API_BASE}/majors/${code}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.error(e);
    }
    return null;
  },

  async deleteMajor(code) {
    try {
      const res = await apiFetch(`${API_BASE}/majors/${code}`, { method: 'DELETE' });
      if (res.ok) return await res.json();
    } catch (e) {
      console.error(e);
    }
    return null;
  },

  // Sinh viên
  async getStudents(fallback) {
    try {
      const res = await apiFetch(`${API_BASE}/students`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error, using fallback');
    }
    return fallback;
  },

  async addCounselingNote(maSV, note) {
    try {
      const res = await apiFetch(`${API_BASE}/students/${maSV}/counseling`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.error(e);
    }
    return null;
  },

  // Sinh viên
  async createStudent(studentData) {
    try {
      const res = await apiFetch(`${API_BASE}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lỗi khi thêm sinh viên');
      return data;
    } catch (e) {
      throw e;
    }
  },

  async deleteStudent(maSV) {
    try {
      const res = await apiFetch(`${API_BASE}/students/${encodeURIComponent(maSV)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lỗi khi xóa sinh viên');
      return data;
    } catch (e) {
      throw e;
    }
  },

  // Lớp học vụ
  async getClasses(fallback) {
    try {
      const res = await apiFetch(`${API_BASE}/classes`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Lỗi getClasses, dùng fallback:', e.message);
    }
    return fallback;
  },

  async createClass(classData) {
    try {
      const res = await apiFetch(`${API_BASE}/classes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(classData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lỗi khi tạo lớp mới');
      return data;
    } catch (e) {
      throw e;
    }
  },

  async deleteClass(maLop) {
    try {
      const res = await apiFetch(`${API_BASE}/classes/${encodeURIComponent(maLop)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lỗi khi xóa lớp');
      return data;
    } catch (e) {
      throw e;
    }
  },

  // Bảng điểm
  async getCourseGrades(fallback) {
    try {
      const res = await apiFetch(`${API_BASE}/grades`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error, using fallback');
    }
    return fallback;
  },

  async saveCourseGradeSheet(sheetId, sheetData) {
    try {
      const res = await apiFetch(`${API_BASE}/grades/${sheetId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sheetData),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.error(e);
    }
    return null;
  },

  // Quản lý người dùng (Admin)
  async getUsers(params = {}) {
    try {
      const query = new URLSearchParams();
      if (params.role) query.append('role', params.role);
      if (params.status) query.append('status', params.status);
      if (params.search) query.append('search', params.search);
      const url = `${API_BASE}/users?${query.toString()}`;
      const res = await apiFetch(url);
      if (res.ok) return await res.json();
    } catch (e) {
      console.error('Lỗi getUsers:', e);
    }
    return [];
  },

  async createUser(userData) {
    try {
      const res = await apiFetch(`${API_BASE}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lỗi khi tạo người dùng');
      return data;
    } catch (e) {
      throw e;
    }
  },

  async updateUser(id, userData) {
    try {
      const res = await apiFetch(`${API_BASE}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lỗi khi cập nhật người dùng');
      return data;
    } catch (e) {
      throw e;
    }
  },

  async deleteUser(id) {
    try {
      const res = await apiFetch(`${API_BASE}/users/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lỗi khi xóa người dùng');
      return data;
    } catch (e) {
      throw e;
    }
  },
};

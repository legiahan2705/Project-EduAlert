// Tự động dùng Relative path (/api) khi deploy lên Vercel, hoặc dùng biến môi trường nếu có
const API_BASE = '/api';

export const eduAlertApi = {
  // Khoa
  async getFaculties(fallback) {
    try {
      const res = await fetch(`${API_BASE}/faculties`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error, using fallback:', e.message);
    }
    return fallback;
  },

  async createFaculty(data) {
    try {
      const res = await fetch(`${API_BASE}/faculties`, {
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
      const res = await fetch(`${API_BASE}/faculties/${code}`, {
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
      const res = await fetch(`${API_BASE}/faculties/${code}`, { method: 'DELETE' });
      if (res.ok) return await res.json();
    } catch (e) {
      console.error(e);
    }
    return null;
  },

  // Ngành
  async getMajors(fallback) {
    try {
      const res = await fetch(`${API_BASE}/majors`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error, using fallback');
    }
    return fallback;
  },

  async createMajor(data) {
    try {
      const res = await fetch(`${API_BASE}/majors`, {
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
      const res = await fetch(`${API_BASE}/majors/${code}`, {
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
      const res = await fetch(`${API_BASE}/majors/${code}`, { method: 'DELETE' });
      if (res.ok) return await res.json();
    } catch (e) {
      console.error(e);
    }
    return null;
  },

  // Sinh viên
  async getStudents(fallback) {
    try {
      const res = await fetch(`${API_BASE}/students`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error, using fallback');
    }
    return fallback;
  },

  async addCounselingNote(maSV, note) {
    try {
      const res = await fetch(`${API_BASE}/students/${maSV}/counseling`, {
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

  // Bảng điểm
  async getCourseGrades(fallback) {
    try {
      const res = await fetch(`${API_BASE}/grades`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error, using fallback');
    }
    return fallback;
  },

  async saveCourseGradeSheet(sheetId, sheetData) {
    try {
      const res = await fetch(`${API_BASE}/grades/${sheetId}`, {
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
};

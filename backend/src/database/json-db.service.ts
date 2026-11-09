import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface DatabaseSchema {
  faculties: any[];
  majors: any[];
  curriculum: Record<string, any[]>;
  classes: any[];
  students: any[];
  courseGrades: any[];
}

@Injectable()
export class JsonDbService implements OnModuleInit {
  private readonly dbFilePath = path.resolve(process.cwd(), 'data', 'db.json');
  private data: DatabaseSchema = {
    faculties: [],
    majors: [],
    curriculum: {},
    classes: [],
    students: [],
    courseGrades: [],
  };

  onModuleInit() {
    this.loadDatabase();
  }

  private loadDatabase() {
    try {
      if (fs.existsSync(this.dbFilePath)) {
        const raw = fs.readFileSync(this.dbFilePath, 'utf8');
        this.data = JSON.parse(raw);
        console.log(`[JsonDbService] Database loaded successfully from ${this.dbFilePath}`);
      } else {
        console.warn(`[JsonDbService] File ${this.dbFilePath} not found, initializing empty DB.`);
        this.persist();
      }
    } catch (err) {
      console.error('[JsonDbService] Failed to load JSON database:', err);
    }
  }

  private persist() {
    try {
      const dir = path.dirname(this.dbFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.dbFilePath, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (err) {
      console.error('[JsonDbService] Failed to persist data to disk:', err);
    }
  }

  // --- KHOA (FACULTIES) ---
  getFaculties() {
    return this.data.faculties || [];
  }

  createFaculty(faculty: any) {
    this.data.faculties.unshift(faculty);
    this.persist();
    return faculty;
  }

  updateFaculty(code: string, updates: any) {
    const idx = this.data.faculties.findIndex((f) => f.code === code || f.id === code);
    if (idx !== -1) {
      this.data.faculties[idx] = { ...this.data.faculties[idx], ...updates };
      this.persist();
      return this.data.faculties[idx];
    }
    return null;
  }

  deleteFaculty(code: string) {
    const initialLen = this.data.faculties.length;
    this.data.faculties = this.data.faculties.filter((f) => f.code !== code && f.id !== code);
    if (this.data.faculties.length !== initialLen) {
      this.persist();
      return true;
    }
    return false;
  }

  // --- NGÀNH (MAJORS) ---
  getMajors() {
    return this.data.majors || [];
  }

  createMajor(major: any) {
    this.data.majors.unshift(major);
    this.persist();
    return major;
  }

  updateMajor(code: string, updates: any) {
    const idx = this.data.majors.findIndex((m) => m.code === code || m.id === code);
    if (idx !== -1) {
      this.data.majors[idx] = { ...this.data.majors[idx], ...updates };
      this.persist();
      return this.data.majors[idx];
    }
    return null;
  }

  deleteMajor(code: string) {
    const initialLen = this.data.majors.length;
    this.data.majors = this.data.majors.filter((m) => m.code !== code && m.id !== code);
    if (this.data.majors.length !== initialLen) {
      this.persist();
      return true;
    }
    return false;
  }

  // --- CHƯƠNG TRÌNH ĐÀO TẠO (CURRICULUM) ---
  getCurriculum() {
    return this.data.curriculum || {};
  }

  updateMajorCurriculum(majorCode: string, courses: any[]) {
    this.data.curriculum[majorCode] = courses;
    this.persist();
    return this.data.curriculum[majorCode];
  }

  // --- LỚP HỌC (CLASSES) ---
  getClasses() {
    return this.data.classes || [];
  }

  createClass(newClass: any) {
    this.data.classes.unshift(newClass);
    this.persist();
    return newClass;
  }

  // --- SINH VIÊN (STUDENTS) ---
  getStudents() {
    return this.data.students || [];
  }

  updateStudent(maSV: string, updates: any) {
    const idx = this.data.students.findIndex((s) => s.maSV === maSV || s.id === maSV);
    if (idx !== -1) {
      this.data.students[idx] = { ...this.data.students[idx], ...updates };
      this.persist();
      return this.data.students[idx];
    }
    return null;
  }

  addCounselingLog(maSV: string, log: any) {
    const idx = this.data.students.findIndex((s) => s.maSV === maSV || s.id === maSV);
    if (idx !== -1) {
      const student = this.data.students[idx];
      const logs = student.counselingLog ? [log, ...student.counselingLog] : [log];
      this.data.students[idx] = { ...student, counselingLog: logs };
      this.persist();
      return this.data.students[idx];
    }
    return null;
  }

  // --- BẢNG ĐIỂM (COURSE GRADES) ---
  getCourseGrades() {
    return this.data.courseGrades || [];
  }

  saveCourseGradeSheet(sheetId: string, sheetData: any) {
    const idx = this.data.courseGrades.findIndex((g) => g.id === sheetId);
    if (idx !== -1) {
      this.data.courseGrades[idx] = { ...this.data.courseGrades[idx], ...sheetData };
    } else {
      this.data.courseGrades.push(sheetData);
    }
    this.persist();
    return sheetData;
  }
}


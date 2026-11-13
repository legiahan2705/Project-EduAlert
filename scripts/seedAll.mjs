import mongoose from 'mongoose';
import { Faculty, Major, Class, Student, GradeSheet, User } from '../src/models/index.js';
import { 
  MOCK_FACULTIES, 
  MOCK_MAJORS, 
  MOCK_CLASSES, 
  MOCK_STUDENTS, 
  MOCK_COURSE_GRADES 
} from '../src/engine/mockData.js';
import { buildAllInitialUsers } from '../src/lib/users.js';
import { generateGradeSheetsForClass } from '../src/lib/gradeSheets.js';

async function seedAll() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('No MONGODB_URI found!');
    process.exit(1);
  }

  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(uri, { dbName: 'edualert' });
  console.log('Connected to MongoDB!');

  // 1. Khoa
  for (const f of MOCK_FACULTIES) {
    await Faculty.findOneAndUpdate({ code: f.code }, { $set: f }, { upsert: true });
  }
  console.log(`✅ Synced ${MOCK_FACULTIES.length} Faculties`);

  // 2. Ngành
  for (const m of MOCK_MAJORS) {
    await Major.findOneAndUpdate({ code: m.code }, { $set: m }, { upsert: true });
  }
  console.log(`✅ Synced ${MOCK_MAJORS.length} Majors`);

  // 3. Lớp
  for (const c of MOCK_CLASSES) {
    await Class.findOneAndUpdate({ maLop: c.maLop }, { $set: c }, { upsert: true });
  }
  console.log(`✅ Synced ${MOCK_CLASSES.length} Classes`);

  // 4. Sinh viên
  for (const s of MOCK_STUDENTS) {
    await Student.findOneAndUpdate({ maSV: s.maSV }, { $set: s }, { upsert: true });
  }
  console.log(`✅ Synced ${MOCK_STUDENTS.length} Students`);

  // 5. Tài khoản Users
  const allUsers = buildAllInitialUsers();
  for (const u of allUsers) {
    await User.findOneAndUpdate({ username: u.username }, { $setOnInsert: u }, { upsert: true });
  }
  console.log(`✅ Synced ${allUsers.length} Users`);

  // 6. Bảng điểm 8 học kỳ cho tất cả các lớp
  const allGeneratedSheets = [];
  for (const cls of MOCK_CLASSES) {
    const sheets = generateGradeSheetsForClass(cls);
    allGeneratedSheets.push(...sheets);
  }

  const mockGradeMap = new Map();
  for (const mg of MOCK_COURSE_GRADES) {
    mockGradeMap.set(mg.maBangDiem || mg.id, mg);
  }

  for (const s of allGeneratedSheets) {
    const existing = mockGradeMap.get(s.id);
    if (existing) {
      s.grades = existing.grades || [];
      s.trangThai = existing.trangThai || s.trangThai;
      s.statusText = existing.statusText || s.statusText;
      s.progress = existing.progress ?? s.progress;
      s.giangVien = existing.giangVien || s.giangVien;
    }
    await GradeSheet.findOneAndUpdate({ id: s.id }, { $set: s }, { upsert: true });
  }
  console.log(`✅ Synced ${allGeneratedSheets.length} GradeSheets across 8 semesters!`);

  console.log('🎉 ALL DATA SYNCED TO MONGODB ATLAS SUCCESSFULLY!');
  process.exit(0);
}

seedAll().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});

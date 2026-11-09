import mongoose from 'mongoose';
import { connectDB } from '../src/lib/mongodb.js';
import { User } from '../src/models/index.js';
import { buildAllInitialUsers } from '../src/lib/users.js';

async function seed() {
  console.log('🚀 Connecting to MongoDB Atlas...');
  try {
    await connectDB();
    console.log('✅ Connected to MongoDB Atlas successfully!');

    const allUsers = buildAllInitialUsers();
    console.log(`📦 Preparing to seed ${allUsers.length} user accounts...`);

    let created = 0;
    let updated = 0;

    for (const u of allUsers) {
      const res = await User.findOneAndUpdate(
        { username: u.username },
        { $set: u },
        { upsert: true, new: true, rawResult: true }
      );
      if (res.lastErrorObject?.updatedExisting) {
        updated++;
      } else {
        created++;
      }
    }

    console.log(`🎉 Seeding complete!`);
    console.log(`   - 1 Admin: admin / Admin@123`);
    console.log(`   - 7 Lecturers (giảng viên các môn học): Giangvien@123`);
    console.log(`   - 45 Students (2251050001 -> 2251050045): Sinhvien@123`);
    console.log(`   - Total processed: ${created} created, ${updated} updated.`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    if (err.message.includes('whitelist')) {
      console.error('\n👉 Vui lòng thêm IP hiện tại vào MongoDB Atlas:');
      console.error('   Network Access -> Add IP Address -> 0.0.0.0/0 (Allow from anywhere)');
    }
    process.exit(1);
  }
}

seed();


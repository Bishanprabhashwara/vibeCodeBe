import { config } from "dotenv";
config();
import bcrypt from 'bcryptjs';
import { connectMongo } from "../modules/db";
import { UserModel } from "../models/User";

async function createTestUsers() {
  try {
    await connectMongo(process.env.DATABASE_URL as string);
    console.log('Connected to MongoDB');

    // Clear existing users (optional - remove in production)
    await UserModel.deleteMany({});
    console.log('Cleared existing users');

    const testUsers = [
      {
        name: 'Admin User',
        email: 'admin@lms.com',
        password: 'admin123',
        role: 'admin'
      },
      {
        name: 'Faculty Member',
        email: 'faculty@lms.com',
        password: 'faculty123',
        role: 'faculty'
      },
      {
        name: 'Student User',
        email: 'student@lms.com',
        password: 'student123',
        role: 'student'
      }
    ];

    for (const userData of testUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      const user = new UserModel({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        role: userData.role
      });
      await user.save();
      console.log(`Created ${userData.role}: ${userData.email}`);
    }

    console.log('\nTest users created successfully!');
    console.log('You can now use these credentials to test the authentication system:');
    console.log('- Admin: admin@lms.com / admin123');
    console.log('- Faculty: faculty@lms.com / faculty123');
    console.log('- Student: student@lms.com / student123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating test users:', error);
    process.exit(1);
  }
}

createTestUsers();

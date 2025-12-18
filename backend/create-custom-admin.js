require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Custom admin credentials
    const adminEmail = 'admin@recharge.com';
    const adminPassword = 'Admin123!';
    
    // Delete existing admin if exists
    await User.deleteOne({ email: adminEmail });
    
    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    
    const admin = await User.create({
      username: 'admin',
      email: adminEmail,
      password: hashedPassword,
      mobile: '1234567890',
      role: 'admin'
    });
    
    console.log('✅ Admin created successfully!');
    console.log('📧 Email:', adminEmail);
    console.log('🔑 Password:', adminPassword);
    console.log('🔗 Admin Panel: /admin');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createAdmin();
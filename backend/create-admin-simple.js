require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Delete existing admin if exists
    await User.deleteOne({ email: 'admin@mobz.com' });
    
    // Hash password
    const hashedPassword = await bcrypt.hash('SecureAdminPass123!', 12);
    
    const admin = await User.create({
      username: 'admin',
      email: 'admin@mobz.com',
      password: hashedPassword,
      mobile: '9999999999',
      role: 'admin'
    });
    
    console.log('Admin created successfully:', admin.email);
    console.log('Email: admin@mobz.com');
    console.log('Password: SecureAdminPass123!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

createAdmin();
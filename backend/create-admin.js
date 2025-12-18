require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const createAdmin = async () => {
  try {
    if (!process.env.ADMIN_PASSWORD) {
      throw new Error('ADMIN_PASSWORD environment variable is required');
    }
    
    await mongoose.connect(process.env.MONGODB_URI);
    
    const admin = await User.create({
      username: process.env.ADMIN_USERNAME || 'admin',
      email: process.env.ADMIN_EMAIL || 'admin@mobz.com',
      password: process.env.ADMIN_PASSWORD,
      mobile: process.env.ADMIN_MOBILE || '9999999999',
      role: 'admin'
    });
    
    console.log('Admin created:', admin.email);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

createAdmin();
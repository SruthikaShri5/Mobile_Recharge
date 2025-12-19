require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const createSimpleAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Delete existing admin if exists
    await User.deleteOne({ email: 'admin@mobz.com' });
    
    // Create new admin
    const admin = await User.create({
      username: 'admin',
      email: 'admin@mobz.com',
      password: 'admin123',
      mobile: '9999999999',
      role: 'admin'
    });
    
    console.log('Admin created successfully!');
    console.log('Email: admin@mobz.com');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

createSimpleAdmin();
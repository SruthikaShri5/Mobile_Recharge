require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const debugLogin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Check if admin exists
    let admin = await User.findOne({ email: 'admin@mobz.com' });
    console.log('Existing admin:', admin ? 'Found' : 'Not found');
    
    if (admin) {
      console.log('Admin details:', {
        email: admin.email,
        username: admin.username,
        role: admin.role,
        hasPassword: !!admin.password
      });
      
      // Test password comparison
      const testPassword = 'SecureAdminPass123!';
      const isMatch = await admin.comparePassword(testPassword);
      console.log('Password test result:', isMatch);
      
      if (!isMatch) {
        console.log('Password mismatch - recreating admin...');
        await User.deleteOne({ email: 'admin@mobz.com' });
        admin = null;
      }
    }
    
    if (!admin) {
      console.log('Creating new admin...');
      admin = await User.create({
        username: 'admin',
        email: 'admin@mobz.com',
        password: 'SecureAdminPass123!',
        mobile: '9999999999',
        role: 'admin'
      });
      console.log('Admin created successfully');
    }
    
    // Final test
    const finalTest = await admin.comparePassword('SecureAdminPass123!');
    console.log('Final password test:', finalTest);
    
    console.log('\nLogin credentials:');
    console.log('Email: admin@mobz.com');
    console.log('Password: SecureAdminPass123!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

debugLogin();
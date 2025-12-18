require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function testLogin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const user = await User.findOne({ email: 'admin@test.com' });
    
    if (!user) {
      console.log('User not found');
      process.exit(1);
    }
    
    const isMatch = await user.comparePassword('admin123');
    console.log('Password match:', isMatch);
    console.log('User role:', user.role);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

testLogin();

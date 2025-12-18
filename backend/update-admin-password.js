require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function updatePassword() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const user = await User.findOne({ email: 'admin@test.com' });
    user.password = 'admin123';
    await user.save();
    console.log('Admin password updated to: admin123');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

updatePassword();

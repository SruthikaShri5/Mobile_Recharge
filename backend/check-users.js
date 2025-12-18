require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function checkUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');

    const users = await User.find({}, 'username email mobile createdAt');
    console.log(`👥 Total users: ${users.length}`);
    
    if (users.length > 0) {
      console.log('\n📋 User List:');
      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.username} (${user.email}) - ${user.mobile} - ${user.createdAt}`);
      });
    } else {
      console.log('No users found in database');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkUsers();
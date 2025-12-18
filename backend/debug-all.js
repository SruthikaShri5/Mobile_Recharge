require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Transaction = require('./models/Transaction');

const debugAll = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Check all users
    const users = await User.find();
    console.log('\n📊 USERS IN DATABASE:');
    console.log(`Total users: ${users.length}`);
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.username} (${user.email}) - Role: ${user.role}`);
    });
    
    // Check all transactions
    const transactions = await Transaction.find();
    console.log('\n💳 TRANSACTIONS IN DATABASE:');
    console.log(`Total transactions: ${transactions.length}`);
    transactions.forEach((txn, index) => {
      console.log(`${index + 1}. ${txn.mobile} - ₹${txn.amount} - ${txn.operator}`);
    });
    
    // Test admin login
    console.log('\n🔐 TESTING ADMIN LOGIN:');
    const admin = await User.findOne({ email: 'admin@mobz.com' });
    if (admin) {
      const isValidPassword = await admin.comparePassword('SecureAdminPass123!');
      console.log(`Admin found: ✅`);
      console.log(`Password valid: ${isValidPassword ? '✅' : '❌'}`);
    } else {
      console.log('Admin not found: ❌');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

debugAll();
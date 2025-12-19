const mongoose = require('mongoose');
const User = require('./models/User');

const createAtlasAdmin = async () => {
  try {
    // Connect directly to MongoDB Atlas
    await mongoose.connect('mongodb+srv://Mobz_user:Rfmss%4012345@mobz-cluster.xzg70hi.mongodb.net/mobz_recharge?retryWrites=true&w=majority');
    console.log('Connected to MongoDB Atlas');
    
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
    
    console.log('Admin created successfully in MongoDB Atlas!');
    console.log('Email: admin@mobz.com');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

createAtlasAdmin();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

const register = async (req, res) => {
  try {
    const { username, email, password, mobile, role } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }, { mobile }] });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      if (existingUser.username === username) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      if (existingUser.mobile === mobile) {
        return res.status(400).json({ message: 'Phone number already exists' });
      }
    }

    const user = await User.create({
      username,
      email,
      password,
      mobile,
      role: role || 'user'
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        mobile: user.mobile,
        role: user.role
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        mobile: user.mobile,
        role: user.role
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const checkUnique = async (req, res) => {
  try {
    const { email, mobile, username } = req.body;
    const query = {};
    
    if (email) query.email = email;
    if (mobile) query.mobile = mobile;
    if (username) query.username = username;
    
    const existingUser = await User.findOne(query);
    res.json({ unique: !existingUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, checkUnique };
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register
exports.register = async (req, res) => {
  const { name, email, password, role, companyName, companyEmail, companyWebsite } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserData = {
      name,
      email,
      passwordHash: hashedPassword,
      role,
    };

    if (role === 'employer') {
      newUserData.companyName = companyName || null;
      newUserData.companyEmail = companyEmail || null;
      newUserData.companyWebsite = companyWebsite || null;
    }

    const user = new User(newUserData);
    await user.save();

    res.status(201).json({
      _id: user._id,
      name: user.name,
      role: user.role,
      companyName: user.companyName || null,
      companyEmail: user.companyEmail || null,
      companyWebsite: user.companyWebsite || null,
      token: generateToken(user._id),
    });

  } catch (err) {
    console.error('Registration Error:', err.message);
    res.status(500).json({ message: 'Registration failed' });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      role: user.role,
      companyName: user.companyName || null,
      companyEmail: user.companyEmail || null,
      companyWebsite: user.companyWebsite || null,
      token: generateToken(user._id),
    });

  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ message: 'Login failed' });
  }
};

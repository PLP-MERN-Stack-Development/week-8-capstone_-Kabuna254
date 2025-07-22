const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
  const { name, email, password, role, companyName, companyEmail, companyWebsite } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUserData = {
      name,
      email,
      passwordHash: hashedPassword,
      role,
    };

    // Include company details if employer
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
      token: generateToken(user._id),
    });

  } catch (err) {
    console.error('Registration Error:', err.message);
    res.status(500).json({ message: 'Registration failed' });
  }
};

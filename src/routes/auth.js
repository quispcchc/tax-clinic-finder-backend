const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure the model is correctly imported
const sequelize = require('../config/database');

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  console.log('username:', username);
  console.log('email:', email);
  console.log('password:', password);
  console.log('role:', role);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword , role});

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(400).json({ error: 'Failed to register user', details: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('email:', email);

  try {
    // Fetch user from the database using email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the entered password matches the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token for the user
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
});

module.exports = router;

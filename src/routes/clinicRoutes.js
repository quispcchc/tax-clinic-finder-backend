const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

// Public route for clinics (without authentication)
router.get('/', (req, res) => {
  res.send('Clinic routes are under construction');
});

// Protected route for clinics (with authentication)
router.get('/list', authMiddleware, (req, res) => {
  // Only authenticated users can access this route
  res.json({ message: 'List of clinics' });
});

module.exports = router;

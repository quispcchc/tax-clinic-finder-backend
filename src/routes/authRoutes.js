const express = require('express');
const { register, login, resetPassword,  resetPasswordWithToken, changePassword } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/reset-password', resetPassword);
router.post('/reset-password/:token', resetPasswordWithToken);
router.put('/change-password/:userId', changePassword);

module.exports = router;

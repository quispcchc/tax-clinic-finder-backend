const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const nodemailer = require('../config/nodemailer');
const { Sequelize } = require('sequelize');

exports.register = async ({ username, email, password, role }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ username, email, password: hashedPassword, role });
  return { message: 'User registered successfully', user: newUser };
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { message: 'Login successful', token, user: { id: user.id, email: user.email } };
};

exports.resetPassword = async (email) => {
  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      throw new Error('User not found');
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000);

    await user.update({
      resetToken: resetToken,
      resetTokenExpiry: resetTokenExpiry
    });

    let resetUrl;
    if (process.env.NODE_ENV === 'development') {
      resetUrl = `http://localhost:4200/reset-password/${resetToken}`;
    } else {
      resetUrl = `https://frontend-dot-trillium-dashboard.nn.r.appspot.com/reset-password/${resetToken}`;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset link',
      text: `Hello ${user.username},\n\nWe received a request to reset the password for your account.\n\nTo reset your password, click on the link below:\n\n${resetUrl}`
    };

    nodemailer.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending email');
      }
    });

    return { success: true, message: 'Password reset email sent' };
  } catch (error) {
    throw new Error('Error processing password reset request');
  }
};

exports.resetPasswordWithToken = async (token, password) => {
  try {

    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpiry: { [Sequelize.Op.gt]: new Date() }
      }
    });

    if (!user) {
      throw new Error('Invalid or expired reset token');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    await user.update({
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null
    });

    return { success: true, message: 'Password has been reset' };
  } catch (error) {
    throw new Error('Error resetting password');
  }
};

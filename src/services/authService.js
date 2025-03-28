const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const nodemailer = require("../config/nodemailer");
const { Sequelize } = require("sequelize");
const { logger } = require("../config/logger");

exports.register = async ({ firstname, lastname, username, email, password, designation, role }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    firstname,
    lastname,
    username,
    email,
    password: hashedPassword,
    designation,
    role,
  });
  return { message: "User registered successfully", user: newUser };
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return {
    message: "Login successful",
    token,
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    email: user.email,
    designation: user.designation,
    role: user.role,
  };
};

exports.resetPassword = async (email) => {
  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return { success: false, message: "No account found with this email." };
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000);

    await user.update({
      resetToken: resetToken,
      resetTokenExpiry: resetTokenExpiry,
    });

    let resetUrl;
    if (process.env.NODE_ENV === "development") {
      resetUrl = `http://localhost:4200/reset-password/${resetToken}`;
    } else {
      resetUrl = `https://taxinics.centre-ebo.com/reset-password/${resetToken}`;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset link",
      text: `Hello ${user.username},\n\nWe received a request to reset the password for your account.\n\nTo reset your password, click on the link below:\n\n${resetUrl}`,
    };

    nodemailer.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        throw new Error("Error sending email");
      }
    });

    return { success: true, message: "A password reset link has been sent to your email."};
  } catch (error) {
    return { success: false, message: "Failed to process password reset request." };
  }
};

exports.resetPasswordWithToken = async (token, password) => {
  try {
    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpiry: { [Sequelize.Op.gt]: new Date() },
      },
    });

    if (!user) {
      throw new Error("Invalid or expired reset token");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    await user.update({
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    });

    return { success: true, message: "Password has been reset" };
  } catch (error) {
    throw new Error("Error resetting password");
  }
};

exports.changePassword = async (userId, currentPassword, newPassword) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new Error("Current password is incorrect");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    return { success: true, message: "Password changed successfully" };
  } catch (error) {
    throw new Error("Error changing password: " + error.message);
  }
};

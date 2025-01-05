const nodemailer = require('nodemailer');
require('dotenv').config();

// Set up the transport object (use the email provider SMTP settings)
const transporter = nodemailer.createTransport({
  service: 'Outlook365',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = transporter;

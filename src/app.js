const express = require('express');
const cors = require('cors');
const authMiddleware = require('./middleware/auth');
const clinicRoutes = require('./routes/clinicRoutes');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/clinics', authMiddleware, clinicRoutes); // Protected routes
app.use('/api/auth', authRoutes); // Public routes

// Test and Sync Database Connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected');
    return sequelize.sync(); // Sync models with the database
  })
  .then(() => console.log('Database synced'))
  .catch((err) => console.error('Database connection failed:', err));

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

module.exports = app;

// server.js
const express = require('express');
const dotenv = require('dotenv');
const app = require('./src/app');
const PORT = process.env.PORT || 3000;
const sequelize = require('./src/config/database');
const User = require('./src/models/User');  // Adjust model import

dotenv.config();

sequelize.sync({ force: false }).then(() => {  // Don't use force unless necessary
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err) => console.error('Database sync failed:', err));

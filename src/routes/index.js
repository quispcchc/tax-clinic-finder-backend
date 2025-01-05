const express = require('express');
const authRoutes = require('./authRoutes');
const clinicRoutes = require('./clinicRoutes'); // Placeholder for future API

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/clinics', clinicRoutes); // Placeholder for future routes

module.exports = router;

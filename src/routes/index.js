const express = require('express');
const authRoutes = require('./authRoutes');
const clinicRoutes = require('./clinicRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/tax-clinics', clinicRoutes);

module.exports = router;

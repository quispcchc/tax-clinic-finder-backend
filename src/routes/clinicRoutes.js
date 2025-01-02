const express = require('express');
const clinicController = require('../controllers/clinicController');

const router = express.Router();

// GET all clinics
router.get('/', clinicController.getClinics);

// POST a new clinic
router.post('/', clinicController.createClinic);

module.exports = router;

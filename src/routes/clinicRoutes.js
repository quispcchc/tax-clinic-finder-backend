const express = require('express');
const authMiddleware = require('../middlewares/auth');
const { getTaxClinics } = require('../controllers/clinicController');
const router = express.Router();

router.get('/', getTaxClinics);

module.exports = router;

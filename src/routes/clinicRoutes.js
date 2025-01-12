const express = require('express');
const authMiddleware = require('../middlewares/auth');
const { storeClinicData, getTaxClinics } = require('../controllers/clinicController');
const router = express.Router();


router.post('/store-clinic-data', storeClinicData);
router.get('/', getTaxClinics);

module.exports = router;

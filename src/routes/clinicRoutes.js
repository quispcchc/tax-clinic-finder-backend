const express = require('express');
const authMiddleware = require('../middlewares/auth');
const { storeClinicData } = require('../controllers/clinicController');
const router = express.Router();


router.post('/store-clinic-data', storeClinicData);

module.exports = router;

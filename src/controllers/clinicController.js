const { logger } = require('../config/logger');
const authService = require('../services/authService');
const clinicService = require('../services/clinicService');

exports.storeClinicData = async (req, res, next) => {
  try {
    const result = await authService.storeClinicData(req.body);
    res.status(201).json({ result });
  } catch (error) {
    next(error);
  }
};

exports.getTaxClinics = async (req, res, next) => {
  try {
    const result = await clinicService.getTaxClinics(req.body);
    res.status(201).json( result );
  } catch (error) {
    next(error);
  }
};

const { logger } = require('../config/logger');
const clinicService = require('../services/clinicService');

exports.getTaxClinics = async (req, res, next) => {
  try {
    const result = await clinicService.getTaxClinics(req.body);
    res.status(201).json( result );
  } catch (error) {
    next(error);
  }
};

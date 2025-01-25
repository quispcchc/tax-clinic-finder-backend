const { logger } = require('../config/logger');
const clinicService = require('../services/clinicService');

exports.getTaxClinics = async (req, res, next) => {
  try {
    const result = await clinicService.getTaxClinics();
    res.status(200).json( result );
  } catch (error) {
    logger.error('Error in getTaxClinics controller:', error);
    next(error);
  }
};

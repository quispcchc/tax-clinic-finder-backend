const { logger } = require('../config/logger');
const authService = require('../services/authService');

exports.storeClinicData = async (req, res, next) => {
  try {
    logger.info(`store clinic data:${req}`)
    const result = await authService.storeClinicData(req.body);
    res.status(201).json({ result });
  } catch (error) {
    next(error);
  }
};

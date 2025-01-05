const Clinic = require('../models/Clinic'); // Placeholder model

exports.getClinics = async (req, res, next) => {
  try {
    const clinics = await Clinic.findAll();
    res.status(200).json({ clinics });
  } catch (error) {
    next(error);
  }
};

const Clinic = require('../models/Clinic');

exports.getTaxClinics = async () => {
  try {

    const clinics = await Clinic.findAll();
    return clinics;

  } catch (error) {
    throw new Error('Error fetching tax clinic data from the database');
  }
};

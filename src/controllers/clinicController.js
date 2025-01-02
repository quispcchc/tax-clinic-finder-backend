const Clinic = require('../models/Clinic');

// Get all clinics
exports.getClinics = async (req, res) => {
  try {
    const clinics = await Clinic.findAll();
    res.json(clinics);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving clinics', error: err });
  }
};

// Create a new clinic
exports.createClinic = async (req, res) => {
  try {
    const clinic = await Clinic.create(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ message: 'Error creating clinic', error: err });
  }
};

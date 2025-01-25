const TaxClinic = require('../models/TaxClinic');
const TaxClinicLocation = require('../models/TaxClinicLocation');

exports.getTaxClinics = async () => {
  try {
    const clinics = await TaxClinic.findAll({
      include: [{
        model: TaxClinicLocation,
        as: 'locations',
        required: true,
      }]
    });

    return clinics;
  } catch (error) {
    throw new Error('Error fetching tax clinic data from the database');
  }
};

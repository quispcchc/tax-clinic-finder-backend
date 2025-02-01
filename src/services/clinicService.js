const TaxClinic = require("../models/TaxClinic");
const TaxClinicLocation = require("../models/TaxClinicLocation");
const { logger } = require("../config/logger");
const User = require("../models/User");

exports.getTaxClinics = async () => {
  try {
    const clinics = await TaxClinic.findAll({
      include: [
        {
          model: TaxClinicLocation,
          as: "locations",
          required: true,
        },
      ],
    });

    return clinics;
  } catch (error) {
    throw new Error("Error fetching tax clinic data from the database");
  }
};

exports.updateAppointmentAvailability = async (
  clinicId,
  appointmentAvailability
) => {
  try {
    const clinic = await TaxClinic.findByPk(clinicId);

    if (!clinic) {
      throw new Error("Clinic not found");
    }

    clinic.appointment_available = appointmentAvailability;

    await clinic.save();
    return clinic;
  } catch (error) {
    throw new Error("Error updating appointment availability");
  }
};

exports.getUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error("Error fetching users from the database");
  }
};

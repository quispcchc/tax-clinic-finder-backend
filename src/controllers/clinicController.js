const { logger } = require("../config/logger");
const clinicService = require("../services/clinicService");

exports.getTaxClinics = async (req, res, next) => {
  try {
    const result = await clinicService.getTaxClinics();
    res.status(200).json(result);
  } catch (error) {
    logger.error("Error in getTaxClinics controller:", error);
    next(error);
  }
};

exports.updateAppointmentAvailability = async (req, res, next) => {
  const { id, appointmentAvailability } = req.body;

  if (!appointmentAvailability) {
    return res
      .status(400)
      .json({ error: "Appointment Availability is required" });
  }

  try {
    const updatedClinicAvailability =
      await clinicService.updateAppointmentAvailability(
        id,
        appointmentAvailability
      );

    res.status(200).json(updatedClinicAvailability);
  } catch (error) {
    logger.error("Error in updateAppointmentAvailability controller:", error);
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const result = await clinicService.getUsers();
    res.status(200).json(result);
  } catch (error) {
    logger.error("Error in getUsers controller:", error);
    next(error);
  }
};

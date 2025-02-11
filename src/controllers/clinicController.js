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

exports.createTaxClinic = async (req, res, next) => {
  try {
    const clinic = await clinicService.createTaxClinic(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    logger.error("Error in createTaxClinic controller:", error);
    next(error);
  }
};

exports.updateTaxClinic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedClinic = await clinicService.updateTaxClinic(id, req.body);
    res.status(200).json(updatedClinic);
  } catch (error) {
    logger.error("Error in updateTaxClinic controller:", error);
    next(error);
  }
};

exports.deleteTaxClinic = async (req, res, next) => {
  try {
    const { id } = req.params;
    await clinicService.deleteTaxClinic(id);
    res.status(200).json({ message: "clinic deleted successfully" });
  } catch (error) {
    logger.error("Error in deleteTaxClinic controller:", error);
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

exports.createUser = async (req, res, next) => {
  try {
    const user = await clinicService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    logger.error("Error in createUser controller:", error);
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await clinicService.updateUser(id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    logger.error("Error in updateUser controller:", error);
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await clinicService.deleteUser(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    logger.error("Error in deleteUser controller:", error);
    next(error);
  }
};

exports.saveFilteredData = async (req, res, next) => {
  try {
    const client = await clinicService.saveFilteredData(req.body);
    res.status(201).json(client);
  } catch (error) {
    logger.error("Error in saveFilteredData controller:", error);
    next(error);
  }
};

exports.exportClientLogs =  async (req, res) => {
  const { exportType, startDate, endDate } = req.query;

  if (!exportType) {
    return res.status(400).json({ error: 'Export type is required' });
  }

  try {

    const clients = await clinicService.exportClientLogs(exportType, startDate, endDate);

    if (clients.length === 0) {
      return res.status(404).json({ message: 'No data found for the selected range' });
    }

    res.json(clients);
  } catch (error) {
    console.error('Error exporting client logs:', error);
    res.status(500).json({ error: 'Failed to export client data. Please try again.' });
  }
};


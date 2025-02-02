const TaxClinic = require("../models/TaxClinic");
const TaxClinicLocation = require("../models/TaxClinicLocation");
const { logger } = require("../config/logger");
const User = require("../models/User");
const bcrypt = require("bcrypt");

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

exports.createUser = async (userData) => {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    logger.info(`userDatais:${JSON.stringify(userData)}`)
    const newUser = await User.create({
      firstname: userData.firstname,
      lastname: userData.lastname,
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
      designation: userData.designation,
      role: userData.role,
    });

    return newUser;
  } catch (error) {
    throw new Error("Error creating user in the database");
  }
};

exports.updateUser = async (id, userData) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }

    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    await user.update({
      firstname: userData.firstname,
      lastname: userData.lastname,
      username: userData.username,
      email: userData.email,
      password: userData.password,
      designation: userData.designation,
      role: userData.role,
    });

    return user;
  } catch (error) {
    throw new Error("Error updating user in the database");
  }
};

exports.deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }

    await user.destroy();
  } catch (error) {
    throw new Error("Error deleting user from the database");
  }
};

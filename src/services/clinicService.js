const TaxClinic = require("../models/TaxClinic");
const TaxClinicLocation = require("../models/TaxClinicLocation");
const { logger } = require("../config/logger");
const User = require("../models/User");
const Client = require("../models/Client");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { Op } = require('sequelize');

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

const formatArrayToString = (value) => (Array.isArray(value) ? value.join(', ') : value);

exports.createTaxClinic = async (clinicData) => {
  try {
    const newClinic = await TaxClinic.create({
      organization_name: clinicData.organizationName,
      organisation_website: clinicData.organisationWebsite,
      organisation_email: clinicData.organisationalEmail,
      contact_person_name: clinicData.contactPersonName,
      contact_person_title: clinicData.contactPersonTitle,
      contact_email: clinicData.contactEmail,
      appointment_available: clinicData.appointmentAvailability,
      listed_on_cra: clinicData.listedOnCra,
      visible_on_nceo: clinicData.visibleOnNceo,
      alternate_contact_name: clinicData.alternateContactName,
      alternate_contact_title: clinicData.alternateContactTitle,
      alternate_contact_email: clinicData.alternateContactEmail,
      alternate_contact_phone: clinicData.alternateContactPhone,
      public_info: clinicData.publicInfo,
      clinic_types: formatArrayToString(clinicData.clinicTypes),
      wheelchair_accessible: clinicData.wheelchairAccessible,
      serve_people_from: clinicData.servePeopleFrom,
      catchment_area: clinicData.catchmentArea,
      months_offered: formatArrayToString(clinicData.monthsOffered),
      date_and_time_of_operation: clinicData.hoursAndDate,
      hours_of_operation: formatArrayToString(clinicData.hoursOfOperation),
      days_of_operation: formatArrayToString(clinicData.daysOfOperation),
      year_round_service: clinicData.yearRoundService,
      population_served: formatArrayToString(clinicData.populationServed),
      service_languages: formatArrayToString(clinicData.serviceLanguages),
      tax_years_prepared: formatArrayToString(clinicData.taxYearsPrepared),
      residency_tax_year: formatArrayToString(clinicData.residencyTaxYear),
      serve_people: formatArrayToString(clinicData.servePeople),
      eligibility_webpage_available: clinicData.eligibilityWebpageAvailable,
      eligibility_criteria_webpage: clinicData.eligibilityCriteriaWebpage,
      eligibility_criteria_file: clinicData.eligibilityCriteriaFile,
      other_branches: clinicData.otherBranches,
      booking_process: formatArrayToString(clinicData.bookingProcess),
      booking_days_hours: clinicData.bookingDaysHours,
      booking_contact_phone: clinicData.bookingContactPhone,
      booking_contact_email: clinicData.bookingContactEmail,
      online_booking_link: clinicData.onlineBookingLink,
      useful_online_booking: clinicData.usefulOnlineBooking,
      required_documents: clinicData.requiredDocuments,
      help_with_missing_docs: formatArrayToString(clinicData.helpWithMissingDocs),
      tax_preparers: formatArrayToString(clinicData.taxPreparers),
      tax_filers: formatArrayToString(clinicData.taxFilers),
      volunteer_roles: formatArrayToString(clinicData.volunteerRoles),
      clinic_capacity: clinicData.clinicCapacity,
      additional_support: formatArrayToString(clinicData.additionalSupport),
      comments: clinicData.comments,
    });

    let locations = [];
    if (clinicData.locations && clinicData.locations.length > 0) {
      const locationData = clinicData.locations.map((loc) => ({
        tax_clinic_id: newClinic.id,
        street: loc.street,
        city: loc.city,
        state: loc.state,
        postal_code: loc.postalCode,
      }));
      locations = await TaxClinicLocation.bulkCreate(locationData);
    }

    const clinicWithLocations = await TaxClinic.findByPk(newClinic.id, {
      include: [{ model: TaxClinicLocation, as: "locations" }],
    });

    return clinicWithLocations;
  } catch (error) {
    console.error("Error creating tax clinic:", error);
    throw new Error("Error creating clinic in the database");
  }
};

exports.updateTaxClinic = async (id, clinicData) => {
  try {
    const clinic = await TaxClinic.findByPk(id, {
      include: [{ model: TaxClinicLocation, as: "locations" }],
    });

    if (!clinic) {
      throw new Error("Clinic not found");
    }

    await clinic.update({
      organization_name: clinicData.organization_name,
      organisation_website: clinicData.organisation_website,
      organisation_email: clinicData.organisation_email,
      contact_person_name: clinicData.contact_person_name,
      contact_person_title: clinicData.contact_person_title,
      contact_email: clinicData.contact_email,
      appointment_available: clinicData.appointment_available,
      listed_on_cra: clinicData.listed_on_cra,
      visible_on_nceo: clinicData.visible_on_nceo,
      alternate_contact_name: clinicData.alternate_contact_name,
      alternate_contact_title: clinicData.alternate_contact_title,
      alternate_contact_email: clinicData.alternate_contact_email,
      alternate_contact_phone: clinicData.alternate_contact_phone,
      public_info: clinicData.public_info,
      clinic_types: formatArrayToString(clinicData.clinic_types),
      wheelchair_accessible: clinicData.wheelchair_accessible,
      serve_people_from: clinicData.serve_people_from,
      catchment_area: clinicData.catchment_area,
      months_offered: formatArrayToString(clinicData.months_offered),
      date_and_time_of_operation: clinicData.date_and_time_of_operation,
      hours_of_operation: formatArrayToString(clinicData.hours_of_operation),
      days_of_operation: formatArrayToString(clinicData.days_of_operation),
      year_round_service: clinicData.year_round_service,
      population_served: formatArrayToString(clinicData.population_served),
      service_languages: formatArrayToString(clinicData.service_languages),
      tax_years_prepared: formatArrayToString(clinicData.tax_years_prepared),
      residency_tax_year: formatArrayToString(clinicData.residency_tax_year),
      serve_people: formatArrayToString(clinicData.serve_people),
      eligibility_webpage_available: clinicData.eligibility_webpage_available,
      eligibility_criteria_webpage: clinicData.eligibility_criteria_webpage,
      eligibility_criteria_file: clinicData.eligibility_criteria_file,
      other_branches: clinicData.other_branches,
      booking_process: formatArrayToString(clinicData.booking_process),
      booking_days_hours: clinicData.booking_days_hours,
      booking_contact_phone: clinicData.booking_contact_phone,
      booking_contact_email: clinicData.booking_contact_email,
      online_booking_link: clinicData.online_booking_link,
      useful_online_booking: clinicData.useful_online_booking,
      required_documents: clinicData.required_documents,
      help_with_missing_docs: formatArrayToString(clinicData.help_with_missing_docs),
      tax_preparers: formatArrayToString(clinicData.tax_preparers),
      tax_filers: formatArrayToString(clinicData.tax_filers),
      volunteer_roles: formatArrayToString(clinicData.volunteer_roles),
      clinic_capacity: clinicData.clinic_capacity,
      additional_support: formatArrayToString(clinicData.additional_support),
      comments: clinicData.comments,
    });
    
    if (clinicData.locations && clinicData.locations.length > 0) {
      await TaxClinicLocation.destroy({ where: { tax_clinic_id: id } });

      const locations = clinicData.locations.map((location) => ({
        tax_clinic_id: id,
        street: location.street,
        city: location.city,
        state: location.state,
        postal_code: location.postal_code,
      }));

      await TaxClinicLocation.bulkCreate(locations);
    }

    const updatedClinic = await TaxClinic.findByPk(id, {
      include: [{ model: TaxClinicLocation, as: "locations" }],
    });
 
    return updatedClinic;
  } catch (error) {
    throw new Error("Error updating tax clinic in the database");
  }
};

exports.deleteTaxClinic = async (id) => {
  try {
    const clinic = await TaxClinic.findByPk(id);
    if (!clinic) {
      throw new Error("clinic not found");
    }

    await clinic.destroy();
  } catch (error) {
    throw new Error("Error deleting clinic from the database");
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
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    return users;
  } catch (error) {
    throw new Error("Error fetching users from the database");
  }
};

exports.createUser = async (userData) => {
  try {
    const existingUserEmail = await User.findOne({ where: { email: userData.email } });
    if (existingUserEmail) {
      throw new Error('Email already exists');
    }
    const existingUsername = await User.findOne({ where: { username: userData.username } });
    if (existingUsername) {
      throw new Error('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
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
    logger.error(`Error in user service: ${error.message}`);
    throw new Error(error.message);
  }
};

exports.updateUser = async (id, userData) => {
  try {

    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
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
    throw new Error(ErrorEvent.message);
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

exports.saveFilteredData = async (clientData) => {
  try {
    const isNewClient = true;

    if (isNewClient) {
      const newClientId = uuidv4().split("-")[0];

      const newClient = await Client.create({
        client_id: newClientId,
        ...clientData,
      });

      return newClient;
    }
  } catch (error) {
    logger.error(`Error in client service: ${error.message}`);
    throw new Error(error.message);
  }
};

exports.updateFilteredData = async (
  clientId,
  clientData
) => {
  try {
    const clientDetails = await Client.findOne({ where: { client_id: clientId } });

    if (!clientDetails) {
      throw new Error("client id not found");
    }
    let updateData = {};

    if (clientData.assigned_clinic !== undefined) {
      updateData.assigned_clinic = clientData.assigned_clinic;
    }
    if (clientData.unassigned_clinic !== undefined) {
      updateData.unassigned_clinic = clientData.unassigned_clinic;
    }
    if (Object.keys(updateData).length === 0) {
      throw new Error("No valid fields to update");
    }

    await Client.update(updateData, { where: { client_id: clientId } });

    const updatedClient = await Client.findOne({ where: { client_id: clientId } });

    return updatedClient;
  } catch (error) {
    logger.error(`Error updating client data: ${error.message}`);
    throw new Error("Error updating client details");
  }
};

exports.exportClientLogs = async (exportType, startDate, endDate) => {
  try {
    let whereCondition = {};

    if (exportType === "byDate" && startDate && endDate) {

      const start = new Date(`${startDate}T00:00:00.000Z`);
      const end = new Date(`${endDate}T23:59:59.999Z`);

      whereCondition.created_date = {
        [Op.between]: [start, end],
      };
    }

    const clients = await Client.findAll({
      where: whereCondition,
      raw: true,
    });

    return clients;
  } catch (error) {
    console.error("Error fetching client data:", error);
    throw new Error("Failed to fetch client data");
  }
};

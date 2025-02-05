const TaxClinic = require("../models/TaxClinic");
const TaxClinicLocation = require("../models/TaxClinicLocation");
const { logger } = require("../config/logger");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { cli } = require("winston/lib/winston/config");

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

    if (clinicData.locations && clinicData.locations.length > 0) {
      const locations = clinicData.locations.map((loc) => ({
        tax_clinic_id: newClinic.id,
        street: loc.street,
        city: loc.city,
        state: loc.state,
        postal_code: loc.postalCode,
      }));
      await TaxClinicLocation.bulkCreate(locations);
    }

    return newClinic;
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
      organization_name: clinicData.organizationName,
      organization_contact: clinicData.organizationContact,
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
      clinic_types: clinicData.clinicTypes,
      wheelchair_accessible: clinicData.wheelchairAccessible,
      serve_people_from: clinicData.servePeopleFrom,
      catchment_area: clinicData.catchmentArea,
      months_offered: clinicData.monthsOffered,
      hours_of_operation: clinicData.hoursOfOperation,
      year_round_service: clinicData.yearRoundService,
      population_served: clinicData.populationServed,
      service_languages: clinicData.serviceLanguages,
      tax_years_prepared: clinicData.taxYearsPrepared,
      residency_tax_year: clinicData.residencyTaxYear,
      serve_people: clinicData.servePeople,
      eligibility_webpage_available: clinicData.eligibilityWebpageAvailable,
      eligibility_criteria_webpage: clinicData.eligibilityCriteriaWebpage,
      booking_process: clinicData.bookingProcess,
      booking_days_hours: clinicData.bookingDaysHours,
      booking_contact_phone: clinicData.bookingContactPhone,
      booking_contact_email: clinicData.bookingContactEmail,
      online_booking_link: clinicData.onlineBookingLink,
      useful_online_booking: clinicData.usefulOnlineBooking,
      required_documents: clinicData.requiredDocuments,
      help_with_missing_docs: clinicData.helpWithMissingDocs,
      tax_preparers: clinicData.taxPreparers,
      tax_filers: clinicData.taxFilers,
      volunteer_roles: clinicData.volunteerRoles,
      clinic_capacity: clinicData.clinicCapacity,
      additional_support: clinicData.additionalSupport,
      comments: clinicData.comments,
    });

    if (clinicData.locations && clinicData.locations.length > 0) {
      await TaxClinicLocation.destroy({ where: { tax_clinic_id: id } });

      const locations = clinicData.locations.map((location) => ({
        tax_clinic_id: id,
        street: location.street,
        city: location.city,
        state: location.state,
        postal_code: location.postalCode,
      }));

      await TaxClinicLocation.bulkCreate(locations);
    }

    return clinic;
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

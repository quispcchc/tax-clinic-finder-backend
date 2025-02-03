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

exports.createTaxClinic = async (clinicData) => {
  try {

    const newClient = await TaxClinic.create({
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
        locations: clinicData.locations,
      },
      {
        include: [
          {
            model: TaxClinicLocation,
            as: "locations",
          },
        ],
      }
    );
    return newClient;
  } catch (error) {
    throw new Error("Error creating client in the database");
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
    logger.error(`error in clinic service, ${error}` );
    throw new Error("Error creating user in the database",error);
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

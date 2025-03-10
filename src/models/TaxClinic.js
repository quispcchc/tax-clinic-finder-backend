const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class TaxClinic extends Model {}

TaxClinic.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    organization_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    organisation_website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    organisation_email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contact_person_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact_person_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    appointment_available: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    listed_on_cra: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    visible_on_nceo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alternate_contact_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alternate_contact_title : {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alternate_contact_email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alternate_contact_phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    public_info: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clinic_types: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    wheelchair_accessible: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    serve_people_from: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    catchment_area: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    months_offered: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date_and_time_of_operation : {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    hours_of_operation: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    days_of_operation: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    year_round_service: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    population_served: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    service_languages: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tax_years_prepared: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    residency_tax_year: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    serve_people: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    eligibility_webpage_available: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    eligibility_criteria_webpage: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    eligibility_criteria_file: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    other_branches: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    booking_process: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    booking_days_hours: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    booking_contact_phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    booking_contact_email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    online_booking_link: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    useful_online_booking: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    required_documents: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    help_with_missing_docs: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tax_preparers: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tax_filers: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    volunteer_roles: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    clinic_capacity: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    additional_support: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    catchment_boundaries: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "tax_clinics",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = TaxClinic;

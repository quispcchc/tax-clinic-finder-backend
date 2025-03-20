const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Client = sequelize.define('Client', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  client_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  low_income: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  special_cases: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  supported_tax_years: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  province_of_residence: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  type_of_clinic: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  wheelchair_accessible: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  hours_of_operation: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  days_of_operation: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  language_options: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  client_postal_code: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  population_serve: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  clinics_listed: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  assigned_clinic: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  unassigned_clinic: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_by: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'clients',
  timestamps: true,
  createdAt: 'created_date',
});

module.exports = Client;

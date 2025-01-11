const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Clinic = sequelize.define('Clinic', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  clinic_name: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
  clinic_address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  appointments_available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  language_requirements: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  appointment_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  population_eligibility: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  required_documents: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'tax_clinics',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Clinic;

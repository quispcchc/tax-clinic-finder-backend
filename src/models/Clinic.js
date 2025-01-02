const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Clinic = sequelize.define('Clinic', {
  name: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  province: { type: DataTypes.STRING, allowNull: false },
  postalCode: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  languages: { type: DataTypes.ARRAY(DataTypes.STRING) },
  services: { type: DataTypes.ARRAY(DataTypes.STRING) },
  appointmentAvailable: { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = Clinic;

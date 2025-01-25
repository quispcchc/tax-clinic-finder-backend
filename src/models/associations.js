const TaxClinic = require("./TaxClinic");
const TaxClinicLocation = require("./TaxClinicLocation");

TaxClinic.hasMany(TaxClinicLocation, {
  foreignKey: 'tax_clinic_id',
  as: 'locations',
});

TaxClinicLocation.belongsTo(TaxClinic, {
  foreignKey: 'tax_clinic_id',
  as: 'clinic',
});

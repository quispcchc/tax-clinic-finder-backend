const express = require('express');
const { logger } = require("../config/logger");
const authMiddleware = require("../middlewares/auth");
const { register, login, resetPassword,  resetPasswordWithToken, changePassword } = require('../controllers/authController');
const {
    getTaxClinics,
    updateAppointmentAvailability,
    getUsers,
    createTaxClinic,
    updateTaxClinic,
    deleteTaxClinic,
    createUser,
    updateUser,
    deleteUser,
    saveFilteredData,
    exportClientLogs,
    updateFilteredData,
  } = require("../controllers/clinicController");

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/reset-password', resetPassword);
router.post('/reset-password/:token', resetPasswordWithToken);
router.put('/change-password/:userId', changePassword);
router.get('/tax-clinics', getTaxClinics);
router.post('/create-clinic', createTaxClinic);
router.put('/:id', updateTaxClinic);
router.delete('/:id', deleteTaxClinic);
router.put('/update-availability/:id', updateAppointmentAvailability);
router.get('/users', getUsers);
router.post('/create-user', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/save-filters', saveFilteredData);
router.put('/update-filters/:id', updateFilteredData);
router.get('/export-logs', exportClientLogs);

module.exports = router;

const express = require("express");
const authMiddleware = require("../middlewares/auth");
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

router.get("/", getTaxClinics);
router.post("/create-clinic", createTaxClinic);
router.put("/:id", updateTaxClinic);
router.delete("/:id", deleteTaxClinic);
router.put("/update-availability/:id", updateAppointmentAvailability);
router.get("/users", getUsers);
router.post("/create-user", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.post("/save-filters", saveFilteredData);
router.put("/update-filters/:id", updateFilteredData);
router.get('/export-logs', exportClientLogs);

module.exports = router;

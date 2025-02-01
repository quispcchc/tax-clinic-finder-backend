const express = require("express");
const authMiddleware = require("../middlewares/auth");
const {
  getTaxClinics,
  updateAppointmentAvailability,
  getUsers,
} = require("../controllers/clinicController");
const router = express.Router();

router.get("/", getTaxClinics);
router.put("/:id", updateAppointmentAvailability);
router.get("/users", getUsers);

module.exports = router;

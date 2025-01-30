const express = require("express");
const authMiddleware = require("../middlewares/auth");
const {
  getTaxClinics,
  updateAppointmentAvailability,
} = require("../controllers/clinicController");
const router = express.Router();

router.get("/", getTaxClinics);
router.put("/:id", updateAppointmentAvailability);

module.exports = router;

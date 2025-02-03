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
} = require("../controllers/clinicController");
const router = express.Router();

router.get("/", getTaxClinics);
router.post("/create-clinic", createTaxClinic);
router.put("/:id", updateTaxClinic);
router.delete("/:id", deleteTaxClinic);
router.put("/:id", updateAppointmentAvailability);
router.get("/users", getUsers);
router.post("/create-user", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;

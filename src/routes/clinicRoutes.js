const express = require("express");
const authMiddleware = require("../middlewares/auth");
const {
  getTaxClinics,
  updateAppointmentAvailability,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/clinicController");
const router = express.Router();

router.get("/", getTaxClinics);
router.put("/:id", updateAppointmentAvailability);
router.get("/users", getUsers);
router.post("/create-user", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;

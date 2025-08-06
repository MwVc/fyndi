const express = require("express");
const router = express.Router();

const {
  createService,
  getAllServices,
  getServiceById,
  updateService,
} = require("../controllers/serviceController");
const verifyToken = require("../middleware/verifyToken");

router.get("/", getAllServices);
router.post("/create", verifyToken, createService);
router.get("/:id", getServiceById);
router.put("/:id", verifyToken, updateService);

module.exports = router;

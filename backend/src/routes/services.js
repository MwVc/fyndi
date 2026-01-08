const express = require("express");
const servicesRouter = express.Router();

const {
  createService,
  getAllServices,
  getServiceById,
  updateService,
} = require("../controllers/serviceController");
import verifyToken from "../middleware/verifyToken";

servicesRouter.get("/", getAllServices);
servicesRouter.post("/create", verifyToken, createService);
servicesRouter.get("/:id", getServiceById);
servicesRouter.put("/:id", verifyToken, updateService);

module.exports = router;

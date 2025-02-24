import express from "express";
import {
  createUnit,
  getUnitsByListing,
  updateUnitAvailability,
} from "../controllers/unitsController.js";
import { auth, authorize } from "../middleware/auth.js";
const unitsRouters = express.Router();

unitsRouters.post("/", auth, authorize(["vendor"]), createUnit);
unitsRouters.get("/:listingId", getUnitsByListing);
unitsRouters.put("/:unitId/availability", updateUnitAvailability);

export default unitsRouters;

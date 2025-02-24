import expres from "express";
const listingRouters = expres.Router();
import {
  createListing,
  getListings,
  getListing,
  deleteListing,
  approveListing,
  updateListing,
} from "../controllers/listingController.js";
import { auth, authorize } from "../middleware/auth.js";

listingRouters.post("/", auth, authorize(["vendor"]), createListing);
listingRouters.get("/", auth, getListings);
listingRouters.get("/:id", getListing);
listingRouters.put("/:id", auth, authorize(["vendor"]), updateListing);
listingRouters.delete(
  "/:id",
  auth,
  authorize(["vendor", "admin"]),
  deleteListing
);
listingRouters.patch(
  "/:id/approve",
  auth,
  authorize(["admin"]),
  approveListing
);

export default listingRouters;

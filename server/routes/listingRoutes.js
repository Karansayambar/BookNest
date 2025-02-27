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
import upload from "../config/multer.js";

listingRouters.post(
  "/",
  auth,
  authorize(["vendor"]),
  upload.array("images", 5),
  createListing
);
listingRouters.get("/", auth, getListings);
listingRouters.get("/:vendorId", auth, getListing);
listingRouters.put("/:vendorId", auth, authorize(["vendor"]), updateListing);
listingRouters.delete(
  "/:vendorId",
  auth,
  authorize(["vendor", "admin"]),
  upload.array("images", 5),
  deleteListing
);
listingRouters.patch(
  "/:id/approve",
  auth,
  authorize(["admin"]),
  approveListing
);

export default listingRouters;

import express from "express";
import { createBooking } from "../controllers/bookingController.js";
import { auth, authorize } from "../middleware/auth.js";

const bookingRoutes = express.Router();

bookingRoutes.post("/", auth, authorize(["customer"]), createBooking);

export default bookingRoutes;

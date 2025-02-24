import Booking from "../models/bookingSchemas.js";
import Listing from "../models/ListingSchemas.js";
import Unit from "../models/unitsSchemas.js";
import { calculateTotalPrice } from "../utils/calculateTotalPrice.js";
import { updateUnitAvailability } from "../utils/updateUnitAvailability.js";

// import { sendBookingConfirmationEmail } from "../utils/emailService.js";

export const createBooking = async (req, res) => {
  try {
    const { listingId, unitId, startDate, endDate, guestCount } = req.body;
    const customerId = req.user._id;

    // Validate required fields
    if (!listingId || !unitId || !startDate || !endDate || !guestCount) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Validate date range
    if (new Date(startDate) >= new Date(endDate)) {
      return res
        .status(400)
        .json({ error: "End date must be after start date." });
    }

    // Check if listing exists
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found." });
    }

    // Check if unit exists
    const unit = await Unit.findById(unitId);
    if (!unit) {
      return res.status(404).json({ error: "Unit not found." });
    }
    // Calculate total price
    const totalPrice = calculateTotalPrice(unit.price, startDate, endDate);

    // Create booking
    const booking = new Booking({
      customerId,
      listingId,
      unitId,
      startDate,
      endDate,
      guestCount,
      totalPrice,
      status: "pending", // Default status
      paymentStatus: "pending", // Default payment status
    });

    await booking.save();

    // Update unit availability
    await updateUnitAvailability(unitId, startDate, endDate, guestCount);
    // console.log(" i am here bunny");

    // Send confirmation email (if implemented)
    // await sendBookingConfirmationEmail(req.user.email, booking);

    res.status(201).json({
      message: "Booking created successfully.",
      booking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default createBooking;

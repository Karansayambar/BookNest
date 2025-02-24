import Listing from "../models/ListingSchemas.js";
import Unit from "../models/unitsSchemas.js";

const createUnit = async (req, res) => {
  try {
    console.log("i am here");
    const { listingId, type, capacity, price, totalUnits, availability } =
      req.body;

    // Check if listing exists
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    const unit = new Unit({
      listingId,
      type,
      capacity,
      price,
      totalUnits,
      availability,
    });

    await unit.save();

    res.status(201).json({
      message: "Unit created successfully",
      unit,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUnitsByListing = async (req, res) => {
  try {
    const { listingId } = req.params;

    const units = await Unit.find({ listingId });

    if (!units.length) {
      return res.status(404).json({ error: "No units found for this listing" });
    }

    res.status(200).json({ units });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUnitAvailability = async (req, res) => {
  try {
    const { unitId } = req.params;
    const { availability } = req.body;

    const unit = await Unit.findByIdAndUpdate(
      unitId,
      { availability },
      { new: true }
    );

    if (!unit) {
      return res.status(404).json({ error: "Unit not found" });
    }

    res.status(200).json({
      message: "Unit availability updated successfully",
      unit,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createUnit, getUnitsByListing, updateUnitAvailability };

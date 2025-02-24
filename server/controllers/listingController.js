import Listing from "../models/ListingSchemas.js";

const createListing = async (req, res) => {
  try {
    console.log("i am here");
    const listing = new Listing({
      ...req.body,
      vendorId: req.user._id,
    });
    console.log("listing", listing);
    await listing.save();
    res.status(201).json({
      message: "Listing Created Successfully",
      listing,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

const getListings = async (req, res) => {
  try {
    const { type, city, priceMin, priceMax, status } = req.query;
    const query = {};
    if (status) query.status = status;
    if (type) query.type = type;
    if (city) query["address.city"] = new RegExp(city, "i");
    if (priceMin || priceMax) {
      query["pricing.basePrice"] = {};
      if (priceMin) query["pricing.basePrice"].$gte = Number(priceMin);
      if (priceMax) query["pricing.basePrice"].$lte = Number(priceMax);
    }

    const listings = await Listing.find(query)
      .populate("vendorId", "name email")
      .sort("-createdAt");

    console.log("Listings Found:", listings.length);

    return res.status(200).json({
      message: "Listings fetched successfully",
      listings,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getListing = async (req, res) => {
  try {
    console.log("Query Params:", req.query);

    const listing = await Listing.findById(req.params.id).populate(
      "vendorId",
      "name email"
    );
    console.log("Vendor:", listing);

    if (!listing) {
      return res.status(404).json({
        error: "Listing Not Found",
      });
    }

    return res.status(200).json({
      message: "Listing of item fetched successfully",
      listing,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    // Check if the listing exists and belongs to the vendor
    const listing = await Listing.findOne({ _id: id, vendorId: req.user._id });
    if (!listing) {
      return res.status(404).json({
        error: "Listing not found or you are not authorized to update it.",
      });
    }

    // Update the listing
    const updatedListing = await Listing.findByIdAndUpdate(id, updates, {
      new: true,
    });

    return res.status(200).json({
      message: "Listing updated successfully",
      listing: updatedListing,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found." });
    }

    if (
      req.user.role === "vendor" &&
      listing.vendorId.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this listing." });
    }

    // Delete the listing
    await Listing.findByIdAndDelete(id);

    return res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const approveListing = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the listing exists
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found." });
    }

    // Update the listing status to "approved"
    listing.status = "approved";
    await listing.save();

    return res
      .status(200)
      .json({ message: "Listing approved successfully", listing });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export {
  createListing,
  getListings,
  getListing,
  deleteListing,
  updateListing,
  approveListing,
};

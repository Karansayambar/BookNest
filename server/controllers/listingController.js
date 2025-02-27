import cloudinary from "../config/cloudinary.js";
import Listing from "../models/ListingSchemas.js";

const createListing = async (req, res) => {
  try {
    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path);
        return result.secure_url;
      })
    );

    const listing = new Listing({
      ...req.body,
      vendorId: req.user._id,
      images: uploadedImages,
    });

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

export default createListing;

const getListings = async (req, res) => {
  try {
    const { type, city, priceMin, priceMax, status } = req.query;
    const query = {};
    if (status) query.status = status;
    if (type) query.type = type;
    if (city) query["address.city"] = new RegExp(city, "i");
    if (priceMin || priceMax) {
      vendorId;
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
    const { vendorId } = req.params;

    if (!vendorId) {
      return res.status(400).json({ error: "Vendor ID is required" });
    }

    const listing = await Listing.find({ vendorId }).populate(
      "vendorId",
      "name email"
    );

    if (!listing) {
      return res.status(404).json({ error: "Listing Not Found" });
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
    const { vendorId } = req.params;
    console.log("Raw req.body:", req.body); // Debugging
    console.log("Received files:", req.files); // Debugging

    if (!vendorId) {
      return res.status(400).json({ error: "Vendor ID is required" });
    }

    let updates = { ...req.body };

    // Ensure numeric values are correctly parsed
    if (updates.basePrice) updates.basePrice = Number(updates.basePrice);

    // If images were uploaded, get Cloudinary URLs
    if (req.files && req.files.length > 0) {
      updates.images = req.files.map((file) => file.path); // Cloudinary returns the file URL in `path`
    }

    const listing = await Listing.findOne({ vendorId });

    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      listing._id,
      updates,
      { new: true }
    );

    console.log("Updated Listing:", updatedListing);
    return res.status(200).json({
      message: "Listing updated successfully",
      listing: updatedListing,
    });
  } catch (error) {
    console.error("Error updating listing:", error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteListing = async (req, res) => {
  try {
    const { vendorId } = req.params;
    console.log("id", req.params);

    const listing = await Listing.findById(vendorId);
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
    console.log("i am here");
    await Listing.findByIdAndDelete(vendorId);
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

import mongoose from "mongoose";

const ListingSchemas = mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["hotel", "restaurant"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  description: {
    type: String,
  },
  facilities: [String],
  images: [String],
  pricing: {
    basePrice: Number,
    currency: { type: String, default: "INR" },
  },
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

export default mongoose.model("Listing", ListingSchemas);

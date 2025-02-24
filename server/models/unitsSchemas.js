import mongoose from "mongoose";

const unitSchema = new mongoose.Schema({
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    required: true,
    index: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["single", "double", "suite", "deluxe"],
  },
  capacity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  totalUnits: {
    type: Number,
    required: true,
  },
  availability: [
    {
      date: {
        type: Date,
        required: true,
        index: true,
      },
      availableUnits: {
        type: Number,
        required: true,
      },
    },
  ],
});

export default mongoose.model("Unit", unitSchema);

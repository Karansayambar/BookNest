import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import { ApiError } from "../utils/ApiError.js";
import Listing from "../models/ListingSchemas.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer", "").trim();
    if (!token) {
      throw new ApiError(401, "Authentication token required");
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded._id).select("-password");
      if (!user) {
        throw new ApiError(401, "User not found");
      }

      if (user.tokenVersion !== decoded.tokenVersion) {
        throw new ApiError(401, "Token expired");
      }
      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      throw new ApiError(401, "Invalid authentication token");
    }
  } catch (error) {
    next(error);
  }
};

export const authorize = (role = []) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, "User not authenticated");
    }
    if (!role.includes(req.user.role)) {
      throw new ApiError(403, "Unauthorized access");
    }
    next();
  };
};

export const authorizeVendor = async (req, res, next) => {
  try {
    const listingId = req.params.listingId || req.body.listingId;

    if (!listingId) {
      throw new ApiError(400, "Listing ID required");
    }
    const listing = await Listing.findById(listingId);
    if (!listing) {
      throw new ApiError(404, "Listing not found");
    }
    if (listing.vendorId.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "Unauthorized access to this listing");
    }
    req.listing = listing;
    next();
  } catch (error) {
    next(error);
  }
};

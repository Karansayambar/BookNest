import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Helper function to save listings to localStorage
const saveListingsToLocalStorage = (listings) => {
  localStorage.setItem("listings", JSON.stringify(listings));
};

// Helper function to load listings from localStorage
const loadListingsFromLocalStorage = () => {
  const listings = localStorage.getItem("listings");
  return listings ? JSON.parse(listings) : [];
};

// Create listing
export const createListing = createAsyncThunk(
  "listing/createListing",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        "https://book-nest-nkia.vercel.app/api/listing/",
        formData,
        config
      );
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Fetch listings
export const fetchListings = createAsyncThunk(
  "listings/fetchListings",
  async (filters, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { type, city, priceMin, priceMax, status } = filters;
      const queryParams = new URLSearchParams({
        ...(type && { type }),
        ...(city && { city }),
        ...(priceMin && { priceMin }),
        ...(priceMax && { priceMax }),
        ...(status && { status }),
      });
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `https://book-nest-nkia.vercel.app/api/listing/?${queryParams.toString()}`,
        config
      );
      return response.data.listings;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Fetch single listing
export const fetchListing = createAsyncThunk(
  "listing/fetchListing",
  async (vendorId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `https://book-nest-nkia.vercel.app/api/listing/${vendorId}`,
        config
      );
      return response.data.listing;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Delete listing
export const deleteListing = createAsyncThunk(
  "listing/deleteListing",
  async (listingId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(
        `https://book-nest-nkia.vercel.app/api/listing/${listingId}`,
        config
      );
      return listingId; // Return the deleted listing ID
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
export const updateListing = createAsyncThunk(
  "listing/updateListing",
  async ({ vendorId, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      // Debug log
      console.log("FormData before sending:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await axios.put(
        `https://book-nest-nkia.vercel.app/api/listing/${vendorId}`,
        formData,
        config
      );
      return response.data.listing;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || error.message || "Something went wrong"
      );
    }
  }
);
// Listing slice
const listingSlice = createSlice({
  name: "listing",
  initialState: {
    listings: loadListingsFromLocalStorage(),
    listing: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createListing.fulfilled, (state, action) => {
        state.listings.push(action.payload.listing);
        state.loading = false;
        saveListingsToLocalStorage(state.listings);
      })
      .addCase(createListing.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload;
        saveListingsToLocalStorage(action.payload);
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListing.fulfilled, (state, action) => {
        state.loading = false;
        state.listing = action.payload;
      })
      .addCase(fetchListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteListing.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteListing.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = state.listings.filter(
          (hotel) => hotel._id !== action.payload
        );
        saveListingsToLocalStorage(state.listings);
      })
      .addCase(deleteListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateListing.fulfilled, (state, action) => {
        state.loading = false;
        // Update the listing in the state
        state.listings = state.listings.map((listing) =>
          listing._id === action.payload._id ? action.payload : listing
        );
        saveListingsToLocalStorage(state.listings);
      })
      .addCase(updateListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default listingSlice.reducer;

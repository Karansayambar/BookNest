import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Create Unit API Call
export const createUnit = createAsyncThunk(
  "units/createUnit",
  async (formData, { rejectWithValue }) => {
    try {
      console.log("API Call Data:", formData);
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        "https://book-nest-nkia.vercel.app/api/units/",
        formData, // Fix: No need for JSON.stringify()
        config
      );

      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Get Units by Listing ID API Call
export const getUnitsByListing = createAsyncThunk(
  "Unit/getUnitsByListing",
  async (listingId, { rejectWithValue }) => {
    try {
      console.log("listingId", listingId);
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `https://book-nest-nkia.vercel.app/api/units/${listingId}`,
        config
      );

      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Unit Slice
const unitSlice = createSlice({
  name: "units",
  initialState: {
    units: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUnit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUnit.fulfilled, (state, action) => {
        state.loading = false;
        state.units = action.payload;
      })
      .addCase(createUnit.rejected, (state, action) => {
        state.loading = false;
        state.listings = state.listings.map((listing) =>
          listing._id === action.payload._id ? action.payload : listing
        );
        state.error = action.payload;
      })
      .addCase(getUnitsByListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUnitsByListing.fulfilled, (state, action) => {
        state.loading = false;
        state.units = action.payload;
      })
      .addCase(getUnitsByListing.rejected, (state, action) => {
        (state.error.loading = false), (state.error = action.payload);
      });
  },
});

export default unitSlice.reducer;

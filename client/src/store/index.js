import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authReducer,
    listings: listingReducer,
    bookings: bookingReducer,
  },
});

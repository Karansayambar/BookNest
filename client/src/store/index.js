import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import listingReducer from "./slices/listingSlice.js";
import { persistReducer, persistStore } from "redux-persist";
import unitReducer from "./slices/unitsSlice.js";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage

// Persist configuration for the `listing` slice
const listingPersistConfig = {
  key: "listing",
  storage,
  whitelist: ["listings"], // Persist only the `listings` field
};

// Combine reducers with persistence
const rootReducer = combineReducers({
  auth: authReducer, // `auth` slice is not persisted
  listing: persistReducer(listingPersistConfig, listingReducer), // `listing` slice is persisted
  units: unitReducer,
});

// Create the store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for Redux Persist
    }),
});

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };

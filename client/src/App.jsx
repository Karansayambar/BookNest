import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/es/integration/react";

// Pages
import CustomerDashboard from "./pages/customer/Dashboard";
import VendorDashboard from "./pages/vendor/Dashboard"; // Vendor Layout
import AdminDashboard from "./pages/admin/Dashboard";
import ProductListing from "./pages/customer/ProductListing";
import ProductDetails from "./pages/customer/ProductDetails";
import MakeBooking from "./pages/customer/MakeBooking";
import Listing from "./pages/vendor/Listing";
import LoginPage from "./pages/auth/LiginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import CreateListingPage from "./pages/vendor/CreateListingPage";
import UpdateListing from "./pages/vendor/UpdateListing";
import UnitForm from "./pages/vendor/UnitForm";
import Success from "./pages/customer/Success";
import Cancle from "./pages/customer/Cancle";

// Redirect based on authentication
const AuthRedirect = () => {
  const { user } = useSelector((state) => state.auth);
  return <Navigate to={user ? getDashboardPath(user.role) : "/login"} />;
};

const getDashboardPath = (role) => {
  switch (role) {
    case "customer":
      return "/customer/dashboard";
    case "vendor":
      return "/vendor/dashboard";
    case "admin":
      return "/admin/dashboard";
    default:
      return "/login";
  }
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            {/* Default Redirect */}
            <Route path="/" element={<AuthRedirect />} />

            {/* Authentication Pages */}
            <Route element={<AuthLayout />}>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Route>

            {/* Customer Dashboard */}
            <Route element={<Layout />}>
              <Route
                path="/customer/dashboard"
                element={
                  <ProtectedRoute roles={["customer"]}>
                    <CustomerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/dashboard/product-list"
                element={
                  <ProtectedRoute roles={["customer"]}>
                    <ProductListing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/dashboard/product-details/:id"
                element={
                  <ProtectedRoute roles={["customer"]}>
                    <ProductDetails />
                  </ProtectedRoute>
                }
              />
              {/* <Route
                path="/customer/dashboard/product-details/:id/book"
                element={
                  <ProtectedRoute roles={["customer"]}>
                    <MakeBooking />
                  </ProtectedRoute>
                }
              /> */}
              <Route
                path="/customer/dashboard/product-details/success"
                element={
                  <ProtectedRoute roles={["customer"]}>
                    <Success />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/dashboard/product-details/cancle"
                element={
                  <ProtectedRoute roles={["customer"]}>
                    <Cancle />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Vendor Dashboard Layout with Nested Routes */}
            <Route
              path="/vendor/dashboard"
              element={
                <ProtectedRoute roles={["vendor"]}>
                  <VendorDashboard />
                </ProtectedRoute>
              }
            >
              {/* Nested Routes inside VendorDashboard */}
              <Route path="listing" element={<Listing />} />
              <Route
                path="/vendor/dashboard/create"
                element={<CreateListingPage />}
              />
              <Route
                path="/vendor/dashboard/create/unit/:id"
                element={<UnitForm />}
              />
              <Route
                path="/vendor/dashboard/update/:vendorId"
                element={<UpdateListing />}
              />
            </Route>

            {/* Admin Dashboard */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Unauthorized Page */}
            <Route
              path="/unauthorized"
              element={<h1>Unauthorized Access</h1>}
            />

            {/* Catch-all for undefined routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;

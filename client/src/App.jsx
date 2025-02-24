// import React, { useEffect } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Layout from "./layouts/Layout";
// import AuthLayout from "./layouts/AuthLayout";
// // import Home from "./pages/Home";

// import CustomerDashboard from "./pages/customer/Dashboard";
// import VendorDashboard from "./pages/vendor/Dashboard";
// import AdminDashboard from "./pages/admin/Dashboard";
// import LoginPage from "./pages/auth/LiginPage";
// import RegisterPage from "./pages/auth/RegisterPage";

// const getDashboardPath = () => {
//   const role = localStorage.getItem("role");
//   if (role === "customer") return "/customer/dashboard";
//   if (role === "vendor") return "/vendor/dashboard";
//   if (role === "admin") return "/admin/dashboard";
//   return "/home";
// };

// const App = () => {
//   useEffect(() => {
//     // Set default values on app load
//     localStorage.setItem("isAuth", "true");
//     localStorage.setItem("role", "customer");

//     // Reset values after 1 hour
//     const timeout = setTimeout(() => {
//       localStorage.removeItem("isAuth");
//       localStorage.removeItem("role");
//     }, 3600000); // 1 hour

//     // Cleanup timeout on component unmount
//     return () => clearTimeout(timeout);
//   }, []);
//   const isAuthenticated = () => {
//     return (
//       localStorage.getItem("isAuth") === "true" && localStorage.getItem("role")
//     );
//   };

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Redirect based on authentication */}
//         <Route
//           path="/"
//           element={
//             isAuthenticated() ? (
//               <Navigate to={getDashboardPath()} />
//             ) : (
//               <AuthLayout />
//             )
//           }
//         >
//           <Route path="login" element={<LoginPage />} />
//           <Route path="register" element={<RegisterPage />} />
//         </Route>

//         {/* Home and Dashboards
//         <Route path="/home" element={<Layout />}>
//           <Route index element={<Home />} />
//         </Route> */}

//         <Route
//           path="/customer/dashboard"
//           element={
//             <ProtectedRoute roles={["customer"]}>
//               <CustomerDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/vendor/dashboard"
//           element={
//             <ProtectedRoute roles={["vendor"]}>
//               <VendorDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/dashboard"
//           element={
//             <ProtectedRoute roles={["admin"]}>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;

import React from "react";
import Dashboard from "./pages/customer/Dashboard";
import ProductListing from "./pages/customer/ProductListing";
import ProductDetails from "./pages/customer/ProductDetails";

const App = () => {
  return (
    <div>
      {/* <Dashboard /> */}
      <ProductListing />
      {/* <ProductDetails /> */}
    </div>
  );
};

export default App;

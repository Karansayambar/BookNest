import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="auth-container">
      <h1>Welcome to Our Platform</h1>
      <Outlet />
    </div>
  );
};

export default AuthLayout;

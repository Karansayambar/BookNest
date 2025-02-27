import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="auth-container flex flex-col items-center justify-center mx-auto mt-20 md:mt-40">
      <h1 className="text-[42px] font-semibold mb-10">
        Welcome to Our Platform
      </h1>
      <Outlet />
    </div>
  );
};

export default AuthLayout;

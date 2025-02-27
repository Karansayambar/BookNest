import React from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-1/4 h-full flex flex-col items-center pt-10 gap-6 border-r bg-gray-800 text-white">
          <p
            className={`cursor-pointer p-2 rounded ${
              location.pathname === "/vendor/dashboard/listing"
                ? "bg-gray-600"
                : ""
            }`}
            onClick={() => navigate("/vendor/dashboard/listing")}
          >
            Listing
          </p>
          <p
            className={`cursor-pointer p-2 rounded ${
              location.pathname === "/vendor/dashboard/create"
                ? "bg-gray-600"
                : ""
            }`}
            onClick={() => navigate("/vendor/dashboard/create")}
          >
            Create
          </p>
          <p className="cursor-pointer p-2 rounded">Booked</p>
          <p className="cursor-pointer p-2 rounded">Available</p>
        </div>

        {/* Dynamic Content on the Right */}
        <div className="w-3/4 p-10 overflow-scroll">
          <Outlet /> {/* This will render the routed components */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;

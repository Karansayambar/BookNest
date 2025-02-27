import React from "react";
import { useNavigate } from "react-router-dom";

const HotelCard = ({ hotel, view }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/customer/dashboard/product-details/${hotel._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`border rounded-lg shadow-md w-[300px] max-h-[500px] p-4 bg-white transition-transform 
        ${view === "listH" ? "w-[80%] h-[600px]" : ""}
        ${
          view === "grid"
            ? "w-[300px] md:w-[350px] lg:w-[380px] xl:w-[800px]"
            : ""
        }
        ${
          view === "menu"
            ? "w-[300px] md:w-[350px] lg:w-[380px] xl:w-[400px]"
            : ""
        }
      `}
    >
      {/* Image */}
      <img
        src={hotel.images[0]}
        alt={hotel.name}
        className="w-full h-[280px] object-cover rounded-md"
      />

      {/* Hotel Details */}
      <div className="mt-3">
        <h2 className="text-lg font-semibold">{hotel.name}</h2>
        <p className="text-sm text-gray-500">
          {hotel.address.city}, {hotel.address.state}
        </p>

        {/* Price */}
        <p className="mt-2 font-bold text-lg">
          ₹{hotel.pricing.basePrice}{" "}
          <span className="text-sm text-gray-500">/ night</span>
        </p>

        {/* Facilities */}
        <div className="mt-2 flex flex-wrap gap-1 text-xs text-gray-600">
          {hotel.facilities.slice(0, 3).map((facility, index) => (
            <span key={index} className="bg-gray-100 px-2 py-1 rounded-md">
              {facility}
            </span>
          ))}
        </div>

        {/* Book Now Button */}
        <button
          className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          onClick={() =>
            navigate("/customer/dashboard/product-details/:id/book")
          }
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default HotelCard;

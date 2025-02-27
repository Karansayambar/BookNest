import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Selector = () => {
  const [place, setPlace] = useState("Mumbai");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guestCount, setGuestCount] = useState(1);

  return (
    <div className="max-w-4xl">
      <div className="text-center py-4 sm:py-6 md:py-8 lg:py-20">
        <h1 className="text-[28px] sm:text-[38px] md:text-[38px] lg:text-[70px] text-white leading-[30px] md:leading-[40px] lg:leading-[65px] font-semibold">
          Discover Your Dream Destination
        </h1>
      </div>

      <div>
        <div className="flex flex-col md:flex-row gap-4  mx-auto p-6 bg-white rounded-lg shadow-lg">
          {/* Place Input */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Place
            </label>
            <input
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="Enter Place"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Start Date Picker */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Select Start Date"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* End Date Picker */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="Select End Date"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Guest Count Input */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Guests
            </label>
            <input
              type="number"
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              min="1"
              placeholder="Number of Guests"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-end gap-4">
          <button className="md:hidden w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
            Search
          </button>
          <h1 className="hidden md:flex text-lg font-bold text-center text-white">
            Find Your Perfect Stay – Book Now!
          </h1>
          <button className="hidden md:flex w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Selector;

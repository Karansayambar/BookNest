import React, { useEffect, useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { TbLayoutGridFilled } from "react-icons/tb";
import { CiGrid2H } from "react-icons/ci";
import Carousel from "../../components/Carousel";
import Selector from "../../components/Selector";
import HotelCard from "../../components/HotelCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings } from "../../store/slices/listingSlice";

const ProductListing = () => {
  const [view, setView] = useState("menu"); // Default View
  const dispatch = useDispatch();
  const { listings, loading, error } = useSelector((state) => state.listing); // Destructure listings from state.listing

  const [filters, setFilters] = useState({
    type: "",
    city: "",
    priceMin: "",
    priceMax: "",
    status: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    dispatch(fetchListings(filters));
  }, [dispatch, filters]);

  return (
    <div>
      <Carousel />
      <div className="absolute top-[45%] md:top-[35%] lg:top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Selector />
      </div>
      <section className="px-6 md:px-16 py-10">
        <div className="md:flex items-end justify-between">
          {/* Filters Section */}
          <div className="flex flex-wrap gap-4">
            {/* Property Type */}
            <div>
              <p className="pb-1 text-gray-400">Property Type</p>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="border border-black p-2 rounded-lg w-[150px] md:w-[180px]"
              >
                <option value="">Select Type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
              </select>
            </div>

            {/* City */}
            <div>
              <p className="pb-1 text-gray-400">City</p>
              <select
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                className="border border-black p-2 rounded-lg w-[150px] md:w-[180px]"
              >
                <option value="">Select City</option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi</option>
                <option value="bangalore">Bangalore</option>
              </select>
            </div>

            {/* Min Price */}
            <div>
              <p className="pb-1 text-gray-400">Min Price</p>
              <select
                name="priceMin"
                value={filters.priceMin}
                onChange={handleFilterChange}
                className="border border-black p-2 rounded-lg w-[150px] md:w-[180px]"
              >
                <option value="">Min Price</option>
                <option value="700">700</option>
                <option value="2000">2000</option>
                <option value="5000">5000</option>
              </select>
            </div>

            {/* Max Price */}
            <div>
              <p className="pb-1 text-gray-400">Max Price</p>
              <select
                name="priceMax"
                value={filters.priceMax}
                onChange={handleFilterChange}
                className="border border-black p-2 rounded-lg w-[150px] md:w-[180px]"
              >
                <option value="">Max Price</option>
                <option value="1000">1000</option>
                <option value="5000">5000</option>
                <option value="10000">10000</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <p className="pb-1 text-gray-400">Status</p>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="border border-black p-2 rounded-lg w-[150px] md:w-[180px]"
              >
                <option value="">Select Status</option>
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Right Sort & View */}
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            {/* Sort By */}
            <div>
              <p className="pb-1 text-gray-400">Sort By</p>
              <select
                name="sort"
                className="border border-black p-2 rounded-lg w-[150px]"
              >
                <option value="">Sort By</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="date_newest">Newest</option>
              </select>
            </div>
            {/* View Options */}
            <div className="flex items-center flex-col gap-4 mt-5 md:mt-0">
              <p className="text-gray-500">View:</p>
              <div className="flex p-2 rounded gap-2 text-xl md:text-2xl text-gray-600">
                <CgMenuGridO
                  className={`cursor-pointer hover:text-black transition ${
                    view === "menu" ? "text-black" : ""
                  }`}
                  onClick={() => setView("menu")}
                />
                <TbLayoutGridFilled
                  className={`cursor-pointer hover:text-black transition ${
                    view === "grid" ? "text-black" : ""
                  }`}
                  onClick={() => setView("grid")}
                />
                <CiGrid2H
                  className={`cursor-pointer hover:text-black transition ${
                    view === "listH" ? "text-black" : ""
                  }`}
                  onClick={() => setView("listH")}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Listings Display */}
        <div
          className={`mt-8 ${getViewClass(
            view
          )} flex items-center justify-center`}
        >
          {listings.map((hotel, index) => (
            <HotelCard key={index} hotel={hotel} view={view} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductListing;

const getViewClass = (view) => {
  switch (view) {
    case "menu":
      return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center";
    case "grid":
      return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 justify-center";
    case "listH":
      return "flex flex-wrap gap-4";
    default:
      return "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center";
  }
};

import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchListings } from "../../store/slices/listingSlice";
import HotelCard from "../../components/HotelCard";
import { loadStripe } from "@stripe/stripe-js";
import UnitList from "./UnitList";
import { getUnitsByListing } from "../../store/slices/unitsSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listings, loading, error } = useSelector((state) => state.listing);
  const { units } = useSelector((state) => state.units);

  // Fetch listings and units only once
  useEffect(() => {
    if (listings.length === 0) {
      dispatch(fetchListings({})); // Fetch all listings
    }
    if (!units.units || units.units.length === 0) {
      dispatch(getUnitsByListing(id));
    }
  }, [dispatch, id]); // <-- Only depend on `id` and `dispatch`

  // Find the hotel by id
  const hotel = listings.find((item) => item._id === id);

  const matchLocation = listings.filter(
    (item) => item.address.city === hotel.address.city
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="flex justify-center items-center h-screen">
        Hotel not found
      </div>
    );
  }

  const book = listings.find((list) => id === list._id);
  console.log("book", book);

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51QwlGiFvL7ejiYUx21FXJtV9OdSzrIa5kW7ess7cQnj5pm13CefzNJRA3MkYIrrAmO1aFHBcHq2oQXZ8xqJ7upo900PzpApPCg"
    );

    const body = {
      products: [book], // Ensure `book` contains the required product details
    };

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/create-checkout-session",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );

      const session = await response.json();

      if (!session.id) {
        console.error("Failed to create checkout session");
        return;
      }

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.error("Error in payment:", error);
    }
  };

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="bg-gray-200 rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-32 p-8">
            {/* Image Gallery */}
            <div className="grid grid-cols-2 gap-4">
              {hotel.images.slice(0, 5).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Hotel Image ${index + 1}`}
                  className="w-full h-48 md:h-64 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
            <div>{<UnitList units={units.units} />}</div>{" "}
            {/* Pass units as prop */}
            {/* Hotel Details */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-800">{hotel.name}</h1>
              <p className="text-gray-600">{hotel.description}</p>

              {/* Address */}
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">Address</h2>
                {Object.entries(hotel.address).map(([key, value]) => (
                  <div key={key} className="flex gap-2 text-gray-600">
                    <p className="font-medium capitalize">{key}:</p>
                    <p>{value}</p>
                  </div>
                ))}
              </div>

              {/* Facilities */}
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  Facilities
                </h2>
                <div className="flex flex-wrap gap-2">
                  {hotel.facilities.map((facility, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">Pricing</h2>
                <p className="text-gray-600">
                  ₹{hotel.pricing.basePrice}{" "}
                  <span className="text-sm text-gray-500">/ night</span>
                </p>
              </div>

              {/* Vendor Details */}
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  Vendor Details
                </h2>
                <div className="flex gap-2 text-gray-600">
                  <p className="font-medium">Name:</p>
                  <p>{hotel.vendorId.name}</p>
                </div>
                <div className="flex gap-2 text-gray-600">
                  <p className="font-medium">Email:</p>
                  <p>{hotel.vendorId.email}</p>
                </div>
                <div className="flex gap-4 pt-10">
                  <button
                    className="text-2xl bg-red-600 text-white px-4 py-2 rounded-sm"
                    onClick={() => makePayment()}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="m-10">
          <p className="text-3xl font-semibold p-10 capitalize">
            {hotel.type} in {hotel.address.city}
          </p>
          <div className="flex gap-10">
            {matchLocation.map((hotel, index) => (
              <HotelCard hotel={hotel} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

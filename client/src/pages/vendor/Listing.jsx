import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListing } from "../../store/slices/listingSlice";
import HotelCardVendor from "../../components/HotelCardVendor";

const ListingDetails = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { listing, loading, error } = useSelector((state) => state.listing);
  const [updatedListing, setUpdatedListing] = useState([]);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchListing(user._id));
    }
  }, [dispatch, user?._id]);

  useEffect(() => {
    if (listing) {
      setUpdatedListing(Array.isArray(listing) ? listing : [listing]);
    }
  }, [listing]);

  const handleDeleteListing = (deletedId) => {
    setUpdatedListing((prevListings) =>
      prevListings.filter((hotel) => hotel._id !== deletedId)
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {listing?.vendorId && (
        <>
          <p>Vendor: {listing.vendorId.name}</p>
          <p>Vendor Email: {listing.vendorId.email}</p>
        </>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {updatedListing.map((hotel, index) => (
          <HotelCardVendor
            key={hotel._id || index}
            hotel={hotel}
            onDelete={handleDeleteListing}
          />
        ))}
      </div>
    </div>
  );
};

export default ListingDetails;

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteListing, updateListing } from "../store/slices/listingSlice";

const HotelCardVendor = ({ hotel, onDelete = () => {} }) => {
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await dispatch(deleteListing(hotel._id)).unwrap();
        onDelete(hotel._id);
      } catch (error) {
        console.error("Failed to delete listing:", error);
      }
    }
  };

  return (
    <div
      onClick={() =>
        navigate(`/customer/dashboard/product-details/${hotel._id}`)
      }
      className="border rounded-lg shadow-md p-4 bg-white transition-transform cursor-pointer w-[300px] md:w-[350px] lg:w-[380px] xl:w-[400px] hover:scale-105"
    >
      {hotel.images?.length > 0 && (
        <img
          src={hotel.images[0]}
          alt={hotel.name}
          className="w-full h-40 object-cover rounded-md"
        />
      )}

      <div className="mt-3">
        <h2 className="text-lg font-semibold">{hotel.name}</h2>
        <p className="text-sm text-gray-500">
          {hotel.address?.city}, {hotel.address?.state}
        </p>

        <p className="mt-2 font-bold text-lg">
          ₹{hotel.pricing?.basePrice}{" "}
          <span className="text-sm text-gray-500">/ night</span>
        </p>

        {hotel.facilities?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1 text-xs text-gray-600">
            {hotel.facilities.slice(0, 3).map((facility, index) => (
              <span key={index} className="bg-gray-100 px-2 py-1 rounded-md">
                {facility}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-4">
          <button
            className="mt-3 w-40 bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="mt-3 w-40 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/vendor/dashboard/create/unit/${hotel._id}`);
            }}
          >
            Add Units
          </button>
          <button
            className="mt-3 w-40 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/vendor/dashboard/update/${hotel._id}`);
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCardVendor;

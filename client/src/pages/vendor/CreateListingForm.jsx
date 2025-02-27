import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createListing } from "../../store/slices/listingSlice";

const CreateListingForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.listing);

  const [formData, setFormData] = useState({
    type: "",
    name: "",
    address: { street: "", city: "", state: "", zip: "" },
    description: "",
    facilities: "",
    images: [],
    basePrice: "",
    currency: "INR",
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      if (name.includes("address.")) {
        const field = name.split(".")[1];
        return {
          ...prevData,
          address: { ...prevData.address, [field]: value },
        };
      }
      return { ...prevData, [name]: value };
    });
  };

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...filesArray],
    }));

    const previewUrls = filesArray.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "address") {
        Object.keys(formData.address).forEach((addrKey) => {
          if (formData.address[addrKey].trim() !== "") {
            data.append(`address[${addrKey}]`, formData.address[addrKey]);
          }
        });
      } else if (key === "images" && Array.isArray(formData.images)) {
        formData.images.forEach((file) => {
          data.append("images", file);
        });
      } else if (formData[key]?.trim()) {
        data.append(key, formData[key]);
      }
    });

    dispatch(createListing(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 w-[50%]">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create a New Listing
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block text-gray-600">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded"
            >
              <option value="">Select Type</option>
              <option value="hotel">Hotel</option>
              <option value="restaurant">Restaurant</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-600">Address</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input
                type="text"
                name="address.street"
                placeholder="Street"
                value={formData.address.street}
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />
              <input
                type="text"
                name="address.city"
                placeholder="City"
                value={formData.address.city}
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />
              <input
                type="text"
                name="address.state"
                placeholder="State"
                value={formData.address.state}
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />
              <input
                type="text"
                name="address.zip"
                placeholder="ZIP Code"
                value={formData.address.zip}
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-gray-600">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-600">
              Facilities (comma-separated)
            </label>
            <input
              type="text"
              name="facilities"
              value={formData.facilities}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-600">Base Price</label>
            <input
              type="number"
              name="basePrice"
              value={formData.basePrice}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-600">Upload Images</label>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              required
              className="w-full p-3 border rounded"
            />
            {imagePreviews.length > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {imagePreviews.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Preview ${index}`}
                    className="h-24 w-24 object-cover rounded shadow-md"
                  />
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white p-3 rounded-md w-full col-span-2 hover:bg-blue-700"
          >
            {loading ? "Creating..." : "Create Listing"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateListingForm;

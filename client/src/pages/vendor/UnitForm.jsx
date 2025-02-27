import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUnit } from "../../store/slices/unitsSlice";
import { useParams } from "react-router-dom";

const UnitForm = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    listingId: id, // Ensure listingId is initialized
    type: "single",
    capacity: "",
    price: "",
    totalUnits: "",
    availability: [{ date: "", availableUnits: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvailabilityChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedAvailability = [...prev.availability];
      updatedAvailability[index] = {
        ...updatedAvailability[index],
        [name]: value,
      };
      return { ...prev, availability: updatedAvailability };
    });
  };

  const addAvailability = () => {
    setFormData((prev) => ({
      ...prev,
      availability: [
        ...prev.availability,
        { listingId: id, date: "", availableUnits: "" },
      ],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataWithListingId = { ...formData, listingId: id };
    console.log("Submitting Form Data:", formDataWithListingId); // Debugging
    dispatch(createUnit(formDataWithListingId));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 w-[50%] h-[750px] space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
        Add Unit
      </h2>

      <div className="flex flex-col">
        <label className="text-gray-600">Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="input-field"
        >
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="suite">Suite</option>
          <option value="deluxe">Deluxe</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-gray-600">Capacity</label>
          <input
            name="capacity"
            type="number"
            placeholder="Enter Capacity"
            value={formData.capacity}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600">Price</label>
          <input
            name="price"
            type="number"
            placeholder="Enter Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-600">Total Units</label>
        <input
          name="totalUnits"
          type="number"
          placeholder="Enter Total Units"
          value={formData.totalUnits}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-700 border-b pb-1">
        Availability
      </h3>

      {formData.availability.map((avail, index) => (
        <div key={index} className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-gray-600">Date</label>
            <input
              type="date"
              name="date"
              value={avail.date}
              onChange={(e) => handleAvailabilityChange(index, e)}
              required
              className="input-field"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">Available Units</label>
            <input
              type="number"
              name="availableUnits"
              placeholder="Enter Available Units"
              value={avail.availableUnits}
              onChange={(e) => handleAvailabilityChange(index, e)}
              required
              className="input-field"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addAvailability}
        className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition"
      >
        + Add Availability
      </button>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default UnitForm;

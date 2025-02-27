import React from "react";

const UnitList = ({ units = [] }) => {
  if (!units || units.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10 text-lg">
        No units available.
      </div>
    );
  }

  const getDate = (newString) => {
    const date = new Date(newString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-[300px] mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-700 border-b pb-2 mb-6">
        Available Units
      </h2>
      <div className="grid grid-cols-1 gap-6">
        {units.map((unit, index) => (
          <div key={index} className=" p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-blue-600">
              {unit.type} Unit
            </h3>
            <p className="text-gray-500 mt-1">
              <span className="font-medium">Capacity:</span> {unit.capacity}{" "}
              persons
            </p>
            <p className="text-gray-500">
              <span className="font-medium">Price:</span> ${unit.price}
            </p>
            <p className="text-gray-500">
              <span className="font-medium">Total Units:</span>{" "}
              {unit.totalUnits}
            </p>

            <div className="mt-4">
              <h4 className="text-lg font-semibold text-gray-600">
                Availability:
              </h4>
              <ul className="mt-2">
                {unit.availability.length > 0 ? (
                  unit.availability.map((avail, i) => (
                    <li
                      key={i}
                      className="bg-gray-300 rounded-lg p-2 mt-1 text-sm"
                    >
                      <span className="font-medium">Date:</span>{" "}
                      {getDate(avail.date)} |{" "}
                      <span className="font-medium">Units:</span>{" "}
                      {avail.availableUnits}
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">No availability listed</p>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnitList;

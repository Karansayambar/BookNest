import Unit from "../models/unitsSchemas.js";

export const updateUnitAvailability = async (
  unitId,
  startDate,
  endDate,
  guestCount
) => {
  // Update unit status to mark it as unavailable for the selected dates
  await Unit.findByIdAndUpdate(unitId, {
    $push: { bookedDates: { startDate, endDate } },
  });
};

// export const updateUnitAvailability = async (
//   unitId,
//   startDate,
//   endDate,
//   guestCount
// ) => {
//   try {
//     // Fetch the unit
//     const unit = await Unit.findById(unitId);

//     if (!unit) {
//       throw new Error("Unit not found.");
//     }

//     // Check availability for each date in the range
//     let isAvailable = true;

//     const bookingDates = [];
//     let currentDate = new Date(startDate);
//     const endDateObj = new Date(endDate);

//     while (currentDate <= endDateObj) {
//       const dateStr = currentDate.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
//       const availabilityForDate = unit.availability.find(
//         (avail) => new Date(avail.date).toISOString().split("T")[0] === dateStr
//       );

//       if (
//         !availabilityForDate ||
//         availabilityForDate.availableUnits < guestCount
//       ) {
//         isAvailable = false;
//         break;
//       }

//       bookingDates.push({
//         date: availabilityForDate.date,
//         availableUnits: availabilityForDate.availableUnits - guestCount,
//       });

//       currentDate.setDate(currentDate.getDate() + 1);
//     }

//     // If not available, throw an error
//     if (!isAvailable) {
//       throw new Error("Not enough available units for the selected dates.");
//     }

//     // Update availability in the database
//     for (const booking of bookingDates) {
//       await Unit.updateOne(
//         { _id: unitId, "availability.date": booking.date },
//         { $set: { "availability.$.availableUnits": booking.availableUnits } }
//       );
//     }

//     console.log("Availability updated successfully.");
//   } catch (error) {
//     console.error("Error updating availability:", error.message);
//     throw error;
//   }
// };

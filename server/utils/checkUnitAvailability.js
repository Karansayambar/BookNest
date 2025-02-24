export const checkUnitAvailability = async (unitId, startDate, endDate) => {
  const existingBookings = await Booking.find({
    unitId,
    status: { $ne: "cancelled" },
    $or: [{ startDate: { $lte: endDate }, endDate: { $gte: startDate } }],
  });

  return existingBookings.length === 0;
};

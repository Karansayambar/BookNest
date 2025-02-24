export const calculateTotalPrice = (unitPrice, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return nights * unitPrice;
};

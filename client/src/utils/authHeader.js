export const authHeader = () => {
  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
  return token ? { Authorization: `Bearer ${token}` } : {};
};

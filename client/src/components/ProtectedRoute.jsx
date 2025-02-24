// import { Navigate, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, roles }) => {
  //   const { user, token } = useSelector((state) => state.auth);
  //   const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;

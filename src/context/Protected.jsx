// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

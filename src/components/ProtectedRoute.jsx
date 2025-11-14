import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  console.log("ProtectedRoute check — token:", token);
  console.log("Current path:", location.pathname);

  // If token does NOT exist → redirect to login
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children; // authenticated → allow route
}

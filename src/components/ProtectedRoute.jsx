import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // If token does NOT exist → redirect to login, and save current location in state
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Token exists → allow access
  return children;
}

// frontend/src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {}

  if (adminOnly && !(user && user.isAdmin)) {
    // Not authorized for admin routes — send to home (or show 403 page)
    return <Navigate to="/" replace />;
  }

  return children;
}

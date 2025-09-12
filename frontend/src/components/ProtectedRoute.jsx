import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ userRole, allowedRoles, children }) => {
  if (!userRole || !allowedRoles.includes(userRole)) {
    // If user not logged in or not allowed, redirect to login
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;

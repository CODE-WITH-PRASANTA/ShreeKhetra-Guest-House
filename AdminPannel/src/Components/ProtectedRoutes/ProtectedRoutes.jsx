import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AUTH_KEY = "isAdminAuthenticated";

const ProtectedRoutes = ({ children }) => {
  const location = useLocation();

  // Sync "Remember me" from localStorage to sessionStorage
  const isRemembered = localStorage.getItem(AUTH_KEY) === "true";
  if (isRemembered) {
    sessionStorage.setItem(AUTH_KEY, "true");
  }

  const isAuthenticated = sessionStorage.getItem(AUTH_KEY) === "true";

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render wrapped children or nested <Outlet /> routes
  return children ? children : <Outlet />;
};

export default ProtectedRoutes;
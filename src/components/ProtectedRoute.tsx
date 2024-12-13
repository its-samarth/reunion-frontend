import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  component: React.ReactNode;
  isLoginPage?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component,isLoginPage  }) => {
  const token = localStorage.getItem("token"); // Get the JWT from localStorage

  if (isLoginPage && token) {
    // If token exists and trying to access Login/Register, redirect to Dashboard
    return <Navigate to="/dashboard" replace />;
  }

  if (!token && !isLoginPage) {
    // If there's no token and trying to access Dashboard, redirect to Login
    return <Navigate to="/" replace />;
  }

  // If token exists, render the protected component (dashboard)
  return <>{component}</>;
};

export default ProtectedRoute;

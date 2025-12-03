import React from "react";
import { Navigate } from "react-router-dom";
import { AuthState } from "../types/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const storedAuth = localStorage.getItem("authState");

  if (!storedAuth) {
    return <Navigate to="/login" replace />;
  }

  try {
    const authState: AuthState = JSON.parse(storedAuth);

    if (!authState.isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
  } catch (error) {
    console.error("Error parsing auth state: ", error);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;

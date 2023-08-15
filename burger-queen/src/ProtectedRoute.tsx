import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  logged: boolean;
  allowedRoles: string[];
}

export const ProtectedRoute = ({
  children,
  logged,
  allowedRoles,
}: ProtectedRouteProps) => {
  const userRole = localStorage.getItem("role") || "";

  if (!logged || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(userRole)) {
    if (userRole === "mesero") {
      return <Navigate to="/waiter" />;
    } else if (userRole === "cocina") {
      return <Navigate to="/chef" />;
      // } else if (userRole === "admi") {
      //   return <Navigate to="/amdi" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return <>{children}</>;
};

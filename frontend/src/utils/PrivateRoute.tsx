import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "./UserProvider";

interface PrivateRouteProps {
  children: React.ReactElement | null;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAdmin } = useContext(UserContext);
  const location = useLocation();

  return (
    isAdmin ? 
    children :
    <Navigate to="/" state={{ from: location }} />
  );
};

export default PrivateRoute;
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from './UserProvider';

interface AdminRouteProps {
    children: React.ReactElement | null;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
    const { isAdmin } = useContext(UserContext);
    const location = useLocation();

    return isAdmin ? children : <Navigate to="/" state={{ from: location }} />;
};

export default AdminRoute;

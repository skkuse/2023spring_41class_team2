import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from './UserProvider';

interface PrivateRouteProps {
    children: React.ReactElement | null;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isBanned, userid } = useContext(UserContext);

    return userid && isBanned ? (
        <Navigate to="/" state={{ from: location }} />
    ) : (
        children
    );
};

export default PrivateRoute;

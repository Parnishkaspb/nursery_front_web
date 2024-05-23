import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface RoleProtectedRouteProps {
    allowedRoles: number[];
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ allowedRoles }) => {
    const { token } = useAuth();

    if (!token || !allowedRoles.includes(token.id_role)) {
        return <Navigate to="/home" />;
    }

    return <Outlet />;
};

export default RoleProtectedRoute;

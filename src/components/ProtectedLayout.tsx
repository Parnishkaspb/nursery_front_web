import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NavBar from './NavBar';

const ProtectedLayout: React.FC = () => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/" />;
    }
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
};

export default ProtectedLayout;

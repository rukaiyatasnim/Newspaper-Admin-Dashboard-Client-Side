import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const AdminRoute = ({ children }) => {
    const { user, role, loading, roleLoading } = useAuth();
    const location = useLocation();

    if (loading || roleLoading) {
        return <span className="loading loading-spinner loading-lg" />;
    }

    if (!user || role !== 'admin') {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};

export default AdminRoute;

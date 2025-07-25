import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext/AuthContext';
import Loader from '../Pages/Shared/Loader/Loader'; // Adjust path if needed

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    // 🚩 Show loader while Firebase is checking user on page refresh
    if (loading) {
        return <Loader />;
    }

    if (!user) {
        // Save current location for redirect after login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;

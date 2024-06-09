import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!auth.user) {
        console.log('User is not logged in. Redirecting to login page...');
        navigate('/login');
    }

    // User is logged in
    return children;
};

export default ProtectedRoute;

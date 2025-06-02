import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('userEmail'); // Check if user is logged in

  if (!isAuthenticated) {
    // If not authenticated, save the current path to redirect to after login
    localStorage.setItem('redirectAfterLogin', window.location.pathname);
    return <Navigate to="/login" />;
  }

  return children; // Allow access to protected route if authenticated
};

export default ProtectedRoute;

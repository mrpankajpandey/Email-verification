import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check for the token

  // If no token is found, redirect to login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children; // If token is valid, render the child component (dashboard)
};

export default ProtectedRoute;

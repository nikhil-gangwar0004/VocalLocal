import React from 'react';
import { Navigate } from 'react-router-dom';

// Agar user login nahi hai toh /login pe redirect kar do
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
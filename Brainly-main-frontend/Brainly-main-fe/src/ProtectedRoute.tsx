import { Navigate } from 'react-router-dom';
import React from 'react';
import { isLoggedin } from './Auth';


interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps): React.ReactElement => {
  return isLoggedin() ? <>{children}</> : <Navigate to="/signup" replace />;
};

export default ProtectedRoute;

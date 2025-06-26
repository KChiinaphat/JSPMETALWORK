import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, getRole } from '../utils/auth';

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const location = useLocation();
  const role = getRole();
  
  if (!isAuthenticated()) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has required role
  if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
    // Redirect to unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute; 
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were trying to go to requested path
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;

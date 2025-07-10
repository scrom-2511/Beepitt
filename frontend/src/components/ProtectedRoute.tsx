import { useEffect, useState, type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../requestHandler/isLoggedIn';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const LoggedIn = await isLoggedIn();
        setIsAuthenticated( LoggedIn );
      } catch {
        setIsAuthenticated( false );
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  return children;
};

export default ProtectedRoute;

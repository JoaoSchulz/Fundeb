import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks";

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteProps): JSX.Element => {
  const { user, isAuthenticated } = useAuth();
  const isAdmin = user?.role === 'admin';

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/app" replace />;
  }

  return <>{children}</>;
};

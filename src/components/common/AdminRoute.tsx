import { Navigate } from "react-router-dom";
import { AuthService } from "../../features/auth/services/authService";

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteProps): JSX.Element => {
  const user = AuthService.getUser();
  const isAuthenticated = AuthService.isAuthenticated();
  const isAdmin = user?.role === 'admin';

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/app" replace />;
  }

  return <>{children}</>;
};

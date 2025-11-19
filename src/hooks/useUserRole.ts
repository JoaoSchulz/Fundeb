import { AuthService } from '../features/auth/services/authService';

export const useUserRole = () => {
  const user = AuthService.getUser();
  const role = user?.role || 'cliente';
  
  return {
    role,
    isAdmin: role === 'admin',
    isCliente: role === 'cliente',
  };
};

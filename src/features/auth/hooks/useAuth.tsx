import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthService } from "../services/authService";
import { User } from "../../../types/api";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, senha: string) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => AuthService.isAuthenticated());
  const [user, setUser] = useState<User | null>(() => AuthService.getUser());
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica o estado inicial de autenticação e usuário
    setIsAuthenticated(AuthService.isAuthenticated());
    setUser(AuthService.getUser());

    // Listener para mudanças no localStorage (de outras tabs)
    const handleStorageChange = () => {
      setIsAuthenticated(AuthService.isAuthenticated());
      setUser(AuthService.getUser());
    };

    // Listener para mudanças locais (desta tab)
    const handleAuthUserUpdated = () => {
      setIsAuthenticated(AuthService.isAuthenticated());
      setUser(AuthService.getUser());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('auth-user-updated', handleAuthUserUpdated);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-user-updated', handleAuthUserUpdated);
    };
  }, []);

  const login = (email: string, senha: string) => {
    AuthService.login({ email, senha })
      .then(() => {
        setIsAuthenticated(true);
        toast.success("Login realizado com sucesso!");
        navigate("/app");
      })
      .catch((e) => {
        console.error('Login error', e);
        toast.error("Credenciais inválidas");
        // Re-throw so error is visible in console and can be handled by dev tooling
        throw e;
      });
  };

  const logout = () => {
    AuthService.logout().finally(() => {
      setIsAuthenticated(false);
      toast.success("Logout realizado com sucesso!");
      navigate("/login");
    });
  };

  const refreshUser = async () => {
    try {
      const updatedUser = await AuthService.getProfile();
      setUser(updatedUser);
    } catch (error) {
      console.error('Error refreshing user', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

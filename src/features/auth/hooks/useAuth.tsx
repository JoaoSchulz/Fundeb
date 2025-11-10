import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthService } from "../services/authService";

interface AuthContextType {
  isAuthenticated: boolean;
  user: { nome: string } | null;
  login: (email: string, senha: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => AuthService.isAuthenticated());
  const [user, setUser] = useState<{ nome: string } | null>(() => AuthService.getUser());
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica o estado inicial de autenticação e usuário
    setIsAuthenticated(AuthService.isAuthenticated());
    setUser(AuthService.getUser());

    // Adiciona listener para mudanças no localStorage
    const handleStorageChange = () => {
      setIsAuthenticated(AuthService.isAuthenticated());
      setUser(AuthService.getUser());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (email: string, senha: string) => {
    AuthService.login({ email, senha })
      .then(() => {
        setIsAuthenticated(true);
        toast.success("Login realizado com sucesso!");
        navigate("/app");
      })
      .catch(() => {
        toast.error("Credenciais inválidas");
      });
  };

  const logout = () => {
    AuthService.logout().finally(() => {
      setIsAuthenticated(false);
      toast.success("Logout realizado com sucesso!");
      navigate("/login");
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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

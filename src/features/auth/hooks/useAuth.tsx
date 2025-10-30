import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthService } from "../services/authService";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(AuthService.isAuthenticated());
  }, []);

  const login = (email: string, password: string) => {
    AuthService.login({ email, password })
      .then(() => {
        setIsAuthenticated(true);
        toast.success("Login realizado com sucesso!");
        navigate("/");
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
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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

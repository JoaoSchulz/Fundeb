import { http } from '../../../services/http/client';
import { AuthResponse, LoginPayload, RegisterPayload, User } from '../../../types/api';

const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";

export class AuthService {
  static isAuthenticated(): boolean {
    return !!this.getToken();
  }

  static getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  static getUser(): User | null {
    const userJson = localStorage.getItem(AUTH_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  static async login(payload: LoginPayload): Promise<AuthResponse> {
    const { data } = await http.post<AuthResponse>("/auth/login", payload);

    if (data && data.token && data.user) {
      localStorage.setItem(AUTH_TOKEN_KEY, data.token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user));
      return data;
    } else {
      throw new Error("Resposta de login inválida do servidor");
    }
  }

  static async register(payload: RegisterPayload): Promise<AuthResponse> {
    const { data } = await http.post<AuthResponse>("/auth/register", payload);

    if (data && data.token && data.user) {
      localStorage.setItem(AUTH_TOKEN_KEY, data.token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user));
      return data;
    } else {
      throw new Error("Resposta de registro inválida do servidor");
    }
  }

  static async getProfile(): Promise<User> {
    const { data } = await http.get<User>("/auth/me");
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data));
    return data;
  }

  static async logout(): Promise<void> {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  }
}



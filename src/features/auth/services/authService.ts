export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthSession = {
  token: string;
};

const AUTH_FLAG_KEY = "isAuthenticated";
const AUTH_TOKEN_KEY = "auth_token";

export class AuthService {
  static isAuthenticated(): boolean {
    return localStorage.getItem(AUTH_FLAG_KEY) === "true";
  }

  static getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  static async login(payload: LoginPayload): Promise<AuthSession> {
    // TODO: substituir por chamada real à API
    if (!payload.email || !payload.password) {
      throw new Error("Credenciais inválidas");
    }

    // Simula token
    const fakeToken = btoa(`${payload.email}:${Date.now()}`);
    localStorage.setItem(AUTH_FLAG_KEY, "true");
    localStorage.setItem(AUTH_TOKEN_KEY, fakeToken);
    return { token: fakeToken };
  }

  static async logout(): Promise<void> {
    localStorage.removeItem(AUTH_FLAG_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}



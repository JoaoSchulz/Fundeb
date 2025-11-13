import { getEnv } from "../../utils/env";
import { AuthService } from "../../features/auth/services/authService";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type HttpRequestOptions = {
  method?: HttpMethod;
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
  signal?: AbortSignal;
};

export type HttpResponse<T> = {
  ok: boolean;
  status: number;
  data: T;
};

const buildQueryString = (query?: HttpRequestOptions["query"]): string => {
  if (!query) return "";
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    params.append(key, String(value));
  });
  const qs = params.toString();
  return qs ? `?${qs}` : "";
};

const defaultHeaders: Record<string, string> = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export class HttpClient {
  private readonly baseUrl: string | undefined;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl ?? getEnv().apiBaseUrl;
    // Debug: log the base URL being used
    console.log('HttpClient initialized with baseUrl:', this.baseUrl);
  }

  async request<T = unknown>(
    path: string,
    { method = "GET", headers, query, body, signal }: HttpRequestOptions = {}
  ): Promise<HttpResponse<T>> {
    const urlBase = this.baseUrl ?? "";
    const qs = buildQueryString(query);
    const url = `${urlBase}${path}${qs}`;
    
    // Debug: log the full URL being requested
    console.log(`HTTP ${method} request to:`, url);

    const authToken = AuthService.getToken();

    const response = await fetch(url, {
      method,
      headers: {
        ...defaultHeaders,
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        ...(headers ?? {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });

    const contentType = response.headers.get("Content-Type") || "";
    const isJson = contentType.includes("application/json");
    const data = (isJson ? await response.json() : await response.text()) as T;

    if (!response.ok) {
      const error = new Error(
        `HTTP ${response.status}: ${typeof data === "string" ? data : "Erro na requisição"}`,
      ) as Error & { status: number; data: unknown };
      error.status = response.status;
      error.data = data;

      // Tratamento específico para erros comuns
      if (response.status === 401) {
        // Token inválido/expirado - fazer logout
        AuthService.logout();
        throw new Error("Sessão expirada. Por favor, faça login novamente.");
      }
      
      if (response.status === 500) {
        throw new Error("Erro interno do servidor. Por favor, tente novamente mais tarde.");
      }

      throw error;
    }

    return { ok: true, status: response.status, data };
  }

  get<T = unknown>(path: string, options?: Omit<HttpRequestOptions, "method">) {
    return this.request<T>(path, { ...(options ?? {}), method: "GET" });
  }

  post<T = unknown>(path: string, body?: unknown, options?: Omit<HttpRequestOptions, "method" | "body">) {
    return this.request<T>(path, { ...(options ?? {}), method: "POST", body });
  }

  put<T = unknown>(path: string, body?: unknown, options?: Omit<HttpRequestOptions, "method" | "body">) {
    return this.request<T>(path, { ...(options ?? {}), method: "PUT", body });
  }

  patch<T = unknown>(path: string, body?: unknown, options?: Omit<HttpRequestOptions, "method" | "body">) {
    return this.request<T>(path, { ...(options ?? {}), method: "PATCH", body });
  }

  delete<T = unknown>(path: string, options?: Omit<HttpRequestOptions, "method">) {
    return this.request<T>(path, { ...(options ?? {}), method: "DELETE" });
  }
}

// Use a variável de ambiente para a URL do backend
export const http = new HttpClient();
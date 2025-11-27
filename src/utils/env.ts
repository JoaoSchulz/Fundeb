export type Env = {
  apiBaseUrl: string | undefined;
};

export const getEnv = (): Env => {
  // Vite expõe variáveis com import.meta.env
  let apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  
  // Fallback para produção se a variável não estiver definida
  if (!apiBaseUrl && typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'fundebfront.vercel.app' || hostname.includes('vercel.app')) {
      apiBaseUrl = 'https://fundeb-back-end.vercel.app';
    }
  }

  return { apiBaseUrl };
};

export const requireEnv = (key: keyof Env, fallback?: string): string => {
  const env = getEnv();
  const value = env[key] ?? fallback;
  if (!value) {
    throw new Error(`Env variável ausente: ${String(key)}`);
  }
  return value;
};



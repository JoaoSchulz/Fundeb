export type Env = {
  apiBaseUrl: string | undefined;
};

interface ViteMeta {
  env?: {
    VITE_API_BASE_URL?: string;
  };
}

export const getEnv = (): Env => {
  // Vite expõe variáveis com import.meta.env
  const viteMeta = import.meta as unknown as ViteMeta;
  const apiBaseUrl = viteMeta.env?.VITE_API_BASE_URL;

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



/**
 * Utilitário para debug em desenvolvimento
 */

const DEBUG_PREFIX = '[DEBUG]';

interface DebugOptions {
  type?: 'info' | 'warn' | 'error';
  data?: unknown;
}

export const debugLog = (message: string, options: DebugOptions = {}): void => {
  // No Vite, import.meta.env.DEV é true em desenvolvimento
  if (!import.meta.env.DEV) return;

  const { type = 'info', data } = options;
  const timestamp = new Date().toISOString();
  const prefix = `${DEBUG_PREFIX} [${timestamp}]`;

  switch (type) {
    case 'warn':
      console.warn(`${prefix} ${message}`, data || '');
      break;
    case 'error':
      console.error(`${prefix} ${message}`, data || '');
      break;
    default:
      console.log(`${prefix} ${message}`, data || '');
  }
};

export const measurePerformance = async <T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> => {
  if (!import.meta.env.DEV) return fn();

  const start = performance.now();
  try {
    const result = await fn();
    const end = performance.now();
    debugLog(`${name} took ${Math.round(end - start)}ms`);
    return result;
  } catch (error) {
    const end = performance.now();
    debugLog(`${name} failed after ${Math.round(end - start)}ms`, { type: 'error', data: error });
    throw error;
  }
};
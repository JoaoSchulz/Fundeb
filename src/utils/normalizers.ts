export const normalizeCategoryKey = (key: string): string => {
  if (!key) return "";
  // Remove diacritics
    // Remove common diacritics (combine marks) and normalize
    const noAccents = key.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // Remove punctuation, collapse whitespace to underscore and lowercase
    return noAccents
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, "_")
      .toLowerCase();
};

import { parseBrazilianNumber } from "./formatters";

export const normalizeCategoriasObject = (raw: Record<string, any> | undefined) => {
  const normalized: Record<string, number> = {};
  if (!raw) return normalized;
  Object.entries(raw).forEach(([k, v]) => {
    const nk = normalizeCategoryKey(k);
    if (!nk) return;
    // valores vindos do backend podem ser number ou string com vírgula
    const parsed = typeof v === "number" ? v : parseBrazilianNumber(v);
    normalized[nk] = parsed ?? 0;
  });
  return normalized;
};

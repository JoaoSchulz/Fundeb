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

export const normalizeCategoriasObject = (raw: Record<string, number | null> | undefined) => {
  const normalized: Record<string, number | null> = {};
  if (!raw) return normalized;
  Object.entries(raw).forEach(([k, v]) => {
    const nk = normalizeCategoryKey(k);
    if (nk) normalized[nk] = v ?? 0;
  });
  return normalized;
};

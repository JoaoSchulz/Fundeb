export const formatCurrency = (
  value: number,
  locale: string = "pt-BR",
  currency: string = "BRL"
): string => {
  // Corrigir -0 para 0
  const normalizedValue = value === 0 || Object.is(value, -0) ? 0 : value;
  
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(normalizedValue);
};

export const parseCurrency = (value: string): number => {
  const cleaned = value.replace(/[^\d,-]/g, "").replace(",", ".");
  return parseFloat(cleaned) || 0;
};

export const parseBrazilianNumber = (value: string | number | null | undefined): number => {
  if (value == null) return 0;
  if (typeof value === "number") return value;
  // Remove all non-digit, non-comma, non-dot, non-minus characters
  const s = String(value).replace(/[^0-9,.-]/g, "").replace(/\./g, "");
  const normalized = s.replace(/,/g, ".");
  const n = parseFloat(normalized);
  return Number.isFinite(n) ? n : 0;
};

export const parseBrazilianInteger = (value: string | number | null | undefined): number => {
  const n = parseBrazilianNumber(value);
  return Math.round(n);
};

export const formatDate = (
  date: Date | string,
  locale: string = "pt-BR"
): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(dateObj);
};

export const formatDateTime = (
  date: Date | string,
  locale: string = "pt-BR"
): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const dateStr = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(dateObj);
  const timeStr = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(dateObj);
  return `${dateStr} - ${timeStr}`;
};

export const formatDateLong = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  
  const day = dateObj.getDate();
  const month = monthNames[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  
  return `${day.toString().padStart(2, "0")} ${month} de ${year}`;
};

export const formatPercentage = (
  value: number,
  decimals: number = 1
): string => {
  return `${value.toFixed(decimals)}%`;
};

export const formatNumber = (
  value: number,
  locale: string = "pt-BR"
): string => {
  return new Intl.NumberFormat(locale).format(value);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

export const capitalizeFirst = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const formatDifference = (value: string): {
  formatted: string;
  isPositive: boolean;
  isZero: boolean;
} => {
  const isPositive = value.startsWith("+");
  const isZero = value === "R$ 0,00" || value === "0%";

  return {
    formatted: value,
    isPositive: !isZero && isPositive,
    isZero,
  };
};

export const formatCurrency = (
  value: number,
  locale: string = "pt-BR",
  currency: string = "BRL"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const parseCurrency = (value: string): number => {
  const cleaned = value.replace(/[^\d,-]/g, "").replace(",", ".");
  return parseFloat(cleaned) || 0;
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
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateObj);
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

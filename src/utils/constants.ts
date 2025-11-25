/**
 * Breakpoints padrão do Tailwind:
 * sm: 640px (mobile grande/tablet pequeno)
 * md: 768px (tablet)
 * lg: 1024px (desktop)
 * xl: 1280px (desktop grande)
 * 2xl: 1536px (desktop muito grande)
 */
export const LAYOUT_CONSTANTS = {
  SPACING: {
    PAGE_HORIZONTAL: "px-4 md:px-6 lg:px-8",
    PAGE_VERTICAL: "py-6 md:py-8",
    SECTION_GAP: "gap-6 md:gap-8",
    CARD_PADDING: "p-4 md:p-6",
    CARD_GAP: "gap-4 md:gap-6",
    BUTTON_GAP: "gap-2 sm:gap-3",
  },
  BUTTON: {
    HEIGHT: "h-10 md:h-11",
    PADDING: "px-4 py-2.5",
    ICON_SIZE: "w-5 h-5",
    MOBILE_FULL: "w-full sm:w-auto",
    PRIMARY:
      "h-11 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#22a3eb] hover:bg-[#1c8ec9] text-white rounded-lg transition-colors",
    PRIMARY_WITH_ICON:
      "h-11 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#22a3eb] hover:bg-[#1c8ec9] text-white rounded-lg transition-colors w-full sm:w-auto",
    PRIMARY_FULL_WIDTH:
      "w-full h-11 flex items-center justify-center px-4 py-2.5 bg-[#22a3eb] hover:bg-[#1c8ec9] text-white rounded-lg transition-colors font-semibold",
  },
  INPUT: {
    HEIGHT: "h-10 md:h-11",
    PADDING: "px-3.5 py-2.5",
  },
  CARD: {
    MIN_WIDTH: "min-w-full md:min-w-[280px] lg:min-w-[320px]",
    BORDER_RADIUS: "rounded-xl",
    BORDER: "border border-solid border-[#e9e9eb]",
    SHADOW: "shadow-shadows-shadow-xs",
    RESPONSIVE_WIDTH: "w-full max-w-full lg:max-w-[1400px]",
  },
  TABLE: {
    HEADER_HEIGHT: "h-11",
    ROW_HEIGHT: "min-h-[72px]",
    CELL_PADDING: "px-4 py-3 md:px-6 md:py-4",
    MIN_WIDTH: "min-w-[800px]",
    WRAPPER: "overflow-x-auto",
  },
  LAYOUT: {
    CONTAINER: "w-full max-w-[1400px] mx-auto",
    FLEX_COL_MD_ROW: "flex flex-col md:flex-row",
    FLEX_COL_SM_ROW: "flex flex-col sm:flex-row",
    GRID_RESPONSIVE: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  },
  TRANSITIONS: {
    DEFAULT: "transition-all duration-200",
    SLOW: "transition-all duration-300",
  },
} as const;

export const COLORS = {
  PRIMARY: "#22a3eb",
  PRIMARY_HOVER: "#1c8ec9",
  TEXT_PRIMARY: "#181d27",
  TEXT_SECONDARY: "#535861",
  TEXT_TERTIARY: "#717680",
  BORDER: "#e9e9eb",
  BORDER_HOVER: "#d5d6d9",
  SUCCESS: "#069454",
  ERROR: "#d92c20",
  WARNING: "#ff9d58",
  BG_NEUTRAL: "#fcfcfc",
} as const;

export const ESTADOS = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
] as const;

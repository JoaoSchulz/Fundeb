export const LAYOUT_CONSTANTS = {
  SPACING: {
    PAGE_HORIZONTAL: "px-4 md:px-6 lg:px-8",
    PAGE_VERTICAL: "py-6 md:py-8",
    SECTION_GAP: "gap-6 md:gap-8",
    CARD_PADDING: "p-4 md:p-6",
    CARD_GAP: "gap-4 md:gap-6",
  },
  BUTTON: {
    HEIGHT: "h-10",
    PADDING: "px-4 py-2.5",
    ICON_SIZE: "w-5 h-5",
  },
  INPUT: {
    HEIGHT: "h-10",
    PADDING: "px-3.5 py-2.5",
  },
  CARD: {
    MIN_WIDTH: "min-w-full md:min-w-[280px] lg:min-w-[320px]",
    BORDER_RADIUS: "rounded-xl",
    BORDER: "border border-solid border-[#e9e9eb]",
    SHADOW: "shadow-shadows-shadow-xs",
  },
  TABLE: {
    HEADER_HEIGHT: "h-11",
    ROW_HEIGHT: "min-h-[72px]",
    CELL_PADDING: "px-6 py-4",
    MIN_WIDTH: "min-w-[800px]",
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

// =======================
// RAW TOKENS (Base Colors)
// =======================
export const ColorTokens = {
  primary: "#B16CEA",
  secondary: "#FF5E9C",
  accent: "#3BE0D4",

  neutral0: "#FFFFFF",
  neutral50: "#F1F1F3",
  neutral100: "#E4E4E7",
  neutral200: "#D9D9DC",
  neutral300: "#B4B4B7",
  neutral400: "#9E9E9E",
  neutral500: "#6B6B6B",
  neutral600: "#444444",
  neutral700: "#1A1A1D",
  neutral800: "#0D0D0F",
  neutral900: "#000000",

  success: "#4ADE80",
  warning: "#FACC15",
  danger: "#EF4444",
} as const;


// =======================
// NON-INVERT COLORS
// =======================
const nonInvertColors = ["primary", "secondary", "accent", "success", "warning", "danger"];

function invertHex(hex: string) {
  if (!hex.startsWith("#")) return hex;
  const num = parseInt(hex.slice(1), 16);
  return "#" + (0xffffff - num).toString(16).padStart(6, "0");
}


// =======================
// UI COLORS FOR LIGHT/DARK
// =======================
export const Colors = {
  light: {
    // Backgrounds
    background: "#FFFFFF",
    background2: "#F5F5F7",

    // Text
    text: "#111111",
    textSecondary: "#444444",
    textMuted: "#6B6B6B",

    // Border
    border: "#E4E4E7",

    // Raw tokens
    ...ColorTokens,
  },

  dark: {
    background: "#0D0D0F",
    background2: "#1A1A1D",

    text: "#FFFFFF",
    textSecondary: "#A1A1AA",
    textMuted: "#787878",

    border: "#27272A",

    ...Object.fromEntries(
      Object.entries(ColorTokens).map(([key, value]) => [
        key,
        nonInvertColors.includes(key) ? value : invertHex(value as string),
      ])
    ),
  },
} as const;

export type ThemeColors = typeof Colors.light;

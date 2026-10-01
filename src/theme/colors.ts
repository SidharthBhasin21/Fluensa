// Fluensa color tokens.
// Keep these in sync with `src/theme/theme.css` (used by NativeWind classes).
// Use this file when a color is needed in JS, e.g. icon colors or StatusBar.

export const colors = {
  // Primary / brand
  primary: "#14B8A6", // Fluensa Teal
  primaryDeep: "#0F766E", // Fluensa Deep Teal
  accent: "#FACC15", // Fluensa Yellow
  coral: "#FF7A59", // Fluensa Coral

  // Semantic
  success: "#22C55E",
  warning: "#F59E0B",
  streak: "#FB923C",
  error: "#EF4444",
  info: "#3B82F6",

  // Neutrals
  foreground: "#0F172A", // Text / Primary
  muted: "#475569", // Text / Secondary
  border: "#E2E8F0",
  surface: "#F8FAFC",
  background: "#FFFFFF",
} as const;

export type ColorName = keyof typeof colors;

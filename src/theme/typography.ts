// Fluensa typography tokens (Poppins).
// Keep these in sync with `src/theme/theme.css` and the typography utilities in `global.css`.

// Font family names must match the keys loaded in `useFonts` (and the font PostScript names).
export const fontFamily = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semibold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
} as const;

// Font files loaded once in the root layout.
export const fontAssets = {
  [fontFamily.regular]: require("@/assets/fonts/Poppins-Regular.ttf"),
  [fontFamily.medium]: require("@/assets/fonts/Poppins-Medium.ttf"),
  [fontFamily.semibold]: require("@/assets/fonts/Poppins-SemiBold.ttf"),
  [fontFamily.bold]: require("@/assets/fonts/Poppins-Bold.ttf"),
};

// Type scale from the design system.
// lineHeight = fontSize × design ratio, rounded to whole pixels.
export const typography = {
  h1: { fontFamily: fontFamily.bold, fontSize: 32, lineHeight: 38 }, // 1.2 — Page / Screen title
  h2: { fontFamily: fontFamily.semibold, fontSize: 24, lineHeight: 31 }, // 1.3 — Section title
  h3: { fontFamily: fontFamily.semibold, fontSize: 20, lineHeight: 26 }, // 1.3 — Card / Module title
  h4: { fontFamily: fontFamily.medium, fontSize: 16, lineHeight: 22 }, // 1.4 — Subheading
  bodyLg: { fontFamily: fontFamily.regular, fontSize: 16, lineHeight: 26 }, // 1.6 — Important content
  bodyMd: { fontFamily: fontFamily.regular, fontSize: 14, lineHeight: 22 }, // 1.6 — Body text
  bodySm: { fontFamily: fontFamily.regular, fontSize: 13, lineHeight: 21 }, // 1.6 — Supporting text
  caption: { fontFamily: fontFamily.regular, fontSize: 11, lineHeight: 15 }, // 1.4 — Labels, meta text
} as const;

export type TypographyVariant = keyof typeof typography;

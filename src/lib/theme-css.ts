import { DEFAULT_THEME, type ThemeSettings } from "@/lib/data/settings";

const FONT_STACKS: Record<string, string> = {
  Inter: "'Inter', sans-serif",
  Roboto: "'Roboto', sans-serif",
  "Open Sans": "'Open Sans', sans-serif",
  System: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

const GOOGLE_FONT_URLS: Record<string, string> = {
  Inter: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
  Roboto: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap",
  "Open Sans": "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap",
};

/**
 * Build CSS string to override :root CSS vars with theme values.
 * Returns empty string if theme matches all defaults (no override needed).
 */
export function buildThemeCss(theme: ThemeSettings): string {
  const isDefault =
    theme.primaryColor === DEFAULT_THEME.primaryColor &&
    theme.secondaryColor === DEFAULT_THEME.secondaryColor &&
    theme.accentColor === DEFAULT_THEME.accentColor &&
    theme.radius === DEFAULT_THEME.radius &&
    theme.fontFamily === DEFAULT_THEME.fontFamily;

  if (isDefault) return "";

  const fontStack = FONT_STACKS[theme.fontFamily] ?? FONT_STACKS.System;
  const fontImport = GOOGLE_FONT_URLS[theme.fontFamily];
  const importRule = fontImport ? `@import url('${fontImport}');` : "";

  return `${importRule}
:root {
  --primary: ${theme.primaryColor};
  --secondary: ${theme.secondaryColor};
  --accent: ${theme.accentColor};
  --radius: ${theme.radius};
}
body { font-family: ${fontStack}; }`;
}

/**
 * Get the Google Font URL for a given font family (for iframe injection).
 */
export function getGoogleFontUrl(fontFamily: string): string | null {
  return GOOGLE_FONT_URLS[fontFamily] ?? null;
}

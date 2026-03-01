import { prisma } from "@/lib/prisma";

export type ThemeSettings = {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  radius: string;
  fontFamily: string;
};

export type SiteSettings = {
  logoUrl: string;
  menuItems: Array<{ label: string; url: string }>;
  theme: ThemeSettings;
};

export const DEFAULT_THEME: ThemeSettings = {
  primaryColor: "0 0% 9%",
  secondaryColor: "0 0% 96.1%",
  accentColor: "0 0% 96.1%",
  radius: "0.5rem",
  fontFamily: "Inter",
};

const DEFAULT_SETTINGS: SiteSettings = {
  logoUrl: "",
  menuItems: [],
  theme: { ...DEFAULT_THEME },
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const row = await prisma.siteSettings.findUnique({
    where: { id: "default" },
  });

  if (!row) return DEFAULT_SETTINGS;

  const data = row.data as Record<string, unknown>;
  const rawTheme = (data.theme ?? {}) as Record<string, unknown>;

  return {
    logoUrl: typeof data.logoUrl === "string" ? data.logoUrl : DEFAULT_SETTINGS.logoUrl,
    menuItems: Array.isArray(data.menuItems) ? data.menuItems : DEFAULT_SETTINGS.menuItems,
    theme: {
      primaryColor: typeof rawTheme.primaryColor === "string" ? rawTheme.primaryColor : DEFAULT_THEME.primaryColor,
      secondaryColor: typeof rawTheme.secondaryColor === "string" ? rawTheme.secondaryColor : DEFAULT_THEME.secondaryColor,
      accentColor: typeof rawTheme.accentColor === "string" ? rawTheme.accentColor : DEFAULT_THEME.accentColor,
      radius: typeof rawTheme.radius === "string" ? rawTheme.radius : DEFAULT_THEME.radius,
      fontFamily: typeof rawTheme.fontFamily === "string" ? rawTheme.fontFamily : DEFAULT_THEME.fontFamily,
    },
  };
}

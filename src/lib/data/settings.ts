import { prisma } from "@/lib/prisma";

export type EditorHeaderSettings = {
  logoUrl: string;
  menuItems: Array<{ label: string; url: string }>;
};

const DEFAULT_SETTINGS: EditorHeaderSettings = {
  logoUrl: "",
  menuItems: [],
};

export async function getSiteSettings(): Promise<EditorHeaderSettings> {
  const row = await prisma.siteSettings.findUnique({
    where: { id: "default" },
  });

  if (!row) return DEFAULT_SETTINGS;

  const data = row.data as Record<string, unknown>;
  return {
    logoUrl: typeof data.logoUrl === "string" ? data.logoUrl : DEFAULT_SETTINGS.logoUrl,
    menuItems: Array.isArray(data.menuItems) ? data.menuItems : DEFAULT_SETTINGS.menuItems,
  };
}

import { describe, it, expect, vi, beforeEach } from "vitest";

const mockFindUnique = vi.fn();

vi.mock("@/lib/prisma", () => ({
  prisma: {
    siteSettings: {
      findUnique: (...args: unknown[]) => mockFindUnique(...args),
    },
  },
}));

import { getSiteSettings, DEFAULT_THEME } from "../data/settings";

describe("getSiteSettings", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns full defaults when no row exists", async () => {
    mockFindUnique.mockResolvedValue(null);
    const result = await getSiteSettings();

    expect(result).toEqual({
      logoUrl: "",
      menuItems: [],
      theme: DEFAULT_THEME,
    });
  });

  it("returns defaults when row has no theme field", async () => {
    mockFindUnique.mockResolvedValue({
      id: "default",
      data: { logoUrl: "https://example.com/logo.png", menuItems: [] },
    });

    const result = await getSiteSettings();

    expect(result.logoUrl).toBe("https://example.com/logo.png");
    expect(result.theme).toEqual(DEFAULT_THEME);
  });

  it("merges partial theme with defaults", async () => {
    mockFindUnique.mockResolvedValue({
      id: "default",
      data: {
        logoUrl: "",
        menuItems: [],
        theme: { primaryColor: "220 70% 50%" },
      },
    });

    const result = await getSiteSettings();

    expect(result.theme.primaryColor).toBe("220 70% 50%");
    expect(result.theme.secondaryColor).toBe(DEFAULT_THEME.secondaryColor);
    expect(result.theme.accentColor).toBe(DEFAULT_THEME.accentColor);
    expect(result.theme.radius).toBe(DEFAULT_THEME.radius);
    expect(result.theme.fontFamily).toBe(DEFAULT_THEME.fontFamily);
  });

  it("uses full custom theme when all fields present", async () => {
    const customTheme = {
      primaryColor: "220 70% 50%",
      secondaryColor: "220 10% 96%",
      accentColor: "150 60% 40%",
      radius: "1rem",
      fontFamily: "Roboto",
    };

    mockFindUnique.mockResolvedValue({
      id: "default",
      data: { logoUrl: "", menuItems: [], theme: customTheme },
    });

    const result = await getSiteSettings();
    expect(result.theme).toEqual(customTheme);
  });

  it("falls back to defaults for invalid theme field types", async () => {
    mockFindUnique.mockResolvedValue({
      id: "default",
      data: {
        logoUrl: "",
        menuItems: [],
        theme: { primaryColor: 123, radius: null, fontFamily: true },
      },
    });

    const result = await getSiteSettings();

    expect(result.theme.primaryColor).toBe(DEFAULT_THEME.primaryColor);
    expect(result.theme.radius).toBe(DEFAULT_THEME.radius);
    expect(result.theme.fontFamily).toBe(DEFAULT_THEME.fontFamily);
  });
});

import { describe, it, expect } from "vitest";
import { buildThemeCss, getGoogleFontUrl } from "@/lib/theme-css";
import { DEFAULT_THEME } from "@/lib/data/settings";

describe("buildThemeCss", () => {
  it("returns empty string for default theme", () => {
    expect(buildThemeCss(DEFAULT_THEME)).toBe("");
  });

  it("generates CSS vars for custom primary color", () => {
    const theme = { ...DEFAULT_THEME, primaryColor: "220 90% 56%" };
    const css = buildThemeCss(theme);
    expect(css).toContain("--primary: 220 90% 56%");
  });

  it("generates --secondary, --accent, and --radius vars", () => {
    const theme = {
      ...DEFAULT_THEME,
      secondaryColor: "210 40% 96%",
      accentColor: "210 40% 96%",
      radius: "0.75rem",
    };
    const css = buildThemeCss(theme);
    expect(css).toContain("--secondary: 210 40% 96%");
    expect(css).toContain("--accent: 210 40% 96%");
    expect(css).toContain("--radius: 0.75rem");
  });

  it("includes @import for Inter font", () => {
    const theme = { ...DEFAULT_THEME, primaryColor: "220 90% 56%", fontFamily: "Inter" };
    const css = buildThemeCss(theme);
    expect(css).toContain("@import url('https://fonts.googleapis.com/css2?family=Inter");
  });

  it("includes @import for Roboto font", () => {
    const theme = { ...DEFAULT_THEME, primaryColor: "220 90% 56%", fontFamily: "Roboto" };
    const css = buildThemeCss(theme);
    expect(css).toContain("@import url('https://fonts.googleapis.com/css2?family=Roboto");
  });

  it("includes @import for Open Sans font", () => {
    const theme = { ...DEFAULT_THEME, primaryColor: "220 90% 56%", fontFamily: "Open Sans" };
    const css = buildThemeCss(theme);
    expect(css).toContain("@import url('https://fonts.googleapis.com/css2?family=Open+Sans");
  });

  it("does not include @import for System font", () => {
    const theme = { ...DEFAULT_THEME, primaryColor: "220 90% 56%", fontFamily: "System" };
    const css = buildThemeCss(theme);
    expect(css).not.toContain("@import");
  });

  it("sets body font-family for custom font", () => {
    const theme = { ...DEFAULT_THEME, primaryColor: "220 90% 56%", fontFamily: "Roboto" };
    const css = buildThemeCss(theme);
    expect(css).toContain("body { font-family: 'Roboto', sans-serif; }");
  });

  it("uses system font stack for System font", () => {
    const theme = { ...DEFAULT_THEME, primaryColor: "220 90% 56%", fontFamily: "System" };
    const css = buildThemeCss(theme);
    expect(css).toContain("-apple-system");
  });
});

describe("getGoogleFontUrl", () => {
  it("returns URL for Inter", () => {
    const url = getGoogleFontUrl("Inter");
    expect(url).toContain("fonts.googleapis.com");
    expect(url).toContain("Inter");
  });

  it("returns URL for Roboto", () => {
    expect(getGoogleFontUrl("Roboto")).toContain("Roboto");
  });

  it("returns URL for Open Sans", () => {
    expect(getGoogleFontUrl("Open Sans")).toContain("Open+Sans");
  });

  it("returns null for System font", () => {
    expect(getGoogleFontUrl("System")).toBeNull();
  });

  it("returns null for unknown font", () => {
    expect(getGoogleFontUrl("Comic Sans")).toBeNull();
  });
});

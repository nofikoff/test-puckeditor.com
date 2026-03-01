import { describe, it, expect } from "vitest";
import { hexToHsl, hslToHex } from "@/lib/color-utils";

describe("hexToHsl", () => {
  it("converts pure red", () => {
    expect(hexToHsl("#FF0000")).toBe("0 100% 50%");
  });

  it("converts pure green", () => {
    expect(hexToHsl("#00FF00")).toBe("120 100% 50%");
  });

  it("converts pure blue", () => {
    expect(hexToHsl("#0000FF")).toBe("240 100% 50%");
  });

  it("converts black", () => {
    expect(hexToHsl("#000000")).toBe("0 0% 0%");
  });

  it("converts white", () => {
    expect(hexToHsl("#FFFFFF")).toBe("0 0% 100%");
  });

  it("converts mid gray", () => {
    expect(hexToHsl("#808080")).toBe("0 0% 50%");
  });

  it("handles shorthand hex (#RGB)", () => {
    expect(hexToHsl("#F00")).toBe("0 100% 50%");
  });

  it("handles hex without hash", () => {
    expect(hexToHsl("FF0000")).toBe("0 100% 50%");
  });

  it("converts a typical brand color", () => {
    const hsl = hexToHsl("#3B82F6");
    expect(hsl).toMatch(/^\d+ \d+% \d+%$/);
  });
});

describe("hslToHex", () => {
  it("converts pure red HSL", () => {
    expect(hslToHex("0 100% 50%")).toBe("#ff0000");
  });

  it("converts black", () => {
    expect(hslToHex("0 0% 0%")).toBe("#000000");
  });

  it("converts white", () => {
    expect(hslToHex("0 0% 100%")).toBe("#ffffff");
  });

  it("converts mid gray", () => {
    const hex = hslToHex("0 0% 50%");
    expect(hex).toBe("#808080");
  });

  it("returns #000000 for invalid input", () => {
    expect(hslToHex("invalid")).toBe("#000000");
  });
});

describe("round-trip conversion", () => {
  const testCases = ["#ff0000", "#00ff00", "#0000ff", "#000000", "#ffffff"];

  it.each(testCases)("hex → hsl → hex preserves %s", (hex) => {
    const hsl = hexToHsl(hex);
    const roundTripped = hslToHex(hsl);
    expect(roundTripped).toBe(hex);
  });
});

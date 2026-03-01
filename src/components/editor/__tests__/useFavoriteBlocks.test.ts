import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

// Module-level state in useFavoriteBlocks needs to be reset between tests,
// so we dynamically import with cache busting via vi.resetModules()

describe("useFavoriteBlocks", () => {
  let mockStorage: Record<string, string> = {};

  beforeEach(() => {
    mockStorage = {};
    vi.resetModules();

    vi.stubGlobal("localStorage", {
      getItem: vi.fn((key: string) => mockStorage[key] ?? null),
      setItem: vi.fn((key: string, value: string) => {
        mockStorage[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete mockStorage[key];
      }),
    });
  });

  async function importHook() {
    const mod = await import("../useFavoriteBlocks");
    return mod.useFavoriteBlocks;
  }

  it("starts with empty favorites when localStorage is empty", async () => {
    const useFavoriteBlocks = await importHook();
    const { result } = renderHook(() => useFavoriteBlocks());

    expect(result.current.favorites.size).toBe(0);
  });

  it("loads favorites from localStorage on init", async () => {
    mockStorage["puck-favorite-blocks"] = JSON.stringify(["Hero Banner", "Heading"]);
    const useFavoriteBlocks = await importHook();
    const { result } = renderHook(() => useFavoriteBlocks());

    expect(result.current.favorites.size).toBe(2);
    expect(result.current.isFavorite("Hero Banner")).toBe(true);
    expect(result.current.isFavorite("Heading")).toBe(true);
    expect(result.current.isFavorite("Text")).toBe(false);
  });

  it("toggles a favorite and persists to localStorage", async () => {
    const useFavoriteBlocks = await importHook();
    const { result } = renderHook(() => useFavoriteBlocks());

    act(() => {
      result.current.toggle("Hero Banner");
    });

    expect(result.current.isFavorite("Hero Banner")).toBe(true);
    expect(mockStorage["puck-favorite-blocks"]).toContain("Hero Banner");

    act(() => {
      result.current.toggle("Hero Banner");
    });

    expect(result.current.isFavorite("Hero Banner")).toBe(false);
  });

  it("handles malformed localStorage data gracefully", async () => {
    mockStorage["puck-favorite-blocks"] = "not valid json{";
    const useFavoriteBlocks = await importHook();
    const { result } = renderHook(() => useFavoriteBlocks());

    expect(result.current.favorites.size).toBe(0);
  });

  it("handles non-array localStorage data gracefully", async () => {
    mockStorage["puck-favorite-blocks"] = JSON.stringify({ key: "value" });
    const useFavoriteBlocks = await importHook();
    const { result } = renderHook(() => useFavoriteBlocks());

    expect(result.current.favorites.size).toBe(0);
  });
});

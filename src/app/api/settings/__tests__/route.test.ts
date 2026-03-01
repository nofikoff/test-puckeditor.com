import { describe, it, expect, vi, beforeEach } from "vitest";

const mockFindUnique = vi.fn();
const mockUpsert = vi.fn();

vi.mock("next-auth", () => ({
  getServerSession: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({
  authOptions: {},
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    siteSettings: {
      findUnique: (...args: unknown[]) => mockFindUnique(...args),
      upsert: (...args: unknown[]) => mockUpsert(...args),
    },
  },
}));

import { NextRequest } from "next/server";
import { GET, PUT } from "../route";
import { getServerSession } from "next-auth";
import { DEFAULT_THEME } from "@/lib/data/settings";

function makePutRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/settings", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("GET /api/settings", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns defaults when no row exists", async () => {
    mockFindUnique.mockResolvedValue(null);

    const res = await GET();
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.logoUrl).toBe("");
    expect(json.menuItems).toEqual([]);
    expect(json.theme).toEqual(DEFAULT_THEME);
  });

  it("returns stored data when row exists", async () => {
    const storedData = {
      logoUrl: "https://example.com/logo.svg",
      menuItems: [{ label: "Home", url: "/" }],
      theme: {
        primaryColor: "220 90% 56%",
        secondaryColor: "210 40% 96%",
        accentColor: "210 40% 96%",
        radius: "0.75rem",
        fontFamily: "Roboto",
      },
    };
    mockFindUnique.mockResolvedValue({ id: "default", data: storedData });

    const res = await GET();
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.logoUrl).toBe("https://example.com/logo.svg");
    expect(json.menuItems).toHaveLength(1);
    expect(json.theme.fontFamily).toBe("Roboto");
  });

  it("adds default theme when theme field is missing", async () => {
    mockFindUnique.mockResolvedValue({
      id: "default",
      data: { logoUrl: "", menuItems: [] },
    });

    const res = await GET();
    const json = await res.json();
    expect(json.theme).toEqual(DEFAULT_THEME);
  });

  it("returns 500 on DB error", async () => {
    mockFindUnique.mockRejectedValue(new Error("DB connection failed"));

    const res = await GET();
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toBe("Internal server error");
  });
});

describe("PUT /api/settings", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 when not authenticated", async () => {
    vi.mocked(getServerSession).mockResolvedValue(null);

    const res = await PUT(
      makePutRequest({ logoUrl: "", menuItems: [], theme: DEFAULT_THEME })
    );
    expect(res.status).toBe(401);
    const json = await res.json();
    expect(json.error).toBe("Unauthorized");
  });

  it("returns 400 when logoUrl is not a string", async () => {
    vi.mocked(getServerSession).mockResolvedValue({ user: { name: "admin" } });

    const res = await PUT(
      makePutRequest({ logoUrl: 123, menuItems: [], theme: DEFAULT_THEME })
    );
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("logoUrl must be a string");
  });

  it("returns 400 when menuItems is not an array", async () => {
    vi.mocked(getServerSession).mockResolvedValue({ user: { name: "admin" } });

    const res = await PUT(
      makePutRequest({ logoUrl: "", menuItems: "not-array", theme: DEFAULT_THEME })
    );
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("menuItems must be an array");
  });

  it("upserts settings on valid request", async () => {
    vi.mocked(getServerSession).mockResolvedValue({ user: { name: "admin" } });
    const savedData = {
      logoUrl: "https://example.com/logo.svg",
      menuItems: [{ label: "Home", url: "/" }],
      theme: DEFAULT_THEME,
    };
    mockUpsert.mockResolvedValue({ id: "default", data: savedData });

    const res = await PUT(makePutRequest(savedData));
    expect(res.status).toBe(200);
    expect(mockUpsert).toHaveBeenCalledTimes(1);

    const call = mockUpsert.mock.calls[0][0];
    expect(call.where.id).toBe("default");
    expect(call.update.data.logoUrl).toBe("https://example.com/logo.svg");
    expect(call.create.data.theme).toEqual(DEFAULT_THEME);
  });

  it("uses default theme when theme is missing", async () => {
    vi.mocked(getServerSession).mockResolvedValue({ user: { name: "admin" } });
    mockUpsert.mockResolvedValue({
      id: "default",
      data: { logoUrl: "", menuItems: [], theme: DEFAULT_THEME },
    });

    const res = await PUT(
      makePutRequest({ logoUrl: "", menuItems: [] })
    );
    expect(res.status).toBe(200);

    const call = mockUpsert.mock.calls[0][0];
    expect(call.update.data.theme).toEqual(DEFAULT_THEME);
  });

  it("falls back to defaults for invalid theme field types", async () => {
    vi.mocked(getServerSession).mockResolvedValue({ user: { name: "admin" } });
    mockUpsert.mockResolvedValue({
      id: "default",
      data: { logoUrl: "", menuItems: [], theme: DEFAULT_THEME },
    });

    const res = await PUT(
      makePutRequest({
        logoUrl: "",
        menuItems: [],
        theme: {
          primaryColor: 123,
          secondaryColor: null,
          accentColor: true,
          radius: [],
          fontFamily: "Roboto",
        },
      })
    );
    expect(res.status).toBe(200);

    const call = mockUpsert.mock.calls[0][0];
    const savedTheme = call.update.data.theme;
    expect(savedTheme.primaryColor).toBe(DEFAULT_THEME.primaryColor);
    expect(savedTheme.secondaryColor).toBe(DEFAULT_THEME.secondaryColor);
    expect(savedTheme.accentColor).toBe(DEFAULT_THEME.accentColor);
    expect(savedTheme.radius).toBe(DEFAULT_THEME.radius);
    expect(savedTheme.fontFamily).toBe("Roboto");
  });

  it("returns 500 on DB error", async () => {
    vi.mocked(getServerSession).mockResolvedValue({ user: { name: "admin" } });
    mockUpsert.mockRejectedValue(new Error("DB write failed"));

    const res = await PUT(
      makePutRequest({ logoUrl: "", menuItems: [], theme: DEFAULT_THEME })
    );
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toBe("Internal server error");
  });
});

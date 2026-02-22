import { describe, it, expect, vi, beforeEach } from "vitest";

const mockFindUnique = vi.fn();

vi.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: (...args: unknown[]) => mockFindUnique(...args),
    },
  },
}));

vi.mock("bcryptjs", () => ({
  default: {
    compare: vi.fn(),
  },
}));

import bcrypt from "bcryptjs";
import { authOptions } from "../auth";
import CredentialsProvider from "next-auth/providers/credentials";

function getAuthorize() {
  const provider = authOptions.providers[0];
  // CredentialsProvider wraps the config — the authorize function is on the options
  // Access it through the provider's options
  return (provider as ReturnType<typeof CredentialsProvider>).options
    .authorize!;
}

describe("auth - authorize", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null for missing credentials", async () => {
    const authorize = getAuthorize();
    const result = await authorize({} as any, {} as any);
    expect(result).toBeNull();
  });

  it("returns null when email is missing", async () => {
    const authorize = getAuthorize();
    const result = await authorize(
      { password: "test123" } as any,
      {} as any
    );
    expect(result).toBeNull();
  });

  it("returns null for non-existent user", async () => {
    mockFindUnique.mockResolvedValue(null);
    const authorize = getAuthorize();
    const result = await authorize(
      { email: "nobody@example.com", password: "test123" },
      {} as any
    );
    expect(result).toBeNull();
  });

  it("returns null for wrong password", async () => {
    mockFindUnique.mockResolvedValue({
      id: "1",
      email: "admin@example.com",
      name: "Admin",
      password: "hashed",
      role: "ADMIN",
    });
    vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

    const authorize = getAuthorize();
    const result = await authorize(
      { email: "admin@example.com", password: "wrong" },
      {} as any
    );
    expect(result).toBeNull();
  });

  it("returns user object for valid credentials", async () => {
    mockFindUnique.mockResolvedValue({
      id: "1",
      email: "admin@example.com",
      name: "Admin",
      password: "hashed",
      role: "ADMIN",
    });
    vi.mocked(bcrypt.compare).mockResolvedValue(true as never);

    const authorize = getAuthorize();
    const result = await authorize(
      { email: "admin@example.com", password: "admin123" },
      {} as any
    );
    expect(result).toEqual({
      id: "1",
      email: "admin@example.com",
      name: "Admin",
      role: "ADMIN",
    });
  });
});

describe("auth - callbacks", () => {
  it("jwt callback attaches role and id to token", async () => {
    const jwt = authOptions.callbacks!.jwt!;
    const token = await jwt({
      token: { sub: "1" },
      user: { id: "1", role: "ADMIN" },
    } as any);
    expect(token.role).toBe("ADMIN");
    expect(token.id).toBe("1");
  });

  it("jwt callback returns token unchanged when no user", async () => {
    const jwt = authOptions.callbacks!.jwt!;
    const token = await jwt({
      token: { sub: "1", role: "existing" },
    } as any);
    expect(token.role).toBe("existing");
  });

  it("session callback attaches role and id to session", async () => {
    const session = authOptions.callbacks!.session!;
    const result = await session({
      session: { user: { name: "Admin", email: "admin@example.com" } },
      token: { role: "ADMIN", id: "1" },
    } as any);
    expect((result as any).user.role).toBe("ADMIN");
    expect((result as any).user.id).toBe("1");
  });
});

describe("auth - HTTP cookie config", () => {
  it("applies HTTP cookie config when NEXTAUTH_URL is http://", async () => {
    const originalUrl = process.env.NEXTAUTH_URL;
    process.env.NEXTAUTH_URL = "http://localhost:3000";

    // Re-import to pick up changed env
    vi.resetModules();
    // Re-mock after reset
    vi.doMock("@/lib/prisma", () => ({
      prisma: { user: { findUnique: mockFindUnique } },
    }));
    vi.doMock("bcryptjs", () => ({ default: { compare: vi.fn() } }));

    const { authOptions: freshOptions } = await import("../auth");

    expect(freshOptions.cookies).toBeDefined();
    expect(freshOptions.cookies!.sessionToken!.options.secure).toBe(false);
    expect(freshOptions.cookies!.csrfToken!.options.secure).toBe(false);

    process.env.NEXTAUTH_URL = originalUrl;
  });

  it("uses default cookies when NEXTAUTH_URL is https://", async () => {
    const originalUrl = process.env.NEXTAUTH_URL;
    process.env.NEXTAUTH_URL = "https://example.com";

    vi.resetModules();
    vi.doMock("@/lib/prisma", () => ({
      prisma: { user: { findUnique: mockFindUnique } },
    }));
    vi.doMock("bcryptjs", () => ({ default: { compare: vi.fn() } }));

    const { authOptions: freshOptions } = await import("../auth");

    expect(freshOptions.cookies).toBeUndefined();

    process.env.NEXTAUTH_URL = originalUrl;
  });
});

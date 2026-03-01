import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DEFAULT_THEME } from "@/lib/data/settings";

export async function GET() {
  try {
    const row = await prisma.siteSettings.findUnique({
      where: { id: "default" },
    });

    if (!row) {
      return NextResponse.json({ logoUrl: "", menuItems: [], theme: DEFAULT_THEME });
    }

    const data = row.data as Record<string, unknown>;
    if (!data.theme) {
      data.theme = DEFAULT_THEME;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/settings error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { logoUrl, menuItems, theme } = body;

    if (typeof logoUrl !== "string") {
      return NextResponse.json({ error: "logoUrl must be a string" }, { status: 400 });
    }

    if (!Array.isArray(menuItems)) {
      return NextResponse.json({ error: "menuItems must be an array" }, { status: 400 });
    }

    const themeData = theme && typeof theme === "object" ? {
      primaryColor: typeof theme.primaryColor === "string" ? theme.primaryColor : DEFAULT_THEME.primaryColor,
      secondaryColor: typeof theme.secondaryColor === "string" ? theme.secondaryColor : DEFAULT_THEME.secondaryColor,
      accentColor: typeof theme.accentColor === "string" ? theme.accentColor : DEFAULT_THEME.accentColor,
      radius: typeof theme.radius === "string" ? theme.radius : DEFAULT_THEME.radius,
      fontFamily: typeof theme.fontFamily === "string" ? theme.fontFamily : DEFAULT_THEME.fontFamily,
    } : DEFAULT_THEME;

    const settings = await prisma.siteSettings.upsert({
      where: { id: "default" },
      update: { data: { logoUrl, menuItems, theme: themeData } },
      create: { id: "default", data: { logoUrl, menuItems, theme: themeData } },
    });

    return NextResponse.json(settings.data);
  } catch (error) {
    console.error("PUT /api/settings error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

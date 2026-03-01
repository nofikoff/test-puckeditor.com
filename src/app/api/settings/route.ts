import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const row = await prisma.siteSettings.findUnique({
      where: { id: "default" },
    });

    if (!row) {
      return NextResponse.json({ logoUrl: "", menuItems: [] });
    }

    return NextResponse.json(row.data);
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
    const { logoUrl, menuItems } = body;

    if (typeof logoUrl !== "string") {
      return NextResponse.json({ error: "logoUrl must be a string" }, { status: 400 });
    }

    if (!Array.isArray(menuItems)) {
      return NextResponse.json({ error: "menuItems must be an array" }, { status: 400 });
    }

    const settings = await prisma.siteSettings.upsert({
      where: { id: "default" },
      update: { data: { logoUrl, menuItems } },
      create: { id: "default", data: { logoUrl, menuItems } },
    });

    return NextResponse.json(settings.data);
  } catch (error) {
    console.error("PUT /api/settings error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

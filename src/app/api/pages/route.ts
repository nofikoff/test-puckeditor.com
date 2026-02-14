import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get("path");
    const locale = searchParams.get("locale") || "en";

    // If no path specified, return all pages (for admin listing)
    if (!path) {
      const pages = await prisma.page.findMany({
        where: { locale },
        orderBy: { path: "asc" },
        select: { id: true, path: true, title: true, locale: true, published: true, updatedAt: true },
      });
      return NextResponse.json(pages);
    }

    const page = await prisma.page.findUnique({
      where: { path_locale: { path, locale } },
    });

    if (!page) {
      return NextResponse.json(null, { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error("GET /api/pages error:", error);
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
    const { path, locale = "en", title = "", data, published = false } = body;

    if (!path || !data) {
      return NextResponse.json({ error: "Missing path or data" }, { status: 400 });
    }

    const page = await prisma.page.upsert({
      where: { path_locale: { path, locale } },
      update: { title, data, published },
      create: { path, locale, title, data, published },
    });

    return NextResponse.json(page);
  } catch (error) {
    console.error("PUT /api/pages error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing page id" }, { status: 400 });
    }

    await prisma.page.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/pages error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

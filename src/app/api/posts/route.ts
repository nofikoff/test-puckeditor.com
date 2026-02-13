import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const locale = searchParams.get("locale") || "en";
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    const published = searchParams.get("published");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const where: Prisma.PostWhereInput = { locale };
    if (published === "true") where.published = true;
    if (category) where.categories = { some: { slug: category } };
    if (tag) where.tags = { some: { slug: tag } };

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          author: { select: { id: true, name: true, email: true } },
          categories: true,
          tags: true,
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.post.count({ where }),
    ]);

    return NextResponse.json({ posts, total, page, limit });
  } catch (error) {
    console.error("GET /api/posts error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      slug,
      locale = "en",
      title,
      excerpt = "",
      content = "",
      coverImage = "",
      published = false,
      featured = false,
      categoryIds = [],
      tagIds = [],
    } = body;

    if (!slug || !title) {
      return NextResponse.json({ error: "Missing slug or title" }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        slug,
        locale,
        title,
        excerpt,
        content,
        coverImage,
        published,
        featured,
        publishedAt: published ? new Date() : null,
        authorId: session.user.id,
        categories: { connect: categoryIds.map((id: string) => ({ id })) },
        tags: { connect: tagIds.map((id: string) => ({ id })) },
      },
      include: { categories: true, tags: true },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("POST /api/posts error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

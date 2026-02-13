import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      include: {
        author: { select: { id: true, name: true, email: true } },
        categories: true,
        tags: true,
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("GET /api/posts/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      slug,
      locale,
      title,
      excerpt,
      content,
      coverImage,
      published,
      featured,
      categoryIds,
      tagIds,
    } = body;

    const updateData: Prisma.PostUpdateInput = {};
    if (slug !== undefined) updateData.slug = slug;
    if (locale !== undefined) updateData.locale = locale;
    if (title !== undefined) updateData.title = title;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (content !== undefined) updateData.content = content;
    if (coverImage !== undefined) updateData.coverImage = coverImage;
    if (published !== undefined) {
      updateData.published = published;
      if (published) updateData.publishedAt = new Date();
    }
    if (featured !== undefined) updateData.featured = featured;
    if (categoryIds) {
      updateData.categories = {
        set: categoryIds.map((id: string) => ({ id })),
      };
    }
    if (tagIds) {
      updateData.tags = {
        set: tagIds.map((id: string) => ({ id })),
      };
    }

    const post = await prisma.post.update({
      where: { id: params.id },
      data: updateData,
      include: { categories: true, tags: true },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("PUT /api/posts/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.post.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/posts/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

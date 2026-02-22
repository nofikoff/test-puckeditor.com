import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const postInclude = {
  author: { select: { id: true, name: true, email: true } },
  categories: true,
  tags: true,
} satisfies Prisma.PostInclude;

export async function getPostBySlug(slug: string, locale = "en") {
  return prisma.post.findFirst({
    where: { slug, locale, published: true },
    include: postInclude,
  });
}

export async function getPublishedPosts(opts: {
  locale?: string;
  category?: string;
  tag?: string;
  page?: number;
  limit?: number;
} = {}) {
  const { locale = "en", category, tag, page = 1, limit = 10 } = opts;

  const where: Prisma.PostWhereInput = { locale, published: true };
  if (category) where.categories = { some: { slug: category } };
  if (tag) where.tags = { some: { slug: tag } };

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      include: postInclude,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.post.count({ where }),
  ]);

  return { posts, total, page, limit };
}

export async function getAllPosts(opts: {
  locale?: string;
  limit?: number;
} = {}) {
  const { locale = "en", limit = 50 } = opts;

  const where: Prisma.PostWhereInput = { locale };

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      include: postInclude,
      orderBy: { createdAt: "desc" },
      take: limit,
    }),
    prisma.post.count({ where }),
  ]);

  return { posts, total };
}

export async function getPostById(id: string) {
  return prisma.post.findUnique({
    where: { id },
    include: postInclude,
  });
}

export async function getPostsCount(locale = "en") {
  return prisma.post.count({ where: { locale } });
}

import { prisma } from "@/lib/prisma";

export async function getCategories(locale = "en") {
  return prisma.category.findMany({
    where: { locale },
    include: { _count: { select: { posts: true } } },
    orderBy: { name: "asc" },
  });
}

export async function getCategoriesCount(locale = "en") {
  return prisma.category.count({ where: { locale } });
}

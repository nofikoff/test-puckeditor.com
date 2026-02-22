import { prisma } from "@/lib/prisma";

export async function getTags(locale = "en") {
  return prisma.tag.findMany({
    where: { locale },
    include: { _count: { select: { posts: true } } },
    orderBy: { name: "asc" },
  });
}

export async function getTagsCount(locale = "en") {
  return prisma.tag.count({ where: { locale } });
}

import { prisma } from "@/lib/prisma";

export async function getPageByPath(path: string, locale = "en") {
  return prisma.page.findUnique({
    where: { path_locale: { path, locale } },
  });
}

export async function getAllPages(locale = "en") {
  return prisma.page.findMany({
    where: { locale },
    orderBy: { path: "asc" },
    select: {
      id: true,
      path: true,
      title: true,
      locale: true,
      published: true,
      updatedAt: true,
    },
  });
}

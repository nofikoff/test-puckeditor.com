import { getAllPages } from "@/lib/data";
import { PagesContent } from "@/components/admin/PagesContent";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PagesManagement({ params }: Props) {
  const { locale } = await params;
  const pages = await getAllPages(locale);

  const serialized = pages.map((page) => ({
    id: page.id,
    path: page.path,
    title: page.title || "",
    published: page.published,
    updatedAt: page.updatedAt.toISOString(),
  }));

  return <PagesContent initialPages={serialized} />;
}

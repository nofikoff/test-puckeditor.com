import { getTags } from "@/lib/data";
import { TagsContent } from "@/components/admin/TagsContent";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TagsPage({ params }: Props) {
  const { locale } = await params;
  const tags = await getTags(locale);

  const serialized = tags.map((tag) => ({
    id: tag.id,
    slug: tag.slug,
    locale: tag.locale,
    name: tag.name,
    _count: tag._count,
  }));

  return <TagsContent initialTags={serialized} initialLocale={locale} />;
}

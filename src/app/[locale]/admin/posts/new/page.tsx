import { getCategories, getTags } from "@/lib/data";
import { PostEditor } from "@/components/admin/PostEditor";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function NewPostPage({ params }: Props) {
  const { locale } = await params;

  const [categories, tags] = await Promise.all([
    getCategories(locale),
    getTags(locale),
  ]);

  const serializedCategories = categories.map((c) => ({ id: c.id, slug: c.slug, name: c.name }));
  const serializedTags = tags.map((t) => ({ id: t.id, slug: t.slug, name: t.name }));

  return (
    <PostEditor
      initialCategories={serializedCategories}
      initialTags={serializedTags}
    />
  );
}

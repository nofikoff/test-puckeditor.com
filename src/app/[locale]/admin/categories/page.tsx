import { getCategories } from "@/lib/data";
import { CategoriesContent } from "@/components/admin/CategoriesContent";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CategoriesPage({ params }: Props) {
  const { locale } = await params;
  const categories = await getCategories(locale);

  const serialized = categories.map((cat) => ({
    id: cat.id,
    slug: cat.slug,
    locale: cat.locale,
    name: cat.name,
    _count: cat._count,
  }));

  return <CategoriesContent initialCategories={serialized} initialLocale={locale} />;
}

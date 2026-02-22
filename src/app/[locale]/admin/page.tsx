import { getPostsCount, getCategoriesCount, getTagsCount } from "@/lib/data";
import { DashboardContent } from "@/components/admin/DashboardContent";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AdminDashboard({ params }: Props) {
  const { locale } = await params;

  const [posts, categories, tags] = await Promise.all([
    getPostsCount(locale),
    getCategoriesCount(locale),
    getTagsCount(locale),
  ]);

  return <DashboardContent stats={{ posts, categories, tags }} />;
}

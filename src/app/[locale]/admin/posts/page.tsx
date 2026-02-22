import { getAllPosts } from "@/lib/data";
import { PostsListContent } from "@/components/admin/PostsListContent";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PostsPage({ params }: Props) {
  const { locale } = await params;
  const { posts } = await getAllPosts({ locale, limit: 50 });

  const serializedPosts = posts.map((post) => ({
    id: post.id,
    slug: post.slug,
    locale: post.locale,
    title: post.title,
    published: post.published,
    featured: post.featured,
    categories: post.categories.map((c) => ({ id: c.id, name: c.name })),
    tags: post.tags.map((t) => ({ id: t.id, name: t.name })),
    createdAt: post.createdAt.toISOString(),
  }));

  return <PostsListContent initialPosts={serializedPosts} />;
}

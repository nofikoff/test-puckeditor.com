import { notFound } from "next/navigation";
import { getPostById, getCategories, getTags } from "@/lib/data";
import { markdownToHtml } from "@/lib/markdown";
import { PostEditor } from "@/components/admin/PostEditor";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function EditPostPage({ params }: Props) {
  const { locale, id } = await params;

  const [post, categories, tags] = await Promise.all([
    getPostById(id),
    getCategories(locale),
    getTags(locale),
  ]);

  if (!post) {
    notFound();
  }

  const serializedPost = {
    id: post.id,
    slug: post.slug,
    locale: post.locale,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    coverImage: post.coverImage,
    published: post.published,
    featured: post.featured,
    categoryIds: post.categories.map((c) => c.id),
    tagIds: post.tags.map((t) => t.id),
  };

  const editorHtml = markdownToHtml(post.content);
  const serializedCategories = categories.map((c) => ({ id: c.id, slug: c.slug, name: c.name }));
  const serializedTags = tags.map((t) => ({ id: t.id, slug: t.slug, name: t.name }));

  return (
    <PostEditor
      postId={id}
      initialPost={serializedPost}
      initialEditorHtml={editorHtml}
      initialCategories={serializedCategories}
      initialTags={serializedTags}
    />
  );
}

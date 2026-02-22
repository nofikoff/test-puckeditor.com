import { Metadata } from "next";
import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import { Link } from "@/i18n/navigation";
import { getPostBySlug, getPublishedPosts } from "@/lib/data";
import { getPostBySlug as getStaticPost, getAllPosts as getStaticPosts } from "@/data/blog-posts";
import { markdownToHtml } from "@/lib/markdown";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import { PuckRoot } from "@/components/PuckRoot";

export const dynamic = "force-dynamic";

const rootProps = {
  siteName: "Puck Demo",
  logoUrl: "",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  ctaText: "Open Editor",
  ctaHref: "/editor",
  footerDescription: "The visual editor for React.",
  footerLinks: [
    { title: "Product", items: "Features\nPricing\nDemo" },
    { title: "Company", items: "About\nBlog\nContact" },
  ],
  socialLinks: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  copyright: "\u00a9 2024 Puck Editor Demo",
};

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  const dbPost = await getPostBySlug(slug, locale);
  if (dbPost) {
    return {
      title: dbPost.title,
      description: dbPost.excerpt || undefined,
      openGraph: dbPost.coverImage ? { images: [dbPost.coverImage] } : undefined,
    };
  }

  const staticPost = getStaticPost(slug);
  if (staticPost) {
    return {
      title: staticPost.title,
      description: staticPost.excerpt,
      openGraph: staticPost.coverImage ? { images: [staticPost.coverImage] } : undefined,
    };
  }

  return { title: "Post Not Found" };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;

  // Try database first
  const dbPost = await getPostBySlug(slug, locale);

  if (dbPost) {
    const htmlContent = DOMPurify.sanitize(markdownToHtml(dbPost.content));

    const { posts: allPosts } = await getPublishedPosts({ locale, limit: 50 });
    const relatedPosts = allPosts
      .filter((p) => p.slug !== slug)
      .slice(0, 3)
      .map((p) => ({
        slug: p.slug,
        title: p.title,
        coverImage: p.coverImage,
        publishedAt: p.publishedAt?.toISOString() ?? null,
        createdAt: p.createdAt.toISOString(),
      }));

    const serializedPost = {
      slug: dbPost.slug,
      title: dbPost.title,
      excerpt: dbPost.excerpt,
      htmlContent,
      coverImage: dbPost.coverImage,
      publishedAt: dbPost.publishedAt?.toISOString() ?? null,
      createdAt: dbPost.createdAt.toISOString(),
      categories: dbPost.categories.map((c) => ({ id: c.id, name: c.name })),
      tags: dbPost.tags.map((t) => ({ id: t.id, name: t.name })),
      author: dbPost.author ? { name: dbPost.author.name, email: dbPost.author.email } : null,
    };

    return <BlogPostContent post={serializedPost} relatedPosts={relatedPosts} />;
  }

  // Fallback to static data
  const staticPost = getStaticPost(slug);
  if (!staticPost) {
    notFound();
  }

  const allStaticPosts = getStaticPosts();
  const staticRelated = allStaticPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <StaticBlogPost post={staticPost} relatedPosts={staticRelated} />
  );
}

function StaticBlogPost({
  post,
  relatedPosts,
}: {
  post: NonNullable<ReturnType<typeof getStaticPost>>;
  relatedPosts: ReturnType<typeof getStaticPosts>;
}) {
  return (
    <PuckRoot {...rootProps}>
      <article className="max-w-4xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-blue-600">Blog</Link>
          <span>/</span>
          <span className="text-gray-900">{post.title}</span>
        </nav>
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              {post.category}
            </span>
            <span className="text-gray-500 text-sm">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric", month: "long", day: "numeric",
              })}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8">{post.excerpt}</p>
        </header>
        {post.coverImage && (
          <img src={post.coverImage} alt={post.title}
            className="w-full h-[400px] object-cover rounded-2xl mb-10" />
        )}
        <div className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />
        <div className="flex flex-wrap gap-2 pb-8 border-b mb-8">
          {post.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
              #{tag}
            </span>
          ))}
        </div>
        {relatedPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`}>
                  <article className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition">
                    <img src={rp.coverImage} alt={rp.title} className="w-full h-32 object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{rp.title}</h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </PuckRoot>
  );
}

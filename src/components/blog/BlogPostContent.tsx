"use client";

import { Link } from "@/i18n/navigation";
import { PuckRoot } from "@/components/PuckRoot";

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

type SerializedPost = {
  slug: string;
  title: string;
  excerpt: string;
  htmlContent: string;
  coverImage: string;
  publishedAt: string | null;
  createdAt: string;
  categories: { id: string; name: string }[];
  tags: { id: string; name: string }[];
  author: { name: string | null; email: string } | null;
};

type RelatedPost = {
  slug: string;
  title: string;
  coverImage: string;
  publishedAt: string | null;
  createdAt: string;
};

export function BlogPostContent({
  post,
  relatedPosts,
}: {
  post: SerializedPost;
  relatedPosts: RelatedPost[];
}) {
  const publishDate = post.publishedAt || post.createdAt;

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
            {post.categories.map((cat) => (
              <span key={cat.id} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {cat.name}
              </span>
            ))}
            <span className="text-gray-500 text-sm">
              {new Date(publishDate).toLocaleDateString("en-US", {
                year: "numeric", month: "long", day: "numeric",
              })}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          {post.excerpt && <p className="text-xl text-gray-600 mb-8">{post.excerpt}</p>}
          {post.author && (
            <div className="flex items-center gap-4 pb-8 border-b">
              <div>
                <p className="font-semibold text-gray-900">{post.author.name || post.author.email}</p>
              </div>
            </div>
          )}
        </header>

        {post.coverImage && (
          <img src={post.coverImage} alt={post.title}
            className="w-full h-[400px] object-cover rounded-2xl mb-10" />
        )}

        <div className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.htmlContent }} />

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pb-8 border-b mb-8">
            {post.tags.map((tag) => (
              <span key={tag.id} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`}>
                  <article className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition">
                    {rp.coverImage && (
                      <img src={rp.coverImage} alt={rp.title} className="w-full h-32 object-cover" />
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{rp.title}</h3>
                      <p className="text-gray-500 text-sm">
                        {new Date(rp.publishedAt || rp.createdAt).toLocaleDateString()}
                      </p>
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

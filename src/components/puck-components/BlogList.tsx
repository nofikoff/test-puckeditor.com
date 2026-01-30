"use client";
import Link from "next/link";
import { getAllPosts, getAllCategories, BlogPost } from "@/data/blog-posts";

export type BlogListProps = {
  title: string;
  subtitle: string;
  showCategories: string;
  showFeatured: string;
  postsPerPage: number;
  layout: "grid" | "list";
};

export function BlogList({
  title,
  subtitle,
  showCategories,
  showFeatured,
  postsPerPage,
  layout,
}: BlogListProps) {
  const posts = getAllPosts().slice(0, postsPerPage);
  const categories = getAllCategories();
  const featuredPost = showFeatured === "true" ? posts[0] : null;
  const gridPosts = showFeatured === "true" ? posts.slice(1) : posts;

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}

        {/* Categories */}
        {showCategories === "true" && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium cursor-pointer">
              All
            </span>
            {categories.map((category) => (
              <span
                key={category}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 cursor-pointer transition"
              >
                {category}
              </span>
            ))}
          </div>
        )}

        {/* Featured Post */}
        {featuredPost && (
          <Link href={`/blog/${featuredPost.slug}`} className="block mb-12">
            <article className="relative rounded-2xl overflow-hidden bg-gray-900 group">
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                className="w-full h-[400px] object-cover opacity-60 group-hover:opacity-50 transition"
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded-full mb-4 w-fit">
                  {featuredPost.category}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-200 text-lg mb-4 max-w-2xl">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-white/80">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span>{featuredPost.author.name}</span>
                  <span>·</span>
                  <span>{featuredPost.readTime} min read</span>
                </div>
              </div>
            </article>
          </Link>
        )}

        {/* Post Grid/List */}
        <div
          className={
            layout === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
          }
        >
          {gridPosts.map((post) =>
            layout === "grid" ? (
              <BlogCard key={post.slug} post={post} />
            ) : (
              <BlogListItem key={post.slug} post={post} />
            )
          )}
        </div>
      </div>
    </section>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group h-full">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition"
        />
        <div className="p-6">
          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded mb-3">
            {post.category}
          </span>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-8 h-8 rounded-full"
            />
            <span>{post.author.name}</span>
            <span>·</span>
            <span>{post.readTime} min</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function BlogListItem({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="flex gap-6 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group p-4">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-48 h-32 object-cover rounded-lg flex-shrink-0"
        />
        <div className="flex-1">
          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded mb-2">
            {post.category}
          </span>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>{post.author.name}</span>
            <span>·</span>
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

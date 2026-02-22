"use client";

import type { ComponentConfig } from "@measured/puck";
import { Blog7 } from "@/components/blog7";
import { Blog8 } from "@/components/blog8";

// -- Blog7 --
// Well-parameterized: tagline, heading, description, buttonText, buttonUrl, posts (array)

type Blog7Props = {
  tagline: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  posts: {
    title: string;
    summary: string;
    label: string;
    author: string;
    published: string;
    url: string;
    image: string;
  }[];
};

export const ShadcnBlog7Config: ComponentConfig<Blog7Props> = {
  label: "SB: Blog \u2014 Card Grid (with Badge)",
  fields: {
    tagline: {
      type: "text",
      label: "Tagline Badge",
    },
    heading: {
      type: "text",
      label: "Heading",
    },
    description: {
      type: "textarea",
      label: "Description",
    },
    buttonText: {
      type: "text",
      label: "Button Text",
    },
    buttonUrl: {
      type: "text",
      label: "Button URL",
    },
    posts: {
      type: "array",
      label: "Posts",
      arrayFields: {
        title: { type: "text", label: "Title" },
        summary: { type: "textarea", label: "Summary" },
        label: { type: "text", label: "Label / Category" },
        author: { type: "text", label: "Author" },
        published: { type: "text", label: "Published Date" },
        url: { type: "text", label: "Post URL" },
        image: { type: "text", label: "Image URL" },
      },
    },
  },
  defaultProps: {
    tagline: "Latest Updates",
    heading: "Blog Posts",
    description:
      "Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.",
    buttonText: "View all articles",
    buttonUrl: "#",
    posts: [
      {
        title: "Getting Started with shadcn/ui Components",
        summary:
          "Learn how to quickly integrate and customize shadcn/ui components in your Next.js projects. We'll cover installation, theming, and best practices for building modern interfaces.",
        label: "Tutorial",
        author: "Sarah Chen",
        published: "1 Jan 2024",
        url: "#",
        image: "https://placehold.co/600x400/1a1a2e/ffffff?text=Blog+Post+1",
      },
      {
        title: "Building Accessible Web Applications",
        summary:
          "Explore how to create inclusive web experiences using shadcn/ui's accessible components. Discover practical tips for implementing ARIA labels, keyboard navigation, and semantic HTML.",
        label: "Accessibility",
        author: "Marcus Rodriguez",
        published: "1 Jan 2024",
        url: "#",
        image: "https://placehold.co/600x400/16213e/ffffff?text=Blog+Post+2",
      },
      {
        title: "Modern Design Systems with Tailwind CSS",
        summary:
          "Dive into creating scalable design systems using Tailwind CSS and shadcn/ui. Learn how to maintain consistency while building flexible and maintainable component libraries.",
        label: "Design Systems",
        author: "Emma Thompson",
        published: "1 Jan 2024",
        url: "#",
        image: "https://placehold.co/600x400/0f3460/ffffff?text=Blog+Post+3",
      },
    ],
  },
  render: ({ tagline, heading, description, buttonText, buttonUrl, posts }) => {
    const postsWithIds = posts.map((post, index) => ({
      id: `post-${index + 1}`,
      title: post.title,
      summary: post.summary,
      label: post.label,
      author: post.author,
      published: post.published,
      url: post.url,
      image: post.image,
    }));
    return (
      <Blog7
        tagline={tagline}
        heading={heading}
        description={description}
        buttonText={buttonText}
        buttonUrl={buttonUrl}
        posts={postsWithIds}
      />
    );
  },
};

// -- Blog8 --
// Well-parameterized: heading, description, posts (array with tags)

type Blog8Props = {
  heading: string;
  description: string;
  posts: {
    title: string;
    summary: string;
    label: string;
    author: string;
    published: string;
    url: string;
    image: string;
    tags: string;
  }[];
};

export const ShadcnBlog8Config: ComponentConfig<Blog8Props> = {
  label: "SB: Blog \u2014 Side-by-Side Layout",
  fields: {
    heading: {
      type: "text",
      label: "Heading",
    },
    description: {
      type: "textarea",
      label: "Description",
    },
    posts: {
      type: "array",
      label: "Posts",
      arrayFields: {
        title: { type: "text", label: "Title" },
        summary: { type: "textarea", label: "Summary" },
        label: { type: "text", label: "Label / Category" },
        author: { type: "text", label: "Author" },
        published: { type: "text", label: "Published Date" },
        url: { type: "text", label: "Post URL" },
        image: { type: "text", label: "Image URL" },
        tags: { type: "text", label: "Tags (comma-separated)" },
      },
    },
  },
  defaultProps: {
    heading: "Blog Posts",
    description:
      "Discover the latest insights and tutorials about modern web development, UI design, and component-driven architecture.",
    posts: [
      {
        title:
          "Building Modern UIs: A Deep Dive into Shadcn and React Components",
        summary:
          "Join us for an in-depth exploration of building modern user interfaces using shadcn/ui and React. Learn best practices and advanced techniques.",
        label: "Web Design",
        author: "Sarah Chen",
        published: "15 Feb 2024",
        url: "#",
        image: "https://placehold.co/600x400/1a1a2e/ffffff?text=Blog+Post+1",
        tags: "Web Design, UI Development",
      },
      {
        title: "Mastering Tailwind CSS: From Basics to Advanced Techniques",
        summary:
          "Discover how to leverage the full power of Tailwind CSS to create beautiful, responsive websites with clean and maintainable code.",
        label: "Web Design",
        author: "Michael Park",
        published: "22 Feb 2024",
        url: "#",
        image: "https://placehold.co/600x400/16213e/ffffff?text=Blog+Post+2",
        tags: "Web Design, CSS",
      },
    ],
  },
  render: ({ heading, description, posts }) => {
    const postsWithIds = posts.map((post, index) => ({
      id: `post-${index + 1}`,
      title: post.title,
      summary: post.summary,
      label: post.label,
      author: post.author,
      published: post.published,
      url: post.url,
      image: post.image,
      tags: post.tags
        ? post.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
    }));
    return (
      <Blog8 heading={heading} description={description} posts={postsWithIds} />
    );
  },
};

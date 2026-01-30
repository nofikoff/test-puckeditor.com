// Blog posts data - in production, this would come from a database or CMS
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML content
  coverImage: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  category: string;
  tags: string[];
  readTime: number; // minutes
}

export const blogPosts: BlogPost[] = [
  {
    slug: "getting-started-with-puck",
    title: "Getting Started with Puck Editor",
    excerpt: "Learn how to set up and configure Puck Editor in your Next.js project in under 10 minutes.",
    content: `
      <h2>Introduction</h2>
      <p>Puck Editor is a powerful visual editor for React applications. In this tutorial, we'll walk through the setup process step by step.</p>

      <h2>Installation</h2>
      <p>First, install the Puck package:</p>
      <pre><code>npm install @measured/puck</code></pre>

      <h2>Basic Configuration</h2>
      <p>Create a configuration file that defines your components:</p>
      <pre><code>const config = {
  components: {
    Heading: {
      fields: { text: { type: "text" } },
      render: ({ text }) => &lt;h1&gt;{text}&lt;/h1&gt;
    }
  }
};</code></pre>

      <h2>Rendering the Editor</h2>
      <p>Import and render the Puck component in your page:</p>
      <pre><code>import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";

export default function Editor() {
  return &lt;Puck config={config} data={{}} /&gt;;
}</code></pre>

      <h2>Conclusion</h2>
      <p>That's it! You now have a working visual editor. Check out the documentation for more advanced features.</p>
    `,
    coverImage: "https://picsum.photos/800/400?random=100",
    author: {
      name: "Sarah Chen",
      avatar: "https://i.pravatar.cc/100?img=1",
      role: "Lead Developer",
    },
    publishedAt: "2024-01-15",
    category: "Tutorial",
    tags: ["puck", "react", "nextjs", "tutorial"],
    readTime: 5,
  },
  {
    slug: "building-custom-components",
    title: "Building Custom Components for Puck",
    excerpt: "A deep dive into creating reusable, configurable components for your Puck-powered website.",
    content: `
      <h2>Why Custom Components?</h2>
      <p>While Puck comes with basic building blocks, the real power lies in creating custom components tailored to your needs.</p>

      <h2>Component Structure</h2>
      <p>Every Puck component needs three things:</p>
      <ul>
        <li><strong>Fields</strong> - Define the editable properties</li>
        <li><strong>Default Props</strong> - Initial values</li>
        <li><strong>Render Function</strong> - The actual React component</li>
      </ul>

      <h2>Example: Testimonial Card</h2>
      <pre><code>const TestimonialCard = {
  fields: {
    quote: { type: "textarea" },
    author: { type: "text" },
    avatar: { type: "text" }
  },
  defaultProps: {
    quote: "Great product!",
    author: "John Doe",
    avatar: ""
  },
  render: ({ quote, author, avatar }) => (
    &lt;div className="testimonial"&gt;
      &lt;p&gt;"{quote}"&lt;/p&gt;
      &lt;div className="author"&gt;
        &lt;img src={avatar} alt={author} /&gt;
        &lt;span&gt;{author}&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  )
};</code></pre>

      <h2>Best Practices</h2>
      <p>Keep components focused, use TypeScript for type safety, and always provide sensible defaults.</p>
    `,
    coverImage: "https://picsum.photos/800/400?random=101",
    author: {
      name: "Marcus Johnson",
      avatar: "https://i.pravatar.cc/100?img=3",
      role: "Senior Engineer",
    },
    publishedAt: "2024-01-20",
    category: "Development",
    tags: ["components", "react", "customization"],
    readTime: 8,
  },
  {
    slug: "puck-vs-other-builders",
    title: "Puck vs Other Page Builders: A Comparison",
    excerpt: "How does Puck stack up against popular alternatives like Builder.io, Plasmic, and others?",
    content: `
      <h2>The Page Builder Landscape</h2>
      <p>There are many page builders available for React developers. Let's see how Puck compares.</p>

      <h2>Puck's Advantages</h2>
      <ul>
        <li><strong>Open Source</strong> - MIT licensed, no vendor lock-in</li>
        <li><strong>Self-hosted</strong> - Your data stays with you</li>
        <li><strong>Lightweight</strong> - No bloat, just what you need</li>
        <li><strong>React-native</strong> - Uses your actual React components</li>
      </ul>

      <h2>Comparison Table</h2>
      <table>
        <tr><th>Feature</th><th>Puck</th><th>Builder.io</th><th>Plasmic</th></tr>
        <tr><td>Open Source</td><td>Yes</td><td>No</td><td>Partial</td></tr>
        <tr><td>Self-hosted</td><td>Yes</td><td>No</td><td>Optional</td></tr>
        <tr><td>Free Tier</td><td>Unlimited</td><td>Limited</td><td>Limited</td></tr>
        <tr><td>Custom Components</td><td>Full</td><td>Full</td><td>Full</td></tr>
      </table>

      <h2>When to Choose Puck</h2>
      <p>Puck is ideal when you need full control, want to avoid vendor lock-in, or have specific security requirements.</p>
    `,
    coverImage: "https://picsum.photos/800/400?random=102",
    author: {
      name: "Elena Rodriguez",
      avatar: "https://i.pravatar.cc/100?img=5",
      role: "Tech Writer",
    },
    publishedAt: "2024-02-01",
    category: "Comparison",
    tags: ["comparison", "page-builder", "tools"],
    readTime: 6,
  },
  {
    slug: "seo-optimization-tips",
    title: "SEO Optimization Tips for Puck Pages",
    excerpt: "Make your Puck-built pages rank higher with these proven SEO techniques.",
    content: `
      <h2>SEO Fundamentals</h2>
      <p>Search engine optimization is crucial for any website. Here's how to optimize your Puck pages.</p>

      <h2>Meta Tags</h2>
      <p>Use Next.js metadata API to set proper meta tags for each page:</p>
      <pre><code>export const metadata = {
  title: "Page Title",
  description: "Page description for search engines"
};</code></pre>

      <h2>Semantic HTML</h2>
      <p>Ensure your Puck components output semantic HTML:</p>
      <ul>
        <li>Use proper heading hierarchy (h1, h2, h3)</li>
        <li>Add alt text to images</li>
        <li>Use semantic elements (article, section, nav)</li>
      </ul>

      <h2>Performance</h2>
      <p>Page speed affects SEO. Optimize images, use lazy loading, and minimize JavaScript.</p>

      <h2>Structured Data</h2>
      <p>Add JSON-LD structured data for rich search results.</p>
    `,
    coverImage: "https://picsum.photos/800/400?random=103",
    author: {
      name: "Alex Thompson",
      avatar: "https://i.pravatar.cc/100?img=11",
      role: "SEO Specialist",
    },
    publishedAt: "2024-02-10",
    category: "SEO",
    tags: ["seo", "optimization", "performance"],
    readTime: 7,
  },
  {
    slug: "advanced-field-types",
    title: "Advanced Field Types in Puck",
    excerpt: "Explore custom fields, arrays, objects, and external data sources in Puck Editor.",
    content: `
      <h2>Beyond Basic Fields</h2>
      <p>Puck supports more than just text fields. Let's explore advanced options.</p>

      <h2>Array Fields</h2>
      <p>Perfect for lists, galleries, and repeatable content:</p>
      <pre><code>features: {
  type: "array",
  arrayFields: {
    title: { type: "text" },
    icon: { type: "text" }
  }
}</code></pre>

      <h2>Object Fields</h2>
      <p>Group related properties together:</p>
      <pre><code>author: {
  type: "object",
  objectFields: {
    name: { type: "text" },
    email: { type: "text" }
  }
}</code></pre>

      <h2>Custom Fields</h2>
      <p>Create your own field types for specialized inputs like color pickers, date selectors, or media libraries.</p>

      <h2>External Data</h2>
      <p>Use resolveData to fetch content from external APIs or databases.</p>
    `,
    coverImage: "https://picsum.photos/800/400?random=104",
    author: {
      name: "James Wilson",
      avatar: "https://i.pravatar.cc/100?img=12",
      role: "Full Stack Developer",
    },
    publishedAt: "2024-02-15",
    category: "Advanced",
    tags: ["fields", "customization", "advanced"],
    readTime: 10,
  },
  {
    slug: "deploying-puck-production",
    title: "Deploying Puck to Production",
    excerpt: "Best practices for deploying your Puck-powered application to production environments.",
    content: `
      <h2>Production Checklist</h2>
      <p>Before deploying, ensure you've covered these essentials.</p>

      <h2>Environment Setup</h2>
      <ul>
        <li>Set NODE_ENV=production</li>
        <li>Configure environment variables</li>
        <li>Set up database connections</li>
      </ul>

      <h2>Build Optimization</h2>
      <pre><code>npm run build
npm run start</code></pre>

      <h2>Docker Deployment</h2>
      <p>Containerize your app for consistent deployments:</p>
      <pre><code>FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
CMD ["npm", "start"]</code></pre>

      <h2>Monitoring</h2>
      <p>Set up logging, error tracking, and performance monitoring for production.</p>
    `,
    coverImage: "https://picsum.photos/800/400?random=105",
    author: {
      name: "Sophie Lee",
      avatar: "https://i.pravatar.cc/100?img=9",
      role: "DevOps Engineer",
    },
    publishedAt: "2024-02-20",
    category: "DevOps",
    tags: ["deployment", "docker", "production"],
    readTime: 8,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((post) => post.tags.includes(tag));
}

export function getAllCategories(): string[] {
  return Array.from(new Set(blogPosts.map((post) => post.category)));
}

export function getAllTags(): string[] {
  return Array.from(new Set(blogPosts.flatMap((post) => post.tags)));
}

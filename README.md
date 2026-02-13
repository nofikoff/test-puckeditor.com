# Puck CMS

A fully-featured CMS built with [Puck Editor](https://puckeditor.com) — visual page builder for React, with blog management, i18n, and admin panel.

## Quick Start

```bash
# Start the application
docker compose up -d

# Stop the application
docker compose down

# Rebuild after changes
docker compose build && docker compose up -d
```

Default admin credentials: `admin@example.com` / `admin123`

## URLs

| URL | Description |
|-----|-------------|
| http://localhost:3000 | Home page |
| http://localhost:3000/login | Admin login |
| http://localhost:3000/admin | Admin dashboard |
| http://localhost:3000/admin/posts | Blog post management |
| http://localhost:3000/admin/categories | Category management |
| http://localhost:3000/admin/tags | Tag management |
| http://localhost:3000/admin/pages | Page management |
| http://localhost:3000/blog | Blog index |
| http://localhost:3000/blog/[slug] | Individual blog post |

## Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Visual Editor:** Puck Editor
- **Rich Text:** TipTap WYSIWYG
- **Database:** PostgreSQL 16 (Docker)
- **ORM:** Prisma 6
- **Auth:** NextAuth v4 (credentials provider)
- **Styling:** Tailwind CSS v3 + shadcn/ui
- **i18n:** next-intl v4 (cookie-based locale)
- **Container:** Docker

## Content Management

### Pages

Pages are built visually through the Puck Editor — a drag-and-drop page constructor.

**Editing a page:**

1. Go to `/admin/pages`
2. Click **"Edit in Puck"** next to the page you want to edit
3. The visual editor opens (`/editor?path=/about&locale=en`)
4. Drag components from the left panel, edit properties on the right
5. Click **"Publish"** to save

**Adding a new page:**

1. Create a route file `src/app/my-page/page.tsx`:

```tsx
import PuckPage from "@/components/PuckPage";

export default function MyPage() {
  return <PuckPage path="/my-page" />;
}
```

2. Add the path to the pages list in `/admin/pages` (`src/app/admin/pages/page.tsx`)
3. Open in Puck Editor and build the page visually
4. Publish

**Available Puck components (30+):**

| Category | Components |
|----------|------------|
| Typography | Heading, Text, Badge, RichTextBlock |
| Layout | Columns, Spacer, Divider |
| Media | ImageBlock, VideoEmbed, Gallery |
| Interactive | Button, Accordion, Tabs |
| Sections | Hero, Features, Testimonials, Stats, Pricing, Team, FAQ, CTA, Timeline |
| Forms | Newsletter, ContactForm |
| Navigation | Footer, SocialLinks, LogoCloud, Breadcrumbs |
| Cards | Card, Alert, CodeBlock |
| Blog | BlogList (displays published posts from DB) |

### Blog Posts

**Creating a post:**

1. Go to `/admin/posts`
2. Click **"New Post"**
3. Fill in the form:
   - **Title** — post title (slug is generated automatically)
   - **Slug** — URL path (editable manually)
   - **Body** — TipTap rich text editor (bold, italic, headings H1-H3, lists, code blocks, links, images)
   - **Excerpt** — short description (Excerpt tab)
   - **Language** — English / Serbian (Settings sidebar)
   - **Cover Image** — image URL (Settings sidebar)
   - **Categories** — click badges to assign
   - **Tags** — click badges to assign
4. Action buttons (top right):
   - **Publish / Unpublish** — toggle visibility
   - **Featured / Unfeatured** — mark as featured
   - **Save** — save the post
5. The post appears at `/blog/[slug]`

**Editing a post:**

Go to `/admin/posts` and click the pencil icon on the post row.

**Content storage:** TipTap provides HTML, which is converted to Markdown (`turndown`) for storage. When editing, Markdown is converted back to HTML (`marked`).

### Categories and Tags

**Categories** (`/admin/categories`):

1. Enter category name
2. Select locale (English / Serbian)
3. Click **Add**
4. Slug is auto-generated from the name

**Tags** (`/admin/tags`) — same workflow as categories.

After creation, categories and tags are available for assignment when editing posts.

## Internationalization (i18n)

- Every post, page, category, and tag is tied to a **locale** (`en` or `sr`)
- To translate content, create a separate entry with the same slug but a different locale
- Locale is stored in a cookie (no URL prefix)
- Language switcher is at the bottom of the admin sidebar

## Adding a New Puck Component

### 1. Create the component

```tsx
// In src/components/puck-components.tsx or a separate file
export const MyComponent = ({ title, description }: { title: string; description: string }) => (
  <div className="p-4 bg-white rounded-lg shadow">
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);
```

### 2. Register in Puck config

```typescript
// In src/lib/puck-config.tsx

// Add to categories
myCategory: {
  title: "My Category",
  components: ["MyComponent"],
},

// Add to components
MyComponent: {
  label: "My Component",
  fields: {
    title: { type: "text" },
    description: { type: "textarea" },
  },
  defaultProps: {
    title: "Default Title",
    description: "Default description",
  },
  render: MyComponent,
},
```

## Project Structure

```
├── prisma/
│   ├── schema.prisma          # Database models
│   └── seed.ts                # DB seed (admin user, categories, tags)
├── src/
│   ├── app/
│   │   ├── page.tsx           # Home
│   │   ├── layout.tsx         # Root layout
│   │   ├── login/             # Login page
│   │   ├── admin/             # Admin panel
│   │   │   ├── page.tsx       # Dashboard
│   │   │   ├── posts/         # Post management (list, new, edit)
│   │   │   ├── categories/    # Category management
│   │   │   ├── tags/          # Tag management
│   │   │   └── pages/         # Page management
│   │   ├── editor/page.tsx    # Puck visual editor
│   │   ├── blog/
│   │   │   ├── page.tsx       # Blog index (Puck page)
│   │   │   └── [slug]/page.tsx # Blog post detail
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── demo/page.tsx
│   │   └── services/page.tsx
│   │   └── api/               # REST API routes
│   │       ├── posts/         # CRUD for posts
│   │       ├── categories/    # CRUD for categories
│   │       ├── tags/          # CRUD for tags
│   │       └── pages/         # GET/PUT for pages
│   ├── components/
│   │   ├── PuckPage.tsx       # Puck page renderer
│   │   ├── LocaleSwitcher.tsx # Language switcher
│   │   ├── admin/             # Admin components (PostEditor, etc.)
│   │   ├── puck-components/   # Puck component library
│   │   ├── puck-fields/       # Custom Puck fields (RichTextField)
│   │   └── ui/                # shadcn/ui components
│   ├── lib/
│   │   ├── puck-config.tsx    # Puck component registry
│   │   ├── prisma.ts          # Prisma client singleton
│   │   ├── auth.ts            # NextAuth configuration
│   │   └── markdown.ts        # HTML <-> Markdown conversion
│   ├── i18n/                  # next-intl configuration
│   └── middleware.ts          # Auth + i18n middleware
├── messages/                  # i18n translation files
├── Dockerfile
├── docker-compose.yml
└── docker-entrypoint.sh       # Runs migrations before app start
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/posts` | No | List posts (supports `limit`, `page`, `locale`, `published`, `category`, `tag`) |
| POST | `/api/posts` | Yes | Create post |
| GET | `/api/posts/[id]` | No | Get post by ID |
| PUT | `/api/posts/[id]` | Yes | Update post |
| DELETE | `/api/posts/[id]` | Yes | Delete post |
| GET | `/api/categories` | No | List categories (supports `locale`) |
| POST | `/api/categories` | Yes | Create category |
| PUT | `/api/categories/[id]` | Yes | Update category |
| DELETE | `/api/categories/[id]` | Yes | Delete category |
| GET | `/api/tags` | No | List tags (supports `locale`) |
| POST | `/api/tags` | Yes | Create tag |
| PUT | `/api/tags/[id]` | Yes | Update tag |
| DELETE | `/api/tags/[id]` | Yes | Delete tag |
| GET | `/api/pages` | No | Get page by `path` + `locale` |
| PUT | `/api/pages` | Yes | Save/upsert page |

## Resources

- [Puck Documentation](https://puckeditor.com/docs)
- [Puck GitHub](https://github.com/puckeditor/puck)
- [Next.js Documentation](https://nextjs.org/docs)
- [TipTap Documentation](https://tiptap.dev/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [next-intl Documentation](https://next-intl.dev/docs)

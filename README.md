# Puck CMS

A full-stack visual page builder CMS powered by [Puck Editor](https://puckeditor.com) and Next.js. Features 85+ drag-and-drop blocks, AI-powered content generation, a blog system with TipTap rich text editor, multilingual support (EN/SR), and an admin dashboard — all stored in PostgreSQL and deployed via Docker.

## Features

- **Visual Page Builder** — Puck Editor with 85+ blocks: 35 legacy components + 50 pre-built shadcn blocks across 15 categories
- **AI Content Generation** — OpenAI-powered block generation via chat sidebar in the editor (structured JSON output)
- **Rich Text Editor** — TipTap WYSIWYG for blog posts (headings, lists, code blocks with syntax highlighting, links, images)
- **Admin Panel** — Dashboard with stats, CRUD for posts/categories/tags/pages
- **Multilingual** — URL-prefix routing (`/en/about`, `/sr/about`) via next-intl, locale switcher
- **Blog System** — Posts with categories, tags, featured/published flags, markdown storage
- **Dynamic Pages** — Create new pages from admin without code changes (catch-all routing)
- **Auth** — NextAuth v4 with credentials provider, JWT strategy, protected admin/editor routes
- **SSR** — All pages server-side rendered with `force-dynamic` where needed

## Quick Start

```bash
docker compose up -d
```

- Site: http://localhost:3078/en
- Admin: http://localhost:3078/en/admin
- Login: `admin@example.com` / `admin123`

### Seed database (first run)

```bash
# Run migrations + seed admin user, categories, tags
docker compose exec puckeditor-app npx tsx prisma/seed.ts

# Seed all demo pages in EN + SR
docker compose cp prisma/seed-pages.ts puckeditor-app:/app/prisma/seed-pages.ts
docker compose exec puckeditor-app npx tsx prisma/seed-pages.ts
```

### Import full database dump

```bash
./import-db.sh              # Clears all tables, imports dump.sql
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14.2 (App Router, standalone output) |
| Visual Editor | Puck Editor 0.18 |
| Rich Text | TipTap 2.10 WYSIWYG |
| UI Components | shadcn/ui (21 primitives) + shadcnblocks (50 blocks) |
| Database | PostgreSQL 16 (Docker) |
| ORM | Prisma 6 |
| Auth | NextAuth v4 (credentials, JWT) |
| Styling | Tailwind CSS v3 + tailwindcss-animate |
| i18n | next-intl v4 (URL-prefix routing) |
| AI | OpenAI API (gpt-4o-mini, Responses API) |
| Forms | react-hook-form + zod validation |
| Testing | Vitest + jsdom |
| Container | Docker multi-stage build |

## Project Structure

```
├── prisma/
│   ├── schema.prisma             # DB models: User, Page, Post, Category, Tag
│   ├── seed.ts                   # Seed admin user + categories + tags
│   └── seed-pages.ts             # Seed all demo pages (EN + SR)
├── messages/
│   ├── en.json                   # English translations (43 keys)
│   └── sr.json                   # Serbian translations
├── scripts/
│   └── generate-ai-schema.ts    # Extracts Puck block metadata for AI prompts
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout
│   │   ├── [locale]/             # All routes under locale prefix
│   │   │   ├── layout.tsx        # Locale layout (providers)
│   │   │   ├── page.tsx          # Home page (Puck SSR)
│   │   │   ├── [...puckPath]/    # Catch-all for dynamic Puck pages
│   │   │   ├── admin/            # Dashboard, posts, categories, tags, pages
│   │   │   ├── editor/           # Puck visual editor (Suspense)
│   │   │   ├── login/            # Login page
│   │   │   └── blog/[slug]/      # Blog post detail
│   │   └── api/
│   │       ├── auth/             # NextAuth endpoints
│   │       ├── posts/            # CRUD: list, create, get, update, delete
│   │       ├── categories/       # CRUD
│   │       ├── tags/             # CRUD
│   │       ├── pages/            # Page data (GET/PUT/DELETE)
│   │       └── ai/generate/      # OpenAI block generation
│   ├── components/
│   │   ├── puck-components.tsx   # 35 legacy Puck block definitions
│   │   ├── puck-components/      # Complex blocks (RichText, BlogList, TipTapEditor)
│   │   ├── shadcn-blocks/        # 50 shadcnblocks.com adapters (15 categories)
│   │   ├── puck-fields/          # Custom Puck fields (RichTextField)
│   │   ├── editor/               # AIChatPanel (AI sidebar in editor)
│   │   ├── admin/                # Dashboard, PostEditor, CRUD tables
│   │   ├── blog/                 # BlogPostContent renderer
│   │   ├── shared/               # Header, SharedFooter
│   │   ├── providers/            # SessionProvider
│   │   ├── ui/                   # shadcn/ui primitives (21 components)
│   │   ├── PuckRoot.tsx          # Root wrapper with TipTap styles
│   │   ├── PuckRenderer.tsx      # Frontend Puck page renderer
│   │   └── LocaleSwitcher.tsx    # EN/SR toggle
│   ├── lib/
│   │   ├── puck-config.tsx       # Puck component registry (1175 lines)
│   │   ├── prisma.ts             # Prisma client singleton
│   │   ├── auth.ts               # NextAuth options
│   │   ├── markdown.ts           # HTML <-> Markdown (turndown + marked)
│   │   ├── utils.ts              # cn() helper
│   │   ├── ai/                   # AI schema extraction + prompt builder
│   │   └── data/                 # Data access layer (posts, categories, tags, pages)
│   ├── i18n/
│   │   ├── routing.ts            # Locales: ["en", "sr"], prefix: "always"
│   │   ├── navigation.ts         # Locale-aware Link, useRouter
│   │   └── request.ts            # Server-side locale resolution
│   ├── middleware.ts             # next-intl routing + NextAuth JWT protection
│   ├── hooks/                    # Custom React hooks
│   └── types/                    # TypeScript type definitions
├── docker-compose.yml            # PostgreSQL + Next.js app
├── Dockerfile                    # Multi-stage build (Node 20-alpine)
├── docker-entrypoint.sh          # prisma migrate deploy before start
├── import-db.sh                  # Reset DB with dump.sql
└── dump.sql                      # Full database dump
```

## Database Schema

5 models with many-to-many relationships:

- **User** — email, password (bcrypt), name, role (ADMIN/EDITOR)
- **Page** — path, locale, title, data (JSON), published — unique on `[path, locale]`
- **Post** — slug, locale, title, excerpt, content (markdown), coverImage, published, featured, author, categories, tags — unique on `[slug, locale]`
- **Category** — slug, locale, name — unique on `[slug, locale]`
- **Tag** — slug, locale, name — unique on `[slug, locale]`

## Shadcn Blocks (50 blocks)

Pre-built blocks from [shadcnblocks.com](https://shadcnblocks.com) wrapped as Puck components:

| Category | Variants |
|----------|----------|
| Hero | 1, 3, 7, 12, 34, 45, 47, 67, 78 |
| Feature | 1, 2, 3, 13, 15, 16, 17, 42, 43 |
| Pricing | 2, 4, 6, 11 |
| CTA | 4, 10, 11, 13 |
| Testimonial | 4, 8, 10 |
| FAQ | 1, 3, 5 |
| Stats | 6, 8 |
| Team | 1, 2 |
| Blog | 7, 8 |
| Gallery | 4, 6 |
| Contact | 2, 7 |
| Footer | 2, 7 |
| Navbar | 1, 5 |
| Timeline | 3, 9 |
| Logos | 3, 8 |

## AI Content Generation

The editor includes an AI chat sidebar that generates Puck blocks via OpenAI:

1. User describes desired content in natural language
2. System sends block schema + prompt to OpenAI Responses API
3. AI returns structured JSON with block types and props
4. Blocks are inserted into the Puck editor

**Configuration:** Set `OPENAI_API_KEY` and optionally `OPENAI_MODEL` (default: `gpt-4o-mini`) in `.env`.

Regenerate AI schema after changing Puck blocks:
```bash
npm run ai:schema
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/pages?path=/about&locale=en` | No | Get page data |
| GET | `/api/pages?locale=en` | No | List all pages |
| PUT | `/api/pages` | Yes | Save/upsert page |
| DELETE | `/api/pages?id=...` | Yes | Delete page |
| GET | `/api/posts?locale=en&published=true` | No | List posts |
| POST | `/api/posts` | Yes | Create post |
| GET/PUT/DELETE | `/api/posts/[id]` | Yes* | Post CRUD |
| GET/POST | `/api/categories` | No/Yes | Category CRUD |
| GET/POST | `/api/tags` | No/Yes | Tag CRUD |
| POST | `/api/ai/generate` | Yes | Generate blocks via AI |

## How It Works

### Pages (Puck Editor)

All pages are stored in the `pages` table as JSON (Puck data format). The `PuckRenderer` component fetches page data by `path` + `locale` and renders it with Puck's `<Render>`.

1. Go to Admin > Pages
2. Click "Edit" to open the Puck visual editor
3. Drag components, edit props, use AI sidebar for content generation
4. Click "Publish" — no code changes needed

### Blog Posts (TipTap)

Posts are edited with TipTap WYSIWYG editor. Content is stored as Markdown in the database (HTML converted via `turndown`, Markdown rendered back via `marked`).

### Multilingual Content

- URL-prefix routing: `/en/about`, `/sr/about`
- Each page/post/category/tag has a `locale` field
- Switching language navigates to the same path with a different locale prefix
- Demo pages have full Serbian translations

## Testing

```bash
npm run test           # Run all tests once
npm run test:watch     # Watch mode
```

Tests cover: auth callbacks, markdown conversion, AI schema extraction, AI prompt building, API endpoint validation.

## Development

```bash
npm run dev            # Start dev server
npm run db:migrate     # Run Prisma migrations
npm run db:seed        # Seed admin user + categories + tags
npm run db:studio      # Open Prisma Studio
npm run ai:schema      # Regenerate AI block schema
npm run lint           # ESLint
```

## Docker

```bash
docker compose up -d                              # Start all services
docker compose up -d --build puckeditor-app        # Rebuild after code changes
docker compose down                                # Stop
./import-db.sh                                     # Reset DB with dump.sql
```

Services: `puckeditor-app` (port 3078), `puckeditor-postgres` (internal).

## Environment Variables

```env
DATABASE_URL=postgresql://puck:puck_secret@localhost:5432/puck_cms
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
OPENAI_API_KEY=sk-...          # Required for AI generation
OPENAI_MODEL=gpt-4o-mini       # Optional, defaults to gpt-4o-mini
```

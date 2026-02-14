# Puck CMS Demo

A demo project showcasing [Puck Editor](https://puckeditor.com) + Next.js capabilities: visual page builder with drag-and-drop blocks, rich text editing, admin panel, multilingual content (EN/SR), and all pages stored in PostgreSQL.

## Features

- **Visual Page Builder** — Puck Editor with 30+ drag-and-drop components (Hero, Features, Pricing, FAQ, Testimonials, etc.)
- **Rich Text Editor** — TipTap WYSIWYG for blog posts (headings, lists, code blocks, links, images)
- **Admin Panel** — Dashboard, posts/categories/tags/pages management
- **Multilingual** — URL-prefix routing (`/en/about`, `/sr/about`), locale switcher in header
- **All Pages in DB** — Page content stored as JSON in PostgreSQL, editable via visual editor
- **Blog System** — Posts with categories, tags, featured/published flags, markdown storage
- **Dynamic Pages** — Create new pages from admin without code changes (catch-all routing)
- **Auth** — NextAuth v4 with credentials provider, protected admin/editor routes

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
| Framework | Next.js 14 (App Router) |
| Visual Editor | Puck Editor 0.18 |
| Rich Text | TipTap WYSIWYG |
| Database | PostgreSQL 16 (Docker) |
| ORM | Prisma 6 |
| Auth | NextAuth v4 (credentials) |
| Styling | Tailwind CSS v3 + shadcn/ui |
| i18n | next-intl v4 (URL-prefix routing) |
| Container | Docker Compose |

## Project Structure

```
├── prisma/
│   ├── schema.prisma             # DB models: User, Page, Post, Category, Tag
│   ├── seed.ts                   # Seed admin user + categories + tags
│   └── seed-pages.ts             # Seed all demo pages (EN + SR)
├── messages/
│   ├── en.json                   # English translations (UI labels)
│   └── sr.json                   # Serbian translations
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout (minimal)
│   │   ├── [locale]/             # All routes under locale prefix
│   │   │   ├── layout.tsx        # Locale layout (NextIntlClientProvider, SessionProvider)
│   │   │   ├── page.tsx          # Home page (Puck)
│   │   │   ├── [...puckPath]/    # Catch-all for dynamic Puck pages
│   │   │   ├── admin/
│   │   │   │   ├── layout.tsx    # Server wrapper (force-dynamic)
│   │   │   │   ├── AdminLayout.tsx # Client sidebar layout
│   │   │   │   ├── page.tsx      # Dashboard
│   │   │   │   ├── posts/        # Post list, new, edit by [id]
│   │   │   │   ├── categories/   # Category management
│   │   │   │   ├── tags/         # Tag management
│   │   │   │   └── pages/        # Page management + Puck editor links
│   │   │   ├── editor/           # Puck visual editor
│   │   │   ├── login/            # Login page
│   │   │   └── blog/[slug]/      # Blog post detail
│   │   └── api/
│   │       ├── auth/[...nextauth]/ # NextAuth endpoints
│   │       ├── posts/            # CRUD: list, create
│   │       │   └── [id]/         # CRUD: get, update, delete
│   │       ├── categories/       # CRUD
│   │       ├── tags/             # CRUD
│   │       └── pages/            # GET/PUT/DELETE page data
│   ├── components/
│   │   ├── PuckPage.tsx          # Renders Puck page by path + locale
│   │   ├── PuckRoot.tsx          # Root component (header + footer wrapper)
│   │   ├── LocaleSwitcher.tsx    # EN/SR language switcher
│   │   ├── puck-components.tsx   # 30+ Puck components
│   │   ├── admin/
│   │   │   └── PostEditor.tsx    # TipTap post editor
│   │   ├── shared/
│   │   │   ├── Header.tsx        # Site header with nav + locale switcher
│   │   │   └── SharedFooter.tsx  # Site footer
│   │   ├── providers/
│   │   │   └── SessionProvider.tsx
│   │   └── ui/                   # shadcn/ui components (18 components)
│   ├── data/
│   │   └── demo-pages.ts         # Fallback demo page data (if not in DB)
│   ├── i18n/
│   │   ├── routing.ts            # defineRouting: locales, defaultLocale
│   │   ├── navigation.ts         # Locale-aware Link, useRouter, usePathname
│   │   └── request.ts            # Server-side locale resolution
│   ├── lib/
│   │   ├── puck-config.tsx       # Puck component registry + categories
│   │   ├── prisma.ts             # Prisma client singleton
│   │   ├── auth.ts               # NextAuth options
│   │   └── markdown.ts           # HTML <-> Markdown (turndown + marked)
│   └── middleware.ts             # Combines next-intl routing + NextAuth protection
├── docker-compose.yml            # PostgreSQL + Next.js app
├── Dockerfile                    # Multi-stage build
├── docker-entrypoint.sh          # Runs prisma migrate deploy before start
├── import-db.sh                  # Clears tables + imports dump.sql
└── dump.sql                      # Full database dump
```

## How It Works

### Pages (Puck Editor)

All pages are stored in the `pages` table as JSON (Puck data format). The `PuckPage` component fetches page data from the API by `path` + `locale` and renders it with `<Render>`.

1. Go to Admin > Pages
2. Click "Edit" to open the Puck visual editor
3. Drag components, edit props, click "Publish"
4. Create new pages via "New Page" dialog — no code changes needed

### Blog Posts (TipTap)

Posts are edited with TipTap WYSIWYG editor. Content is stored as Markdown in the database (HTML converted via `turndown`, Markdown rendered back via `marked`).

### Multilingual Content

- URL-prefix routing: `/en/about`, `/sr/about`
- Each page/post/category/tag has a `locale` field
- Switching language navigates to the same path with a different locale prefix
- All 6 demo pages have full Serbian translations in the database

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

## Docker

```bash
docker compose up -d              # Start
docker compose up -d --build puckeditor-app   # Rebuild after code changes
docker compose down               # Stop
./import-db.sh                    # Reset DB with dump.sql
```

Services: `puckeditor-app` (port 3078), `puckeditor-postgres` (internal).

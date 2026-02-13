# Puck CMS

Visual CMS built with Next.js, Puck Editor, and PostgreSQL.

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 + Tailwind CSS + shadcn/ui |
| Page Builder | Puck Editor |
| Rich Text | TipTap (WYSIWYG, stores Markdown) |
| Database | PostgreSQL 16 + Prisma ORM |
| Auth | NextAuth.js (credentials) |
| i18n | next-intl (EN / SR) |
| Deploy | Docker Compose |

## Quick Start

### Docker (recommended)

```bash
# Start PostgreSQL + App
docker compose up -d

# Run migrations (first time)
npx prisma migrate dev

# Seed database (admin user + categories + tags)
npx tsx prisma/seed.ts
```

App: http://localhost:3000
Admin: http://localhost:3000/admin

### Local Development

```bash
# Install dependencies
npm install

# Start PostgreSQL (via Docker or locally)
docker compose up postgres -d

# Run migrations
npx prisma migrate dev

# Seed database
npx tsx prisma/seed.ts

# Start dev server
npm run dev
```

## Default Credentials

| Email | Password | Role |
|-------|----------|------|
| admin@example.com | admin123 | ADMIN |

## Project Structure

```
src/
├── app/
│   ├── admin/          # Admin panel (posts, categories, tags, pages)
│   ├── api/            # API routes (auth, pages, posts, categories, tags, locale)
│   ├── blog/           # Blog pages
│   ├── editor/         # Puck visual editor
│   ├── login/          # Login page
│   └── ...             # Public pages
├── components/
│   ├── admin/          # Admin components (PostEditor)
│   ├── puck-components/ # Puck blocks (Hero, Features, TipTap, etc.)
│   ├── puck-fields/    # Custom Puck fields (RichTextField)
│   ├── providers/      # Context providers (SessionProvider)
│   └── ui/             # shadcn/ui components
├── lib/
│   ├── auth.ts         # NextAuth configuration
│   ├── markdown.ts     # HTML <-> Markdown conversion
│   ├── prisma.ts       # Prisma client singleton
│   ├── puck-config.tsx # Puck component registry
│   └── utils.ts        # Utility functions
├── i18n/
│   └── request.ts      # next-intl config
└── middleware.ts        # Auth middleware (protects /admin, /editor)

prisma/
├── schema.prisma       # Database schema
├── migrations/         # Migration files
└── seed.ts             # Database seed script

messages/
├── en.json             # English translations
└── sr.json             # Serbian translations
```

## Database Models

- **User** — admin users (email, password, role)
- **Page** — Puck page data (path, locale, JSON data)
- **Post** — blog posts (slug, locale, markdown content)
- **Category** — post categories (many-to-many with posts)
- **Tag** — post tags (many-to-many with posts)

All content models support `locale` field for multilingual content.

## Features

### Page Builder
- Visual drag-and-drop editor (Puck)
- 30+ built-in components (Hero, Features, Pricing, FAQ, etc.)
- Page data saved to PostgreSQL

### Blog / Posts
- WYSIWYG editor (TipTap) with Markdown storage
- Categories and tags (many-to-many)
- Draft/published status
- Featured posts
- Multilingual (EN/SR)

### Admin Panel
- Dashboard with stats
- Posts CRUD with rich text editor
- Categories management
- Tags management
- Pages management (links to Puck editor)

### Authentication
- NextAuth.js with credentials provider
- JWT sessions
- Middleware protects `/admin` and `/editor` routes

### i18n
- English and Serbian UI translations
- Cookie-based locale switching
- Per-locale content in database

## Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run migrations (dev)
npm run db:push      # Push schema to DB
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio
```

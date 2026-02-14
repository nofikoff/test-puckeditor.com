 Summary

  What was done

  1. Tailwind CSS + shadcn/ui
  - Replaced hand-written 570+ lines of CSS utility classes with proper Tailwind v3
  - Initialized shadcn/ui with 18 components (Button, Input, Card, Table, Badge, Dialog, Select, Tabs, Toast, etc.)

  2. PostgreSQL + Prisma
  - Prisma v6 schema with 5 models: User, Page, Post, Category, Tag
  - All models support locale field for multilingual content
  - Many-to-many relations for posts <-> categories, posts <-> tags
  - Seed script creates admin user + 3 categories (EN/SR) + 5 tags

  3. API Routes
  - GET/PUT /api/pages — Puck page data CRUD
  - GET/POST /api/posts + GET/PUT/DELETE /api/posts/[id] — full posts CRUD
  - GET/POST /api/categories and /api/tags
  - All write endpoints protected with NextAuth session check

  4. Authentication
  - NextAuth v4 with credentials provider
  - Middleware protects /{locale}/admin/* and /{locale}/editor/*
  - Login page at /{locale}/login with shadcn/ui components
  - Default admin: admin@example.com / admin123

  5. Editor saves to DB
  - Puck editor loads page data from PostgreSQL (with fallback to demo data)
  - "Publish" saves to DB with toast notification

  6. Admin Panel (/admin)
  - Dashboard with stats cards
  - Posts list with status, locale, categories, tags
  - Post editor with TipTap WYSIWYG + markdown storage
  - Categories management (create, list by locale)
  - Tags management (create, list by locale)
  - Pages management (links to Puck editor)
  - Sidebar navigation with sign out

  7. Markdown Storage
  - src/lib/markdown.ts — HTML<->MD conversion (turndown + marked)
  - TipTap edits in HTML, saves as Markdown in DB
  - On load, Markdown is converted back to HTML for TipTap

  8. i18n (EN / SR) — URL-prefix routing
  - next-intl v4 with URL-prefix locale routing: /en/xxx, /sr/xxx
  - All page routes under [locale] dynamic segment
  - Locale-aware navigation (Link, useRouter, usePathname) from @/i18n/navigation
  - Middleware combines next-intl locale routing with NextAuth protection
  - LocaleSwitcher in site header — switches locale via URL navigation
  - Translation files: messages/en.json, messages/sr.json
  - All DB content has locale field

  9. Docker
  - docker-compose.yml: PostgreSQL 16 + Next.js app
  - Dockerfile with multi-stage build
  - Entrypoint runs prisma migrate deploy on startup
  - Health checks for both services

  Running the project

  docker compose up -d          # Start everything
  npx prisma migrate dev        # Create tables
  npx tsx prisma/seed.ts        # Seed admin + categories + tags

  - Site: http://localhost:3078/en (redirects from / to /en)
  - Admin: http://localhost:3078/en/admin
  - Login: admin@example.com / admin123

  10. Dynamic Pages (catch-all routing)
  - Replaced 5 static page routes (about, services, contact, demo, blog) with a single catch-all route [...puckPath]
  - New pages can be created from admin panel without code changes
  - Admin /admin/pages: fetches pages from DB, "New Page" dialog, delete support
  - API: GET /api/pages (no path param) returns all pages, DELETE /api/pages?id=... deletes a page
  - PuckPage component shows 404 for pages not found in DB and not in demo-pages
  - Demo pages (/, /about, /services, /blog, /contact, /demo) still render as fallback
  - blog/[slug] route preserved for custom blog post rendering

  11. Docker container naming
  - Services renamed: app → puckeditor-app, postgres → puckeditor-postgres
  - Container names: app.puckeditor, postgres.puckeditor
  - Volume: puckeditor_postgres_data

  12. Puck component styling
  - Added container wrapper (max-w-6xl mx-auto px-4) to atomic components:
    Heading, Text, Badge, Button, Card, Alert, Accordion, Tabs, Divider
  - Ensures consistent padding and max-width across all page sections

  13. URL-prefix locale routing migration
  - Replaced cookie-based locale (no URL prefix) with URL-prefix routing
  - Created src/i18n/routing.ts — defineRouting with locales ["en", "sr"], localePrefix "always"
  - Created src/i18n/navigation.ts — locale-aware Link, useRouter, usePathname, redirect
  - Rewrote src/i18n/request.ts — routing-based locale resolution instead of cookie
  - Rewrote src/middleware.ts — combines next-intl createMiddleware with NextAuth JWT check
  - Moved all routes under src/app/[locale]/ (admin, editor, login, blog, catch-all, home)
  - Created src/app/[locale]/layout.tsx — NextIntlClientProvider, setRequestLocale, locale validation
  - Simplified src/app/layout.tsx — minimal root (no i18n providers)
  - Updated LocaleSwitcher — navigates via router.replace instead of cookie API
  - Updated Header, Footer, PuckRoot, PuckPage — use @/i18n/navigation imports
  - Deleted src/app/api/locale/route.ts — no longer needed
  - URLs: /en/about, /sr/about, /en/admin, /sr/blog/slug, etc.

  14. Multilingual page content (EN + SR)
  - Created prisma/seed-pages.ts — seeds 12 pages (6 EN + 6 SR) into DB
  - All 6 demo pages fully translated to Serbian: /, /about, /services, /blog, /contact, /demo
  - Translated: navigation, Hero, Features, Stats, Testimonials, Pricing, FAQ, CTA,
    Timeline, Team, ContactForm, Newsletter, Accordion, Tabs, Alerts, footer
  - Locale switcher (EN/SR) now shows different content per language
  - Run: docker compose cp prisma/seed-pages.ts puckeditor-app:/app/prisma/seed-pages.ts
         docker compose exec puckeditor-app npx tsx prisma/seed-pages.ts

  15. Editor — Admin Panel link
  - Added "Admin Panel" button to Puck editor header (via renderHeaderActions prop)
  - Links back to /admin from the editor page

  16. Database import script (import-db.sh)
  - Updated to truncate all tables before importing (clean slate on production)
  - Clears: users, pages, posts, categories, tags, _PostCategories, _PostTags
  - Usage: ./import-db.sh [dump.sql]
  - dump.sql contains full data dump (admin user, categories, tags, posts, all 12 pages)

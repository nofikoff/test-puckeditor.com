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
  - POST /api/locale — locale switching
  - All write endpoints protected with NextAuth session check

  4. Authentication
  - NextAuth v4 with credentials provider
  - Middleware protects /admin/* and /editor/*
  - Login page at /login with shadcn/ui components
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

  8. i18n (EN / SR)
  - next-intl v4 with cookie-based locale
  - Translation files: messages/en.json, messages/sr.json
  - LocaleSwitcher component
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

  - Site: http://localhost:3000
  - Admin: http://localhost:3000/admin
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

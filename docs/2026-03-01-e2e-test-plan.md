# E2E Test Plan & Results — Puck CMS

**Date**: 2026-03-01
**Method**: Manual browser testing via Chrome DevTools MCP
**Base URL**: http://localhost:3001
**Credentials**: admin@example.com / admin123
**Environment**: Next.js 14.2 dev server, PostgreSQL 16 (Docker), fresh DB with seed data

---

## Test Scenarios & Results

### 1. Public Pages

| # | Scenario | Steps | Expected Result | Status | Notes |
|---|----------|-------|-----------------|--------|-------|
| 1.1 | Home page (EN) | Navigate to `/en` | Page loads, Puck content or demo rendered | PASS | Title "Home", h1 "Build Stunning Websites Visually", 16K chars body |
| 1.2 | Home page (SR) | Navigate to `/sr` | Page loads with Serbian locale | PASS | Same content rendered at `/sr` |
| 1.3 | Root redirect | Navigate to `/` | Redirects to `/en` (default locale) | PASS | 307 redirect to `/en`; with locale cookie redirects to last locale |
| 1.4 | Dynamic Puck page | Navigate to `/en/about` | Renders Puck page or 404 | PASS | Title "about", h1 "About Our Company", demo content rendered |
| 1.5 | Blog post page | Navigate to `/en/blog/e2e-test-post` | Blog post rendered with title, content, metadata | PASS | 404 when no post; created post accessible after creation |

### 2. Authentication

| # | Scenario | Steps | Expected Result | Status | Notes |
|---|----------|-------|-----------------|--------|-------|
| 2.1 | Login page loads | Navigate to `/en/login` | Login form with email/password fields | PASS | Email input, password input, "Sign In" button, language switcher |
| 2.2 | Protected route redirect | Navigate to `/en/admin` without auth | Redirect to `/en/login?callbackUrl=...` | PASS | 307 to `/en/login?callbackUrl=%2Fen%2Fadmin` |
| 2.3 | Editor redirect | Navigate to `/en/editor` without auth | Redirect to `/en/login?callbackUrl=...` | PASS | 307 to `/en/login?callbackUrl=%2Fen%2Feditor` |
| 2.4 | Successful login | Enter admin@example.com / admin123, submit | Redirect to dashboard or callbackUrl | PASS | Redirected to `/en/admin`, shows dashboard stats |
| 2.5 | Invalid login | Enter wrong credentials | Error message displayed | PASS | "Invalid email or password" displayed, stays on login page |

### 3. Admin Dashboard

| # | Scenario | Steps | Expected Result | Status | Notes |
|---|----------|-------|-----------------|--------|-------|
| 3.1 | Dashboard loads | Navigate to `/en/admin` (authenticated) | Stats displayed (posts, categories, tags count) | PASS | Posts 0, Categories 3, Tags 5; Site View link |
| 3.2 | Navigation links | Check sidebar/nav links | Links to Posts, Categories, Tags, Pages, Settings | PASS | All 6 nav links + Sign Out + email + language switcher |

### 4. Posts Management

| # | Scenario | Steps | Expected Result | Status | Notes |
|---|----------|-------|-----------------|--------|-------|
| 4.1 | Posts list (empty) | Navigate to `/en/admin/posts` | Empty state message | PASS | "No posts yet" + "Create your first post" link |
| 4.2 | Create post form | Navigate to `/en/admin/posts/new` | Form with title, slug, content, categories, tags | PASS | Full form: Title, Slug, TipTap WYSIWYG (15+ toolbar buttons), Excerpt, Language, Cover URL, Categories (3), Tags (5), Publish/Featured/Save |
| 4.3 | Create post | Fill form, submit | Post created, redirect to edit page | PASS | Redirected to `/en/admin/posts/{id}`, shows "Edit Post", "Unpublish" button |
| 4.4 | Edit post | View edit form | Edit form pre-filled with post data | PASS | All fields pre-filled correctly (title, slug, content, excerpt) |
| 4.5 | Delete post | Click delete on a post | Post removed from list | PASS | Toast "Post deleted successfully", list shows "No posts yet" |

### 5. Categories Management

| # | Scenario | Steps | Expected Result | Status | Notes |
|---|----------|-------|-----------------|--------|-------|
| 5.1 | Categories list | Navigate to `/en/admin/categories` | List of categories | PASS | 3 seed categories (News, Tutorial, Update) with slug, locale, post count |
| 5.2 | Create category | Fill name "E2E Category", submit | Category created | PASS | Auto-generated slug "e2e-category", now 4 categories |
| 5.3 | Delete category | Click delete on "E2E Category" | Category removed | PASS | Confirm dialog, toast "Category deleted", back to 3 |

### 6. Tags Management

| # | Scenario | Steps | Expected Result | Status | Notes |
|---|----------|-------|-----------------|--------|-------|
| 6.1 | Tags list | Navigate to `/en/admin/tags` | List of tags | PASS | 5 seed tags (docker, nextjs, prisma, react, typescript) |
| 6.2 | Create tag | Fill name "e2e-tag", submit | Tag created | PASS | Toast "Tag created", now 6 tags |
| 6.3 | Delete tag | Click delete on "e2e-tag" | Tag removed | PASS | Toast "Tag deleted", back to 5 |

### 7. Pages Management

| # | Scenario | Steps | Expected Result | Status | Notes |
|---|----------|-------|-----------------|--------|-------|
| 7.1 | Pages list | Navigate to `/en/admin/pages` | List of Puck pages | PASS | 6 demo pages (/, /about, /blog, /contact, /demo, /services) with Edit links to Puck editor + view links |

### 8. Settings

| # | Scenario | Steps | Expected Result | Status | Notes |
|---|----------|-------|-----------------|--------|-------|
| 8.1 | Settings page | Navigate to `/en/admin/settings` | Settings form (logo, menu, theme) | PASS | Logo URL, Menu Items (Home, About), Theme (Primary/Secondary/Accent colors, Border Radius, Font Family), Live Preview |
| 8.2 | Save settings | Set logo URL, click Save | Settings saved successfully | PASS | Toast "Editor header settings updated successfully", logo preview appeared |

### 9. Puck Editor

| # | Scenario | Steps | Expected Result | Status | Notes |
|---|----------|-------|-----------------|--------|-------|
| 9.1 | Editor loads | Navigate to `/en/editor` (authenticated) | Puck editor UI with sidebar and canvas | PASS | Custom header (logo from settings, nav, AI Generate button, Admin Panel link, Publish), Components sidebar |
| 9.2 | Component sidebar | Check left sidebar | Block categories visible, search works | PASS | 15+ SB categories, All/Favorites tabs, search filters correctly ("pricing" shows SB: Pricing) |
| 9.3 | Drag & drop | Drag a block to canvas | Block added to page | SKIP | DevTools MCP limitation — precise drag not possible; draggable elements confirmed present |

### 10. i18n

| # | Scenario | Steps | Expected Result | Status | Notes |
|---|----------|-------|-----------------|--------|-------|
| 10.1 | EN locale | Navigate `/en/admin` | English UI text | PASS | Dashboard, Posts, Categories, Tags, Pages, Settings, Sign Out |
| 10.2 | SR locale | Navigate `/sr/admin` | Serbian UI text | PASS | Kontrolna tabla, Postovi, Kategorije, Tagovi, Stranice, Podešavanja, Odjava |

### 11. API Endpoints (Smoke)

| # | Scenario | Steps | Expected Result | Status | Notes |
|---|----------|-------|-----------------|--------|-------|
| 11.1 | GET /api/posts | `curl /api/posts?locale=en` | 200 with posts array | PASS | `{posts: [], total: 0, page: 1, limit: 10}` |
| 11.2 | GET /api/categories | `curl /api/categories?locale=en` | 200 with categories array | PASS | 3 categories with `_count.posts` |
| 11.3 | GET /api/tags | `curl /api/tags?locale=en` | 200 with tags array | PASS | 5 tags with `_count.posts` |
| 11.4 | GET /api/settings | `curl /api/settings` | 200 with settings object | PASS | theme, logoUrl, menuItems returned |
| 11.5 | GET /api/pages | `curl /api/pages?locale=en` | 200 with pages array | PASS | `[]` (no DB-saved pages, only demo) |

---

## Results Summary

| Category | Total | Pass | Fail | Skip |
|----------|-------|------|------|------|
| Public Pages | 5 | 5 | 0 | 0 |
| Authentication | 5 | 5 | 0 | 0 |
| Admin Dashboard | 2 | 2 | 0 | 0 |
| Posts Management | 5 | 5 | 0 | 0 |
| Categories | 3 | 3 | 0 | 0 |
| Tags | 3 | 3 | 0 | 0 |
| Pages | 1 | 1 | 0 | 0 |
| Settings | 2 | 2 | 0 | 0 |
| Puck Editor | 3 | 2 | 0 | 1 |
| i18n | 2 | 2 | 0 | 0 |
| API Endpoints | 5 | 5 | 0 | 0 |
| **Total** | **36** | **35** | **0** | **1** |

**Pass rate: 97.2% (35/36)**

---

## Bugs & Issues Found

### BUG-1: Hydration mismatch on Posts list (Date formatting)

- **Severity**: Low (visual only, dev-mode warning)
- **Location**: `src/components/admin/PostsListContent.tsx`
- **Description**: Date column has SSR hydration mismatch — server renders "3/1/2026" while client renders "01/03/2026" due to different `toLocaleDateString()` behavior between Node.js and browser environments.
- **Console errors**:
  - `Text content did not match. Server: "3/1/2026" Client: "01/03/2026"`
  - `There was an error while hydrating this Suspense boundary`
- **Fix suggestion**: Use a consistent date formatter (e.g., `date-fns format()` or `Intl.DateTimeFormat` with explicit locale/options) instead of `toLocaleDateString()`, or suppress hydration with `suppressHydrationWarning` + `useEffect` pattern.

### NOTE-1: Delete buttons use icon-only design

- **Severity**: Info
- **Location**: Categories, Tags, Posts list pages
- **Description**: Delete buttons render as empty text buttons (icon only via SVG/CSS). This caused initial interaction issues in automated testing since buttons had no accessible text label. The `confirm()` dialog correctly fires on click.
- **Suggestion**: Add `aria-label="Delete"` to delete buttons for better accessibility.

---

## Test Environment Cleanup

- Test post "E2E Test Post" — deleted during testing
- Test category "E2E Category" — deleted during testing
- Test tag "e2e-tag" — deleted during testing
- Settings logo URL changed to `https://example.com/test-logo.svg` — minor (reset manually if needed)
- Docker PostgreSQL container `puck-test-postgres` running on port 5432

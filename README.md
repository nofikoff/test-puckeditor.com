# Puck Editor Demo

A fully-featured demo project showcasing [Puck Editor](https://puckeditor.com) - the visual editor for React.

## Quick Start

```bash
# Start the application
docker compose up -d

# Stop the application
docker compose down

# Rebuild after changes
docker compose build && docker compose up -d
```

## URLs

| URL | Description |
|-----|-------------|
| http://localhost:3000 | Home page |
| http://localhost:3000/editor | Visual editor (default page) |
| http://localhost:3000/editor?path=/blog | Edit blog page |
| http://localhost:3000/editor?path=/about | Edit about page |
| http://localhost:3000/editor?path=/services | Edit services page |
| http://localhost:3000/editor?path=/contact | Edit contact page |
| http://localhost:3000/editor?path=/demo | Edit demo/showcase page |
| http://localhost:3000/blog | Blog with articles |
| http://localhost:3000/blog/[slug] | Individual blog post |

## Features

### 30+ Puck Components

**Typography:** Heading, Text, Badge

**Layout:** Columns, Spacer, Divider

**Media:** ImageBlock, VideoEmbed, Gallery

**Interactive:** Button, Accordion, Tabs

**Sections:** Hero, Features, Testimonials, Stats, Pricing, Team, FAQ, CTA, Timeline

**Forms:** Newsletter, ContactForm

**Navigation:** Footer, SocialLinks, LogoCloud, Breadcrumbs

**Blog:** BlogList (dynamic posts from data)

**Misc:** Card, Alert, CodeBlock, Avatar, ProgressBar

### Puck Root (Editable Header/Footer)

The header and footer are managed through Puck Root, making them editable in the visual editor:

- Site name and logo
- Navigation links
- CTA button
- Footer description and links
- Social media links
- Copyright text

To edit: Open any page in the editor and click the "Page" tab in the left panel.

### Blog System

- 6 demo articles with full content
- Dynamic BlogList component
- Category filtering
- Featured post highlight
- Grid/List layout options
- Individual article pages with related posts

## Project Structure

```
├── src/
│   ├── app/                    # Next.js pages
│   │   ├── page.tsx            # Home
│   │   ├── editor/page.tsx     # Puck Editor
│   │   ├── blog/
│   │   │   ├── page.tsx        # Blog list
│   │   │   └── [slug]/page.tsx # Blog post
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── demo/page.tsx
│   │   └── services/page.tsx
│   ├── components/
│   │   ├── puck-components.tsx # All Puck components
│   │   ├── puck-components/
│   │   │   └── BlogList.tsx    # Dynamic blog list
│   │   └── PuckRoot.tsx        # Root with header/footer
│   ├── lib/
│   │   └── puck-config.tsx     # Puck configuration
│   └── data/
│       ├── demo-pages.ts       # Page content data
│       └── blog-posts.ts       # Blog articles data
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## Adding a New Page

### 1. Create the page file

```tsx
// src/app/my-page/page.tsx
"use client";
import { Render } from "@measured/puck";
import "@measured/puck/puck.css";
import { config } from "@/lib/puck-config";
import { getPage } from "@/data/demo-pages";

export default function MyPage() {
  const data = getPage("/my-page");
  return <Render config={config} data={data as any} />;
}
```

### 2. Add page data

```typescript
// In src/data/demo-pages.ts
"/my-page": {
  root: { props: defaultRootProps },
  content: [
    {
      type: "Hero",
      props: {
        id: "hero-1",
        title: "My Page Title",
        // ... other props
      },
    },
    // ... more components
  ],
},
```

### 3. Edit in browser

```
http://localhost:3000/editor?path=/my-page
```

## Adding a New Component

### 1. Create the component

```tsx
// In src/components/puck-components.tsx
export const MyComponent = ({ title, description }: { title: string; description: string }) => (
  <div className="p-4 bg-white rounded-lg shadow">
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);
```

### 2. Add to Puck config

```typescript
// In src/lib/puck-config.tsx

// Add to imports
import { MyComponent } from "@/components/puck-components";

// Add to Props type
MyComponent: React.ComponentProps<typeof MyComponent>;

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

## Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Visual Editor:** Puck Editor
- **Language:** TypeScript
- **Styling:** Custom CSS (Tailwind-like utilities)
- **Container:** Docker

## Resources

- [Puck Documentation](https://puckeditor.com/docs)
- [Puck GitHub](https://github.com/puckeditor/puck)
- [Next.js Documentation](https://nextjs.org/docs)

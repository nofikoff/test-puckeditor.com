// Using custom type to support root props
type PageData = {
  root: { props: Record<string, unknown> };
  content: Array<{ type: string; props: Record<string, unknown> }>;
};

// Default root props for header/footer
const defaultRootProps = {
  siteName: "Puck Demo",
  logoUrl: "",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Demo", href: "/demo" },
    { label: "Contact", href: "/contact" },
  ],
  ctaText: "Open Editor",
  ctaHref: "/editor",
  footerDescription: "The visual editor for React. Build beautiful pages without writing code.",
  footerLinks: [
    { title: "Product", items: "Features\nPricing\nDemo\nEditor" },
    { title: "Company", items: "About\nBlog\nCareers\nContact" },
    { title: "Resources", items: "Documentation\nGitHub\nSupport" },
  ],
  socialLinks: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com/puckeditor/puck",
  },
  copyright: "© 2024 Puck Editor Demo. All rights reserved.",
};

export const demoPages: Record<string, PageData> = {
  "/": {
    root: { props: defaultRootProps },
    content: [
      {
        type: "Hero",
        props: {
          id: "hero-1",
          title: "Build Stunning Websites with Puck Editor",
          subtitle: "The most powerful visual editor for React. Create beautiful, responsive pages with drag-and-drop simplicity.",
          primaryButtonText: "Start Building",
          primaryButtonHref: "/editor",
          secondaryButtonText: "View Demo",
          secondaryButtonHref: "/demo",
          backgroundImage: "",
          alignment: "center",
        },
      },
      {
        type: "LogoCloud",
        props: {
          id: "logos-1",
          title: "Trusted by innovative companies worldwide",
          logos: [
            { name: "Vercel", url: "" },
            { name: "Stripe", url: "" },
            { name: "Shopify", url: "" },
            { name: "Netflix", url: "" },
            { name: "Airbnb", url: "" },
            { name: "Spotify", url: "" },
          ],
        },
      },
      {
        type: "Features",
        props: {
          id: "features-1",
          title: "Everything You Need to Build Amazing Pages",
          subtitle: "Puck Editor comes with all the tools you need to create professional websites",
          columns: "3",
          features: [
            { icon: "🎨", title: "Visual Editor", description: "Drag and drop components to build pages visually without writing code" },
            { icon: "⚡", title: "Lightning Fast", description: "Optimized for performance with lazy loading and code splitting" },
            { icon: "📱", title: "Fully Responsive", description: "All components are mobile-first and look great on any device" },
            { icon: "🔧", title: "Customizable", description: "Easily customize components or create your own from scratch" },
            { icon: "🔒", title: "Type-Safe", description: "Built with TypeScript for better developer experience" },
            { icon: "🚀", title: "Production Ready", description: "Battle-tested in production by thousands of developers" },
          ],
        },
      },
      {
        type: "Stats",
        props: {
          id: "stats-1",
          title: "Powering Thousands of Websites",
          stats: [
            { value: "50", label: "Components", suffix: "+" },
            { value: "10K", label: "Downloads/Week", suffix: "" },
            { value: "500", label: "GitHub Stars", suffix: "+" },
            { value: "99.9", label: "Uptime", suffix: "%" },
          ],
        },
      },
      {
        type: "Testimonials",
        props: {
          id: "testimonials-1",
          title: "Loved by Developers & Designers",
          testimonials: [
            {
              quote: "Puck Editor has completely transformed how we build landing pages. What used to take days now takes hours.",
              author: "Sarah Chen",
              role: "Head of Engineering",
              company: "TechStartup",
              avatar: "https://i.pravatar.cc/100?img=1",
            },
            {
              quote: "The flexibility of Puck is incredible. We've built our entire CMS on top of it and our clients love it.",
              author: "Marcus Johnson",
              role: "CTO",
              company: "AgencyPro",
              avatar: "https://i.pravatar.cc/100?img=3",
            },
            {
              quote: "Finally, a page builder that doesn't compromise on code quality. The React integration is seamless.",
              author: "Elena Rodriguez",
              role: "Senior Developer",
              company: "WebCraft",
              avatar: "https://i.pravatar.cc/100?img=5",
            },
          ],
        },
      },
      {
        type: "Pricing",
        props: {
          id: "pricing-1",
          title: "Simple, Transparent Pricing",
          subtitle: "Choose the plan that fits your needs. All plans include core features.",
          plans: [
            {
              name: "Hobby",
              price: "Free",
              period: "",
              description: "Perfect for side projects",
              features: "Unlimited pages\nCore components\nBasic support\nCommunity access",
              highlighted: "false",
              buttonText: "Get Started",
            },
            {
              name: "Pro",
              price: "$29",
              period: "/month",
              description: "For professional developers",
              features: "Everything in Hobby\nPremium components\nPriority support\nCustom themes\nAnalytics dashboard",
              highlighted: "true",
              buttonText: "Start Free Trial",
            },
            {
              name: "Enterprise",
              price: "Custom",
              period: "",
              description: "For large organizations",
              features: "Everything in Pro\nDedicated support\nSLA guarantee\nCustom development\nOn-premise option",
              highlighted: "false",
              buttonText: "Contact Sales",
            },
          ],
        },
      },
      {
        type: "FAQ",
        props: {
          id: "faq-1",
          title: "Frequently Asked Questions",
          questions: [
            {
              question: "Is Puck Editor free to use?",
              answer: "Yes! Puck Editor is open-source and free to use under the MIT license. You can use it for both personal and commercial projects without any fees.",
            },
            {
              question: "Does it work with Next.js?",
              answer: "Absolutely! Puck Editor is designed to work seamlessly with Next.js, including support for the App Router, Server Components, and all Next.js features.",
            },
            {
              question: "Can I use my own components?",
              answer: "Yes, that's one of the main features! You can easily register your own React components and make them available in the editor with full customization options.",
            },
            {
              question: "How do I store the page data?",
              answer: "Puck Editor outputs JSON data that you can store anywhere - in a database, file system, or any headless CMS. You have complete control over your data.",
            },
          ],
        },
      },
      {
        type: "CTA",
        props: {
          id: "cta-1",
          title: "Ready to Build Something Amazing?",
          subtitle: "Join thousands of developers who are already using Puck Editor to create stunning websites.",
          buttonText: "Get Started for Free",
          buttonHref: "/editor",
          variant: "gradient",
        },
      },
    ],
  },
  "/about": {
    root: { props: defaultRootProps },
    content: [
      {
        type: "Spacer",
        props: { id: "spacer-1", size: "md" },
      },
      {
        type: "Heading",
        props: {
          id: "heading-1",
          text: "About Our Company",
          level: "h1",
          align: "center",
        },
      },
      {
        type: "Spacer",
        props: { id: "spacer-2", size: "sm" },
      },
      {
        type: "Text",
        props: {
          id: "text-1",
          text: "We're on a mission to make web development accessible to everyone. Our visual editor empowers developers and designers to build beautiful, performant websites without sacrificing code quality.",
          size: "large",
          align: "center",
        },
      },
      {
        type: "Spacer",
        props: { id: "spacer-3", size: "lg" },
      },
      {
        type: "Timeline",
        props: {
          id: "timeline-1",
          title: "Our Journey",
          events: [
            { date: "2021", title: "The Idea", description: "Started as an internal tool to help our team build landing pages faster" },
            { date: "2022", title: "Open Source Launch", description: "Released Puck Editor as an open-source project on GitHub" },
            { date: "2023", title: "Community Growth", description: "Reached 10,000+ GitHub stars and built an active community" },
            { date: "2024", title: "Enterprise Launch", description: "Launched enterprise features and premium support" },
            { date: "2025", title: "AI Integration", description: "Added AI-powered features for content generation and optimization" },
          ],
        },
      },
      {
        type: "Team",
        props: {
          id: "team-1",
          title: "Meet Our Team",
          subtitle: "The passionate people behind Puck Editor",
          members: [
            {
              name: "Alex Thompson",
              role: "Founder & CEO",
              bio: "Former Google engineer with 15 years of experience in web development",
              avatar: "https://i.pravatar.cc/200?img=11",
            },
            {
              name: "Maria Garcia",
              role: "CTO",
              bio: "Open source enthusiast and React core contributor",
              avatar: "https://i.pravatar.cc/200?img=5",
            },
            {
              name: "James Wilson",
              role: "Head of Design",
              bio: "Award-winning designer focused on developer experience",
              avatar: "https://i.pravatar.cc/200?img=12",
            },
            {
              name: "Sophie Lee",
              role: "Head of Community",
              bio: "Building bridges between developers worldwide",
              avatar: "https://i.pravatar.cc/200?img=9",
            },
          ],
        },
      },
      {
        type: "CTA",
        props: {
          id: "cta-1",
          title: "Join Our Team",
          subtitle: "We're always looking for talented people to join our mission",
          buttonText: "View Open Positions",
          buttonHref: "/careers",
          variant: "primary",
        },
      },
    ],
  },
  "/blog": {
    root: { props: defaultRootProps },
    content: [
      {
        type: "BlogList",
        props: {
          id: "blog-list-1",
          title: "Latest from Our Blog",
          subtitle: "Insights, tutorials, and updates from the Puck Editor team",
          showCategories: "true",
          showFeatured: "true",
          postsPerPage: 7,
          layout: "grid",
        },
      },
      {
        type: "Newsletter",
        props: {
          id: "newsletter-1",
          title: "Stay in the Loop",
          subtitle: "Subscribe to our newsletter for the latest updates",
          buttonText: "Subscribe",
          placeholder: "Enter your email",
        },
      },
    ],
  },
  "/contact": {
    root: { props: defaultRootProps },
    content: [
      {
        type: "Spacer",
        props: { id: "spacer-1", size: "md" },
      },
      {
        type: "Heading",
        props: {
          id: "heading-1",
          text: "Get in Touch",
          level: "h1",
          align: "center",
        },
      },
      {
        type: "Text",
        props: {
          id: "text-1",
          text: "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
          size: "large",
          align: "center",
        },
      },
      {
        type: "Spacer",
        props: { id: "spacer-2", size: "lg" },
      },
      {
        type: "ContactForm",
        props: {
          id: "form-1",
          title: "Send Us a Message",
          subtitle: "Fill out the form below and we'll get back to you within 24 hours",
          buttonText: "Send Message",
        },
      },
      {
        type: "Spacer",
        props: { id: "spacer-3", size: "xl" },
      },
    ],
  },
  "/demo": {
    root: { props: defaultRootProps },
    content: [
      {
        type: "Hero",
        props: {
          id: "hero-1",
          title: "Component Showcase",
          subtitle: "Explore all the components available in Puck Editor",
          primaryButtonText: "Open Editor",
          primaryButtonHref: "/editor",
          secondaryButtonText: "",
          secondaryButtonHref: "",
          backgroundImage: "",
          alignment: "center",
        },
      },
      {
        type: "Heading",
        props: { id: "h-typography", text: "Typography", level: "h2", align: "left" },
      },
      {
        type: "Spacer",
        props: { id: "s-1", size: "sm" },
      },
      {
        type: "Heading",
        props: { id: "h1-demo", text: "Heading Level 1", level: "h1", align: "left" },
      },
      {
        type: "Heading",
        props: { id: "h2-demo", text: "Heading Level 2", level: "h2", align: "left" },
      },
      {
        type: "Heading",
        props: { id: "h3-demo", text: "Heading Level 3", level: "h3", align: "left" },
      },
      {
        type: "Text",
        props: {
          id: "text-demo",
          text: "This is a paragraph of text. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          size: "medium",
          align: "left",
        },
      },
      {
        type: "Spacer",
        props: { id: "s-2", size: "md" },
      },
      {
        type: "Badge",
        props: { id: "badge-1", text: "New Feature", variant: "primary" },
      },
      {
        type: "Spacer",
        props: { id: "s-3", size: "lg" },
      },
      {
        type: "Divider",
        props: { id: "div-1", style: "solid", color: "medium" },
      },
      {
        type: "Heading",
        props: { id: "h-interactive", text: "Interactive Components", level: "h2", align: "left" },
      },
      {
        type: "Spacer",
        props: { id: "s-4", size: "sm" },
      },
      {
        type: "Button",
        props: { id: "btn-1", text: "Primary Button", href: "#", variant: "primary", size: "medium" },
      },
      {
        type: "Button",
        props: { id: "btn-2", text: "Secondary Button", href: "#", variant: "secondary", size: "medium" },
      },
      {
        type: "Spacer",
        props: { id: "s-5", size: "md" },
      },
      {
        type: "Accordion",
        props: {
          id: "acc-1",
          items: [
            { title: "What is Puck Editor?", content: "Puck Editor is a visual drag-and-drop editor for React applications." },
            { title: "How do I install it?", content: "You can install it via npm: npm install @measured/puck" },
            { title: "Is it free?", content: "Yes! Puck Editor is open-source and free to use under the MIT license." },
          ],
        },
      },
      {
        type: "Spacer",
        props: { id: "s-6", size: "md" },
      },
      {
        type: "Tabs",
        props: {
          id: "tabs-1",
          tabs: [
            { title: "Overview", content: "This is the overview tab content." },
            { title: "Features", content: "Here are the features: drag-and-drop, customizable components, and more!" },
            { title: "Pricing", content: "Check out our pricing page for more details." },
          ],
        },
      },
      {
        type: "Spacer",
        props: { id: "s-7", size: "lg" },
      },
      {
        type: "Divider",
        props: { id: "div-2", style: "dashed", color: "light" },
      },
      {
        type: "Heading",
        props: { id: "h-alerts", text: "Alerts", level: "h2", align: "left" },
      },
      {
        type: "Spacer",
        props: { id: "s-8", size: "sm" },
      },
      {
        type: "Alert",
        props: { id: "alert-info", title: "Information", message: "This is an informational alert.", type: "info" },
      },
      {
        type: "Spacer",
        props: { id: "s-9", size: "sm" },
      },
      {
        type: "Alert",
        props: { id: "alert-success", title: "Success", message: "Operation completed successfully!", type: "success" },
      },
      {
        type: "Spacer",
        props: { id: "s-10", size: "sm" },
      },
      {
        type: "Alert",
        props: { id: "alert-warning", title: "Warning", message: "Please review the changes.", type: "warning" },
      },
      {
        type: "Spacer",
        props: { id: "s-11", size: "lg" },
      },
      {
        type: "CTA",
        props: {
          id: "cta-end",
          title: "Ready to Try It?",
          subtitle: "Open the editor and start building your own pages",
          buttonText: "Open Editor",
          buttonHref: "/editor",
          variant: "primary",
        },
      },
    ],
  },
  "/services": {
    root: { props: defaultRootProps },
    content: [
      {
        type: "Hero",
        props: {
          id: "hero-1",
          title: "Our Services",
          subtitle: "Professional solutions tailored to your business needs",
          primaryButtonText: "Get Started",
          primaryButtonHref: "/contact",
          secondaryButtonText: "View Pricing",
          secondaryButtonHref: "#pricing",
          backgroundImage: "",
          alignment: "center",
        },
      },
      {
        type: "Features",
        props: {
          id: "services-1",
          title: "What We Offer",
          subtitle: "Comprehensive solutions for modern businesses",
          columns: "3",
          features: [
            { icon: "💻", title: "Web Development", description: "Custom websites and web applications built with modern technologies" },
            { icon: "📱", title: "Mobile Apps", description: "Native and cross-platform mobile applications for iOS and Android" },
            { icon: "☁️", title: "Cloud Solutions", description: "Scalable cloud infrastructure and DevOps services" },
            { icon: "🎨", title: "UI/UX Design", description: "User-centered design that converts visitors into customers" },
            { icon: "🔍", title: "SEO Optimization", description: "Improve your search rankings and online visibility" },
            { icon: "📊", title: "Analytics", description: "Data-driven insights to grow your business" },
          ],
        },
      },
      {
        type: "Stats",
        props: {
          id: "stats-1",
          title: "Our Track Record",
          stats: [
            { value: "200", label: "Projects Delivered", suffix: "+" },
            { value: "50", label: "Happy Clients", suffix: "+" },
            { value: "15", label: "Team Members", suffix: "" },
            { value: "5", label: "Years Experience", suffix: "+" },
          ],
        },
      },
      {
        type: "Pricing",
        props: {
          id: "pricing-1",
          title: "Service Packages",
          subtitle: "Choose the package that fits your needs",
          plans: [
            {
              name: "Starter",
              price: "$999",
              period: "/project",
              description: "For small projects",
              features: "Single page website\nBasic SEO\n1 revision round\n2 weeks delivery",
              highlighted: "false",
              buttonText: "Get Started",
            },
            {
              name: "Business",
              price: "$2,999",
              period: "/project",
              description: "Most popular choice",
              features: "Multi-page website\nAdvanced SEO\n3 revision rounds\nCMS integration\n4 weeks delivery",
              highlighted: "true",
              buttonText: "Get Started",
            },
            {
              name: "Enterprise",
              price: "Custom",
              period: "",
              description: "For complex projects",
              features: "Custom development\nFull SEO package\nUnlimited revisions\nDedicated support\nOngoing maintenance",
              highlighted: "false",
              buttonText: "Contact Us",
            },
          ],
        },
      },
      {
        type: "CTA",
        props: {
          id: "cta-1",
          title: "Ready to Start Your Project?",
          subtitle: "Let's discuss how we can help you achieve your goals",
          buttonText: "Schedule a Call",
          buttonHref: "/contact",
          variant: "gradient",
        },
      },
    ],
  },
};

export const getPage = (path: string): PageData | null => {
  return demoPages[path] || null;
};

export const getAllPaths = (): string[] => {
  return Object.keys(demoPages);
};

export const getDefaultPageData = (): PageData => {
  return { root: { props: { ...defaultRootProps } }, content: [] };
};

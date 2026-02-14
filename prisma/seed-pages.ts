import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

type PageData = {
  root: { props: Record<string, unknown> };
  content: Array<{ type: string; props: Record<string, unknown> }>;
};

const rootPropsEN = {
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

const rootPropsSR = {
  siteName: "Puck Demo",
  logoUrl: "",
  navLinks: [
    { label: "Početna", href: "/" },
    { label: "Usluge", href: "/services" },
    { label: "O nama", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Demo", href: "/demo" },
    { label: "Kontakt", href: "/contact" },
  ],
  ctaText: "Otvori Editor",
  ctaHref: "/editor",
  footerDescription: "Vizuelni editor za React. Pravite lepe stranice bez pisanja koda.",
  footerLinks: [
    { title: "Proizvod", items: "Funkcije\nCene\nDemo\nEditor" },
    { title: "Kompanija", items: "O nama\nBlog\nKarijere\nKontakt" },
    { title: "Resursi", items: "Dokumentacija\nGitHub\nPodrška" },
  ],
  socialLinks: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com/puckeditor/puck",
  },
  copyright: "© 2024 Puck Editor Demo. Sva prava zadržana.",
};

// ──────────────── EN pages ────────────────

const pagesEN: Record<string, { title: string; data: PageData }> = {
  "/": {
    title: "Home",
    data: {
      root: { props: rootPropsEN },
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
              { quote: "Puck Editor has completely transformed how we build landing pages. What used to take days now takes hours.", author: "Sarah Chen", role: "Head of Engineering", company: "TechStartup", avatar: "https://i.pravatar.cc/100?img=1" },
              { quote: "The flexibility of Puck is incredible. We've built our entire CMS on top of it and our clients love it.", author: "Marcus Johnson", role: "CTO", company: "AgencyPro", avatar: "https://i.pravatar.cc/100?img=3" },
              { quote: "Finally, a page builder that doesn't compromise on code quality. The React integration is seamless.", author: "Elena Rodriguez", role: "Senior Developer", company: "WebCraft", avatar: "https://i.pravatar.cc/100?img=5" },
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
              { name: "Hobby", price: "Free", period: "", description: "Perfect for side projects", features: "Unlimited pages\nCore components\nBasic support\nCommunity access", highlighted: "false", buttonText: "Get Started" },
              { name: "Pro", price: "$29", period: "/month", description: "For professional developers", features: "Everything in Hobby\nPremium components\nPriority support\nCustom themes\nAnalytics dashboard", highlighted: "true", buttonText: "Start Free Trial" },
              { name: "Enterprise", price: "Custom", period: "", description: "For large organizations", features: "Everything in Pro\nDedicated support\nSLA guarantee\nCustom development\nOn-premise option", highlighted: "false", buttonText: "Contact Sales" },
            ],
          },
        },
        {
          type: "FAQ",
          props: {
            id: "faq-1",
            title: "Frequently Asked Questions",
            questions: [
              { question: "Is Puck Editor free to use?", answer: "Yes! Puck Editor is open-source and free to use under the MIT license. You can use it for both personal and commercial projects without any fees." },
              { question: "Does it work with Next.js?", answer: "Absolutely! Puck Editor is designed to work seamlessly with Next.js, including support for the App Router, Server Components, and all Next.js features." },
              { question: "Can I use my own components?", answer: "Yes, that's one of the main features! You can easily register your own React components and make them available in the editor with full customization options." },
              { question: "How do I store the page data?", answer: "Puck Editor outputs JSON data that you can store anywhere - in a database, file system, or any headless CMS. You have complete control over your data." },
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
  },

  "/about": {
    title: "About",
    data: {
      root: { props: rootPropsEN },
      content: [
        { type: "Spacer", props: { id: "spacer-1", size: "md" } },
        { type: "Heading", props: { id: "heading-1", text: "About Our Company", level: "h1", align: "center" } },
        { type: "Spacer", props: { id: "spacer-2", size: "sm" } },
        { type: "Text", props: { id: "text-1", text: "We're on a mission to make web development accessible to everyone. Our visual editor empowers developers and designers to build beautiful, performant websites without sacrificing code quality.", size: "large", align: "center" } },
        { type: "Spacer", props: { id: "spacer-3", size: "lg" } },
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
              { name: "Alex Thompson", role: "Founder & CEO", bio: "Former Google engineer with 15 years of experience in web development", avatar: "https://i.pravatar.cc/200?img=11" },
              { name: "Maria Garcia", role: "CTO", bio: "Open source enthusiast and React core contributor", avatar: "https://i.pravatar.cc/200?img=5" },
              { name: "James Wilson", role: "Head of Design", bio: "Award-winning designer focused on developer experience", avatar: "https://i.pravatar.cc/200?img=12" },
              { name: "Sophie Lee", role: "Head of Community", bio: "Building bridges between developers worldwide", avatar: "https://i.pravatar.cc/200?img=9" },
            ],
          },
        },
        { type: "CTA", props: { id: "cta-1", title: "Join Our Team", subtitle: "We're always looking for talented people to join our mission", buttonText: "View Open Positions", buttonHref: "/careers", variant: "primary" } },
      ],
    },
  },

  "/services": {
    title: "Services",
    data: {
      root: { props: rootPropsEN },
      content: [
        {
          type: "Hero",
          props: { id: "hero-1", title: "Our Services", subtitle: "Professional solutions tailored to your business needs", primaryButtonText: "Get Started", primaryButtonHref: "/contact", secondaryButtonText: "View Pricing", secondaryButtonHref: "#pricing", backgroundImage: "", alignment: "center" },
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
              { name: "Starter", price: "$999", period: "/project", description: "For small projects", features: "Single page website\nBasic SEO\n1 revision round\n2 weeks delivery", highlighted: "false", buttonText: "Get Started" },
              { name: "Business", price: "$2,999", period: "/project", description: "Most popular choice", features: "Multi-page website\nAdvanced SEO\n3 revision rounds\nCMS integration\n4 weeks delivery", highlighted: "true", buttonText: "Get Started" },
              { name: "Enterprise", price: "Custom", period: "", description: "For complex projects", features: "Custom development\nFull SEO package\nUnlimited revisions\nDedicated support\nOngoing maintenance", highlighted: "false", buttonText: "Contact Us" },
            ],
          },
        },
        { type: "CTA", props: { id: "cta-1", title: "Ready to Start Your Project?", subtitle: "Let's discuss how we can help you achieve your goals", buttonText: "Schedule a Call", buttonHref: "/contact", variant: "gradient" } },
      ],
    },
  },

  "/blog": {
    title: "Blog",
    data: {
      root: { props: rootPropsEN },
      content: [
        { type: "BlogList", props: { id: "blog-list-1", title: "Latest from Our Blog", subtitle: "Insights, tutorials, and updates from the Puck Editor team", showCategories: "true", showFeatured: "true", postsPerPage: 7, layout: "grid" } },
        { type: "Newsletter", props: { id: "newsletter-1", title: "Stay in the Loop", subtitle: "Subscribe to our newsletter for the latest updates", buttonText: "Subscribe", placeholder: "Enter your email" } },
      ],
    },
  },

  "/contact": {
    title: "Contact",
    data: {
      root: { props: rootPropsEN },
      content: [
        { type: "Spacer", props: { id: "spacer-1", size: "md" } },
        { type: "Heading", props: { id: "heading-1", text: "Get in Touch", level: "h1", align: "center" } },
        { type: "Text", props: { id: "text-1", text: "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.", size: "large", align: "center" } },
        { type: "Spacer", props: { id: "spacer-2", size: "lg" } },
        { type: "ContactForm", props: { id: "form-1", title: "Send Us a Message", subtitle: "Fill out the form below and we'll get back to you within 24 hours", buttonText: "Send Message" } },
        { type: "Spacer", props: { id: "spacer-3", size: "xl" } },
      ],
    },
  },

  "/demo": {
    title: "Demo",
    data: {
      root: { props: rootPropsEN },
      content: [
        { type: "Hero", props: { id: "hero-1", title: "Component Showcase", subtitle: "Explore all the components available in Puck Editor", primaryButtonText: "Open Editor", primaryButtonHref: "/editor", secondaryButtonText: "", secondaryButtonHref: "", backgroundImage: "", alignment: "center" } },
        { type: "Heading", props: { id: "h-typography", text: "Typography", level: "h2", align: "left" } },
        { type: "Spacer", props: { id: "s-1", size: "sm" } },
        { type: "Heading", props: { id: "h1-demo", text: "Heading Level 1", level: "h1", align: "left" } },
        { type: "Heading", props: { id: "h2-demo", text: "Heading Level 2", level: "h2", align: "left" } },
        { type: "Heading", props: { id: "h3-demo", text: "Heading Level 3", level: "h3", align: "left" } },
        { type: "Text", props: { id: "text-demo", text: "This is a paragraph of text. Lorem ipsum dolor sit amet, consectetur adipiscing elit.", size: "medium", align: "left" } },
        { type: "Spacer", props: { id: "s-2", size: "md" } },
        { type: "Badge", props: { id: "badge-1", text: "New Feature", variant: "primary" } },
        { type: "Spacer", props: { id: "s-3", size: "lg" } },
        { type: "Divider", props: { id: "div-1", style: "solid", color: "medium" } },
        { type: "Heading", props: { id: "h-interactive", text: "Interactive Components", level: "h2", align: "left" } },
        { type: "Spacer", props: { id: "s-4", size: "sm" } },
        { type: "Button", props: { id: "btn-1", text: "Primary Button", href: "#", variant: "primary", size: "medium" } },
        { type: "Button", props: { id: "btn-2", text: "Secondary Button", href: "#", variant: "secondary", size: "medium" } },
        { type: "Spacer", props: { id: "s-5", size: "md" } },
        { type: "Accordion", props: { id: "acc-1", items: [
          { title: "What is Puck Editor?", content: "Puck Editor is a visual drag-and-drop editor for React applications." },
          { title: "How do I install it?", content: "You can install it via npm: npm install @measured/puck" },
          { title: "Is it free?", content: "Yes! Puck Editor is open-source and free to use under the MIT license." },
        ] } },
        { type: "Spacer", props: { id: "s-6", size: "md" } },
        { type: "Tabs", props: { id: "tabs-1", tabs: [
          { title: "Overview", content: "This is the overview tab content." },
          { title: "Features", content: "Here are the features: drag-and-drop, customizable components, and more!" },
          { title: "Pricing", content: "Check out our pricing page for more details." },
        ] } },
        { type: "Spacer", props: { id: "s-7", size: "lg" } },
        { type: "Divider", props: { id: "div-2", style: "dashed", color: "light" } },
        { type: "Heading", props: { id: "h-alerts", text: "Alerts", level: "h2", align: "left" } },
        { type: "Spacer", props: { id: "s-8", size: "sm" } },
        { type: "Alert", props: { id: "alert-info", title: "Information", message: "This is an informational alert.", type: "info" } },
        { type: "Spacer", props: { id: "s-9", size: "sm" } },
        { type: "Alert", props: { id: "alert-success", title: "Success", message: "Operation completed successfully!", type: "success" } },
        { type: "Spacer", props: { id: "s-10", size: "sm" } },
        { type: "Alert", props: { id: "alert-warning", title: "Warning", message: "Please review the changes.", type: "warning" } },
        { type: "Spacer", props: { id: "s-11", size: "lg" } },
        { type: "CTA", props: { id: "cta-end", title: "Ready to Try It?", subtitle: "Open the editor and start building your own pages", buttonText: "Open Editor", buttonHref: "/editor", variant: "primary" } },
      ],
    },
  },
};

// ──────────────── SR pages ────────────────

const pagesSR: Record<string, { title: string; data: PageData }> = {
  "/": {
    title: "Početna",
    data: {
      root: { props: rootPropsSR },
      content: [
        {
          type: "Hero",
          props: {
            id: "hero-1",
            title: "Napravite neverovatne sajtove sa Puck Editorom",
            subtitle: "Najmoćniji vizuelni editor za React. Kreirajte lepe, responzivne stranice jednostavnim prevlačenjem.",
            primaryButtonText: "Počnite sa radom",
            primaryButtonHref: "/editor",
            secondaryButtonText: "Pogledajte demo",
            secondaryButtonHref: "/demo",
            backgroundImage: "",
            alignment: "center",
          },
        },
        {
          type: "LogoCloud",
          props: {
            id: "logos-1",
            title: "Koriste ga inovativne kompanije širom sveta",
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
            title: "Sve što vam treba za pravljenje sjajnih stranica",
            subtitle: "Puck Editor dolazi sa svim alatima za kreiranje profesionalnih sajtova",
            columns: "3",
            features: [
              { icon: "🎨", title: "Vizuelni editor", description: "Prevlačite komponente da vizuelno gradite stranice bez pisanja koda" },
              { icon: "⚡", title: "Munjevito brz", description: "Optimizovan za performanse sa odloženim učitavanjem i razdvajanjem koda" },
              { icon: "📱", title: "Potpuno responzivan", description: "Sve komponente su prilagođene mobilnim uređajima i izgledaju sjajno na svakom ekranu" },
              { icon: "🔧", title: "Prilagodljiv", description: "Lako prilagodite komponente ili kreirajte sopstvene od nule" },
              { icon: "🔒", title: "Tipski bezbedan", description: "Napravljen sa TypeScript-om za bolje iskustvo programera" },
              { icon: "🚀", title: "Spreman za produkciju", description: "Testiran u produkciji od strane hiljada programera" },
            ],
          },
        },
        {
          type: "Stats",
          props: {
            id: "stats-1",
            title: "Pokreće hiljade sajtova",
            stats: [
              { value: "50", label: "Komponenti", suffix: "+" },
              { value: "10K", label: "Preuzimanja/Nedelja", suffix: "" },
              { value: "500", label: "GitHub zvezda", suffix: "+" },
              { value: "99.9", label: "Dostupnost", suffix: "%" },
            ],
          },
        },
        {
          type: "Testimonials",
          props: {
            id: "testimonials-1",
            title: "Vole ga programeri i dizajneri",
            testimonials: [
              { quote: "Puck Editor je potpuno promenio način na koji pravimo landing stranice. Ono što je ranije trajalo danima, sada traje satima.", author: "Sarah Chen", role: "Direktor inženjeringa", company: "TechStartup", avatar: "https://i.pravatar.cc/100?img=1" },
              { quote: "Fleksibilnost Puck-a je neverovatna. Izgradili smo ceo CMS na njemu i naši klijenti ga obožavaju.", author: "Marcus Johnson", role: "Tehnički direktor", company: "AgencyPro", avatar: "https://i.pravatar.cc/100?img=3" },
              { quote: "Konačno, alat za pravljenje stranica koji ne pravi kompromise u kvalitetu koda. React integracija je besprekorna.", author: "Elena Rodriguez", role: "Viši programer", company: "WebCraft", avatar: "https://i.pravatar.cc/100?img=5" },
            ],
          },
        },
        {
          type: "Pricing",
          props: {
            id: "pricing-1",
            title: "Jednostavne, transparentne cene",
            subtitle: "Izaberite plan koji odgovara vašim potrebama. Svi planovi uključuju osnovne funkcije.",
            plans: [
              { name: "Hobi", price: "Besplatno", period: "", description: "Savršeno za sporedne projekte", features: "Neograničene stranice\nOsnovne komponente\nOsnovna podrška\nPristup zajednici", highlighted: "false", buttonText: "Započnite" },
              { name: "Pro", price: "$29", period: "/mesec", description: "Za profesionalne programere", features: "Sve iz Hobi plana\nPremium komponente\nPrioritentna podrška\nPrilagođene teme\nAnalitička tabla", highlighted: "true", buttonText: "Pokrenite probni period" },
              { name: "Enterprise", price: "Po dogovoru", period: "", description: "Za velike organizacije", features: "Sve iz Pro plana\nDedikirana podrška\nSLA garancija\nPrilagođeni razvoj\nOpcija na lokaciji", highlighted: "false", buttonText: "Kontaktirajte prodaju" },
            ],
          },
        },
        {
          type: "FAQ",
          props: {
            id: "faq-1",
            title: "Često postavljana pitanja",
            questions: [
              { question: "Da li je Puck Editor besplatan?", answer: "Da! Puck Editor je open-source i besplatan za korišćenje pod MIT licencom. Možete ga koristiti za lične i komercijalne projekte bez ikakvih naknada." },
              { question: "Da li radi sa Next.js?", answer: "Apsolutno! Puck Editor je dizajniran da besprekorno radi sa Next.js, uključujući podršku za App Router, Server Components i sve Next.js funkcije." },
              { question: "Mogu li koristiti sopstvene komponente?", answer: "Da, to je jedna od glavnih funkcija! Lako možete registrovati sopstvene React komponente i učiniti ih dostupnim u editoru sa potpunim opcijama prilagođavanja." },
              { question: "Kako da čuvam podatke stranica?", answer: "Puck Editor generiše JSON podatke koje možete čuvati bilo gde — u bazi podataka, fajl sistemu ili bilo kom headless CMS-u. Imate potpunu kontrolu nad svojim podacima." },
            ],
          },
        },
        {
          type: "CTA",
          props: {
            id: "cta-1",
            title: "Spremni da napravite nešto neverovatno?",
            subtitle: "Pridružite se hiljadama programera koji već koriste Puck Editor za kreiranje sjajnih sajtova.",
            buttonText: "Započnite besplatno",
            buttonHref: "/editor",
            variant: "gradient",
          },
        },
      ],
    },
  },

  "/about": {
    title: "O nama",
    data: {
      root: { props: rootPropsSR },
      content: [
        { type: "Spacer", props: { id: "spacer-1", size: "md" } },
        { type: "Heading", props: { id: "heading-1", text: "O našoj kompaniji", level: "h1", align: "center" } },
        { type: "Spacer", props: { id: "spacer-2", size: "sm" } },
        { type: "Text", props: { id: "text-1", text: "Naša misija je da web razvoj učinimo dostupnim svima. Naš vizuelni editor omogućava programerima i dizajnerima da prave lepe i performantne sajtove bez žrtvovanja kvaliteta koda.", size: "large", align: "center" } },
        { type: "Spacer", props: { id: "spacer-3", size: "lg" } },
        {
          type: "Timeline",
          props: {
            id: "timeline-1",
            title: "Naš put",
            events: [
              { date: "2021", title: "Ideja", description: "Počelo je kao interni alat koji pomaže našem timu da brže pravi landing stranice" },
              { date: "2022", title: "Open Source lansiranje", description: "Objavili smo Puck Editor kao open-source projekat na GitHub-u" },
              { date: "2023", title: "Rast zajednice", description: "Dostigli smo 10.000+ GitHub zvezda i izgradili aktivnu zajednicu" },
              { date: "2024", title: "Enterprise lansiranje", description: "Pokrenuli smo enterprise funkcije i premium podršku" },
              { date: "2025", title: "AI integracija", description: "Dodali smo AI funkcije za generisanje i optimizaciju sadržaja" },
            ],
          },
        },
        {
          type: "Team",
          props: {
            id: "team-1",
            title: "Upoznajte naš tim",
            subtitle: "Strastveni ljudi iza Puck Editora",
            members: [
              { name: "Alex Thompson", role: "Osnivač i direktor", bio: "Bivši Google inženjer sa 15 godina iskustva u web razvoju", avatar: "https://i.pravatar.cc/200?img=11" },
              { name: "Maria Garcia", role: "Tehnički direktor", bio: "Entuzijasta otvorenog koda i React core kontributor", avatar: "https://i.pravatar.cc/200?img=5" },
              { name: "James Wilson", role: "Direktor dizajna", bio: "Nagrađivani dizajner fokusiran na iskustvo programera", avatar: "https://i.pravatar.cc/200?img=12" },
              { name: "Sophie Lee", role: "Direktorka zajednice", bio: "Gradi mostove između programera širom sveta", avatar: "https://i.pravatar.cc/200?img=9" },
            ],
          },
        },
        { type: "CTA", props: { id: "cta-1", title: "Pridružite se našem timu", subtitle: "Uvek tražimo talentovane ljude koji žele da se pridruže našoj misiji", buttonText: "Pogledajte otvorene pozicije", buttonHref: "/careers", variant: "primary" } },
      ],
    },
  },

  "/services": {
    title: "Usluge",
    data: {
      root: { props: rootPropsSR },
      content: [
        {
          type: "Hero",
          props: { id: "hero-1", title: "Naše usluge", subtitle: "Profesionalna rešenja prilagođena vašim poslovnim potrebama", primaryButtonText: "Započnite", primaryButtonHref: "/contact", secondaryButtonText: "Pogledajte cene", secondaryButtonHref: "#pricing", backgroundImage: "", alignment: "center" },
        },
        {
          type: "Features",
          props: {
            id: "services-1",
            title: "Šta nudimo",
            subtitle: "Sveobuhvatna rešenja za moderne biznise",
            columns: "3",
            features: [
              { icon: "💻", title: "Web razvoj", description: "Prilagođeni sajtovi i web aplikacije napravljene modernim tehnologijama" },
              { icon: "📱", title: "Mobilne aplikacije", description: "Nativne i cross-platform mobilne aplikacije za iOS i Android" },
              { icon: "☁️", title: "Cloud rešenja", description: "Skalabilna cloud infrastruktura i DevOps usluge" },
              { icon: "🎨", title: "UI/UX dizajn", description: "Dizajn usmeren na korisnika koji pretvara posetioce u klijente" },
              { icon: "🔍", title: "SEO optimizacija", description: "Poboljšajte svoj rang u pretraživačima i online vidljivost" },
              { icon: "📊", title: "Analitika", description: "Uvidi zasnovani na podacima za rast vašeg biznisa" },
            ],
          },
        },
        {
          type: "Stats",
          props: {
            id: "stats-1",
            title: "Naši rezultati",
            stats: [
              { value: "200", label: "Isporučenih projekata", suffix: "+" },
              { value: "50", label: "Zadovoljnih klijenata", suffix: "+" },
              { value: "15", label: "Članova tima", suffix: "" },
              { value: "5", label: "Godina iskustva", suffix: "+" },
            ],
          },
        },
        {
          type: "Pricing",
          props: {
            id: "pricing-1",
            title: "Paketi usluga",
            subtitle: "Izaberite paket koji odgovara vašim potrebama",
            plans: [
              { name: "Starter", price: "$999", period: "/projekat", description: "Za male projekte", features: "Sajt od jedne stranice\nOsnovni SEO\n1 runda revizija\nIsporuka za 2 nedelje", highlighted: "false", buttonText: "Započnite" },
              { name: "Biznis", price: "$2.999", period: "/projekat", description: "Najpopularniji izbor", features: "Sajt sa više stranica\nNapredni SEO\n3 runde revizija\nCMS integracija\nIsporuka za 4 nedelje", highlighted: "true", buttonText: "Započnite" },
              { name: "Enterprise", price: "Po dogovoru", period: "", description: "Za složene projekte", features: "Prilagođeni razvoj\nPun SEO paket\nNeograničene revizije\nDedikirana podrška\nKontinuirano održavanje", highlighted: "false", buttonText: "Kontaktirajte nas" },
            ],
          },
        },
        { type: "CTA", props: { id: "cta-1", title: "Spremni da pokrenete projekat?", subtitle: "Razgovarajmo o tome kako vam možemo pomoći da ostvarite svoje ciljeve", buttonText: "Zakažite poziv", buttonHref: "/contact", variant: "gradient" } },
      ],
    },
  },

  "/blog": {
    title: "Blog",
    data: {
      root: { props: rootPropsSR },
      content: [
        { type: "BlogList", props: { id: "blog-list-1", title: "Najnovije sa našeg bloga", subtitle: "Uvidi, tutorijali i novosti od Puck Editor tima", showCategories: "true", showFeatured: "true", postsPerPage: 7, layout: "grid" } },
        { type: "Newsletter", props: { id: "newsletter-1", title: "Budite u toku", subtitle: "Pretplatite se na naš bilten za najnovije informacije", buttonText: "Pretplatite se", placeholder: "Unesite vaš email" } },
      ],
    },
  },

  "/contact": {
    title: "Kontakt",
    data: {
      root: { props: rootPropsSR },
      content: [
        { type: "Spacer", props: { id: "spacer-1", size: "md" } },
        { type: "Heading", props: { id: "heading-1", text: "Kontaktirajte nas", level: "h1", align: "center" } },
        { type: "Text", props: { id: "text-1", text: "Imate pitanja? Rado bismo čuli od vas. Pošaljite nam poruku i odgovorićemo što je pre moguće.", size: "large", align: "center" } },
        { type: "Spacer", props: { id: "spacer-2", size: "lg" } },
        { type: "ContactForm", props: { id: "form-1", title: "Pošaljite nam poruku", subtitle: "Popunite formular ispod i javićemo vam se u roku od 24 sata", buttonText: "Pošalji poruku" } },
        { type: "Spacer", props: { id: "spacer-3", size: "xl" } },
      ],
    },
  },

  "/demo": {
    title: "Demo",
    data: {
      root: { props: rootPropsSR },
      content: [
        { type: "Hero", props: { id: "hero-1", title: "Prikaz komponenti", subtitle: "Istražite sve komponente dostupne u Puck Editoru", primaryButtonText: "Otvori Editor", primaryButtonHref: "/editor", secondaryButtonText: "", secondaryButtonHref: "", backgroundImage: "", alignment: "center" } },
        { type: "Heading", props: { id: "h-typography", text: "Tipografija", level: "h2", align: "left" } },
        { type: "Spacer", props: { id: "s-1", size: "sm" } },
        { type: "Heading", props: { id: "h1-demo", text: "Naslov nivoa 1", level: "h1", align: "left" } },
        { type: "Heading", props: { id: "h2-demo", text: "Naslov nivoa 2", level: "h2", align: "left" } },
        { type: "Heading", props: { id: "h3-demo", text: "Naslov nivoa 3", level: "h3", align: "left" } },
        { type: "Text", props: { id: "text-demo", text: "Ovo je pasus teksta. Lorem ipsum dolor sit amet, consectetur adipiscing elit.", size: "medium", align: "left" } },
        { type: "Spacer", props: { id: "s-2", size: "md" } },
        { type: "Badge", props: { id: "badge-1", text: "Nova funkcija", variant: "primary" } },
        { type: "Spacer", props: { id: "s-3", size: "lg" } },
        { type: "Divider", props: { id: "div-1", style: "solid", color: "medium" } },
        { type: "Heading", props: { id: "h-interactive", text: "Interaktivne komponente", level: "h2", align: "left" } },
        { type: "Spacer", props: { id: "s-4", size: "sm" } },
        { type: "Button", props: { id: "btn-1", text: "Primarno dugme", href: "#", variant: "primary", size: "medium" } },
        { type: "Button", props: { id: "btn-2", text: "Sekundarno dugme", href: "#", variant: "secondary", size: "medium" } },
        { type: "Spacer", props: { id: "s-5", size: "md" } },
        { type: "Accordion", props: { id: "acc-1", items: [
          { title: "Šta je Puck Editor?", content: "Puck Editor je vizuelni drag-and-drop editor za React aplikacije." },
          { title: "Kako da ga instaliram?", content: "Možete ga instalirati preko npm-a: npm install @measured/puck" },
          { title: "Da li je besplatan?", content: "Da! Puck Editor je open-source i besplatan za korišćenje pod MIT licencom." },
        ] } },
        { type: "Spacer", props: { id: "s-6", size: "md" } },
        { type: "Tabs", props: { id: "tabs-1", tabs: [
          { title: "Pregled", content: "Ovo je sadržaj kartice pregleda." },
          { title: "Funkcije", content: "Evo funkcija: prevuci-i-pusti, prilagodljive komponente i još mnogo toga!" },
          { title: "Cene", content: "Pogledajte našu stranicu sa cenama za više detalja." },
        ] } },
        { type: "Spacer", props: { id: "s-7", size: "lg" } },
        { type: "Divider", props: { id: "div-2", style: "dashed", color: "light" } },
        { type: "Heading", props: { id: "h-alerts", text: "Obaveštenja", level: "h2", align: "left" } },
        { type: "Spacer", props: { id: "s-8", size: "sm" } },
        { type: "Alert", props: { id: "alert-info", title: "Informacija", message: "Ovo je informativno obaveštenje.", type: "info" } },
        { type: "Spacer", props: { id: "s-9", size: "sm" } },
        { type: "Alert", props: { id: "alert-success", title: "Uspeh", message: "Operacija je uspešno završena!", type: "success" } },
        { type: "Spacer", props: { id: "s-10", size: "sm" } },
        { type: "Alert", props: { id: "alert-warning", title: "Upozorenje", message: "Molimo pregledajte izmene.", type: "warning" } },
        { type: "Spacer", props: { id: "s-11", size: "lg" } },
        { type: "CTA", props: { id: "cta-end", title: "Spremni da probate?", subtitle: "Otvorite editor i počnite da pravite sopstvene stranice", buttonText: "Otvori Editor", buttonHref: "/editor", variant: "primary" } },
      ],
    },
  },
};

async function main() {
  console.log("Seeding pages...\n");

  // Seed EN pages
  for (const [path, { title, data }] of Object.entries(pagesEN)) {
    await prisma.page.upsert({
      where: { path_locale: { path, locale: "en" } },
      update: { title, data: data as unknown as Record<string, unknown>, published: true },
      create: { path, locale: "en", title, data: data as unknown as Record<string, unknown>, published: true },
    });
    console.log(`  [EN] ${path} — ${title}`);
  }

  // Seed SR pages
  for (const [path, { title, data }] of Object.entries(pagesSR)) {
    await prisma.page.upsert({
      where: { path_locale: { path, locale: "sr" } },
      update: { title, data: data as unknown as Record<string, unknown>, published: true },
      create: { path, locale: "sr", title, data: data as unknown as Record<string, unknown>, published: true },
    });
    console.log(`  [SR] ${path} — ${title}`);
  }

  console.log("\nDone! Seeded 12 pages (6 EN + 6 SR).");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

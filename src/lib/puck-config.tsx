import { Config, Data } from "@measured/puck";
import { PuckRoot } from "@/components/PuckRoot";
import {
  Heading,
  Text,
  Button,
  Card,
  Hero,
  Features,
  Testimonials,
  Stats,
  Pricing,
  Team,
  FAQ,
  CTA,
  Footer,
  ImageBlock,
  Columns,
  Spacer,
  Divider,
  VideoEmbed,
  CodeBlock,
  Alert,
  Badge,
  Avatar,
  ProgressBar,
  Accordion,
  Tabs,
  Timeline,
  Gallery,
  Newsletter,
  ContactForm,
  SocialLinks,
  LogoCloud,
  Breadcrumbs,
  BlogList,
  RichTextBlock,
} from "@/components/puck-components";
import { BlogListProps } from "@/components/puck-components/BlogList";
import { RichTextBlockProps } from "@/components/puck-components/TipTapEditor";
import { RichTextField } from "@/components/puck-fields/RichTextField";

type Props = {
  Heading: React.ComponentProps<typeof Heading>;
  Text: React.ComponentProps<typeof Text>;
  Button: React.ComponentProps<typeof Button>;
  Card: React.ComponentProps<typeof Card>;
  Hero: React.ComponentProps<typeof Hero>;
  Features: React.ComponentProps<typeof Features>;
  Testimonials: React.ComponentProps<typeof Testimonials>;
  Stats: React.ComponentProps<typeof Stats>;
  Pricing: React.ComponentProps<typeof Pricing>;
  Team: React.ComponentProps<typeof Team>;
  FAQ: React.ComponentProps<typeof FAQ>;
  CTA: React.ComponentProps<typeof CTA>;
  Footer: React.ComponentProps<typeof Footer>;
  ImageBlock: React.ComponentProps<typeof ImageBlock>;
  Columns: React.ComponentProps<typeof Columns>;
  Spacer: React.ComponentProps<typeof Spacer>;
  Divider: React.ComponentProps<typeof Divider>;
  VideoEmbed: React.ComponentProps<typeof VideoEmbed>;
  CodeBlock: React.ComponentProps<typeof CodeBlock>;
  Alert: React.ComponentProps<typeof Alert>;
  Badge: React.ComponentProps<typeof Badge>;
  Avatar: React.ComponentProps<typeof Avatar>;
  ProgressBar: React.ComponentProps<typeof ProgressBar>;
  Accordion: React.ComponentProps<typeof Accordion>;
  Tabs: React.ComponentProps<typeof Tabs>;
  Timeline: React.ComponentProps<typeof Timeline>;
  Gallery: React.ComponentProps<typeof Gallery>;
  Newsletter: React.ComponentProps<typeof Newsletter>;
  ContactForm: React.ComponentProps<typeof ContactForm>;
  SocialLinks: React.ComponentProps<typeof SocialLinks>;
  LogoCloud: React.ComponentProps<typeof LogoCloud>;
  Breadcrumbs: React.ComponentProps<typeof Breadcrumbs>;
  BlogList: BlogListProps;
  RichTextBlock: RichTextBlockProps;
};

export const config: Config<Props> = {
  root: {
    fields: {
      siteName: {
        type: "text",
        label: "Site Name",
      },
      logoUrl: {
        type: "text",
        label: "Logo URL (optional)",
      },
      navLinks: {
        type: "array",
        label: "Navigation Links",
        arrayFields: {
          label: { type: "text" },
          href: { type: "text" },
        },
      },
      ctaText: {
        type: "text",
        label: "CTA Button Text",
      },
      ctaHref: {
        type: "text",
        label: "CTA Button Link",
      },
      footerDescription: {
        type: "textarea",
        label: "Footer Description",
      },
      footerLinks: {
        type: "array",
        label: "Footer Link Columns",
        arrayFields: {
          title: { type: "text" },
          items: { type: "textarea" },
        },
      },
      socialLinks: {
        type: "object",
        label: "Social Links",
        objectFields: {
          facebook: { type: "text", label: "Facebook URL" },
          twitter: { type: "text", label: "Twitter URL" },
          linkedin: { type: "text", label: "LinkedIn URL" },
          github: { type: "text", label: "GitHub URL" },
        },
      },
      copyright: {
        type: "text",
        label: "Copyright Text",
      },
    },
    defaultProps: {
      siteName: "Puck Demo",
      logoUrl: "",
      navLinks: [
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
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
    },
    render: PuckRoot,
  },
  categories: {
    typography: {
      title: "Typography",
      components: ["Heading", "Text", "Badge", "RichTextBlock"],
    },
    layout: {
      title: "Layout",
      components: ["Columns", "Spacer", "Divider"],
    },
    media: {
      title: "Media",
      components: ["ImageBlock", "VideoEmbed", "Gallery"],
    },
    interactive: {
      title: "Interactive",
      components: ["Button", "Accordion", "Tabs"],
    },
    cards: {
      title: "Cards & Blocks",
      components: ["Card", "Alert", "CodeBlock"],
    },
    sections: {
      title: "Sections",
      components: ["Hero", "Features", "Testimonials", "Stats", "Pricing", "Team", "FAQ", "CTA", "Timeline"],
    },
    forms: {
      title: "Forms",
      components: ["Newsletter", "ContactForm"],
    },
    navigation: {
      title: "Navigation & Social",
      components: ["Footer", "SocialLinks", "LogoCloud", "Breadcrumbs"],
    },
    misc: {
      title: "Misc",
      components: ["Avatar", "ProgressBar"],
    },
    blog: {
      title: "Blog",
      components: ["BlogList"],
    },
  },
  components: {
    Heading: {
      label: "Heading",
      fields: {
        text: { type: "text" },
        level: {
          type: "select",
          options: [
            { label: "H1", value: "h1" },
            { label: "H2", value: "h2" },
            { label: "H3", value: "h3" },
            { label: "H4", value: "h4" },
          ],
        },
        align: {
          type: "radio",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },
      },
      defaultProps: {
        text: "Heading",
        level: "h2",
        align: "left",
      },
      render: Heading,
    },
    Text: {
      label: "Text",
      fields: {
        text: { type: "textarea" },
        size: {
          type: "select",
          options: [
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
            { label: "Large", value: "large" },
          ],
        },
        align: {
          type: "radio",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },
      },
      defaultProps: {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        size: "medium",
        align: "left",
      },
      render: Text,
    },
    Button: {
      label: "Button",
      fields: {
        text: { type: "text" },
        href: { type: "text" },
        variant: {
          type: "select",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Outline", value: "outline" },
            { label: "Ghost", value: "ghost" },
          ],
        },
        size: {
          type: "select",
          options: [
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
            { label: "Large", value: "large" },
          ],
        },
      },
      defaultProps: {
        text: "Click me",
        href: "#",
        variant: "primary",
        size: "medium",
      },
      render: Button,
    },
    Card: {
      label: "Card",
      fields: {
        title: { type: "text" },
        description: { type: "textarea" },
        imageUrl: { type: "text" },
        linkText: { type: "text" },
        linkHref: { type: "text" },
      },
      defaultProps: {
        title: "Card Title",
        description: "This is a card description with some example text.",
        imageUrl: "https://picsum.photos/400/200",
        linkText: "Learn more",
        linkHref: "#",
      },
      render: Card,
    },
    Hero: {
      label: "Hero Section",
      fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        primaryButtonText: { type: "text" },
        primaryButtonHref: { type: "text" },
        secondaryButtonText: { type: "text" },
        secondaryButtonHref: { type: "text" },
        backgroundImage: { type: "text" },
        alignment: {
          type: "radio",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
          ],
        },
      },
      defaultProps: {
        title: "Build Amazing Websites",
        subtitle: "Create stunning pages with our visual editor. No coding required.",
        primaryButtonText: "Get Started",
        primaryButtonHref: "#",
        secondaryButtonText: "Learn More",
        secondaryButtonHref: "#",
        backgroundImage: "",
        alignment: "center",
      },
      render: Hero,
    },
    Features: {
      label: "Features",
      fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        columns: {
          type: "select",
          options: [
            { label: "2 Columns", value: "2" },
            { label: "3 Columns", value: "3" },
            { label: "4 Columns", value: "4" },
          ],
        },
        features: {
          type: "array",
          arrayFields: {
            icon: { type: "text" },
            title: { type: "text" },
            description: { type: "textarea" },
          },
        },
      },
      defaultProps: {
        title: "Our Features",
        subtitle: "Everything you need to build amazing products",
        columns: "3",
        features: [
          { icon: "⚡", title: "Lightning Fast", description: "Optimized for speed and performance" },
          { icon: "🔒", title: "Secure", description: "Enterprise-grade security built-in" },
          { icon: "🎨", title: "Beautiful Design", description: "Stunning UI components out of the box" },
          { icon: "📱", title: "Responsive", description: "Works perfectly on all devices" },
          { icon: "🔧", title: "Customizable", description: "Fully customizable to your needs" },
          { icon: "💬", title: "24/7 Support", description: "Round-the-clock customer support" },
        ],
      },
      render: Features,
    },
    Testimonials: {
      label: "Testimonials",
      fields: {
        title: { type: "text" },
        testimonials: {
          type: "array",
          arrayFields: {
            quote: { type: "textarea" },
            author: { type: "text" },
            role: { type: "text" },
            company: { type: "text" },
            avatar: { type: "text" },
          },
        },
      },
      defaultProps: {
        title: "What Our Customers Say",
        testimonials: [
          {
            quote: "This product has completely transformed our workflow. Highly recommended!",
            author: "Sarah Johnson",
            role: "CEO",
            company: "TechCorp",
            avatar: "https://i.pravatar.cc/100?img=1",
          },
          {
            quote: "The best investment we've made this year. Our team productivity has doubled.",
            author: "Michael Chen",
            role: "CTO",
            company: "StartupXYZ",
            avatar: "https://i.pravatar.cc/100?img=2",
          },
          {
            quote: "Incredible support team and amazing product. Five stars!",
            author: "Emily Davis",
            role: "Product Manager",
            company: "InnovateCo",
            avatar: "https://i.pravatar.cc/100?img=3",
          },
        ],
      },
      render: Testimonials,
    },
    Stats: {
      label: "Statistics",
      fields: {
        title: { type: "text" },
        stats: {
          type: "array",
          arrayFields: {
            value: { type: "text" },
            label: { type: "text" },
            suffix: { type: "text" },
          },
        },
      },
      defaultProps: {
        title: "Our Impact",
        stats: [
          { value: "10", label: "Years Experience", suffix: "+" },
          { value: "500", label: "Happy Clients", suffix: "+" },
          { value: "1000", label: "Projects Completed", suffix: "+" },
          { value: "99", label: "Satisfaction Rate", suffix: "%" },
        ],
      },
      render: Stats,
    },
    Pricing: {
      label: "Pricing",
      fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        plans: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            price: { type: "text" },
            period: { type: "text" },
            description: { type: "text" },
            features: { type: "textarea" },
            highlighted: {
              type: "radio",
              options: [
                { label: "Yes", value: "true" },
                { label: "No", value: "false" },
              ],
            },
            buttonText: { type: "text" },
          },
        },
      },
      defaultProps: {
        title: "Simple Pricing",
        subtitle: "Choose the plan that fits your needs",
        plans: [
          {
            name: "Starter",
            price: "$9",
            period: "/month",
            description: "Perfect for individuals",
            features: "5 projects\n10GB storage\nEmail support\nBasic analytics",
            highlighted: "false",
            buttonText: "Get Started",
          },
          {
            name: "Professional",
            price: "$29",
            period: "/month",
            description: "Best for growing teams",
            features: "Unlimited projects\n100GB storage\nPriority support\nAdvanced analytics\nCustom domain",
            highlighted: "true",
            buttonText: "Get Started",
          },
          {
            name: "Enterprise",
            price: "$99",
            period: "/month",
            description: "For large organizations",
            features: "Everything in Pro\nUnlimited storage\nDedicated support\nSLA guarantee\nCustom integrations",
            highlighted: "false",
            buttonText: "Contact Sales",
          },
        ],
      },
      render: Pricing,
    },
    Team: {
      label: "Team",
      fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        members: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            role: { type: "text" },
            bio: { type: "textarea" },
            avatar: { type: "text" },
          },
        },
      },
      defaultProps: {
        title: "Meet Our Team",
        subtitle: "The people behind our success",
        members: [
          {
            name: "John Smith",
            role: "Founder & CEO",
            bio: "10+ years of experience in tech leadership",
            avatar: "https://i.pravatar.cc/200?img=11",
          },
          {
            name: "Jane Doe",
            role: "CTO",
            bio: "Expert in scalable architecture",
            avatar: "https://i.pravatar.cc/200?img=5",
          },
          {
            name: "Bob Wilson",
            role: "Lead Designer",
            bio: "Award-winning UX designer",
            avatar: "https://i.pravatar.cc/200?img=12",
          },
          {
            name: "Alice Brown",
            role: "Head of Marketing",
            bio: "Growth specialist with global experience",
            avatar: "https://i.pravatar.cc/200?img=9",
          },
        ],
      },
      render: Team,
    },
    FAQ: {
      label: "FAQ",
      fields: {
        title: { type: "text" },
        questions: {
          type: "array",
          arrayFields: {
            question: { type: "text" },
            answer: { type: "textarea" },
          },
        },
      },
      defaultProps: {
        title: "Frequently Asked Questions",
        questions: [
          {
            question: "How do I get started?",
            answer: "Simply sign up for an account and follow our quick start guide. You'll be up and running in minutes.",
          },
          {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, PayPal, and bank transfers for enterprise accounts.",
          },
          {
            question: "Can I cancel my subscription?",
            answer: "Yes, you can cancel anytime. No questions asked, no hidden fees.",
          },
          {
            question: "Do you offer a free trial?",
            answer: "Yes! We offer a 14-day free trial with full access to all features.",
          },
          {
            question: "Is my data secure?",
            answer: "Absolutely. We use industry-standard encryption and comply with GDPR and SOC 2 requirements.",
          },
        ],
      },
      render: FAQ,
    },
    CTA: {
      label: "Call to Action",
      fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        buttonText: { type: "text" },
        buttonHref: { type: "text" },
        variant: {
          type: "select",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Gradient", value: "gradient" },
          ],
        },
      },
      defaultProps: {
        title: "Ready to Get Started?",
        subtitle: "Join thousands of satisfied customers today",
        buttonText: "Start Free Trial",
        buttonHref: "#",
        variant: "primary",
      },
      render: CTA,
    },
    Footer: {
      label: "Footer",
      fields: {
        companyName: { type: "text" },
        description: { type: "textarea" },
        links: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            items: { type: "textarea" },
          },
        },
        copyright: { type: "text" },
      },
      defaultProps: {
        companyName: "Acme Inc",
        description: "Building amazing products for the modern web.",
        links: [
          { title: "Product", items: "Features\nPricing\nDocumentation\nChangelog" },
          { title: "Company", items: "About\nBlog\nCareers\nPress" },
          { title: "Legal", items: "Privacy\nTerms\nCookies\nLicenses" },
        ],
        copyright: "© 2024 Acme Inc. All rights reserved.",
      },
      render: Footer,
    },
    ImageBlock: {
      label: "Image",
      fields: {
        src: { type: "text" },
        alt: { type: "text" },
        caption: { type: "text" },
        rounded: {
          type: "radio",
          options: [
            { label: "None", value: "none" },
            { label: "Small", value: "small" },
            { label: "Large", value: "large" },
            { label: "Full", value: "full" },
          ],
        },
      },
      defaultProps: {
        src: "https://picsum.photos/800/400",
        alt: "Image description",
        caption: "",
        rounded: "small",
      },
      render: ImageBlock,
    },
    Columns: {
      label: "Columns",
      fields: {
        columns: {
          type: "select",
          options: [
            { label: "2 Columns", value: "2" },
            { label: "3 Columns", value: "3" },
            { label: "4 Columns", value: "4" },
          ],
        },
        gap: {
          type: "select",
          options: [
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
            { label: "Large", value: "large" },
          ],
        },
      },
      defaultProps: {
        columns: "2",
        gap: "medium",
      },
      render: Columns,
    },
    Spacer: {
      label: "Spacer",
      fields: {
        size: {
          type: "select",
          options: [
            { label: "Extra Small", value: "xs" },
            { label: "Small", value: "sm" },
            { label: "Medium", value: "md" },
            { label: "Large", value: "lg" },
            { label: "Extra Large", value: "xl" },
          ],
        },
      },
      defaultProps: {
        size: "md",
      },
      render: Spacer,
    },
    Divider: {
      label: "Divider",
      fields: {
        style: {
          type: "select",
          options: [
            { label: "Solid", value: "solid" },
            { label: "Dashed", value: "dashed" },
            { label: "Dotted", value: "dotted" },
          ],
        },
        color: {
          type: "select",
          options: [
            { label: "Light", value: "light" },
            { label: "Medium", value: "medium" },
            { label: "Dark", value: "dark" },
          ],
        },
      },
      defaultProps: {
        style: "solid",
        color: "light",
      },
      render: Divider,
    },
    VideoEmbed: {
      label: "Video Embed",
      fields: {
        url: { type: "text" },
        title: { type: "text" },
        aspectRatio: {
          type: "select",
          options: [
            { label: "16:9", value: "16/9" },
            { label: "4:3", value: "4/3" },
            { label: "1:1", value: "1/1" },
          ],
        },
      },
      defaultProps: {
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Video",
        aspectRatio: "16/9",
      },
      render: VideoEmbed,
    },
    CodeBlock: {
      label: "Code Block",
      fields: {
        code: { type: "textarea" },
        language: {
          type: "select",
          options: [
            { label: "JavaScript", value: "javascript" },
            { label: "TypeScript", value: "typescript" },
            { label: "Python", value: "python" },
            { label: "HTML", value: "html" },
            { label: "CSS", value: "css" },
            { label: "Bash", value: "bash" },
          ],
        },
        showLineNumbers: {
          type: "radio",
          options: [
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ],
        },
      },
      defaultProps: {
        code: 'const greeting = "Hello, World!";\nconsole.log(greeting);',
        language: "javascript",
        showLineNumbers: "true",
      },
      render: CodeBlock,
    },
    Alert: {
      label: "Alert",
      fields: {
        title: { type: "text" },
        message: { type: "textarea" },
        type: {
          type: "select",
          options: [
            { label: "Info", value: "info" },
            { label: "Success", value: "success" },
            { label: "Warning", value: "warning" },
            { label: "Error", value: "error" },
          ],
        },
      },
      defaultProps: {
        title: "Information",
        message: "This is an informational message.",
        type: "info",
      },
      render: Alert,
    },
    Badge: {
      label: "Badge",
      fields: {
        text: { type: "text" },
        variant: {
          type: "select",
          options: [
            { label: "Default", value: "default" },
            { label: "Primary", value: "primary" },
            { label: "Success", value: "success" },
            { label: "Warning", value: "warning" },
            { label: "Error", value: "error" },
          ],
        },
      },
      defaultProps: {
        text: "New",
        variant: "primary",
      },
      render: Badge,
    },
    Avatar: {
      label: "Avatar",
      fields: {
        src: { type: "text" },
        name: { type: "text" },
        size: {
          type: "select",
          options: [
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
            { label: "Large", value: "large" },
          ],
        },
      },
      defaultProps: {
        src: "https://i.pravatar.cc/100",
        name: "John Doe",
        size: "medium",
      },
      render: Avatar,
    },
    ProgressBar: {
      label: "Progress Bar",
      fields: {
        value: { type: "number" },
        label: { type: "text" },
        showValue: {
          type: "radio",
          options: [
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ],
        },
        color: {
          type: "select",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Success", value: "success" },
            { label: "Warning", value: "warning" },
            { label: "Error", value: "error" },
          ],
        },
      },
      defaultProps: {
        value: 65,
        label: "Progress",
        showValue: "true",
        color: "primary",
      },
      render: ProgressBar,
    },
    Accordion: {
      label: "Accordion",
      fields: {
        items: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            content: { type: "textarea" },
          },
        },
      },
      defaultProps: {
        items: [
          { title: "Section 1", content: "Content for section 1 goes here." },
          { title: "Section 2", content: "Content for section 2 goes here." },
          { title: "Section 3", content: "Content for section 3 goes here." },
        ],
      },
      render: Accordion,
    },
    Tabs: {
      label: "Tabs",
      fields: {
        tabs: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            content: { type: "textarea" },
          },
        },
      },
      defaultProps: {
        tabs: [
          { title: "Tab 1", content: "Content for tab 1" },
          { title: "Tab 2", content: "Content for tab 2" },
          { title: "Tab 3", content: "Content for tab 3" },
        ],
      },
      render: Tabs,
    },
    Timeline: {
      label: "Timeline",
      fields: {
        title: { type: "text" },
        events: {
          type: "array",
          arrayFields: {
            date: { type: "text" },
            title: { type: "text" },
            description: { type: "textarea" },
          },
        },
      },
      defaultProps: {
        title: "Our Journey",
        events: [
          { date: "2020", title: "Company Founded", description: "Started with a vision to change the world" },
          { date: "2021", title: "First Product Launch", description: "Released our flagship product" },
          { date: "2022", title: "Series A Funding", description: "Raised $10M to accelerate growth" },
          { date: "2023", title: "Global Expansion", description: "Expanded to 50+ countries" },
          { date: "2024", title: "1M Users", description: "Reached one million active users" },
        ],
      },
      render: Timeline,
    },
    Gallery: {
      label: "Gallery",
      fields: {
        images: {
          type: "array",
          arrayFields: {
            src: { type: "text" },
            alt: { type: "text" },
          },
        },
        columns: {
          type: "select",
          options: [
            { label: "2 Columns", value: "2" },
            { label: "3 Columns", value: "3" },
            { label: "4 Columns", value: "4" },
          ],
        },
      },
      defaultProps: {
        images: [
          { src: "https://picsum.photos/400/300?random=1", alt: "Gallery image 1" },
          { src: "https://picsum.photos/400/300?random=2", alt: "Gallery image 2" },
          { src: "https://picsum.photos/400/300?random=3", alt: "Gallery image 3" },
          { src: "https://picsum.photos/400/300?random=4", alt: "Gallery image 4" },
          { src: "https://picsum.photos/400/300?random=5", alt: "Gallery image 5" },
          { src: "https://picsum.photos/400/300?random=6", alt: "Gallery image 6" },
        ],
        columns: "3",
      },
      render: Gallery,
    },
    Newsletter: {
      label: "Newsletter",
      fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        buttonText: { type: "text" },
        placeholder: { type: "text" },
      },
      defaultProps: {
        title: "Subscribe to Our Newsletter",
        subtitle: "Get the latest news and updates delivered to your inbox.",
        buttonText: "Subscribe",
        placeholder: "Enter your email",
      },
      render: Newsletter,
    },
    ContactForm: {
      label: "Contact Form",
      fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        buttonText: { type: "text" },
      },
      defaultProps: {
        title: "Get in Touch",
        subtitle: "We'd love to hear from you. Send us a message!",
        buttonText: "Send Message",
      },
      render: ContactForm,
    },
    SocialLinks: {
      label: "Social Links",
      fields: {
        facebook: { type: "text" },
        twitter: { type: "text" },
        instagram: { type: "text" },
        linkedin: { type: "text" },
        youtube: { type: "text" },
        github: { type: "text" },
      },
      defaultProps: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        instagram: "https://instagram.com",
        linkedin: "https://linkedin.com",
        youtube: "",
        github: "https://github.com",
      },
      render: SocialLinks,
    },
    LogoCloud: {
      label: "Logo Cloud",
      fields: {
        title: { type: "text" },
        logos: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            url: { type: "text" },
          },
        },
      },
      defaultProps: {
        title: "Trusted by Leading Companies",
        logos: [
          { name: "Google", url: "" },
          { name: "Microsoft", url: "" },
          { name: "Amazon", url: "" },
          { name: "Meta", url: "" },
          { name: "Apple", url: "" },
        ],
      },
      render: LogoCloud,
    },
    Breadcrumbs: {
      label: "Breadcrumbs",
      fields: {
        items: {
          type: "array",
          arrayFields: {
            label: { type: "text" },
            href: { type: "text" },
          },
        },
      },
      defaultProps: {
        items: [
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Current Page", href: "" },
        ],
      },
      render: Breadcrumbs,
    },
    BlogList: {
      label: "Blog List",
      fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        showCategories: {
          type: "radio",
          options: [
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ],
        },
        showFeatured: {
          type: "radio",
          options: [
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ],
        },
        postsPerPage: { type: "number" },
        layout: {
          type: "radio",
          options: [
            { label: "Grid", value: "grid" },
            { label: "List", value: "list" },
          ],
        },
      },
      defaultProps: {
        title: "Latest Articles",
        subtitle: "Insights and tutorials from our team",
        showCategories: "true",
        showFeatured: "true",
        postsPerPage: 6,
        layout: "grid",
      },
      render: BlogList,
    },
    RichTextBlock: {
      label: "Rich Text",
      fields: {
        content: {
          type: "custom",
          label: "Content",
          render: RichTextField,
        },
        maxWidth: {
          type: "select",
          label: "Max Width",
          options: [
            { label: "Small (36rem)", value: "small" },
            { label: "Medium (48rem)", value: "medium" },
            { label: "Large (64rem)", value: "large" },
            { label: "Full Width", value: "full" },
          ],
        },
        padding: {
          type: "select",
          label: "Padding",
          options: [
            { label: "None", value: "none" },
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
            { label: "Large", value: "large" },
          ],
        },
      },
      defaultProps: {
        content: "<p>Start writing your content here...</p>",
        maxWidth: "medium",
        padding: "medium",
      },
      render: RichTextBlock,
    },
  },
};

export type UserConfig = typeof config;
export type PuckData = Data<Props>;

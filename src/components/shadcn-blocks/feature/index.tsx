"use client";

import { ComponentConfig } from "@measured/puck";
import { Feature1 } from "@/components/feature1";
import { Feature2 } from "@/components/feature2";
import { Feature13 } from "@/components/feature13";
import { Feature17 } from "@/components/feature17";
import { Feature43 } from "@/components/feature43";

// ---------------------------------------------------------------------------
// Feature1 — Image Right with Two Buttons
// Well-parameterized: flatten nested buttonPrimary / buttonSecondary
// ---------------------------------------------------------------------------

interface ShadcnFeature1Props {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  primaryBtnText: string;
  primaryBtnUrl: string;
  secondaryBtnText: string;
  secondaryBtnUrl: string;
}

export const ShadcnFeature1Config: ComponentConfig<ShadcnFeature1Props> = {
  label: "SB: Feature — Image Right",
  fields: {
    title: { type: "text", label: "Title" },
    description: { type: "textarea", label: "Description" },
    imageSrc: { type: "text", label: "Image URL" },
    imageAlt: { type: "text", label: "Image Alt" },
    primaryBtnText: { type: "text", label: "Primary Button Text" },
    primaryBtnUrl: { type: "text", label: "Primary Button URL" },
    secondaryBtnText: { type: "text", label: "Secondary Button Text" },
    secondaryBtnUrl: { type: "text", label: "Secondary Button URL" },
  },
  defaultProps: {
    title: "Blocks built with Shadcn & Tailwind",
    description:
      "Hundreds of finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
    imageSrc: "https://placehold.co/600x400",
    imageAlt: "Feature image",
    primaryBtnText: "Get Started",
    primaryBtnUrl: "#",
    secondaryBtnText: "Learn More",
    secondaryBtnUrl: "#",
  },
  render: (props) => (
    <Feature1
      title={props.title}
      description={props.description}
      imageSrc={props.imageSrc}
      imageAlt={props.imageAlt}
      buttonPrimary={{ text: props.primaryBtnText, href: props.primaryBtnUrl }}
      buttonSecondary={{
        text: props.secondaryBtnText,
        href: props.secondaryBtnUrl,
      }}
    />
  ),
};

// ---------------------------------------------------------------------------
// Feature2 — Image Left with Two Buttons
// Well-parameterized: same shape as Feature1, image on the left
// ---------------------------------------------------------------------------

interface ShadcnFeature2Props {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  primaryBtnText: string;
  primaryBtnUrl: string;
  secondaryBtnText: string;
  secondaryBtnUrl: string;
}

export const ShadcnFeature2Config: ComponentConfig<ShadcnFeature2Props> = {
  label: "SB: Feature — Image Left",
  fields: {
    title: { type: "text", label: "Title" },
    description: { type: "textarea", label: "Description" },
    imageSrc: { type: "text", label: "Image URL" },
    imageAlt: { type: "text", label: "Image Alt" },
    primaryBtnText: { type: "text", label: "Primary Button Text" },
    primaryBtnUrl: { type: "text", label: "Primary Button URL" },
    secondaryBtnText: { type: "text", label: "Secondary Button Text" },
    secondaryBtnUrl: { type: "text", label: "Secondary Button URL" },
  },
  defaultProps: {
    title: "Blocks built with Shadcn & Tailwind",
    description:
      "Hundreds of finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
    imageSrc: "https://placehold.co/600x400",
    imageAlt: "Feature image",
    primaryBtnText: "Get Started",
    primaryBtnUrl: "#",
    secondaryBtnText: "Learn More",
    secondaryBtnUrl: "#",
  },
  render: (props) => (
    <Feature2
      title={props.title}
      description={props.description}
      imageSrc={props.imageSrc}
      imageAlt={props.imageAlt}
      buttonPrimary={{ text: props.primaryBtnText, href: props.primaryBtnUrl }}
      buttonSecondary={{
        text: props.secondaryBtnText,
        href: props.secondaryBtnUrl,
      }}
    />
  ),
};

// ---------------------------------------------------------------------------
// Feature3 — Six Icon Cards with Images (className-only)
// Inline JSX with parameterized content per card
// ---------------------------------------------------------------------------

import {
  Code,
  GitBranch,
  List,
  Play,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface ShadcnFeature3Card {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

interface ShadcnFeature3Props {
  heading: string;
  cards: ShadcnFeature3Card[];
}

const feature3Icons = [Code, Play, GitBranch, List, WandSparkles, Sparkles];

export const ShadcnFeature3Config: ComponentConfig<ShadcnFeature3Props> = {
  label: "SB: Feature — Six Icon Cards Grid",
  fields: {
    heading: { type: "text", label: "Heading" },
    cards: {
      type: "array",
      label: "Cards",
      arrayFields: {
        title: { type: "text", label: "Card Title" },
        description: { type: "textarea", label: "Card Description" },
        imageSrc: { type: "text", label: "Card Image URL" },
        imageAlt: { type: "text", label: "Card Image Alt" },
      },
    },
  },
  defaultProps: {
    heading: "This is where your feature goes",
    cards: [
      {
        title: "Code Components",
        description: "Build reusable components with clean, maintainable code.",
        imageSrc: "https://placehold.co/400x200",
        imageAlt: "Code components",
      },
      {
        title: "Live Preview",
        description: "See your changes instantly with real-time preview.",
        imageSrc: "https://placehold.co/400x200",
        imageAlt: "Live preview",
      },
      {
        title: "Version Control",
        description: "Track changes and collaborate with your team.",
        imageSrc: "https://placehold.co/400x200",
        imageAlt: "Version control",
      },
      {
        title: "Organized Structure",
        description: "Keep your project well-organized and easy to navigate.",
        imageSrc: "https://placehold.co/400x200",
        imageAlt: "Organized structure",
      },
      {
        title: "Magic Editing",
        description: "Edit your content with powerful visual tools.",
        imageSrc: "https://placehold.co/400x200",
        imageAlt: "Magic editing",
      },
      {
        title: "AI-Powered",
        description: "Leverage AI to enhance your workflow and productivity.",
        imageSrc: "https://placehold.co/400x200",
        imageAlt: "AI powered",
      },
    ],
  },
  render: (props) => (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <h1 className="mb-6 text-4xl font-semibold text-pretty lg:text-5xl">
            {props.heading}
          </h1>
          <div className="mt-10 grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {props.cards.map((card, idx) => {
              const IconComponent = feature3Icons[idx % feature3Icons.length];
              return (
                <Card key={idx}>
                  <CardHeader className="pb-1">
                    <IconComponent className="size-4" strokeWidth={1} />
                  </CardHeader>
                  <CardContent className="text-left">
                    <h2 className="mb-1 text-lg font-semibold">
                      {card.title}
                    </h2>
                    <p className="leading-snug text-muted-foreground">
                      {card.description}
                    </p>
                  </CardContent>
                  <CardFooter className="justify-end pr-0 pb-0">
                    <img
                      className="h-40 w-full rounded-tl-md object-cover object-center"
                      src={card.imageSrc}
                      alt={card.imageAlt}
                    />
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  ),
};

// ---------------------------------------------------------------------------
// Feature13 — Grid with Image Cards and Labels (array field)
// Well-parameterized: uses Puck array field
// ---------------------------------------------------------------------------

interface ShadcnFeature13Item {
  heading: string;
  label: string;
  description: string;
  image: string;
  url: string;
}

interface ShadcnFeature13Props {
  title: string;
  features: ShadcnFeature13Item[];
}

export const ShadcnFeature13Config: ComponentConfig<ShadcnFeature13Props> = {
  label: "SB: Feature — Image Grid with Labels",
  fields: {
    title: { type: "text", label: "Title" },
    features: {
      type: "array",
      label: "Features",
      arrayFields: {
        heading: { type: "text", label: "Heading" },
        label: { type: "text", label: "Label" },
        description: { type: "textarea", label: "Description" },
        image: { type: "text", label: "Image URL" },
        url: { type: "text", label: "Link URL" },
      },
    },
  },
  defaultProps: {
    title: "A collection of extra blocks for Shadcn UI & Tailwind",
    features: [
      {
        heading: "Design System Approved",
        label: "FOR DESIGNERS",
        description:
          "Hundreds of finely crafted components available in Figma. Easily modify the design system to your brand.",
        image: "https://placehold.co/400x300/1a1a2e/eaeaea",
        url: "#",
      },
      {
        heading: "Copy-Paste Code Blocks",
        label: "FOR DEVELOPERS",
        description:
          "Finely crafted components built with React, Tailwind and Shadcn UI. Copy and paste directly into your project.",
        image: "https://placehold.co/400x300/16213e/eaeaea",
        url: "#",
      },
      {
        heading: "Product-First Approach",
        label: "FOR PRODUCT TEAMS",
        description:
          "Components designed with user experience in mind. Every block is tested for usability and optimized for conversion.",
        image: "https://placehold.co/400x300/0f3460/eaeaea",
        url: "#",
      },
      {
        heading: "Marketing-Ready Templates",
        label: "FOR MARKETING",
        description:
          "High-converting landing pages and marketing components that drive engagement and boost your campaigns.",
        image: "https://placehold.co/400x300/533483/eaeaea",
        url: "#",
      },
    ],
  },
  render: (props) => (
    <Feature13
      title={props.title}
      features={props.features.map((f, idx) => ({
        id: `feature-${idx + 1}`,
        heading: f.heading,
        label: f.label,
        description: f.description,
        image: f.image,
        url: f.url,
      }))}
    />
  ),
};

// ---------------------------------------------------------------------------
// Feature15 — Four Accent Cards with Icons (className-only)
// Inline JSX with parameterized heading, subtitle, description, and cards
// ---------------------------------------------------------------------------

import {
  Infinity as InfinityIcon,
  MessagesSquare,
  Zap,
  ZoomIn,
} from "lucide-react";

interface ShadcnFeature15Card {
  title: string;
  description: string;
}

interface ShadcnFeature15Props {
  tagline: string;
  heading: string;
  description: string;
  cards: ShadcnFeature15Card[];
}

const feature15Icons = [ZoomIn, Zap, MessagesSquare, InfinityIcon];

export const ShadcnFeature15Config: ComponentConfig<ShadcnFeature15Props> = {
  label: "SB: Feature — Accent Cards with Icons",
  fields: {
    tagline: { type: "text", label: "Tagline" },
    heading: { type: "text", label: "Heading" },
    description: { type: "textarea", label: "Description" },
    cards: {
      type: "array",
      label: "Feature Cards",
      arrayFields: {
        title: { type: "text", label: "Card Title" },
        description: { type: "textarea", label: "Card Description" },
      },
    },
  },
  defaultProps: {
    tagline: "WHY WE ARE UNIQUE",
    heading: "Bringing the best to you by the best in the industry",
    description:
      "We combine cutting-edge technology with years of experience to deliver solutions that exceed expectations. Our team is dedicated to quality and innovation.",
    cards: [
      {
        title: "Quality",
        description:
          "We maintain the highest standards in everything we build, ensuring reliable and performant solutions.",
      },
      {
        title: "Innovation",
        description:
          "Staying ahead of the curve with modern technologies and creative approaches to problem-solving.",
      },
      {
        title: "Customer Support",
        description:
          "Dedicated support team available to help you every step of the way, from onboarding to scaling.",
      },
      {
        title: "Reliability",
        description:
          "Battle-tested infrastructure and processes that you can depend on for your critical applications.",
      },
    ],
  },
  render: (props) => (
    <section className="py-32">
      <div className="container">
        <div className="flex w-full flex-col items-center">
          <div className="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:max-w-3xl md:text-center">
            <p className="text-sm text-muted-foreground">{props.tagline}</p>
            <h2 className="text-3xl font-medium md:text-5xl">
              {props.heading}
            </h2>
            <p className="text-muted-foreground md:max-w-2xl">
              {props.description}
            </p>
          </div>
        </div>
        <div className="mx-auto mt-20 grid max-w-5xl gap-6 md:grid-cols-2">
          {props.cards.map((card, idx) => {
            const IconComponent =
              feature15Icons[idx % feature15Icons.length];
            return (
              <div
                className="flex flex-col justify-between rounded-lg bg-accent p-6 md:min-h-[300px] md:p-8"
                key={idx}
              >
                <span className="mb-6 flex size-11 items-center justify-center rounded-full bg-background">
                  <IconComponent className="size-6" />
                </span>
                <div>
                  <h3 className="text-lg font-medium md:text-2xl">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  ),
};

// ---------------------------------------------------------------------------
// Feature16 — Three Column Values (className-only)
// Inline JSX with parameterized tagline, heading, and cards
// ---------------------------------------------------------------------------

import { Timer } from "lucide-react";

interface ShadcnFeature16Card {
  title: string;
  description: string;
}

interface ShadcnFeature16Props {
  tagline: string;
  heading: string;
  cards: ShadcnFeature16Card[];
}

const feature16Icons = [Timer, ZoomIn, Zap];

export const ShadcnFeature16Config: ComponentConfig<ShadcnFeature16Props> = {
  label: "SB: Feature — Three Column Values",
  fields: {
    tagline: { type: "text", label: "Tagline" },
    heading: { type: "text", label: "Heading" },
    cards: {
      type: "array",
      label: "Value Cards",
      arrayFields: {
        title: { type: "text", label: "Card Title" },
        description: { type: "textarea", label: "Card Description" },
      },
    },
  },
  defaultProps: {
    tagline: "OUR VALUES",
    heading: "Why Choose Us?",
    cards: [
      {
        title: "Performance",
        description:
          "Optimized for speed and efficiency, ensuring your applications run smoothly at any scale.",
      },
      {
        title: "Quality",
        description:
          "Every component is thoroughly tested and built following industry best practices and standards.",
      },
      {
        title: "Innovation",
        description:
          "Cutting-edge solutions that keep you ahead of the competition with modern technologies.",
      },
    ],
  },
  render: (props) => (
    <section className="py-32">
      <div className="container">
        <p className="mb-4 text-sm text-muted-foreground lg:text-base">
          {props.tagline}
        </p>
        <h2 className="text-3xl font-medium lg:text-4xl">{props.heading}</h2>
        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3">
          {props.cards.map((card, idx) => {
            const IconComponent =
              feature16Icons[idx % feature16Icons.length];
            return (
              <div className="rounded-lg bg-accent p-5" key={idx}>
                <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
                  <IconComponent className="size-6" />
                </span>
                <h3 className="mb-2 text-xl font-medium">{card.title}</h3>
                <p className="leading-7 text-muted-foreground">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  ),
};

// ---------------------------------------------------------------------------
// Feature17 — Six Features with Badge and CTA (ReactNode icons)
// Text fields editable, icons fixed as defaults
// ---------------------------------------------------------------------------

import {
  BatteryCharging,
  GitPullRequest,
  Layers,
  RadioTower,
  SquareKanban,
} from "lucide-react";

interface ShadcnFeature17Item {
  heading: string;
  description: string;
}

interface ShadcnFeature17Props {
  label: string;
  title: string;
  features: ShadcnFeature17Item[];
  buttonText: string;
  buttonUrl: string;
}

const feature17Icons = [
  GitPullRequest,
  SquareKanban,
  RadioTower,
  WandSparkles,
  Layers,
  BatteryCharging,
];

export const ShadcnFeature17Config: ComponentConfig<ShadcnFeature17Props> = {
  label: "SB: Feature — Badge with Six Icons & CTA",
  fields: {
    label: { type: "text", label: "Badge Label" },
    title: { type: "text", label: "Title" },
    features: {
      type: "array",
      label: "Features",
      arrayFields: {
        heading: { type: "text", label: "Heading" },
        description: { type: "textarea", label: "Description" },
      },
    },
    buttonText: { type: "text", label: "Button Text" },
    buttonUrl: { type: "text", label: "Button URL" },
  },
  defaultProps: {
    label: "Features",
    title: "Fully featured components for Shadcn UI & Tailwind",
    features: [
      {
        heading: "Quality",
        description:
          "Built with attention to detail and best practices. Every component is thoroughly tested and follows modern React patterns.",
      },
      {
        heading: "Experience",
        description:
          "Crafted with user experience in mind. Designed to be intuitive, accessible, and provide smooth interactions.",
      },
      {
        heading: "Support",
        description:
          "Comprehensive documentation and community support. Get help with detailed guides and examples.",
      },
      {
        heading: "Innovation",
        description:
          "Cutting-edge design patterns and modern web technologies. Stay ahead with the latest trends.",
      },
      {
        heading: "Results",
        description:
          "Proven track record of successful implementations. Battle-tested in real-world applications.",
      },
      {
        heading: "Efficiency",
        description:
          "Optimized for performance and developer productivity. Lightweight, fast-loading components.",
      },
    ],
    buttonText: "More Features",
    buttonUrl: "#",
  },
  render: (props) => (
    <Feature17
      label={props.label}
      title={props.title}
      features={props.features.map((f, idx) => {
        const IconComponent = feature17Icons[idx % feature17Icons.length];
        return {
          heading: f.heading,
          description: f.description,
          icon: <IconComponent className="size-4 md:size-6" />,
        };
      })}
      buttonText={props.buttonText}
      buttonUrl={props.buttonUrl}
    />
  ),
};

// ---------------------------------------------------------------------------
// Feature42 — Values Grid with Title Spanning Rows (className-only)
// Inline JSX with parameterized heading and value cards
// ---------------------------------------------------------------------------

interface ShadcnFeature42Card {
  title: string;
  description: string;
}

interface ShadcnFeature42Props {
  heading: string;
  cards: ShadcnFeature42Card[];
}

export const ShadcnFeature42Config: ComponentConfig<ShadcnFeature42Props> = {
  label: "SB: Feature — Values Grid with Side Title",
  fields: {
    heading: { type: "text", label: "Heading" },
    cards: {
      type: "array",
      label: "Value Cards",
      arrayFields: {
        title: { type: "text", label: "Card Title" },
        description: { type: "textarea", label: "Card Description" },
      },
    },
  },
  defaultProps: {
    heading: "Our Values and Principles",
    cards: [
      {
        title: "Team Spirit",
        description:
          "We believe in collaboration and teamwork. Together we achieve more and build stronger solutions.",
      },
      {
        title: "Innovation",
        description:
          "Constantly pushing boundaries with creative solutions and embracing new technologies.",
      },
      {
        title: "Quality",
        description:
          "Committed to delivering excellence in every line of code and every interaction.",
      },
      {
        title: "Integrity",
        description:
          "Building trust through transparency, honesty, and ethical business practices.",
      },
    ],
  },
  render: (props) => (
    <section className="py-32">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-3">
          <h2 className="row-span-2 text-3xl font-semibold lg:text-5xl">
            {props.heading}
          </h2>
          {props.cards.map((card, idx) => (
            <div key={idx}>
              <h3 className="mb-2 text-xl font-medium">{card.title}</h3>
              <p className="text-muted-foreground">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
};

// ---------------------------------------------------------------------------
// Feature43 — Icon Grid with CTA Button (ReactNode icons)
// Text fields editable, icons fixed as defaults
// ---------------------------------------------------------------------------

interface ShadcnFeature43Item {
  heading: string;
  description: string;
}

interface ShadcnFeature43Props {
  title: string;
  features: ShadcnFeature43Item[];
  buttonText: string;
  buttonUrl: string;
}

const feature43Icons = [
  GitPullRequest,
  SquareKanban,
  RadioTower,
  WandSparkles,
  Layers,
  BatteryCharging,
];

export const ShadcnFeature43Config: ComponentConfig<ShadcnFeature43Props> = {
  label: "SB: Feature — Icon Grid with CTA",
  fields: {
    title: { type: "text", label: "Title" },
    features: {
      type: "array",
      label: "Features",
      arrayFields: {
        heading: { type: "text", label: "Heading" },
        description: { type: "textarea", label: "Description" },
      },
    },
    buttonText: { type: "text", label: "Button Text" },
    buttonUrl: { type: "text", label: "Button URL" },
  },
  defaultProps: {
    title: "Fully featured components for Shadcn UI & Tailwind",
    features: [
      {
        heading: "Quality",
        description:
          "Built with attention to detail and best practices. Every component is thoroughly tested and follows modern React patterns.",
      },
      {
        heading: "Experience",
        description:
          "Crafted with user experience in mind. Designed to be intuitive, accessible, and provide smooth interactions.",
      },
      {
        heading: "Support",
        description:
          "Comprehensive documentation and community support. Get help with detailed guides and examples.",
      },
      {
        heading: "Innovation",
        description:
          "Cutting-edge design patterns and modern web technologies. Stay ahead with the latest trends.",
      },
      {
        heading: "Results",
        description:
          "Proven track record of successful implementations. Battle-tested in real-world applications.",
      },
      {
        heading: "Efficiency",
        description:
          "Optimized for performance and developer productivity. Lightweight, fast-loading components.",
      },
    ],
    buttonText: "More Features",
    buttonUrl: "#",
  },
  render: (props) => (
    <Feature43
      title={props.title}
      features={props.features.map((f, idx) => {
        const IconComponent = feature43Icons[idx % feature43Icons.length];
        return {
          heading: f.heading,
          description: f.description,
          icon: <IconComponent className="size-6" />,
        };
      })}
      buttonText={props.buttonText}
      buttonUrl={props.buttonUrl}
    />
  ),
};

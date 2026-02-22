"use client";

import { ComponentConfig } from "@measured/puck";
import {
  ArrowRight,
  ExternalLink,
  Calendar,
  HandHelping,
  Users,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { Hero1 } from "@/components/hero1";
import { Hero3 } from "@/components/hero3";
import { Hero7 } from "@/components/hero7";
import { Hero45 } from "@/components/hero45";
import { Hero47 } from "@/components/hero47";

// ---------------------------------------------------------------------------
// Hero1 - Split Image
// ---------------------------------------------------------------------------

interface ShadcnHero1Props {
  badge: string;
  heading: string;
  description: string;
  primaryBtnText: string;
  primaryBtnUrl: string;
  secondaryBtnText: string;
  secondaryBtnUrl: string;
  imageSrc: string;
  imageAlt: string;
}

export const ShadcnHero1Config: ComponentConfig<ShadcnHero1Props> = {
  label: "SB: Hero \u2014 Split Image",
  fields: {
    badge: { type: "text", label: "Badge Text" },
    heading: { type: "text", label: "Heading" },
    description: { type: "textarea", label: "Description" },
    primaryBtnText: { type: "text", label: "Primary Button Text" },
    primaryBtnUrl: { type: "text", label: "Primary Button URL" },
    secondaryBtnText: { type: "text", label: "Secondary Button Text" },
    secondaryBtnUrl: { type: "text", label: "Secondary Button URL" },
    imageSrc: { type: "text", label: "Image URL" },
    imageAlt: { type: "text", label: "Image Alt Text" },
  },
  defaultProps: {
    badge: "Your Website Builder",
    heading: "Blocks Built With Shadcn & Tailwind",
    description:
      "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
    primaryBtnText: "Discover all components",
    primaryBtnUrl: "#",
    secondaryBtnText: "View on GitHub",
    secondaryBtnUrl: "#",
    imageSrc: "https://placehold.co/800x600",
    imageAlt: "Hero image",
  },
  render: ({
    badge,
    heading,
    description,
    primaryBtnText,
    primaryBtnUrl,
    secondaryBtnText,
    secondaryBtnUrl,
    imageSrc,
    imageAlt,
  }) => (
    <Hero1
      badge={badge}
      heading={heading}
      description={description}
      buttons={{
        primary: { text: primaryBtnText, url: primaryBtnUrl },
        secondary: { text: secondaryBtnText, url: secondaryBtnUrl },
      }}
      image={{ src: imageSrc, alt: imageAlt }}
    />
  ),
};

// ---------------------------------------------------------------------------
// Hero3 - Avatars & Reviews
// ---------------------------------------------------------------------------

interface ShadcnHero3Props {
  heading: string;
  description: string;
  primaryBtnText: string;
  primaryBtnUrl: string;
  secondaryBtnText: string;
  secondaryBtnUrl: string;
  reviewCount: number;
  reviewRating: number;
  imageSrc: string;
}

export const ShadcnHero3Config: ComponentConfig<ShadcnHero3Props> = {
  label: "SB: Hero \u2014 Avatars & Reviews",
  fields: {
    heading: { type: "text", label: "Heading" },
    description: { type: "textarea", label: "Description" },
    primaryBtnText: { type: "text", label: "Primary Button Text" },
    primaryBtnUrl: { type: "text", label: "Primary Button URL" },
    secondaryBtnText: { type: "text", label: "Secondary Button Text" },
    secondaryBtnUrl: { type: "text", label: "Secondary Button URL" },
    reviewCount: { type: "number", label: "Review Count" },
    reviewRating: { type: "number", label: "Review Rating (1-5)" },
    imageSrc: { type: "text", label: "Image URL" },
  },
  defaultProps: {
    heading: "Blocks built with Shadcn & Tailwind",
    description:
      "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
    primaryBtnText: "Sign Up",
    primaryBtnUrl: "#",
    secondaryBtnText: "Get Started",
    secondaryBtnUrl: "#",
    reviewCount: 200,
    reviewRating: 5.0,
    imageSrc: "https://placehold.co/800x600",
  },
  render: ({
    heading,
    description,
    primaryBtnText,
    primaryBtnUrl,
    secondaryBtnText,
    secondaryBtnUrl,
    reviewCount,
    reviewRating,
    imageSrc,
  }) => (
    <Hero3
      heading={heading}
      description={description}
      buttons={{
        primary: { text: primaryBtnText, url: primaryBtnUrl },
        secondary: { text: secondaryBtnText, url: secondaryBtnUrl },
      }}
      reviews={{
        count: reviewCount,
        rating: reviewRating,
        avatars: [
          { src: "https://placehold.co/48x48", alt: "Avatar 1" },
          { src: "https://placehold.co/48x48", alt: "Avatar 2" },
          { src: "https://placehold.co/48x48", alt: "Avatar 3" },
          { src: "https://placehold.co/48x48", alt: "Avatar 4" },
          { src: "https://placehold.co/48x48", alt: "Avatar 5" },
        ],
      }}
    />
  ),
};

// ---------------------------------------------------------------------------
// Hero7 - Centered with Reviews
// ---------------------------------------------------------------------------

interface ShadcnHero7Props {
  heading: string;
  description: string;
  btnText: string;
  btnUrl: string;
  reviewCount: number;
  reviewRating: number;
}

export const ShadcnHero7Config: ComponentConfig<ShadcnHero7Props> = {
  label: "SB: Hero \u2014 Centered with Reviews",
  fields: {
    heading: { type: "text", label: "Heading" },
    description: { type: "textarea", label: "Description" },
    btnText: { type: "text", label: "Button Text" },
    btnUrl: { type: "text", label: "Button URL" },
    reviewCount: { type: "number", label: "Review Count" },
    reviewRating: { type: "number", label: "Review Rating (1-5)" },
  },
  defaultProps: {
    heading: "A Collection of Components Built With Shadcn & Tailwind",
    description:
      "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
    btnText: "Discover all components",
    btnUrl: "#",
    reviewCount: 200,
    reviewRating: 5.0,
  },
  render: ({
    heading,
    description,
    btnText,
    btnUrl,
    reviewCount,
    reviewRating,
  }) => (
    <Hero7
      heading={heading}
      description={description}
      button={{ text: btnText, url: btnUrl }}
      reviews={{
        count: reviewCount,
        rating: reviewRating,
        avatars: [
          { src: "https://placehold.co/56x56", alt: "Avatar 1" },
          { src: "https://placehold.co/56x56", alt: "Avatar 2" },
          { src: "https://placehold.co/56x56", alt: "Avatar 3" },
          { src: "https://placehold.co/56x56", alt: "Avatar 4" },
          { src: "https://placehold.co/56x56", alt: "Avatar 5" },
        ],
      }}
    />
  ),
};

// ---------------------------------------------------------------------------
// Hero12 - Logo Grid with Pattern Background (inline JSX)
// ---------------------------------------------------------------------------

interface ShadcnHero12Props {
  heading: string;
  headingHighlight: string;
  description: string;
  primaryBtnText: string;
  secondaryBtnText: string;
  logoSrc: string;
  imageSrc: string;
}

export const ShadcnHero12Config: ComponentConfig<ShadcnHero12Props> = {
  label: "SB: Hero \u2014 Logo Grid with Pattern",
  fields: {
    heading: { type: "text", label: "Heading" },
    headingHighlight: { type: "text", label: "Heading Highlight" },
    description: { type: "textarea", label: "Description" },
    primaryBtnText: { type: "text", label: "Primary Button Text" },
    secondaryBtnText: { type: "text", label: "Secondary Button Text" },
    logoSrc: { type: "text", label: "Logo Image URL" },
    imageSrc: { type: "text", label: "Background Pattern URL" },
  },
  defaultProps: {
    heading: "Build your next project with ",
    headingHighlight: "Blocks",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
    primaryBtnText: "Get Started",
    secondaryBtnText: "Learn more",
    logoSrc: "https://placehold.co/120x64",
    imageSrc: "https://placehold.co/1200x800",
  },
  render: ({
    heading,
    headingHighlight,
    description,
    primaryBtnText,
    secondaryBtnText,
    logoSrc,
    imageSrc,
  }) => (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <img
          alt="background"
          src={imageSrc}
          className="[mask-image:radial-gradient(75%_75%_at_center,white,transparent)] opacity-90"
        />
      </div>
      <div className="relative z-10 container">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="rounded-xl bg-background/30 p-4 shadow-sm backdrop-blur-sm">
              <img src={logoSrc} alt="logo" className="h-16" />
            </div>
            <div>
              <h1 className="mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-5xl">
                {heading}
                <span className="text-primary">{headingHighlight}</span>
              </h1>
              <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
                {description}
              </p>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <Button className="shadow-sm transition-shadow hover:shadow">
                {primaryBtnText}
              </Button>
              <Button variant="outline" className="group">
                {secondaryBtnText}{" "}
                <ExternalLink className="ml-2 h-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
            <div className="mt-20 flex flex-col items-center gap-5">
              <p className="font-medium text-muted-foreground lg:text-left">
                Built with open-source technologies
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {["shadcn/ui", "TypeScript", "React", "Tailwind CSS"].map(
                  (name) => (
                    <a
                      key={name}
                      href="#"
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "group flex aspect-square h-12 items-center justify-center p-0"
                      )}
                    >
                      <span className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                        {name}
                      </span>
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ),
};

// ---------------------------------------------------------------------------
// Hero34 - Muted Background (inline JSX)
// ---------------------------------------------------------------------------

interface ShadcnHero34Props {
  badge: string;
  heading: string;
  description: string;
  primaryBtnText: string;
  secondaryBtnText: string;
  imageSrc: string;
}

export const ShadcnHero34Config: ComponentConfig<ShadcnHero34Props> = {
  label: "SB: Hero \u2014 Muted Background",
  fields: {
    badge: { type: "text", label: "Badge" },
    heading: { type: "text", label: "Heading" },
    description: { type: "textarea", label: "Description" },
    primaryBtnText: { type: "text", label: "Primary Button Text" },
    secondaryBtnText: { type: "text", label: "Secondary Button Text" },
    imageSrc: { type: "text", label: "Image URL" },
  },
  defaultProps: {
    badge: "New Release",
    heading: "Welcome to Our Website",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
    primaryBtnText: "Primary",
    secondaryBtnText: "Secondary",
    imageSrc: "https://placehold.co/800x600",
  },
  render: ({
    badge,
    heading,
    description,
    primaryBtnText,
    secondaryBtnText,
    imageSrc,
  }) => (
    <section>
      <div className="container">
        <div className="grid items-center gap-8 bg-muted lg:grid-cols-2">
          <div className="flex flex-col items-center p-16 text-center lg:items-start lg:text-left">
            <p>{badge}</p>
            <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl">
              {heading}
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              {description}
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button>
                {primaryBtnText}
                <ArrowRight className="size-4" />
              </Button>
              <Button variant="outline">{secondaryBtnText}</Button>
            </div>
          </div>
          <img
            src={imageSrc}
            alt="placeholder hero"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  ),
};

// ---------------------------------------------------------------------------
// Hero45 - Feature Icons
// ---------------------------------------------------------------------------

interface ShadcnHero45Props {
  badge: string;
  heading: string;
  imageSrc: string;
  imageAlt: string;
  feature1Title: string;
  feature1Description: string;
  feature2Title: string;
  feature2Description: string;
  feature3Title: string;
  feature3Description: string;
}

export const ShadcnHero45Config: ComponentConfig<ShadcnHero45Props> = {
  label: "SB: Hero \u2014 Feature Icons",
  fields: {
    badge: { type: "text", label: "Badge Text" },
    heading: { type: "text", label: "Heading" },
    imageSrc: { type: "text", label: "Image URL" },
    imageAlt: { type: "text", label: "Image Alt Text" },
    feature1Title: { type: "text", label: "Feature 1 Title" },
    feature1Description: { type: "textarea", label: "Feature 1 Description" },
    feature2Title: { type: "text", label: "Feature 2 Title" },
    feature2Description: { type: "textarea", label: "Feature 2 Description" },
    feature3Title: { type: "text", label: "Feature 3 Title" },
    feature3Description: { type: "textarea", label: "Feature 3 Description" },
  },
  defaultProps: {
    badge: "shadcnblocks.com",
    heading: "Blocks built with Shadcn & Tailwind",
    imageSrc: "https://placehold.co/800x500",
    imageAlt: "Hero image",
    feature1Title: "Flexible Support",
    feature1Description:
      "Benefit from around-the-clock assistance to keep your business running smoothly.",
    feature2Title: "Collaborative Tools",
    feature2Description:
      "Enhance teamwork with tools designed to simplify project management and communication.",
    feature3Title: "Lightning Fast Speed",
    feature3Description:
      "Experience the fastest load times with our high performance servers.",
  },
  render: ({
    badge: badgeText,
    heading,
    imageSrc,
    imageAlt,
    feature1Title,
    feature1Description,
    feature2Title,
    feature2Description,
    feature3Title,
    feature3Description,
  }) => (
    <Hero45
      badge={badgeText}
      heading={heading}
      images={[{ src: imageSrc, alt: imageAlt }]}
      features={[
        {
          icon: HandHelping,
          title: feature1Title,
          description: feature1Description,
        },
        {
          icon: Users,
          title: feature2Title,
          description: feature2Description,
        },
        {
          icon: Zap,
          title: feature3Title,
          description: feature3Description,
        },
      ]}
    />
  ),
};

// ---------------------------------------------------------------------------
// Hero47 - Phone Mockup
// ---------------------------------------------------------------------------

interface ShadcnHero47Props {
  heading: string;
  subheading: string;
  description: string;
  primaryBtnText: string;
  primaryBtnUrl: string;
  secondaryBtnText: string;
  secondaryBtnUrl: string;
  imageSrc: string;
  imageAlt: string;
}

export const ShadcnHero47Config: ComponentConfig<ShadcnHero47Props> = {
  label: "SB: Hero \u2014 Phone Mockup",
  fields: {
    heading: { type: "text", label: "Heading" },
    subheading: { type: "text", label: "Subheading" },
    description: { type: "textarea", label: "Description" },
    primaryBtnText: { type: "text", label: "Primary Button Text" },
    primaryBtnUrl: { type: "text", label: "Primary Button URL" },
    secondaryBtnText: { type: "text", label: "Secondary Button Text" },
    secondaryBtnUrl: { type: "text", label: "Secondary Button URL" },
    imageSrc: { type: "text", label: "Phone Screen Image URL" },
    imageAlt: { type: "text", label: "Phone Screen Image Alt" },
  },
  defaultProps: {
    heading: "Epic Blocks",
    subheading: " built with shadcn/ui & Tailwind",
    description:
      "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
    primaryBtnText: "Get Started",
    primaryBtnUrl: "#",
    secondaryBtnText: "Read the docs",
    secondaryBtnUrl: "#",
    imageSrc: "https://placehold.co/450x800",
    imageAlt: "Phone screen preview",
  },
  render: ({
    heading,
    subheading,
    description,
    primaryBtnText,
    primaryBtnUrl,
    secondaryBtnText,
    secondaryBtnUrl,
    imageSrc,
    imageAlt,
  }) => (
    <Hero47
      heading={heading}
      subheading={subheading}
      description={description}
      buttons={{
        primary: { text: primaryBtnText, url: primaryBtnUrl },
        secondary: { text: secondaryBtnText, url: secondaryBtnUrl },
      }}
      image={{ src: imageSrc, alt: imageAlt }}
    />
  ),
};

// ---------------------------------------------------------------------------
// Hero67 - Centered CTA with Avatars (inline JSX)
// ---------------------------------------------------------------------------

interface ShadcnHero67Props {
  heading: string;
  description: string;
  btnText: string;
  logoSrc: string;
  imageSrc: string;
  trustText: string;
}

export const ShadcnHero67Config: ComponentConfig<ShadcnHero67Props> = {
  label: "SB: Hero \u2014 Centered CTA with Avatars",
  fields: {
    heading: { type: "text", label: "Heading" },
    description: { type: "textarea", label: "Description" },
    btnText: { type: "text", label: "Button Text" },
    logoSrc: { type: "text", label: "Logo Image URL" },
    imageSrc: { type: "text", label: "Hero Image URL" },
    trustText: { type: "text", label: "Trust Text" },
  },
  defaultProps: {
    heading: "Build Exceptional Online Experiences",
    description:
      "Create a website that captures attention, drives engagement, and aligns with your goals, all in a matter of days.",
    btnText: "Get Started Today",
    logoSrc: "https://placehold.co/120x56",
    imageSrc: "https://placehold.co/1200x700",
    trustText: "Trusted by industry leaders",
  },
  render: ({
    heading,
    description,
    btnText,
    logoSrc,
    imageSrc,
    trustText,
  }) => (
    <section className="py-32">
      <div className="container">
        <div className="z-10 mx-auto flex max-w-4xl flex-col items-center gap-14 text-center">
          <img src={logoSrc} alt="logo" className="h-14" />
          <div>
            <h1 className="mb-4 text-3xl font-medium text-pretty lg:text-6xl">
              {heading}
            </h1>
            <p className="mx-auto max-w-xl text-muted-foreground">
              {description}
            </p>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-6 lg:flex-row">
            <Button size="lg" className="w-full sm:w-fit">
              <Calendar className="mr-2 h-4" />
              {btnText}
            </Button>
            <div className="flex flex-col items-center gap-2 lg:items-start">
              <span className="inline-flex items-center -space-x-1">
                {[1, 2, 3, 4].map((i) => (
                  <Avatar key={i} className="size-7 border">
                    <AvatarImage
                      src={`https://placehold.co/28x28?text=${i}`}
                      alt={`User ${i}`}
                    />
                  </Avatar>
                ))}
              </span>
              <p className="text-xs text-muted-foreground">{trustText}</p>
            </div>
          </div>
        </div>
        <img
          src={imageSrc}
          alt="hero"
          className="mx-auto mt-24 aspect-video max-h-[700px] w-full max-w-7xl rounded-t-lg object-cover shadow-md"
        />
      </div>
    </section>
  ),
};

// ---------------------------------------------------------------------------
// Hero78 - Fullscreen Background Image (inline JSX)
// ---------------------------------------------------------------------------

interface ShadcnHero78Props {
  heading: string;
  description: string;
  btnText: string;
  backgroundImageUrl: string;
}

export const ShadcnHero78Config: ComponentConfig<ShadcnHero78Props> = {
  label: "SB: Hero \u2014 Fullscreen Background Image",
  fields: {
    heading: { type: "text", label: "Heading" },
    description: { type: "textarea", label: "Description" },
    btnText: { type: "text", label: "Button Text" },
    backgroundImageUrl: { type: "text", label: "Background Image URL" },
  },
  defaultProps: {
    heading: "Explore the wonders of science.",
    description:
      "From stunning skyscrapers to intricate bridges and innovative architectural marvels, each photo invites you to explore the artificial wonders of the world.",
    btnText: "See all photos",
    backgroundImageUrl: "https://placehold.co/1920x1080",
  },
  render: ({ heading, description, btnText, backgroundImageUrl }) => (
    <section
      className="dark relative flex h-svh max-h-[1400px] w-full overflow-hidden bg-cover bg-center bg-no-repeat font-sans after:absolute after:top-0 after:left-0 after:z-10 after:h-full after:w-full after:bg-black/20 after:content-[''] md:h-svh"
      style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
    >
      <div className="relative z-30 m-auto flex max-w-[46.25rem] flex-col items-center justify-center gap-6 px-5">
        <h1 className="text-center font-serif text-4xl leading-tight text-foreground md:text-6xl xl:text-[4.4rem]">
          {heading}
        </h1>
        <p className="text-center text-base text-foreground">{description}</p>
        <Button className="h-fit w-fit rounded-full px-7 py-4 text-sm leading-tight font-medium">
          {btnText}
        </Button>
      </div>
      <div className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-repeat opacity-15" />
    </section>
  ),
};

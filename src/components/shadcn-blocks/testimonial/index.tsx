"use client";

import type { ComponentConfig } from "@measured/puck";
import { Testimonial10 } from "@/components/testimonial10";

import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

// --- Testimonial4 adapter (className-only, inline JSX) ---

type Testimonial4SmallCard = {
  quote: string;
  authorName: string;
  authorRole: string;
  avatarUrl: string;
};

type ShadcnTestimonial4Props = {
  heroImageUrl: string;
  heroImageAlt: string;
  heroQuote: string;
  heroAuthorName: string;
  heroAuthorRole: string;
  cards: Testimonial4SmallCard[];
};

export const ShadcnTestimonial4Config: ComponentConfig<ShadcnTestimonial4Props> = {
  label: "SB: Testimonial \u2014 Hero Image with Cards",
  fields: {
    heroImageUrl: { type: "text", label: "Hero Image URL" },
    heroImageAlt: { type: "text", label: "Hero Image Alt Text" },
    heroQuote: { type: "textarea", label: "Hero Quote" },
    heroAuthorName: { type: "text", label: "Hero Author Name" },
    heroAuthorRole: { type: "text", label: "Hero Author Role" },
    cards: {
      type: "array",
      label: "Testimonial Cards",
      arrayFields: {
        quote: { type: "textarea", label: "Quote" },
        authorName: { type: "text", label: "Author Name" },
        authorRole: { type: "text", label: "Author Role" },
        avatarUrl: { type: "text", label: "Avatar URL" },
      },
    },
  },
  defaultProps: {
    heroImageUrl: "https://placehold.co/600x400/e2e8f0/475569?text=Testimonial",
    heroImageAlt: "Featured testimonial",
    heroQuote:
      "This platform has completely transformed our workflow and boosted our team productivity.",
    heroAuthorName: "John Doe",
    heroAuthorRole: "CEO, Company Name",
    cards: [
      {
        quote:
          "An excellent tool that makes our daily operations much smoother and more efficient.",
        authorName: "Jane Smith",
        authorRole: "CTO, TechCorp",
        avatarUrl: "https://i.pravatar.cc/100?img=1",
      },
      {
        quote:
          "The best investment we made this year. Highly recommended for any growing team.",
        authorName: "Alex Johnson",
        authorRole: "Product Manager, StartupXYZ",
        avatarUrl: "https://i.pravatar.cc/100?img=2",
      },
      {
        quote:
          "Incredible support and a product that truly delivers on its promises.",
        authorName: "Emily Davis",
        authorRole: "Designer, InnovateCo",
        avatarUrl: "https://i.pravatar.cc/100?img=3",
      },
    ],
  },
  render: ({
    heroImageUrl,
    heroImageAlt,
    heroQuote,
    heroAuthorName,
    heroAuthorRole,
    cards,
  }) => {
    return (
      <section className="py-32">
        <div className="container">
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 items-stretch gap-x-0 gap-y-4 lg:grid-cols-3 lg:gap-4">
              <img
                src={heroImageUrl}
                alt={heroImageAlt}
                className="h-72 w-full rounded-md object-cover lg:h-auto"
              />
              <Card className="col-span-2 flex items-center justify-center p-6">
                <div className="flex flex-col gap-4">
                  <q className="text-xl font-medium lg:text-3xl">
                    {heroQuote}
                  </q>
                  <div className="flex flex-col items-start">
                    <p>{heroAuthorName}</p>
                    <p className="text-muted-foreground">{heroAuthorRole}</p>
                  </div>
                </div>
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {cards.map((card, idx) => (
                <Card key={idx}>
                  <CardContent className="px-6 pt-6 leading-7 text-foreground/70">
                    <q>{card.quote}</q>
                  </CardContent>
                  <CardFooter>
                    <div className="flex gap-4 leading-5">
                      <Avatar className="size-9 rounded-full ring-1 ring-input">
                        <AvatarImage src={card.avatarUrl} alt={card.authorName} />
                      </Avatar>
                      <div className="text-sm">
                        <p className="font-medium">{card.authorName}</p>
                        <p className="text-muted-foreground">{card.authorRole}</p>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  },
};

// --- Testimonial8 adapter (heading/description hardcoded in source, inline JSX) ---

type Testimonial8Item = {
  name: string;
  role: string;
  avatar: string;
  content: string;
};

type ShadcnTestimonial8Props = {
  heading: string;
  description: string;
  testimonials: Testimonial8Item[];
};

export const ShadcnTestimonial8Config: ComponentConfig<ShadcnTestimonial8Props> = {
  label: "SB: Testimonial \u2014 Masonry Grid",
  fields: {
    heading: { type: "text", label: "Heading" },
    description: { type: "text", label: "Description" },
    testimonials: {
      type: "array",
      label: "Testimonials",
      arrayFields: {
        name: { type: "text", label: "Name" },
        role: { type: "text", label: "Role" },
        avatar: { type: "text", label: "Avatar URL" },
        content: { type: "textarea", label: "Testimonial Text" },
      },
    },
  },
  defaultProps: {
    heading: "What Our Clients Say",
    description:
      "Discover how our customers are using our products to build their businesses",
    testimonials: [
      {
        name: "Sarah Chen",
        role: "CEO & Founder",
        avatar: "https://i.pravatar.cc/100?img=1",
        content:
          "This platform has completely transformed how we manage our projects. The intuitive interface and powerful features have increased our team's productivity by 40%.",
      },
      {
        name: "Marcus Rodriguez",
        role: "CTO",
        avatar: "https://i.pravatar.cc/100?img=3",
        content:
          "Outstanding integration capabilities. We've connected all our existing tools seamlessly, and the real-time collaboration features have revolutionized our development workflow.",
      },
      {
        name: "Emily Watson",
        role: "Product Manager",
        avatar: "https://i.pravatar.cc/100?img=5",
        content:
          "As a product manager, I need tools that help me stay organized and communicate effectively with my team. This platform delivers on both fronts with its comprehensive project management features and clear reporting dashboards.",
      },
      {
        name: "David Kim",
        role: "COO",
        avatar: "https://i.pravatar.cc/100?img=7",
        content:
          "The analytics and reporting features have given us unprecedented visibility into our operations. We can now make data-driven decisions with confidence.",
      },
      {
        name: "Lisa Thompson",
        role: "Tech Lead",
        avatar: "https://i.pravatar.cc/100?img=9",
        content:
          "Exceptional developer experience. The API is well-documented, the SDKs are robust.",
      },
      {
        name: "Alex Johnson",
        role: "Designer",
        avatar: "https://i.pravatar.cc/100?img=11",
        content:
          "The design system and component library have streamlined our design process. We can now create consistent, beautiful interfaces much faster.",
      },
      {
        name: "Michael Brown",
        role: "Developer",
        avatar: "https://i.pravatar.cc/100?img=13",
        content:
          "The code quality and performance are top-notch. The platform handles our scale effortlessly, and the developer tools make debugging and optimization a breeze.",
      },
      {
        name: "Rachel Green",
        role: "Marketing Director",
        avatar: "https://i.pravatar.cc/100?img=15",
        content:
          "Game-changing marketing automation. We've seen a 60% increase in engagement rates and significantly improved ROI.",
      },
    ],
  },
  render: ({ heading, description, testimonials }) => {
    return (
      <section className="py-32">
        <div className="container">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-center text-3xl font-semibold lg:text-5xl">
              {heading}
            </h2>
            <p className="text-muted-foreground lg:text-xl">{description}</p>
          </div>
          <div className="relative mt-14 w-full after:absolute after:inset-x-0 after:-bottom-2 after:h-96 after:bg-gradient-to-t after:from-background">
            <div
              className="columns-1 gap-5 md:columns-2 lg:columns-3"
              style={{ columnGap: "20px" }}
            >
              {testimonials.map((testimonial, idx) => {
                const displayIdx = (idx % 3) * 3 + Math.floor(idx / 3);
                return (
                  <div
                    key={idx}
                    className={cn(
                      "mb-5",
                      displayIdx > 3 && displayIdx <= 5 && "hidden md:block",
                      displayIdx > 5 && "hidden lg:block",
                    )}
                  >
                    <Card className="break-inside-avoid p-5">
                      <div className="flex gap-4 leading-5">
                        <Avatar className="size-10 rounded-full ring-1 ring-input">
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.name}
                          />
                        </Avatar>
                        <div className="mb-2 text-sm">
                          <p className="font-semibold text-foreground">
                            {testimonial.name}
                          </p>
                          <p className="text-muted-foreground">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <div className="leading-7 text-foreground/60">
                        <q>{testimonial.content}</q>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  },
};

// --- Testimonial10 adapter ---

type ShadcnTestimonial10Props = {
  quote: string;
  authorName: string;
  authorRole: string;
  avatarSrc: string;
  avatarAlt: string;
};

export const ShadcnTestimonial10Config: ComponentConfig<ShadcnTestimonial10Props> = {
  label: "SB: Testimonial \u2014 Centered Single Quote",
  fields: {
    quote: { type: "textarea", label: "Quote" },
    authorName: { type: "text", label: "Author Name" },
    authorRole: { type: "text", label: "Author Role" },
    avatarSrc: { type: "text", label: "Avatar URL" },
    avatarAlt: { type: "text", label: "Avatar Alt Text" },
  },
  defaultProps: {
    quote:
      "This product has completely transformed our workflow. The intuitive interface and powerful features make it an indispensable tool for our team.",
    authorName: "Customer Name",
    authorRole: "CEO, Company",
    avatarSrc: "https://i.pravatar.cc/100?img=1",
    avatarAlt: "Customer Name",
  },
  render: ({ quote, authorName, authorRole, avatarSrc, avatarAlt }) => {
    return (
      <Testimonial10
        quote={quote}
        author={{
          name: authorName,
          role: authorRole,
          avatar: { src: avatarSrc, alt: avatarAlt },
        }}
      />
    );
  },
};

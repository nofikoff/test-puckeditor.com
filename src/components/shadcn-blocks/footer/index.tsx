"use client";

import React from "react";
import { ComponentConfig } from "@measured/puck";
import { Footer2 } from "@/components/footer2";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

// -- Footer2 Config (well-parameterized, delegate to component) --

interface Footer2MenuItem {
  title: string;
  links: { text: string; url: string }[];
}

interface Footer2Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  tagline?: string;
  menuItems?: Footer2MenuItem[];
  copyright?: string;
  bottomLinks?: { text: string; url: string }[];
}

export const ShadcnFooter2Config: ComponentConfig<Footer2Props> = {
  label: "SB: Footer \u2014 Multi-Column with Logo",
  fields: {
    logo: {
      type: "object",
      label: "Logo",
      objectFields: {
        url: {
          type: "text",
          label: "Logo Link URL",
        },
        src: {
          type: "text",
          label: "Logo Image URL",
        },
        alt: {
          type: "text",
          label: "Logo Alt Text",
        },
        title: {
          type: "text",
          label: "Logo Title",
        },
      },
    },
    tagline: {
      type: "text",
      label: "Tagline",
    },
    menuItems: {
      type: "array",
      label: "Menu Sections",
      arrayFields: {
        title: {
          type: "text",
          label: "Section Title",
        },
        links: {
          type: "array",
          label: "Links",
          arrayFields: {
            text: {
              type: "text",
              label: "Link Text",
            },
            url: {
              type: "text",
              label: "Link URL",
            },
          },
        },
      },
    },
    copyright: {
      type: "text",
      label: "Copyright Text",
    },
    bottomLinks: {
      type: "array",
      label: "Bottom Links",
      arrayFields: {
        text: {
          type: "text",
          label: "Link Text",
        },
        url: {
          type: "text",
          label: "Link URL",
        },
      },
    },
  },
  defaultProps: {
    logo: {
      src: "https://placehold.co/40x40/333/fff?text=L",
      alt: "Company logo",
      title: "Company",
      url: "#",
    },
    tagline: "Components made easy.",
    menuItems: [
      {
        title: "Product",
        links: [
          { text: "Overview", url: "#" },
          { text: "Pricing", url: "#" },
          { text: "Marketplace", url: "#" },
          { text: "Features", url: "#" },
          { text: "Integrations", url: "#" },
        ],
      },
      {
        title: "Company",
        links: [
          { text: "About", url: "#" },
          { text: "Team", url: "#" },
          { text: "Blog", url: "#" },
          { text: "Careers", url: "#" },
          { text: "Contact", url: "#" },
        ],
      },
      {
        title: "Resources",
        links: [
          { text: "Help", url: "#" },
          { text: "Sales", url: "#" },
          { text: "Advertise", url: "#" },
        ],
      },
      {
        title: "Social",
        links: [
          { text: "Twitter", url: "#" },
          { text: "Instagram", url: "#" },
          { text: "LinkedIn", url: "#" },
        ],
      },
    ],
    copyright: "\u00a9 2024 Company. All rights reserved.",
    bottomLinks: [
      { text: "Terms and Conditions", url: "#" },
      { text: "Privacy Policy", url: "#" },
    ],
  },
  render: Footer2,
};

// -- Footer7 Config (social icons use JSX - inline rendering with selectable icons) --

const socialIconMap: Record<string, React.ReactElement> = {
  instagram: <Instagram className="size-5" />,
  facebook: <Facebook className="size-5" />,
  twitter: <Twitter className="size-5" />,
  linkedin: <Linkedin className="size-5" />,
};

interface Footer7Section {
  title: string;
  links: { name: string; href: string }[];
}

interface Footer7SocialLink {
  platform: string;
  href: string;
}

interface Footer7LegalLink {
  name: string;
  href: string;
}

interface Footer7Props {
  logoTitle?: string;
  logoSrc?: string;
  logoUrl?: string;
  description?: string;
  sections?: Footer7Section[];
  socialLinks?: Footer7SocialLink[];
  copyright?: string;
  legalLinks?: Footer7LegalLink[];
}

const Footer7Render = ({
  logoTitle = "Company",
  logoSrc = "https://placehold.co/32x32/333/fff?text=L",
  logoUrl = "#",
  description = "A collection of components for your startup business or side project.",
  sections = [],
  socialLinks = [],
  copyright = "\u00a9 2024 Company. All rights reserved.",
  legalLinks = [],
}: Footer7Props): React.ReactElement => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            <div className="flex items-center gap-2 lg:justify-start">
              <a href={logoUrl}>
                <img src={logoSrc} alt="logo" className="h-8" />
              </a>
              <h2 className="text-xl font-semibold">{logoTitle}</h2>
            </div>
            <p className="max-w-[70%] text-sm text-muted-foreground">
              {description}
            </p>
            <ul className="flex items-center space-x-6 text-muted-foreground">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-primary">
                  <a href={social.href} aria-label={social.platform}>
                    {socialIconMap[social.platform] || social.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t py-8 text-xs font-medium text-muted-foreground md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-primary">
                <a href={link.href}> {link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export const ShadcnFooter7Config: ComponentConfig<Footer7Props> = {
  label: "SB: Footer \u2014 Social Icons with Columns",
  fields: {
    logoTitle: {
      type: "text",
      label: "Logo Title",
    },
    logoSrc: {
      type: "text",
      label: "Logo Image URL",
    },
    logoUrl: {
      type: "text",
      label: "Logo Link URL",
    },
    description: {
      type: "textarea",
      label: "Description",
    },
    sections: {
      type: "array",
      label: "Link Sections",
      arrayFields: {
        title: {
          type: "text",
          label: "Section Title",
        },
        links: {
          type: "array",
          label: "Links",
          arrayFields: {
            name: {
              type: "text",
              label: "Link Text",
            },
            href: {
              type: "text",
              label: "Link URL",
            },
          },
        },
      },
    },
    socialLinks: {
      type: "array",
      label: "Social Links",
      arrayFields: {
        platform: {
          type: "select",
          label: "Platform",
          options: [
            { label: "Instagram", value: "instagram" },
            { label: "Facebook", value: "facebook" },
            { label: "Twitter", value: "twitter" },
            { label: "LinkedIn", value: "linkedin" },
          ],
        },
        href: {
          type: "text",
          label: "Link URL",
        },
      },
    },
    copyright: {
      type: "text",
      label: "Copyright Text",
    },
    legalLinks: {
      type: "array",
      label: "Legal Links",
      arrayFields: {
        name: {
          type: "text",
          label: "Link Text",
        },
        href: {
          type: "text",
          label: "Link URL",
        },
      },
    },
  },
  defaultProps: {
    logoTitle: "Company",
    logoSrc: "https://placehold.co/32x32/333/fff?text=L",
    logoUrl: "#",
    description:
      "A collection of components for your startup business or side project.",
    sections: [
      {
        title: "Product",
        links: [
          { name: "Overview", href: "#" },
          { name: "Pricing", href: "#" },
          { name: "Marketplace", href: "#" },
          { name: "Features", href: "#" },
        ],
      },
      {
        title: "Company",
        links: [
          { name: "About", href: "#" },
          { name: "Team", href: "#" },
          { name: "Blog", href: "#" },
          { name: "Careers", href: "#" },
        ],
      },
      {
        title: "Resources",
        links: [
          { name: "Help", href: "#" },
          { name: "Sales", href: "#" },
          { name: "Advertise", href: "#" },
          { name: "Privacy", href: "#" },
        ],
      },
    ],
    socialLinks: [
      { platform: "instagram", href: "#" },
      { platform: "facebook", href: "#" },
      { platform: "twitter", href: "#" },
      { platform: "linkedin", href: "#" },
    ],
    copyright: "\u00a9 2024 Company. All rights reserved.",
    legalLinks: [
      { name: "Terms and Conditions", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
  },
  render: Footer7Render,
};

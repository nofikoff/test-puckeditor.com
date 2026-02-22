"use client";

import type { ComponentConfig } from "@measured/puck";
import { Cta4 } from "@/components/cta4";
import { Cta10 } from "@/components/cta10";
import { Cta11 } from "@/components/cta11";
import { Cta13 } from "@/components/cta13";

// --- Cta4 adapter ---

type ShadcnCta4Props = {
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  items: string;
};

export const ShadcnCta4Config: ComponentConfig<ShadcnCta4Props> = {
  label: "SB: CTA \u2014 Split with Checklist",
  fields: {
    title: { type: "text", label: "Title" },
    description: { type: "textarea", label: "Description" },
    buttonText: { type: "text", label: "Button Text" },
    buttonUrl: { type: "text", label: "Button URL" },
    items: { type: "textarea", label: "Checklist Items (one per line)" },
  },
  defaultProps: {
    title: "Call to Action",
    description:
      "Start building faster with our collection of pre-built components and blocks.",
    buttonText: "Get Started",
    buttonUrl: "#",
    items:
      "Easy Integration\n24/7 Support\nCustomizable Design\nScalable Performance\nHundreds of Blocks",
  },
  render: ({ title, description, buttonText, buttonUrl, items }) => {
    const itemList = items.split("\n").filter(Boolean);
    return (
      <Cta4
        title={title}
        description={description}
        buttonText={buttonText}
        buttonUrl={buttonUrl}
        items={itemList}
      />
    );
  },
};

// --- Cta10 adapter ---

type ShadcnCta10Props = {
  heading: string;
  description: string;
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonText: string;
  secondaryButtonUrl: string;
};

export const ShadcnCta10Config: ComponentConfig<ShadcnCta10Props> = {
  label: "SB: CTA \u2014 Accent Card with Buttons",
  fields: {
    heading: { type: "text", label: "Heading" },
    description: { type: "textarea", label: "Description" },
    primaryButtonText: { type: "text", label: "Primary Button Text" },
    primaryButtonUrl: { type: "text", label: "Primary Button URL" },
    secondaryButtonText: { type: "text", label: "Secondary Button Text (leave empty to hide)" },
    secondaryButtonUrl: { type: "text", label: "Secondary Button URL" },
  },
  defaultProps: {
    heading: "Call to Action",
    description:
      "Build faster with our collection of pre-built blocks. Speed up your development and ship features in record time.",
    primaryButtonText: "Buy Now",
    primaryButtonUrl: "#",
    secondaryButtonText: "",
    secondaryButtonUrl: "#",
  },
  render: ({
    heading,
    description,
    primaryButtonText,
    primaryButtonUrl,
    secondaryButtonText,
    secondaryButtonUrl,
  }) => {
    const buttons: {
      primary?: { text: string; url: string };
      secondary?: { text: string; url: string };
    } = {};
    if (primaryButtonText) {
      buttons.primary = { text: primaryButtonText, url: primaryButtonUrl };
    }
    if (secondaryButtonText) {
      buttons.secondary = { text: secondaryButtonText, url: secondaryButtonUrl };
    }
    return (
      <Cta10
        heading={heading}
        description={description}
        buttons={buttons}
      />
    );
  },
};

// --- Cta11 adapter ---

type ShadcnCta11Props = {
  heading: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export const ShadcnCta11Config: ComponentConfig<ShadcnCta11Props> = {
  label: "SB: CTA \u2014 Accent Card with Image",
  fields: {
    heading: { type: "text", label: "Heading" },
    description: { type: "textarea", label: "Description" },
    imageSrc: { type: "text", label: "Image URL" },
    imageAlt: { type: "text", label: "Image Alt Text" },
  },
  defaultProps: {
    heading: "Call to Action",
    description:
      "Build faster with our collection of pre-built blocks. Speed up your development and ship features in record time.",
    imageSrc: "https://placehold.co/200x200/1a1a2e/e0e0e0?text=CTA",
    imageAlt: "Call to action image",
  },
  render: ({ heading, description, imageSrc, imageAlt }) => {
    return (
      <Cta11
        heading={heading}
        description={description}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
      />
    );
  },
};

// --- Cta13 adapter ---

type ShadcnCta13Props = {
  heading: string;
  description: string;
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonText: string;
  secondaryButtonUrl: string;
};

export const ShadcnCta13Config: ComponentConfig<ShadcnCta13Props> = {
  label: "SB: CTA \u2014 Large Accent Banner",
  fields: {
    heading: { type: "text", label: "Heading" },
    description: { type: "textarea", label: "Description" },
    primaryButtonText: { type: "text", label: "Primary Button Text" },
    primaryButtonUrl: { type: "text", label: "Primary Button URL" },
    secondaryButtonText: { type: "text", label: "Secondary Button Text (leave empty to hide)" },
    secondaryButtonUrl: { type: "text", label: "Secondary Button URL" },
  },
  defaultProps: {
    heading: "Call to Action",
    description:
      "Build faster with our collection of pre-built blocks. Speed up your development and ship features in record time.",
    primaryButtonText: "Buy Now",
    primaryButtonUrl: "#",
    secondaryButtonText: "Contact Us",
    secondaryButtonUrl: "#",
  },
  render: ({
    heading,
    description,
    primaryButtonText,
    primaryButtonUrl,
    secondaryButtonText,
    secondaryButtonUrl,
  }) => {
    const buttons: {
      primary?: { text: string; url: string };
      secondary?: { text: string; url: string };
    } = {};
    if (primaryButtonText) {
      buttons.primary = { text: primaryButtonText, url: primaryButtonUrl };
    }
    if (secondaryButtonText) {
      buttons.secondary = { text: secondaryButtonText, url: secondaryButtonUrl };
    }
    return (
      <Cta13
        heading={heading}
        description={description}
        buttons={buttons}
      />
    );
  },
};

"use client";

import { ComponentConfig } from "@measured/puck";
import { Logos3 } from "@/components/logos3";
import { Logos8 } from "@/components/logos8";

// -- Logos3 Config (auto-scrolling carousel) --

interface Logos3Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  logos?: Logos3Logo[];
}

export const ShadcnLogos3Config: ComponentConfig<Logos3Props> = {
  label: "SB: Logos \u2014 Auto-Scroll Carousel",
  fields: {
    heading: {
      type: "text",
      label: "Heading",
    },
    logos: {
      type: "array",
      label: "Logos",
      arrayFields: {
        id: {
          type: "text",
          label: "Logo ID",
        },
        description: {
          type: "text",
          label: "Logo Description (alt text)",
        },
        image: {
          type: "text",
          label: "Logo Image URL",
        },
        className: {
          type: "text",
          label: "CSS Class (e.g. h-7 w-auto)",
        },
      },
    },
  },
  defaultProps: {
    heading: "Trusted by these companies",
    logos: [
      {
        id: "logo-1",
        description: "Partner 1",
        image: "https://placehold.co/120x40/e2e8f0/475569?text=Partner+1",
        className: "h-7 w-auto",
      },
      {
        id: "logo-2",
        description: "Partner 2",
        image: "https://placehold.co/120x40/e2e8f0/475569?text=Partner+2",
        className: "h-7 w-auto",
      },
      {
        id: "logo-3",
        description: "Partner 3",
        image: "https://placehold.co/120x40/e2e8f0/475569?text=Partner+3",
        className: "h-7 w-auto",
      },
      {
        id: "logo-4",
        description: "Partner 4",
        image: "https://placehold.co/120x40/e2e8f0/475569?text=Partner+4",
        className: "h-7 w-auto",
      },
      {
        id: "logo-5",
        description: "Partner 5",
        image: "https://placehold.co/120x40/e2e8f0/475569?text=Partner+5",
        className: "h-7 w-auto",
      },
      {
        id: "logo-6",
        description: "Partner 6",
        image: "https://placehold.co/120x40/e2e8f0/475569?text=Partner+6",
        className: "h-7 w-auto",
      },
      {
        id: "logo-7",
        description: "Partner 7",
        image: "https://placehold.co/120x40/e2e8f0/475569?text=Partner+7",
        className: "h-4 w-auto",
      },
      {
        id: "logo-8",
        description: "Partner 8",
        image: "https://placehold.co/120x40/e2e8f0/475569?text=Partner+8",
        className: "h-7 w-auto",
      },
    ],
  },
  render: Logos3,
};

// -- Logos8 Config (static grid) --

interface Logos8Logo {
  name: string;
  logo: string;
  className: string;
}

interface Logos8Props {
  title?: string;
  subtitle?: string;
  logos?: Logos8Logo[];
}

export const ShadcnLogos8Config: ComponentConfig<Logos8Props> = {
  label: "SB: Logos \u2014 Static Grid with Subtitle",
  fields: {
    title: {
      type: "text",
      label: "Title",
    },
    subtitle: {
      type: "text",
      label: "Subtitle",
    },
    logos: {
      type: "array",
      label: "Logos",
      arrayFields: {
        name: {
          type: "text",
          label: "Company Name",
        },
        logo: {
          type: "text",
          label: "Logo Image URL",
        },
        className: {
          type: "text",
          label: "CSS Class (e.g. h-7 w-auto)",
        },
      },
    },
  },
  defaultProps: {
    title: "Trusted by these companies",
    subtitle: "Used by the world's leading companies",
    logos: [
      {
        name: "Company A",
        logo: "https://placehold.co/120x40/e2e8f0/475569?text=Company+A",
        className: "h-7 w-auto",
      },
      {
        name: "Company B",
        logo: "https://placehold.co/120x40/e2e8f0/475569?text=Company+B",
        className: "h-5 w-auto",
      },
      {
        name: "Company C",
        logo: "https://placehold.co/120x40/e2e8f0/475569?text=Company+C",
        className: "h-6 w-auto",
      },
      {
        name: "Company D",
        logo: "https://placehold.co/120x40/e2e8f0/475569?text=Company+D",
        className: "h-5 w-auto",
      },
      {
        name: "Company E",
        logo: "https://placehold.co/120x40/e2e8f0/475569?text=Company+E",
        className: "h-6 w-auto",
      },
    ],
  },
  render: Logos8,
};

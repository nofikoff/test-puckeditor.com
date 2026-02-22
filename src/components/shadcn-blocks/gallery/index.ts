"use client";

import { ComponentConfig } from "@measured/puck";
import { Gallery4, Gallery4Props } from "@/components/gallery4";
import { Gallery6 } from "@/components/gallery6";

export const ShadcnGallery4Config: ComponentConfig<Gallery4Props> = {
  label: "SB: Gallery \u2014 Carousel with Overlay Cards",
  fields: {
    title: {
      type: "text",
      label: "Title",
    },
    description: {
      type: "textarea",
      label: "Description",
    },
    items: {
      type: "array",
      label: "Gallery Items",
      arrayFields: {
        id: {
          type: "text",
          label: "Item ID",
        },
        title: {
          type: "text",
          label: "Item Title",
        },
        description: {
          type: "textarea",
          label: "Item Description",
        },
        href: {
          type: "text",
          label: "Link URL",
        },
        image: {
          type: "text",
          label: "Image URL",
        },
      },
    },
  },
  defaultProps: {
    title: "Case Studies",
    description:
      "Discover how leading companies and developers are leveraging modern web technologies to build exceptional digital experiences.",
    items: [
      {
        id: "item-1",
        title: "Building a Modern Component Library",
        description:
          "Explore how to revolutionize React component libraries by providing a unique approach to component distribution and customization.",
        href: "#",
        image: "https://placehold.co/600x400/1a1a2e/ffffff?text=Project+1",
      },
      {
        id: "item-2",
        title: "The Utility-First CSS Revolution",
        description:
          "Discover how utility-first CSS transformed the way developers style applications, offering speed and design flexibility.",
        href: "#",
        image: "https://placehold.co/600x400/16213e/ffffff?text=Project+2",
      },
      {
        id: "item-3",
        title: "The All-in-One Web Framework",
        description:
          "Learn how innovative architecture and zero-JS-by-default approach helps developers build faster websites.",
        href: "#",
        image: "https://placehold.co/600x400/0f3460/ffffff?text=Project+3",
      },
      {
        id: "item-4",
        title: "Pioneering Component-Based UI",
        description:
          "See how component-based architecture enables developers to build complex user interfaces with reusable code.",
        href: "#",
        image: "https://placehold.co/600x400/533483/ffffff?text=Project+4",
      },
      {
        id: "item-5",
        title: "The React Framework for Production",
        description:
          "Explore the go-to framework for building full-stack applications with server components and automatic optimization.",
        href: "#",
        image: "https://placehold.co/600x400/e94560/ffffff?text=Project+5",
      },
    ],
  },
  render: Gallery4,
};

interface Gallery6Item {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
}

interface Gallery6Props {
  heading?: string;
  demoUrl?: string;
  items?: Gallery6Item[];
}

export const ShadcnGallery6Config: ComponentConfig<Gallery6Props> = {
  label: "SB: Gallery \u2014 Carousel with Cards Below",
  fields: {
    heading: {
      type: "text",
      label: "Heading",
    },
    demoUrl: {
      type: "text",
      label: "Demo Link URL",
    },
    items: {
      type: "array",
      label: "Gallery Items",
      arrayFields: {
        id: {
          type: "text",
          label: "Item ID",
        },
        title: {
          type: "text",
          label: "Item Title",
        },
        summary: {
          type: "textarea",
          label: "Item Summary",
        },
        url: {
          type: "text",
          label: "Link URL",
        },
        image: {
          type: "text",
          label: "Image URL",
        },
      },
    },
  },
  defaultProps: {
    heading: "Gallery",
    demoUrl: "#",
    items: [
      {
        id: "item-1",
        title: "Build Modern UIs",
        summary:
          "Create stunning user interfaces with our comprehensive design system.",
        url: "#",
        image: "https://placehold.co/600x400/1a1a2e/ffffff?text=Slide+1",
      },
      {
        id: "item-2",
        title: "Computer Vision Technology",
        summary:
          "Powerful image recognition and processing capabilities that allow AI systems to analyze and interpret visual information.",
        url: "#",
        image: "https://placehold.co/600x400/16213e/ffffff?text=Slide+2",
      },
      {
        id: "item-3",
        title: "Machine Learning Automation",
        summary:
          "Self-improving algorithms that learn from data patterns to automate complex tasks and make intelligent decisions.",
        url: "#",
        image: "https://placehold.co/600x400/0f3460/ffffff?text=Slide+3",
      },
      {
        id: "item-4",
        title: "Predictive Analytics",
        summary:
          "Advanced forecasting capabilities that analyze historical data to predict future trends and outcomes.",
        url: "#",
        image: "https://placehold.co/600x400/533483/ffffff?text=Slide+4",
      },
      {
        id: "item-5",
        title: "Neural Network Architecture",
        summary:
          "Sophisticated AI models inspired by human brain structure, capable of solving complex problems through deep learning.",
        url: "#",
        image: "https://placehold.co/600x400/e94560/ffffff?text=Slide+5",
      },
    ],
  },
  render: Gallery6,
};

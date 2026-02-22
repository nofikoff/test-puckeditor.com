"use client";

import type { ComponentConfig } from "@measured/puck";
import { Stats8 } from "@/components/stats8";

// -- Stats6 --
// className-only block: all text is hardcoded. Inline JSX with parameterized content.

type Stats6Props = {
  heading: string;
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonText: string;
  secondaryButtonUrl: string;
  stats: { value: string; label: string }[];
};

export const ShadcnStats6Config: ComponentConfig<Stats6Props> = {
  label: "SB: Stats \u2014 With CTA Buttons",
  fields: {
    heading: {
      type: "text",
      label: "Heading",
    },
    primaryButtonText: {
      type: "text",
      label: "Primary Button Text",
    },
    primaryButtonUrl: {
      type: "text",
      label: "Primary Button URL",
    },
    secondaryButtonText: {
      type: "text",
      label: "Secondary Button Text",
    },
    secondaryButtonUrl: {
      type: "text",
      label: "Secondary Button URL",
    },
    stats: {
      type: "array",
      label: "Statistics",
      arrayFields: {
        value: { type: "text", label: "Value" },
        label: { type: "text", label: "Label" },
      },
    },
  },
  defaultProps: {
    heading: "Platform Performance Insights",
    primaryButtonText: "Get Started",
    primaryButtonUrl: "#",
    secondaryButtonText: "Learn More",
    secondaryButtonUrl: "#",
    stats: [
      { value: "90%", label: "Metric 1" },
      { value: "200+", label: "Metric 2" },
      { value: "99%", label: "Metric 3" },
      { value: "150+", label: "Metric 4" },
    ],
  },
  render: ({
    heading,
    primaryButtonText,
    primaryButtonUrl,
    secondaryButtonText,
    secondaryButtonUrl,
    stats,
  }) => {
    return (
      <section className="bg-accent py-32">
        <div className="container flex flex-col items-start text-left">
          <div className="mb-12 w-full md:mb-16">
            <h2 className="mb-8 w-full max-w-[24rem] text-3xl font-bold text-pretty sm:text-4xl md:max-w-[30rem] lg:max-w-[37rem] lg:text-5xl">
              {heading}
            </h2>
            <div className="flex flex-col justify-start gap-2 sm:flex-row">
              <a
                href={primaryButtonUrl}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 w-full sm:w-auto"
              >
                {primaryButtonText}
              </a>
              <a
                href={secondaryButtonUrl}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground w-full sm:w-auto"
              >
                {secondaryButtonText}
              </a>
            </div>
          </div>
          <div className="grid w-full grid-cols-2 gap-12 sm:w-fit sm:grid-cols-4 lg:gap-16">
            {stats.map((stat, index) => (
              <div key={index} className="w-full">
                <div className="mb-2 text-4xl font-semibold sm:text-4xl lg:text-5xl">
                  {stat.value}
                </div>
                <div className="text-base leading-6 text-muted-foreground lg:text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  },
};

// -- Stats8 --
// Well-parameterized: heading, description, link, stats (array)

type Stats8Props = {
  heading: string;
  description: string;
  linkText: string;
  linkUrl: string;
  stats: { value: string; label: string }[];
};

export const ShadcnStats8Config: ComponentConfig<Stats8Props> = {
  label: "SB: Stats \u2014 With Link",
  fields: {
    heading: {
      type: "text",
      label: "Heading",
    },
    description: {
      type: "textarea",
      label: "Description",
    },
    linkText: {
      type: "text",
      label: "Link Text",
    },
    linkUrl: {
      type: "text",
      label: "Link URL",
    },
    stats: {
      type: "array",
      label: "Statistics",
      arrayFields: {
        value: { type: "text", label: "Value" },
        label: { type: "text", label: "Label" },
      },
    },
  },
  defaultProps: {
    heading: "Platform performance insights",
    description: "Ensuring stability and scalability for all users",
    linkText: "Read the full impact report",
    linkUrl: "#",
    stats: [
      {
        value: "250%+",
        label: "average growth in user engagement",
      },
      {
        value: "$2.5m",
        label: "annual savings per enterprise partner",
      },
      {
        value: "200+",
        label: "integrations with top industry platforms",
      },
      {
        value: "99.9%",
        label: "customer satisfaction over the last year",
      },
    ],
  },
  render: ({ heading, description, linkText, linkUrl, stats }) => {
    const statsWithIds = stats.map((stat, index) => ({
      id: `stat-${index + 1}`,
      value: stat.value,
      label: stat.label,
    }));
    return (
      <Stats8
        heading={heading}
        description={description}
        link={{ text: linkText, url: linkUrl }}
        stats={statsWithIds}
      />
    );
  },
};

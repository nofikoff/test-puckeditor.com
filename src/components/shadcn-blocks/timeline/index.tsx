"use client";

import React from "react";
import { ComponentConfig } from "@measured/puck";
import { Timeline3 } from "@/components/timeline3";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// -- Timeline3 Config (well-parameterized, delegate to component) --

interface Timeline3Feature {
  image: string;
  title: string;
  description: string;
}

interface Timeline3Props {
  heading: string;
  description: string;
  buttons: {
    primary: { text: string; url: string };
    secondary: { text: string; url: string };
  };
  features?: Timeline3Feature[];
}

export const ShadcnTimeline3Config: ComponentConfig<Timeline3Props> = {
  label: "SB: Timeline \u2014 Sticky Sidebar with Cards",
  fields: {
    heading: {
      type: "text",
      label: "Heading",
    },
    description: {
      type: "textarea",
      label: "Description",
    },
    buttons: {
      type: "object",
      label: "Buttons",
      objectFields: {
        primary: {
          type: "object",
          label: "Primary Button",
          objectFields: {
            text: {
              type: "text",
              label: "Button Text",
            },
            url: {
              type: "text",
              label: "Button URL",
            },
          },
        },
        secondary: {
          type: "object",
          label: "Secondary Button",
          objectFields: {
            text: {
              type: "text",
              label: "Button Text",
            },
            url: {
              type: "text",
              label: "Button URL",
            },
          },
        },
      },
    },
    features: {
      type: "array",
      label: "Timeline Features",
      arrayFields: {
        image: {
          type: "text",
          label: "Image URL",
        },
        title: {
          type: "text",
          label: "Title",
        },
        description: {
          type: "textarea",
          label: "Description",
        },
      },
    },
  },
  defaultProps: {
    heading: "Experience the difference with us",
    description:
      "We believe in creating lasting partnerships with our clients, focusing on long-term success through collaborative innovation and dedicated support.",
    buttons: {
      primary: {
        text: "Start Now",
        url: "#",
      },
      secondary: {
        text: "Book a demo",
        url: "#",
      },
    },
    features: [
      {
        image: "https://placehold.co/600x400/e2e8f0/475569?text=Dedicated+Support",
        title: "Dedicated Support",
        description:
          "Expanded operations to 5 new countries, reaching millions of new users.",
      },
      {
        image: "https://placehold.co/600x400/e2e8f0/475569?text=Series+B+Funding",
        title: "Series B Funding",
        description:
          "Secured $50M in Series B funding to accelerate product development.",
      },
      {
        image: "https://placehold.co/600x400/e2e8f0/475569?text=Product+Launch",
        title: "Product Launch",
        description: "Successfully launched our flagship product to market.",
      },
      {
        image: "https://placehold.co/600x400/e2e8f0/475569?text=Company+Founded",
        title: "Company Founded",
        description: "Started with a vision to revolutionize the industry.",
      },
    ],
  },
  render: Timeline3,
};

// -- Timeline9 Config (className-only, all data hardcoded - fully parameterized inline) --

interface Timeline9Entry {
  date: string;
  title: string;
  content: string;
}

interface Timeline9Props {
  heading?: string;
  entries?: Timeline9Entry[];
}

const Timeline9Render = ({
  heading = "The History of Artificial Intelligence",
  entries = [],
}: Timeline9Props): React.ReactElement => {
  return (
    <section className="bg-background py-32">
      <div className="container">
        <h1 className="mb-10 text-center text-3xl font-bold tracking-tighter text-foreground sm:text-6xl">
          {heading}
        </h1>
        <div className="relative mx-auto max-w-4xl">
          <Separator
            orientation="vertical"
            className="absolute top-4 left-2 bg-muted"
          />
          {entries.map((entry, index) => (
            <div key={index} className="relative mb-10 pl-8">
              <div className="absolute top-3.5 left-0 flex size-4 items-center justify-center rounded-full bg-foreground" />
              <h4 className="rounded-xl py-2 text-xl font-bold tracking-tight xl:mb-4 xl:px-3">
                {entry.title}
              </h4>
              <h5 className="text-md top-3 -left-34 rounded-xl tracking-tight text-muted-foreground xl:absolute">
                {entry.date}
              </h5>
              <Card className="my-5 border-none shadow-none">
                <CardContent className="px-0 xl:px-2">
                  <div
                    className="prose text-foreground dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: entry.content }}
                  />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ShadcnTimeline9Config: ComponentConfig<Timeline9Props> = {
  label: "SB: Timeline \u2014 Vertical Line with Cards",
  fields: {
    heading: {
      type: "text",
      label: "Heading",
    },
    entries: {
      type: "array",
      label: "Timeline Entries",
      arrayFields: {
        date: {
          type: "text",
          label: "Date / Period",
        },
        title: {
          type: "text",
          label: "Title",
        },
        content: {
          type: "textarea",
          label: "Content (HTML supported)",
        },
      },
    },
  },
  defaultProps: {
    heading: "The History of Artificial Intelligence",
    entries: [
      {
        date: "1956",
        title: "The Birth of AI",
        content:
          "The term 'Artificial Intelligence' was coined at the Dartmouth Conference, marking the official beginning of AI as a field.",
      },
      {
        date: "1966-1973",
        title: "Early Optimism and First AI Winter",
        content:
          "The early years saw significant optimism with programs like ELIZA and SHRDLU. However, by the early 1970s, funding dried up as researchers faced limitations of early computing power.",
      },
      {
        date: "1980-1987",
        title: "Expert Systems and Revival",
        content:
          "AI experienced a revival with the development of expert systems like MYCIN and DENDRAL, leading to renewed interest and funding in AI research.",
      },
      {
        date: "1997",
        title: "Deep Blue Defeats Chess Champion",
        content:
          "IBM's Deep Blue became the first computer system to defeat a reigning world chess champion, demonstrating AI's potential in complex strategic games.",
      },
    ],
  },
  render: Timeline9Render,
};

"use client";

import type { ComponentConfig } from "@measured/puck";
import { Pricing2 } from "@/components/pricing2";
import { Pricing4 } from "@/components/pricing4";
import { Pricing6 } from "@/components/pricing6";

// --- Pricing2 adapter ---

type Pricing2Plan = {
  name: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: string;
  buttonText: string;
  buttonUrl: string;
};

type ShadcnPricing2Props = {
  heading: string;
  description: string;
  plans: Pricing2Plan[];
};

export const ShadcnPricing2Config: ComponentConfig<ShadcnPricing2Props> = {
  label: "SB: Pricing \u2014 Cards with Monthly/Yearly Toggle",
  fields: {
    heading: { type: "text", label: "Heading" },
    description: { type: "text", label: "Description" },
    plans: {
      type: "array",
      label: "Plans",
      arrayFields: {
        name: { type: "text", label: "Name" },
        description: { type: "text", label: "Description" },
        monthlyPrice: { type: "text", label: "Monthly Price" },
        yearlyPrice: { type: "text", label: "Yearly Price" },
        features: { type: "textarea", label: "Features (one per line)" },
        buttonText: { type: "text", label: "Button Text" },
        buttonUrl: { type: "text", label: "Button URL" },
      },
    },
  },
  defaultProps: {
    heading: "Pricing",
    description: "Check out our affordable pricing plans",
    plans: [
      {
        name: "Plus",
        description: "For personal use",
        monthlyPrice: "$19",
        yearlyPrice: "$179",
        features:
          "Up to 5 team members\nBasic components library\nCommunity support\n1GB storage space",
        buttonText: "Purchase",
        buttonUrl: "#",
      },
      {
        name: "Pro",
        description: "For professionals",
        monthlyPrice: "$49",
        yearlyPrice: "$359",
        features:
          "Unlimited team members\nAdvanced components\nPriority support\nUnlimited storage",
        buttonText: "Purchase",
        buttonUrl: "#",
      },
    ],
  },
  render: ({ heading, description, plans }) => {
    const mapped = plans.map((p, i) => ({
      id: String(i),
      name: p.name,
      description: p.description,
      monthlyPrice: p.monthlyPrice,
      yearlyPrice: p.yearlyPrice,
      features: p.features
        .split("\n")
        .filter(Boolean)
        .map((text) => ({ text })),
      button: { text: p.buttonText, url: p.buttonUrl },
    }));
    return <Pricing2 heading={heading} description={description} plans={mapped} />;
  },
};

// --- Pricing4 adapter ---

type Pricing4Plan = {
  name: string;
  badge: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: string;
  buttonText: string;
  isPopular: string;
};

type ShadcnPricing4Props = {
  title: string;
  description: string;
  plans: Pricing4Plan[];
};

export const ShadcnPricing4Config: ComponentConfig<ShadcnPricing4Props> = {
  label: "SB: Pricing \u2014 Columns with Radio Toggle",
  fields: {
    title: { type: "text", label: "Title" },
    description: { type: "text", label: "Description" },
    plans: {
      type: "array",
      label: "Plans",
      arrayFields: {
        name: { type: "text", label: "Name" },
        badge: { type: "text", label: "Badge Text" },
        monthlyPrice: { type: "text", label: "Monthly Price" },
        yearlyPrice: { type: "text", label: "Yearly Price" },
        features: { type: "textarea", label: "Features (one per line)" },
        buttonText: { type: "text", label: "Button Text" },
        isPopular: {
          type: "radio",
          label: "Popular?",
          options: [
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ],
        },
      },
    },
  },
  defaultProps: {
    title: "Pricing",
    description: "Check out our affordable pricing plans.",
    plans: [
      {
        name: "Free",
        badge: "Free",
        monthlyPrice: "$0",
        yearlyPrice: "$0",
        features:
          "Unlimited Integrations\nWindows, Linux, Mac support\n24/7 Support\nFree updates",
        buttonText: "Get Started",
        isPopular: "false",
      },
      {
        name: "Pro",
        badge: "Pro",
        monthlyPrice: "$29",
        yearlyPrice: "$249",
        features:
          "Everything in FREE\nLive call support every month\nUnlimited Storage",
        buttonText: "Purchase",
        isPopular: "false",
      },
      {
        name: "Elite",
        badge: "Elite",
        monthlyPrice: "$59",
        yearlyPrice: "$549",
        features:
          "Everything in PRO\nAdvanced analytics\nCustom branding\nUnlimited users",
        buttonText: "Purchase",
        isPopular: "true",
      },
    ],
  },
  render: ({ title, description, plans }) => {
    const mapped = plans.map((p) => ({
      name: p.name,
      badge: p.badge,
      monthlyPrice: p.monthlyPrice,
      yearlyPrice: p.yearlyPrice,
      features: p.features.split("\n").filter(Boolean),
      buttonText: p.buttonText,
      isPopular: p.isPopular === "true",
    }));
    return <Pricing4 title={title} description={description} plans={mapped} />;
  },
};

// --- Pricing6 adapter ---

type ShadcnPricing6Props = {
  heading: string;
  description: string;
  price: string;
  priceSuffix: string;
  features: string;
  buttonText: string;
};

export const ShadcnPricing6Config: ComponentConfig<ShadcnPricing6Props> = {
  label: "SB: Pricing \u2014 Single Plan Card",
  fields: {
    heading: { type: "text", label: "Heading" },
    description: { type: "text", label: "Description" },
    price: { type: "text", label: "Price (number only)" },
    priceSuffix: { type: "text", label: "Price Suffix" },
    features: {
      type: "textarea",
      label: "Features (groups separated by blank line, items by newline)",
    },
    buttonText: { type: "text", label: "Button Text" },
  },
  defaultProps: {
    heading: "Pricing",
    description: "Simple pricing with a free 7 day trial.",
    price: "29",
    priceSuffix: "/mo",
    features:
      "Unlimited\nIntegrations\n24/7 support\n\nLive collaborations\nUnlimited storage\n30-day money back\n\nUnlimited members\nCustomization\nUnlimited users",
    buttonText: "Start free trial",
  },
  render: ({ heading, description, price, priceSuffix, features, buttonText }) => {
    const groups = features.split("\n\n").map((group) =>
      group.split("\n").filter(Boolean),
    );
    return (
      <Pricing6
        heading={heading}
        description={description}
        price={price}
        priceSuffix={priceSuffix}
        features={groups}
        buttonText={buttonText}
      />
    );
  },
};

// --- Pricing11 adapter (className-only, inline JSX) ---

import { Check, ChevronDown, Info, X } from "lucide-react";
import { Fragment, useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Pricing11Plan = {
  title: string;
  monthlyPrice: string;
  yearlyPrice: string;
  isRecommended: string;
};

type Pricing11FeatureInclusion = {
  value: string;
  type: string;
};

type Pricing11Feature = {
  title: string;
  info: string;
  inclusions: string;
};

type Pricing11Category = {
  title: string;
  features: Pricing11Feature[];
};

type ShadcnPricing11Props = {
  heading: string;
  description: string;
  plans: Pricing11Plan[];
  featureCategories: Pricing11Category[];
  caveatText: string;
};

const InclusionCell = ({ value, type }: { value: string; type: string }) => {
  if (type === "check") return <Check className="size-4 lg:size-5" />;
  if (type === "x")
    return <X className="size-4 text-muted-foreground lg:size-5" />;
  if (type === "badge") return <Badge>{value}</Badge>;
  return <span>{value}</span>;
};

const Pricing11Render = ({
  heading,
  description,
  plans,
  featureCategories,
  caveatText,
}: ShadcnPricing11Props) => {
  const [billing, setBilling] = useState<"monthly" | "annually">("monthly");

  const parsedCategories = featureCategories.map((cat) => ({
    title: cat.title,
    features: cat.features.map((feat) => {
      const inclusionParts = feat.inclusions.split("\n").filter(Boolean);
      const inclusions = plans.map((plan, idx) => {
        const raw = inclusionParts[idx] || "";
        let type = "text";
        let value = raw;
        if (raw === "[check]") {
          type = "check";
          value = "";
        } else if (raw === "[x]") {
          type = "x";
          value = "";
        } else if (raw.startsWith("[badge]")) {
          type = "badge";
          value = raw.replace("[badge]", "").trim();
        }
        return { plan: plan.title, type, value, content: value };
      });
      return { title: feat.title, info: feat.info, inclusions };
    }),
  }));

  return (
    <section className="py-32">
      <div className="container mb-8 lg:mb-0">
        <div className="grid grid-cols-2 gap-y-12 md:gap-y-16">
          <div className="col-span-2 flex flex-col lg:col-span-1">
            <h1 className="my-6 text-3xl font-bold text-pretty md:text-4xl xl:text-5xl">
              {heading}
            </h1>
            <p className="text-muted-foreground lg:text-xl">{description}</p>
          </div>
        </div>
        <div className="bg-background lg:sticky lg:top-16">
          <div className="mb-8 pt-8">
            <div className="grid items-end gap-6 border-b border-border pb-8 lg:grid-cols-6">
              <div className="col-span-2">
                <div className="flex h-full flex-col justify-end">
                  <span className="mb-2 text-xs font-medium text-muted-foreground">
                    Billing
                  </span>
                  <Tabs
                    value={billing}
                    onValueChange={setBilling as (value: string) => void}
                  >
                    <TabsList>
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                      <TabsTrigger value="annually">Annually</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
              {plans.map((plan) => (
                <div
                  key={plan.title}
                  className="rounded-lg border border-border p-3 2xl:p-4"
                >
                  <h3 className="mb-1 text-xl font-medium xl:text-2xl">
                    {plan.title}
                  </h3>
                  <p className="mb-4 text-sm font-medium text-muted-foreground">
                    {billing === "annually" ? plan.yearlyPrice : plan.monthlyPrice}
                    <span className="hidden 2xl:inline"> / monthly</span>
                  </p>
                  <Button
                    variant={plan.isRecommended === "true" ? "default" : "outline"}
                    className="w-full"
                  >
                    <span className="2xl:hidden">Register</span>
                    <span className="hidden 2xl:inline">
                      Get started for free
                    </span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-8 lg:space-y-14">
          {parsedCategories.map((category) => (
            <div key={category.title}>
              <h3 className="mb-6 text-lg font-medium lg:mb-3">
                {category.title}
              </h3>
              <div className="space-y-4 lg:space-y-0">
                <TooltipProvider delayDuration={150}>
                  {category.features.map((feature) => (
                    <Fragment key={feature.title}>
                      <dl className="hidden grid-cols-6 gap-6 border-b border-border lg:grid">
                        <dt className="col-span-2 justify-between py-4 pb-4">
                          <Tooltip>
                            <h4 className="group flex min-h-6 items-center gap-x-1 font-medium">
                              {feature.title}{" "}
                              {feature.info && (
                                <TooltipTrigger asChild>
                                  <Info className="ml-2 size-4 cursor-pointer text-muted-foreground group-hover:text-accent-foreground" />
                                </TooltipTrigger>
                              )}
                            </h4>
                            {feature.info && (
                              <TooltipContent>{feature.info}</TooltipContent>
                            )}
                          </Tooltip>
                        </dt>
                        {feature.inclusions.map((inclusion) => (
                          <dd
                            key={inclusion.plan}
                            className="hidden py-4 text-sm text-muted-foreground lg:block"
                          >
                            <InclusionCell value={inclusion.value} type={inclusion.type} />
                          </dd>
                        ))}
                      </dl>
                      <Collapsible
                        className="group lg:hidden"
                        defaultOpen={false}
                      >
                        <dl className="border-b border-border">
                          <CollapsibleTrigger className="w-full">
                            <dt className="flex items-center justify-between pb-4">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <h4 className="group flex items-center gap-x-1 text-sm font-medium md:text-base">
                                    {feature.title}
                                    {feature.info && (
                                      <Info className="ml-2 size-4 cursor-pointer text-muted-foreground group-hover:text-accent-foreground" />
                                    )}
                                  </h4>
                                </TooltipTrigger>
                                {feature.info && (
                                  <TooltipContent>
                                    {feature.info}
                                  </TooltipContent>
                                )}
                              </Tooltip>
                              <ChevronDown className='size-5 transition-transform group-data-[state="open"]:rotate-180' />
                            </dt>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            {feature.inclusions.map((inclusion) => (
                              <dd
                                key={inclusion.plan}
                                className="flex items-center border-b border-border py-3 text-xs text-muted-foreground last:border-b-0 md:py-3.5"
                              >
                                <div className="w-1/2 md:w-1/4">
                                  {inclusion.plan}
                                </div>
                                <InclusionCell value={inclusion.value} type={inclusion.type} />
                              </dd>
                            ))}
                          </CollapsibleContent>
                        </dl>
                      </Collapsible>
                    </Fragment>
                  ))}
                </TooltipProvider>
              </div>
            </div>
          ))}
        </div>
        {caveatText && (
          <p className="mt-4 hidden text-xs text-muted-foreground md:block">
            {caveatText}
          </p>
        )}
      </div>
    </section>
  );
};

export const ShadcnPricing11Config: ComponentConfig<ShadcnPricing11Props> = {
  label: "SB: Pricing \u2014 Feature Comparison Table",
  fields: {
    heading: { type: "text", label: "Heading" },
    description: { type: "text", label: "Description" },
    plans: {
      type: "array",
      label: "Plans",
      arrayFields: {
        title: { type: "text", label: "Plan Name" },
        monthlyPrice: { type: "text", label: "Monthly Price" },
        yearlyPrice: { type: "text", label: "Yearly Price" },
        isRecommended: {
          type: "radio",
          label: "Recommended?",
          options: [
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ],
        },
      },
    },
    featureCategories: {
      type: "array",
      label: "Feature Categories",
      arrayFields: {
        title: { type: "text", label: "Category Name" },
        features: {
          type: "array",
          label: "Features",
          arrayFields: {
            title: { type: "text", label: "Feature Name" },
            info: { type: "text", label: "Tooltip Info" },
            inclusions: {
              type: "textarea",
              label:
                "Values per plan (one per line; use [check], [x], or [badge]Label)",
            },
          },
        },
      },
    },
    caveatText: { type: "text", label: "Caveat / Footnote Text" },
  },
  defaultProps: {
    heading: "Pricing Plans",
    description: "Choose the plan that works best for you.",
    plans: [
      {
        title: "Free",
        monthlyPrice: "$9",
        yearlyPrice: "$9",
        isRecommended: "false",
      },
      {
        title: "Basic",
        monthlyPrice: "$50",
        yearlyPrice: "$45",
        isRecommended: "false",
      },
      {
        title: "Team",
        monthlyPrice: "$100",
        yearlyPrice: "$90",
        isRecommended: "true",
      },
      {
        title: "Enterprise",
        monthlyPrice: "$200",
        yearlyPrice: "$160",
        isRecommended: "false",
      },
    ],
    featureCategories: [
      {
        title: "Overview",
        features: [
          {
            title: "Number of products",
            info: "How many products you can manage",
            inclusions: "1\n1\n3\n5",
          },
          {
            title: "Number of transactions",
            info: "Monthly transaction limit",
            inclusions: "30 monthly\nUnlimited\nUnlimited\nUnlimited",
          },
        ],
      },
      {
        title: "Other features",
        features: [
          {
            title: "Basic feature",
            info: "",
            inclusions: "[check]\n[check]\n[check]\n[check]",
          },
          {
            title: "Enterprise feature",
            info: "Available only for enterprise",
            inclusions: "[x]\n[x]\n[x]\n[check]",
          },
          {
            title: "Optional feature",
            info: "Can be added as an add-on",
            inclusions: "[x]\n[x]\n[badge]Add-on\n[badge]Add-on",
          },
        ],
      },
    ],
    caveatText: "* Caveats and other conditions",
  },
  render: Pricing11Render,
};

"use client";

import React from "react";
import { ComponentConfig } from "@measured/puck";
import { Book, Menu, MenuIcon, Sunset, Trees, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// -- Navbar1 Config --
// Menu items can have sub-items with icons. Since Puck cannot serialize JSX,
// we map icon names to actual Lucide components at render time.

const iconMap: Record<string, React.ReactNode> = {
  Book: <Book className="size-5 shrink-0" />,
  Trees: <Trees className="size-5 shrink-0" />,
  Sunset: <Sunset className="size-5 shrink-0" />,
  Zap: <Zap className="size-5 shrink-0" />,
};

interface Navbar1SubItem {
  title: string;
  description: string;
  icon: string;
  url: string;
}

interface Navbar1MenuItem {
  title: string;
  url: string;
  items: Navbar1SubItem[];
}

interface Navbar1Props {
  logoTitle?: string;
  logoSrc?: string;
  logoUrl?: string;
  menu?: Navbar1MenuItem[];
  loginTitle?: string;
  loginUrl?: string;
  signupTitle?: string;
  signupUrl?: string;
}

const Navbar1SubMenuLink = ({
  item,
}: {
  item: Navbar1SubItem;
}) => {
  return (
    <a
      className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      <div className="text-foreground">
        {iconMap[item.icon] || <Zap className="size-5 shrink-0" />}
      </div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

const Navbar1Render = ({
  logoTitle = "Company",
  logoSrc = "https://placehold.co/32x32/333/fff?text=L",
  logoUrl = "#",
  menu = [],
  loginTitle = "Login",
  loginUrl = "#",
  signupTitle = "Sign up",
  signupUrl = "#",
}: Navbar1Props): React.ReactElement => {
  return (
    <section className="py-4">
      <div className="container">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            <a href={logoUrl} className="flex items-center gap-2">
              <img
                src={logoSrc}
                className="max-h-8 dark:invert"
                alt={logoTitle}
              />
              <span className="text-lg font-semibold tracking-tighter">
                {logoTitle}
              </span>
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => {
                    if (item.items && item.items.length > 0) {
                      return (
                        <NavigationMenuItem key={item.title}>
                          <NavigationMenuTrigger>
                            {item.title}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent className="bg-popover text-popover-foreground">
                            {item.items.map((subItem) => (
                              <NavigationMenuLink
                                asChild
                                key={subItem.title}
                                className="w-80"
                              >
                                <Navbar1SubMenuLink item={subItem} />
                              </NavigationMenuLink>
                            ))}
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      );
                    }
                    return (
                      <NavigationMenuItem key={item.title}>
                        <NavigationMenuLink
                          href={item.url}
                          className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
                        >
                          {item.title}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <a href={loginUrl}>{loginTitle}</a>
            </Button>
            <Button asChild size="sm">
              <a href={signupUrl}>{signupTitle}</a>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <a href={logoUrl} className="flex items-center gap-2">
              <img
                src={logoSrc}
                className="max-h-8 dark:invert"
                alt={logoTitle}
              />
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logoUrl} className="flex items-center gap-2">
                      <img
                        src={logoSrc}
                        className="max-h-8 dark:invert"
                        alt={logoTitle}
                      />
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => {
                      if (item.items && item.items.length > 0) {
                        return (
                          <AccordionItem
                            key={item.title}
                            value={item.title}
                            className="border-b-0"
                          >
                            <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
                              {item.title}
                            </AccordionTrigger>
                            <AccordionContent className="mt-2">
                              {item.items.map((subItem) => (
                                <Navbar1SubMenuLink
                                  key={subItem.title}
                                  item={subItem}
                                />
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        );
                      }
                      return (
                        <a
                          key={item.title}
                          href={item.url}
                          className="text-md font-semibold"
                        >
                          {item.title}
                        </a>
                      );
                    })}
                  </Accordion>
                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline">
                      <a href={loginUrl}>{loginTitle}</a>
                    </Button>
                    <Button asChild>
                      <a href={signupUrl}>{signupTitle}</a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ShadcnNavbar1Config: ComponentConfig<Navbar1Props> = {
  label: "SB: Navbar \u2014 Mega Menu with Sub-items",
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
    menu: {
      type: "array",
      label: "Menu Items",
      arrayFields: {
        title: {
          type: "text",
          label: "Menu Title",
        },
        url: {
          type: "text",
          label: "Menu URL",
        },
        items: {
          type: "array",
          label: "Sub-items (leave empty for simple link)",
          arrayFields: {
            title: {
              type: "text",
              label: "Sub-item Title",
            },
            description: {
              type: "text",
              label: "Sub-item Description",
            },
            icon: {
              type: "select",
              label: "Icon",
              options: [
                { label: "Book", value: "Book" },
                { label: "Trees", value: "Trees" },
                { label: "Sunset", value: "Sunset" },
                { label: "Zap", value: "Zap" },
              ],
            },
            url: {
              type: "text",
              label: "Sub-item URL",
            },
          },
        },
      },
    },
    loginTitle: {
      type: "text",
      label: "Login Button Text",
    },
    loginUrl: {
      type: "text",
      label: "Login Button URL",
    },
    signupTitle: {
      type: "text",
      label: "Sign Up Button Text",
    },
    signupUrl: {
      type: "text",
      label: "Sign Up Button URL",
    },
  },
  defaultProps: {
    logoTitle: "Company",
    logoSrc: "https://placehold.co/32x32/333/fff?text=L",
    logoUrl: "#",
    menu: [
      { title: "Home", url: "#", items: [] },
      {
        title: "Products",
        url: "#",
        items: [
          {
            title: "Blog",
            description: "The latest industry news, updates, and info",
            icon: "Book",
            url: "#",
          },
          {
            title: "Company",
            description: "Our mission is to innovate and empower the world",
            icon: "Trees",
            url: "#",
          },
          {
            title: "Careers",
            description: "Browse job listing and discover our workspace",
            icon: "Sunset",
            url: "#",
          },
          {
            title: "Support",
            description:
              "Get in touch with our support team or visit our community forums",
            icon: "Zap",
            url: "#",
          },
        ],
      },
      {
        title: "Resources",
        url: "#",
        items: [
          {
            title: "Help Center",
            description: "Get all the answers you need right here",
            icon: "Zap",
            url: "#",
          },
          {
            title: "Contact Us",
            description: "We are here to help you with any questions you have",
            icon: "Sunset",
            url: "#",
          },
          {
            title: "Status",
            description: "Check the current status of our services and APIs",
            icon: "Trees",
            url: "#",
          },
          {
            title: "Terms of Service",
            description: "Our terms and conditions for using our services",
            icon: "Book",
            url: "#",
          },
        ],
      },
      { title: "Pricing", url: "#", items: [] },
      { title: "Blog", url: "#", items: [] },
    ],
    loginTitle: "Login",
    loginUrl: "#",
    signupTitle: "Sign up",
    signupUrl: "#",
  },
  render: Navbar1Render,
};

// -- Navbar5 Config (className-only, all hardcoded - fully parameterized inline) --

interface Navbar5Feature {
  title: string;
  description: string;
  href: string;
}

interface Navbar5NavLink {
  title: string;
  href: string;
}

interface Navbar5Props {
  logoTitle?: string;
  logoSrc?: string;
  logoUrl?: string;
  features?: Navbar5Feature[];
  navLinks?: Navbar5NavLink[];
  signInText?: string;
  ctaText?: string;
}

const Navbar5Render = ({
  logoTitle = "Company",
  logoSrc = "https://placehold.co/32x32/333/fff?text=L",
  logoUrl = "#",
  features = [],
  navLinks = [],
  signInText = "Sign in",
  ctaText = "Start for free",
}: Navbar5Props): React.ReactElement => {
  return (
    <section className="py-4">
      <div className="container">
        <nav className="flex items-center justify-between">
          <a href={logoUrl} className="flex items-center gap-2">
            <img src={logoSrc} className="max-h-8" alt={logoTitle} />
            <span className="text-lg font-semibold tracking-tighter">
              {logoTitle}
            </span>
          </a>
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-2 p-3">
                    {features.map((feature, index) => (
                      <NavigationMenuLink
                        href={feature.href}
                        key={index}
                        className="rounded-md p-3 transition-colors hover:bg-muted/70"
                      >
                        <div>
                          <p className="mb-1 font-semibold text-foreground">
                            {feature.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {navLinks.map((link, idx) => (
                <NavigationMenuItem key={idx}>
                  <NavigationMenuLink
                    href={link.href}
                    className={navigationMenuTriggerStyle()}
                  >
                    {link.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden items-center gap-4 lg:flex">
            <Button variant="outline">{signInText}</Button>
            <Button>{ctaText}</Button>
          </div>
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <a href={logoUrl} className="flex items-center gap-2">
                    <img src={logoSrc} className="max-h-8" alt={logoTitle} />
                    <span className="text-lg font-semibold tracking-tighter">
                      {logoTitle}
                    </span>
                  </a>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">
                <Accordion type="single" collapsible className="mt-4 mb-2">
                  <AccordionItem value="features" className="border-none">
                    <AccordionTrigger className="text-base hover:no-underline">
                      Features
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid md:grid-cols-2">
                        {features.map((feature, index) => (
                          <a
                            href={feature.href}
                            key={index}
                            className="rounded-md p-3 transition-colors hover:bg-muted/70"
                          >
                            <div>
                              <p className="mb-1 font-semibold text-foreground">
                                {feature.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {feature.description}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="flex flex-col gap-6">
                  {navLinks.map((link, idx) => (
                    <a key={idx} href={link.href} className="font-medium">
                      {link.title}
                    </a>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <Button variant="outline">{signInText}</Button>
                  <Button>{ctaText}</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

export const ShadcnNavbar5Config: ComponentConfig<Navbar5Props> = {
  label: "SB: Navbar \u2014 Features Dropdown with Top Sheet",
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
    features: {
      type: "array",
      label: "Feature Items (dropdown grid)",
      arrayFields: {
        title: {
          type: "text",
          label: "Feature Title",
        },
        description: {
          type: "text",
          label: "Feature Description",
        },
        href: {
          type: "text",
          label: "Feature Link URL",
        },
      },
    },
    navLinks: {
      type: "array",
      label: "Navigation Links",
      arrayFields: {
        title: {
          type: "text",
          label: "Link Title",
        },
        href: {
          type: "text",
          label: "Link URL",
        },
      },
    },
    signInText: {
      type: "text",
      label: "Sign In Button Text",
    },
    ctaText: {
      type: "text",
      label: "CTA Button Text",
    },
  },
  defaultProps: {
    logoTitle: "Company",
    logoSrc: "https://placehold.co/32x32/333/fff?text=L",
    logoUrl: "#",
    features: [
      {
        title: "Dashboard",
        description: "Overview of your activity",
        href: "#",
      },
      {
        title: "Analytics",
        description: "Track your performance",
        href: "#",
      },
      {
        title: "Settings",
        description: "Configure your preferences",
        href: "#",
      },
      {
        title: "Integrations",
        description: "Connect with other tools",
        href: "#",
      },
      {
        title: "Storage",
        description: "Manage your files",
        href: "#",
      },
      {
        title: "Support",
        description: "Get help when needed",
        href: "#",
      },
    ],
    navLinks: [
      { title: "Products", href: "#" },
      { title: "Resources", href: "#" },
      { title: "Contact", href: "#" },
    ],
    signInText: "Sign in",
    ctaText: "Start for free",
  },
  render: Navbar5Render,
};

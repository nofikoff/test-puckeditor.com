"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import React from "react";

export type RootProps = {
  children: React.ReactNode;
  editMode?: boolean;
  siteName: string;
  logoUrl: string;
  navLinks: Array<{ label: string; href: string }>;
  ctaText: string;
  ctaHref: string;
  footerDescription: string;
  footerLinks: Array<{ title: string; items: string }>;
  socialLinks: {
    facebook: string;
    twitter: string;
    linkedin: string;
    github: string;
  };
  copyright: string;
};

export function PuckRoot({
  children,
  editMode,
  siteName,
  logoUrl,
  navLinks,
  ctaText,
  ctaHref,
  footerDescription,
  footerLinks,
  socialLinks,
  copyright,
}: RootProps) {
  const pathname = usePathname();

  // Generate dynamic editor link based on current page
  const editorLink = `/editor?path=${pathname === "/" ? "/" : pathname}`;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-background shadow-sm sticky top-0 z-50">
        <nav className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              {logoUrl && (
                <img src={logoUrl} alt={siteName} className="h-8 w-auto" />
              )}
              <span className="text-xl font-bold text-foreground">{siteName}</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <LocaleSwitcher />
              {ctaText && (
                <Link
                  href={editorLink}
                  className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition"
                >
                  {ctaText}
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-foreground text-muted-foreground py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold text-background mb-4">{siteName}</h3>
              <p className="text-muted-foreground mb-4">{footerDescription}</p>
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.facebook && (
                  <a href={socialLinks.facebook} className="text-muted-foreground hover:text-background transition">
                    <span className="text-xl">📘</span>
                  </a>
                )}
                {socialLinks.twitter && (
                  <a href={socialLinks.twitter} className="text-muted-foreground hover:text-background transition">
                    <span className="text-xl">🐦</span>
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a href={socialLinks.linkedin} className="text-muted-foreground hover:text-background transition">
                    <span className="text-xl">💼</span>
                  </a>
                )}
                {socialLinks.github && (
                  <a href={socialLinks.github} className="text-muted-foreground hover:text-background transition">
                    <span className="text-xl">🐙</span>
                  </a>
                )}
              </div>
            </div>

            {/* Footer Link Columns */}
            {footerLinks.map((column, i) => (
              <div key={i}>
                <h4 className="font-semibold text-background mb-4">{column.title}</h4>
                <ul className="space-y-2">
                  {column.items.split("\n").filter(Boolean).map((item, j) => (
                    <li key={j}>
                      <a href="#" className="hover:text-background transition">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-muted-foreground/20 pt-8 text-center">
            <p className="text-muted-foreground">{copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

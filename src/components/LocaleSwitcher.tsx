"use client";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function LocaleSwitcher() {
  const router = useRouter();
  const locale = useLocale();

  const switchLocale = async () => {
    const newLocale = locale === "en" ? "sr" : "en";
    await fetch("/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: newLocale }),
    });
    router.refresh();
  };

  return (
    <Button variant="ghost" size="sm" onClick={switchLocale} title="Switch language">
      <Globe className="h-4 w-4 mr-1" />
      {locale.toUpperCase()}
    </Button>
  );
}

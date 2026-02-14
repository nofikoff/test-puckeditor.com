"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const newLocale = locale === "en" ? "sr" : "en";
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <Button variant="ghost" size="sm" onClick={switchLocale} title="Switch language">
      <Globe className="h-4 w-4 mr-1" />
      {locale.toUpperCase()}
    </Button>
  );
}

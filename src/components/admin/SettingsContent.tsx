"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Save } from "lucide-react";
import type { SiteSettings, ThemeSettings } from "@/lib/data/settings";
import { DEFAULT_THEME } from "@/lib/data/settings";
import { hexToHsl, hslToHex } from "@/lib/color-utils";

type MenuItem = { id: string; label: string; url: string };

type SettingsContentProps = {
  initialSettings: SiteSettings;
};

const RADIUS_OPTIONS = [
  { value: "0", label: "0 (None)" },
  { value: "0.25rem", label: "0.25rem (Small)" },
  { value: "0.5rem", label: "0.5rem (Default)" },
  { value: "0.75rem", label: "0.75rem (Large)" },
  { value: "1rem", label: "1rem (Extra Large)" },
];

const FONT_OPTIONS = [
  { value: "Inter", label: "Inter" },
  { value: "Roboto", label: "Roboto" },
  { value: "Open Sans", label: "Open Sans" },
  { value: "System", label: "System Default" },
];

function ColorPickerField({
  label,
  hslValue,
  onChange,
}: {
  label: string;
  hslValue: string;
  onChange: (hsl: string) => void;
}) {
  const hexValue = hslToHex(hslValue);

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={hexValue}
          onChange={(e) => onChange(hexToHsl(e.target.value))}
          className="h-10 w-14 cursor-pointer rounded border p-1"
        />
        <Input
          value={hexValue}
          onChange={(e) => {
            const v = e.target.value;
            if (/^#[0-9a-fA-F]{6}$/.test(v)) {
              onChange(hexToHsl(v));
            }
          }}
          placeholder="#000000"
          className="w-28 font-mono text-sm"
        />
        <span className="text-xs text-muted-foreground font-mono">{hslValue}</span>
      </div>
    </div>
  );
}

function ThemePreview({ theme }: { theme: ThemeSettings }) {
  const fontStack =
    theme.fontFamily === "System"
      ? "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      : `'${theme.fontFamily}', sans-serif`;

  const style = {
    "--preview-primary": `hsl(${theme.primaryColor})`,
    "--preview-secondary": `hsl(${theme.secondaryColor})`,
    "--preview-accent": `hsl(${theme.accentColor})`,
    "--preview-radius": theme.radius,
    fontFamily: fontStack,
  } as React.CSSProperties;

  return (
    <div className="border rounded-lg p-6" style={style}>
      <p className="text-xs text-muted-foreground mb-3">Live Preview</p>
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Sample Heading</h3>
        <p className="text-sm text-muted-foreground">
          This is how text content will look with the selected font.
        </p>
        <div className="flex gap-2 flex-wrap">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-white"
            style={{
              backgroundColor: "var(--preview-primary)",
              borderRadius: "var(--preview-radius)",
            }}
          >
            Primary Button
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium border"
            style={{
              backgroundColor: "var(--preview-secondary)",
              borderRadius: "var(--preview-radius)",
            }}
          >
            Secondary
          </button>
        </div>
        <div className="flex gap-2">
          <span
            className="px-2 py-0.5 text-xs font-medium text-white"
            style={{
              backgroundColor: "var(--preview-primary)",
              borderRadius: "var(--preview-radius)",
            }}
          >
            Badge
          </span>
          <span
            className="px-2 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: "var(--preview-accent)",
              borderRadius: "var(--preview-radius)",
            }}
          >
            Accent
          </span>
        </div>
        <input
          type="text"
          readOnly
          value="Sample input field"
          className="w-full px-3 py-2 text-sm border"
          style={{ borderRadius: "var(--preview-radius)" }}
        />
      </div>
    </div>
  );
}

export function SettingsContent({ initialSettings }: SettingsContentProps) {
  const t = useTranslations("admin");
  const router = useRouter();
  const { toast } = useToast();
  const [logoUrl, setLogoUrl] = useState(initialSettings.logoUrl);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(
    initialSettings.menuItems.map((item) => ({
      ...item,
      id: crypto.randomUUID(),
    }))
  );
  const [theme, setTheme] = useState<ThemeSettings>(
    initialSettings.theme ?? DEFAULT_THEME
  );
  const [saving, setSaving] = useState(false);

  const updateTheme = (field: keyof ThemeSettings, value: string) => {
    setTheme((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddItem = () => {
    setMenuItems([...menuItems, { id: crypto.randomUUID(), label: "", url: "" }]);
  };

  const handleRemoveItem = (index: number) => {
    setMenuItems(menuItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (
    index: number,
    field: keyof MenuItem,
    value: string
  ) => {
    const updated = [...menuItems];
    updated[index] = { ...updated[index], [field]: value };
    setMenuItems(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = menuItems.map(({ label, url }) => ({ label, url }));
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logoUrl, menuItems: payload, theme }),
      });

      if (res.ok) {
        router.refresh();
        toast({ title: t("settingsSaved"), description: t("settingsSavedDesc") });
      } else {
        const data = await res.json();
        toast({
          title: "Error",
          description: data.error || "Failed to save",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{t("editorHeaderSettings")}</h1>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? t("saving") : t("saveSettings")}
        </Button>
      </div>

      {/* Logo URL */}
      <div className="bg-white rounded-lg border p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">{t("logoUrl")}</h2>
        <Input
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
          placeholder="https://example.com/logo.svg"
        />
        <p className="text-sm text-gray-500 mt-2">{t("logoUrlHint")}</p>
        {logoUrl && (
          <div className="mt-4 p-4 bg-gray-50 rounded border">
            <p className="text-xs text-gray-500 mb-2">{t("preview")}:</p>
            <img
              src={logoUrl}
              alt="Logo preview"
              className="h-8 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}
      </div>

      {/* Menu Items */}
      <div className="bg-white rounded-lg border p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{t("menuItems")}</h2>
          <Button variant="outline" size="sm" onClick={handleAddItem}>
            <Plus className="h-4 w-4 mr-2" />
            {t("addMenuItem")}
          </Button>
        </div>

        {menuItems.length === 0 ? (
          <p className="text-gray-500 text-sm py-8 text-center">
            {t("noMenuItems")}
          </p>
        ) : (
          <div className="space-y-3">
            {menuItems.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <Input
                    value={item.label}
                    onChange={(e) =>
                      handleItemChange(index, "label", e.target.value)
                    }
                    placeholder={t("menuItemLabel")}
                  />
                  <Input
                    value={item.url}
                    onChange={(e) =>
                      handleItemChange(index, "url", e.target.value)
                    }
                    placeholder="https://..."
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Theme Settings */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-6">{t("themeSettings")}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ColorPickerField
              label={t("primaryColor")}
              hslValue={theme.primaryColor}
              onChange={(v) => updateTheme("primaryColor", v)}
            />
            <ColorPickerField
              label={t("secondaryColor")}
              hslValue={theme.secondaryColor}
              onChange={(v) => updateTheme("secondaryColor", v)}
            />
            <ColorPickerField
              label={t("accentColor")}
              hslValue={theme.accentColor}
              onChange={(v) => updateTheme("accentColor", v)}
            />

            <div className="space-y-2">
              <Label>{t("borderRadius")}</Label>
              <Select
                value={theme.radius}
                onValueChange={(v) => updateTheme("radius", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {RADIUS_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t("fontFamily")}</Label>
              <Select
                value={theme.fontFamily}
                onValueChange={(v) => updateTheme("fontFamily", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FONT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <ThemePreview theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
}

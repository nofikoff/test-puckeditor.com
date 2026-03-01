"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, GripVertical, Save } from "lucide-react";
import type { EditorHeaderSettings } from "@/lib/data/settings";

type MenuItem = { label: string; url: string };

type SettingsContentProps = {
  initialSettings: EditorHeaderSettings;
};

export function SettingsContent({ initialSettings }: SettingsContentProps) {
  const t = useTranslations("admin");
  const { toast } = useToast();
  const [logoUrl, setLogoUrl] = useState(initialSettings.logoUrl);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(
    initialSettings.menuItems
  );
  const [saving, setSaving] = useState(false);

  const handleAddItem = () => {
    setMenuItems([...menuItems, { label: "", url: "" }]);
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
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logoUrl, menuItems }),
      });

      if (res.ok) {
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
      <div className="bg-white rounded-lg border p-6">
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
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <GripVertical className="h-4 w-4 text-gray-400 flex-shrink-0" />
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
    </div>
  );
}

import { getSiteSettings } from "@/lib/data";
import { SettingsContent } from "@/components/admin/SettingsContent";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await getSiteSettings();

  return <SettingsContent initialSettings={settings} />;
}

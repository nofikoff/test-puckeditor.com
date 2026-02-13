"use client";
import { useEffect, useState } from "react";
import { Render, Data } from "@measured/puck";
import { config } from "@/lib/puck-config";
import { getPage } from "@/data/demo-pages";

export function PuckPage({ path }: { path: string }) {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    async function loadPage() {
      try {
        const res = await fetch(`/api/pages?path=${encodeURIComponent(path)}&locale=en`);
        if (res.ok) {
          const page = await res.json();
          setData(page.data as Data);
          return;
        }
      } catch { /* fallback below */ }
      setData(getPage(path) as Data);
    }
    loadPage();
  }, [path]);

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return <Render config={config} data={data} />;
}

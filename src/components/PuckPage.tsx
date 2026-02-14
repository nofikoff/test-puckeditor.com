"use client";
import { useEffect, useState } from "react";
import { Render, Data } from "@measured/puck";
import { config } from "@/lib/puck-config";
import { getPage } from "@/data/demo-pages";
import Link from "next/link";

export function PuckPage({ path }: { path: string }) {
  const [data, setData] = useState<Data | null>(null);
  const [notFound, setNotFound] = useState(false);

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

      const demoData = getPage(path);
      if (demoData) {
        setData(demoData as Data);
      } else {
        setNotFound(true);
      }
    }
    loadPage();
  }, [path]);

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-gray-600 mb-8">Page not found</p>
        <Link href="/" className="text-blue-600 hover:underline">Back to Home</Link>
      </div>
    );
  }

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return <Render config={config} data={data} />;
}

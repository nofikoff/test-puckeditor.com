"use client";
import { Puck, Data } from "@measured/puck";
import "@measured/puck/puck.css";
import { config } from "@/lib/puck-config";
import { getPage } from "@/data/demo-pages";
import { useSearchParams, useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

function EditorContent() {
  const searchParams = useSearchParams();
  const params = useParams();
  const path = searchParams.get("path") || "/";
  const locale = params.locale as string || "en";
  const { toast } = useToast();
  const [initialData, setInitialData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPage() {
      try {
        const res = await fetch(`/api/pages?path=${encodeURIComponent(path)}&locale=${locale}`);
        if (res.ok) {
          const page = await res.json();
          setInitialData(page.data as Data);
        } else {
          setInitialData(getPage(path) as Data);
        }
      } catch {
        setInitialData(getPage(path) as Data);
      }
      setLoading(false);
    }
    loadPage();
  }, [path, locale]);

  const handlePublish = async (data: Data) => {
    try {
      const res = await fetch("/api/pages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path,
          locale,
          title: (data.root?.props as Record<string, string>)?.siteName || path,
          data,
          published: true,
        }),
      });

      if (res.ok) {
        toast({ title: "Published", description: `Page "${path}" saved successfully` });
      } else {
        toast({ title: "Error", description: "Failed to save page", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Failed to save page", variant: "destructive" });
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading editor...</div>;
  }

  if (!initialData) {
    return <div className="min-h-screen flex items-center justify-center">No page data found</div>;
  }

  return (
    <div className="min-h-screen">
      <Puck
        config={config}
        data={initialData}
        onPublish={handlePublish}
        headerTitle={`Editing: ${path} (${locale})`}
      />
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading editor...</div>}>
      <EditorContent />
    </Suspense>
  );
}

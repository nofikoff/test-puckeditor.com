"use client";
import { Puck, Data } from "@measured/puck";
import "@measured/puck/puck.css";
import { config } from "@/lib/puck-config";
import { getPage } from "@/data/demo-pages";
import { useSearchParams, useParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "@/i18n/navigation";
import { AIChatPanel } from "@/components/editor/AIChatPanel";

function EditorContent() {
  const searchParams = useSearchParams();
  const params = useParams();
  const path = searchParams.get("path") || "/";
  const locale = params.locale as string || "en";
  const { toast } = useToast();
  const [initialData, setInitialData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const hasUnsavedChanges = useRef(false);

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

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges.current) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  const handleChange = useCallback((data: Data) => {
    if (initialData && JSON.stringify(data) !== JSON.stringify(initialData)) {
      hasUnsavedChanges.current = true;
    } else {
      hasUnsavedChanges.current = false;
    }
  }, [initialData]);

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
        hasUnsavedChanges.current = false;
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
        onChange={handleChange}
        onPublish={handlePublish}
        headerTitle={`Editing: ${path} (${locale})`}
        overrides={{
          headerActions: ({ children }) => (
            <>
              <button
                onClick={() => setShowAIPanel(!showAIPanel)}
                style={{
                  padding: "6px 14px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: showAIPanel ? "#fff" : "#6366f1",
                  background: showAIPanel
                    ? "linear-gradient(135deg, #8b5cf6, #6366f1)"
                    : "transparent",
                  border: showAIPanel ? "none" : "1px solid #6366f1",
                  borderRadius: "6px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.2s",
                }}
              >
                <span style={{ fontSize: "16px" }}>&#9733;</span>
                AI Generate
              </button>
              <Link
                href="/admin"
                style={{
                  padding: "6px 12px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#4b5563",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  textDecoration: "none",
                }}
              >
                Admin Panel
              </Link>
              {children}
            </>
          ),
          puck: ({ children }) => (
            <>
              {children}
              {showAIPanel && (
                <AIChatPanel onClose={() => setShowAIPanel(false)} />
              )}
            </>
          ),
        }}
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

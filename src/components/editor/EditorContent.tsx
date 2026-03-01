"use client";

import { Puck, Data } from "@measured/puck";
import "@measured/puck/puck.css";
import { config } from "@/lib/puck-config";
import { getPage } from "@/data/demo-pages";
import { useSearchParams, useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AIChatPanel } from "@/components/editor/AIChatPanel";
import { EditorHeader } from "@/components/editor/EditorHeader";
import { ComponentSearch } from "@/components/editor/ComponentSearch";
import type { EditorHeaderSettings } from "@/lib/data/settings";

type EditorContentProps = {
  editorSettings: EditorHeaderSettings;
};

export function EditorContent({ editorSettings }: EditorContentProps) {
  const searchParams = useSearchParams();
  const params = useParams();
  const path = searchParams.get("path") || "/";
  const locale = (params.locale as string) || "en";
  const { toast } = useToast();
  const [initialData, setInitialData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const hasUnsavedChanges = useRef(false);

  useEffect(() => {
    async function loadPage() {
      try {
        const res = await fetch(
          `/api/pages?path=${encodeURIComponent(path)}&locale=${locale}`
        );
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

  const handleChange = useCallback(
    (data: Data) => {
      if (initialData && JSON.stringify(data) !== JSON.stringify(initialData)) {
        hasUnsavedChanges.current = true;
      } else {
        hasUnsavedChanges.current = false;
      }
    },
    [initialData]
  );

  const handlePublish = async (data: Data) => {
    try {
      const res = await fetch("/api/pages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path,
          locale,
          title:
            (data.root?.props as Record<string, string>)?.siteName || path,
          data,
          published: true,
        }),
      });

      if (res.ok) {
        hasUnsavedChanges.current = false;
        toast({
          title: "Published",
          description: `Page "${path}" saved successfully`,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to save page",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to save page",
        variant: "destructive",
      });
    }
  };

  const headerTitle = `Editing: ${path} (${locale})`;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading editor...
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No page data found
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Puck
        config={config}
        data={initialData}
        onChange={handleChange}
        onPublish={handlePublish}
        headerTitle={headerTitle}
        overrides={{
          header: ({ actions }) => (
            <EditorHeader
              logoUrl={editorSettings.logoUrl}
              menuItems={editorSettings.menuItems}
              actions={actions}
              headerTitle={headerTitle}
              showAIPanel={showAIPanel}
              onToggleAI={() => setShowAIPanel(!showAIPanel)}
            />
          ),
          components: ({ children }) => (
            <ComponentSearch>{children}</ComponentSearch>
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

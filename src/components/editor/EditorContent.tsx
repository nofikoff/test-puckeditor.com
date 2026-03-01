"use client";

import { Puck, Data } from "@measured/puck";
import "@measured/puck/puck.css";
import { config } from "@/lib/puck-config";
import { getPage } from "@/data/demo-pages";
import { useSearchParams, useParams } from "next/navigation";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Star } from "lucide-react";
import { AIChatPanel } from "@/components/editor/AIChatPanel";
import { EditorHeader } from "@/components/editor/EditorHeader";
import {
  ComponentSidebar,
  SidebarTab,
} from "@/components/editor/ComponentSidebar";
import { useFavoriteBlocks } from "@/components/editor/useFavoriteBlocks";
import type { EditorHeaderSettings } from "@/lib/data/settings";

function ComponentItemWithFavorite({
  children,
  name,
  isFavorite,
  onToggle,
}: {
  children: ReactNode;
  name: string;
  isFavorite: boolean;
  onToggle: (name: string) => void;
}) {
  return (
    <div style={{ position: "relative" }}>
      {children}
      <button
        type="button"
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onToggle(name);
        }}
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          right: "8px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: isFavorite
            ? "var(--puck-color-azure-06, #4a90d9)"
            : "var(--puck-color-grey-07, #aaa)",
          transition: "color 0.15s",
          zIndex: 1,
        }}
      >
        <Star
          size={14}
          fill={isFavorite ? "currentColor" : "none"}
          strokeWidth={2}
        />
      </button>
    </div>
  );
}

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
  const [sidebarTab, setSidebarTab] = useState<SidebarTab>("all");
  const hasUnsavedChanges = useRef(false);
  const { favorites, toggle, isFavorite } = useFavoriteBlocks();

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
            <ComponentSidebar
              favorites={favorites}
              activeTab={sidebarTab}
              onTabChange={setSidebarTab}
            >
              {children}
            </ComponentSidebar>
          ),
          componentItem: ({ children, name }) => (
            <ComponentItemWithFavorite
              name={name}
              isFavorite={isFavorite(name)}
              onToggle={toggle}
            >
              {children}
            </ComponentItemWithFavorite>
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

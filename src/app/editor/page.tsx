"use client";
import { Puck, Data } from "@measured/puck";
import "@measured/puck/puck.css";
import { config } from "@/lib/puck-config";
import { getPage } from "@/data/demo-pages";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function EditorContent() {
  const searchParams = useSearchParams();
  const path = searchParams.get("path") || "/";
  const initialData = getPage(path);

  const handlePublish = async (data: Data) => {
    console.log("Publishing data:", data);
    alert("Page data saved to console! In production, this would save to your database.");
  };

  return (
    <div className="min-h-screen">
      <Puck
        config={config}
        data={initialData as any}
        onPublish={handlePublish}
        headerTitle={`Editing: ${path}`}
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

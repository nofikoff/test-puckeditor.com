import { Suspense } from "react";
import { getSiteSettings } from "@/lib/data";
import { EditorContent } from "@/components/editor/EditorContent";

export const dynamic = "force-dynamic";

export default async function EditorPage() {
  const editorSettings = await getSiteSettings();

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading editor...
        </div>
      }
    >
      <EditorContent editorSettings={editorSettings} />
    </Suspense>
  );
}

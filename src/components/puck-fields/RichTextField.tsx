"use client";
import { TipTapFieldEditor } from "@/components/puck-components/TipTapEditor";

// Custom Puck Field for Rich Text editing
export function RichTextField({
  value,
  onChange,
  readOnly,
}: {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}) {
  if (readOnly) {
    return (
      <div
        className="prose prose-sm max-w-none p-3 bg-gray-50 rounded border"
        dangerouslySetInnerHTML={{ __html: value || "<p>No content</p>" }}
      />
    );
  }

  return <TipTapFieldEditor value={value} onChange={onChange} />;
}

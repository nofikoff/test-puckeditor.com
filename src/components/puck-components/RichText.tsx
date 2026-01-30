"use client";
import { useState, useEffect } from "react";

// Rich Text component using custom field with HTML
export function RichText({
  content,
  className = "",
}: {
  content: string;
  className?: string;
}) {
  return (
    <div
      className={`prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

// For Puck editor - custom field component
// This is a simple implementation. For production, use TipTap, Slate, or similar
export function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [html, setHtml] = useState(value || "");

  useEffect(() => {
    setHtml(value || "");
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setHtml(newValue);
    onChange(newValue);
  };

  // Simple toolbar actions
  const wrapSelection = (tag: string) => {
    const textarea = document.getElementById("rich-text-input") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = html.substring(start, end);
    const before = html.substring(0, start);
    const after = html.substring(end);

    const wrapped = `<${tag}>${selected}</${tag}>`;
    const newHtml = before + wrapped + after;

    setHtml(newHtml);
    onChange(newHtml);
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex gap-1 p-2 bg-gray-100 border-b">
        <button
          type="button"
          onClick={() => wrapSelection("strong")}
          className="px-2 py-1 text-sm font-bold hover:bg-gray-200 rounded"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => wrapSelection("em")}
          className="px-2 py-1 text-sm italic hover:bg-gray-200 rounded"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => wrapSelection("u")}
          className="px-2 py-1 text-sm underline hover:bg-gray-200 rounded"
        >
          U
        </button>
        <button
          type="button"
          onClick={() => wrapSelection("h2")}
          className="px-2 py-1 text-sm hover:bg-gray-200 rounded"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => wrapSelection("h3")}
          className="px-2 py-1 text-sm hover:bg-gray-200 rounded"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => wrapSelection("p")}
          className="px-2 py-1 text-sm hover:bg-gray-200 rounded"
        >
          P
        </button>
      </div>

      {/* Editor */}
      <textarea
        id="rich-text-input"
        value={html}
        onChange={handleChange}
        className="w-full p-3 min-h-[200px] font-mono text-sm focus:outline-none"
        placeholder="Enter HTML content..."
      />

      {/* Preview */}
      <div className="border-t p-3 bg-gray-50">
        <p className="text-xs text-gray-500 mb-2">Preview:</p>
        <div
          className="prose prose-sm"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}

"use client";

import { ReactNode } from "react";

type MenuItem = {
  label: string;
  url: string;
};

type EditorHeaderProps = {
  logoUrl: string;
  menuItems: MenuItem[];
  actions: ReactNode;
  headerTitle: string;
  showAIPanel: boolean;
  onToggleAI: () => void;
};

export function EditorHeader({
  logoUrl,
  menuItems,
  actions,
  headerTitle,
  showAIPanel,
  onToggleAI,
}: EditorHeaderProps) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 16px",
        borderBottom: "1px solid #e5e7eb",
        background: "#fff",
        minHeight: 53,
        gridColumn: "1 / -1",
      }}
    >
      {/* Left: Logo + Title + Nav */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {logoUrl ? (
          <img
            src={logoUrl}
            alt="Logo"
            style={{ height: 28, objectFit: "contain" }}
          />
        ) : (
          <span style={{ fontWeight: 700, fontSize: 16, color: "#111827" }}>
            CMS
          </span>
        )}

        <span
          style={{
            fontSize: 13,
            color: "#6b7280",
            borderLeft: "1px solid #e5e7eb",
            paddingLeft: 16,
          }}
        >
          {headerTitle}
        </span>

        {menuItems.length > 0 && (
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              borderLeft: "1px solid #e5e7eb",
              paddingLeft: 16,
            }}
          >
            {menuItems.map((item) => (
              <a
                key={`${item.label}-${item.url}`}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "4px 10px",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#4b5563",
                  textDecoration: "none",
                  borderRadius: 4,
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f3f4f6")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </div>

      {/* Right: AI button + Admin link + Puck actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button
          onClick={onToggleAI}
          style={{
            padding: "6px 14px",
            fontSize: 14,
            fontWeight: 600,
            color: showAIPanel ? "#fff" : "#6366f1",
            background: showAIPanel
              ? "linear-gradient(135deg, #8b5cf6, #6366f1)"
              : "transparent",
            border: showAIPanel ? "none" : "1px solid #6366f1",
            borderRadius: 6,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            transition: "all 0.2s",
          }}
        >
          <span style={{ fontSize: 16 }}>&#9733;</span>
          AI Generate
        </button>
        <a
          href="/admin"
          style={{
            padding: "6px 12px",
            fontSize: 14,
            fontWeight: 500,
            color: "#4b5563",
            border: "1px solid #d1d5db",
            borderRadius: 6,
            textDecoration: "none",
          }}
        >
          Admin Panel
        </a>
        {actions}
      </div>
    </header>
  );
}

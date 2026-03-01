"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

export type SidebarTab = "all" | "favorites";

type ComponentSidebarProps = {
  children: ReactNode;
  favorites: Set<string>;
  activeTab: SidebarTab;
  onTabChange: (tab: SidebarTab) => void;
};

export function ComponentSidebar({
  children,
  favorites,
  activeTab,
  onTabChange,
}: ComponentSidebarProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>();

  const handleChange = useCallback((value: string) => {
    setQuery(value);
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedQuery(value);
    }, 250);
  }, []);

  useEffect(() => {
    return () => clearTimeout(debounceTimer.current);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const search = debouncedQuery.toLowerCase().trim();

    // Find all drawer items (component items in the list)
    const items = container.querySelectorAll<HTMLElement>(
      '[class*="DrawerItem_"], [class*="DrawerItem-draggable_"]'
    );

    // Filter to top-level DrawerItem elements (not nested children)
    const drawerItems = Array.from(items).filter((el) => {
      const classes = el.className;
      return (
        /\b_DrawerItem_\w+\b/.test(classes) &&
        !/DrawerItem-/.test(classes)
      );
    });

    // Show/hide individual items based on search + favorites filter
    drawerItems.forEach((item) => {
      const nameEl = item.querySelector<HTMLElement>(
        '[class*="DrawerItem-name_"]'
      );
      const text = (nameEl?.textContent ?? "").toLowerCase();

      const matchesSearch = !search || text.includes(search);
      const matchesFavorites =
        activeTab !== "favorites" || favorites.has(nameEl?.textContent ?? "");

      item.style.display = matchesSearch && matchesFavorites ? "" : "none";
    });

    // Hide categories where all items are hidden
    const categories = container.querySelectorAll<HTMLElement>(
      '[class*="ComponentList_"]'
    );

    categories.forEach((category) => {
      const classes = category.className;
      if (!/\b_ComponentList_\w+\b/.test(classes)) return;

      const categoryItems = category.querySelectorAll<HTMLElement>(
        '[class*="DrawerItem_"]'
      );
      const topLevelItems = Array.from(categoryItems).filter(
        (el) =>
          /\b_DrawerItem_\w+\b/.test(el.className) &&
          !/DrawerItem-/.test(el.className)
      );

      const hasVisibleItems = topLevelItems.some(
        (el) => el.style.display !== "none"
      );
      category.style.display = hasVisibleItems ? "" : "none";
    });
  }, [debouncedQuery, activeTab, favorites]);

  const tabStyle = (tab: SidebarTab): React.CSSProperties => ({
    flex: 1,
    padding: "6px 0",
    fontSize: "13px",
    fontWeight: activeTab === tab ? 600 : 400,
    color:
      activeTab === tab
        ? "var(--puck-color-azure-06, #4a90d9)"
        : "var(--puck-color-grey-04, #666)",
    backgroundColor: "transparent",
    border: "none",
    borderBottom:
      activeTab === tab
        ? "2px solid var(--puck-color-azure-06, #4a90d9)"
        : "2px solid transparent",
    cursor: "pointer",
    transition: "color 0.15s, border-color 0.15s",
  });

  return (
    <div
      ref={containerRef}
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <div style={{ padding: "12px 16px 0" }}>
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid var(--puck-color-grey-09, #ddd)",
            marginBottom: "8px",
          }}
        >
          <button
            type="button"
            style={tabStyle("all")}
            onClick={() => onTabChange("all")}
          >
            All
          </button>
          <button
            type="button"
            style={tabStyle("favorites")}
            onClick={() => onTabChange("favorites")}
          >
            Favorites
          </button>
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search blocks..."
          style={{
            width: "100%",
            padding: "8px 12px",
            fontSize: "13px",
            border: "1px solid var(--puck-color-grey-09, #ddd)",
            borderRadius: "4px",
            outline: "none",
            backgroundColor: "var(--puck-color-white, #fff)",
            color: "var(--puck-color-grey-01, #333)",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor =
              "var(--puck-color-azure-06, #4a90d9)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor =
              "var(--puck-color-grey-09, #ddd)";
          }}
        />
      </div>
      <div style={{ flex: 1, overflow: "auto", paddingTop: "8px" }}>
        {children}
      </div>
    </div>
  );
}

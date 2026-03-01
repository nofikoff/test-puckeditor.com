"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

type ComponentSearchProps = {
  children: ReactNode;
};

export function ComponentSearch({ children }: ComponentSearchProps) {
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
      // Match the main DrawerItem container class but not sub-element classes
      return (
        /\b_DrawerItem_\w+\b/.test(classes) &&
        !/DrawerItem-/.test(classes)
      );
    });

    // Show/hide individual items
    drawerItems.forEach((item) => {
      if (!search) {
        item.style.display = "";
        return;
      }

      const nameEl = item.querySelector<HTMLElement>(
        '[class*="DrawerItem-name_"]'
      );
      const text = (nameEl?.textContent ?? "").toLowerCase();
      const matches = text.includes(search);
      item.style.display = matches ? "" : "none";
    });

    // Hide categories where all items are hidden
    const categories = container.querySelectorAll<HTMLElement>(
      '[class*="ComponentList_"]'
    );

    categories.forEach((category) => {
      const classes = category.className;
      // Only process top-level ComponentList containers (class _ComponentList_xxx)
      if (!/\b_ComponentList_\w+\b/.test(classes)) return;

      if (!search) {
        category.style.display = "";
        return;
      }

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
  }, [debouncedQuery]);

  return (
    <div ref={containerRef} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 16px 8px" }}>
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
      <div style={{ flex: 1, overflow: "auto" }}>{children}</div>
    </div>
  );
}

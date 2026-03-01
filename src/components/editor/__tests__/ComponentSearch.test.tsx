import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ComponentSearch } from "../ComponentSearch";

// Helper to create a mock Puck component list DOM structure
function MockComponentList() {
  return (
    <div>
      {/* Category: Hero */}
      <div className="_ComponentList_1rrlt_1 _ComponentList--isExpanded_1rrlt_5">
        <button className="_ComponentList-title_1rrlt_17">
          <div>SB: Hero Sections</div>
        </button>
        <div className="_ComponentList-content_1rrlt_9">
          <div className="_DrawerItem_fkqfo_25">
            <div className="_DrawerItem-draggable_fkqfo_25">
              <div className="_DrawerItem-name_fkqfo_66">Hero Banner</div>
            </div>
          </div>
          <div className="_DrawerItem_fkqfo_25">
            <div className="_DrawerItem-draggable_fkqfo_25">
              <div className="_DrawerItem-name_fkqfo_66">Hero Minimal</div>
            </div>
          </div>
        </div>
      </div>
      {/* Category: Typography */}
      <div className="_ComponentList_1rrlt_1 _ComponentList--isExpanded_1rrlt_5">
        <button className="_ComponentList-title_1rrlt_17">
          <div>Typography (Legacy)</div>
        </button>
        <div className="_ComponentList-content_1rrlt_9">
          <div className="_DrawerItem_fkqfo_25">
            <div className="_DrawerItem-draggable_fkqfo_25">
              <div className="_DrawerItem-name_fkqfo_66">Heading</div>
            </div>
          </div>
          <div className="_DrawerItem_fkqfo_25">
            <div className="_DrawerItem-draggable_fkqfo_25">
              <div className="_DrawerItem-name_fkqfo_66">Text</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

describe("ComponentSearch", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders search input and children", () => {
    render(
      <ComponentSearch>
        <MockComponentList />
      </ComponentSearch>
    );

    expect(screen.getByPlaceholderText("Search blocks...")).toBeTruthy();
    expect(screen.getByText("Hero Banner")).toBeTruthy();
    expect(screen.getByText("Heading")).toBeTruthy();
  });

  it("filters components by name (case-insensitive)", () => {
    render(
      <ComponentSearch>
        <MockComponentList />
      </ComponentSearch>
    );

    const input = screen.getByPlaceholderText("Search blocks...");
    fireEvent.change(input, { target: { value: "hero" } });

    // Wait for debounce
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Hero items should be visible
    const heroBanner = screen.getByText("Hero Banner").closest(
      '[class*="DrawerItem_"]'
    ) as HTMLElement;
    expect(heroBanner.style.display).toBe("");

    // Non-hero items should be hidden
    const heading = screen.getByText("Heading").closest(
      '[class*="DrawerItem_"]'
    ) as HTMLElement;
    expect(heading.style.display).toBe("none");
  });

  it("hides categories with no matching items", () => {
    render(
      <ComponentSearch>
        <MockComponentList />
      </ComponentSearch>
    );

    const input = screen.getByPlaceholderText("Search blocks...");
    fireEvent.change(input, { target: { value: "heading" } });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Typography category should be visible (has "Heading")
    const typographyCategory = screen.getByText("Typography (Legacy)").closest(
      '[class*="ComponentList_"]'
    ) as HTMLElement;
    expect(typographyCategory.style.display).toBe("");

    // Hero category should be hidden (no matches)
    const heroCategory = screen.getByText("SB: Hero Sections").closest(
      '[class*="ComponentList_"]'
    ) as HTMLElement;
    expect(heroCategory.style.display).toBe("none");
  });

  it("restores all items when search is cleared", () => {
    render(
      <ComponentSearch>
        <MockComponentList />
      </ComponentSearch>
    );

    const input = screen.getByPlaceholderText("Search blocks...");

    // Type a search query
    fireEvent.change(input, { target: { value: "hero" } });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Clear search
    fireEvent.change(input, { target: { value: "" } });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // All items should be visible again
    const heading = screen.getByText("Heading").closest(
      '[class*="DrawerItem_"]'
    ) as HTMLElement;
    expect(heading.style.display).toBe("");

    const heroCategory = screen.getByText("SB: Hero Sections").closest(
      '[class*="ComponentList_"]'
    ) as HTMLElement;
    expect(heroCategory.style.display).toBe("");
  });

  it("debounces input to avoid excessive filtering", () => {
    render(
      <ComponentSearch>
        <MockComponentList />
      </ComponentSearch>
    );

    const input = screen.getByPlaceholderText("Search blocks...");

    // Type quickly
    fireEvent.change(input, { target: { value: "h" } });
    fireEvent.change(input, { target: { value: "he" } });
    fireEvent.change(input, { target: { value: "hea" } });

    // Before debounce fires, nothing should be filtered
    const heading = screen.getByText("Heading").closest(
      '[class*="DrawerItem_"]'
    ) as HTMLElement;
    expect(heading.style.display).toBe("");

    // After debounce, only "hea" should be applied
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(heading.style.display).toBe("");

    const heroBanner = screen.getByText("Hero Banner").closest(
      '[class*="DrawerItem_"]'
    ) as HTMLElement;
    expect(heroBanner.style.display).toBe("none");
  });
});

import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ComponentSidebar, SidebarTab } from "../ComponentSidebar";

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

const defaultProps = {
  favorites: new Set<string>(),
  activeTab: "all" as SidebarTab,
  onTabChange: vi.fn(),
};

describe("ComponentSidebar", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders tabs, search input and children", () => {
    render(
      <ComponentSidebar {...defaultProps}>
        <MockComponentList />
      </ComponentSidebar>
    );

    expect(screen.getByText("All")).toBeTruthy();
    expect(screen.getByText("Favorites")).toBeTruthy();
    expect(screen.getByPlaceholderText("Search blocks...")).toBeTruthy();
    expect(screen.getByText("Hero Banner")).toBeTruthy();
    expect(screen.getByText("Heading")).toBeTruthy();
  });

  it("filters components by name (case-insensitive)", () => {
    render(
      <ComponentSidebar {...defaultProps}>
        <MockComponentList />
      </ComponentSidebar>
    );

    const input = screen.getByPlaceholderText("Search blocks...");
    fireEvent.change(input, { target: { value: "hero" } });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    const heroBanner = screen.getByText("Hero Banner").closest(
      '[class*="DrawerItem_"]'
    ) as HTMLElement;
    expect(heroBanner.style.display).toBe("");

    const heading = screen.getByText("Heading").closest(
      '[class*="DrawerItem_"]'
    ) as HTMLElement;
    expect(heading.style.display).toBe("none");
  });

  it("hides categories with no matching items", () => {
    render(
      <ComponentSidebar {...defaultProps}>
        <MockComponentList />
      </ComponentSidebar>
    );

    const input = screen.getByPlaceholderText("Search blocks...");
    fireEvent.change(input, { target: { value: "heading" } });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    const typographyCategory = screen.getByText("Typography (Legacy)").closest(
      '[class*="ComponentList_"]'
    ) as HTMLElement;
    expect(typographyCategory.style.display).toBe("");

    const heroCategory = screen.getByText("SB: Hero Sections").closest(
      '[class*="ComponentList_"]'
    ) as HTMLElement;
    expect(heroCategory.style.display).toBe("none");
  });

  it("restores all items when search is cleared", () => {
    render(
      <ComponentSidebar {...defaultProps}>
        <MockComponentList />
      </ComponentSidebar>
    );

    const input = screen.getByPlaceholderText("Search blocks...");

    fireEvent.change(input, { target: { value: "hero" } });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    fireEvent.change(input, { target: { value: "" } });
    act(() => {
      vi.advanceTimersByTime(300);
    });

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
      <ComponentSidebar {...defaultProps}>
        <MockComponentList />
      </ComponentSidebar>
    );

    const input = screen.getByPlaceholderText("Search blocks...");

    fireEvent.change(input, { target: { value: "h" } });
    fireEvent.change(input, { target: { value: "he" } });
    fireEvent.change(input, { target: { value: "hea" } });

    const heading = screen.getByText("Heading").closest(
      '[class*="DrawerItem_"]'
    ) as HTMLElement;
    expect(heading.style.display).toBe("");

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(heading.style.display).toBe("");

    const heroBanner = screen.getByText("Hero Banner").closest(
      '[class*="DrawerItem_"]'
    ) as HTMLElement;
    expect(heroBanner.style.display).toBe("none");
  });

  it("calls onTabChange when clicking tab buttons", () => {
    const onTabChange = vi.fn();
    render(
      <ComponentSidebar {...defaultProps} onTabChange={onTabChange}>
        <MockComponentList />
      </ComponentSidebar>
    );

    fireEvent.click(screen.getByText("Favorites"));
    expect(onTabChange).toHaveBeenCalledWith("favorites");

    fireEvent.click(screen.getByText("All"));
    expect(onTabChange).toHaveBeenCalledWith("all");
  });

  it("shows only favorited items when favorites tab is active", () => {
    const favorites = new Set(["Hero Banner", "Heading"]);
    render(
      <ComponentSidebar {...defaultProps} favorites={favorites} activeTab="favorites">
        <MockComponentList />
      </ComponentSidebar>
    );

    act(() => {
      vi.advanceTimersByTime(300);
    });

    const heroBanner = screen.getByText("Hero Banner").closest(
      '[class*="DrawerItem_"]'
    ) as HTMLElement;
    expect(heroBanner.style.display).toBe("");

    const heading = screen.getByText("Heading").closest(
      '[class*="DrawerItem_"]'
    ) as HTMLElement;
    expect(heading.style.display).toBe("");

    const heroMinimal = screen.getByText("Hero Minimal").closest(
      '[class*="DrawerItem_"]'
    ) as HTMLElement;
    expect(heroMinimal.style.display).toBe("none");

    const text = screen.getByText("Text").closest(
      '[class*="DrawerItem_"]'
    ) as HTMLElement;
    expect(text.style.display).toBe("none");
  });

  it("combines search and favorites filters", () => {
    const favorites = new Set(["Hero Banner", "Heading"]);
    render(
      <ComponentSidebar {...defaultProps} favorites={favorites} activeTab="favorites">
        <MockComponentList />
      </ComponentSidebar>
    );

    const input = screen.getByPlaceholderText("Search blocks...");
    fireEvent.change(input, { target: { value: "hero" } });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    const heroBanner = screen.getByText("Hero Banner").closest(
      '[class*="DrawerItem_"]'
    ) as HTMLElement;
    expect(heroBanner.style.display).toBe("");

    const heading = screen.getByText("Heading").closest(
      '[class*="DrawerItem_"]'
    ) as HTMLElement;
    expect(heading.style.display).toBe("none");
  });

  it("hides categories with no visible favorites", () => {
    const favorites = new Set(["Heading"]);
    render(
      <ComponentSidebar {...defaultProps} favorites={favorites} activeTab="favorites">
        <MockComponentList />
      </ComponentSidebar>
    );

    act(() => {
      vi.advanceTimersByTime(300);
    });

    const heroCategory = screen.getByText("SB: Hero Sections").closest(
      '[class*="ComponentList_"]'
    ) as HTMLElement;
    expect(heroCategory.style.display).toBe("none");

    const typographyCategory = screen.getByText("Typography (Legacy)").closest(
      '[class*="ComponentList_"]'
    ) as HTMLElement;
    expect(typographyCategory.style.display).toBe("");
  });
});

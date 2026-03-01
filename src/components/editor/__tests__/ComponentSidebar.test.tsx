import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ComponentSidebar, SidebarTab } from "../ComponentSidebar";

function MockComponentList() {
  return (
    <>
      {/* Category: Hero */}
      <div data-testid="category-hero">
        <button>
          <div>SB: Hero Sections</div>
        </button>
        <div>
          <div data-testid="wrapper-hero-banner">
            <div data-puck-component="Hero Banner">Hero Banner</div>
          </div>
          <div data-testid="wrapper-hero-minimal">
            <div data-puck-component="Hero Minimal">Hero Minimal</div>
          </div>
        </div>
      </div>
      {/* Category: Typography */}
      <div data-testid="category-typography">
        <button>
          <div>Typography (Legacy)</div>
        </button>
        <div>
          <div data-testid="wrapper-heading">
            <div data-puck-component="Heading">Heading</div>
          </div>
          <div data-testid="wrapper-text">
            <div data-puck-component="Text">Text</div>
          </div>
        </div>
      </div>
    </>
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

    const heroBannerWrapper = screen.getByTestId("wrapper-hero-banner");
    expect(heroBannerWrapper.style.display).toBe("");

    const headingWrapper = screen.getByTestId("wrapper-heading");
    expect(headingWrapper.style.display).toBe("none");
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

    const typographyCategory = screen.getByTestId("category-typography");
    expect(typographyCategory.style.display).toBe("");

    const heroCategory = screen.getByTestId("category-hero");
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

    const headingWrapper = screen.getByTestId("wrapper-heading");
    expect(headingWrapper.style.display).toBe("");

    const heroCategory = screen.getByTestId("category-hero");
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

    const headingWrapper = screen.getByTestId("wrapper-heading");
    expect(headingWrapper.style.display).toBe("");

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(headingWrapper.style.display).toBe("");

    const heroBannerWrapper = screen.getByTestId("wrapper-hero-banner");
    expect(heroBannerWrapper.style.display).toBe("none");
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

    const heroBannerWrapper = screen.getByTestId("wrapper-hero-banner");
    expect(heroBannerWrapper.style.display).toBe("");

    const headingWrapper = screen.getByTestId("wrapper-heading");
    expect(headingWrapper.style.display).toBe("");

    const heroMinimalWrapper = screen.getByTestId("wrapper-hero-minimal");
    expect(heroMinimalWrapper.style.display).toBe("none");

    const textWrapper = screen.getByTestId("wrapper-text");
    expect(textWrapper.style.display).toBe("none");
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

    const heroBannerWrapper = screen.getByTestId("wrapper-hero-banner");
    expect(heroBannerWrapper.style.display).toBe("");

    const headingWrapper = screen.getByTestId("wrapper-heading");
    expect(headingWrapper.style.display).toBe("none");
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

    const heroCategory = screen.getByTestId("category-hero");
    expect(heroCategory.style.display).toBe("none");

    const typographyCategory = screen.getByTestId("category-typography");
    expect(typographyCategory.style.display).toBe("");
  });
});

import { describe, it, expect, vi } from "vitest";

vi.mock("../generated-schema.json", () => ({
  default: [
    {
      type: "ShadcnHero1",
      label: "SB: Hero — Split Image",
      fields: {
        heading: { type: "text" },
        description: { type: "textarea" },
        layout: {
          type: "select",
          options: [
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
          ],
        },
        items: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            icon: { type: "text" },
          },
        },
        meta: {
          type: "object",
          objectFields: {
            author: { type: "text" },
            date: { type: "text" },
          },
        },
      },
      defaultProps: {
        heading: "Default Heading",
        description: "Default desc",
        layout: "left",
        items: [],
        meta: { author: "", date: "" },
      },
    },
    {
      type: "ShadcnFeature1",
      label: "SB: Feature — Grid",
      fields: {
        title: { type: "text" },
      },
      defaultProps: {
        title: "Features",
      },
    },
  ],
}));

import { extractBlockSchemas, buildBlockSchemaPrompt } from "../schema";

describe("extractBlockSchemas", () => {
  it("returns an array of block schemas", () => {
    const schemas = extractBlockSchemas();
    expect(Array.isArray(schemas)).toBe(true);
    expect(schemas.length).toBe(2);
  });

  it("each schema has required fields", () => {
    const schemas = extractBlockSchemas();
    for (const schema of schemas) {
      expect(schema).toHaveProperty("type");
      expect(schema).toHaveProperty("label");
      expect(schema).toHaveProperty("fields");
      expect(schema).toHaveProperty("defaultProps");
    }
  });
});

describe("buildBlockSchemaPrompt", () => {
  it("includes all block types with proper formatting", () => {
    const prompt = buildBlockSchemaPrompt();
    expect(prompt).toContain("### ShadcnHero1 (SB: Hero — Split Image)");
    expect(prompt).toContain("### ShadcnFeature1 (SB: Feature — Grid)");
    expect(prompt).toContain("Fields:");
  });

  it("renders field options for select/radio values", () => {
    const prompt = buildBlockSchemaPrompt();
    expect(prompt).toContain("layout: select [left, right]");
  });

  it("renders array field metadata", () => {
    const prompt = buildBlockSchemaPrompt();
    expect(prompt).toContain("items: array (array of {title:text, icon:text})");
  });

  it("renders object field metadata", () => {
    const prompt = buildBlockSchemaPrompt();
    expect(prompt).toContain(
      "meta: object (object {author:text, date:text})"
    );
  });
});

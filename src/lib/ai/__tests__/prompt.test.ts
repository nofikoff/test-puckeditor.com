import { describe, it, expect, vi } from "vitest";

vi.mock("../schema", () => ({
  buildBlockSchemaPrompt: () => "### MockBlock (Mock Label)\nFields:\n  - title: text\n",
}));

import { buildSystemPrompt } from "../prompt";

describe("buildSystemPrompt", () => {
  it("returns a non-empty string", () => {
    const prompt = buildSystemPrompt();
    expect(typeof prompt).toBe("string");
    expect(prompt.length).toBeGreaterThan(0);
  });

  it("contains JSON output format specification", () => {
    const prompt = buildSystemPrompt();
    expect(prompt).toContain('"blocks"');
    expect(prompt).toContain('"type"');
    expect(prompt).toContain('"props"');
  });

  it("contains all 11 rules", () => {
    const prompt = buildSystemPrompt();
    for (let i = 1; i <= 11; i++) {
      expect(prompt).toContain(`${i}.`);
    }
  });

  it("includes block schema section", () => {
    const prompt = buildSystemPrompt();
    expect(prompt).toContain("## Available Block Types");
    expect(prompt).toContain("### MockBlock (Mock Label)");
  });

  it("includes examples section", () => {
    const prompt = buildSystemPrompt();
    expect(prompt).toContain("## Examples");
    expect(prompt).toContain("coffee shop");
  });
});

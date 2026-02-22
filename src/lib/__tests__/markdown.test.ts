import { describe, it, expect } from "vitest";
import { htmlToMarkdown, markdownToHtml } from "../markdown";

describe("htmlToMarkdown", () => {
  it('returns "" for empty input', () => {
    expect(htmlToMarkdown("")).toBe("");
  });

  it('returns "" for falsy input', () => {
    expect(htmlToMarkdown(null as unknown as string)).toBe("");
    expect(htmlToMarkdown(undefined as unknown as string)).toBe("");
  });

  it("converts headings to ATX-style markdown", () => {
    expect(htmlToMarkdown("<h1>Title</h1>")).toBe("# Title");
    expect(htmlToMarkdown("<h2>Subtitle</h2>")).toBe("## Subtitle");
    expect(htmlToMarkdown("<h3>Section</h3>")).toBe("### Section");
  });

  it("converts paragraphs to plain text", () => {
    expect(htmlToMarkdown("<p>Hello world</p>")).toBe("Hello world");
  });

  it("converts links to markdown links", () => {
    expect(htmlToMarkdown('<a href="https://example.com">Click</a>')).toBe(
      "[Click](https://example.com)"
    );
  });

  it("converts bold and italic to markdown emphasis", () => {
    expect(htmlToMarkdown("<strong>bold</strong>")).toBe("**bold**");
    expect(htmlToMarkdown("<em>italic</em>")).toBe("_italic_");
  });

  it("converts code blocks to fenced code blocks", () => {
    const html = "<pre><code>const x = 1;</code></pre>";
    const md = htmlToMarkdown(html);
    expect(md).toContain("```");
    expect(md).toContain("const x = 1;");
  });
});

describe("markdownToHtml", () => {
  it('returns "" for empty input', () => {
    expect(markdownToHtml("")).toBe("");
  });

  it('returns "" for falsy input', () => {
    expect(markdownToHtml(null as unknown as string)).toBe("");
    expect(markdownToHtml(undefined as unknown as string)).toBe("");
  });

  it("converts headings to HTML h1-h6", () => {
    expect(markdownToHtml("# Title")).toContain("<h1>Title</h1>");
    expect(markdownToHtml("## Sub")).toContain("<h2>Sub</h2>");
    expect(markdownToHtml("### Third")).toContain("<h3>Third</h3>");
  });

  it("converts links to HTML anchor tags", () => {
    const html = markdownToHtml("[Click](https://example.com)");
    expect(html).toContain('<a href="https://example.com">Click</a>');
  });

  it("converts lists to HTML ul/li", () => {
    const md = "- Item 1\n- Item 2\n- Item 3";
    const html = markdownToHtml(md);
    expect(html).toContain("<ul>");
    expect(html).toContain("<li>Item 1</li>");
    expect(html).toContain("<li>Item 2</li>");
    expect(html).toContain("<li>Item 3</li>");
  });
});

import { describe, it, expect, vi, beforeEach } from "vitest";

const mockCreate = vi.fn();

vi.mock("next-auth", () => ({
  getServerSession: vi.fn(),
}));

vi.mock("openai", () => ({
  default: class MockOpenAI {
    responses = { create: mockCreate };
  },
}));

vi.mock("@/lib/ai/prompt", () => ({
  buildSystemPrompt: () => "mock system prompt",
}));

vi.mock("@/lib/auth", () => ({
  authOptions: {},
}));

import { POST } from "../route";
import { getServerSession } from "next-auth";

function makeRequest(body: unknown): Request {
  return new Request("http://localhost/api/ai/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/ai/generate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.OPENAI_MODEL;
  });

  it("returns 401 when no session", async () => {
    vi.mocked(getServerSession).mockResolvedValue(null);
    const res = await POST(makeRequest({ prompt: "hello" }));
    expect(res.status).toBe(401);
    const json = await res.json();
    expect(json.error).toBe("Unauthorized");
  });

  it("returns 400 when prompt is missing", async () => {
    vi.mocked(getServerSession).mockResolvedValue({ user: { name: "test" } });
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Prompt is required");
  });

  it("returns 400 when prompt is empty string", async () => {
    vi.mocked(getServerSession).mockResolvedValue({ user: { name: "test" } });
    const res = await POST(makeRequest({ prompt: "" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when prompt is non-string", async () => {
    vi.mocked(getServerSession).mockResolvedValue({ user: { name: "test" } });
    const res = await POST(makeRequest({ prompt: 123 }));
    expect(res.status).toBe(400);
  });

  it("builds context message from currentBlocks", async () => {
    vi.mocked(getServerSession).mockResolvedValue({ user: { name: "test" } });
    mockCreate.mockResolvedValue({
      output_text: JSON.stringify({
        blocks: [{ type: "Hero", props: { id: "Hero-abc" } }],
      }),
    });

    await POST(
      makeRequest({
        prompt: "make a page",
        currentBlocks: ["Hero", "Feature"],
      })
    );

    const callArgs = mockCreate.mock.calls[0][0];
    expect(callArgs.input).toContain("Hero, Feature");
    expect(callArgs.input).toContain("Current page already has these blocks");
  });

  it("calls OpenAI Responses API with correct params", async () => {
    vi.mocked(getServerSession).mockResolvedValue({ user: { name: "test" } });
    mockCreate.mockResolvedValue({
      output_text: JSON.stringify({
        blocks: [{ type: "Hero", props: { id: "Hero-abc" } }],
      }),
    });

    await POST(makeRequest({ prompt: "make hero" }));

    expect(mockCreate).toHaveBeenCalledTimes(1);
    const callArgs = mockCreate.mock.calls[0][0];
    expect(callArgs.model).toBe("gpt-4o-mini");
    expect(callArgs.instructions).toBe("mock system prompt");
    expect(callArgs.temperature).toBe(0.7);
    expect(callArgs.max_output_tokens).toBe(4096);
    expect(callArgs.text).toEqual({ format: { type: "json_object" } });
  });

  it("skips temperature for codex models", async () => {
    process.env.OPENAI_MODEL = "codex-mini";
    vi.mocked(getServerSession).mockResolvedValue({ user: { name: "test" } });
    mockCreate.mockResolvedValue({
      output_text: JSON.stringify({
        blocks: [{ type: "Hero", props: { id: "Hero-abc" } }],
      }),
    });

    await POST(makeRequest({ prompt: "make hero" }));

    const callArgs = mockCreate.mock.calls[0][0];
    expect(callArgs.model).toBe("codex-mini");
    expect(callArgs).not.toHaveProperty("temperature");
  });

  it("returns valid blocks from successful AI response", async () => {
    vi.mocked(getServerSession).mockResolvedValue({ user: { name: "test" } });
    mockCreate.mockResolvedValue({
      output_text: JSON.stringify({
        blocks: [
          { type: "Hero", props: { id: "Hero-abc", title: "Hello" } },
          { type: "Feature", props: { id: "Feature-xyz", title: "World" } },
        ],
      }),
    });

    const res = await POST(makeRequest({ prompt: "make a page" }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.blocks).toHaveLength(2);
    expect(json.blocks[0].type).toBe("Hero");
  });

  it("filters out blocks missing type/props/id", async () => {
    vi.mocked(getServerSession).mockResolvedValue({ user: { name: "test" } });
    mockCreate.mockResolvedValue({
      output_text: JSON.stringify({
        blocks: [
          { type: "Hero", props: { id: "Hero-abc" } },
          { type: "Bad", props: {} },
          { props: { id: "no-type" } },
          { type: "NoProps" },
        ],
      }),
    });

    const res = await POST(makeRequest({ prompt: "test" }));
    const json = await res.json();
    expect(json.blocks).toHaveLength(1);
    expect(json.blocks[0].type).toBe("Hero");
  });

  it("returns 500 on empty AI response", async () => {
    vi.mocked(getServerSession).mockResolvedValue({ user: { name: "test" } });
    mockCreate.mockResolvedValue({ output_text: "" });

    const res = await POST(makeRequest({ prompt: "test" }));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toBe("Empty response from AI");
  });

  it("returns 500 on invalid JSON from AI", async () => {
    vi.mocked(getServerSession).mockResolvedValue({ user: { name: "test" } });
    mockCreate.mockResolvedValue({ output_text: "not json at all {{{" });

    const res = await POST(makeRequest({ prompt: "test" }));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toBe("Invalid JSON from AI");
  });

  it("returns 500 when blocks array missing", async () => {
    vi.mocked(getServerSession).mockResolvedValue({ user: { name: "test" } });
    mockCreate.mockResolvedValue({
      output_text: JSON.stringify({ content: "no blocks here" }),
    });

    const res = await POST(makeRequest({ prompt: "test" }));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toBe("AI response missing 'blocks' array");
  });

  it("returns 500 on OpenAI API error", async () => {
    vi.mocked(getServerSession).mockResolvedValue({ user: { name: "test" } });
    mockCreate.mockRejectedValue(new Error("API rate limit exceeded"));

    const res = await POST(makeRequest({ prompt: "test" }));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toBe("AI generation failed");
    expect(json.details).toBe("API rate limit exceeded");
  });
});

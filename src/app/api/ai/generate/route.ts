export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import OpenAI from "openai";
import { buildSystemPrompt } from "@/lib/ai/prompt";

let openai: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openai;
}

type BlockData = {
  type: string;
  props: Record<string, unknown>;
};

type GenerateResponse = {
  blocks: BlockData[];
};

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { prompt, currentBlocks } = (await request.json()) as {
      prompt: string;
      currentBlocks?: string[];
    };

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const systemPrompt = buildSystemPrompt();

    const contextMessage =
      currentBlocks && currentBlocks.length > 0
        ? `\n\nCurrent page already has these blocks: ${currentBlocks.join(", ")}. Consider this context when generating new blocks.`
        : "";

    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
    const completion = await getOpenAIClient().chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt + contextMessage },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 4096,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: "Empty response from AI" },
        { status: 500 }
      );
    }

    let parsed: GenerateResponse;
    try {
      parsed = JSON.parse(content) as GenerateResponse;
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON from AI", raw: content },
        { status: 500 }
      );
    }

    if (!parsed.blocks || !Array.isArray(parsed.blocks)) {
      return NextResponse.json(
        { error: "AI response missing 'blocks' array", raw: content },
        { status: 500 }
      );
    }

    // Validate each block has required fields
    const validBlocks = parsed.blocks.filter(
      (block) => block.type && block.props && block.props.id
    );

    return NextResponse.json({ blocks: validBlocks });
  } catch (error) {
    console.error("AI generation error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "AI generation failed", details: message },
      { status: 500 }
    );
  }
}

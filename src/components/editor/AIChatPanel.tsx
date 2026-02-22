"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { usePuck } from "@measured/puck";

type Message = {
  role: "user" | "assistant";
  content: string;
  blocks?: Array<{ type: string; props: Record<string, unknown> }>;
  error?: boolean;
};

export function AIChatPanel({ onClose }: { onClose: () => void }) {
  const { appState, dispatch } = usePuck();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        'Describe what blocks you need and I\'ll generate them. For example: "Create a hero section for a fitness club" or "Add a pricing table with 3 plans".',
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const insertBlocks = useCallback(
    (blocks: Array<{ type: string; props: Record<string, unknown> }>) => {
      const currentLength = appState.data.content.length;
      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        dispatch({
          type: "insert",
          componentType: block.type,
          destinationIndex: currentLength + i,
          destinationZone: "default-zone",
          id: block.props.id as string,
        });
      }
      // After inserting, replace each block with full props
      // Use setTimeout to let inserts propagate first
      setTimeout(() => {
        for (let i = 0; i < blocks.length; i++) {
          const block = blocks[i];
          dispatch({
            type: "replace",
            destinationIndex: currentLength + i,
            destinationZone: "default-zone",
            data: {
              type: block.type,
              props: block.props,
            },
          });
        }
      }, 100);
    },
    [appState.data.content.length, dispatch]
  );

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const currentBlockTypes = appState.data.content.map(
        (item: { type: string }) => item.type
      );

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: trimmed,
          currentBlocks: currentBlockTypes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Error: ${data.error || "Generation failed"}`,
            error: true,
          },
        ]);
        return;
      }

      const { blocks } = data as {
        blocks: Array<{ type: string; props: Record<string, unknown> }>;
      };

      if (!blocks || blocks.length === 0) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "No blocks were generated. Try a more specific description.",
            error: true,
          },
        ]);
        return;
      }

      insertBlocks(blocks);

      const blockList = blocks.map((b) => b.type).join(", ");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Added ${blocks.length} block(s): ${blockList}`,
          blocks,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Network error: ${err instanceof Error ? err.message : "Connection failed"}`,
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: 380,
        height: "100vh",
        backgroundColor: "#fff",
        borderLeft: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
        zIndex: 100,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#f9fafb",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            AI
          </div>
          <span style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>
            Block Generator
          </span>
        </div>
        <button
          onClick={onClose}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            padding: 4,
            color: "#6b7280",
            fontSize: 18,
            lineHeight: 1,
          }}
        >
          &times;
        </button>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "85%",
                padding: "10px 14px",
                borderRadius: 12,
                fontSize: 13,
                lineHeight: 1.5,
                ...(msg.role === "user"
                  ? {
                      backgroundColor: "#6366f1",
                      color: "#fff",
                      borderBottomRightRadius: 4,
                    }
                  : {
                      backgroundColor: msg.error ? "#fef2f2" : "#f3f4f6",
                      color: msg.error ? "#dc2626" : "#374151",
                      borderBottomLeftRadius: 4,
                    }),
              }}
            >
              {msg.content}
              {msg.blocks && msg.blocks.length > 0 && (
                <div
                  style={{
                    marginTop: 8,
                    paddingTop: 8,
                    borderTop: "1px solid #e5e7eb",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 4,
                  }}
                >
                  {msg.blocks.map((b, j) => (
                    <span
                      key={j}
                      style={{
                        display: "inline-block",
                        padding: "2px 8px",
                        backgroundColor: "#e0e7ff",
                        color: "#4338ca",
                        borderRadius: 4,
                        fontSize: 11,
                        fontWeight: 500,
                      }}
                    >
                      {b.type}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                padding: "10px 14px",
                borderRadius: 12,
                backgroundColor: "#f3f4f6",
                borderBottomLeftRadius: 4,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <LoadingDots />
              <span style={{ fontSize: 13, color: "#6b7280" }}>
                Generating blocks...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        style={{
          padding: 12,
          borderTop: "1px solid #e5e7eb",
          backgroundColor: "#f9fafb",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "flex-end",
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe the blocks you need..."
            rows={2}
            style={{
              flex: 1,
              padding: "8px 12px",
              border: "1px solid #d1d5db",
              borderRadius: 8,
              fontSize: 13,
              resize: "none",
              outline: "none",
              fontFamily: "inherit",
              lineHeight: 1.5,
            }}
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            style={{
              padding: "8px 16px",
              background:
                loading || !input.trim()
                  ? "#d1d5db"
                  : "linear-gradient(135deg, #8b5cf6, #6366f1)",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: loading || !input.trim() ? "not-allowed" : "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
        <div
          style={{
            fontSize: 11,
            color: "#9ca3af",
            marginTop: 6,
            textAlign: "center",
          }}
        >
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
    </div>
  );
}

function LoadingDots() {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: "#6366f1",
            animation: `aiDotPulse 1.4s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes aiDotPulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

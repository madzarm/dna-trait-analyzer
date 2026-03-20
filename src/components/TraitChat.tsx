"use client";

import { useState, useCallback, useRef } from "react";
import { Microscope } from "lucide-react";
import { ChatMessageList } from "./ChatMessageList";
import { ChatInput } from "./ChatInput";
import type { AnalysisResult, ChatMessage, TraitChatEvent } from "@/lib/types";

interface TraitChatProps {
  result: AnalysisResult;
}

const STARTER_QUESTIONS = [
  "What does this mean for my daily life?",
  "Is this trait hereditary?",
  "How reliable is this analysis?",
];

export function TraitChat({ result }: TraitChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      // Cancel any in-flight request
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      const userMessage: ChatMessage = { role: "user", content: text };
      const updatedHistory = [...messages, userMessage];
      setMessages([...updatedHistory, { role: "assistant", content: "" }]);
      setIsStreaming(true);

      try {
        const response = await fetch("/api/chat/trait", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            history: messages,
            context: result,
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error || "Failed to get response");
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No response stream");

        const decoder = new TextDecoder();
        let buffer = "";
        let fullText = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              try {
                const event: TraitChatEvent = JSON.parse(line.slice(6));
                if (event.type === "delta" && event.text) {
                  fullText += event.text;
                  setMessages([
                    ...updatedHistory,
                    { role: "assistant", content: fullText },
                  ]);
                } else if (event.type === "error") {
                  throw new Error(event.message || "Stream error");
                }
              } catch (parseErr) {
                // Re-throw if it's our own error event, skip malformed JSON
                if (parseErr instanceof Error && parseErr.message !== "Stream error") {
                  if (parseErr instanceof SyntaxError) continue;
                  throw parseErr;
                }
                throw parseErr;
              }
            }
          }
        } finally {
          reader.releaseLock();
        }
      } catch (err) {
        // Don't show error if we aborted intentionally
        if (err instanceof DOMException && err.name === "AbortError") return;

        const errMsg =
          err instanceof Error ? err.message : "Something went wrong";
        setMessages([
          ...updatedHistory,
          {
            role: "assistant",
            content: `I wasn\u2019t able to respond. ${errMsg}. Please try again.`,
          },
        ]);
      } finally {
        setIsStreaming(false);
      }
    },
    [messages, result]
  );

  const hasMessages = messages.length > 0;

  return (
    <section className="space-y-5 print:hidden">
      {/* Section header — matches ResultsCard section headers */}
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
          <Microscope className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold font-display text-base">Follow-up Inquiry</h3>
          <p className="text-xs text-muted-foreground">
            Ask anything about your{" "}
            <span className="capitalize">{result.trait}</span> analysis
          </p>
        </div>
      </div>

      {/* Starter questions — left-aligned, discovery-oriented */}
      {!hasMessages && (
        <div className="flex flex-wrap gap-2">
          {STARTER_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              disabled={isStreaming}
              className="rounded-full border border-border/20 px-3.5 py-1.5 text-xs text-muted-foreground/70 hover:border-primary/25 hover:text-foreground hover:bg-primary/5 transition-all cursor-pointer disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Messages */}
      <ChatMessageList messages={messages} isStreaming={isStreaming} />

      {/* Input */}
      <ChatInput
        onSend={sendMessage}
        disabled={isStreaming}
        placeholder={
          hasMessages
            ? "Ask a follow-up\u2026"
            : `Ask about your ${result.trait} results\u2026`
        }
      />
    </section>
  );
}

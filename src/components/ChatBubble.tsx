"use client";

import { useEffect, useRef, useState } from "react";
import { Dna } from "lucide-react";

interface ChatBubbleProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

/**
 * Renders streaming text with a "materialization" effect.
 * New text fades in with a subtle blur-to-focus + upward shift.
 * Once settled (120ms), the text becomes static — zero DOM overhead.
 */
function StreamingText({
  content,
  isStreaming,
}: {
  content: string;
  isStreaming: boolean;
}) {
  const [committed, setCommitted] = useState(0);
  const reducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const delay = !isStreaming || reducedMotion.current ? 0 : 120;
    const timer = setTimeout(() => setCommitted(content.length), delay);
    return () => clearTimeout(timer);
  }, [content, isStreaming]);

  // When not streaming, render as plain text — zero wrapper overhead
  if (!isStreaming && committed >= content.length) {
    return (
      <span className="whitespace-pre-line">{content}</span>
    );
  }

  const stableText = content.slice(0, committed);
  const freshText = content.slice(committed);

  return (
    <span className="whitespace-pre-line">
      {stableText}
      {freshText && (
        <span className="chat-materialize">{freshText}</span>
      )}
    </span>
  );
}

export function ChatBubble({ role, content, isStreaming }: ChatBubbleProps) {
  if (role === "user") {
    return (
      <div
        className="flex justify-end chat-spring-in"
      >
        <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-primary/8 px-4 py-2.5">
          <p className="text-sm text-foreground leading-relaxed">{content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 chat-spring-in">
      <div className="mt-0.5 shrink-0">
        <div className="h-6 w-6 rounded-md bg-primary/8 flex items-center justify-center">
          <Dna className="h-3.5 w-3.5 text-primary" />
        </div>
      </div>
      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-medium text-primary/70 uppercase tracking-[0.15em] font-mono">
            Analyst
          </span>
          {isStreaming && (
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
          )}
        </div>
        {content ? (
          <div
            className={`pl-0.5 border-l-2 transition-colors duration-300 ${
              isStreaming
                ? "chat-border-pulse"
                : "border-primary/15"
            }`}
          >
            <div className="text-sm text-muted-foreground leading-[1.8] pl-3">
              <StreamingText content={content} isStreaming={!!isStreaming} />
            </div>
          </div>
        ) : isStreaming ? (
          <div className="flex items-center gap-1.5 pl-4 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/30 animate-pulse" />
            <span
              className="h-1.5 w-1.5 rounded-full bg-primary/30 animate-pulse"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="h-1.5 w-1.5 rounded-full bg-primary/30 animate-pulse"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

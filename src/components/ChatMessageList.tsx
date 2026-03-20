"use client";

import { useEffect, useRef } from "react";
import { ChatBubble } from "./ChatBubble";
import type { ChatMessage } from "@/lib/types";

interface ChatMessageListProps {
  messages: ChatMessage[];
  isStreaming: boolean;
}

export function ChatMessageList({ messages, isStreaming }: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages arrive or streaming content updates
  const lastMessage = messages[messages.length - 1];
  const scrollTrigger = `${messages.length}-${lastMessage?.content.length ?? 0}`;

  useEffect(() => {
    // Only auto-scroll if user hasn't scrolled up manually
    const container = containerRef.current;
    if (!container) return;

    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 100;

    if (isNearBottom || messages.length <= 2) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [scrollTrigger, messages.length]);

  if (messages.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="max-h-[420px] overflow-y-auto space-y-4 pr-1"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "var(--border) transparent",
      }}
    >
      {messages.map((msg, i) => (
        <ChatBubble
          key={i}
          role={msg.role}
          content={msg.content}
          isStreaming={isStreaming && i === messages.length - 1 && msg.role === "assistant"}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

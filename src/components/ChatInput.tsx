"use client";

import { useState, useRef, useCallback } from "react";
import { ArrowUp } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, disabled, placeholder }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    resizeTextarea();
  };

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    // Reset height after clearing
    requestAnimationFrame(() => {
      const el = textareaRef.current;
      if (el) el.style.height = "auto";
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative flex items-end gap-2 rounded-xl border border-border/20 bg-card/40 px-3 py-2 transition-colors focus-within:border-primary/30 focus-within:bg-card/60">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        rows={1}
        placeholder={placeholder ?? "Ask about your results\u2026"}
        className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 outline-none disabled:opacity-50 leading-relaxed min-h-[24px] max-h-[120px] py-0.5"
      />
      <button
        onClick={handleSubmit}
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className="shrink-0 h-7 w-7 rounded-lg bg-primary/90 text-primary-foreground flex items-center justify-center transition-all hover:bg-primary disabled:opacity-30 disabled:hover:bg-primary/90 cursor-pointer"
      >
        <ArrowUp className="h-4 w-4" />
      </button>
    </div>
  );
}

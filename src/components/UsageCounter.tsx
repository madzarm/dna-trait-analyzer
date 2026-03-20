"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

interface UsageCounterProps {
  isDemo?: boolean;
}

export function UsageCounter({ isDemo }: UsageCounterProps) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (isDemo) return;

    fetch("/api/usage")
      .then((r) => {
        if (!r.ok) return null;
        return r.json();
      })
      .then((data) => {
        if (!data) return;
        if (data.limit === null) {
          // Unlimited subscriber
          setRemaining(Infinity);
        } else {
          setRemaining(Math.max(0, data.limit - data.used));
        }
      })
      .catch(() => {});
  }, [isDemo]);

  if (isDemo) return null;
  if (remaining === null) return null;
  if (remaining === Infinity) return null;

  const isLow = remaining === 1;
  const isEmpty = remaining === 0;

  if (isEmpty) {
    return (
      <Link
        href="/pricing"
        className="flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1.5 hover:bg-accent/15 transition-colors"
      >
        <Sparkles className="h-3.5 w-3.5 text-accent" />
        <span className="text-[10px] font-medium text-accent uppercase tracking-wider font-mono">
          Upgrade
        </span>
        <ArrowRight className="h-3 w-3 text-accent" />
      </Link>
    );
  }

  return (
    <div
      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 ${
        isLow ? "border-accent/30 bg-accent/5" : "border-border/20"
      }`}
    >
      <span
        className={`text-xs font-bold tabular-nums font-mono ${
          isLow ? "text-accent" : "text-foreground"
        }`}
      >
        {remaining}
      </span>
      <span
        className={`text-[10px] uppercase tracking-wider ${
          isLow ? "text-accent/70" : "text-muted-foreground/50"
        }`}
      >
        free left
      </span>
    </div>
  );
}

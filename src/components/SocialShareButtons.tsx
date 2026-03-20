"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Link2, Check } from "lucide-react";

interface SocialShareButtonsProps {
  trait: string;
  summary?: string;
}

export function SocialShareButtons({ trait, summary }: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  const shareText = summary
    ? `I just discovered insights about "${trait}" from my DNA data`
    : `Check out my DNA analysis for "${trait}"`;

  const shareToTwitter = useCallback(() => {
    const text = `${shareText} 🧬`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer,width=550,height=420");
  }, [shareText, url]);

  const shareToReddit = useCallback(() => {
    const redditUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(shareText)}`;
    window.open(redditUrl, "_blank", "noopener,noreferrer");
  }, [shareText, url]);

  const copyLink = useCallback(async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [url]);

  return (
    <div className="rounded-xl border border-border/30 bg-card/50 p-5 space-y-4 print:hidden">
      <div className="flex items-center gap-2">
        <Share2 className="h-4 w-4 text-muted-foreground/60" />
        <span className="text-sm font-semibold font-display">Share your result</span>
      </div>

      <p className="text-xs text-muted-foreground/60 bg-muted/20 rounded-lg px-3 py-2 font-mono leading-relaxed">
        &ldquo;{shareText}&rdquo;
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={shareToTwitter}
          className="rounded-full gap-1.5 cursor-pointer"
        >
          X / Twitter
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={shareToReddit}
          className="rounded-full gap-1.5 cursor-pointer"
        >
          Reddit
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={copyLink}
          className="rounded-full gap-1.5 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied!
            </>
          ) : (
            <>
              <Link2 className="h-3.5 w-3.5" />
              Copy Link
            </>
          )}
        </Button>
      </div>

      <div className="pt-1 border-t border-border/20">
        <button
          onClick={copyLink}
          className="text-xs text-primary hover:text-primary/80 transition-colors cursor-pointer"
        >
          Challenge a friend — see if they have the same trait
        </button>
      </div>
    </div>
  );
}

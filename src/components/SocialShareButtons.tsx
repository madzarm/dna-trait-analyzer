"use client";

import { Button } from "@/components/ui/button";

interface SocialShareButtonsProps {
  trait: string;
}

export function SocialShareButtons({ trait }: SocialShareButtonsProps) {
  const url = typeof window !== "undefined" ? window.location.href : "";
  const text = `Check out my DNA analysis for "${trait}" on DNA Trait Analyzer!`;

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer,width=550,height=420");
  };

  const shareToReddit = () => {
    const redditUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`;
    window.open(redditUrl, "_blank", "noopener,noreferrer");
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
  };

  return (
    <div className="flex items-center gap-2 print:hidden">
      <span className="text-sm text-muted-foreground mr-1">Share:</span>
      <Button variant="outline" size="sm" onClick={shareToTwitter}>
        Twitter
      </Button>
      <Button variant="outline" size="sm" onClick={shareToReddit}>
        Reddit
      </Button>
      <Button variant="outline" size="sm" onClick={copyLink}>
        Copy Link
      </Button>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

const COOKIE_CONSENT_KEY = "dna-trait-analyzer-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!stored) {
        setVisible(true);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-50 sm:max-w-sm animate-fade-in-up"
      data-slot="cookie-consent"
    >
      <div className="rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl p-5 space-y-3">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
            <Cookie className="h-4 w-4 text-accent" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We use essential cookies to make this site work. Analytics cookies are
            optional.{" "}
            <Link
              href="/legal/privacy"
              className="text-primary underline underline-offset-2 hover:text-primary/80"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-2 pl-0 sm:pl-11">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDecline}
            className="text-muted-foreground hover:text-foreground text-xs h-8 px-3 cursor-pointer"
          >
            Decline
          </Button>
          <Button
            size="sm"
            onClick={handleAccept}
            className="text-xs h-8 px-4 rounded-full cursor-pointer"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const COOKIE_CONSENT_KEY = "dna-trait-analyzer-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) {
      setVisible(true);
    }
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
    <div className="fixed bottom-4 right-4 z-50 max-w-sm" data-slot="cookie-consent">
      <div className="rounded-xl border bg-card/95 backdrop-blur-md shadow-xl p-5 space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          We use essential cookies to make this site work. With your consent, we
          may also use analytics cookies to improve the service. See our{" "}
          <Link
            href="/legal/privacy"
            className="text-primary underline underline-offset-2 hover:text-primary/80"
          >
            Privacy Policy
          </Link>{" "}
          for details.
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleDecline} className="flex-1">
            Decline
          </Button>
          <Button
            size="sm"
            onClick={handleAccept}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}

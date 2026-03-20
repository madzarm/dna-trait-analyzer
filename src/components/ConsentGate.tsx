"use client";

import { useState, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import { ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";

interface ConsentGateProps {
  children: React.ReactNode;
}

const CONSENT_KEY = "dna-trait-analyzer-consent";

interface ConsentRecord {
  timestamp: string;
  version: 1;
}

function getStoredConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(CONSENT_KEY) !== null;
  } catch {
    return false;
  }
}

function storeConsent() {
  const record: ConsentRecord = {
    timestamp: new Date().toISOString(),
    version: 1,
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
}

// Subscribe/getSnapshot for useSyncExternalStore to hydrate safely
const emptySubscribe = () => () => {};
const getServerSnapshot = () => false;

export function ConsentGate({ children }: ConsentGateProps) {
  const storedConsent = useSyncExternalStore(emptySubscribe, getStoredConsent, getServerSnapshot);
  const [hasConsent, setHasConsent] = useState(storedConsent);
  const [expanded, setExpanded] = useState(false);

  const handleToggle = useCallback(() => {
    storeConsent();
    setHasConsent(true);
  }, []);

  if (hasConsent || storedConsent) {
    return <>{children}</>;
  }

  return (
    <div className="space-y-4">
      {/* Show dropzone grayed out so users see what they'll get */}
      <div className="pointer-events-none opacity-50 select-none" aria-hidden="true">
        {children}
      </div>

      {/* Inline consent — compact, not a blocking modal */}
      <div className="rounded-xl border border-border/40 bg-card/50 p-4 space-y-3">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={false}
            onChange={handleToggle}
            className="mt-0.5 h-4 w-4 rounded border-input accent-primary cursor-pointer shrink-0"
          />
          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
            I agree to the{" "}
            <Link
              href="/legal/terms"
              className="text-primary underline underline-offset-2 hover:text-primary/80"
              target="_blank"
              onClick={(e) => e.stopPropagation()}
            >
              Terms
            </Link>{" "}
            &{" "}
            <Link
              href="/legal/privacy"
              className="text-primary underline underline-offset-2 hover:text-primary/80"
              target="_blank"
              onClick={(e) => e.stopPropagation()}
            >
              Privacy Policy
            </Link>
            {" "}— educational only, my own data, AI processing.
          </span>
        </label>

        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors cursor-pointer pl-7"
        >
          <ShieldCheck className="h-3 w-3" />
          {expanded ? "Hide details" : "Learn more about data handling"}
          {expanded ? (
            <ChevronUp className="h-3 w-3" />
          ) : (
            <ChevronDown className="h-3 w-3" />
          )}
        </button>

        {expanded && (
          <div className="pl-7 space-y-2 text-xs text-muted-foreground/60 leading-relaxed">
            <p>
              This tool is for <strong className="text-muted-foreground">educational purposes only</strong> and
              does not provide medical advice, diagnoses, or treatment recommendations.
            </p>
            <p>
              You must be uploading <strong className="text-muted-foreground">your own genetic data</strong>, or
              data for which you have explicit authorization to analyze.
            </p>
            <p>
              Your genetic data will be <strong className="text-muted-foreground">processed by AI (Anthropic Claude)</strong>.
              AI-generated results may contain errors. Data is held in server memory for up to 1 hour, then permanently deleted.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

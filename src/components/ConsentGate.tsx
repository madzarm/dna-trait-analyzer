"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ConsentGateProps {
  children: React.ReactNode;
}

const CONSENT_KEY = "dna-trait-analyzer-consent";

interface ConsentRecord {
  timestamp: string;
  version: 1;
}

function getStoredConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentRecord;
  } catch {
    return null;
  }
}

function storeConsent() {
  const record: ConsentRecord = {
    timestamp: new Date().toISOString(),
    version: 1,
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
}

export function ConsentGate({ children }: ConsentGateProps) {
  const [hasConsent, setHasConsent] = useState(() => !!getStoredConsent());
  const [checks, setChecks] = useState({
    educational: false,
    ownData: false,
    aiProcessing: false,
    termsAgreed: false,
  });

  const allChecked = checks.educational && checks.ownData && checks.aiProcessing && checks.termsAgreed;

  const handleToggle = useCallback(
    (key: keyof typeof checks) => {
      setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
    },
    []
  );

  const handleConsent = useCallback(() => {
    storeConsent();
    setHasConsent(true);
  }, []);

  if (hasConsent) {
    return <>{children}</>;
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-lg">Before You Upload</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="text-sm text-muted-foreground">
          Please review and acknowledge the following before uploading your
          genetic data:
        </p>

        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={checks.educational}
              onChange={() => handleToggle("educational")}
              className="mt-0.5 h-4 w-4 rounded border-input accent-primary cursor-pointer"
            />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
              I understand this tool is for{" "}
              <strong>educational purposes only</strong> and does not provide
              medical advice, diagnoses, or treatment recommendations.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={checks.ownData}
              onChange={() => handleToggle("ownData")}
              className="mt-0.5 h-4 w-4 rounded border-input accent-primary cursor-pointer"
            />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
              I am uploading <strong>my own genetic data</strong>, or data for
              which I have explicit authorization to analyze.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={checks.aiProcessing}
              onChange={() => handleToggle("aiProcessing")}
              className="mt-0.5 h-4 w-4 rounded border-input accent-primary cursor-pointer"
            />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
              I consent to my genetic data being{" "}
              <strong>processed by AI (Anthropic Claude)</strong> and understand
              that AI-generated results may contain errors.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={checks.termsAgreed}
              onChange={() => handleToggle("termsAgreed")}
              className="mt-0.5 h-4 w-4 rounded border-input accent-primary cursor-pointer"
            />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
              I have read and agree to the{" "}
              <Link
                href="/legal/terms"
                className="text-primary underline underline-offset-2 hover:text-primary/80"
                target="_blank"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/legal/privacy"
                className="text-primary underline underline-offset-2 hover:text-primary/80"
                target="_blank"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>
        </div>

        <Button
          onClick={handleConsent}
          disabled={!allChecked}
          size="lg"
          className="w-full"
        >
          I Agree — Continue to Upload
        </Button>
      </CardContent>
    </Card>
  );
}

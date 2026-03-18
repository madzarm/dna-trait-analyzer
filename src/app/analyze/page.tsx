"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useCallback, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TraitInput } from "@/components/TraitInput";
import { ResultsCard } from "@/components/ResultsCard";
import { CheckCircle2, Circle, AlertCircle, Sparkles } from "lucide-react";
import type { AnalysisResult, ProgressEvent } from "@/lib/types";

function AnalyzeContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session");
  const snpCount = searchParams.get("snps");

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progressMessages, setProgressMessages] = useState<string[]>([]);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [reportId, setReportId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [usageLimitHit, setUsageLimitHit] = useState(false);

  const handleAnalyze = useCallback(
    async (trait: string) => {
      if (!sessionId) return;

      setIsAnalyzing(true);
      setProgressMessages([]);
      setResult(null);
      setReportId(null);
      setError("");

      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ trait, sessionId }),
        });

        if (!response.ok) {
          const data = await response.json();
          if (response.status === 402 || data.code === "USAGE_LIMIT_EXCEEDED") {
            setUsageLimitHit(true);
          }
          setError(data.error || "Analysis failed");
          setIsAnalyzing(false);
          return;
        }

        const reader = response.body?.getReader();
        if (!reader) {
          setError("Failed to read response stream");
          setIsAnalyzing(false);
          return;
        }

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            try {
              const event: ProgressEvent = JSON.parse(line.slice(6));

              if (event.type === "progress" || event.type === "snps_found") {
                if (event.message) {
                  setProgressMessages((prev) => [...prev, event.message!]);
                }
              } else if (event.type === "result" && event.data) {
                setResult(event.data);
                if (event.reportId) {
                  setReportId(event.reportId);
                }
              } else if (event.type === "error") {
                setError(event.message || "Analysis failed");
              }
            } catch {
              // skip malformed events
            }
          }
        }
      } catch {
        setError("Connection error. Please try again.");
      } finally {
        setIsAnalyzing(false);
      }
    },
    [sessionId]
  );

  if (!sessionId) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">
          No DNA data loaded.{" "}
          <a href="/" className="text-primary hover:underline">
            Upload your DNA file
          </a>{" "}
          first.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analyze Your DNA</h1>
          <p className="text-sm text-muted-foreground">
            Ask about any trait to see what your genes say
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          {Number(snpCount).toLocaleString()} SNPs loaded
        </Badge>
      </div>

      <TraitInput onSubmit={handleAnalyze} isAnalyzing={isAnalyzing} />

      {/* Vertical timeline progress */}
      {isAnalyzing && (
        <Card>
          <CardContent className="py-8 px-6">
            <div className="flex flex-col">
              {progressMessages.map((msg, i) => {
                const isLast = i === progressMessages.length - 1;
                const isCompleted = !isLast;

                return (
                  <div key={i} className="flex items-start gap-3 relative">
                    {/* Vertical connecting line */}
                    {!isLast && (
                      <div className="absolute left-[11px] top-6 w-0.5 h-full bg-primary/20" />
                    )}
                    {/* Dot / icon */}
                    <div className="relative z-10 mt-0.5 shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                      ) : (
                        <Circle className="h-6 w-6 text-primary animate-pulse" />
                      )}
                    </div>
                    {/* Message */}
                    <p
                      className={`text-sm pb-4 ${
                        isCompleted
                          ? "text-muted-foreground"
                          : "text-foreground font-medium"
                      }`}
                    >
                      {msg}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error card */}
      {error && !usageLimitHit && (
        <Card className="border-destructive/40">
          <CardContent className="py-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <p className="text-sm text-destructive">
              {error}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Usage limit card - premium feel */}
      {error && usageLimitHit && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="py-6 flex flex-col items-center text-center gap-3">
            <Sparkles className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">{error}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Upgrade your plan to continue exploring your genetic traits.
              </p>
            </div>
            <Link href="/pricing">
              <Button size="sm" className="mt-1">View Plans</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {result && (
        <ResultsCard
          result={result}
          reportId={reportId}
          onNewAnalysis={() => {
            setResult(null);
            setReportId(null);
            setProgressMessages([]);
          }}
        />
      )}
    </div>
  );
}

export default function AnalyzePage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-20 text-muted-foreground">
          Loading...
        </div>
      }
    >
      <AnalyzeContent />
    </Suspense>
  );
}

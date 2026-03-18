"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TraitInput } from "@/components/TraitInput";
import { ResultsCard } from "@/components/ResultsCard";
import type { AnalysisResult, ProgressEvent } from "@/lib/types";

function AnalyzeContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session");
  const snpCount = searchParams.get("snps");

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progressMessages, setProgressMessages] = useState<string[]>([]);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  const handleAnalyze = useCallback(
    async (trait: string) => {
      if (!sessionId) return;

      setIsAnalyzing(true);
      setProgressMessages([]);
      setResult(null);
      setError("");

      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ trait, sessionId }),
        });

        if (!response.ok) {
          const data = await response.json();
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

      {isAnalyzing && (
        <Card>
          <CardContent className="py-8">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              <div className="space-y-2 text-center">
                {progressMessages.map((msg, i) => (
                  <p
                    key={i}
                    className={`text-sm transition-opacity ${
                      i === progressMessages.length - 1
                        ? "text-foreground"
                        : "text-muted-foreground/50"
                    }`}
                  >
                    {i < progressMessages.length - 1 ? "\u2713" : "\u2022"}{" "}
                    {msg}
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-destructive">
          <CardContent className="py-4">
            <p className="text-sm text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {result && (
        <ResultsCard
          result={result}
          onNewAnalysis={() => {
            setResult(null);
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

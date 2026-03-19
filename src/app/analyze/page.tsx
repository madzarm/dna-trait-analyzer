"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Suspense, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { TraitInput } from "@/components/TraitInput";
import { ResultsCard } from "@/components/ResultsCard";
import { UploadDropzone } from "@/components/UploadDropzone";
import { ConsentGate } from "@/components/ConsentGate";
import {
  AlertCircle,
  Sparkles,
  Dna,
  Upload,
  Timer,
  ArrowRight,
  Search,
  BarChart3,
  ShieldCheck,
  Lock,
} from "lucide-react";
import type { AnalysisResult, ProgressEvent } from "@/lib/types";

const DNA_SEQ = "ATCG TAGC AATT CCGG GCTA ATCG TGCA CTAG ";

function AnalyzeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
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

  const handleUploadComplete = (newSessionId: string, newSnpCount: number) => {
    router.push(`/analyze?session=${newSessionId}&snps=${newSnpCount}`);
  };

  /* ── Empty state: no DNA loaded — upload directly here ── */
  if (!sessionId) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-medium text-primary uppercase tracking-wider font-mono">
              Get Started
            </p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-display">
              Analyze Your DNA
            </h1>
            <p className="text-muted-foreground max-w-md">
              Upload your raw DNA file to start asking questions about your genetic traits.
            </p>
          </div>

          {/* Upload dropzone — right here, no redirect */}
          <ConsentGate>
            <UploadDropzone onUploadComplete={handleUploadComplete} />
          </ConsentGate>

          <p className="flex items-center gap-1.5 text-xs text-muted-foreground/50">
            <Lock className="h-3.5 w-3.5" />
            Processed securely in memory. Auto-deleted within 1 hour.
          </p>
        </div>
      </div>
    );
  }

  /* ── Main analysis view ─────────────────────────────── */
  return (
    <div className="relative min-h-[calc(100vh-3.5rem)]">
      {/* Atmospheric background — matches homepage warmth */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Warm glow behind the search area */}
        <div
          className="absolute top-[10%] left-[20%] h-[400px] w-[400px] rounded-full blur-[140px]"
          style={{ background: "var(--primary)", opacity: 0.04 }}
        />
        <div
          className="absolute top-[5%] right-[10%] h-[300px] w-[300px] rounded-full blur-[120px]"
          style={{ background: "var(--accent)", opacity: 0.03 }}
        />

        {/* Subtle DNA sequence strip */}
        <div className="absolute top-[15%] left-0 w-full overflow-hidden pointer-events-none select-none">
          <div
            className="whitespace-nowrap font-mono text-[11px] tracking-[0.5em] text-primary opacity-[0.03]"
            style={{ animation: "sequence-scroll 100s linear infinite", width: "200%" }}
          >
            {DNA_SEQ.repeat(12)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 pt-10 pb-16 space-y-8">
        {/* Session header — instrument readout feel */}
        <div className="space-y-6">
          {/* Top bar: status readouts */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              {/* Live status indicator */}
              <div className="flex items-center gap-2 rounded-full bg-primary/8 pl-2.5 pr-3.5 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="text-[10px] font-medium text-primary uppercase tracking-wider font-mono">
                  Session Active
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {/* SNP count readout */}
              <div className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-border/20 px-2.5 sm:px-3.5 py-1.5">
                <Dna className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-bold text-foreground tabular-nums font-mono">
                  {Number(snpCount).toLocaleString()}
                </span>
                <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider hidden sm:inline">
                  SNPs
                </span>
              </div>
              {/* Timer */}
              <div className="flex items-center gap-1.5 rounded-full border border-border/20 px-2.5 sm:px-3 py-1.5">
                <Timer className="h-3.5 w-3.5 text-muted-foreground/50" />
                <span className="text-[10px] text-muted-foreground/50 font-mono">1h</span>
              </div>
            </div>
          </div>

          {/* Main heading */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-display">
              What do you want to discover?
            </h1>
            <p className="text-muted-foreground max-w-lg">
              Your DNA is loaded. Ask about any trait — from caffeine metabolism to eye color to sleep patterns.
            </p>
          </div>
        </div>

        {/* Trait input — the hero */}
        <TraitInput onSubmit={handleAnalyze} isAnalyzing={isAnalyzing} />

        {/* Privacy reassurance */}
        {!isAnalyzing && !result && !error && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground/40 pt-2">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
            <span>Your DNA data is processed in memory only. Auto-deleted within 1 hour.</span>
          </div>
        )}

        {/* Streaming progress */}
        {isAnalyzing && (
          <div className="rounded-2xl border border-primary/15 overflow-hidden bg-card/30 backdrop-blur-sm">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border/20 bg-primary/[0.03]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-primary font-mono">
                Analyzing your DNA
              </span>
            </div>
            <div className="px-5 py-5">
              <div className="flex flex-col gap-0">
                {progressMessages.map((msg, i) => {
                  const isLast = i === progressMessages.length - 1;
                  const isCompleted = !isLast;

                  return (
                    <div key={i} className="flex items-start gap-3 relative">
                      {!isLast && (
                        <div className="absolute left-[7px] top-5 w-0.5 h-full bg-primary/10" />
                      )}
                      <div className="relative z-10 mt-1.5 shrink-0">
                        {isCompleted ? (
                          <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          </div>
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2 border-primary animate-pulse" />
                        )}
                      </div>
                      <p
                        className={`text-sm pb-4 leading-relaxed ${
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
            </div>
          </div>
        )}

        {/* Error */}
        {error && !usageLimitHit && (
          <div className="flex items-start gap-3 rounded-2xl border border-destructive/20 bg-destructive/5 px-5 py-4">
            <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-destructive">{error}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Try a different trait or upload your DNA file again.
              </p>
            </div>
          </div>
        )}

        {/* Usage limit */}
        {error && usageLimitHit && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-accent/20 bg-accent/5 px-5 py-5">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold">{error}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Upgrade your plan to continue exploring your genetic traits.
                </p>
              </div>
            </div>
            <Link href="/pricing">
              <Button size="sm" className="cursor-pointer rounded-full font-display shrink-0">
                View Plans
                <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        )}

        {/* Results */}
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
    </div>
  );
}

export default function AnalyzePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <Dna className="h-8 w-8 text-primary animate-spin" />
        </div>
      }
    >
      <AnalyzeContent />
    </Suspense>
  );
}

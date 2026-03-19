"use client";

import { ConfidenceMeter } from "./ConfidenceMeter";
import { SnpTable } from "./SnpTable";
import { PrintReportButton } from "./PrintReportButton";
import { Beaker, Dna, BookOpen, ShieldCheck } from "lucide-react";
import type { AnalysisResult } from "@/lib/types";
import Link from "next/link";

interface ResultsCardProps {
  result: AnalysisResult;
  reportId?: string | null;
  onNewAnalysis: () => void;
}

export function ResultsCard({ result, reportId, onNewAnalysis }: ResultsCardProps) {
  const snpsFound = result.snpMatches.length;
  const sourcesCount = result.sources.length;

  return (
    <div className="space-y-8">
      {/* Print-only branded header */}
      <div data-print-header className="hidden">
        <span className="print-logo">DNA Trait Analyzer</span>
        <span className="print-date">
          Generated {new Date().toLocaleDateString()}
        </span>
      </div>

      {/* ── Report Header ── */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-medium text-primary uppercase tracking-wider font-mono mb-2">
              Trait Analysis
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl capitalize tracking-tight">
              {result.trait}
            </h2>
            <p className="text-base text-muted-foreground mt-2 max-w-xl leading-relaxed">
              {result.summary}
            </p>
          </div>
          <PrintReportButton />
        </div>

        {/* Key metrics strip */}
        <div className="flex items-center gap-2 pt-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3 py-1">
            <Dna className="h-3 w-3 text-primary" />
            <span className="text-xs font-medium text-primary tabular-nums font-mono">
              {snpsFound} SNPs
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1">
            <BookOpen className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground tabular-nums font-mono">
              {sourcesCount} sources
            </span>
          </span>
        </div>
      </div>

      {/* ── Confidence Assessment ── */}
      <ConfidenceMeter confidence={result.confidence} />

      {/* ── Genetic Profile ── */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
            <Dna className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold font-display text-base">Your Genetic Profile</h3>
            <p className="text-xs text-muted-foreground">SNPs analyzed from your DNA data</p>
          </div>
        </div>
        <SnpTable matches={result.snpMatches} />
      </section>

      {/* ── Detailed Interpretation ── */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-accent/8 flex items-center justify-center shrink-0">
            <Beaker className="h-4 w-4 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold font-display text-base">Detailed Analysis</h3>
            <p className="text-xs text-muted-foreground">AI interpretation of your genetic data</p>
          </div>
        </div>
        {/* Interpretation as a styled excerpt */}
        <div className="relative pl-5 border-l-2 border-primary/20">
          <div className="text-sm text-muted-foreground leading-[1.8] whitespace-pre-line">
            {result.interpretation}
          </div>
        </div>
      </section>

      {/* ── Research Sources ── */}
      {result.sources.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold font-display text-base">References</h3>
              <p className="text-xs text-muted-foreground">{sourcesCount} peer-reviewed sources cited</p>
            </div>
          </div>
          <ol className="space-y-2 pl-5">
            {result.sources.map((source, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="text-[10px] font-medium text-muted-foreground/40 tabular-nums font-mono mt-1 shrink-0 w-5 text-right">
                  [{i + 1}]
                </span>
                <span className="text-muted-foreground leading-relaxed">{source}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* ── Disclaimer ── */}
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-muted/30 to-transparent" />
        <div className="relative rounded-2xl border border-border/20 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-muted-foreground/50" />
            <span className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
              For Educational Purposes Only
            </span>
          </div>
          <div className="text-xs text-muted-foreground/60 leading-relaxed space-y-2">
            <p>{result.disclaimer}</p>
            <p>
              This analysis was generated by AI (Anthropic Claude) and may
              contain errors, inaccuracies, or misinterpretations of
              scientific literature. AI-generated content should not be used
              as a basis for medical decisions. Genetic traits are influenced
              by many factors including gene-gene interactions, epigenetics,
              and environment — this analysis does not capture the full
              picture. Always consult a qualified healthcare professional or
              genetic counselor for medical advice.
            </p>
          </div>
        </div>
      </div>

      {/* ── Actions ── */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 print:hidden pt-2">
        <button
          onClick={onNewAnalysis}
          className="text-sm text-primary hover:text-primary/80 transition-colors cursor-pointer font-medium"
        >
          Analyze another trait
        </button>
        {reportId && (
          <>
            <div className="hidden sm:block h-4 w-px bg-border/30" />
            <Link
              href={`/reports/${reportId}`}
              className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
            >
              View saved report
            </Link>
          </>
        )}
      </div>

      {/* Print-only branded footer */}
      <div data-print-footer className="hidden">
        DNA Trait Analyzer &mdash; AI-powered genetic trait analysis &mdash; For educational purposes only
      </div>
    </div>
  );
}

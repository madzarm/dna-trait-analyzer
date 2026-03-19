"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { ConfidenceMeter } from "@/components/ConfidenceMeter";
import { SnpTable } from "@/components/SnpTable";
import { PrintReportButton } from "@/components/PrintReportButton";
import { SocialShareButtons } from "@/components/SocialShareButtons";
import {
  ChevronRight,
  Share2,
  Dna,
  Copy,
  Trash2,
  Beaker,
  BookOpen,
  ShieldCheck,
  Link2,
} from "lucide-react";
import type { Report } from "@/lib/supabase/types";
import type { SNPMatch } from "@/lib/types";

export default function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/auth/login");
      return;
    }

    const fetchReport = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        router.push("/reports");
        return;
      }

      setReport(data as Report);
      if (data.share_token) {
        setShareUrl(`${window.location.origin}/share/${data.share_token}`);
      }
      setLoading(false);
    };

    fetchReport();
  }, [id, user, authLoading, router]);

  const handleShare = async () => {
    if (!report) return;
    setSharing(true);

    const supabase = createClient();
    const token = crypto.randomUUID();

    const { error } = await supabase
      .from("reports")
      .update({ share_token: token, is_public: true })
      .eq("id", report.id);

    if (!error) {
      const url = `${window.location.origin}/share/${token}`;
      setShareUrl(url);
      setReport({ ...report, share_token: token, is_public: true });
      await navigator.clipboard.writeText(url);
    }
    setSharing(false);
  };

  const handleUnshare = async () => {
    if (!report) return;

    const supabase = createClient();
    const { error } = await supabase
      .from("reports")
      .update({ share_token: null, is_public: false })
      .eq("id", report.id);

    if (!error) {
      setShareUrl(null);
      setReport({ ...report, share_token: null, is_public: false });
    }
  };

  if (authLoading || loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 py-20">
        <div className="flex items-center justify-center gap-3 text-muted-foreground">
          <Dna className="h-5 w-5 animate-spin text-primary" />
          <span className="text-sm font-mono">Loading report...</span>
        </div>
      </div>
    );
  }

  if (!report) return null;

  const snpMatches = report.snp_matches as unknown as SNPMatch[];
  const snpsFound = snpMatches?.length ?? 0;
  const sourcesCount = report.sources.length;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
      {/* Print-only branded header */}
      <div data-print-header className="hidden">
        <span className="print-logo">DNA Trait Analyzer</span>
        <span className="print-date">
          Generated {new Date(report.created_at).toLocaleDateString()}
        </span>
      </div>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground print:hidden">
        <Link href="/reports" className="hover:text-foreground transition-colors">
          Reports
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground capitalize font-medium">{report.trait}</span>
      </nav>

      {/* ── Report Header — matches ResultsCard ── */}
      <div className="space-y-4">
        <div className="space-y-3 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
            <div>
              <p className="text-[10px] font-medium text-primary uppercase tracking-wider font-mono mb-2">
                Trait Report
              </p>
              <h1 className="font-display font-bold text-3xl md:text-4xl capitalize tracking-tight">
                {report.trait}
              </h1>
              <p className="text-base text-muted-foreground mt-2 max-w-xl leading-relaxed">
                {report.summary}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0 print:hidden">
              <PrintReportButton />
              <Button
                size="sm"
                variant="outline"
                onClick={handleShare}
                disabled={sharing || !!shareUrl}
                className="rounded-full cursor-pointer"
              >
                <Share2 className="h-3.5 w-3.5 mr-1.5" />
                {sharing ? "..." : shareUrl ? "Shared" : "Share"}
              </Button>
            </div>
          </div>
        </div>

        {/* Key metrics pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
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
          <span className="text-[10px] text-muted-foreground/40 font-mono sm:ml-auto">
            {new Date(report.created_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* ── Confidence Assessment ── */}
      <ConfidenceMeter confidence={Math.round(report.confidence)} />

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
        <SnpTable matches={snpMatches} />
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
        <div className="relative pl-5 border-l-2 border-primary/20">
          <div className="text-sm text-muted-foreground leading-[1.8] whitespace-pre-line">
            {report.interpretation}
          </div>
        </div>
      </section>

      {/* ── References ── */}
      {report.sources.length > 0 && (
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
            {report.sources.map((source, i) => (
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

      {/* ── Sharing ── */}
      <section className="space-y-4 print:hidden">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
            <Link2 className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold font-display text-base">Share This Report</h3>
            <p className="text-xs text-muted-foreground">Create a public link anyone can view</p>
          </div>
        </div>

        {shareUrl ? (
          <div className="space-y-4 pl-0 sm:pl-11">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 text-xs bg-muted/30 px-4 py-2.5 rounded-xl border border-border/20 font-mono focus:outline-none focus:border-primary/30 min-w-0"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigator.clipboard.writeText(shareUrl)}
                className="rounded-full cursor-pointer shrink-0"
              >
                <Copy className="h-3.5 w-3.5 mr-1.5" />
                Copy
              </Button>
            </div>
            <SocialShareButtons trait={report.trait} />
            <button
              className="text-xs text-destructive/70 hover:text-destructive transition-colors cursor-pointer flex items-center gap-1.5"
              onClick={handleUnshare}
            >
              <Trash2 className="h-3 w-3" />
              Remove share link
            </button>
          </div>
        ) : (
          <div className="pl-0 sm:pl-11">
            <Button
              size="sm"
              onClick={handleShare}
              disabled={sharing}
              className="rounded-full font-display cursor-pointer w-full sm:w-auto"
            >
              <Share2 className="h-4 w-4 mr-1.5" />
              {sharing ? "Creating link..." : "Create Share Link"}
            </Button>
          </div>
        )}
      </section>

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
          <p className="text-xs text-muted-foreground/60 leading-relaxed">
            {report.disclaimer}
          </p>
        </div>
      </div>

      {/* Print-only branded footer */}
      <div data-print-footer className="hidden">
        DNA Trait Analyzer &mdash; AI-powered genetic trait analysis &mdash; For educational purposes only
      </div>
    </div>
  );
}

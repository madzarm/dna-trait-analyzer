"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { Dna, ArrowRight, FileText, Share2 } from "lucide-react";
import type { Report } from "@/lib/supabase/types";

function confidenceColor(confidence: number): string {
  if (confidence >= 70) return "bg-primary";
  if (confidence >= 40) return "bg-amber-400";
  if (confidence >= 20) return "bg-orange-500";
  return "bg-red-500";
}

function confidenceLabel(confidence: number): string {
  if (confidence >= 70) return "High";
  if (confidence >= 40) return "Moderate";
  if (confidence >= 20) return "Low";
  return "Very Low";
}

function confidenceTextColor(confidence: number): string {
  if (confidence >= 70) return "text-primary";
  if (confidence >= 40) return "text-amber-400";
  if (confidence >= 20) return "text-orange-500";
  return "text-red-500";
}

export default function ReportsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/auth/login");
      return;
    }

    const fetchReports = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setReports(data as Report[]);
      }
      setLoading(false);
    };

    fetchReports();
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 py-20">
        <div className="flex items-center justify-center gap-3 text-muted-foreground">
          <Dna className="h-5 w-5 animate-spin text-primary" />
          <span className="text-sm font-mono">Loading reports...</span>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-medium text-primary uppercase tracking-wider font-mono">
            Your Library
          </p>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-display">
              Reports
            </h1>
            {reports.length > 0 && (
              <span className="text-sm text-muted-foreground/50 font-mono tabular-nums">
                {reports.length}
              </span>
            )}
          </div>
        </div>
        <Link href="/">
          <Button className="rounded-full font-display cursor-pointer w-full sm:w-auto" size="sm">
            New Analysis
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>

      {reports.length === 0 ? (
        /* Empty state */
        <div className="py-20 space-y-6">
          <div className="space-y-3">
            <div className="h-12 w-12 rounded-xl bg-muted/50 flex items-center justify-center">
              <FileText className="h-6 w-6 text-muted-foreground/40" />
            </div>
            <h3 className="text-xl font-semibold font-display">No reports yet</h3>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Upload your DNA data and ask about any trait to generate your first analysis report.
            </p>
          </div>
          <Link href="/">
            <Button className="rounded-full font-display cursor-pointer">
              Analyze Your DNA
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {reports.map((report) => {
            const pct = Math.round(report.confidence);
            return (
              <Link key={report.id} href={`/reports/${report.id}`} className="block group">
                <div className="rounded-xl border border-border/20 p-5 transition-all duration-200 hover:border-primary/15 hover:bg-card/50 cursor-pointer">
                  {/* Top: trait + date */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="min-w-0">
                      <h3 className="font-display font-bold text-lg capitalize truncate group-hover:text-primary transition-colors">
                        {report.trait}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                        {report.summary}
                      </p>
                    </div>
                    <span className="text-[10px] text-muted-foreground/50 shrink-0 font-mono tabular-nums mt-1">
                      {new Date(report.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Bottom: confidence bar + badges */}
                  <div className="flex items-center gap-4">
                    {/* Mini confidence bar */}
                    <div className="flex items-center gap-2.5 flex-1">
                      <span className={`text-sm font-bold font-display tabular-nums ${confidenceTextColor(report.confidence)}`}>
                        {pct}%
                      </span>
                      <div className="flex-1 max-w-32 h-1.5 rounded-full bg-muted/60 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${confidenceColor(report.confidence)}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-mono">
                        {confidenceLabel(report.confidence)}
                      </span>
                    </div>

                    {/* Badges */}
                    <div className="flex items-center gap-2 shrink-0">
                      {report.is_public && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/8 px-2 py-0.5">
                          <Share2 className="h-2.5 w-2.5 text-primary" />
                          <span className="text-[10px] font-medium text-primary">Shared</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

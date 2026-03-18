"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ConfidenceMeter } from "@/components/ConfidenceMeter";
import { SnpTable } from "@/components/SnpTable";
import { PrintReportButton } from "@/components/PrintReportButton";
import { SocialShareButtons } from "@/components/SocialShareButtons";
import { ChevronRight, Printer, Share2 } from "lucide-react";
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
      <div className="max-w-3xl mx-auto p-6 py-12">
        <div className="text-center text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!report) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 py-8 space-y-6">
      {/* Print-only branded header */}
      <div data-print-header className="hidden">
        <span className="print-logo">DNA Trait Analyzer</span>
        <span className="print-date">
          Generated {new Date(report.created_at).toLocaleDateString()}
        </span>
      </div>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground print:hidden">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/reports" className="hover:text-foreground transition-colors">
          Reports
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground capitalize">{report.trait}</span>
      </nav>

      {/* Header area outside card */}
      <div className="flex items-start justify-between gap-4 print:hidden">
        <div>
          <h1 className="font-display text-3xl font-bold capitalize">{report.trait}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {report.summary}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <PrintReportButton />
          <Button
            size="sm"
            variant="outline"
            onClick={handleShare}
            disabled={sharing || !!shareUrl}
          >
            <Share2 className="h-4 w-4 mr-1.5" />
            {sharing ? "Sharing..." : shareUrl ? "Shared" : "Share"}
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <ConfidenceMeter confidence={report.confidence} />

          <div>
            <h3 className="font-semibold mb-2">Your Genetic Profile</h3>
            <SnpTable matches={report.snp_matches as unknown as SNPMatch[]} />
          </div>

          <div>
            <h3 className="font-semibold mb-2">Detailed Analysis</h3>
            <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {report.interpretation}
            </div>
          </div>

          {report.sources.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Research Sources</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                {report.sources.map((source, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-muted-foreground/50 select-none">
                      &bull;
                    </span>
                    {source}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Alert>
            <AlertDescription className="text-xs">
              {report.disclaimer}
            </AlertDescription>
          </Alert>

          <div className="border-t pt-4 space-y-3">
            <h3 className="font-semibold">Sharing</h3>
            {shareUrl ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="flex-1 text-sm bg-muted px-3 py-2 rounded-md border"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigator.clipboard.writeText(shareUrl)}
                  >
                    Copy
                  </Button>
                </div>
                <SocialShareButtons trait={report.trait} />
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive"
                  onClick={handleUnshare}
                >
                  Remove Share Link
                </Button>
              </div>
            ) : (
              <Button size="sm" onClick={handleShare} disabled={sharing}>
                {sharing ? "Creating link..." : "Create Share Link"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Print-only branded footer */}
      <div data-print-footer className="hidden">
        DNA Trait Analyzer &mdash; AI-powered genetic trait analysis &mdash; For educational purposes only
      </div>
    </div>
  );
}

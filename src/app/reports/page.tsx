"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dna } from "lucide-react";
import type { Report } from "@/lib/supabase/types";

function confidenceColor(confidence: number): string {
  if (confidence >= 0.75) return "bg-primary"; // teal
  if (confidence >= 0.5) return "bg-amber-400"; // amber
  if (confidence >= 0.25) return "bg-orange-500"; // orange
  return "bg-red-500"; // red
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
      <div className="max-w-3xl mx-auto p-6 py-12">
        <div className="text-center text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-2xl font-bold">My Reports</h1>
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
            {reports.length}
          </span>
        </div>
        <Link href="/">
          <Button className="bg-primary hover:bg-primary/90">New Analysis</Button>
        </Link>
      </div>

      {reports.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center space-y-4">
            <Dna className="h-16 w-16 text-muted-foreground/30 mx-auto" />
            <div className="space-y-2">
              <h3 className="font-display text-lg font-semibold">No reports yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Upload your DNA data and ask about any trait to generate your first report.
              </p>
            </div>
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90">
                Analyze Your DNA
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {reports.map((report) => (
            <Link key={report.id} href={`/reports/${report.id}`}>
              <Card className="transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-lg hover:shadow-glow-primary/5">
                <CardContent className="py-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1.5">
                      <div className={`h-3 w-3 rounded-full ${confidenceColor(report.confidence)}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-display font-semibold capitalize truncate">
                          {report.trait}
                        </h3>
                        <span className="text-xs text-muted-foreground shrink-0">
                          {new Date(report.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                        {report.summary}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-muted-foreground">
                          Confidence: {Math.round(report.confidence * 100)}%
                        </span>
                        {report.is_public && (
                          <span className="text-xs text-primary">Shared</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

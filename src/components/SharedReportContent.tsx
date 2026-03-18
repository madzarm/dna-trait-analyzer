"use client";

import { ConfidenceMeter } from "./ConfidenceMeter";
import { Badge } from "@/components/ui/badge";
import type { Report } from "@/lib/supabase/types";

/**
 * Public shared report view. Intentionally does NOT show raw genotype data
 * (userGenotype, riskAllele) for privacy. Only shows gene names, whether
 * the variant was present, and evidence strength.
 */
export function SharedReportContent({ report }: { report: Report }) {
  return (
    <>
      <ConfidenceMeter confidence={report.confidence} />

      {report.snp_matches.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Genetic Variants Analyzed</h3>
          <p className="text-xs text-muted-foreground mb-3">
            Raw genotype data is hidden for privacy. Only variant summary is shown.
          </p>
          <div className="space-y-2">
            {report.snp_matches.map((match, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-sm border rounded-md px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs">{match.rsid}</span>
                  <span className="text-muted-foreground">{match.gene}</span>
                </div>
                <div className="flex items-center gap-2">
                  {match.hasRiskAllele ? (
                    <Badge variant="default">Present</Badge>
                  ) : (
                    <Badge variant="secondary">Not present</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-semibold mb-2">Detailed Analysis</h3>
        <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {report.interpretation}
        </div>
      </div>
    </>
  );
}

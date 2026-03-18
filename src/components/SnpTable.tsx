"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { SNPMatch, EvidenceStrength } from "@/lib/types";

interface SnpTableProps {
  matches: SNPMatch[];
}

const evidenceBadge: Record<
  EvidenceStrength,
  { label: string; className: string }
> = {
  strong: {
    label: "Strong",
    className: "bg-primary/10 text-primary border-primary/30",
  },
  moderate: {
    label: "Moderate",
    className: "bg-amber-400/10 text-amber-500 border-amber-400/30",
  },
  preliminary: {
    label: "Preliminary",
    className: "bg-orange-500/10 text-orange-500 border-orange-500/30",
  },
};

export function SnpTable({ matches }: SnpTableProps) {
  if (matches.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-4">
        None of the researched SNPs were found in your DNA data.
      </p>
    );
  }

  // Sort by evidence strength: strong > moderate > preliminary
  const order: Record<EvidenceStrength, number> = { strong: 0, moderate: 1, preliminary: 2 };
  const sorted = [...matches].sort(
    (a, b) => (order[a.evidenceStrength] ?? 1) - (order[b.evidenceStrength] ?? 1)
  );

  const presentCount = sorted.filter((m) => m.hasRiskAllele).length;

  return (
    <>
      {/* Count summary */}
      <p className="text-sm text-muted-foreground mb-3">
        {sorted.length} SNPs analyzed, {presentCount} variant{presentCount !== 1 ? "s" : ""} present
      </p>

      {/* Desktop table view */}
      <div className="hidden md:block rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-surface-sunken hover:bg-surface-sunken">
              <TableHead>SNP</TableHead>
              <TableHead>Gene</TableHead>
              <TableHead>Your Genotype</TableHead>
              <TableHead>Allele</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Evidence</TableHead>
              <TableHead className="hidden lg:table-cell">Effect Size</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((match, idx) => {
              const ev = evidenceBadge[match.evidenceStrength] ?? evidenceBadge.moderate;
              return (
                <TableRow
                  key={match.rsid}
                  className={idx % 2 === 0 ? "bg-transparent" : "bg-muted/30"}
                >
                  <TableCell className="font-mono text-sm">{match.rsid}</TableCell>
                  <TableCell className="font-medium">{match.gene}</TableCell>
                  <TableCell className="font-mono">{match.userGenotype}</TableCell>
                  <TableCell className="font-mono">{match.riskAllele}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          match.hasRiskAllele ? "bg-primary" : "bg-muted-foreground/40"
                        }`}
                      />
                      <span className="text-sm">
                        {match.hasRiskAllele ? "Present" : "Not present"}
                      </span>
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${ev.className}`}
                    >
                      {ev.label}
                    </span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground max-w-xs">
                    {match.effectSize}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Mobile card view */}
      <div className="md:hidden space-y-3">
        {sorted.map((match) => {
          const ev = evidenceBadge[match.evidenceStrength] ?? evidenceBadge.moderate;
          return (
            <div
              key={match.rsid}
              className={`rounded-md border p-3 space-y-2 border-l-4 ${
                match.hasRiskAllele ? "border-l-primary" : "border-l-muted-foreground/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-medium">{match.rsid}</span>
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      match.hasRiskAllele ? "bg-primary" : "bg-muted-foreground/40"
                    }`}
                  />
                  <span className="text-xs">
                    {match.hasRiskAllele ? "Present" : "Not present"}
                  </span>
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <div className="text-muted-foreground">Gene</div>
                <div className="font-medium">{match.gene}</div>
                <div className="text-muted-foreground">Genotype</div>
                <div className="font-mono">{match.userGenotype}</div>
                <div className="text-muted-foreground">Risk Allele</div>
                <div className="font-mono">{match.riskAllele}</div>
                <div className="text-muted-foreground">Evidence</div>
                <div>
                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${ev.className}`}
                  >
                    {ev.label}
                  </span>
                </div>
              </div>
              {match.effectSize && (
                <p className="text-xs text-muted-foreground pt-1 border-t">
                  {match.effectSize}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

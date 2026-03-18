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
      <div className="rounded-2xl border border-border/20 bg-muted/30 p-8 text-center">
        <p className="text-sm text-muted-foreground">
          None of the researched SNPs were found in your DNA data.
        </p>
      </div>
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
      {/* Summary bar */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground tabular-nums">{presentCount}</span> variant{presentCount !== 1 ? "s" : ""} present
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
          <span className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground tabular-nums">{sorted.length - presentCount}</span> not present
          </span>
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block rounded-xl border border-border/20 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-border/20">
              <TableHead className="text-[10px] uppercase tracking-wider font-mono font-medium text-muted-foreground/60">SNP</TableHead>
              <TableHead className="text-[10px] uppercase tracking-wider font-mono font-medium text-muted-foreground/60">Gene</TableHead>
              <TableHead className="text-[10px] uppercase tracking-wider font-mono font-medium text-muted-foreground/60">Genotype</TableHead>
              <TableHead className="text-[10px] uppercase tracking-wider font-mono font-medium text-muted-foreground/60">Allele</TableHead>
              <TableHead className="text-[10px] uppercase tracking-wider font-mono font-medium text-muted-foreground/60">Status</TableHead>
              <TableHead className="text-[10px] uppercase tracking-wider font-mono font-medium text-muted-foreground/60">Evidence</TableHead>
              <TableHead className="hidden lg:table-cell text-[10px] uppercase tracking-wider font-mono font-medium text-muted-foreground/60">Effect</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((match) => {
              const ev = evidenceBadge[match.evidenceStrength] ?? evidenceBadge.moderate;
              return (
                <TableRow
                  key={match.rsid}
                  className={`border-b border-border/10 transition-colors ${
                    match.hasRiskAllele
                      ? "bg-primary/[0.02] hover:bg-primary/[0.04]"
                      : "hover:bg-muted/20"
                  }`}
                >
                  <TableCell className="font-mono text-sm text-primary font-medium">{match.rsid}</TableCell>
                  <TableCell className="font-medium">{match.gene}</TableCell>
                  <TableCell className="font-mono tabular-nums">{match.userGenotype}</TableCell>
                  <TableCell className="font-mono tabular-nums">{match.riskAllele}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          match.hasRiskAllele ? "bg-primary" : "bg-muted-foreground/30"
                        }`}
                      />
                      <span className="text-sm">
                        {match.hasRiskAllele ? "Present" : "Not present"}
                      </span>
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${ev.className}`}
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

      {/* Mobile cards */}
      <div className="md:hidden space-y-2">
        {sorted.map((match) => {
          const ev = evidenceBadge[match.evidenceStrength] ?? evidenceBadge.moderate;
          const isPresent = match.hasRiskAllele;
          return (
            <div
              key={match.rsid}
              className={`rounded-xl p-4 space-y-3 transition-colors ${
                isPresent
                  ? "bg-primary/[0.03] border border-primary/15"
                  : "bg-muted/20 border border-border/15"
              }`}
            >
              {/* Top row: rsid + status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      isPresent ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                  />
                  <span className="font-mono text-sm font-semibold text-primary">{match.rsid}</span>
                </div>
                <span
                  className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${ev.className}`}
                >
                  {ev.label}
                </span>
              </div>

              {/* Gene + genotype row */}
              <div className="flex items-center gap-6 text-sm">
                <div>
                  <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-mono block">Gene</span>
                  <span className="font-medium">{match.gene}</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-mono block">Genotype</span>
                  <span className="font-mono tabular-nums">{match.userGenotype}</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-mono block">Allele</span>
                  <span className="font-mono tabular-nums">{match.riskAllele}</span>
                </div>
              </div>

              {/* Effect size */}
              {match.effectSize && (
                <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border/10">
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

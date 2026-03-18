"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { SNPMatch, EvidenceStrength } from "@/lib/types";

interface SnpTableProps {
  matches: SNPMatch[];
}

const evidenceBadge: Record<
  EvidenceStrength,
  { label: string; className: string }
> = {
  strong: { label: "Strong", className: "bg-green-100 text-green-800 border-green-200" },
  moderate: { label: "Moderate", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  preliminary: { label: "Preliminary", className: "bg-orange-100 text-orange-800 border-orange-200" },
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

  return (
    <>
      {/* Desktop table view */}
      <div className="hidden md:block rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
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
            {sorted.map((match) => {
              const ev = evidenceBadge[match.evidenceStrength] ?? evidenceBadge.moderate;
              return (
                <TableRow key={match.rsid}>
                  <TableCell className="font-mono text-sm">{match.rsid}</TableCell>
                  <TableCell className="font-medium">{match.gene}</TableCell>
                  <TableCell className="font-mono">{match.userGenotype}</TableCell>
                  <TableCell className="font-mono">{match.riskAllele}</TableCell>
                  <TableCell>
                    {match.hasRiskAllele ? (
                      <Badge variant="default">Present</Badge>
                    ) : (
                      <Badge variant="secondary">Not present</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${ev.className}`}>
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
            <div key={match.rsid} className="rounded-md border p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-medium">{match.rsid}</span>
                {match.hasRiskAllele ? (
                  <Badge variant="default">Present</Badge>
                ) : (
                  <Badge variant="secondary">Not present</Badge>
                )}
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
                  <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${ev.className}`}>
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

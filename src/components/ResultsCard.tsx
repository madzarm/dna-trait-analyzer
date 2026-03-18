"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ConfidenceMeter } from "./ConfidenceMeter";
import { SnpTable } from "./SnpTable";
import type { AnalysisResult } from "@/lib/types";

interface ResultsCardProps {
  result: AnalysisResult;
  onNewAnalysis: () => void;
}

export function ResultsCard({ result, onNewAnalysis }: ResultsCardProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="capitalize">{result.trait}</CardTitle>
          <CardDescription>{result.summary}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ConfidenceMeter confidence={result.confidence} />

          <div>
            <h3 className="font-semibold mb-2">Your Genetic Profile</h3>
            <SnpTable matches={result.snpMatches} />
          </div>

          <div>
            <h3 className="font-semibold mb-2">Detailed Analysis</h3>
            <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {result.interpretation}
            </div>
          </div>

          {result.sources.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Research Sources</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                {result.sources.map((source, i) => (
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
              {result.disclaimer}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <div className="text-center">
        <button
          onClick={onNewAnalysis}
          className="text-sm text-primary hover:underline"
        >
          Analyze another trait
        </button>
      </div>
    </div>
  );
}

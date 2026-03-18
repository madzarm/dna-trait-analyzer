"use client";

import { Progress } from "@/components/ui/progress";

interface ConfidenceMeterProps {
  confidence: number;
}

function getConfidenceLabel(confidence: number): string {
  if (confidence >= 70) return "High confidence";
  if (confidence >= 40) return "Moderate confidence";
  if (confidence >= 20) return "Low confidence";
  return "Very low confidence";
}

function getConfidenceColor(confidence: number): string {
  if (confidence >= 70) return "text-green-600";
  if (confidence >= 40) return "text-yellow-600";
  if (confidence >= 20) return "text-orange-600";
  return "text-red-600";
}

export function ConfidenceMeter({ confidence }: ConfidenceMeterProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Analysis Confidence</span>
        <span className={`text-sm font-semibold ${getConfidenceColor(confidence)}`}>
          {getConfidenceLabel(confidence)} ({confidence}%)
        </span>
      </div>
      <Progress value={confidence} className="h-2" />
      <p className="text-xs text-muted-foreground">
        Based on number of SNPs found, quality of research evidence, and
        coverage in your DNA data.
      </p>
    </div>
  );
}

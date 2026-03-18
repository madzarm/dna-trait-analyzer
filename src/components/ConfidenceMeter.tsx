"use client";

import { useEffect, useState } from "react";

interface ConfidenceMeterProps {
  confidence: number;
}

function getConfidenceLabel(confidence: number): string {
  if (confidence >= 70) return "High confidence";
  if (confidence >= 40) return "Moderate confidence";
  if (confidence >= 20) return "Low confidence";
  return "Very low confidence";
}

function getBarColor(confidence: number): string {
  if (confidence >= 70) return "bg-primary";
  if (confidence >= 40) return "bg-amber-400";
  if (confidence >= 20) return "bg-orange-500";
  return "bg-red-500";
}

function getTextColor(confidence: number): string {
  if (confidence >= 70) return "text-primary";
  if (confidence >= 40) return "text-amber-400";
  if (confidence >= 20) return "text-orange-500";
  return "text-red-500";
}

function getGlowColor(confidence: number): string {
  if (confidence >= 70) return "rgba(52, 217, 168, 0.3)";
  if (confidence >= 40) return "rgba(251, 191, 36, 0.3)";
  if (confidence >= 20) return "rgba(249, 115, 22, 0.3)";
  return "rgba(239, 68, 68, 0.3)";
}

function getBgTint(confidence: number): string {
  if (confidence >= 70) return "bg-primary/[0.04]";
  if (confidence >= 40) return "bg-amber-400/[0.04]";
  if (confidence >= 20) return "bg-orange-500/[0.04]";
  return "bg-red-500/[0.04]";
}

/* Tier boundaries for the graduated scale */
const TIERS = [
  { at: 0, label: "Very Low" },
  { at: 20, label: "Low" },
  { at: 40, label: "Moderate" },
  { at: 70, label: "High" },
];

export function ConfidenceMeter({ confidence }: ConfidenceMeterProps) {
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setAnimatedWidth(confidence);
    });
    return () => cancelAnimationFrame(timer);
  }, [confidence]);

  return (
    <div className={`rounded-2xl ${getBgTint(confidence)} p-5 md:p-6 space-y-4`}>
      {/* Header row: large score + label */}
      <div className="flex items-end justify-between">
        <div className="flex items-baseline gap-3">
          <span
            className={`text-5xl md:text-6xl font-bold tabular-nums font-display leading-none ${getTextColor(confidence)}`}
          >
            {confidence}
          </span>
          <div className="flex flex-col pb-1">
            <span className={`text-sm font-semibold ${getTextColor(confidence)}`}>
              {getConfidenceLabel(confidence)}
            </span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono mt-0.5">
              out of 100
            </span>
          </div>
        </div>
      </div>

      {/* Graduated bar with tier markers */}
      <div className="space-y-2">
        <div className="relative h-3 rounded-full bg-muted/80 overflow-hidden">
          <div
            className={`h-full rounded-full ${getBarColor(confidence)} transition-all duration-1000 ease-out`}
            style={{
              width: `${animatedWidth}%`,
              boxShadow: `0 0 16px ${getGlowColor(confidence)}`,
            }}
          />
          {/* Tier tick marks */}
          {[20, 40, 70].map((tick) => (
            <div
              key={tick}
              className="absolute top-0 bottom-0 w-px bg-background/40"
              style={{ left: `${tick}%` }}
            />
          ))}
        </div>

        {/* Tier labels below bar */}
        <div className="relative h-4">
          {TIERS.map((tier) => (
            <span
              key={tier.at}
              className="absolute text-[9px] text-muted-foreground/50 uppercase tracking-wider -translate-x-1/2 font-mono"
              style={{ left: `${tier.at + (tier.at === 0 ? 2 : tier.at === 70 ? -3 : 0)}%` }}
            >
              {tier.label}
            </span>
          ))}
        </div>
      </div>

      {/* Basis description */}
      <p className="text-xs text-muted-foreground leading-relaxed">
        Based on number of SNPs found, quality of research evidence, and
        coverage in your DNA data.
      </p>
    </div>
  );
}

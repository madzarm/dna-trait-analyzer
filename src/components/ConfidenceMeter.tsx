"use client";

import { useEffect, useState } from "react";

interface ConfidenceMeterProps {
  confidence: number;
}

interface SegmentConfig {
  min: number;
  max: number;
  color: string;
  glowColor: string;
  label: string;
}

const SEGMENTS: SegmentConfig[] = [
  { min: 0, max: 25, color: "bg-red-500", glowColor: "shadow-red-500/40", label: "Very low confidence" },
  { min: 25, max: 50, color: "bg-orange-500", glowColor: "shadow-orange-500/40", label: "Low confidence" },
  { min: 50, max: 75, color: "bg-amber-400", glowColor: "shadow-amber-400/40", label: "Moderate confidence" },
  { min: 75, max: 100, color: "bg-primary", glowColor: "shadow-primary/40", label: "High confidence" },
];

function getConfidenceLabel(confidence: number): string {
  if (confidence >= 70) return "High confidence";
  if (confidence >= 40) return "Moderate confidence";
  if (confidence >= 20) return "Low confidence";
  return "Very low confidence";
}

function getConfidenceTextColor(confidence: number): string {
  if (confidence >= 70) return "text-primary";
  if (confidence >= 40) return "text-amber-400";
  if (confidence >= 20) return "text-orange-500";
  return "text-red-500";
}

export function ConfidenceMeter({ confidence }: ConfidenceMeterProps) {
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    // Trigger animation on mount
    const timer = requestAnimationFrame(() => {
      setAnimatedWidth(confidence);
    });
    return () => cancelAnimationFrame(timer);
  }, [confidence]);

  // Determine which segment is active (the one the confidence falls within)
  const activeSegmentIndex = SEGMENTS.findIndex(
    (seg) => confidence > seg.min && confidence <= seg.max
  );
  // If confidence is 0, no segment is active; handle edge
  const resolvedActiveIndex = confidence <= 0 ? -1 : activeSegmentIndex === -1 ? 0 : activeSegmentIndex;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        {/* Large percentage number */}
        <span className={`text-3xl font-display font-bold tabular-nums ${getConfidenceTextColor(confidence)}`}>
          {confidence}%
        </span>
        <div className="flex-1">
          {/* Confidence label */}
          <span className={`text-sm font-medium ${getConfidenceTextColor(confidence)}`}>
            {getConfidenceLabel(confidence)}
          </span>
          {/* Multi-segment progress bar */}
          <div className="flex gap-1 mt-1.5">
            {SEGMENTS.map((seg, i) => {
              // Calculate how full this segment should be (0 to 1)
              const segmentRange = seg.max - seg.min;
              let fillPercent = 0;
              if (animatedWidth >= seg.max) {
                fillPercent = 100;
              } else if (animatedWidth > seg.min) {
                fillPercent = ((animatedWidth - seg.min) / segmentRange) * 100;
              }

              const isActive = i === resolvedActiveIndex;

              return (
                <div
                  key={i}
                  className="relative flex-1 h-2.5 rounded-full bg-muted overflow-hidden"
                >
                  <div
                    className={`h-full rounded-full ${seg.color} transition-all duration-1000 ease-out ${
                      isActive ? `shadow-md ${seg.glowColor}` : ""
                    }`}
                    style={{ width: `${fillPercent}%` }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Based on number of SNPs found, quality of research evidence, and
        coverage in your DNA data.
      </p>
    </div>
  );
}

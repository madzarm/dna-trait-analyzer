"use client";

import { useState } from "react";
import { Search, ArrowRight, Loader2 } from "lucide-react";

const EXAMPLE_TRAITS = [
  "Caffeine metabolism",
  "Lactose intolerance",
  "Eye color",
  "Alcohol flush reaction",
  "Muscle fiber type",
  "Vitamin D levels",
  "Sleep patterns",
  "Pain sensitivity",
];

interface TraitInputProps {
  onSubmit: (trait: string) => void;
  isAnalyzing: boolean;
}

export function TraitInput({ onSubmit, isAnalyzing }: TraitInputProps) {
  const [trait, setTrait] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trait.trim() && !isAnalyzing) {
      onSubmit(trait.trim());
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="font-display text-lg font-medium text-foreground">
        What trait are you curious about?
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="relative flex items-center h-14 rounded-lg border border-input bg-background focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 transition-all">
          <Search className="absolute left-4 h-5 w-5 text-muted-foreground pointer-events-none" />
          <input
            value={trait}
            onChange={(e) => setTrait(e.target.value)}
            placeholder="Enter any trait (e.g., caffeine metabolism)"
            disabled={isAnalyzing}
            className="h-full w-full bg-transparent pl-12 pr-14 text-base outline-none placeholder:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 md:text-sm"
          />
          <button
            type="submit"
            disabled={!trait.trim() || isAnalyzing}
            className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )}
          </button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground py-1">Try:</span>
        {EXAMPLE_TRAITS.map((example) => (
          <button
            key={example}
            type="button"
            className="inline-flex items-center rounded-full border border-primary/30 px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isAnalyzing}
            onClick={() => {
              if (!isAnalyzing) {
                setTrait(example);
                onSubmit(example);
              }
            }}
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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
      <form onSubmit={handleSubmit} className="flex gap-3">
        <Input
          value={trait}
          onChange={(e) => setTrait(e.target.value)}
          placeholder="Enter any trait (e.g., caffeine metabolism)"
          disabled={isAnalyzing}
          className="flex-1"
        />
        <Button type="submit" disabled={!trait.trim() || isAnalyzing}>
          {isAnalyzing ? "Analyzing..." : "Analyze"}
        </Button>
      </form>

      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground py-1">Try:</span>
        {EXAMPLE_TRAITS.map((example) => (
          <Badge
            key={example}
            variant="secondary"
            className="cursor-pointer hover:bg-secondary/80 transition-colors"
            onClick={() => {
              if (!isAnalyzing) {
                setTrait(example);
                onSubmit(example);
              }
            }}
          >
            {example}
          </Badge>
        ))}
      </div>
    </div>
  );
}

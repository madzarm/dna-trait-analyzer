"use client";

import { useState } from "react";
import {
  Search,
  ArrowRight,
  Loader2,
  Coffee,
  Eye,
  Zap,
  Droplets,
  Moon,
  Activity,
  Sun,
  FlaskConical,
  Heart,
} from "lucide-react";

const TRAIT_SUGGESTIONS = [
  { icon: Coffee, name: "Caffeine metabolism", category: "Nutrition" },
  { icon: Droplets, name: "Lactose intolerance", category: "Nutrition" },
  { icon: Eye, name: "Eye color", category: "Physical" },
  { icon: Zap, name: "Muscle fiber type", category: "Physical" },
  { icon: Moon, name: "Sleep patterns", category: "Wellness" },
  { icon: Activity, name: "Alcohol flush reaction", category: "Wellness" },
  { icon: Sun, name: "Vitamin D levels", category: "Nutrition" },
  { icon: FlaskConical, name: "Bitter taste", category: "Physical" },
  { icon: Heart, name: "Pain sensitivity", category: "Wellness" },
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
    <div className="space-y-8">
      {/* Search bar — the hero element */}
      <form onSubmit={handleSubmit}>
        <div className="relative group">
          {/* Glow behind input on focus */}
          <div className="absolute -inset-1 rounded-2xl bg-primary/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-xl" />
          <div className="relative flex items-center h-16 rounded-2xl border border-border/30 bg-card/80 backdrop-blur-sm focus-within:border-primary/40 focus-within:shadow-[0_0_30px_var(--glow-primary)] transition-all duration-300">
            <Search className="absolute left-5 h-5 w-5 text-muted-foreground/50 pointer-events-none" />
            <input
              value={trait}
              onChange={(e) => setTrait(e.target.value)}
              placeholder="Ask about any trait..."
              disabled={isAnalyzing}
              className="h-full w-full bg-transparent pl-14 pr-16 text-base outline-none placeholder:text-muted-foreground/40 disabled:pointer-events-none disabled:opacity-50 rounded-2xl"
            />
            <button
              type="submit"
              disabled={!trait.trim() || isAnalyzing}
              className="absolute right-2.5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:shadow-[0_0_16px_var(--glow-primary)] disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none cursor-pointer"
            >
              {isAnalyzing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Trait suggestions — visual grid, not tiny chips */}
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground/50 uppercase tracking-wider font-mono">
          Popular traits to explore
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {TRAIT_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion.name}
              type="button"
              disabled={isAnalyzing}
              onClick={() => {
                if (!isAnalyzing) {
                  setTrait(suggestion.name);
                  onSubmit(suggestion.name);
                }
              }}
              className="group/chip flex items-center gap-2.5 rounded-xl border border-border/20 bg-card/30 px-3.5 py-3 text-left transition-all duration-200 hover:border-primary/25 hover:bg-primary/[0.04] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <suggestion.icon className="h-4 w-4 text-muted-foreground/40 group-hover/chip:text-primary transition-colors shrink-0" />
              <span className="text-xs font-medium text-muted-foreground group-hover/chip:text-foreground transition-colors truncate">
                {suggestion.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

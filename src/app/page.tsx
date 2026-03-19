"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { UploadDropzone } from "@/components/UploadDropzone";
import { ConsentGate } from "@/components/ConsentGate";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Upload,
  Search,
  BarChart3,
  ShieldCheck,
  ChevronDown,
  Lock,
  ArrowRight,
  Eye,
  Coffee,
  Moon,
  Zap,
  Droplets,
  Activity,
  FlaskConical,
  Sun,
  Dna,
  Database,
  ChevronRight,
  Sparkles,
  Brain,
} from "lucide-react";

/* ── Scroll-reveal wrapper ──────────────────────────── */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── DNA sequence string for background strips ──────── */

const DNA_SEQ =
  "ATCG TAGC AATT CCGG GCTA ATCG TGCA CTAG AATT GCGC TAGC ATCG CCGG AATT TGCA GCTA ATCG TAGC AATT CCGG ";

/* ── Page ────────────────────────────────────────────── */

export default function Home() {
  const router = useRouter();

  const handleUploadComplete = (sessionId: string, snpCount: number) => {
    router.push(`/analyze?session=${sessionId}&snps=${snpCount}`);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ═══════════════════════════════════════════════════
          1. HERO — left-aligned on desktop, visible atmosphere
          ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        {/* Background layers */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 hero-grid" />

          {/* Visible warm blobs — scaled down on mobile */}
          <div
            className="absolute top-[15%] left-[10%] h-[300px] w-[300px] sm:h-[450px] sm:w-[450px] md:h-[600px] md:w-[600px] rounded-full blur-[100px] sm:blur-[140px]"
            style={{
              background: "var(--primary)",
              opacity: 0.06,
              animation: "float-blob-1 20s ease-in-out infinite",
            }}
          />
          <div
            className="absolute bottom-[20%] right-[5%] h-[250px] w-[250px] sm:h-[375px] sm:w-[375px] md:h-[500px] md:w-[500px] rounded-full blur-[80px] sm:blur-[120px]"
            style={{
              background: "var(--accent)",
              opacity: 0.05,
              animation: "float-blob-2 25s ease-in-out infinite",
            }}
          />
          <div
            className="absolute top-[60%] left-[50%] h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] md:h-[400px] md:w-[400px] -translate-x-1/2 rounded-full blur-[80px] sm:blur-[100px]"
            style={{
              background: "var(--primary)",
              opacity: 0.04,
              animation: "float-blob-3 18s ease-in-out infinite",
            }}
          />

          {/* DNA sequence strips — more visible */}
          <div className="absolute top-[22%] left-0 w-full overflow-hidden pointer-events-none select-none">
            <div
              className="whitespace-nowrap font-mono text-sm tracking-[0.5em] text-primary opacity-[0.06]"
              style={{ animation: "sequence-scroll 80s linear infinite", width: "200%" }}
            >
              {DNA_SEQ.repeat(8)}
            </div>
          </div>
          <div className="absolute top-[48%] left-0 w-full overflow-hidden pointer-events-none select-none">
            <div
              className="whitespace-nowrap font-mono text-[11px] tracking-[0.4em] text-primary opacity-[0.04]"
              style={{ animation: "sequence-scroll 120s linear infinite reverse", width: "200%" }}
            >
              {DNA_SEQ.repeat(10)}
            </div>
          </div>
          <div className="absolute top-[72%] left-0 w-full overflow-hidden pointer-events-none select-none">
            <div
              className="whitespace-nowrap font-mono text-base tracking-[0.6em] text-accent opacity-[0.05]"
              style={{ animation: "sequence-scroll 100s linear infinite", width: "200%" }}
            >
              {DNA_SEQ.repeat(6)}
            </div>
          </div>

          {/* Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 30% 50%, transparent 0%, var(--background) 75%)",
            }}
          />
        </div>

        {/* Hero content — left-aligned on desktop */}
        <div className="max-w-5xl w-full animate-fade-in-up">
          <div className="max-w-2xl space-y-6 text-left mx-auto md:mx-0">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
              <Dna className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary tracking-wide font-mono">
                AI-Powered Genetic Analysis
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] font-display">
              Your DNA Has{" "}
              <span className="text-gradient">Answers</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Upload your raw genetic data from any major provider. Ask about any
              trait. Get research-backed insights in under a minute.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-4 pt-2">
              <Button
                size="lg"
                onClick={() => scrollTo("upload-section")}
                className="h-13 px-8 text-base font-display rounded-full bg-primary text-primary-foreground hover:shadow-[0_0_30px_var(--glow-primary)] transition-all cursor-pointer"
              >
                <Upload className="h-5 w-5 mr-2" />
                Upload Your DNA File
              </Button>
              <button
                onClick={() => scrollTo("preview-section")}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer h-13 px-1"
              >
                See a sample analysis
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Provider strip */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-4">
              <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">
                Works with
              </span>
              <div className="h-px flex-1 max-w-8 bg-border/50 hidden sm:block" />
              {["23andMe", "AncestryDNA", "MyHeritage", "FTDNA"].map((p) => (
                <span key={p} className="text-xs text-muted-foreground/40 font-medium font-mono">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => scrollTo("stats-section")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/40 hover:text-muted-foreground transition-colors cursor-pointer"
          aria-label="Scroll to learn more"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </button>
      </section>

      <main className="flex flex-col">
        {/* ═══════════════════════════════════════════════════
            2. STATS — tight inline ticker, not a grid
            ═══════════════════════════════════════════════════ */}
        <section id="stats-section" className="w-full border-y border-border/30">
          <Reveal>
            <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              {[
                { value: "15,000+", label: "SNPs analyzed" },
                { value: "3", label: "research databases" },
                { value: "3-tier", label: "evidence grading" },
                { value: "<60s", label: "per analysis" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-3">
                  {i > 0 && <div className="hidden sm:block h-4 w-px bg-border/50 -ml-4" />}
                  <span className="text-lg font-bold font-display tabular-nums text-foreground">
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ═══════════════════════════════════════════════════
            3. HOW IT WORKS — numbered timeline, not cards
            ═══════════════════════════════════════════════════ */}
        <section className="w-full max-w-5xl mx-auto px-6 py-16 md:py-24">
          <Reveal>
            <div className="space-y-2 mb-10 md:mb-16">
              <p className="text-xs font-medium text-primary uppercase tracking-wider font-mono">
                How it works
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-display">
                Three steps to discovery
              </h2>
            </div>
          </Reveal>

          <div className="space-y-0">
            {[
              {
                step: "01",
                title: "Upload your DNA file",
                description: "Drag and drop your raw data from 23andMe, AncestryDNA, MyHeritage, or FTDNA. We support .csv, .txt, and .tsv formats.",
                trust: "Data is processed in memory and auto-deleted within 1 hour.",
                icon: Upload,
              },
              {
                step: "02",
                title: "Ask about any trait",
                description: "Type any trait you're curious about — caffeine metabolism, eye color, sleep patterns, muscle composition — anything.",
                trust: "AI researches published studies and SNP databases in real-time.",
                icon: Search,
              },
              {
                step: "03",
                title: "Get research-backed results",
                description: "Receive a detailed analysis with confidence ratings, evidence tiers, and peer-reviewed citations for every finding.",
                trust: "Every result is backed by ClinVar, GWAS Catalog, and published research.",
                icon: BarChart3,
              },
            ].map((item, i) => (
              <Reveal key={item.step} delay={i * 120}>
                <div className="flex gap-6 md:gap-10 group">
                  {/* Step number + vertical line */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="h-12 w-12 rounded-full border-2 border-primary/30 flex items-center justify-center group-hover:border-primary/60 group-hover:bg-primary/5 transition-colors">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    {i < 2 && <div className="w-px flex-1 bg-gradient-to-b from-primary/20 to-transparent min-h-8" />}
                  </div>
                  {/* Content */}
                  <div className="pb-12 last:pb-0">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-xs font-medium text-primary font-mono">{item.step}</span>
                      <h3 className="text-lg font-semibold font-display">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mb-3">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary/50 shrink-0" />
                      <span className="text-xs text-muted-foreground/70">{item.trust}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            4. SAMPLE PREVIEW — wider, asymmetric label
            ═══════════════════════════════════════════════════ */}
        <section id="preview-section" className="w-full py-16 md:py-24 relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, var(--glow-primary), transparent)",
            }}
          />

          <div className="max-w-5xl mx-auto px-6 relative">
            <Reveal>
              <div className="flex items-end justify-between mb-8">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-primary uppercase tracking-wider font-mono">
                    Sample result
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-display">
                    See what you&apos;ll get
                  </h2>
                </div>
                <p className="hidden md:block text-sm text-muted-foreground max-w-xs text-right">
                  Real example analysis. Upload your DNA to get personalized results like this.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <Card className="border-primary/15 overflow-hidden shadow-[0_4px_80px_var(--glow-primary)]">
                {/* Preview header bar */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-border/50 bg-primary/[0.03]">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-primary font-mono">
                      Sample Analysis
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground/50 font-mono">
                    Not your data — example only
                  </span>
                </div>

                <CardContent className="p-6 md:p-8">
                  {/* Two-column layout on desktop */}
                  <div className="grid md:grid-cols-[1fr_280px] gap-8">
                    {/* Left — main content */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold font-display">Caffeine Metabolism</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          CYP1A2 and related genes affecting caffeine processing speed
                        </p>
                      </div>

                      {/* SNP finding */}
                      <div className="rounded-lg border border-border/50 p-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <Dna className="h-4 w-4 text-primary" />
                          <span className="text-sm font-semibold">Key Finding</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">SNP</div>
                            <div className="text-sm font-medium text-primary font-mono">rs762551</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Gene</div>
                            <div className="text-sm font-medium">CYP1A2</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Genotype</div>
                            <div className="text-sm font-medium font-mono">A/A</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Evidence</div>
                            <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">Strong</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Interpretation */}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        &ldquo;Your genotype at CYP1A2 (rs762551) suggests you are likely a{" "}
                        <strong className="text-foreground">fast caffeine metabolizer</strong>.
                        The A/A genotype is associated with rapid caffeine clearance, meaning you may
                        tolerate higher caffeine intake without adverse effects...&rdquo;
                      </p>
                    </div>

                    {/* Right sidebar — stats + CTA */}
                    <div className="space-y-6 md:border-l md:border-border/30 md:pl-8">
                      {/* Confidence */}
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Confidence</span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-4xl font-bold text-primary font-display tabular-nums">72%</span>
                          <span className="text-xs text-primary font-medium">High</span>
                        </div>
                        <div className="relative h-1.5 rounded-full bg-muted mt-3 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: "72%", boxShadow: "0 0 12px var(--glow-primary)" }}
                          />
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">SNPs Found</span>
                          <div className="text-2xl font-bold font-display tabular-nums mt-1">3</div>
                        </div>
                        <div>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Sources</span>
                          <div className="text-2xl font-bold font-display tabular-nums mt-1">7</div>
                        </div>
                      </div>

                      <Button
                        onClick={() => scrollTo("upload-section")}
                        className="w-full cursor-pointer rounded-full font-display"
                      >
                        Get your own analysis
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            5. TRUST — horizontal rows, not card grid
            ═══════════════════════════════════════════════════ */}
        <section className="w-full max-w-5xl mx-auto px-6 py-16 md:py-24">
          <Reveal>
            <div className="space-y-2 mb-12">
              <p className="text-xs font-medium text-primary uppercase tracking-wider font-mono">
                Trust & Privacy
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-display">
                Your data, your control
              </h2>
            </div>
          </Reveal>

          <div className="space-y-0 divide-y divide-border/30">
            {[
              {
                icon: Lock,
                title: "Privacy by Design",
                description: "Your DNA data lives in server memory for up to 1 hour, then it's permanently deleted. We don't have a genome database — we can't sell what we don't keep.",
              },
              {
                icon: Database,
                title: "Real Science",
                description: "Every finding is graded by evidence tier — Strong, Moderate, or Preliminary. We pull from ClinVar (NCBI), GWAS Catalog (EMBL-EBI), and published genomic studies.",
              },
              {
                icon: Brain,
                title: "AI + Transparency",
                description: "Claude AI interprets your results, but every claim links back to source research. You see the SNPs, the studies, and the reasoning — not just a conclusion.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="flex items-start gap-5 py-6 first:pt-0 group">
                  <div className="h-10 w-10 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 group-hover:bg-primary/12 transition-colors mt-0.5">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold font-display mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            6. EXPLORE TRAITS — grouped by category
            ═══════════════════════════════════════════════════ */}
        <section className="w-full py-16 md:py-24 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, var(--surface-sunken), transparent)",
            }}
          />

          <div className="max-w-5xl mx-auto px-6 relative">
            <Reveal>
              <div className="flex items-end justify-between mb-12">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-primary uppercase tracking-wider font-mono">
                    Explore
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-display">
                    What will you discover?
                  </h2>
                </div>
                <button
                  onClick={() => scrollTo("upload-section")}
                  className="hidden md:inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors cursor-pointer"
                >
                  Upload to explore all
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </Reveal>

            {/* Two groups side by side */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-12">
              {/* Physical & Nutrition */}
              <div className="space-y-4 min-w-0">
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/50">
                  Physical & Nutrition
                </span>
                {[
                  { icon: Coffee, name: "Caffeine Metabolism", gene: "CYP1A2", fact: "Fast or slow metabolizer — affects how your body processes caffeine" },
                  { icon: Droplets, name: "Lactose Tolerance", gene: "MCM6/LCT", fact: "65% of adults have reduced tolerance after childhood" },
                  { icon: Eye, name: "Eye Color", gene: "OCA2/HERC2", fact: "Chromosome 15 pigmentation genes determine your iris color" },
                  { icon: Zap, name: "Muscle Fiber Type", gene: "ACTN3", fact: "R577X variant affects your fast-twitch muscle ratio" },
                ].map((trait, i) => (
                  <Reveal key={trait.name} delay={i * 60}>
                    <button
                      onClick={() => scrollTo("upload-section")}
                      className="w-full text-left group flex items-center gap-3 sm:gap-4 rounded-xl border border-border/30 bg-card/50 p-3 sm:p-4 transition-all duration-200 hover:border-primary/20 hover:bg-card cursor-pointer"
                    >
                      <div className="h-9 w-9 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 group-hover:bg-primary/12 transition-colors">
                        <trait.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">{trait.name}</h3>
                          <span className="text-[10px] font-medium text-muted-foreground/40 font-mono ml-2 shrink-0 hidden sm:inline">{trait.gene}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">{trait.fact}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/20 group-hover:text-primary/40 transition-colors shrink-0" />
                    </button>
                  </Reveal>
                ))}
              </div>

              {/* Wellness & Health */}
              <div className="space-y-4 min-w-0">
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/50">
                  Wellness & Health
                </span>
                {[
                  { icon: Moon, name: "Sleep Chronotype", gene: "PER2/CRY1", fact: "PER2 mutations can shift your natural sleep cycle by hours" },
                  { icon: Activity, name: "Alcohol Flush", gene: "ALDH2", fact: "ALDH2*2 variant affects ~540 million people worldwide" },
                  { icon: Sun, name: "Vitamin D Levels", gene: "GC/CYP2R1", fact: "Variants affect how efficiently you metabolize vitamin D" },
                  { icon: FlaskConical, name: "Bitter Taste", gene: "TAS2R38", fact: "PAV/AVI haplotypes determine taste sensitivity" },
                ].map((trait, i) => (
                  <Reveal key={trait.name} delay={i * 60 + 50}>
                    <button
                      onClick={() => scrollTo("upload-section")}
                      className="w-full text-left group flex items-center gap-3 sm:gap-4 rounded-xl border border-border/30 bg-card/50 p-3 sm:p-4 transition-all duration-200 hover:border-primary/20 hover:bg-card cursor-pointer"
                    >
                      <div className="h-9 w-9 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 group-hover:bg-primary/12 transition-colors">
                        <trait.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">{trait.name}</h3>
                          <span className="text-[10px] font-medium text-muted-foreground/40 font-mono ml-2 shrink-0 hidden sm:inline">{trait.gene}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">{trait.fact}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/20 group-hover:text-primary/40 transition-colors shrink-0" />
                    </button>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            7. PRICING TEASER — full-width band
            ═══════════════════════════════════════════════════ */}
        <section className="w-full">
          <Reveal>
            <div
              className="border-y border-border/30"
              style={{
                background: "linear-gradient(135deg, var(--surface-sunken) 0%, var(--card) 50%, var(--surface-sunken) 100%)",
              }}
            >
              <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4 text-center md:text-left">
                  <Sparkles className="h-6 w-6 text-accent hidden md:block" />
                  <div>
                    <h3 className="text-lg font-semibold font-display">
                      Start free, upgrade when ready
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      3 free analyses included. Unlimited plans from $9.99/mo.
                    </p>
                  </div>
                </div>
                <Link href="/pricing">
                  <Button
                    variant="outline"
                    className="shrink-0 border-primary/30 text-primary hover:bg-primary/10 cursor-pointer rounded-full"
                  >
                    View Pricing
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ═══════════════════════════════════════════════════
            8. UPLOAD CTA — the destination
            ═══════════════════════════════════════════════════ */}
        <section
          id="upload-section"
          className="w-full max-w-2xl mx-auto px-6 py-16 md:py-28 relative overflow-hidden"
        >
          {/* Subtle glow behind the upload zone */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
            style={{ background: "var(--primary)", opacity: 0.04 }}
          />

          <Reveal>
            <div className="text-center space-y-3 mb-10 relative">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-display">
                Ready to explore your genetics?
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Upload your raw DNA data and get AI-powered trait insights in minutes.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative z-10">
              <ConsentGate>
                <UploadDropzone onUploadComplete={handleUploadComplete} />
              </ConsentGate>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mt-6 relative">
              <Lock className="h-3.5 w-3.5" />
              Processed securely in memory. Auto-deleted within 1 hour.
            </p>
          </Reveal>
        </section>
      </main>
    </div>
  );
}

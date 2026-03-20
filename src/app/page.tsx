"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { UploadDropzone } from "@/components/UploadDropzone";
import { ConsentGate } from "@/components/ConsentGate";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDemoStart } from "@/lib/use-demo-start";
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
  Check,
  X,
  Plus,
  Minus,
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

/* ── FAQ accordion item ─────────────────────────────── */

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border/30">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-5 text-left cursor-pointer group"
      >
        <span className="text-sm font-semibold font-display pr-8 group-hover:text-primary transition-colors">
          {question}
        </span>
        <div className="shrink-0 h-6 w-6 rounded-full border border-border/50 flex items-center justify-center group-hover:border-primary/30 transition-colors">
          {open ? (
            <Minus className="h-3 w-3 text-primary" />
          ) : (
            <Plus className="h-3 w-3 text-muted-foreground" />
          )}
        </div>
      </button>
      <div
        className={`grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm text-muted-foreground leading-relaxed pb-5 max-w-2xl">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Comparison cell helper ─────────────────────────── */

function ComparisonMark({ value }: { value: boolean | "partial" | string }) {
  if (value === true)
    return <Check className="h-4 w-4 text-primary mx-auto" />;
  if (value === "partial")
    return (
      <span className="text-[11px] text-accent font-medium">Partial</span>
    );
  if (value === false)
    return <X className="h-4 w-4 text-muted-foreground/30 mx-auto" />;
  return (
    <span className="text-[11px] text-muted-foreground font-mono">
      {value}
    </span>
  );
}

/* ── DNA sequence string for background strips ──────── */

const DNA_SEQ =
  "ATCG TAGC AATT CCGG GCTA ATCG TGCA CTAG AATT GCGC TAGC ATCG CCGG AATT TGCA GCTA ATCG TAGC AATT CCGG ";

/* ── Page ────────────────────────────────────────────── */

export default function Home() {
  const router = useRouter();
  const { startDemo, isStarting: isDemoStarting } = useDemoStart();

  const handleUploadComplete = (sessionId: string, snpCount: number) => {
    router.push(`/analyze?session=${sessionId}&snps=${snpCount}`);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ═══════════════════════════════════════════════════
          1. HERO
          ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        {/* Background layers */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 hero-grid" />

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

          {/* DNA sequence strips */}
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
              background:
                "radial-gradient(ellipse at 30% 50%, transparent 0%, var(--background) 75%)",
            }}
          />
        </div>

        {/* Hero content */}
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
              Ask Your DNA{" "}
              <span className="text-gradient">Anything</span>.
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Upload your raw DNA file and ask about any trait&mdash;caffeine
              metabolism, lactose intolerance, bitter taste perception, athletic
              potential. Our AI researches the genetics live, cross-references your
              actual DNA, and gives you evidence-backed answers in minutes.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-3 pt-2">
              <Button
                size="lg"
                onClick={() => scrollTo("upload-section")}
                className="h-13 px-8 text-base font-display rounded-full bg-primary text-primary-foreground hover:shadow-[0_0_30px_var(--glow-primary)] transition-all cursor-pointer"
              >
                <Upload className="h-5 w-5 mr-2" />
                Upload Your DNA &amp; Start Exploring
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={startDemo}
                disabled={isDemoStarting}
                className="h-13 px-6 text-base font-display rounded-full border-primary/30 text-primary hover:bg-primary/10 hover:shadow-[0_0_20px_var(--glow-primary)] transition-all cursor-pointer"
              >
                <FlaskConical className="h-5 w-5 mr-2" />
                {isDemoStarting ? "Loading..." : "Try a Demo"}
              </Button>
            </div>

            {/* Supporting copy */}
            <div className="flex flex-col sm:flex-row items-start gap-x-6 gap-y-1 pt-1">
              <p className="text-xs text-muted-foreground/50">
                Free to start &middot; No genetic counselor needed &middot; Data
                auto-deleted in 1 hour
              </p>
              <button
                onClick={() => scrollTo("preview-section")}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors cursor-pointer"
              >
                See example results
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {/* Provider strip */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-4">
              <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">
                Works with
              </span>
              <div className="h-px flex-1 max-w-8 bg-border/50 hidden sm:block" />
              {["23andMe", "AncestryDNA", "MyHeritage", "FTDNA"].map((p) => (
                <span
                  key={p}
                  className="text-xs text-muted-foreground/40 font-medium font-mono"
                >
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
            2. STATS
            ═══════════════════════════════════════════════════ */}
        <section id="stats-section" className="w-full border-y border-border/30">
          <Reveal>
            <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              {[
                { value: "609,000+", label: "SNPs cross-referenced" },
                { value: "3", label: "research databases" },
                { value: "3-tier", label: "evidence grading" },
                { value: "<60s", label: "per analysis" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-3">
                  {i > 0 && (
                    <div className="hidden sm:block h-4 w-px bg-border/50 -ml-4" />
                  )}
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
            2b. SOCIAL PROOF — inline trust badges
            ═══════════════════════════════════════════════════ */}
        <section className="w-full max-w-5xl mx-auto px-6 py-5">
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-primary/50" />
                <span className="text-xs text-muted-foreground/60">
                  Data auto-deleted in 1h
                </span>
              </div>
              <div className="hidden sm:block h-3 w-px bg-border/30" />
              <div className="flex items-center gap-2">
                <Database className="h-3.5 w-3.5 text-primary/50" />
                <span className="text-xs text-muted-foreground/60">
                  Peer-reviewed sources
                </span>
              </div>
              <div className="hidden sm:block h-3 w-px bg-border/30" />
              <div className="flex items-center gap-2">
                <Lock className="h-3.5 w-3.5 text-primary/50" />
                <span className="text-xs text-muted-foreground/60">
                  No account required
                </span>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ═══════════════════════════════════════════════════
            3. HOW IT WORKS
            ═══════════════════════════════════════════════════ */}
        <section className="w-full max-w-5xl mx-auto px-6 py-16 md:py-24">
          <Reveal>
            <div className="space-y-2 mb-10 md:mb-16">
              <p className="text-xs font-medium text-primary uppercase tracking-wider font-mono">
                How it works
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-display">
                See what your DNA can tell you
              </h2>
            </div>
          </Reveal>

          <div className="space-y-0">
            {[
              {
                step: "01",
                title: "Upload your raw DNA file",
                description:
                  "Download your raw DNA export from 23andMe, AncestryDNA, MyHeritage, or FamilyTreeDNA. It takes 30 seconds. Your file is processed instantly\u2014no waiting.",
                trust:
                  "Data is processed in memory and auto-deleted within 1 hour.",
                icon: Upload,
              },
              {
                step: "02",
                title: "Ask about any trait you\u2019re curious about",
                description:
                  "Don\u2019t see what you want to know? Ask anyway. Type your question\u2014\u201CCan I taste bitter flavors?\u201D \u201CAm I a night owl?\u201D \u201CHow fast is my metabolism?\u201D\u2014and our AI goes to work researching the genetics.",
                trust:
                  "AI researches published studies and SNP databases in real-time.",
                icon: Search,
              },
              {
                step: "03",
                title: "Get evidence-backed answers in minutes",
                description:
                  "No guesswork. You get a clear analysis of which genes influence your trait, how strong the science is, and exactly which SNPs in your DNA drive the conclusion. Every finding is cited with the research it\u2019s based on.",
                trust:
                  "Every result is backed by ClinVar, GWAS Catalog, and published research.",
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
                    {i < 2 && (
                      <div className="w-px flex-1 bg-gradient-to-b from-primary/20 to-transparent min-h-8" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pb-12 last:pb-0">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-xs font-medium text-primary font-mono">
                        {item.step}
                      </span>
                      <h3 className="text-lg font-semibold font-display">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mb-3">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary/50 shrink-0" />
                      <span className="text-xs text-muted-foreground/70">
                        {item.trust}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            4. SAMPLE PREVIEW
            ═══════════════════════════════════════════════════ */}
        <section id="preview-section" className="w-full py-16 md:py-24 relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--glow-primary), transparent)",
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
                  Real example analysis. Upload your DNA to get personalized
                  results like this.
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
                  <div className="grid md:grid-cols-[1fr_280px] gap-8">
                    {/* Left — main content */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold font-display">
                          Caffeine Metabolism
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          CYP1A2 and related genes affecting caffeine processing
                          speed
                        </p>
                      </div>

                      {/* SNP finding */}
                      <div className="rounded-lg border border-border/50 p-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <Dna className="h-4 w-4 text-primary" />
                          <span className="text-sm font-semibold">
                            Key Finding
                          </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                              SNP
                            </div>
                            <div className="text-sm font-medium text-primary font-mono">
                              rs762551
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                              Gene
                            </div>
                            <div className="text-sm font-medium">CYP1A2</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                              Genotype
                            </div>
                            <div className="text-sm font-medium font-mono">
                              A/A
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                              Evidence
                            </div>
                            <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">
                              Strong
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Interpretation */}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        &ldquo;Your genotype at CYP1A2 (rs762551) suggests you
                        are likely a{" "}
                        <strong className="text-foreground">
                          fast caffeine metabolizer
                        </strong>
                        . The A/A genotype is associated with rapid caffeine
                        clearance, meaning you may tolerate higher caffeine
                        intake without adverse effects...&rdquo;
                      </p>
                    </div>

                    {/* Right sidebar */}
                    <div className="space-y-6 md:border-l md:border-border/30 md:pl-8">
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                          Confidence
                        </span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-4xl font-bold text-primary font-display tabular-nums">
                            72%
                          </span>
                          <span className="text-xs text-primary font-medium">
                            High
                          </span>
                        </div>
                        <div className="relative h-1.5 rounded-full bg-muted mt-3 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{
                              width: "72%",
                              boxShadow: "0 0 12px var(--glow-primary)",
                            }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                            SNPs Found
                          </span>
                          <div className="text-2xl font-bold font-display tabular-nums mt-1">
                            3
                          </div>
                        </div>
                        <div>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                            Sources
                          </span>
                          <div className="text-2xl font-bold font-display tabular-nums mt-1">
                            7
                          </div>
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
            5. FEATURES — from marketing plan
            ═══════════════════════════════════════════════════ */}
        <section className="w-full max-w-5xl mx-auto px-6 py-16 md:py-24">
          <Reveal>
            <div className="space-y-2 mb-12">
              <p className="text-xs font-medium text-primary uppercase tracking-wider font-mono">
                Capabilities
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-display">
                Built for real genetics
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
            {(
              [
                {
                  icon: Search,
                  title: "Ask about any trait",
                  description:
                    "Unlike fixed-database tools, there\u2019s no trait list to browse. Ask us anything\u2014new research is discovered every day, and our AI pulls the latest findings.",
                },
                {
                  icon: Database,
                  title: "Real SNPedia data",
                  description:
                    "We pull authoritative genotype descriptions, magnitude scores, and population frequencies directly from SNPedia. You get the ground truth about your variants.",
                },
                {
                  icon: BarChart3,
                  title: "Evidence-weighted analysis",
                  description:
                    "Every SNP is classified: strong, moderate, or preliminary evidence. Strong findings drive conclusions. Weak ones get honest caveats.",
                },
                {
                  icon: Dna,
                  title: "Haplotype-aware interpretation",
                  description:
                    "Linked SNPs like APOE e2/e3/e4 or TAS2R38 PAV/AVI are analyzed together as haplotypes, not as contradictory individual signals.",
                },
                {
                  icon: Activity,
                  title: "609,000 SNPs cross-referenced",
                  description:
                    "Your full raw data is parsed and matched against researched variants. You see exactly which SNPs were found in your DNA and which were not.",
                },
                {
                  icon: ShieldCheck,
                  title: "Privacy-first design",
                  description:
                    "DNA data is processed in-memory on the server, never stored permanently, and automatically deleted after 1 hour. We can\u2019t sell what we don\u2019t keep.",
                },
                {
                  icon: Eye,
                  title: "Transparent sourcing",
                  description:
                    "Every analysis cites specific studies with PMIDs, effect sizes, and odds ratios so you can verify the science yourself.",
                },
                {
                  icon: Sparkles,
                  title: "Clear bottom-line answers",
                  description:
                    "No wishy-washy hedging. You get a direct verdict backed by the specific genotypes driving that conclusion.",
                },
              ] as const
            ).map((feature, i) => (
              <Reveal key={feature.title} delay={i * 60}>
                <div className="flex items-start gap-4 group">
                  <div className="h-9 w-9 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/12 transition-colors">
                    <feature.icon className="h-[18px] w-[18px] text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold font-display mb-1.5">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            6. EXPLORE TRAITS
            ═══════════════════════════════════════════════════ */}
        <section className="w-full py-16 md:py-24 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--surface-sunken), transparent)",
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

            <div className="grid md:grid-cols-2 gap-6 md:gap-12">
              {/* Physical & Nutrition */}
              <div className="space-y-4 min-w-0">
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/50">
                  Physical & Nutrition
                </span>
                {[
                  {
                    icon: Coffee,
                    name: "Caffeine Metabolism",
                    gene: "CYP1A2",
                    fact: "Fast or slow metabolizer \u2014 affects how your body processes caffeine",
                  },
                  {
                    icon: Droplets,
                    name: "Lactose Tolerance",
                    gene: "MCM6/LCT",
                    fact: "65% of adults have reduced tolerance after childhood",
                  },
                  {
                    icon: Eye,
                    name: "Eye Color",
                    gene: "OCA2/HERC2",
                    fact: "Chromosome 15 pigmentation genes determine your iris color",
                  },
                  {
                    icon: Zap,
                    name: "Muscle Fiber Type",
                    gene: "ACTN3",
                    fact: "R577X variant affects your fast-twitch muscle ratio",
                  },
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
                          <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                            {trait.name}
                          </h3>
                          <span className="text-[10px] font-medium text-muted-foreground/40 font-mono ml-2 shrink-0 hidden sm:inline">
                            {trait.gene}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">
                          {trait.fact}
                        </p>
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
                  {
                    icon: Moon,
                    name: "Sleep Chronotype",
                    gene: "PER2/CRY1",
                    fact: "PER2 mutations can shift your natural sleep cycle by hours",
                  },
                  {
                    icon: Activity,
                    name: "Alcohol Flush",
                    gene: "ALDH2",
                    fact: "ALDH2*2 variant affects ~540 million people worldwide",
                  },
                  {
                    icon: Sun,
                    name: "Vitamin D Levels",
                    gene: "GC/CYP2R1",
                    fact: "Variants affect how efficiently you metabolize vitamin D",
                  },
                  {
                    icon: FlaskConical,
                    name: "Bitter Taste",
                    gene: "TAS2R38",
                    fact: "PAV/AVI haplotypes determine taste sensitivity",
                  },
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
                          <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                            {trait.name}
                          </h3>
                          <span className="text-[10px] font-medium text-muted-foreground/40 font-mono ml-2 shrink-0 hidden sm:inline">
                            {trait.gene}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">
                          {trait.fact}
                        </p>
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
            7. BENEFITS — who this is for
            ═══════════════════════════════════════════════════ */}
        <section className="w-full max-w-5xl mx-auto px-6 py-16 md:py-24">
          <Reveal>
            <div className="space-y-2 mb-12">
              <p className="text-xs font-medium text-primary uppercase tracking-wider font-mono">
                Who it&apos;s for
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-display">
                Built for the curious
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-8 md:gap-12">
            {[
              {
                icon: FlaskConical,
                audience: "Genetics Enthusiasts",
                copy: "Finally, a tool that doesn\u2019t limit your questions. Explore genetic associations at the speed of research, not the speed of corporate feature releases.",
              },
              {
                icon: Zap,
                audience: "Biohackers",
                copy: "Connect your DNA to your optimization efforts. Understand your genetic baseline for sleep, metabolism, athletic response, and more. Build protocols around your genes.",
              },
              {
                icon: Activity,
                audience: "Quantified Self Practitioners",
                copy: "Close the loop. You have data from Oura, Whoop, MyFitnessPal, and Levels. Now add your genetic blueprint. Understand what\u2019s genetic vs. what you can change.",
              },
              {
                icon: Dna,
                audience: "23andMe / AncestryDNA Users",
                copy: "You downloaded your raw file. It\u2019s been sitting there. Now it has a purpose. Ask your questions. Get real answers.",
              },
            ].map((item, i) => (
              <Reveal key={item.audience} delay={i * 80}>
                <div className="group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/8 flex items-center justify-center group-hover:bg-primary/12 transition-colors">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold font-display">
                      {item.audience}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-11">
                    {item.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            8. TESTIMONIALS
            ═══════════════════════════════════════════════════ */}
        <section className="w-full py-16 md:py-24 relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--surface-sunken), transparent)",
            }}
          />

          <div className="max-w-5xl mx-auto px-6 relative">
            <Reveal>
              <div className="space-y-2 mb-12">
                <p className="text-xs font-medium text-primary uppercase tracking-wider font-mono">
                  From early users
                </p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-display">
                  What people are saying
                </h2>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "Finally, a tool that answers the questions I actually have.",
                  name: "Sarah M.",
                  role: "Genetics Enthusiast",
                  via: "Reddit",
                },
                {
                  quote:
                    "I\u2019ve used Promethease and SelfDecode. This is 10x simpler and way more thorough.",
                  name: "James L.",
                  role: "Biohacker",
                  via: "Product Hunt",
                },
                {
                  quote:
                    "I asked about a trait I\u2019ve never seen in any other DNA tool. It gave me citations to the actual research. This is the future.",
                  name: "Maya P.",
                  role: "Citizen Scientist",
                  via: "Twitter",
                },
              ].map((testimonial, i) => (
                <Reveal key={testimonial.name} delay={i * 100}>
                  <div className="relative pl-5 border-l-2 border-primary/20">
                    <p className="text-sm leading-relaxed mb-4">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div>
                      <span className="text-sm font-semibold font-display">
                        {testimonial.name}
                      </span>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {testimonial.role} &middot; {testimonial.via}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            9. COMPARISON TABLE
            ═══════════════════════════════════════════════════ */}
        <section className="w-full max-w-5xl mx-auto px-6 py-16 md:py-24">
          <Reveal>
            <div className="space-y-2 mb-10">
              <p className="text-xs font-medium text-primary uppercase tracking-wider font-mono">
                How we compare
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-display">
                DNA Trait Analyzer vs. competitors
              </h2>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-xl border border-border/30 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/30 hover:bg-transparent">
                    <TableHead className="text-xs font-medium text-muted-foreground w-[40%]">
                      Feature
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-primary text-center">
                      DNA Trait Analyzer
                    </TableHead>
                    <TableHead className="text-xs font-medium text-muted-foreground text-center">
                      Promethease
                    </TableHead>
                    <TableHead className="text-xs font-medium text-muted-foreground text-center">
                      SelfDecode
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      feature: "Ask about ANY trait",
                      us: true,
                      prom: false,
                      self: false,
                    },
                    {
                      feature: "Real-time GWAS research",
                      us: true,
                      prom: false,
                      self: false,
                    },
                    {
                      feature: "SNPedia integration",
                      us: true,
                      prom: true,
                      self: "partial",
                    },
                    {
                      feature: "Haplotype-aware",
                      us: true,
                      prom: false,
                      self: "partial",
                    },
                    {
                      feature: "Evidence-weighted",
                      us: true,
                      prom: "partial",
                      self: true,
                    },
                    {
                      feature: "PMID citations",
                      us: true,
                      prom: true,
                      self: true,
                    },
                    {
                      feature: "Privacy-first design",
                      us: true,
                      prom: false,
                      self: "partial",
                    },
                  ].map((row) => (
                    <TableRow
                      key={row.feature}
                      className="border-border/20 hover:bg-primary/[0.02]"
                    >
                      <TableCell className="text-sm font-medium">
                        {row.feature}
                      </TableCell>
                      <TableCell className="text-center">
                        <ComparisonMark value={row.us} />
                      </TableCell>
                      <TableCell className="text-center">
                        <ComparisonMark value={row.prom} />
                      </TableCell>
                      <TableCell className="text-center">
                        <ComparisonMark value={row.self} />
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* Price row */}
                  <TableRow className="border-border/20 hover:bg-primary/[0.02]">
                    <TableCell className="text-sm font-medium">Price</TableCell>
                    <TableCell className="text-center">
                      <ComparisonMark value="$0.99/trait or $9.99–$99/mo" />
                    </TableCell>
                    <TableCell className="text-center">
                      <ComparisonMark value="$5–10 once" />
                    </TableCell>
                    <TableCell className="text-center">
                      <ComparisonMark value="$9.99–$538/mo" />
                    </TableCell>
                  </TableRow>
                  {/* Free tier row */}
                  <TableRow className="border-border/20 hover:bg-primary/[0.02]">
                    <TableCell className="text-sm font-medium">
                      Free tier
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-[11px] text-primary font-medium">
                        3 free analyses
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <ComparisonMark value={false} />
                    </TableCell>
                    <TableCell className="text-center">
                      <ComparisonMark value={false} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Reveal>
        </section>

        {/* ═══════════════════════════════════════════════════
            10. FAQ
            ═══════════════════════════════════════════════════ */}
        <section className="w-full max-w-3xl mx-auto px-6 py-16 md:py-24">
          <Reveal>
            <div className="space-y-2 mb-10">
              <p className="text-xs font-medium text-primary uppercase tracking-wider font-mono">
                FAQ
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-display">
                Common questions
              </h2>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="border-t border-border/30">
              <FaqItem
                question="Is this a medical diagnostic tool?"
                answer="No. DNA Trait Analyzer is for educational and entertainment purposes. It shows associations between genetics and traits, not diagnoses. Always consult a healthcare provider for medical decisions."
              />
              <FaqItem
                question="What DNA file formats do you support?"
                answer="23andMe, AncestryDNA, MyHeritage, FamilyTreeDNA, and any CSV with RSID, Chromosome, Position, Genotype columns. Upload takes 30 seconds."
              />
              <FaqItem
                question="How is my privacy protected?"
                answer="Your DNA file is processed in-memory only\u2014never stored on our servers and automatically deleted after 1 hour. We never share, sell, or retain your genetic data. Only SNP identifiers (like \u201Crs12345\u201D) are used during analysis, not your full file."
              />
              <FaqItem
                question="Why should I use this instead of Promethease or SelfDecode?"
                answer="Promethease has a fixed database\u2014you can only explore pre-built traits. SelfDecode costs $500+ for annual access. We research ANY trait live using the latest GWAS studies, give you haplotype-aware interpretation, and cost $9.99\u2013$99/month with a free tier included."
              />
              <FaqItem
                question="Can I ask about complex traits like intelligence or personality?"
                answer="Yes, if the science exists. We\u2019ll find genetic associations and show you the effect sizes (which are usually small for complex traits). We\u2019re transparent about confidence levels\u2014some traits have strong signals, others are preliminary."
              />
              <FaqItem
                question="How long does an analysis take?"
                answer="Typically 2\u20135 minutes from upload to results. Most of that is our AI researching GWAS studies and SNPedia. We show progress updates as we go."
              />
              <FaqItem
                question="What if a trait isn\u2019t in SNPedia?"
                answer="We search GWAS Catalog, ClinVar, and published studies. If no genetic association exists for a trait, we\u2019ll tell you honestly (\u201CNo published genetic associations for this trait yet\u201D)."
              />
              <FaqItem
                question="Can I export my results?"
                answer="Yes. Results are downloadable as PDF with all citations. You can also share individual analyses on social media."
              />
            </div>
          </Reveal>
        </section>

        {/* ═══════════════════════════════════════════════════
            11. PRICING TEASER
            ═══════════════════════════════════════════════════ */}
        <section className="w-full">
          <Reveal>
            <div
              className="border-y border-border/30"
              style={{
                background:
                  "linear-gradient(135deg, var(--surface-sunken) 0%, var(--card) 50%, var(--surface-sunken) 100%)",
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
            12. UPLOAD CTA
            ═══════════════════════════════════════════════════ */}
        <section
          id="upload-section"
          className="w-full max-w-2xl mx-auto px-6 py-16 pb-24 md:py-28 md:pb-28 relative overflow-hidden"
        >
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
                Upload your raw DNA data and get AI-powered trait insights in
                minutes.
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

      {/* Sticky mobile CTA bar */}
      <MobileStickyBar />
    </div>
  );
}

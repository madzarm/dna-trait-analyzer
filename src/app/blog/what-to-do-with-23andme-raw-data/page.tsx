import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "What to Do With Your 23andMe Raw Data in 2026",
  description:
    "Your 23andMe raw data contains hundreds of thousands of genetic markers beyond the standard reports. Learn how to download, understand, and analyze your raw DNA data with third-party tools.",
  openGraph: {
    title: "What to Do With Your 23andMe Raw Data in 2026",
    description:
      "Your 23andMe raw data contains hundreds of thousands of genetic markers beyond the standard reports. Learn how to download, understand, and analyze it.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "What to Do With Your 23andMe Raw Data in 2026",
    description:
      "Your 23andMe raw data contains hundreds of thousands of genetic markers beyond the standard reports.",
  },
};

export default function WhatToDoWith23andMeRawDataPage() {
  return (
    <article className="space-y-8">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
      >
        <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
        Back to Blog
      </Link>

      <header className="space-y-3">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-[10px] text-primary border-primary/20 font-mono uppercase tracking-wider">
            Guide
          </Badge>
          <span className="text-xs text-muted-foreground font-mono">March 15, 2026</span>
          <span className="text-xs text-muted-foreground/40">&middot;</span>
          <span className="text-xs text-muted-foreground font-mono">6 min read</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-display">
          What to Do With Your 23andMe Raw Data in 2026
        </h1>
      </header>

      <div className="space-y-5 text-sm text-muted-foreground leading-relaxed">
        <p>
          If you&apos;ve taken a 23andMe test, you probably explored your
          ancestry composition and maybe a few health predisposition reports.
          But your raw DNA data file contains{" "}
          <strong className="text-foreground">over 600,000 genetic markers</strong> — and 23andMe only
          reports on a small fraction of them. The rest of your genetic
          information is sitting unused, waiting to be explored.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4 font-display">
          What Is 23andMe Raw Data?
        </h2>
        <p>
          Your raw data is a text file containing your genotyped SNPs (Single
          Nucleotide Polymorphisms) — specific positions in your DNA where you
          differ from the reference human genome. Each line contains an rsID
          (the SNP identifier), the chromosome, position, and your genotype
          (the two alleles you carry).
        </p>
        <p>
          This file is essentially a structured list of your genetic variants.
          It doesn&apos;t contain your full genome sequence — just the
          positions that the 23andMe genotyping chip tests for — but it&apos;s
          still remarkably rich in information about traits, health
          predispositions, carrier status, and pharmacogenomics.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4 font-display">
          How to Download Your Raw Data
        </h2>
        <p>Downloading your raw data from 23andMe is straightforward:</p>
        <ol className="list-decimal list-inside space-y-1.5 ml-4">
          <li>Log in to your 23andMe account</li>
          <li>
            Navigate to <strong className="text-foreground">Settings</strong> (click your name in the top
            right)
          </li>
          <li>
            Scroll down to <strong className="text-foreground">23andMe Data</strong> and select{" "}
            <strong className="text-foreground">Download Raw Data</strong>
          </li>
          <li>Complete the identity verification step</li>
          <li>
            Download the zip file and extract the <code className="font-mono text-primary/80 bg-primary/5 px-1.5 py-0.5 rounded">.txt</code> file inside
          </li>
        </ol>
        <p>
          The resulting file is typically 15-25 MB and contains your full
          genotyping results. Keep this file secure — it&apos;s uniquely yours
          and contains sensitive genetic information.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4 font-display">
          What Can You Learn From It?
        </h2>
        <p>
          Your raw data contains information about far more traits than
          23andMe&apos;s standard reports cover. With the right tools, you can
          explore:
        </p>
        <ul className="list-disc list-inside space-y-1.5 ml-4">
          <li>
            <strong className="text-foreground">Pharmacogenomics:</strong> How you metabolize specific
            medications (e.g., caffeine, warfarin, statins)
          </li>
          <li>
            <strong className="text-foreground">Nutrigenomics:</strong> Genetic factors in vitamin
            metabolism, lactose tolerance, and dietary sensitivities
          </li>
          <li>
            <strong className="text-foreground">Carrier status:</strong> Whether you carry variants
            associated with inherited conditions
          </li>
          <li>
            <strong className="text-foreground">Athletic traits:</strong> Muscle fiber composition,
            endurance capacity, and injury predisposition
          </li>
          <li>
            <strong className="text-foreground">Physical traits:</strong> Eye color, hair texture, taste
            perception, and more
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground pt-4 font-display">
          Third-Party Tools for Raw Data Analysis
        </h2>
        <p>
          Several tools exist for analyzing your raw data beyond 23andMe&apos;s
          built-in reports. Traditional tools like Promethease cross-reference
          your SNPs against a fixed database of known associations. While
          useful, this approach has a limitation: you can only find what the
          database already knows about.
        </p>
        <p>
          A newer approach uses AI to dynamically research your genetic
          variants. Instead of looking up entries in a static table, AI-powered
          tools can synthesize information from published research, explain
          complex gene interactions, and provide context that static databases
          can&apos;t.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4 font-display">
          Analyzing Your Raw Data With DNA Trait Analyzer
        </h2>
        <p>
          DNA Trait Analyzer takes the AI-powered approach. Upload your 23andMe
          raw data file, ask about any trait you&apos;re curious about, and the
          tool will identify relevant SNPs in your data, cross-reference them
          with published GWAS studies and ClinVar data, and generate a detailed
          interpretation using AI.
        </p>
        <p>
          Unlike static databases, you can ask about <em>any</em> trait — even
          niche topics that traditional tools don&apos;t have pre-built reports
          for. The AI researches the scientific literature in real time and
          provides an evidence-rated analysis of your genetic profile for that
          trait.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4 font-display">
          Important Considerations
        </h2>
        <p>
          Regardless of which tool you use, keep these points in mind when
          exploring your raw genetic data:
        </p>
        <ul className="list-disc list-inside space-y-1.5 ml-4">
          <li>
            Raw data analysis is for <strong className="text-foreground">educational purposes</strong> —
            not medical diagnosis
          </li>
          <li>
            Genetic associations are probabilistic, not deterministic — having a
            variant doesn&apos;t mean you will develop a condition
          </li>
          <li>
            Many traits are influenced by hundreds of genes plus environmental
            factors
          </li>
          <li>
            Consult a genetic counselor or healthcare provider before making
            health decisions based on raw data analysis
          </li>
          <li>
            Keep your raw data file secure and only upload it to services you
            trust
          </li>
        </ul>

        {/* CTA card */}
        <div className="rounded-xl border border-primary/15 bg-primary/[0.03] p-6 mt-8 space-y-3">
          <p className="font-semibold text-foreground font-display">
            Ready to explore your 23andMe data?
          </p>
          <p>
            DNA Trait Analyzer supports 23andMe raw data files directly. Upload
            your file, ask about any trait, and get an AI-powered analysis in
            minutes.
          </p>
          <Link href="/">
            <Button className="rounded-full font-display cursor-pointer mt-2" size="sm">
              Try DNA Trait Analyzer
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}

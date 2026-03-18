import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Understanding Your MTHFR Gene Variants: A Complete Guide",
  description:
    "Learn what the MTHFR gene does, what common variants C677T and A1298C mean for folate metabolism, and how to check your MTHFR status with DNA analysis tools.",
  openGraph: {
    title: "Understanding Your MTHFR Gene Variants: A Complete Guide",
    description:
      "Learn what the MTHFR gene does, what common variants C677T and A1298C mean, and how to check your MTHFR status.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Understanding Your MTHFR Gene Variants: A Complete Guide",
    description:
      "What the MTHFR gene does, common variants, and how to check your status.",
  },
};

export default function UnderstandingMthfrGenePage() {
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
            Research
          </Badge>
          <span className="text-xs text-muted-foreground font-mono">March 5, 2026</span>
          <span className="text-xs text-muted-foreground/40">&middot;</span>
          <span className="text-xs text-muted-foreground font-mono">10 min read</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-display">
          Understanding Your MTHFR Gene Variants: A Complete Guide
        </h1>
      </header>

      <div className="space-y-5 text-sm text-muted-foreground leading-relaxed">
        <p>
          MTHFR is one of the most discussed genes in the personal genetics
          community. Searches for &quot;MTHFR gene&quot; and &quot;MTHFR
          mutation&quot; have grown steadily as more people get access to their
          raw genetic data. But there&apos;s a lot of misinformation mixed in
          with the science. This guide explains what MTHFR actually does, what
          the common variants mean, and what the current research says about
          their health implications.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4 font-display">
          What Does the MTHFR Gene Do?
        </h2>
        <p>
          MTHFR stands for <strong className="text-foreground">methylenetetrahydrofolate reductase</strong>.
          It&apos;s an enzyme that plays a key role in folate (vitamin B9)
          metabolism. Specifically, MTHFR converts 5,10-methylenetetrahydrofolate
          into 5-methyltetrahydrofolate — the active form of folate that your
          body uses for a critical process called <strong className="text-foreground">methylation</strong>.
        </p>
        <p>
          Methylation is involved in hundreds of biochemical reactions,
          including:
        </p>
        <ul className="list-disc list-inside space-y-1.5 ml-4">
          <li>
            <strong className="text-foreground">DNA synthesis and repair:</strong> Methylation is essential
            for creating and maintaining DNA
          </li>
          <li>
            <strong className="text-foreground">Homocysteine metabolism:</strong> Active folate helps
            convert homocysteine back to methionine, keeping homocysteine levels
            in check
          </li>
          <li>
            <strong className="text-foreground">Neurotransmitter production:</strong> Folate metabolism
            supports the synthesis of serotonin, dopamine, and norepinephrine
          </li>
          <li>
            <strong className="text-foreground">Detoxification:</strong> Methylation assists in processing
            and eliminating various compounds from the body
          </li>
        </ul>
        <p>
          When the MTHFR enzyme works less efficiently due to genetic variants,
          the conversion of folate to its active form is reduced. The degree of
          reduction depends on which variant you carry and whether you have one
          or two copies.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4 font-display">
          The Two Common MTHFR Variants
        </h2>
        <p>
          Two MTHFR variants are well-studied and commonly discussed:
        </p>

        <h3 className="text-base font-semibold text-foreground pt-2 font-display">
          C677T (<span className="font-mono text-primary">rs1801133</span>)
        </h3>
        <p>
          This is the more impactful of the two variants. The &quot;T&quot;
          allele produces a thermolabile (heat-sensitive) version of the enzyme
          with reduced activity:
        </p>
        <ul className="list-disc list-inside space-y-1.5 ml-4">
          <li>
            <strong className="text-foreground">CC genotype (wild type):</strong> Normal enzyme activity —
            approximately 100%
          </li>
          <li>
            <strong className="text-foreground">CT genotype (heterozygous):</strong> Moderately reduced
            activity — approximately 65% of normal
          </li>
          <li>
            <strong className="text-foreground">TT genotype (homozygous):</strong> Significantly reduced
            activity — approximately 30% of normal
          </li>
        </ul>
        <p>
          The T allele is common in many populations. In people of European
          descent, roughly 10-15% are homozygous TT. Prevalence varies
          significantly by ethnicity — it&apos;s more common in Mediterranean
          and Hispanic populations, and less common in African-descent
          populations.
        </p>

        <h3 className="text-base font-semibold text-foreground pt-2 font-display">
          A1298C (<span className="font-mono text-primary">rs1801131</span>)
        </h3>
        <p>
          This variant has a milder effect on enzyme function than C677T:
        </p>
        <ul className="list-disc list-inside space-y-1.5 ml-4">
          <li>
            <strong className="text-foreground">AA genotype (wild type):</strong> Normal enzyme activity
          </li>
          <li>
            <strong className="text-foreground">AC genotype (heterozygous):</strong> Mildly reduced
            activity
          </li>
          <li>
            <strong className="text-foreground">CC genotype (homozygous):</strong> Moderately reduced
            activity — roughly 60-70% of normal
          </li>
        </ul>
        <p>
          Being <strong className="text-foreground">compound heterozygous</strong> — carrying one copy of
          C677T and one copy of A1298C — is also common and can result in
          enzyme activity reduction similar to being homozygous for one
          variant alone.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4 font-display">
          What the Research Actually Says
        </h2>
        <p>
          MTHFR variants are associated with several health considerations, but
          the picture is more nuanced than many online sources suggest:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>
            <strong className="text-foreground">Elevated homocysteine:</strong> The most consistent finding.
            The TT genotype at C677T is associated with higher homocysteine
            levels, particularly when folate intake is low. Elevated
            homocysteine is a risk factor for cardiovascular disease.
          </li>
          <li>
            <strong className="text-foreground">Neural tube defects:</strong> Maternal TT genotype has been
            associated with a modestly increased risk of neural tube defects in
            offspring. This is one reason folic acid supplementation is
            recommended during pregnancy.
          </li>
          <li>
            <strong className="text-foreground">Cardiovascular risk:</strong> Meta-analyses show a modest
            association between the TT genotype and cardiovascular events, but
            the effect size is small and depends heavily on folate status.
          </li>
          <li>
            <strong className="text-foreground">Mental health:</strong> Some studies have found associations
            between C677T and depression risk, but results are inconsistent and
            effect sizes are small.
          </li>
        </ul>
        <p>
          Importantly, many claims about MTHFR on social media and wellness
          websites go far beyond what the evidence supports. MTHFR variants are
          common in the general population, and most people with these variants
          are healthy. Having an MTHFR variant does not mean you have a
          &quot;disease&quot; or that you need special treatment.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4 font-display">
          How to Check Your MTHFR Status
        </h2>
        <p>
          If you have raw DNA data from a consumer testing service (23andMe,
          AncestryDNA, MyHeritage, or FTDNA), your MTHFR variants are almost
          certainly included — <span className="font-mono text-primary/80">rs1801133</span> (C677T) and <span className="font-mono text-primary/80">rs1801131</span> (A1298C) are
          standard SNPs on all major genotyping chips.
        </p>
        <p>
          With DNA Trait Analyzer, you can upload your raw data and ask
          specifically about MTHFR. The AI will identify your genotypes at both
          key positions, explain what your specific combination means based on
          published research, and provide context about evidence strength and
          population frequencies.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4 font-display">
          What to Do If You Have a Variant
        </h2>
        <p>
          If you discover you carry one or both MTHFR variants, here are some
          evidence-based considerations:
        </p>
        <ul className="list-disc list-inside space-y-1.5 ml-4">
          <li>
            <strong className="text-foreground">Don&apos;t panic.</strong> These variants are extremely
            common and most carriers have no health issues related to them
          </li>
          <li>
            <strong className="text-foreground">Ensure adequate folate intake</strong> through diet (leafy
            greens, legumes, fortified foods) or supplementation as recommended
            by your healthcare provider
          </li>
          <li>
            <strong className="text-foreground">Consider a homocysteine blood test</strong> if you&apos;re
            TT at C677T — this is the most actionable clinical measurement
          </li>
          <li>
            <strong className="text-foreground">Talk to your doctor</strong> if you&apos;re planning a
            pregnancy, have a family history of cardiovascular disease, or have
            concerns about homocysteine levels
          </li>
          <li>
            <strong className="text-foreground">Be skeptical</strong> of websites selling expensive
            &quot;MTHFR protocols&quot; or supplement stacks — the evidence
            base for most of these products is thin
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground pt-4 font-display">
          Important Disclaimer
        </h2>
        <p>
          This article is for educational purposes only and does not constitute
          medical advice. MTHFR variants and their health implications are a
          complex topic where individual context matters. Always consult with a
          qualified healthcare provider or genetic counselor before making
          health decisions based on your genetic data.
        </p>

        {/* CTA card */}
        <div className="rounded-xl border border-primary/15 bg-primary/[0.03] p-6 mt-8 space-y-3">
          <p className="font-semibold text-foreground font-display">
            Check your MTHFR status
          </p>
          <p>
            Upload your raw DNA data from 23andMe, AncestryDNA, MyHeritage, or
            FTDNA and ask about your MTHFR variants. Get an AI-powered analysis
            with evidence ratings and research citations.
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

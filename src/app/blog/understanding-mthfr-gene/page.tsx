import type { Metadata } from "next";
import Link from "next/link";

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
    <article className="space-y-6">
      <Link
        href="/blog"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        &larr; Back to Blog
      </Link>

      <header className="space-y-2">
        <p className="text-sm text-muted-foreground">March 5, 2026</p>
        <h1 className="text-3xl font-bold tracking-tight">
          Understanding Your MTHFR Gene Variants: A Complete Guide
        </h1>
      </header>

      <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
        <p>
          MTHFR is one of the most discussed genes in the personal genetics
          community. Searches for &quot;MTHFR gene&quot; and &quot;MTHFR
          mutation&quot; have grown steadily as more people get access to their
          raw genetic data. But there&apos;s a lot of misinformation mixed in
          with the science. This guide explains what MTHFR actually does, what
          the common variants mean, and what the current research says about
          their health implications.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-2">
          What Does the MTHFR Gene Do?
        </h2>
        <p>
          MTHFR stands for <strong>methylenetetrahydrofolate reductase</strong>.
          It&apos;s an enzyme that plays a key role in folate (vitamin B9)
          metabolism. Specifically, MTHFR converts 5,10-methylenetetrahydrofolate
          into 5-methyltetrahydrofolate — the active form of folate that your
          body uses for a critical process called <strong>methylation</strong>.
        </p>
        <p>
          Methylation is involved in hundreds of biochemical reactions,
          including:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>
            <strong>DNA synthesis and repair:</strong> Methylation is essential
            for creating and maintaining DNA
          </li>
          <li>
            <strong>Homocysteine metabolism:</strong> Active folate helps
            convert homocysteine back to methionine, keeping homocysteine levels
            in check
          </li>
          <li>
            <strong>Neurotransmitter production:</strong> Folate metabolism
            supports the synthesis of serotonin, dopamine, and norepinephrine
          </li>
          <li>
            <strong>Detoxification:</strong> Methylation assists in processing
            and eliminating various compounds from the body
          </li>
        </ul>
        <p>
          When the MTHFR enzyme works less efficiently due to genetic variants,
          the conversion of folate to its active form is reduced. The degree of
          reduction depends on which variant you carry and whether you have one
          or two copies.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-2">
          The Two Common MTHFR Variants
        </h2>
        <p>
          Two MTHFR variants are well-studied and commonly discussed:
        </p>

        <h3 className="text-base font-semibold text-foreground pt-1">
          C677T (rs1801133)
        </h3>
        <p>
          This is the more impactful of the two variants. The &quot;T&quot;
          allele produces a thermolabile (heat-sensitive) version of the enzyme
          with reduced activity:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>
            <strong>CC genotype (wild type):</strong> Normal enzyme activity —
            approximately 100%
          </li>
          <li>
            <strong>CT genotype (heterozygous):</strong> Moderately reduced
            activity — approximately 65% of normal
          </li>
          <li>
            <strong>TT genotype (homozygous):</strong> Significantly reduced
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

        <h3 className="text-base font-semibold text-foreground pt-1">
          A1298C (rs1801131)
        </h3>
        <p>
          This variant has a milder effect on enzyme function than C677T:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>
            <strong>AA genotype (wild type):</strong> Normal enzyme activity
          </li>
          <li>
            <strong>AC genotype (heterozygous):</strong> Mildly reduced
            activity
          </li>
          <li>
            <strong>CC genotype (homozygous):</strong> Moderately reduced
            activity — roughly 60-70% of normal
          </li>
        </ul>
        <p>
          Being <strong>compound heterozygous</strong> — carrying one copy of
          C677T and one copy of A1298C — is also common and can result in
          enzyme activity reduction similar to being homozygous for one
          variant alone.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-2">
          What the Research Actually Says
        </h2>
        <p>
          MTHFR variants are associated with several health considerations, but
          the picture is more nuanced than many online sources suggest:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>
            <strong>Elevated homocysteine:</strong> The most consistent finding.
            The TT genotype at C677T is associated with higher homocysteine
            levels, particularly when folate intake is low. Elevated
            homocysteine is a risk factor for cardiovascular disease.
          </li>
          <li>
            <strong>Neural tube defects:</strong> Maternal TT genotype has been
            associated with a modestly increased risk of neural tube defects in
            offspring. This is one reason folic acid supplementation is
            recommended during pregnancy.
          </li>
          <li>
            <strong>Cardiovascular risk:</strong> Meta-analyses show a modest
            association between the TT genotype and cardiovascular events, but
            the effect size is small and depends heavily on folate status.
          </li>
          <li>
            <strong>Mental health:</strong> Some studies have found associations
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

        <h2 className="text-xl font-semibold text-foreground pt-2">
          How to Check Your MTHFR Status
        </h2>
        <p>
          If you have raw DNA data from a consumer testing service (23andMe,
          AncestryDNA, MyHeritage, or FTDNA), your MTHFR variants are almost
          certainly included — rs1801133 (C677T) and rs1801131 (A1298C) are
          standard SNPs on all major genotyping chips.
        </p>
        <p>
          With DNA Trait Analyzer, you can upload your raw data and ask
          specifically about MTHFR. The AI will identify your genotypes at both
          key positions, explain what your specific combination means based on
          published research, and provide context about evidence strength and
          population frequencies.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-2">
          What to Do If You Have a Variant
        </h2>
        <p>
          If you discover you carry one or both MTHFR variants, here are some
          evidence-based considerations:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>
            <strong>Don&apos;t panic.</strong> These variants are extremely
            common and most carriers have no health issues related to them
          </li>
          <li>
            <strong>Ensure adequate folate intake</strong> through diet (leafy
            greens, legumes, fortified foods) or supplementation as recommended
            by your healthcare provider
          </li>
          <li>
            <strong>Consider a homocysteine blood test</strong> if you&apos;re
            TT at C677T — this is the most actionable clinical measurement
          </li>
          <li>
            <strong>Talk to your doctor</strong> if you&apos;re planning a
            pregnancy, have a family history of cardiovascular disease, or have
            concerns about homocysteine levels
          </li>
          <li>
            <strong>Be skeptical</strong> of websites selling expensive
            &quot;MTHFR protocols&quot; or supplement stacks — the evidence
            base for most of these products is thin
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground pt-2">
          Important Disclaimer
        </h2>
        <p>
          This article is for educational purposes only and does not constitute
          medical advice. MTHFR variants and their health implications are a
          complex topic where individual context matters. Always consult with a
          qualified healthcare provider or genetic counselor before making
          health decisions based on your genetic data.
        </p>

        <div className="rounded-lg border bg-muted/30 p-6 mt-6 space-y-3">
          <p className="font-semibold text-foreground">
            Check your MTHFR status
          </p>
          <p>
            Upload your raw DNA data from 23andMe, AncestryDNA, MyHeritage, or
            FTDNA and ask about your MTHFR variants. Get an AI-powered analysis
            with evidence ratings and research citations.
          </p>
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-primary hover:underline underline-offset-2"
          >
            Try DNA Trait Analyzer &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}

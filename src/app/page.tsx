"use client";

import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/components/UploadDropzone";
import { ConsentGate } from "@/components/ConsentGate";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const router = useRouter();

  const handleUploadComplete = (sessionId: string, snpCount: number) => {
    router.push(`/analyze?session=${sessionId}&snps=${snpCount}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center p-6">
        <div className="max-w-xl w-full space-y-8 pt-12 pb-16">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold tracking-tight">
              DNA Trait Analyzer
            </h1>
            <p className="text-lg text-muted-foreground">
              Upload your raw DNA data and discover what your genes say about
              any trait — powered by AI research.
            </p>
          </div>

          {/* Compatible Formats */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["23andMe", "AncestryDNA", "MyHeritage", "FTDNA"].map(
              (provider) => (
                <span
                  key={provider}
                  className="inline-flex items-center rounded-full border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {provider}
                </span>
              )
            )}
          </div>

          <ConsentGate>
            <UploadDropzone onUploadComplete={handleUploadComplete} />
          </ConsentGate>

          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Your DNA data is processed securely on the server and never stored
              permanently. Only specific SNP identifiers (not your full genome)
              are used during analysis. Data is automatically deleted after 1
              hour.
            </p>
            <p className="text-xs text-muted-foreground font-medium">
              This tool is for educational purposes only — not medical advice.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <section className="w-full max-w-4xl pb-16">
          <h2 className="text-2xl font-bold tracking-tight text-center mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Upload DNA",
                description:
                  "Export your raw DNA file from any major testing provider and upload it securely.",
              },
              {
                step: "2",
                title: "Ask Anything",
                description:
                  "Type any trait — caffeine metabolism, eye color, sleep patterns — and our AI researches it.",
              },
              {
                step: "3",
                title: "Get Insights",
                description:
                  "Receive a detailed analysis of your relevant SNPs with evidence ratings and research citations.",
              },
            ].map((item) => (
              <Card key={item.step}>
                <CardContent className="pt-2 text-center space-y-3">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                    {item.step}
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sample Analysis Preview */}
        <section className="w-full max-w-3xl pb-16">
          <h2 className="text-2xl font-bold tracking-tight text-center mb-8">
            Sample Analysis
          </h2>
          <Card>
            <CardContent className="space-y-4 pt-2">
              <div>
                <h3 className="font-semibold text-lg">Caffeine Metabolism</h3>
                <p className="text-sm text-muted-foreground">
                  Based on 3 matched SNPs with moderate-to-strong evidence
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-lg bg-muted/50 p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">
                    Confidence
                  </p>
                  <p className="text-2xl font-bold">72%</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">
                    SNPs Matched
                  </p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Sources</p>
                  <p className="text-2xl font-bold">7</p>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  &quot;Your genotype at CYP1A2 (rs762551) suggests you are
                  likely a <strong>fast caffeine metabolizer</strong>. The AA
                  genotype is associated with rapid caffeine clearance, meaning
                  you may tolerate higher caffeine intake without adverse
                  effects. This is supported by multiple genome-wide association
                  studies...&quot;
                </p>
              </div>
              <p className="text-xs text-muted-foreground text-center italic">
                This is a sample — your actual results will be based on your
                unique genetic data.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Trust Badges */}
        <section className="w-full max-w-3xl pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: "Never Stored Permanently",
                description:
                  "Your raw DNA file is automatically deleted after processing. We don't keep it.",
              },
              {
                title: "Educational Use Only",
                description:
                  "All analyses are clearly marked as educational — not medical advice or diagnosis.",
              },
              {
                title: "AI-Powered Research",
                description:
                  "Every result is backed by published studies, SNP databases, and evidence-rated citations.",
              },
            ].map((badge) => (
              <div
                key={badge.title}
                className="text-center space-y-2 rounded-lg border p-4"
              >
                <h3 className="text-sm font-semibold">{badge.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/components/UploadDropzone";
import { ConsentGate } from "@/components/ConsentGate";
import { Card, CardContent } from "@/components/ui/card";
import {
  Upload,
  Search,
  BarChart3,
  ShieldCheck,
  GraduationCap,
  Microscope,
  ChevronDown,
  Lock,
} from "lucide-react";

export default function Home() {
  const router = useRouter();

  const handleUploadComplete = (sessionId: string, snpCount: number) => {
    router.push(`/analyze?session=${sessionId}&snps=${snpCount}`);
  };

  const scrollToHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ====== 1. Hero Section ====== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        {/* Gradient mesh background */}
        <div className="hero-glow absolute inset-0 -z-10">
          {/* Animated gradient blobs */}
          <div
            className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full opacity-30 blur-[120px]"
            style={{
              background: "rgba(45, 212, 191, 0.15)",
              animation: "float-blob-1 20s ease-in-out infinite",
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full opacity-20 blur-[120px]"
            style={{
              background: "rgba(251, 191, 36, 0.1)",
              animation: "float-blob-2 25s ease-in-out infinite",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-[150px]"
            style={{
              background: "rgba(45, 212, 191, 0.12)",
              animation: "float-blob-3 18s ease-in-out infinite",
            }}
          />
        </div>

        <div className="max-w-xl w-full space-y-8">
          {/* Headline */}
          <div className="text-center space-y-4">
            <h1
              className="text-5xl md:text-7xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Decode Your DNA
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto">
              Upload your raw genetic data and discover what your genes say about
              any trait — powered by AI research and published studies.
            </p>
          </div>

          {/* Provider chips */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["23andMe", "AncestryDNA", "MyHeritage", "FTDNA"].map(
              (provider) => (
                <span
                  key={provider}
                  className="inline-flex items-center rounded-full border border-[rgba(255,255,255,0.08)] px-3 py-1 text-xs text-muted-foreground"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {provider}
                </span>
              )
            )}
          </div>

          {/* Upload / Consent — preserved functionality */}
          <ConsentGate>
            <UploadDropzone onUploadComplete={handleUploadComplete} />
          </ConsentGate>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToHowItWorks}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          aria-label="Scroll to learn more"
        >
          <span className="text-xs tracking-widest uppercase">Learn more</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </button>
      </section>

      <main className="flex flex-col items-center">
        {/* ====== 2. How It Works ====== */}
        <section
          id="how-it-works"
          className="w-full max-w-5xl px-6 py-24"
        >
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16"
            style={{ fontFamily: "var(--font-display)" }}
          >
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload DNA",
                description:
                  "Export your raw DNA file from any major testing provider and upload it securely.",
                icon: Upload,
              },
              {
                step: "02",
                title: "Ask Anything",
                description:
                  "Type any trait — caffeine metabolism, eye color, sleep patterns — and our AI researches it.",
                icon: Search,
              },
              {
                step: "03",
                title: "Get Insights",
                description:
                  "Receive a detailed analysis of your relevant SNPs with evidence ratings and research citations.",
                icon: BarChart3,
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className="stagger-in group rounded-xl border border-[rgba(255,255,255,0.08)] bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[rgba(45,212,191,0.05)]"
                style={{
                  animationDelay: `${index * 80}ms`,
                }}
              >
                <div className="space-y-4">
                  <span
                    className="text-4xl font-bold text-[#2DD4BF]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.step}
                  </span>
                  <item.icon className="h-8 w-8 text-[#2DD4BF]" />
                  <h3
                    className="text-lg font-medium"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ====== 3. Sample Analysis Preview ====== */}
        <section className="w-full max-w-3xl px-6 pb-24">
          <Card className="border border-[rgba(255,255,255,0.08)] overflow-hidden">
            <CardContent className="space-y-5 pt-2">
              {/* Live Preview label */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2DD4BF] opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#2DD4BF]" />
                </span>
                <span
                  className="text-xs font-medium uppercase tracking-widest text-[#2DD4BF]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Live Preview
                </span>
              </div>

              {/* Trait name */}
              <div>
                <h3
                  className="text-xl font-medium"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Caffeine Metabolism
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Based on 3 matched SNPs with moderate-to-strong evidence
                </p>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-lg bg-[rgba(45,212,191,0.05)] border border-[rgba(255,255,255,0.06)] p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">
                    Confidence
                  </p>
                  {/* Confidence bar preview */}
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-2xl font-bold">72%</p>
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-[rgba(255,255,255,0.06)]">
                    <div
                      className="h-1.5 rounded-full bg-[#2DD4BF]"
                      style={{ width: "72%" }}
                    />
                  </div>
                </div>
                <div className="rounded-lg bg-[rgba(45,212,191,0.05)] border border-[rgba(255,255,255,0.06)] p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">
                    SNPs Matched
                  </p>
                  <p className="text-2xl font-bold">3</p>
                  <p
                    className="text-xs text-muted-foreground mt-1"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    rs762551, rs2472297...
                  </p>
                </div>
                <div className="rounded-lg bg-[rgba(45,212,191,0.05)] border border-[rgba(255,255,255,0.06)] p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Sources</p>
                  <p className="text-2xl font-bold">7</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    peer-reviewed studies
                  </p>
                </div>
              </div>

              {/* Interpretation snippet */}
              <div className="rounded-lg border border-[rgba(255,255,255,0.06)] p-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  &quot;Your genotype at CYP1A2 (rs762551) suggests you are
                  likely a <strong className="text-foreground">fast caffeine metabolizer</strong>. The AA
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

        {/* ====== 4. Trust Section ====== */}
        <section className="w-full max-w-5xl px-6 pb-24">
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Built on Trust
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Never Stored Permanently",
                description:
                  "Your raw DNA file is automatically deleted after processing. We don't keep it. Data is purged within 1 hour.",
              },
              {
                icon: GraduationCap,
                title: "Educational Use Only",
                description:
                  "All analyses are clearly marked as educational — not medical advice, diagnoses, or treatment recommendations.",
              },
              {
                icon: Microscope,
                title: "AI-Powered Research",
                description:
                  "Every result is backed by published studies, SNP databases, and evidence-rated citations from peer-reviewed sources.",
              },
            ].map((badge, index) => (
              <div
                key={badge.title}
                className="stagger-in flex flex-col items-center text-center space-y-4 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#16162A] p-8 transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  animationDelay: `${index * 80}ms`,
                }}
              >
                <badge.icon className="h-10 w-10 text-[#2DD4BF]" />
                <h3
                  className="text-base font-medium"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {badge.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ====== 5. CTA Section ====== */}
        <section className="w-full max-w-3xl px-6 pb-24 text-center">
          <div className="space-y-6">
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ready to explore your genetics?
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Upload your DNA data and get AI-powered trait insights in minutes.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2DD4BF] px-8 py-3.5 text-base font-medium text-[#0B0B14] transition-all duration-150 hover:shadow-[0_0_24px_rgba(45,212,191,0.35)] hover:bg-[#5EEAD4] cursor-pointer"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <Upload className="h-5 w-5" />
              Upload Your DNA
            </button>
            <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="h-3.5 w-3.5" />
              Your data is processed securely and never stored permanently.
            </p>
          </div>
        </section>
      </main>

      {/* Keyframe animations for hero blobs */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes float-blob-1 {
              0%, 100% { transform: translate(0, 0) scale(1); }
              33% { transform: translate(30px, -50px) scale(1.1); }
              66% { transform: translate(-20px, 20px) scale(0.9); }
            }
            @keyframes float-blob-2 {
              0%, 100% { transform: translate(0, 0) scale(1); }
              33% { transform: translate(-40px, 30px) scale(1.05); }
              66% { transform: translate(25px, -40px) scale(0.95); }
            }
            @keyframes float-blob-3 {
              0%, 100% { transform: translate(-50%, -50%) scale(1); }
              50% { transform: translate(-50%, -50%) scale(1.15); }
            }
          `,
        }}
      />
    </div>
  );
}

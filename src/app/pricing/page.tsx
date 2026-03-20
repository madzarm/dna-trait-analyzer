"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useAuth } from "@/components/AuthProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronDown, Dna } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "Try it out with a few analyses",
    features: [
      "3 trait analyses",
      "All DNA formats supported",
      "Basic SNP matching",
      "Educational disclaimers included",
    ],
    cta: "Get Started",
    highlighted: false,
    priceType: null,
  },
  {
    name: "Per Trait",
    price: "$0.99",
    period: "/trait",
    description: "Pay only for what you use",
    features: [
      "1 trait analysis per purchase",
      "All DNA formats supported",
      "Full SNP matching",
      "ClinVar + GWAS data",
    ],
    cta: "Buy Single Trait",
    highlighted: false,
    priceType: "per_trait" as const,
  },
  {
    name: "Starter",
    price: "$9.99",
    period: "one-time",
    description: "For curious explorers who want more",
    features: [
      "10 trait analyses",
      "All DNA formats supported",
      "Enhanced SNP matching",
      "ClinVar + GWAS data",
      "Downloadable reports",
    ],
    cta: "Buy Starter Pack",
    highlighted: false,
    priceType: "starter" as const,
  },
  {
    name: "Monthly",
    price: "$14.99",
    period: "/month",
    description: "Unlimited access for ongoing discovery",
    features: [
      "Unlimited trait analyses",
      "All DNA formats supported",
      "Enhanced SNP matching",
      "ClinVar + GWAS data",
      "Downloadable reports",
      "Priority processing",
    ],
    cta: "Subscribe Monthly",
    highlighted: true,
    badge: "Most Popular",
    priceType: "monthly" as const,
  },
  {
    name: "Annual",
    price: "$99",
    period: "/year",
    description: "Best value for dedicated users",
    features: [
      "Unlimited trait analyses",
      "All DNA formats supported",
      "Enhanced SNP matching",
      "ClinVar + GWAS data",
      "Downloadable reports",
      "Priority processing",
      "Early access to new features",
    ],
    cta: "Subscribe Annually",
    highlighted: false,
    badge: "Save 45%",
    priceType: "annual" as const,
  },
];

const faqs = [
  {
    question: "Which DNA testing services are supported?",
    answer:
      "We support raw data files from 23andMe, AncestryDNA, MyHeritage, and Family Tree DNA (FTDNA). Simply download your raw data file from your provider and upload it here.",
  },
  {
    question: "Is my DNA data stored?",
    answer:
      "Your DNA data is processed securely on the server and automatically deleted after your session ends. We never store your full genome data permanently. Only analysis reports are saved to your account if you choose to keep them.",
  },
  {
    question: "What counts as one analysis?",
    answer:
      "Each trait you ask about counts as one analysis. For example, asking about 'caffeine metabolism' is one analysis, and asking about 'eye color' is another.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes, you can change your plan at any time. If you upgrade, you'll be credited for the remaining time on your current plan. Downgrades take effect at the end of your billing period.",
  },
  {
    question: "Is this medical advice?",
    answer:
      "No. DNA Trait Analyzer is for educational and informational purposes only. Our analyses are based on published research but should not be used as a substitute for professional medical advice, diagnosis, or treatment.",
  },
  {
    question: "What data sources power the analysis?",
    answer:
      "We use peer-reviewed research from ClinVar, GWAS Catalog, and published genomic studies. Our AI synthesizes findings from multiple sources to provide comprehensive trait analyses.",
  },
];

function PricingContent() {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const success = searchParams.get("success");
  const cancelled = searchParams.get("cancelled");

  const handleCheckout = async (priceType: string) => {
    if (!user) return;

    setLoadingPlan(priceType);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceType }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setLoadingPlan(null);
    }
  };

  const handleManageSubscription = async () => {
    try {
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Portal error:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Success/Cancel Messages */}
          {success && (
            <Alert>
              <AlertDescription>
                Payment successful! Your account has been upgraded. You can now
                start analyzing traits.
              </AlertDescription>
            </Alert>
          )}
          {cancelled && (
            <Alert>
              <AlertDescription>
                Payment was cancelled. No charges were made.
              </AlertDescription>
            </Alert>
          )}

          {/* Header — left-aligned, matching homepage pattern */}
          <div className="space-y-2 animate-fade-in-up">
            <p className="text-xs font-medium text-primary uppercase tracking-wider font-mono">
              Pricing
            </p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-display">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Unlock the secrets in your DNA. Start free, upgrade when you need
              more.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 stagger-in">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative transition-all duration-300 ${
                  plan.highlighted
                    ? "border-primary/50 shadow-[0_0_50px_var(--glow-primary),0_0_100px_var(--glow-primary)]"
                    : "border-border/50 card-hover-glow"
                }`}
              >
                {/* Highlighted card: gradient top bar */}
                {plan.highlighted && (
                  <div className="absolute inset-x-0 top-0 h-1.5 rounded-t-lg bg-gradient-to-r from-primary via-accent to-primary" />
                )}
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg font-display">
                      {plan.name}
                    </CardTitle>
                    {plan.badge && (
                      <Badge
                        className={
                          plan.highlighted
                            ? "bg-primary/15 text-primary border-primary/20 text-[10px]"
                            : "bg-secondary text-secondary-foreground text-[10px]"
                        }
                      >
                        {plan.badge}
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-sm">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-baseline gap-1">
                    <span className="font-bold text-4xl sm:text-5xl font-display tabular-nums">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-sm text-muted-foreground">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <ul className="space-y-2.5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm"
                      >
                        <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  {plan.priceType === null ? (
                    <Link href="/" className="w-full">
                      <Button
                        className="w-full cursor-pointer rounded-full font-display"
                        variant="outline"
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  ) : !user ? (
                    <Link href="/auth/signup" className="w-full">
                      <Button
                        className={`w-full cursor-pointer rounded-full font-display ${
                          plan.highlighted
                            ? "hover:shadow-[0_0_30px_var(--glow-primary)]"
                            : ""
                        }`}
                        variant={plan.highlighted ? "default" : "outline"}
                      >
                        Sign up to purchase
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      className={`w-full cursor-pointer rounded-full font-display ${
                        plan.highlighted
                          ? "hover:shadow-[0_0_30px_var(--glow-primary)]"
                          : ""
                      }`}
                      variant={plan.highlighted ? "default" : "outline"}
                      onClick={() => handleCheckout(plan.priceType!)}
                      disabled={loadingPlan !== null}
                    >
                      {loadingPlan === plan.priceType
                        ? "Redirecting..."
                        : plan.cta}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Manage subscription */}
          {user && (
            <div className="text-center">
              <button
                onClick={handleManageSubscription}
                className="text-sm text-muted-foreground hover:text-foreground underline cursor-pointer"
              >
                Manage existing subscription
              </button>
            </div>
          )}

          {/* FAQ Section — left-aligned header */}
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-xs font-medium text-primary uppercase tracking-wider font-mono">
                FAQ
              </p>
              <h2 className="text-2xl md:text-3xl font-bold font-display tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="max-w-3xl divide-y divide-border/50">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-1">
                  <summary className="flex items-center justify-between cursor-pointer py-4 text-sm font-semibold list-none [&::-webkit-details-marker]:hidden">
                    <span>{faq.question}</span>
                    <ChevronDown className="h-4 w-4 ml-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <p className="text-sm text-muted-foreground leading-relaxed pb-4 pr-8">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <Dna className="h-8 w-8 text-primary animate-spin" />
        </div>
      }
    >
      <PricingContent />
    </Suspense>
  );
}

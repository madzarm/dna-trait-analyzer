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
import { Check } from "lucide-react";
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
        <div className="max-w-5xl mx-auto space-y-16">
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

          {/* Header */}
          <div className="text-center space-y-3 animate-fade-in-up">
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Unlock the secrets in your DNA. Start free, upgrade when you need
              more.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-in">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative transition-all duration-200 ${
                  plan.highlighted
                    ? "scale-[1.03] border-t-4 border-t-primary shadow-[0_0_30px_var(--glow-primary)]"
                    : "hover:-translate-y-0.5"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CardTitle className="font-display text-lg">{plan.name}</CardTitle>
                    {plan.badge && (
                      <span
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                          plan.highlighted
                            ? "bg-primary/15 text-primary shadow-[0_0_12px_var(--glow-primary)]"
                            : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display font-bold text-5xl">{plan.price}</span>
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
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  {plan.priceType === null ? (
                    <Link href="/" className="w-full">
                      <Button className="w-full" variant="outline">
                        {plan.cta}
                      </Button>
                    </Link>
                  ) : !user ? (
                    <Link href="/auth/signup" className="w-full">
                      <Button
                        className="w-full"
                        variant={plan.highlighted ? "default" : "outline"}
                      >
                        Sign up to purchase
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      className="w-full"
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
                className="text-sm text-muted-foreground hover:text-foreground underline"
              >
                Manage existing subscription
              </button>
            </div>
          )}

          {/* FAQ Section — Accordion */}
          <div className="space-y-8 animate-fade-in-up">
            <h2 className="font-display text-2xl font-bold text-center">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto divide-y divide-border">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-1">
                  <summary className="flex items-center justify-between cursor-pointer py-4 text-sm font-semibold list-none [&::-webkit-details-marker]:hidden">
                    <span>{faq.question}</span>
                    <span className="ml-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45 text-lg">
                      +
                    </span>
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
        <div className="text-center py-20 text-muted-foreground">
          Loading...
        </div>
      }
    >
      <PricingContent />
    </Suspense>
  );
}

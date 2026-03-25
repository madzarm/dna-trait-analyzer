import Link from "next/link";
import { Dna, ShieldCheck, Database, Lock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-surface-sunken">
      {/* Gradient top edge to match navbar */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Dna className="h-4 w-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm tracking-tight leading-none">
                  DNA Trait
                </span>
                <span className="font-display font-medium text-[10px] tracking-[0.12em] text-muted-foreground uppercase leading-none mt-0.5">
                  Analyzer
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Discover what your DNA says about you — powered by AI and
              published genetics research. For educational purposes only.
            </p>
            <p className="text-xs text-muted-foreground/60">
              &copy; {new Date().getFullYear()} DNA Trait Analyzer
            </p>
          </div>

          {/* Product links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
              Product
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/analyze", label: "Analyze" },
                { href: "/pricing", label: "Pricing" },
                { href: "/blog", label: "Blog" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
              Legal
            </h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/legal/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/legal/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <a
                href="mailto:support@dnatraitanalyzer.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Trust signals — replacing "Built with" */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
              Trust
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { icon: ShieldCheck, text: "Evidence-graded results" },
                { icon: Database, text: "ClinVar & GWAS Catalog data" },
                { icon: Lock, text: "Your data is never stored" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <item.icon className="h-3.5 w-3.5 text-primary/60 shrink-0" />
                  <span className="text-xs text-muted-foreground">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

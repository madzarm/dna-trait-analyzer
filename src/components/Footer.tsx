import Link from "next/link";
import { Dna } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="border-t border-primary/30"
      style={{ backgroundColor: "var(--surface-sunken)" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand + Tagline */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-[family-name:var(--font-display)] font-bold text-base tracking-tight">
              <Dna className="h-4 w-4 text-primary" />
              <span>DNA Trait Analyzer</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-powered genetic trait analysis backed by published research.
              For educational purposes only &mdash; not medical advice.
            </p>
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} DNA Trait Analyzer. All rights
              reserved.
            </p>
          </div>

          {/* Links: Product + Legal */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Product
              </h4>
              <nav className="flex flex-col gap-2">
                <Link
                  href="/analyze"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors duration-200"
                >
                  Analyze
                </Link>
                <Link
                  href="/pricing"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors duration-200"
                >
                  Pricing
                </Link>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors duration-200"
                >
                  Blog
                </Link>
              </nav>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Legal
              </h4>
              <nav className="flex flex-col gap-2">
                <Link
                  href="/legal/terms"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors duration-200"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/legal/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
                <a
                  href="mailto:support@dnatraitanalyzer.com"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors duration-200"
                >
                  Contact
                </a>
              </nav>
            </div>
          </div>

          {/* Built with */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Built with
            </h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Next.js &amp; React</li>
              <li>Anthropic Claude AI</li>
              <li>Supabase</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

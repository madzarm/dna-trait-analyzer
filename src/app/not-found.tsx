import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Dna } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8">
          {/* Large 404 with glow effect */}
          <div className="relative">
            <h1 className="font-display text-[10rem] md:text-[14rem] font-bold leading-none tracking-tighter text-primary/10 select-none">
              404
            </h1>
            {/* Subtle glow behind the number */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none"
              style={{ background: "var(--primary)", opacity: 0.06 }}
            />
          </div>

          {/* Content */}
          <div className="space-y-3 -mt-8 relative">
            <p className="text-xs font-medium text-primary uppercase tracking-wider font-mono">
              Page Not Found
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-display">
              Wrong turn in the genome
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              This page doesn&apos;t exist, but your genes do. Let&apos;s get you
              back to exploring them.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button
                size="lg"
                className="rounded-full font-display cursor-pointer hover:shadow-[0_0_20px_var(--glow-primary)] transition-all"
              >
                <Dna className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Read the blog
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

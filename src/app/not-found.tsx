import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h1 className="font-display text-[10rem] md:text-[14rem] font-bold leading-none tracking-tighter text-primary/20">
              404
            </h1>
            <h2 className="font-display text-xl font-semibold -mt-8">
              Page Not Found
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              This page doesn&apos;t exist, but your genes do.
            </p>
          </div>
          <Link href="/">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 hover:shadow-[0_0_20px_var(--glow-primary)] transition-all"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

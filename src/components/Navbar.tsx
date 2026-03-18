"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Dna, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/analyze", label: "Analyze" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-6">
        {/* Wordmark */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-[family-name:var(--font-display)] font-bold text-lg tracking-tight"
          >
            <Dna className="h-5 w-5 text-primary" />
            <span>DNA Trait Analyzer</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-foreground ${
                  isActive(link.href)
                    ? "text-foreground"
                    : "text-muted-foreground"
                } after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-primary after:transition-transform after:duration-200 after:origin-left ${
                  isActive(link.href)
                    ? "after:scale-x-100"
                    : "after:scale-x-0 hover:after:scale-x-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-4">
          {loading ? (
            <div className="h-9 w-20 animate-pulse bg-muted rounded" />
          ) : user ? (
            <>
              <Link
                href="/reports"
                className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-foreground ${
                  isActive("/reports")
                    ? "text-foreground"
                    : "text-muted-foreground"
                } after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-primary after:transition-transform after:duration-200 after:origin-left ${
                  isActive("/reports")
                    ? "after:scale-x-100"
                    : "after:scale-x-0 hover:after:scale-x-100"
                }`}
              >
                My Reports
              </Link>
              <span className="text-sm text-muted-foreground hidden lg:inline">
                {user.email}
              </span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(link.href)
                    ? "text-foreground bg-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {loading ? (
              <div className="h-9 w-full animate-pulse bg-muted rounded mt-2" />
            ) : user ? (
              <>
                <Link
                  href="/reports"
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive("/reports")
                      ? "text-foreground bg-muted"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  My Reports
                </Link>
                <div className="border-t border-border/50 my-2" />
                <span className="px-3 text-xs text-muted-foreground">
                  {user.email}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    handleSignOut();
                    setMobileOpen(false);
                  }}
                  className="mt-1"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="flex gap-2 mt-2">
                <Link href="/auth/login" className="flex-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup" className="flex-1">
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

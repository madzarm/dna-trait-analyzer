"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dna, ArrowRight, Mail } from "lucide-react";

function GoogleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    setError("");
    setGoogleLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setGoogleLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
        {/* Atmospheric background */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute top-[30%] left-[20%] h-[400px] w-[400px] rounded-full blur-[140px] bg-primary opacity-[0.06]"
          />
          <div className="absolute inset-0 hero-grid opacity-50" />
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 50% 50%, transparent 0%, var(--background) 70%)",
            }}
          />
        </div>

        <div className="w-full max-w-md space-y-8 animate-fade-in-up text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="h-7 w-7 text-primary" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-display">
              Check your email
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              We&apos;ve sent a confirmation link to{" "}
              <strong className="text-foreground font-mono text-sm">{email}</strong>.
              Click the link to activate your account and start exploring.
            </p>
          </div>

          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Back to sign in
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
      {/* Atmospheric background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-[20%] right-[15%] h-[500px] w-[500px] rounded-full blur-[140px] bg-primary opacity-[0.05] animate-hero-glow"
        />
        <div
          className="absolute bottom-[20%] left-[10%] h-[400px] w-[400px] rounded-full blur-[120px] bg-accent opacity-[0.04] animate-hero-glow"
          style={{ animationDelay: "7s" }}
        />
        {/* Subtle grid */}
        <div className="absolute inset-0 hero-grid opacity-50" />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, transparent 0%, var(--background) 70%)",
          }}
        />
      </div>

      <div className="w-full max-w-md space-y-10 animate-fade-in-up">
        {/* Wordmark */}
        <Link href="/" className="inline-flex items-center gap-2 group">
          <Dna className="h-5 w-5 text-primary group-hover:rotate-12 transition-transform" />
          <span className="text-sm font-semibold font-display tracking-tight text-foreground">
            DNA Trait Analyzer
          </span>
        </Link>

        {/* Left-aligned header: mono label + large heading */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-primary uppercase tracking-wider font-mono">
            Get started
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-display">
            Create your account
          </h1>
          <p className="text-sm text-muted-foreground pt-1">
            Begin uncovering what your DNA says about you.
          </p>
        </div>

        {/* Google OAuth */}
        <div className="space-y-4">
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 rounded-full font-display border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all"
            onClick={handleGoogleSignup}
            disabled={googleLoading}
          >
            <GoogleIcon />
            <span className="ml-2">
              {googleLoading ? "Redirecting..." : "Continue with Google"}
            </span>
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/30" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-3 text-muted-foreground/60 font-mono tracking-wider">
                or
              </span>
            </div>
          </div>
        </div>

        {/* Email form */}
        <form onSubmit={handleSignup} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-mono block">
              Full Name
            </label>
            <Input
              id="fullName"
              type="text"
              placeholder="Your name"
              className="h-12 bg-surface-sunken/50 border-border/30 focus:border-primary/40 transition-colors"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-mono block">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="h-12 bg-surface-sunken/50 border-border/30 focus:border-primary/40 transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-mono block">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="At least 6 characters"
              className="h-12 bg-surface-sunken/50 border-border/30 focus:border-primary/40 transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12 rounded-full font-display bg-primary text-primary-foreground hover:shadow-[0_0_30px_var(--glow-primary)] transition-all"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
            {!loading && <ArrowRight className="h-4 w-4 ml-2" />}
          </Button>
        </form>

        {/* Footer link */}
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

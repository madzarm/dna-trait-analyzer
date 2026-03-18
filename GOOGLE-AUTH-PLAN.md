# Google OAuth Implementation Plan for DNA Trait Analyzer

## Overview

Add "Sign in with Google" to the login and signup pages using Supabase's built-in OAuth support. The existing callback route (`/auth/callback/route.ts`) already handles the PKCE code exchange, and the database trigger (`handle_new_user`) already creates profiles for new users. The main work is (1) enabling Google in Supabase, (2) creating Google Cloud credentials, and (3) adding the Google button UI to both auth pages.

---

## 1. Supabase Dashboard Configuration

1. Go to **https://supabase.com/dashboard/project/svgbpjolxrfugkrmzaeb/auth/providers**
2. Find **Google** in the provider list and expand it.
3. Toggle **Enable Google provider** to ON.
4. You will see two fields:
   - **Client ID** (from Google Cloud Console -- see Section 2)
   - **Client Secret** (from Google Cloud Console -- see Section 2)
5. Copy the **Callback URL** shown in the Supabase panel. It will be:
   ```
   https://svgbpjolxrfugkrmzaeb.supabase.co/auth/v1/callback
   ```
   You will paste this into Google Cloud Console in the next step.
6. After filling in Client ID and Client Secret, click **Save**.

---

## 2. Google Cloud Console Configuration

### 2a. Create or Select a Project

1. Go to **https://console.cloud.google.com/**
2. Create a new project (e.g., "DNA Trait Analyzer") or select an existing one.

### 2b. Configure OAuth Consent Screen

1. Navigate to **APIs & Services > OAuth consent screen**.
2. Select **External** user type (unless you have a Google Workspace org).
3. Fill in the required fields:
   - **App name**: DNA Trait Analyzer
   - **User support email**: your email
   - **Developer contact information**: your email
4. Under **Scopes**, add:
   - `email`
   - `profile`
   - `openid`
5. Save and continue through the remaining steps.
6. If the app is in "Testing" mode, add your test Google accounts under **Test users**.

### 2c. Create OAuth 2.0 Credentials

1. Navigate to **APIs & Services > Credentials**.
2. Click **+ CREATE CREDENTIALS > OAuth client ID**.
3. Application type: **Web application**.
4. Name: `DNA Trait Analyzer (Supabase)`
5. Under **Authorized JavaScript origins**, add:
   - `https://svgbpjolxrfugkrmzaeb.supabase.co`
   - `http://localhost:3000` (for local dev)
6. Under **Authorized redirect URIs**, add exactly:
   - `https://svgbpjolxrfugkrmzaeb.supabase.co/auth/v1/callback`
7. Click **Create**.
8. Copy the **Client ID** and **Client Secret** and paste them into the Supabase dashboard (Section 1 above).

---

## 3. Code Changes

### 3a. `src/app/auth/login/page.tsx` -- Add Google Sign-In Button

Replace the entire file with:

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  };

  const handleGoogleLogin = async () => {
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

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
            >
              <GoogleIcon />
              <span className="ml-2">
                {googleLoading ? "Redirecting..." : "Continue with Google"}
              </span>
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  or
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-sm text-center text-muted-foreground mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
```

### 3b. `src/app/auth/signup/page.tsx` -- Add Google Sign-Up Button

Replace the entire file with:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Check Your Email
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              We&apos;ve sent a confirmation link to <strong>{email}</strong>.
              Please check your inbox and click the link to activate your
              account.
            </p>
            <Link
              href="/auth/login"
              className="text-sm text-primary hover:underline"
            >
              Back to sign in
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Create Account</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              type="button"
              variant="outline"
              className="w-full"
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
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  or
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="fullName"
                type="text"
                placeholder="Your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <p className="text-sm text-center text-muted-foreground mt-4">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
```

### 3c. `src/app/auth/callback/route.ts` -- No Changes Needed

The existing callback route already handles the OAuth flow correctly. It:
1. Reads the `code` query parameter from the URL.
2. Calls `supabase.auth.exchangeCodeForSession(code)` to complete the PKCE flow.
3. Redirects to `/` on success or `/auth/login?error=auth_callback_failed` on failure.

This works identically for email/password confirmation links and OAuth callbacks. **No changes required.**

### 3d. Database Trigger -- Update to Handle Google OAuth User Metadata

The existing `handle_new_user()` trigger function reads `full_name` from `raw_user_meta_data`. Google OAuth populates the metadata differently -- Google provides `full_name` (via Supabase's mapping) but also `name` as an alternative key. The trigger should be updated to handle both.

Create a new migration file at `supabase/migrations/20260318000002_update_handle_new_user_for_oauth.sql`:

```sql
-- Update the handle_new_user function to support Google OAuth metadata.
-- Google OAuth provides the user's name under the "full_name" key (mapped by
-- Supabase) but may also appear as "name". We check both.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      ''
    )
  );
  return new;
end;
$$ language plpgsql security definer;
```

Apply this migration via the Supabase CLI:
```bash
supabase db push
```

Or apply it directly via the Supabase SQL Editor in the dashboard.

### 3e. `src/components/AuthProvider.tsx` -- No Changes Needed

The AuthProvider already listens to `onAuthStateChange` which fires for all auth methods including OAuth. It correctly picks up the user from the session regardless of provider. **No changes required.**

### 3f. `src/lib/supabase/client.ts` -- No Changes Needed

The browser client is already correctly configured. **No changes required.**

### 3g. `src/middleware.ts` -- No Changes Needed

The middleware already refreshes sessions on every request. **No changes required.**

---

## 4. Google SVG Icon Reference

The inline SVG used in both pages renders the official multi-color Google "G" logo at 18x18. The four path elements correspond to:

| Path | Color | Hex |
|------|-------|-----|
| Top-right arc + crossbar | Google Blue | `#4285F4` |
| Bottom-right arc | Google Green | `#34A853` |
| Bottom-left arc | Google Yellow | `#FBBC05` |
| Top-left arc | Google Red | `#EA4335` |

The full SVG (used as a `GoogleIcon` component local to each page file):

```tsx
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
```

---

## 5. Testing Steps

### 5a. Prerequisites Verification

1. Confirm Google provider is enabled in the Supabase Dashboard at `https://supabase.com/dashboard/project/svgbpjolxrfugkrmzaeb/auth/providers`.
2. Confirm the Google Cloud OAuth consent screen is published (or your test email is added as a test user).
3. Confirm the redirect URI in Google Cloud matches exactly: `https://svgbpjolxrfugkrmzaeb.supabase.co/auth/v1/callback`

### 5b. Local Development Testing

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open `http://localhost:3000/auth/login`.
3. Verify the Google button appears above the email/password form with an "or" divider.
4. Click **Continue with Google**.
5. Verify you are redirected to Google's OAuth consent screen.
6. Sign in with a Google account.
7. Verify you are redirected back to `http://localhost:3000/auth/callback` and then to `/`.
8. Verify the user is now authenticated (check the UI shows the logged-in state).

### 5c. Profile Creation Verification

1. After a successful Google sign-in, check the `profiles` table in Supabase:
   ```sql
   SELECT id, email, full_name FROM profiles ORDER BY created_at DESC LIMIT 1;
   ```
2. Confirm that `email` matches the Google account email and `full_name` is populated from Google profile data.

### 5d. Signup Page Testing

1. Open `http://localhost:3000/auth/signup`.
2. Verify the same Google button appears.
3. Click **Continue with Google** with a new Google account (not yet registered).
4. Verify the account is created and you are redirected to `/`.
5. Confirm a profile row was created in the database.

### 5e. Edge Cases

1. **Existing email/password user signs in with Google (same email):** Supabase links the identities by default. Verify the user can sign in with both methods and only one profile row exists.
2. **User denies consent on Google screen:** Verify the user is redirected to `/auth/login?error=auth_callback_failed` and can try again.
3. **Button loading state:** Click the Google button and verify it shows "Redirecting..." and is disabled to prevent double clicks.

### 5f. Production Deployment Checklist

1. Ensure the Google Cloud OAuth consent screen is set to **Production** (not Testing) before launch, or submit for Google's verification review.
2. Add your production domain to **Authorized JavaScript origins** in Google Cloud Console.
3. Verify `window.location.origin` correctly resolves to your production URL so the `redirectTo` parameter works.

---

## Summary of Files Changed

| File | Action |
|------|--------|
| `src/app/auth/login/page.tsx` | **Modified** -- Add GoogleIcon component, Google sign-in button, "or" divider, googleLoading state |
| `src/app/auth/signup/page.tsx` | **Modified** -- Add GoogleIcon component, Google sign-up button, "or" divider, googleLoading state |
| `src/app/auth/callback/route.ts` | **No changes** -- Already handles OAuth code exchange |
| `src/lib/supabase/client.ts` | **No changes** |
| `src/components/AuthProvider.tsx` | **No changes** |
| `supabase/migrations/20260318000002_update_handle_new_user_for_oauth.sql` | **New file** -- Update trigger to also read `name` key from Google OAuth metadata |

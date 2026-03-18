import { createClient } from "@/lib/supabase/server";

const FREE_LIMIT = 3;
const GUEST_LIMIT = 2;
const GUEST_TTL = 24 * 60 * 60 * 1000; // 24 hours

interface GuestUsage {
  count: number;
  createdAt: number;
}

const guestUsage = new Map<string, GuestUsage>();

// Auto-cleanup expired guest entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, usage] of guestUsage) {
    if (now - usage.createdAt > GUEST_TTL) {
      guestUsage.delete(key);
    }
  }
}, 10 * 60 * 1000);

export interface UsageAllowance {
  allowed: boolean;
  remaining: number;
  plan: string;
}

export interface UsageStats {
  used: number;
  limit: number | null;
  plan: string;
}

/**
 * Check if a user/guest is allowed to run an analysis.
 * Authenticated users are checked against their DB plan/credits.
 * Guests are tracked in-memory by session ID.
 */
export async function checkUsageAllowance(
  userId?: string,
  sessionId?: string
): Promise<UsageAllowance> {
  // Authenticated users: check DB plan
  if (userId) {
    const supabase = await createClient();

    const { data: profile } = await supabase
      .from("profiles")
      .select(
        "subscription_status, subscription_plan, credits_remaining, subscription_period_end"
      )
      .eq("id", userId)
      .single();

    if (!profile) {
      return { allowed: false, remaining: 0, plan: "free" };
    }

    const { subscription_status, credits_remaining, subscription_period_end } =
      profile;

    // Active subscription = unlimited
    if (
      subscription_status === "active" &&
      subscription_period_end &&
      new Date(subscription_period_end) > new Date()
    ) {
      return {
        allowed: true,
        remaining: Infinity,
        plan: profile.subscription_plan || "monthly",
      };
    }

    // Starter pack or free tier — check credits
    if (credits_remaining > 0) {
      return {
        allowed: true,
        remaining: credits_remaining,
        plan: subscription_status === "free" ? "free" : "starter",
      };
    }

    return {
      allowed: false,
      remaining: 0,
      plan: subscription_status || "free",
    };
  }

  // Guest users: track by sessionId
  if (!sessionId) {
    return { allowed: false, remaining: 0, plan: "guest" };
  }

  const usage = guestUsage.get(sessionId);
  if (!usage) {
    return { allowed: true, remaining: GUEST_LIMIT, plan: "guest" };
  }

  // Check TTL
  if (Date.now() - usage.createdAt > GUEST_TTL) {
    guestUsage.delete(sessionId);
    return { allowed: true, remaining: GUEST_LIMIT, plan: "guest" };
  }

  const remaining = Math.max(0, GUEST_LIMIT - usage.count);
  return { allowed: remaining > 0, remaining, plan: "guest" };
}

/**
 * Record that an analysis was performed.
 * Decrements credits for free/starter users; no-op for subscribers.
 */
export async function recordUsage(
  userId?: string,
  sessionId?: string,
  reportId?: string
): Promise<void> {
  // Authenticated users: update DB
  if (userId) {
    const supabase = await createClient();

    // Insert usage record
    await supabase.from("usage").insert({
      user_id: userId,
      report_id: reportId || null,
    });

    // Get current profile
    const { data: profile } = await supabase
      .from("profiles")
      .select(
        "subscription_status, credits_remaining, subscription_period_end"
      )
      .eq("id", userId)
      .single();

    if (!profile) return;

    // Active subscription doesn't decrement credits
    if (
      profile.subscription_status === "active" &&
      profile.subscription_period_end &&
      new Date(profile.subscription_period_end) > new Date()
    ) {
      return;
    }

    // Decrement credits for free/starter users
    if (profile.credits_remaining > 0) {
      await supabase
        .from("profiles")
        .update({ credits_remaining: profile.credits_remaining - 1 })
        .eq("id", userId);
    }
    return;
  }

  // Guest users: track in-memory
  if (!sessionId) return;

  const existing = guestUsage.get(sessionId);
  if (existing && Date.now() - existing.createdAt <= GUEST_TTL) {
    existing.count++;
  } else {
    guestUsage.set(sessionId, { count: 1, createdAt: Date.now() });
  }
}

/**
 * Get usage statistics for a user.
 */
export async function getUsageStats(userId: string): Promise<UsageStats> {
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "subscription_status, subscription_plan, credits_remaining, subscription_period_end"
    )
    .eq("id", userId)
    .single();

  if (!profile) {
    return { used: 0, limit: FREE_LIMIT, plan: "free" };
  }

  const { count } = await supabase
    .from("usage")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  const used = count || 0;

  if (
    profile.subscription_status === "active" &&
    profile.subscription_period_end &&
    new Date(profile.subscription_period_end) > new Date()
  ) {
    return {
      used,
      limit: null, // unlimited
      plan: profile.subscription_plan || "monthly",
    };
  }

  return {
    used,
    limit: profile.credits_remaining + used,
    plan: profile.subscription_status === "free" ? "free" : "starter",
  };
}

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getUsageStats } from "@/lib/usage";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const stats = await getUsageStats(user.id);
    return NextResponse.json(stats);
  } catch (err) {
    console.error("Usage stats error:", err);
    return NextResponse.json(
      { error: "Failed to get usage stats" },
      { status: 500 }
    );
  }
}

import { getDNA, storeDNA } from "@/lib/dna-store";
import { runAnalysisPipeline } from "@/lib/llm-pipeline";
import { createClient } from "@/lib/supabase/server";
import { checkUsageAllowance, recordUsage } from "@/lib/usage";
import type { SNPData } from "@/lib/types";
import { gunzipSync } from "node:zlib";

export const maxDuration = 120;

async function parseRequestBody(request: Request) {
  const encoding = request.headers.get("content-encoding");
  if (encoding === "gzip") {
    const arrayBuffer = await request.arrayBuffer();
    const decompressed = gunzipSync(Buffer.from(arrayBuffer));
    return JSON.parse(decompressed.toString("utf-8"));
  }
  return request.json();
}

export async function POST(request: Request) {
  try {
    const { trait, sessionId, useCommercialSources, snps } = await parseRequestBody(request);

    if (!trait || typeof trait !== "string" || trait.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Please enter a trait to analyze" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!sessionId) {
      return new Response(
        JSON.stringify({ error: "No DNA data loaded. Please upload your DNA file first." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Try server-side session first, fall back to inline SNP data from client
    let session = getDNA(sessionId);
    if (!session && snps && typeof snps === "object") {
      // Reconstruct session from inline SNP data sent by client
      const dnaMap = new Map<string, SNPData>();
      for (const [rsid, genotype] of Object.entries(snps)) {
        dnaMap.set(rsid, {
          rsid,
          chromosome: "",
          position: "",
          result: genotype as string,
        });
      }
      if (dnaMap.size > 0) {
        storeDNA(sessionId, dnaMap, dnaMap.size);
        session = getDNA(sessionId);
      }
    }

    if (!session) {
      return new Response(
        JSON.stringify({ error: "Session expired. Please re-upload your DNA file." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if user is authenticated to save report
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Check usage allowance
    const allowance = await checkUsageAllowance(user?.id, sessionId);
    if (!allowance.allowed) {
      return new Response(
        JSON.stringify({
          error: "You've used all your free analyses. Upgrade your plan to continue.",
          code: "USAGE_LIMIT_EXCEEDED",
          remaining: 0,
          plan: allowance.plan,
        }),
        { status: 402, headers: { "Content-Type": "application/json" } }
      );
    }

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        const send = (data: Record<string, unknown>) => {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
          );
        };

        try {
          const result = await runAnalysisPipeline(
            trait.trim(),
            session.dnaMap,
            (event) => send(event),
            { useCommercialSources: useCommercialSources === true }
          );

          // Save report to database if user is authenticated
          let reportId: string | null = null;
          if (user) {
            const { data: report } = await supabase.from("reports").insert({
              user_id: user.id,
              trait: result.trait,
              summary: result.summary,
              confidence: result.confidence,
              snp_matches: result.snpMatches,
              interpretation: result.interpretation,
              disclaimer: result.disclaimer,
              sources: result.sources,
            }).select("id").single();

            reportId = report?.id ?? null;
          }

          // Record usage (decrements credits for free/starter users)
          await recordUsage(user?.id, sessionId, reportId ?? undefined);

          send({ type: "result", data: result, reportId });
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "Analysis failed";
          send({ type: "error", message });
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}

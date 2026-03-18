import { getDNA } from "@/lib/dna-store";
import { runAnalysisPipeline } from "@/lib/llm-pipeline";

export async function POST(request: Request) {
  try {
    const { trait, sessionId } = await request.json();

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

    const session = getDNA(sessionId);
    if (!session) {
      return new Response(
        JSON.stringify({ error: "Session expired. Please re-upload your DNA file." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
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
            (event) => send(event)
          );

          send({ type: "result", data: result });
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

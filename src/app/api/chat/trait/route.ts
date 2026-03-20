import Anthropic from "@anthropic-ai/sdk";
import type { TraitChatRequest, ChatMessage } from "@/lib/types";

export const maxDuration = 60;

const anthropic = new Anthropic();

const MAX_HISTORY_MESSAGES = 20;

function buildSystemPrompt(context: TraitChatRequest["context"]): string {
  const snpSummary = context.snpMatches
    .map(
      (s) =>
        `${s.rsid} (${s.gene}): genotype ${s.userGenotype}, risk allele ${s.riskAllele}, ${s.hasRiskAllele ? "PRESENT" : "absent"} — ${s.effect} (${s.evidenceStrength} evidence, ${s.effectSize})`
    )
    .join("\n");

  return `You are a friendly, knowledgeable genetics educator helping someone understand their DNA analysis results for "${context.trait}".

Here is the analysis they are asking about:

SUMMARY: ${context.summary}
CONFIDENCE: ${context.confidence}%

SNP MATCHES FROM THEIR DNA:
${snpSummary || "No SNP matches were found."}

DETAILED INTERPRETATION:
${context.interpretation}

SOURCES: ${context.sources.join("; ")}

RULES:
- Answer in plain, warm English. The user is health-curious, not a scientist.
- Ground every answer in their actual genetic data shown above. Reference specific SNPs and genotypes when relevant.
- Keep responses concise — 1-3 short paragraphs. Be informative but not overwhelming.
- If they ask about something outside this specific trait, acknowledge their curiosity and suggest they run a new analysis for that trait.
- Never provide medical diagnoses or treatment recommendations. You can discuss general wellness implications.
- If you are unsure about something, say so honestly rather than guessing.
- Do not repeat the full analysis — they already have it. Focus on answering their specific question.
- Use a conversational tone, not a clinical report tone.`;
}

/**
 * Ensure messages alternate between user/assistant roles as required by the Anthropic API.
 * Filters out empty messages and merges consecutive same-role messages.
 */
function sanitizeHistory(
  history: ChatMessage[]
): Anthropic.Messages.MessageParam[] {
  const result: Anthropic.Messages.MessageParam[] = [];

  for (const msg of history) {
    if (!msg.content || !msg.content.trim()) continue;

    const prev = result[result.length - 1];
    if (prev && prev.role === msg.role) {
      // Merge consecutive same-role messages
      prev.content = prev.content + "\n\n" + msg.content;
    } else {
      result.push({ role: msg.role, content: msg.content });
    }
  }

  // Ensure the sequence starts with a user message
  while (result.length > 0 && result[0].role !== "user") {
    result.shift();
  }

  return result;
}

export async function POST(request: Request) {
  try {
    const body: TraitChatRequest = await request.json();
    const { message, history, context } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!context || !context.trait) {
      return new Response(
        JSON.stringify({ error: "Analysis context is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Build Claude messages from history + current message
    const truncatedHistory = (history || []).slice(-MAX_HISTORY_MESSAGES);
    const sanitized = sanitizeHistory(truncatedHistory);
    const claudeMessages: Anthropic.Messages.MessageParam[] = [
      ...sanitized,
      { role: "user" as const, content: message.trim() },
    ];

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        const send = (data: Record<string, unknown>) => {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
          );
        };

        try {
          const response = anthropic.messages.stream({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 1024,
            system: buildSystemPrompt(context),
            messages: claudeMessages,
          });

          for await (const event of response) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              send({ type: "delta", text: event.delta.text });
            }
          }

          send({ type: "done" });
        } catch (err) {
          const errMessage =
            err instanceof Error ? err.message : "Chat failed";
          send({ type: "error", message: errMessage });
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

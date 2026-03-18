import type { SNPData } from "./types";

interface Session {
  dnaMap: Map<string, SNPData>;
  snpCount: number;
  createdAt: number;
}

const sessions = new Map<string, Session>();

const SESSION_TTL = 60 * 60 * 1000; // 1 hour

export function storeDNA(
  sessionId: string,
  dnaMap: Map<string, SNPData>,
  snpCount: number
) {
  sessions.set(sessionId, { dnaMap, snpCount, createdAt: Date.now() });

  // Auto-cleanup
  setTimeout(() => {
    sessions.delete(sessionId);
  }, SESSION_TTL);
}

export function getDNA(sessionId: string): Session | undefined {
  const session = sessions.get(sessionId);
  if (!session) return undefined;

  // Check if expired
  if (Date.now() - session.createdAt > SESSION_TTL) {
    sessions.delete(sessionId);
    return undefined;
  }

  return session;
}

export function deleteSession(sessionId: string) {
  sessions.delete(sessionId);
}

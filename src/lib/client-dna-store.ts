/**
 * Client-side in-memory store for parsed DNA data.
 * Holds the SNP map in browser memory so it can be sent with each analyze request,
 * avoiding dependence on server-side in-memory sessions (which break across
 * Vercel serverless function instances).
 */

let storedSnps: Record<string, string> | null = null;
let storedFormat: string | null = null;

export function storeClientDNA(snps: Record<string, string>, format: string) {
  storedSnps = snps;
  storedFormat = format;
}

export function getClientDNA(): { snps: Record<string, string>; format: string } | null {
  if (!storedSnps || !storedFormat) return null;
  return { snps: storedSnps, format: storedFormat };
}

export function clearClientDNA() {
  storedSnps = null;
  storedFormat = null;
}

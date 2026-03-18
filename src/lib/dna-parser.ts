import Papa from "papaparse";
import type { SNPData } from "./types";

const REQUIRED_HEADERS = ["RSID", "CHROMOSOME", "POSITION", "RESULT"];

export function parseDNAFile(
  fileContent: string
): { dnaMap: Map<string, SNPData>; snpCount: number } | { error: string } {
  // Strip comment lines (lines starting with # or ##)
  const lines = fileContent.split("\n");
  const dataLines: string[] = [];
  let foundHeader = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("#")) continue;

    if (!foundHeader) {
      // First non-comment line should be the header
      const upperLine = trimmed.toUpperCase().replace(/"/g, "");
      const hasAllHeaders = REQUIRED_HEADERS.every((h) =>
        upperLine.includes(h)
      );
      if (!hasAllHeaders) {
        return {
          error: `Invalid file format. Expected headers: ${REQUIRED_HEADERS.join(", ")}. This doesn't look like a MyHeritage DNA file.`,
        };
      }
      foundHeader = true;
      dataLines.push(trimmed);
      continue;
    }

    dataLines.push(trimmed);
  }

  if (!foundHeader) {
    return { error: "No header row found. Is this a valid MyHeritage DNA CSV?" };
  }

  const csvContent = dataLines.join("\n");

  const parsed = Papa.parse<Record<string, string>>(csvContent, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h: string) => h.trim().toUpperCase(),
  });

  if (parsed.errors.length > 10) {
    return { error: `Too many parsing errors: ${parsed.errors[0]?.message}` };
  }

  const dnaMap = new Map<string, SNPData>();

  for (const row of parsed.data) {
    const rsid = row.RSID?.trim().toLowerCase();
    if (!rsid || !rsid.startsWith("rs")) continue;

    dnaMap.set(rsid, {
      rsid,
      chromosome: row.CHROMOSOME?.trim() || "",
      position: row.POSITION?.trim() || "",
      result: row.RESULT?.trim().toUpperCase() || "",
    });
  }

  if (dnaMap.size === 0) {
    return { error: "No valid SNP data found in the file." };
  }

  return { dnaMap, snpCount: dnaMap.size };
}

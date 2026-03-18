import Papa from "papaparse";
import type { SNPData } from "./types";

type ParseSuccess = { dnaMap: Map<string, SNPData>; snpCount: number; format: DNAFileFormat };
type ParseError = { error: string };
type ParseResult = ParseSuccess | ParseError;

export type DNAFileFormat = "23andMe" | "AncestryDNA" | "MyHeritage" | "FTDNA" | "unknown";

/** Normalize a genotype result, filtering out no-calls. */
function normalizeGenotype(genotype: string): string {
  const g = genotype.trim().toUpperCase();
  if (g === "--" || g === "00" || g === "0" || g === "" || g === "NN" || g === "N") {
    return "";
  }
  return g;
}

/**
 * Strip comment lines and blank lines.
 * For 23andMe/AncestryDNA, the column header is a comment line (e.g., "# rsid\tchromosome\tposition\tgenotype").
 * We detect this and include it (with # stripped) as the first data line so PapaParse can use it as header.
 */
function stripComments(fileContent: string): { dataLines: string[]; headerLine: string | null; commentHeaderLine: string | null } {
  const lines = fileContent.split("\n");
  const dataLines: string[] = [];
  let headerLine: string | null = null;
  let commentHeaderLine: string | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("#")) {
      // Check if this comment line is actually a column header
      // 23andMe: "# rsid\tchromosome\tposition\tgenotype"
      // AncestryDNA: "#rsid\tchromosome\tposition\tallele1\tallele2"
      const stripped = trimmed.replace(/^#+\s*/, "");
      const upper = stripped.toUpperCase();
      if (upper.includes("RSID") && (upper.includes("GENOTYPE") || upper.includes("ALLELE1"))) {
        commentHeaderLine = stripped;
      }
      continue;
    }

    if (headerLine === null) {
      headerLine = trimmed;
    }
    dataLines.push(trimmed);
  }

  return { dataLines, headerLine, commentHeaderLine };
}

/** Detect the DNA file format from header content. */
export function detectFormat(fileContent: string): DNAFileFormat {
  const { headerLine, commentHeaderLine } = stripComments(fileContent);

  // First check comment-header lines (23andMe and AncestryDNA put headers in comments)
  if (commentHeaderLine) {
    const upper = commentHeaderLine.toUpperCase();
    if (upper.includes("RSID") && upper.includes("GENOTYPE")) {
      return "23andMe";
    }
    if (upper.includes("ALLELE1") && upper.includes("ALLELE2")) {
      return "AncestryDNA";
    }
  }

  // Then check the first non-comment line (MyHeritage/FTDNA have normal headers)
  if (!headerLine) return "unknown";
  const upper = headerLine.toUpperCase().replace(/"/g, "");

  // 23andMe: tab-separated with "rsid chromosome position genotype"
  if (upper.includes("RSID") && upper.includes("GENOTYPE")) {
    return "23andMe";
  }

  // AncestryDNA: has "allele1" and "allele2" columns
  if (upper.includes("ALLELE1") && upper.includes("ALLELE2")) {
    return "AncestryDNA";
  }

  // MyHeritage/FTDNA: has "RESULT" column
  if (upper.includes("RSID") && upper.includes("RESULT")) {
    // MyHeritage wraps fields in double quotes; FTDNA does not
    if (headerLine.includes('"')) {
      return "MyHeritage";
    }
    return "FTDNA";
  }

  return "unknown";
}

/** Parse a 23andMe file (TSV with rsid, chromosome, position, genotype). */
function parse23andMe(dataLines: string[]): ParseResult {
  const content = dataLines.join("\n");

  const parsed = Papa.parse<Record<string, string>>(content, {
    header: true,
    skipEmptyLines: true,
    delimiter: "\t",
    transformHeader: (h: string) => h.trim().toLowerCase(),
  });

  if (parsed.errors.length > 10) {
    return { error: `Too many parsing errors in 23andMe file: ${parsed.errors[0]?.message}` };
  }

  const dnaMap = new Map<string, SNPData>();

  for (const row of parsed.data) {
    const rsid = row.rsid?.trim().toLowerCase();
    if (!rsid || !rsid.startsWith("rs")) continue;

    const genotype = normalizeGenotype(row.genotype || "");
    if (!genotype) continue;

    dnaMap.set(rsid, {
      rsid,
      chromosome: row.chromosome?.trim() || "",
      position: row.position?.trim() || "",
      result: genotype,
    });
  }

  if (dnaMap.size === 0) {
    return { error: "No valid SNP data found in 23andMe file." };
  }

  return { dnaMap, snpCount: dnaMap.size, format: "23andMe" };
}

/** Parse an AncestryDNA file (TSV with rsid, chromosome, position, allele1, allele2). */
function parseAncestryDNA(dataLines: string[]): ParseResult {
  const content = dataLines.join("\n");

  const parsed = Papa.parse<Record<string, string>>(content, {
    header: true,
    skipEmptyLines: true,
    delimiter: "\t",
    transformHeader: (h: string) => h.trim().toLowerCase(),
  });

  if (parsed.errors.length > 10) {
    return { error: `Too many parsing errors in AncestryDNA file: ${parsed.errors[0]?.message}` };
  }

  const dnaMap = new Map<string, SNPData>();

  for (const row of parsed.data) {
    const rsid = row.rsid?.trim().toLowerCase();
    if (!rsid || !rsid.startsWith("rs")) continue;

    const allele1 = (row.allele1 || "").trim().toUpperCase();
    const allele2 = (row.allele2 || "").trim().toUpperCase();

    // Skip no-calls
    if (allele1 === "0" || allele2 === "0" || allele1 === "" || allele2 === "") continue;

    const genotype = normalizeGenotype(allele1 + allele2);
    if (!genotype) continue;

    dnaMap.set(rsid, {
      rsid,
      chromosome: row.chromosome?.trim() || "",
      position: row.position?.trim() || "",
      result: genotype,
    });
  }

  if (dnaMap.size === 0) {
    return { error: "No valid SNP data found in AncestryDNA file." };
  }

  return { dnaMap, snpCount: dnaMap.size, format: "AncestryDNA" };
}

/** Parse a MyHeritage or FTDNA file (CSV with RSID, CHROMOSOME, POSITION, RESULT). */
function parseMyHeritageOrFTDNA(dataLines: string[], format: "MyHeritage" | "FTDNA"): ParseResult {
  const content = dataLines.join("\n");

  const parsed = Papa.parse<Record<string, string>>(content, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h: string) => h.trim().toUpperCase(),
  });

  if (parsed.errors.length > 10) {
    return { error: `Too many parsing errors in ${format} file: ${parsed.errors[0]?.message}` };
  }

  const dnaMap = new Map<string, SNPData>();

  for (const row of parsed.data) {
    const rsid = row.RSID?.trim().toLowerCase();
    if (!rsid || !rsid.startsWith("rs")) continue;

    const genotype = normalizeGenotype(row.RESULT || "");
    if (!genotype) continue;

    dnaMap.set(rsid, {
      rsid,
      chromosome: row.CHROMOSOME?.trim() || "",
      position: row.POSITION?.trim() || "",
      result: genotype,
    });
  }

  if (dnaMap.size === 0) {
    return { error: `No valid SNP data found in ${format} file.` };
  }

  return { dnaMap, snpCount: dnaMap.size, format };
}

/**
 * Parse a DNA file from any supported provider.
 * Auto-detects the format based on header content.
 */
export function parseDNAFile(fileContent: string): ParseResult {
  const format = detectFormat(fileContent);
  const { dataLines, headerLine, commentHeaderLine } = stripComments(fileContent);

  if ((!headerLine && !commentHeaderLine) || dataLines.length === 0) {
    return { error: "No data found in file. The file appears to be empty or contains only comments." };
  }

  // For 23andMe/AncestryDNA, the header is in a comment line — prepend it to dataLines
  const linesWithHeader =
    (format === "23andMe" || format === "AncestryDNA") && commentHeaderLine
      ? [commentHeaderLine, ...dataLines]
      : dataLines;

  switch (format) {
    case "23andMe":
      return parse23andMe(linesWithHeader);
    case "AncestryDNA":
      return parseAncestryDNA(linesWithHeader);
    case "MyHeritage":
      return parseMyHeritageOrFTDNA(linesWithHeader, "MyHeritage");
    case "FTDNA":
      return parseMyHeritageOrFTDNA(linesWithHeader, "FTDNA");
    case "unknown":
      return {
        error:
          "Unrecognized DNA file format. Supported formats: 23andMe, AncestryDNA, MyHeritage, and Family Tree DNA (FTDNA). " +
          "Please upload the raw data file from your DNA testing provider.",
      };
  }
}

import type { ClinVarData, ClinVarCondition } from "./types";

const EUTILS_BASE = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";
const TIMEOUT_MS = 10000;

interface ESearchResult {
  esearchresult?: {
    idlist?: string[];
  };
}

interface ESummaryResult {
  result?: Record<
    string,
    {
      uid?: string;
      title?: string;
      clinical_significance?: { description?: string };
      genes?: Array<{ symbol?: string }>;
      trait_set?: Array<{
        trait_name?: string;
        clinical_significance?: string;
      }>;
      germline_classification?: {
        description?: string;
        last_evaluated?: string;
        review_status?: string;
      };
      variation_set?: Array<{
        variation_name?: string;
        cdna_change?: string;
      }>;
      supporting_submissions?: {
        rcv?: Array<{
          clinical_significance?: string;
          conditions?: Array<{ name?: string }>;
        }>;
      };
    }
  >;
}

function reviewStatusToStars(status: string): number {
  const lower = status.toLowerCase();
  if (lower.includes("practice guideline")) return 4;
  if (lower.includes("reviewed by expert panel")) return 3;
  if (lower.includes("criteria provided, multiple submitters, no conflicts"))
    return 2;
  if (lower.includes("criteria provided, conflicting")) return 1;
  if (lower.includes("criteria provided, single submitter")) return 1;
  return 0;
}

async function fetchJSON<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function searchClinVar(rsid: string): Promise<string[]> {
  const term = encodeURIComponent(`${rsid}[variant name]`);
  const url = `${EUTILS_BASE}/esearch.fcgi?db=clinvar&term=${term}&retmode=json&retmax=5`;
  const data = await fetchJSON<ESearchResult>(url);
  return data?.esearchresult?.idlist ?? [];
}

async function fetchClinVarSummary(
  ids: string[]
): Promise<ESummaryResult | null> {
  if (ids.length === 0) return null;
  const url = `${EUTILS_BASE}/esummary.fcgi?db=clinvar&id=${ids.join(",")}&retmode=json`;
  return fetchJSON<ESummaryResult>(url);
}

export async function lookupClinVar(
  rsid: string
): Promise<ClinVarData | null> {
  const ids = await searchClinVar(rsid);
  if (ids.length === 0) return null;

  const summary = await fetchClinVarSummary(ids);
  if (!summary?.result) return null;

  // Use the first result as the primary record
  const primaryId = ids[0];
  const record = summary.result[primaryId];
  if (!record) return null;

  const gene =
    record.genes?.[0]?.symbol ?? "";
  const clinSig =
    record.germline_classification?.description ??
    record.clinical_significance?.description ??
    "";
  const reviewStatus =
    record.germline_classification?.review_status ?? "";

  // Extract conditions from supporting submissions
  const conditions: ClinVarCondition[] = [];
  const rcvs = record.supporting_submissions?.rcv ?? [];
  for (const rcv of rcvs) {
    for (const cond of rcv.conditions ?? []) {
      if (cond.name) {
        conditions.push({
          name: cond.name,
          clinicalSignificance: rcv.clinical_significance ?? clinSig,
        });
      }
    }
  }

  // Also extract from trait_set if no RCV conditions
  if (conditions.length === 0 && record.trait_set) {
    for (const trait of record.trait_set) {
      if (trait.trait_name) {
        conditions.push({
          name: trait.trait_name,
          clinicalSignificance:
            trait.clinical_significance ?? clinSig,
        });
      }
    }
  }

  // Extract the title as a fallback condition if none found
  if (conditions.length === 0 && record.title) {
    conditions.push({
      name: record.title,
      clinicalSignificance: clinSig,
    });
  }

  return {
    rsid: rsid.toLowerCase(),
    variantId: primaryId,
    gene,
    clinicalSignificance: clinSig,
    conditions,
    reviewStatus,
    starRating: reviewStatusToStars(reviewStatus),
    citations: [], // ClinVar summary doesn't directly expose PMIDs; would need efetch
  };
}

export async function batchLookupClinVar(
  rsids: string[]
): Promise<Map<string, ClinVarData>> {
  const BATCH_TIMEOUT_MS = 20000;
  const results = new Map<string, ClinVarData>();

  const doWork = async (): Promise<Map<string, ClinVarData>> => {
    // NCBI rate limit: 3 requests/second without API key
    // We make 2 requests per rsid (esearch + esummary), so process 1 at a time with a delay
    const chunks: string[][] = [];
    for (let i = 0; i < rsids.length; i += 3) {
      chunks.push(rsids.slice(i, i + 3));
    }

    for (const chunk of chunks) {
      const promises = chunk.map(async (rsid) => {
        const data = await lookupClinVar(rsid);
        if (data) results.set(rsid.toLowerCase(), data);
      });
      await Promise.all(promises);

      // Rate limit: wait 1 second between chunks
      if (chunks.indexOf(chunk) < chunks.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1100));
      }
    }

    return results;
  };

  const timeout = new Promise<Map<string, ClinVarData>>((resolve) => {
    setTimeout(() => resolve(results), BATCH_TIMEOUT_MS);
  });

  return Promise.race([doWork(), timeout]);
}

export function formatClinVarContext(
  clinvarData: Map<string, ClinVarData>,
  userGenotypes: Map<string, string>
): string {
  const sections: string[] = [];

  for (const [rsid, data] of clinvarData) {
    const userGeno = userGenotypes.get(rsid);
    let section = `### ${rsid} (${data.gene || "Unknown gene"}) — ClinVar ID: ${data.variantId}`;

    section += `\nClinical significance: ${data.clinicalSignificance || "Not provided"}`;
    section += `\nReview status: ${data.reviewStatus} (${"★".repeat(data.starRating)}${"☆".repeat(4 - data.starRating)})`;

    if (userGeno) {
      section += `\nUser genotype: ${userGeno}`;
    }

    if (data.conditions.length > 0) {
      section += `\nAssociated conditions:`;
      for (const cond of data.conditions.slice(0, 10)) {
        section += `\n  - ${cond.name} (${cond.clinicalSignificance})`;
      }
    }

    if (data.citations.length > 0) {
      section += `\nCitations: ${data.citations.join(", ")}`;
    }

    sections.push(section);
  }

  return sections.join("\n\n");
}

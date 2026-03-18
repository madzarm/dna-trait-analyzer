import type { GWASAssociation } from "./types";

const GWAS_API = "https://www.ebi.ac.uk/gwas/rest/api";
const TIMEOUT_MS = 10000;

interface GWASResponse {
  _embedded?: {
    associations?: GWASRawAssociation[];
  };
}

interface GWASRawAssociation {
  pvalue?: number;
  pvalueMantissa?: number;
  pvalueExponent?: number;
  riskFrequency?: string;
  orPerCopyNum?: number;
  betaNum?: number;
  betaDirection?: string;
  betaUnit?: string;
  range?: string;
  strongestRiskAlleles?: Array<{
    riskAlleleName?: string;
  }>;
  loci?: Array<{
    authorReportedGenes?: Array<{
      geneName?: string;
    }>;
  }>;
  _links?: {
    study?: { href?: string };
    efoTraits?: { href?: string };
  };
}

interface GWASStudy {
  accessionId?: string;
  pubmedId?: string;
  initialSampleSize?: string;
  ancestries?: Array<{
    ancestralGroups?: Array<{
      ancestralGroup?: string;
    }>;
    numberOfIndividuals?: number;
  }>;
}

interface GWASTraitResponse {
  _embedded?: {
    efoTraits?: Array<{
      trait?: string;
      shortForm?: string;
    }>;
  };
}

async function fetchJSON<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function parseSampleSize(sizeStr: string | undefined): number {
  if (!sizeStr) return 0;
  const matches = sizeStr.matchAll(/([\d,]+)\s+\w+/g);
  let total = 0;
  for (const m of matches) {
    total += parseInt(m[1].replace(/,/g, ""), 10) || 0;
  }
  return total;
}

export async function lookupGWAS(
  rsid: string
): Promise<GWASAssociation[]> {
  const normalizedRsid = rsid.toLowerCase();
  const url = `${GWAS_API}/singleNucleotidePolymorphisms/${normalizedRsid}/associations?projection=associationBySnp`;
  const data = await fetchJSON<GWASResponse>(url);

  const rawAssociations = data?._embedded?.associations ?? [];
  if (rawAssociations.length === 0) return [];

  const results: GWASAssociation[] = [];

  // Limit to first 3 associations to avoid excessive sub-requests
  const limitedAssociations = rawAssociations.slice(0, 3);

  for (const assoc of limitedAssociations) {
    // Extract risk allele
    const riskAlleleName =
      assoc.strongestRiskAlleles?.[0]?.riskAlleleName ?? "";
    // Format is typically "rs12345-A"
    const riskAllele = riskAlleleName.split("-").pop()?.trim() ?? "";

    // Extract gene
    const gene =
      assoc.loci?.[0]?.authorReportedGenes?.[0]?.geneName ?? "";

    // Calculate p-value
    const pValue =
      assoc.pvalue ?? (assoc.pvalueMantissa && assoc.pvalueExponent
        ? assoc.pvalueMantissa * Math.pow(10, assoc.pvalueExponent)
        : 1);

    // Format effect size
    let effectSize = "";
    if (assoc.orPerCopyNum && assoc.orPerCopyNum !== 1) {
      effectSize = `OR: ${assoc.orPerCopyNum.toFixed(2)}`;
      if (assoc.range) effectSize += ` (${assoc.range})`;
    } else if (assoc.betaNum) {
      effectSize = `Beta: ${assoc.betaNum}`;
      if (assoc.betaDirection) effectSize += ` (${assoc.betaDirection})`;
      if (assoc.betaUnit) effectSize += ` ${assoc.betaUnit}`;
    }

    // Fetch study and trait details
    let studyId = "";
    let pubmedId = "";
    let sampleSize = 0;
    let ancestries: string[] = [];
    let traitName = "";

    const studyUrl = assoc._links?.study?.href;
    if (studyUrl) {
      const study = await fetchJSON<GWASStudy>(studyUrl);
      if (study) {
        studyId = study.accessionId ?? "";
        pubmedId = study.pubmedId ?? "";
        sampleSize = parseSampleSize(study.initialSampleSize);
        ancestries =
          study.ancestries
            ?.flatMap(
              (a) =>
                a.ancestralGroups?.map((g) => g.ancestralGroup ?? "") ?? []
            )
            .filter(Boolean) ?? [];
      }
    }

    const traitUrl = assoc._links?.efoTraits?.href;
    if (traitUrl) {
      const traits = await fetchJSON<GWASTraitResponse>(traitUrl);
      traitName =
        traits?._embedded?.efoTraits?.[0]?.trait ?? "";
    }

    if (riskAllele && riskAllele.length === 1) {
      results.push({
        rsid: normalizedRsid,
        gene,
        trait: traitName,
        pValue,
        effectSize,
        riskAllele: riskAllele.toUpperCase(),
        studyId,
        pubmedId,
        sampleSize,
        ancestries,
      });
    }
  }

  return results;
}

export async function batchLookupGWAS(
  rsids: string[]
): Promise<Map<string, GWASAssociation[]>> {
  const BATCH_TIMEOUT_MS = 30000;
  const results = new Map<string, GWASAssociation[]>();

  const doWork = async (): Promise<Map<string, GWASAssociation[]>> => {
    // GWAS Catalog is generous with rate limits but we'll still batch
    const chunks: string[][] = [];
    for (let i = 0; i < rsids.length; i += 3) {
      chunks.push(rsids.slice(i, i + 3));
    }

    for (const chunk of chunks) {
      const promises = chunk.map(async (rsid) => {
        const data = await lookupGWAS(rsid);
        if (data.length > 0) results.set(rsid.toLowerCase(), data);
      });
      await Promise.all(promises);

      // Brief delay between chunks
      if (chunks.indexOf(chunk) < chunks.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    return results;
  };

  const timeout = new Promise<Map<string, GWASAssociation[]>>((resolve) => {
    setTimeout(() => resolve(results), BATCH_TIMEOUT_MS);
  });

  return Promise.race([doWork(), timeout]);
}

export function formatGWASContext(
  gwasData: Map<string, GWASAssociation[]>,
  userGenotypes: Map<string, string>
): string {
  const sections: string[] = [];

  for (const [rsid, associations] of gwasData) {
    const userGeno = userGenotypes.get(rsid);
    const bestAssoc = associations[0];
    const gene = bestAssoc?.gene || "Unknown gene";

    let section = `### ${rsid} (${gene}) — ${associations.length} GWAS association(s)`;

    if (userGeno) {
      section += `\nUser genotype: ${userGeno}`;
    }

    for (const assoc of associations.slice(0, 5)) {
      const pStr =
        assoc.pValue < 1e-8
          ? `p=${assoc.pValue.toExponential(1)} (genome-wide significant)`
          : `p=${assoc.pValue.toExponential(1)}`;

      section += `\n  - Trait: ${assoc.trait || "Not specified"}`;
      section += `\n    ${pStr}`;
      if (assoc.effectSize) section += ` | ${assoc.effectSize}`;
      section += ` | Risk allele: ${assoc.riskAllele}`;
      if (assoc.sampleSize > 0)
        section += ` | N=${assoc.sampleSize.toLocaleString()}`;
      if (assoc.pubmedId) section += ` | PMID:${assoc.pubmedId}`;
      if (assoc.ancestries.length > 0)
        section += ` | Ancestries: ${assoc.ancestries.join(", ")}`;
    }

    sections.push(section);
  }

  return sections.join("\n\n");
}

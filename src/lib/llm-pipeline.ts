import Anthropic from "@anthropic-ai/sdk";
import type { SNPAssociation, SNPMatch, AnalysisResult, EvidenceStrength } from "./types";
import type { SNPData } from "./types";
import { batchLookupSNPs, formatSNPediaContext } from "./snpedia";
import { batchLookupClinVar, formatClinVarContext } from "./clinvar";
import { batchLookupGWAS, formatGWASContext } from "./gwas-catalog";

const anthropic = new Anthropic();

type ProgressCallback = (event: {
  type: "progress" | "snps_found";
  phase?: string;
  message?: string;
  snpCount?: number;
}) => void;

export interface PipelineOptions {
  /** When true, excludes SNPedia (CC BY-NC-SA) and uses only public domain sources (ClinVar, GWAS Catalog) */
  useCommercialSources?: boolean;
}

export async function runAnalysisPipeline(
  trait: string,
  dnaMap: Map<string, SNPData>,
  onProgress: ProgressCallback,
  options: PipelineOptions = {}
): Promise<AnalysisResult> {
  const { useCommercialSources = false } = options;
  // Step 1: Research trait and find associated SNPs
  onProgress({
    type: "progress",
    phase: "research",
    message: `Searching research papers for "${trait}" genetic associations...`,
  });

  const associations = await researchTrait(trait);

  if (associations.length === 0) {
    return {
      trait,
      summary: `No well-established genetic associations were found for "${trait}". This trait may not have strong genetic markers identified in current research, or it may be primarily influenced by environmental factors.`,
      confidence: 0,
      snpMatches: [],
      interpretation:
        "Unable to provide a genetic analysis for this trait. This could mean the trait is not well-studied genetically, is influenced by many genes with very small effects, or is primarily determined by environmental factors.",
      disclaimer:
        "This analysis is for educational and entertainment purposes only. It is not medical advice. Consult a healthcare professional or genetic counselor for medical guidance.",
      sources: [],
    };
  }

  onProgress({
    type: "snps_found",
    phase: "extract",
    message: `Found ${associations.length} SNPs associated with "${trait}"`,
    snpCount: associations.length,
  });

  // Step 2: Cross-reference with user's DNA
  onProgress({
    type: "progress",
    phase: "crossref",
    message: "Cross-referencing with your DNA data...",
  });

  const matches = crossReference(associations, dnaMap);

  onProgress({
    type: "progress",
    phase: "crossref",
    message: `Found ${matches.length} of ${associations.length} SNPs in your DNA data`,
  });

  // Step 3: Fetch reference data from multiple sources
  const allRsids = associations.map((a) => a.rsid);

  // Build user genotype map for context formatting
  const userGenotypes = new Map<string, string>();
  for (const match of matches) {
    userGenotypes.set(match.rsid.toLowerCase(), match.userGenotype);
  }

  // Fetch from all enabled sources in parallel
  let snpediaContext = "";
  let clinvarContext = "";
  let gwasContext = "";

  // Wrap a promise with a timeout so one slow source doesn't block the others
  function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
    const timeout = new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms));
    return Promise.race([promise, timeout]);
  }

  const SOURCE_TIMEOUT_MS = 35000;
  const fetchPromises: Promise<void>[] = [];

  // SNPedia: only if NOT in commercial mode (CC BY-NC-SA license)
  if (!useCommercialSources) {
    onProgress({
      type: "progress",
      phase: "snpedia",
      message: "Looking up SNPedia for detailed genotype data...",
    });

    fetchPromises.push(
      withTimeout(
        batchLookupSNPs(allRsids).then((snpediaData) => {
          if (snpediaData.size > 0) {
            onProgress({
              type: "progress",
              phase: "snpedia",
              message: `Retrieved SNPedia data for ${snpediaData.size} of ${allRsids.length} SNPs`,
            });
            snpediaContext = formatSNPediaContext(snpediaData, userGenotypes);
          }
        }),
        SOURCE_TIMEOUT_MS,
        undefined
      )
    );
  }

  // ClinVar: always enabled (public domain)
  onProgress({
    type: "progress",
    phase: "clinvar",
    message: "Querying ClinVar for clinical variant data...",
  });

  fetchPromises.push(
    withTimeout(
      batchLookupClinVar(allRsids).then((clinvarData) => {
        if (clinvarData.size > 0) {
          onProgress({
            type: "progress",
            phase: "clinvar",
            message: `Retrieved ClinVar data for ${clinvarData.size} of ${allRsids.length} SNPs`,
          });
          clinvarContext = formatClinVarContext(clinvarData, userGenotypes);
        }
      }),
      SOURCE_TIMEOUT_MS,
      undefined
    )
  );

  // GWAS Catalog: always enabled (open access)
  onProgress({
    type: "progress",
    phase: "gwas",
    message: "Querying GWAS Catalog for study associations...",
  });

  fetchPromises.push(
    withTimeout(
      batchLookupGWAS(allRsids).then((gwasData) => {
        if (gwasData.size > 0) {
          onProgress({
            type: "progress",
            phase: "gwas",
            message: `Retrieved GWAS Catalog data for ${gwasData.size} of ${allRsids.length} SNPs`,
          });
          gwasContext = formatGWASContext(gwasData, userGenotypes);
        }
      }),
      SOURCE_TIMEOUT_MS,
      undefined
    )
  );

  await Promise.all(fetchPromises);

  onProgress({
    type: "progress",
    phase: "fetch_complete",
    message: "Data fetching complete, proceeding with analysis...",
  });

  // Step 4: Interpret results
  onProgress({
    type: "progress",
    phase: "interpret",
    message: "Generating your personalized genetic report...",
  });

  const result = await interpretResults(
    trait,
    matches,
    associations,
    snpediaContext,
    clinvarContext,
    gwasContext
  );

  return result;
}

async function researchTrait(trait: string): Promise<SNPAssociation[]> {
  try {
    // Try with web search for live research
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 16000,
      tools: [
        {
          type: "web_search_20250305",
          name: "web_search",
          max_uses: 5,
        } as unknown as Anthropic.Messages.Tool,
      ],
      messages: [
        {
          role: "user",
          content: `You are a genetics researcher. Research the genetic basis of "${trait}".

Search for specific SNPs (rs numbers) that are scientifically associated with this trait. Look for information from SNPedia, GWAS Catalog, ClinVar, and peer-reviewed studies.

CRITICAL: For each SNP, you must assess the strength of scientific evidence and the magnitude of its effect. Not all genetic associations are equal — some are from large replicated GWAS with strong effect sizes, others are from small preliminary studies with marginal significance.

After your research, output EXACTLY a JSON array (and nothing else after it) with the following format. Include between 3-15 SNPs if available:

\`\`\`json
[
  {
    "rsid": "rs762551",
    "gene": "CYP1A2",
    "riskAllele": "C",
    "effect": "Associated with slow caffeine metabolism",
    "evidenceStrength": "strong",
    "effectSize": "1.5x slower caffeine clearance per C allele",
    "source": "Cornelis et al. 2006 (N=4,000+), replicated in multiple GWAS, SNPedia"
  }
]
\`\`\`

Evidence strength criteria:
- "strong": Large GWAS (N>10,000), replicated across multiple studies/populations, genome-wide significant (p<5e-8), well-established in SNPedia/ClinVar
- "moderate": Medium-sized studies (N>1,000), some replication, significant but not always genome-wide, consistent direction of effect
- "preliminary": Small studies (N<1,000), single study, candidate gene study without GWAS confirmation, borderline significance, conflicting results across studies

For effectSize, describe the real-world magnitude: odds ratio, relative risk, percentage change, or qualitative impact (e.g., "OR 2.5 for condition", "~15% higher enzyme activity", "small effect, explains <1% of variance").

Important rules:
- Only include real, verified SNPs with valid rs numbers
- The riskAllele should be a single nucleotide (A, T, C, or G)
- Order by evidence strength (strong first), then by effect size within each tier
- Be honest about weak evidence — do NOT inflate preliminary findings
- End your response with ONLY the JSON array`,
        },
      ],
    });

    return extractAssociationsFromResponse(response);
  } catch {
    // Fallback: use Claude's built-in knowledge without web search
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: `You are a genetics researcher with deep knowledge of SNPedia, GWAS Catalog, and genomics research.

List the specific SNPs (rs numbers) that are scientifically associated with "${trait}".

CRITICAL: For each SNP, assess the strength of scientific evidence and the magnitude of its effect. Not all genetic associations are equal.

Output EXACTLY a JSON array with the following format. Include between 3-15 SNPs if available:

\`\`\`json
[
  {
    "rsid": "rs762551",
    "gene": "CYP1A2",
    "riskAllele": "C",
    "effect": "Associated with slow caffeine metabolism",
    "evidenceStrength": "strong",
    "effectSize": "1.5x slower caffeine clearance per C allele",
    "source": "Cornelis et al. 2006 (N=4,000+), replicated in multiple GWAS, SNPedia"
  }
]
\`\`\`

Evidence strength criteria:
- "strong": Large GWAS (N>10,000), replicated, genome-wide significant (p<5e-8)
- "moderate": Medium studies (N>1,000), some replication, significant
- "preliminary": Small studies (N<1,000), single study, candidate gene only, conflicting results

For effectSize, describe real-world magnitude: odds ratio, relative risk, percentage change.

Rules:
- Only include real, verified SNPs with valid rs numbers
- The riskAllele should be a single nucleotide (A, T, C, or G)
- Order by evidence strength (strong first), then by effect size
- Be honest about weak evidence — do NOT inflate preliminary findings
- Output ONLY the JSON array, no other text`,
        },
      ],
    });

    return extractAssociationsFromResponse(response);
  }
}

function extractAssociationsFromResponse(
  response: Anthropic.Messages.Message
): SNPAssociation[] {
  const textBlocks = response.content.filter(
    (b): b is Anthropic.Messages.TextBlock => b.type === "text"
  );
  const fullText = textBlocks.map((b) => b.text).join("\n");

  // Find JSON array in the response
  const jsonMatch = fullText.match(/\[[\s\S]*?\]/g);
  if (!jsonMatch) return [];

  // Try the last JSON array found (most likely to be the final output)
  for (let i = jsonMatch.length - 1; i >= 0; i--) {
    try {
      const parsed = JSON.parse(jsonMatch[i]);
      if (
        Array.isArray(parsed) &&
        parsed.length > 0 &&
        parsed[0].rsid
      ) {
        return parsed.map((item: Record<string, string>) => ({
          rsid: item.rsid?.toLowerCase() || "",
          gene: item.gene || "Unknown",
          riskAllele: item.riskAllele?.toUpperCase() || "",
          effect: item.effect || "",
          evidenceStrength: (["strong", "moderate", "preliminary"].includes(item.evidenceStrength)
            ? item.evidenceStrength
            : "moderate") as EvidenceStrength,
          effectSize: item.effectSize || "Not specified",
          source: item.source || "",
        }));
      }
    } catch {
      continue;
    }
  }

  return [];
}

function crossReference(
  associations: SNPAssociation[],
  dnaMap: Map<string, SNPData>
): SNPMatch[] {
  const matches: SNPMatch[] = [];

  for (const assoc of associations) {
    const rsid = assoc.rsid.toLowerCase();
    const userSnp = dnaMap.get(rsid);

    if (!userSnp) continue;

    const userGenotype = userSnp.result;
    const hasRiskAllele = userGenotype.includes(assoc.riskAllele);

    matches.push({
      rsid: assoc.rsid,
      gene: assoc.gene,
      userGenotype,
      riskAllele: assoc.riskAllele,
      effect: assoc.effect,
      hasRiskAllele,
      evidenceStrength: assoc.evidenceStrength,
      effectSize: assoc.effectSize,
      source: assoc.source,
    });
  }

  return matches;
}

async function interpretResults(
  trait: string,
  matches: SNPMatch[],
  allAssociations: SNPAssociation[],
  snpediaContext: string,
  clinvarContext: string,
  gwasContext: string
): Promise<AnalysisResult> {
  const notFound = allAssociations.filter(
    (a) => !matches.find((m) => m.rsid === a.rsid)
  );

  const snpediaSection = snpediaContext
    ? `\n\n## SNPedia Reference Data (authoritative source — use this to validate and enrich your analysis)\n${snpediaContext}`
    : "";

  const clinvarSection = clinvarContext
    ? `\n\n## ClinVar Clinical Data (NCBI public domain — authoritative for clinical significance)\n${clinvarContext}`
    : "";

  const gwasSection = gwasContext
    ? `\n\n## GWAS Catalog Data (EBI open access — authoritative for study-level associations)\n${gwasContext}`
    : "";

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 3000,
    messages: [
      {
        role: "user",
        content: `You are a genetics educator providing a personalized but responsible analysis.

Trait being analyzed: "${trait}"

SNPs found in the user's DNA (each includes evidence strength and effect size):
${JSON.stringify(matches, null, 2)}

SNPs researched but not found in the user's DNA chip:
${notFound.map((a) => `${a.rsid} (${a.gene}, evidence: ${a.evidenceStrength})`).join(", ") || "None"}
${snpediaSection}${clinvarSection}${gwasSection}

CRITICAL INSTRUCTIONS:
1. EVIDENCE WEIGHTING: Each SNP has an "evidenceStrength" field and "effectSize". Weight findings proportionally — strong-evidence SNPs drive conclusions, preliminary ones get caveats.
2. SNPEDIA DATA: If present, the SNPedia section contains real genotype-specific interpretations, magnitude scores, and population frequencies. USE THIS DATA as a primary reference — it includes the exact interpretation for the user's specific genotype (marked with "← USER'S GENOTYPE"). The SNPedia magnitude score (0-10) indicates clinical significance: >3 is notable, >5 is significant. Prefer SNPedia's genotype descriptions over generic associations.
3. CLINVAR DATA: If present, the ClinVar section contains NCBI's authoritative clinical significance classifications and condition associations. Pay attention to the star rating (0-4 stars) — higher stars mean more review. ClinVar is the gold standard for clinical variant interpretation.
4. GWAS CATALOG DATA: If present, the GWAS Catalog section contains study-level associations with p-values, effect sizes, and sample sizes from published genome-wide association studies. Use this to validate effect sizes and assess evidence strength. Genome-wide significant findings (p<5e-8) from large studies (N>10,000) are highly reliable.
5. CROSS-SOURCE VALIDATION: When multiple sources provide information about the same SNP, cross-reference them. If sources agree, increase confidence. If sources disagree, note the discrepancy and weight by source authority (ClinVar stars > large GWAS > SNPedia magnitude > small studies). Flag any contradictions explicitly.
6. If any curated database (SNPedia, ClinVar) contradicts or refines the initial research, trust the curated source.
7. HAPLOTYPE AWARENESS: Some SNPs in the same gene are in strong linkage disequilibrium and form haplotypes (e.g., TAS2R38 PAV/AVI, APOE e2/e3/e4). When multiple SNPs from the same gene appear, analyze them TOGETHER as a haplotype — do NOT treat each one independently. Explain the combined haplotype meaning, not conflicting per-SNP signals.
8. CLEAR BOTTOM LINE: The summary MUST give a direct, unambiguous answer to "what does this mean for me?" — e.g., "You are likely a medium bitter taster" not "you have mixed signals." If the evidence is genuinely mixed, say so clearly but still give the most likely interpretation. Users should not have to reconcile contradictory statements themselves.

Based on the genotypes found, provide an educational analysis. Output ONLY a JSON object:

{
  "summary": "A 2-3 sentence plain-language summary. Start with a CLEAR VERDICT — what the user's DNA most likely means for this trait in plain terms. Then add the key supporting evidence.",
  "confidence": <number 0-100 factoring coverage, evidence quality, SNPedia magnitude scores, ClinVar star ratings, and GWAS p-values/sample sizes>,
  "interpretation": "A detailed 2-3 paragraph explanation. When multiple SNPs are in the same gene, explain the haplotype first, then the individual SNPs as supporting detail. For each SNP, use genotype-specific descriptions from SNPedia/ClinVar where available. Reference ClinVar clinical significance and GWAS effect sizes. Mention magnitude scores, star ratings, and population frequencies when relevant. Note when multiple sources agree or disagree. End with a practical 'what this means in daily life' sentence.",
  "sources": ["list of research sources — include PMIDs from SNPedia, ClinVar IDs, and GWAS study accessions where available"]
}

Rules:
- Be scientifically accurate but accessible
- ALWAYS give a clear bottom-line answer, not wishy-washy hedging
- Use curated database interpretations (SNPedia, ClinVar) as ground truth over generic associations
- Analyze linked SNPs as haplotypes, not independently
- Clearly distinguish strong vs weak evidence
- Note that most traits are influenced by many genes AND environment
- If the user has protective genotypes, mention that positively
- If the user has risk genotypes, contextualize appropriately (risk ≠ destiny)
- Never provide medical diagnoses or treatment recommendations`,
      },
    ],
  });

  const textBlocks = response.content.filter(
    (b): b is Anthropic.Messages.TextBlock => b.type === "text"
  );
  const fullText = textBlocks.map((b) => b.text).join("");

  let parsed: {
    summary: string;
    confidence: number;
    interpretation: string;
    sources: string[];
  };

  try {
    const jsonMatch = fullText.match(/\{[\s\S]*\}/);
    parsed = jsonMatch
      ? JSON.parse(jsonMatch[0])
      : {
          summary: "Analysis completed.",
          confidence: 30,
          interpretation: fullText,
          sources: [],
        };
  } catch {
    parsed = {
      summary: "Analysis completed.",
      confidence: 30,
      interpretation: fullText,
      sources: [],
    };
  }

  return {
    trait,
    summary: parsed.summary,
    confidence: parsed.confidence,
    snpMatches: matches,
    interpretation: parsed.interpretation,
    disclaimer:
      "This analysis is for educational and entertainment purposes only. It is not medical advice. Genetic traits are complex and influenced by many factors including environment, lifestyle, and interactions between multiple genes. Consult a healthcare professional or genetic counselor for medical guidance.",
    sources: parsed.sources,
  };
}

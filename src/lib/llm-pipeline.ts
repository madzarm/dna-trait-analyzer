import Anthropic from "@anthropic-ai/sdk";
import type { SNPAssociation, SNPMatch, AnalysisResult, EvidenceStrength } from "./types";
import type { SNPData } from "./types";
import { batchLookupSNPs, formatSNPediaContext } from "./snpedia";

const anthropic = new Anthropic();

type ProgressCallback = (event: {
  type: "progress" | "snps_found";
  phase?: string;
  message?: string;
  snpCount?: number;
}) => void;

export async function runAnalysisPipeline(
  trait: string,
  dnaMap: Map<string, SNPData>,
  onProgress: ProgressCallback
): Promise<AnalysisResult> {
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

  // Step 3: Fetch SNPedia data for matched SNPs
  onProgress({
    type: "progress",
    phase: "snpedia",
    message: "Looking up SNPedia for detailed genotype data...",
  });

  const allRsids = associations.map((a) => a.rsid);
  const snpediaData = await batchLookupSNPs(allRsids);

  const snpediaFoundCount = snpediaData.size;
  if (snpediaFoundCount > 0) {
    onProgress({
      type: "progress",
      phase: "snpedia",
      message: `Retrieved SNPedia data for ${snpediaFoundCount} of ${allRsids.length} SNPs`,
    });
  }

  // Build user genotype map for SNPedia context formatting
  const userGenotypes = new Map<string, string>();
  for (const match of matches) {
    userGenotypes.set(match.rsid.toLowerCase(), match.userGenotype);
  }
  const snpediaContext = formatSNPediaContext(snpediaData, userGenotypes);

  // Step 4: Interpret results
  onProgress({
    type: "progress",
    phase: "interpret",
    message: "Generating your personalized genetic report...",
  });

  const result = await interpretResults(trait, matches, associations, snpediaContext);

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
  snpediaContext: string
): Promise<AnalysisResult> {
  const notFound = allAssociations.filter(
    (a) => !matches.find((m) => m.rsid === a.rsid)
  );

  const snpediaSection = snpediaContext
    ? `\n\n## SNPedia Reference Data (authoritative source — use this to validate and enrich your analysis)\n${snpediaContext}`
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
${snpediaSection}

CRITICAL INSTRUCTIONS:
1. EVIDENCE WEIGHTING: Each SNP has an "evidenceStrength" field and "effectSize". Weight findings proportionally — strong-evidence SNPs drive conclusions, preliminary ones get caveats.
2. SNPEDIA DATA: The SNPedia section above contains real genotype-specific interpretations, magnitude scores, and population frequencies fetched directly from SNPedia. USE THIS DATA as your primary reference — it includes the exact interpretation for the user's specific genotype (marked with "← USER'S GENOTYPE"). The SNPedia magnitude score (0-10) indicates clinical significance: >3 is notable, >5 is significant. Prefer SNPedia's genotype descriptions over generic associations.
3. If SNPedia data contradicts or refines the initial research, trust SNPedia — it is a curated, peer-reviewed database.
4. HAPLOTYPE AWARENESS: Some SNPs in the same gene are in strong linkage disequilibrium and form haplotypes (e.g., TAS2R38 PAV/AVI, APOE e2/e3/e4). When multiple SNPs from the same gene appear, analyze them TOGETHER as a haplotype — do NOT treat each one independently. Explain the combined haplotype meaning, not conflicting per-SNP signals.
5. CLEAR BOTTOM LINE: The summary MUST give a direct, unambiguous answer to "what does this mean for me?" — e.g., "You are likely a medium bitter taster" not "you have mixed signals." If the evidence is genuinely mixed, say so clearly but still give the most likely interpretation. Users should not have to reconcile contradictory statements themselves.

Based on the genotypes found, provide an educational analysis. Output ONLY a JSON object:

{
  "summary": "A 2-3 sentence plain-language summary. Start with a CLEAR VERDICT — what the user's DNA most likely means for this trait in plain terms. Then add the key supporting evidence.",
  "confidence": <number 0-100 factoring coverage, evidence quality, AND SNPedia magnitude scores>,
  "interpretation": "A detailed 2-3 paragraph explanation. When multiple SNPs are in the same gene, explain the haplotype first, then the individual SNPs as supporting detail. For each SNP, use SNPedia's genotype-specific description where available. Mention magnitude scores and population frequencies when relevant. Be specific about effect sizes. End with a practical 'what this means in daily life' sentence.",
  "sources": ["list of research sources — include PMIDs from SNPedia where available"]
}

Rules:
- Be scientifically accurate but accessible
- ALWAYS give a clear bottom-line answer, not wishy-washy hedging
- Use SNPedia's exact genotype interpretations as the ground truth
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
